// Pagamento pubblico via token: lettura della rata e avvio del checkout.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sessioneRata } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const TOKEN_OK = /^[a-f0-9]{32}$/i;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!TOKEN_OK.test(token)) {
    return NextResponse.json({ error: "Link non valido" }, { status: 400 });
  }

  const p = await prisma.pagamento.findUnique({
    where: { token },
    select: {
      descrizione: true,
      clienteNome: true,
      importo: true,
      valuta: true,
      tipo: true,
      rataNumero: true,
      rateTotali: true,
      scadenza: true,
      stato: true,
      pagatoAt: true,
      documento: true,
      preventivo: { select: { lingua: true, token: true } },
    },
  });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  return NextResponse.json({
    ...p,
    lingua: p.preventivo?.lingua || "de",
    preventivoToken: p.preventivo?.token || null,
    preventivo: undefined,
  });
}

/** Avvia il checkout Stripe per questa rata. */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!TOKEN_OK.test(token)) {
    return NextResponse.json({ error: "Link non valido" }, { status: 400 });
  }

  const p = await prisma.pagamento.findUnique({ where: { token } });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  if (p.stato === "pagato") {
    return NextResponse.json({ error: "Questa rata risulta gia' pagata" }, { status: 409 });
  }
  if (p.stato === "annullato") {
    return NextResponse.json({ error: "Questa richiesta e' stata annullata" }, { status: 409 });
  }

  try {
    const sess = await sessioneRata(p.id);
    return NextResponse.json({ url: sess.url });
  } catch (e) {
    const msg = (e as Error).message;
    return NextResponse.json(
      { error: msg.includes("non configurato") ? "Pagamenti non ancora attivi" : msg },
      { status: 500 }
    );
  }
}
