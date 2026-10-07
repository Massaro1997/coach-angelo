// Catalogo e tipi del preventivo, senza dipendenze server.
// Sta separato da lib/preventivo.ts perche' quello importa Prisma e non puo'
// finire nel bundle di una pagina client.

export interface VoceListino {
  key: string;
  label: string;
  /** Importo mensile in euro, oppure prezzo pieno se una tantum. */
  prezzo: number;
  mesi: number;
  periodicita: "mensile" | "una tantum";
  /** Solo una tantum: 100 = tutto alla firma. */
  accontoPerc?: number;
  descrizione: string;
}

export interface VocePreventivo {
  descrizione: string;
  prezzo: number;
  quantita: number;
}

const COACHING = "Individueller Trainingsplan, Ernährungsplan, wöchentliche Check-ins, WhatsApp-Support.";

/**
 * Rata mensile di un pacchetto: il prezzo del volantino diviso i mesi,
 * uguale ogni mese, arrotondata per difetto al centesimo. L'abbonamento
 * addebita sempre la stessa cifra e il cliente non paga mai piu' del prezzo
 * stampato (850 € in 6 mesi = 6 x 141,66 € = 849,96 €).
 */
const rata = (totale: number, mesi: number) => Math.floor((totale * 100) / mesi) / 100;

/**
 * Pacchetti, coi prezzi del volantino stampato e della pagina prezzi
 * (components/Prezzi.tsx): 3 mesi 450 €, 6 mesi 850 €, 12 mesi 1.500 €.
 * Il volantino non si ristampa: comanda lui. A rate il cliente paga il primo
 * mese alla firma, il resto viene addebitato ogni mese in automatico.
 */
export const LISTINO: VoceListino[] = [
  {
    key: "coaching-3",
    label: "Coaching 3 Monate",
    prezzo: rata(450, 3),
    mesi: 3,
    periodicita: "mensile",
    descrizione: COACHING,
  },
  {
    key: "coaching-6",
    label: "Coaching 6 Monate",
    prezzo: rata(850, 6),
    mesi: 6,
    periodicita: "mensile",
    descrizione: COACHING,
  },
  {
    key: "coaching-6-einmal",
    label: "Coaching 6 Monate (Einmalzahlung)",
    prezzo: 850,
    mesi: 6,
    periodicita: "una tantum",
    accontoPerc: 100,
    descrizione: COACHING,
  },
  {
    key: "coaching-12",
    label: "Coaching 12 Monate",
    prezzo: rata(1500, 12),
    mesi: 12,
    periodicita: "mensile",
    descrizione: COACHING,
  },
  {
    key: "coaching-12-einmal",
    label: "Coaching 12 Monate (Einmalzahlung)",
    prezzo: 1500,
    mesi: 12,
    periodicita: "una tantum",
    accontoPerc: 100,
    descrizione: COACHING,
  },
  {
    key: "pt-1to1",
    label: "Personal Training 1-zu-1",
    prezzo: 150,
    mesi: 1,
    periodicita: "mensile",
    descrizione: "Training im Studio, Technik-Korrektur, Plan mit Progression. Monatlich, bis auf Widerruf.",
  },
  {
    key: "trainingsplan",
    label: "Individueller Trainingsplan",
    prezzo: 150,
    mesi: 1,
    periodicita: "una tantum",
    accontoPerc: 100,
    descrizione: "Einmaliger Trainingsplan, auf dich abgestimmt.",
  },
];
