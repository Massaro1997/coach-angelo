// App v2, shop: il contratto FitPrimo collegato al cliente (abbonamento, rate,
// rinnovo) e i pacchetti coaching che puo' comprare dall'app. Solo server.
//
// Il contratto e' un Preventivo come quelli che Angelo crea dal gestionale:
// rinnovo e contratto nuovo dall'app seguono la stessa strada (stessa
// numerazione, stessa pagina di firma e pagamento), cosi' non c'e' un secondo
// flusso di soldi da tenere in piedi.
//
// Le ore extra (righe Pagamento senza contratto) stanno in ore.ts.

import { Prisma } from "@prisma/client";
import type { AppCliente, Pagamento } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ARTICOLI_BASE, eur, nuovoToken, prossimoNumero, totaleVoci } from "@/lib/preventivo";
import { LISTINO, voceAOre, type VoceListino, type VocePreventivo } from "@/lib/preventivo-listino";
import { fineDopoMesi } from "@/lib/stripe";
import type { Lingua } from "./tipi";
import type { PacchettoShop, RataCliente, RiassuntoAbbonamento } from "./tipi-v2";

const GIORNO_MS = 86_400_000;
/** Sotto i 14 giorni dalla fine il contratto e' "in scadenza". */
const PREAVVISO_MS = 14 * GIORNO_MS;
/** Giorni per firmare un contratto creato dall'app (come il default del gestionale). */
const GIORNI_VALIDITA = 14;

/* ------------------------------------------------------------- contratto */

// Mai la firma (BYTEA): solo i campi che servono qui.
export const SEL_CONTRATTO = {
  id: true,
  numero: true,
  token: true,
  clienteNome: true,
  clienteEmail: true,
  clienteTelefono: true,
  clienteIndirizzo: true,
  clientePiva: true,
  oggetto: true,
  premesse: true,
  items: true,
  totale: true,
  periodicita: true,
  mesi: true,
  importoNota: true,
  articoli: true,
  lingua: true,
  stato: true,
  validoFino: true,
  firmatoAt: true,
  accontoPerc: true,
  lavoro: true,
  dataInizio: true,
  dataFine: true,
  createdAt: true,
} satisfies Prisma.PreventivoSelect;

export type Contratto = Prisma.PreventivoGetPayload<{ select: typeof SEL_CONTRATTO }>;

/** Premesse del rinnovo: e' anche la chiave con cui lo si ritrova. */
export const marcatoreRinnovo = (numero: string) => `Verlängerung von ${numero}`;

/** N mesi dopo `d`, come li conta Stripe (il 31 diventa l'ultimo del mese). */
export function piuMesi(d: Date, mesi: number): Date {
  return new Date(fineDopoMesi(Math.floor(d.getTime() / 1000), mesi) * 1000);
}

function voci(items: unknown): VocePreventivo[] {
  return Array.isArray(items)
    ? (items as VocePreventivo[]).filter((v) => v && typeof v === "object")
    : [];
}

export function titoloContratto(p: Pick<Contratto, "oggetto" | "items" | "numero">): string {
  return p.oggetto?.trim() || voci(p.items)[0]?.descrizione?.trim() || p.numero;
}

export type AnalisiContratto = {
  stato: RiassuntoAbbonamento["stato"];
  inizio: Date | null;
  fine: Date | null;
  aTempoIndeterminato: boolean;
};

/**
 * Stato del contratto visto dal cliente.
 * - "inviato" = da firmare (anche firmato ma non ancora pagato: e' la prima
 *   rata che lo perfeziona), tranne se e' scaduto senza firma: quello non si
 *   puo' piu' firmare, per il cliente e' finito.
 * - "firmato": attivo, in scadenza (fine entro 14 giorni) o concluso.
 * - "scaduto", "sostituito": concluso.
 * Il contratto a ore (e un mensile senza durata) non ha fine: e' l'abbonamento
 * Stripe che gira finche' qualcuno non disdice. Finisce solo se Angelo l'ha
 * segnato (dataFine, che mette "consegnato", o lavoro "concluso").
 */
