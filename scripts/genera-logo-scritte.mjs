// Scritta del logo, in tracciati (rebranding 2026).
//
// Richiesta di Calogero del 03/10/2026: cambiare il carattere della scritta
// con qualcosa di unico e particolare, in tema fitness e azienda.
//
// Due famiglie:
// - "misura" e "manubrio": lettere disegnate qui, con le regole del simbolo
//   AM (stesso spessore, stessa pendenza di 9 gradi, giunture tonde, barretta
//   sospesa). In "manubrio" la I e' un manubrio in piedi.
// - le altre: caratteri liberi (licenza OFL) presi da brand/logo/font e
//   convertiti in tracciati, per confronto.
//
// opentype.js e paper non sono tra le dipendenze del progetto. Prima di
// lanciare, tutti e due nello stesso comando (npm toglie quello che non e' in
// package.json a ogni install):
//   npm i --no-save opentype.js paper
//   node scripts/genera-logo-scritte.mjs
// Esce: src/components/admin/marchio-scritte.ts, brand/logo/bozze/scritte.png

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import opentype from "opentype.js";
import sharp from "sharp";

// paper.js fa i tagli veri sui contorni (differenza tra tracciati), senza
// maschere: il logo resta fatto di soli tracciati pieni.
const paper = createRequire(import.meta.url)("paper/dist/paper-core.js");
paper.setup(new paper.Size(10, 10));

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontDir = join(root, "brand", "logo", "font");

const NOMI = {
  fitprimo: ["FIT", "PRIMO"],
  fitelite: ["FIT", "ELITE"],
  fitelan: ["FIT", "ELAN"],
};

// Il logo sta in una fascia alta 100, come il simbolo. Le maiuscole della
// scritta sono alte CAP e centrate in verticale sul simbolo.
const CAP = 56;
const CIMA = 50 - CAP / 2;
const BASE = 50 + CAP / 2;
const TAN = Math.tan((9 * Math.PI) / 180);

/* ------------------------------------------------------ lettere su misura */

// Griglia alta 100, asta spessa 22. Ogni lettera: larghezza, forme piene,
// fori. Le forme staccate (la barretta di F ed E) riprendono la traversa
// sospesa del simbolo.
const FORO_PR = [[22, 22], [50, 22], [50, 40], [22, 40]];
const BARRETTA = [[30, 39], [58, 39], [58, 61], [30, 61]];
const LETTERE = {
  F: { w: 66, forme: [[[0, 100], [0, 0], [66, 0], [66, 22], [22, 22], [22, 100]], BARRETTA] },
  E: {
    w: 66,
    forme: [[[0, 100], [0, 0], [66, 0], [66, 22], [22, 22], [22, 78], [66, 78], [66, 100]], BARRETTA],
  },
  L: { w: 62, forme: [[[0, 100], [0, 0], [22, 0], [22, 78], [62, 78], [62, 100]]] },
  I: { w: 22, forme: [[[0, 100], [0, 0], [22, 0], [22, 100]]] },
  T: { w: 74, forme: [[[0, 0], [74, 0], [74, 22], [48, 22], [48, 100], [26, 100], [26, 22], [0, 22]]] },
  P: { w: 72, forme: [[[0, 100], [0, 0], [72, 0], [72, 62], [22, 62], [22, 100]]], fori: [FORO_PR] },
  R: {
    w: 76,
    forme: [[[0, 100], [0, 0], [72, 0], [72, 62], [58, 62], [76, 100], [51, 100], [34, 62], [22, 62], [22, 100]]],
    fori: [FORO_PR],
  },
  M: {
    w: 92,
    forme: [[[0, 100], [0, 0], [24, 0], [46, 50], [68, 0], [92, 0], [92, 100], [70, 100], [70, 38], [46, 92.5], [22, 38], [22, 100]]],
  },
  N: { w: 80, forme: [[[0, 100], [0, 0], [24, 0], [58, 58], [58, 0], [80, 0], [80, 100], [56, 100], [22, 42], [22, 100]]] },
  O: { w: 78, rc: 22, forme: [[[0, 0], [78, 0], [78, 100], [0, 100]]], fori: [[[22, 22], [56, 22], [56, 78], [22, 78]]], rf: 7 },
  A: {
    w: 84,
    rc: 22,
    forme: [[[0, 100], [0, 0], [84, 0], [84, 100], [62, 100], [62, 72], [22, 72], [22, 100]]],
    fori: [[[22, 22], [62, 22], [62, 50], [22, 50]]],
    rf: 5,
  },
};
// La I come manubrio in piedi: due dischi e l'impugnatura.
const I_MANUBRIO = {
  w: 48,
  rt: 6,
  forme: [[[0, 0], [48, 0], [48, 20], [35, 20], [35, 80], [48, 80], [48, 100], [0, 100], [0, 80], [13, 80], [13, 20], [0, 20]]],
};
const STACCO = 9; // spazio tra le lettere

