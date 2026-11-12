// Copia il piano di un intervallo di giorni su un altro punto del calendario
// (es. "ripeti questa settimana la prossima"). Si copia solo il piano: fatto,
// fatica e feedback del cliente restano dove sono.

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { jsonDb } from "@/lib/app-coaching/serializza";
import { pianoVuoto } from "@/lib/app-coaching/pulisci";
import { aggiungiGiorni, dataValida, giorniTra, oggiISO } from "@/lib/app-coaching/date";

export const dynamic = "force-dynamic";

const MAX_GIORNI = 62;
const MAX_DISTANZA_OGGI = 366;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  let body: { da?: unknown; a?: unknown; verso?: unknown; sovrascrivi?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const { da, a, verso } = body;
  if (!dataValida(da) || !dataValida(a) || !dataValida(verso)) {
    return NextResponse.json({ error: "Date non valide" }, { status: 400 });
  }
  const durata = giorniTra(da, a) + 1;
  if (durata < 1) {
    return NextResponse.json({ error: "La fine viene prima dell'inizio" }, { status: 400 });
  }
  if (durata > MAX_GIORNI) {
    return NextResponse.json({ error: `Al massimo ${MAX_GIORNI} giorni per volta` }, { status: 400 });
  }
  if (Math.abs(giorniTra(oggiISO(), verso)) > MAX_DISTANZA_OGGI) {
    return NextResponse.json({ error: "Destinazione troppo lontana da oggi" }, { status: 400 });
  }
  const sovrascrivi = body.sovrascrivi === true;
  const scarto = giorniTra(da, verso);

  const esiste = await prisma.appCliente.findFirst({
    where: { id, coach: MARCHIO.chiave },
    select: { id: true },
  });
  if (!esiste) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  // Tutto o niente: una copia a meta' lascerebbe una settimana spezzata.
  // Le sorgenti si leggono prima di scrivere, quindi anche intervalli che si
  // sovrappongono copiano la situazione di partenza.
  const esito = await prisma.$transaction(
    async (tx) => {
      const sorgenti = (
        await tx.appGiornata.findMany({
          where: { clienteId: id, data: { gte: da, lte: a } },
          orderBy: { data: "asc" },
        })
      ).filter((r) => !pianoVuoto(r));
      if (!sorgenti.length) return { copiate: 0, saltate: 0 };

      const esistenti = await tx.appGiornata.findMany({
        where: {
          clienteId: id,
          data: { in: sorgenti.map((r) => aggiungiGiorni(r.data, scarto)) },
        },
        select: { id: true, data: true, riposo: true, allenamento: true, alimentazione: true, notaCoach: true },
      });
      const perData = new Map(esistenti.map((e) => [e.data, e]));

      let copiate = 0;
      let saltate = 0;
      const nuove: Prisma.AppGiornataCreateManyInput[] = [];
      for (const r of sorgenti) {
        const data = aggiungiGiorni(r.data, scarto);
        const piano = {
          riposo: r.riposo,
          allenamento: jsonDb(r.allenamento),
          alimentazione: jsonDb(r.alimentazione),
          notaCoach: r.notaCoach,
        };
        const dest = perData.get(data);
        if (!dest) {
          nuove.push({ clienteId: id, data, ...piano });
        } else {
          // un giorno di destinazione senza piano (magari solo con la risposta
          // del cliente) non ha niente da perdere: si riempie anche senza sovrascrivi
          if (!sovrascrivi && !pianoVuoto(dest)) {
            saltate++;
            continue;
          }
          await tx.appGiornata.update({ where: { id: dest.id }, data: piano });
        }
        copiate++;
      }
      if (nuove.length) await tx.appGiornata.createMany({ data: nuove });
      return { copiate, saltate };
    },
    // fino a 62 scritture verso Neon: il timeout di default (5 s) e' stretto
    { maxWait: 10_000, timeout: 30_000 }
  );

  return NextResponse.json(esito);
}
