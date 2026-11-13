// App clienti v2 nel gestionale: rotte, aiuti per ore e stati, e i due
// caricamenti condivisi tra le linguette (prenotazioni e conversazioni).
// Stanno nel contenitore (AppClientiView) cosi' Prenotazioni, Disponibilita',
// Messaggi e la scheda del cliente guardano la stessa lista: annullare un'ora
// in una linguetta la toglie subito anche dalla scheda.
// Contratto delle API in src/lib/app-coaching/tipi-v2.ts.

import { useEffect, useRef, useState } from "react";
import type { ClienteApp, DataISO } from "@/lib/app-coaching/tipi";
import type { Messaggio, PrenotazioneAdmin, StatoPrenotazione, ThreadAdmin } from "@/lib/app-coaching/tipi-v2";
import { aggiungiGiorni, oggiISO } from "@/lib/app-coaching/date";
import { api, dataBreve, testoErrore } from "./comune";

export const API = {
  prenotazioni: "/api/admin/app-prenotazioni",
  disponibilita: "/api/admin/app-disponibilita",
  chiusure: "/api/admin/app-disponibilita/chiusure",
  messaggi: "/api/admin/app-messaggi",
  contratti: "/api/admin/app-contratti",
} as const;

/** Prenotazioni caricate: 14 giorni indietro (le ore da segnare svolte) e 28 avanti. */
export const GIORNI_INDIETRO = 14;
export const GIORNI_AVANTI = 28;

/**
 * ClienteApp con i campi del contratto collegato. Un altro pezzo del lavoro
 * li aggiunge a tipi.ts: qui sono facoltativi, cosi' la scheda compila sia
 * prima sia dopo.
 */
export type ClienteAppV2 = ClienteApp & {
  preventivoId?: string | null;
  contratto?: { numero: string; titolo: string; stato: string } | null;
};

/* ------------------------------------------------------------------- ore */

export const RE_ORA = /^([01]\d|2[0-3]):[0-5]\d$/;

/** "07:30" -> 450 */
export function minuti(o: string): number {
  const [h, m] = o.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** 450 -> "07:30" */
export function ora(min: number): string {
  const m = Math.max(0, Math.min(24 * 60 - 1, Math.round(min)));
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** Il campo type=time su alcuni browser da' anche i secondi. */
export const oraPulita = (s: string) => s.slice(0, 5);

export const GIORNI_LUNGHI = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
export const GIORNI_CORTI = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

/** "oggi", "domani", "ieri" o null. */
export function relativo(d: DataISO, oggi: DataISO): string | null {
  if (d === oggi) return "oggi";
  if (d === aggiungiGiorni(oggi, 1)) return "domani";
  if (d === aggiungiGiorni(oggi, -1)) return "ieri";
  return null;
}

/** Giorno di calendario a Colonia di un momento ISO (createdAt dei messaggi). */
export const giornoDi = (iso: string): DataISO => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : oggiISO(d);
};

/** "14:32", ora di Colonia. */
export function orario(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("it-IT", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit" });
}

/** Quando e' arrivato un messaggio: "14:32" se oggi, "ieri", o "12 nov". */
export function dataOra(iso: string, oggi: DataISO): string {
  const g = giornoDi(iso);
  if (!g) return "";
  if (g === oggi) return orario(iso);
  return relativo(g, oggi) ?? dataBreve(g);
}

/* ------------------------------------------------------------------ stati */

/** Badge Polaris per stato: confermata ok, da pagare attesa, svolta info, annullata neutro. */
export const STATO: Record<StatoPrenotazione, { testo: string; badge: string }> = {
  confermata: { testo: "confermata", badge: "crm-badge-ok" },
  "da pagare": { testo: "da pagare", badge: "crm-badge-attesa" },
  svolta: { testo: "svolta", badge: "crm-badge-info" },
  annullata: { testo: "annullata", badge: "" },
};

/** Le prenotazioni che occupano davvero l'ora. */
export const attiva = (p: { stato: StatoPrenotazione }) => p.stato === "confermata" || p.stato === "da pagare";

export const perOrdine = (a: PrenotazioneAdmin, b: PrenotazioneAdmin) =>
  a.data.localeCompare(b.data) || a.inizio.localeCompare(b.inizio) || a.clienteNome.localeCompare(b.clienteNome, "de");

/**
 * Stato del contratto collegato: arriva o dal Preventivo (inviato, firmato,
 * scaduto, sostituito) o dal riassunto abbonamento (attivo, da firmare...).
 */
export function badgeContratto(stato: string): string {
  const s = stato.toLowerCase();
  if (s === "firmato" || s === "attivo") return "crm-badge-ok";
  if (s === "inviato" || s === "da firmare" || s === "in scadenza") return "crm-badge-attesa";
  if (s === "scaduto") return "crm-badge-errore";
  return "";
}

/* ------------------------------------------------- prenotazioni (lista) */

export type Prenotazioni = {
  lista: PrenotazioneAdmin[];
  oggi: DataISO;
  pronto: boolean;
  caricando: boolean;
  errore: string;
  ricarica: () => void;
  /** aggiunge o sostituisce (dopo POST o PATCH) */
  metti: (p: PrenotazioneAdmin) => void;
};

export function usePrenotazioni(): Prenotazioni {
  const [oggi, setOggi] = useState<DataISO>(() => oggiISO());
  const [lista, setLista] = useState<PrenotazioneAdmin[]>([]);
  const [versione, setVersione] = useState(0);
  const [caricato, setCaricato] = useState(-1);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    let vivo = true;
    // oggi ricalcolato a ogni giro: il gestionale puo' restare aperto oltre mezzanotte
    const o = oggiISO();
    const da = aggiungiGiorni(o, -GIORNI_INDIETRO);
    const a = aggiungiGiorni(o, GIORNI_AVANTI);
    api<{ prenotazioni: PrenotazioneAdmin[] }>(`${API.prenotazioni}?da=${da}&a=${a}`)
      .then((j) => {
        if (!vivo) return;
        setLista(j.prenotazioni ?? []);
        setOggi(o);
        setErrore("");
      })
      .catch((e) => vivo && setErrore(testoErrore(e)))
      .finally(() => vivo && setCaricato(versione));
    return () => {
      vivo = false;
    };
  }, [versione]);

  return {
    lista,
    oggi,
    pronto: caricato >= 0,
    caricando: caricato !== versione,
    errore,
    ricarica: () => setVersione((v) => v + 1),
    metti: (p) => setLista((x) => (x.some((y) => y.id === p.id) ? x.map((y) => (y.id === p.id ? p : y)) : [...x, p])),
  };
}

