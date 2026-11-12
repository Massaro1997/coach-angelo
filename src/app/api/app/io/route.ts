// Profilo del cliente collegato: l'app lo chiede all'apertura.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { toProfilo } from "@/lib/app-coaching/serializza";

export const dynamic = "force-dynamic";

// Il cookie dura 180 giorni: senza questo "ultimo accesso" nel gestionale
// resterebbe fermo al primo login. Al massimo una scrittura l'ora.
const AGGIORNA_ACCESSO_MS = 60 * 60 * 1000;

export async function GET() {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;

  const ultimo = cliente.ultimoAccesso?.getTime() ?? 0;
  if (Date.now() - ultimo > AGGIORNA_ACCESSO_MS) {
    await prisma.appCliente
      .update({ where: { id: cliente.id }, data: { ultimoAccesso: new Date() } })
      .catch(() => null); // non vale un errore per il cliente
  }

  return NextResponse.json({ profilo: toProfilo(cliente) });
}
