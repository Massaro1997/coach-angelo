// Home dell'app v2: tutto quello che serve alla prima schermata in una
// chiamata sola (al telefono ogni richiesta in piu' si sente).

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { toGiornata } from "@/lib/app-coaching/serializza";
import { toProfiloCompleto } from "@/lib/app-coaching/serializza-v2";
import { lunediDi, segnaAccesso, statistiche } from "@/lib/app-coaching/progressi";
import { prossimaPrenotazione } from "@/lib/app-coaching/prenotazioni";
import { riassuntoAbbonamento } from "@/lib/app-coaching/shop";
import { aggiungiGiorni, oggiISO } from "@/lib/app-coaching/date";
import type { RiassuntoHome } from "@/lib/app-coaching/tipi-v2";

export const dynamic = "force-dynamic";

export async function GET() {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;

  const oggi = oggiISO();
  const lunedi = lunediDi(oggi);
  const domenica = aggiungiGiorni(lunedi, 6);

  const [righe, stat, prenotazione, abbonamento, messaggiNonLetti] = await Promise.all([
    prisma.appGiornata.findMany({
      where: { clienteId: cliente.id, data: { gte: lunedi, lte: domenica } },
      orderBy: { data: "asc" },
    }),
    statistiche(cliente.id, oggi),
    prossimaPrenotazione(cliente.id),
    riassuntoAbbonamento(cliente),
    prisma.appMessaggio.count({
      where: { clienteId: cliente.id, daCoach: true, lettoAt: null },
    }),
    // la v2 apre dalla home, non da /io: l'ultimo accesso si segna anche qui
    segnaAccesso(cliente),
  ]);

  const settimana = righe.map(toGiornata);
  const body: RiassuntoHome = {
    profilo: toProfiloCompleto(cliente),
    oggi,
    giornoOggi: settimana.find((g) => g.data === oggi) ?? null,
    settimana,
    statistiche: stat,
    prossimaPrenotazione: prenotazione,
    abbonamento,
    messaggiNonLetti,
  };
  return NextResponse.json(body);
}
