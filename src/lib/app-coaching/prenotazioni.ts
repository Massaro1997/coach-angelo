// App v2: ore 1:1 prenotate nei buchi liberi del coach. Solo server.
//
// Regole (tipi-v2.ts): si prenota da adesso + 12 ore fino a 28 giorni avanti,
// solo dentro le fasce AppSlot del coach e non nei giorni di chiusura. L'ora
// e' "inclusa" se il contratto ha ancora ore in quel mese, se no "extra"
// pagata col credito, se no resta "da pagare" con una riga Pagamento da 50 €
// e il link alla cassa: e' una tenuta di 30 minuti, poi l'ora torna libera.
// Due prenotazioni sulla stessa ora le ferma l'indice unico parziale del DB
// (coach, data, inizio) sulle prenotazioni attive: P2002 -> 409.
//
// Gli orari sono testo "HH:MM" a Colonia, come le date: il confronto fra
// stringhe a due cifre e' gia' quello giusto.

import { Prisma } from "@prisma/client";
import type { AppChiusura, AppCliente, AppPrenotazione, AppSlot } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { nuovoToken } from "@/lib/preventivo";
import { PREZZO_ORA } from "@/lib/preventivo-listino";
import { confermaStripe, getStripe } from "@/lib/stripe";
import { sincronizzaPaypal } from "@/lib/paypal";
import { avvisaIncasso } from "@/lib/avvisi-incasso";
import { aggiungiGiorni, dataValida, giornoSettimana, giorniTra, meseDi, oggiISO } from "./date";
import { descrizioneOreExtra, documentoApp, notaOre, oreCliente, TIPO_ORE_EXTRA } from "./ore";
import type { DataISO } from "./tipi";
import type {
  Chiusura,
  EsitoPrenotazione,
  Ora,
  Prenotazione,
  PrenotazioneAdmin,
  SlotAdmin,
  SlotLibero,
  StatoPrenotazione,
} from "./tipi-v2";

/** Quanti giorni avanti si vede e si prenota (oggi compreso). */
export const GIORNI_AVANTI = 28;
const ORA_MS = 3_600_000;
const ANTICIPO_MS = 12 * ORA_MS; // prima ora prenotabile: adesso + 12 h
const ANNULLA_MS = 24 * ORA_MS; // il cliente annulla da solo fino a 24 h prima
const TENUTA_MS = 30 * 60_000; // un'ora "da pagare" resta tenuta 30 minuti
/** Ore "da pagare" aperte insieme: oltre, un cliente bloccherebbe l'agenda senza pagare. */
const MAX_TENUTE = 2;

/** Stati che occupano l'ora: gli stessi dell'indice unico parziale. */
export const STATI_ATTIVI = ["confermata", "da pagare", "svolta"];

/* ----------------------------------------------------------------- orari */

const FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Berlin",
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/** Di quanti ms Colonia e' avanti su UTC in quell'istante (1 o 2 ore). */
function scarto(t: number): number {
  const p: Record<string, number> = {};
  for (const x of FMT.formatToParts(new Date(t))) if (x.type !== "literal") p[x.type] = Number(x.value);
  return Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute, p.second) - Math.floor(t / 1000) * 1000;
}

/** L'istante di "data ora" a Colonia, ora legale compresa. */
export function istante(data: DataISO, ora: Ora): Date {
  const [y, m, d] = data.split("-").map(Number);
  const [h, mi] = ora.split(":").map(Number);
  const locale = Date.UTC(y, m - 1, d, h, mi);
  // seconda passata: giusta anche nei giorni del cambio d'ora
  const t = locale - scarto(locale - scarto(locale));
  return new Date(t);
}

const due = (n: number) => String(n).padStart(2, "0");

