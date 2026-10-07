// La foto profilo di Angelo rifatta da professionista, partendo dalle sue foto
// vere in "public/Foto Profilo Angelo" (maglia nera, braccia conserte, muro di
// casa). Calogero, 06/10/2026: "rifarla professionalmente con la maglia nera
// pero con il logo fitprimo".
//
// Non e' una foto inventata: e' un ritocco della sua. Il modello deve lasciare
// lui identico (viso, capelli, orecchino, posa, orologio, maglia) e cambiare
// solo fondo e luce, piu' il logo piccolo sul petto. Sulle foto di Angelo i
// "miglioramenti" non gli piacciono: niente viso abbellito.
//
// google/nano-banana-pro su Replicate, una alla volta. Token come in
// genera-squadra.mjs.
//
//   node scripts/genera-foto-profilo.mjs            tutte (salta le fatte)
//   node scripts/genera-foto-profilo.mjs chiaro-a   solo quella, anche se c'e'
//
// Esce: brand/foto-profilo/<nome>.png (2K) e <nome>-piccola.jpg

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOLO = process.argv.slice(2);
const out = join(root, "brand", "foto-profilo");
mkdirSync(out, { recursive: true });

function token() {
  if (process.env.REPLICATE_API_TOKEN) return process.env.REPLICATE_API_TOKEN;
  const f = join(root, "..", "..", "Progetti in Corso", "DirezioneX", "direzionex-site", ".env.local");
  const riga = readFileSync(f, "utf8").split(/\r?\n/).find((r) => r.startsWith("REPLICATE_API_TOKEN="));
  if (!riga) throw new Error("REPLICATE_API_TOKEN non trovato");
  return riga.slice("REPLICATE_API_TOKEN=".length).trim().replace(/^["']|["']$/g, "");
}

async function riferimento(percorso) {
  const b = await sharp(join(root, percorso)).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 92 }).toBuffer();
  return `data:image/jpeg;base64,${b.toString("base64")}`;
}

const DIR = "public/Foto Profilo Angelo";
const LOGO = "brand/logo/fitprimo/riferimenti/rif-su-nero.jpg";

// "Ti ho detto professionale" (06/10): non un ritocco del muro di casa ma un
// servizio fotografico vero, con la sua faccia e la sua posa.
const TIENI =
  "Recreate the man from the first reference image as a professional studio photoshoot portrait. He must be exactly the same real person, instantly recognisable: same long narrow face, same prominent chin, same nose, same dark eyes, same thick dark eyebrows, same short black hair slicked back with faded sides, same thin moustache and light stubble, same small silver hoop earring with a cross in his left ear, same olive Mediterranean skin, same athletic muscular build with big arms. Do not beautify, slim or change his face. Same confident pose: standing, arms crossed over his chest, slight turn of the body, calm confident closed-mouth expression, looking into the lens, silver wristwatch on his wrist. He wears a perfectly fitted, clean, premium black crew-neck athletic T-shirt without wrinkles. Framing: vertical half-body portrait from just above the head to the waist, centered, some space above the head.";

const LOGO_PETTO =
  "Add the logo from the second image as a small print on the T-shirt, on the wearer's left side of the chest (the right side of the picture), over the heart, above the crossed arms and fully visible, about 9 centimetres wide, like a small printed company logo on a staff shirt: the slanted red AM monogram followed by the word FITPRIMO, with FIT in white and PRIMO in red, reproduced exactly with the same letter shapes and proportions, spelled correctly, following the curve and the folds of the fabric. No other print, no other text, no logo in the centre of the chest.";

const FINE =
  "Shot by a professional photographer on a full-frame camera with an 85mm lens at f/4, tack-sharp focus on the eyes, natural skin texture with pores, matte skin, true-to-life colours, high-end personal trainer branding photo, no CGI look, no watermark, no other text anywhere.";