// Raggio per vertice: spalle tonde (rc), fine delle aste appena smussata
// (rt), angoli interni quasi vivi (rv).
function raggi(poly, { rc = 10, rt = 3, rv = 2.5 }) {
  const n = poly.length;
  let area = 0;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % n];
    area += x1 * y2 - x2 * y1;
  }
  const convesso = poly.map((p1, i) => {
    const p0 = poly[(i - 1 + n) % n];
    const p2 = poly[(i + 1) % n];
    const cross = (p1[0] - p0[0]) * (p2[1] - p1[1]) - (p1[1] - p0[1]) * (p2[0] - p1[0]);
    return cross * area > 0;
  });
  const lato = (i, j) => Math.hypot(poly[i][0] - poly[j][0], poly[i][1] - poly[j][1]);
  return poly.map((_, i) => {
    if (!convesso[i]) return rv;
    const prima = (i - 1 + n) % n;
    const dopo = (i + 1) % n;
    const fine =
      (convesso[prima] && lato(i, prima) <= 24) || (convesso[dopo] && lato(i, dopo) <= 24);
    return fine ? rt : rc;
  });
}

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

function suMisura(parti, { manubrio = false } = {}) {
  const s = CAP / 100;
  const pt = (dx) => ([x, y]) => [(dx + x + (100 - y) * TAN) * s, CIMA + y * s];
  let x = 0;
  const pezzi = parti.map((parola) => {
    let d = "";
    for (const ch of parola) {
      const L = ch === "I" && manubrio ? I_MANUBRIO : LETTERE[ch];
      if (!L) throw new Error(`lettera non disegnata: ${ch}`);
      for (const f of L.forme) d += rounded(f.map(pt(x)), raggi(f, L).map((r) => r * s));
      for (const f of L.fori || []) d += rounded(f.map(pt(x)), (L.rf ?? 4) * s);
      x += L.w + STACCO;
    }
    return d;
  });
  return { w: +((x - STACCO + 100 * TAN) * s).toFixed(1), a: pezzi[0], b: pezzi[1] };
}

/* ------------------------------------------------- caratteri gia' pronti */

function daCarattere(file, parti, { inclina = true, stacco = 0 } = {}) {
  const buf = readFileSync(join(fontDir, file));
  const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  const em = font.unitsPerEm;
  const cap = (font.tables.os2.sCapHeight || font.charToGlyph("H").getMetrics().yMax) / em;
  const size = CAP / cap;
  const t = inclina ? TAN : 0;
  const sk = (px, py) => `${(px + (BASE - py) * t).toFixed(1)} ${py.toFixed(1)}`;
  let x = 0;
  let ultimo = null;
  const pezzi = parti.map((parola) => {
    let d = "";
    for (const ch of parola) {
      const g = font.charToGlyph(ch);
      if (ultimo) x += ((font.getKerningValue(ultimo, g) || 0) / em) * size;
      for (const c of g.getPath(x, BASE, size).commands) {
        if (c.type === "M" || c.type === "L") d += c.type + sk(c.x, c.y);
        else if (c.type === "Q") d += `Q${sk(c.x1, c.y1)} ${sk(c.x, c.y)}`;
        else if (c.type === "C") d += `C${sk(c.x1, c.y1)} ${sk(c.x2, c.y2)} ${sk(c.x, c.y)}`;
        else if (c.type === "Z") d += "Z";
      }
      x += (g.advanceWidth / em) * size + stacco * size;
      ultimo = g;
    }
    return d;
  });
  return { w: +(x + CAP * t).toFixed(1), a: pezzi[0], b: pezzi[1] };
}

/* ------------------------------------------- Kanit ritoccato (scelta 03/10) */

