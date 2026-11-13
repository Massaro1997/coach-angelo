// App clienti v2 (13/11/2026): home, barra in basso, progressi, coach con
// messaggi, shop (abbonamento, rate, rinnovo, ore extra) e prenotazione delle
// ore 1:1 nei buchi liberi del coach. Tipi e rotte condivisi tra API, app del
// cliente e gestionale: chi cambia un campo lo cambia qui.
//
// I tipi della v1 (Giornata, PianoGiorno, ProfiloCliente, ClienteApp...) restano
// in tipi.ts.

import type { DataISO, Giornata, Lingua } from "./tipi";

/** "07:00" */
export type Ora = string;

/* ---------------------------------------------------------------- profilo */

export type ProfiloCompleto = {
  nome: string;
  lingua: Lingua;
  obiettivo: string | null;
  email: string | null;
  telefono: string | null;
  clienteDal: string; // ISO, createdAt
};

/* ------------------------------------------------------------------- home */

export type Statistiche = {
  serie: number; // giorni di allenamento pianificati fatti di fila, fino a oggi
  settimanaFatti: number; // allenamenti fatti questa settimana (lun-dom)
  settimanaPianificati: number; // allenamenti pianificati questa settimana
  meseFatti: number;
  mesePianificati: number;
};

export type RiassuntoHome = {
  profilo: ProfiloCompleto;
  oggi: DataISO;
  giornoOggi: Giornata | null;
  settimana: Giornata[]; // lun-dom della settimana di oggi (solo i giorni con piano)
  statistiche: Statistiche;
  prossimaPrenotazione: Prenotazione | null;
  abbonamento: RiassuntoAbbonamento | null; // null = nessun contratto collegato
  messaggiNonLetti: number; // messaggi del coach non ancora letti
};

/* -------------------------------------------------------------- progressi */

export type SettimanaProgressi = {
  lunedi: DataISO;
  pianificati: number; // giorni di allenamento pianificati (non riposo)
  fatti: number;
};

export type Misura = {
  id: string;
  data: DataISO;
  peso: number | null;
  vita: number | null;
  fianchi: number | null;
  petto: number | null;
  braccio: number | null;
  coscia: number | null;
  grasso: number | null;
  nota: string | null;
};

export type NuovaMisura = Omit<Misura, "id">;

export type Progressi = {
  statistiche: Statistiche;
  settimane: SettimanaProgressi[]; // ultime 12, dalla piu' vecchia
  totaleFatti: number; // da sempre
  faticaMedia: number | null; // ultime 4 settimane, 1-5
  oreSvolte: number; // prenotazioni 1:1 svolte o passate e confermate
  misure: Misura[]; // dalla piu' vecchia
};

/* -------------------------------------------------------------- messaggi */

export type Messaggio = {
  id: string;
  daCoach: boolean;
  testo: string;
  createdAt: string; // ISO
  letto: boolean; // per il cliente: letto da lui (messaggi del coach); per il coach: letto dal coach
};

export type ThreadAdmin = {
  clienteId: string;
  nome: string;
  ultimo: Messaggio | null;
  nonLetti: number; // messaggi del cliente non letti dal coach
};

/* ----------------------------------------------------------- prenotazioni */

export type StatoPrenotazione = "confermata" | "da pagare" | "svolta" | "annullata";

export type Prenotazione = {
  id: string;
  data: DataISO;
  inizio: Ora;
  fine: Ora;
  luogo: string | null;
  tipo: "inclusa" | "extra";
  stato: StatoPrenotazione;
  linkPagamento: string | null; // /pagamento/<token> se stato "da pagare"
  annullabile: boolean; // il cliente puo' ancora annullarla (>= 24 h prima)
  nota: string | null;
};

export type SlotLibero = {
  data: DataISO;
  inizio: Ora;
  fine: Ora;
  luogo: string | null;
};

export type DisponibilitaCliente = {
  giorni: { data: DataISO; slot: SlotLibero[] }[]; // prossimi 28 giorni, solo giorni con slot
  ore: OreCliente;
};

export type OreCliente = {
  inclusePerMese: number; // dal contratto (ore del contratto a ore + bonus mensili); 0 senza contratto
  usateQuestoMese: number;
  restantiQuestoMese: number;
  creditoExtra: number; // ore extra pagate e non ancora usate
  prezzoOra: number; // 50
};

/** Risposta di POST prenota: o confermata subito, o da pagare (link alla cassa). */
export type EsitoPrenotazione = {
  prenotazione: Prenotazione;
  linkPagamento: string | null;
};

/* ------------------------------------------------------------------ shop */

export type RataCliente = {
  descrizione: string;
  importo: number;
  scadenza: string | null; // ISO
  stato: "aperto" | "in corso" | "pagato" | "annullato";
  pagatoAt: string | null;
  link: string | null; // /pagamento/<token> se si puo' pagare ora
};

