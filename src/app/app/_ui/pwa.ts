// Costanti della PWA condivise da layout, manifest, service worker e client.
// Niente "use client": la importano anche le rotte del server.

import { MARCHIO } from "@/lib/app-coaching/marchio";

/**
 * Ambito dell'app. "/app" e non "/app/": con trailingSlash spento Next manda
 * /app/ su /app, e una pagina /app fuori da uno scope "/app/" non sarebbe
 * controllata dal service worker ne' dentro la finestra dell'app installata.
 * Il SW sta in /app/sw.js e allarga lo scope con l'header Service-Worker-Allowed.
 */
export const SCOPE = "/app";
export const SW_URL = "/app/sw.js";
export const MANIFEST_URL = "/app/manifest.webmanifest";

/** Cambiare la versione butta tutte le cache al prossimo activate. */
export const CACHE_PREFISSO = `${MARCHIO.chiave}-app-`;
export const CACHE_VERSIONE = `${CACHE_PREFISSO}v1`;

/** Il SW lo mette sulle risposte API servite dalla cache (niente rete). */
export const HEADER_OFFLINE = "x-app-offline";

/** Colori neutri dell'interfaccia (non di marchio: quelli stanno in MARCHIO). */
export const TEMA = {
  fondo: "#f4f4f5",
  superficie: "#ffffff",
  testo: "#121214",
} as const;

export const ICONE = {
  apple: "/app-icone/apple-touch-icon-180.png",
  i192: "/app-icone/icona-192.png",
  i512: "/app-icone/icona-512.png",
  maskable: "/app-icone/icona-512-maskable.png",
} as const;
