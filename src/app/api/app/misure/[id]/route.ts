// Il cliente cancella una sua misura (scritta male, doppia).

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { linguaDi } from "@/lib/app-coaching/serializza-v2";
import { ERRORI, tr } from "@/lib/app-coaching/pulisci-v2";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;

  const { id } = await params;
  // id + cliente della sessione: le misure degli altri risultano "non trovate"
  const { count } = await prisma.appMisura.deleteMany({ where: { id, clienteId: cliente.id } });
  if (!count) {
    return NextResponse.json({ error: tr(linguaDi(cliente), ERRORI.misuraNonTrovata) }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
