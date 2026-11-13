// App v2: ripulisce misure, messaggi e modifiche al profilo che arrivano
// dall'app del cliente (e i messaggi del coach). Qui, a differenza dei piani,
// un valore sbagliato fa fallire la richiesta: il cliente deve sapere che il
// suo peso non e' stato salvato, non vederlo sparire.
//
// Gli errori sono gia' nella lingua di chi scrive (de/it): le rotte li passano
// tali e quali. Niente import da node: gira anche nel browser.

import { dataValida } from "./date";
import type { DataISO, Lingua } from "./tipi";
import type { NuovaMisura } from "./tipi-v2";

type Obj = Record<string, unknown>;

export type Testi = { de: string; it: string };

/** Il testo nella lingua del cliente. */
export function tr(l: Lingua, t: Testi): string {
  return t[l];
}

/** Errori comuni delle rotte cliente. */
export const ERRORI = {
  richiesta: { de: "Ungültige Anfrage", it: "Richiesta non valida" },
  nienteDaCambiare: { de: "Nichts zu ändern", it: "Niente da aggiornare" },
  misuraNonTrovata: { de: "Messung nicht gefunden", it: "Misura non trovata" },
  troppiMessaggi: {
    de: "Zu viele Nachrichten in kurzer Zeit. Bitte später erneut versuchen.",
    it: "Troppi messaggi in poco tempo. Riprova più tardi.",
  },
} satisfies Record<string, Testi>;

function obj(v: unknown): Obj | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : null;
}

function presente(o: Obj, k: string): boolean {
  return k in o && o[k] !== undefined;
}

// Postgres rifiuta \u0000; gli altri caratteri di controllo (C0, DEL, C1)
// nel gestionale non si vedono ma confondono. A capo e tab restano.
const RE_CONTROLLO = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

function pulito(s: string): string {
  return s.replace(/\r\n?/g, "\n").replace(RE_CONTROLLO, "");
}

/** Lunghezza in code point: un'emoji conta 1, come la vede chi scrive. */
function lunghezza(s: string): number {
  return Array.from(s).length;
}

/* ------------------------------------------------------------------ misure */

type CampoMisura = "peso" | "vita" | "fianchi" | "petto" | "braccio" | "coscia" | "grasso";

// Limiti "plausibili": fuori e' un errore di battitura (82 kg scritto 820).
const CAMPI_MISURA: Record<CampoMisura, { min: number; max: number; unita: string; nome: Testi }> = {
  peso: { min: 30, max: 300, unita: "kg", nome: { de: "Gewicht", it: "Peso" } },
  vita: { min: 10, max: 250, unita: "cm", nome: { de: "Taille", it: "Vita" } },
  fianchi: { min: 10, max: 250, unita: "cm", nome: { de: "Hüfte", it: "Fianchi" } },
  petto: { min: 10, max: 250, unita: "cm", nome: { de: "Brust", it: "Petto" } },
  braccio: { min: 10, max: 250, unita: "cm", nome: { de: "Oberarm", it: "Braccio" } },
  coscia: { min: 10, max: 250, unita: "cm", nome: { de: "Oberschenkel", it: "Coscia" } },
  grasso: { min: 2, max: 70, unita: "%", nome: { de: "Körperfett", it: "Massa grassa" } },
};

const MAX_NOTA_MISURA = 500;
// prima di cosi' e' di sicuro un errore nella data, non una misura vecchia
const DATA_MINIMA = "2000-01-01";

/** undefined = campo vuoto; NaN = scritto ma non e' un numero. Accetta "82,5". */
function numeroScritto(v: unknown): number | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v === "number") return v;
  if (typeof v !== "string") return NaN;
  const s = v.replace(/\s/g, "");
  if (!s) return undefined;
  // solo cifre con un separatore decimale: "1.234" o "82,5,1" non passano
  if (!/^\d+([.,]\d+)?$/.test(s)) return NaN;
  return Number(s.replace(",", "."));
}

export type EsitoMisura = { misura: NuovaMisura; errore: null } | { misura: null; errore: string };

