// Tipi e conti della scheda SEO. Niente React qui: lo usa anche la rotta
// server /admin/gsc/dati per tipizzare la risposta.

export interface TotaliSeo {
  clic: number;
  impressioni: number;
  /** frazione 0..1 */
  ctr: number;
  posizione: number;
}

export interface RigaSeo {
  chiave: string;
  clic: number;
  impressioni: number;
  ctr: number;
  posizione: number;
  /** null = nel periodo prima non c'era */
  clicPrima: number | null;
  posizionePrima: number | null;
}

export interface GiornoSeo {
  data: string; // YYYY-MM-DD
  clic: number;
  impressioni: number;
  posizione: number;
}

export interface SitemapSeo {
  percorso: string;
  inviata: string | null;
  lettaDaGoogle: string | null;
  inAttesa: boolean;
  errori: number;
  avvisi: number;
  pagine: number;
}

export interface DatiSeo {
  proprieta: string;
  aggiornato: string;
  periodo: { da: string; a: string; daPrima: string; aPrima: string };
  ora: TotaliSeo;
  prima: TotaliSeo;
  /** 56 giorni: i primi 28 sono il periodo prima */
  giorni: GiornoSeo[];
  ricerche: (RigaSeo & { pagina: string | null })[];
  pagine: RigaSeo[];
  sitemap: SitemapSeo[] | null;
}

export type TipoErrore = 'token' | 'config' | 'permessi' | 'quota' | 'sessione' | 'rete' | 'altro';

export interface ErroreSeo {
  tipo: TipoErrore;
  dettaglio: string;
}

/* ------------------------------------------------------------ formati */

// de-DE e non it-IT: l'italiano non mette il punto sotto le 5 cifre (7350),
// il tedesco si' (7.350), con la stessa virgola per i decimali.
export const num = (n: number) => Math.round(n).toLocaleString('de-DE');

export const pos = (n: number) =>
  n.toLocaleString('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const pct = (frazione: number) =>
  `${(frazione * 100).toLocaleString('it-IT', {
    minimumFractionDigits: frazione > 0 && frazione < 0.1 ? 1 : 0,
    maximumFractionDigits: 1,
  })}%`;

const dataUtc = (s: string) => new Date(`${s.slice(0, 10)}T12:00:00Z`);

/** "15 set" */
export const giornoBreve = (s: string) =>
  dataUtc(s).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', timeZone: 'UTC' });

/** "lun 15 settembre" */
export const giornoLungo = (s: string) =>
  dataUtc(s).toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });

/** Indirizzo pubblico del sito a partire dalla proprieta' di Search Console. */
export function baseSito(proprieta: string): string {
  if (proprieta.startsWith('sc-domain:')) return `https://${proprieta.slice(10)}`;
  return proprieta.replace(/\/+$/, '');
}

/* ----------------------------------------------------------- occasioni */

// Quanti cliccano in media per posizione (ordine di grandezza dagli studi
// pubblici sul CTR organico). Serve solo per ordinare le occasioni e dare
// un'idea di quanto valgono, non e' una promessa.
const CTR_TIPICO = [0, 0.28, 0.15, 0.1, 0.07, 0.05, 0.04, 0.03, 0.025, 0.02, 0.018];

export function ctrTipico(posizione: number): number {
  const p = Math.max(1, Math.round(posizione));
  if (p <= 10) return CTR_TIPICO[p] ?? 0.018;
  if (p <= 20) return 0.008;
  return 0.003;
}

export type TipoOccasione = 'seconda-pagina' | 'fondo-prima' | 'pochi-click';

export interface Occasione {
  ricerca: string;
  pagina: string | null;
  tipo: TipoOccasione;
  impressioni: number;
  clic: number;
  ctr: number;
  posizione: number;
  /** click in piu' al mese, ordine di grandezza */
  guadagno: number;
}

/**
 * Ricerche dove il sito compare spesso ma raccoglie poco:
 * - posizione fra 11 e 20: seconda pagina, quasi nessuno ci arriva
 * - posizione fra 5 e 10: prima pagina ma sotto la piega
 * - posizione sotto 5 con CTR meno della meta' del normale: titolo poco invitante
 */
export function trovaOccasioni(dati: DatiSeo, max = 6): Occasione[] {
  const soglia = Math.min(150, Math.max(15, dati.ora.impressioni * 0.005));
  const lista: Occasione[] = [];
  for (const r of dati.ricerche) {
    if (r.impressioni < soglia) continue;
    let tipo: TipoOccasione | null = null;
    let guadagno = 0;
    if (r.posizione >= 10.5 && r.posizione <= 20.5) {
      tipo = 'seconda-pagina';
      guadagno = r.impressioni * ctrTipico(5) - r.clic;
    } else if (r.posizione >= 4.5 && r.posizione < 10.5) {
      tipo = 'fondo-prima';
      guadagno = r.impressioni * ctrTipico(3) - r.clic;
    } else if (r.posizione < 4.5 && r.ctr < ctrTipico(r.posizione) * 0.5) {
      tipo = 'pochi-click';
      guadagno = r.impressioni * ctrTipico(r.posizione) - r.clic;
    }
    if (!tipo || guadagno < 1) continue;
    lista.push({
      ricerca: r.chiave,
      pagina: r.pagina,
      tipo,
      impressioni: r.impressioni,
      clic: r.clic,
      ctr: r.ctr,
      posizione: r.posizione,
      guadagno,
    });
  }
  return lista.sort((a, b) => b.guadagno - a.guadagno).slice(0, max);
}

/** "circa 15 click in più" detto in modo onesto sui numeri piccoli. */
export function guadagnoAParole(n: number): string {
  if (n < 3) return 'qualche click';
  if (n < 10) return `circa ${Math.round(n)} click`;
  if (n < 100) return `circa ${Math.round(n / 5) * 5} click`;
  return `circa ${Math.round(n / 10) * 10} click`;
}
