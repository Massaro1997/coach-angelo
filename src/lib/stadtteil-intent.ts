// Single source of truth per l'asse SEO Stadtteil × Intent.
// Usato dalla route Next (/personal-trainer-koeln/[stadtteil]/[intent]) E dal generatore forge.
// Strategia anti near-duplicate: testo dominato dai dati reali del quartiere (vedi SEO_SCALE_REPORT.md).

import { stadtteile, Stadtteil, density, getStadtteil } from "./koeln-stadtteile";

export const siteUrl = "https://www.angelocoach.com";

export interface Intent {
  key: string;
  label: string;
  hook: string;
  price?: string;
  metaIntent: string; // frase intent per meta description
}

export const intents: Intent[] = [
  { key: "personal-training", label: "Personal Training", price: "50€/Std", metaIntent: "1-zu-1 Personal Training", hook: "1-zu-1 Krafttraining mit Plan und Progression, 50€ pro Stunde, zwei feste Termine pro Woche im Studio mit voller Technik-Korrektur." },
  { key: "abnehmen", label: "Abnehmen", metaIntent: "Abnehmen mit Personal Trainer", hook: "Abnehmen mit Krafttraining statt Crash-Diät: Kaloriendefizit, Ernährungsplan und Muskelschutz, realistisch ein bis zwei Kilo Fett pro Monat ohne Jojo." },
  { key: "muskelaufbau", label: "Muskelaufbau", metaIntent: "Muskelaufbau Coaching", hook: "Muskelaufbau nach Wettkampf-Prinzipien vom WABBA-Athleten: Grundübungen, progressive Überlastung, Eiweiß-Zielwert und Aufbauphase über Monate." },
  { key: "online-coaching", label: "Online Coaching", price: "ab 150€/Monat", metaIntent: "Online Coaching", hook: "Online Coaching ab 150€ im Monat: Trainingsplan per App, wöchentliche Video-Check-ins und Ernährungssteuerung, komplett standortunabhängig." },
  { key: "ernaehrungsberatung", label: "Ernährungsberatung", metaIntent: "Ernährungsberatung", hook: "Ernährungsberatung ohne Verbotslisten: Makro-Verteilung, Wochenplan und Einkaufsliste, abgestimmt auf dein Training und deinen Alltag." },
  { key: "rueckentraining", label: "Rückentraining", metaIntent: "Rückentraining gegen Schreibtisch-Beschwerden", hook: "Rückentraining gegen Schreibtisch-Beschwerden: Rumpf, hintere Kette und Haltung, zwei gezielte Einheiten pro Woche statt Schmerzmittel." },
  { key: "athletiktraining", label: "Athletiktraining", metaIntent: "Athletiktraining", hook: "Athletiktraining für Hobbysportler: Schnelligkeit, Sprungkraft und Stabilität, mit Sprints und Plyometrie auf realen Strecken im Stadtteil." },
  { key: "ems-alternative", label: "Krafttraining statt EMS", metaIntent: "EMS-Alternative", hook: "Ehrliche EMS-Alternative: echtes Krafttraining bringt langfristig mehr als jede Stromreiz-Sitzung, ohne Abo-Falle und mit messbarer Kraft." },
];

export function getIntent(key: string): Intent | undefined {
  return intents.find((i) => i.key === key);
}

function de(n: number): string {
  return n.toLocaleString("de-DE");
}

