// Il piano di un giorno come lo modifica il coach. Il modulo e' "piatto" e
// fatto solo di testo (anche i numeri: un campo vuoto deve restare vuoto, non
// diventare 0); al salvataggio si pulisce e diventa il PianoGiorno di tipi.ts.

import type {
  Alimentazione,
  Allenamento,
  Esercizio,
  Giornata,
  Pasto,
  PianoGiorno,
  VocePasto,
} from "@/lib/app-coaching/tipi";

export type FormEsercizio = {
  id: string;
  nome: string;
  serie: string;
  ripetizioni: string;
  carico: string;
  pausa: string;
  note: string;
  video: string;
};

export type FormVoce = { id: string; testo: string; quantita: string };

export type FormPasto = {
  id: string;
  nome: string;
  orario: string;
  voci: FormVoce[];
  kcal: string;
  note: string;
};

export type Modulo = {
  riposo: boolean;
  // allenamento
  titolo: string;
  durata: string;
  esercizi: FormEsercizio[];
  noteAllenamento: string;
  // alimentazione
  kcal: string;
  proteine: string;
  carboidrati: string;
  grassi: string;
  acqua: string;
  pasti: FormPasto[];
  noteAlimentazione: string;
  notaCoach: string;
};

export const nuovoId = () => crypto.randomUUID();

const s = (v: string | number | null | undefined) => (v == null ? "" : String(v));

export const nuovoEsercizio = (nome = ""): FormEsercizio => ({
  id: nuovoId(),
  nome,
  serie: "",
  ripetizioni: "",
  carico: "",
  pausa: "",
  note: "",
  video: "",
});

export const nuovaVoce = (): FormVoce => ({ id: nuovoId(), testo: "", quantita: "" });

export const nuovoPasto = (nome = "", orario = ""): FormPasto => ({
  id: nuovoId(),
  nome,
  orario,
  voci: [nuovaVoce()],
  kcal: "",
  note: "",
});

export const PASTI_STANDARD: [string, string][] = [
  ["Frühstück", "07:30"],
  ["Mittagessen", "12:30"],
  ["Snack", "16:00"],
  ["Abendessen", "19:30"],
];

/** Dal piano salvato (o da niente) al modulo. Gli id mancanti si creano qui. */
export function daPiano(p: PianoGiorno | Giornata | null | undefined): Modulo {
  const al = p?.allenamento;
  const ali = p?.alimentazione;
  return {
    riposo: !!p?.riposo,
    titolo: s(al?.titolo),
    durata: s(al?.durata),
    esercizi: (al?.esercizi ?? []).map((e) => ({
      id: e.id || nuovoId(),
      nome: s(e.nome),
      serie: s(e.serie),
      ripetizioni: s(e.ripetizioni),
      carico: s(e.carico),
      pausa: s(e.pausa),
      note: s(e.note),
      video: s(e.video),
    })),
    noteAllenamento: s(al?.note),
    kcal: s(ali?.kcal),
    proteine: s(ali?.proteine),
    carboidrati: s(ali?.carboidrati),
    grassi: s(ali?.grassi),
    acqua: s(ali?.acqua),
    pasti: (ali?.pasti ?? []).map((p) => ({
      id: p.id || nuovoId(),
      nome: s(p.nome),
      orario: s(p.orario),
      voci: (p.voci ?? []).map((v) => ({ id: v.id || nuovoId(), testo: s(v.testo), quantita: s(v.quantita) })),
      kcal: s(p.kcal),
      note: s(p.note),
    })),
    noteAlimentazione: s(ali?.note),
    notaCoach: s(p?.notaCoach),
  };
}

/* -------------------------------------------------------------- pulizia */

const t = (v: string) => v.trim();
/** Testo facoltativo: vuoto = assente (undefined sparisce dal JSON). */
const opt = (v: string) => t(v) || undefined;
/** Numero facoltativo: accetta la virgola; NaN se non e' un numero (lo segnala valida). */
function num(v: string): number | undefined {
  const x = t(v).replace(",", ".");
  if (!x) return undefined;
  const n = Number(x);
  return Number.isFinite(n) ? Math.round(n) : NaN;
}
const numOk = (v: string) => {
  const n = num(v);
  return n === undefined || (!Number.isNaN(n) && n >= 0);
};

function link(v: string): string | undefined {
  const x = t(v);
  if (!x) return undefined;
  return /^https?:\/\//i.test(x) ? x : `https://${x}`;
}

const esercizioVuoto = (e: FormEsercizio) =>
  ![e.nome, e.serie, e.ripetizioni, e.carico, e.pausa, e.note, e.video].some((v) => t(v));
const voceVuota = (v: FormVoce) => !t(v.testo) && !t(v.quantita);
const pastoVuoto = (p: FormPasto) =>
  ![p.nome, p.orario, p.kcal, p.note].some((v) => t(v)) && p.voci.every(voceVuota);

