// Contratti (Preventivi) da collegare a un cliente dell'app: i piu' recenti.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { titoloContratto } from "@/lib/app-coaching/shop";
import type { ContrattoCollegabile } from "@/lib/app-coaching/tipi-v2";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  // mai la firma (BYTEA): solo i campi della lista
  const righe = await prisma.preventivo.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: { id: true, numero: true, clienteNome: true, clienteEmail: true, stato: true, oggetto: true, items: true },
  });
  const contratti: ContrattoCollegabile[] = righe.map((p) => ({
    id: p.id,
    numero: p.numero,
    clienteNome: p.clienteNome,
    clienteEmail: p.clienteEmail,
    stato: p.stato,
    titolo: titoloContratto(p),
  }));
  return NextResponse.json({ contratti });
}
