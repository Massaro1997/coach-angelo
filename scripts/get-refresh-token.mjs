// Genera GSC_REFRESH_TOKEN per il progetto GCP dedicato coach-angelo-seo.
// Flow OAuth loopback: apre browser, tu clicchi consenso, token catturato
// in automatico e scritto in .env.local.
//
// Uso:  node scripts/get-refresh-token.mjs <CLIENT_ID> <CLIENT_SECRET>

import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { exec } from "node:child_process";

const [CLIENT_ID, CLIENT_SECRET] = process.argv.slice(2);
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Uso: node scripts/get-refresh-token.mjs <CLIENT_ID> <CLIENT_SECRET>");
  process.exit(1);
}

const PORT = 8586;
const REDIRECT = `http://localhost:${PORT}`;
const SCOPES = [
  "https://www.googleapis.com/auth/indexing",
  "https://www.googleapis.com/auth/webmasters",
].join(" ");

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent",
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get("code");
  if (!code) { res.end("Nessun code."); return; }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT,
      grant_type: "authorization_code",
    }),
  });
  const tok = await tokenRes.json();

  if (!tok.refresh_token) {
    res.end("ERRORE: nessun refresh_token. Riprova (revoca accesso app su myaccount.google.com/permissions e rilancia).");
    console.error("Risposta senza refresh_token:", tok);
    process.exit(1);
  }

  // scrive/aggiorna .env.local
  const envPath = join(dirname(fileURLToPath(import.meta.url)), "..", ".env.local");
  let env = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  const set = (k, v) => {
    const re = new RegExp(`^${k}=.*$`, "m");
    env = re.test(env) ? env.replace(re, `${k}=${v}`) : env.trimEnd() + `\n${k}=${v}\n`;
  };
  set("GOOGLE_OAUTH_CLIENT_ID", CLIENT_ID);
  set("GOOGLE_OAUTH_CLIENT_SECRET", CLIENT_SECRET);
  set("GSC_REFRESH_TOKEN", tok.refresh_token);
  writeFileSync(envPath, env);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("<h2>Fatto. Token salvato in .env.local — puoi chiudere questa scheda.</h2>");
  console.log("\nRefresh token salvato in .env.local");
  console.log("Ora: node scripts/push-indexing.mjs");
  setTimeout(() => process.exit(0), 500);
});

server.listen(PORT, () => {
  console.log("Apro il browser per il consenso Google...");
  console.log("Se non si apre, vai qui:\n" + authUrl + "\n");
  exec(`start "" "${authUrl.replace(/&/g, "^&")}"`);
});
