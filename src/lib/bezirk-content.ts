// Contenuto per le 9 pagine Stadtbezirk — ogni intro è scritta a mano su fatti reali del Bezirk.
// I dati tabellari (Stadtteile, Einwohner, spots) vengono dal dataset koeln-stadtteile.ts

import { stadtteile, Stadtteil, density } from "./koeln-stadtteile";

export interface Bezirk {
  slug: string;
  name: string;
  intro: string[]; // paragrafi unici, scritti a mano
  outdoorIntro: string;
  faq: { q: string; a: string }[];
}

export const bezirke: Bezirk[] = [
  {
    slug: "innenstadt",
    name: "Innenstadt",
    intro: [
      "Die Kölner Innenstadt ist der dichteste Fleck der Stadt: fünf Stadtteile zwischen Ringen, Rheinufer und Deutzer Brücke, voll mit Büros, Agenturen und Menschen, die den ganzen Tag sitzen. Genau diese Menschen trainiere ich am häufigsten: Rückenschmerzen vom Schreibtisch, keine Zeit, aber ein klares Ziel vor Augen.",
      "Wer in Altstadt oder Neustadt wohnt, hat das Rheinufer und den Inneren Grüngürtel direkt vor der Tür. Für Conditioning-Einheiten gibt es in Köln kaum bessere Strecken. Das Krafttraining machen wir im Studio, die Planung läuft digital, und deine Mittagspause reicht für einen Check-in.",
    ],
    outdoorIntro:
      "Rheinufer, Volksgarten, Stadtgarten, Rheinpark in Deutz: die Innenstadt hat mehr Trainingsfläche, als die meisten denken.",
    faq: [
      {
        q: "Trainierst du auch in der Mittagspause?",
        a: "Ja. Viele meiner Kunden aus der Innenstadt trainieren zwischen 12 und 14 Uhr oder direkt nach Büroschluss. Eine Stunde reicht, wenn der Plan stimmt.",
      },
      {
        q: "Ich sitze 8 Stunden am Schreibtisch und habe Rückenschmerzen. Was tun?",
        a: "Krafttraining ist die beste Versicherung gegen den Bürorücken. Wir bauen gezielt die Rumpf- und Rückenmuskulatur auf und korrigieren die Haltung. Keine Wunderübungen, sondern konsequentes Training zweimal pro Woche.",
      },
    ],
  },
  {
    slug: "rodenkirchen",
    name: "Rodenkirchen",
    intro: [
      "Der Bezirk Rodenkirchen ist der Süden Kölns am linken Rheinufer: vom urbanen Bayenthal über das Villenviertel Marienburg bis zu den Rheindörfern Weiß und Sürth. Hier wohnen viele Familien und Berufstätige, die Wert auf Qualität legen, auch beim Training.",
      "Das Rheinufer zwischen Rodenkirchen und Sürth gehört zu den schönsten Laufstrecken der Stadt, und der Forstbotanische Garten ist perfekt für Outdoor-Einheiten im Sommer. Fürs Krafttraining treffen wir uns im Studio, den Rest steuern wir über das Online Coaching.",
    ],
    outdoorIntro:
      "Rheinufer Rodenkirchen, Forstbotanischer Garten, Friedenswald, Vorgebirgspark: der Kölner Süden trainiert draußen.",
    faq: [
      {
        q: "Bietest du Personal Training direkt in Rodenkirchen an?",
        a: "Outdoor-Einheiten ja, zum Beispiel am Rheinufer oder im Forstbotanischen Garten. Krafttraining findet im Studio statt. Viele Kunden aus dem Kölner Süden kombinieren beides mit dem Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Ich habe nach der Schwangerschaft zugenommen. Ist dein Training etwas für mich?",
        a: "Ja, und du bist damit nicht allein. Wir starten mit einer ehrlichen Bestandsaufnahme und bauen Belastung langsam auf. Eine Kundin hat nach der Schwangerschaft 12 Kilo verloren, die Geschichte findest du bei den Ergebnissen.",
      },
    ],
  },
  {
    slug: "lindenthal",
    name: "Lindenthal",
    intro: [
      "Lindenthal ist der Bezirk der Universität, des Stadtwalds und der bürgerlichen Veedel Sülz und Klettenberg. Hier wohnen über 150.000 Menschen, viele davon Akademiker, Ärzte und Studierende, und die Dichte an Fitnessstudios ist hoch. Was fehlt, ist nicht das Angebot, sondern der Plan.",
      "Mit Beethovenpark, Stadtwald, Decksteiner Weiher und Aachener Weiher hat Lindenthal die beste Outdoor-Infrastruktur Kölns. Ich nutze diese Orte regelmäßig für Sprints und Conditioning. Der Aufbau passiert trotzdem an der Hantel: Grundübungen, Progression, Geduld.",
    ],
    outdoorIntro:
      "Beethovenpark, Stadtwald, Decksteiner Weiher, Jahnwiesen am RheinEnergieStadion: Lindenthal ist das grüne Trainingsrevier Kölns.",
    faq: [
      {
        q: "Ich bin Student/in an der Uni Köln. Gibt es günstigere Optionen?",
        a: "Die fertigen Trainingspläne ab 25€ sind genau dafür gemacht: Beginner, Intermediate oder Advanced als PDF mit Videodemos. Wenn du später individuelle Betreuung willst, sprechen wir über das Online Coaching.",
      },
      {
        q: "Wo trainierst du in Lindenthal draußen?",
        a: "Am liebsten im Beethovenpark in Sülz und rund um den Decksteiner Weiher. Im Sommer auch auf den Jahnwiesen in Müngersdorf. Die Krafteinheiten finden im Studio statt.",
      },
    ],
  },
  {
    slug: "ehrenfeld",
    name: "Ehrenfeld",
    intro: [
      "Ehrenfeld war mal Arbeiterviertel, heute ist es das kreative Herz Kölns: jung, voll, laut, mit mehr Cafés als Parkplätzen. Über 110.000 Menschen leben im Bezirk, viele zwischen 25 und 40, viele selbstständig oder in den Medien. Trainiert wird viel, aber oft planlos.",
      "Genau hier setze ich an: Statt drei verschiedene Kurse pro Woche und null Fortschritt bekommst du einen Plan mit messbarer Progression. Der Blücherpark an der Grenze zu Neuehrenfeld ist meine erste Wahl für Outdoor-Blöcke im Bezirk.",
    ],
    outdoorIntro:
      "Blücherpark, Innerer Grüngürtel, Äußerer Grüngürtel bei Bickendorf: Ehrenfeld hat mehr Grün, als sein Ruf vermuten lässt.",
    faq: [
      {
        q: "Ich trainiere schon lange, komme aber nicht weiter. Kannst du helfen?",
        a: "Das Plateau ist der häufigste Grund, warum erfahrene Leute zu mir kommen. Meist liegt es an fehlender Progression oder an der Ernährung. Als WABBA Wettkampfathlet weiß ich, wie man aus einem fortgeschrittenen Körper noch Fortschritt holt.",
      },
      {
        q: "Bietest du Training für Selbstständige mit unregelmäßigen Zeiten?",
        a: "Ja, das Online Coaching ist dafür gebaut: Dein Plan passt sich deiner Woche an, nicht umgekehrt. Check-ins laufen flexibel, Trainingszeiten bestimmst du.",
      },
    ],
  },
  {
    slug: "nippes",
    name: "Nippes",
    intro: [
      "Nippes ist der familiäre Norden Kölns: das Nippeser Tälchen, der Wochenmarkt am Wilhelmplatz, dazu Riehl mit Flora und Zoo direkt am Rhein. Über 110.000 Menschen leben im Bezirk, viele Familien, viele Berufspendler.",
      "Meine Kunden aus Nippes trainieren meist früh morgens oder nach Feierabend. Das Rheinufer bei Riehl und der Nordpark in Niehl sind solide Strecken für Cardio-Einheiten, das Krafttraining läuft im Studio mit klarem Wochenplan.",
    ],
    outdoorIntro:
      "Nippeser Tälchen, Rheinufer Riehl, Nordpark, Blücherpark bei Bilderstöckchen: kurze Wege zu guten Strecken.",
    faq: [
      {
        q: "Ich habe zwei kleine Kinder und wenig Zeit. Reichen zwei Einheiten pro Woche?",
        a: "Ja, wenn sie gut geplant sind. Zwei Ganzkörper-Einheiten mit Grundübungen plus eine saubere Ernährung bringen mehr als vier planlose Studiobesuche. Genau das bauen wir zusammen auf.",
      },
      {
        q: "Begleitest du auch reine Abnehm-Ziele ohne Muskelaufbau-Ambitionen?",
        a: "Klar. Krafttraining bleibt trotzdem Teil des Plans, weil es beim Abnehmen die Muskeln schützt. Aber Umfang und Intensität passen wir an dein Ziel an.",
      },
    ],
  },
  {
    slug: "chorweiler",
    name: "Chorweiler",
    intro: [
      "Der Bezirk Chorweiler im Kölner Norden ist ein Kontrastprogramm: die Großwohnsiedlung Chorweiler auf der einen Seite, dörfliche Stadtteile wie Worringen und Roggendorf/Thenhoven auf der anderen. Und mittendrin der Fühlinger See, mit Regattastrecke eines der besten Outdoor-Trainingsgelände der Stadt.",
      "Rund um den Fühlinger See laufen meine härtesten Conditioning-Einheiten: lange Runden, Intervalle, Bodyweight-Stationen. Wer im Kölner Norden wohnt und ernsthaft trainieren will, hat hier alles, was er braucht. Den Rest, Plan und Ernährung, liefere ich.",
    ],
    outdoorIntro:
      "Fühlinger See mit Regattastrecke, Rheinufer Worringen, Chorbusch: der Norden hat Platz ohne Ende.",
    faq: [
      {
        q: "Gibt es Personal Training direkt am Fühlinger See?",
        a: "Ja, in den warmen Monaten trainiere ich dort regelmäßig mit Kunden: Intervalle auf der Regattastrecke, Bodyweight-Zirkel, Sprints. Im Winter verlagern wir ins Studio.",
      },
      {
        q: "Ich wohne in Worringen, ist das nicht zu weit weg?",
        a: "Nein. Entweder treffen wir uns am Fühlinger See, oder du läufst über das Online Coaching: Plan, Ernährung und wöchentliche Check-ins funktionieren von überall, auch vom nördlichsten Stadtteil Kölns.",
      },
    ],
  },
  {
    slug: "porz",
    name: "Porz",
    intro: [
      "Porz ist der große rechtsrheinische Süden: 16 Stadtteile vom Rheinufer in Zündorf bis zur Wahner Heide am Flughafen Köln/Bonn. Mit der Groov in Zündorf und der Wahner Heide hat der Bezirk zwei der besten Outdoor-Gelände der Region direkt vor der Tür.",
      "Viele meiner Kunden aus Porz arbeiten am Flughafen oder pendeln in die Innenstadt. Für sie zählt Effizienz: kurze, harte Einheiten und ein Ernährungsplan, der im Schichtdienst funktioniert. Genau dafür ist mein Coaching gebaut.",
    ],
    outdoorIntro:
      "Wahner Heide, Groov Zündorf, Rheinufer von Poll bis Langel: Porz trainiert am Wasser und in der Heide.",
    faq: [
      {
        q: "Funktioniert dein Coaching im Schichtdienst?",
        a: "Ja. Der Plan wird um deine Schichten herum gebaut, inklusive Ernährung für Nachtschichten. Das ist Standard bei mir, nicht die Ausnahme.",
      },
      {
        q: "Trainierst du auch in der Wahner Heide?",
        a: "Für Conditioning und Lauf-Einheiten ja, die Wege dort sind ideal. Krafttraining findet im Studio statt, die Kombination ergibt den Plan.",
      },
    ],
  },
  {
    slug: "kalk",
    name: "Kalk",
    intro: [
      "Kalk ist der Bezirk im Wandel: das alte Industrieherz rechts vom Rhein, heute jung, vielfältig und günstiger als das linksrheinische Köln. Vom dichten Kalk und Vingst bis zum Königsforst bei Brück und Rath/Heumar liegen Welten dazwischen, und genau das macht den Bezirk spannend.",
      "Der Königsforst ist mit Abstand das beste Trainingsgelände im Kölner Osten: kilometerlange Wege für Läufe und ruhige Ecken für Bodyweight-Blöcke. Auch die Merheimer Heide nutze ich regelmäßig. Krafttraining wie immer im Studio, mit Plan und Progression.",
    ],
    outdoorIntro:
      "Königsforst, Merheimer Heide, Bürgerpark Kalk: der Osten hat Wald, Wiese und Platz zum Arbeiten.",
    faq: [
      {
        q: "Ich bin absoluter Anfänger und traue mich nicht ins Studio. Was tun?",
        a: "Das Gefühl kennen mehr Leute, als du denkst. Die ersten Einheiten machen wir zusammen, ich zeige dir jede Übung, und nach vier Wochen bewegst du dich im Studio, als wärst du immer da gewesen.",
      },
      {
        q: "Was kostet das Training im Bezirk Kalk?",
        a: "Dasselbe wie überall bei mir: 50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, fertige Pläne ab 25€. Die Erstberatung kostet nichts.",
      },
    ],
  },
  {
    slug: "muelheim",
    name: "Mülheim",
    intro: [
      "Mülheim ist der größte rechtsrheinische Bezirk und mittendrin im Wandel: Schäl Sick mit Industriegeschichte, dazu grüne Stadtteile wie Dünnwald und Dellbrück am Bergischen Rand. Allein der Stadtteil Mülheim zählt über 43.000 Einwohner, mehr als jeder andere in Köln.",
      "Vom Rheinufer in Stammheim mit Blick auf den Schlosspark bis zum Dünnwalder Wald mit Wildpark: hier trainierst du draußen, ohne die Stadt zu verlassen. Meine Kunden aus Mülheim kombinieren meist Studio-Krafttraining mit Outdoor-Cardio an der frischen Luft.",
    ],
    outdoorIntro:
      "Dünnwalder Wald, Schlosspark Stammheim, Dellbrücker Heide, Rheinufer Mülheim: grüner wird rechtsrheinisch nicht.",
    faq: [
      {
        q: "Ich will Muskeln aufbauen, habe aber nur ein kleines Budget. Optionen?",
        a: "Starte mit einem fertigen Plan ab 25€ und der richtigen Technik. Wenn das Budget später passt, steigst du ins Online Coaching ein. Ehrlicher Rat: lieber klein anfangen als gar nicht.",
      },
      {
        q: "Wie schnell sehe ich erste Ergebnisse?",
        a: "Kraftzuwachs spürst du nach zwei bis drei Wochen, sichtbare Veränderung kommt je nach Ausgangslage nach sechs bis zehn Wochen. Wer dir Schnelleres verspricht, will dir etwas verkaufen.",
      },
    ],
  },
];

