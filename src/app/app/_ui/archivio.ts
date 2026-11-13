// Stato dell'app del cliente, in memoria e condiviso tra le pagine: tornando
// dal giorno al piano o alla home i dati ci sono gia' e si aggiornano in
// sottofondo. Solo per componenti client (usa fetch, localStorage, caches).

import { useSyncExternalStore } from "react";
import type {
  DataISO,
  Giornata,
  Lingua,
  MeseISO,
  ProfiloCliente,
  RispostaCliente,
} from "@/lib/app-coaching/tipi";
import type { ProfiloCompleto, RiassuntoHome } from "@/lib/app-coaching/tipi-v2";
import { aggiungiGiorni, giornoSettimana, meseDi, oggiISO } from "@/lib/app-coaching/date";
import { CACHE_PREFISSO, HEADER_OFFLINE } from "./pwa";

export type StatoProfilo =
  | { tipo: "attesa" }
  | { tipo: "anonimo" }
  | { tipo: "errore" }
  | { tipo: "ok"; profilo: ProfiloCompleto };

export type StatoMese =
  | { tipo: "attesa" }
  | { tipo: "errore" }
  | { tipo: "ok"; giornate: Partial<Record<DataISO, Giornata>> };

export type StatoHome =
  | { tipo: "attesa" }
  | { tipo: "errore" }
  | { tipo: "ok"; dati: RiassuntoHome };

export type VistaPiano = "settimana" | "mese";

export type Archivio = {
  lingua: Lingua;
  /** null finche' non si e' nel browser: la data non va nell'html in cache */
  oggi: DataISO | null;
  profilo: StatoProfilo;
  home: StatoHome;
  mesi: Partial<Record<MeseISO, StatoMese>>;
  /** mese e settimana (lunedi') mostrati nel piano: tornando dal giorno si ritrovano */
  meseVisto: MeseISO | null;
  settimanaVista: DataISO | null;
  vistaPiano: VistaPiano;
  /** l'ultimo dato arrivato dalla copia del service worker, non dalla rete */
  offline: boolean;
};

const INIZIALE: Archivio = {
  lingua: "de",
  oggi: null,
  profilo: { tipo: "attesa" },
  home: { tipo: "attesa" },
  mesi: {},
  meseVisto: null,
  settimanaVista: null,
  vistaPiano: "mese",
  offline: false,
};

let stato: Archivio = INIZIALE;
const ascoltatori = new Set<() => void>();

function imposta(cambia: (s: Archivio) => Archivio) {
  stato = cambia(stato);
  ascoltatori.forEach((f) => f());
}

function iscrivi(f: () => void) {
  ascoltatori.add(f);
  return () => {
    ascoltatori.delete(f);
  };
}

export function useArchivio(): Archivio {
  // sul server e durante l'idratazione lo stato iniziale: niente differenze
  return useSyncExternalStore(iscrivi, () => stato, () => INIZIALE);
}

/** Lunedi' della settimana di un giorno. */
export function lunediDi(data: DataISO): DataISO {
  return aggiungiGiorni(data, -giornoSettimana(data));
}

// ---------------------------------------------------------------- avvio

const CHIAVE_LINGUA = `${CACHE_PREFISSO}lingua`;
const CHIAVE_VISTA = `${CACHE_PREFISSO}vista-piano`;
let avviato = false;
let ultimoAggiornamento = 0;

function aggiorna(forza: boolean) {
  const ora = Date.now();
  // passare da un'app all'altra non deve rifare le richieste ogni volta
  if (!forza && ora - ultimoAggiornamento < 30_000) return;
  ultimoAggiornamento = ora;
  const oggi = oggiISO();
  if (stato.oggi !== oggi) imposta((s) => ({ ...s, oggi }));
  // aperta senza rete e senza copia: si riprova da sola
  if (stato.profilo.tipo === "errore") return void caricaProfilo();
  if (stato.profilo.tipo !== "ok") return;
  void caricaProfilo();
  void caricaHome();
  void caricaMese(meseDi(oggi));
  if (stato.meseVisto) void caricaMese(stato.meseVisto);
}

