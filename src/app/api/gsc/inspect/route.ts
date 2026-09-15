// URL Inspection endpoint — check stato singolo URL su Google index.
// GET /api/gsc/inspect?url=https://www.angelocoach.com/some-page

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { inspectUrl } from '@/lib/gsc-client';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // Dati Search Console e quota Indexing API: solo admin autenticato.
  const denied = await requireAdmin();
  if (denied) return denied;

  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'Missing ?url=' }, { status: 400 });
  }
  try {
    const result = await inspectUrl(url);
    return NextResponse.json({
      url,
      indexStatusResult: result?.indexStatusResult,
      ampResult: result?.ampResult,
      mobileUsabilityResult: result?.mobileUsabilityResult,
      richResultsResult: result?.richResultsResult,
      inspectionResultLink: result?.inspectionResultLink,
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
