// Singolo cliente dell'app: modifica dati, nuovo codice d'accesso, eliminazione.

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { nuovoCodice, nuovoToken } from "@/lib/app-coaching/sessione";
import { caricaRiassunti, RIASSUNTO_VUOTO, toClienteApp } from "@/lib/app-coaching/serializza";
import { pulisciDatiCliente } from "@/lib/app-coaching/pulisci";
import { oggiISO } from "@/lib/app-coaching/date";
import { contrattiBrevi } from "@/lib/app-coaching/shop";

export const dynamic = "force-dynamic";

const TENTATIVI_CODICE = 5;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const { dati, errore } = pulisciDatiCliente(body);
  if (errore !== null) return NextResponse.json({ error: errore }, { status: 400 });
  const rigenera = (body as { nuovoCodice?: unknown }).nuovoCodice === true;
  if (!Object.keys(dati).length && !rigenera) {
    return NextResponse.json({ error: "Niente da aggiornare" }, { status: 400 });
  }

  const esiste = await prisma.appCliente.findFirst({
    where: { id, coach: MARCHIO.chiave },
    select: { id: true },
  });
  if (!esiste) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  // il contratto collegato deve esistere: un id sbagliato lascerebbe lo shop vuoto senza dire perche'
  if (dati.preventivoId) {
    const c = await prisma.preventivo.findUnique({ where: { id: dati.preventivoId }, select: { id: true } });
    if (!c) return NextResponse.json({ error: "Contratto non trovato" }, { status: 400 });
  }

  // Nuovo codice = accesso da rifare: il codice entra nella firma del cookie,
  // quindi le sessioni aperte cadono. Si cambia anche il token, se no il
  // vecchio link su WhatsApp farebbe rientrare chi non deve piu'.
  for (let i = 0; i < TENTATIVI_CODICE; i++) {
    try {
      const c = await prisma.appCliente.update({
        where: { id },
        data: rigenera ? { ...dati, codice: nuovoCodice(), token: nuovoToken() } : dati,
      });
      const [riassunti, contratti] = await Promise.all([
        caricaRiassunti([id], oggiISO()),
        contrattiBrevi([c.preventivoId]),
      ]);
      const contratto = c.preventivoId ? (contratti.get(c.preventivoId) ?? null) : null;
      return NextResponse.json({ cliente: toClienteApp(c, riassunti.get(id) ?? RIASSUNTO_VUOTO, contratto) });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002" && rigenera) continue;
        if (e.code === "P2025") {
          return NextResponse.json({ error: "Non trovato" }, { status: 404 });
        }
      }
      throw e;
    }
  }
  return NextResponse.json({ error: "Codice non generato, riprova" }, { status: 500 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  // le giornate se ne vanno con lui (ON DELETE CASCADE)
  const { count } = await prisma.appCliente.deleteMany({ where: { id, coach: MARCHIO.chiave } });
  if (!count) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
