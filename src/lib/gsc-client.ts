// GSC + Indexing API client. Uses user OAuth refresh token (no service account
// due to Google bug 2026-05 "email not found" on add-user UI).
// Shared OAuth client from GCP project fast-risarcimenti — token acts as
// massarocalogero1997@gmail.com which owns this GSC property too.

import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GSC_REFRESH_TOKEN;
// NB: property registrata in GSC come URL-prefix, NON Domain (sc-domain:).
const PROPERTY = process.env.GSC_PROPERTY || 'https://www.angelocoach.com/';

function getAuthClient() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Missing GSC OAuth env vars (CLIENT_ID/SECRET/REFRESH_TOKEN)');
  }
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return oauth2Client;
}

export function getSearchConsole() {
  return google.searchconsole({ version: 'v1', auth: getAuthClient() });
}

export function getIndexing() {
  return google.indexing({ version: 'v3', auth: getAuthClient() });
}

export const GSC_PROPERTY = PROPERTY;

// === High-level helpers ===

export async function listSitemaps() {
  const sc = getSearchConsole();
  const res = await sc.sitemaps.list({ siteUrl: GSC_PROPERTY });
  return res.data.sitemap || [];
}

export async function submitSitemap(sitemapUrl: string) {
  const sc = getSearchConsole();
  await sc.sitemaps.submit({ siteUrl: GSC_PROPERTY, feedpath: sitemapUrl });
  return { ok: true, sitemap: sitemapUrl };
}

export async function inspectUrl(inspectionUrl: string) {
  const sc = getSearchConsole();
  const res = await sc.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl,
      siteUrl: GSC_PROPERTY,
      languageCode: 'de-DE',
    },
  });
  return res.data.inspectionResult;
}

export async function searchAnalytics(opts: {
  startDate: string; // YYYY-MM-DD
  endDate: string;
  dimensions?: ('query' | 'page' | 'country' | 'device' | 'searchAppearance' | 'date')[];
  rowLimit?: number;
  searchType?: 'web' | 'image' | 'video' | 'news';
  filters?: { dimension: string; operator: string; expression: string }[];
}) {
  const sc = getSearchConsole();
  const res = await sc.searchanalytics.query({
    siteUrl: GSC_PROPERTY,
    requestBody: {
      startDate: opts.startDate,
      endDate: opts.endDate,
      dimensions: opts.dimensions || ['query'],
      rowLimit: opts.rowLimit || 100,
      type: opts.searchType || 'web',
      ...(opts.filters && opts.filters.length > 0
        ? { dimensionFilterGroups: [{ filters: opts.filters }] }
        : {}),
    },
  });
  return res.data.rows || [];
}

export async function pingIndexing(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') {
  const idx = getIndexing();
  const res = await idx.urlNotifications.publish({
    requestBody: { url, type },
  });
  return res.data;
}

// Sitemap status helpers (issues, warnings, last submitted)
export async function getSitemapStatus(sitemapUrl: string) {
  const sc = getSearchConsole();
  const res = await sc.sitemaps.get({ siteUrl: GSC_PROPERTY, feedpath: sitemapUrl });
  return res.data;
}