const VERSIONI = {
  // fondo grigio chiaro: va con il sito chiaro (tema .fp)
  "chiaro-a": {
    foto: "WhatsApp Image 2026-10-05 a2.jpeg",
    fondo: "Replace the wall behind him with a plain seamless light grey photo studio backdrop with a soft subtle gradient, slightly lighter behind his head, completely empty: no shadows of objects, no hooks, no wall, no floor line. Professional studio lighting: a large soft key light from the front left, a soft fill light, a subtle rim light separating his shoulders and hair from the background, even and flattering but natural.",
  },
  "chiaro-b": {
    foto: "WhatsApp Image 2026-10-022.jpeg",
    fondo: "Replace the wall behind him with a plain seamless light grey photo studio backdrop with a soft subtle gradient, slightly lighter behind his head, completely empty: no shadows of objects, no hooks, no wall, no floor line. Professional studio lighting: a large soft key light from the front left, a soft fill light, a subtle rim light separating his shoulders and hair from the background, even and flattering but natural.",
  },
  // fondo scuro: per profili social e biglietto, piu' da "brand"
  "scuro-a": {
    foto: "WhatsApp Image 2026-10-05 a2.jpeg",
    fondo: "Replace the wall behind him with a plain seamless dark charcoal grey photo studio backdrop with a soft gradient, slightly lighter behind his head, completely empty. Professional low-key studio lighting: a soft key light from the front left, gentle fill, and a clean white rim light on his shoulders, arms and hair that separates the black T-shirt from the dark background.",
  },
  // Ritocco di chiaro-a (06/10, Calogero per Angelo): via il neo scuro sulla
  // guancia vicino all'orecchio, e braccia, petto e spalle "leggermente poco
  // muscolosi": piu' grossi. Si parte dalla foto gia' fatta, non dal muro.
  "chiaro-a-ritocco": {
    sorgente: "brand/foto-profilo/chiaro-a.png",
    prompt: RITOCCO(),
  },
  "chiaro-a-ritocco-2": {
    sorgente: "brand/foto-profilo/chiaro-a.png",
    prompt: RITOCCO(),
  },
};

function RITOCCO() {
  return "Retouch this exact photograph. Keep everything identical: the same man, the same face and expression, the same hair, the same earring, the same pose with arms crossed, the same wristwatch, the same black T-shirt with the same small FITPRIMO logo on the chest exactly as it is, the same light grey studio background, the same lighting, framing and colours. Only two changes: 1) remove the small dark mole on his cheek near his left ear (the right side of the picture), leaving clean natural skin with its texture; keep everything else on the face unchanged. 2) make him noticeably more muscular, like a competitive men's physique athlete in season: bigger, rounder and more defined shoulders (deltoids), bigger biceps and forearms with visible veins, a fuller and thicker chest filling the T-shirt, the T-shirt sleeves tight around the arms. Keep it realistic and natural, same proportions of the head, no oiled skin, no CGI look.";
}

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

async function genera(nome, v) {
  const ingresso = {
    prompt: v.prompt || `${TIENI} ${v.fondo} ${LOGO_PETTO} ${FINE}`,
    aspect_ratio: "3:4",
    resolution: "2K",
    output_format: "png",
    image_input: await Promise.all((v.sorgente ? [v.sorgente] : [join(DIR, v.foto), LOGO]).map(riferimento)),
  };

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
  const m = await sharp(img).metadata();
  return { id: p.id, secondi: Math.round((Date.now() - inizio) / 1000), misura: `${m.width}x${m.height}` };
}

const lista = Object.entries(VERSIONI).filter(([nome]) => !SOLO.length || SOLO.includes(nome));
for (const [nome, v] of lista) {
  if (!SOLO.length && existsSync(join(out, `${nome}.png`))) {
    console.log(`${nome}: c'e' gia', salto`);
    continue;
  }
  try {
    const r = await genera(nome, v);
    console.log(`${nome}: fatta in ${r.secondi} s, ${r.misura} (${r.id})`);
  } catch (e) {
    console.log(`${nome}: ERRORE ${e.message}`);
  }
  await attendi(11000);
}
console.log("fine");
