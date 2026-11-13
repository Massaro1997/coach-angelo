// App v2: numeri dell'attivita' del cliente (home e sezione Fortschritt).
// Solo server. Si contano solo gli allenamenti "pianificati": giornate con un
// allenamento scritto dal coach e non segnate come riposo. Un giorno con solo
// l'alimentazione o solo una nota non e' un allenamento saltato.

import { Prisma } from "@prisma/client";
import type { AppCliente } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { aggiungiGiorni, giornoSettimana, giorniTra, limitiMese, meseDi, oggiISO } from "./date";
import { oreSvolte } from "./prenotazioni";
import { toMisura } from "./serializza-v2";
import type { DataISO } from "./tipi";
import type { Misura, Progressi, SettimanaProgressi, Statistiche } from "./tipi-v2";

const SETTIMANE_PROGRESSI = 12;
const GIORNI_FATICA = 28;
// tetto di sicurezza sulla lista misure (una a settimana = 19 anni)
const MAX_MISURE = 1000;

/** Allenamento pianificato. AnyNull: l'allenamento vuoto e' NULL SQL (jsonDb), ma anche un json null non conta. */
const PIANIFICATO = {
  riposo: false,
  NOT: { allenamento: { equals: Prisma.AnyNull } },
} satisfies Prisma.AppGiornataWhereInput;

type GiornoPianificato = { data: DataISO; fatto: boolean; fatica: number | null };

// Tutta la storia, ma solo tre colonne: anche due anni di piani sono poche
// centinaia di righe, e la serie puo' andare indietro senza limite.
function caricaPianificati(clienteId: string): Promise<GiornoPianificato[]> {
  return prisma.appGiornata.findMany({
    where: { clienteId, ...PIANIFICATO },
    select: { data: true, fatto: true, fatica: true },
    orderBy: { data: "asc" },
  });
}

/** Lunedi' della settimana di `data`. */
export function lunediDi(data: DataISO): DataISO {
  return aggiungiGiorni(data, -giornoSettimana(data));
}

/** `righe` in ordine di data crescente. */
function calcolaStatistiche(righe: GiornoPianificato[], oggi: DataISO): Statistiche {
  const lunedi = lunediDi(oggi);
  const domenica = aggiungiGiorni(lunedi, 6);
  const { primo, ultimo } = limitiMese(meseDi(oggi));

  const s: Statistiche = {
    serie: 0,
    settimanaFatti: 0,
    settimanaPianificati: 0,
    meseFatti: 0,
    mesePianificati: 0,
  };
  // le date sono testo YYYY-MM-DD: il confronto tra stringhe e' quello giusto
  for (const g of righe) {
    if (g.data >= lunedi && g.data <= domenica) {
      s.settimanaPianificati++;
      if (g.fatto) s.settimanaFatti++;
    }
    if (g.data >= primo && g.data <= ultimo) {
      s.mesePianificati++;
      if (g.fatto) s.meseFatti++;
    }
  }

  // Serie: indietro da oggi. Oggi non ancora fatto non la rompe (la giornata
  // non e' finita); i giorni senza allenamento non sono in `righe`, quindi non
  // la interrompono.
  for (let i = righe.length - 1; i >= 0; i--) {
    const g = righe[i];
    if (g.data > oggi) continue;
    if (g.fatto) s.serie++;
    else if (g.data === oggi) continue;
    else break;
  }
  return s;
}

/** Serie, settimana (lun-dom) e mese di oggi. */
export async function statistiche(clienteId: string, oggi: DataISO): Promise<Statistiche> {
  return calcolaStatistiche(await caricaPianificati(clienteId), oggi);
}

/** Misure del cliente dalla piu' vecchia (anche per il gestionale). */
export async function caricaMisure(clienteId: string): Promise<Misura[]> {
  // le piu' recenti, poi al contrario: se mai si arriva al tetto si perdono le vecchie
  const righe = await prisma.appMisura.findMany({
    where: { clienteId },
    orderBy: [{ data: "desc" }, { createdAt: "desc" }],
    take: MAX_MISURE,
  });
  return righe.reverse().map(toMisura);
}

export async function progressi(cliente: AppCliente): Promise<Progressi> {
  const oggi = oggiISO();
  const [righe, ore, misure] = await Promise.all([
    caricaPianificati(cliente.id),
    oreSvolte(cliente.id),
    caricaMisure(cliente.id),
  ]);

  // ultime 12 settimane, la corrente compresa (anche i suoi giorni futuri)
  const lunediOggi = lunediDi(oggi);
  const settimane: SettimanaProgressi[] = Array.from({ length: SETTIMANE_PROGRESSI }, (_, i) => ({
    lunedi: aggiungiGiorni(lunediOggi, -7 * (SETTIMANE_PROGRESSI - 1 - i)),
    pianificati: 0,
    fatti: 0,
  }));
  const inizio = settimane[0].lunedi;
  const fine = aggiungiGiorni(lunediOggi, 6);
  const daFatica = aggiungiGiorni(oggi, -(GIORNI_FATICA - 1));

  let totaleFatti = 0;
  let sommaFatica = 0;
  let nFatica = 0;
  for (const g of righe) {
    if (g.fatto) totaleFatti++;
    if (g.data >= inizio && g.data <= fine) {
      const w = settimane[Math.floor(giorniTra(inizio, g.data) / 7)];
      w.pianificati++;
      if (g.fatto) w.fatti++;
    }
    if (g.fatto && g.fatica !== null && g.data >= daFatica && g.data <= oggi) {
      sommaFatica += g.fatica;
      nFatica++;
    }
  }

  return {
    statistiche: calcolaStatistiche(righe, oggi),
    settimane,
    totaleFatti,
    faticaMedia: nFatica ? Math.round((sommaFatica / nFatica) * 10) / 10 : null,
    oreSvolte: ore,
    misure,
  };
}

/* --------------------------------------------------------- ultimo accesso */

// Il cookie dura 180 giorni: senza questo "ultimo accesso" nel gestionale
// resterebbe fermo al primo login. Al massimo una scrittura l'ora.
const AGGIORNA_ACCESSO_MS = 60 * 60 * 1000;

/** Da chiamare dove l'app entra all'apertura (io in v1, home in v2). Non fallisce mai. */
export async function segnaAccesso(c: Pick<AppCliente, "id" | "ultimoAccesso">): Promise<void> {
  const ultimo = c.ultimoAccesso?.getTime() ?? 0;
  if (Date.now() - ultimo <= AGGIORNA_ACCESSO_MS) return;
  await prisma.appCliente
    .update({ where: { id: c.id }, data: { ultimoAccesso: new Date() } })
    .then(() => undefined)
    .catch(() => undefined); // non vale un errore per il cliente
}