/** "7:00", "07:00" o "07:00:00" (campo type=time) -> "07:00"; null se non e' un'ora. */
export function oraValida(v: unknown): Ora | null {
  if (typeof v !== "string") return null;
  const m = /^(\d{1,2}):(\d{2})(:\d{2})?$/.exec(v.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const mi = Number(m[2]);
  return h <= 23 && mi <= 59 ? `${due(h)}:${due(mi)}` : null;
}

export const minuti = (o: Ora) => {
  const [h, m] = o.split(":").map(Number);
  return h * 60 + m;
};

export const daMinuti = (n: number): Ora => `${due(Math.floor(n / 60))}:${due(n % 60)}`;

export function siSovrappongono(a: { inizio: Ora; fine: Ora }, b: { inizio: Ora; fine: Ora }): boolean {
  return a.inizio < b.fine && b.inizio < a.fine;
}

/** "2026-11-14" -> "14.11.2026", per la descrizione del pagamento (in tedesco). */
const dataTedesca = (d: DataISO) => d.split("-").reverse().join(".");

// Postgres rifiuta \u0000: via i caratteri di controllo (come in pulisci.ts)
const RE_CONTROLLO = /[\u0000-\u001F\u007F]/g;

/** Testo breve dal gestionale (luogo, nota): trim, taglio a `max`, vuoto -> null. */
export function testoBreve(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = Array.from(v.replace(RE_CONTROLLO, " ").trim()).slice(0, max).join("").trim();
  return s || null;
}

/* ----------------------------------------------------------- serializza */

function statoDi(s: string): StatoPrenotazione {
  return s === "da pagare" || s === "svolta" || s === "annullata" ? s : "confermata";
}

export function toPrenotazione(
  r: AppPrenotazione,
  tokenPagamento: string | null = null,
  ora: Date = new Date()
): Prenotazione {
  const stato = statoDi(r.stato);
  return {
    id: r.id,
    data: r.data,
    inizio: r.inizio,
    fine: r.fine,
    luogo: r.luogo,
    tipo: r.tipo === "extra" ? "extra" : "inclusa",
    stato,
    linkPagamento: stato === "da pagare" && tokenPagamento ? `/pagamento/${tokenPagamento}` : null,
    annullabile:
      (stato === "confermata" || stato === "da pagare") &&
      istante(r.data, r.inizio).getTime() - ora.getTime() >= ANNULLA_MS,
    nota: r.nota,
  };
}

export function toPrenotazioneAdmin(
  r: AppPrenotazione,
  clienteNome: string,
  tokenPagamento: string | null = null
): PrenotazioneAdmin {
  return {
    ...toPrenotazione(r, tokenPagamento),
    clienteId: r.clienteId,
    clienteNome,
    createdAt: r.createdAt.toISOString(),
  };
}

export function toSlotAdmin(r: AppSlot): SlotAdmin {
  return { id: r.id, giorno: r.giorno, inizio: r.inizio, fine: r.fine, luogo: r.luogo, attivo: r.attivo };
}

export function toChiusura(r: AppChiusura): Chiusura {
  return { id: r.id, data: r.data, nota: r.nota };
}

/** pagamentoId -> token, per il link alla cassa delle ore "da pagare". */
export async function tokenPagamenti(
  righe: Pick<AppPrenotazione, "stato" | "pagamentoId">[]
): Promise<Map<string, string>> {
  const ids = [...new Set(righe.flatMap((r) => (r.stato === "da pagare" && r.pagamentoId ? [r.pagamentoId] : [])))];
  if (!ids.length) return new Map();
  const pag = await prisma.pagamento.findMany({ where: { id: { in: ids } }, select: { id: true, token: true } });
  return new Map(pag.map((p) => [p.id, p.token]));
}

export const tokenDi = (m: Map<string, string>, r: Pick<AppPrenotazione, "pagamentoId">) =>
  (r.pagamentoId && m.get(r.pagamentoId)) || null;

/* ------------------------------------------------- pagamenti delle ore */

/**
 * Una cassa lasciata a meta' (riga "in corso"): se il cliente ha pagato,
 * l'incasso si registra come al ritorno dalla cassa (con l'avviso ad Angelo);
 * se no la sessione Stripe si chiude, cosi' non si paga piu' un'ora che e'
 * tornata libera. true = risulta pagata.
 */
async function cassaPagata(p: { id: string; provider: string | null; providerRef: string | null }): Promise<boolean> {
  try {
    if (p.provider === "stripe" && p.providerRef?.startsWith("cs_")) {
      const stripe = getStripe();
      if (!stripe) return false;
      try {
        await stripe.checkout.sessions.expire(p.providerRef);
        return false; // era ancora aperta: adesso e' chiusa, e non pagata
      } catch {
        // gia' completata o gia' scaduta: si chiede com'e' andata
      }
      const f = await confermaStripe(p.id);
      if (f) await avvisaIncasso(f);
      return !!f;
    }
    if (p.provider === "paypal") {
      const fatti = await sincronizzaPaypal(p.id);
      for (const f of fatti) await avvisaIncasso(f);
      return fatti.length > 0;
    }
  } catch {
    // cassa irraggiungibile: un pagamento arrivato lo registra il webhook, e diventa credito
  }
  return false;
}

/**
 * Chiude la riga Pagamento di un'ora che non serve piu' (annullata o tenuta
 * scaduta). Una riga gia' pagata resta pagata: quell'ora diventa credito extra.
 */
export async function chiudiPagamento(pagamentoId: string): Promise<"pagato" | "annullato"> {
  const p = await prisma.pagamento.findUnique({
    where: { id: pagamentoId },
    select: { id: true, stato: true, provider: true, providerRef: true },
  });
  if (!p) return "annullato";
  if (p.stato === "pagato") return "pagato";
  if (p.stato === "in corso" && (await cassaPagata(p))) return "pagato";
  const { count } = await prisma.pagamento.updateMany({
    where: { id: p.id, stato: { in: ["aperto", "in corso"] } },
    data: { stato: "annullato" },
  });
  if (!count) {
    // nel frattempo l'ha chiusa il webhook
    const ora = await prisma.pagamento.findUnique({ where: { id: p.id }, select: { stato: true } });
    if (ora?.stato === "pagato") return "pagato";
  }
  return "annullato";
}

/**
 * Le ore "da pagare": pagate -> confermata; tenute da piu' di 30 minuti senza
 * pagamento -> annullata (col loro Pagamento), cosi' l'ora torna libera.
 * Si chiama quando si calcolano gli slot, si prenota o si leggono le ore.
 */
export async function sistemaTenute(filtro: { coach: string } | { clienteId: string }): Promise<void> {
  const tenute = await prisma.appPrenotazione.findMany({
    where: { ...filtro, stato: "da pagare" },
    select: { id: true, pagamentoId: true, createdAt: true },
  });
  if (!tenute.length) return;

  const ids = tenute.flatMap((t) => (t.pagamentoId ? [t.pagamentoId] : []));
  const pagate = new Set(
    (await prisma.pagamento.findMany({ where: { id: { in: ids }, stato: "pagato" }, select: { id: true } })).map(
      (p) => p.id
    )
  );
  const limite = Date.now() - TENUTA_MS;

  for (const t of tenute) {
    let pagata = !!t.pagamentoId && pagate.has(t.pagamentoId);
    if (!pagata && t.createdAt.getTime() < limite) {
      pagata = t.pagamentoId ? (await chiudiPagamento(t.pagamentoId)) === "pagato" : false;
      if (!pagata) {
        await prisma.appPrenotazione.updateMany({
          where: { id: t.id, stato: "da pagare" },
          data: { stato: "annullata", annullataAt: new Date() },
        });
        continue;
      }
    }
    if (pagata) {
      await prisma.appPrenotazione.updateMany({
        where: { id: t.id, stato: "da pagare" },
        data: { stato: "confermata" },
      });
    }
  }
}

/* ---------------------------------------------------------- disponibili */

/**
 * Fasce libere del coach nei prossimi 28 giorni: slot attivi del giorno della
 * settimana, da adesso + 12 h, meno chiusure e ore gia' prese (da chiunque).
 */
export async function giorniLiberi(
  coach: string,
  ora: Date = new Date()
): Promise<{ data: DataISO; slot: SlotLibero[] }[]> {
  const oggi = oggiISO(ora);
  const ultimo = aggiungiGiorni(oggi, GIORNI_AVANTI - 1);
  const [slot, chiusure, prese] = await Promise.all([
    prisma.appSlot.findMany({ where: { coach, attivo: true }, orderBy: [{ giorno: "asc" }, { inizio: "asc" }] }),
    prisma.appChiusura.findMany({ where: { coach, data: { gte: oggi, lte: ultimo } }, select: { data: true } }),
    prisma.appPrenotazione.findMany({
      where: { coach, data: { gte: oggi, lte: ultimo }, stato: { in: STATI_ATTIVI } },
      select: { data: true, inizio: true, fine: true },
    }),
  ]);
  if (!slot.length) return [];

  const chiusi = new Set(chiusure.map((c) => c.data));
  const presePerGiorno = new Map<DataISO, { inizio: Ora; fine: Ora }[]>();
  for (const p of prese) presePerGiorno.set(p.data, [...(presePerGiorno.get(p.data) ?? []), p]);
  const minimo = ora.getTime() + ANTICIPO_MS;

  const giorni: { data: DataISO; slot: SlotLibero[] }[] = [];
  for (let i = 0; i < GIORNI_AVANTI; i++) {
    const data = aggiungiGiorni(oggi, i);
    if (chiusi.has(data)) continue;
    const g = giornoSettimana(data);
    const occupate = presePerGiorno.get(data) ?? [];
    const liberi = slot
      .filter(
        (s) =>
          s.giorno === g &&
          istante(data, s.inizio).getTime() >= minimo &&
          !occupate.some((p) => siSovrappongono(s, p))
      )
      .map((s) => ({ data, inizio: s.inizio, fine: s.fine, luogo: s.luogo }));
    if (liberi.length) giorni.push({ data, slot: liberi });
  }
  return giorni;
}

/* ----------------------------------------------------- esiti per le rotte */

export type Testi = { de: string; it: string };

export type Esito<T> =
  | { ok: true; valore: T; status: 200 | 201 }
  | { ok: false; errore: Testi; status: 400 | 404 | 409 | 429 };

const ok = <T>(valore: T, status: 200 | 201 = 200): Esito<T> => ({ ok: true, valore, status });
const no = <T>(status: 400 | 404 | 409 | 429, errore: Testi): Esito<T> => ({ ok: false, errore, status });

export const ERRORI_PRENOTAZIONE = {
  richiesta: { de: "Ungültige Anfrage", it: "Richiesta non valida" },
  finestra: {
    de: "Termine kannst du frühestens 12 Stunden und höchstens 28 Tage im Voraus buchen.",
    it: "Puoi prenotare da 12 ore prima fino a 28 giorni avanti.",
  },
  nonDisponibile: {
    de: "Zu dieser Zeit ist der Coach nicht verfügbar.",
    it: "A quell'ora il coach non è disponibile.",
  },
  occupata: {
    de: "Dieser Termin ist leider schon vergeben.",
    it: "Quest'ora è già stata prenotata.",
  },
  tenute: {
    de: "Du hast noch unbezahlte Termine. Bitte zuerst bezahlen oder absagen.",
    it: "Hai ancora ore da pagare. Pagale o annullale prima di prenotarne altre.",
  },
  nonTrovata: { de: "Termin nicht gefunden", it: "Prenotazione non trovata" },
  tardi: {
    de: "Weniger als 24 Stunden vorher: Bitte direkt beim Coach absagen.",
    it: "Mancano meno di 24 ore: per annullare scrivi direttamente al coach.",
  },
  svolta: { de: "Dieser Termin hat schon stattgefunden.", it: "Quest'ora si è già svolta." },
} satisfies Record<string, Testi>;

const ERR = ERRORI_PRENOTAZIONE;

/* -------------------------------------------------------------- cliente */

/** POST /api/app/prenotazioni body {data, inizio}. */
export async function prenota(cliente: AppCliente, body: unknown): Promise<Esito<EsitoPrenotazione>> {
  const o = body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : {};
  const data = o.data;
  const inizio = oraValida(o.inizio);
  if (!dataValida(data) || !inizio) return no(400, ERR.richiesta);

  const coach = cliente.coach;
  const ora = new Date();
  const avanti = giorniTra(oggiISO(ora), data);
  if (avanti < 0 || avanti >= GIORNI_AVANTI || istante(data, inizio).getTime() < ora.getTime() + ANTICIPO_MS) {
    return no(409, ERR.finestra);
  }

  // prima si liberano le tenute scadute: l'ora chiesta potrebbe essere una di quelle
  await sistemaTenute({ coach });

  const [slot, chiusura, prese, tenute] = await Promise.all([
    prisma.appSlot.findFirst({
      where: { coach, attivo: true, giorno: giornoSettimana(data), inizio },
      orderBy: { createdAt: "asc" },
    }),
    prisma.appChiusura.findUnique({ where: { coach_data: { coach, data } }, select: { id: true } }),
    prisma.appPrenotazione.findMany({
      where: { coach, data, stato: { in: STATI_ATTIVI } },
      select: { inizio: true, fine: true },
    }),
    prisma.appPrenotazione.count({ where: { clienteId: cliente.id, stato: "da pagare" } }),
  ]);
  if (!slot || chiusura) return no(409, ERR.nonDisponibile);
  if (prese.some((p) => siSovrappongono(slot, p))) return no(409, ERR.occupata);

  // le ore incluse si contano nel mese dell'ora prenotata, non in quello di oggi
  const ore = await oreCliente(cliente, { mese: meseDi(data) });
  const tipo = ore.restantiQuestoMese > 0 ? "inclusa" : "extra";
  const daPagare = tipo === "extra" && ore.creditoExtra <= 0;
  // 429 e non 409: l'app legge il 409 come "ora presa da un altro" e ricarica i posti
  if (daPagare && tenute >= MAX_TENUTE) return no(429, ERR.tenute);

  try {
    // pagamento e prenotazione insieme: se l'ora e' gia' presa non resta una riga da pagare orfana
    const { pren, token } = await prisma.$transaction(async (tx) => {
      const pag = daPagare
        ? await tx.pagamento.create({
            data: {
              token: nuovoToken(),
              documento: documentoApp(cliente.id),
              descrizione: `${descrizioneOreExtra(1)} — ${dataTedesca(data)}, ${inizio} Uhr`,
              clienteNome: cliente.nome,
              clienteEmail: cliente.email,
              importo: PREZZO_ORA,
              tipo: TIPO_ORE_EXTRA,
              // [ore=1] come gli acquisti dallo shop; il resto distingue la tenuta da un acquisto
              note: `${notaOre(1)} Termin ${data} ${inizio}`,
              scadenza: new Date(ora.getTime() + TENUTA_MS),
              stato: "aperto",
            },
            select: { id: true, token: true },
          })
        : null;
      const pren = await tx.appPrenotazione.create({
        data: {
          coach,
          clienteId: cliente.id,
          data,
          inizio,
          fine: slot.fine,
          luogo: slot.luogo,
          tipo,
          stato: daPagare ? "da pagare" : "confermata",
          pagamentoId: pag?.id ?? null,
        },
      });
      return { pren, token: pag?.token ?? null };
    });
    const prenotazione = toPrenotazione(pren, token, ora);
    return ok({ prenotazione, linkPagamento: prenotazione.linkPagamento }, 201);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") return no(409, ERR.occupata);
    throw e;
  }
}

/** DELETE /api/app/prenotazioni/[id]: solo le sue, solo fino a 24 h prima. */
export async function annullaDalCliente(cliente: Pick<AppCliente, "id">, id: string): Promise<Esito<null>> {
  const r = await prisma.appPrenotazione.findFirst({ where: { id, clienteId: cliente.id } });
  if (!r) return no(404, ERR.nonTrovata);
  if (r.stato === "annullata") return ok(null);
  if (r.stato === "svolta") return no(409, ERR.svolta);
  if (istante(r.data, r.inizio).getTime() - Date.now() < ANNULLA_MS) return no(409, ERR.tardi);

  const { count } = await prisma.appPrenotazione.updateMany({
    where: { id: r.id, stato: r.stato },
    data: { stato: "annullata", annullataAt: new Date() },
  });
  // la riga aperta non si paga piu'; se era gia' pagata resta, e l'ora va nel credito
  if (count && r.pagamentoId) await chiudiPagamento(r.pagamentoId);
  return ok(null);
}

/** GET /api/app/prenotazioni: prossime (dalla piu' vicina) e passate (dalla piu' recente). */
export async function prenotazioniCliente(
  clienteId: string
): Promise<{ prossime: Prenotazione[]; passate: Prenotazione[] }> {
  await sistemaTenute({ clienteId });
  const ora = new Date();
  const righe = await prisma.appPrenotazione.findMany({
    where: { clienteId },
    orderBy: [{ data: "desc" }, { inizio: "desc" }],
    take: 200,
  });
  const token = await tokenPagamenti(righe);
  const prossime: Prenotazione[] = [];
  const passate: Prenotazione[] = [];
  for (const r of righe) {
    const finita = istante(r.data, r.fine) <= ora;
    if (finita) {
      if (passate.length < 100) passate.push(toPrenotazione(r, tokenDi(token, r), ora));
    } else if (r.stato === "confermata" || r.stato === "da pagare") {
      prossime.push(toPrenotazione(r, tokenDi(token, r), ora));
    }
    // le future annullate non si mostrano: le ha tolte lui (o sono scadute)
  }
  prossime.reverse();
  return { prossime, passate };
}

/** La prossima ora 1:1 (anche in corso), per la home. */
export async function prossimaPrenotazione(clienteId: string): Promise<Prenotazione | null> {
  await sistemaTenute({ clienteId });
  const ora = new Date();
  const righe = await prisma.appPrenotazione.findMany({
    where: { clienteId, stato: { in: ["confermata", "da pagare"] }, data: { gte: oggiISO(ora) } },
    orderBy: [{ data: "asc" }, { inizio: "asc" }],
    take: 10,
  });
  const r = righe.find((x) => istante(x.data, x.fine) > ora);
  if (!r) return null;
  return toPrenotazione(r, tokenDi(await tokenPagamenti([r]), r), ora);
}

/** Ore 1:1 svolte (o passate e confermate). */
export async function oreSvolte(clienteId: string): Promise<number> {
  const ora = new Date();
  const [svolte, confermate] = await Promise.all([
    prisma.appPrenotazione.count({ where: { clienteId, stato: "svolta" } }),
    prisma.appPrenotazione.findMany({
      where: { clienteId, stato: "confermata", data: { lte: oggiISO(ora) } },
      select: { data: true, fine: true },
    }),
  ]);
  return svolte + confermate.filter((r) => istante(r.data, r.fine) <= ora).length;
}
