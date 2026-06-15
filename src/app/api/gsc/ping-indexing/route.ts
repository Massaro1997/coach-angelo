// Indexing API ping endpoint — force Google re-crawl per URL specifici.
// Limite quotidiano: 200 URL/giorno per GCP project (condiviso con GFR/Massaro).
// POST /api/gsc/ping-indexing  body: { urls: ["url1", "url2"] }
// GET /api/gsc/ping-indexing?url=https://...

import { NextResponse } from 'next/server';
import { pingIndexing } from '@/lib/gsc-client';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'Missing ?url=' }, { status: 400 });
  try {
    const result = await pingIndexing(url, 'URL_UPDATED');
    return NextResponse.json({ ok: true, result });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const urls: string[] = body.urls || [];
    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'Missing urls array in body' }, { status: 400 });
    }
    if (urls.length > 100) {
      return NextResponse.json({ error: 'Max 100 URLs per batch' }, { status: 400 });
    }
    const results = await Promise.allSettled(
      urls.map((u) => pingIndexing(u, 'URL_UPDATED'))
    );
    return NextResponse.json({
      total: urls.length,
      succeeded: results.filter((r) => r.status === 'fulfilled').length,
      failed: results.filter((r) => r.status === 'rejected').length,
      details: results.map((r, i) => ({
        url: urls[i],
        ok: r.status === 'fulfilled',
        ...(r.status === 'rejected' ? { error: (r.reason as Error)?.message } : {}),
      })),
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
