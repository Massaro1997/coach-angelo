import { google } from 'googleapis';
import fs from 'fs';
const env = {};
for (const l of fs.readFileSync('.env.local','utf8').split('\n')) { const m=l.match(/^([A-Z_]+)=["']?(.*?)["']?\s*$/); if(m) env[m[1]]=m[2]; }
const o = new google.auth.OAuth2(env.GOOGLE_OAUTH_CLIENT_ID, env.GOOGLE_OAUTH_CLIENT_SECRET);
o.setCredentials({ refresh_token: env.GSC_REFRESH_TOKEN });
const wm = google.webmasters({ version:'v3', auth:o });
const property = env.GSC_PROPERTY;
const sm = 'https://www.angelocoach.com/sitemap.xml';
await wm.sitemaps.submit({ siteUrl: property, feedpath: sm });
console.log('Sitemap risottomessa:', sm);
const st = await wm.sitemaps.get({ siteUrl: property, feedpath: sm });
const c = st.data.contents?.[0]||{};
console.log(`submitted=${c.submitted||0} indexed=${c.indexed||0} lastDL=${st.data.lastDownloaded||'?'} errors=${st.data.errors||0}`);
