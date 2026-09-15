// Preventivi lato admin: elenco e creazione.
// GET  /api/admin/preventivi
// POST /api/admin/preventivi

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import {
  ARTICOLI_BASE,
  nuovoToken,
  prossimoNumero,
  totaleVoci,
  type VocePreventivo,
} from "@/lib/preventivo";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const preventivi = await prisma.preventivo.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      pagamenti: {
        orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  // La firma e' un BYTEA: pesante e inutile in elenco.
  return NextResponse.json(
    preventivi.map(({ firma, ...p }) => ({ ...p, haFirma: !!firma }))
  );
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: {
    clienteNome?: string;
    clienteEmail?: string;
    clienteTelefono?: string;
    clienteIndirizzo?: string;
    clientePiva?: string;
    oggetto?: string;
    premesse?: string;
    items?: VocePreventivo[];
    periodicita?: string;
    mesi?: number;
    accontoPerc?: number;
    importoNota?: string;
    lingua?: string;
    validoGiorni?: number;
    articoli?: { titolo: string; testo: string }[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const items = (body.items || []).filter((v) => v?.descrizione?.trim());
  if (!body.clienteNome?.trim()) {
    return NextResponse.json({ error: "Manca il nome del cliente" }, { status: 400 });
  }
  if (!items.length) {
    return NextResponse.json({ error: "Serve almeno una voce" }, { status: 400 });
  }

  const validoGiorni = body.validoGiorni ?? 14;
  const validoFino = new Date();
  validoFino.setDate(validoFino.getDate() + validoGiorni);

  const preventivo = await prisma.preventivo.create({
    data: {
      numero: await prossimoNumero(),
      token: nuovoToken(),
      clienteNome: body.clienteNome.trim(),
      clienteEmail: body.clienteEmail?.trim() || null,
      clienteTelefono: body.clienteTelefono?.trim() || null,
      clienteIndirizzo: body.clienteIndirizzo?.trim() || null,
      clientePiva: body.clientePiva?.trim() || null,
      oggetto: body.oggetto?.trim() || null,
      premesse: body.premesse?.trim() || null,
      items: items as unknown as object,
      totale: totaleVoci(items),
      periodicita: body.periodicita === "mensile" ? "mensile" : "una tantum",
      mesi: Math.max(1, Number(body.mesi) || 1),
      accontoPerc: Math.min(Math.max(Number(body.accontoPerc ?? 50), 0), 100),
      importoNota: body.importoNota?.trim() || null,
      lingua: body.lingua === "it" ? "it" : "de",
      articoli: (body.articoli?.length ? body.articoli : ARTICOLI_BASE) as unknown as object,
      validoFino,
    },
  });

  const { firma, ...senzaFirma } = preventivo;
  void firma;
  return NextResponse.json(senzaFirma, { status: 201 });
}
