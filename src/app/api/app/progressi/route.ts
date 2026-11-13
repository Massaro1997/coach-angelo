// Sezione Fortschritt dell'app: settimane, serie, fatica, ore 1:1 e misure.

import { NextResponse } from "next/server";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { progressi } from "@/lib/app-coaching/progressi";

export const dynamic = "force-dynamic";

export async function GET() {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;

  return NextResponse.json(await progressi(cliente));
}
