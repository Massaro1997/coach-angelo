// Generatore candidati page-forge — ora usa il modulo condiviso src/lib/stadtteil-intent.ts
// (single source of truth con la route Next). cluster = intent (vedi SEO_SCALE_REPORT.md).
import { writeFileSync } from "fs";
import { stadtteile } from "../src/lib/koeln-stadtteile";
import { intents, buildContent } from "../src/lib/stadtteil-intent";

const lines: string[] = [];
let total = 0;

for (const intent of intents) {
  for (const st of stadtteile) {
    const c = buildContent(st, intent);
    lines.push(
      JSON.stringify({
        slug: c.slug,
        url: c.url,
        title: c.metaTitle,
        text: c.fullText,
        datapoints: c.datapoints,
        cluster: intent.key, // cluster = intent: le 86 sorelle sono Stadtteile diversi
        internal_links_in: 2 + Math.min(2, st.neighbors.length),
        canonical: c.url,
        status: 200,
      })
    );
    total++;
  }
}

writeFileSync("scripts/candidates.jsonl", lines.join("\n"), "utf8");
console.log(`Scritti ${total} candidati (${intents.length} intent × ${stadtteile.length} Stadtteile) in scripts/candidates.jsonl`);
