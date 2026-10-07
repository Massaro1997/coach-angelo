// Stripe: sessioni di pagamento per le rate del preventivo.
//
// Come in DirezioneX, la firma da sola non perfeziona il contratto: il
// preventivo passa a "firmato" solo quando il primo incasso risulta pagato
// (lo fa registraIncasso, chiamato dal webhook).
//
// I pacchetti mensili (3, 6, 12 mesi) sono un abbonamento Stripe: il cliente
// paga il primo mese alla firma, i mesi dopo vengono addebitati da soli e
// l'abbonamento si chiude da solo alla fine della durata (cancel_at).

import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { nuovoToken } from "@/lib/preventivo";

let _stripe: Stripe | null = null;

/** Null se la chiave non e' configurata: il resto del sito deve reggere. */
export function getStripe(): Stripe | null {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  _stripe = new Stripe(key);
  return _stripe;
}

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.angelocoach.com";

/**
 * Registra l'incasso di una rata e fa avanzare il preventivo.
 *
 * Idempotente: se la riga risulta gia' pagata restituisce null e non tocca
 * niente, cosi' un webhook consegnato due volte non raddoppia gli importi
 * (ne' gli avvisi).
 */
export async function registraIncasso(opts: {
  pagamentoId: string;
  providerRef?: string | null;
  metodo?: string | null;
  provider?: "stripe" | "paypal" | "manuale";
}) {
  const pag = await prisma.pagamento.findUnique({
    where: { id: opts.pagamentoId },
    include: { preventivo: true },
  });
  if (!pag || pag.stato === "pagato") return null;

  const aggiornato = await prisma.pagamento.update({
    where: { id: pag.id },
    data: {
      stato: "pagato",
      pagatoAt: new Date(),
      provider: opts.provider || "stripe",
      metodo: opts.metodo || pag.metodo || "carta",
      providerRef: opts.providerRef || pag.providerRef,
    },
    include: { preventivo: true },
  });

  const prev = aggiornato.preventivo;
  if (!prev) return aggiornato;

  // Il primo incasso perfeziona il contratto: da qui il preventivo e'
  // firmato a tutti gli effetti e il lavoro puo' partire.
  const incassato =
    Math.round((prev.accontoIncassato + aggiornato.importo) * 100) / 100;

  await prisma.preventivo.update({
    where: { id: prev.id },
    data: {
      accontoIncassato: incassato,
      accontoIncassatoAt: prev.accontoIncassatoAt ?? new Date(),
      ...(prev.stato === "inviato" && prev.firmatoAt
        ? { stato: "firmato", lavoro: "in corso", dataInizio: prev.dataInizio ?? new Date() }
        : {}),
    },
  });

  return aggiornato;
}

/**
 * Fine esatta dopo N mesi dall'ancora di fatturazione, nello stesso stile di
 * Stripe (il 31 diventa l'ultimo giorno dei mesi corti). Cade sul bordo di un
 * periodo: Stripe chiude l'abbonamento senza fatturare pro-rata.
 * Lezione da DirezioneX: un cancel_at a meta' periodo fa pagare mezzo mese.
 */
export function fineDopoMesi(ancora: number, mesi: number): number {
  const a = new Date(ancora * 1000);
  const t = new Date(
    Date.UTC(a.getUTCFullYear(), a.getUTCMonth() + mesi, 1, a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds())
  );
  const ultimo = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  t.setUTCDate(Math.min(a.getUTCDate(), ultimo));
  return Math.floor(t.getTime() / 1000);
}

/**
 * Sessione Stripe Checkout per una rata.
 *
 * - riga "abbonamento" (pacchetto mensile): checkout in abbonamento, il
 *   cliente paga il primo mese e lascia la carta per i mesi dopo.
 * - tutte le altre (acconto, saldo, unica): pagamento singolo.
 */
export async function sessioneRata(pagamentoId: string) {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe non configurato");

  const pag = await prisma.pagamento.findUnique({
    where: { id: pagamentoId },
    include: { preventivo: true },
  });
  if (!pag) throw new Error("Pagamento non trovato");
  if (pag.stato === "pagato") throw new Error("Questa rata risulta gia' pagata");

  // Una scheda di checkout rimasta aperta va chiusa prima di aprirne
  // un'altra: due schede pagate sarebbero due abbonamenti.
  if (pag.providerRef?.startsWith("cs_")) {
    try {
      await stripe.checkout.sessions.expire(pag.providerRef);
    } catch {
      // gia' scaduta o completata: niente da chiudere
    }
  }

  const prev = pag.preventivo;
  const lingua = prev?.lingua === "it" ? "it" : "de";
  const valuta = (pag.valuta || "EUR").toLowerCase();
  const comune = {
    customer_email: pag.clienteEmail || undefined,
    locale: lingua,
    metadata: { pagamentoId: pag.id, documento: pag.documento || "" },
    success_url: `${SITE}/pagamento/${pag.token}?esito=ok`,
    cancel_url: `${SITE}/pagamento/${pag.token}?esito=annullato`,
  } as const;

  let sess: Stripe.Checkout.Session;
  if (pag.tipo === "abbonamento") {
    const mesi = prev?.mesi && prev.mesi > 1 ? prev.mesi : 0;
    const nome = prev?.oggetto || "Coaching";
    sess = await stripe.checkout.sessions.create({
      ...comune,
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: valuta,
            unit_amount: Math.round(pag.importo * 100),
            recurring: { interval: "month" },
            product_data: {
              // "Coaching 6 Monate" porta gia' la durata: non ripeterla
              name:
                mesi && !/\d+\s*(Monate|mesi)/i.test(nome)
                  ? `${nome} (${mesi} ${lingua === "de" ? "Monate" : "mesi"})`
                  : nome,
            },
          },
        },
      ],
      subscription_data: {
        metadata: {
          pagamentoId: pag.id,
          preventivoId: prev?.id || "",
          documento: pag.documento || "",
          mesi: String(mesi),
        },
      },
    });
  } else {
    sess = await stripe.checkout.sessions.create({
      ...comune,
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: valuta,
            unit_amount: Math.round(pag.importo * 100),
            product_data: { name: pag.descrizione },
          },
        },
      ],
    });
  }

  await prisma.pagamento.update({
    where: { id: pag.id },
    data: { stato: "in corso", provider: "stripe", providerRef: sess.id },
  });

  return sess;
}

