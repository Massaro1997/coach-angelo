// Pagine comuni del Kölner Umland (Zone confermate da Calogero, PIANO_PRODUZIONE.md sez. 3).
// UNA pagina per comune, URL /personal-trainer-<comune>. Solo fatti veri e verificabili,
// prezzi reali (50€/Std, Online ab 150€/Monat). La trasferta non si promette:
// "Anfahrt klären wir im kostenlosen Erstgespräch". Niente Hyrox, niente promesse inventate.

export interface UmlandOrt {
  slug: string;
  name: string;
  kreis: string;
  metaTitle: string;
  metaDescription: string;
  h1Prefix: string; // parte prima del nome nel H1
  answer: string;
  sections: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  links: { name: string; href: string }[];
}

export const umlandOrte: UmlandOrt[] = [
  {
    slug: "frechen",
    name: "Frechen",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Frechen: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Frechen mit Angelo Magliarisi: dein Trainer wohnt selbst hier. Training zu Hause, draußen oder im Studio in Köln. 50€/Std, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Frechen ohne Umweg über Köln: ich wohne selbst hier und trainiere dich bei dir zu Hause, draußen oder im Studio in Köln. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Dein Trainer wohnt schon in Frechen",
        body: "Die meisten Personal Trainer für Frechen sitzen in Köln und rechnen die Anfahrt in ihre Preise ein. Bei mir ist es umgekehrt: Frechen ist mein Zuhause, Köln mein Arbeitsweg. Für dich heißt das kurze Wege, verlässliche Termine und Zeitfenster, die anderswo schwierig sind, früh vor der Arbeit oder spät am Abend. Ich bin Angelo Magliarisi, Wettkampfathlet im WABBA International Verband, und trainiere dich auf Deutsch oder Italienisch.",
      },
      {
        title: "Wo wir in Frechen trainieren",
        body: "Das entscheidet dein Ziel. Bei dir zu Hause bringe ich das Material mit, von Widerstandsbändern bis Kurzhanteln, und wir nutzen den Platz, der da ist. Für Laufeinheiten, Intervalle und Zirkel an der frischen Luft liegt der Königsdorfer Forst am Nordrand der Stadt, mit ruhigen, flachen Wegen. Und wer schweres Langhanteltraining will, fährt mit mir ins Studio nach Köln, über die A4 oder mit der Linie 7 kein großer Sprung.",
      },
      {
        title: "Was das Training kostet",
        body: "Die 1-zu-1 Stunde kostet 50€, damit liegst du am unteren Ende dessen, was Personal Training im Kölner Raum kostet. Das Online Coaching mit Trainingsplan per App, Ernährungssteuerung und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich, dort klären wir auch die Anfahrt und den Trainingsort. Danach entscheidest du in Ruhe.",
      },
      {
        title: "Für wen das in Frechen gedacht ist",
        body: "Viele Frechener pendeln jeden Tag nach Köln und haben abends keine Lust, für den Sport noch einmal in die Stadt zu fahren. Genau da setzt das Training vor Ort an. Es passt für Berufstätige mit vollen Wochen, für Eltern, die das Training in den Familienalltag schieben müssen, und für Wiedereinsteiger, die nach Jahren Pause einen sauberen Aufbau wollen statt Trial and Error. Das Angebot gilt im ganzen Stadtgebiet, von Königsdorf über Bachem bis Grefrath.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Frechen?",
        a: "Bei mir kostet die 1-zu-1 Stunde 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos. Die Anfahrt klären wir dort, innerhalb von Frechen sind die Wege für mich kurz.",
      },
      {
        q: "Kommst du zu mir nach Hause?",
        a: "Ja, das ist in Frechen der Normalfall. Ich bringe das Trainingsmaterial mit, du brauchst keine eigenen Geräte. Ein paar Quadratmeter im Wohnzimmer oder Garten reichen für ein vollständiges Training.",
      },
      {
        q: "Trainierst du auch draußen in Frechen?",
        a: "Ja. Für Läufe, Intervalle und Einheiten mit dem eigenen Körpergewicht nutze ich gerne den Königsdorfer Forst am Nordrand von Frechen. Im Sommer verlagern viele Kunden den Großteil des Trainings nach draußen.",
      },
      {
        q: "Was ist, wenn ich lieber an Geräten trainiere?",
        a: "Dann trainieren wir im Studio in Köln. Über die A4 oder mit der Stadtbahn-Linie 7 bist du aus Frechen schnell dort. Viele kombinieren beides: Kraft im Studio, der Rest vor der Haustür.",
      },
      {
        q: "Gilt das Angebot in allen Frechener Stadtteilen?",
        a: "Ja, von Königsdorf über Buschbell und Bachem bis Grefrath und Habbelrath. Sag mir im Erstgespräch, wo du wohnst, dann planen wir Trainingsort und Termine passend dazu.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Leverkusen", href: "/personal-trainer-leverkusen" },
    ],
  },
  {
    slug: "leverkusen",
    name: "Leverkusen",
    kreis: "kreisfreie Stadt",
    metaTitle: "Personal Trainer Leverkusen: 1-zu-1 vor Ort",
    metaDescription:
      "Personal Training in Leverkusen: 1-zu-1 bei dir zu Hause oder draußen, zum Beispiel im Neulandpark am Rhein. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Leverkusen heißt bei mir: Training bei dir zu Hause oder draußen, zum Beispiel im Neulandpark am Rhein, ohne dass du dafür nach Köln fahren musst. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Leverkusen hat sein eigenes Trainingsrevier",
        body: "Über 160.000 Menschen leben in Leverkusen, und trotzdem fahren viele für gutes Training nach Köln oder Düsseldorf. Nötig ist das nicht. Ich komme für die Einheiten zu dir, nach Wiesdorf, Opladen, Schlebusch oder in jeden anderen Stadtteil, und bringe das Material mit. Trainiert wird dort, wo es in deinen Tag passt: im Wohnzimmer, im Garten oder draußen am Rhein.",
      },
      {
        title: "Neulandpark und Rheinufer statt Laufband",
        body: "Mit dem Neulandpark hat Leverkusen eine der besten Outdoor-Trainingsflächen der Region: die weitläufige Parkanlage am Rhein, entstanden zur Landesgartenschau 2005, mit flachen Wegen direkt am Wasser. Hier laufen wir Intervalle, bauen Zirkel mit dem eigenen Körpergewicht und arbeiten an Technik und Ausdauer. Der Rheinuferweg verlängert jede Einheit, wenn du mehr Strecke willst.",
      },
      {
        title: "Schichtdienst, Pendeln, Familie: der Plan passt sich an",
        body: "Leverkusen ist eine Stadt der Schichten und der Pendler, zwischen Chempark, Köln und Düsseldorf. Ein Trainingsplan, der nur den klassischen Feierabend kennt, hält hier nicht lange. Deshalb lege ich Termine auch in den Vormittag oder den frühen Abend, und in Wochen, in denen gar nichts geht, hält das Online Coaching den Faden: Plan per App, wöchentlicher Check-in, Anpassung statt Ausfall.",
      },
      {
        title: "Preise, Ablauf und der erste Schritt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan und Ernährungssteuerung beginnt bei 150€ im Monat. Den Ernährungsteil übernimmt Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Der erste Schritt ist immer ein kostenloses Erstgespräch: Ziel, Alltag, Trainingsort, und auch die Anfahrt klären wir dort. Danach entscheidest du, ob es passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Leverkusen?",
        a: "Die 1-zu-1 Stunde kostet bei mir 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos, dort klären wir auch die Anfahrt zu dir.",
      },
      {
        q: "Wo trainieren wir in Leverkusen?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen, zum Beispiel im Neulandpark am Rhein. Wer schweres Langhanteltraining will, kann zusätzlich ins Studio nach Köln kommen.",
      },
      {
        q: "Ich arbeite im Schichtdienst. Funktioniert das Training trotzdem?",
        a: "Ja. Termine lege ich auch in den Vormittag oder Nachmittag, und der Plan wird um deinen Schichtrhythmus gebaut. Für unregelmäßige Wochen gibt es Einheiten, die du allein durchziehst, mit Plan per App.",
      },
      {
        q: "Betreust du alle Leverkusener Stadtteile?",
        a: "Ja, von Wiesdorf und Rheindorf über Opladen bis Schlebusch und Hitdorf. Wo genau wir trainieren und wie die Anfahrt läuft, klären wir im kostenlosen Erstgespräch.",
      },
      {
        q: "Geht auch reines Online Coaching von Leverkusen aus?",
        a: "Ja, komplett. Trainingsplan per App, wöchentliche Video-Check-ins und Ernährungssteuerung funktionieren ortsunabhängig, ab 150€ im Monat. Viele starten online und holen sich später einzelne 1-zu-1 Stunden dazu.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
    ],
  },
];

export function getUmlandOrt(slug: string): UmlandOrt | undefined {
  return umlandOrte.find((o) => o.slug === slug);
}
