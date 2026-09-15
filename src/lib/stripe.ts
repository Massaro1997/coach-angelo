// Stripe: sessioni di pagamento per le rate del preventivo.
//
// Come in DirezioneX, la firma da sola non perfeziona il contratto: il
// preventivo passa a "firmato" solo quando il primo incasso risulta pagato
// (lo fa registraIncasso, chiamato dal webhook).

import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

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
 * Idempotente: se la riga risulta gia' pagata non tocca niente, cosi' un
 * webhook consegnato due volte non raddoppia gli importi.
 */
export async function registraIncasso(opts: {
  pagamentoId: string;
  providerRef?: string | null;
  metodo?: string | null;
}) {
  const pag = await prisma.pagamento.findUnique({
    where: { id: opts.pagamentoId },
    include: { preventivo: true },
  });
  if (!pag || pag.stato === "pagato") return pag;

  const aggiornato = await prisma.pagamento.update({
    where: { id: pag.id },
    data: {
      stato: "pagato",
      pagatoAt: new Date(),
      provider: "stripe",
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
        ? { stato: "firmato", lavoro: "in corso" }
        : {}),
    },
  });

  return aggiornato;
}

/**
 * Sessione Stripe Checkout per una rata.
 * Le rate di un pacchetto mensile restano pagamenti singoli (una riga per
 * mese): il cliente paga il mese che gli si presenta, senza sottoscrivere un
 * abbonamento che poi qualcuno deve ricordarsi di chiudere.
 */
export async function sessioneRata(pagamentoId: string) {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe non configurato");

  const pag = await prisma.pagamento.findUnique({ where: { id: pagamentoId } });
  if (!pag) throw new Error("Pagamento non trovato");
  if (pag.stato === "pagato") throw new Error("Questa rata risulta gia' pagata");

  const sess = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: (pag.valuta || "EUR").toLowerCase(),
          unit_amount: Math.round(pag.importo * 100),
          product_data: { name: pag.descrizione },
        },
      },
    ],
    customer_email: pag.clienteEmail || undefined,
    metadata: { pagamentoId: pag.id, documento: pag.documento || "" },
    success_url: `${SITE}/pagamento/${pag.token}?esito=ok`,
    cancel_url: `${SITE}/pagamento/${pag.token}?esito=annullato`,
  });

  await prisma.pagamento.update({
    where: { id: pag.id },
    data: { stato: "in corso", provider: "stripe", providerRef: sess.id },
  });

  return sess;
}
