// Foto d'esempio del marchio (mockup) per il brand sheet.
//
// google/nano-banana-pro su Replicate, con il logo vero passato come immagine
// di riferimento. Una generazione alla volta: con poco credito Replicate ne
// accetta una sola e risponde 429 alle altre.
//
// Il token sta nel .env.local di direzionex-site (account dell'agenzia); si
// puo' anche passare con REPLICATE_API_TOKEN nell'ambiente.
//
//   node scripts/genera-mockup-brand.mjs fitprimo            tutte le scene
//   node scripts/genera-mockup-brand.mjs fitprimo insegna    solo quella
//
// Esce: brand/mockup/<nome>/<scena>.png (originale 2K)
//       public/brand/<nome>/<scena>.jpg (1600 px, per il brand sheet in admin)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const NOME = process.argv[2] || "fitprimo";
const SOLO = process.argv.slice(3);
const rif = (f) => join(root, "brand", "logo", NOME, "riferimenti", f);
const outOrig = join(root, "brand", "mockup", NOME);
const outWeb = join(root, "public", "brand", NOME);
mkdirSync(outOrig, { recursive: true });
mkdirSync(outWeb, { recursive: true });

function token() {
  if (process.env.REPLICATE_API_TOKEN) return process.env.REPLICATE_API_TOKEN;
  const f = join(root, "..", "..", "Progetti in Corso", "DirezioneX", "direzionex-site", ".env.local");
  const riga = readFileSync(f, "utf8").split(/\r?\n/).find((r) => r.startsWith("REPLICATE_API_TOKEN="));
  if (!riga) throw new Error("REPLICATE_API_TOKEN non trovato");
  return riga.slice("REPLICATE_API_TOKEN=".length).trim().replace(/^["']|["']$/g, "");
}

const FEDELE =
  "Reproduce the logo from the reference image exactly: the same slanted AM monogram followed by the word FITPRIMO, same letter shapes, same proportions, same colors. Do not redraw or restyle it, do not misspell it, do not add any other text, slogan, brand or watermark anywhere in the image.";
const FOTO =
  "Photorealistic commercial brand photography, natural contrast, shallow depth of field, sharp focus on the logo, no CGI look.";

const SCENE = {
  maglietta: {
    rif: "rif-su-nero.jpg",
    formato: "4:5",
    prompt: `A fit male personal trainer photographed from behind, from the waist up, standing in a modern premium gym. He wears a fitted black athletic T-shirt. The logo is printed large across the upper back of the T-shirt, white and red on the black fabric, following the folds of the fabric. His face is not visible. Dark gym interior with black equipment and subtle red accent lighting, blurred background. ${FEDELE} ${FOTO}`,
  },
  parete: {
    rif: "rif-su-nero.jpg",
    formato: "16:9",
    prompt: `Interior of a premium personal training studio, no people. A large matte black feature wall carries the logo as a big backlit three dimensional sign, the monogram glowing red and the word in white and red. In front of the wall: a rack of black dumbbells, kettlebells, a squat rack, black rubber floor, warm spot lighting. ${FEDELE} ${FOTO}`,
  },
  insegna: {
    rif: "rif-su-nero.jpg",
    formato: "16:9",
    prompt: `Exterior of a personal training studio on a clean German city street at dusk. Above the wide glass entrance there is a black sign panel with the logo as an illuminated sign, red monogram and white and red lettering. Through the glass you can see a modern gym interior with warm light. Wet pavement with soft reflections, no people, no cars, no other shop signs, no other text. ${FEDELE} ${FOTO}`,
  },
  bigliettini: {
    rif: "rif-su-bianco.jpg",
    formato: "4:3",
    prompt: `Close up product photo of premium business cards on a dark concrete surface. A neat stack of thick white business cards, the top card shows only the logo, centered, in its original colors on white. Next to the stack, one card lies face down showing a solid red back with nothing printed on it. Soft directional light, gentle shadows. The cards carry no address, no phone number, no name, only the logo. ${FEDELE} ${FOTO}`,
  },
  borraccia: {
    rif: "rif-su-nero.jpg",
    formato: "4:5",
    prompt: `Product photo on a black gym bench: a matte black stainless steel water bottle standing upright with the logo printed on it in white and red, and next to it a neatly folded black gym towel. Dark gym in the background, out of focus, with a hint of red light. Only the bottle carries the logo. ${FEDELE} ${FOTO}`,
  },
  reception: {
    rif: "rif-su-bianco.jpg",
    formato: "16:9",
    prompt: `Reception area of a premium personal training studio, no people. A clean white reception desk whose front panel shows the logo in its original colors, black and red on white. Behind the desk a dark anthracite wall with a single line of red LED light, a plant, a tablet on the desk. Bright, tidy, corporate. ${FEDELE} ${FOTO}`,
  },
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
  return { stato: r.status, corpo: testo ? JSON.parse(testo) : {} };
}

async function genera(slug, scena) {
  const logo = readFileSync(rif(scena.rif));
  const ingresso = {
    prompt: scena.prompt,
    aspect_ratio: scena.formato,
    resolution: "2K",
    output_format: "png",
    image_input: [`data:image/jpeg;base64,${logo.toString("base64")}`],
  };
  let p;
  for (let giro = 0; giro < 8; giro++) {
    const r = await chiama("POST", `${API}/models/google/nano-banana-pro/predictions`, { input: ingresso });
    if (r.stato === 429) {
      await attendi(12000);
      continue;
    }
    if (r.stato >= 300) throw new Error(`${slug}: creazione ${r.stato} ${JSON.stringify(r.corpo).slice(0, 300)}`);
    p = r.corpo;
    break;
  }
  if (!p) throw new Error(`${slug}: sempre 429`);
  const inizio = Date.now();
  while (!["succeeded", "failed", "canceled"].includes(p.status)) {
    if (Date.now() - inizio > 6 * 60 * 1000) throw new Error(`${slug}: oltre 6 minuti`);
    await attendi(4000);
    p = (await chiama("GET", `${API}/predictions/${p.id}`)).corpo;
  }
  if (p.status !== "succeeded") throw new Error(`${slug}: ${p.status} ${String(p.error).slice(0, 300)}`);
  const url = Array.isArray(p.output) ? p.output[0] : p.output;
  const img = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(join(outOrig, `${slug}.png`), img);
  await sharp(img).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 86 }).toFile(join(outWeb, `${slug}.jpg`));
  // copia piccola per guardarla senza caricare il 2K
  await sharp(img).resize({ width: 900 }).jpeg({ quality: 80 }).toFile(join(outOrig, `${slug}-piccola.jpg`));
  return { id: p.id, secondi: Math.round((Date.now() - inizio) / 1000) };
}

const lista = Object.entries(SCENE).filter(([slug]) => !SOLO.length || SOLO.includes(slug));
for (const [slug, scena] of lista) {
  if (!SOLO.length && existsSync(join(outOrig, `${slug}.png`))) {
    console.log(`${slug}: c'e' gia', salto`);
    continue;
  }
  try {
    const r = await genera(slug, scena);
    console.log(`${slug}: fatta in ${r.secondi} s (${r.id})`);
  } catch (e) {
    console.log(`${slug}: ERRORE ${e.message}`);
  }
  await attendi(11000);
}
console.log("fine");
