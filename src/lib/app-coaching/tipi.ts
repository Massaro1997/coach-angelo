// App clienti (dal 12/11/2026): tipi condivisi tra API, app del cliente (/app)
// e scheda del gestionale (/admin#app). Tutto quello che passa tra client e
// server ha la forma scritta qui: chi cambia un campo lo cambia qui.
//
// Allenamento e alimentazione stanno in colonne Json di AppGiornata: niente
// tabelle per esercizi e pasti, cosi' il coach scrive liberamente e il
// prodotto white label non ha bisogno di migrazioni per ogni campo nuovo.

/** Giorno di calendario a Colonia, "YYYY-MM-DD". */
export type DataISO = string;

/** Mese, "YYYY-MM". */
export type MeseISO = string;

export type Lingua = "de" | "it";

export type Esercizio = {
  id: string; // id locale (crypto.randomUUID), serve solo alle liste in React
  nome: string; // "Kniebeuge"
  serie?: string; // "4"
  ripetizioni?: string; // "8-10"
  carico?: string; // "60 kg", "RPE 8", "Körpergewicht"
  pausa?: string; // "90 s"
  note?: string;
  video?: string; // link YouTube / Instagram / Drive
};

export type Allenamento = {
  titolo?: string; // "Oberkörper A"
  durata?: string; // "60 min"
  esercizi: Esercizio[];
  note?: string;
};

export type VocePasto = {
  id: string;
  testo: string; // "Haferflocken"
  quantita?: string; // "80 g"
};

export type Pasto = {
  id: string;
  nome: string; // "Frühstück"
  orario?: string; // "07:30"
  voci: VocePasto[];
  kcal?: number;
  note?: string;
};

export type Alimentazione = {
  // obiettivi del giorno (facoltativi)
  kcal?: number;
  proteine?: number; // g
  carboidrati?: number; // g
  grassi?: number; // g
  acqua?: string; // "3 l"
  pasti: Pasto[];
  note?: string;
};

/** Quello che il coach scrive per un giorno. */
export type PianoGiorno = {
  riposo: boolean;
  allenamento: Allenamento | null;
  alimentazione: Alimentazione | null;
  notaCoach: string | null;
};

/** Quello che il cliente risponde per un giorno. */
export type RispostaCliente = {
  fatto: boolean;
  fatica: number | null; // 1-5
  feedback: string | null;
};

/** Un giorno come lo vedono app e gestionale. */
export type Giornata = PianoGiorno &
  RispostaCliente & {
    data: DataISO;
    fattoAt: string | null; // ISO
    aggiornatoAt: string; // ISO
  };

/** Il cliente come lo vede se stesso nell'app. */
export type ProfiloCliente = {
  nome: string;
  lingua: Lingua;
  obiettivo: string | null;
};

/** Il cliente come lo vede il coach nel gestionale. */
export type ClienteApp = {
  id: string;
  nome: string;
  email: string | null;
  telefono: string | null;
  lingua: Lingua;
  obiettivo: string | null;
  note: string | null;
  codice: string; // 8 cifre
  linkAccesso: string; // https://www.fitprimo.de/app/entra/<token>
  attivo: boolean;
  ultimoAccesso: string | null;
  createdAt: string;
  // riassunto per la lista
  giorniPianificati: number; // giornate da oggi in avanti
  ultimoGiornoPianificato: DataISO | null;
  ultimoFatto: DataISO | null;
  // contratto FitPrimo collegato (v2); stato = quello visto dal cliente
  // (attivo, da firmare, in scadenza, concluso)
  preventivoId: string | null;
  contratto: { numero: string; titolo: string; stato: string } | null;
};

/* ------------------------------------------------------------------ API

Cliente (cookie fp_app, vedi sessione.ts):
  POST   /api/app/accesso            body {codice} | {token}  -> {ok, profilo}
  DELETE /api/app/accesso                                      -> {ok}
  GET    /api/app/io                                           -> {profilo: ProfiloCliente}
  GET    /api/app/giornate?mese=YYYY-MM                        -> {giornate: Giornata[], oggi: DataISO}
  PUT    /api/app/giornate/[data]    body RispostaCliente      -> {giornata: Giornata}

Gestionale (cookie admin, requireAdmin):
  GET    /api/admin/app-clienti                                -> {clienti: ClienteApp[]}
  POST   /api/admin/app-clienti      body {nome, email?, telefono?, lingua?, obiettivo?, note?}
                                                               -> {cliente: ClienteApp}
  PATCH  /api/admin/app-clienti/[id] body Partial<{nome,email,telefono,lingua,obiettivo,note,attivo,preventivoId}>
                                     | {nuovoCodice: true}     -> {cliente: ClienteApp}
  DELETE /api/admin/app-clienti/[id]                           -> {ok}
  GET    /api/admin/app-clienti/[id]/giornate?mese=YYYY-MM     -> {giornate: Giornata[], oggi: DataISO}
  PUT    /api/admin/app-clienti/[id]/giornate/[data] body PianoGiorno -> {giornata: Giornata}
  DELETE /api/admin/app-clienti/[id]/giornate/[data]           -> {ok}
  POST   /api/admin/app-clienti/[id]/copia
         body {da: DataISO, a: DataISO, verso: DataISO, sovrascrivi?: boolean}
         copia il piano dei giorni da..a (compresi) a partire da `verso`,
         stesso numero di giorni; la risposta del cliente non si copia.
                                                               -> {copiate: number, saltate: number}

Errori: {error: string} con 400/401/404/429.
------------------------------------------------------------------------ */

export const PIANO_VUOTO: PianoGiorno = {
  riposo: false,
  allenamento: null,
  alimentazione: null,
  notaCoach: null,
};
