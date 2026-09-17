import { google } from 'googleapis';
import fs from 'fs';
const ROOT = process.cwd();
const env = {};
for (const line of fs.readFileSync(`${ROOT}/.env.local`, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=["']?(.*?)["']?\s*$/);
  if (m) env[m[1]] = m[2];
}
const oauth2 = new google.auth.OAuth2(env.GOOGLE_OAUTH_CLIENT_ID, env.GOOGLE_OAUTH_CLIENT_SECRET);
oauth2.setCredentials({ refresh_token: env.GSC_REFRESH_TOKEN });
const wm = google.webmasters({ version: 'v3', auth: oauth2 });
const property = env.GSC_PROPERTY;
const today = new Date();
const fmt = d => d.toISOString().slice(0, 10);
const end = fmt(new Date(today - 2 * 864e5));
const s28 = fmt(new Date(today - 30 * 864e5));
const ps = fmt(new Date(today - 58 * 864e5)), pe = fmt(new Date(today - 31 * 864e5));
const tot = async (s, e) => (await wm.searchanalytics.query({ siteUrl: property, requestBody: { startDate: s, endDate: e, dimensions: [] } })).data.rows?.[0] || {};
const cur = await tot(s28, end), prev = await tot(ps, pe);
console.log('=== TOTALI 28gg ===');
console.log(`Corrente (${s28}..${end}): click=${cur.clicks||0} impr=${cur.impressions||0} ctr=${((cur.ctr||0)*100).toFixed(2)}% pos=${(cur.position||0).toFixed(1)}`);
console.log(`Precedente: click=${prev.clicks||0} impr=${prev.impressions||0} pos=${(prev.position||0).toFixed(1)}`);
const daily = await wm.searchanalytics.query({ siteUrl: property, requestBody: { startDate: fmt(new Date(today-16*864e5)), endDate: end, dimensions: ['date'] } });
console.log('\n=== TREND 14gg ===');
for (const r of daily.data.rows || []) console.log(`${r.keys[0]}: click=${r.clicks} impr=${r.impressions}`);
const q = await wm.searchanalytics.query({ siteUrl: property, requestBody: { startDate: s28, endDate: end, dimensions: ['query'], rowLimit: 15 } });
console.log('\n=== TOP 15 QUERY ===');
for (const r of q.data.rows || []) console.log(`${r.clicks}c ${r.impressions}i pos${r.position.toFixed(1)} | ${r.keys[0]}`);
const p = await wm.searchanalytics.query({ siteUrl: property, requestBody: { startDate: s28, endDate: end, dimensions: ['page'], rowLimit: 15 } });
console.log('\n=== TOP 15 PAGINE ===');
for (const r of p.data.rows || []) console.log(`${r.clicks}c ${r.impressions}i pos${r.position.toFixed(1)} | ${r.keys[0].replace('https://www.angelocoach.com','')}`);
try {
  const st = await wm.sitemaps.list({ siteUrl: property });
  console.log('\n=== SITEMAP ===');
  for (const sm of st.data.sitemap || []) { const c = sm.contents?.[0]||{}; console.log(`${sm.path} submitted=${c.submitted||0} indexed=${c.indexed||0} lastDL=${sm.lastDownloaded||'?'}`); }
} catch(e){ console.log('sitemap err', e.message); }
