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
  descrizione: string;
}

export interface VocePreventivo {
  descrizione: string;
  prezzo: number;
  quantita: number;
}

/** Pacchetti, gli stessi gia' venduti dal generatore contratti su /contratti. */
export const LISTINO: VoceListino[] = [
  {
    key: "pt-1to1",
    label: "Personal Training 1-zu-1",
    prezzo: 150,
    mesi: 1,
    periodicita: "mensile",
    descrizione: "Training im Studio, Technik-Korrektur, Plan mit Progression.",
  },
  {
    key: "online-3",
    label: "Online-Coaching 3 Monate",
    prezzo: 150,
    mesi: 3,
    periodicita: "mensile",
    descrizione: "Trainingsplan per App, wöchentliche Check-ins, Ernährungssteuerung.",
  },
  {
    key: "online-6",
    label: "Online-Coaching 6 Monate",
    prezzo: 150,
    mesi: 6,
    periodicita: "mensile",
    descrizione: "Trainingsplan per App, wöchentliche Check-ins, Ernährungssteuerung.",
  },
  {
    key: "online-12",
    label: "Online-Coaching 12 Monate",
    prezzo: 150,
    mesi: 12,
    periodicita: "mensile",
    descrizione: "Trainingsplan per App, wöchentliche Check-ins, Ernährungssteuerung.",
  },
  {
    key: "trainingsplan",
    label: "Individueller Trainingsplan",
    prezzo: 150,
    mesi: 1,
    periodicita: "una tantum",
    descrizione: "Einmaliger Trainingsplan, auf dich abgestimmt.",
  },
];
