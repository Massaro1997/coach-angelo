"use client";

// Pezzi comuni dell'app: testi nella lingua giusta, formati di data, qualche
// controllo sul piano del giorno e le schermate a tutto schermo (attesa,
// errore, codice) che stanno fuori da AppShell.

import type { ReactNode } from "react";
import { IoCloudOfflineOutline, IoReload } from "react-icons/io5";
import type { DataISO, Giornata } from "@/lib/app-coaching/tipi";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { testiDi, type Testi } from "../testi";
import { useArchivio } from "./archivio";

export function useTesti(): Testi {
  return testiDi(useArchivio().lingua);
}

// ---------------------------------------------------------------- date

function dataUtc(d: DataISO): Date {
  const [y, m, g] = d.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, g));
}

/** Formatta un giorno di calendario: in UTC, cosi' il fuso non sposta la data. */
export function formatta(d: DataISO, t: Testi, opzioni: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(t.locale, { timeZone: "UTC", ...opzioni }).format(dataUtc(d));
}

/**
 * Formatta un istante ISO (scadenze, inizio contratto) com'e' a Colonia, non
 * sul fuso del telefono. Solo nel browser, dopo che i dati sono arrivati.
 */
export function formattaIstante(iso: string, t: Testi, opzioni: Intl.DateTimeFormatOptions): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(t.locale, { timeZone: "Europe/Berlin", ...opzioni }).format(d);
}

export function maiuscola(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Si saluta col nome, non con nome e cognome. */
export function primoNome(nome: string): string {
  return nome.trim().split(/\s+/)[0] || nome;
}

// ---------------------------------------------------------------- piano

const pieno = (s: string | null | undefined) => !!s && s.trim() !== "";

export function haAllenamento(g: Giornata): boolean {
  const a = g.allenamento;
  return !!a && ((a.esercizi?.length ?? 0) > 0 || pieno(a.titolo) || pieno(a.note));
}

export function haAlimentazione(g: Giornata): boolean {
  const n = g.alimentazione;
  return (
    !!n &&
    ((n.pasti?.length ?? 0) > 0 ||
      n.kcal != null ||
      n.proteine != null ||
      n.carboidrati != null ||
      n.grassi != null ||
      pieno(n.acqua) ||
      pieno(n.note))
  );
}

export function haPiano(g: Giornata | null | undefined): g is Giornata {
  return !!g && (g.riposo || haAllenamento(g) || haAlimentazione(g) || pieno(g.notaCoach));
}

/** Titolo breve di un giorno per liste e card: allenamento, riposo, dieta o nota. */
export function titoloGiorno(g: Giornata, t: Testi): string {
  if (haAllenamento(g)) return g.allenamento?.titolo?.trim() || t.training;
  if (g.riposo) return t.riposo;
  if (haAlimentazione(g)) return t.alimentazione;
  return t.notaCoach(MARCHIO.coach);
}

/** Riga sotto il titolo: esercizi, durata, pasti. */
export function dettaglioGiorno(g: Giornata, t: Testi): string {
  const parti: string[] = [];
  if (haAllenamento(g)) {
    const n = g.allenamento?.esercizi?.length ?? 0;
    if (n > 0) parti.push(t.esercizi(n));
    const durata = g.allenamento?.durata?.trim();
    if (durata) parti.push(durata);
  }
  if (haAlimentazione(g)) {
    const a = g.alimentazione;
    const n = a?.pasti?.length ?? 0;
    if (n > 0) parti.push(t.pasti(n));
    else if (a?.kcal != null) parti.push(`${a.kcal.toLocaleString(t.locale)} ${t.kcal}`);
    else if (haAllenamento(g) || g.riposo) parti.push(t.alimentazione);
  }
  return parti.join(" · ");
}

/** Solo link web veri: il coach incolla a mano, niente javascript: e simili. */
export function linkSicuro(url: string | null | undefined): string | null {
  const u = url?.trim();
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  if (/^www\./i.test(u)) return `https://${u}`;
  return null;
}

export function linkWhatsapp(testo: string): string {
  return `https://wa.me/${MARCHIO.whatsapp}?text=${encodeURIComponent(testo)}`;
}

// ---------------------------------------------------------------- interfaccia

/** Card bianca come Scheda di kit.tsx (20 px). */
export const CARTA = "rounded-[20px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]";

/** Margini laterali, fuori dagli angoli arrotondati e dalla tacca. */
export const LATI = "pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]";

/** Margine in basso sopra la barra del tasto Home (zero con la tastiera aperta, vedi Guscio). */
export const FONDO_SICURO = "pb-[max(0.75rem,var(--app-sotto,env(safe-area-inset-bottom)))]";

/** Zona che scorre (solo schermate fuori da AppShell: codice, errori). */
export const SCORRE = "min-h-0 flex-1 overflow-y-auto overscroll-y-contain";

/** Strati sopra tutto (fogli dal basso): coprono la parte di schermo visibile. */
export const SOVRAPPOSTO = "fixed inset-x-0 top-[var(--app-su,0px)] h-[var(--app-alto,100dvh)]";

/**
 * Contenuto al centro della schermata (attesa, errori, codice).
 * my-auto e non justify-center: se il contenuto e' piu' alto della zona (la
 * tastiera aperta) si scorre dall'inizio, senza tagliare la parte di sopra.
 */
export function Centrato({
  children,
  schermoIntero = false,
  stretto = true,
}: {
  children: ReactNode;
  /** senza testata sopra: anche il margine della barra di stato */
  schermoIntero?: boolean;
  stretto?: boolean;
}) {
  return (
    <div className={`flex flex-col ${SCORRE} ${LATI} ${schermoIntero ? "pt-[env(safe-area-inset-top)]" : ""}`}>
      {/* in fondo sempre il margine del tasto Home: sotto puo' non esserci niente */}
      <div
        className={`mx-auto my-auto w-full pt-6 pb-[max(1.5rem,var(--app-sotto,env(safe-area-inset-bottom)))] ${
          stretto ? "max-w-md" : "max-w-xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function AvvisoOffline() {
  const t = useTesti();
  return (
    <div role="status" className="shrink-0 bg-amber-50 text-amber-900">
      <p className={`mx-auto flex max-w-xl items-center gap-2 py-1.5 text-[14px] leading-snug ${LATI}`}>
        <IoCloudOfflineOutline className="size-4 shrink-0" aria-hidden />
        <span className="min-w-0">{t.offline}</span>
      </p>
    </div>
  );
}

/** Schermata d'attesa: solo il simbolo, come l'avvio di un'app. */
export function Caricamento() {
  return (
    <div className="flex flex-1 items-center justify-center" aria-busy="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MARCHIO.simbolo} alt={MARCHIO.nome} className="h-12 w-auto opacity-90" />
    </div>
  );
}

export function Errore({ testo, onRiprova }: { testo: string; onRiprova: () => void }) {
  const t = useTesti();
  return (
    <div className={`${CARTA} p-5`} role="alert">
      <p className="text-lg">{testo}</p>
      <button
        type="button"
        onClick={onRiprova}
        className="mt-4 inline-flex h-12 items-center gap-2 rounded-full bg-neutral-900 px-5 font-semibold text-white transition-opacity active:opacity-80"
      >
        <IoReload className="size-5" aria-hidden />
        {t.riprova}
      </button>
    </div>
  );
}