// Calogero ha scelto Kanit Black Italic, "pero' modificato leggermente per
// renderlo originale e unico". I ritocchi sono tagli sottili, tutti con la
// stessa larghezza, che riprendono la traversa sospesa del simbolo AM:
//   - la barretta di mezzo di F ed E si stacca dall'asta
//   - la gamba della R si stacca dall'occhiello
//   - la traversa della A si stacca dalla gamba destra
// Le misure sono in unita' del carattere (em 1000, maiuscole 644, pendenza 12
// gradi), lette dai contorni dei glifi.
const K = { em: 1000, cap: 644, pend: Math.tan((12 * Math.PI) / 180) };
// Le misure cambiano con il peso del carattere. Calogero il 03/10 ha chiesto
// il Tondo sospeso "leggermente meno in grassetto": dal Black all'ExtraBold.
//   asta:   x del bordo destro dell'asta di F, E, R sulla linea di base
//   barra:  da dove a dove sta, in altezza, la barretta di mezzo di F ed E
//   r:      la giuntura tra gamba e occhiello della R, da sinistra a destra
//   a:      il bordo interno della gamba destra della A, lungo la traversa
const PESI = {
  black: { file: "Kanit-BlackItalic.ttf", asta: 221, barra: [232, 412], r: [[265, 164], [515, 208]], a: [[444, 120], [447, 285]] },
  extra: { file: "Kanit-ExtraBoldItalic.ttf", asta: 199, barra: [240, 403], r: [[267, 176], [498, 216]], a: [[445, 128], [449, 278]] },
  bold: { file: "Kanit-BoldItalic.ttf", asta: 177, barra: [249, 395], r: [[269, 188], [482, 225]], a: [[442, 137], [443, 272]] },
};

/** Tagli per lettera: poligoni in unita' del carattere, y verso l'alto. */
function tagliKanit(ch, G, P, { striscia = false } = {}) {
  const astaDx = (y) => P.asta + K.pend * y;
  const t = [];
  if (ch === "F" || ch === "E") {
    // tra l'asta e la barretta di mezzo
    const [giu, su] = [P.barra[0] - 12, P.barra[1] + 12];
    t.push([[astaDx(giu) + 0.5, giu], [astaDx(su) + 0.5, su], [astaDx(su) + G, su], [astaDx(giu) + G, giu]]);
  }
  if (ch === "R") {
    // fascia dove la gamba entra nell'occhiello. Sale verso destra come la
    // giuntura vera: orizzontale lasciava un becco sottile attaccato
    // all'occhiello.
    const [[sx, sy], [dx, dy]] = P.r;
    const y0 = sy - G / 2;
    const sale = ((dy - sy) / (dx - sx)) * (760 - astaDx(y0));
    t.push([[astaDx(y0) + 0.5, y0], [astaDx(y0 + G) + 0.5, y0 + G], [760, y0 + G + sale], [760, y0 + sale]]);
  }
  if (ch === "A") {
    // lungo il bordo interno della gamba destra, per l'altezza della traversa
    const [[x1, y1], [x2, y2]] = P.a;
    const bordo = (y) => x1 + ((x2 - x1) / (y2 - y1)) * (y - y1);
    const [giu, su] = [y1 - 12, y2 + 12];
    t.push([[bordo(giu) - G, giu], [bordo(su) - G, su], [bordo(su) - 0.5, su], [bordo(giu) - 0.5, giu]]);
  }
  if (striscia) {
    // una riga di velocita' che attraversa tutta la lettera
    const y0 = 150;
    t.push([[-200, y0], [-200, y0 + G], [1100, y0 + G], [1100, y0]]);
  }
  return t;
}

