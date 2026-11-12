// Il coach scrive o cancella il piano di un giorno.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { jsonDb, toGiornata } from "@/lib/app-coaching/serializza";
import { pulisciPiano } from "@/lib/app-coaching/pulisci";
import { dataValida } from "@/lib/app-coaching/date";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string; data: string }> };

async function clienteEsiste(id: string): Promise<boolean> {
  const c = await prisma.appCliente.findFirst({
    where: { id, coach: MARCHIO.chiave },
    select: { id: true },
  });
  return !!c;
}

export async function PUT(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id, data } = await params;
  if (!dataValida(data)) {
    return NextResponse.json({ error: "Data non valida" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  const { piano, errore } = pulisciPiano(body);
  if (errore !== null) return NextResponse.json({ error: errore }, { status: 400 });

  if (!(await clienteEsiste(id))) {
    return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  }

  // solo i campi del piano: fatto, fatica e feedback del cliente restano com'erano
  const campi = {
    riposo: piano.riposo,
    allenamento: jsonDb(piano.allenamento),
    alimentazione: jsonDb(piano.alimentazione),
    notaCoach: piano.notaCoach,
  };
  const riga = await prisma.appGiornata.upsert({
    where: { clienteId_data: { clienteId: id, data } },
    create: { clienteId: id, data, ...campi },
    update: campi,
  });

  return NextResponse.json({ giornata: toGiornata(riga) });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id, data } = await params;
  if (!dataValida(data)) {
    return NextResponse.json({ error: "Data non valida" }, { status: 400 });
  }
  if (!(await clienteEsiste(id))) {
    return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  }

  // idempotente: cancellare un giorno gia' vuoto non e' un errore
  await prisma.appGiornata.deleteMany({ where: { clienteId: id, data } });
  return NextResponse.json({ ok: true });
}