export function analizzaContratto(
  p: Pick<
    Contratto,
    "items" | "periodicita" | "mesi" | "stato" | "firmatoAt" | "validoFino" | "dataInizio" | "dataFine" | "lavoro"
  >,
  ora: Date = new Date()
): AnalisiContratto {
  const aTempoIndeterminato = !!voceAOre(p.items) || (p.periodicita === "mensile" && p.mesi <= 1);
  const inizio = p.dataInizio ?? p.firmatoAt ?? null;
  const fine =
    p.dataFine ?? (!aTempoIndeterminato && inizio ? piuMesi(inizio, Math.max(1, p.mesi)) : null);

  let stato: AnalisiContratto["stato"];
  if (p.stato === "inviato") {
    stato = !p.firmatoAt && p.validoFino && p.validoFino < ora ? "concluso" : "da firmare";
  } else if (p.stato === "firmato") {
    if (p.lavoro === "concluso" || (fine && fine <= ora)) stato = "concluso";
    else if (fine && fine.getTime() - ora.getTime() <= PREAVVISO_MS) stato = "in scadenza";
    else stato = "attivo";
  } else {
    stato = "concluso";
  }
  return { stato, inizio, fine, aTempoIndeterminato };
}

/**
 * Il contratto collegato al cliente. Se nel frattempo ha firmato e pagato il
 * rinnovo chiesto dall'app, il collegamento passa al rinnovo: senza, l'app
 * continuerebbe a mostrargli il vecchio come concluso (e a proporgli un altro
 * rinnovo).
 */
export async function contrattoDelCliente(
  cliente: Pick<AppCliente, "id" | "preventivoId">
): Promise<Contratto | null> {
  if (!cliente.preventivoId) return null;
  let p = await prisma.preventivo.findUnique({
    where: { id: cliente.preventivoId },
    select: SEL_CONTRATTO,
  });
  if (!p) return null;
  for (let i = 0; i < 5; i++) {
    const dopo: Contratto | null = await prisma.preventivo.findFirst({
      where: { premesse: marcatoreRinnovo(p.numero), stato: "firmato" },
      orderBy: { createdAt: "desc" },
      select: SEL_CONTRATTO,
    });
    if (!dopo) break;
    p = dopo;
  }
  if (p.id !== cliente.preventivoId) {
    // solo se nessuno l'ha cambiato nel frattempo (il coach dal gestionale)
    await prisma.appCliente.updateMany({
      where: { id: cliente.id, preventivoId: cliente.preventivoId },
      data: { preventivoId: p.id },
    });
  }
  return p;
}

export type ContrattoBreve = { numero: string; titolo: string; stato: string };

/**
 * Per la lista clienti del gestionale: preventivoId -> numero, titolo e stato
 * visto dal cliente. Una query sola; niente rinnovi seguiti (e' una lettura).
 */
export async function contrattiBrevi(ids: (string | null)[]): Promise<Map<string, ContrattoBreve>> {
  const unici = [...new Set(ids.filter((x): x is string => !!x))];
  if (!unici.length) return new Map();
  const righe = await prisma.preventivo.findMany({ where: { id: { in: unici } }, select: SEL_CONTRATTO });
  const ora = new Date();
  return new Map(
    righe.map((p) => [p.id, { numero: p.numero, titolo: titoloContratto(p), stato: analizzaContratto(p, ora).stato }])
  );
}

/* ------------------------------------------------------------------ rate */

type RigaRata = Pick<
  Pagamento,
  "descrizione" | "importo" | "scadenza" | "stato" | "pagatoAt" | "token" | "tipo" | "rataNumero"
>;

function statoRata(s: string): RataCliente["stato"] {
  return s === "in corso" || s === "pagato" || s === "annullato" ? s : "aperto";
}

/**
 * Dal link si paga solo una riga aperta (o con la cassa lasciata a meta').
 * I mesi dopo il primo di un abbonamento li addebita Stripe: pagarli dal link
 * aprirebbe un secondo abbonamento (la rotta /api/pagamento lo rifiuta).
 */
export function pagabileOra(r: Pick<Pagamento, "stato" | "tipo" | "rataNumero">): boolean {
  if (r.stato !== "aperto" && r.stato !== "in corso") return false;
  return !(r.tipo === "abbonamento" && (r.rataNumero ?? 1) > 1);
}

