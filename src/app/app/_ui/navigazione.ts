// Come ci si muove nell'app, come in un'app vera:
// - le sezioni (barra in basso) sono schermate di primo livello;
// - home/piano -> giorno e sezione -> profilo sono un passo avanti nella
//   cronologia; tra un giorno e l'altro (frecce, dito) si sostituisce, cosi' il
//   tasto indietro (di AppShell o di Android) torna sempre da dove si e' partiti;
// - il "‹" di AppShell torna indietro davvero se si e' entrati con un passo
//   avanti, altrimenti (schermata aperta da un link) sostituisce con l'href.
// La route /app/giorno/[data] resta quella di sempre: cache offline e
// precarica del service worker non cambiano.

import type { MouseEvent } from "react";
import { CACHE_PREFISSO } from "./pwa";

// sessionStorage: regge anche al ricarico vero della pagina che Next fa
// quando, senza rete, la navigazione passa dalla copia del service worker
const CHIAVE = `${CACHE_PREFISSO}avanti`;

/**
 * Ricordo della schermata del giorno tra un giorno e l'altro (la pagina si
 * rimonta a ogni giorno): da che lato entra il giorno nuovo e quale parte era
 * aperta. Si scrive solo nei gestori degli eventi (tocchi), mai disegnando.
 */
export const ricordoGiorno: { verso: -1 | 0 | 1; linguetta: "training" | "alimentazione" } = {
  verso: 0,
  linguetta: "training",
};

/** Sui tocchi che aprono una schermata di dettaglio (giorno, profilo). */
export function segnaAvanti() {
  ricordoGiorno.verso = 0;
  try {
    sessionStorage.setItem(CHIAVE, "1");
  } catch {
    // navigazione privata: "‹" sostituira' invece di tornare indietro
  }
}

/** Di nuovo su una sezione: il prossimo dettaglio riparte da qui. */
export function dimenticaAvanti() {
  try {
    sessionStorage.removeItem(CHIAVE);
  } catch {
    // niente
  }
}

function entratoConPasso(): boolean {
  try {
    return sessionStorage.getItem(CHIAVE) === "1" && window.history.length > 1;
  } catch {
    return false;
  }
}

/** Sul link "‹" (href della sezione, replace): se si puo', un passo indietro vero. */
export function tornaIndietro(e: MouseEvent, indietro: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !entratoConPasso()) return;
  e.preventDefault();
  indietro();
}
