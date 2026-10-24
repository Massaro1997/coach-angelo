// Preventivi lato admin: elenco e creazione.
// GET  /api/admin/preventivi
// POST /api/admin/preventivi

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import {
  ARTICOLI_BASE,
  articoliOre,
  nuovoToken,
  prossimoNumero,
  totaleVoci,
  type VocePreventivo,
} from "@/lib/preventivo";
import { vociOre } from "@/lib/preventivo-listino";

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
    // Contratto a ore: oreFisse le decide Angelo (senza, sceglie il cliente
    // fra 4 e 20); bonusOre sono regalate e stanno su una riga a parte.
    aOre?: { oreFisse?: number; bonusOre?: number; bonusOgniMese?: boolean };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  if (body.aOre) {
    const oreFisse = Number(body.aOre.oreFisse) || 0;
    const bonusOre = Number(body.aOre.bonusOre) || 0;
    if (oreFisse < 0 || oreFisse > 40 || bonusOre < 0 || bonusOre > 20) {
      return NextResponse.json({ error: "Ore fuori misura (pagate fino a 40, regalate fino a 20)" }, { status: 400 });
    }
    // Il contratto a ore e' un abbonamento mensile senza durata: prezzi,
    // voci e clausole li decide il server, non il modulo.
    body.items = vociOre({ oreFisse, bonusOre, bonusOgniMese: body.aOre.bonusOgniMese !== false });
    body.periodicita = "mensile";
    body.mesi = 1;
    body.accontoPerc = 100;
    body.oggetto = body.oggetto?.trim() || "Personal Training 1-zu-1 — Stundenpaket";
    body.articoli = articoliOre(bonusOre > 0);
  }

  const items = (body.items || []).filter((v) => v?.descrizione?.trim());
  if (!body.clienteNome?.trim()) {
    return NextResponse.json({ error: "Manca il nome del cliente" }, { status: 400 });
  }
  if (!items.length) {
    return NextResponse.json({ error: "Serve almeno una voce" }, { status: 400 });
  }

  // L'abbonamento Stripe addebita lo stesso importo ogni mese: un totale che
  // non si divide in mesi uguali farebbe incassare qualche centesimo di piu'
  // o di meno di quanto firmato.
  const mesiOk = Math.max(1, Number(body.mesi) || 1);
  if (body.periodicita === "mensile" && mesiOk > 1 && Math.round(totaleVoci(items) * 100) % mesiOk !== 0) {
    return NextResponse.json(
      { error: `Il totale non si divide in ${mesiOk} rate uguali: scegli un importo mensile tondo` },
      { status: 400 }
    );
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
