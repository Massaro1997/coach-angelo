// Webhook Stripe: e' qui che una rata diventa "pagata" e il preventivo
// firmato si perfeziona.
//
// La firma dell'evento e' verificata sempre: senza, chiunque conoscesse
// l'URL potrebbe dichiarare pagato quello che vuole.

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  getStripe,
  registraIncasso,
  avviaAbbonamento,
  rinnovoAbbonamento,
  abbonamentoDi,
} from "@/lib/stripe";
import { avvisaIncasso, avvisaAddebitoFallito } from "@/lib/avvisi-incasso";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const segreto = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !segreto) {
    return NextResponse.json({ error: "Stripe non configurato" }, { status: 503 });
  }

  const firma = req.headers.get("stripe-signature");
  if (!firma) {
    return NextResponse.json({ error: "Firma mancante" }, { status: 400 });
  }

  let evento: Stripe.Event;
  try {
    // serve il corpo grezzo: JSON.parse romperebbe la verifica
    const raw = await req.text();
    evento = stripe.webhooks.constructEvent(raw, firma, segreto);
  } catch (e) {
    return NextResponse.json(
      { error: `Firma non valida: ${(e as Error).message}` },
      { status: 400 }
    );
  }

  // Un checkout pagato con un metodo lento (bonifico, SEPA) arriva come
  // "completed" ma non ancora pagato: lo chiude async_payment_succeeded.
  if (
    evento.type === "checkout.session.completed" ||
    evento.type === "checkout.session.async_payment_succeeded"
  ) {
    const sess = evento.data.object as Stripe.Checkout.Session;
    const pagamentoId = sess.metadata?.pagamentoId;
    if (pagamentoId && sess.payment_status !== "unpaid") {
      const pag =
        sess.mode === "subscription"
          ? await avviaAbbonamento(sess)
          : await registraIncasso({
              pagamentoId,
              providerRef: sess.id,
              metodo: sess.payment_method_types?.[0] === "sepa_debit" ? "sepa" : "carta",
            });
      if (pag) await avvisaIncasso(pag);
    }
  }

  // Mesi successivi di un pacchetto: Stripe addebita da solo.
  if (evento.type === "invoice.paid") {
    const pag = await rinnovoAbbonamento(evento.data.object as Stripe.Invoice);
    if (pag) await avvisaIncasso(pag);
  }

  // Addebito del mese rifiutato: Stripe riprova da solo, ma Angelo lo deve
  // sapere subito per sentire il cliente.
  if (evento.type === "invoice.payment_failed") {
    const inv = evento.data.object as Stripe.Invoice;
    if (abbonamentoDi(inv)) {
      await avvisaAddebitoFallito(
        inv.customer_name || inv.customer_email || "cliente",
        (inv.amount_due || 0) / 100
      );
    }
  }

  return NextResponse.json({ received: true });
}