export function toRata(r: RigaRata): RataCliente {
  return {
    descrizione: r.descrizione,
    importo: r.importo,
    scadenza: r.scadenza ? r.scadenza.toISOString() : null,
    stato: statoRata(r.stato),
    pagatoAt: r.pagatoAt ? r.pagatoAt.toISOString() : null,
    link: pagabileOra(r) ? `/pagamento/${r.token}` : null,
  };
}

/** Prima rata non pagata per scadenza (quelle senza data, come il saldo, in fondo). */
function primaDaPagare<T extends RigaRata & { createdAt: Date }>(righe: T[]): T | null {
  const aperte = righe.filter((r) => r.stato !== "pagato" && r.stato !== "annullato");
  aperte.sort(
    (a, b) =>
      (a.scadenza?.getTime() ?? Infinity) - (b.scadenza?.getTime() ?? Infinity) ||
      (a.rataNumero ?? 0) - (b.rataNumero ?? 0) ||
      a.createdAt.getTime() - b.createdAt.getTime()
  );
  return aperte[0] ?? null;
}

/* ------------------------------------------------------------- riassunto */

/**
 * Abbonamento del cliente per home e shop; null = nessun contratto collegato.
 * `contratto` si passa se il chiamante l'ha gia' caricato.
 */
export async function riassuntoAbbonamento(
  cliente: AppCliente,
  contratto?: Contratto | null
): Promise<RiassuntoAbbonamento | null> {
  const p = contratto === undefined ? await contrattoDelCliente(cliente) : contratto;
  if (!p) return null;

  const a = analizzaContratto(p);
  const righe = await prisma.pagamento.findMany({
    where: { preventivoId: p.id },
    orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }],
    select: {
      descrizione: true,
      importo: true,
      scadenza: true,
      stato: true,
      pagatoAt: true,
      token: true,
      tipo: true,
      rataNumero: true,
      metodo: true,
      createdAt: true,
    },
  });

  const mensile = p.periodicita === "mensile";
  const importoMese = mensile
    ? p.mesi > 1
      ? Math.round((p.totale / p.mesi) * 100) / 100
      : p.totale
    : null;

  // un contratto sostituito o scaduto non si paga piu' dal link, anche se ha righe aperte
  const pagabile = p.stato === "inviato" || p.stato === "firmato";
  const rata = (r: (typeof righe)[number]): RataCliente => {
    const x = toRata(r);
    return pagabile ? x : { ...x, link: null };
  };

  let prossimaRata: RataCliente | null = null;
  const prima = primaDaPagare(righe);
  if (prima) {
    prossimaRata = rata(prima);
  } else if (mensile && a.aTempoIndeterminato && (a.stato === "attivo" || a.stato === "in scadenza")) {
    // Abbonamento senza durata: i mesi dopo il primo diventano righe solo
    // quando Stripe (o PayPal) li addebita (rinnovoAbbonamento). La prossima
    // si ricava dall'ultima pagata, senza link: la paga l'addebito automatico.
    const ultima = righe
      .filter((r) => r.stato === "pagato" && r.tipo === "abbonamento" && r.metodo === "abbonamento")
      .sort((x, y) => (y.pagatoAt?.getTime() ?? 0) - (x.pagatoAt?.getTime() ?? 0))[0];
    const base = ultima ? (ultima.pagatoAt ?? ultima.scadenza) : null;
    if (ultima && base) {
      const scadenza = piuMesi(base, 1);
      if (!a.fine || scadenza < a.fine) {
        prossimaRata = {
          descrizione: ultima.descrizione.replace(/ — .*$/, "") + " — monatlich",
          importo: ultima.importo,
          scadenza: scadenza.toISOString(),
          stato: "aperto",
          pagatoAt: null,
          link: null,
        };
      }
    }
  }

  return {
    numero: p.numero,
    titolo: titoloContratto(p),
    stato: a.stato,
    periodicita: mensile ? "mensile" : "una tantum",
    mesi: p.mesi,
    importoMese,
    inizio: a.inizio ? a.inizio.toISOString() : null,
    fine: a.fine ? a.fine.toISOString() : null,
    aTempoIndeterminato: a.aTempoIndeterminato,
    prossimaRata,
    rate: righe.map(rata),
    linkContratto: `/preventivo/${p.token}`,
    // si "rinnova" solo un contratto che e' stato davvero in vigore
    rinnovabile:
      !a.aTempoIndeterminato &&
      p.mesi > 1 &&
      p.stato === "firmato" &&
      (a.stato === "attivo" || a.stato === "in scadenza" || a.stato === "concluso"),
  };
}

