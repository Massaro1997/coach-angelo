// Push URL della sitemap alla Google Indexing API, 200/giorno (quota).
// Stato persistito in scripts/indexing-state.json: rilanciare ogni giorno
// finché "remaining: 0". Ordine di priorità: core → leistungen → bezirk →
// stadtteil hub → faq → blog → spoke (stadtteil × intent).
//
// Uso:  node scripts/push-indexing.mjs [--limit 200] [--dry]

import { google } from "googleapis";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_FILE = join(__dirname, "indexing-state.json");
const SITEMAP_URL = "https://www.angelocoach.com/sitemap.xml";

// --- env da .env.local (stesse var di src/lib/gsc-client.ts) ---
const envFile = join(__dirname, "..", ".env.local");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=["']?([^"'\r\n]+)["']?$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GSC_REFRESH_TOKEN } = process.env;
if (!GOOGLE_OAUTH_CLIENT_ID || !GOOGLE_OAUTH_CLIENT_SECRET || !GSC_REFRESH_TOKEN) {
  console.error("Mancano GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GSC_REFRESH_TOKEN in .env.local");
  process.exit(1);
}

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const LIMIT = Number(args[args.indexOf("--limit") + 1]) || 200;

// --- ordina per priorità di crawl ---
function priority(url) {
  const p = new URL(url).pathname;
  if (p === "/" || /^\/(servizi|chi-sono|contatti|testimonianze|personal-trainer-koeln|blog|fitness-faq)\/?$/.test(p)) return 0;
  if (p.startsWith("/leistungen/")) return 1;
  if (/^\/personal-trainer-koeln\/[^/]+$/.test(p)) return 2;
  if (/^\/koeln\/[^/]+$/.test(p)) return 3; // hub stadtteil
  if (p.startsWith("/fitness-faq/")) return 4;
  if (p.startsWith("/blog/")) return 5;
  if (/^\/koeln\/[^/]+\/[^/]+$/.test(p)) return 6; // spoke
  return 7;
}

async function main() {
  const xml = await (await fetch(SITEMAP_URL)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  urls.sort((a, b) => priority(a) - priority(b));
  console.log(`Sitemap: ${urls.length} URL`);

  const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, "utf8")) : { pushed: {} };
  const todo = urls.filter((u) => !state.pushed[u]);
  const batch = todo.slice(0, LIMIT);
  console.log(`Già pushati: ${urls.length - todo.length} · Da fare: ${todo.length} · Batch oggi: ${batch.length}${DRY ? " (DRY RUN)" : ""}`);

  if (DRY) {
    batch.slice(0, 10).forEach((u) => console.log("  →", u));
    return;
  }

  const auth = new google.auth.OAuth2(GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET);
  auth.setCredentials({ refresh_token: GSC_REFRESH_TOKEN });
  const indexing = google.indexing({ version: "v3", auth });

  let ok = 0, fail = 0;
  for (const url of batch) {
    try {
      await indexing.urlNotifications.publish({ requestBody: { url, type: "URL_UPDATED" } });
      state.pushed[url] = new Date().toISOString().slice(0, 10);
      ok++;
      if (ok % 25 === 0) {
        console.log(`  ${ok}/${batch.length}...`);
        writeFileSync(STATE_FILE, JSON.stringify(state, null, 1));
      }
    } catch (e) {
      const code = e?.response?.status || e.code;
      if (code === 429) { console.log("Quota esaurita (429), stop. Rilancia domani."); break; }
      console.error(`  FAIL ${url}: ${code} ${e.message?.slice(0, 80)}`);
      fail++;
      if (fail > 5) { console.error("Troppi errori, stop."); break; }
    }
  }
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 1));
  const remaining = urls.length - Object.keys(state.pushed).length;
  console.log(`\nPushati oggi: ${ok} · Falliti: ${fail} · Remaining: ${remaining}`);
  if (remaining > 0) console.log("Rilancia domani: node scripts/push-indexing.mjs");
}

main().catch((e) => { console.error(e); process.exit(1); });
