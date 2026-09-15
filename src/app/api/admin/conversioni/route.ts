// Dati della sezione Conversioni: lead per sorgente, pagine che convertono,
// ordini, e (se GSC risponde) l'incrocio fra traffico di ricerca e lead.
//
// GET /api/admin/conversioni?giorni=28

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { searchAnalytics } from "@/lib/gsc-client";

export const dynamic = "force-dynamic";

const SITE = "https://www.angelocoach.com";

/** Normalizza una URL a path, cosi' GSC e landingPage sono confrontabili. */
function toPath(u: string | null): string | null {
  if (!u) return null;
  try {
    const url = u.startsWith("http") ? new URL(u) : new URL(u, SITE);
    if (url.hostname && !url.hostname.includes("angelocoach.com")) return null;
    return url.pathname.replace(/\/+$/, "") || "/";
  } catch {
    return u.startsWith("/") ? u.replace(/\/+$/, "") || "/" : null;
  }
}

/** Canale leggibile: da dove e' arrivato il lead. */
function channel(c: { utmSource: string | null; utmMedium: string | null; referrer: string | null }): string {
  if (c.utmSource) return `${c.utmSource}${c.utmMedium ? ` / ${c.utmMedium}` : ""}`;
  if (!c.referrer) return "Diretto";
  try {
    const h = new URL(c.referrer).hostname.replace(/^www\./, "");
    if (h.includes("angelocoach.com")) return "Diretto";
    if (h.includes("google")) return "Google";
    if (h.includes("bing")) return "Bing";
    if (h.includes("instagram")) return "Instagram";
    if (h.includes("tiktok")) return "TikTok";
    if (h.includes("facebook") || h.includes("fb.")) return "Facebook";
    return h;
  } catch {
    return "Sconosciuto";
  }
}

/** Raggruppa un path nella famiglia di pagine a cui appartiene. */
function family(path: string): string {
  const s = path.split("/").filter(Boolean);
  if (!s.length) return "Home";
  if (s[0] === "koeln") return s.length >= 3 ? "Quartiere x servizio" : "Quartiere (hub)";
  if (s[0] === "personal-trainer-koeln") return s.length >= 2 ? "Bezirk" : "Pagina Köln";
  if (s[0] === "blog") return s.length >= 2 ? "Blog (articolo)" : "Blog (indice)";
  if (s[0] === "fitness-faq") return s.length >= 2 ? "FAQ (domanda)" : "FAQ (indice)";
  if (s[0] === "leistungen") return "Servizio";
  return "Altre pagine";
}

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const giorni = Math.min(Math.max(Number(req.nextUrl.searchParams.get("giorni")) || 28, 1), 365);
  const da = new Date();
  da.setDate(da.getDate() - giorni);
  const precDa = new Date(da);
  precDa.setDate(precDa.getDate() - giorni);

  const [contatti, contattiPrec, ordini] = await Promise.all([
    prisma.contact.findMany({ where: { createdAt: { gte: da } }, orderBy: { createdAt: "desc" } }),
    prisma.contact.count({ where: { createdAt: { gte: precDa, lt: da } } }),
    prisma.order.findMany({ where: { createdAt: { gte: da } }, orderBy: { createdAt: "desc" } }),
  ]);

  // --- lead per canale ---
  const perCanale = new Map<string, number>();
  for (const c of contatti) perCanale.set(channel(c), (perCanale.get(channel(c)) || 0) + 1);

  // --- lead per pagina di atterraggio ---
  const perPagina = new Map<string, number>();
  const perFamiglia = new Map<string, number>();
  for (const c of contatti) {
    const p = toPath(c.landingPage);
    if (!p) continue;
    perPagina.set(p, (perPagina.get(p) || 0) + 1);
    const f = family(p);
    perFamiglia.set(f, (perFamiglia.get(f) || 0) + 1);
  }

  // --- lead per giorno ---
  const perGiorno = new Map<string, number>();
  for (let i = 0; i < giorni; i++) {
    const d = new Date(da);
    d.setDate(d.getDate() + i);
    perGiorno.set(dayKey(d), 0);
  }
  for (const c of contatti) {
    const k = dayKey(new Date(c.createdAt));
    if (perGiorno.has(k)) perGiorno.set(k, (perGiorno.get(k) || 0) + 1);
  }

  // --- servizio richiesto ---
  const perServizio = new Map<string, number>();
  for (const c of contatti) perServizio.set(c.service || "non indicato", (perServizio.get(c.service || "non indicato") || 0) + 1);

  // --- ordini ---
  const pagati = ordini.filter((o) => o.status === "completed" || o.paypalStatus === "COMPLETED");
  const fatturato = pagati.reduce((s, o) => s + (o.totalPrice || 0), 0);

  // --- GSC: opzionale, il pannello deve funzionare anche se il token e' scaduto ---
  let gsc: {
    ok: boolean;
    errore?: string;
    clic: number;
    impressioni: number;
    posizioneMedia: number;
    pagine: { path: string; clic: number; impressioni: number; posizione: number; lead: number }[];
  } = { ok: false, clic: 0, impressioni: 0, posizioneMedia: 0, pagine: [] };

  try {
    const fine = new Date();
    fine.setDate(fine.getDate() - 3); // GSC ha 2-3 giorni di ritardo
    const righe = await searchAnalytics({
      startDate: dayKey(da),
      endDate: dayKey(fine),
      dimensions: ["page"],
      rowLimit: 500,
    });
    const pagine = righe
      .map((r) => {
        const path = toPath(r.keys?.[0] || null);
        return path
          ? {
              path,
              clic: r.clicks || 0,
              impressioni: r.impressions || 0,
              posizione: Number((r.position || 0).toFixed(1)),
              lead: perPagina.get(path) || 0,
            }
          : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const clic = pagine.reduce((s, p) => s + p.clic, 0);
    const impressioni = pagine.reduce((s, p) => s + p.impressioni, 0);
    const posizioneMedia = pagine.length
      ? Number((pagine.reduce((s, p) => s + p.posizione * p.impressioni, 0) / (impressioni || 1)).toFixed(1))
      : 0;

    gsc = { ok: true, clic, impressioni, posizioneMedia, pagine: pagine.sort((a, b) => b.clic - a.clic) };
  } catch (e) {
    gsc.errore = (e as Error).message.includes("invalid_grant")
      ? "Token Search Console scaduto: rigeneralo con scripts/get-refresh-token.mjs"
      : (e as Error).message;
  }

  const ordinato = (m: Map<string, number>) =>
    [...m.entries()].map(([nome, n]) => ({ nome, n })).sort((a, b) => b.n - a.n);

  return NextResponse.json({
    periodo: { giorni, da: dayKey(da), a: dayKey(new Date()) },
    lead: {
      totale: contatti.length,
      precedente: contattiPrec,
      daLeggere: contatti.filter((c) => !c.read).length,
      perCanale: ordinato(perCanale),
      perFamiglia: ordinato(perFamiglia),
      perServizio: ordinato(perServizio),
      perPagina: ordinato(perPagina).slice(0, 30),
      perGiorno: [...perGiorno.entries()].map(([giorno, n]) => ({ giorno, n })),
    },
    ordini: {
      totale: ordini.length,
      pagati: pagati.length,
      fatturato: Number(fatturato.toFixed(2)),
    },
    gsc,
  });
}
