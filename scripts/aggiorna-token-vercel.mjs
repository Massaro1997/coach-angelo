// Porta GSC_REFRESH_TOKEN da .env.local su Vercel (Production) e ripubblica
// la produzione attuale con `vercel redeploy`: stesso codice gia' online,
// variabili nuove. Non pubblica il lavoro non committato della cartella.
//
// Uso:  node scripts/aggiorna-token-vercel.mjs
// (dopo `node scripts/get-refresh-token.mjs`)

import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = readFileSync(join(root, ".env.local"), "utf8");
const leggi = (k) => {
  const m = file.match(new RegExp(`^${k}=(.*)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
};

const token = leggi("GSC_REFRESH_TOKEN");
if (!token) {
  console.error("GSC_REFRESH_TOKEN mancante in .env.local: lancia prima get-refresh-token.mjs");
  process.exit(1);
}

// Prima di mandarlo su Vercel, controllo che Google lo accetti.
const prova = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: leggi("GOOGLE_OAUTH_CLIENT_ID"),
    client_secret: leggi("GOOGLE_OAUTH_CLIENT_SECRET"),
    refresh_token: token,
    grant_type: "refresh_token",
  }),
});
if (!prova.ok) {
  console.error(`Google rifiuta il token (${prova.status}): rigeneralo con get-refresh-token.mjs`);
  process.exit(1);
}
console.log("Token valido.");

const vercel = (args, input) => {
  const r = spawnSync("npx", ["vercel", ...args], {
    cwd: root,
    input,
    stdio: [input === undefined ? "inherit" : "pipe", "inherit", "inherit"],
    shell: true,
  });
  if (r.status !== 0) {
    console.error(`vercel ${args.join(" ")} fallito (codice ${r.status})`);
    process.exit(1);
  }
};

console.log("\nAggiorno GSC_REFRESH_TOKEN su Vercel (Production)...");
vercel(["env", "add", "GSC_REFRESH_TOKEN", "production", "--force"], token);

console.log("\nRipubblico la produzione attuale con il token nuovo...");
vercel(["redeploy", "www.angelocoach.com", "--target", "production"]);

console.log("\nFatto: token nuovo su Vercel e produzione ripubblicata.");
