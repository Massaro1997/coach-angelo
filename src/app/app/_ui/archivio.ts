// Stato dell'app del cliente, in memoria e condiviso tra le pagine: tornando
// dal giorno al calendario i dati ci sono gia' e si aggiornano in sottofondo.
// Solo per componenti client (usa fetch, localStorage, caches).

import { useSyncExternalStore } from "react";
import type {
  DataISO,
  Giornata,
  Lingua,
  MeseISO,
  ProfiloCliente,
  RispostaCliente,
} from "@/lib/app-coaching/tipi";
import { meseDi, oggiISO } from "@/lib/app-coaching/date";
import { CACHE_PREFISSO, HEADER_OFFLINE } from "./pwa";

export type StatoProfilo =
  | { tipo: "attesa" }
  | { tipo: "anonimo" }
  | { tipo: "errore" }
  | { tipo: "ok"; profilo: ProfiloCliente };

export type StatoMese =
  | { tipo: "attesa" }
  | { tipo: "errore" }
  | { tipo: "ok"; giornate: Partial<Record<DataISO, Giornata>> };

export type Archivio = {
  lingua: Lingua;
  /** null finche' non si e' nel browser: la data non va nell'html in cache */
  oggi: DataISO | null;
  profilo: StatoProfilo;
  mesi: Partial<Record<MeseISO, StatoMese>>;
  /** il mese mostrato nel calendario, cosi' tornando dal giorno si ritrova */
  meseVisto: MeseISO | null;
  /** l'ultimo dato arrivato dalla copia del service worker, non dalla rete */
  offline: boolean;
};

const INIZIALE: Archivio = {
  lingua: "de",
  oggi: null,
  profilo: { tipo: "attesa" },
  mesi: {},
  meseVisto: null,
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

// ---------------------------------------------------------------- avvio

const CHIAVE_LINGUA = `${CACHE_PREFISSO}lingua`;
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
  void caricaMese(meseDi(oggi));
  if (stato.meseVisto) void caricaMese(stato.meseVisto);
}

/** Legge lingua e data del telefono; si puo' chiamare quante volte si vuole. */
export function avvia() {
  if (avviato || typeof window === "undefined") return;
  avviato = true;
  let lingua: Lingua = "de";
  try {
    const salvata = localStorage.getItem(CHIAVE_LINGUA);
    if (salvata === "it" || salvata === "de") lingua = salvata;
    // prima dell'accesso: telefono in italiano, schermata in italiano
    else if (navigator.language?.toLowerCase().startsWith("it")) lingua = "it";
  } catch {
    // localStorage bloccato (navigazione privata): resta il tedesco
  }
  document.documentElement.lang = lingua;
  imposta((s) => ({ ...s, lingua, oggi: s.oggi ?? oggiISO() }));
  // l'app installata resta aperta in memoria per giorni: quando torna in primo
  // piano o ritrova la rete si aggiornano la data e il piano
  ultimoAggiornamento = Date.now();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") aggiorna(false);
  });
  // tornata la rete: via subito l'avviso offline
  window.addEventListener("online", () => aggiorna(true));
}

function registraProfilo(profilo: ProfiloCliente, offline: boolean) {
  const lingua: Lingua = profilo.lingua === "it" ? "it" : "de";
  try {
    localStorage.setItem(CHIAVE_LINGUA, lingua);
  } catch {
    // niente: la lingua si rilegge dal profilo
  }
  document.documentElement.lang = lingua;
  // l'avviso offline lo spengono i mesi (sono loro il piano): il profilo
  // fresco non deve nascondere un mese arrivato dalla copia
  imposta((s) => ({ ...s, lingua, offline: s.offline || offline, profilo: { tipo: "ok", profilo } }));
}

function esciLocale() {
  imposta((s) => ({
    ...s,
    profilo: { tipo: "anonimo" },
    mesi: {},
    meseVisto: null,
    offline: false,
  }));
}

function daCache(res: Response) {
  return res.headers.get(HEADER_OFFLINE) === "1";
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
      const j = (await res.json()) as { profilo: ProfiloCliente };
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
        // dalla copia salvata "oggi" e' quello di quando la si e' salvata
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

function aggiornaGiornata(g: Giornata) {
  const mese = meseDi(g.data);
  imposta((s) => {
    const m = s.mesi[mese];
    const giornate = m?.tipo === "ok" ? m.giornate : {};
    return {
      ...s,
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
    if (j.giornata) aggiornaGiornata(j.giornata);
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
      const j = (await res.json()) as { ok?: boolean; profilo?: ProfiloCliente };
      // dati di un eventuale cliente precedente sullo stesso telefono: via
      imposta((s) => ({ ...s, mesi: {}, meseVisto: null, offline: false }));
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