export function getBezirk(slug: string): Bezirk | undefined {
  return bezirke.find((b) => b.slug === slug);
}

export function bezirkStadtteile(b: Bezirk): Stadtteil[] {
  return stadtteile.filter((st) => st.bezirk === b.name);
}

export function bezirkStats(b: Bezirk) {
  const sts = bezirkStadtteile(b);
  const einwohner = sts.reduce((s, st) => s + st.einwohner, 0);
  const flaeche = sts.reduce((s, st) => s + st.flaecheKm2, 0);
  const biggest = sts.reduce((a, c) => (c.einwohner > a.einwohner ? c : a));
  const spots = Array.from(new Set(sts.flatMap((st) => st.spots)));
  return { einwohner, flaeche: Math.round(flaeche * 10) / 10, biggest, spots, count: sts.length };
}

// Testo completo visibile per validazione forge.py
export function bezirkFullText(b: Bezirk): string {
  const sts = bezirkStadtteile(b);
  const stats = bezirkStats(b);
  return [
    `Personal Trainer Köln-${b.name}`,
    ...b.intro,
    b.outdoorIntro,
    ...stats.spots,
    ...sts.map(
      (st) =>
        `${st.name}: ${st.einwohner} Einwohner, ${st.flaecheKm2} km², ${density(st)} Einwohner/km²${st.spots.length ? ", " + st.spots.join(", ") : ""}`
    ),
    ...b.faq.flatMap((f) => [f.q, f.a]),
  ].join("\n");
}