export function rankInBezirk(st: Stadtteil): { rank: number; total: number } {
  const peers = stadtteile.filter((s) => s.bezirk === st.bezirk).sort((a, b) => b.einwohner - a.einwohner);
  return { rank: peers.findIndex((s) => s.slug === st.slug) + 1, total: peers.length };
}
export function densityRankCity(st: Stadtteil): { rank: number; total: number } {
  const sorted = [...stadtteile].sort((a, b) => density(b) - density(a));
  return { rank: sorted.findIndex((s) => s.slug === st.slug) + 1, total: sorted.length };
}
function neighborFacts(st: Stadtteil) {
  const myD = density(st);
  return st.neighbors
    .map((slug) => getStadtteil(slug))
    .filter((s): s is Stadtteil => Boolean(s))
    .map((n) => ({ name: n.name, slug: n.slug, einwohner: n.einwohner, dichte: density(n), deltaPct: Math.round(((density(n) - myD) / myD) * 100) }));
}
function neighborSpots(st: Stadtteil) {
  return st.neighbors
    .map((slug) => getStadtteil(slug))
    .filter((s): s is Stadtteil => Boolean(s))
    .filter((n) => n.spots.length > 0)
    .map((n) => ({ name: n.name, spots: n.spots }));
}

export interface IntentContent {
  slug: string;
  url: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  paragraphs: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  datapoints: string[];
  fullText: string;
}

