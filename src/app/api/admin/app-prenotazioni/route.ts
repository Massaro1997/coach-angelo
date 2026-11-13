// Ore 1:1 nel gestionale: elenco da..a (default oggi..+28) e ora fissata dal
// coach per un cliente. Il coach salta le regole delle ore (incluse, credito,
// 12 ore di anticipo, fasce): l'ora e' subito confermata. Restano vietate solo
// due ore che si accavallano.

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { aggiungiGiorni, dataValida, giornoSettimana, giorniTra, oggiISO } from "@/lib/app-coaching/date";
import {
  daMinuti,
  GIORNI_AVANTI,
  minuti,
  oraValida,
  siSovrappongono,
  sistemaTenute,
  STATI_ATTIVI,
  testoBreve,
  toPrenotazioneAdmin,
  tokenDi,
  tokenPagamenti,
} from "@/lib/app-coaching/prenotazioni";

export const dynamic = "force-dynamic";

const MAX_GIORNI = 400;
const OCCUPATA = "A quell'ora c'è già un'altra prenotazione: annullala prima";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const oggi = oggiISO();
  const sp = req.nextUrl.searchParams;
  const da = sp.get("da") || oggi;
  const a = sp.get("a") || aggiungiGiorni(oggi, GIORNI_AVANTI);
  if (!dataValida(da) || !dataValida(a)) {
    return NextResponse.json({ error: "Date non valide (YYYY-MM-DD)" }, { status: 400 });
  }
  if (a < da) return NextResponse.json({ error: "La data finale viene prima di quella iniziale" }, { status: 400 });
  if (giorniTra(da, a) > MAX_GIORNI) {
    return NextResponse.json({ error: `Intervallo troppo lungo (massimo ${MAX_GIORNI} giorni)` }, { status: 400 });
  }

  const coach = MARCHIO.chiave;
  // tenute pagate -> confermate, scadute -> annullate: il coach vede l'agenda vera
  await sistemaTenute({ coach });
  const righe = await prisma.appPrenotazione.findMany({
    where: { coach, data: { gte: da, lte: a } },
    include: { cliente: { select: { nome: true } } },
    orderBy: [{ data: "asc" }, { inizio: "asc" }],
  });
  const token = await tokenPagamenti(righe);
  return NextResponse.json({
    prenotazioni: righe.map((r) => toPrenotazioneAdmin(r, r.cliente.nome, tokenDi(token, r))),
  });
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  const o = body as Record<string, unknown>;
  const coach = MARCHIO.chiave;

  if (typeof o.clienteId !== "string" || !o.clienteId) {
    return NextResponse.json({ error: "Manca il cliente" }, { status: 400 });
  }
  const cliente = await prisma.appCliente.findFirst({
    where: { id: o.clienteId, coach },
    select: { id: true, nome: true },
  });
  if (!cliente) return NextResponse.json({ error: "Cliente non trovato" }, { status: 404 });

  const data = o.data;
  if (!dataValida(data)) return NextResponse.json({ error: "Data non valida (YYYY-MM-DD)" }, { status: 400 });
  const inizio = oraValida(o.inizio);
  if (!inizio) return NextResponse.json({ error: "Orario di inizio non valido (HH:MM)" }, { status: 400 });

  let tipo: "inclusa" | "extra" = "inclusa";
  if (o.tipo === "extra") tipo = "extra";
  else if (o.tipo != null && o.tipo !== "inclusa") {
    return NextResponse.json({ error: "Tipo non valido (inclusa o extra)" }, { status: 400 });
  }

  // fine e luogo, se non arrivano, dalla fascia di quel giorno (o un'ora piena)
  const slot = await prisma.appSlot.findFirst({
    where: { coach, giorno: giornoSettimana(data), inizio },
    orderBy: [{ attivo: "desc" }, { createdAt: "asc" }],
  });
  let fine: string | null;
  if (o.fine != null && o.fine !== "") {
    fine = oraValida(o.fine);
    if (!fine) return NextResponse.json({ error: "Orario di fine non valido (HH:MM)" }, { status: 400 });
  } else {
    fine = slot?.fine ?? (minuti(inizio) + 60 < 24 * 60 ? daMinuti(minuti(inizio) + 60) : null);
    if (!fine) return NextResponse.json({ error: "Indica l'orario di fine" }, { status: 400 });
  }
  if (inizio >= fine) {
    return NextResponse.json({ error: "L'inizio deve venire prima della fine" }, { status: 400 });
  }
  const luogo = "luogo" in o ? testoBreve(o.luogo, 120) : (slot?.luogo ?? null);

  await sistemaTenute({ coach });
  const prese = await prisma.appPrenotazione.findMany({
    where: { coach, data, stato: { in: STATI_ATTIVI } },
    select: { inizio: true, fine: true },
  });
  if (prese.some((p) => siSovrappongono({ inizio, fine }, p))) {
    return NextResponse.json({ error: OCCUPATA }, { status: 409 });
  }

  try {
    const r = await prisma.appPrenotazione.create({
      data: { coach, clienteId: cliente.id, data, inizio, fine, luogo, tipo, stato: "confermata" },
    });
    return NextResponse.json({ prenotazione: toPrenotazioneAdmin(r, cliente.nome) }, { status: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return NextResponse.json({ error: OCCUPATA }, { status: 409 });
    }
    throw e;
  }
}
