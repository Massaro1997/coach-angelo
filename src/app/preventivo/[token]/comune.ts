// Pezzi comuni alla pagina del contratto normale e a quella a ore.

import type { VocePreventivo } from "@/lib/preventivo-listino";

export type Voce = VocePreventivo;
export interface Articolo { titolo: string; testo: string }

export interface Dati {
  numero: string;
  clienteNome: string;
  clienteEmail: string | null;
  clienteTelefono: string | null;
  clienteIndirizzo: string | null;
  clientePiva: string | null;
  oggetto: string | null;
  premesse: string | null;
  items: Voce[];
  totale: number;
  periodicita: string;
  mesi: number;
  importoNota: string | null;
  articoli: Articolo[] | null;
  lingua: string;
  stato: string;
  validoFino: string | null;
  firmatoNome: string | null;
  firmatoAt: string | null;
  createdAt: string;
  scaduto: boolean;
  pagamento: { token: string; importo: number; descrizione: string } | null;
  /** chi guarda e' Angelo, entrato nell'admin */
  admin?: boolean;
}

export const eur = (n: number) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

/** Stampa pulita in A4: niente sfondo grigio, niente bottoni. */
export const STAMPA_A4 = `@page { size: A4; margin: 14mm; } @media print { * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`;

/**
 * Dopo la firma: dritti alla cassa. Se il checkout non parte (Stripe non
 * attivo) resta il pulsante verso /pagamento. Restituisce il token della
 * rata se bisogna mostrare il pulsante, null se si e' gia' partiti.
 */
export async function vaiAllaCassa(pagTok: string): Promise<string | null> {
  if (pagTok) {
    try {
      const r = await fetch(`/api/pagamento/${pagTok}`, { method: "POST" });
      const c = await r.json();
      if (r.ok && c.url) {
        window.location.href = c.url;
        return null;
      }
    } catch {
      // si ripiega sul pulsante
    }
  }
  return pagTok;
}

