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
  /**
   * Solo contratto a ore. Sta dentro la voce perche' items e' gia' JSON:
   * nessuna colonna nuova nel database.
   * - "ore": le ore pagate. Il cliente sceglie fra `ore`, oppure Angelo le
   *   fissa con `oreFisse`. Alla firma `quantita` diventa le ore scelte e le
   *   crocette restano in `scelte`.
   * - "bonus": ore regalate da Angelo, riga a parte a 0 €.
   * - "gratis": la prima visita, riga a parte a 0 €.
   */
  modulo?: "ore" | "bonus" | "gratis";
  ore?: number[];
  oreFisse?: number;
  scelte?: ScelteOre;
  /** quando Angelo l'ha preparato: da li' la cliente spunta, firma e paga */
  preparato?: string;
}

/* ------------------------------------------------- contratto a ore (PT) */

/** Ore al mese fra cui sceglie il cliente: da 4 a 20, di due in due. */
export const ORE_MESE = [4, 6, 8, 10, 12, 14, 16, 18, 20];
/** Prezzo del volantino: "Personal Training 1-zu-1: 50 € pro Stunde". */
export const PREZZO_ORA = 50;

/** Crocette del contratto a ore. Valori fissi: il server scarta il resto. */
export const OPZIONI_ORE = {
  ziele: ["Muskelaufbau", "Abnehmen", "Fitness & Ausdauer", "Rücken & Haltung", "Beweglichkeit"],
  tage: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  zeiten: ["Morgens (6–10 Uhr)", "Mittags (10–14 Uhr)", "Nachmittags (14–18 Uhr)", "Abends (18–21 Uhr)"],
  orte: ["Im Studio in Köln", "Outdoor in Köln"],
} as const;

export interface ScelteOre {
  ore: number;
  ziele: string[];
  tage: string[];
  zeiten: string[];
  orte: string[];
  /** in salute, eventuali problemi gia' detti ad Angelo */
  gesundheit: boolean;
  /** ha letto e accetta le condizioni */
  bedingungen: boolean;
  /** vuole iniziare prima della fine dei 14 giorni di recesso */
  sofortBeginn: boolean;
  /** data di nascita, facoltativa (AAAA-MM-GG) */
  geburtsdatum?: string;
  /** quando ha messo le crocette (= firma) */
  am?: string;
}

/** Dati della cliente compilati prima del foglio da firmare. */
export interface PersonaOre {
  nome: string;
  strasse: string;
  plzOrt: string;
  geburtsdatum: string;
  telefono: string;
  email: string;
}

export const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Primo campo che manca o non va, null se e' tutto a posto. */
export function erroreArPersona(c: Partial<PersonaOre>, de: boolean): string | null {
  if ((c.nome || "").trim().length < 3) return de ? "Bitte Vor- und Nachname eintragen." : "Inserisci nome e cognome.";
  if ((c.strasse || "").trim().length < 3) return de ? "Bitte Straße und Hausnummer eintragen." : "Inserisci via e numero civico.";
  if ((c.plzOrt || "").trim().length < 4) return de ? "Bitte PLZ und Ort eintragen." : "Inserisci CAP e città.";
  if ((c.telefono || "").replace(/[^\d]/g, "").length < 6) return de ? "Bitte Telefonnummer eintragen." : "Inserisci il telefono.";
  if (!EMAIL_OK.test((c.email || "").trim())) return de ? "Bitte eine gültige E-Mail eintragen." : "Inserisci un'email valida.";
  const g = (c.geburtsdatum || "").trim();
  if (g) {
    const anno = Number(g.slice(0, 4));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(g) || anno < 1900 || anno > new Date().getFullYear())
      return de ? "Bitte das Geburtsdatum prüfen." : "Controlla la data di nascita.";
  }
  return null;
}

/** Circa quante volte a settimana, per aiutare a scegliere. */
export const allaSettimana = (ore: number) => {
  const v = Math.round((ore / 4.33) * 2) / 2;
  return v <= 1 ? "ca. 1× pro Woche" : `ca. ${String(v).replace(".", ",")}× pro Woche`;
};

export const descrizioneOre = (ore?: number) =>
  ore
    ? `Personal Training 1-zu-1 — ${ore} Stunden pro Monat`
    : "Personal Training 1-zu-1 — Stunden pro Monat nach Wahl";

export const descrizioneBonus = (ore: number, ogniMese: boolean) =>
  `Bonusstunden geschenkt — ${ore} ${ore === 1 ? "Stunde" : "Stunden"} ${ogniMese ? "pro Monat" : "im ersten Monat"}`;

export const DESCRIZIONE_GRATIS = "Erstes Treffen: Kennenlernen, Check-up und Probetraining";

/**
 * Voci del contratto a ore.
 * oreFisse: le decide Angelo (il cliente non sceglie); senza, sceglie il
 * cliente fra 4 e 20 e fino alla firma la voce vale il minimo.
 */
export function vociOre(o: { oreFisse?: number; bonusOre?: number; bonusOgniMese?: boolean }): VocePreventivo[] {
  const fisse = o.oreFisse && o.oreFisse > 0 ? Math.round(o.oreFisse) : undefined;
  const voci: VocePreventivo[] = [
    {
      descrizione: descrizioneOre(fisse),
      prezzo: PREZZO_ORA,
      quantita: fisse ?? ORE_MESE[0],
      modulo: "ore",
      ore: ORE_MESE,
      ...(fisse ? { oreFisse: fisse } : {}),
    },
  ];
  const bonus = Math.max(0, Math.round(o.bonusOre || 0));
  if (bonus > 0) {
    voci.push({ descrizione: descrizioneBonus(bonus, o.bonusOgniMese !== false), prezzo: 0, quantita: bonus, modulo: "bonus" });
  }
  voci.push({ descrizione: DESCRIZIONE_GRATIS, prezzo: 0, quantita: 1, modulo: "gratis" });
  return voci;
}

/** La voce delle ore pagate, se il contratto e' a ore. */
export const voceAOre = (items: unknown): VocePreventivo | null =>
  Array.isArray(items) ? (items as VocePreventivo[]).find((v) => v?.modulo === "ore") ?? null : null;

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
  // Volantino: "Personal Training 1-zu-1: 50 € pro Stunde", "Fertige
  // Trainingspläne: 25 €". Le ore si moltiplicano nel preventivo (quantita).
  {
    key: "pt-1to1",
    label: "Personal Training 1-zu-1",
    prezzo: 50,
    mesi: 1,
    periodicita: "una tantum",
    accontoPerc: 100,
    descrizione: "Training im Studio in Köln, Technik, Tempo und Motivation. Preis pro Stunde.",
  },
  {
    key: "trainingsplan",
    label: "Fertiger Trainingsplan",
    prezzo: 25,
    mesi: 1,
    periodicita: "una tantum",
    accontoPerc: 100,
    descrizione: "Als PDF, sofort startklar. Für Anfänger, Fortgeschrittene und Profis.",
  },
];
