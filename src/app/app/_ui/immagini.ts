// Foto e icone 3D dell'app clienti (dal 13/11/2026), in public/app-img.
// Webp leggeri gia' nella misura giusta: niente ottimizzazione di Vercel,
// stesse url sempre (il service worker e la cache del telefono li tengono).
//
// Icone: 3D lucide (lucenti) rosso marchio + nero, sfondo trasparente, 256 px. Le
// prime 14 vengono dal wizard del sito (public/images/wizard), le altre 12
// sono state generate il 13/11 nello stesso stile (Higgsfield, Nano Banana).
// Foto: 3:2, 1080x720, chiare e senza persone (tranne coach-cliente):
// il testo va SOTTO la foto, mai sopra con un velo scuro.
//
// White label: un coach con le sue foto le mette con lo stesso nome in una
// sua cartella; quando servira', il percorso base verra' da marchio.ts.

export const NOMI_ICONE = [
  "bersaglio", // obiettivo
  "bilancia", // peso
  "borsa", // shop
  "calendario", // piano, prenotazioni
  "carta", // pagamento, rata
  "chat", // messaggi, coach
  "ciotola", // alimentazione
  "contratto", // contratto, firma
  "coppa", // traguardo, record
  "cronometro", // ore 1:1, durata
  "domanda", // aiuto, domande
  "fiamma", // serie di giorni
  "germoglio", // crescita, rinnovo
  "goccia", // acqua
  "grafico", // progressi
  "kettlebell", // allenamento
  "libro", // guide
  "luna", // riposo, sonno
  "manubri", // allenamento
  "metro", // misure
  "profilo", // profilo
  "regalo", // pacchetti, extra
  "scheda", // piano scritto, lista
  "spunta", // fatto
  "stretta", // 1:1 col coach, accordo
  "telefono", // app, installazione
] as const;

export type NomeIcona = (typeof NOMI_ICONE)[number];

export function iconaSrc(nome: NomeIcona): string {
  return `/app-img/icone/${nome}.webp`;
}

export const NOMI_FOTO = [
  "allenamento", // bilanciere rosso su tappetino: allenamento con pesi
  "kettlebell", // kettlebell, manubri, corda: allenamento a casa / circuito
  "mobilita", // rullo, manubri piccoli, elastico: riposo attivo, recupero
  "palestra", // rack e panca in sala chiara: forza, tecnica
  "riscaldamento", // due tappetini con kettlebell: riscaldamento, mobilita'
  "piano", // cartellina, manubri, cronometro: piano, misure, obiettivi
  "app", // telefono con grafico sulla scrivania: l'app
  "coach-cliente", // coach in sala con una cliente (foto del sito): ora 1:1
  "mealprep", // tre vaschette pollo riso broccoli: pasti, proteine
  "colazione", // porridge, frutti di bosco, acqua, shaker: colazione, acqua
] as const;

export type NomeFoto = (typeof NOMI_FOTO)[number];

export function fotoSrc(nome: NomeFoto): string {
  return `/app-img/foto/${nome}.webp`;
}
