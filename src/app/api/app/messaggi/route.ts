// Messaggi tra il cliente e il coach, lato cliente (sezione Coach dell'app).

import { NextRequest, NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { richiediCliente } from "@/lib/app-coaching/sessione";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { linguaDi, toMessaggio } from "@/lib/app-coaching/serializza-v2";
import { pulisciTestoMessaggio, ERRORI, tr } from "@/lib/app-coaching/pulisci-v2";
import { COACH } from "@/lib/preventivo-testi";

export const dynamic = "force-dynamic";

// gli ultimi N: la chat non ha paginazione, e piu' indietro nessuno scorre
const MESSAGGI_MOSTRATI = 300;
// limite contato nel DB (non in memoria): vale anche con piu' istanze su Vercel
const MAX_MESSAGGI_ORA = 30;
const ORA_MS = 60 * 60 * 1000;
// avviso ad Angelo solo al primo messaggio di una conversazione, non a ogni riga
const PAUSA_AVVISO_MS = 10 * 60 * 1000;

export async function GET() {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;

  const righe = await prisma.appMessaggio.findMany({
    where: { clienteId: cliente.id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: MESSAGGI_MOSTRATI,
  });
  righe.reverse();

  // Si segnano letti i messaggi del coach fino all'ultimo mostrato: uno
  // arrivato dopo questa lettura il cliente non l'ha visto e resta non letto.
  // La risposta porta lo stato di prima, cosi' l'app puo' evidenziare i nuovi.
  const ultimo = righe.at(-1);
  if (ultimo && righe.some((r) => r.daCoach && !r.lettoAt)) {
    await prisma.appMessaggio.updateMany({
      where: {
        clienteId: cliente.id,
        daCoach: true,
        lettoAt: null,
        createdAt: { lte: ultimo.createdAt },
      },
      data: { lettoAt: new Date() },
    });
  }

  return NextResponse.json({ messaggi: righe.map((r) => toMessaggio(r, "cliente")) });
}

export async function POST(req: NextRequest) {
  const { cliente, errore } = await richiediCliente();
  if (errore) return errore;
  const l = linguaDi(cliente);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: tr(l, ERRORI.richiesta) }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: tr(l, ERRORI.richiesta) }, { status: 400 });
  }
  const { testo, errore: errTesto } = pulisciTestoMessaggio((body as { testo?: unknown }).testo, l);
  if (errTesto !== null) return NextResponse.json({ error: errTesto }, { status: 400 });

  const adesso = Date.now();
  const [nellUltimaOra, precedente] = await Promise.all([
    prisma.appMessaggio.count({
      where: { clienteId: cliente.id, daCoach: false, createdAt: { gte: new Date(adesso - ORA_MS) } },
    }),
    prisma.appMessaggio.findFirst({
      where: { clienteId: cliente.id, daCoach: false },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
  ]);
  if (nellUltimaOra >= MAX_MESSAGGI_ORA) {
    return NextResponse.json({ error: tr(l, ERRORI.troppiMessaggi) }, { status: 429 });
  }

  const riga = await prisma.appMessaggio.create({
    data: { clienteId: cliente.id, daCoach: false, testo },
  });

  const avvisa =
    process.env.NODE_ENV === "production" &&
    !!process.env.RESEND_API_KEY &&
    cliente.coach === MARCHIO.chiave && // la mail va ad Angelo: solo clienti suoi
    (!precedente || adesso - precedente.createdAt.getTime() > PAUSA_AVVISO_MS);
  // dopo la risposta: il cliente non aspetta la mail, e se fallisce il messaggio c'e' gia'
  if (avvisa) after(() => avvisaCoach(cliente.nome, testo));

  return NextResponse.json({ messaggio: toMessaggio(riga, "cliente") }, { status: 201 });
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Mail breve ad Angelo: solo nome e messaggio, nient'altro del cliente. */
async function avvisaCoach(nome: string, testo: string): Promise<void> {
  try {
    // import qui: new Resend() senza chiave lancia gia' al caricamento del modulo
    const { resend, FROM_EMAIL } = await import("@/lib/resend");
    const link = `${MARCHIO.sito}/admin`;
    const { error } = await resend.emails.send({
      from: FROM_EMAIL.replace(/^[^<]*</, `${MARCHIO.nome} App <`),
      to: COACH.email,
      subject: `Nuovo messaggio da ${nome} nell'app`,
      text: `${nome} ti ha scritto nell'app ${MARCHIO.nome}:\n\n${testo}\n\nRispondi dal gestionale: ${link}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px">
          <p><strong>${esc(nome)}</strong> ti ha scritto nell'app ${esc(MARCHIO.nome)}:</p>
          <p style="white-space:pre-wrap;border-left:3px solid ${MARCHIO.colore};padding-left:12px">${esc(testo)}</p>
          <p style="color:#666;font-size:13px">Rispondi dal gestionale: <a href="${link}">${link}</a></p>
        </div>`,
    });
    // nei log niente testo del messaggio: solo che non e' partita
    if (error) console.error(`Avviso messaggio app non partito: ${error.name}`);
  } catch (e) {
    console.error("Avviso messaggio app non partito:", e instanceof Error ? e.message : "errore");
  }
}
