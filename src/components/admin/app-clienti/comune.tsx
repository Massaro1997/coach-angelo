"use client";

// Pezzi comuni della scheda "App clienti": chiamate alle API, campi dei
// moduli, conferme dentro la pagina (niente alert/confirm del browser, che
// sul telefono sono brutti e bloccano tutto), date in italiano e messaggio
// WhatsApp per mandare l'accesso al cliente.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Btn, cx } from "../ui";
import type { ClienteApp, DataISO } from "@/lib/app-coaching/tipi";
import { MARCHIO } from "@/lib/app-coaching/marchio";

export const BASE = "/api/admin/app-clienti";

/* ----------------------------------------------------------------- API */

/** fetch con l'errore delle API ({error}) gia' trasformato in testo leggibile. */
export async function api<T>(url: string, opzioni: { method?: string; body?: unknown } = {}): Promise<T> {
  let r: Response;
  try {
    r = await fetch(url, {
      method: opzioni.method ?? "GET",
      headers: opzioni.body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: opzioni.body !== undefined ? JSON.stringify(opzioni.body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new Error("Connessione assente: controlla la rete e riprova.");
  }
  const j = (await r.json().catch(() => null)) as { error?: string } | null;
  if (!r.ok) {
    if (j?.error) throw new Error(j.error);
    if (r.status === 401) throw new Error("Sessione scaduta: esci e rientra nel gestionale.");
    if (r.status === 404) throw new Error("Non trovato (forse è stato eliminato, o il servizio non è ancora online).");
    if (r.status === 429) throw new Error("Troppe richieste di fila: aspetta qualche secondo e riprova.");
    throw new Error(`Errore del server (${r.status}): riprova tra poco.`);
  }
  return j as T;
}

export const testoErrore = (e: unknown) => (e instanceof Error ? e.message : "Qualcosa è andato storto.");

/* -------------------------------------------------------------- campi */

// text-base sul telefono: sotto i 16px Safari su iPhone ingrandisce la pagina
// a ogni tocco su un campo.
export const CAMPO =
  "w-full border border-black/15 bg-white px-2.5 py-2 text-base text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-500 sm:text-sm";

export const CAMPO_PICCOLO =
  "w-full border border-black/15 bg-white px-2 py-1.5 text-base text-neutral-900 outline-none placeholder:text-neutral-300 focus:border-neutral-900 disabled:bg-neutral-50 sm:text-[13px]";

export function Campo({
  etichetta,
  nota,
  children,
  className,
}: {
  etichetta: string;
  nota?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cx("block min-w-0", className)}>
      <span className="mb-1 block text-[11px] font-semibold text-neutral-500">{etichetta}</span>
      {children}
      {nota && <span className="mt-1 block text-[11px] leading-snug text-neutral-400">{nota}</span>}
    </label>
  );
}

/** Bottoncino quadrato con sola icona (sposta, togli...). */
export function BtnIcona({
  titolo,
  onClick,
  disabled,
  pericolo,
  children,
}: {
  titolo: string;
  onClick: () => void;
  disabled?: boolean;
  pericolo?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={titolo}
      aria-label={titolo}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center text-neutral-500 transition-colors disabled:opacity-30",
        pericolo ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-black/5 hover:text-neutral-900"
      )}
    >
      {children}
    </button>
  );
}

export function Errore({ testo, onRiprova }: { testo: string; onRiprova?: () => void }) {
  return (
    <div className="flex items-start gap-2 border border-red-500/30 bg-red-50 p-3 text-sm text-red-700" role="alert">
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="min-w-0 flex-1 whitespace-pre-line">{testo}</p>
      {onRiprova && (
        <button type="button" onClick={onRiprova} className="shrink-0 text-[12px] font-semibold underline underline-offset-2">
          Riprova
        </button>
      )}
    </div>
  );
}

/** Conferma dentro la pagina, al posto di window.confirm. */
export function Conferma({
  testo,
  conferma,
  annulla = "Annulla",
  onConferma,
  onAnnulla,
  pericolo,
  occupato,
  bloccato,
  children,
}: {
  testo: ReactNode;
  conferma: string;
  annulla?: string;
  onConferma: () => void;
  onAnnulla: () => void;
  pericolo?: boolean;
  occupato?: boolean;
  bloccato?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "border p-3 text-sm",
        pericolo ? "border-red-500/40 bg-red-50 text-red-900" : "border-amber-500/40 bg-amber-50 text-amber-950"
      )}
      role="alertdialog"
    >
      <div className="leading-snug">{testo}</div>
      {children && <div className="mt-2">{children}</div>}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onConferma}
          disabled={occupato || bloccato}
          className={cx(
            "px-3 py-1.5 text-[12px] font-semibold text-white transition-opacity disabled:opacity-40",
            pericolo ? "bg-red-600 hover:bg-red-700" : "bg-neutral-900 hover:bg-neutral-800"
          )}
        >
          {occupato ? "Un attimo…" : conferma}
        </button>
        <Btn size="sm" variant="outline" onClick={onAnnulla} disabled={occupato}>
          {annulla}
        </Btn>
      </div>
    </div>
  );
}

