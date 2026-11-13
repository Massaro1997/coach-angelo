// Clienti dell'app (/admin#app): lista con riassunto e creazione.

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { nuovoCodice, nuovoToken } from "@/lib/app-coaching/sessione";
import { caricaRiassunti, RIASSUNTO_VUOTO, toClienteApp } from "@/lib/app-coaching/serializza";
import { pulisciDatiCliente } from "@/lib/app-coaching/pulisci";
import { oggiISO } from "@/lib/app-coaching/date";
import { contrattiBrevi } from "@/lib/app-coaching/shop";

export const dynamic = "force-dynamic";

const TENTATIVI_CODICE = 5;

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  // solo i clienti di questo marchio: il giorno del white label il DB e' condiviso
  const righe = await prisma.appCliente.findMany({ where: { coach: MARCHIO.chiave } });
  const [riassunti, contratti] = await Promise.all([
    caricaRiassunti(
      righe.map((r) => r.id),
      oggiISO()
    ),
    contrattiBrevi(righe.map((r) => r.preventivoId)),
  ]);

  // ordinamento in JS: in Postgres "nome" seguirebbe la collation (maiuscole, umlaut)
  righe.sort(
    (a, b) =>
      Number(b.attivo) - Number(a.attivo) ||
      a.nome.localeCompare(b.nome, "de", { sensitivity: "base" })
  );

  return NextResponse.json({
    clienti: righe.map((r) =>
      toClienteApp(
        r,
        riassunti.get(r.id) ?? RIASSUNTO_VUOTO,
        r.preventivoId ? (contratti.get(r.preventivoId) ?? null) : null
      )
    ),
  });
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const { dati, errore } = pulisciDatiCliente(body);
  if (errore !== null) return NextResponse.json({ error: errore }, { status: 400 });
  const { nome, ...resto } = dati;
  if (!nome) return NextResponse.json({ error: "Il nome e' obbligatorio" }, { status: 400 });

  // il contratto collegato deve esistere: un id sbagliato lascerebbe lo shop vuoto senza dire perche'
  const contratti = await contrattiBrevi([resto.preventivoId ?? null]);
  if (resto.preventivoId && !contratti.has(resto.preventivoId)) {
    return NextResponse.json({ error: "Contratto non trovato" }, { status: 400 });
  }

  // codice e token sono unique: su una collisione (rarissima) se ne tira un altro
  for (let i = 0; i < TENTATIVI_CODICE; i++) {
    try {
      const c = await prisma.appCliente.create({
        data: {
          ...resto,
          nome,
          coach: MARCHIO.chiave,
          codice: nuovoCodice(),
          token: nuovoToken(),
        },
      });
      const contratto = c.preventivoId ? (contratti.get(c.preventivoId) ?? null) : null;
      return NextResponse.json({ cliente: toClienteApp(c, RIASSUNTO_VUOTO, contratto) }, { status: 201 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
      throw e;
    }
  }
  return NextResponse.json({ error: "Codice non generato, riprova" }, { status: 500 });
}
