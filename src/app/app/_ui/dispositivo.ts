// Il telefono: app gia' installata?, iPhone o Android?, service worker,
// bottone "installa" di Chrome. Solo per componenti client.

import { useSyncExternalStore } from "react";
import type { DataISO } from "@/lib/app-coaching/tipi";
import { aggiungiGiorni } from "@/lib/app-coaching/date";
import { SCOPE, SW_URL } from "./pwa";

const nessunCambio = () => () => {};

// ---------------------------------------------------------------- standalone

function eStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // Safari su iPhone non conosce display-mode per le app dalla Home
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function iscriviStandalone(f: () => void) {
  const mq = window.matchMedia("(display-mode: standalone)");
  mq.addEventListener("change", f);
  return () => mq.removeEventListener("change", f);
}

/** Sul server si suppone l'app installata: le istruzioni non lampeggiano. */
export function useStandalone(): boolean {
  return useSyncExternalStore(iscriviStandalone, eStandalone, () => true);
}

// ---------------------------------------------------------------- piattaforma

export type Piattaforma = "iphone" | "android" | "altro";

function piattaforma(): Piattaforma {
  const ua = navigator.userAgent;
  // gli iPad recenti si presentano come Mac con lo schermo touch
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) {
    return "iphone";
  }
  if (/android/i.test(ua)) return "android";
  return "altro";
}

export function usePiattaforma(): Piattaforma | null {
  return useSyncExternalStore(nessunCambio, piattaforma, () => null);
}

// ---------------------------------------------------------------- installa

type EventoInstalla = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let eventoInstalla: EventoInstalla | null = null;
const ascoltaInstalla = new Set<() => void>();
const avvisa = () => ascoltaInstalla.forEach((f) => f());

// Chrome lo manda una volta sola, anche prima che React sia pronto: si
// ascolta appena il modulo si carica e si tiene da parte per il bottone.
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventoInstalla = e as EventoInstalla;
    avvisa();
  });
  window.addEventListener("appinstalled", () => {
    eventoInstalla = null;
    avvisa();
  });
}

function iscriviInstalla(f: () => void) {
  ascoltaInstalla.add(f);
  return () => {
    ascoltaInstalla.delete(f);
  };
}

export function usePuoInstallare(): boolean {
  return useSyncExternalStore(iscriviInstalla, () => eventoInstalla !== null, () => false);
}

export async function installa() {
  const e = eventoInstalla;
  if (!e) return;
  try {
    await e.prompt();
    await e.userChoice;
  } catch {
    // prompt gia' usato o rifiutato dal browser
  } finally {
    // il prompt si usa una volta sola
    eventoInstalla = null;
    avvisa();
  }
}

// ---------------------------------------------------------------- service worker

const SW_ATTIVO =
  // in sviluppo i file di Next non hanno l'hash nel nome: la cache li bloccherebbe
  process.env.NODE_ENV === "production";

export function registraSW() {
  if (!SW_ATTIVO || !("serviceWorker" in navigator)) return;
  navigator.serviceWorker
    .register(SW_URL, { scope: SCOPE, updateViaCache: "none" })
    .catch(() => {
      // senza service worker l'app funziona lo stesso, solo non offline
    });
}

// una volta per data: l'app installata resta aperta in memoria per giorni
let precaricatoPer: DataISO | null = null;

/** Chiede al SW di salvare i giorni vicini: in palestra si aprono anche senza campo. */
export function precaricaGiorni(oggi: DataISO) {
  if (precaricatoPer === oggi || !SW_ATTIVO || !("serviceWorker" in navigator) || !navigator.onLine) return;
  precaricatoPer = oggi;
  const urls = [SCOPE];
  for (let i = -1; i <= 6; i++) urls.push(`${SCOPE}/giorno/${aggiungiGiorni(oggi, i)}`);
  navigator.serviceWorker.ready
    .then((reg) => reg.active?.postMessage({ tipo: "precarica", urls }))
    .catch(() => {});
}
