// Profilo del cliente collegato: l'app lo chiede all'apertura (v1) e lo
// modifica dalla pagina profilo (v2).

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { linguaDi, toProfiloCompleto } from "@/lib/app-coaching/serializza-v2";
import { pulisciPatchProfilo, ERRORI, tr } from "@/lib/app-coaching/pulisci-v2";
import { segnaAccesso } from "@/lib/app-coaching/progressi";

export const dynamic = "force-dynamic";

export async function GET() {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;

  // ultimo accesso: al massimo una scrittura l'ora (vedi progressi.ts)
  await segnaAccesso(cliente);
  // superset della v1 (nome, lingua, obiettivo): l'app v1 installata continua a funzionare
  return NextResponse.json({ profilo: toProfiloCompleto(cliente) });
}

/** Il cliente cambia email, telefono o lingua. Nome e obiettivo restano del coach. */
export async function PATCH(req: NextRequest) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  const l = linguaDi(cliente);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: tr(l, ERRORI.richiesta) }, { status: 400 });
  }

  const { dati, errore: errDati } = pulisciPatchProfilo(body, l);
  if (errDati !== null) return NextResponse.json({ error: errDati }, { status: 400 });

  try {
    const agg = await prisma.appCliente.update({ where: { id: cliente.id }, data: dati });
    return NextResponse.json({ profilo: toProfiloCompleto(agg) });
  } catch (e) {
    // cancellato dal coach tra la lettura della sessione e l'aggiornamento
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }
    throw e;
  }
}