/** Legge lingua, vista del piano e data del telefono; si puo' chiamare quante volte si vuole. */
export function avvia() {
  if (avviato || typeof window === "undefined") return;
  avviato = true;
  let lingua: Lingua = "de";
  let vistaPiano: VistaPiano = "mese";
  try {
    const salvata = localStorage.getItem(CHIAVE_LINGUA);
    if (salvata === "it" || salvata === "de") lingua = salvata;
    // prima dell'accesso: telefono in italiano, schermata in italiano
    else if (navigator.language?.toLowerCase().startsWith("it")) lingua = "it";
    if (localStorage.getItem(CHIAVE_VISTA) === "settimana") vistaPiano = "settimana";
  } catch {
    // localStorage bloccato (navigazione privata): restano i valori di partenza
  }
  document.documentElement.lang = lingua;
  imposta((s) => ({ ...s, lingua, vistaPiano, oggi: s.oggi ?? oggiISO() }));
  // l'app installata resta aperta in memoria per giorni: quando torna in primo
  // piano o ritrova la rete si aggiornano la data e i dati
  ultimoAggiornamento = Date.now();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") aggiorna(false);
  });
  // tornata la rete: via subito l'avviso offline
  window.addEventListener("online", () => aggiorna(true));
}

function salvaLinguaLocale(lingua: Lingua) {
  try {
    localStorage.setItem(CHIAVE_LINGUA, lingua);
  } catch {
    // niente: la lingua si rilegge dal profilo
  }
  document.documentElement.lang = lingua;
}

/** La v1 di /api/app/io manda solo nome, lingua e obiettivo: i campi nuovi a null. */
function completa(p: ProfiloCliente & Partial<ProfiloCompleto>): ProfiloCompleto {
  return {
    nome: p.nome ?? "",
    lingua: p.lingua === "it" ? "it" : "de",
    obiettivo: p.obiettivo ?? null,
    email: p.email ?? null,
    telefono: p.telefono ?? null,
    clienteDal: p.clienteDal ?? "",
  };
}

function registraProfilo(grezzo: ProfiloCliente & Partial<ProfiloCompleto>, offline: boolean) {
  const profilo = completa(grezzo);
  salvaLinguaLocale(profilo.lingua);
  // l'avviso offline lo spengono home e mesi (sono loro il piano): il profilo
  // fresco non deve nascondere un dato arrivato dalla copia
  imposta((s) => ({
    ...s,
    lingua: profilo.lingua,
    offline: s.offline || offline,
    profilo: { tipo: "ok", profilo },
    home: s.home.tipo === "ok" ? { tipo: "ok", dati: { ...s.home.dati, profilo } } : s.home,
  }));
}

function esciLocale() {
  imposta((s) => ({
    ...s,
    profilo: { tipo: "anonimo" },
    home: { tipo: "attesa" },
    mesi: {},
    meseVisto: null,
    settimanaVista: null,
    offline: false,
  }));
}

function daCache(res: Response) {
  return res.headers.get(HEADER_OFFLINE) === "1";
}

async function erroreDi(res: Response): Promise<string | null> {
  try {
    const j = (await res.json()) as { error?: unknown };
    return typeof j.error === "string" && j.error.trim() ? j.error : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- profilo

let profiloInCorso: Promise<void> | null = null;

export function caricaProfilo(): Promise<void> {
  avvia();
  // dal "riprova" dopo un errore: si torna all'attesa
  if (stato.profilo.tipo === "errore") imposta((s) => ({ ...s, profilo: { tipo: "attesa" } }));
  profiloInCorso ??= (async () => {
    try {
      const res = await fetch("/api/app/io", { cache: "no-store" });
      if (res.status === 401) return esciLocale();
      if (!res.ok) throw new Error(`io ${res.status}`);
      const j = (await res.json()) as { profilo: ProfiloCliente & Partial<ProfiloCompleto> };
      registraProfilo(j.profilo, daCache(res));
    } catch {
      // senza rete e senza copia: se il profilo c'era gia' lo si tiene
      imposta((s) =>
        s.profilo.tipo === "ok"
          ? { ...s, offline: true }
          : { ...s, profilo: { tipo: "errore" } },
      );
    } finally {
      profiloInCorso = null;
    }
  })();
  return profiloInCorso;
}

export type EsitoProfilo = { ok: true } | { ok: false; errore: string | null };

type CampiProfilo = Partial<{ email: string | null; telefono: string | null; lingua: Lingua }>;

/** PATCH /api/app/io: email, telefono, lingua. L'errore del server e' gia' nella lingua del cliente. */
export async function aggiornaProfilo(campi: CampiProfilo): Promise<EsitoProfilo> {
  try {
    const res = await fetch("/api/app/io", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campi),
    });
    if (res.status === 401) {
      esciLocale();
      return { ok: false, errore: null };
    }
    if (!res.ok) return { ok: false, errore: await erroreDi(res) };
    const j = (await res.json()) as { profilo?: ProfiloCliente & Partial<ProfiloCompleto> };
    if (j.profilo) registraProfilo(j.profilo, false);
    return { ok: true };
  } catch {
    return { ok: false, errore: null };
  }
}

