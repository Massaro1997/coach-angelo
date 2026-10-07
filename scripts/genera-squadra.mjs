// Le immagini d'esempio del sito nuovo, fatte dal modello:
//
//  1. le tre figure della fascia "Dein Trainerteam", a braccia conserte,
//     sullo stesso fondo e con la stessa luce, come i ritratti scontornati di
//     Trainex. Calogero, 04/10/2026: "metti 3 persone a braccia conserte, il
//     primo è Angelo e gli altri due inventali uguale", poi "il secondo una
//     femmina bionda" e "il terzo con una veste da dottore, ad esempio che fa
//     l'alimentazione";
//  2. la foto della fascia "noi aiutiamo le persone" (la "Stay Fit And
//     Healthy" di Trainex): "una foto di Angelo che abbraccia una cliente,
//     con la maglia con scritto FITPRIMO con il logo";
//  3. il manubrio scontornato che in quella fascia sta sull'angolo della foto.
//
// ATTENZIONE, sono immagini d'esempio per giudicare l'impaginazione:
//  - Angelo e' rifatto dal modello partendo dalle sue foto vere (nelle foto
//    che abbiamo e' sempre a torso nudo, mai a braccia conserte, mai con una
//    cliente): prima di pubblicarle le deve vedere lui, o si fanno foto vere;
//  - la trainer, il nutrizionista e la cliente NON esistono. In produzione la
//    fascia della squadra resta spenta (SQUADRA_PRONTA in src/app/page.tsx)
//    finche' non ci sono due persone vere con nome e foto.
//
// google/nano-banana-pro su Replicate, una generazione alla volta. Il token
// sta nel .env.local di direzionex-site, o in REPLICATE_API_TOKEN.
//
//   node scripts/genera-squadra.mjs              tutte (salta le fatte)
//   node scripts/genera-squadra.mjs angelo       solo quella, anche se c'e'
//
// Esce: brand/squadra/<nome>.png (originale 2K)
// Poi:  python scripts/scontorna-squadra.py  ->  public/images/squadra/<nome>.png
//       (la foto con la cliente non si scontorna: esce gia' qui in
//       public/images/squadra/angelo-cliente.jpg)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOLO = process.argv.slice(2);
const out = join(root, "brand", "squadra");
const outWeb = join(root, "public", "images", "squadra");
mkdirSync(out, { recursive: true });
mkdirSync(outWeb, { recursive: true });

function token() {
  if (process.env.REPLICATE_API_TOKEN) return process.env.REPLICATE_API_TOKEN;
  const f = join(root, "..", "..", "Progetti in Corso", "DirezioneX", "direzionex-site", ".env.local");
  const riga = readFileSync(f, "utf8").split(/\r?\n/).find((r) => r.startsWith("REPLICATE_API_TOKEN="));
  if (!riga) throw new Error("REPLICATE_API_TOKEN non trovato");
  return riga.slice("REPLICATE_API_TOKEN=".length).trim().replace(/^["']|["']$/g, "");
}

// Le foto di riferimento si mandano rimpicciolite: bastano 1400 px.
async function riferimento(percorso) {
  const b = await sharp(join(root, percorso)).rotate().resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 88 }).toBuffer();
  return `data:image/jpeg;base64,${b.toString("base64")}`;
}

const FOTO_ANGELO = [
  "public/images/Foto Angelo/angelo-3.jpg",
  "public/images/Foto Angelo/angelo-2.jpg",
  "public/images/Foto Angelo/angelo normale.jpg",
];
const LOGO = "brand/logo/fitprimo/riferimenti/rif-su-nero.jpg";

// Secondo giro: il primo ritratto somigliava a meta' (viso piu' pieno e
// simmetrico del vero, braccia da culturista, barba troppo disegnata, denti
// finti, pelle lucida) e in basso era comparsa una scarpa presa dalla foto
// in palestra. Per questo qui si dice anche cosa NON fare.
const IDENTITA =
  "Keep his identity exactly as in the reference photos of him. It must be recognisably the same real person, not a prettier version: the same long, narrow face with slightly hollow cheeks and a prominent chin, the same nose, the same dark eyes, the same thick dark eyebrows, the same short black hair slicked back on top with faded short sides, the same thin moustache with only light, patchy stubble on chin and jaw (no groomed beard line), the same small hoop earring with a cross in his left ear. His build is that of a lean physique athlete as in the references: wide shoulders, narrow waist, defined but slim arms, not bulky bodybuilder arms and not a thick neck. Natural everyday light olive Mediterranean skin as in the gym reference photo, matte, no oil, no shine, no heavy tan. Do not smooth or beautify his face.";

// Uguale per tutti e tre i ritratti: e' quello che li fa sembrare una squadra.
const scena = (chi, suo, viso = "friendly natural smile") =>
  `${chi} stands facing the camera with ${suo} arms crossed over ${suo} chest, shoulders square, relaxed confident posture, ${viso}, looking straight into the lens. Framing: vertical portrait from the top of the head down to mid-thigh, the whole head and both elbows fully inside the frame, centered, with some empty space above the head and at both sides. Background: plain seamless light grey studio backdrop, evenly lit, completely empty, no props, no floor line. Soft frontal studio lighting, sharp focus, photorealistic commercial studio portrait, natural skin texture with pores, realistic hands with five fingers, no CGI look, no text, no watermark.`;

// "La bocca falla un po più chiusa perché così sembra un po troppo strano lui".
const BOCCA = "a calm, confident, closed-mouth smile with the lips together and no teeth showing";

const MAGLIA =
  "He wears a fitted plain black crew-neck athletic T-shirt with no print, no logo and no text on it, and black training trousers.";

