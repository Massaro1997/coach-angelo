// Il cliente annulla una sua ora: solo fino a 24 ore prima, poi decide il coach.

import { NextRequest, NextResponse } from "next/server";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { annullaDalCliente } from "@/lib/app-coaching/prenotazioni";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  const l = cliente.lingua === "it" ? "it" : "de";

  const { id } = await params;
  const esito = await annullaDalCliente(cliente, id);
  if (!esito.ok) return NextResponse.json({ error: esito.errore[l] }, { status: esito.status });
  return NextResponse.json({ ok: true });
}