/** Cambia subito la lingua a schermo e la salva sul server; se il server dice no, torna com'era. */
export async function cambiaLingua(lingua: Lingua): Promise<boolean> {
  const prima = stato.lingua;
  if (prima === lingua) return true;
  const metti = (l: Lingua) => {
    salvaLinguaLocale(l);
    imposta((s) => ({
      ...s,
      lingua: l,
      profilo: s.profilo.tipo === "ok" ? { tipo: "ok", profilo: { ...s.profilo.profilo, lingua: l } } : s.profilo,
    }));
  };
  metti(lingua);
  const esito = await aggiornaProfilo({ lingua });
  if (!esito.ok) metti(prima);
  return esito.ok;
}

// ---------------------------------------------------------------- home

let homeInCorso: Promise<void> | null = null;

/** GET /api/app/home: una chiamata per tutta la home (e il pallino dei messaggi). */
export function caricaHome(): Promise<void> {
  avvia();
  if (stato.home.tipo === "errore") imposta((s) => ({ ...s, home: { tipo: "attesa" } }));
  homeInCorso ??= (async () => {
    try {
      const res = await fetch("/api/app/home", { cache: "no-store" });
      if (res.status === 401) return esciLocale();
      if (!res.ok) throw new Error(`home ${res.status}`);
      const dati = (await res.json()) as RiassuntoHome;
      const offline = daCache(res);
      const profilo = dati.profilo ? completa(dati.profilo) : null;
      imposta((s) => {
        const p = profilo ?? (s.profilo.tipo === "ok" ? s.profilo.profilo : null);
        return {
          ...s,
          // dalla copia salvata "oggi" e' quello di quando la si e' salvata
          oggi: !offline && dati.oggi ? dati.oggi : (s.oggi ?? oggiISO()),
          offline,
          home: p ? { tipo: "ok", dati: { ...dati, profilo: p } } : { tipo: "ok", dati },
          profilo: p ? { tipo: "ok", profilo: p } : s.profilo,
          lingua: p ? p.lingua : s.lingua,
        };
      });
    } catch {
      imposta((s) =>
        s.home.tipo === "ok" ? { ...s, offline: true } : { ...s, home: { tipo: "errore" } },
      );
    } finally {
      homeInCorso = null;
    }
  })();
  return homeInCorso;
}

/** Aperta la chat del coach: il server segna letti i messaggi, il pallino si spegne subito. */
export function azzeraNonLetti() {
  if (stato.home.tipo !== "ok" || stato.home.dati.messaggiNonLetti === 0) return;
  imposta((s) =>
    s.home.tipo === "ok" ? { ...s, home: { tipo: "ok", dati: { ...s.home.dati, messaggiNonLetti: 0 } } } : s,
  );
}

/**
 * Il giorno come lo sa gia' la home (settimana di oggi), mentre il mese arriva:
 * dalla home il giorno si apre subito. undefined = non si sa ancora; null = la
 * home dice che quel giorno non c'e' un piano.
 */
export function giornataDallaHome(s: Archivio, data: DataISO): Giornata | null | undefined {
  if (s.home.tipo !== "ok") return undefined;
  const { oggi, giornoOggi, settimana } = s.home.dati;
  if (giornoOggi?.data === data) return giornoOggi;
  const g = settimana.find((x) => x.data === data);
  if (g) return g;
  const lun = lunediDi(oggi);
  return data >= lun && data <= aggiungiGiorni(lun, 6) ? null : undefined;
}

// ---------------------------------------------------------------- mesi

const mesiInCorso = new Map<MeseISO, Promise<void>>();

export function caricaMese(mese: MeseISO): Promise<void> {
  avvia();
  const gia = mesiInCorso.get(mese);
  if (gia) return gia;
  const p = (async () => {
    // i dati vecchi restano a schermo mentre arrivano i nuovi
    imposta((s) =>
      s.mesi[mese]?.tipo === "ok"
        ? s
        : { ...s, mesi: { ...s.mesi, [mese]: { tipo: "attesa" } } },
    );
    try {
      const res = await fetch(`/api/app/giornate?mese=${mese}`, { cache: "no-store" });
      if (res.status === 401) return esciLocale();
      if (!res.ok) throw new Error(`giornate ${res.status}`);
      const j = (await res.json()) as { giornate: Giornata[]; oggi: DataISO };
      const giornate: Partial<Record<DataISO, Giornata>> = {};
      for (const g of j.giornate ?? []) giornate[g.data] = g;
      const offline = daCache(res);
      imposta((s) => ({
        ...s,
        oggi: !offline && j.oggi ? j.oggi : (s.oggi ?? oggiISO()),
        offline,
        mesi: { ...s.mesi, [mese]: { tipo: "ok", giornate } },
      }));
    } catch {
      imposta((s) =>
        s.mesi[mese]?.tipo === "ok"
          ? { ...s, offline: true }
          : { ...s, mesi: { ...s.mesi, [mese]: { tipo: "errore" } } },
      );
    } finally {
      mesiInCorso.delete(mese);
    }
  })();
  mesiInCorso.set(mese, p);
  return p;
}

