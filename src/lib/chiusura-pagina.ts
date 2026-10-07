/*
  Come si chiude ogni pagina del sito, sopra il pie' di pagina.

  Calogero, 04/10/2026: le recensioni "sia nella home che nelle altre pagine",
  e la pagina /testimonianze non serve piu' perche' recensioni e trasformazioni
  stanno ovunque. Invece di incollarle a mano in ogni pagina, le mette
  LayoutWrapper in fondo, e qui si decide dove.

  L'ordine e' quello di Trainex: la fascia che resta ferma (le trasformazioni,
  o l'ultima della pagina), le recensioni che le salgono sopra, la chiamata
  con Angelo, il pie' di pagina.
*/

export type Chiusura = {
  /** le foto prima e dopo, sopra le recensioni */
  trasformazioni: boolean;
  /** la fascia rossa con Angelo e il pulsante della consulenza */
  chiamata: boolean;
} | null;

// Pagine di servizio: testi legali, cassa, contratti. Li' non si vende.
const SENZA = ["/checkout", "/contratti", "/cookie", "/privacy", "/termini"];

// Pagine da leggere (articoli, domande): in fondo bastano le recensioni.
const SOLO_RECENSIONI = ["/blog", "/fitness-faq"];

const sotto = (p: string, radici: string[]) => radici.some((r) => p === r || p.startsWith(r + "/"));

export function chiusuraPagina(pathname: string | null): Chiusura {
  const p = pathname || "/";
  if (sotto(p, SENZA)) return null;
  // La home le trasformazioni le ha gia' a meta' pagina.
  if (p === "/") return { trasformazioni: false, chiamata: true };
  // In contatti il pulsante porterebbe alla pagina dove si e' gia'.
  if (p === "/contatti") return { trasformazioni: true, chiamata: false };
  // La landing del QR: dal telefono, corta. Sotto il wizard solo le recensioni.
  if (p === "/start") return { trasformazioni: false, chiamata: false };
  if (sotto(p, SOLO_RECENSIONI)) return { trasformazioni: false, chiamata: true };
  return { trasformazioni: true, chiamata: true };
}

/** Le pagine dei contratti sono uno strumento di lavoro, scuro per conto suo:
 *  il tema chiaro non le tocca. */
export const temaChiaro = (pathname: string | null) => !sotto(pathname || "/", ["/contratti"]);
