// Esporta brochure e biglietto da visita da brand/stampa/*.html, come si fa
// per la brochure DirezioneX: PDF vettoriale e PNG a 300 dpi (600 per il
// biglietto) con Chrome senza finestra, poi le copie per l'admin.
//
//   node scripts/esporta-stampa.mjs               tutto
//   node scripts/esporta-stampa.mjs brochure      solo la brochure
//   node scripts/esporta-stampa.mjs biglietto     solo il biglietto
//
// Esce:
//   brand/stampa/pdf/   brochure-fitprimo-{de,it}.pdf   biglietto-fitprimo-{de,it}.pdf
//   brand/stampa/png/   brochure-{esterno,interno}-{de,it}.png   biglietto-{fronte,retro}-{de,it}.png
//   public/brand/stampa/   gli stessi PDF, piu' le anteprime in JPG per la
//                          sezione Merchandising dell'admin

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const stampa = join(root, "brand", "stampa");
const pdf = join(stampa, "pdf");
const png = join(stampa, "png");
const web = join(root, "public", "brand", "stampa");
for (const d of [pdf, png, web]) mkdirSync(d, { recursive: true });

const CHROME = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => p && existsSync(p));
if (!CHROME) throw new Error("Chrome non trovato: passalo in CHROME");

const COSA = process.argv[2];
const LINGUE = ["de", "it"];

// I contatti stanno in brand/stampa/contatti.json: da li' si rifanno il file
// che le due pagine leggono (assets/contatti.js) e il codice QR. Cosi' sito,
// mail e telefono si cambiano in un posto solo.
const contatti = JSON.parse(readFileSync(join(stampa, "contatti.json"), "utf8"));
mkdirSync(join(stampa, "assets"), { recursive: true });
writeFileSync(join(stampa, "assets", "contatti.js"), `window.CONTATTI = ${JSON.stringify(contatti, null, 2)};\n`);
// Due codici, stessa landing (/start): cambia solo utm_source.
for (const [codice, indirizzo] of [["qr-brochure", contatti.qrBrochure], ["qr-karte", contatti.qrKarte]]) {
  execFileSync(
    "python",
    ["-c", "import segno,sys; segno.make(sys.argv[1], error='m').save(sys.argv[2], scale=10, border=0, dark='#121214', light=None)", indirizzo, join(stampa, "assets", `${codice}.svg`)],
    { stdio: "pipe" }
  );
}
console.log(`contatti: ${contatti.sito} · ${contatti.mail}${contatti.telefono ? " · " + contatti.telefono : " · senza telefono"} · codici verso ${contatti.qrBrochure} e ${contatti.qrKarte}`);

// Il tempo virtuale lascia caricare i caratteri di Google prima dello scatto.
const BASE = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-pdf-header-footer", "--virtual-time-budget=12000", "--run-all-compositor-stages-before-draw"];

function chrome(args) {
  execFileSync(CHROME, [...BASE, ...args], { stdio: "pipe", timeout: 120000 });
}
const url = (file, query) => `${pathToFileURL(join(stampa, file)).href}?${query}`;

async function scatto(file, query, uscita, larghezza, altezza) {
  chrome([`--window-size=${larghezza},${altezza}`, "--force-device-scale-factor=2", `--screenshot=${uscita}`, url(file, query)]);
  // il PNG pieno va anche nel sito: dall'admin si scarica per la tipografia
  mkdirSync(join(web, "png"), { recursive: true });
  copyFileSync(uscita, join(web, "png", uscita.split(/[\\/]/).pop()));
  const m = await sharp(uscita).metadata();
  return `${m.width}x${m.height}`;
}
function stampaPdf(file, query, uscita) {
  chrome([`--print-to-pdf=${uscita}`, url(file, query)]);
  return `${Math.round(statSync(uscita).size / 1024)} KB`;
}
async function anteprima(da, a, larghezza) {
  await sharp(da).resize({ width: larghezza }).jpeg({ quality: 86 }).toFile(a);
}

if (!COSA || COSA === "brochure") {
  for (const l of LINGUE) {
    // 303 x 216 mm a zoom 1,5625 = 1790 x 1276 px, a densita' 2 = 3580 x 2552 (300 dpi)
    for (const lato of ["esterno", "interno"]) {
      const f = join(png, `brochure-${lato}-${l}.png`);
      const misura = await scatto("brochure.html", `side=${lato}&lang=${l}`, f, 1790, 1276);
      await anteprima(f, join(web, `brochure-${lato}-${l}.jpg`), 2000);
      console.log(`brochure ${lato} ${l}: ${misura}`);
    }
    const p = join(pdf, `brochure-fitprimo-${l}.pdf`);
    console.log(`brochure pdf ${l}: ${stampaPdf("brochure.html", `lang=${l}`, p)}`);
    copyFileSync(p, join(web, `brochure-fitprimo-${l}.pdf`));
  }
}

if (!COSA || COSA === "biglietto") {
  for (const l of LINGUE) {
    // 91 x 61 mm a zoom 3,125 = 1075 x 721 px, a densita' 2 = 2150 x 1442 (600 dpi)
    for (const lato of ["fronte", "retro"]) {
      const f = join(png, `biglietto-${lato}-${l}.png`);
      const misura = await scatto("biglietto.html", `side=${lato}&lang=${l}`, f, 1075, 721);
      await anteprima(f, join(web, `biglietto-${lato}-${l}.jpg`), 1400);
      console.log(`biglietto ${lato} ${l}: ${misura}`);
    }
    const p = join(pdf, `biglietto-fitprimo-${l}.pdf`);
    console.log(`biglietto pdf ${l}: ${stampaPdf("biglietto.html", `lang=${l}`, p)}`);
    copyFileSync(p, join(web, `biglietto-fitprimo-${l}.pdf`));
  }
}
console.log("fine");