/** Un contratto nuovo dall'app solo a chi non ne ha uno, o l'ha finito. */
export function puoNuovoContratto(abbonamento: Pick<RiassuntoAbbonamento, "stato"> | null): boolean {
  return !abbonamento || abbonamento.stato === "concluso";
}

/* ------------------------------------------------------------- pacchetti */

/** I pacchetti coaching del volantino: le altre voci del LISTINO non si vendono dall'app. */
export const PACCHETTI_COACHING: VoceListino[] = LISTINO.filter((v) => v.key.startsWith("coaching-"));

const DESCRIZIONE_COACHING_IT =
  "Piano di allenamento individuale, piano alimentare, check-in settimanali, supporto su WhatsApp.";

/** Totale del pacchetto, come lo calcola il gestionale: rata per mesi. */
function totalePacchetto(v: VoceListino): number {
  return Math.round(v.prezzo * (v.periodicita === "mensile" ? v.mesi : 1) * 100) / 100;
}

export function pacchettoCoaching(v: VoceListino, l: Lingua): PacchettoShop {
  const einmal = v.periodicita !== "mensile";
  const pagamento =
    l === "it"
      ? einmal
        ? "Pagamento unico."
        : `${v.mesi} rate mensili da ${eur(v.prezzo)}, addebitate in automatico.`
      : einmal
        ? "Einmalzahlung."
        : `${v.mesi} × ${eur(v.prezzo)} monatlich, automatisch abgebucht.`;
  return {
    key: v.key,
    titolo: l === "it" ? `Coaching ${v.mesi} mesi${einmal ? " (pagamento unico)" : ""}` : v.label,
    descrizione: `${pagamento} ${l === "it" ? DESCRIZIONE_COACHING_IT : v.descrizione}`,
    prezzo: totalePacchetto(v),
    ore: null,
    tipo: "nuovo-contratto",
  };
}

/* --------------------------------------------- rinnovo e contratto nuovo */

export type Testi = { de: string; it: string };

export type EsitoLink =
  | { link: string; errore: null; status: 200 | 201 }
  | { link: null; errore: Testi; status: 400 | 404 | 409 };

const ERR = {
  nessunContratto: {
    de: "Mit deinem Konto ist kein Vertrag verbunden.",
    it: "Al tuo account non è collegato nessun contratto.",
  },
  nonRinnovabile: {
    de: "Dieser Vertrag kann nicht in der App verlängert werden. Schreib bitte dem Coach.",
    it: "Questo contratto non si può rinnovare dall'app. Scrivi al coach.",
  },
  pacchetto: { de: "Unbekanntes Paket", it: "Pacchetto sconosciuto" },
  haGiaContratto: {
    de: "Du hast schon einen Vertrag. Wenn du wechseln möchtest, schreib bitte dem Coach.",
    it: "Hai già un contratto. Se vuoi cambiarlo, scrivi al coach.",
  },
} satisfies Record<string, Testi>;

function validoFino(): Date {
  const d = new Date();
  d.setDate(d.getDate() + GIORNI_VALIDITA);
  return d;
}

