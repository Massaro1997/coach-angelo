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
      { name: "Personal Trainer Kerpen", href: "/personal-trainer-kerpen" },
      { name: "Personal Trainer Hürth", href: "/personal-trainer-huerth" },
      { name: "Personal Trainer Pulheim", href: "/personal-trainer-pulheim" },
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
      { name: "Personal Trainer Langenfeld", href: "/personal-trainer-langenfeld" },
      { name: "Personal Trainer Monheim am Rhein", href: "/personal-trainer-monheim-am-rhein" },
      { name: "Personal Trainer Bergisch Gladbach", href: "/personal-trainer-bergisch-gladbach" },
      { name: "Personal Trainer Dormagen", href: "/personal-trainer-dormagen" },
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
      { name: "Personal Trainer Rösrath", href: "/personal-trainer-roesrath" },
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
      { name: "Personal Trainer Niederkassel", href: "/personal-trainer-niederkassel" },
      { name: "Personal Trainer Rösrath", href: "/personal-trainer-roesrath" },
    ],
  },
  {
    slug: "kerpen",
    name: "Kerpen",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Kerpen: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Kerpen: 1-zu-1 zu Hause oder draußen, an der Erft, am Boisdorfer See oder im Schlosspark Türnich. 50€/Std, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Du suchst einen Personal Trainer in Kerpen? Ich trainiere dich 1-zu-1 bei dir zu Hause oder draußen, an der Erft, am Boisdorfer See oder im Schlosspark Türnich. Die Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    sections: [
      {
        title: "Die größte Stadt im Rhein-Erft-Kreis trainiert vor der eigenen Haustür",
        body: "Kerpen hat rund 66.000 Einwohner und ist damit die bevölkerungsreichste Stadt des Rhein-Erft-Kreises, verteilt auf Stadtteile, die fast eigene Orte sind: Sindorf, Horrem, Buir, Brüggen, Türnich, Blatzheim. Genau deshalb funktioniert hier kein Training, das an einem festen Studio hängt. Ich komme dorthin, wo du wohnst, mit dem Material im Kofferraum, und wir trainieren in deiner Wohnung, im Garten oder draußen im Grünen. Von Frechen aus, wo ich wohne, bin ich über die A4 schnell in jedem Kerpener Stadtteil.",
      },
      {
        title: "Erftaue, Boisdorfer See, Schlosspark Türnich",
        body: "Fürs Training draußen hat Kerpen mehr zu bieten, als viele denken. Entlang der Erft laufen flache, ruhige Wege durch die Aue, gut für Grundlagenausdauer und Tempoläufe ohne Ampeln. Am Boisdorfer See zwischen Türnich und Balkhausen bauen wir Zirkel am Wasser, und der Schlosspark Türnich gibt Intervallen einen Rahmen, den kein Studio hat. Wer es waldiger mag: das Naturschutzgebiet Kerpener Bruch und Parrig liegt direkt am Stadtrand.",
      },
      {
        title: "Für Pendler zwischen Köln und Aachen gebaut",
        body: "Mit den Bahnhöfen Horrem, Sindorf und Buir sitzt halb Kerpen morgens im Zug Richtung Köln oder Aachen. Abends noch in ein Kölner Studio zu fahren, scheitert nicht am Willen, sondern am Fahrplan. Darum lege ich die Einheiten an deinen Tagesrand: früh, bevor der Zug fährt, oder abends vor deiner Haustür. Der Rest der Woche läuft über kurze Pläne, die du allein schaffst, mit Rückmeldung per App.",
      },
      {
        title: "Was es kostet und wie es anfängt",
        body: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, wöchentlichen Check-ins und Ernährungssteuerung durch Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, beginnt bei 150€ im Monat. Der erste Schritt ist ein kostenloses Erstgespräch über Ziel, Alltag und Trainingsort; auch die Anfahrt nach Kerpen klären wir dort. In der Stadt, in der Michael Schumacher das Fahren gelernt hat, muss niemand beim Training raten: wir messen, was sich bewegt, und steuern nach.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Kerpen?",
        a: "Bei mir 50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos, die Anfahrt klären wir dort — von Frechen aus sind die Wege nach Kerpen kurz.",
      },
      {
        q: "Wo trainieren wir in Kerpen?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen: an der Erft, am Boisdorfer See oder im Schlosspark Türnich. Was passt, hängt von deinem Ziel und deinem Stadtteil ab.",
      },
      {
        q: "Kommst du auch nach Sindorf, Horrem oder Buir?",
        a: "Ja, das Angebot gilt in allen Kerpener Stadtteilen, von Sindorf und Horrem über Brüggen und Türnich bis Buir und Blatzheim. Sag mir im Erstgespräch, wo du wohnst.",
      },
      {
        q: "Ich pendle nach Köln. Kann ich dort weitertrainieren?",
        a: "Ja. Viele kombinieren Einheiten in Kerpen mit Terminen im Studio in Köln, zum Beispiel nach der Arbeit, bevor es zurück in den Zug geht. Plan und Betreuung bleiben dieselben.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Wo fangen wir an?",
        a: "Mit einer ehrlichen Bestandsaufnahme im Erstgespräch und einem Einstieg, der zu deinem Stand passt. Du brauchst keine Geräte und keine Vorerfahrung, nur regelmäßige Termine.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
      { name: "Personal Trainer Bergheim", href: "/personal-trainer-bergheim" },
      { name: "Personal Trainer Erftstadt", href: "/personal-trainer-erftstadt" },
    ],
  },
  {
    slug: "dormagen",
    name: "Dormagen",
    kreis: "Rhein-Kreis Neuss",
    metaTitle: "Personal Trainer Dormagen: 1-zu-1 vor Ort",
    metaDescription:
      "Personal Training in Dormagen: 1-zu-1 zu Hause oder draußen, am Rheinufer bei Zons oder im Knechtstedener Wald. 50€/Std, Online Coaching ab 150€/Monat.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Dormagen, ohne Fahrt nach Köln, Neuss oder Düsseldorf: ich komme zu dir, und trainiert wird zu Hause oder draußen, am Rheinufer bei Zons oder im Knechtstedener Wald. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Zwischen Köln und Neuss, aber ohne eigenes Training? Das lässt sich ändern",
        body: "Rund 65.000 Menschen leben in Dormagen, direkt hinter der Kölner Stadtgrenze bei Worringen. Wer hier Personal Training sucht, wird meist in die Großstädte verwiesen, dabei liegt das Trainingsgelände vor Ort. Ich trainiere dich dort, wo dein Tag stattfindet: in deiner Wohnung, im Garten oder draußen, von Rheinfeld und Zons über Nievenheim und Hackenbroich bis Delhoven und Straberg.",
      },
      {
        title: "Rheinufer bei Zons und der Knechtstedener Wald",
        body: "Die mittelalterliche Zollfeste Zons ist das bekannteste Stück Dormagen, und die Rheinwiesen davor sind ein ernstzunehmendes Trainingsgelände: flache Uferwege für Tempoläufe, Platz für Zirkel, Wind als Gratis-Widerstand. Auf der anderen Seite der Stadt liegt der Knechtstedener Wald rund um das romanische Kloster Knechtsteden, mit ruhigen, weichen Wegen für lange Läufe. Dazwischen der Tannenbusch bei Delhoven, wenn du kürzere Runden willst. Drei Reviere, ein Plan.",
      },
      {
        title: "Schichtdienst im Chempark? Der Plan rechnet damit",
        body: "Dormagen ist Chempark-Stadt, und Wechselschicht ist hier Alltag, kein Sonderfall. Ein Trainingsplan, der jede Woche denselben Dienstagabend verlangt, bricht daran. Meiner nicht: Termine wandern mit deinem Schichtrhythmus, auch in den Vormittag, und in Wochen ohne gemeinsames Fenster hält das Online Coaching den Faden, mit Plan per App und kurzem Check-in. Pendler nehmen die S11, die Dormagen direkt mit Köln und Neuss verbindet, und trainieren vor oder nach der Fahrt.",
      },
      {
        title: "Preise und der erste Schritt",
        body: "Es gelten dieselben Preise wie in Köln: 50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, inklusive Ernährungssteuerung durch Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Am Anfang steht ein kostenloses, unverbindliches Erstgespräch: Ziel, Alltag, Trainingsort und die Anfahrt nach Dormagen klären wir dort. Danach entscheidest du in Ruhe, ob es passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Dormagen?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch kostet nichts, und dort klären wir auch die Anfahrt zu dir nach Dormagen.",
      },
      {
        q: "Wo trainieren wir in Dormagen?",
        a: "Bei dir zu Hause, im Garten oder draußen: an den Rheinwiesen bei Zons, im Knechtstedener Wald oder im Tannenbusch bei Delhoven. Das Material bringe ich mit.",
      },
      {
        q: "Ich arbeite Wechselschicht im Chempark. Geht das?",
        a: "Ja, das ist in Dormagen eher die Regel als die Ausnahme. Die Termine wandern mit deinem Schichtplan, und für unregelmäßige Wochen gibt es kurze Einheiten, die du allein durchziehst.",
      },
      {
        q: "Deckst du alle Dormagener Stadtteile ab?",
        a: "Ja, von Zons und Stürzelberg am Rhein über Rheinfeld und die Innenstadt bis Nievenheim, Hackenbroich, Delhoven, Straberg und Gohr. Den Treffpunkt legen wir im Erstgespräch fest.",
      },
      {
        q: "Geht auch reines Online Coaching von Dormagen aus?",
        a: "Ja, vollständig: Trainingsplan per App, wöchentliche Video-Check-ins, Ernährungssteuerung, ab 150€ im Monat. Einzelne 1-zu-1 Stunden kannst du jederzeit dazunehmen.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Leverkusen", href: "/personal-trainer-leverkusen" },
      { name: "Personal Trainer Pulheim", href: "/personal-trainer-pulheim" },
    ],
  },
  {
    slug: "huerth",
    name: "Hürth",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Hürth: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Hürth: 1-zu-1 zu Hause oder draußen, am Otto-Maigler-See oder in den Villewäldern. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Hürth, direkt vor der Kölner Stadtgrenze: ich komme zu dir, und trainiert wird zu Hause, im Garten oder draußen, am Otto-Maigler-See oder in den Villewäldern. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Keine Stadt im Umland liegt näher an Köln",
        body: "Hürth beginnt dort, wo Köln aufhört: aus Efferen bist du mit der Linie 18 schneller an der Uni als mancher Kölner, und genau deshalb trainieren viele Hürther bisher in der Großstadt. Den Weg kannst du dir sparen. Rund 60.000 Menschen leben hier, verteilt auf Stadtteile von Efferen und Hermülheim bis Gleuel und Fischenich, und ich komme mit dem Material dorthin, wo du wohnst. Die Stunde beginnt an deiner Haustür, nicht an einer Studiotheke.",
      },
      {
        title: "Otto-Maigler-See und die Villewälder: zwei Reviere, ein Plan",
        body: "Der Otto-Maigler-See ist das bekannteste Stück Hürther Freizeitgelände, und die Runde um den See ist eine der angenehmsten Laufstrecken im Kölner Südwesten: flach, frei, mit Wasser als Taktgeber. Dahinter steigen die Villewälder an, mit weichen Waldwegen zwischen den Seen der Ville, gut für lange Grundlagenläufe und Einheiten, bei denen der Kopf mittrainiert. Kraft und Technik bauen wir zu Hause oder im Studio in Köln auf, je nachdem, was dein Ziel verlangt.",
      },
      {
        title: "Schichten in Knapsack, Vorlesungen in Köln: Termine, die sich anpassen",
        body: "Hürth hat mit dem Chemiepark Knapsack einen der großen Arbeitgeber der Region, und Wechselschicht ist für viele hier normal. Andere pendeln täglich zur Arbeit oder in die Hörsäle nach Köln. Beides verträgt keinen Plan, der jede Woche denselben Abendtermin verlangt. Meine Termine wandern deshalb mit: früher Vormittag, Tagesrand, auch mal das Wochenende. Und in Wochen ohne gemeinsames Fenster hält das Online Coaching den Faden, mit Plan per App und kurzem Check-in.",
      },
      {
        title: "Was es kostet und wie du anfängst",
        body: "Die Preise sind dieselben wie in Köln: 50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, inklusive Ernährungssteuerung durch Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Am Anfang steht ein kostenloses Erstgespräch über Ziel, Alltag und Trainingsort; auch die Anfahrt nach Hürth klären wir dort, von Frechen aus, wo ich wohne, ist es ein kurzer Weg. Danach entscheidest du ohne Druck.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Hürth?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos, und dort klären wir auch die Anfahrt, die Wege von Frechen nach Hürth sind kurz.",
      },
      {
        q: "Wo trainieren wir in Hürth?",
        a: "Bei dir zu Hause oder im Garten mit mitgebrachtem Material, draußen am Otto-Maigler-See oder in den Villewäldern. Wer schweres Langhanteltraining will, kombiniert das mit Terminen im Studio in Köln.",
      },
      {
        q: "Kommst du in alle Hürther Stadtteile?",
        a: "Ja, von Efferen und Hermülheim über Alt-Hürth, Gleuel und Kendenich bis Fischenich, Berrenrath und Stotzheim. Sag mir im Erstgespräch, wo du wohnst, dann planen wir Ort und Termine dazu.",
      },
      {
        q: "Ich arbeite Schicht im Chemiepark Knapsack. Wie läuft das?",
        a: "Die Termine wandern mit deinem Schichtplan, auch in den Vormittag. Dein Trainingsplan hat bewegliche Tage, und für volle Wochen gibt es kurze Einheiten, die du allein durchziehst, mit Rückmeldung per App.",
      },
      {
        q: "Ich trainiere bisher in Köln. Warum wechseln?",
        a: "Musst du nicht, du kannst kombinieren: Krafttermine im Kölner Studio, der Rest vor deiner Haustür am See oder im Wald. Der Plan bleibt einer, nur der Ort wechselt mit deiner Woche.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
      { name: "Personal Trainer Kerpen", href: "/personal-trainer-kerpen" },
      { name: "Personal Trainer Brühl", href: "/personal-trainer-bruehl" },
      { name: "Personal Trainer Erftstadt", href: "/personal-trainer-erftstadt" },
    ],
  },
  {
    slug: "pulheim",
    name: "Pulheim",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Pulheim: 1-zu-1 bei dir vor Ort",
    metaDescription:
      "Personal Training in Pulheim: 1-zu-1 zu Hause oder draußen, im Abteipark Brauweiler oder auf den Feldwegen der Börde. 50€/Std, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Du suchst einen Personal Trainer in Pulheim? Ich trainiere dich 1-zu-1 bei dir zu Hause, im Garten oder draußen, vom Abteipark Brauweiler bis zu den Feldwegen der Börde. Die Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    sections: [
      {
        title: "Zwölf Ortsteile, ein Training, das zu dir kommt",
        body: "Rund 56.000 Menschen leben in Pulheim, aber kaum jemand wohnt „in Pulheim“: man wohnt in Brauweiler, Stommeln, Sinnersdorf, Geyen oder einem der anderen Ortsteile, die eher Dörfer geblieben sind als Vororte. Ein Training, das an einem festen Studio hängt, passt nicht zu dieser Struktur. Meines hängt an deiner Adresse: ich bringe das Material mit, und trainiert wird in deiner Wohnung, im Garten oder draußen vor dem Ort.",
      },
      {
        title: "Abteipark Brauweiler, Börde, Chorbusch",
        body: "Das schönste Trainingsrevier Pulheims liegt an der tausend Jahre alten Abtei Brauweiler: der Park an der romanischen Abteikirche gibt Intervallen und Zirkeln einen Rahmen, den kein Gerätepark hat. Um die Ortsteile herum liegt die Börde mit ihren flachen, geraden Feldwegen, ideal für Tempoläufe, bei denen das Tempo konstant bleibt und vergleichbar wird. Und am Nordrand, hinter Sinnersdorf und Stommelerbusch, beginnt der Chorbusch, wenn du weiche Waldwege für lange Läufe willst.",
      },
      {
        title: "Pendeln nach Köln, trainieren vor der Haustür",
        body: "Von den Bahnhöfen Pulheim und Stommeln fährst du ohne Umstieg nach Köln, und genau so leben hier viele: arbeiten in der Stadt, wohnen im Grünen. Das Training gehört auf die Wohnseite dieses Lebens. Ich lege die Einheiten an deinen Tagesrand, früh bevor der Zug fährt oder abends nach der Rückfahrt, und zwischen den Terminen hält der Plan per App dich auf Kurs, mit kurzen Einheiten, die du allein schaffst.",
      },
      {
        title: "Kosten, Ablauf, erster Schritt",
        body: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, wöchentlichen Check-ins und Ernährungssteuerung durch Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, beginnt bei 150€ im Monat. Der Einstieg ist ein kostenloses, unverbindliches Erstgespräch: Ziel, Woche, Trainingsort, und auch die Anfahrt nach Pulheim klären wir dort. Danach hast du eine ehrliche Einschätzung, was in welcher Zeit realistisch ist.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Pulheim?",
        a: "Die 1-zu-1 Stunde kostet bei mir 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos, dort klären wir auch die Anfahrt zu dir nach Pulheim.",
      },
      {
        q: "Wo trainieren wir in Pulheim?",
        a: "Bei dir zu Hause oder im Garten mit mitgebrachtem Material, draußen im Abteipark Brauweiler, auf den Feldwegen der Börde oder im Chorbusch am Nordrand. Was passt, hängt von Ziel und Ortsteil ab.",
      },
      {
        q: "Kommst du auch nach Stommeln, Sinnersdorf oder Geyen?",
        a: "Ja, das Angebot gilt in allen Pulheimer Ortsteilen, von Brauweiler und Dansweiler über Sinthern und Geyen bis Stommeln, Sinnersdorf und Manstedten. Den Treffpunkt legen wir im Erstgespräch fest.",
      },
      {
        q: "Ich pendle jeden Tag nach Köln. Wann soll ich trainieren?",
        a: "Vor oder nach dem Zug, vor deiner Haustür. Viele legen eine feste Einheit in den frühen Abend und halten den Rest der Woche mit kurzen Plänen per App. Wer mag, nimmt zusätzlich Termine im Kölner Studio.",
      },
      {
        q: "Ich habe lange keinen Sport gemacht. Wo fangen wir an?",
        a: "Mit dem kostenlosen Erstgespräch und einer ehrlichen Bestandsaufnahme. Der Einstieg wird an deinen Stand angepasst, du brauchst weder Geräte noch Vorerfahrung, nur regelmäßige Termine.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
      { name: "Personal Trainer Dormagen", href: "/personal-trainer-dormagen" },
      { name: "Personal Trainer Bergheim", href: "/personal-trainer-bergheim" },
    ],
  },
  {
    slug: "bruehl",
    name: "Brühl",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Brühl: 1-zu-1 zwischen Schloss und Ville",
    metaDescription:
      "Personal Training in Brühl: bei dir zu Hause, im Schlosspark oder an den Ville-Seen. 1-zu-1 Stunde 50€, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Brühl, ohne erst nach Köln oder Bonn zu fahren: ich trainiere dich bei dir zu Hause, im Brühler Schlosspark oder an den Ville-Seen. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Zwischen Schlosspark und Ville-Seen",
        body: "Brühl hat zwei Trainingsreviere, um die es jede Großstadt beneidet. Mitten in der Stadt liegt der Park der Schlösser Augustusburg und Falkenlust, seit 1984 UNESCO-Welterbe: breite Alleen und ebene Wege, auf denen sich Läufe und Zirkel sauber takten lassen. Und westlich beginnen die Villewälder mit den Seen, die aus den alten Braunkohlegruben entstanden sind, allen voran Heider Bergsee und Bleibtreusee. Die Runden dort sind flach, gut zu dosieren und auch im Winter begehbar. Beides erreichst du aus fast jedem Brühler Viertel in wenigen Minuten.",
      },
      {
        title: "Zu Hause, am See oder im Studio",
        body: "Den Trainingsort legen wir nach deinem Ziel fest, nicht umgekehrt. Für das Training zu Hause bringe ich Kurzhanteln, Widerstandsbänder und das übrige Material mit, ein freies Stück Boden genügt. Draußen arbeiten wir im Schlosspark oder an den Seen an Ausdauer, Kraftausdauer und Beweglichkeit. Und wer schwere Grundübungen an der Langhantel will, kombiniert das mit Terminen im Kölner Studio: mit der Linie 18 oder der Bahn ab Brühler Bahnhof bist du schnell dort.",
      },
      {
        title: "Die Preise, klar und ohne Kleingedrucktes",
        body: "Eine 1-zu-1 Stunde kostet 50€, egal ob bei dir zu Hause, draußen oder im Studio. Das Online Coaching mit Trainingsplan per App, Ernährungssteuerung und wöchentlichen Check-ins gibt es ab 150€ im Monat. Gestartet wird immer mit einem kostenlosen Erstgespräch: dort klären wir Ziel, Trainingsort, Termine und auch die Anfahrt. Du entscheidest danach in Ruhe, ohne Abo-Falle.",
      },
      {
        title: "Für wen das in Brühl gedacht ist",
        body: "Viele Brühler pendeln nach Köln oder Bonn und wollen den Sport nicht auch noch hinter einen Bahnhof legen. Andere arbeiten im Schichtbetrieb, etwa in Gastronomie und Freizeitpark im Süden der Stadt, und brauchen Termine, die nicht um 18 Uhr beginnen müssen. Für beide baue ich den Plan um die echte Woche herum. Das Angebot gilt im ganzen Stadtgebiet, von Vochem und Kierberg über Pingsdorf und Heide bis Badorf und Schwadorf.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Brühl?",
        a: "Die 1-zu-1 Stunde kostet bei mir 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich, dort klären wir auch die Anfahrt nach Brühl.",
      },
      {
        q: "Kommst du zu mir nach Hause nach Brühl?",
        a: "Ja. Ich bringe das komplette Trainingsmaterial mit, du brauchst keine Geräte. Wohnzimmer, Garage oder Garten reichen für ein vollständiges Krafttraining.",
      },
      {
        q: "Wo trainieren wir draußen in Brühl?",
        a: "Am liebsten im Schlosspark von Augustusburg oder an den Ville-Seen, etwa am Heider Bergsee oder Bleibtreusee. Flache Wege, klare Runden, wenig Verkehr: ideal für Ausdauer und Zirkeltraining.",
      },
      {
        q: "Kann ich auch an Geräten trainieren?",
        a: "Ja, dann verbinden wir das Training mit Terminen im Studio in Köln. Mit der Linie 18 oder der Bahn ab Brühl ist das gut machbar. Viele kombinieren: Kraft im Studio, der Rest vor Ort.",
      },
      {
        q: "Gilt das Angebot in allen Brühler Stadtteilen?",
        a: "Ja, von Vochem über Kierberg und Pingsdorf bis Badorf, Schwadorf und Heide. Sag mir im Erstgespräch, wo du wohnst, dann planen wir Ort und Termine passend.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Hürth", href: "/personal-trainer-huerth" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
      { name: "Personal Trainer Bergheim", href: "/personal-trainer-bergheim" },
      { name: "Personal Trainer Wesseling", href: "/personal-trainer-wesseling" },
    ],
  },
  {
    slug: "bergheim",
    name: "Bergheim",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Bergheim: Training an der Erft",
    metaDescription:
      "Personal Training in Bergheim: bei dir zu Hause, in der Erftaue oder an der Glessener Höhe. 1-zu-1 Stunde 50€, Online ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in der Kreisstadt des Rhein-Erft-Kreises: ich komme zu dir nach Hause oder wir trainieren draußen, in der Erftaue oder an der Glessener Höhe. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Die Kreisstadt trainiert an der Erft",
        body: "Rund 61.000 Menschen leben in Bergheim, und mitten durch die Stadt fließt die Erft. Für das Training ist das ein Geschenk: die Wege in der Erftaue sind flach, ruhig und führen vom Zentrum mit seinem mittelalterlichen Aachener Tor bis hinaus nach Paffendorf, wo das Wasserschloss im Park steht. Hier laufen wir Grundlagen und Intervalle mit gleichbleibenden Bedingungen, dazwischen kommen Kraftblöcke mit dem eigenen Körpergewicht. Wer mag, hängt die Strecke am Erft-Radweg beliebig weit hinten dran.",
      },
      {
        title: "Ein Berg aus dem Tagebau, direkt vor der Tür",
        body: "Im Osten der Stadt, bei Glessen, liegt die Glessener Höhe: gut 200 Meter hoch, aufgeschüttet aus dem Abraum des Braunkohletagebaus, heute bewaldet und voller Wege mit echter Steigung. Für Bergheimer ist das der nächste richtige Trainingsberg. Bergauf-Intervalle dort ersetzen eine komplette Tempoeinheit und bauen eine Beinkraft auf, die man im Flachen nicht bekommt. Wir nutzen die Höhe gezielt in Blöcken, nicht jede Woche, damit die Belastung planbar bleibt.",
      },
      {
        title: "Termine für Schichtdienst und Pendler",
        body: "Bergheim lebt mit der Energie: das Kraftwerk Niederaußem steht im Stadtgebiet, und viele arbeiten dort oder im Umfeld in Wechselschicht. Ein Trainingsplan, der nur den Feierabend kennt, hält das nicht aus. Deshalb lege ich Einheiten auch in den Vormittag oder frühen Nachmittag und baue den Plan um deinen Schichtrhythmus. Pendler, die mit der Erft-Bahn nach Köln fahren, trainieren vor Ort statt in der Stadt: das spart die zweite Fahrt und macht die Termine verlässlich.",
      },
      {
        title: "Kosten und erster Schritt",
        body: "Die 1-zu-1 Stunde kostet 50€. Wer lieber mit Plan per App, Ernährungssteuerung und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat, das in Bergheim genauso funktioniert wie überall. Am Anfang steht ein kostenloses, unverbindliches Erstgespräch über Ziel, Woche und Trainingsort, dort klären wir auch die Anfahrt. Danach folgt der Technik-Check und die ersten Einheiten zeigen, ob es passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Bergheim?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, Erstgespräch kostenlos. Die Anfahrt nach Bergheim besprechen wir im Erstgespräch.",
      },
      {
        q: "Trainierst du bei mir zu Hause in Bergheim?",
        a: "Ja, das ist hier der häufigste Fall. Ich bringe Kurzhanteln, Bänder und das übrige Material mit. Ein paar freie Quadratmeter reichen für ein komplettes Programm.",
      },
      {
        q: "Wo trainieren wir draußen?",
        a: "In der Erftaue für flache Läufe und Zirkel, an der Glessener Höhe für Bergauf-Intervalle und Beinkraft. Beides liegt im Stadtgebiet und ist schnell erreichbar.",
      },
      {
        q: "Ich arbeite im Schichtdienst. Bekommen wir das hin?",
        a: "Ja. Termine lege ich auch in den Vormittag oder Nachmittag, und der Plan rechnet mit wechselnden Wochen. Eine Spätschicht wirft dann nicht gleich den ganzen Monat um.",
      },
      {
        q: "Gilt das Angebot in allen Stadtteilen von Bergheim?",
        a: "Ja, von Quadrath-Ichendorf über Zieverich und Paffendorf bis Niederaußem und Glessen. Im Erstgespräch planen wir Trainingsort und Termine passend zu deinem Wohnort.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Kerpen", href: "/personal-trainer-kerpen" },
      { name: "Personal Trainer Pulheim", href: "/personal-trainer-pulheim" },
      { name: "Personal Trainer Brühl", href: "/personal-trainer-bruehl" },
    ],
  },
  {
    slug: "langenfeld",
    name: "Langenfeld",
    kreis: "Kreis Mettmann",
    metaTitle: "Personal Trainer Langenfeld: 1-zu-1 bei dir",
    metaDescription:
      "Personal Training in Langenfeld (Rheinland): 1-zu-1 bei dir zu Hause oder draußen, etwa im Freizeitpark Langfort. 50€/Std, Online ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Langenfeld liegt zwischen Köln und Düsseldorf, und genau deshalb trainieren wir hier vor Ort: 1-zu-1 bei dir zu Hause, im Garten oder draußen im Grünen, statt nach Feierabend noch einmal in eine der beiden Städte zu fahren. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Die Stadt zwischen den Städten hat ein Pendlerproblem",
        body: "Rund 59.000 Menschen leben in Langenfeld, und ein großer Teil davon fährt morgens mit der S6 oder über die Autobahn nach Köln oder Düsseldorf. Wer dann abends für den Sport wieder in die Bahn steigt, hört meistens nach ein paar Wochen auf. Mein Ansatz dreht das um: das Training kommt zu dir. Du sparst die dritte Fahrt des Tages, und der Termin steht fest in deinem Kalender, nicht hinter dem Berufsverkehr.",
      },
      {
        title: "Langfort, Further Moor und der eigene Garten",
        body: "Für die Einheiten draußen hat Langenfeld mehr zu bieten, als man von außen denkt. Der Freizeitpark Langfort ist eine große, offene Anlage mit festen Wegen, gut für Zirkel, Lauftechnik und Intervalle. Richtung Reusrath liegt das Further Moor mit ruhigen, flachen Pfaden für die langen, lockeren Einheiten. Und oft reicht schon der eigene Garten oder das Wohnzimmer: Kurzhanteln, Bänder und den Rest bringe ich mit.",
      },
      {
        title: "Krafttraining mit System, nicht mit Geräten von der Stange",
        body: "Mein Kern ist sauberes Krafttraining: Kniebeuge-, Hebe- und Zugmuster, von leicht bis schwer, mit Technik-Korrektur in jeder Einheit. Das funktioniert zu Hause besser, als die meisten erwarten, weil die Übungsauswahl zum Material passt und die Progression über Wiederholungen, Tempo und Last läuft. Wer irgendwann an die Langhantel will, kombiniert die Einheiten vor Ort mit dem Studio in Köln. Gemessen wird in beiden Fällen: Kraftwerte, Umfänge, Wochengewicht.",
      },
      {
        title: "Ablauf und Kosten in Langenfeld",
        body: "Der Einstieg ist ein kostenloses Erstgespräch über Ziel, Woche und Trainingsort, telefonisch oder per Video. Dort klären wir auch die Anfahrt zu dir. Danach starten wir mit einem Technik-Check und meist zwei Einheiten pro Woche. Die 1-zu-1 Stunde kostet 50€; das Online Coaching mit Trainingsplan per App, Ernährungssteuerung durch Natalie und wöchentlichen Check-ins beginnt bei 150€ im Monat und läuft von Richrath bis Wiescheid gleich gut.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Langenfeld?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos, dort besprechen wir auch die Anfahrt nach Langenfeld.",
      },
      {
        q: "In welchen Stadtteilen von Langenfeld trainierst du?",
        a: "In allen: Richrath, Immigrath, Reusrath, Berghausen und Wiescheid. Trainiert wird bei dir zu Hause, im Garten oder draußen, zum Beispiel im Freizeitpark Langfort.",
      },
      {
        q: "Ich pendle nach Düsseldorf, nicht nach Köln. Macht das einen Unterschied?",
        a: "Nein. Das Training findet in Langenfeld statt, dein Arbeitsweg spielt nur für die Terminwahl eine Rolle. Viele legen die Einheiten auf den frühen Abend direkt nach der Rückfahrt oder auf den Samstagvormittag.",
      },
      {
        q: "Brauche ich eigene Geräte zu Hause?",
        a: "Nein. Ich bringe Kurzhanteln, Widerstandsbänder und das übrige Material mit. Ein paar freie Quadratmeter reichen, um vollständig zu trainieren.",
      },
      {
        q: "Geht auch reines Online Coaching von Langenfeld aus?",
        a: "Ja. Trainingsplan per App, wöchentliche Video-Check-ins und die Ernährungsberatung durch Natalie funktionieren ortsunabhängig, ab 150€ im Monat. Einzelne 1-zu-1 Stunden lassen sich jederzeit dazunehmen.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Leverkusen", href: "/personal-trainer-leverkusen" },
      { name: "Personal Trainer Monheim am Rhein", href: "/personal-trainer-monheim-am-rhein" },
      { name: "Personal Trainer Dormagen", href: "/personal-trainer-dormagen" },
      { name: "Personal Trainer Bergisch Gladbach", href: "/personal-trainer-bergisch-gladbach" },
    ],
  },
  {
    slug: "erftstadt",
    name: "Erftstadt",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Erftstadt: Training vor Ort",
    metaDescription:
      "Personal Training in Erftstadt: 1-zu-1 zu Hause in allen Ortsteilen, draußen am Liblarer See oder in den Villewäldern. 50€/Std, Online ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Erftstadt ist eine Stadt aus vielen Dörfern, und fast jeder Weg braucht hier das Auto. Das Training nicht: ich komme zu dir, nach Lechenich, Liblar oder in jeden anderen Ortsteil, oder wir trainieren draußen am Liblarer See. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Eine Stadt aus Dörfern braucht Training ohne Anfahrt",
        body: "Rund 50.000 Menschen leben in Erftstadt, aber nicht in einer Stadt, sondern verteilt auf über ein Dutzend Ortsteile zwischen Erft und Ville: Lechenich mit seinem historischen Marktplatz, Liblar mit dem Bahnhof, dazu Gymnich, Friesheim, Erp, Kierdorf und die kleineren Dörfer. Fitnessangebote bündeln sich in den größten Orten, und wer in Erp oder Herrig wohnt, fährt für jedes Training. Genau das lasse ich weg: die Einheit findet bei dir statt, mit Material, das ich mitbringe.",
      },
      {
        title: "Liblarer See und Villewälder als Trainingsgelände",
        body: "Am Ostrand von Erftstadt beginnen die Villewälder, und mittendrin liegt der Liblarer See. Die Wege dort sind flach, schattig und wenig befahren: gut für lockere Läufe als Grundlage, für Intervalle, wenn das Tempo dran ist, und für Zirkel mit dem eigenen Körpergewicht am Wasser. Im Sommer verlegen viele Kunden fast alles hierher, im Winter wandert der Schwerpunkt zurück ins Wohnzimmer. Der Plan bleibt derselbe, nur der Ort wechselt mit der Jahreszeit.",
      },
      {
        title: "Was wir trainieren, hängt vom Ziel ab, nicht vom Ort",
        body: "Abnehmen, Muskelaufbau, wieder fit werden nach Jahren Pause: der Plan startet mit einer ehrlichen Bestandsaufnahme und einem Technik-Check. Danach stehen meist zwei feste Einheiten pro Woche, Kraft zuerst, Ausdauer dosiert dazu. Jede Übung wird mit Last und Wiederholungen notiert, alle vier Wochen vergleichen wir die Zahlen. Wer die Ernährung mitsteuern will, bekommt Natalie dazu, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung.",
      },
      {
        title: "Kosten, Anfahrt und der erste Schritt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Erftstadt liegt über die A1 und A61 gut erreichbar am Südwestrand des Kölner Raums; wie die Anfahrt konkret läuft, klären wir im kostenlosen Erstgespräch, genauso wie Trainingsort und Termine. Wer in Liblar wohnt und lieber ins Kölner Studio kommt, nimmt den Zug ab Bahnhof Erftstadt und ist schnell in der Stadt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Erftstadt?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, Erstgespräch kostenlos. Die Anfahrt in deinen Ortsteil besprechen wir im Erstgespräch.",
      },
      {
        q: "Kommst du auch in die kleineren Ortsteile?",
        a: "Ja, das Angebot gilt in ganz Erftstadt: von Lechenich und Liblar über Gymnich, Friesheim und Erp bis in die kleineren Dörfer wie Herrig oder Niederberg.",
      },
      {
        q: "Wo trainieren wir draußen in Erftstadt?",
        a: "Am liebsten an den Wegen rund um den Liblarer See und in den Villewäldern: flach, ruhig und das ganze Jahr nutzbar. Alternativ reicht der eigene Garten für ein komplettes Programm.",
      },
      {
        q: "Ich war seit Jahren nicht mehr im Training. Wo fangen wir an?",
        a: "Mit einem Technik-Check und leichten Grundübungen, nicht mit einem Härtetest. Die Last steigt erst, wenn die Bewegung sitzt. Genau dafür ist das 1-zu-1 da.",
      },
      {
        q: "Gibt es auch Ernährungsberatung dazu?",
        a: "Ja. Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, übernimmt im Online Coaching die Ernährungsseite: Kalorienziel, Wochenplan und Check-ins, komplett online.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Hürth", href: "/personal-trainer-huerth" },
      { name: "Personal Trainer Kerpen", href: "/personal-trainer-kerpen" },
      { name: "Personal Trainer Brühl", href: "/personal-trainer-bruehl" },
      { name: "Personal Trainer Frechen", href: "/personal-trainer-frechen" },
    ],
  },
  {
    slug: "monheim-am-rhein",
    name: "Monheim am Rhein",
    kreis: "Kreis Mettmann",
    metaTitle: "Personal Trainer Monheim am Rhein: 1-zu-1",
    metaDescription:
      "Personal Training in Monheim am Rhein: 1-zu-1 bei dir zu Hause oder draußen auf den Deichwegen am Rheinbogen, in Monheim und Baumberg. 50€/Std, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Monheim am Rhein hat keinen eigenen Bahnhof, und genau deshalb kommt bei mir das Training zu dir: 1-zu-1 bei dir zu Hause oder draußen auf den Deichwegen am Rheinbogen, in Monheim genauso wie in Baumberg. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Ohne Bahnhof ist der Heimweg die beste Trainingsadresse",
        body: "Gut 40.000 Menschen leben in Monheim am Rhein, aber wer von hier zum Sport pendeln will, braucht erst den Bus oder das Auto: eine eigene Bahnstation gibt es nicht, die nächste S-Bahn hält im Nachbarort. Für ein Fitnessstudio in Düsseldorf oder Köln kommt also immer eine Fahrt obendrauf, und diese Fahrt ist der Punkt, an dem die meisten Vorsätze enden. Ich lasse sie weg: Termin bei dir, Material im Kofferraum, und der Abend gehört trotzdem noch dir.",
      },
      {
        title: "Der Rheinbogen ist dein Ausdauerrevier",
        body: "Monheim liegt in einer weiten Schleife des Rheins, und am Deich entlang laufen flache, asphaltierte Wege mit freiem Blick über den Strom, von der Altstadt bis hinauf nach Baumberg. Dort trainieren wir Intervalle und ruhige Grundlagenläufe, ohne Ampeln und ohne Slalom. Für Kraftzirkel mit dem eigenen Körpergewicht reichen die Wiesen am Deichfuß, und wenn das Wetter nicht mitspielt, verlegen wir dieselbe Einheit in dein Wohnzimmer.",
      },
      {
        title: "Kraft zuerst, gemessen statt geschätzt",
        body: "Egal ob dein Ziel Abnehmen, Muskelaufbau oder einfach Belastbarkeit im Alltag ist: die Basis ist Krafttraining mit sauberer Technik. Wir beginnen mit einem Technik-Check, danach stehen meist zwei Einheiten pro Woche mit klarer Progression über Last, Wiederholungen und Tempo. Jede Einheit wird notiert, alle vier bis sechs Wochen vergleichen wir Kraftwerte, Umfänge und Wochengewicht. Wer an die Langhantel will, kombiniert die Termine zu Hause mit dem Studio in Köln, über die A59 ist das machbar.",
      },
      {
        title: "Preise und erster Schritt in Monheim",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, Ernährungssteuerung durch Natalie und wöchentlichen Check-ins beginnt bei 150€ im Monat. Den Anfang macht ein kostenloses Erstgespräch über Ziel, Woche und Trainingsort; dort klären wir auch die Anfahrt zu dir, ob du am Rheinufer in der Altstadt wohnst oder oben in Baumberg. Danach entscheidest du ohne Druck, ob es passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Monheim am Rhein?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos, die Anfahrt nach Monheim klären wir dort.",
      },
      {
        q: "Trainierst du auch in Baumberg?",
        a: "Ja, das Angebot gilt im ganzen Stadtgebiet, in Baumberg genauso wie rund um die Monheimer Altstadt. Trainiert wird bei dir zu Hause, im Garten oder draußen am Rheindeich.",
      },
      {
        q: "Wo trainieren wir draußen in Monheim?",
        a: "Meist auf den Deichwegen am Rheinbogen: flach, gerade und das ganze Jahr begehbar. Läufe und Intervalle finden dort statt, die Kraftübungen auf den Wiesen daneben oder bei dir zu Hause.",
      },
      {
        q: "Ich habe keine Geräte zu Hause. Reicht das trotzdem?",
        a: "Ja. Kurzhanteln, Widerstandsbänder und das übrige Material bringe ich mit, ein paar freie Quadratmeter genügen. Wer später schwerer trainieren will, nimmt Einheiten im Kölner Studio dazu.",
      },
      {
        q: "Geht auch reines Online Coaching von Monheim aus?",
        a: "Ja, komplett: Trainingsplan per App, wöchentliche Video-Check-ins und die Ernährungsberatung durch Natalie laufen ortsunabhängig, ab 150€ im Monat.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Langenfeld", href: "/personal-trainer-langenfeld" },
      { name: "Personal Trainer Leverkusen", href: "/personal-trainer-leverkusen" },
      { name: "Personal Trainer Dormagen", href: "/personal-trainer-dormagen" },
    ],
  },
  {
    slug: "niederkassel",
    name: "Niederkassel",
    kreis: "Rhein-Sieg-Kreis",
    metaTitle: "Personal Trainer Niederkassel: 1-zu-1 bei dir",
    metaDescription:
      "Personal Training in Niederkassel: 1-zu-1 zu Hause in Mondorf, Rheidt, Lülsdorf, Ranzel und den anderen Ortsteilen, draußen am Rheindamm. 50€/Std, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Niederkassel liegt am Rhein genau zwischen Köln und Bonn, und für gutes Training musst du in keine der beiden Städte fahren: ich komme zu dir, nach Mondorf, Rheidt, Lülsdorf, Ranzel oder in jeden anderen Ortsteil. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Zwischen zwei Großstädten, aber ohne deren Studios",
        body: "Rund 38.000 Menschen leben in Niederkassel, verteilt auf eine Kette von Rheinorten zwischen Köln und Bonn: Mondorf und Rheidt im Süden, dann Niederkassel selbst, Lülsdorf, Ranzel und Uckendorf. Einen Bahnanschluss hat die Stadt nicht, die Kölner Stadtbahn endet in Zündorf direkt an der Grenze. Wer hier wohnt, hat sich an Wege mit dem Auto gewöhnt, aber beim Training lohnt sich das Umdenken: die Einheit bei dir zu Hause kostet dich keine einzige Fahrt, und genau deshalb findet sie auch nach einem langen Arbeitstag noch statt.",
      },
      {
        title: "Der Rheindamm liefert Kilometer, die Sieg das Panorama",
        body: "Für die Einheiten draußen hat Niederkassel eine der längsten geraden Trainingsstrecken der Region: den Dammweg am Rhein, der die Ortsteile von Mondorf bis Lülsdorf verbindet, flach, asphaltiert und ohne Querverkehr. Hier laufen wir Intervalle und lockere Grundlagenkilometer. Im Süden, bei Mondorf, mündet die Sieg in den Rhein, und die ruhigen Wege rund um die Mündung sind gut für lange Einheiten am Wochenende. Kraftzirkel bauen wir auf den Wiesen am Damm oder direkt in deinem Garten auf.",
      },
      {
        title: "Ein Plan, der zur Pendlerwoche passt",
        body: "Viele Niederkasseler arbeiten in Köln oder Bonn und sind werktags kaum vor dem frühen Abend zu Hause. Der Trainingsplan rechnet damit: meist zwei feste 1-zu-1 Einheiten pro Woche, dazu kurze Programme von 15 bis 20 Minuten für die Tage dazwischen, die ohne Geräte funktionieren. Gestartet wird mit einem Technik-Check, danach läuft die Progression über Last, Wiederholungen und Tempo, und alle vier bis sechs Wochen zeigen die notierten Zahlen, ob der Plan liefert. Wenn nicht, wird er geändert.",
      },
      {
        title: "Kosten, Ernährung und der Einstieg",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Die Ernährungsseite übernimmt dabei Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, komplett online. Der erste Schritt ist ein kostenloses Erstgespräch: Ziel, Woche, Trainingsort, und auch die Anfahrt in deinen Ortsteil klären wir dort. Danach entscheidest du in Ruhe.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Niederkassel?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos, dort besprechen wir auch die Anfahrt.",
      },
      {
        q: "In welchen Ortsteilen von Niederkassel trainierst du?",
        a: "In allen: Mondorf, Rheidt, Niederkassel, Lülsdorf, Ranzel, Uckendorf und Stockem. Trainiert wird bei dir zu Hause, im Garten oder draußen am Rheindamm.",
      },
      {
        q: "Wo laufen wir draußen?",
        a: "Meist auf dem Dammweg am Rhein zwischen Mondorf und Lülsdorf: flach, gerade und frei von Querverkehr. Für lange, ruhige Einheiten nehmen wir die Wege an der Siegmündung bei Mondorf dazu.",
      },
      {
        q: "Ich pendle nach Bonn, nicht nach Köln. Spielt das eine Rolle?",
        a: "Nein. Das Training findet bei dir in Niederkassel statt, dein Arbeitsweg zählt nur für die Terminwahl. Viele legen die Einheiten auf den frühen Abend oder den Samstagvormittag.",
      },
      {
        q: "Brauche ich eigene Geräte?",
        a: "Nein. Kurzhanteln, Bänder und das übrige Material bringe ich mit. Wer irgendwann an die Langhantel will, kombiniert die Termine vor Ort mit dem Studio in Köln.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Troisdorf", href: "/personal-trainer-troisdorf" },
      { name: "Personal Trainer Köln-Porz", href: "/koeln/porz" },
    ],
  },
  {
    slug: "wesseling",
    name: "Wesseling",
    kreis: "Rhein-Erft-Kreis",
    metaTitle: "Personal Trainer Wesseling: 1-zu-1 am Rhein",
    metaDescription:
      "Personal Training in Wesseling: 1-zu-1 bei dir zu Hause oder am Rheinufer, Termine auch für Schichtarbeiter. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Wesseling läuft bei mir dort, wo du wohnst: bei dir zu Hause mit mitgebrachtem Material oder draußen am Rheinufer. Termine gibt es auch vormittags, was in einer Schichtstadt wie Wesseling oft den Unterschied macht. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Eine Stadt, die nicht im Feierabendtakt lebt",
        body: "Rund 36.000 Menschen leben in Wesseling, und ein großer Teil davon arbeitet in den Werken entlang des Rheins im Wechselschichtbetrieb. Ein Trainingsplan, der nur Dienstag und Donnerstag um 18 Uhr kennt, scheitert hier an der Realität. Deshalb plane ich mit dir um deinen Schichtplan herum: Frühschicht-Wochen trainieren nachmittags, Nachtschicht-Wochen bekommen kürzere Einheiten mit mehr Erholung. Der Plan folgt deinem Dienstplan, nicht umgekehrt.",
      },
      {
        title: "Das Rheinufer als Trainingsstrecke",
        body: "Wesseling liegt direkt am Strom, und die Uferwege zwischen Urfeld und der Stadtmitte sind flach und gut zu laufen: ideal für Intervalle, zügige Geherholungen zwischen Kraftsätzen und Technikarbeit beim Laufen. Wer es grüner mag, weicht auf die Wege am Entenfang zwischen Berzdorf und Keldenich aus. Für schweres Langhanteltraining fährst du mit der Linie 16 ins Studio nach Köln, die Bahn hält viermal im Stadtgebiet.",
      },
      {
        title: "Training zu Hause, in Berzdorf genauso wie in Urfeld",
        body: "Der Normalfall in Wesseling ist das Training bei dir: Ich bringe Kurzhanteln, Widerstandsbänder und das übrige Material mit, ein paar freie Quadratmeter reichen. Das gilt für alle vier Stadtteile, Wesseling-Mitte, Berzdorf, Keldenich und Urfeld. So fällt die Fahrt ins Fitnessstudio weg, die nach einer Zwölf-Stunden-Schicht ohnehin niemand mehr antritt.",
      },
      {
        title: "Kosten und erster Schritt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Für die Ernährung arbeitet Natalie mit, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, was gerade bei Schichtarbeit viel ausmacht. Am Anfang steht ein kostenloses Erstgespräch: Ziel, Alltag, Trainingsort, Anfahrt. Danach entscheidest du.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Wesseling?",
        a: "Die 1-zu-1 Stunde kostet bei mir 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos, dort klären wir auch die Anfahrt nach Wesseling.",
      },
      {
        q: "Ich arbeite Wechselschicht. Wie soll da regelmäßiges Training gehen?",
        a: "Indem der Plan um den Schichtplan gebaut wird. Wir legen die Termine wochenweise fest, und in Nachtschicht-Wochen reduziere ich Umfang und Intensität, statt Einheiten ausfallen zu lassen. So bleibt der Faden über Monate erhalten.",
      },
      {
        q: "Wo trainieren wir in Wesseling?",
        a: "Meist bei dir zu Hause mit mitgebrachtem Material oder draußen am Rheinufer. Wer zusätzlich an die Langhantel will, kombiniert das mit dem Studio in Köln, mit der Linie 16 direkt erreichbar.",
      },
      {
        q: "Gilt das Angebot auch in Berzdorf, Keldenich und Urfeld?",
        a: "Ja, im ganzen Stadtgebiet. Sag mir im Erstgespräch, wo du wohnst, dann legen wir Trainingsort und Termine danach fest.",
      },
      {
        q: "Hilfst du auch bei der Ernährung?",
        a: "Ja. Den Ernährungsteil übernimmt Natalie, Ernährungsberaterin für Sport- und Fitnessernährung. Bei Schichtarbeit planen wir die Mahlzeiten über die 24 Stunden deines Dienstes, nicht über den Kalendertag.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Brühl", href: "/personal-trainer-bruehl" },
      { name: "Personal Trainer Niederkassel", href: "/personal-trainer-niederkassel" },
      { name: "Personal Trainer Köln-Sürth", href: "/koeln/suerth" },
    ],
  },
  {
    slug: "roesrath",
    name: "Rösrath",
    kreis: "Rheinisch-Bergischer Kreis",
    metaTitle: "Personal Trainer Rösrath: 1-zu-1 am Königsforst",
    metaDescription:
      "Personal Training in Rösrath: 1-zu-1 bei dir zu Hause oder draußen im Königsforst und Sülztal. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    h1Prefix: "Personal Trainer in",
    answer:
      "Personal Training in Rösrath nutzt, was die Stadt ohnehin vor der Tür hat: den Königsforst für Läufe und Outdoor-Einheiten, das Sülztal für ruhige Strecken, dein Wohnzimmer für die Kraftarbeit mit mitgebrachtem Material. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    sections: [
      {
        title: "Wohnen am Wald, trainieren im Wald",
        body: "Knapp 30.000 Menschen leben in Rösrath, viele genau deshalb: Der Königsforst beginnt an der Stadtgrenze, die Wahner Heide liegt im Süden. Wer hier wohnt, hat Trainingsgelände, für das Kölner quer durch die Stadt fahren. Die breiten, flachen Forstwege im Königsforst sind perfekt für Intervalle und lange Grundlagenläufe, die Sülzwiesen bei Hoffnungsthal für Zirkel mit dem eigenen Körpergewicht. Ich lege die Einheiten dorthin, wo du sie allein fortsetzen kannst.",
      },
      {
        title: "Von Hoffnungsthal bis Forsbach: ich komme zu dir",
        body: "Rösrath zieht sich durchs Sülztal, und nicht jeder wohnt nah am Zentrum. Deshalb komme ich für die Einheiten zu dir, nach Hoffnungsthal, Forsbach, Kleineichen oder in den Hauptort, mit Kurzhanteln, Bändern und allem, was eine vollständige Krafteinheit braucht. Wer zusätzlich schwer an der Langhantel arbeiten will, nimmt die RB 25 nach Köln und trainiert mit mir im Studio, die Bahn hält dreimal im Stadtgebiet.",
      },
      {
        title: "Für Pendler gebaut",
        body: "Viele Rösrather arbeiten in Köln und sitzen morgens und abends in der RB 25 oder auf der A3. Nach dem Arbeitstag noch ein Fitnessstudio in der Stadt anzusteuern, hält kaum jemand durch. Das Training vor der eigenen Haustür dreht das um: kein zusätzlicher Weg, feste Termine, und an vollen Tagen ersetzt eine kurze geführte Einheit im Wald die ausgefallene Studiostunde. Das Online Coaching hält die Wochen zusammen, in denen gar kein Termin passt.",
      },
      {
        title: "Was es kostet",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App, Ernährungssteuerung durch Natalie und wöchentlichem Check-in beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich: Dort schauen wir auf dein Ziel, deinen Alltag und den passenden Trainingsort, und auch die Anfahrt nach Rösrath klären wir da. Mehr musst du vorher nicht entscheiden.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Rösrath?",
        a: "Bei mir kostet die 1-zu-1 Stunde 50€, das Online Coaching beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos, die Anfahrt klären wir dort.",
      },
      {
        q: "Wo trainieren wir in Rösrath?",
        a: "Draußen im Königsforst oder an der Sülz, bei dir zu Hause mit mitgebrachtem Material, oder beides im Wechsel. Für schweres Gerätetraining kombinieren viele die Einheiten vor Ort mit dem Studio in Köln.",
      },
      {
        q: "Ist Training im Wald nicht nur Joggen?",
        a: "Nein. Die Forstwege nutze ich für Intervalle und Tempoarbeit, Bänke, Steigungen und das eigene Körpergewicht für Kraft und Stabilität. Mit Bändern und Kurzhanteln wird daraus eine vollständige Einheit, die du nach ein paar Wochen auch allein durchziehen kannst.",
      },
      {
        q: "Betreust du auch Hoffnungsthal, Forsbach und Kleineichen?",
        a: "Ja, das ganze Stadtgebiet. Sag im Erstgespräch, wo du wohnst, dann planen wir Trainingsort und Termine passend, vom Sülztal bis zum Waldrand in Forsbach.",
      },
      {
        q: "Ich bin lange raus aus dem Sport. Wo fangen wir an?",
        a: "Mit einem Check am Anfang: Beweglichkeit, Kraft, Belastbarkeit. Danach starten wir dort, wo du wirklich stehst, meist mit zwei ruhigen Einheiten pro Woche. Gesteigert wird erst, wenn die Grundlagen sitzen.",
      },
    ],
    links: [
      { name: "Personal Trainer Köln", href: "/personal-trainer-koeln" },
      { name: "Personal Trainer Bergisch Gladbach", href: "/personal-trainer-bergisch-gladbach" },
      { name: "Personal Trainer Troisdorf", href: "/personal-trainer-troisdorf" },
      { name: "Personal Trainer Köln-Rath/Heumar", href: "/koeln/rath-heumar" },
    ],
  },
];

export function getUmlandOrt(slug: string): UmlandOrt | undefined {
  return umlandOrte.find((o) => o.slug === slug);
}
