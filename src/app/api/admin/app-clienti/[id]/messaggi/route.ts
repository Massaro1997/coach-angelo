// La conversazione con un cliente dell'app, lato coach.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { toMessaggio } from "@/lib/app-coaching/serializza-v2";
import { pulisciTestoMessaggio } from "@/lib/app-coaching/pulisci-v2";

export const dynamic = "force-dynamic";

// stesso tetto dell'app del cliente: le due viste mostrano gli stessi messaggi
const MESSAGGI_MOSTRATI = 300;

type Params = { params: Promise<{ id: string }> };

async function clienteEsiste(id: string): Promise<boolean> {
  const c = await prisma.appCliente.findFirst({
    where: { id, coach: MARCHIO.chiave },
    select: { id: true },
  });
  return !!c;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  if (!(await clienteEsiste(id))) {
    return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  }

  const righe = await prisma.appMessaggio.findMany({
    where: { clienteId: id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: MESSAGGI_MOSTRATI,
  });
  righe.reverse();

  // letti fino all'ultimo mostrato: quello arrivato un attimo dopo resta nuovo;
  // la risposta porta lo stato di prima, cosi' si vedono quali erano nuovi
  const ultimo = righe.at(-1);
  if (ultimo && righe.some((r) => !r.daCoach && !r.lettoAt)) {
    await prisma.appMessaggio.updateMany({
      where: { clienteId: id, daCoach: false, lettoAt: null, createdAt: { lte: ultimo.createdAt } },
      data: { lettoAt: new Date() },
    });
  }

  return NextResponse.json({ messaggi: righe.map((r) => toMessaggio(r, "coach")) });
}

export async function POST(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  // il gestionale e' in italiano
  const { testo, errore } = pulisciTestoMessaggio((body as { testo?: unknown }).testo, "it");
  if (errore !== null) return NextResponse.json({ error: errore }, { status: 400 });

  if (!(await clienteEsiste(id))) {
    return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  }

  // Rispondere non segna letti i messaggi del cliente: uno arrivato mentre il
  // coach scriveva non l'ha visto nessuno.
  const riga = await prisma.appMessaggio.create({ data: { clienteId: id, daCoach: true, testo } });
  return NextResponse.json({ messaggio: toMessaggio(riga, "coach") }, { status: 201 });
}
