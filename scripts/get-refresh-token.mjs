// Genera GSC_REFRESH_TOKEN per il progetto GCP dedicato coach-angelo-seo.
// Flow OAuth loopback: apre browser, tu clicchi consenso, token catturato
// in automatico e scritto in .env.local.
//
// Uso:  node scripts/get-refresh-token.mjs [<CLIENT_ID> <CLIENT_SECRET>]
// Senza argomenti li prende da .env.local (GOOGLE_OAUTH_CLIENT_ID / _SECRET).

import { createServer } from "node:http";
import { readFileSync, existsSync, openSync, ftruncateSync, writeSync, closeSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { exec } from "node:child_process";

const envPath = join(dirname(fileURLToPath(import.meta.url)), "..", ".env.local");
const daEnv = (k) => {
  if (!existsSync(envPath)) return undefined;
  const m = readFileSync(envPath, "utf8").match(new RegExp(`^${k}=(.*)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
};
const CLIENT_ID = process.argv[2] || daEnv("GOOGLE_OAUTH_CLIENT_ID");
const CLIENT_SECRET = process.argv[3] || daEnv("GOOGLE_OAUTH_CLIENT_SECRET");
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Uso: node scripts/get-refresh-token.mjs <CLIENT_ID> <CLIENT_SECRET>");
  process.exit(1);
}

const PORT = 8586;
const REDIRECT = `http://localhost:${PORT}`;
const SCOPES = [
  "https://www.googleapis.com/auth/indexing",
  "https://www.googleapis.com/auth/webmasters",
  // per verificare un dominio nuovo in Search Console via DNS (fitprimo.de, 18/10/2026)
  "https://www.googleapis.com/auth/siteverification",
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
  let env = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  const set = (k, v) => {
    const re = new RegExp(`^${k}=.*$`, "m");
    env = re.test(env) ? env.replace(re, `${k}=${v}`) : env.trimEnd() + `\n${k}=${v}\n`;
  };
  set("GOOGLE_OAUTH_CLIENT_ID", CLIENT_ID);
  set("GOOGLE_OAUTH_CLIENT_SECRET", CLIENT_SECRET);
  set("GSC_REFRESH_TOKEN", tok.refresh_token);
  // .env.local e' nascosto su Windows: writeFileSync ('w') fallisce con EPERM,
  // 'r+' funziona. Quindi apro, svuoto e scrivo a mano.
  const fd = openSync(envPath, existsSync(envPath) ? "r+" : "w");
  ftruncateSync(fd, 0);
  writeSync(fd, env, 0);
  closeSync(fd);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("<h2>Fatto. Token salvato in .env.local — puoi chiudere questa scheda.</h2>");
  console.log("\nRefresh token salvato in .env.local");
  console.log("Ora: node scripts/push-indexing.mjs");
  setTimeout(() => process.exit(0), 500);
});

server.listen(PORT, () => {
  console.log("Apro il browser per il consenso Google...");
  console.log("Se non si apre, vai qui:\n" + authUrl + "\n");
  // Tra virgolette cmd non vuole ^ davanti a &: con ^& Google risponde "400".
  exec(`start "" "${authUrl}"`);
});
