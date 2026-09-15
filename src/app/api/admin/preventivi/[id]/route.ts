// Singolo preventivo lato admin: modifica stato, avanzamento lavoro, invio
// al cliente, eliminazione.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { gmailTransport, GMAIL_FROM } from "@/lib/gmail";
import { SITE } from "@/lib/stripe";
import { eur } from "@/lib/preventivo";

export const dynamic = "force-dynamic";

const STATI = ["inviato", "firmato", "scaduto", "sostituito"];
const LAVORI = ["da iniziare", "in corso", "consegnato", "concluso"];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const p = await prisma.preventivo.findUnique({
    where: { id },
    include: { pagamenti: { orderBy: [{ rataNumero: "asc" }] } },
  });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  const { firma, ...resto } = p;
  return NextResponse.json({
    ...resto,
    firma: firma ? `data:image/png;base64,${Buffer.from(firma).toString("base64")}` : null,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  let body: { stato?: string; lavoro?: string; lavoroNote?: string; azione?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const p = await prisma.preventivo.findUnique({ where: { id } });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  // --- invio al cliente ---
  if (body.azione === "invia") {
    if (!p.clienteEmail) {
      return NextResponse.json(
        { error: "Il preventivo non ha un'email del cliente" },
        { status: 400 }
      );
    }
    const link = `${SITE}/preventivo/${p.token}`;
    const de = p.lingua === "de";
    await gmailTransport.sendMail({
      from: GMAIL_FROM,
      to: p.clienteEmail,
      subject: de
        ? `Dein Angebot ${p.numero} — Coach Angelo`
        : `Il tuo preventivo ${p.numero} — Coach Angelo`,
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;color:#171717">
          <p>${de ? "Hallo" : "Ciao"} ${p.clienteNome},</p>
          <p>${
            de
              ? "hier ist dein persönliches Angebot. Du kannst es online lesen und direkt unterschreiben:"
              : "ecco il tuo preventivo. Puoi leggerlo online e firmarlo direttamente:"
          }</p>
          <p style="margin:24px 0">
            <a href="${link}" style="background:#0d0d0d;color:#fff;padding:12px 22px;text-decoration:none;font-weight:600">
              ${de ? "Angebot ansehen" : "Apri il preventivo"}
            </a>
          </p>
          <p style="font-size:13px;color:#666">
            ${de ? "Gesamtbetrag" : "Totale"}: <strong>${eur(p.totale)}</strong><br>
            ${
              p.validoFino
                ? `${de ? "Gültig bis" : "Valido fino al"}: ${p.validoFino.toLocaleDateString(
                    de ? "de-DE" : "it-IT"
                  )}`
                : ""
            }
          </p>
          <p style="font-size:13px;color:#666">Angelo Magliarisi — Coach Angelo</p>
        </div>`,
    });

    const agg = await prisma.preventivo.update({
      where: { id },
      data: { inviatoAt: new Date(), inviatoA: p.clienteEmail },
    });
    const { firma, ...resto } = agg;
    void firma;
    return NextResponse.json(resto);
  }

  // --- modifica stato / lavoro ---
  const data: Record<string, unknown> = {};
  if (body.stato && STATI.includes(body.stato)) data.stato = body.stato;
  if (body.lavoro && LAVORI.includes(body.lavoro)) {
    data.lavoro = body.lavoro;
    if (body.lavoro === "consegnato") data.dataFine = new Date();
  }
  if (typeof body.lavoroNote === "string") data.lavoroNote = body.lavoroNote;

  if (!Object.keys(data).length) {
    return NextResponse.json({ error: "Niente da aggiornare" }, { status: 400 });
  }

  const agg = await prisma.preventivo.update({ where: { id }, data });
  const { firma, ...resto } = agg;
  void firma;
  return NextResponse.json(resto);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const p = await prisma.preventivo.findUnique({ where: { id } });
  if (!p) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  // Un documento firmato e' un accordo: non si cancella, si sostituisce.
  if (p.stato === "firmato") {
    return NextResponse.json(
      { error: "Un preventivo firmato non si elimina. Segnalo come sostituito." },
      { status: 409 }
    );
  }

  await prisma.preventivo.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