/** Numero e token sono unique: se due contratti nascono nello stesso istante, si riprova. */
async function creaPreventivo(data: Omit<Prisma.PreventivoCreateInput, "numero" | "token">) {
  for (let i = 0; ; i++) {
    try {
      return await prisma.preventivo.create({
        data: { ...data, numero: await prossimoNumero(), token: nuovoToken() },
        select: { id: true, token: true },
      });
    } catch (e) {
      if (i < 3 && e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
      throw e;
    }
  }
}

/**
 * Rinnovo dall'app: copia del contratto collegato (stesse voci, durata,
 * clausole, dati del cliente) da firmare e pagare come uno nuovo. Una
 * richiesta degli ultimi 14 giorni ancora firmabile si riusa: due tocchi non
 * fanno due contratti.
 */
export async function creaRinnovo(cliente: AppCliente): Promise<EsitoLink> {
  const p = await contrattoDelCliente(cliente);
  if (!p) return { link: null, errore: ERR.nessunContratto, status: 404 };
  const r = await riassuntoAbbonamento(cliente, p);
  if (!r?.rinnovabile) return { link: null, errore: ERR.nonRinnovabile, status: 409 };

  const ora = new Date();
  const gia = await prisma.preventivo.findFirst({
    where: {
      premesse: marcatoreRinnovo(p.numero),
      stato: "inviato",
      createdAt: { gte: new Date(ora.getTime() - GIORNI_VALIDITA * GIORNO_MS) },
      OR: [{ validoFino: null }, { validoFino: { gt: ora } }],
    },
    orderBy: { createdAt: "desc" },
    select: { token: true },
  });
  if (gia) return { link: `/preventivo/${gia.token}`, errore: null, status: 200 };

  // via firma e crocette del vecchio: il rinnovo si firma da capo
  const items = voci(p.items).map((v) => {
    const { scelte, preparato, ...resto } = v;
    void scelte;
    void preparato;
    return resto;
  });
  const nuovo = await creaPreventivo({
    clienteNome: p.clienteNome,
    clienteEmail: p.clienteEmail,
    clienteTelefono: p.clienteTelefono,
    clienteIndirizzo: p.clienteIndirizzo,
    clientePiva: p.clientePiva,
    oggetto: p.oggetto,
    premesse: marcatoreRinnovo(p.numero),
    items: items as unknown as Prisma.InputJsonValue,
    totale: totaleVoci(items),
    periodicita: p.periodicita,
    mesi: p.mesi,
    accontoPerc: p.accontoPerc,
    importoNota: p.importoNota,
    articoli: (p.articoli ?? ARTICOLI_BASE) as unknown as Prisma.InputJsonValue,
    lingua: p.lingua,
    stato: "inviato",
    validoFino: validoFino(),
  });
  return { link: `/preventivo/${nuovo.token}`, errore: null, status: 201 };
}

/**
 * Contratto nuovo dal LISTINO per chi non ne ha uno (o l'ha finito): le
 * stesse voci che mette il gestionale per quel pacchetto, dati presi dal
 * cliente dell'app, subito collegato al cliente.
 */
export async function creaNuovoContratto(cliente: AppCliente, key: unknown): Promise<EsitoLink> {
  const v = PACCHETTI_COACHING.find((x) => x.key === key);
  if (!v) return { link: null, errore: ERR.pacchetto, status: 400 };

  const vecchio = await contrattoDelCliente(cliente);
  if (vecchio && analizzaContratto(vecchio).stato !== "concluso") {
    return { link: null, errore: ERR.haGiaContratto, status: 409 };
  }

  const mensile = v.periodicita === "mensile";
  const items: VocePreventivo[] = [
    { descrizione: `${v.label} — ${v.descrizione}`, prezzo: v.prezzo, quantita: mensile ? v.mesi : 1 },
  ];
  const nuovo = await creaPreventivo({
    clienteNome: cliente.nome,
    clienteEmail: cliente.email ?? vecchio?.clienteEmail ?? null,
    clienteTelefono: cliente.telefono ?? vecchio?.clienteTelefono ?? null,
    // indirizzo e P.IVA nell'app non ci sono: si riprendono dal contratto finito
    clienteIndirizzo: vecchio?.clienteIndirizzo ?? null,
    clientePiva: vecchio?.clientePiva ?? null,
    oggetto: v.label,
    items: items as unknown as Prisma.InputJsonValue,
    totale: totaleVoci(items),
    periodicita: v.periodicita,
    mesi: v.mesi,
    accontoPerc: v.accontoPerc ?? 100,
    articoli: ARTICOLI_BASE as unknown as Prisma.InputJsonValue,
    lingua: cliente.lingua === "it" ? "it" : "de",
    stato: "inviato",
    validoFino: validoFino(),
  });
  await prisma.appCliente.update({ where: { id: cliente.id }, data: { preventivoId: nuovo.id } });
  return { link: `/preventivo/${nuovo.token}`, errore: null, status: 201 };
}
