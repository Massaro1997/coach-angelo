'use client';

import { useEffect, useState } from 'react';
import {
  Eye,
  MousePointerClick,
  Target,
  BarChart3,
  Search,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Zap,
  ListChecks,
} from 'lucide-react';

const SITE = 'https://www.angelocoach.com';

// Pagine chiave da pingare (hub geo + leistungen + bezirk + core + blog).
// NON le 688 spoke (brucia quota + doorway-risk → crawl naturale).
const KEY_PAGES_HINT = [
  '/',
  '/personal-trainer-koeln',
  '/leistungen/personal-training',
  '/leistungen/abnehmen',
  '/leistungen/muskelaufbau',
  '/koeln/ehrenfeld',
  '/koeln/lindenthal',
  '/blog',
  '/fitness-faq',
].join('\n');

type Overview = {
  property: string;
  timestamp: string;
  dateRange: { from: string; to: string };
  summary: {
    impressions28d: number;
    clicks28d: number;
    ctr28d: number;
    position28d: number;
  };
  sitemaps: Array<{
    path?: string;
    lastSubmitted?: string;
    lastDownloaded?: string;
    errors?: string;
    warnings?: string;
    contents?: Array<{ submitted?: string; indexed?: string }>;
  }>;
  topQueries7d: { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
  topPages7d: { page: string; clicks: number; impressions: number; ctr: number; position: number }[];
  aiOverviewSegment: { appearance: string; clicks: number; impressions: number; ctr: number }[];
  timeSeries28d: { date: string; clicks: number; impressions: number; ctr: number; position: number }[];
};

function fmtNum(n: number): string {
  return new Intl.NumberFormat('it-IT').format(n);
}

export default function GSCDashboard() {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [inspectUrl, setInspectUrl] = useState(`${SITE}/`);
  const [inspectResult, setInspectResult] = useState<Record<string, unknown> | null>(null);
  const [batchUrls, setBatchUrls] = useState(KEY_PAGES_HINT);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchResult, setBatchResult] = useState<{ total: number; succeeded: number; failed: number } | null>(null);
  const [actionLog, setActionLog] = useState<{ type: string; msg: string; time: string }[]>([]);

  const load = async () => {
    setRefreshing(true);
    try {
      const r = await fetch('/api/gsc/overview');
      const d = await r.json();
      if (d.error) setError(d.error);
      else setData(d);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const log = (type: string, msg: string) => {
    setActionLog((prev) => [{ type, msg, time: new Date().toLocaleTimeString('it-IT') }, ...prev].slice(0, 10));
  };

  const handleInspect = async () => {
    setInspectResult(null);
    log('inspect', `Inspecting ${inspectUrl}`);
    const r = await fetch(`/api/gsc/inspect?url=${encodeURIComponent(inspectUrl)}`);
    const d = await r.json();
    setInspectResult(d);
    const verdict = (d.indexStatusResult as Record<string, string>)?.verdict;
    log(verdict === 'PASS' ? 'success' : 'warn', `Verdict: ${verdict || 'unknown'}`);
  };

  const handlePing = async () => {
    log('ping', `Pinging Indexing API for ${inspectUrl}`);
    const r = await fetch(`/api/gsc/ping-indexing?url=${encodeURIComponent(inspectUrl)}`);
    const d = await r.json();
    log(d.ok ? 'success' : 'error', d.ok ? 'Re-crawl notificato' : `Error: ${d.error}`);
  };

  const handleBatchPing = async () => {
    const urls = batchUrls
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean)
      .map((u) => (u.startsWith('http') ? u : `${SITE}${u.startsWith('/') ? '' : '/'}${u}`));
    if (urls.length === 0) return;
    if (urls.length > 100) {
      log('error', `${urls.length} URL: max 100 per batch`);
      return;
    }
    setBatchRunning(true);
    setBatchResult(null);
    log('ping', `Batch ping ${urls.length} URL...`);
    try {
      const r = await fetch('/api/gsc/ping-indexing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls }),
      });
      const d = await r.json();
      if (d.error) {
        log('error', d.error);
      } else {
        setBatchResult(d);
        log(d.failed === 0 ? 'success' : 'warn', `Batch: ${d.succeeded}/${d.total} ok${d.failed ? `, ${d.failed} falliti` : ''}`);
      }
    } catch (e: unknown) {
      log('error', (e as Error).message);
    }
    setBatchRunning(false);
  };

  const handleSubmitSitemap = async () => {
    log('sitemap', 'Submitting sitemap.xml');
    const r = await fetch('/api/gsc/submit-sitemap', { method: 'POST' });
    const d = await r.json();
    log(d.ok ? 'success' : 'error', d.ok ? 'Sitemap inviata' : `Error: ${d.error || JSON.stringify(d.results)}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-ink/50 text-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" /> Loading GSC data...
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8 min-h-screen bg-background">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
          <AlertCircle className="w-5 h-5 mb-2" />
          <div className="font-semibold mb-1">Error</div>
          <div className="text-sm">{error}</div>
          <div className="text-xs text-ink/40 mt-3">
            Se &quot;email not found&quot; o property assente: aggiungi il service account come owner in Search Console
            per <span className="font-mono">angelocoach.com</span>.
          </div>
        </div>
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-ink uppercase">Search Console</h1>
            <p className="text-xs text-ink/40 mt-1">
              {data.property} · {data.dateRange.from} → {data.dateRange.to}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/admin"
              className="px-3 py-1.5 bg-surface hover:bg-elevated rounded-lg text-sm border border-line text-ink transition"
            >
              ← Admin
            </a>
            <button
              type="button"
              onClick={load}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-1.5 bg-surface hover:bg-elevated rounded-lg text-sm border border-line text-ink transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KPICard label="Impressions" value={fmtNum(data.summary.impressions28d)} subtitle="28 giorni" icon={Eye} />
          <KPICard label="Clicks" value={fmtNum(data.summary.clicks28d)} subtitle="28 giorni" icon={MousePointerClick} />
          <KPICard label="CTR" value={`${data.summary.ctr28d}%`} subtitle="media 28gg" icon={Target} />
          <KPICard label="Posizione media" value={data.summary.position28d.toFixed(1)} subtitle="28 giorni" icon={BarChart3} />
        </div>

        {/* Time series mini chart */}
        <Card title="Trend impressions/clicks 28gg">
          <TimeSeriesChart data={data.timeSeries28d} />
        </Card>

        {/* 2-column: Sitemaps + Search Appearance */}
        <div className="grid lg:grid-cols-2 gap-4">
          <Card title="Sitemaps">
            <div className="space-y-2">
              {data.sitemaps.map((s, i) => (
                <div key={i} className="bg-elevated rounded-lg p-3 text-xs border border-line">
                  <div className="text-ink font-mono break-all mb-2">{s.path}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <Stat label="Submitted" value={s.contents?.[0]?.submitted || '-'} />
                    <Stat label="Indexed" value={s.contents?.[0]?.indexed || '0'} bold />
                    <Stat label="Errors" value={s.errors || '0'} color={s.errors !== '0' ? 'red' : 'green'} />
                  </div>
                  <div className="mt-2 text-[10px] text-ink/40">
                    Last submitted: {s.lastSubmitted?.slice(0, 10) || '-'} · Downloaded: {s.lastDownloaded?.slice(0, 10) || '-'}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleSubmitSitemap}
                className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 bg-gold rounded-lg text-sm font-semibold transition"
              >
                <Send className="w-3.5 h-3.5" /> Re-submit sitemap
              </button>
            </div>
          </Card>

          <Card title="Search Appearance">
            {data.aiOverviewSegment.length > 0 ? (
              <div className="space-y-1.5">
                {data.aiOverviewSegment.map((a, i) => (
                  <div key={i} className="bg-elevated rounded-lg p-3 flex items-center justify-between border border-line">
                    <div className="text-sm text-ink">{a.appearance}</div>
                    <div className="flex gap-4 text-xs">
                      <span className="text-ink/50">
                        <span className="text-ink font-bold">{fmtNum(a.impressions)}</span> impr
                      </span>
                      <span className="text-ink/50">
                        <span className="text-ink font-bold">{a.clicks}</span> click
                      </span>
                      <span className="text-gold font-bold">{a.ctr}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-ink/50 text-sm py-4 text-center">
                No search appearance segments yet
                <div className="text-[10px] mt-1 text-ink/40">(arriveranno post-indexing)</div>
              </div>
            )}
          </Card>
        </div>

        {/* URL inspect + ping */}
        <Card title="URL Inspection & Indexing Ping">
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="text"
              value={inspectUrl}
              onChange={(e) => setInspectUrl(e.target.value)}
              className="flex-1 px-3 py-2 bg-elevated border border-line rounded-lg text-sm text-ink placeholder:text-ink/30 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/20"
              placeholder={`${SITE}/...`}
            />
            <button
              type="button"
              onClick={handleInspect}
              className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-elevated border border-line text-ink rounded-lg text-sm font-semibold transition"
            >
              <Search className="w-3.5 h-3.5" /> Inspect
            </button>
            <button
              type="button"
              onClick={handlePing}
              className="flex items-center gap-2 px-4 py-2 bg-gold rounded-lg text-sm font-semibold transition"
            >
              <Zap className="w-3.5 h-3.5" /> Ping Re-crawl
            </button>
          </div>

          {inspectResult && (
            <div className="bg-elevated border border-line rounded-lg p-4 text-xs space-y-2">
              <InspectField
                label="Verdict"
                value={(inspectResult.indexStatusResult as Record<string, string>)?.verdict || '-'}
                status={(inspectResult.indexStatusResult as Record<string, string>)?.verdict === 'PASS' ? 'ok' : 'warn'}
              />
              <InspectField label="Coverage" value={(inspectResult.indexStatusResult as Record<string, string>)?.coverageState || '-'} />
              <InspectField label="Indexing" value={(inspectResult.indexStatusResult as Record<string, string>)?.indexingState || '-'} />
              <InspectField label="Crawled as" value={(inspectResult.indexStatusResult as Record<string, string>)?.crawledAs || '-'} />
              <InspectField
                label="Last crawl"
                value={(inspectResult.indexStatusResult as Record<string, string>)?.lastCrawlTime?.slice(0, 16).replace('T', ' ') || '-'}
              />
              {((inspectResult.richResultsResult as Record<string, unknown[]>)?.detectedItems?.length ?? 0) > 0 && (
                <div>
                  <div className="text-ink/40 text-[10px] uppercase mt-3 mb-1 tracking-wider">Rich Results</div>
                  {((inspectResult.richResultsResult as { detectedItems: { richResultType: string; items?: unknown[] }[] }).detectedItems).map((it, i) => (
                    <div key={i} className="flex items-center gap-2 py-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="text-ink">{it.richResultType}</span>
                      <span className="text-ink/40">({it.items?.length || 0})</span>
                    </div>
                  ))}
                </div>
              )}
              {typeof inspectResult.inspectionResultLink === 'string' && (
                <a
                  href={inspectResult.inspectionResultLink}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-gold hover:underline mt-2"
                >
                  Apri in GSC <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </Card>

        {/* Batch ping */}
        <Card title="Batch Indexing Ping (max 100 URL, quota 200/giorno condivisa)">
          <p className="text-xs text-ink/50 mb-2">
            Un URL per riga. Path relativi OK (es. <span className="font-mono">/koeln/ehrenfeld</span>). Forza il crawl.
            Pre-compilato con le pagine chiave (hub geo + leistungen + blog). <span className="text-gold">NON pingare le 688 spoke</span> (quota + doorway).
          </p>
          <textarea
            value={batchUrls}
            onChange={(e) => setBatchUrls(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 bg-elevated border border-line rounded-lg text-xs font-mono text-ink placeholder:text-ink/30 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/20"
            placeholder={'/koeln/ehrenfeld\n/leistungen/abnehmen\n...'}
          />
          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={handleBatchPing}
              disabled={batchRunning || !batchUrls.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-gold rounded-lg text-sm font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {batchRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ListChecks className="w-3.5 h-3.5" />}
              {batchRunning ? 'Pinging...' : 'Ping batch'}
            </button>
            <span className="text-xs text-ink/40">
              {batchUrls.split('\n').filter((u) => u.trim()).length} URL
            </span>
            {batchResult && (
              <span className={`text-xs font-semibold ${batchResult.failed === 0 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {batchResult.succeeded}/{batchResult.total} ok{batchResult.failed ? ` · ${batchResult.failed} falliti` : ''}
              </span>
            )}
          </div>
        </Card>

        {/* Action log */}
        {actionLog.length > 0 && (
          <Card title="Activity">
            <div className="space-y-1 text-xs">
              {actionLog.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-ink/50">
                  <span className="text-ink/40 font-mono">{a.time}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      a.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : a.type === 'error'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                          : a.type === 'warn'
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                            : 'bg-gold/10 text-gold border border-gold/30'
                    }`}
                  >
                    {a.type}
                  </span>
                  <span>{a.msg}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Top queries + pages */}
        <div className="grid lg:grid-cols-2 gap-4">
          <Card title="Top Query 7gg">
            <DataTable
              cols={['Query', 'Impr', 'Clicks', 'CTR', 'Pos']}
              rows={data.topQueries7d.slice(0, 15).map((q) => [
                q.query,
                fmtNum(q.impressions),
                q.clicks,
                `${q.ctr}%`,
                q.position,
              ])}
            />
          </Card>
          <Card title="Top Pages 7gg">
            <DataTable
              cols={['URL', 'Impr', 'Clicks', 'CTR', 'Pos']}
              rows={data.topPages7d.slice(0, 15).map((p) => [
                p.page?.replace(SITE, '') || '/',
                fmtNum(p.impressions),
                p.clicks,
                `${p.ctr}%`,
                p.position,
              ])}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

// === Components ===

function KPICard({
  label,
  value,
  subtitle,
  icon: Icon,
}: {
  label: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="bg-surface border border-line rounded-xl p-4 hover:border-gold-deep/40 transition">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">{label}</div>
        <Icon className="w-3.5 h-3.5 text-gold" />
      </div>
      <div className="text-2xl font-black text-ink tabular-nums">{value}</div>
      <div className="text-[10px] text-ink/40 mt-1">{subtitle}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line text-[11px] uppercase tracking-wider text-ink/50 font-semibold">
        {title}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Stat({
  label,
  value,
  bold,
  color,
}: {
  label: string;
  value: string | number;
  bold?: boolean;
  color?: 'red' | 'green';
}) {
  return (
    <div>
      <div className="text-[10px] uppercase text-ink/40 tracking-wider">{label}</div>
      <div
        className={`${bold ? 'font-bold' : ''} ${color === 'red' ? 'text-red-400' : color === 'green' ? 'text-emerald-400' : 'text-ink'}`}
      >
        {value}
      </div>
    </div>
  );
}

function DataTable({ cols, rows }: { cols: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto -mx-4">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-line">
            {cols.map((c, i) => (
              <th
                key={c}
                className={`px-4 py-2 text-[10px] uppercase tracking-wider text-ink/40 font-semibold ${i === 0 ? 'text-left' : 'text-right'}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-0 hover:bg-elevated/60">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-2 ${j === 0 ? 'text-left text-ink max-w-[280px] truncate' : 'text-right text-ink tabular-nums'}`}
                  title={j === 0 ? String(cell) : undefined}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InspectField({ label, value, status }: { label: string; value: string; status?: 'ok' | 'warn' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink/40 text-[10px] uppercase tracking-wider">{label}</span>
      <span
        className={`text-sm ${status === 'ok' ? 'text-emerald-400 font-semibold' : status === 'warn' ? 'text-yellow-400 font-semibold' : 'text-ink'}`}
      >
        {value}
      </span>
    </div>
  );
}

function TimeSeriesChart({
  data,
}: {
  data: { date: string; clicks: number; impressions: number; ctr: number; position: number }[];
}) {
  if (data.length === 0) return <div className="text-ink/40 text-sm py-8 text-center">No data</div>;
  const maxImpr = Math.max(...data.map((d) => d.impressions || 0));
  const maxClicks = Math.max(...data.map((d) => d.clicks || 0));

  const width = 100;
  const height = 40;
  const points = (values: number[], max: number) =>
    values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * width;
        const y = max > 0 ? height - (v / max) * height : height;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between mb-1 text-[10px] uppercase tracking-wider">
          <span className="text-gold font-semibold">Impressions</span>
          <span className="text-ink/40">Max {fmtNum(maxImpr)}</span>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16" preserveAspectRatio="none">
          <polyline
            points={points(
              data.map((d) => d.impressions),
              maxImpr
            )}
            fill="none"
            stroke="#e879f9"
            strokeWidth="0.7"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div>
        <div className="flex justify-between mb-1 text-[10px] uppercase tracking-wider">
          <span className="text-emerald-400 font-semibold">Clicks</span>
          <span className="text-ink/40">Max {fmtNum(maxClicks)}</span>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16" preserveAspectRatio="none">
          <polyline
            points={points(
              data.map((d) => d.clicks),
              maxClicks
            )}
            fill="none"
            stroke="#10B981"
            strokeWidth="0.7"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="text-[10px] text-ink/40 text-center">{data.length} giorni</div>
    </div>
  );
}
