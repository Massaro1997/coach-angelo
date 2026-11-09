// Soldi che Angelo ha gia' dato a DirezioneX per le commissioni.
// Quanto deve lo calcola la scheda Clienti; qui si tiene solo quanto ha dato.
//
// Ogni versamento e' una riga Pagamento con tipo "commissione-dx", senza
// contratto: non entra nei conti dei clienti.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { nuovoToken } from "@/lib/preventivo";

export const dynamic = "force-dynamic";

const TIPO = "commissione-dx";

export interface VersamentoDx {
  id: string;
  importo: number;
  data: string;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const righe = await prisma.pagamento.findMany({
    where: { tipo: TIPO, stato: "pagato" },
    orderBy: { pagatoAt: "desc" },
  });
  return NextResponse.json(
    righe.map((r): VersamentoDx => ({ id: r.id, importo: r.importo, data: (r.pagatoAt ?? r.createdAt).toISOString() }))
  );
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await req.json().catch(() => ({}))) as { importo?: number; data?: string };
  const importo = Math.round(Number(body.importo) * 100) / 100;
  if (!(importo > 0) || importo > 100000) {
    return NextResponse.json({ error: "Scrivi quanti soldi ha dato" }, { status: 400 });
  }
  // a mezzogiorno: la data scelta non scivola al giorno prima col fuso
  const quando = body.data ? new Date(`${body.data}T12:00:00`) : new Date();
  if (Number.isNaN(quando.getTime())) {
    return NextResponse.json({ error: "Data non valida" }, { status: 400 });
  }

  const r = await prisma.pagamento.create({
    data: {
      token: nuovoToken(),
      documento: "commissioni-dx",
      descrizione: "Commissioni DirezioneX",
      clienteNome: "DirezioneX",
      importo,
      tipo: TIPO,
      stato: "pagato",
      provider: "manuale",
      pagatoAt: quando,
    },
  });
  return NextResponse.json({ id: r.id }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = req.nextUrl.searchParams.get("id") || "";
  // solo righe delle commissioni: mai un pagamento di un cliente
  const { count } = await prisma.pagamento.deleteMany({ where: { id, tipo: TIPO } });
  if (!count) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
