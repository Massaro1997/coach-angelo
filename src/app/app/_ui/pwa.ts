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

/**
 * Cambiare la versione butta tutte le cache al prossimo activate.
 * v2 (13/11/2026): app con home e barra delle sezioni, le pagine v1 vanno buttate.
 */
export const CACHE_PREFISSO = `${MARCHIO.chiave}-app-`;
export const CACHE_VERSIONE = `${CACHE_PREFISSO}v2`;

/** Le sezioni della barra in basso (e il profilo): le precarica il SW per l'offline. */
export const ROTTE_SEZIONI = [
  `${SCOPE}/plan`,
  `${SCOPE}/fortschritt`,
  `${SCOPE}/shop`,
  `${SCOPE}/coach`,
  `${SCOPE}/profil`,
];

/** Dati salvati in anticipo per la palestra senza campo (oltre a quelli che l'app chiede da se'). */
export const API_DA_PRECARICARE = ["/api/app/progressi"];

/** Il SW lo mette sulle risposte API servite dalla cache (niente rete). */
export const HEADER_OFFLINE = "x-app-offline";

/** Colori neutri dell'interfaccia (non di marchio: quelli stanno in MARCHIO). */
export const TEMA = {
  // lo stesso grigio del guscio (AppShell): niente bordi tra barra di stato e testata
  fondo: "#f4f4f6",
  superficie: "#ffffff",
  testo: "#121214",
} as const;

export const ICONE = {
  apple: "/app-icone/apple-touch-icon-180.png",
  i192: "/app-icone/icona-192.png",
  i512: "/app-icone/icona-512.png",
  maskable: "/app-icone/icona-512-maskable.png",
} as const;
