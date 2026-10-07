// Logo definitivo in tutte le versioni (rebranding 2026).
//
// Scelte di Calogero del 03/10/2026:
//   simbolo  techDodici            (AM, giunture tonde, 12 gradi come la scritta)
//   scritta  kanitTondoSospesaBold (Kanit Bold, angoli tondi, tagli sospesi)
// Il nome si passa da riga di comando, cosi' cambiarlo e' un comando solo:
//   node scripts/genera-logo-finale.mjs fitprimo
// Legge i tracciati gia' generati (marchio-simboli.ts, marchio-scritte.ts) e
// scrive SVG e PNG in brand/logo/<nome>/.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const NOME = process.argv[2] || "fitprimo";
const SIMBOLO = "techDodici";
const SCRITTA = "kanitTondoSospesaBold";
const out = join(root, "brand", "logo", NOME);
mkdirSync(out, { recursive: true });

const ROSSO_CHIARO = "#ff2b3a";
const ROSSO = "#e30613";
const ROSSO_SCURO = "#c1000f";
const NERO = "#121214";
const SPAZIO = 24;

const simboli = readFileSync(join(root, "src", "components", "admin", "marchio-simboli.ts"), "utf8");
const s = simboli.match(new RegExp("\\n  " + SIMBOLO + ': \\{ w: ([\\d.]+), d: "([^"]+)" \\}'));
const scritte = readFileSync(join(root, "src", "components", "admin", "marchio-scritte.ts"), "utf8");
const blocco = scritte.slice(scritte.indexOf("  " + SCRITTA + ": {"));
const t = blocco.match(new RegExp(NOME + ': \\{ w: ([\\d.]+), a: "([^"]+)", b: "([^"]+)" \\}'));
if (!s || !t) throw new Error("simbolo o scritta non trovati: rilanciare i due generatori");

const SW = +s[1];
const X0 = SW + SPAZIO;
const W = +(X0 + +t[1]).toFixed(1);
const sfumatura = `<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${SW}" y2="100"><stop offset="0" stop-color="${ROSSO_CHIARO}"/><stop offset="1" stop-color="${ROSSO_SCURO}"/></linearGradient></defs>`;

/** Logo intero. m = margine attorno, in unita' del disegno (altezza 100). */
function logo({ simbolo, a, b, fondo, m = 0 }) {
  const usaSfumatura = simbolo === "sfumato";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-m} ${-m} ${W + 2 * m} ${100 + 2 * m}">${usaSfumatura ? sfumatura : ""}${
    fondo ? `<rect x="${-m}" y="${-m}" width="${W + 2 * m}" height="${100 + 2 * m}" fill="${fondo}"/>` : ""
  }<path d="${s[2]}" fill="${usaSfumatura ? "url(#g)" : simbolo}"/><g transform="translate(${X0} 0)" fill-rule="evenodd"><path d="${t[2]}" fill="${a}"/><path d="${t[3]}" fill="${b}"/></g></svg>\n`;
}

function soloSimbolo({ colore, fondo, m = 0 }) {
  const usaSfumatura = colore === "sfumato";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-m} ${-m} ${SW + 2 * m} ${100 + 2 * m}">${usaSfumatura ? sfumatura : ""}${
    fondo ? `<rect x="${-m}" y="${-m}" width="${SW + 2 * m}" height="${100 + 2 * m}" fill="${fondo}"/>` : ""
  }<path d="${s[2]}" fill="${usaSfumatura ? "url(#g)" : colore}"/></svg>\n`;
}

