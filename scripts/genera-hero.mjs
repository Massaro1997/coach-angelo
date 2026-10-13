// Le foto per l'hero nuovo della home. Calogero, 13/10/2026: "delle foto fatte
// bene di Angelo con la maglia fitprimo che aiuta delle persone ad allenarsi,
// in stile pulito senza sfondo, in modo che cambiamo la hero".
//
// E' una foto da studio su fondo chiaro pieno, da scontornare
// (scripts/scontorna-hero-scene.py) e mettere sulle forme dell'hero al posto
// della foto da gara.
//
// ATTENZIONE: Angelo e' rifatto dal modello partendo dalla foto da studio
// (brand/foto-profilo/chiaro-a-ritocco-2.png) e da una sua foto vera; i
// clienti NON esistono. Prima di andare online le deve vedere lui.
//
// google/nano-banana-pro su Replicate, una alla volta, token come in
// genera-squadra.mjs. Il 13/10 Replicate era senza credito (402): le foto
// sono uscite da nano_banana_pro su Higgsfield con questi stessi testi e gli
// stessi tre riferimenti (4:5, 2K).
//
//   node scripts/genera-hero.mjs             tutte (salta le fatte)
//   node scripts/genera-hero.mjs duo         solo quella, anche se c'e'
//   node scripts/genera-hero.mjs --stampa    stampa i testi e basta
//
// Esce: brand/hero/<nome>.png (2K) e <nome>-piccola.jpg

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ARGOMENTI = process.argv.slice(2);
const STAMPA = ARGOMENTI.includes("--stampa");
const SOLO = ARGOMENTI.filter((a) => !a.startsWith("--"));
const out = join(root, "brand", "hero");

function token() {
  if (process.env.REPLICATE_API_TOKEN) return process.env.REPLICATE_API_TOKEN;
  const f = join(root, "..", "DirezioneX", "direzionex-site", ".env.local");
  const riga = readFileSync(f, "utf8").split(/\r?\n/).find((r) => r.startsWith("REPLICATE_API_TOKEN="));
  if (!riga) throw new Error("REPLICATE_API_TOKEN non trovato");
  return riga.slice("REPLICATE_API_TOKEN=".length).trim().replace(/^["']|["']$/g, "");
}

async function riferimento(percorso) {
  const b = await sharp(join(root, percorso)).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 92 }).toBuffer();
  return `data:image/jpeg;base64,${b.toString("base64")}`;
}

// Nell'ordine in cui i testi li chiamano: prima, seconda, terza immagine.
const RIFERIMENTI = [
  "brand/foto-profilo/chiaro-a-ritocco-2.png",
  "public/Foto Profilo Angelo/WhatsApp Image 2026-10-05 a2.jpeg",
  "brand/logo/fitprimo/riferimenti/rif-su-nero.jpg",
];

const ANGELO =
  "The personal trainer is the man shown in the first two reference images. He must be exactly the same real person, instantly recognisable: same long narrow face, same prominent chin, same nose, same dark eyes, same thick dark eyebrows, same short black hair slicked back with faded sides, same thin moustache and light stubble, same small silver hoop earring with a cross in his left ear, same olive Mediterranean skin, same athletic muscular build with wide shoulders and big arms, a silver wristwatch on his wrist. Do not beautify, slim or change his face. He wears the same fitted black crew-neck athletic T-shirt as in the first reference image, with the small chest logo from the third reference image: the slanted red AM monogram followed by the word FITPRIMO, with FIT in white and PRIMO in red, spelled correctly, on the wearer's left side of the chest, about 9 centimetres wide, no other print. Black training trousers.";

// Natalie, per la foto in cui stanno insieme (scena "palestra").
const NATALIE =
  "The nutrition coach is the woman shown in the fourth reference image. She must be exactly the same real person, instantly recognisable: the same face shape, the same green-blue eyes, the same eyebrows, nose and lips, the same long straight blonde hair worn loose with a centre parting and a long curtain fringe falling to both sides of her face, the same tanned skin, the same make-up with long lashes and red lipstick, the same slim athletic build. Do not beautify, slim, age or change her face. She wears exactly what she wears in the fourth reference image: the fitted black crew-neck short-sleeved athletic T-shirt with the same small FITPRIMO chest logo in the same place, and black training leggings.";

// Secondo giro, stesso giorno. Il primo erano quattro scene di allenamento
// vero (curl, pressa, cinque, squat: stanno in brand/hero/scartate): clienti
// qualunque in grigio e nero, luce piatta. A Calogero non sono piaciute:
// "una foto un po' piu' da marketing, piu' colorata", la cliente "fatta male,
// sempre con questi abiti scuri, la faccia brutta", "qualcosa molto piu' da
// marketing e da palestra, non una situazione da palestra". Quindi non una
// scena ma un manifesto: in posa, verso la macchina, lei da pubblicita' e in
// colore acceso. E una foto sola.
const MANIFESTO =
  "High-end sportswear advertising campaign photograph, like the poster of a fitness brand: energetic, aspirational, glossy, with vivid saturated colours. Bright, punchy commercial lighting: a large soft key light from the front and crisp white rim lights from both sides that outline the bodies, deep contrast, tack-sharp focus on both faces. Both people are posed for the camera and look straight into the lens.";