const FIGURE = {
  angelo: {
    rif: FOTO_ANGELO,
    prompt: `Studio portrait of the man shown in the reference photos. ${IDENTITA} ${MAGLIA} ${scena("He", "his", BOCCA)} Take only his face, hair and build from the reference photos: nothing else from them may appear, no shoes, no feet, no medal, no gym equipment, no objects of any kind.`,
  },
  // "il secondo trainer una femmina bionda" (Calogero, 04/10)
  trainer: {
    rif: [],
    prompt: `Studio portrait of a female personal trainer, about 29 years old: long blonde hair tied back in a high ponytail, blue eyes, fair skin with light natural make-up, fit athletic toned build with defined shoulders and arms. She wears a fitted plain black crew-neck athletic T-shirt with no print, no logo and no text on it, and black training leggings. ${scena("She", "her")}`,
  },
  ernaehrung: {
    rif: [],
    prompt: `Studio portrait of a male nutrition expert, about 38 years old: short dark blond hair neatly combed, clean shaven, thin modern glasses with a dark frame, fair skin, slim fit build. He wears a clean white knee-length doctor's lab coat, open, over a plain black crew-neck T-shirt with no print, and dark trousers. The lab coat has no name tag, no badge, no embroidery and no text. No stethoscope. ${scena("He", "his")}`,
  },
  // La foto "noi aiutiamo le persone", come i tre in piedi in palestra di
  // Trainex: Angelo, una cliente e la trainer bionda della squadra. Nessun
  // abbraccio, logo piccolo sul petto a sinistra.
  "angelo-cliente": {
    rif: [...FOTO_ANGELO, "brand/squadra/trainer.png", LOGO],
    formato: "3:2",
    web: "jpg",
    prompt: `Photorealistic commercial lifestyle photograph taken inside a bright modern gym. Three people stand next to each other in a relaxed, natural way, shoulder to shoulder but not touching and not hugging, all looking into the camera, happy and proud after a training session. On the left: a male personal trainer, who is the man shown in the first three reference photos. ${IDENTITA} His expression is ${BOCCA}. He stands upright with his hands relaxed, one hand holding a small black towel. In the middle: their client, a woman about 35 years old with shoulder-length brown hair in a ponytail, natural look, normal healthy body, wearing a plain light grey sports T-shirt with no print and no logo, holding a water bottle, smiling happily. On the right: a female personal trainer, who is the blonde woman shown in the fourth reference image: keep her face, her long blonde ponytail and her athletic build. She smiles and stands with her hands on her hips. Both trainers wear the same fitted black crew-neck athletic T-shirt. Each trainer T-shirt carries the logo from the last reference image as a SMALL chest print on the wearer's left side of the chest, over the heart, about 8 centimetres wide, like a small embroidered company logo on a staff shirt: the slanted AM monogram followed by the word FITPRIMO, in white and red, reproduced exactly with the same letter shapes and proportions, spelled correctly. The rest of the T-shirt is plain black: no large print, no logo in the centre of the chest, no other text. Framing: horizontal, all three people from the head to the waist, all fully inside the frame with a little space around them. Background: bright modern gym with large windows, a black dumbbell rack and machines softly out of focus, natural daylight. Natural skin tones and matte skin texture, realistic hands with five fingers, shallow depth of field, sharp focus on the faces, no CGI look, no other text, no watermark, no other logos anywhere.`,
  },
  // Il manubrio sull'angolo della foto, come in Trainex.
  manubrio: {
    rif: [],
    formato: "4:3",
    prompt: `Product photograph of a single hexagonal rubber dumbbell lying on its side, seen from a three-quarter angle slightly from above. Matte black rubber hex heads, chrome knurled steel handle, a thin red ring on each head near the handle. No text, no numbers, no brand, no logo on it. Plain seamless pure white studio background, soft even lighting, a very faint soft shadow under it, the whole dumbbell fully inside the frame with empty space around it, sharp focus, photorealistic, no CGI look.`,
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
  let corpo = {};
  try {
    corpo = testo ? JSON.parse(testo) : {};
  } catch {
    corpo = { testo: testo.slice(0, 300) };
  }
  return { stato: r.status, corpo };
}

async function genera(nome, figura) {
  const ingresso = {
    prompt: figura.prompt,
    aspect_ratio: figura.formato || "3:4",
    resolution: "2K",
    output_format: "png",
  };
  if (figura.rif.length) ingresso.image_input = await Promise.all(figura.rif.map(riferimento));

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
  // copia piccola per guardarla senza caricare il 2K
  await sharp(img).resize({ width: 900 }).jpeg({ quality: 82 }).toFile(join(out, `${nome}-piccola.jpg`));
  // le foto intere (non da scontornare) vanno subito nel sito
  if (figura.web === "jpg") {
    await sharp(img).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 86 }).toFile(join(outWeb, `${nome}.jpg`));
  }
  const m = await sharp(img).metadata();
  return { id: p.id, secondi: Math.round((Date.now() - inizio) / 1000), misura: `${m.width}x${m.height}` };
}

const lista = Object.entries(FIGURE).filter(([nome]) => !SOLO.length || SOLO.includes(nome));
for (const [nome, figura] of lista) {
  if (!SOLO.length && existsSync(join(out, `${nome}.png`))) {
    console.log(`${nome}: c'e' gia', salto`);
    continue;
  }
  try {
    const r = await genera(nome, figura);
    console.log(`${nome}: fatta in ${r.secondi} s, ${r.misura} (${r.id})`);
  } catch (e) {
    console.log(`${nome}: ERRORE ${e.message}`);
  }
  await attendi(11000);
}
console.log("fine");
