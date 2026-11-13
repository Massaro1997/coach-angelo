// Ore 1:1 del cliente: elenco (GET) e prenotazione di una fascia libera (POST).
// Regole e tenute in lib/app-coaching/prenotazioni.ts.

import { NextRequest, NextResponse } from "next/server";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { ERRORI_PRENOTAZIONE, prenota, prenotazioniCliente } from "@/lib/app-coaching/prenotazioni";

export const dynamic = "force-dynamic";

export async function GET() {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  return NextResponse.json(await prenotazioniCliente(cliente.id));
}

export async function POST(req: NextRequest) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  const l = cliente.lingua === "it" ? "it" : "de";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: ERRORI_PRENOTAZIONE.richiesta[l] }, { status: 400 });
  }

  const esito = await prenota(cliente, body);
  if (!esito.ok) return NextResponse.json({ error: esito.errore[l] }, { status: esito.status });
  return NextResponse.json(esito.valore, { status: esito.status });
}
