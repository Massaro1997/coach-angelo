// Preventivo pubblico via token: lettura e firma del cliente.
//
// Come in DirezioneX, la firma da sola non perfeziona il contratto: il cliente
// disegna la firma e viene portato al pagamento della prima rata. Il
// preventivo passa a "firmato" solo quando l'incasso risulta pagato
// (registraIncasso in lib/stripe). Chi firma e non paga resta "inviato" con
// una firma in attesa.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { gmailTransport, GMAIL_FROM } from "@/lib/gmail";
import { NOTIFY_EMAILS } from "@/lib/resend";
import { nuovoToken, pianoAllaFirma, eur } from "@/lib/preventivo";

export const dynamic = "force-dynamic";

const TOKEN_OK = /^[a-f0-9]{32}$/i;

/** Vista pubblica: mai la firma grezza, mai i campi interni. */
function pubblico(p: {
  numero: string;
  clienteNome: string;
  clienteEmail: string | null;
  clienteIndirizzo: string | null;
  clientePiva: string | null;
  oggetto: string | null;
  premesse: string | null;
  items: unknown;
  totale: number;
  periodicita: string;
  mesi: number;
  importoNota: string | null;
  articoli: unknown;
  lingua: string;
  stato: string;
  validoFino: Date | null;
  firmatoNome: string | null;
  firmatoAt: Date | null;
  createdAt: Date;
}) {
  return {
    numero: p.numero,
    clienteNome: p.clienteNome,
    clienteIndirizzo: p.clienteIndirizzo,
    clientePiva: p.clientePiva,
    oggetto: p.oggetto,
    premesse: p.premesse,
    items: p.items,
    totale: p.totale,
    periodicita: p.periodicita,
    mesi: p.mesi,
    importoNota: p.importoNota,
    articoli: p.articoli,
    lingua: p.lingua,
    stato: p.stato,
    validoFino: p.validoFino,
    firmatoNome: p.firmatoNome,
    firmatoAt: p.firmatoAt,
    createdAt: p.createdAt,
    scaduto: !!p.validoFino && p.validoFino < new Date() && p.stato === "inviato",
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!TOKEN_OK.test(token)) {
    return NextResponse.json({ error: "Link non valido" }, { status: 400 });
  }

  const p = await prisma.preventivo.findUnique({
    where: { token },
    include: {
      pagamenti: {
        where: { stato: { in: ["aperto", "in corso"] } },
        orderBy: [{ rataNumero: "asc" }],
        take: 1,
        select: { token: true, importo: true, descrizione: true },
      },
    },
  });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  return NextResponse.json({
    ...pubblico(p),
    // se c'e' una rata aperta, il cliente ritrova il link al pagamento
    pagamento: p.pagamenti[0] ?? null,
  });
}

/** Firma del cliente. */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!TOKEN_OK.test(token)) {
    return NextResponse.json({ error: "Link non valido" }, { status: 400 });
  }

  let body: { nome?: string; firma?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const nome = body.nome?.trim();
  if (!nome || nome.length < 3) {
    return NextResponse.json({ error: "Serve il nome e cognome di chi firma" }, { status: 400 });
  }
  if (!body.firma?.startsWith("data:image/png;base64,")) {
    return NextResponse.json({ error: "Firma mancante" }, { status: 400 });
  }

  const p = await prisma.preventivo.findUnique({ where: { token } });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  if (p.firmatoAt) {
    return NextResponse.json({ error: "Questo preventivo risulta gia' firmato" }, { status: 409 });
  }
  if (p.stato === "sostituito") {
    return NextResponse.json(
      { error: "Questo preventivo e' stato sostituito da una versione piu' recente" },
      { status: 409 }
    );
  }
  if (p.validoFino && p.validoFino < new Date()) {
    return NextResponse.json(
      { error: "Questo preventivo e' scaduto. Chiedi una nuova proposta." },
      { status: 409 }
    );
  }

  const png = Buffer.from(body.firma.split(",")[1], "base64");
  // Una firma disegnata sta in poche decine di KB: oltre, e' un'immagine
  // caricata a mano e non la accettiamo.
  if (png.length > 400_000) {
    return NextResponse.json({ error: "Firma troppo grande" }, { status: 400 });
  }

  await prisma.preventivo.update({
    where: { id: p.id },
    data: { firma: png, firmatoNome: nome, firmatoAt: new Date() },
  });

  // Piano rate: si crea alla firma, cosi' il cliente trova subito da pagare.
  const gia = await prisma.pagamento.count({ where: { preventivoId: p.id } });
  if (gia === 0) {
    const piano = pianoAllaFirma({
      totale: p.totale,
      periodicita: p.periodicita,
      mesi: p.mesi,
      accontoPerc: p.accontoPerc,
      oggetto: p.oggetto,
    });
    await prisma.pagamento.createMany({
      data: piano.map((r) => ({
        token: nuovoToken(),
        preventivoId: p.id,
        documento: p.numero,
        descrizione: r.descrizione,
        clienteNome: p.clienteNome,
        clienteEmail: p.clienteEmail,
        importo: r.importo,
        tipo: r.tipo,
        rataNumero: r.rataNumero ?? null,
        rateTotali: r.rateTotali ?? null,
        scadenza: r.scadenza ?? null,
      })),
    });
  }

  const prima = await prisma.pagamento.findFirst({
    where: { preventivoId: p.id, stato: { in: ["aperto", "in corso"] } },
    orderBy: [{ rataNumero: "asc" }, { createdAt: "asc" }],
    select: { token: true, importo: true, descrizione: true },
  });

  // Avviso ad Angelo: un preventivo firmato va visto subito.
  try {
    await gmailTransport.sendMail({
      from: GMAIL_FROM,
      to: NOTIFY_EMAILS,
      subject: `✍️ ${p.numero} firmato da ${nome}`,
      html: `
        <div style="font-family:system-ui,sans-serif">
          <p><strong>${nome}</strong> ha firmato il preventivo <strong>${p.numero}</strong>.</p>
          <p>Cliente: ${p.clienteNome}${p.clienteEmail ? ` — ${p.clienteEmail}` : ""}</p>
          <p>Totale: <strong>${eur(p.totale)}</strong></p>
          <p>${prima ? `Prima rata da incassare: ${eur(prima.importo)}` : "Nessuna rata generata."}</p>
          <p style="color:#666;font-size:13px">
            Il contratto si perfeziona quando la prima rata risulta pagata.
          </p>
        </div>`,
    });
  } catch {
    // la firma resta valida anche se l'avviso non parte
  }

  return NextResponse.json({ ok: true, pagamento: prima ?? null });
}
