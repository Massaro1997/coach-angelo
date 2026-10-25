import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";

// Richieste per l'admin RankX di DirezioneX (25/10/2026): solo conteggi,
// niente nomi, email, telefoni o testi dei messaggi.
//
// GET ?tage=90 con header x-rankx-token
//  - wizard: richieste arrivate dal LeadWizard (Contact), spam escluso
//  - proSeite: richieste per pagina d'ingresso della sessione (landingPage)
//  - proKanal: da dove arrivava la sessione (utm_source, poi referrer)
// Chiamate e WhatsApp non sono tracciati sul sito: "nonMisurati".
//
// Del token qui c'e' solo l'impronta sha256 (il token vero sta nell'admin di
// DirezioneX): niente variabile d'ambiente da aggiungere su Vercel.

export const dynamic = "force-dynamic";

const IMPRONTA_TOKEN = "00240651d4a6585f50056c7c93991744406808323cf70c88fc523222d15667eb";

function autorizzato(request: Request): boolean {
  const dato = request.headers.get("x-rankx-token") || "";
  if (dato.length < 32) return false;
  return timingSafeEqual(createHash("sha256").update(dato).digest(), Buffer.from(IMPRONTA_TOKEN, "hex"));
}

function pagina(landing: string | null): string {
  if (!landing) return "(sconosciuta)";
  const p = landing.split(/[?#]/)[0] || "/";
  return p.length > 1 ? p.replace(/\/$/, "") : p;
}

function canale(utmSource: string | null, referrer: string | null): string {
  if (utmSource) return utmSource.toLowerCase();
  if (!referrer) return "diretto";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (/google\./.test(host)) return "google";
    if (/bing\.|duckduckgo|ecosia|yahoo/.test(host)) return "altri motori";
    if (/instagram|facebook|fb\.|tiktok|linkedin|t\.co|twitter|x\.com/.test(host)) return "social";
    if (/chatgpt|openai|perplexity|gemini|claude|copilot/.test(host)) return "assistenti ai";
    return host;
  } catch {
    return "altro";
  }
}

export async function GET(request: Request) {
  if (!autorizzato(request)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const tage = Math.min(Math.max(Number(new URL(request.url).searchParams.get("tage")) || 90, 1), 365);
  const seit = new Date(Date.now() - tage * 86_400_000);

  const richieste = await prisma.contact.findMany({
    // qualita e' null finche' Angelo non la segna: un NOT semplice scarterebbe anche quelle
    where: { createdAt: { gte: seit }, OR: [{ qualita: null }, { qualita: { not: "spam" } }] },
    select: { landingPage: true, utmSource: true, referrer: true },
  });

  const proSeite = new Map<string, number>();
  const proKanal = new Map<string, number>();
  const conta = (m: Map<string, number>, k: string) => m.set(k, (m.get(k) ?? 0) + 1);
  for (const r of richieste) {
    conta(proSeite, pagina(r.landingPage));
    conta(proKanal, canale(r.utmSource, r.referrer));
  }

  return NextResponse.json({
    tage,
    totale: richieste.length,
    perCanale: { form: 0, wizard: richieste.length, call: 0, whatsapp: 0 },
    nonMisurati: ["call", "whatsapp"],
    proSeite: [...proSeite.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30).map(([seite, n]) => ({ seite, n })),
    proKanal: Object.fromEntries(proKanal),
  });
}