function tessera() {
  const S = 512;
  const k = (S * 0.62) / SW;
  const tx = ((S - SW * k) / 2).toFixed(1);
  const ty = ((S - 100 * k) / 2).toFixed(1);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${ROSSO_CHIARO}"/><stop offset="1" stop-color="${ROSSO_SCURO}"/></linearGradient></defs><rect width="${S}" height="${S}" rx="115" fill="url(#g)"/><path transform="translate(${tx} ${ty}) scale(${k.toFixed(4)})" d="${s[2]}" fill="#fff"/></svg>\n`;
}

const file = {
  // su fondo chiaro
  "logo-colore": logo({ simbolo: "sfumato", a: NERO, b: ROSSO }),
  // su fondo scuro
  "logo-su-scuro": logo({ simbolo: "sfumato", a: "#ffffff", b: ROSSO_CHIARO }),
  "logo-bianco": logo({ simbolo: "#ffffff", a: "#ffffff", b: "#ffffff" }),
  "logo-nero": logo({ simbolo: NERO, a: NERO, b: NERO }),
  "logo-rosso": logo({ simbolo: ROSSO, a: ROSSO, b: ROSSO }),
  "simbolo-colore": soloSimbolo({ colore: "sfumato" }),
  "simbolo-bianco": soloSimbolo({ colore: "#ffffff" }),
  "simbolo-nero": soloSimbolo({ colore: NERO }),
  tessera: tessera(),
};

for (const [nome, svg] of Object.entries(file)) {
  writeFileSync(join(out, `${NOME}-${nome}.svg`), svg);
  const largo = nome.startsWith("logo") ? 2400 : nome === "tessera" ? 512 : 1200;
  await sharp(Buffer.from(svg), { density: 600 }).resize({ width: largo }).png().toFile(join(out, `${NOME}-${nome}.png`));
}
// favicon e icone
for (const lato of [32, 180, 192]) {
  await sharp(Buffer.from(file.tessera), { density: 300 }).resize(lato, lato).png().toFile(join(out, `${NOME}-icona-${lato}.png`));
}
// Riferimenti per i generatori di immagini: logo su fondo pieno, con margine.
const rif = {
  "rif-su-bianco": logo({ simbolo: "sfumato", a: NERO, b: ROSSO, fondo: "#ffffff", m: 30 }),
  "rif-su-nero": logo({ simbolo: "sfumato", a: "#ffffff", b: ROSSO_CHIARO, fondo: NERO, m: 30 }),
  "rif-bianco-su-nero": logo({ simbolo: "#ffffff", a: "#ffffff", b: "#ffffff", fondo: NERO, m: 30 }),
  "rif-simbolo-su-bianco": soloSimbolo({ colore: "sfumato", fondo: "#ffffff", m: 30 }),
};
mkdirSync(join(out, "riferimenti"), { recursive: true });
for (const [nome, svg] of Object.entries(rif)) {
  await sharp(Buffer.from(svg), { density: 600 }).resize({ width: 1400 }).jpeg({ quality: 92 }).toFile(join(out, "riferimenti", `${nome}.jpg`));
}

// anteprima unica, piccola, per guardare tutto insieme
const righe = [];
let y = 10;
for (const [nome, fondo] of [["logo-colore", "#ffffff"], ["logo-su-scuro", NERO], ["logo-bianco", ROSSO], ["logo-nero", "#f4f4f5"]]) {
  const img = await sharp(join(out, `${NOME}-${nome}.png`)).resize({ width: 520 }).toBuffer();
  const h = (await sharp(img).metadata()).height;
  righe.push({ input: await sharp({ create: { width: 600, height: h + 40, channels: 3, background: fondo } }).composite([{ input: img, left: 40, top: 20 }]).png().toBuffer(), left: 10, top: y });
  y += h + 50;
}
righe.push({ input: await sharp(join(out, `${NOME}-tessera.png`)).resize(120, 120).toBuffer(), left: 640, top: 10 });
righe.push({ input: await sharp(join(out, `${NOME}-icona-32.png`)).toBuffer(), left: 780, top: 54 });
await sharp({ create: { width: 840, height: y, channels: 3, background: "#ffffff" } }).composite(righe).png().toFile(join(out, "anteprima.png"));

console.log(`Logo ${NOME}: ${Object.keys(file).length} versioni in brand/logo/${NOME}, larghezza ${W} su altezza 100`);
