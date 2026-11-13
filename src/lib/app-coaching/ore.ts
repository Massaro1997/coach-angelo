// App v2: le ore 1:1 del cliente. Solo server.
//
// - incluse: dal contratto a ore collegato e firmato (ore pagate al mese +
//   ore regalate, quelle "im ersten Monat" solo nel primo mese);
// - usate: prenotazioni "inclusa" del mese non annullate;
// - credito extra: ore comprate dall'app e pagate meno le ore "extra" che le
//   hanno consumate.
//
// Le ore extra sono righe Pagamento senza contratto (documento APP-<clienteId>,
// tipo "ore-extra", note "[ore=N]"): passano dalla stessa cassa /pagamento dei
// contratti, che regge righe senza preventivo (lingua "de", niente link al
// contratto, registraIncasso si ferma dopo aver segnato la riga pagata).

import type { AppCliente } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { nuovoToken } from "@/lib/preventivo";
import { PREZZO_ORA, voceAOre, type VocePreventivo } from "@/lib/preventivo-listino";
import { limitiMese, meseDi, oggiISO } from "./date";
import { analizzaContratto, contrattoDelCliente, toRata, type Contratto } from "./shop";
import type { Lingua, MeseISO } from "./tipi";
import type { OreCliente, PacchettoShop, RataCliente } from "./tipi-v2";

export const TIPO_ORE_EXTRA = "ore-extra";

/** Le righe Pagamento dell'app non hanno un contratto: le lega il documento. */
export const documentoApp = (clienteId: string) => `APP-${clienteId}`;

export const notaOre = (n: number) => `[ore=${n}]`;

/** Ore di una riga ore-extra; se la nota e' stata toccata a mano, dall'importo. */
export function oreDaNota(note: string | null, importo: number): number {
  const m = note?.match(/\[ore=(\d+)\]/);
  if (m) return Number(m[1]);
  return Math.max(0, Math.round(importo / PREZZO_ORA));
}

/** Pacchetti di ore extra: prezzo pieno, ore x 50 €, niente sconti. */
export const PACCHETTI_ORE: Record<string, number> = { "ore-1": 1, "ore-4": 4 };

export const descrizioneOreExtra = (n: number) =>
  n === 1 ? "Extra-Stunde Personal Training 1:1" : `${n} Extra-Stunden Personal Training 1:1`;

export function pacchettiOre(l: Lingua): PacchettoShop[] {
  return Object.entries(PACCHETTI_ORE).map(([key, n]) => ({
    key,
    titolo:
      l === "it"
        ? n === 1
          ? "1 ora extra"
          : `${n} ore extra`
        : n === 1
          ? "1 Extra-Stunde"
          : `${n} Extra-Stunden`,
    descrizione:
      l === "it"
        ? "Personal training 1:1 col coach, 60 minuti. Le prenoti tu nelle sue ore libere."
        : "Personal Training 1:1 mit dem Coach, 60 Minuten. Du buchst sie selbst in seinen freien Zeiten.",
    prezzo: n * PREZZO_ORA,
    ore: n,
    tipo: "ore-extra" as const,
  }));
}

/* -------------------------------------------------------------- incluse */

function quante(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
}

/**
 * Ore incluse nel mese dal contratto a ore. Il contratto deve essere firmato
 * (cioe' pagato: e' il primo incasso che lo perfeziona) e il mese dentro la
 * sua durata. Il "primo mese" e' il mese di calendario dell'inizio: le ore si
 * contano per mese di calendario, come le prenotazioni.
 */
export function oreInclusePerMese(p: Contratto | null, mese: MeseISO): number {
  if (!p || p.stato !== "firmato") return 0;
  const voce = voceAOre(p.items);
  if (!voce) return 0;
  const a = analizzaContratto(p);
  if (a.stato === "concluso") return 0;
  const primoMese = a.inizio ? meseDi(oggiISO(a.inizio)) : null;
  if (primoMese && mese < primoMese) return 0;
  if (a.fine && mese > meseDi(oggiISO(a.fine))) return 0;

  let ore = quante(voce.quantita);
  for (const v of p.items as unknown as VocePreventivo[]) {
    if (v?.modulo !== "bonus") continue;
    // descrizioneBonus: "... pro Monat" oppure "... im ersten Monat"
    const soloPrimo = /im ersten Monat/i.test(v.descrizione || "");
    if (!soloPrimo || (primoMese !== null && mese === primoMese)) ore += quante(v.quantita);
  }
  return ore;
}

