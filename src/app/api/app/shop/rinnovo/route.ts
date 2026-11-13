// Rinnovo del contratto collegato: un Preventivo nuovo da firmare e pagare
// (o quello gia' chiesto negli ultimi 14 giorni).

import { NextResponse } from "next/server";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { creaRinnovo } from "@/lib/app-coaching/shop";

export const dynamic = "force-dynamic";

export async function POST() {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  const l = cliente.lingua === "it" ? "it" : "de";

  const esito = await creaRinnovo(cliente);
  if (esito.errore) return NextResponse.json({ error: esito.errore[l] }, { status: esito.status });
  return NextResponse.json({ link: esito.link }, { status: esito.status });
}
