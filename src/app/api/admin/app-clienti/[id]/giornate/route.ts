// Il mese di un cliente visto dal coach: piano e risposte.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { toGiornata } from "@/lib/app-coaching/serializza";
import { limitiMese, meseDi, meseValido, oggiISO } from "@/lib/app-coaching/date";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const oggi = oggiISO();
  const mese = req.nextUrl.searchParams.get("mese") || meseDi(oggi);
  if (!meseValido(mese)) {
    return NextResponse.json({ error: "Mese non valido" }, { status: 400 });
  }

  const esiste = await prisma.appCliente.findFirst({
    where: { id, coach: MARCHIO.chiave },
    select: { id: true },
  });
  if (!esiste) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  const { primo, ultimo } = limitiMese(mese);
  const righe = await prisma.appGiornata.findMany({
    where: { clienteId: id, data: { gte: primo, lte: ultimo } },
    orderBy: { data: "asc" },
  });

  return NextResponse.json({ giornate: righe.map(toGiornata), oggi });
}