/** Una misura nuova dal cliente. Data assente = oggi. */
export function pulisciMisura(body: unknown, oggi: DataISO, l: Lingua): EsitoMisura {
  const o = obj(body);
  if (!o) return { misura: null, errore: tr(l, ERRORI.richiesta) };

  let data: DataISO = oggi;
  if (o.data !== undefined && o.data !== null && o.data !== "") {
    if (!dataValida(o.data) || o.data < DATA_MINIMA) {
      return { misura: null, errore: tr(l, { de: "Ungültiges Datum", it: "Data non valida" }) };
    }
    if (o.data > oggi) {
      return {
        misura: null,
        errore: tr(l, { de: "Das Datum liegt in der Zukunft", it: "La data è nel futuro" }),
      };
    }
    data = o.data;
  }

  const valori = {} as Record<CampoMisura, number | null>;
  let qualcuno = false;
  for (const campo of Object.keys(CAMPI_MISURA) as CampoMisura[]) {
    const { min, max, unita, nome } = CAMPI_MISURA[campo];
    const n = numeroScritto(o[campo]);
    if (n === undefined) {
      valori[campo] = null;
      continue;
    }
    const arrotondato = Math.round(n * 10) / 10;
    if (!Number.isFinite(arrotondato) || arrotondato < min || arrotondato > max) {
      return {
        misura: null,
        errore: tr(l, {
          de: `${nome.de}: bitte einen Wert zwischen ${min} und ${max} ${unita} eingeben`,
          it: `${nome.it}: inserisci un valore tra ${min} e ${max} ${unita}`,
        }),
      };
    }
    valori[campo] = arrotondato;
    qualcuno = true;
  }
  if (!qualcuno) {
    return {
      misura: null,
      errore: tr(l, { de: "Bitte mindestens einen Wert eingeben", it: "Inserisci almeno un valore" }),
    };
  }

  let nota: string | null = null;
  if (typeof o.nota === "string") {
    const s = pulito(o.nota).trim();
    nota = s ? Array.from(s).slice(0, MAX_NOTA_MISURA).join("").trim() : null;
  }

  return { misura: { data, ...valori, nota }, errore: null };
}

/* ---------------------------------------------------------------- messaggi */

export const MAX_MESSAGGIO = 2000;

export type EsitoTesto = { testo: string; errore: null } | { testo: null; errore: string };

/** Testo di un messaggio: trim, 1-2000 caratteri, senza caratteri di controllo. */
export function pulisciTestoMessaggio(v: unknown, l: Lingua): EsitoTesto {
  const s =
    typeof v === "string"
      ? pulito(v)
          .replace(/\n{3,}/g, "\n\n") // al massimo una riga vuota di fila
          .trim()
      : "";
  if (!s) {
    return { testo: null, errore: tr(l, { de: "Die Nachricht ist leer", it: "Il messaggio è vuoto" }) };
  }
  // troppo lungo = errore, non taglio: un messaggio mozzato cambia senso
  if (lunghezza(s) > MAX_MESSAGGIO) {
    return {
      testo: null,
      errore: tr(l, {
        de: `Die Nachricht ist zu lang (max. ${MAX_MESSAGGIO} Zeichen)`,
        it: `Il messaggio è troppo lungo (max ${MAX_MESSAGGIO} caratteri)`,
      }),
    };
  }
  return { testo: s, errore: null };
}

/* ----------------------------------------------------------------- profilo */

/** Quello che il cliente puo' cambiare da solo: nome e obiettivo li decide il coach. */
export type PatchProfilo = {
  email?: string | null;
  telefono?: string | null;
  lingua?: Lingua;
};

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 200;
const MAX_TELEFONO = 40;

export type EsitoPatchProfilo =
  | { dati: PatchProfilo; errore: null }
  | { dati: null; errore: string };

/** Solo i campi presenti nel body; "" o null svuotano email e telefono. */
export function pulisciPatchProfilo(body: unknown, l: Lingua): EsitoPatchProfilo {
  const o = obj(body);
  if (!o) return { dati: null, errore: tr(l, ERRORI.richiesta) };
  const dati: PatchProfilo = {};

  if (presente(o, "email")) {
    if (o.email !== null && typeof o.email !== "string") {
      return { dati: null, errore: tr(l, ERRORI.richiesta) };
    }
    const email = o.email ? pulito(o.email).trim().toLowerCase() : "";
    if (email && (email.length > MAX_EMAIL || !RE_EMAIL.test(email))) {
      return { dati: null, errore: tr(l, { de: "Ungültige E-Mail-Adresse", it: "Email non valida" }) };
    }
    dati.email = email || null;
  }

  if (presente(o, "telefono")) {
    if (o.telefono !== null && typeof o.telefono !== "string") {
      return { dati: null, errore: tr(l, ERRORI.richiesta) };
    }
    const tel = o.telefono ? pulito(o.telefono).replace(/\s+/g, " ").trim() : "";
    if (lunghezza(tel) > MAX_TELEFONO) {
      return {
        dati: null,
        errore: tr(l, {
          de: `Telefonnummer zu lang (max. ${MAX_TELEFONO} Zeichen)`,
          it: `Numero di telefono troppo lungo (max ${MAX_TELEFONO} caratteri)`,
        }),
      };
    }
    dati.telefono = tel || null;
  }

  if (presente(o, "lingua")) {
    if (o.lingua !== "de" && o.lingua !== "it") {
      return { dati: null, errore: tr(l, { de: "Ungültige Sprache", it: "Lingua non valida" }) };
    }
    dati.lingua = o.lingua;
  }

  if (!Object.keys(dati).length) return { dati: null, errore: tr(l, ERRORI.nienteDaCambiare) };
  return { dati, errore: null };
}