/* --------------------------------------------------------------- credito */

/**
 * Ore extra pagate meno ore extra usate (puo' andare sotto zero se il coach
 * segna ore extra a mano). Un'ora con un suo pagamento (la tenuta "da pagare")
 * pesa solo se quel pagamento e' arrivato: pagata, si compra e si consuma da
 * sola; non pagata, non tocca il credito (se il coach l'ha confermata lo
 * stesso, l'ha incassata fuori).
 */
export async function creditoExtra(clienteId: string): Promise<number> {
  const [pagate, extra] = await Promise.all([
    prisma.pagamento.findMany({
      where: { documento: documentoApp(clienteId), tipo: TIPO_ORE_EXTRA, stato: "pagato" },
      select: { id: true, note: true, importo: true },
    }),
    prisma.appPrenotazione.findMany({
      where: { clienteId, tipo: "extra", stato: { in: ["confermata", "svolta", "da pagare"] } },
      select: { pagamentoId: true },
    }),
  ]);
  const idPagate = new Set(pagate.map((p) => p.id));
  const comprate = pagate.reduce((s, p) => s + oreDaNota(p.note, p.importo), 0);
  const usate = extra.filter((b) => !b.pagamentoId || idPagate.has(b.pagamentoId)).length;
  return comprate - usate;
}

/**
 * Le ore del cliente in un mese (default: questo). `contratto` si passa se il
 * chiamante l'ha gia' caricato.
 */
export async function oreCliente(
  cliente: Pick<AppCliente, "id" | "preventivoId">,
  opz: { mese?: MeseISO; contratto?: Contratto | null } = {}
): Promise<OreCliente> {
  const mese = opz.mese ?? meseDi(oggiISO());
  const { primo, ultimo } = limitiMese(mese);
  const [contratto, usate, credito] = await Promise.all([
    opz.contratto !== undefined ? opz.contratto : contrattoDelCliente(cliente),
    prisma.appPrenotazione.count({
      where: {
        clienteId: cliente.id,
        tipo: "inclusa",
        stato: { not: "annullata" },
        data: { gte: primo, lte: ultimo },
      },
    }),
    creditoExtra(cliente.id),
  ]);
  const incluse = oreInclusePerMese(contratto, mese);
  return {
    inclusePerMese: incluse,
    usateQuestoMese: usate,
    restantiQuestoMese: Math.max(0, incluse - usate),
    creditoExtra: Math.max(0, credito),
    prezzoOra: PREZZO_ORA,
  };
}

/* -------------------------------------------------------------- acquisti */

/** Ore extra chieste e non ancora pagate (anche quelle di una prenotazione). */
export async function acquistiInSospeso(clienteId: string): Promise<RataCliente[]> {
  const righe = await prisma.pagamento.findMany({
    where: {
      documento: documentoApp(clienteId),
      tipo: TIPO_ORE_EXTRA,
      stato: { in: ["aperto", "in corso"] },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return righe.map(toRata);
}

/**
 * Riga Pagamento per un pacchetto di ore extra; null se la key non esiste.
 * Lo stesso pacchetto chiesto nelle ultime 24 ore e ancora aperto si riusa:
 * un doppio tocco non fa due richieste di pagamento.
 */
export async function creaAcquistoOre(cliente: AppCliente, key: unknown): Promise<{ link: string } | null> {
  const n = typeof key === "string" && Object.prototype.hasOwnProperty.call(PACCHETTI_ORE, key) ? PACCHETTI_ORE[key] : 0;
  if (!n) return null;

  const documento = documentoApp(cliente.id);
  const gia = await prisma.pagamento.findFirst({
    where: {
      documento,
      tipo: TIPO_ORE_EXTRA,
      note: notaOre(n),
      stato: "aperto",
      createdAt: { gte: new Date(Date.now() - 86_400_000) },
    },
    orderBy: { createdAt: "desc" },
    select: { token: true },
  });
  if (gia) return { link: `/pagamento/${gia.token}` };

  const riga = await prisma.pagamento.create({
    data: {
      token: nuovoToken(),
      documento,
      descrizione: descrizioneOreExtra(n),
      clienteNome: cliente.nome,
      clienteEmail: cliente.email,
      importo: n * PREZZO_ORA,
      tipo: TIPO_ORE_EXTRA,
      note: notaOre(n),
      stato: "aperto",
    },
    select: { token: true },
  });
  return { link: `/pagamento/${riga.token}` };
}
