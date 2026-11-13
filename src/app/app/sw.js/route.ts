// Service worker dell'app clienti, servito da /app/sw.js.
//
// Perche' cosi': in palestra spesso non c'e' campo e il cliente deve vedere
// il piano lo stesso. Quindi:
//  - dati (/api/app/io, /api/app/home, /api/app/progressi, /api/app/giornate*):
//    rete prima, copia in cache; se la rete non risponde entro pochi secondi si
//    serve la copia, segnata con l'header HEADER_OFFLINE cosi' l'app lo puo' dire;
//  - shop, prenotazioni, messaggi, misure: mai in cache (prezzi, ore libere e
//    chat vecchie farebbero piu' danni di un "offline");
//  - pagine /app gia' viste: rete prima, copia in cache; sezioni e giorni
//    vicini (e /api/app/progressi) li precarica l'app con un messaggio "precarica";
//  - /_next/static: hanno l'hash nel nome, prima la cache;
//  - foto e icone 3D dell'app (/app-img, dal 13/11): copia salvata subito e
//    intanto si aggiorna, come logo e icone (in palestra le card restano belle);
//  - POST/PUT/DELETE: mai toccati, vanno dritti in rete.
// Il codice e' una stringa (non un file in public/) per prendere nomi e colori
// da MARCHIO e i testi da testi.ts.

import { MARCHIO } from "@/lib/app-coaching/marchio";
import { CACHE_PREFISSO, CACHE_VERSIONE, HEADER_OFFLINE, ICONE, SCOPE, TEMA } from "../_ui/pwa";
import { TESTI } from "../testi";

const testiOffline = {
  de: { titolo: TESTI.de.offlineTitolo, testo: TESTI.de.offlineTesto, bottone: TESTI.de.offlineBottone },
  it: { titolo: TESTI.it.offlineTitolo, testo: TESTI.it.offlineTesto, bottone: TESTI.it.offlineBottone },
};

const costanti = {
  PREFISSO: CACHE_PREFISSO,
  VERSIONE: CACHE_VERSIONE,
  SCOPE,
  HEADER_OFFLINE,
  NOME: MARCHIO.nomeApp,
  COLORE: MARCHIO.colore,
  FONDO: TEMA.fondo,
  TESTO: TEMA.testo,
  DA_TENERE: [ICONE.apple, ICONE.i192, ICONE.i512, MARCHIO.logo, MARCHIO.simbolo],
  TESTI_OFFLINE: testiOffline,
};

