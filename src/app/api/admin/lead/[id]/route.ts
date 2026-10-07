// Lavorazione di un lead dalla scheda Lead: stato, qualita', motivo se perso,
// appunti. Ogni modifica lo segna anche come letto.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const STATI = ["nuovo", "contattato", "appuntamento", "cliente", "perso"];
const QUALITA = ["buono", "medio", "scarso", "spam"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const l = await prisma.contact.findUnique({ where: { id }, select: { id: true, contattatoAt: true } });
  if (!l) return NextResponse.json({ error: "Lead non trovato" }, { status: 404 });

  const data: Record<string, unknown> = { read: true, aggiornatoAt: new Date() };
  if (typeof body.stato === "string" && STATI.includes(body.stato)) {
    data.stato = body.stato;
    // la prima volta che lo si sente resta scritta
    if (body.stato !== "nuovo" && !l.contattatoAt) data.contattatoAt = new Date();
  }
  if (body.qualita === null || (typeof body.qualita === "string" && QUALITA.includes(body.qualita))) {
    data.qualita = body.qualita;
  }
  if (typeof body.motivo === "string") data.motivo = body.motivo.trim().slice(0, 200) || null;
  if (typeof body.note === "string") data.note = body.note.slice(0, 4000) || null;

  const agg = await prisma.contact.update({ where: { id }, data });
  return NextResponse.json(agg);
}
