// Contratto nuovo dal listino (pacchetti coaching) per chi non ne ha uno in
// corso: si crea, si collega al cliente e si firma/paga da /preventivo/<token>.

import { NextRequest, NextResponse } from "next/server";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { creaNuovoContratto } from "@/lib/app-coaching/shop";

export const dynamic = "force-dynamic";

const RICHIESTA = { de: "Ungültige Anfrage", it: "Richiesta non valida" };

export async function POST(req: NextRequest) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  const l = cliente.lingua === "it" ? "it" : "de";

  let body: { key?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: RICHIESTA[l] }, { status: 400 });
  }

  const esito = await creaNuovoContratto(cliente, body?.key);
  if (esito.errore) return NextResponse.json({ error: esito.errore[l] }, { status: esito.status });
  return NextResponse.json({ link: esito.link }, { status: esito.status });
}
