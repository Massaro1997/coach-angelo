// Il cliente segna una misura (peso, circonferenze, grasso).

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { linguaDi, toMisura } from "@/lib/app-coaching/serializza-v2";
import { pulisciMisura, ERRORI, tr } from "@/lib/app-coaching/pulisci-v2";
import { oggiISO } from "@/lib/app-coaching/date";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  const l = linguaDi(cliente);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: tr(l, ERRORI.richiesta) }, { status: 400 });
  }

  const { misura, errore: errMisura } = pulisciMisura(body, oggiISO(), l);
  if (errMisura !== null) return NextResponse.json({ error: errMisura }, { status: 400 });

  // clienteId sempre dalla sessione, mai dal body
  const riga = await prisma.appMisura.create({ data: { ...misura, clienteId: cliente.id } });
  return NextResponse.json({ misura: toMisura(riga) }, { status: 201 });
}