export function buildContent(st: Stadtteil, intent: Intent): IntentContent {
  const d = density(st);
  const rb = rankInBezirk(st);
  const dr = densityRankCity(st);
  const ufer = st.rechtsrheinisch ? "rechtsrheinischen" : "linksrheinischen";
  const nb = neighborFacts(st);
  const nbSpots = neighborSpots(st);
  const ownSpots = st.spots;

  const idBody =
    `${st.name} ist ein Stadtteil im Kölner Stadtbezirk ${st.bezirk} auf der ${ufer} Rheinseite. ` +
    `Hier leben ${de(st.einwohner)} Menschen auf ${st.flaecheKm2} km², das ergibt eine Bevölkerungsdichte von ` +
    `${de(d)} Einwohnern pro Quadratkilometer. ` +
    `Im Bezirk ${st.bezirk} ist ${st.name} der ${rb.rank}. von ${rb.total} Stadtteilen nach Einwohnerzahl` +
    `${rb.rank === 1 ? " und damit der bevölkerungsreichste" : ""}. ` +
    `Stadtweit liegt ${st.name} auf Platz ${dr.rank} von ${dr.total} bei der Dichte.`;

  const nbList = nb
    .map((n) => `${n.name} (${de(n.einwohner)} Einwohner, ${de(n.dichte)}/km², ${n.deltaPct === 0 ? "gleiche Dichte" : n.deltaPct > 0 ? `${n.deltaPct}% dichter` : `${Math.abs(n.deltaPct)}% lockerer`})`)
    .join(", ");
  const nbBody =
    nb.length > 0
      ? `${st.name} grenzt an ${nb.length} Stadtteile: ${nbList}. Das Trainingsgebiet rund um ${st.name} umfasst damit weit mehr als nur ein Veedel.`
      : `${st.name} liegt am Rand des Stadtgebiets und grenzt nur an wenige Nachbarstadtteile.`;

  let outdoorBody: string;
  if (ownSpots.length > 0) {
    outdoorBody =
      `Für Outdoor-Einheiten nutze ich in ${st.name} konkret: ${ownSpots.join(", ")}. Das sind ${ownSpots.length} reale Trainingsflächen direkt im Stadtteil` +
      (nbSpots.length ? `, dazu Flächen in den Nachbarschaften wie ${nbSpots.slice(0, 2).map((n) => `${n.spots[0]} in ${n.name}`).join(" und ")}.` : ".");
  } else if (nbSpots.length > 0) {
    outdoorBody =
      `${st.name} hat keine eigene große Grünfläche, aber die Nachbarschaft liefert: ${nbSpots.slice(0, 3).map((n) => `${n.spots.join(" und ")} in ${n.name}`).join(", ")}. Für Conditioning trainieren wir dort, das Krafttraining läuft im Studio.`;
  } else {
    outdoorBody = `${st.name} ist dicht bebaut und liegt abseits der großen Parks. Für ${st.name} setze ich auf Studio-Krafttraining plus Online-Steuerung des Plans.`;
  }

  const intentBody =
    `Was ${intent.label} in ${st.name} angeht: ${intent.hook} ` +
    `Egal ob du an der Grenze zu ${nb[0]?.name ?? "einem Nachbarstadtteil"} wohnst oder mitten in ${st.name}, der Plan wird auf deine Ausgangslage gebaut.`;

  const slug = `${intent.key}-koeln-${st.slug}`;
  const url = `${siteUrl}/koeln/${st.slug}/${intent.key}`;
  const h1 = `${intent.label} in Köln-${st.name}`;
  const intro = `${intent.label} mit Coach Angelo in ${st.name} (Bezirk ${st.bezirk}, ${de(st.einwohner)} Einwohner). Persönlich, ehrlich, mit messbarer Progression.`;

  const faq = [
    {
      q: `Was kostet ${intent.label} in Köln-${st.name}?`,
      a: intent.price
        ? `${intent.label} startet bei ${intent.price}. Die Erstberatung für Kunden aus ${st.name} ist immer kostenlos.`
        : `Eine 1-zu-1 Stunde kostet 50€, Online Coaching beginnt bei 150€ im Monat. Für ${st.name} ist die Erstberatung kostenlos.`,
    },
    {
      q: `Trainierst du ${intent.label} direkt in ${st.name}?`,
      a:
        ownSpots.length > 0
          ? `Für Outdoor-Anteile ja, in ${st.name} nutze ich ${ownSpots[0]}. Das Krafttraining läuft im Studio, die Steuerung online.`
          : `Das Krafttraining findet im Studio statt, aus ${st.name} (${st.bezirk}) bist du schnell dort. Alternativ läuft alles online mit wöchentlichen Check-ins.`,
    },
  ];

  const fullText = [h1, intro, idBody, nbBody, outdoorBody, intentBody, ...faq.flatMap((f) => [f.q, f.a])].join("\n\n");

  const datapoints = Array.from(
    new Set([
      `${de(st.einwohner)} Einwohner`,
      `${st.flaecheKm2} km²`,
      `${de(d)} Einwohner/km²`,
      `Bezirk ${st.bezirk}`,
      `Dichte-Platz ${dr.rank}/${dr.total}`,
      `${rb.rank}. von ${rb.total} im Bezirk`,
      ...nb.slice(0, 3).map((n) => `Nachbar ${n.name} ${de(n.einwohner)}`),
      ...ownSpots,
      ...nbSpots.slice(0, 2).map((n) => `${n.spots[0]} (${n.name})`),
    ])
  );

  return {
    slug,
    url,
    h1,
    metaTitle: `${intent.label} in Köln-${st.name} | Coach Angelo`,
    metaDescription: `${intent.metaIntent} in Köln-${st.name} (${st.bezirk}, ${de(st.einwohner)} Einwohner). WABBA Athlet, kostenlose Erstberatung, Antwort in 24h.`,
    intro,
    paragraphs: [
      { title: `${st.name} in Zahlen`, body: idBody },
      { title: `Trainingsgebiet rund um ${st.name}`, body: nbBody },
      { title: `Wo wir trainieren`, body: outdoorBody },
      { title: `${intent.label} in ${st.name}`, body: intentBody },
    ],
    faq,
    datapoints,
    fullText,
  };
}

// Tutte le coppie (st, intent) — usato da generateStaticParams e sitemap
export function allStadtteilIntentParams() {
  const out: { stadtteil: string; intent: string }[] = [];
  for (const st of stadtteile) {
    for (const intent of intents) {
      out.push({ stadtteil: st.slug, intent: intent.key });
    }
  }
  return out;
}

// 2 vicini con lo stesso intent (per internal linking spoke→spoke)
export function neighborIntentLinks(st: Stadtteil, intent: Intent) {
  return st.neighbors
    .map((slug) => getStadtteil(slug))
    .filter((s): s is Stadtteil => Boolean(s))
    .slice(0, 3)
    .map((n) => ({ name: n.name, href: `/personal-trainer-koeln/${n.slug}/${intent.key}` }));
}