// Arrotonda gli angoli di un contorno (anche dopo i tagli): rc per gli angoli
// che sporgono, rv per quelli che rientrano. Ogni angolo viene sostituito da
// una curva che parte un po' prima e arriva un po' dopo, lungo i due lati.
function arrotonda(item, rc, rv) {
  const figli = item.children ? item.children.slice() : [item];
  const maggiore = figli.reduce((a, b) => (Math.abs(b.area) > Math.abs(a.area) ? b : a));
  const n2 = (v) => v.toFixed(2);
  let d = "";
  for (const path of figli) {
    // Via i tratti lunghi zero, che confondono le tangenti. Il punto che
    // resta eredita la maniglia d'ingresso di quello tolto: senza, la curva
    // che arriva li' si appiattisce e gli occhielli vengono a spigoli.
    for (let i = path.segments.length - 1; i >= 0; i--) {
      const c = path.curves[i];
      if (c && c.length < 0.01) {
        c.segment2.handleIn = path.segments[i].handleIn.clone();
        path.removeSegment(i);
      }
    }
    const n = path.segments.length;
    if (n < 2) continue;
    const curve = path.curves;
    const buco = path.clockwise !== maggiore.clockwise;
    // per ogni vertice: di quanto accorciare il lato che arriva e quello che parte
    const taglio = [];
    for (let i = 0; i < n; i++) {
      const cIn = curve[(i - 1 + n) % n];
      const cOut = curve[i];
      const ang = cIn.getTangentAtTime(1).getDirectedAngle(cOut.getTangentAtTime(0));
      if (Math.abs(ang) < 20) {
        taglio.push(null);
        continue;
      }
      const sporge = (ang > 0 === path.clockwise) !== buco;
      const r = sporge ? rc : rv;
      taglio.push({ prima: Math.min(r, cIn.length * 0.48), dopo: Math.min(r, cOut.length * 0.48) });
    }
    for (let i = 0; i < n; i++) {
      const c = curve[i];
      const j = (i + 1) % n;
      const t0 = taglio[i] ? c.getTimeAt(taglio[i].dopo) : 0;
      const t1 = taglio[j] ? c.getTimeAt(c.length - taglio[j].prima) : 1;
      const p = c.getPart(t0, t1);
      if (i === 0) d += `M${n2(p.point1.x)} ${n2(p.point1.y)}`;
      if (p.isStraight()) d += `L${n2(p.point2.x)} ${n2(p.point2.y)}`;
      else {
        const a = p.point1.add(p.handle1);
        const b = p.point2.add(p.handle2);
        d += `C${n2(a.x)} ${n2(a.y)} ${n2(b.x)} ${n2(b.y)} ${n2(p.point2.x)} ${n2(p.point2.y)}`;
      }
      if (taglio[j]) {
        // l'angolo: curva col vertice come punto di controllo
        const v = path.segments[j].point;
        const cj = curve[j];
        const dopo = cj.getPointAtTime(cj.getTimeAt(taglio[j].dopo));
        d += `Q${n2(v.x)} ${n2(v.y)} ${n2(dopo.x)} ${n2(dopo.y)}`;
      }
    }
    d += "Z";
  }
  return d;
}

function kanitUnico(parti, { peso = "black", G = 36, tagli = true, striscia = false, tondo = 0 } = {}) {
  const P = PESI[peso];
  const buf = readFileSync(join(fontDir, P.file));
  const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  const size = CAP / (K.cap / K.em);
  const k = size / K.em;
  let x = 0;
  let ultimo = null;
  const pezzi = parti.map((parola) => {
    let intero = "";
    for (const ch of parola) {
      const g = font.charToGlyph(ch);
      if (ultimo) x += ((font.getKerningValue(ultimo, g) || 0) / K.em) * size;
      // Il tracciato lo scrivo io dai comandi: toPathData() di opentype 2.0.0
      // sbaglia i numeri come 126.00000000000001 e scrive NaN.
      const n3 = (v) => v.toFixed(3);
      const dati = g
        .getPath(x, BASE, size)
        .commands.map((c) =>
          c.type === "Q"
            ? `Q${n3(c.x1)} ${n3(c.y1)} ${n3(c.x)} ${n3(c.y)}`
            : c.type === "C"
              ? `C${n3(c.x1)} ${n3(c.y1)} ${n3(c.x2)} ${n3(c.y2)} ${n3(c.x)} ${n3(c.y)}`
              : c.type === "Z"
                ? "Z"
                : `${c.type}${n3(c.x)} ${n3(c.y)}`
        )
        .join("");
      let lettera = new paper.CompoundPath(dati);
      // i contorni del carattere tornano al punto di partenza senza chiudersi:
      // vanno chiusi, altrimenti per paper sono linee e non forme
      for (const c of lettera.children) c.closed = true;
      const lista = tagli ? tagliKanit(ch, G, P, { striscia }) : [];
      for (const poly of lista) {
        const taglio = new paper.Path({
          segments: poly.map(([gx, gy]) => [x + gx * k, BASE - gy * k]),
          closed: true,
        });
        lettera = lettera.subtract(taglio);
      }
      // prima i tagli, poi il tondo: cosi' anche i bordi dei tagli sono tondi
      intero += tondo ? arrotonda(lettera, tondo, tondo * 0.4) : lettera.getPathData(null, 2);
      x += (g.advanceWidth / K.em) * size;
      ultimo = g;
    }
    return intero;
  });
  return { w: +x.toFixed(1), a: pezzi[0], b: pezzi[1] };
}

/* ------------------------------------------------------------------ uscita */

