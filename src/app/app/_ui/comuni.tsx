"use client";

// Pezzi comuni dell'app: testi nella lingua giusta, testata, stati di attesa
// ed errore, formati di data e qualche controllo sul piano del giorno.

import type { ReactNode } from "react";
import { RotateCw, WifiOff } from "lucide-react";
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

export function maiuscola(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
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

export function haPiano(g: Giornata | undefined): g is Giornata {
  return !!g && (g.riposo || haAllenamento(g) || haAlimentazione(g) || pieno(g.notaCoach));
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

export const CARTA = "rounded-2xl bg-white ring-1 ring-black/[0.06]";

/** Barra in alto, sotto la barra di stato del telefono. */
export function Testata({ sinistra, destra }: { sinistra: ReactNode; destra?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-black/[0.06] bg-white pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-14 max-w-xl items-center justify-between gap-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
        {sinistra}
        {destra}
      </div>
    </header>
  );
}

/** Contenuto della pagina, con margine per la barra in basso dell'iPhone. */
export function Corpo({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-xl pb-[calc(2.5rem_+_env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-5">
      {children}
    </main>
  );
}

export function AvvisoOffline() {
  const t = useTesti();
  return (
    <div role="status" className="bg-amber-50 text-amber-900">
      <p className="mx-auto flex max-w-xl items-center gap-2 px-4 py-2 text-[15px]">
        <WifiOff className="size-4 shrink-0" aria-hidden />
        {t.offline}
      </p>
    </div>
  );
}

/** Schermata d'attesa: solo il simbolo, come l'avvio di un'app. */
export function Caricamento() {
  return (
    <div className="flex min-h-dvh items-center justify-center" aria-busy="true">
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
        className="mt-4 inline-flex h-12 items-center gap-2 rounded-xl bg-neutral-900 px-5 font-semibold text-white transition-opacity active:opacity-80"
      >
        <RotateCw className="size-5" aria-hidden />
        {t.riprova}
      </button>
    </div>
  );
}

/** Blocchi grigi al posto del contenuto mentre arriva. */
export function Segnaposto({ altezze }: { altezze: string[] }) {
  return (
    <div className="space-y-3" aria-hidden>
      {altezze.map((h, i) => (
        <div key={i} className={`${h} rounded-2xl bg-black/[0.05]`} />
      ))}
    </div>
  );
}
