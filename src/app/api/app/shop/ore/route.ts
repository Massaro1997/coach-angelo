// Ore extra dallo shop: una riga Pagamento senza contratto, pagata dalla
// stessa cassa /pagamento/<token> dei contratti.

import { NextRequest, NextResponse } from "next/server";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { creaAcquistoOre } from "@/lib/app-coaching/ore";

export const dynamic = "force-dynamic";

const ERRORE = {
  richiesta: { de: "Ungültige Anfrage", it: "Richiesta non valida" },
  pacchetto: { de: "Unbekanntes Paket", it: "Pacchetto sconosciuto" },
};

export async function POST(req: NextRequest) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  const l = cliente.lingua === "it" ? "it" : "de";

  let body: { key?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: ERRORE.richiesta[l] }, { status: 400 });
  }

  const esito = await creaAcquistoOre(cliente, body?.key);
  if (!esito) return NextResponse.json({ error: ERRORE.pacchetto[l] }, { status: 400 });
  return NextResponse.json(esito, { status: 201 });
}
