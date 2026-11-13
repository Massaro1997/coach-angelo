// Giorno di chiusura del coach (ferie, malattia): niente fasce libere quel
// giorno. Le ore gia' prenotate restano: le annulla il coach, se serve.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { dataValida } from "@/lib/app-coaching/date";
import { testoBreve, toChiusura } from "@/lib/app-coaching/prenotazioni";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: { data?: unknown; nota?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  const data = body?.data;
  if (!dataValida(data)) return NextResponse.json({ error: "Data non valida (YYYY-MM-DD)" }, { status: 400 });
  const nota = testoBreve(body?.nota, 200);

  const coach = MARCHIO.chiave;
  // un giorno gia' chiuso non si raddoppia: si aggiorna la nota
  const r = await prisma.appChiusura.upsert({
    where: { coach_data: { coach, data } },
    create: { coach, data, nota },
    update: { nota },
  });
  return NextResponse.json({ chiusura: toChiusura(r) }, { status: 201 });
}
