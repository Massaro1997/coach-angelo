// Ripulisce quello che arriva dal gestionale e dall'app prima che finisca nel
// DB. Le colonne Json non hanno uno schema: l'unica garanzia sulla forma dei
// piani e' questo file. Testi troppo lunghi si tagliano, voci vuote si
// scartano, solo i limiti sulle liste fanno fallire la richiesta (meglio un
// errore chiaro al coach che un esercizio sparito in silenzio).
//
// Niente import da node: usa crypto globale, gira anche nel browser.

import type {
  Alimentazione,
  Allenamento,
  Esercizio,
  Lingua,
  Pasto,
  PianoGiorno,
  RispostaCliente,
  VocePasto,
} from "./tipi";

const MAX_TESTO = 500;
const MAX_NOTA = 2000;
const MAX_FEEDBACK = 1000;
const MAX_ESERCIZI = 40;
const MAX_PASTI = 10;
const MAX_VOCI = 30;

// tetti "ragionevoli": oltre e' un errore di battitura, non un piano
const MAX_KCAL_GIORNO = 20_000;
const MAX_KCAL_PASTO = 10_000;
const MAX_GRAMMI = 2_000;

type Obj = Record<string, unknown>;

class ErrorePiano extends Error {}

function obj(v: unknown): Obj | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : null;
}

function lista(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

function presente(o: Obj, k: string): boolean {
  return k in o && o[k] !== undefined;
}

// Postgres rifiuta \u0000 nei testi e nei jsonb: via i caratteri di controllo
// (tranne a capo e tab, che nelle note servono).
const RE_CONTROLLO = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Trim + taglio a `max` caratteri (per code point: niente emoji spezzate). Vuoto -> undefined. */
function testo(v: unknown, max = MAX_TESTO): string | undefined {
  if (typeof v === "number" && Number.isFinite(v)) v = String(v);
  if (typeof v !== "string") return undefined;
  let s = v.replace(RE_CONTROLLO, "").trim();
  if (s.length > max) s = Array.from(s).slice(0, max).join("").trim();
  return s || undefined;
}

/** Numero finito, >= 0, <= max, a un decimale. Accetta "1,5" e "2.500" (migliaia alla tedesca). */
function numero(v: unknown, max: number): number | undefined {
  let n: number;
  if (typeof v === "number") n = v;
  else if (typeof v === "string" && v.trim()) {
    let s = v.replace(/\s/g, "");
    if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, "");
    n = Number(s.replace(",", "."));
  } else return undefined;
  if (!Number.isFinite(n) || n < 0 || n > max) return undefined;
  return Math.round(n * 10) / 10;
}

/** Solo http/https. "youtu.be/x" senza schema diventa https://youtu.be/x. */
function link(v: unknown): string | undefined {
  const s = testo(v);
  if (!s) return undefined;
  const conSchema = /^[a-z][a-z0-9+.-]*:/i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(conSchema);
    if (u.protocol !== "http:" && u.protocol !== "https:") return undefined;
    return u.href.length <= MAX_TESTO ? u.href : undefined;
  } catch {
    return undefined;
  }
}

const RE_ID = /^[A-Za-z0-9_-]{1,64}$/;

/** Tiene l'id del client se pulito e non ripetuto (chiavi React), se no ne crea uno. */
function idUnico(v: unknown, visti: Set<string>): string {
  let id = typeof v === "string" && RE_ID.test(v) ? v : "";
  if (!id || visti.has(id)) id = crypto.randomUUID();
  visti.add(id);
  return id;
}

/** Toglie le chiavi undefined, cosi' nel jsonb restano solo i campi scritti. */
function compatto<T extends object>(o: T): T {
  for (const k of Object.keys(o) as (keyof T)[]) if (o[k] === undefined) delete o[k];
  return o;
}

function esercizio(v: unknown, visti: Set<string>): Esercizio | null {
  const o = obj(v);
  const nome = o && testo(o.nome);
  if (!o || !nome) return null;
  return compatto({
    id: idUnico(o.id, visti),
    nome,
    serie: testo(o.serie),
    ripetizioni: testo(o.ripetizioni),
    carico: testo(o.carico),
    pausa: testo(o.pausa),
    note: testo(o.note, MAX_NOTA),
    video: link(o.video),
  });
}

function allenamento(v: unknown): Allenamento | null {
  const o = obj(v);
  if (!o) return null;
  const visti = new Set<string>();
  const esercizi = lista(o.esercizi)
    .map((e) => esercizio(e, visti))
    .filter((e): e is Esercizio => e !== null);
  if (esercizi.length > MAX_ESERCIZI) {
    throw new ErrorePiano(`Massimo ${MAX_ESERCIZI} esercizi per giorno`);
  }
  const titolo = testo(o.titolo);
  const note = testo(o.note, MAX_NOTA);
  // anche solo una nota ("30 min corsa leggera") e' un allenamento: non si butta
  if (!esercizi.length && !titolo && !note) return null;
  return compatto({ titolo, durata: testo(o.durata), esercizi, note });
}

function voce(v: unknown, visti: Set<string>): VocePasto | null {
  const o = obj(v);
  const t = o && testo(o.testo);
  if (!o || !t) return null;
  return compatto({ id: idUnico(o.id, visti), testo: t, quantita: testo(o.quantita) });
}

function pasto(v: unknown, visti: Set<string>): Pasto | null {
  const o = obj(v);
  const nome = o && testo(o.nome);
  if (!o || !nome) return null;
  const vistiVoci = new Set<string>();
  const voci = lista(o.voci)
    .map((x) => voce(x, vistiVoci))
    .filter((x): x is VocePasto => x !== null);
  if (voci.length > MAX_VOCI) {
    throw new ErrorePiano(`Massimo ${MAX_VOCI} voci nel pasto "${nome}"`);
  }
  return compatto({
    id: idUnico(o.id, visti),
    nome,
    orario: testo(o.orario),
    voci,
    kcal: numero(o.kcal, MAX_KCAL_PASTO),
    note: testo(o.note, MAX_NOTA),
  });
}

