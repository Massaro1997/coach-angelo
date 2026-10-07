// Webhook PayPal per gli abbonamenti dei preventivi.
//
// Il corpo dell'evento non viene creduto: serve solo a sapere QUALE
// abbonamento guardare. Lo stato vero lo legge sincronizzaAbbonamento da
// PayPal con le nostre credenziali, quindi un evento inventato non puo'
// segnare pagato niente.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sincronizzaAbbonamento } from "@/lib/paypal";
import { avvisaIncasso, avvisaAddebitoFallito } from "@/lib/avvisi-incasso";

export const dynamic = "force-dynamic";

const SUB_OK = /^I-[A-Z0-9]{6,32}$/;

export async function POST(req: NextRequest) {
  let evento: { event_type?: string; resource?: { id?: string; billing_agreement_id?: string } };
  try {
    evento = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const tipo = evento.event_type || "";
  const r = evento.resource || {};
  // pagamento mensile: l'id dell'abbonamento sta in billing_agreement_id
  const subId = tipo.startsWith("PAYMENT.SALE.") ? r.billing_agreement_id : r.id;
  if (!subId || !SUB_OK.test(subId)) return NextResponse.json({ received: true });

  // abbonamenti che non sono nostri: niente
  const nostra = await prisma.pagamento.findFirst({
    where: { providerRef: subId },
    select: { clienteNome: true, importo: true },
  });
  if (!nostra) return NextResponse.json({ received: true });

  if (tipo === "BILLING.SUBSCRIPTION.PAYMENT.FAILED") {
    await avvisaAddebitoFallito(nostra.clienteNome, nostra.importo);
  }

  for (const f of await sincronizzaAbbonamento(subId)) await avvisaIncasso(f);
  return NextResponse.json({ received: true });
}
