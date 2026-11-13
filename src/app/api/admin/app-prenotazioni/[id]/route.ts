// Il coach cambia lo stato di un'ora: confermata, svolta o annullata.
//
// Annullata: la riga Pagamento ancora aperta non si paga piu' (una gia'
// pagata resta, e l'ora va nel credito extra del cliente).
// Una "da pagare" confermata a mano tiene il suo Pagamento aperto: il cliente
// la ritrova fra gli acquisti in sospeso; se il coach ha incassato in contanti
// la segna pagata da Pagamenti.

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import {
  chiudiPagamento,
  siSovrappongono,
  STATI_ATTIVI,
  toPrenotazioneAdmin,
  tokenDi,
  tokenPagamenti,
} from "@/lib/app-coaching/prenotazioni";

export const dynamic = "force-dynamic";

const STATI = ["confermata", "svolta", "annullata"] as const;
const OCCUPATA = "A quell'ora c'è già un'altra prenotazione";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  let body: { stato?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  const stato = STATI.find((s) => s === body?.stato);
  if (!stato) {
    return NextResponse.json({ error: "Stato non valido (confermata, svolta o annullata)" }, { status: 400 });
  }

  const coach = MARCHIO.chiave;
  const r = await prisma.appPrenotazione.findFirst({ where: { id, coach } });
  if (!r) return NextResponse.json({ error: "Non trovata" }, { status: 404 });

  if (r.stato !== stato) {
    if (stato === "annullata") {
      await prisma.appPrenotazione.update({
        where: { id: r.id },
        data: { stato, annullataAt: new Date() },
      });
      if (r.pagamentoId) await chiudiPagamento(r.pagamentoId);
    } else {
      // un'ora annullata che torna in vita: nel frattempo puo' averla presa un altro
      if (r.stato === "annullata") {
        const prese = await prisma.appPrenotazione.findMany({
          where: { coach, data: r.data, stato: { in: STATI_ATTIVI }, id: { not: r.id } },
          select: { inizio: true, fine: true },
        });
        if (prese.some((p) => siSovrappongono(r, p))) {
          return NextResponse.json({ error: OCCUPATA }, { status: 409 });
        }
      }
      try {
        await prisma.appPrenotazione.update({
          where: { id: r.id },
          data: { stato, annullataAt: null },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
          return NextResponse.json({ error: OCCUPATA }, { status: 409 });
        }
        throw e;
      }
    }
  }

  const agg = await prisma.appPrenotazione.findUniqueOrThrow({
    where: { id: r.id },
    include: { cliente: { select: { nome: true } } },
  });
  const token = await tokenPagamenti([agg]);
  return NextResponse.json({ prenotazione: toPrenotazioneAdmin(agg, agg.cliente.nome, tokenDi(token, agg)) });
}