// Niente template literal dentro il codice del SW: e' gia' dentro un template.
const CODICE = String.raw`
const C_PAGINE = VERSIONE + "-pagine";
const C_DATI = VERSIONE + "-dati";
const C_STATICI = VERSIONE + "-statici";
const CACHE_ATTUALI = [C_PAGINE, C_DATI, C_STATICI];
const MAX_PAGINE = 60;
const MAX_STATICI = 400;
const ATTESA_RETE = 4000; // ms: oltre, meglio la copia salvata
const ATTESA_RSC = 5000;
const FRESCA = 12 * 60 * 60 * 1000; // pagina precaricata da meno di 12 ore
const OPZ = { ignoreVary: true };

function nulla() {}

function inApp(p) {
  return p === SCOPE || p.indexOf(SCOPE + "/") === 0;
}

// /app/entra/<token> non si salva: nell'indirizzo c'e' una chiave d'accesso
function paginaDaSalvare(p) {
  return (
    inApp(p) &&
    p.indexOf(SCOPE + "/entra/") !== 0 &&
    p !== SCOPE + "/sw.js" &&
    p !== SCOPE + "/manifest.webmanifest"
  );
}

// solo letture che servono in palestra; tutto il resto di /api va dritto in rete
function apiDati(p) {
  return (
    p === "/api/app/io" ||
    p === "/api/app/home" ||
    p === "/api/app/progressi" ||
    p === "/api/app/giornate" ||
    p.indexOf("/api/app/giornate/") === 0
  );
}

function conAttesa(promessa, ms) {
  return new Promise(function (ok, ko) {
    const t = setTimeout(function () { ko(new Error("attesa")); }, ms);
    promessa.then(
      function (v) { clearTimeout(t); ok(v); },
      function (e) { clearTimeout(t); ko(e); }
    );
  });
}

async function pota(nome, max) {
  const cache = await caches.open(nome);
  const chiavi = await cache.keys();
  // le chiavi escono in ordine di inserimento: via le piu' vecchie
  for (let i = 0; i < chiavi.length - max; i++) await cache.delete(chiavi[i]);
}

function segnaOffline(res) {
  const h = new Headers(res.headers);
  h.set(HEADER_OFFLINE, "1");
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
}

function offlineJson() {
  const h = new Headers({ "Content-Type": "application/json" });
  h.set(HEADER_OFFLINE, "1");
  return new Response(JSON.stringify({ error: "offline" }), { status: 503, headers: h });
}

function rispostaRete(event) {
  return Promise.resolve(event.preloadResponse).then(function (pre) {
    return pre || fetch(event.request);
  });
}

// ---------------------------------------------------------------- dati

async function dati(event) {
  const req = event.request;
  const cache = await caches.open(C_DATI);
  const copia = function () { return cache.match(req, OPZ); };
  const rete = fetch(req).then(async function (res) {
    try {
      if (res.ok) await cache.put(req, res.clone());
      // sessione finita o cliente disattivato: i dati salvati non valgono piu'
      else if (res.status === 401) await caches.delete(C_DATI);
    } catch (e) {}
    return res;
  });
  event.waitUntil(rete.then(nulla, nulla));

  if (self.navigator.onLine === false) {
    const v = await copia();
    if (v) return segnaOffline(v);
  }
  let res;
  try {
    res = await conAttesa(rete, ATTESA_RETE);
  } catch (e) {
    const v = await copia();
    if (v) return segnaOffline(v);
    try { res = await rete; } catch (e2) { return offlineJson(); }
  }
  // server giu': meglio il piano salvato che un errore
  if (res.status >= 500) {
    const v = await copia();
    if (v) return segnaOffline(v);
  }
  return res;
}

// ---------------------------------------------------------------- pagine

async function pagina(event, url) {
  const cache = await caches.open(C_PAGINE);
  const chiave = url.origin + url.pathname;
  const rete = rispostaRete(event).then(async function (res) {
    if (res.ok && res.type === "basic") {
      try {
        await cache.put(chiave, res.clone());
        await pota(C_PAGINE, MAX_PAGINE);
      } catch (e) {}
    }
    return res;
  });
  event.waitUntil(rete.then(nulla, nulla));

  if (self.navigator.onLine === false) {
    const v = await cache.match(chiave, OPZ);
    if (v) return v;
  }
  try {
    return await conAttesa(rete, ATTESA_RETE);
  } catch (e) {
    const v = await cache.match(chiave, OPZ);
    if (v) return v;
    try { return await rete; } catch (e2) { return paginaOffline(); }
  }
}

async function paginaOffline() {
  let lingua = "de";
  try {
    const io = await (await caches.open(C_DATI)).match("/api/app/io", OPZ);
    if (io) {
      const j = await io.json();
      if (j && j.profilo && j.profilo.lingua === "it") lingua = "it";
    }
  } catch (e) {}
  const t = TESTI_OFFLINE[lingua];
  const html =
    '<!doctype html><html lang="' + lingua + '"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
    "<title>" + NOME + "</title><style>" +
    "html,body{margin:0;background:" + FONDO + ";color:" + TESTO + ";font-family:system-ui,-apple-system,sans-serif}" +
    "main{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:24px;box-sizing:border-box;max-width:420px;margin:0 auto}" +
    "h1{font-size:28px;margin:0 0 8px}p{font-size:18px;line-height:1.5;margin:0 0 24px;color:#52525b}" +
    "a{display:block;text-align:center;background:" + COLORE + ";color:#fff;text-decoration:none;font-weight:700;font-size:18px;padding:16px;border-radius:14px}" +
    "</style></head><body><main><h1>" + t.titolo + "</h1><p>" + t.testo + '</p><a href="' + SCOPE + '">' + t.bottone + "</a></main></body></html>";
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

// Navigazioni del router di Next (header RSC): se la rete non risponde si fa
// fallire la richiesta, cosi' Next ripiega su una navigazione vera e quella
// la serve la cache delle pagine. Senza questo, con una tacca di campo, il
// tocco su un giorno resterebbe appeso.
async function rsc(req) {
  if (self.navigator.onLine === false) return Response.error();
  try {
    return await conAttesa(fetch(req), ATTESA_RSC);
  } catch (e) {
    return Response.error();
  }
}

// ---------------------------------------------------------------- statici

async function statico(req) {
  const cache = await caches.open(C_STATICI);
  // l'hash e' nel nome: la query (es. ?dpl= di Vercel) non conta
  const v = await cache.match(req, { ignoreSearch: true, ignoreVary: true });
  if (v) return v;
  const res = await fetch(req);
  if (res.ok && res.type === "basic") {
    try {
      await cache.put(req, res.clone());
      await pota(C_STATICI, MAX_STATICI);
    } catch (e) {}
  }
  return res;
}

// logo e icone non hanno hash: si serve la copia e intanto si aggiorna
async function marchio(event) {
  const req = event.request;
  const cache = await caches.open(C_STATICI);
  const v = await cache.match(req, OPZ);
  const rete = fetch(req).then(async function (res) {
    try {
      if (res.ok && res.type === "basic") await cache.put(req, res.clone());
    } catch (e) {}
    return res;
  });
  event.waitUntil(rete.then(nulla, nulla));
  return v || rete;
}

// ---------------------------------------------------------------- precarica

const RE_STATICI = /static\/(?:chunks|css|media)\/[^"'\\\s<>()?,]+/g;

async function salvaStatici(testo, cache, visti) {
  const trovati = testo.match(RE_STATICI) || [];
  for (const parte of trovati) {
    const p = "/_next/" + parte;
    if (visti.has(p) || !/\.(?:js|css|woff2?)$/.test(p)) continue;
    visti.add(p);
    try {
      if (await cache.match(p, { ignoreSearch: true, ignoreVary: true })) continue;
      const res = await fetch(p);
      if (!res.ok) continue;
      // i font stanno dentro il css
      if (p.slice(-4) === ".css") await salvaStatici(await res.clone().text(), cache, visti);
      await cache.put(p, res);
    } catch (e) {}
  }
}

// dati (progressi): come la cache di dati(), cosi' offline li serve dati()
async function precaricaDati(url) {
  const cache = await caches.open(C_DATI);
  const v = await cache.match(url.href, OPZ);
  const data = v ? Date.parse(v.headers.get("date") || "") : NaN;
  if (v && Date.now() - data < FRESCA) return;
  const res = await fetch(url.href, { cache: "no-store" });
  if (res.ok) await cache.put(url.href, res);
}

async function precarica(urls) {
  const pagine = await caches.open(C_PAGINE);
  const statici = await caches.open(C_STATICI);
  const visti = new Set();
  for (const u of urls.slice(0, 20)) {
    let url;
    try { url = new URL(u, self.location.origin); } catch (e) { continue; }
    if (url.origin !== self.location.origin) continue;
    if (apiDati(url.pathname)) {
      try { await precaricaDati(url); } catch (e) {}
      continue;
    }
    if (!paginaDaSalvare(url.pathname)) continue;
    const chiave = url.origin + url.pathname;
    try {
      const v = await pagine.match(chiave, OPZ);
      const data = v ? Date.parse(v.headers.get("date") || "") : NaN;
      if (v && Date.now() - data < FRESCA) continue;
      const res = await fetch(chiave);
      if (!res.ok || res.redirected) continue;
      const html = await res.clone().text();
      await pagine.put(chiave, res);
      // l'html senza i suoi script offline non parte
      await salvaStatici(html, statici, visti);
    } catch (e) {}
  }
  await pota(C_PAGINE, MAX_PAGINE);
  await pota(C_STATICI, MAX_STATICI);
}

// ---------------------------------------------------------------- eventi

self.addEventListener("install", function (event) {
  event.waitUntil((async function () {
    try { await (await caches.open(C_STATICI)).addAll(DA_TENERE); } catch (e) {}
    try { await precarica([SCOPE]); } catch (e) {}
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", function (event) {
  event.waitUntil((async function () {
    const nomi = await caches.keys();
    await Promise.all(
      nomi
        .filter(function (n) { return n.indexOf(PREFISSO) === 0 && CACHE_ATTUALI.indexOf(n) === -1; })
        .map(function (n) { return caches.delete(n); })
    );
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch (e) {}
    }
    await self.clients.claim();
  })());
});

self.addEventListener("message", function (event) {
  const m = event.data;
  if (!m || typeof m !== "object") return;
  if (m.tipo === "precarica" && Array.isArray(m.urls)) event.waitUntil(precarica(m.urls));
});

self.addEventListener("fetch", function (event) {
  const req = event.request;
  // POST/PUT/DELETE: mai in cache
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const p = url.pathname;

  if (apiDati(p)) { event.respondWith(dati(event)); return; }
  if (p.indexOf("/api/") === 0) return;

  if (req.mode === "navigate") {
    if (paginaDaSalvare(p)) event.respondWith(pagina(event, url));
    else if (inApp(p)) event.respondWith(rispostaRete(event));
    return;
  }

  if (p.indexOf("/_next/static/") === 0) { event.respondWith(statico(req)); return; }
  if (p.indexOf("/brand/") === 0 || p.indexOf("/app-icone/") === 0 || p.indexOf("/app-img/") === 0) {
    event.respondWith(marchio(event));
    return;
  }

  if (inApp(p) && req.headers.get("RSC") === "1" && !req.headers.get("Next-Router-Prefetch")) {
    event.respondWith(rsc(req));
  }
});
`;

// Le costanti in testa al file, come JSON: niente da escapare a mano.
const SORGENTE =
  `/* Service worker ${MARCHIO.nomeApp}: generato da src/app/app/sw.js/route.ts */\n"use strict";\n` +
  Object.entries(costanti)
    .map(([k, v]) => `const ${k} = ${JSON.stringify(v)};`)
    .join("\n") +
  "\n" +
  CODICE;

export function GET() {
  return new Response(SORGENTE, {
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "no-cache",
      // il file sta in /app/ ma deve controllare anche /app (senza barra)
      "Service-Worker-Allowed": SCOPE,
    },
  });
}
