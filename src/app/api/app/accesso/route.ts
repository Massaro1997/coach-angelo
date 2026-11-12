// Accesso all'app clienti: col codice di 8 cifre (app installata, che su
// iPhone non vede i cookie di Safari) o col token del link mandato su WhatsApp.
// Messaggi in tedesco: li legge il cliente.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { APP_COOKIE, APP_COOKIE_OPTS, tokenSessione } from "@/lib/app-coaching/sessione";
import { toProfilo } from "@/lib/app-coaching/serializza";

export const dynamic = "force-dynamic";

// Rate limit in memoria come il login admin: non regge il multi-istanza, ma
// 8 tentativi ogni 10 minuti su 90 milioni di codici bastano a scoraggiare.
const tentativi = new Map<string, { n: number; until: number }>();
const MAX_TENTATIVI = 8;
const FINESTRA_MS = 10 * 60 * 1000;

function ipDi(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "sconosciuto";
}

function segnaFallito(ip: string, now: number) {
  const rec = tentativi.get(ip);
  tentativi.set(
    ip,
    rec && rec.until > now ? { n: rec.n + 1, until: rec.until } : { n: 1, until: now + FINESTRA_MS }
  );
  // pulizia ogni tanto, se no la mappa cresce con ogni IP visto
  if (tentativi.size > 5_000) {
    for (const [k, v] of tentativi) if (v.until <= now) tentativi.delete(k);
  }
}

export async function POST(req: NextRequest) {
  const ip = ipDi(req);
  const now = Date.now();
  const rec = tentativi.get(ip);
  if (rec && rec.until > now && rec.n >= MAX_TENTATIVI) {
    return NextResponse.json(
      { error: "Zu viele Versuche. Bitte in ein paar Minuten erneut versuchen." },
      { status: 429 }
    );
  }

  let body: { codice?: unknown; token?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  let where: { codice: string } | { token: string };
  let nonTrovato: string;
  if (body.codice !== undefined && body.codice !== null && body.codice !== "") {
    // "1234 5678" come lo mostriamo: gli spazi si tolgono
    const codice = String(body.codice).replace(/\s+/g, "");
    if (!/^\d{8}$/.test(codice)) {
      return NextResponse.json({ error: "Der Code hat 8 Ziffern" }, { status: 400 });
    }
    where = { codice };
    nonTrovato = "Code nicht gefunden";
  } else if (typeof body.token === "string" && body.token.trim()) {
    const token = body.token.trim().toLowerCase();
    if (!/^[0-9a-f]{32}$/.test(token)) {
      return NextResponse.json({ error: "Link ungültig" }, { status: 400 });
    }
    where = { token };
    nonTrovato = "Link ungültig oder abgelaufen";
  } else {
    return NextResponse.json({ error: "Code fehlt" }, { status: 400 });
  }

  const cliente = await prisma.appCliente.findUnique({ where });
  // disattivato = come inesistente: non diciamo a chi prova che il codice c'e'
  if (!cliente || !cliente.attivo) {
    segnaFallito(ip, now);
    return NextResponse.json({ error: nonTrovato }, { status: 401 });
  }

  tentativi.delete(ip);
  const agg = await prisma.appCliente.update({
    where: { id: cliente.id },
    data: { ultimoAccesso: new Date() },
  });

  const res = NextResponse.json({ ok: true, profilo: toProfilo(agg) });
  res.cookies.set(APP_COOKIE, tokenSessione(agg), APP_COOKIE_OPTS);
  return res;
}

/** Logout. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(APP_COOKIE, "", { ...APP_COOKIE_OPTS, maxAge: 0 });
  return res;
}
