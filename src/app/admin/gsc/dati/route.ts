// Dati della scheda SEO del gestionale: GET /admin/gsc/dati
//
// Si affianca a /api/gsc/overview senza toccarlo. Serve perche' la scheda deve
// confrontare gli ultimi 28 giorni con i 28 prima, e l'overview non li ha:
// - totali dei due periodi (posizione media pesata da Google, non la media
//   delle medie giornaliere)
// - andamento giorno per giorno su 56 giorni, con i giorni vuoti a zero
// - ricerche e pagine dei 28 giorni, con i click del periodo prima
// - per ogni ricerca la pagina che Google mostra di piu'
// Se Google rifiuta il token la risposta dice che tipo di problema e', cosi'
// la pagina puo' spiegare cosa fare invece di stampare "invalid_grant".

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { GSC_PROPERTY, listSitemaps, searchAnalytics } from '@/lib/gsc-client';
import type { DatiSeo, ErroreSeo, RigaSeo, TotaliSeo } from '@/components/admin/seo/tipi';

export const dynamic = 'force-dynamic';

type RigaGsc = Awaited<ReturnType<typeof searchAnalytics>>[number];

const giorno = (d: Date) => d.toISOString().slice(0, 10);

function sposta(base: Date, giorni: number): Date {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + giorni);
  return d;
}

function totali(righe: RigaGsc[]): TotaliSeo {
  const r = righe[0];
  return {
    clic: r?.clicks || 0,
    impressioni: r?.impressions || 0,
    ctr: r?.ctr || 0,
    posizione: r?.position || 0,
  };
}

/** Da URL completo a percorso: "https://www.sito.com/koeln/ehrenfeld" -> "/koeln/ehrenfeld". */
function percorso(url: string): string {
  try {
    const u = new URL(url);
    return decodeURIComponent(u.pathname) + u.search;
  } catch {
    return url;
  }
}

function righe(ora: RigaGsc[], prima: RigaGsc[], chiave: (k: string) => string): RigaSeo[] {
  const vecchie = new Map<string, RigaGsc>();
  for (const r of prima) {
    const k = r.keys?.[0];
    if (k) vecchie.set(chiave(k), r);
  }
  return ora
    .filter((r) => r.keys?.[0])
    .map((r) => {
      const k = chiave(r.keys![0]);
      const v = vecchie.get(k);
      return {
        chiave: k,
        clic: r.clicks || 0,
        impressioni: r.impressions || 0,
        ctr: r.ctr || 0,
        posizione: r.position || 0,
        clicPrima: v ? v.clicks || 0 : null,
        posizionePrima: v ? v.position || 0 : null,
      };
    });
}

function classifica(e: unknown): ErroreSeo {
  const msg = e instanceof Error ? e.message : String(e);
  if (/invalid_grant|invalid_rapt|token has been expired|revoked/i.test(msg)) {
    return { tipo: 'token', dettaglio: msg };
  }
  if (/Missing GSC OAuth env/i.test(msg)) return { tipo: 'config', dettaglio: msg };
  if (/permission|forbidden|not have sufficient|403|User does not have/i.test(msg)) {
    return { tipo: 'permessi', dettaglio: msg };
  }
  if (/quota|rate limit|429/i.test(msg)) return { tipo: 'quota', dettaglio: msg };
  return { tipo: 'altro', dettaglio: msg };
}

export async function GET() {
  const negato = await requireAdmin();
  if (negato) return negato;

  // Search Console ha 2-3 giorni di ritardo: il periodo finisce 3 giorni fa.
  const fine = sposta(new Date(), -3);
  const inizio = sposta(fine, -27);
  const finePrima = sposta(inizio, -1);
  const inizioPrima = sposta(finePrima, -27);
  const p = {
    da: giorno(inizio),
    a: giorno(fine),
    daPrima: giorno(inizioPrima),
    aPrima: giorno(finePrima),
  };

  try {
    const [totOra, totPrima, perGiorno, ricOra, ricPrima, pagOra, pagPrima, ricercaPagina, sitemap] =
      await Promise.all([
        searchAnalytics({ startDate: p.da, endDate: p.a, dimensions: [], rowLimit: 1 }),
        searchAnalytics({ startDate: p.daPrima, endDate: p.aPrima, dimensions: [], rowLimit: 1 }),
        searchAnalytics({ startDate: p.daPrima, endDate: p.a, dimensions: ['date'], rowLimit: 100 }),
        searchAnalytics({ startDate: p.da, endDate: p.a, dimensions: ['query'], rowLimit: 250 }),
        searchAnalytics({ startDate: p.daPrima, endDate: p.aPrima, dimensions: ['query'], rowLimit: 500 }),
        searchAnalytics({ startDate: p.da, endDate: p.a, dimensions: ['page'], rowLimit: 100 }),
        searchAnalytics({ startDate: p.daPrima, endDate: p.aPrima, dimensions: ['page'], rowLimit: 250 }),
        searchAnalytics({ startDate: p.da, endDate: p.a, dimensions: ['query', 'page'], rowLimit: 1000 }),
        // La sitemap e' un di piu': se non arriva la pagina regge lo stesso.
        listSitemaps().catch(() => null),
      ]);

    // Giorni senza dati: Google li salta, il grafico li vuole a zero.
    const mappaGiorni = new Map(perGiorno.map((r) => [r.keys?.[0], r]));
    const giorni: DatiSeo['giorni'] = [];
    for (let d = new Date(inizioPrima); d <= fine; d = sposta(d, 1)) {
      const k = giorno(d);
      const r = mappaGiorni.get(k);
      giorni.push({
        data: k,
        clic: r?.clicks || 0,
        impressioni: r?.impressions || 0,
        posizione: r?.position || 0,
      });
    }

    // Per ogni ricerca, la pagina che Google ha mostrato piu' volte.
    const paginaDi = new Map<string, { pagina: string; impressioni: number }>();
    for (const r of ricercaPagina) {
      const [q, pag] = r.keys || [];
      if (!q || !pag) continue;
      const att = paginaDi.get(q);
      if (!att || (r.impressions || 0) > att.impressioni) {
        paginaDi.set(q, { pagina: percorso(pag), impressioni: r.impressions || 0 });
      }
    }

    const dati: DatiSeo = {
      proprieta: GSC_PROPERTY,
      aggiornato: new Date().toISOString(),
      periodo: p,
      ora: totali(totOra),
      prima: totali(totPrima),
      giorni,
      ricerche: righe(ricOra, ricPrima, (k) => k).map((r) => ({
        ...r,
        pagina: paginaDi.get(r.chiave)?.pagina ?? null,
      })),
      pagine: righe(pagOra, pagPrima, percorso),
      sitemap: sitemap
        ? sitemap.map((s) => ({
            percorso: s.path || '',
            inviata: s.lastSubmitted || null,
            lettaDaGoogle: s.lastDownloaded || null,
            inAttesa: Boolean(s.isPending),
            errori: Number(s.errors || 0),
            avvisi: Number(s.warnings || 0),
            pagine: Number(s.contents?.[0]?.submitted || 0),
          }))
        : null,
    };
    return NextResponse.json(dati);
  } catch (e) {
    return NextResponse.json({ errore: classifica(e), proprieta: GSC_PROPERTY }, { status: 503 });
  }
}
