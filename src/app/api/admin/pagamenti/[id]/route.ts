// Rata pagata fuori dalla cassa (bonifico, contanti): si segna a mano dalla
// scheda Clienti. Se la rata e' di un preventivo passa da registraIncasso,
// cosi' il preventivo si perfeziona come con un pagamento online.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { registraIncasso } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { azione?: string; metodo?: string };
  const r = await prisma.pagamento.findUnique({ where: { id } });
  if (!r) return NextResponse.json({ error: "Rata non trovata" }, { status: 404 });

  const metodo = body.metodo === "contanti" ? "contanti" : "bonifico";

  if (body.azione === "pagato") {
    if (r.stato === "pagato") return NextResponse.json({ ok: true });
    if (r.preventivoId) {
      await registraIncasso({ pagamentoId: r.id, metodo, provider: "manuale" });
    } else {
      await prisma.pagamento.update({
        where: { id },
        data: { stato: "pagato", pagatoAt: new Date(), provider: "manuale", metodo },
      });
    }
    return NextResponse.json({ ok: true });
  }

  // annulla un segno messo per sbaglio: solo per le rate segnate a mano
  if (body.azione === "aperto") {
    if (r.provider !== "manuale" && r.provider !== "bonifico") {
      return NextResponse.json({ error: "Questa rata è stata pagata online: si annulla dalla cassa" }, { status: 409 });
    }
    if (r.preventivoId) {
      return NextResponse.json({ error: "Rata di un preventivo: correggila dalla scheda Preventivi" }, { status: 409 });
    }
    await prisma.pagamento.update({ where: { id }, data: { stato: "aperto", pagatoAt: null } });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Azione non valida" }, { status: 400 });
}
