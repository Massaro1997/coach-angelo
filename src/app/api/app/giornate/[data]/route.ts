// Il cliente segna un giorno come fatto e lascia fatica e feedback. Solo sui
// giorni che il coach ha scritto: il cliente non crea giornate.

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { toGiornata } from "@/lib/app-coaching/serializza";
import { pulisciRisposta } from "@/lib/app-coaching/pulisci";
import { dataValida } from "@/lib/app-coaching/date";

export const dynamic = "force-dynamic";

const NON_TROVATO = "Tag nicht gefunden";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ data: string }> }
) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;

  const { data } = await params;
  if (!dataValida(data)) {
    return NextResponse.json({ error: "Ungültiges Datum" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  // sempre per cliente.id della sessione: la data da sola non basta
  const g = await prisma.appGiornata.findUnique({
    where: { clienteId_data: { clienteId: cliente.id, data } },
  });
  if (!g) return NextResponse.json({ error: NON_TROVATO }, { status: 404 });

  const r = pulisciRisposta(body, { fatto: g.fatto, fatica: g.fatica, feedback: g.feedback });
  // fattoAt = la prima volta che l'ha segnato, non l'ultimo salvataggio
  const fattoAt = r.fatto ? (g.fattoAt ?? new Date()) : null;

  try {
    const agg = await prisma.appGiornata.update({
      where: { id: g.id },
      data: { fatto: r.fatto, fatica: r.fatica, feedback: r.feedback, fattoAt },
    });
    return NextResponse.json({ giornata: toGiornata(agg) });
  } catch (e) {
    // il coach l'ha cancellata nel frattempo
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: NON_TROVATO }, { status: 404 });
    }
    throw e;
  }
}