/**
 * Checkout in abbonamento completato: incassa il primo mese, fissa la fine
 * dopo N mesi e lega le rate successive all'abbonamento.
 */
export async function avviaAbbonamento(sess: Stripe.Checkout.Session) {
  const stripe = getStripe();
  const pagamentoId = sess.metadata?.pagamentoId;
  const subId = typeof sess.subscription === "string" ? sess.subscription : sess.subscription?.id;
  if (!stripe || !pagamentoId || !subId) return null;

  const pag = await registraIncasso({ pagamentoId, providerRef: subId, metodo: "abbonamento" });

  const sub = await stripe.subscriptions.retrieve(subId);
  const mesi = Number(sub.metadata?.mesi || 0);
  if (mesi > 1 && !sub.cancel_at) {
    await stripe.subscriptions.update(subId, {
      cancel_at: fineDopoMesi(sub.billing_cycle_anchor, mesi),
      proration_behavior: "none",
    });
  }

  // Le rate dei mesi dopo restano in elenco, ma non si pagano piu' dal link:
  // le chiude il webhook a ogni addebito.
  const riga = await prisma.pagamento.findUnique({ where: { id: pagamentoId } });
  if (riga?.preventivoId) {
    await prisma.pagamento.updateMany({
      where: {
        preventivoId: riga.preventivoId,
        tipo: "abbonamento",
        stato: { in: ["aperto", "in corso"] },
        id: { not: riga.id },
      },
      data: { provider: "stripe", metodo: "abbonamento", providerRef: subId },
    });
  }

  return pag;
}

/**
 * Ritorno del cliente dalla cassa: si chiede a Stripe com'e' andata la
 * sessione, cosi' la rata si chiude anche se il webhook tarda (o in locale,
 * dove il webhook non arriva). Idempotente come il webhook.
 */
export async function confermaStripe(pagamentoId: string) {
  const stripe = getStripe();
  const pag = await prisma.pagamento.findUnique({ where: { id: pagamentoId } });
  if (!stripe || !pag?.providerRef?.startsWith("cs_") || pag.stato === "pagato") return null;

  const sess = await stripe.checkout.sessions.retrieve(pag.providerRef);
  if (sess.status !== "complete" || sess.payment_status === "unpaid") return null;

  if (sess.mode === "subscription") return avviaAbbonamento(sess);
  return registraIncasso({
    pagamentoId: pag.id,
    providerRef: sess.id,
    metodo: sess.payment_method_types?.[0] === "sepa_debit" ? "sepa" : "carta",
  });
}

/** Id dell'abbonamento da cui viene una fattura. */
export function abbonamentoDi(inv: Stripe.Invoice): string | null {
  const s = inv.parent?.subscription_details?.subscription;
  if (!s) return null;
  return typeof s === "string" ? s : s.id;
}

/**
 * Addebito di un mese successivo: chiude la prima rata aperta di
 * quell'abbonamento. Se non ce n'e' (canone senza durata, o un mese in piu')
 * crea una riga nuova gia' pagata, cosi' l'incasso resta sempre scritto.
 * Idempotente sull'id della fattura.
 */
export async function rinnovoAbbonamento(inv: Stripe.Invoice) {
  // il primo mese lo registra checkout.session.completed
  if (inv.billing_reason === "subscription_create") return null;
  if (!inv.amount_paid || !inv.id) return null;
  const subId = abbonamentoDi(inv);
  if (!subId) return null;

  const gia = await prisma.pagamento.findFirst({ where: { providerRef: inv.id } });
  if (gia) return null;

  const aperta = await prisma.pagamento.findFirst({
    where: { providerRef: subId, stato: { in: ["aperto", "in corso"] } },
    orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }],
  });
  if (aperta) {
    return registraIncasso({ pagamentoId: aperta.id, providerRef: inv.id, metodo: "abbonamento" });
  }

  const meta = inv.parent?.subscription_details?.metadata || {};
  const preventivoId = meta.preventivoId || null;
  const prima = await prisma.pagamento.findFirst({
    where: preventivoId ? { preventivoId } : { id: meta.pagamentoId || "-" },
    orderBy: [{ rataNumero: "desc" }, { createdAt: "desc" }],
  });
  if (!prima) return null;

  const nuova = await prisma.pagamento.create({
    data: {
      token: nuovoToken(),
      preventivoId: prima.preventivoId,
      documento: prima.documento,
      descrizione: prima.descrizione.replace(/ — .*$/, "") + " — monatlich",
      clienteNome: prima.clienteNome,
      clienteEmail: prima.clienteEmail,
      importo: Math.round(inv.amount_paid) / 100,
      tipo: "abbonamento",
      rataNumero: (prima.rataNumero || 0) + 1,
      provider: "stripe",
      metodo: "abbonamento",
      providerRef: subId,
    },
  });
  return registraIncasso({ pagamentoId: nuova.id, providerRef: inv.id, metodo: "abbonamento" });
}