export function impostaMeseVisto(mese: MeseISO) {
  if (stato.meseVisto !== mese) imposta((s) => ({ ...s, meseVisto: mese }));
}

export function impostaSettimanaVista(lunedi: DataISO) {
  if (stato.settimanaVista !== lunedi) imposta((s) => ({ ...s, settimanaVista: lunedi }));
}

export function impostaVistaPiano(vista: VistaPiano) {
  if (stato.vistaPiano === vista) return;
  try {
    localStorage.setItem(CHIAVE_VISTA, vista);
  } catch {
    // resta solo in memoria
  }
  imposta((s) => ({ ...s, vistaPiano: vista }));
}

function aggiornaGiornata(g: Giornata) {
  const mese = meseDi(g.data);
  imposta((s) => {
    const m = s.mesi[mese];
    const giornate = m?.tipo === "ok" ? m.giornate : {};
    let home = s.home;
    // anche la home (card "Heute", settimana) vede subito la spunta
    if (home.tipo === "ok") {
      const d = home.dati;
      home = {
        tipo: "ok",
        dati: {
          ...d,
          giornoOggi: d.giornoOggi?.data === g.data ? g : d.giornoOggi,
          settimana: d.settimana.map((x) => (x.data === g.data ? g : x)),
        },
      };
    }
    return {
      ...s,
      home,
      mesi: { ...s.mesi, [mese]: { tipo: "ok", giornate: { ...giornate, [g.data]: g } } },
    };
  });
}

// ---------------------------------------------------------------- risposta

export type EsitoSalva = "ok" | "rete" | "errore";

export async function salvaRisposta(data: DataISO, r: RispostaCliente): Promise<EsitoSalva> {
  try {
    const res = await fetch(`/api/app/giornate/${data}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r),
    });
    if (res.status === 401) {
      esciLocale();
      return "errore";
    }
    if (!res.ok) return "errore";
    const j = (await res.json()) as { giornata: Giornata };
    if (j.giornata) {
      aggiornaGiornata(j.giornata);
      // serie e conti della settimana li rifa' il server
      void caricaHome();
    }
    return "ok";
  } catch {
    return "rete";
  }
}

// ---------------------------------------------------------------- accesso

export type EsitoAccesso = "ok" | "codice" | "troppi" | "rete" | "errore";

// lo stesso token non parte due volte (StrictMode in sviluppo monta due volte)
const accessiInCorso = new Map<string, Promise<EsitoAccesso>>();

export function accedi(corpo: { codice: string } | { token: string }): Promise<EsitoAccesso> {
  avvia();
  const chiave = JSON.stringify(corpo);
  const gia = accessiInCorso.get(chiave);
  if (gia) return gia;
  const p = (async (): Promise<EsitoAccesso> => {
    try {
      const res = await fetch("/api/app/accesso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });
      if (res.status === 429) return "troppi";
      if (res.status === 400 || res.status === 401 || res.status === 404) return "codice";
      if (!res.ok) return "errore";
      const j = (await res.json()) as { ok?: boolean; profilo?: ProfiloCliente & Partial<ProfiloCompleto> };
      // dati di un eventuale cliente precedente sullo stesso telefono: via
      imposta((s) => ({
        ...s,
        home: { tipo: "attesa" },
        mesi: {},
        meseVisto: null,
        settimanaVista: null,
        offline: false,
      }));
      if (j.profilo) registraProfilo(j.profilo, false);
      else await caricaProfilo();
      return "ok";
    } catch {
      return "rete";
    } finally {
      // un nuovo tentativo col codice deve poter ripartire
      setTimeout(() => accessiInCorso.delete(chiave), 0);
    }
  })();
  accessiInCorso.set(chiave, p);
  return p;
}

export async function esci() {
  try {
    await fetch("/api/app/accesso", { method: "DELETE" });
  } catch {
    // senza rete il cookie resta, ma sul telefono non resta niente a vista
  }
  try {
    // piano e pagine salvate per l'offline: telefono magari condiviso
    const nomi = await caches.keys();
    await Promise.all(
      nomi
        .filter((n) => n.startsWith(CACHE_PREFISSO) && !n.endsWith("-statici"))
        .map((n) => caches.delete(n)),
    );
  } catch {
    // Cache API assente (http in locale): niente da pulire
  }
  esciLocale();
}
