// Generatore testo data-driven per le pagine /personal-trainer-koeln/[stadtteil]
// Ogni frase variabile deriva da un FATTO del dataset (no spinning, no sinonimi a rotazione).
// Usato sia dalla pagina Next sia dallo script di validazione forge.py (candidates).

import { Stadtteil, getNeighbors, density } from "./koeln-stadtteile";

export interface StadtteilContent {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  trainingTitle: string;
  trainingText: string;
  spotsList: string[];
  neighborsTitle: string;
  neighborsText: string;
  faq: { q: string; a: string }[];
  datapoints: string[];
}

function sizeTier(st: Stadtteil): "gross" | "mittel" | "klein" {
  if (st.einwohner >= 20000) return "gross";
  if (st.einwohner >= 8000) return "mittel";
  return "klein";
}

function densityPhrase(st: Stadtteil): string {
  const d = density(st);
  if (d >= 9000) {
    return `Mit rund ${d.toLocaleString("de-DE")} Einwohnern pro km² gehört ${st.name} zu den am dichtesten besiedelten Vierteln der Stadt. Die Wege sind kurz, ein Studio oder eine Trainingsfläche ist nie weit entfernt.`;
  }
  if (d >= 4000) {
    return `${st.name} hat eine Bevölkerungsdichte von etwa ${d.toLocaleString("de-DE")} Einwohnern pro km², ein klassisches Wohnviertel mit guter Infrastruktur für dein Training.`;
  }
  return `Mit nur rund ${d.toLocaleString("de-DE")} Einwohnern pro km² ist ${st.name} eines der grüneren, ruhigeren Viertel Kölns. Ideal, wenn du Training an der frischen Luft bevorzugst.`;
}

export function buildStadtteilContent(st: Stadtteil): StadtteilContent {
  const d = density(st);
  const tier = sizeTier(st);
  const neighbors = getNeighbors(st);
  const rhein = st.rechtsrheinisch ? "rechtsrheinisch" : "linksrheinisch";

  const introParts: string[] = [];
  introParts.push(
    `${st.name} liegt ${rhein} im Stadtbezirk ${st.bezirk} und zählt ${st.einwohner.toLocaleString("de-DE")} Einwohner auf ${st.flaecheKm2.toLocaleString("de-DE")} km².`
  );
  introParts.push(densityPhrase(st));
  if (tier === "gross") {
    introParts.push(
      `Als einer der größeren Stadtteile Kölns ist die Nachfrage nach individuellem Coaching in ${st.name} hoch: viele Berufstätige, wenig Zeit, klare Ziele. Genau dafür ist mein Training gemacht.`
    );
  } else if (tier === "klein") {
    introParts.push(
      `Gerade in kleineren Stadtteilen wie ${st.name} gibt es kaum spezialisierte Coaches vor Ort. Ich trainiere mit dir im Studio in Köln oder komplett online, du entscheidest.`
    );
  } else {
    introParts.push(
      `Ich betreue Kunden aus ${st.name} sowohl 1-zu-1 im Studio als auch über mein Online Coaching mit wöchentlichen Check-ins.`
    );
  }

  let trainingText: string;
  if (st.spots.length > 0) {
    trainingText = `Wer in ${st.name} wohnt, hat echte Möglichkeiten für Outdoor-Einheiten direkt vor der Tür. Diese Orte nutze ich gerne für Conditioning, Sprints oder Bodyweight-Blöcke als Ergänzung zum Krafttraining:`;
  } else {
    trainingText = `${st.name} hat keine großen Parkanlagen direkt im Viertel. Kein Problem: das Krafttraining findet ohnehin im Studio statt, und für die Ernährung und Planung brauchst du nur dein Handy. Viele meiner Kunden aus ${st.name} laufen über das Online Coaching mit wöchentlichen Check-ins.`;
  }

  const neighborsText = `Ich betreue auch Kunden in den angrenzenden Stadtteilen: ${neighbors
    .map((n) => `${n.name} (${n.einwohner.toLocaleString("de-DE")} Einwohner)`)
    .join(", ")}. Wenn du in einem dieser Viertel wohnst, gilt dasselbe Angebot: kostenlose Erstberatung, dann ein Plan, der zu deinem Alltag passt.`;

  const faq: { q: string; a: string }[] = [
    {
      q: `Was kostet ein Personal Trainer in Köln-${st.name}?`,
      a: `Eine 1-zu-1 Stunde mit mir kostet 50€. Das Online Coaching mit individuellem Trainingsplan, Ernährungsberatung und wöchentlichen Check-ins beginnt bei 150€ im Monat. Die Erstberatung ist immer kostenlos.`,
    },
    {
      q: `Trainierst du auch direkt in ${st.name}?`,
      a:
        st.spots.length > 0
          ? `Ja. Für Outdoor-Einheiten nutze ich in ${st.name} unter anderem ${st.spots[0]}. Krafttraining findet im Studio statt, die Planung läuft über das Online Coaching.`
          : `Das Krafttraining findet im Studio in Köln statt. Aus ${st.name} (${st.bezirk}) bist du schnell dort, alternativ betreue ich dich komplett online mit wöchentlichen Check-ins.`,
    },
    {
      q: `Für wen lohnt sich Coaching in ${st.name}?`,
      a: `Für alle, die ein konkretes Ziel haben: Abnehmen, Muskelaufbau oder Wettkampfvorbereitung. Bei ${st.einwohner.toLocaleString("de-DE")} Einwohnern in ${st.name} betreue ich Anfänger genauso wie erfahrene Athleten. Entscheidend ist nicht dein Level, sondern dass du dranbleibst.`,
    },
  ];

  const datapoints = [
    `${st.einwohner} Einwohner`,
    `${st.flaecheKm2} km²`,
    `${d} Einwohner/km²`,
    `Stadtbezirk ${st.bezirk}`,
    rhein,
    ...st.spots,
    ...neighbors.map((n) => n.name),
  ];

  return {
    h1: `Personal Trainer in Köln-${st.name}`,
    metaTitle: `Personal Trainer Köln-${st.name} | Coach Angelo`,
    metaDescription: `Personal Training und Online Coaching in Köln-${st.name} (${st.bezirk}). WABBA Athlet, kostenlose Erstberatung, Antwort in 24h. Abnehmen, Muskelaufbau, Wettkampf.`,
    intro: introParts.join(" "),
    trainingTitle:
      st.spots.length > 0
        ? `Training in ${st.name}: Studio und Outdoor`
        : `So trainieren meine Kunden aus ${st.name}`,
    trainingText,
    spotsList: st.spots,
    neighborsTitle: `Auch in der Nähe von ${st.name}`,
    neighborsText,
    faq,
    datapoints,
  };
}

// Testo completo visibile della pagina, per la validazione SimHash/boilerplate di forge.py
export function fullVisibleText(st: Stadtteil): string {
  const c = buildStadtteilContent(st);
  return [
    c.h1,
    c.intro,
    c.trainingTitle,
    c.trainingText,
    c.spotsList.join(", "),
    c.neighborsTitle,
    c.neighborsText,
    ...c.faq.flatMap((f) => [f.q, f.a]),
  ].join("\n");
}
