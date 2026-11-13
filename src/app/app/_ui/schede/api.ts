// Chiamate alle API cliente dalle schede Fortschritt, Shop e Coach.
// useApi tiene in memoria l'ultima risposta di ogni rotta: tornando su una
// scheda i dati sono subito a schermo e si aggiornano in sottofondo (cambiare
// sezione dalla barra non deve mostrare ogni volta lo scheletro grigio).

import { useCallback, useEffect, useEffectEvent, useState } from "react";
import { caricaProfilo, useArchivio } from "../archivio";

// la memoria vale per un cliente solo: telefono condiviso, altro accesso = niente dati vecchi
const memoria = new Map<string, { chi: string; dati: unknown }>();

export type Risposta<T> = { ok: true; dati: T } | { ok: false; stato: number; errore: string | null };

export async function chiama<T>(
  url: string,
  opzioni: { metodo?: "GET" | "POST" | "DELETE"; corpo?: unknown } = {},
): Promise<Risposta<T>> {
  const conCorpo = opzioni.corpo !== undefined;
  let res: Response;
  try {
    res = await fetch(url, {
      method: opzioni.metodo ?? "GET",
      cache: "no-store",
      headers: conCorpo ? { "Content-Type": "application/json" } : undefined,
      body: conCorpo ? JSON.stringify(opzioni.corpo) : undefined,
    });
  } catch {
    return { ok: false, stato: 0, errore: null };
  }
  if (res.status === 401) {
    memoria.clear();
    // sessione scaduta: l'archivio se ne accorge e l'app torna all'ingresso
    void caricaProfilo();
  }
  let corpo: unknown = null;
  try {
    corpo = await res.json();
  } catch {
    // corpo vuoto o non JSON
  }
  if (!res.ok) {
    const e = corpo as { error?: unknown } | null;
    return { ok: false, stato: res.status, errore: typeof e?.error === "string" ? e.error : null };
  }
  return { ok: true, dati: corpo as T };
}

/** Testo d'errore da mostrare: quello del server (gia' nella lingua del cliente) o uno nostro. */
export function testoErrore(r: { stato: number; errore: string | null }, t: { nienteRete: string; erroreGenerico: string }) {
  return r.errore ?? (r.stato === 0 ? t.nienteRete : t.erroreGenerico);
}

/** Cassa, contratto da firmare: si esce dall'app. Solo pagine nostre o https. */
export function vaiA(link: string | null | undefined): boolean {
  if (!link || !(/^\/(?!\/)/.test(link) || /^https:\/\//i.test(link))) return false;
  window.location.href = link;
  return true;
}

/**
 * Tornati indietro dalla cassa o dal contratto il browser puo' ridare la
 * pagina com'era (bfcache): tasti ancora in "Einen Moment …" e dati vecchi.
 */
export function useRitorno(fn: () => void) {
  const esegui = useEffectEvent(fn);
  useEffect(() => {
    const su = (e: PageTransitionEvent) => {
      if (e.persisted) esegui();
    };
    window.addEventListener("pageshow", su);
    return () => window.removeEventListener("pageshow", su);
  }, []);
}

export type StatoApi<T> =
  | { tipo: "attesa" }
  | { tipo: "errore"; testo: string }
  | { tipo: "ok"; dati: T };

export function useApi<T>(url: string, t: { nienteRete: string; erroreGenerico: string }) {
  const profilo = useArchivio().profilo;
  const chi = profilo.tipo === "ok" ? profilo.profilo.nome : "";
  const [stato, setStato] = useState<StatoApi<T>>(() => {
    const m = memoria.get(url);
    return m && m.chi === chi ? { tipo: "ok", dati: m.dati as T } : { tipo: "attesa" };
  });
  const [giro, setGiro] = useState(0);
  const { nienteRete, erroreGenerico } = t;

  useEffect(() => {
    let vivo = true;
    void chiama<T>(url).then((r) => {
      if (!vivo) return;
      if (r.ok) setStato({ tipo: "ok", dati: r.dati });
      // gia' a schermo: un errore in sottofondo non cancella quello che si vede
      else setStato((s) => (s.tipo === "ok" ? s : { tipo: "errore", testo: testoErrore(r, { nienteRete, erroreGenerico }) }));
    });
    return () => {
      vivo = false;
    };
  }, [url, giro, nienteRete, erroreGenerico]);

  useEffect(() => {
    if (stato.tipo === "ok") memoria.set(url, { chi, dati: stato.dati });
  }, [url, chi, stato]);

  /** aggiorna in sottofondo, lasciando a schermo quello che c'e' */
  const ricarica = useCallback(() => setGiro((g) => g + 1), []);
  /** dopo un errore: di nuovo lo scheletro e un altro tentativo */
  const riprova = useCallback(() => {
    setStato({ tipo: "attesa" });
    setGiro((g) => g + 1);
  }, []);
  /** cambio locale dopo un salvataggio andato bene (niente richiesta in piu') */
  const modifica = useCallback((f: (d: T) => T) => {
    setStato((s) => (s.tipo === "ok" ? { tipo: "ok", dati: f(s.dati) } : s));
  }, []);

  return { stato, ricarica, riprova, modifica };
}
