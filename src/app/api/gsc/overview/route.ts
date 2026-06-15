// GSC overview endpoint — daily report con tutti i KPI critici.
// GET /api/gsc/overview

import { NextResponse } from 'next/server';
import { listSitemaps, searchAnalytics, GSC_PROPERTY } from '@/lib/gsc-client';

export const dynamic = 'force-dynamic';

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export async function GET() {
  try {
    const endDate = daysAgo(3); // GSC delay 2-3 giorni
    const startDate7 = daysAgo(10);
    const startDate28 = daysAgo(31);

    const [
      sitemaps,
      topQueries7d,
      topPages7d,
      perfByDate28d,
      aiOverviewSegment,
    ] = await Promise.all([
      listSitemaps(),
      searchAnalytics({ startDate: startDate7, endDate, dimensions: ['query'], rowLimit: 50 }),
      searchAnalytics({ startDate: startDate7, endDate, dimensions: ['page'], rowLimit: 50 }),
      searchAnalytics({ startDate: startDate28, endDate, dimensions: ['date'], rowLimit: 1000 }),
      searchAnalytics({
        startDate: startDate28,
        endDate,
        dimensions: ['searchAppearance'],
        rowLimit: 20,
      }).catch(() => []),
    ]);

    const totalImpressions = perfByDate28d.reduce((s, r) => s + (r.impressions || 0), 0);
    const totalClicks = perfByDate28d.reduce((s, r) => s + (r.clicks || 0), 0);
    const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const avgPosition = perfByDate28d.length > 0
      ? perfByDate28d.reduce((s, r) => s + (r.position || 0), 0) / perfByDate28d.length
      : 0;

    return NextResponse.json({
      property: GSC_PROPERTY,
      timestamp: new Date().toISOString(),
      dateRange: { from: startDate28, to: endDate },
      summary: {
        impressions28d: totalImpressions,
        clicks28d: totalClicks,
        ctr28d: Number(avgCtr.toFixed(2)),
        position28d: Number(avgPosition.toFixed(2)),
      },
      sitemaps: sitemaps.map((s) => ({
        path: s.path,
        lastSubmitted: s.lastSubmitted,
        lastDownloaded: s.lastDownloaded,
        isPending: s.isPending,
        errors: s.errors,
        warnings: s.warnings,
        contents: s.contents,
      })),
      topQueries7d: topQueries7d.map((r) => ({
        query: r.keys?.[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: Number(((r.ctr || 0) * 100).toFixed(2)),
        position: Number((r.position || 0).toFixed(1)),
      })),
      topPages7d: topPages7d.map((r) => ({
        page: r.keys?.[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: Number(((r.ctr || 0) * 100).toFixed(2)),
        position: Number((r.position || 0).toFixed(1)),
      })),
      aiOverviewSegment: aiOverviewSegment.map((r) => ({
        appearance: r.keys?.[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: Number(((r.ctr || 0) * 100).toFixed(2)),
      })),
      timeSeries28d: perfByDate28d.map((r) => ({
        date: r.keys?.[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: Number(((r.ctr || 0) * 100).toFixed(2)),
        position: Number((r.position || 0).toFixed(1)),
      })),
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
