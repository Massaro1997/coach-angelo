// Bozze del simbolo AM (rebranding 2026).
//
// Richiesta di Calogero del 03/10/2026: restare fedeli al simbolo che c'e'
// gia' (la A con la traversa, legata alla M), solo piu' curvo e piu' tech, e
// restare sul rosso. Per questo si parte dal ricalco del logo attuale: le
// misure qui sotto vengono da public/logo.png letto riga per riga, portate su
// una griglia alta 100.
//
// Uso:  node scripts/genera-logo-bozze.mjs
// Esce: brand/logo/bozze/*.svg, brand/logo/bozze/foglio.png
//       src/components/admin/marchio-simboli.ts  (letto dalla sezione Marchio)

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "brand", "logo", "bozze");
mkdirSync(out, { recursive: true });
// via le bozze del giro prima: la cartella rispecchia solo le proposte vive
for (const f of readdirSync(out)) if (/^(am-.*\.svg|foglio\.png)$/.test(f)) rmSync(join(out, f));

const ROSSO_CHIARO = "#ff2b3a";
const ROSSO = "#e30613";
const ROSSO_SCURO = "#c1000f";
const H = 100;

// Poligono con gli angoli arrotondati; r puo' essere un numero o un raggio
// per vertice.
function rounded(points, r) {
  const n = points.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const v1 = [p0[0] - p1[0], p0[1] - p1[1]];
    const v2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const l1 = Math.hypot(...v1);
    const l2 = Math.hypot(...v2);
    const rr = Math.min(Array.isArray(r) ? r[i] : r, l1 / 2, l2 / 2);
    const a = [p1[0] + (v1[0] / l1) * rr, p1[1] + (v1[1] / l1) * rr];
    const b = [p1[0] + (v2[0] / l2) * rr, p1[1] + (v2[1] / l2) * rr];
    d += `${i === 0 ? "M" : "L"}${a[0].toFixed(1)} ${a[1].toFixed(1)}Q${p1[0].toFixed(1)} ${p1[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }
  return d + "Z";
}

const inclina = (gradi) => {
  const t = Math.tan((gradi * Math.PI) / 180);
  return ([x, y]) => [x + (H - y) * t, y];
};

// ------------------------------------------------- ricalco del logo attuale
// Un pezzo solo: gamba sinistra della A, punta, diagonale che scende nella
// valle, risalita della M, asta. La traversa parte dalla gamba e si ferma
// prima della diagonale, con il taglio in pendenza.
const W0 = 137.5;
const AM = [
  [0, 100], //            0 piede, fuori
  [46.06, 0], //          1 punta, sinistra
  [63.51, 0], //          2 punta, destra
  [88.7, 53.37], //       3 incavo tra diagonale e risalita
  [119.95, 0], //         4 testa della M, sinistra
  [137.5, 0], //          5 testa della M, destra
  [137.5, 100], //        6 asta, piede destro
  [120.91, 100], //       7 asta, piede sinistro
  [120.91, 29.33], //     8 dove la risalita entra nell'asta
  [88.22, 88.94], //      9 fondo della valle
  [54.57, 23.56], //     10 punta interna
  [37.26, 61.06], //     11 traversa, attacco in alto
  [62.26, 61.06], //     12 traversa, fine in alto
  [70.43, 78.37], //     13 traversa, fine in basso
  [29.28, 78.37], //     14 traversa, attacco in basso
  [19.33, 100], //       15 piede, dentro
];

// La stessa forma con la traversa staccata: una barretta sospesa.
const AM_SENZA_TRAVERSA = [...AM.slice(0, 11), AM[15]];
const TRAVERSA = [
  [43.3, 61.06],
  [62.26, 61.06],
  [70.43, 78.37],
  [35.3, 78.37],
];

//                 0    1  2  3  4  5  6    7    8  9  10 11 12   13   14 15
const R_CURVO = [2.5, 8, 8, 4, 8, 8, 2.5, 2.5, 3, 6, 4, 2, 2.5, 2.5, 2, 2.5];
const R_TECH = [2.5, 8, 8, 4, 8, 8, 2.5, 2.5, 3, 6, 4, 2.5];

// Il simbolo scelto e' "tech": curvo, inclinato in avanti, traversa sospesa.
// Il 03/10 Calogero ha chiesto "leggermente piu' movimento". Le forme restano
// quelle: cambia la pendenza (la scritta in Kanit pende di 12 gradi, il
// simbolo ne aveva 9) e, in due varianti, c'e' una scia a sinistra della gamba.
const bordoGamba = (y) => (46.06 * (H - y)) / H; // bordo esterno della gamba sinistra, da dritto

/** Una lineetta di scia: finisce poco prima della gamba, tagliata come lei. */
function lineetta(yt, spessore, lunga, stacco = 6) {
  const yb = yt + spessore;
  const xr = (y) => bordoGamba(y) - stacco;
  return [[xr(yt) - lunga, yt], [xr(yt), yt], [xr(yb), yb], [xr(yb) - lunga, yb]];
}

function tech(gradi, scia = []) {
  const p = inclina(gradi);
  const forme = [AM_SENZA_TRAVERSA, TRAVERSA, ...scia].map((f) => f.map(p));
  // la scia esce a sinistra: si sposta tutto perche' il disegno parta da zero
  const minX = Math.min(0, ...forme.flat().map(([x]) => x));
  const [corpo, traversa, ...linee] = forme.map((f) => f.map(([x, y]) => [x - minX, y]));
  return {
    w: +(W0 + H * Math.tan((gradi * Math.PI) / 180) - minX).toFixed(1),
    d: rounded(corpo, R_TECH) + rounded(traversa, 2.5) + linee.map((f) => rounded(f, 1.6)).join(""),
  };
}

// tre lineette sfalsate, a mezza altezza
const SCIA = [lineetta(33, 6, 12), lineetta(47, 6, 22), lineetta(61, 6, 14)];
// due lineette all'altezza della traversa: la barretta sospesa che "passa" dalla gamba
const SCIA_TRAVERSA = [lineetta(61.06, 6.2, 20, 7), lineetta(72.17, 6.2, 12, 7)];

const simboli = {
  // il logo di oggi, ridisegnato pulito
  fedele: { w: W0, d: rounded(AM, 0.8) },
  // stesse linee, giunture tonde
  curvo: { w: W0, d: rounded(AM, R_CURVO) },
  tech: tech(9),
  // piu' movimento
  techDodici: tech(12),
  techQuindici: tech(15),
  techScia: tech(12, SCIA),
  techTraversa: tech(12, SCIA_TRAVERSA),
};

// -------------------------------------------------------------------- svg

const grad = (w) =>
  `<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="${H}"><stop offset="0" stop-color="${ROSSO_CHIARO}"/><stop offset="1" stop-color="${ROSSO_SCURO}"/></linearGradient></defs>`;

const svgSimbolo = (s) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s.w} ${H}">${grad(s.w)}<path d="${s.d}" fill="url(#g)"/></svg>\n`;

// Tessera quadrata col simbolo in bianco: favicon, profilo Google, social.
const svgTessera = (s) => {
  const S = 320;
  const k = (S * 0.62) / s.w;
  const tx = ((S - s.w * k) / 2).toFixed(1);
  const ty = ((S - H * k) / 2).toFixed(1);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${ROSSO_CHIARO}"/><stop offset="1" stop-color="${ROSSO_SCURO}"/></linearGradient></defs><rect width="${S}" height="${S}" rx="72" fill="url(#g)"/><path transform="translate(${tx} ${ty}) scale(${k.toFixed(4)})" d="${s.d}" fill="#fff"/></svg>\n`;
};

const righe = [];
let i = 0;
for (const [nome, s] of Object.entries(simboli)) {
  const a = svgSimbolo(s);
  const b = svgTessera(s);
  writeFileSync(join(out, `am-${nome}.svg`), a);
  writeFileSync(join(out, `am-${nome}-tessera.svg`), b);
  const y = i++ * 150;
  righe.push({ input: await sharp(Buffer.from(a), { density: 400 }).resize({ height: 130 }).png().toBuffer(), left: 20, top: y + 10 });
  righe.push({ input: await sharp(Buffer.from(b), { density: 300 }).resize({ height: 130 }).png().toBuffer(), left: 300, top: y + 10 });
  righe.push({ input: await sharp(Buffer.from(b), { density: 300 }).resize({ height: 32 }).png().toBuffer(), left: 460, top: y + 59 });
  righe.push({ input: await sharp(Buffer.from(a), { density: 300 }).resize({ height: 28 }).png().toBuffer(), left: 520, top: y + 61 });
}
await sharp({ create: { width: 600, height: i * 150 + 10, channels: 3, background: "#ffffff" } })
  .composite(righe)
  .png()
  .toFile(join(out, "foglio.png"));

const ts = `// Generato da scripts/genera-logo-bozze.mjs: non modificare a mano.
// Simboli AM in bozza, griglia alta ${H}, larghezza w.

export const ROSSO_CHIARO = "${ROSSO_CHIARO}";
export const ROSSO = "${ROSSO}";
export const ROSSO_SCURO = "${ROSSO_SCURO}";

export const SIMBOLI = {
${Object.entries(simboli)
  .map(([nome, s]) => `  ${nome}: { w: ${s.w}, d: "${s.d}" },`)
  .join("\n")}
} as const;

export type SimboloId = keyof typeof SIMBOLI;
`;
writeFileSync(join(root, "src", "components", "admin", "marchio-simboli.ts"), ts);

console.log("Bozze scritte in brand/logo/bozze:", Object.keys(simboli).join(", "));
