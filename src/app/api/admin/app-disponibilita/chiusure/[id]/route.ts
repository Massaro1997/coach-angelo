// Riapre un giorno di chiusura.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const { count } = await prisma.appChiusura.deleteMany({ where: { id, coach: MARCHIO.chiave } });
  if (!count) return NextResponse.json({ error: "Non trovata" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
