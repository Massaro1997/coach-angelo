/**
 * Merchandising (fase 3 della scaletta): la brochure e il biglietto da visita,
 * piu' i file di partenza per fare magliette, borracce e il resto.
 *
 * Stesso sistema dell'admin DirezioneX. I sorgenti stanno in brand/stampa
 * (brochure.html, biglietto.html); PDF e PNG si esportano con
 * `node scripts/esporta-stampa.mjs`, che mette le copie da scaricare in
 * public/brand/stampa. Quando si rifa' un pezzo i file si sovrascrivono con lo
 * stesso nome: questa lista non cambia. Nessun database dietro.
 */

export type Lingua = "de" | "it";
export type FileScaricabile = { label: string; href: string };

const S = "/brand/stampa";

export const BROCHURE = {
  /** 303 x 216 mm con l'abbondanza */
  ratio: "3580 / 2552",
  anteprime: (l: Lingua) => [
    {
      titolo: "Esterno",
      nota: "Da sinistra: anta che si infila, retro, copertina",
      src: `${S}/brochure-esterno-${l}.jpg`,
    },
    {
      titolo: "Interno",
      nota: "Da sinistra: come funziona, cosa ricevi, prezzi e chiamata",
      src: `${S}/brochure-interno-${l}.jpg`,
    },
  ],
  file: (l: Lingua): FileScaricabile[] => [
    { label: "PDF per la stampa", href: `${S}/brochure-fitprimo-${l}.pdf` },
    { label: "Esterno PNG 300 dpi", href: `${S}/png/brochure-esterno-${l}.png` },
    { label: "Interno PNG 300 dpi", href: `${S}/png/brochure-interno-${l}.png` },
  ],
  /** l'ordine dei pannelli come li legge chi apre la brochure */
  imbuto: [
    { dove: "Copertina", fase: "In alto", cosa: "L'aggancio: Du schaffst das. Wir helfen dir." },
    { dove: "Anta che si apre", fase: "In alto", cosa: "Non sei pigro, ti è mancato il piano. Cosa trovi, in quattro spunte." },
    { dove: "Interno, sinistra", fase: "A metà", cosa: "Come funziona in tre passi, e chi è il coach." },
    { dove: "Interno, centro", fase: "A metà", cosa: "Cosa ricevi: coaching online, personal training, schede pronte." },
    { dove: "Interno, destra", fase: "In fondo", cosa: "I prezzi, la garanzia dei 14 giorni, la consulenza gratuita con il codice." },
    { dove: "Retro", fase: "Contatti", cosa: "Logo, codice, sito, mail, Instagram e TikTok." },
  ],
};

export const BIGLIETTO = {
  /** 91 x 61 mm con l'abbondanza */
  ratio: "2150 / 1442",
  facce: (l: Lingua) => [
    { titolo: "Fronte", src: `${S}/biglietto-fronte-${l}.jpg` },
    { titolo: "Retro", src: `${S}/biglietto-retro-${l}.jpg` },
  ],
  file: (l: Lingua): FileScaricabile[] => [
    { label: "PDF per la stampa", href: `${S}/biglietto-fitprimo-${l}.pdf` },
    { label: "Fronte PNG", href: `${S}/png/biglietto-fronte-${l}.png` },
    { label: "Retro PNG", href: `${S}/png/biglietto-retro-${l}.png` },
  ],
};

export type OggettoMerch = {
  key: string;
  nome: string;
  tecnica: string;
  /** dove va il logo e quale */
  logo: string;
  supporto: string;
  file: FileScaricabile[];
};

const L = "/brand/fitprimo";

export const OGGETTI: OggettoMerch[] = [
  {
    key: "tshirt",
    nome: "Maglietta dei trainer",
    tecnica: "Serigrafia, bianco e rosso",
    logo: "Logo piccolo sul petto a sinistra, circa 8 cm. Dietro, se serve, grande",
    supporto: "Nera",
    file: [{ label: "Logo su scuro", href: `${L}/fitprimo-logo-su-scuro.svg` }],
  },
  {
    key: "felpa",
    nome: "Felpa",
    tecnica: "Ricamo",
    logo: "Solo il simbolo AM sul petto a sinistra, almeno 30 mm",
    supporto: "Nera",
    file: [{ label: "Simbolo", href: `${L}/fitprimo-simbolo-colore.svg` }],
  },
  {
    key: "borraccia",
    nome: "Borraccia",
    tecnica: "Incisione laser o serigrafia a un colore",
    logo: "Logo bianco in orizzontale",
    supporto: "Nero opaco",
    file: [{ label: "Logo bianco", href: `${L}/fitprimo-logo-bianco.svg` }],
  },
  {
    key: "asciugamano",
    nome: "Asciugamano",
    tecnica: "Ricamo",
    logo: "Simbolo AM in un angolo",
    supporto: "Nero o bianco",
    file: [
      { label: "Simbolo bianco", href: `${L}/fitprimo-simbolo-bianco.svg` },
      { label: "Simbolo", href: `${L}/fitprimo-simbolo-colore.svg` },
    ],
  },
];

export type LogoMerch = {
  nome: string;
  src: string;
  /** fondo dell'anteprima: il logo bianco si vede solo su scuro */
  fondo: "chiaro" | "scuro" | "rosso";
};

export const LOGHI: LogoMerch[] = [
  { nome: "A colori", src: `${L}/fitprimo-logo-colore.svg`, fondo: "chiaro" },
  { nome: "Su scuro", src: `${L}/fitprimo-logo-su-scuro.svg`, fondo: "scuro" },
  { nome: "Bianco", src: `${L}/fitprimo-logo-bianco.svg`, fondo: "rosso" },
  { nome: "Nero", src: `${L}/fitprimo-logo-nero.svg`, fondo: "chiaro" },
  { nome: "Simbolo", src: `${L}/fitprimo-simbolo-colore.svg`, fondo: "chiaro" },
  { nome: "Simbolo bianco", src: `${L}/fitprimo-simbolo-bianco.svg`, fondo: "scuro" },
  { nome: "Simbolo nero", src: `${L}/fitprimo-simbolo-nero.svg`, fondo: "chiaro" },
  { nome: "Tessera", src: `${L}/fitprimo-tessera.svg`, fondo: "chiaro" },
];

export const COLORI = [
  { nome: "Rosso", hex: "#e30613", stampa: "CMYK 0 / 100 / 95 / 0" },
  { nome: "Rosso chiaro", hex: "#ff2b3a", stampa: "Inizio della sfumatura" },
  { nome: "Rosso scuro", hex: "#c1000f", stampa: "Fine della sfumatura" },
  { nome: "Nero", hex: "#121214", stampa: "CMYK 60 / 50 / 50 / 100" },
];
