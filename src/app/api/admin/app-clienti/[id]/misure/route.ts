// Le misure di un cliente viste dal coach (sola lettura: le scrive il cliente).

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { caricaMisure } from "@/lib/app-coaching/progressi";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const esiste = await prisma.appCliente.findFirst({
    where: { id, coach: MARCHIO.chiave },
    select: { id: true },
  });
  if (!esiste) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  // stesso ordine dell'app del cliente: dalla piu' vecchia
  return NextResponse.json({ misure: await caricaMisure(id) });
}
