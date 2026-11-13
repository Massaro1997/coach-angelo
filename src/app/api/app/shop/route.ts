// Shop dell'app: abbonamento col coach (rate, rinnovo), ore del cliente,
// pacchetti in vendita e ore extra chieste ma non ancora pagate.

import { NextResponse } from "next/server";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { sistemaTenute } from "@/lib/app-coaching/prenotazioni";
import { acquistiInSospeso, oreCliente, pacchettiOre } from "@/lib/app-coaching/ore";
import {
  contrattoDelCliente,
  PACCHETTI_COACHING,
  pacchettoCoaching,
  puoNuovoContratto,
  riassuntoAbbonamento,
} from "@/lib/app-coaching/shop";
import type { Shop } from "@/lib/app-coaching/tipi-v2";

export const dynamic = "force-dynamic";

export async function GET() {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  const l = cliente.lingua === "it" ? "it" : "de";

  // un'ora "da pagare" appena pagata deve gia' contare nel credito
  await sistemaTenute({ clienteId: cliente.id });
  const contratto = await contrattoDelCliente(cliente);
  const [abbonamento, ore, sospesi] = await Promise.all([
    riassuntoAbbonamento(cliente, contratto),
    oreCliente(cliente, { contratto }),
    acquistiInSospeso(cliente.id),
  ]);

  const shop: Shop = {
    abbonamento,
    ore,
    pacchetti: [
      ...pacchettiOre(l),
      // contratto nuovo solo a chi non ne ha uno in corso (stessa regola di /shop/nuovo)
      ...(puoNuovoContratto(abbonamento) ? PACCHETTI_COACHING.map((v) => pacchettoCoaching(v, l)) : []),
    ],
    acquistiInSospeso: sospesi,
  };
  return NextResponse.json(shop);
}