const STUDIO =
  "Background: plain seamless very light grey photo studio backdrop, evenly lit, completely empty: no gym, no walls, no windows, no floor line, no other equipment, no other people, so that the two people can be cut out. Shot on a full-frame camera with an 85mm lens, natural skin texture, true-to-life skin tones, realistic hands with five fingers, correct anatomy, no CGI look, no watermark, no text anywhere except the small logo on the trainer's T-shirt. Both people are completely inside the frame with empty space above them and at both sides, nothing cut off at the left, right or top edge.";

const MEZZA = "Framing: vertical, both people from above the head down to mid-thigh.";

const SCENE = {
  // lui e la cliente fianco a fianco: lei mostra il bicipite, lui lo indica
  duo: `${MANIFESTO} A personal trainer and his proud client pose side by side, close together, shoulders almost touching. ${ANGELO} The client is a woman about 28 years old who looks like a professional fitness model: a beautiful, photogenic face with a bright, genuine smile showing her teeth, healthy glowing lightly tanned skin, light natural make-up, long glossy dark brown hair in a high ponytail, a toned athletic body. She wears a vivid turquoise fitted sports tank top and matching turquoise high-waist leggings. She proudly flexes the biceps of one raised arm and holds a bright red hexagonal dumbbell in her other hand at her side, laughing into the camera. The trainer stands next to her, his body turned three quarters towards her, pointing with one hand at her flexed arm, his other hand relaxed at his side, with a proud, confident, closed-mouth smile. ${MEZZA} ${STUDIO}`,
  // Terzo giro. "duo" andava ("ci siamo, meglio"), ma Angelo era di profilo
  // verso di lei e la faccia cambiava: "vorrei che Angelo fosse nella
  // direzione della faccia la stessa della foto a braccia conserte, cosi' non
  // si guasta troppo la sua faccia, e la ragazza la metti nella parte
  // sinistra". Quindi si rifa' "duo" (quarto riferimento) con lui preso pari
  // pari dalla foto da studio. Il modello gli aveva messo l'orecchino su
  // tutte e due le orecchie (brand/hero/manifesto-v1.png): tolto con un
  // ritocco di quella foto, il resto uguale.
  manifesto: `${MANIFESTO} Recreate the advertising photograph shown in the fourth reference image with the same two people, the same clothes, the same light and the same plain background, but with two changes. First change: swap their places, so that the woman stands on the left side of the picture and the trainer on the right side, close together, shoulders almost touching. Second change: the trainer is posed exactly as in the first reference image, with the same head angle and the same direction of the face, looking straight into the lens, the same calm, confident, closed-mouth expression, the same arms crossed over his chest and the same slight turn of the body. Copy his face from the first reference image as it is. ${ANGELO} The logo stays fully visible above his crossed arms. The woman is the same woman as in the fourth reference image: the same beautiful face, the same bright laughing smile into the camera, the same long dark brown ponytail, the same vivid turquoise fitted sports tank top and matching turquoise leggings. She proudly flexes the biceps of one raised arm and holds the bright red hexagonal dumbbell in her other hand. ${MEZZA} ${STUDIO}`,
  // Quarto giro. "manifesto" andava, ma "proviamo a generarne ancora un'altra
  // e cerca sempre di migliorare la faccia di Angelo prendendo la foto a
  // braccia incrociate come esempio". Fin qui il modello lo ridisegnava
  // guardando i riferimenti. Qui la foto da studio e' la base: lui resta
  // quello, come ritagliato da li', e accanto si aggiunge solo la cliente
  // (quarto riferimento: lei da sola, ritagliata da "manifesto", cosi' il
  // modello non prende la faccia di Angelo dalla foto vecchia).
  "manifesto-b": `Photo edit. The first reference image is the base: an approved studio portrait of a personal trainer with his arms crossed. Keep this man completely unchanged, as if he were cut out of that photograph and placed into the new one: exactly the same face in every detail (the shape of the face, the eyes, the eyebrows, the nose, the mouth, the thin moustache and the stubble, the skin), the same head angle and the same gaze straight into the lens, the same calm closed-mouth expression, the same hair, the same single small silver hoop earring with a cross in the ear on the right side of the picture and no earring in his other ear, the same crossed arms with the same silver wristwatch, the same muscular build, the same fitted black T-shirt, the same lighting on him. Do not redraw, beautify, smooth, slim or reinterpret his face in any way. The second reference image is a real, unretouched photo of the same man: use it only to check that his face stays true to him. On his T-shirt keep the small chest logo exactly as in the first reference image; the third reference image shows that logo sharply: the slanted red AM monogram followed by the word FITPRIMO, with FIT in white and PRIMO in red, spelled correctly, fully visible above his crossed arms. He wears black training trousers. Place him on the right side of the new picture. On the left side of the picture, close beside him with their shoulders almost touching, add the woman from the fourth reference image, unchanged: the same beautiful face and the same bright laughing smile into the camera, the same long dark brown ponytail, the same toned athletic body, the same vivid turquoise fitted sports tank top and matching turquoise leggings, proudly flexing the biceps of her raised arm and holding the bright red hexagonal dumbbell in her other hand. Light her so that the two clearly stand next to each other in the same studio at the same moment, at the same scale, the man a little taller than her. The result looks like a high-end sportswear advertising poster: energetic, glossy, vivid saturated colours, bright punchy lighting with crisp white rim lights that outline both bodies, tack-sharp focus on both faces. ${MEZZA} ${STUDIO}`,
  // Non e' per l'hero e non si scontorna. Calogero, 13/10: "un'altra foto dove
  // c'e' Angelo e Natalie entrambi, in una situazione tipo palestra, sempre
  // vestiti cosi', che magari stanno allenando qualcuno", e "il prompt deve
  // essere scritto perfetto". Natalie e' la consulente per l'alimentazione
  // (quarto riferimento: il suo ritratto in brand/squadra), quindi lei tiene
  // il tablet e lui guida l'esercizio. La cliente e' quella dell'hero (quinto
  // riferimento), cosi' in tutto il sito c'e' la stessa. I due guardano in
  // macchina come nei loro ritratti: di profilo le facce si guastano.
  palestra: `High-end advertising campaign photograph for a personal training studio, like the key visual of a fitness brand: energetic, aspirational, glossy, with vivid saturated colours. It shows a coaching team at work with a client in a gym: exactly three people, two coaches and one client. ${ANGELO} His head is turned to the camera at the same angle as in the first reference image and he looks straight into the lens with the same calm, confident, closed-mouth expression. ${NATALIE} She looks straight into the lens with the same friendly, open smile as in the fourth reference image. The client is the brunette woman in the turquoise sportswear shown in the fifth reference image: the same beautiful face, the same bright laughing smile, the same long dark brown ponytail, the same vivid turquoise fitted sports tank top and matching turquoise leggings. Composition: the client stands in the middle and does a shoulder press with a pair of bright red hexagonal dumbbells, both dumbbells held at shoulder height with her elbows bent, laughing into the camera. The trainer stands on the right side of the picture, close beside her and slightly behind her shoulder, his body turned three quarters towards her, one open hand just under her elbow to guide the movement, his other arm relaxed. The nutrition coach stands on the left side of the picture, close beside the client, holding a tablet against her forearm with one hand, with the screen turned away from the camera, and giving a thumbs up with her other hand. All three are close together, at the same distance from the camera, and their faces are about the same size. Setting: a bright, modern, premium boutique gym in daylight: light walls, large windows, a black rubber floor, a rack with black dumbbells and two or three training machines, softly out of focus behind them, with a few red details that match the red of the logo. The room is tidy and empty: no other people, no mirrors showing reflections, no signs, posters, screens or brand names anywhere. Lighting: soft daylight from the windows plus bright, punchy commercial flash from the front and a crisp rim light that separates the three people from the background. Shot on a full-frame camera with a 50mm lens at f/2.8, shallow depth of field, tack-sharp focus on all three faces, natural skin texture, true-to-life skin tones, realistic hands with five fingers, correct anatomy. Framing: horizontal, all three people from above the head down to mid-thigh, completely inside the frame with some space above them and at both sides. Each person keeps their own face: do not mix or swap faces between the three people. No CGI look, no watermark, no text anywhere except the two small logos on the coaches' T-shirts.`,
};

// Riferimenti in piu' di una scena sola, in coda ai tre di tutte.
const IN_PIU = {
  manifesto: ["brand/hero/duo.png"],
  "manifesto-b": ["brand/hero/cliente.jpg"],
  palestra: ["brand/squadra/collaboratrice.png", "brand/hero/duo.png"],
};

// Tutte in verticale 4:5 per l'hero, tranne quelle scritte qui.
const FORMATO = {
  palestra: "3:2",
};

if (STAMPA) {
  console.log(JSON.stringify({ riferimenti: RIFERIMENTI, inPiu: IN_PIU, formato: FORMATO, scene: SCENE }, null, 2));
  process.exit(0);
}

mkdirSync(out, { recursive: true });
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
  const ingresso = {
    prompt,
    aspect_ratio: FORMATO[nome] || "4:5",
    resolution: "2K",
    output_format: "png",
    image_input: await Promise.all([...RIFERIMENTI, ...(IN_PIU[nome] || [])].map(riferimento)),
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
