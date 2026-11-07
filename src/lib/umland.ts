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
      { name: "Personal Trainer Bergisch Gladbach", href: "/personal-trainer-bergisch-gladbach" },
    ],
  },
  {
    slug: "bergisch-gladbach",
    name: "Bergisch Gladbach",
    kreis: "Rheinisch-Bergischer Kreis",
    metaTitle: "Personal Trainer Bergisch Gladbach: 1-zu-1 vor Ort",
    metaDescription:
      "Personal Training in Bergisch Gladbach: 1-zu-1 bei dir zu Hause oder draußen im Königsforst und Strundetal. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Du suchst einen Personal Trainer in Bergisch Gladbach? Ich trainiere dich 1-zu-1 bei dir zu Hause, im Garten oder draußen, vom Königsforst bis zum Strundetal. Die Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    sections: [
      {
        title: "Training dort, wo das Bergische anfängt",
        body: "Bergisch Gladbach ist mit rund 111.000 Einwohnern die größte Stadt des Rheinisch-Bergischen Kreises, und sie hat etwas, das Köln fehlt: Höhenmeter. Die Hügel Richtung Herkenrath und Moitzfeld machen aus jedem Lauf ein ehrliches Ausdauertraining, ohne dass du dir Steigungen künstlich bauen musst. Ich plane deine Einheiten so, dass das Gelände für dich arbeitet: bergauf für Kraftausdauer und Tempo, flach im Tal für Technik und lockere Kilometer.",
      },
      {
        title: "Königsforst, Strundetal, Saaler Mühle",
        body: "Für das Training draußen ist die Auswahl groß. Im Süden liegt der Königsforst mit breiten, ruhigen Waldwegen zwischen Bensberg und Refrath. Durch die Stadt zieht sich das Strundetal mit seinem Wanderweg entlang des Bachs, gut für Läufe mit leichtem Profil. Und an der Saaler Mühle in Bensberg trainieren wir rund um den See, mit Platz für Zirkel und Intervalle. Wenn du lieber drinnen bleibst, komme ich mit dem Material zu dir nach Hause.",
      },
      {
        title: "Für Pendler gebaut",
        body: "Viele aus Bergisch Gladbach arbeiten in Köln und sitzen morgens in der S11 oder auf der A4. Nach dem Arbeitstag noch in ein Kölner Studio zu fahren hält kaum jemand durch, und genau daran scheitern die meisten Trainingspläne. Darum drehe ich es um: das Training findet vor deiner Haustür statt, zu Zeiten, die zu deinem Tag passen, früh bevor du pendelst oder abends, wenn du zurück bist. Den Plan dazwischen hältst du mit kurzen Einheiten, die du allein schaffst.",
      },
      {
        title: "Kosten und erster Schritt",
        body: "Eine 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Trainingsplan per App, wöchentlichen Check-ins und Ernährungssteuerung durch Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, beginnt bei 150€ im Monat. Am Anfang steht ein kostenloses Erstgespräch: wir sprechen über dein Ziel, deinen Alltag und den Trainingsort, und auch die Anfahrt klären wir dort. Du entscheidest danach ohne Druck.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Bergisch Gladbach?",
        a: "Die 1-zu-1 Stunde kostet bei mir 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos, dort klären wir auch die Anfahrt nach Bergisch Gladbach.",
      },
      {
        q: "Wo trainieren wir in Bergisch Gladbach?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen: im Königsforst, im Strundetal oder an der Saaler Mühle in Bensberg. Was passt, hängt von deinem Ziel und deinem Wohnort ab.",
      },
      {
        q: "Betreust du auch Bensberg, Refrath und Schildgen?",
        a: "Ja, das Angebot gilt im ganzen Stadtgebiet, von Schildgen und Paffrath über Gronau und Hand bis Bensberg, Refrath und Herkenrath. Sag mir im Erstgespräch, wo du wohnst.",
      },
      {
        q: "Ich habe lange keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein, das ist der häufigste Fall. Wir starten mit einer Bestandsaufnahme und bauen die Belastung langsam auf. Du musst für den Einstieg nichts können und nichts besitzen, das Material bringe ich mit.",
      },
      {
        q: "Geht auch Training im Studio?",
        a: "Ja. Wer schweres Langhanteltraining will, kombiniert Einheiten vor Ort mit Terminen im Studio in Köln. Über die A4 oder mit der S11 bist du aus Bergisch Gladbach schnell dort.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Leverkusen", href: "/personal-trainer-leverkusen" },
      { name: "Personal Trainer Troisdorf", href: "/personal-trainer-troisdorf" },
    ],
  },
  {
    slug: "troisdorf",
    name: "Troisdorf",
    kreis: "Rhein-Sieg-Kreis",
    metaTitle: "Personal Trainer Troisdorf: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Troisdorf: 1-zu-1 zu Hause oder draußen, in der Wahner Heide oder an der Sieg. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Troisdorf, ohne Fahrt nach Köln oder Bonn: ich komme zu dir und wir trainieren zu Hause oder draußen, in der Wahner Heide oder an der Sieg. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Die größte Stadt im Rhein-Sieg-Kreis, ohne eigenes Personal-Training-Angebot? Nicht mehr",
        body: "Rund 75.000 Menschen leben in Troisdorf, zwischen Köln und Bonn, und wer hier individuelles Training sucht, landet schnell bei Studios in einer der beiden Großstädte. Dabei liegt das beste Trainingsgelände direkt vor der Tür. Ich trainiere dich dort, wo dein Alltag stattfindet: in deiner Wohnung, im Garten oder draußen im Grünen, von Spich bis Bergheim, von Sieglar bis Altenrath.",
      },
      {
        title: "Wahner Heide und Siegaue als Trainingsgelände",
        body: "Die Wahner Heide am Westrand von Troisdorf gehört zu den artenreichsten Naturschutzgebieten in Nordrhein-Westfalen, und ihre sandigen Wege sind ein unterschätztes Trainingsgerät: weicher Boden, der Fußgelenke und Hüfte mehr fordert als Asphalt. Am Portal Burg Wissem starten wir direkt hinein. Flacher und schneller läuft es sich in der Siegaue, auf den Wegen am Fluss Richtung Bergheim und zur Siegmündung in den Rhein. Beides zusammen deckt alles ab, von Grundlagenausdauer bis Intervalle.",
      },
      {
        title: "Zwischen zwei Städten, aber mit festem Termin",
        body: "Troisdorf ist Pendlerstadt in beide Richtungen, mit der S-Bahn bist du schnell in Köln oder Bonn. Das Problem ist selten die Motivation, sondern der Kalender: Schichten, Dienstreisen, Familie. Deshalb arbeite ich mit festen, aber verschiebbaren Terminen und einem Plan, der Ausfälle einkalkuliert, statt an ihnen zu zerbrechen. In vollen Wochen übernimmt das Online Coaching: Plan per App, kurzer Check-in, weiter geht es.",
      },
      {
        title: "Was es kostet und wie du startest",
        body: "Die Preise sind dieselben wie in Köln: 50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, inklusive Ernährungssteuerung durch Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Der Einstieg ist immer ein kostenloses, unverbindliches Erstgespräch. Dort klären wir Ziel, Trainingsort und die Anfahrt nach Troisdorf, und du bekommst eine ehrliche Einschätzung, was in welcher Zeit realistisch ist.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Troisdorf?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch kostet nichts, und dort klären wir auch die Anfahrt zu dir nach Troisdorf.",
      },
      {
        q: "Wo trainieren wir in Troisdorf?",
        a: "Bei dir zu Hause, im Garten oder draußen: in der Wahner Heide ab Portal Burg Wissem oder in der Siegaue Richtung Bergheim. Das Material bringe ich mit.",
      },
      {
        q: "Deckst du alle Troisdorfer Stadtteile ab?",
        a: "Ja, von Troisdorf-Mitte über Spich, Sieglar und Oberlar bis Bergheim, Eschmar und Altenrath. Wo wir uns treffen, legen wir im Erstgespräch fest.",
      },
      {
        q: "Ich pendle nach Köln. Kann ich auch dort trainieren?",
        a: "Ja. Viele kombinieren Einheiten in Troisdorf mit Terminen im Studio in Köln, zum Beispiel direkt nach der Arbeit. Der Plan bleibt derselbe, nur der Ort wechselt.",
      },
      {
        q: "Funktioniert das auch nur online?",
        a: "Ja, komplett ortsunabhängig: Trainingsplan per App, wöchentliche Video-Check-ins, Ernährungssteuerung. Ab 150€ im Monat, und du kannst jederzeit einzelne 1-zu-1 Stunden dazunehmen.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Bergisch Gladbach", href: "/personal-trainer-bergisch-gladbach" },
    ],
  },
];

export function getUmlandOrt(slug: string): UmlandOrt | undefined {
  return umlandOrte.find((o) => o.slug === slug);
}
