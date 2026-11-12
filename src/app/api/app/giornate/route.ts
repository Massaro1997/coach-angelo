// Il mese del cliente collegato, per il calendario dell'app.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { toGiornata } from "@/lib/app-coaching/serializza";
import { limitiMese, meseDi, meseValido, oggiISO } from "@/lib/app-coaching/date";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;

  const oggi = oggiISO();
  const mese = req.nextUrl.searchParams.get("mese") || meseDi(oggi);
  if (!meseValido(mese)) {
    return NextResponse.json({ error: "Ungültiger Monat" }, { status: 400 });
  }

  const { primo, ultimo } = limitiMese(mese);
  // le date sono testo YYYY-MM-DD: il confronto tra stringhe e' quello giusto
  const righe = await prisma.appGiornata.findMany({
    where: { clienteId: cliente.id, data: { gte: primo, lte: ultimo } },
    orderBy: { data: "asc" },
  });

  return NextResponse.json({ giornate: righe.map(toGiornata), oggi });
}
