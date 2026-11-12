// Come ci si muove tra calendario e giorni, come in un'app:
// - calendario -> giorno e' un passo avanti nella cronologia; tra un giorno e
//   l'altro (frecce, dito) si sostituisce, cosi' il tasto indietro di Android
//   (e "‹ Kalender") torna sempre al calendario, non a tutti i giorni visti;
// - "‹ Kalender" torna indietro davvero se si e' arrivati dal calendario,
//   altrimenti (giorno aperto da un link) sostituisce il giorno col calendario.
// La route /app/giorno/[data] resta quella di sempre: cache offline e
// precarica del service worker non cambiano.

import type { MouseEvent } from "react";
import { CACHE_PREFISSO } from "./pwa";

// sessionStorage: regge anche al ricarico vero della pagina che Next fa
// quando, senza rete, la navigazione passa dalla copia del service worker
const CHIAVE = `${CACHE_PREFISSO}dal-calendario`;

/**
 * Ricordi della schermata del giorno tra un giorno e l'altro (la pagina si
 * rimonta a ogni giorno): da che lato entra il giorno nuovo e quale linguetta
 * era aperta. Si scrive solo nei gestori degli eventi (tocchi), mai disegnando.
 */
export const ricordoGiorno: { verso: -1 | 0 | 1; linguetta: "training" | "alimentazione" } = {
  verso: 0,
  linguetta: "training",
};

/** Sui tocchi di calendario e card "Heute": il giorno si apre senza scivolare di lato. */
export function segnaDalCalendario() {
  ricordoGiorno.verso = 0;
  try {
    sessionStorage.setItem(CHIAVE, "1");
  } catch {
    // navigazione privata: "‹ Kalender" sostituira' invece di tornare indietro
  }
}

export function dimenticaCalendario() {
  try {
    sessionStorage.removeItem(CHIAVE);
  } catch {
    // niente
  }
}

function dalCalendario(): boolean {
  try {
    return sessionStorage.getItem(CHIAVE) === "1" && window.history.length > 1;
  } catch {
    return false;
  }
}

/** Sul link "‹ Kalender" (href /app, replace): se si puo', un passo indietro vero. */
export function tornaAlCalendario(e: MouseEvent, indietro: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !dalCalendario()) return;
  e.preventDefault();
  indietro();
}