/* ------------------------------------------------ conversazioni (elenco) */

export type Conversazioni = {
  thread: ThreadAdmin[];
  nonLetti: number;
  pronto: boolean;
  errore: string;
  ricarica: () => void;
  /** conversazione aperta: i suoi non letti vanno a zero subito, badge compresi */
  letti: (clienteId: string) => void;
  /** messaggio appena mandato dal coach: diventa l'ultimo della conversazione */
  inviato: (clienteId: string, m: Messaggio) => void;
};

/** Ogni quanto si guardano i messaggi nuovi mentre «App clienti» e' aperta. */
export const OGNI_MS = 30_000;

/**
 * Elenco delle conversazioni, ricaricato ogni 30 s mentre la scheda e' aperta
 * (e non quando la linguetta del browser e' nascosta). `onNonLetti` porta il
 * totale al badge del menu senza aspettare il giro da 60 s di page.tsx.
 */
export function useConversazioni(onNonLetti?: (n: number) => void): Conversazioni {
  const [thread, setThread] = useState<ThreadAdmin[]>([]);
  const [nonLetti, setNonLetti] = useState(0);
  const [pronto, setPronto] = useState(false);
  const [errore, setErrore] = useState("");
  const [versione, setVersione] = useState(0);
  // l'ultima callback, senza far ripartire il giro quando il padre la ricrea
  const avvisa = useRef(onNonLetti);
  useEffect(() => {
    avvisa.current = onNonLetti;
  });

  useEffect(() => {
    let vivo = true;
    const carica = () => {
      if (document.hidden) return;
      api<{ thread: ThreadAdmin[]; nonLettiTotale: number }>(API.messaggi)
        .then((j) => {
          if (!vivo) return;
          const n = j.nonLettiTotale ?? 0;
          setThread(j.thread ?? []);
          setNonLetti(n);
          setErrore("");
          avvisa.current?.(n);
        })
        .catch((e) => vivo && setErrore(testoErrore(e)))
        .finally(() => vivo && setPronto(true));
    };
    carica();
    const giro = setInterval(carica, OGNI_MS);
    const torna = () => {
      if (!document.hidden) carica();
    };
    document.addEventListener("visibilitychange", torna);
    return () => {
      vivo = false;
      clearInterval(giro);
      document.removeEventListener("visibilitychange", torna);
    };
  }, [versione]);

  function letti(clienteId: string) {
    const t = thread.find((x) => x.clienteId === clienteId);
    if (!t || !t.nonLetti) return;
    const n = Math.max(0, nonLetti - t.nonLetti);
    setThread((x) => x.map((y) => (y.clienteId === clienteId ? { ...y, nonLetti: 0 } : y)));
    setNonLetti(n);
    onNonLetti?.(n);
  }

  function inviato(clienteId: string, m: Messaggio) {
    setThread((x) => x.map((y) => (y.clienteId === clienteId ? { ...y, ultimo: m } : y)));
  }

  return { thread, nonLetti, pronto, errore, ricarica: () => setVersione((v) => v + 1), letti, inviato };
}