/** Dal modulo al PianoGiorno da salvare: righe vuote via, testi ripuliti. */
export function pulisci(m: Modulo): PianoGiorno {
  const esercizi: Esercizio[] = m.esercizi
    .filter((e) => !esercizioVuoto(e))
    .map((e) => ({
      id: e.id,
      nome: t(e.nome),
      serie: opt(e.serie),
      ripetizioni: opt(e.ripetizioni),
      carico: opt(e.carico),
      pausa: opt(e.pausa),
      note: opt(e.note),
      video: link(e.video),
    }));
  const haAllenamento = !!(t(m.titolo) || t(m.durata) || t(m.noteAllenamento) || esercizi.length);
  // Giorno di riposo: niente allenamento, anche se nel modulo restano gli
  // esercizi (servono solo se si toglie la spunta prima di salvare).
  const allenamento: Allenamento | null =
    !m.riposo && haAllenamento
      ? { titolo: opt(m.titolo), durata: opt(m.durata), esercizi, note: opt(m.noteAllenamento) }
      : null;

  const pasti: Pasto[] = m.pasti
    .filter((p) => !pastoVuoto(p))
    .map((p) => ({
      id: p.id,
      nome: t(p.nome),
      orario: opt(p.orario),
      voci: p.voci
        .filter((v) => !voceVuota(v))
        .map((v): VocePasto => ({ id: v.id, testo: t(v.testo), quantita: opt(v.quantita) })),
      kcal: num(p.kcal),
      note: opt(p.note),
    }));
  const obiettivi = {
    kcal: num(m.kcal),
    proteine: num(m.proteine),
    carboidrati: num(m.carboidrati),
    grassi: num(m.grassi),
  };
  const haAlimentazione =
    pasti.length > 0 ||
    Object.values(obiettivi).some((v) => v !== undefined) ||
    !!t(m.acqua) ||
    !!t(m.noteAlimentazione);
  const alimentazione: Alimentazione | null = haAlimentazione
    ? { ...obiettivi, acqua: opt(m.acqua), pasti, note: opt(m.noteAlimentazione) }
    : null;

  return { riposo: m.riposo, allenamento, alimentazione, notaCoach: t(m.notaCoach) || null };
}

/** Impronta per capire se ci sono modifiche non salvate. */
export const firma = (p: PianoGiorno) => JSON.stringify(p);

export const pianoVuoto = (p: PianoGiorno) => !p.riposo && !p.allenamento && !p.alimentazione && !p.notaCoach;

/** Errori da sistemare prima di salvare, scritti per chi compila. */
export function valida(m: Modulo): string[] {
  const err: string[] = [];
  if (!m.riposo) {
    m.esercizi.forEach((e, i) => {
      if (!esercizioVuoto(e) && !t(e.nome)) err.push(`Esercizio ${i + 1}: manca il nome.`);
      if (t(e.video) && /\s/.test(t(e.video))) err.push(`Esercizio ${i + 1}: il link del video non sembra un link.`);
    });
  }
  const numeri: [string, string][] = [
    [m.kcal, "Kcal del giorno"],
    [m.proteine, "Proteine"],
    [m.carboidrati, "Carboidrati"],
    [m.grassi, "Grassi"],
  ];
  for (const [v, nome] of numeri) if (!numOk(v)) err.push(`${nome}: scrivi solo un numero (es. 2000).`);
  m.pasti.forEach((p, i) => {
    if (pastoVuoto(p)) return;
    const etichetta = t(p.nome) || `Pasto ${i + 1}`;
    if (!t(p.nome)) err.push(`Pasto ${i + 1}: manca il nome (es. Frühstück).`);
    if (!numOk(p.kcal)) err.push(`${etichetta}: le kcal devono essere un numero.`);
    if (p.voci.some((v) => !voceVuota(v) && !t(v.testo))) err.push(`${etichetta}: c'è una quantità senza alimento.`);
  });
  return err;
}

/* ---------------------------------------------------- riassunto in cella */

/** Cosa scrivere nella cella del calendario. */
export function titoloGiorno(g: Giornata): string {
  if (g.riposo) return "Riposo";
  const a = g.allenamento;
  if (a?.titolo) return a.titolo;
  if (a?.esercizi?.length) return `${a.esercizi.length} esercizi`;
  if (g.alimentazione) return "";
  return g.notaCoach ? "Nota" : "";
}

/** Somma delle kcal scritte sui pasti (per confrontarla con l'obiettivo). */
export function sommaKcal(m: Modulo): number {
  return m.pasti.reduce((tot, p) => {
    const n = num(p.kcal);
    return n && !Number.isNaN(n) ? tot + n : tot;
  }, 0);
}
