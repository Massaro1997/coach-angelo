// Commissione DirezioneX, solo per i clienti arrivati online, cioe' con un
// lead del sito (Google, ChatGPT, social, diretto: qualunque canale online).
// I clienti che Angelo trova da solo non pagano commissione.
// - Coaching a mesi: 50 € per ogni mese di contratto (Calogero, 07/10/2026).
//   Totale = 50 € x mesi; maturata = 50 € x mesi gia' iniziati.
// - Personal Training a ore: 20% di quanto pagato (contratto di cooperazione,
//   deciso il 03/10/2026).
// - Schede pronte: niente.

import type { Cliente } from "@/app/api/admin/clienti/route";

export const COMMISSIONE_MESE = 50;
const QUOTA_ORE = 0.2;

export interface Commissione {
  regola: string;
  totale: number | null;
  maturata: number;
  mesi: number | null;
}

export function commissione(c: Cliente, ora: number): Commissione | null {
  if (!c.lead) return null;
  const p = c.pacchetto.toLowerCase();
  if (p.includes("trainingsplan") || p.includes("scheda")) return null;
  if (p.includes("personal training") && !c.mensile) {
    const t = Math.round(c.totale * QUOTA_ORE * 100) / 100;
    const pagato = c.incassato ?? (c.fonte === "contratto" ? c.totale : 0);
    return { regola: "20% delle ore", totale: t, maturata: Math.round(pagato * QUOTA_ORE * 100) / 100, mesi: null };
  }
  const mesi = c.fine ? c.mesi : null; // senza fine: canone aperto
  let iniziati = 0;
  if (c.inizio && !c.inAttesa) {
    const d = new Date(c.inizio);
    while (d.getTime() <= ora && (mesi == null || iniziati < mesi)) {
      iniziati++;
      d.setMonth(d.getMonth() + 1);
    }
  }
  return {
    regola: "50 € al mese",
    totale: mesi != null ? mesi * COMMISSIONE_MESE : null,
    maturata: iniziati * COMMISSIONE_MESE,
    mesi,
  };
}
