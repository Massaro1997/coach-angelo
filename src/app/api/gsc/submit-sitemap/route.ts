import { NextRequest, NextResponse } from 'next/server';
import { submitSitemap } from '@/lib/gsc-client';

export const dynamic = 'force-dynamic';

// Submitta la sitemap principale. Opzionale: ?url= per una specifica.
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const single = searchParams.get('url');
    const sitemaps = single
      ? [single]
      : ['https://www.angelocoach.com/sitemap.xml'];
    const results = [];
    for (const s of sitemaps) {
      try {
        const r = await submitSitemap(s);
        results.push({ sitemap: s, ok: true, result: r });
      } catch (e) {
        results.push({ sitemap: s, ok: false, error: (e as Error).message });
      }
    }
    return NextResponse.json({ ok: results.every((r) => r.ok), results });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