const STILI = {
  misura: (p) => suMisura(p),
  manubrio: (p) => suMisura(p, { manubrio: true }),
  kanit: (p) => daCarattere("Kanit-BlackItalic.ttf", p, { inclina: false }),
  kanitSospesa: (p) => kanitUnico(p),
  kanitStriscia: (p) => kanitUnico(p, { G: 24, striscia: true }),
  kanitTondo: (p) => kanitUnico(p, { tagli: false, tondo: 4.5 }),
  kanitMoltoTondo: (p) => kanitUnico(p, { tagli: false, tondo: 8.5 }),
  kanitTondoSospesa: (p) => kanitUnico(p, { tondo: 4.5 }),
  // la stessa, un passo e due passi meno grassa
  kanitTondoSospesaExtra: (p) => kanitUnico(p, { peso: "extra", G: 33, tondo: 4.1 }),
  kanitTondoSospesaBold: (p) => kanitUnico(p, { peso: "bold", G: 30, tondo: 3.7 }),
  kanitMoltoTondoSospesa: (p) => kanitUnico(p, { tondo: 8.5 }),
  chakra: (p) => daCarattere("ChakraPetch-BoldItalic.ttf", p, { inclina: false, stacco: 0.01 }),
  russo: (p) => daCarattere("RussoOne-Regular.ttf", p),
  goldman: (p) => daCarattere("Goldman-Bold.ttf", p),
  racing: (p) => daCarattere("RacingSansOne-Regular.ttf", p, { inclina: false }),
  krona: (p) => daCarattere("KronaOne-Regular.ttf", p),
  saira: (p) => daCarattere("SairaCondensed-Black.ttf", p, { stacco: 0.02 }),
};
// quali finiscono nell'admin: gli altri restano solo nel foglio di confronto
const scelti = (process.argv[2] || Object.keys(STILI).join(",")).split(",");

const simboli = readFileSync(join(root, "src", "components", "admin", "marchio-simboli.ts"), "utf8");
const m = simboli.match(/tech: \{ w: ([\d.]+), d: "([^"]+)" \}/);
const SIMBOLO = { w: +m[1], d: m[2] };
const SPAZIO = 24;

const scritte = {};
for (const [id, fn] of Object.entries(STILI)) {
  scritte[id] = {};
  for (const [nome, parti] of Object.entries(NOMI)) scritte[id][nome] = fn(parti);
}

const logoSvg = (s) => {
  const x0 = SIMBOLO.w + SPAZIO;
  const W = +(x0 + s.w).toFixed(1);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 ${W + 20} 120"><rect x="-10" y="-10" width="${W + 20}" height="120" fill="#fff"/><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${SIMBOLO.w}" y2="100"><stop offset="0" stop-color="#ff2b3a"/><stop offset="1" stop-color="#c1000f"/></linearGradient></defs><path d="${SIMBOLO.d}" fill="url(#g)"/><g transform="translate(${x0} 0)" fill-rule="evenodd"><path d="${s.a}" fill="#121214"/><path d="${s.b}" fill="#e30613"/></g></svg>`;
};

const righe = [];
let y = 0;
for (const id of Object.keys(STILI)) {
  const png = await sharp(Buffer.from(logoSvg(scritte[id].fitprimo)), { density: 200 }).resize({ height: 110 }).png().toBuffer();
  righe.push({ input: png, left: 10, top: y + 5 });
  y += 120;
}
await sharp({ create: { width: 760, height: y, channels: 3, background: "#ffffff" } })
  .composite(righe)
  .png()
  .toFile(join(root, "brand", "logo", "bozze", "scritte.png"));

const ts = `// Generato da scripts/genera-logo-scritte.mjs: non modificare a mano.
// Scritte del logo in tracciati. Fascia alta 100 come il simbolo; a e' la
// prima meta' del nome, b la seconda. Vanno riempite con fill-rule evenodd.

export const SCRITTE = {
${scelti
  .map(
    (id) =>
      `  ${id}: {\n${Object.entries(scritte[id])
        .map(([nome, s]) => `    ${nome}: { w: ${s.w}, a: "${s.a}", b: "${s.b}" },`)
        .join("\n")}\n  },`
  )
  .join("\n")}
} as const;

export type ScrittaId = keyof typeof SCRITTE;
export type NomeId = keyof (typeof SCRITTE)[ScrittaId];
/** spazio tra simbolo e scritta */
export const SPAZIO = ${SPAZIO};
`;
writeFileSync(join(root, "src", "components", "admin", "marchio-scritte.ts"), ts);
console.log("stili nel foglio:", Object.keys(STILI).join(", "));
console.log("stili scritti per l'admin:", scelti.join(", "), "|", (ts.length / 1024).toFixed(0), "KB");
