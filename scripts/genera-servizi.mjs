// Le tre foto delle schede dei servizi in home ("Starte deinen Weg zu deiner
// besten Form").
//
// Calogero, 04/10/2026: "sostituiscile con immagini senza persone, più in
// generale, o almeno persone che si allenano generali, e anche i colori
// adesso appaiali al sito nuovo". Quelle di prima (schede.png, online.png,
// personal.png) erano della veste scura: palestra buia, neon blu e rosa, un
// uomo in posa. Queste sono chiare, senza persone, solo bianco, grigio, nero
// e il rosso del marchio.
//
// google/nano-banana-pro su Replicate, una generazione alla volta. Il token
// sta nel .env.local di direzionex-site, o in REPLICATE_API_TOKEN.
//
//   node scripts/genera-servizi.mjs            tutte (salta le fatte)
//   node scripts/genera-servizi.mjs online     solo quella, anche se c'e'
//
// Esce: brand/servizi/<nome>.png (originale 2K)
//       public/images/services/<nome>-chiaro.jpg (1600 px, per il sito)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOLO = process.argv.slice(2);
const out = join(root, "brand", "servizi");
const outWeb = join(root, "public", "images", "services");
mkdirSync(out, { recursive: true });

function token() {
  if (process.env.REPLICATE_API_TOKEN) return process.env.REPLICATE_API_TOKEN;
  const f = join(root, "..", "..", "Progetti in Corso", "DirezioneX", "direzionex-site", ".env.local");
  const riga = readFileSync(f, "utf8").split(/\r?\n/).find((r) => r.startsWith("REPLICATE_API_TOKEN="));
  if (!riga) throw new Error("REPLICATE_API_TOKEN non trovato");
  return riga.slice("REPLICATE_API_TOKEN=".length).trim().replace(/^["']|["']$/g, "");
}

// Uguale per tutte e tre: e' quello che le fa sembrare una serie sola.
const SERIE =
  "Bright, clean commercial photograph for a modern fitness brand, part of one consistent series. The colour palette is strictly limited to white, light grey, black and one accent colour, a vivid pure red. Bright natural daylight, light and airy, soft shadows. No neon light, no blue, pink or purple light, no dark moody look, no colour cast. No people, no faces, no hands. No text, no letters, no words, no numbers, no brand names, no logos, no watermark anywhere. Photorealistic, sharp focus on the main objects, gentle depth of field, real materials, no CGI look.";

const SCENE = {
  // Fertige Pläne: i piani pronti in PDF
  piani: `Top-down flat lay on a clean white desk. In the centre a black clipboard holding one printed workout plan sheet: the sheet shows only a simple table grid with small empty checkboxes and thin grey placeholder lines instead of words, nothing readable. Around it: a black pen, a pair of small black hexagonal dumbbells with a thin red ring on each head, a rolled red resistance band, a folded white towel, a black stopwatch. Tidy, generous empty space between the objects. ${SERIE}`,
  // Online Coaching
  online: `A white desk next to a large bright window. A smartphone stands upright on a small black stand; its screen shows an abstract fitness app made only of shapes: a red circular progress ring, a few red and light grey bars of a bar chart and rounded grey placeholder blocks, nothing readable. Next to it: a closed silver laptop, a matte black water bottle, white wireless earbuds in an open case, a red notebook. In the softly blurred background a bright home workout corner with a rolled black exercise mat and a black kettlebell on a light wooden floor. ${SERIE}`,
  // Personal Training in studio
  personal: `Interior of a bright modern personal training studio with white walls, large windows and a black rubber floor. In the foreground a black barbell resting on a black squat rack, loaded with red bumper plates, seen from a three-quarter angle. Beside it a black flat bench, two black kettlebells on the floor and, further back, a rack of black dumbbells, softly out of focus. Clean, tidy, premium. ${SERIE}`,

  // --- pagina Leistungen (Calogero, 04/10: "nella sezione dei servizi ci sono
  // anche delle foto che devi cambiare") ---

  // la foto accanto a "Personal Training 1-zu-1": tutto a coppie, pronto per
  // un trainer e un cliente. Due giri con la stanza intera sono venuti male
  // (soggetto piccolo, poi finto e azzurrino): le nature morte vengono vere.
  seduta: `Still life on a black rubber studio floor against a white wall, seen close from a low three-quarter angle, the objects filling the frame: two black exercise mats rolled out side by side, a pair of black dumbbells with thin red rings lying on each mat, one plain smooth red kettlebell standing between the mats, and in front of them two folded white towels and two matte black water bottles. Everything comes in pairs: it is set up for a trainer and one client. Every surface is completely plain and smooth, with no embossed marks, no engraving and no labels. The mood is personal and focused. ${SERIE}`,
  // le tre schede pronte, dalla piu' leggera alla piu' pesante
  "scheda-beginner": `Still life on a light grey studio floor against a white wall: a rolled black exercise mat, a pair of small light black dumbbells with thin red rings, a red resistance band and a white towel, arranged neatly with generous empty space. The mood is light and easy, a first step. ${SERIE}`,
  "scheda-intermediate": `Still life on a light grey studio floor against a white wall: a black kettlebell, a pair of medium-sized black hexagonal dumbbells with thin red rings, a black jump rope with red handles coiled neatly, and a white towel. The mood is focused and steady. ${SERIE}`,
  "scheda-advanced": `Still life on a black rubber studio floor against a white wall: a heavy black barbell loaded with large red bumper plates lying on the floor, a black leather lifting belt, a block of white lifting chalk and a pair of black wrist wraps beside it. The red plates are completely plain, smooth, solid red rubber discs: no embossed lettering, no weight numbers, no digits, no rings of text, no markings of any kind on their faces. The mood is strong and serious. ${SERIE}`,
};

const API = "https://api.replicate.com/v1";
const tok = token();
const attendi = (ms) => new Promise((r) => setTimeout(r, ms));

async function chiama(metodo, url, dati) {
  const r = await fetch(url, {
    method: metodo,
    headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
    body: dati ? JSON.stringify(dati) : undefined,
  });
  const testo = await r.text();
  let corpo = {};
  try {
    corpo = testo ? JSON.parse(testo) : {};
  } catch {
    corpo = { testo: testo.slice(0, 300) };
  }
  return { stato: r.status, corpo };
}

async function genera(nome, prompt) {
  const ingresso = { prompt, aspect_ratio: "4:3", resolution: "2K", output_format: "png" };
  let p;
  for (let giro = 0; giro < 8; giro++) {
    const r = await chiama("POST", `${API}/models/google/nano-banana-pro/predictions`, { input: ingresso });
    if (r.stato === 429) {
      await attendi(12000);
      continue;
    }
    if (r.stato >= 300) throw new Error(`creazione ${r.stato} ${JSON.stringify(r.corpo).slice(0, 300)}`);
    p = r.corpo;
    break;
  }
  if (!p) throw new Error("sempre 429");
  const inizio = Date.now();
  while (!["succeeded", "failed", "canceled"].includes(p.status)) {
    if (Date.now() - inizio > 6 * 60 * 1000) throw new Error("oltre 6 minuti");
    await attendi(4000);
    p = (await chiama("GET", `${API}/predictions/${p.id}`)).corpo;
  }
  if (p.status !== "succeeded") throw new Error(`${p.status} ${String(p.error).slice(0, 300)}`);
  const url = Array.isArray(p.output) ? p.output[0] : p.output;
  const img = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(join(out, `${nome}.png`), img);
  await sharp(img).resize({ width: 900 }).jpeg({ quality: 82 }).toFile(join(out, `${nome}-piccola.jpg`));
  await sharp(img).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 86 }).toFile(join(outWeb, `${nome}-chiaro.jpg`));
  const m = await sharp(img).metadata();
  return { id: p.id, secondi: Math.round((Date.now() - inizio) / 1000), misura: `${m.width}x${m.height}` };
}

const lista = Object.entries(SCENE).filter(([nome]) => !SOLO.length || SOLO.includes(nome));
for (const [nome, prompt] of lista) {
  if (!SOLO.length && existsSync(join(out, `${nome}.png`))) {
    console.log(`${nome}: c'e' gia', salto`);
    continue;
  }
  try {
    const r = await genera(nome, prompt);
    console.log(`${nome}: fatta in ${r.secondi} s, ${r.misura} (${r.id})`);
  } catch (e) {
    console.log(`${nome}: ERRORE ${e.message}`);
  }
  await attendi(11000);
}
console.log("fine");
