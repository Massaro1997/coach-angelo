// Genera candidates.jsonl per la validazione page-forge (forge.py) — versione Bezirk
import { writeFileSync } from "fs";
import { bezirke, bezirkFullText, bezirkStats } from "../src/lib/bezirk-content";

const siteUrl = "https://www.angelocoach.com";

const lines = bezirke.map((b) => {
  const stats = bezirkStats(b);
  return JSON.stringify({
    slug: b.slug,
    url: `${siteUrl}/personal-trainer-koeln/${b.slug}`,
    title: `Personal Trainer Köln-${b.name} | Coach Angelo`,
    text: bezirkFullText(b),
    datapoints: [
      `${stats.count} Stadtteile`,
      `${stats.einwohner} Einwohner`,
      `${stats.flaeche} km²`,
      `größter Stadtteil ${stats.biggest.name}`,
      ...stats.spots,
    ],
    internal_links_in: 1 + (bezirke.length - 1), // hub + tutti gli altri bezirk
    canonical: `${siteUrl}/personal-trainer-koeln/${b.slug}`,
    status: 200,
  });
});

writeFileSync("scripts/candidates.jsonl", lines.join("\n"), "utf8");
console.log(`Scritti ${lines.length} candidati Bezirk in scripts/candidates.jsonl`);