/** Copia negli appunti con la scritta "Copiato" per un attimo. */
export function useCopia(): [string | null, (chiave: string, testo: string) => void, string] {
  const [copiato, setCopiato] = useState<string | null>(null);
  const [errore, setErrore] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );
  const copia = (chiave: string, testo: string) => {
    const fatto = () => {
      setErrore("");
      setCopiato(chiave);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopiato(null), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(testo).then(fatto, () => setErrore("Copia non riuscita: tieni premuto sul testo per selezionarlo."));
    } else {
      setErrore("Questo browser non permette di copiare: tieni premuto sul testo per selezionarlo.");
    }
  };
  return [copiato, copia, errore];
}

/* --------------------------------------------------------------- date */

// Le DataISO sono giorni di calendario: mezzogiorno UTC e formattazione in
// UTC, cosi' il fuso del telefono non sposta mai il giorno.
function fmt(d: DataISO, o: Intl.DateTimeFormatOptions) {
  return new Date(`${d}T12:00:00Z`).toLocaleDateString("it-IT", { ...o, timeZone: "UTC" });
}
/** "giovedì 12 novembre" */
export const dataLunga = (d: DataISO) => fmt(d, { weekday: "long", day: "numeric", month: "long" });
/** "12 nov" */
export const dataBreve = (d: DataISO) => fmt(d, { day: "numeric", month: "short" });
/** "gio 12 nov" */
export const dataCorta = (d: DataISO) => fmt(d, { weekday: "short", day: "numeric", month: "short" });
/** "novembre 2026" */
export const nomeMese = (mese: string) => fmt(`${mese}-01`, { month: "long", year: "numeric" });

/** Un momento preciso (ultimo accesso, fatto alle...), ora di Colonia. */
export function momento(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("it-IT", {
    timeZone: "Europe/Berlin",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ------------------------------------------------------------- accesso */

/** "12345678" -> "1234 5678": si legge e si detta meglio. */
export const codiceLeggibile = (c: string) => (/^\d{8}$/.test(c) ? `${c.slice(0, 4)} ${c.slice(4)}` : c);

/**
 * Numero per wa.me: solo cifre, niente + ne' spazi. I numeri tedeschi scritti
 * all'uso locale (0176...) prendono il 49 davanti; 0039... perde lo 00.
 */
export function numeroWhatsApp(tel: string | null): string | null {
  if (!tel) return null;
  let s = tel.trim().replace(/[^\d+]/g, "");
  if (s.startsWith("+")) s = s.slice(1);
  else if (s.startsWith("00")) s = s.slice(2);
  else if (s.startsWith("0")) s = `49${s.slice(1)}`;
  s = s.replace(/\D/g, "");
  return s.length >= 8 ? s : null;
}

/** Messaggio con link, codice e istruzioni per installarla, nella lingua del cliente. */
export function messaggioAccesso(c: ClienteApp): string {
  const nome = c.nome.trim().split(/\s+/)[0] || c.nome;
  const codice = codiceLeggibile(c.codice);
  if (c.lingua === "it") {
    return [
      `Ciao ${nome}!`,
      "",
      `Ecco la tua app ${MARCHIO.nomeApp}: ogni giorno trovi il tuo allenamento e cosa mangiare.`,
      "",
      `1. Apri questo link: ${c.linkAccesso}`,
      `2. Se ti chiede un codice, scrivi: ${codice}`,
      "",
      "Per averla sul telefono come un'app:",
      "- iPhone: apri il link con Safari, tocca «Condividi» (il quadrato con la freccia), poi «Aggiungi alla schermata Home».",
      "- Android: apri il link con Chrome, tocca il menu (i tre puntini in alto a destra), poi «Installa app».",
      "",
      "A presto!",
      MARCHIO.coach,
    ].join("\n");
  }
  return [
    `Hallo ${nome}!`,
    "",
    `Hier ist deine ${MARCHIO.nomeApp} App: Jeden Tag findest du dort dein Training und deinen Ernährungsplan.`,
    "",
    `1. Öffne diesen Link: ${c.linkAccesso}`,
    `2. Falls nach einem Code gefragt wird, gib ein: ${codice}`,
    "",
    "So hast du sie wie eine App auf dem Handy:",
    "- iPhone: Link in Safari öffnen, auf „Teilen“ tippen (das Quadrat mit dem Pfeil), dann „Zum Home-Bildschirm“.",
    "- Android: Link in Chrome öffnen, auf das Menü tippen (die drei Punkte oben rechts), dann „App installieren“.",
    "",
    "Bis bald!",
    MARCHIO.coach,
  ].join("\n");
}

export function linkWhatsApp(c: ClienteApp): string | null {
  const n = numeroWhatsApp(c.telefono);
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(messaggioAccesso(c))}` : null;
}
