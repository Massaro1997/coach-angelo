// Fasce libere del coach nei prossimi 28 giorni e ore del cliente.

import { NextResponse } from "next/server";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { giorniLiberi, sistemaTenute } from "@/lib/app-coaching/prenotazioni";
import { oreCliente } from "@/lib/app-coaching/ore";
import type { DisponibilitaCliente } from "@/lib/app-coaching/tipi-v2";

export const dynamic = "force-dynamic";

export async function GET() {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;

  // le tenute scadute (di chiunque) liberano l'ora prima di calcolare i buchi
  await sistemaTenute({ coach: cliente.coach });
  const [giorni, ore] = await Promise.all([giorniLiberi(cliente.coach), oreCliente(cliente)]);
  const risposta: DisponibilitaCliente = { giorni, ore };
  return NextResponse.json(risposta);
}
