// Messaggi dell'app nel gestionale: un thread per cliente, il piu' recente in
// alto, con i non letti del coach (badge della scheda).

import { NextResponse } from "next/server";
import type { AppMessaggio, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { toMessaggio } from "@/lib/app-coaching/serializza-v2";
import type { ThreadAdmin } from "@/lib/app-coaching/tipi-v2";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  // solo i clienti di questo marchio: il giorno del white label il DB e' condiviso
  const delCoach = { cliente: { coach: MARCHIO.chiave } } satisfies Prisma.AppMessaggioWhereInput;
  const [clienti, ultimi, nonLetti] = await Promise.all([
    prisma.appCliente.findMany({
      where: { coach: MARCHIO.chiave },
      select: { id: true, nome: true, attivo: true },
    }),
    prisma.appMessaggio.groupBy({ by: ["clienteId"], where: delCoach, _max: { createdAt: true } }),
    prisma.appMessaggio.groupBy({
      by: ["clienteId"],
      where: { ...delCoach, daCoach: false, lettoAt: null },
      _count: { _all: true },
    }),
  ]);

  // L'ultimo messaggio di ogni thread con una query sola, dalle coppie
  // (cliente, ora dell'ultimo) del groupBy: niente query per cliente e niente
  // caricamento di tutta la tabella.
  const coppie = ultimi.flatMap((u) =>
    u._max.createdAt ? [{ clienteId: u.clienteId, createdAt: u._max.createdAt }] : []
  );
  const righe = coppie.length ? await prisma.appMessaggio.findMany({ where: { OR: coppie } }) : [];
  const ultimoDi = new Map<string, AppMessaggio>();
  for (const r of righe) {
    // due messaggi nello stesso millisecondo: ne basta uno, sempre lo stesso
    const v = ultimoDi.get(r.clienteId);
    if (!v || r.id > v.id) ultimoDi.set(r.clienteId, r);
  }
  const nonLettiDi = new Map(nonLetti.map((n) => [n.clienteId, n._count._all]));

  // Thread: chi ha scritto o ricevuto almeno un messaggio, piu' i clienti
  // attivi senza messaggi (il coach puo' scrivere per primo). I disattivati
  // senza messaggi sarebbero solo rumore.
  const thread: ThreadAdmin[] = clienti
    .filter((c) => c.attivo || ultimoDi.has(c.id))
    .map((c) => {
      const u = ultimoDi.get(c.id);
      return {
        clienteId: c.id,
        nome: c.nome,
        ultimo: u ? toMessaggio(u, "coach") : null,
        nonLetti: nonLettiDi.get(c.id) ?? 0,
      };
    });
  // prima i thread col messaggio piu' recente, poi quelli vuoti per nome
  thread.sort((a, b) => {
    // ISO in UTC: il confronto tra stringhe e' quello cronologico
    if (a.ultimo && b.ultimo) return a.ultimo.createdAt < b.ultimo.createdAt ? 1 : -1;
    if (a.ultimo || b.ultimo) return a.ultimo ? -1 : 1;
    return a.nome.localeCompare(b.nome, "de", { sensitivity: "base" });
  });

  const nonLettiTotale = thread.reduce((n, t) => n + t.nonLetti, 0);
  return NextResponse.json({ thread, nonLettiTotale });
}