export type RiassuntoAbbonamento = {
  numero: string; // P-2026-001
  titolo: string; // pacchetto in chiaro
  stato: "attivo" | "da firmare" | "in scadenza" | "concluso";
  periodicita: "mensile" | "una tantum";
  mesi: number;
  importoMese: number | null; // per i mensili
  inizio: string | null; // ISO
  fine: string | null; // ISO, se ha una durata
  aTempoIndeterminato: boolean; // contratto a ore: si rinnova da solo
  prossimaRata: RataCliente | null;
  rate: RataCliente[];
  linkContratto: string; // /preventivo/<token>
  rinnovabile: boolean;
};

export type PacchettoShop = {
  key: string; // "ore-1", "ore-4", o una key del LISTINO
  titolo: string;
  descrizione: string;
  prezzo: number; // totale
  ore: number | null; // ore extra che aggiunge
  tipo: "ore-extra" | "nuovo-contratto";
};

export type Shop = {
  abbonamento: RiassuntoAbbonamento | null;
  ore: OreCliente;
  pacchetti: PacchettoShop[];
  acquistiInSospeso: RataCliente[]; // ore extra comprate e non ancora pagate
};

/* --------------------------------------------------------- admin v2 */

export type SlotAdmin = {
  id: string;
  giorno: number; // 0 = lunedi'
  inizio: Ora;
  fine: Ora;
  luogo: string | null;
  attivo: boolean;
};

export type Chiusura = { id: string; data: DataISO; nota: string | null };

export type PrenotazioneAdmin = Prenotazione & {
  clienteId: string;
  clienteNome: string;
  createdAt: string;
};

export type ContrattoCollegabile = {
  id: string;
  numero: string;
  clienteNome: string;
  clienteEmail: string | null;
  stato: string;
  titolo: string;
};

/* ------------------------------------------------------------------- API

Cliente (cookie fp_app, richiediCliente):
  GET    /api/app/home                               -> RiassuntoHome
  GET    /api/app/io                                 -> {profilo: ProfiloCompleto}     (estende la v1)
  PATCH  /api/app/io        body Partial<{email, telefono, lingua}> -> {profilo: ProfiloCompleto}
  GET    /api/app/progressi                          -> Progressi
  POST   /api/app/misure    body NuovaMisura          -> {misura: Misura}
  DELETE /api/app/misure/[id]                        -> {ok}
  GET    /api/app/messaggi                           -> {messaggi: Messaggio[]}  (segna letti quelli del coach)
  POST   /api/app/messaggi  body {testo}              -> {messaggio: Messaggio}
  GET    /api/app/prenotazioni                       -> {prossime: Prenotazione[], passate: Prenotazione[]}
  GET    /api/app/prenotazioni/disponibili           -> DisponibilitaCliente
  POST   /api/app/prenotazioni body {data, inizio}   -> EsitoPrenotazione
         regole: da adesso+12 h a +28 giorni; ora inclusa se restano ore del
         mese, altrimenti credito extra, altrimenti "da pagare" con Pagamento
         da 50 € (tenuta 30 minuti, poi scade); 409 se l'ora e' gia' presa.
  DELETE /api/app/prenotazioni/[id]                  -> {ok}   (solo >= 24 h prima, 409 altrimenti)
  GET    /api/app/shop                               -> Shop
  POST   /api/app/shop/ore  body {key: "ore-1"|"ore-4"} -> {link: string}   (/pagamento/<token>)
  POST   /api/app/shop/rinnovo                       -> {link: string}   (/preventivo/<token> da firmare)
  POST   /api/app/shop/nuovo body {key}               -> {link: string}   (contratto nuovo dal LISTINO, chi non ne ha)

Gestionale (cookie admin, requireAdmin):
  GET    /api/admin/app-disponibilita                -> {slot: SlotAdmin[], chiusure: Chiusura[]}
  PUT    /api/admin/app-disponibilita body {slot: Omit<SlotAdmin,"id">[]} -> {slot: SlotAdmin[]}
  POST   /api/admin/app-disponibilita/chiusure body {data, nota?} -> {chiusura: Chiusura}
  DELETE /api/admin/app-disponibilita/chiusure/[id] -> {ok}
  GET    /api/admin/app-prenotazioni?da=YYYY-MM-DD&a=YYYY-MM-DD -> {prenotazioni: PrenotazioneAdmin[]}
  POST   /api/admin/app-prenotazioni body {clienteId, data, inizio, fine?, luogo?, tipo?} -> {prenotazione}
  PATCH  /api/admin/app-prenotazioni/[id] body {stato} -> {prenotazione: PrenotazioneAdmin}
  GET    /api/admin/app-messaggi                     -> {thread: ThreadAdmin[], nonLettiTotale: number}
  GET    /api/admin/app-clienti/[id]/messaggi        -> {messaggi: Messaggio[]}  (segna letti quelli del cliente)
  POST   /api/admin/app-clienti/[id]/messaggi body {testo} -> {messaggio: Messaggio}
  GET    /api/admin/app-clienti/[id]/misure          -> {misure: Misura[]}
  GET    /api/admin/app-contratti                    -> {contratti: ContrattoCollegabile[]}
  PATCH  /api/admin/app-clienti/[id] accetta anche {preventivoId: string | null}

Errori: {error: string} con 400/401/404/409/429. Messaggi per il cliente in
tedesco o italiano secondo la lingua del cliente.
------------------------------------------------------------------------ */
