// Webhook Stripe: e' qui che una rata diventa "pagata" e il preventivo
// firmato si perfeziona.
//
// La firma dell'evento e' verificata sempre: senza, chiunque conoscesse
// l'URL potrebbe dichiarare pagato quello che vuole.

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, registraIncasso } from "@/lib/stripe";
import { gmailTransport, GMAIL_FROM } from "@/lib/gmail";
import { NOTIFY_EMAILS } from "@/lib/resend";
import { eur } from "@/lib/preventivo";

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

  if (evento.type === "checkout.session.completed") {
    const sess = evento.data.object as Stripe.Checkout.Session;
    const pagamentoId = sess.metadata?.pagamentoId;
    if (pagamentoId) {
      const pag = await registraIncasso({
        pagamentoId,
        providerRef: sess.id,
        metodo: sess.payment_method_types?.[0] === "sepa_debit" ? "sepa" : "carta",
      });

      if (pag) {
        try {
          await gmailTransport.sendMail({
            from: GMAIL_FROM,
            to: NOTIFY_EMAILS,
            subject: `💰 Incassati ${eur(pag.importo)} — ${pag.documento || pag.descrizione}`,
            html: `
              <div style="font-family:system-ui,sans-serif">
                <p>Pagamento ricevuto da <strong>${pag.clienteNome}</strong>.</p>
                <p>${pag.descrizione}</p>
                <p>Importo: <strong>${eur(pag.importo)}</strong></p>
              </div>`,
          });
        } catch {
          // l'incasso e' registrato comunque
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