function alimentazione(v: unknown): Alimentazione | null {
  const o = obj(v);
  if (!o) return null;
  const visti = new Set<string>();
  const pasti = lista(o.pasti)
    .map((p) => pasto(p, visti))
    .filter((p): p is Pasto => p !== null);
  if (pasti.length > MAX_PASTI) {
    throw new ErrorePiano(`Massimo ${MAX_PASTI} pasti per giorno`);
  }
  const ali = compatto({
    kcal: numero(o.kcal, MAX_KCAL_GIORNO),
    proteine: numero(o.proteine, MAX_GRAMMI),
    carboidrati: numero(o.carboidrati, MAX_GRAMMI),
    grassi: numero(o.grassi, MAX_GRAMMI),
    acqua: testo(o.acqua),
    pasti,
    note: testo(o.note, MAX_NOTA),
  });
  const obiettivi =
    ali.kcal !== undefined ||
    ali.proteine !== undefined ||
    ali.carboidrati !== undefined ||
    ali.grassi !== undefined ||
    ali.acqua !== undefined;
  if (!pasti.length && !obiettivi && !ali.note) return null;
  return ali;
}

export type EsitoPiano = { piano: PianoGiorno; errore: null } | { piano: null; errore: string };

/** Il piano di un giorno dal gestionale, ripulito. Errore solo se il body non e' un piano o sfora i limiti. */
export function pulisciPiano(body: unknown): EsitoPiano {
  const o = obj(body);
  if (!o) return { piano: null, errore: "Piano non valido" };
  try {
    return {
      piano: {
        riposo: o.riposo === true,
        allenamento: allenamento(o.allenamento),
        alimentazione: alimentazione(o.alimentazione),
        notaCoach: testo(o.notaCoach, MAX_NOTA) ?? null,
      },
      errore: null,
    };
  } catch (e) {
    if (e instanceof ErrorePiano) return { piano: null, errore: e.message };
    throw e;
  }
}

/** Un giorno senza niente dentro: per la copia conta come "non c'e'". */
export function pianoVuoto(p: {
  riposo: boolean;
  allenamento: unknown;
  alimentazione: unknown;
  notaCoach: string | null;
}): boolean {
  return !p.riposo && p.allenamento == null && p.alimentazione == null && !p.notaCoach;
}

function fatica(v: unknown): number | null {
  const n = typeof v === "string" && v.trim() ? Number(v) : v;
  return typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

const RISPOSTA_VUOTA: RispostaCliente = { fatto: false, fatica: null, feedback: null };

/**
 * La risposta del cliente. I campi assenti dal body restano come in `base`
 * (la risposta gia' salvata): un PUT con solo {fatto} non cancella il feedback.
 */
export function pulisciRisposta(body: unknown, base: RispostaCliente = RISPOSTA_VUOTA): RispostaCliente {
  const o = obj(body) ?? {};
  return {
    fatto: presente(o, "fatto") ? o.fatto === true : base.fatto,
    fatica: presente(o, "fatica") ? fatica(o.fatica) : base.fatica,
    feedback: presente(o, "feedback") ? (testo(o.feedback, MAX_FEEDBACK) ?? null) : base.feedback,
  };
}

/* ----------------------------------------------- anagrafica (gestionale) */

export type DatiCliente = {
  nome?: string;
  email?: string | null;
  telefono?: string | null;
  lingua?: Lingua;
  obiettivo?: string | null;
  note?: string | null;
  attivo?: boolean;
  /** Preventivo.id del contratto collegato; che esista lo verifica la rotta. */
  preventivoId?: string | null;
};

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Campi del cliente dal gestionale: solo quelli presenti nel body (vale per POST e PATCH). */
export function pulisciDatiCliente(
  body: unknown
): { dati: DatiCliente; errore: null } | { dati: null; errore: string } {
  const o = obj(body);
  if (!o) return { dati: null, errore: "Richiesta non valida" };
  const dati: DatiCliente = {};

  if (presente(o, "nome")) {
    const nome = testo(o.nome, 120);
    if (!nome) return { dati: null, errore: "Il nome e' obbligatorio" };
    dati.nome = nome;
  }
  if (presente(o, "email")) {
    const email = testo(o.email, 200)?.toLowerCase() ?? null;
    if (email && !RE_EMAIL.test(email)) return { dati: null, errore: "Email non valida" };
    dati.email = email;
  }
  if (presente(o, "telefono")) dati.telefono = testo(o.telefono, 40) ?? null;
  if (presente(o, "lingua")) {
    if (o.lingua !== "de" && o.lingua !== "it") {
      return { dati: null, errore: "Lingua non valida (de o it)" };
    }
    dati.lingua = o.lingua;
  }
  if (presente(o, "obiettivo")) dati.obiettivo = testo(o.obiettivo) ?? null;
  if (presente(o, "note")) dati.note = testo(o.note, MAX_NOTA) ?? null;
  if (presente(o, "attivo")) {
    if (typeof o.attivo !== "boolean") return { dati: null, errore: "Valore di attivo non valido" };
    dati.attivo = o.attivo;
  }
  if (presente(o, "preventivoId")) {
    // null o "" = scollega
    if (o.preventivoId === null || o.preventivoId === "") dati.preventivoId = null;
    else if (typeof o.preventivoId === "string" && RE_ID.test(o.preventivoId)) dati.preventivoId = o.preventivoId;
    else return { dati: null, errore: "Contratto non valido" };
  }
  return { dati, errore: null };
}
