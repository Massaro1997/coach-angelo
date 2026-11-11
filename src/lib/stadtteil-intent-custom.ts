// Testo su misura per singole pagine Stadtteil × Intent (modalità produzione, 06/11/2026).
// Chiave: "<stadtteil-slug>/<intent-key>". Le pagine senza voce restano identiche a prima
// (buildContent in stadtteil-intent.ts). URL, canonical, sitemap e title non cambiano.
// Regole: solo fatti veri e verificabili, prezzi reali (50€/Std, Online ab 150€/Monat),
// risposta diretta in cima, domande vere. Niente Hyrox, niente promesse inventate.

export interface IntentCustom {
  answer: string; // risposta diretta, sostituisce l'intro nel primo schermo
  metaDescription?: string;
  sections: { title: string; body: string }[]; // sostituiscono i paragraphs generati
  faq: { q: string; a: string }[]; // sostituiscono le FAQ generate
}

export const stadtteilIntentCustom: Record<string, IntentCustom> = {
  "merkenich/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Merkenich heißt: Sprints und Tempoläufe auf den flachen Wegen am Rheinufer Nord, Sprungkraft und Stabilität im Studio, dazu die Regattastrecke am Fühlinger See direkt nebenan. Eine Stunde kostet 50€, die Erstberatung ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Merkenich: Sprints am Rheinufer Nord, Tempoläufe an der Regattastrecke am Fühlinger See, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Mehr Platz zum Trainieren als fast überall in Köln",
        body: "Merkenich ist mit 12,15 km² einer der größten Kölner Stadtteile, aber nur 5.878 Menschen leben hier. Das sind rund 480 Einwohner pro Quadratkilometer, ein Bruchteil der Innenstadt. Für Athletiktraining ist das ideal: am Rheinufer Nord laufen wir Sprints über 30 bis 100 Meter, ohne auszuweichen oder abzubremsen. Die Dammwege am Rhein sind flach und gerade, du kannst Tempoläufe sauber durchziehen und ich kann deine Zeiten vergleichen, weil die Bedingungen gleich bleiben.",
      },
      {
        title: "Die Regattastrecke am Fühlinger See liegt vor der Haustür",
        body: "Direkt hinter der Stadtteilgrenze, in Fühlingen, liegt der Fühlinger See mit seiner Regattastrecke. Die Wege dort sind eben und vermessen, ideal für lange Intervalle und Testläufe. Windschutz gibt es am See kaum, und genau das nutzen wir: Tempoarbeit bei Gegenwind baut eine Ausdauerbasis auf, die auf dem Laufband nicht entsteht. Wer in Merkenich wohnt, erreicht eine der besten Trainingsflächen im Kölner Norden in wenigen Minuten.",
      },
      {
        title: "So baue ich dein Athletiktraining auf",
        body: "Wir starten mit einem Technik-Check: Sprint, Sprung, Rumpfstabilität. Danach stehen zwei Einheiten pro Woche, eine draußen für Schnelligkeit und Ausdauer, eine im Studio für Kraft und Sprungkraft. Alle vier bis sechs Wochen messen wir nach. Du siehst schwarz auf weiß, ob sich Sprintzeiten und Sprunghöhe bewegen. Wenn nicht, ändere ich den Plan.",
      },
      {
        title: "Für wen das in Merkenich passt",
        body: "Typische Anfragen aus dem Kölner Norden kommen von Hobbysportlern: Läufer, die schneller werden wollen, Fußballer aus den Vereinen der Umgebung, Leute, die nach Jahren wieder einsteigen. Viele arbeiten im Schichtbetrieb oder im Ford-Entwicklungszentrum in Merkenich. Deshalb lege ich Termine auch in den frühen Morgen oder den frühen Nachmittag, nicht nur auf die klassische Feierabendzeit.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Merkenich?",
        a: "Eine 1-zu-1 Stunde kostet 50€. Wer lieber mit Plan und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Wo genau trainieren wir in Merkenich?",
        a: "Sprints und Tempoläufe am Rheinufer Nord, längere Intervalle an der Regattastrecke am Fühlinger See, Kraft und Sprungkraft im Studio. Den Mix lege ich nach deinem Ziel und der Jahreszeit fest.",
      },
      {
        q: "Brauche ich Wettkampfambitionen für Athletiktraining?",
        a: "Nein. Athletiktraining heißt nur: schneller, stabiler, belastbarer werden. Das hilft im Verein genauso wie beim Joggen oder im Alltag. Das Niveau setzt der Technik-Check am Anfang, nicht ein Wettkampfkalender.",
      },
      {
        q: "Wie oft pro Woche sollte ich trainieren?",
        a: "Zwei geführte Einheiten pro Woche reichen, wenn sie sauber geplant sind. Dazu bekommst du kurze Hausaufgaben für die Tage dazwischen, meist 15 bis 20 Minuten Mobility oder Lauftechnik.",
      },
    ],
  },

  "altstadt-nord/athletiktraining": {
    answer:
      "Athletiktraining mitten in Köln funktioniert ohne Laufband: Sprints am Rheinufer, Treppenläufe am Rheinboulevard gleich über die Hohenzollernbrücke, Mobility in der Grünanlage am Theodor-Heuss-Ring. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in der Kölner Innenstadt: Sprints am Rheinufer, Treppenläufe am Rheinboulevard, Einheiten von Tür zu Tür in 60 Minuten. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Training, das in deinen Innenstadt-Tag passt",
        body: "In Altstadt-Nord leben 18.617 Menschen auf 2,46 km², dazu kommen jeden Tag Zehntausende, die hier arbeiten. Kaum jemand davon hat Zeit für eine lange Anfahrt ins Fitnessstudio. Deshalb plane ich Einheiten hier von Tür zu Tür: 60 Minuten, Start an deinem Büro oder deiner Wohnung, das Warm-up passiert auf dem Weg zum Rhein. Auch eine lange Mittagspause reicht, wenn der Ablauf steht.",
      },
      {
        title: "Treppen, Rampen, Rheinufer: die Stadt ist dein Trainingsgerät",
        body: "Das Rheinufer in Altstadt-Nord ist flach und frei, gut für Sprints und Intervalle. Für Sprungkraft und Schnellkraft nehmen wir die Treppen am Rheinboulevard in Deutz, über die Hohenzollernbrücke bist du in wenigen Minuten dort. Die Grünanlage am Theodor-Heuss-Ring nutze ich für Mobility und Lauftechnik. Die Kraftarbeit mit der Langhantel bleibt im Studio, der Rest findet draußen statt.",
      },
      {
        title: "So sieht eine Einheit aus",
        body: "Zehn Minuten Mobilisation und Lauftechnik, dann der Hauptteil: Sprints, Treppenläufe oder Intervalle, je nach Phase deines Plans. Zum Schluss Rumpfarbeit. Alle vier bis sechs Wochen teste ich Sprintzeit und Sprunghöhe, damit wir nach Zahlen trainieren statt nach Gefühl. Zwei Einheiten pro Woche bringen über drei Monate einen messbaren Unterschied.",
      },
      {
        title: "Wer hier bei mir anfragt",
        body: "Meist Berufstätige aus den Büros rund um Ring, Dom und Hauptbahnhof: viel Sitzen, wenig Zeit, das Ziel ist Belastbarkeit statt reiner Optik. Athletiktraining passt auch, wenn du nebenbei Fußball oder Tennis spielst oder läufst und in deinem Sport stabiler werden willst. Das Einstiegsniveau ist egal: der Technik-Check am Anfang legt fest, womit wir starten.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in der Kölner Innenstadt?",
        a: "50€ pro Stunde im 1-zu-1. Online Coaching mit Plan und Video-Check-ins gibt es ab 150€ im Monat. Die Erstberatung kostet nichts und klärt, welches Format zu dir passt.",
      },
      {
        q: "Geht Athletiktraining in der Mittagspause?",
        a: "Ja, wenn du 60 bis 75 Minuten am Stück hast. Treffpunkt an deinem Büro oder deiner Wohnung, Warm-up auf dem Weg zum Rheinufer, der Hauptteil draußen, danach eine kurze Dusche und zurück.",
      },
      {
        q: "Brauche ich eine Mitgliedschaft im Fitnessstudio?",
        a: "Nein. Für die Outdoor-Einheiten bringe ich das Material mit, die Kraftanteile laufen im Studio im Rahmen deiner Stunde.",
      },
      {
        q: "Ist Athletiktraining auch für Anfänger sinnvoll?",
        a: "Ja. Schnelligkeit und Stabilität lassen sich auf jedem Niveau trainieren, die Übungen werden angepasst. Gerade wer viel am Schreibtisch sitzt, merkt die ersten Wochen deutlich: mehr Körperspannung, besserer Gang, weniger Steifheit im Rücken.",
      },
    ],
  },

  "muelheim/personal-training": {
    answer:
      "Personal Training in Köln-Mülheim läuft bei mir 1-zu-1: zwei feste Termine pro Woche, Krafttraining mit Technik-Korrektur im Studio, Outdoor-Anteile am Rheinufer Mülheim oder im Mülheimer Stadtgarten. Eine Stunde kostet 50€, die Erstberatung ist kostenlos.",
    metaDescription:
      "1-zu-1 Personal Training in Köln-Mülheim: fester Plan, Technik-Korrektur, Outdoor am Rheinufer oder im Mülheimer Stadtgarten. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Personal Training auf der Schäl Sick",
        body: "Mülheim ist mit 43.296 Einwohnern der bevölkerungsreichste Stadtteil Kölns. Viele pendeln jeden Tag über die Mülheimer Brücke oder arbeiten in den Büros rund um den Clevischen Ring. Fürs Training musst du den Rhein nicht überqueren: die Einheiten plane ich rechtsrheinisch, dort wo dein Tag ohnehin stattfindet. Das spart die halbe Stunde Anfahrt, an der die meisten guten Vorsätze scheitern.",
      },
      {
        title: "Wo wir in Mülheim trainieren",
        body: "Das Krafttraining mit Langhantel und Technik-Korrektur läuft im Studio. Für Conditioning und Einheiten an der frischen Luft nutze ich das Rheinufer Mülheim, flach und lang genug für Intervalle, und den Mülheimer Stadtgarten für alles mit dem eigenen Körpergewicht. Im Winter verschiebt sich der Mix nach drinnen, der Plan bleibt derselbe.",
      },
      {
        title: "Zwei Termine pro Woche, ein Plan, messbare Schritte",
        body: "Wir starten mit einer kostenlosen Erstberatung: Ziel, Ausgangslage, Zeitfenster. Danach stehen zwei feste Termine pro Woche. Jede Übung wird sauber aufgebaut, Gewichte und Wiederholungen notiere ich mit, und alle vier Wochen schauen wir auf die Zahlen: Kraftwerte, Gewicht, Umfänge. So siehst du, ob sich etwas bewegt, bevor der Spiegel es zeigt.",
      },
      {
        title: "Ernährung gehört dazu, wenn du willst",
        body: "Beim Abnehmen oder Muskelaufbau entscheidet die Küche mit. Dafür arbeite ich mit Natalie zusammen, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie baut dir einen Wochenplan, der zu deinem Alltag passt, ohne Verbotslisten. Das ist kein Pflichtteil: wer nur trainieren will, trainiert nur.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Mülheim?",
        a: "50€ pro Stunde im 1-zu-1. Wer ortsunabhängig arbeiten will, nimmt das Online Coaching ab 150€ im Monat mit Trainingsplan per App und wöchentlichen Video-Check-ins. Die Erstberatung ist kostenlos.",
      },
      {
        q: "Trainierst du direkt in Mülheim?",
        a: "Ja, die Outdoor-Anteile laufen am Rheinufer Mülheim und im Mülheimer Stadtgarten. Das Krafttraining findet im Studio statt. Wie sich das verteilt, hängt von deinem Ziel ab und steht im Plan.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein, das ist der Normalfall. Wir fangen mit einem Technik-Check an und bauen die Belastung über Wochen auf. Gerade Wiedereinsteiger profitieren vom 1-zu-1, weil Fehler korrigiert werden, bevor sie zu Schmerzen werden.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraftwerte bewegen sich in den ersten vier bis sechs Wochen, sichtbare Veränderung braucht rund drei Monate konsequentes Training. Was ich zusage: ein Plan, der zu deinem Alltag passt, und Zahlen, an denen wir den Fortschritt gemeinsam ablesen.",
      },
    ],
  },

  "ehrenfeld/personal-training": {
    answer:
      "Personal Training in Köln-Ehrenfeld heißt bei mir: 1-zu-1 Krafttraining mit Plan und Progression, Outdoor-Einheiten im Inneren Grüngürtel, Termine auch früh morgens und spät abends. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Ehrenfeld: 1-zu-1 mit Plan und Progression, Outdoor im Inneren Grüngürtel, Termine früh und spät. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ehrenfeld ist voll, dein Training braucht trotzdem Platz",
        body: "Mit 38.405 Einwohnern auf 3,71 km² gehört Ehrenfeld zu den am dichtesten besiedelten Stadtteilen Kölns. Das merkst du abends im Fitnessstudio: Wartezeit am Rack, wenig Platz, keine Korrektur. Im 1-zu-1 ist es umgekehrt. Der Termin gehört dir, jede Wiederholung wird gesehen, und der Plan ist auf dich gebaut statt auf den Durchschnitt.",
      },
      {
        title: "Grüngürtel statt Laufband",
        body: "Ehrenfeld grenzt direkt an den Inneren Grüngürtel, eine der besten Trainingsflächen der Stadt: lange gerade Wege für Intervalle, Wiesen für Zirkel mit dem eigenen Körpergewicht. Für kurze Mobility-Einheiten reicht der Grüner Weg Park. Das schwere Krafttraining bleibt im Studio, draußen holen wir Ausdauer und Spannkraft.",
      },
      {
        title: "So läuft der Einstieg",
        body: "Zuerst ein kostenloses Erstgespräch: was du erreichen willst, wie deine Woche aussieht, was bisher nicht funktioniert hat. Dann ein Technik-Check und die ersten zwei Wochen Training. Ab da läuft der Rhythmus: zwei Einheiten pro Woche, Progression bei Gewichten und Wiederholungen, alle vier Wochen ein Blick auf die Zahlen. Wenn Abnehmen dein Ziel ist, holt Natalie die Ernährung dazu, als Ernährungsberaterin für Sport- und Fitnessernährung.",
      },
      {
        title: "Termine, die zu Ehrenfelder Arbeitszeiten passen",
        body: "Zwischen Venloer Straße und Bahnbögen arbeiten viele selbstständig, in Schichten oder in Jobs ohne klassischen Feierabend. Deshalb halte ich in Ehrenfeld auch Slots am frühen Morgen und am späten Abend frei. Ein fester Termin, der wirklich in deine Woche passt, schlägt jeden Motivationstrick.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Ehrenfeld?",
        a: "Die 1-zu-1 Stunde kostet 50€. Online Coaching mit Plan per App startet bei 150€ im Monat. Das Erstgespräch kostet nichts, danach entscheidest du.",
      },
      {
        q: "Wo findet das Training in Ehrenfeld statt?",
        a: "Outdoor im Inneren Grüngürtel oder im Grüner Weg Park, das Krafttraining im Studio. Wie sich das verteilt, hängt von deinem Ziel und der Jahreszeit ab.",
      },
      {
        q: "Gibt es Termine vor der Arbeit?",
        a: "Ja. Früh morgens und spät abends halte ich bewusst Slots frei, weil viele in Ehrenfeld keinen klassischen Feierabend haben. Im Erstgespräch finden wir ein Fenster, das dauerhaft hält.",
      },
      {
        q: "Personal Trainer oder Fitnessstudio: was bringt mehr?",
        a: "Das hängt von dir ab. Wer allein dranbleibt und saubere Technik hat, braucht kein 1-zu-1. Wer seit Monaten dasselbe trainiert, Schmerzen umgeht oder nie länger als vier Wochen durchhält, holt mit einem Trainer mehr heraus, weil Plan und Kontrolle von außen kommen.",
      },
    ],
  },
  "poll/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Poll spielt sich dort ab, wo Platz ist: Antritte und Richtungswechsel auf den Poller Wiesen, Intervalle am Rheinufer Richtung Südbrücke, Kraft und Sprungkraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Poll: Antritte auf den Poller Wiesen, Intervalle am Rheinufer bis zur Südbrücke, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Die Poller Wiesen sind dein Stadion",
        body: "Poll liegt direkt am rechten Rheinufer, und die Poller Wiesen gehören zu den größten offenen Flächen der Stadt: weites, flaches Grün am Strom, mit Blick auf Dom und Skyline. Für Athletiktraining heißt das freie Bahn. Wir laufen Steigerungen und Antritte über 30, 50 und 80 Meter, üben Richtungswechsel und Abstoppen auf der Wiese, und niemand verlangt Eintritt oder einen Hallenplan. Bei 11.184 Einwohnern auf 5,17 km² bleibt Poll dabei angenehm ruhig, vor allem morgens.",
      },
      {
        title: "Rundkurse statt Hin und Her",
        body: "Der Uferweg in Poll ist flach und gut messbar, dadurch lassen sich Intervalle sauber wiederholen und Zeiten ehrlich vergleichen. Über den Steg der Südbrücke bist du in wenigen Minuten auf der linken Rheinseite: so entstehen Rundkurse verschiedener Länge, und das Tempotraining fühlt sich nach Strecke an statt nach Pendeln. Für lockere Dauerläufe als Grundlage taugt derselbe Weg Richtung Deutz, wo der Rheinboulevard anschließt.",
      },
      {
        title: "Drei Teile pro Einheit, Zahlen statt Gefühl",
        body: "Jede Einheit in Poll hat drei Teile: Mobilisieren und Anlaufen auf dem Weg zur Wiese, dann der Hauptblock mit Schnelligkeit, Sprüngen oder Intervallen je nach Phase, zum Schluss Rumpfarbeit. Die Kraft- und Sprungkraftarbeit an der Langhantel bleibt im Studio. Getestet wird regelmäßig: Sprintzeit, Sprunghöhe, Kraftwerte. Der Plan folgt den Zahlen, nicht andersherum.",
      },
      {
        title: "Wer in Poll bei mir anfragt",
        body: "Viele Anfragen kommen von Vereinssportlern aus dem rechtsrheinischen Süden, die für Fußball oder Tennis schneller und stabiler werden wollen, und von Läufern, die ohnehin an den Poller Wiesen unterwegs sind. Auch wer in den Büros in Deutz arbeitet, einen Stadtteil weiter nördlich, legt die Einheit oft an den Feierabend auf die Wiese statt in ein volles Studio.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Poll?",
        a: "Die 1-zu-1 Stunde kostet 50€. Wer mit Plan per App und wöchentlichen Check-ins arbeiten will, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch kostet in beiden Fällen nichts.",
      },
      {
        q: "Wo treffen wir uns in Poll?",
        a: "Meist direkt an den Poller Wiesen oder bei dir vor der Haustür, das Warm-up passiert auf dem Weg. Die Kraftanteile laufen im Studio, das Material für draußen bringe ich mit.",
      },
      {
        q: "Kann ich Athletiktraining mit meinem Vereinssport kombinieren?",
        a: "Ja, genau dafür ist es gedacht. Wir legen die Einheiten um deine Spiel- und Trainingstage herum, damit du am Wochenende frisch bist statt platt. In Belastungswochen wird der Plan entschärft.",
      },
      {
        q: "Was passiert bei Regen?",
        a: "Entweder verlegen wir den Schwerpunkt ins Studio oder wir passen die Einheit an, Sprünge und Rumpf gehen auch drinnen. Der Plan rechnet mit Kölner Wetter, ausfallen muss deswegen nichts.",
      },
    ],
  },

  "rath-heumar/athletiktraining": {
    answer:
      "Athletiktraining in Rath/Heumar beginnt am Waldrand: der Königsforst liefert lange, weiche Laufwege für die Ausdauerbasis und mit dem Monte Troodelöh den höchsten Punkt Kölns für Bergauf-Antritte. Kraft und Sprungkraft kommen aus dem Studio. 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln Rath/Heumar: Tempoläufe im Königsforst, Bergauf-Antritte am Monte Troodelöh, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der Königsforst ist die größte Trainingsfläche im Kölner Osten",
        body: "Rath/Heumar gehört mit 12,91 km² zu den flächengrößten Stadtteilen Kölns, und bei 11.833 Einwohnern ist ein großer Teil davon Wald. Die Forstwege im Königsforst sind lang, gerade und weich: ideal für Tempoläufe und lange Intervalle, weil der Boden die Gelenke weniger belastet als Asphalt. Die KVB-Linie 9 endet an der Haltestelle Königsforst, direkt am Waldrand. Du brauchst kein Auto, um zur besten Strecke des Stadtteils zu kommen.",
      },
      {
        title: "Bergauf-Antritte am höchsten Punkt Kölns",
        body: "Mitten im Königsforst liegt der Monte Troodelöh, mit rund 118 Metern die höchste natürliche Erhebung des Kölner Stadtgebiets. Köln ist flach, und wer Hügel für sein Training sucht, findet sie fast nirgends. Hier schon. Kurze, knackige Antritte bergauf bauen Schnellkraft auf und sind dabei schonender als Flachsprints mit vollem Tempo. Für Vereinssportler ist das einer der wirksamsten Blöcke im ganzen Plan.",
      },
      {
        title: "Waldboden draußen, Langhantel drinnen",
        body: "Die Mischung macht das Athletiktraining: Schnelligkeit und Ausdauer holen wir im Wald, Maximalkraft und Sprungkraft an der Langhantel und am Kasten im Studio. Alle paar Wochen stehen Testtage an, dann vergleichen wir Sprintzeiten, Sprunghöhe und Kraftwerte mit dem Stand davor. Bewegt sich eine Zahl nicht, wird der Plan umgebaut und nicht einfach weitergemacht.",
      },
      {
        title: "Wer hier trainiert",
        body: "Typische Kunden aus Rath/Heumar sind Vereinssportler aus den Klubs rund um Rath, Brück und Ostheim, Läufer, die den Königsforst längst kennen und schneller werden wollen, und Berufstätige, die am Autobahnkreuz Köln-Ost täglich pendeln und das Training deshalb direkt vor die Haustür legen. Das Einstiegsniveau spielt keine Rolle, der Technik-Check am Anfang legt den Startpunkt fest.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Rath/Heumar?",
        a: "50€ pro Stunde im 1-zu-1. Das Online Coaching mit Trainingsplan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Die Erstberatung ist kostenlos.",
      },
      {
        q: "Wo genau treffen wir uns für die Waldeinheiten?",
        a: "Meist an der KVB-Endhaltestelle Königsforst oder an einem Waldzugang in deiner Nähe. Von dort sind die Trainingswege in wenigen Minuten erreichbar, das Material bringe ich mit.",
      },
      {
        q: "Ich laufe schon regelmäßig im Königsforst. Was bringt mir Athletiktraining zusätzlich?",
        a: "Tempo und Widerstandsfähigkeit. Reines Kilometersammeln macht ausdauernd, aber nicht schnell. Mit Antritten, Sprüngen und gezielter Kraftarbeit verbesserst du Schrittkraft und Laufökonomie, und das merkst du auch auf deinen gewohnten Runden.",
      },
      {
        q: "Funktioniert das Training auch im Winter?",
        a: "Ja. Die Forstwege sind das ganze Jahr nutzbar, bei Glätte oder Dauerregen wandert der Schwerpunkt ins Studio. Der Plan berücksichtigt die Jahreszeit von Anfang an.",
      },
    ],
  },

  "muelheim/abnehmen": {
    answer:
      "Abnehmen in Köln-Mülheim läuft bei mir ohne Crash-Diät: Krafttraining zweimal pro Woche, ein Kaloriendefizit, das zu deinem Alltag passt, und auf Wunsch Ernährungsberatung mit Natalie. Realistisch sind ein bis zwei Kilo Fett im Monat. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen mit Personal Trainer in Köln-Mülheim: Krafttraining, Kaloriendefizit und Ernährungsplan statt Crash-Diät. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Abnehmen zwischen Wiener Platz und Keupstraße",
        body: "Mülheim ist mit 43.296 Einwohnern der größte Stadtteil Kölns, und gegessen wird hier gut: die Keupstraße gehört zu den bekanntesten Restaurantmeilen der Stadt. Ein Abnehmplan, der Essengehen verbietet, hält in Mülheim keine zwei Wochen. Deshalb baue ich das Defizit andersherum auf: der Abend auf der Keupstraße wird eingeplant statt gebeichtet, und die restliche Woche gleicht ihn aus. So bleibt der Plan alltagstauglich, und nur ein Plan, der bleibt, verändert dein Gewicht.",
      },
      {
        title: "Krafttraining schützt deine Muskeln im Defizit",
        body: "Wer nur weniger isst und dazu Cardio macht, verliert neben Fett auch Muskeln, und genau die halten den Verbrauch hoch. Deshalb steht bei mir Krafttraining im Zentrum: zwei Einheiten pro Woche, Grundübungen mit sauberer Technik, Gewichte, die langsam steigen. Die Waage ist dabei nur eine von mehreren Zahlen. Umfänge, Kraftwerte und Fotos zeigen die Veränderung oft früher und ehrlicher.",
      },
      {
        title: "Dein Alltag verbrennt mehr als dein Trainingstag",
        body: "Zwei Stunden Training pro Woche entscheiden wenig, wenn die restlichen 166 im Sitzen stattfinden. Mülheim macht dir die Alltagsbewegung leicht: der Uferweg am Rhein Richtung Stammheimer Schlosspark ist eine der einfachsten Geh-Strecken der Stadt, flach und ohne eine einzige Ampel. Wer die kurzen Wege im Veedel zu Fuß erledigt und dazu zwei feste Spaziergänge einbaut, hebt seinen Verbrauch spürbar, ohne dafür Trainingszeit zu opfern.",
      },
      {
        title: "Ernährung mit Natalie, wenn du Struktur willst",
        body: "Wenn du beim Essen klare Vorgaben brauchst, übernimmt Natalie diesen Teil. Sie ist Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung und plant deine Woche so, wie du wirklich einkaufst und kochst. Verbotslisten stehen da nicht drin, Zahlen schon: Eiweiß-Zielwert, Portionsgrößen und ein Plan B für Tage, an denen nichts nach Plan läuft. Wer lieber nur trainiert, trainiert nur.",
      },
    ],
    faq: [
      {
        q: "Wie schnell kann ich mit Personal Training abnehmen?",
        a: "Ein bis zwei Kilo Fett im Monat sind realistisch und haltbar. Schnellere Verluste bestehen meist aus Wasser und Muskelmasse, und die holst du dir mit dem Jojo-Effekt doppelt zurück.",
      },
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Mülheim?",
        a: "Die 1-zu-1 Stunde kostet 50€. Im Online Coaching ab 150€ im Monat ist die Ernährungssteuerung enthalten, dazu wöchentliche Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich aufs Essengehen verzichten?",
        a: "Nein. Ein Restaurantabend pro Woche wird in dein Defizit eingeplant, auch auf der Keupstraße. Verzichtspläne scheitern, kalkulierte Ausnahmen nicht.",
      },
      {
        q: "Brauche ich eine Mitgliedschaft im Fitnessstudio?",
        a: "Nein. Das Krafttraining läuft im Rahmen deiner Stunde im Studio, für die Tage dazwischen bekommst du Einheiten mit dem eigenen Körpergewicht und einen Schritte-Richtwert.",
      },
    ],
  },

  "ensen/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Ensen hat kurze Wege: der Stadtteil ist einer der kleinsten im Bezirk Porz, und das Rheinufer liegt von jeder Ecke nur ein paar Minuten entfernt. Dort laufen wir Intervalle und Antritte, Kraft und Sprungkraft kommen aus dem Studio. 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Ensen: Intervalle und Antritte am Rheinufer zwischen Westhoven und Porz, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Klein, flach, direkt am Rhein",
        body: "Ensen zählt 7.684 Einwohner auf 1,62 km² und ist damit einer der kleinsten Stadtteile im Bezirk Porz. Für dein Training ist das ein Vorteil: egal wo du wohnst, der Uferweg am Rhein ist in wenigen Minuten erreichbar, es gibt keine Anfahrt, die eine Einheit auffrisst. Der Weg selbst ist flach und frei, Richtung Norden läufst du nach Westhoven, Richtung Süden bis ins Porzer Zentrum.",
      },
      {
        title: "Eine Strecke, auf der sich Fortschritt messen lässt",
        body: "Gutes Tempotraining braucht wiederholbare Bedingungen, sonst vergleichst du Äpfel mit Birnen. Der Uferabschnitt zwischen Ensen und Porz liefert genau das: gleicher Belag, kein Gefälle, kaum Querverkehr. Hier laufen wir Intervalle mit festen Abschnitten und Antritte mit fliegendem Start, und die Zeiten von heute lassen sich ehrlich gegen die von vor sechs Wochen halten.",
      },
      {
        title: "Athletik, die in den Feierabend passt",
        body: "Die meisten Anfragen aus Ensen kommen von Berufstätigen, die nach der Arbeit trainieren wollen, ohne noch einmal durch die halbe Stadt zu fahren. Die Stadtbahn hält mitten im Stadtteil, und die Einheit beginnt bei dir vor der Haustür: Mobilisieren auf dem Weg zum Ufer, Hauptblock am Rhein, Rumpf zum Abschluss. Nach 60 Minuten bist du wieder zuhause.",
      },
      {
        title: "Was im Studio dazukommt",
        body: "Schnelligkeit allein reicht nicht, die Basis ist Kraft. Im Studio arbeiten wir an Maximalkraft mit der Langhantel, an Sprungkraft und an der Stabilität von Rumpf und Sprunggelenken, gerade für Vereinssportler der Teil, der Verletzungen vorbeugt. Draußen und drinnen folgen demselben Plan, und bei den Testtagen zählen beide Seiten: Sprintzeit am Ufer, Kraftwerte an der Hantel.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Ensen?",
        a: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App gibt es ab 150€ im Monat. Das Erstgespräch kostet nichts und klärt, welches Format passt.",
      },
      {
        q: "Wo findet das Training in Ensen statt?",
        a: "Die Laufeinheiten am Uferweg zwischen Westhoven und Porz, Treffpunkt bei dir vor der Haustür oder direkt am Rhein. Kraft und Sprungkraft trainieren wir im Studio.",
      },
      {
        q: "Ich jogge schon am Rheinufer. Lohnt sich Athletiktraining trotzdem?",
        a: "Ja, denn Joggen macht ausdauernd, aber kaum schneller oder stabiler. Antritte, Sprünge und Kraftarbeit füllen genau diese Lücke, und dein gewohntes Laufen profitiert direkt davon.",
      },
      {
        q: "Wie viele Einheiten pro Woche sind sinnvoll?",
        a: "Zwei geführte Einheiten reichen für messbaren Fortschritt, wenn Belastung und Pausen stimmen. Dazu kommen kurze Hausaufgaben von 15 bis 20 Minuten für die Tage dazwischen.",
      },
    ],
  },

  "lind/personal-training": {
    answer:
      "Personal Training in Köln-Lind: ich komme zu dir nach Hause oder wir trainieren direkt in der Wahner Heide, die am Ortsrand beginnt. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    metaDescription:
      "Personal Training in Köln-Lind: 1-zu-1 bei dir zu Hause oder in der Wahner Heide am Ortsrand. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    sections: [
      {
        title: "In Lind kommt das Training zu dir",
        body: "Lind ist mit 3.691 Einwohnern eines der kleinsten Veedel im Bezirk Porz, eher Dorf als Stadt, zwischen Wahn und Libur gelegen. Wer hier wohnt, hat kein Fitnessangebot um die Ecke und fährt für jede Einheit erst einmal los. Genau deshalb drehe ich es um: ich bringe das Training zu dir. Kurzhanteln, Widerstandsbänder und alles Weitere habe ich dabei, ein paar freie Quadratmeter in Wohnzimmer, Garage oder Garten reichen für ein komplettes Programm.",
      },
      {
        title: "Die Wahner Heide beginnt am Ortsrand",
        body: "Östlich von Lind liegt die Wahner Heide, eines der größten Naturschutzgebiete im Kölner Raum. Für das Training ist sie ein Glücksfall: sandige, weiche Wege, die Waden und Fußgelenke stärker fordern als jeder Asphalt, dazu Ruhe, die man im Rest der Stadt lange sucht. Hier laufen wir Grundlagen und Intervalle, dazwischen kommen Blöcke mit dem eigenen Körpergewicht. Im Sommer verlegen viele Kunden fast alles nach draußen.",
      },
      {
        title: "Flughafen-Schichten und Pendler-Kalender",
        body: "Der Flughafen Köln/Bonn liegt gleich hinter der Heide, und viele in Lind und Umgebung arbeiten dort in Schichten. Ein Trainingsplan, der nur den Feierabend um 18 Uhr kennt, scheitert daran in der zweiten Woche. Meine Termine liegen deshalb auch am Vormittag oder frühen Nachmittag, und der Plan rechnet mit wechselnden Wochen: feste Struktur, aber verschiebbare Bausteine, damit eine Spätschicht nicht gleich die ganze Woche kippt.",
      },
      {
        title: "Was es kostet und wie es anfängt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Am Anfang steht ein kostenloses Erstgespräch über dein Ziel, deine Woche und den Trainingsort. Danach folgen Technik-Check und die ersten Einheiten, und du merkst schnell, ob die Zusammenarbeit trägt. Entscheiden kannst du in Ruhe, es gibt keine Vertragsfalle.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Lind?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos. Da ich das Material mitbringe, brauchst du keine eigene Ausrüstung.",
      },
      {
        q: "Wo trainieren wir in Lind?",
        a: "Meistens bei dir zu Hause oder im Garten, für Ausdauer und Intervalle in der Wahner Heide am Ortsrand. Wer schweres Langhanteltraining will, kombiniert das mit Terminen im Studio.",
      },
      {
        q: "Ich arbeite am Flughafen im Schichtdienst. Geht das?",
        a: "Ja, das ist in Lind eher die Regel als die Ausnahme. Termine lege ich auch in den Vormittag oder Nachmittag, und der Plan wird um deinen Schichtrhythmus gebaut.",
      },
      {
        q: "Reicht mein Wohnzimmer wirklich für ein Training?",
        a: "Ja. Mit Körpergewicht, Bändern und Kurzhanteln deckst du Kraft, Ausdauer und Beweglichkeit ab. Entscheidend ist der Plan und die saubere Ausführung, nicht die Geräteauswahl.",
      },
    ],
  },

  "dellbrueck/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Dellbrück nutzt, was der Stadtteil wirklich hat: die offenen Sandflächen der Dellbrücker Heide für Sprints und Sprünge, die Waldwege am Thielenbruch für Tempoläufe, das Studio für Kraft. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Dellbrück: Sprints auf dem Sand der Dellbrücker Heide, Tempoläufe am Thielenbruch, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Die Dellbrücker Heide ist ein Trainingsgerät",
        body: "Wo früher ein Truppenübungsplatz lag, liegt heute eines der ungewöhnlichsten Trainingsgelände Kölns: die Dellbrücker Heide, offene Sandheide mitten im Stadtteil. Sandboden ist für Athletiktraining Gold wert. Er bremst jeden Antritt, zwingt Waden und Hüftstrecker zu mehr Arbeit und macht Sprünge gelenkschonender, weil die Landung weich ist. Sprints, die auf Asphalt leicht aussehen, werden hier ehrlich. Wer auf Sand schneller wird, merkt das auf festem Boden sofort.",
      },
      {
        title: "Thielenbruch und Königsforst für die Ausdauerbasis",
        body: "Am östlichen Rand von Dellbrück beginnt der Thielenbruch, und dahinter zieht sich der Wald weiter Richtung Königsforst. Auf diesen Wegen laufen wir die ruhigen Kilometer, die das Fundament für jede Schnelligkeit sind: Grundlagenausdauer, Technikläufe, lockere Intervalle. Mit 9,95 km² ist Dellbrück groß genug, dass du für keine Einheit den Stadtteil verlassen musst. Die Linien 3 und 18 enden direkt am Thielenbruch, falls du nicht vor der Haustür startest.",
      },
      {
        title: "Messen statt vermuten",
        body: "Athletiktraining heißt bei mir: am Anfang ein Technik-Check mit Sprint, Sprung und Rumpfstabilität, danach zwei geführte Einheiten pro Woche, eine draußen, eine im Studio für Kraft und Sprungkraft. Alle vier bis sechs Wochen wird nachgemessen, auf denselben Strecken und mit denselben Tests. Bewegen sich Sprintzeit und Sprunghöhe nicht, ändere ich den Plan und nicht die Ausrede.",
      },
      {
        title: "Für wen das in Dellbrück gedacht ist",
        body: "Fast 22.000 Menschen wohnen in Dellbrück, viele davon in Vereinen zwischen Fußballplatz und Laufgruppe. Typische Anfragen: Fußballer, die im Antritt verlieren, Läuferinnen, die trotz Kilometern nicht schneller werden, Wiedereinsteiger, die belastbar werden wollen, bevor sie wieder ins Mannschaftstraining gehen. Das Niveau setzt der Eingangstest, nicht dein Alter und nicht dein Verein.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Dellbrück?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching mit Plan und Check-ins ab 150€ im Monat. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Wo trainieren wir in Dellbrück genau?",
        a: "Schnelligkeit und Sprünge auf den Sandflächen der Dellbrücker Heide, Ausdauer auf den Waldwegen am Thielenbruch, Kraft im Studio. Den Mix bestimmt dein Ziel und die Jahreszeit.",
      },
      {
        q: "Ist Training auf Sand nicht gefährlich für die Gelenke?",
        a: "Im Gegenteil: der weiche Boden dämpft Landungen und reduziert Stoßbelastung. Anstrengender ist er trotzdem, weil jeder Abdruck mehr Muskelarbeit kostet. Genau deshalb wirkt er so gut.",
      },
      {
        q: "Ich spiele im Verein. Ersetzt das Athletiktraining mein Mannschaftstraining?",
        a: "Nein, es ergänzt es. Wir arbeiten an dem, was im Vereinstraining zu kurz kommt: Antritt, Sprungkraft, Stabilität, Lauftechnik. Die Einheiten lege ich so, dass sie sich mit deinen Trainingstagen vertragen.",
      },
    ],
  },

  "suerth/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Sürth heißt: Natalie, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, baut dir einen Wochenplan, der in deinen Familien- und Pendleralltag passt, ohne Verbotslisten. Im Online Coaching ab 150€ im Monat ist sie enthalten, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Sürth mit Natalie: Makros, Wochenplan und Einkaufsliste für Familien- und Pendleralltag, abgestimmt aufs Training. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Warum in Sürth meist das Essen entscheidet, nicht das Training",
        body: "Die meisten Anfragen aus dem Kölner Süden klingen ähnlich: das Training läuft irgendwie, aber auf der Waage und im Spiegel passiert nichts. Fast immer liegt die Antwort in der Küche. Genau dafür ist Natalie da, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie rechnet keinen Modeplan herunter, sondern schaut sich an, was du isst, wann dein Tag Lücken lässt und was deine Familie überhaupt mitisst, und baut daraus einen Plan, der hält.",
      },
      {
        title: "Ein Plan, den auch der Familientisch übersteht",
        body: "Sürth ist ein Veedel mit vielen Familien, und das häufigste Scheitern von Ernährungsplänen ist das zweite Kochen: ein Essen für dich, eins für den Rest des Tisches. Das hält niemand sechs Wochen durch. Natalies Pläne gehen andersherum: ein Gericht für alle, deine Portion und deine Eiweißquelle angepasst. Dazu eine Einkaufsliste für die Woche, damit die Entscheidung am Abend nicht mehr im Kühlschrank fällt.",
      },
      {
        title: "Makros statt Verbote, Zahlen statt Gefühl",
        body: "Am Anfang stehen dein Kalorienziel und die Verteilung von Eiweiß, Kohlenhydraten und Fett, abgestimmt auf dein Training und dein Ziel, egal ob Abnehmen oder Muskelaufbau. Danach wird gemessen: Gewicht im Wochenschnitt, Umfänge, Fotos, wenn du magst. Alle paar Wochen schaut Natalie auf die Zahlen und stellt nach. Kein Lebensmittel ist verboten, auch nicht das Eis am Sürther Rheinufer; es ist nur eingeplant statt verdrängt.",
      },
      {
        title: "Wie Beratung und Training zusammenspielen",
        body: "Die Ernährungsberatung ist bei FitPrimo Teil des Online Coachings ab 150€ im Monat: Trainingsplan per App von mir, Ernährungssteuerung von Natalie, wöchentliche Check-ins. Wer in Sürth zusätzlich 1-zu-1 trainieren will, nimmt Stunden zu 50€ dazu, zu Hause oder draußen am Rhein. Der Einstieg ist in jedem Fall ein kostenloses Erstgespräch, bei dem du beide Seiten kennenlernst: Plan und Mensch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Sürth?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch mit uns kostet nichts.",
      },
      {
        q: "Wer macht die Ernährungsberatung bei FitPrimo?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie betreut die Ernährungsseite aller Coachings, während ich das Training übernehme.",
      },
      {
        q: "Muss ich dafür irgendwo hinfahren?",
        a: "Nein. Die Beratung läuft online, mit Video-Check-ins und Plan per App. Das passt zum Sürther Alltag zwischen Familie und Pendeln mit der Linie 16 besser als ein fester Praxistermin.",
      },
      {
        q: "Ich will abnehmen, aber nicht für die Familie extra kochen. Geht das?",
        a: "Ja, das ist der Normalfall, mit dem Natalie arbeitet: ein Gericht für alle, deine Portion angepasst. Verbote gibt es nicht, nur ein Kalorien- und Eiweißziel, das zu deinem Training passt.",
      },
      {
        q: "Behandelt ihr auch Unverträglichkeiten oder Krankheiten?",
        a: "Nein. Natalies Schwerpunkt ist Sport- und Fitnessernährung für gesunde Erwachsene. Bei medizinischen Themen gehört die Ernährung in ärztliche Hände, und das sagen wir dir im Erstgespräch auch offen.",
      },
    ],
  },

  "eil/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Eil hat das größte Gelände der Stadt direkt vor der Tür: die Wahner Heide mit ihren Sandwegen für Antritt und Ausdauer, dazu Kraft und Sprungkraft im Studio. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Eil: Antritt und Ausdauer auf den Sandwegen der Wahner Heide, Kraft im Studio, Termine auch für Flughafen-Schichten. 50€/Std.",
    sections: [
      {
        title: "16 Quadratkilometer, und fast alles davon ist Trainingsgelände",
        body: "Eil ist mit 16,25 km² einer der flächengrößten Stadtteile Kölns, hat aber nur 9.336 Einwohner, weil ein Großteil der Fläche zur Wahner Heide gehört. Für Athletiktraining ist das ein seltener Luxus: du startest die Einheit an der Haustür und bist nach wenigen Minuten auf Wegen, auf denen dir niemand ausweichen muss. Keine Anfahrt, keine Wartezeit an Geräten, nur Strecke und Plan.",
      },
      {
        title: "Was der Heideboden mit deinem Antritt macht",
        body: "Die Wege in der Heide sind sandig und uneben, und genau das unterscheidet sie vom Tartan oder Asphalt: jeder Schritt verlangt Stabilisation in Fuß, Knie und Hüfte. Wir nutzen das gezielt, mit kurzen Antritten bergan auf festen Abschnitten, Läufen auf wechselndem Untergrund für die Fußgelenke und Intervallen, bei denen der Boden die Intensität mitbestimmt. Die Sprung- und Maximalkraft bauen wir parallel im Studio auf, mit Hantel und Messlatte statt Zufall.",
      },
      {
        title: "Termine, die mit dem Flughafen leben können",
        body: "Der Flughafen Köln/Bonn liegt direkt hinter der Heide, und viele in Eil, Grengel und Urbach arbeiten dort, in Schichten, die sich wöchentlich drehen. Mein Kalender ist darauf eingestellt: Einheiten auch am Vormittag oder frühen Nachmittag, ein Plan mit verschiebbaren Bausteinen und kurze Programme für die Tage, an denen keine gemeinsame Einheit passt. So überlebt das Training auch einen Monat Frühschicht.",
      },
      {
        title: "So läuft der Einstieg",
        body: "Erst das kostenlose Erstgespräch über Ziel und Woche, dann der Technik-Check: Sprint, Sprung, Rumpf. Daraus entsteht der Plan, meist zwei geführte Einheiten pro Woche, eine in der Heide, eine im Studio. Nach vier bis sechs Wochen stehen die ersten Vergleichswerte, und ab da zählt nur noch eine Frage: werden die Zahlen besser? Die Stunde kostet 50€, Online-Begleitung gibt es ab 150€ im Monat.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Eil?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching ab 150€ im Monat. Für das Erstgespräch zahlst du nichts.",
      },
      {
        q: "Wo in Eil trainieren wir?",
        a: "Schnelligkeit und Ausdauer auf den Wegen der Wahner Heide, die direkt am Stadtteil beginnt; Kraft und Sprungkraft im Studio. Treffpunkt und Mix legen wir nach deinem Wohnort und Ziel fest.",
      },
      {
        q: "Ich arbeite am Flughafen in Wechselschicht. Wie planen wir das?",
        a: "Wir legen die Termine um deinen Schichtplan, auch vormittags. Der Trainingsplan hat feste Bausteine, aber bewegliche Tage, und für volle Wochen gibt es kurze Einheiten für dich allein.",
      },
      {
        q: "Brauche ich einen Verein oder Wettkampfziele für Athletiktraining?",
        a: "Nein. Schneller, stabiler und belastbarer zu werden lohnt sich auch ohne Startnummer. Der Eingangstest setzt dein Niveau, der Plan holt dich genau dort ab.",
      },
    ],
  },

  "langel/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Langel nutzt den ruhigsten Rheinabschnitt der Stadt: flache Uferwege für Tempoläufe und Intervalle, Wiesen für Sprünge und Zirkel, Kraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Langel: Tempoläufe auf flachen Rheinuferwegen, Sprünge auf der Wiese, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der südlichste Rheinkilometer Kölns gehört dir fast allein",
        body: "Langel ist der südlichste rechtsrheinische Stadtteil Kölns, 3.588 Einwohner auf 5,33 km², dahinter beginnt der Rhein-Sieg-Kreis. Was nach Randlage klingt, ist für Athletiktraining ein Vorteil: die Uferwege am Langeler Rheinbogen sind flach, gerade und so leer, dass Tempoläufe ohne Slalom funktionieren. Gleiche Strecke, gleiche Bedingungen, vergleichbare Zeiten, so sieht man Fortschritt statt ihn zu vermuten.",
      },
      {
        title: "Uferweg, Wiese, Studio: drei Bausteine, ein Plan",
        body: "Auf dem Uferweg Richtung Zündorf und zur Groov laufen wir Intervalle und die ruhigen Grundlagenkilometer. Auf den Wiesen am Ortsrand stehen Sprungserien, Zirkel mit dem eigenen Körpergewicht und Rumpfarbeit auf weichem Boden. Und für Maximalkraft und Sprungkraft geht es ins Studio, denn die Basis für Schnelligkeit wird an der Hantel gelegt. Welche Mischung du brauchst, entscheidet der Technik-Check am Anfang, nicht ein Standardprogramm.",
      },
      {
        title: "Dörflich wohnen, strukturiert trainieren",
        body: "Wer in Langel wohnt, hat sich bewusst gegen die dichte Stadt entschieden, und meist gegen kurze Wege zu Studios. Deshalb komme ich hierher, mit Material im Kofferraum, und der Plan steht trotzdem auf Zahlen: Eingangstest, zwei Einheiten pro Woche, Nachmessen alle vier bis sechs Wochen. Zwischen den Terminen bekommst du kurze Programme von 15 bis 20 Minuten, die auf der Wiese hinterm Haus funktionieren.",
      },
      {
        title: "Für Vereinssportler und Wiedereinsteiger im Kölner Südosten",
        body: "Typische Kunden hier: Fußballer und Läuferinnen aus Zündorf, Wahn und Niederkassel, die an Antritt und Stabilität arbeiten wollen, und Wiedereinsteiger, die nach Jahren Pause erst belastbar werden müssen, bevor sie wieder Vollgas geben. Beides ist Athletiktraining, nur mit anderem Einstiegspunkt. Die Stunde kostet 50€, begleitetes Online-Training gibt es ab 150€ im Monat, und am Anfang steht immer das kostenlose Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Langel?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Wo genau trainieren wir in Langel?",
        a: "Tempoläufe und Intervalle auf den Rheinuferwegen Richtung Zündorf, Sprünge und Zirkel auf den Wiesen am Ortsrand, Kraft im Studio. Das Material für draußen bringe ich mit.",
      },
      {
        q: "Lohnt sich ein Athletiktrainer, wenn ich nur Hobbyläufer bin?",
        a: "Gerade dann: die meisten Hobbyläufer stagnieren, weil Kraft, Sprungkraft und Lauftechnik fehlen, nicht Kilometer. Genau diese Lücken schließt das Athletiktraining.",
      },
      {
        q: "Kommst du wirklich bis nach Langel raus?",
        a: "Ja. Langel gehört wie der ganze Bezirk Porz zu meinem Einzugsgebiet, und auch im angrenzenden Niederkassel trainiere ich. Treffpunkt und Anfahrt klären wir im Erstgespräch.",
      },
    ],
  },

  "suerth/personal-training": {
    answer:
      "Personal Training in Köln-Sürth: 1-zu-1 bei dir zu Hause oder draußen am Sürther Rheinufer, mit Plan, Progression und festen Terminen. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Sürth: 1-zu-1 zu Hause oder am Sürther Rheinufer, Termine die halten. 50€/Std, Online Coaching ab 150€/Monat, Erstberatung kostenlos.",
    sections: [
      {
        title: "Sürth trainiert am Wasser",
        body: "Das Rheinufer ist der größte Trainingsvorteil von Sürth: flache, lange Wege direkt am Wasser, die sich Richtung Weiß und Rodenkirchen fast beliebig verlängern lassen. Hier legen wir die Ausdauerbasis, laufen Intervalle und bauen Zirkel mit dem eigenen Körpergewicht. Die Strecke ist eben und gut messbar, deshalb siehst du deinen Fortschritt schwarz auf weiß, gleiche Strecke, bessere Zeit, niedrigerer Puls.",
      },
      {
        title: "Elftausend Nachbarn, ein Termin nur für dich",
        body: "Sürth ist mit 11.033 Einwohnern auf 3,42 km² ein gewachsenes Veedel im Kölner Süden, mit altem Ortskern und vielen Familien. Die häufigste Hürde hier ist nicht die Motivation, sondern der Familienkalender. Darum findet das Training dort statt, wo es sich einfügt: bei dir zu Hause, wenn die Kinder schlafen oder in der Schule sind, oder draußen am Rhein. Das Material bringe ich mit, aufgebaut ist in zwei Minuten.",
      },
      {
        title: "Mit der Linie 16 verbunden, aber ohne Fahrtzeit trainieren",
        body: "Viele Sürther pendeln mit der Stadtbahn-Linie 16 in die Innenstadt oder Richtung Bonn. Nach dem Arbeitstag plus Rückfahrt noch ein Studio anzusteuern, kostet die Stunde, die eigentlich dem Training gehören sollte. Das 1-zu-1 vor Ort spart genau diese Stunde. Und wer gezielt an Geräten arbeiten will, nimmt einzelne Studio-Termine dazu, der Plan verbindet beides ohne Bruch.",
      },
      {
        title: "Preise, Ablauf, erster Schritt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App und Ernährungssteuerung beginnt bei 150€ im Monat. Den Ernährungsteil betreut Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Los geht es mit einem kostenlosen Erstgespräch: Ziel, Alltag, Trainingsort. Danach Technik-Check, die ersten zwei Wochen, und alle vier Wochen ein ehrlicher Blick auf die Zahlen.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Sürth?",
        a: "Die 1-zu-1 Stunde kostet 50€, Online Coaching gibt es ab 150€ im Monat. Das Erstgespräch kostet nichts und verpflichtet zu nichts.",
      },
      {
        q: "Wo findet das Training in Sürth statt?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen am Sürther Rheinufer, mit Strecken Richtung Weiß und Rodenkirchen. Studio-Termine lassen sich dazunehmen.",
      },
      {
        q: "Ich habe kleine Kinder und wenig Zeit. Funktioniert das trotzdem?",
        a: "Ja, das ist in Sürth der Normalfall. Einheiten von 45 bis 60 Minuten bei dir zu Hause, Termine um den Familienkalender gelegt, und ein Plan, der auch mal eine ausgefallene Woche verkraftet.",
      },
      {
        q: "Krafttraining ohne Geräte, geht das überhaupt?",
        a: "Für den Einstieg und weit darüber hinaus ja: Körpergewicht, Bänder und Kurzhanteln reichen für saubere Progression. Wer später an die Langhantel will, wechselt für diese Einheiten mit mir ins Studio.",
      },
    ],
  },

  "rondorf/personal-training": {
    answer:
      "Personal Training in Köln-Rondorf: ich komme zu dir nach Hause, und für Läufe nutzen wir die Feldwege am Ortsrand oder das grüne Rodenkirchen nebenan. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Rondorf: 1-zu-1 zu Hause, Läufe auf den Feldwegen am Ortsrand oder in Rodenkirchen nebenan. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Viel Platz, kurze Wege: Rondorf ist ein Heimtrainings-Veedel",
        body: "Rondorf hat 9.293 Einwohner auf 8,2 km², das ist eine der niedrigsten Dichten im Kölner Süden. Hier wohnt man im Haus mit Garten statt in der Etagenwohnung, und genau das nutzen wir: das Training findet bei dir statt, drinnen oder draußen auf dem eigenen Rasen. Ich bringe Kurzhanteln, Bänder und das restliche Material mit. Kein Anfahrtsstress, kein Studio-Trubel, nur ein Termin, der dir gehört.",
      },
      {
        title: "Feldwege am Ortsrand, Grün in Rodenkirchen nebenan",
        body: "Rund um Rondorf läuft man direkt ins Offene: die Feldwege Richtung Meschenich und Hahnwald sind ruhig, flach und ideal für Grundlagenausdauer und Tempoläufe. Und das benachbarte Rodenkirchen legt nach, mit dem Forstbotanischen Garten, dem Friedenswald und dem Rheinufer nur ein paar Minuten entfernt. Für ein abwechslungsreiches Lauf- und Outdoor-Programm braucht es von Rondorf aus kein Auto und keine Bahnfahrt.",
      },
      {
        title: "Der Kölner Süden wächst, dein Plan wächst mit",
        body: "Rondorf ist ein Veedel der Berufstätigen und Familien, viele pendeln über Zollstock in die Innenstadt. Der Plan respektiert das: zwei feste Einheiten pro Woche, dazu kurze Hausaufgaben von 15 bis 20 Minuten für die Tage dazwischen. Ändert sich dein Alltag, neues Projekt, Nachwuchs, Verletzungspause, wird der Plan angepasst statt weggeworfen. Dranbleiben schlägt Perfektion, jede Woche.",
      },
      {
        title: "Kosten und Einstieg",
        body: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, inklusive Ernährungssteuerung durch Natalie, Ernährungsberaterin für Sport- und Fitnessernährung. Der erste Schritt ist ein kostenloses, unverbindliches Erstgespräch bei dir in Rondorf oder per Video: wir klären Ziel, Woche und Trainingsort. Danach entscheidest du, ob wir zusammen arbeiten.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Rondorf?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching startet bei 150€ im Monat. Das Erstgespräch ist kostenlos, auch bei dir zu Hause.",
      },
      {
        q: "Wo trainieren wir in Rondorf?",
        a: "Bei dir im Haus oder Garten, für Läufe auf den Feldwegen Richtung Meschenich und Hahnwald oder im grünen Rodenkirchen nebenan. Das Material bringe ich mit.",
      },
      {
        q: "Ich war noch nie im Fitnessstudio. Ist das schlimm?",
        a: "Nein, im Gegenteil: du startest ohne falsche Gewohnheiten. Wir bauen Technik und Belastung von Grund auf sauber auf, bei dir zu Hause, ohne Publikum.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraft und Kondition spürst du nach zwei bis drei Wochen, sichtbare Veränderungen brauchen je nach Ausgangslage sechs bis zehn Wochen. Versprechen, die schneller klingen, halten nicht.",
      },
    ],
  },

  "ehrenfeld/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Ehrenfeld: Schnelligkeit, Sprungkraft und Stabilität, trainiert im Inneren Grüngürtel direkt am Veedel und im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Ehrenfeld: Tempo, Sprungkraft und Stabilität im Inneren Grüngürtel und im Studio, mit messbaren Tests. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Athletik heißt: schneller, stabiler, belastbarer",
        body: "Athletiktraining ist kein Bodybuilding und kein Dauerlauf, sondern die Arbeit an den Grundlagen, die jeden Sport tragen: Antritt, Sprung, Richtungswechsel, Rumpfstabilität. Davon profitieren Fußballer und Läuferinnen genauso wie alle, die im Alltag einfach wieder spritzig sein wollen. In Ehrenfeld trainieren viele ambitionierte Hobbysportler, die seit Jahren dieselben Einheiten wiederholen, und genau da setzt ein strukturiertes Athletikprogramm an.",
      },
      {
        title: "Der Innere Grüngürtel ist deine Tartanbahn",
        body: "Direkt am Rand von Ehrenfeld liegt der Innere Grüngürtel, und für Athletiktraining ist er besser als jedes Laufband: gerade Rasenflächen für Beschleunigungssprints über 10 bis 40 Meter, weicher Boden für Sprünge und Landetechnik, Platz für Koordinationsleiter und Richtungswechsel. Die Einheiten draußen wechseln sich mit Studio-Terminen ab, dort kommen Langhantelkraft und Sprungkrafttraining mit sauberer Progression dazu.",
      },
      {
        title: "Gemessen wird, nicht geschätzt",
        body: "Am Anfang steht ein Test: Sprintzeit, Sprunghöhe, Rumpfstabilität, Beweglichkeit. Diese Werte sind dein Startpunkt, und alle vier bis sechs Wochen messen wir nach. So siehst du, ob das Training wirkt, bevor du es im Spiel oder beim Wettkampf merkst. Bewegt sich ein Wert nicht, wird der Plan geändert. Das klingt nüchtern, ist aber der Unterschied zwischen Training und Beschäftigung.",
      },
      {
        title: "Für wen das Programm in Ehrenfeld gedacht ist",
        body: "Typische Kunden hier: Vereinssportler, die in der Saisonvorbereitung einen Schub brauchen, Läuferinnen mit Tempo-Plateau, Wiedereinsteiger nach Verletzung, die Vertrauen in Knie und Sprunggelenk zurückwollen. Das Niveau bestimmt der Eingangstest, nicht dein Lebenslauf. Termine gibt es auch früh morgens und spät abends, denn ein fester Feierabend ist in Ehrenfeld eher die Ausnahme.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Ehrenfeld?",
        a: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App beginnt bei 150€ im Monat. Das Erstgespräch mit Eingangstest-Planung ist kostenlos.",
      },
      {
        q: "Wo findet das Athletiktraining statt?",
        a: "Sprints, Sprünge und Koordination im Inneren Grüngürtel direkt am Veedel, Kraft und Sprungkraftaufbau im Studio. Die Mischung richtet sich nach deinem Ziel und der Saisonphase.",
      },
      {
        q: "Brauche ich einen Verein oder Wettkampfambitionen?",
        a: "Nein. Athletiktraining lohnt sich für alle, die schneller, stabiler und belastbarer werden wollen, auch ohne Startnummer. Der Eingangstest setzt das Niveau, nicht dein Sportlerlebenslauf.",
      },
      {
        q: "Wie unterscheidet sich das von normalem Personal Training?",
        a: "Der Fokus: beim Athletiktraining stehen Schnelligkeit, Sprungkraft und Richtungswechsel im Zentrum, gemessen mit regelmäßigen Tests. Klassisches Personal Training zielt eher auf Kraftaufbau, Figur und allgemeine Fitness.",
      },
    ],
  },

  "wahn/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Wahn, dem Stadtteil, der der Wahner Heide ihren Namen gibt: Stabilität und Ausdauer auf den Heidewegen im Osten, Tempoläufe auf den flachen Wegen Richtung Zündorfer Groov im Westen, Kraft im Studio. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Wahn: Heidewege für Stabilität, flache Strecken Richtung Groov für Tempo, Kraft im Studio. Termine passend zur S12/S19. 50€/Std.",
    sections: [
      {
        title: "Der Stadtteil, der der Heide den Namen gibt",
        body: "Wahn ist kompakt: 7.263 Einwohner auf 2,25 km², ein Ortskern mit kurzen Wegen, und gleich zwei Trainingsreviere in Laufweite. Das Warm-up beginnt deshalb an deiner Haustür. Richtung Osten bist du über Wahnheide in wenigen Laufminuten am Rand der Wahner Heide, die nach genau diesem Stadtteil benannt ist. Richtung Westen öffnet sich die flache Rheinebene über Zündorf bis zur Groov. Kaum ein Kölner Veedel hat beides so nah beieinander.",
      },
      {
        title: "Zwei Richtungen, zwei Trainingsreize",
        body: "Diesen Kontrast nutze ich im Plan. Auf den unebenen Heidewegen arbeiten Fuß, Knie und Hüfte bei jedem Schritt mit: dort trainieren wir Kraftausdauer, Stabilität und Antritte, bei denen der Untergrund Teil der Übung ist. Auf den flachen, geraden Wegen Richtung Zündorf und Groov laufen wir Tempoeinheiten und Intervalle, bei denen die Bedingungen gleich bleiben und sich deine Zeiten ehrlich vergleichen lassen. Sprungkraft und Maximalkraft kommen aus dem Studio, mit Hantel und Messwerten.",
      },
      {
        title: "Termine, die zur S-Bahn passen",
        body: "Vom Bahnhof Porz-Wahn pendelt halb Wahn mit der S12 oder S19 nach Köln und zurück. Deshalb liegen die Einheiten hier selten um 18 Uhr in der Stadt, sondern am Tagesrand vor Ort: früh, bevor die Bahn fährt, oder abends nach der Rückfahrt, Treffpunkt im Veedel, etwa am Schloss Wahn, das viele nur als Kulisse kennen, obwohl es die Theatersammlung der Uni Köln beherbergt. Für volle Wochen gibt es kurze Programme, die du allein durchziehst, mit Rückmeldung per App.",
      },
      {
        title: "So startest du in Wahn",
        body: "Am Anfang steht das kostenlose Erstgespräch, danach der Eingangstest: Sprint, Sprung, Rumpf. Daraus baue ich den Plan, meist zwei geführte Einheiten pro Woche, eine draußen, eine im Studio. Nach vier bis sechs Wochen wird nachgemessen, und der Plan ändert sich, wenn die Zahlen es verlangen. Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Wahn?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Wo genau trainieren wir in Wahn?",
        a: "Stabilität und Ausdauer auf den Wegen der Wahner Heide östlich des Ortskerns, Tempoläufe auf den flachen Strecken Richtung Zündorf und Groov, Kraft im Studio. Treffpunkt und Mix legen wir nach deinem Ziel fest.",
      },
      {
        q: "Ich pendle mit der S-Bahn nach Köln. Wann trainieren wir?",
        a: "Vor oder nach deiner Fahrt, direkt in Wahn. Viele legen eine Einheit in den frühen Morgen und eine in den Abend nach der Rückfahrt vom Bahnhof Porz-Wahn. Der Plan passt sich deiner Woche an.",
      },
      {
        q: "Brauche ich Vereins- oder Wettkampferfahrung?",
        a: "Nein. Der Eingangstest legt dein Niveau fest, nicht dein Lebenslauf. Athletiktraining lohnt sich für Läufer, Vereinssportler und alle, die schneller und belastbarer werden wollen.",
      },
      {
        q: "Was passiert bei schlechtem Wetter?",
        a: "Die Heide funktioniert fast das ganze Jahr, bei Dauerregen verlagern wir die Einheit ins Studio oder zu dir nach Hause. Ausfallen muss ein Termin deswegen nicht.",
      },
    ],
  },

  "nippes/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Nippes heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, baut deinen Plan um das, was du im Veedel ohnehin einkaufst, vom Wochenmarkt am Wilhelmplatz bis zur Neusser Straße. Sie ist im Online Coaching ab 150€ im Monat enthalten, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Nippes mit Natalie: Kalorien- und Eiweißziel, Wochenplan rund um Markt am Wilhelmplatz und Neusser Straße, abgestimmt aufs Training.",
    sections: [
      {
        title: "In Nippes scheitert es nicht am Einkaufen",
        body: "36.913 Menschen leben in Nippes auf knapp drei Quadratkilometern, und kaum ein Veedel macht gutes Essen leichter: der Wochenmarkt am Wilhelmplatz an sechs Tagen die Woche, dazu die Neusser Straße mit allem, was fehlt. Woran es scheitert, ist selten das Angebot, sondern die Entscheidung am Abend, wenn der Tag lang war. Genau da setzt Natalie an: ein Wochenplan mit Einkaufsliste, die zum Markt passt, damit die Entscheidung schon getroffen ist, bevor der Hunger sie trifft.",
      },
      {
        title: "Zahlen statt Diät-Trends",
        body: "Natalie arbeitet nicht mit Verbotslisten, sondern mit einem Kalorienziel und einer Eiweiß-, Kohlenhydrat- und Fettverteilung, die zu deinem Training und deinem Ziel passt, ob Abnehmen oder Muskelaufbau. Kontrolliert wird über den Wochenschnitt auf der Waage und über Umfänge, nicht über einzelne Tage. Alle paar Wochen schaut sie auf die Zahlen und stellt nach. So verschwindet das Auf und Ab der Versuche, und an seine Stelle tritt ein Trend, den du sehen kannst.",
      },
      {
        title: "Das Veedel isst mit, und das ist eingeplant",
        body: "Nippes ist kein Veedel, in dem man sechs Wochen lang nur aus der Tupperdose isst. Der Kaffee mit Gebäck auf der Neusser Straße, das Essen mit Freunden, das Eis mit den Kindern im Nippeser Tälchen: all das bleibt. Es wird nur eingeplant statt wegignoriert, mit einem Budget, das in dein Kalorienziel passt. Pläne, die das echte Leben aussperren, halten zwei Wochen. Pläne, die es einrechnen, halten Monate, und nur die verändern etwas.",
      },
      {
        title: "Online-Beratung, die in dichte Wochen passt",
        body: "Die Ernährungsberatung läuft komplett online: Analyse im Video-Gespräch, Plan und Anpassungen per App, wöchentlicher Check-in. Für Berufspendler und Familien in Nippes ist das meist der Unterschied zwischen Anfangen und Aufschieben, weil kein Praxistermin quer durch die Stadt nötig ist. Enthalten ist sie im Online Coaching ab 150€ im Monat, zusammen mit dem Trainingsplan von mir. Der erste Schritt ist ein kostenloses Erstgespräch mit uns beiden.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Nippes?",
        a: "Sie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan per App und wöchentlichen Check-ins. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Wer berät mich bei FitPrimo?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie übernimmt die Ernährungsseite, ich als Trainer die Trainingsseite, und beide Pläne greifen ineinander.",
      },
      {
        q: "Muss ich für die Beratung irgendwo hinfahren?",
        a: "Nein, alles läuft online per Video und App. Das Einkaufen bleibt bei dir im Veedel, viele nutzen dafür einfach den Wochenmarkt am Wilhelmplatz mit der Einkaufsliste aus dem Plan.",
      },
      {
        q: "Ich koche wenig und esse oft unterwegs. Funktioniert das trotzdem?",
        a: "Ja. Der Plan wird um deinen Alltag gebaut, nicht umgekehrt: einfache Gerichte, klare Alternativen für unterwegs und ein Eiweißziel, das sich auch ohne Kochmarathon erreichen lässt.",
      },
      {
        q: "Beratet ihr auch bei Unverträglichkeiten oder Erkrankungen?",
        a: "Nein. Natalies Bereich ist Sport- und Fitnessernährung für gesunde Erwachsene. Medizinische Ernährungsfragen gehören in ärztliche Hände, das sagen wir dir im Erstgespräch offen.",
      },
    ],
  },

  "nippes/abnehmen": {
    answer:
      "Abnehmen in Köln-Nippes steht bei mir auf drei Beinen: Krafttraining, damit die Muskeln bleiben, ein Kalorienziel, das Natalie als Ernährungsberaterin mit dir festlegt, und Alltagsbewegung im Veedel. Die 1-zu-1 Stunde kostet 50€, das Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Nippes: Krafttraining plus Ernährungsplan von Natalie, realistisches Tempo, Training im Nippeser Tälchen oder bei dir zu Hause. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Abnehmen heißt nicht hungern, sondern rechnen",
        body: "Wer abnehmen will, braucht ein moderates Kaloriendefizit, genug Eiweiß und Geduld, mehr nicht. Crash-Diäten nehmen dir in Nippes niemand ab, spätestens beim dritten Geburtstagskuchen im Kollegenkreis kippen sie. Deshalb arbeite ich mit einem Defizit, das du durchhalten kannst, und messe den Fortschritt am Wochenschnitt auf der Waage, nicht an einzelnen Tagen. Ein halbes Kilo pro Woche ist ein gutes, haltbares Tempo. Alles, was deutlich schneller verspricht, kostet meist Muskeln und kommt zurück.",
      },
      {
        title: "Krafttraining schützt, was du behalten willst",
        body: "Ohne Krafttraining verlierst du beim Abnehmen nicht nur Fett, sondern auch Muskulatur, und genau die hält deinen Verbrauch oben. Zwei Einheiten pro Woche reichen: bei dir zu Hause mit dem Material, das ich mitbringe, im Studio an der Hantel oder draußen im Nippeser Tälchen mit dem eigenen Körpergewicht. Der Plan folgt deiner Woche, nicht umgekehrt, und wird alle paar Wochen an die Zahlen angepasst, die du tatsächlich lieferst.",
      },
      {
        title: "Das Veedel ist dein Schrittzähler",
        body: "Nippes ist dicht gebaut, und das ist beim Abnehmen ein Vorteil: Bäcker, Schule, Bahn, fast alles liegt in Gehweite. Wer die täglichen Wege zu Fuß macht und abends eine Runde durchs Nippeser Tälchen oder den Johannes-Giesberts-Park dranhängt, verbrennt Woche für Woche spürbar Energie, ohne dass es sich nach Sport anfühlt. Diese Alltagsschritte sind im Plan fest eingebaut, weil sie das Defizit tragen, wenn mal eine Trainingseinheit ausfällt.",
      },
      {
        title: "Die Ernährungsseite übernimmt Natalie",
        body: "Beim Essen musst du in Nippes nichts erfinden, nur entscheiden. Natalie, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, legt mit dir Kalorienziel und Eiweißmenge fest und baut daraus einen Wochenplan, der zu deinem Alltag passt, Kaffee im Veedel inklusive. Sie ist im Online Coaching ab 150€ im Monat enthalten. Medizinische Ernährungsfragen gehören nicht zu ihrem Bereich, das sagen wir dir im kostenlosen Erstgespräch offen.",
      },
    ],
    faq: [
      {
        q: "Wie schnell kann ich in Köln-Nippes abnehmen?",
        a: "Realistisch sind etwa ein halbes Kilo pro Woche im Schnitt. Das klingt unspektakulär, summiert sich aber in drei Monaten auf fünf bis sechs Kilo, die bleiben, weil Muskeln und Alltag mitspielen.",
      },
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Nippes?",
        a: "Die 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Trainingsplan, Natalies Ernährungssteuerung und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Brauche ich ein Fitnessstudio?",
        a: "Nein. Krafttraining funktioniert auch zu Hause mit Kurzhanteln und Bändern, die ich mitbringe, oder draußen im Tälchen. Wer gern an Geräte will, kombiniert Termine im Studio dazu.",
      },
      {
        q: "Reicht Joggen allein zum Abnehmen?",
        a: "Joggen verbrennt Kalorien, schützt aber die Muskulatur kaum. Die Kombination wirkt: Krafttraining für den Erhalt, Schritte und Läufe für den Verbrauch, Ernährung für das Defizit.",
      },
      {
        q: "Muss ich auf Essen im Veedel verzichten?",
        a: "Nein. Natalie plant das echte Leben ein, vom Marktbesuch bis zum Essen mit Freunden. Ein Plan, der Verbote stapelt, hält zwei Wochen; einer mit Budget hält Monate.",
      },
    ],
  },

  "bocklemuend-mengenich/personal-training": {
    answer:
      "Personal Training in Köln-Bocklemünd/Mengenich: ich komme zu dir nach Hause oder wir trainieren draußen auf den Feldwegen Richtung Widdersdorf. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos und unverbindlich.",
    metaDescription:
      "Personal Training in Köln-Bocklemünd/Mengenich: 1-zu-1 bei dir zu Hause oder draußen am Feldrand, Termine passend zu Linie 3 und 4. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Zwei Ortsteile, ein kurzer Weg zum Training",
        body: "Bocklemünd/Mengenich ist das einzige Kölner Veedel mit Doppelnamen: zwei alte Ortskerne, dazwischen die Siedlungen der Nachkriegszeit, zusammen 10.629 Einwohner auf knapp fünf Quadratkilometern am Westrand des Bezirks Ehrenfeld. Ein Fitnessangebot vor Ort gibt es kaum, also drehe ich die Richtung um: das Training kommt zu dir. Kurzhanteln, Widerstandsbänder und das übrige Material bringe ich mit, ein freies Stück Wohnzimmer, Keller oder Garten reicht für ein vollständiges Programm.",
      },
      {
        title: "Hinter der letzten Häuserreihe beginnt das Feld",
        body: "Der größte Trainingsvorteil des Veedels liegt direkt am Ortsrand: Richtung Widdersdorf öffnet sich die Feldflur mit ruhigen, flachen Wegen, auf denen wir Läufe, Intervalle und Zirkel mit dem eigenen Körpergewicht aufbauen, ohne Ampeln und ohne Publikum. Für viele ist genau das der Unterschied: kein Studio, in dem man sich beobachtet fühlt, sondern frische Luft und ein Programm, das nur für dich geschrieben ist.",
      },
      {
        title: "Termine, die zu Linie 3 und 4 passen",
        body: "Mit dem Görlinger-Zentrum und Bocklemünd enden hier gleich zwei Stadtbahnlinien, entsprechend viele im Veedel pendeln täglich stadteinwärts. Nach Feierabend plus Rückfahrt noch einmal loszufahren, ist der Punkt, an dem die meisten Vorsätze reißen. Deshalb liegt das Training vor deiner Haustür und richtet sich nach deiner Woche, auch früh morgens oder am Vormittag. Die WDR-Studios im Veedel kennen ohnehin keine Bürozeiten: wer in Produktion oder Technik arbeitet, bekommt Termine im Schichtrhythmus.",
      },
      {
        title: "Was es kostet und wie du startest",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, Ernährungssteuerung durch Natalie und wöchentlichen Check-ins beginnt bei 150€ im Monat. Der Einstieg ist immer ein kostenloses Erstgespräch über Ziel, Alltag und Trainingsort. Danach folgt ein Technik-Check, und nach den ersten Wochen schauen wir gemeinsam auf die Zahlen: Gewicht, Kraftwerte, Umfänge. Was sich nicht bewegt, wird im Plan geändert.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Bocklemünd/Mengenich?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, Erstgespräch kostenlos. Geräte brauchst du keine, das Material bringe ich mit.",
      },
      {
        q: "Wo trainieren wir im Veedel?",
        a: "Meistens bei dir zu Hause oder auf den Feldwegen Richtung Widdersdorf. Wer schweres Langhanteltraining will, nimmt Termine im Studio dazu, gut erreichbar über Linie 3 oder 4.",
      },
      {
        q: "Ich habe noch nie mit einem Trainer gearbeitet. Wie läuft der Anfang?",
        a: "Mit einem kostenlosen Erstgespräch und einem Technik-Check. Du brauchst keine Vorerfahrung, der Plan startet auf deinem Stand und wächst mit dir mit.",
      },
      {
        q: "Geht Training auch im Schichtdienst?",
        a: "Ja. Termine lege ich auch in Vormittag oder frühen Nachmittag, und der Plan rechnet mit wechselnden Wochen, damit eine Spätschicht nicht den Monat kippt.",
      },
    ],
  },

  "suerth/rueckentraining": {
    answer:
      "Rückentraining in Köln-Sürth heißt gezieltes Krafttraining für Rumpf, Hüfte und Rücken, bei dir zu Hause oder im Studio, plus tägliches Gehen am Wasser. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos. Bei akuten Schmerzen gehört der erste Weg zum Arzt, nicht zu mir.",
    metaDescription:
      "Rückentraining in Köln-Sürth: Kraft für Rumpf und Rücken statt nur Dehnen, zu Hause oder im Studio, Gehen am Rhein als Baustein. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der Rücken meldet sich selten beim Sport, meist am Schreibtisch",
        body: "Die typische Sürther Rücken-Geschichte beginnt nicht an der Hantel, sondern im Sitzen: morgens Bahn oder Auto, acht Stunden Büro, abends Sofa. Kein einzelner Tag davon ist schlimm, aber die Summe macht den Rücken schwach und empfindlich. Die Antwort ist nicht mehr Schonung, sondern mehr Belastbarkeit: ein Rücken, der regelmäßig hebt, zieht und trägt, steckt auch lange Sitztage weg. Genau diese Belastbarkeit bauen wir Schritt für Schritt auf.",
      },
      {
        title: "Heben, Ziehen, Tragen: das Programm",
        body: "Im Zentrum stehen die Bewegungen, die ein Rücken im Leben braucht: Hüftbeugen und Hebe-Varianten für die rückseitige Kette, Zugübungen für den oberen Rücken, Rumpfarbeit gegen das Einknicken und Trageübungen, die alles verbinden. Die Last steigt langsam und kontrolliert, von Bändern und Kurzhanteln zu Hause bis zur Langhantel im Studio, wenn du so weit bist. Reines Dehnen und Massagerollen fühlen sich gut an, verändern aber wenig: stärker werden schon.",
      },
      {
        title: "Das Wasser liegt vor der Tür, nutz es",
        body: "Zwischen den Einheiten braucht ein Rücken vor allem Bewegung mit niedriger Last, und dafür hat Sürth den Rhein. Eine halbe Stunde zügiges Gehen am Ufer, als fester Abendtermin statt als gelegentlicher Vorsatz, hält die Strukturen locker und den Kopf frei. Im Plan steht das als eigener Baustein neben den zwei Kraftterminen pro Woche, nicht als Deko. Wer mag, macht daraus mit der Zeit lockere Läufe.",
      },
      {
        title: "Ehrlich vorweg: Training ersetzt keinen Arzt",
        body: "Ich arbeite mit Menschen, deren Rücken unspezifisch zwickt oder schlicht zu schwach geworden ist, nicht mit akuten Krankheitsbildern. Bei starken, ausstrahlenden oder plötzlichen Schmerzen klärst du das zuerst ärztlich ab; mit einer Freigabe steige ich danach gern ein. Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App beginnt bei 150€ im Monat, und am Anfang steht immer das kostenlose Erstgespräch über deine Vorgeschichte und dein Ziel.",
      },
    ],
    faq: [
      {
        q: "Hilft Krafttraining wirklich gegen Rückenschmerzen?",
        a: "Bei unspezifischen Beschwerden ist ein stärkerer, belastbarer Rücken der Weg mit der besten Erfolgsbilanz. Ein Heilversprechen gebe ich dir nicht, und akute Schmerzen gehören zuerst zum Arzt.",
      },
      {
        q: "Was kostet Rückentraining in Köln-Sürth?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, Erstgespräch kostenlos. Material für das Training zu Hause bringe ich mit.",
      },
      {
        q: "Ich hatte einen Bandscheibenvorfall. Kann ich trainieren?",
        a: "Nur mit ärztlicher Freigabe. Danach bauen wir langsam und kontrolliert auf, mit Übungen, die zu deinem Befund passen, und ohne Ehrgeiz an der falschen Stelle.",
      },
      {
        q: "Wie lange dauert es, bis ich etwas merke?",
        a: "Viele spüren nach vier bis sechs Wochen, dass Sitzen und Heben leichter fallen. Messbar wird es über Kraftwerte und darüber, wie oft sich der Rücken überhaupt noch meldet.",
      },
      {
        q: "Muss ich dafür ins Studio?",
        a: "Nein. Der Einstieg funktioniert zu Hause mit Bändern und Kurzhanteln. Das Studio lohnt sich später, wenn schwerere Zug- und Hebeübungen dran sind.",
      },
    ],
  },

  "lind/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Lind: Antritte und Tempoläufe auf den geraden Feldwegen Richtung Libur, Stabilität auf den weichen Pfaden am Heiderand, Kraft und Sprungkraft im Studio. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Lind: Tempo auf den Feldwegen Richtung Libur, Stabilität am Rand der Wahner Heide, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ein Dorf mit freier Bahn",
        body: "Lind hat sich seinen dörflichen Zuschnitt bewahrt: ruhige Straßen, kaum Durchgangsverkehr, und nach wenigen Minuten zu Fuß stehst du im Offenen. Für Athletiktraining ist das Gold wert, denn das Aufwärmen beginnt an deiner Haustür statt auf einem Parkplatz. Südlich des Ortes liegt die freie Feldflur Richtung Libur, östlich die Heide: zwei Untergründe mit völlig verschiedenen Reizen, beide ohne Anfahrt erreichbar.",
      },
      {
        title: "Die Feldwege Richtung Libur sind deine Laufbahn",
        body: "Zwischen Lind und Libur ziehen sich gerade, flache Wirtschaftswege durch die Felder. Dort arbeiten wir an Tempo: Antritte zwischen 20 und 60 Metern, Steigerungsläufe, Intervalle mit sauber gemessenen Abschnitten. Weil die Strecke eben bleibt und sich nichts in den Weg stellt, sind deine Zeiten von Woche zu Woche vergleichbar. Der offene Wind über den Feldern ist dabei kein Störfaktor, sondern ein ehrlicher Widerstand, der sich nicht wegdiskutieren lässt.",
      },
      {
        title: "Weicher Boden für die Füße, Hanteln für den Rest",
        body: "Am östlichen Ortsrand übernimmt die Wahner Heide den zweiten Part: Auf nachgiebigem, unebenem Boden arbeiten Fußgelenke, Knie und Hüfte bei jedem Schritt mit, dort trainieren wir Lauf-ABC, Richtungswechsel und Kraftausdauer. Was draußen nicht wächst, holen wir im Studio: Maximalkraft und Sprungkraft an der Langhantel, mit Werten, die wir notieren und vergleichen. Alle vier bis sechs Wochen steht ein Re-Test, und der Plan folgt den Ergebnissen, nicht der Gewohnheit.",
      },
      {
        title: "Für wen sich das in Lind lohnt",
        body: "Die typischen Anfragen kommen von Vereinssportlern aus Porz und dem Umland, die im Fußball, Handball oder Tennis den Unterschied in Antritt und Stabilität suchen, von Läufern mit Zeitzielen und von Wiedereinsteigern, die es diesmal strukturiert angehen wollen. Ein Wettkampfkalender ist keine Voraussetzung. Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App beginnt bei 150€ im Monat, und los geht es mit dem kostenlosen Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Lind?",
        a: "Eine 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo genau trainieren wir in Lind?",
        a: "Tempo und Antritte auf den Feldwegen Richtung Libur, Stabilität und Lauf-ABC am Rand der Wahner Heide, Kraft und Sprungkraft im Studio. Die Mischung richtet sich nach deinem Ziel.",
      },
      {
        q: "Ich spiele im Verein. Ersetzt das mein Mannschaftstraining?",
        a: "Nein, es ergänzt es. Das Mannschaftstraining übt den Sport, das Athletiktraining baut die körperliche Basis: Antritt, Sprungkraft, Stabilität, Belastbarkeit gegen Verletzungen.",
      },
      {
        q: "Wie merke ich, dass es wirkt?",
        a: "An Zahlen: Sprintzeiten auf vermessener Strecke, Sprunghöhe, Kraftwerte. Alle vier bis sechs Wochen wird nachgemessen, und der Plan ändert sich, wenn die Werte stehen bleiben.",
      },
    ],
  },

  "porz/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Porz läuft bei uns über Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung: ein Essensplan, der auch mit Schichtdienst und wechselnden Zeiten funktioniert, komplett online betreut. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Porz mit Natalie: Essensplan für Schichtdienst und Büroalltag, Kalorien- und Eiweißziel statt Diät, online betreut. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Porz isst zu anderen Zeiten als der Rest von Köln",
        body: "Wer in Porz wohnt, arbeitet überdurchschnittlich oft im Schichtbetrieb: der Flughafen Köln/Bonn liegt im Bezirk, dazu Logistik und Industrie rundherum. Frühschicht, Spätschicht, Nachtschicht, und jede Woche sieht anders aus. Die üblichen Ernährungsregeln mit festem Frühstück und Abendessen um sieben scheitern daran zuverlässig. Natalie plant deshalb nicht nach Uhrzeit, sondern nach deinem Dienstplan: Hauptmahlzeiten um die Schicht herum, eine klare Lösung für die Kantine und für die Stunden dazwischen.",
      },
      {
        title: "Ein Ziel in Zahlen, egal wie die Woche liegt",
        body: "Der Kern bleibt in jeder Schicht gleich: ein Kalorienziel und genug Eiweiß, verteilt auf die Mahlzeiten, die dein Tag tatsächlich hergibt. Ob das drei große oder fünf kleine sind, ist zweitrangig; entscheidend ist der Wochenschnitt auf der Waage, nicht der einzelne Tag. Natalie schaut in den Check-ins auf genau diese Zahlen und stellt nach, wenn der Trend steht. So überlebt der Plan auch eine Woche Nachtschicht, in der sonst jede Diät kippt.",
      },
      {
        title: "Eingekauft wird im Veedel, geplant wird vorher",
        body: "Die Zutatenfrage löst Porz selbst: der Wochenmarkt auf dem Friedrich-Ebert-Platz, die Geschäfte rund um die Fußgängerzone, dazu die großen Märkte am Rand. Was fehlt, ist selten das Angebot, sondern ein Plan, der vor dem Einkauf steht. Natalie gibt dir eine Wochenliste, die zu deinen Schichten passt, mit Gerichten, die sich vorkochen und mitnehmen lassen. Die Dose für die Pause ist in Porz kein Diät-Trick, sondern die realistischste Form von Ernährungssteuerung.",
      },
      {
        title: "Beratung per Video, Training nach Wunsch dazu",
        body: "Die Beratung findet online statt: Analysegespräch per Video, Plan und Anpassungen in der App, wöchentlicher Check-in. Gerade mit Schichtplan ist das der Punkt, an dem es praktisch wird, weil kein fester Praxistermin in deine wechselnden Wochen passen muss. Enthalten ist die Ernährungsberatung im Online Coaching ab 150€ im Monat, zusammen mit meinem Trainingsplan. Wer in Porz zusätzlich 1-zu-1 trainieren will, etwa am Rheinufer, nimmt Stunden zu 50€ dazu.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Porz?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan und wöchentlichen Check-ins. Für das Erstgespräch zahlst du nichts.",
      },
      {
        q: "Funktioniert der Plan auch mit Wechselschicht am Flughafen?",
        a: "Ja, das ist in Porz der häufigste Fall. Natalie baut den Plan um deinen Dienstplan, mit Mahlzeiten, die zur Schicht passen, und Alternativen für Kantine und Nachtdienst.",
      },
      {
        q: "Wer macht die Beratung bei FitPrimo?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie betreut die Ernährungsseite, ich das Training, und beide Pläne sind aufeinander abgestimmt.",
      },
      {
        q: "Muss ich kochen können?",
        a: "Nein. Der Plan setzt auf einfache Gerichte, die sich vorbereiten und mitnehmen lassen. Wer gar nicht kocht, bekommt Lösungen für Kantine, Bäcker und unterwegs, mit klarem Eiweißziel.",
      },
      {
        q: "Beratet ihr auch bei Erkrankungen oder Unverträglichkeiten?",
        a: "Nein. Natalies Bereich ist Sport- und Fitnessernährung für gesunde Erwachsene. Medizinische Ernährungsfragen gehören in ärztliche Hände, das sagen wir dir im Erstgespräch offen.",
      },
    ],
  },

  "brueck/personal-training": {
    answer:
      "Personal Training in Köln-Brück heißt: 1-zu-1 bei dir zu Hause oder am Königsforst, der direkt am Veedel beginnt, mit festem Plan und Technik-Korrektur in jeder Einheit. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "1-zu-1 Personal Training in Köln-Brück: zu Hause mit mitgebrachtem Material oder am Königsforst, fester Plan, messbare Schritte. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Brück hat den Wald, dir fehlt nur der Plan",
        body: "Brück gehört zu den grünsten Ecken im rechtsrheinischen Köln: 10.234 Einwohner auf 7,5 km², und ein großer Teil davon ist Königsforst. Viele hier gehen längst laufen oder spazieren, und trotzdem verändert sich wenig, weil Bewegung allein kein Training ist. Genau da setze ich an: ein Plan mit Richtung, Kraftübungen, die aufeinander aufbauen, und jemand, der Woche für Woche kontrolliert, ob du auf Kurs bist.",
      },
      {
        title: "Zu Hause trainieren, im Wald draußen sein",
        body: "Die Kraftarbeit findet meist bei dir statt: Brück ist ein Veedel der Einfamilienhäuser und Gärten, und ein paar Quadratmeter reichen, weil ich Kurzhanteln, Bänder und das übrige Material mitbringe. Für Ausdauer und die Einheiten an der frischen Luft gehen wir an den Waldrand: die breiten Wege des Königsforsts ab Mauspfad sind flach genug für Intervalle und lang genug für jede Grundlagenausdauer. Studio in der Stadt? Nur wenn du es willst, nötig ist es nicht.",
      },
      {
        title: "Zwei Termine pro Woche, dokumentiert statt gefühlt",
        body: "Nach dem kostenlosen Erstgespräch starten wir mit einem Technik-Check und legen zwei feste Einheiten pro Woche. Jede Übung wird mit Gewicht und Wiederholungen notiert, alle vier Wochen vergleichen wir: Kraftwerte, Umfänge, Gewicht im Wochenschnitt. Für die Tage dazwischen bekommst du kurze Aufgaben, oft eine halbe Stunde zügiges Gehen im Wald, die in Brück niemandem schwerfällt. Wenn die Zahlen stehen bleiben, ändere ich den Plan, nicht die Ausrede.",
      },
      {
        title: "Für Pendler mit der Linie 1 gemacht",
        body: "Brück hängt mit der Stadtbahn-Linie 1 direkt an der Innenstadt, und viele pendeln jeden Tag hinein. Abends dann noch einmal in ein Studio in der Stadt zu fahren, ist der Punkt, an dem die meisten Vorsätze reißen. Das Training vor der eigenen Haustür dreht die Logik um: der Termin wartet zu Hause auf dich, nicht am anderen Ende der Bahnlinie. Auch Randzeiten sind machbar, früh vor der Arbeit oder am Samstagmorgen, bevor das Familienprogramm startet.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Brück?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App ab 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Wo genau trainieren wir in Brück?",
        a: "Meist bei dir zu Hause oder im Garten, mit Material, das ich mitbringe. Für Läufe und Outdoor-Einheiten nutzen wir den Königsforst, der direkt am Veedel beginnt.",
      },
      {
        q: "Ich jogge schon im Königsforst. Was bringt mir ein Trainer zusätzlich?",
        a: "Struktur und Kraft. Laufen hält fit, verändert aber weder Haltung noch Muskulatur spürbar. Mit zwei geführten Krafteinheiten pro Woche wird aus deinem Waldlauf ein komplettes Programm.",
      },
      {
        q: "Geht Training auch früh morgens oder am Wochenende?",
        a: "Ja. Gerade für Pendler lege ich Einheiten in den frühen Morgen oder auf den Samstagvormittag. Den Rhythmus legen wir im Erstgespräch fest.",
      },
      {
        q: "Brauche ich Geräte oder eine Studiomitgliedschaft?",
        a: "Nein. Ich bringe alles mit, was das Training zu Hause braucht. Wer später schwer an der Langhantel arbeiten will, kann Einheiten im Studio in Köln dazunehmen.",
      },
    ],
  },

  "bayenthal/rueckentraining": {
    answer:
      "Rückentraining in Köln-Bayenthal: zweimal pro Woche gezielte Kraftarbeit für Rumpf und oberen Rücken, bei dir zu Hause oder im Studio, dazu das Rheinufer Süd für den täglichen Ausgleich. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos. Akute Schmerzen klärt zuerst ein Arzt.",
    metaDescription:
      "Rückentraining in Köln-Bayenthal: gezielte Kraft für Rumpf und oberen Rücken statt Schonhaltung, zu Hause oder im Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Kurze Wege, viel Sitzen: das Bayenthal-Muster",
        body: "Bayenthal ist klein und dicht: 11.161 Menschen auf 1,28 km², die Innenstadt ist mit der Bahn ein Katzensprung, Büro, Bäcker und Supermarkt liegen oft in Gehweite. Bequem, aber der Körper zahlt dafür: wer sich kaum noch weit bewegen muss, sitzt am Ende fast den ganzen Tag, und das erste, was sich meldet, ist der Rücken. Zwischen Schulterblättern beim Arbeiten, unten im Kreuz nach dem Aufstehen. Das ist selten ein Schaden, meist schlicht fehlende Kraft, und genau die lässt sich aufbauen.",
      },
      {
        title: "Aufrichten und ziehen, nicht nur dehnen",
        body: "Ein Schreibtischtag zieht Schultern und Blick nach vorn; das Training muss die Gegenrichtung stärken. Deshalb besteht der Kern aus Zugübungen in allen Winkeln, Arbeit für die Schulterblattmuskulatur und Rumpfübungen, die das Becken stabil halten. Dehnen und Rollen dürfen dazu, tragen aber nicht allein: ein Muskel, der zu schwach ist, bleibt auch gedehnt zu schwach. Wir starten mit Bändern und Kurzhanteln bei dir zu Hause, und wenn mehr Last sinnvoll wird, geht es ins Studio.",
      },
      {
        title: "Das Rheinufer Süd ist dein zweites Trainingsgerät",
        body: "Zwischen den beiden Krafteinheiten braucht der Rücken vor allem eines: regelmäßige, leichte Bewegung. Bayenthal hat dafür das Rheinufer Süd direkt vor der Tür, flach, beleuchtet und zu jeder Jahreszeit begehbar. Im Plan steht das als fester Baustein mit Zeitangabe, nicht als guter Vorsatz: zügig gehen, Arme mitnehmen, zwanzig bis dreißig Minuten. Wer das vier Mal pro Woche schafft, nimmt dem Sitztag einen großen Teil seiner Wirkung.",
      },
      {
        title: "Erst die Abklärung, dann der Aufbau",
        body: "Ich trainiere Menschen, deren Rücken auf zu viel Sitzen und zu wenig Kraft reagiert. Plötzliche, heftige oder ausstrahlende Schmerzen gehören zuerst in ärztliche Abklärung; danach steige ich mit Freigabe ein und richte die Übungsauswahl am Befund aus. Der Einstieg ist ein kostenloses Erstgespräch über Vorgeschichte, Alltag und Ziel. Die 1-zu-1 Stunde kostet 50€, Online-Begleitung mit Plan per App gibt es ab 150€ im Monat.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Bayenthal?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos. Material für zu Hause bringe ich mit.",
      },
      {
        q: "Mein Rücken schmerzt vor allem beim Sitzen im Büro. Hilft Training da überhaupt?",
        a: "Meist ja: unspezifische Beschwerden vom Sitzen reagieren gut auf mehr Kraft im Rumpf und oberen Rücken plus regelmäßige Bewegung. Ein Heilversprechen gibt es nicht, eine klare Erfolgsbilanz schon.",
      },
      {
        q: "Wie schnell merke ich einen Unterschied?",
        a: "Die meisten spüren nach vier bis sechs Wochen, dass lange Sitztage weniger nachhängen. Gemessen wird zusätzlich über Kraftwerte, damit der Fortschritt nicht vom Tagesgefühl abhängt.",
      },
      {
        q: "Trainieren wir in Bayenthal draußen?",
        a: "Die Kraftarbeit läuft drinnen, zu Hause oder im Studio. Das Rheinufer Süd nutzen wir für den Bewegungsbaustein zwischen den Einheiten, als festen Termin im Plan.",
      },
      {
        q: "Ich hatte schon einmal einen Bandscheibenvorfall. Kann ich mitmachen?",
        a: "Mit ärztlicher Freigabe ja. Dann bauen wir langsam auf, mit Übungen, die zu deinem Befund passen, und steigern die Last erst, wenn die Bewegung sicher sitzt.",
      },
    ],
  },

  "widdersdorf/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Widdersdorf nutzt, was das Veedel hat: flache, gerade Wirtschaftswege in alle Richtungen für Sprints und Tempoläufe, dazu Kraft und Sprungkraft im Studio. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Widdersdorf: Sprints und Tempoläufe auf den Feldwegen rund ums Veedel, Kraft und Sprungkraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ein junges Veedel mit Platz nach allen Seiten",
        body: "Widdersdorf ist durch das Neubaugebiet im Süden auf 12.398 Einwohner gewachsen und gehört heute zu den jüngsten Ecken des Kölner Westens: viele Familien, viele Vereinssportler, viele, die nach Feierabend noch etwas aus sich herausholen wollen. Das Gelände spielt mit. Hinter der letzten Häuserreihe beginnen offene Felder, und die Wege dorthin sind eben, asphaltiert oder fest geschottert, ohne Ampel und ohne Gegenverkehr aus Lieferwagen.",
      },
      {
        title: "Schnelligkeit entsteht auf freier Strecke",
        body: "Für Antritt und Tempo brauchst du Strecke, auf der niemand bremst, und davon hat Widdersdorf reichlich: die Wirtschaftswege Richtung Lövenich, Esch und Bocklemünd laufen schnurgerade durch die Felder. Dort arbeiten wir mit markierten Abschnitten, Sprints über 30 bis 80 Meter, fliegenden Läufen und Tempowechseln. Zwischen altem Ortskern und Neubaugebiet lassen sich Runden kombinieren, die genau zur geplanten Einheit passen, von kurz und hart bis lang und ruhig.",
      },
      {
        title: "Kraft und Sprungkraft kommen aus dem Studio",
        body: "Draußen wird schnell, drinnen wird stark: Maximalkraft und Sprungkraft baue ich mit Hantelarbeit und Sprungprogression im Studio auf, sauber dosiert und mit Technik-Korrektur in jeder Einheit. Beides zusammen ergibt die Mischung, die im Verein den Unterschied macht, beim Fußball genauso wie beim Tennis oder Laufen. Getestet wird regelmäßig: Sprintzeit auf vermessener Strecke, Sprunghöhe, Kraftwerte. Der Plan folgt den Zahlen, nicht dem Bauchgefühl.",
      },
      {
        title: "Training, das in den Familienkalender passt",
        body: "Wer in Widdersdorf wohnt, organisiert meist mehr als nur sich selbst: Kinder, Verein, Pendelweg, das Veedel hängt ohne Stadtbahn am Bus und am Auto. Deshalb biete ich Zeitfenster an, die in so einen Kalender passen: früh am Morgen, am Vormittag, wenn das Haus leer ist, oder am Samstag. Und wenn eine Woche komplett kippt, gibt es eine kurze Einheit für dich allein, damit der Faden nicht reißt. Zwei geführte Termine pro Woche reichen für messbaren Fortschritt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Widdersdorf?",
        a: "Die 1-zu-1 Stunde kostet 50€, Online-Begleitung mit Plan per App ab 150€ im Monat. Das Erstgespräch kostet nichts und klärt Ziel und Startniveau.",
      },
      {
        q: "Wo trainieren wir in Widdersdorf?",
        a: "Schnelligkeit und Ausdauer auf den Feldwegen rund ums Veedel, Richtung Lövenich, Esch oder Bocklemünd. Kraft und Sprungkraft im Studio, den Treffpunkt legen wir nach deinem Wohnort fest.",
      },
      {
        q: "Ich spiele im Verein. Ersetzt das Athletiktraining mein Mannschaftstraining?",
        a: "Nein, es ergänzt es: Antritt, Sprungkraft und Stabilität, die im Mannschaftstraining zu kurz kommen. Die Einheiten plane ich um deine Spiel- und Trainingstage herum.",
      },
      {
        q: "Für welches Alter ist das geeignet?",
        a: "Für Erwachsene jedes Trainingsstands. Der Technik-Check am Anfang legt das Niveau fest, die Übungen werden daran angepasst, nicht umgekehrt.",
      },
      {
        q: "Was passiert im Winter, wenn die Feldwege nass sind?",
        a: "Dann verschiebt sich der Schwerpunkt ins Studio: mehr Kraft- und Sprungarbeit, kürzere Tempoeinheiten draußen auf festen Wegen. Der Plan rechnet die Jahreszeit von Anfang an ein.",
      },
    ],
  },

  "holweide/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Holweide heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, plant dein Essen so, dass es auch Spät- und Nachtdienste übersteht, komplett online. Sie ist im Online Coaching ab 150€ im Monat enthalten, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Holweide mit Natalie: Essensplan, der Spät- und Nachtdienste übersteht, Eiweißziel über 24 Stunden statt pro Tag. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Veedel, in dem viele essen müssen, wann der Dienstplan es erlaubt",
        body: "In Holweide leben 21.001 Menschen, und mit dem Krankenhaus Holweide steht einer der großen Arbeitgeber des Kölner Ostens mitten im Veedel. Wer in Pflege, Praxis oder Rettungsdienst arbeitet, kennt das Problem jeder klassischen Ernährungsberatung: der Plan geht von drei Mahlzeiten am Tag aus, der Dienstplan nicht. Natalie baut deshalb andersherum: erst dein echter Wochenrhythmus mit Früh-, Spät- und Nachtdiensten, dann die Mahlzeiten, die hineinpassen.",
      },
      {
        title: "In der Nachtschicht zählt nicht der Tag, sondern die 24 Stunden",
        body: "Nach einer Nacht im Dienst ist der Montag kein Montag mehr, und genau da scheitern Apps und Standardpläne. Natalie rechnet Kalorien- und Eiweißziel über 24 Stunden statt über den Kalendertag: eine warme Hauptmahlzeit vor dem Dienst, etwas Planbares für die Pause um drei Uhr nachts, und nach dem Schlafen kein schlechtes Gewissen, sondern die nächste normale Mahlzeit. So entsteht ein Wochenschnitt, der stimmt, auch wenn kein Tag dem anderen gleicht.",
      },
      {
        title: "Essen, das den Kühlschrank am Automaten ersetzt",
        body: "Nachts um drei gewinnt sonst immer der Automat im Flur. Der Plan hält dagegen, mit Mahlzeiten, die sich am Vortag in zehn Minuten vorbereiten lassen und kalt oder aufgewärmt funktionieren. Dazu kommt ein Eiweißziel, das du ohne Kochmarathon erreichst, und eine Einkaufsliste für die Woche, damit zu Hause da ist, was der Plan braucht. Verbote gibt es keine: auch das Stück Kuchen im Pausenraum ist eingeplant statt verdrängt.",
      },
      {
        title: "Online-Beratung, Training nach Wunsch dazu",
        body: "Die Beratung läuft per Video und App, du brauchst also keinen Praxistermin, der sich mit dem Dienstplan beißt. Enthalten ist sie im Online Coaching ab 150€ im Monat, zusammen mit meinem Trainingsplan und wöchentlichen Check-ins. Wer in Holweide zusätzlich 1-zu-1 trainieren will, nimmt Stunden zu 50€ dazu, zu Hause oder draußen, etwa in der angrenzenden Merheimer Heide. Der Einstieg ist ein kostenloses Erstgespräch mit Natalie und mir.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Holweide?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan per App und wöchentlichen Check-ins. Für das Erstgespräch zahlst du nichts.",
      },
      {
        q: "Ich arbeite in Wechselschicht am Krankenhaus. Funktioniert ein Ernährungsplan überhaupt?",
        a: "Ja, wenn er dafür gebaut ist. Natalie plant über 24 Stunden statt über den Kalendertag und legt die Mahlzeiten um deine Dienste. Gemessen wird am Wochenschnitt, nicht am einzelnen Tag.",
      },
      {
        q: "Wer macht die Beratung?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie betreut die Ernährungsseite, ich das Training, und beide Pläne greifen ineinander.",
      },
      {
        q: "Muss ich dafür irgendwo hinfahren?",
        a: "Nein, die Beratung läuft komplett online per Video und App. Gerade bei wechselnden Diensten ist das der Punkt, der sie durchhaltbar macht.",
      },
      {
        q: "Hilft Natalie auch bei medizinischen Ernährungsthemen?",
        a: "Nein. Ihr Bereich ist Sport- und Fitnessernährung für gesunde Erwachsene. Alles Medizinische gehört in ärztliche Hände, und das sagen wir dir im Erstgespräch offen.",
      },
    ],
  },

  "poll/personal-training": {
    answer:
      "Personal Training in Köln-Poll: 1-zu-1 bei dir zu Hause in Alt-Poll, draußen auf den Poller Wiesen oder im Studio, mit Plan und festen Terminen. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Poll: 1-zu-1 zu Hause, auf den Poller Wiesen oder im Studio, Termine die zur Pendlerwoche passen. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Poll ist näher an deinem Feierabend als jedes Studio",
        body: "11.184 Menschen leben in Poll, viele davon arbeiten gleich nebenan in Deutz oder auf der anderen Rheinseite in der Innenstadt. Auf dem Papier ist der Weg ins Fitnessstudio kurz, in der Praxis kommt er nach Büro, Bahn und Einkauf trotzdem selten noch zustande. Deshalb drehe ich die Richtung um: das Training wartet bei dir in Poll, wenn du nach Hause kommst. Fester Termin, Material bringe ich mit, und nach 60 Minuten ist der Abend wieder deiner.",
      },
      {
        title: "Wiesen, Rheinufer, Wohnzimmer: drei Orte, ein Plan",
        body: "Mit den Poller Wiesen liegt eine der größten freien Flächen Kölns direkt vor deiner Tür: dort machen wir Technik-Arbeit, Zirkel und die Ausdauerbausteine, mit Blick auf den Dom statt auf einen Bildschirm. Das Rheinufer Richtung Südbrücke liefert die flache Laufstrecke dazu. Und an nassen Tagen reicht dein Wohnzimmer: Kurzhanteln, Bänder und Übungsauswahl passen sich dem Platz an, die Progression läuft weiter wie geplant.",
      },
      {
        title: "Krafttraining als Fundament, dein Ziel als Richtung",
        body: "Ob du abnehmen willst, Muskeln aufbauen oder nach Jahren Schreibtisch einfach wieder belastbar werden: wir starten mit einem Technik-Check der Grundmuster, Kniebeuge, Heben, Drücken, Ziehen. Danach stehen meist zwei Einheiten pro Woche mit sauberer Steigerung über Last, Wiederholungen und Tempo. Jede Einheit wird notiert. Alle vier bis sechs Wochen vergleichen wir Kraftwerte, Umfänge und Wochengewicht, und der Plan wird an das angepasst, was die Zahlen sagen.",
      },
      {
        title: "Was es kostet und wie es anfängt",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, Ernährungssteuerung durch Natalie und wöchentlichen Check-ins beginnt bei 150€ im Monat. Viele in Poll kombinieren beides: zwei betreute Einheiten im Monat, dazwischen der Plan aus der App. Den Anfang macht ein kostenloses Erstgespräch über Ziel, Woche und Trainingsort, telefonisch oder per Video. Danach entscheidest du, ob es passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Poll?",
        a: "50€ für die 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch kostet nichts und verpflichtet zu nichts.",
      },
      {
        q: "Wo trainieren wir in Poll?",
        a: "Bei dir zu Hause mit mitgebrachtem Material, draußen auf den Poller Wiesen und am Rheinufer, oder im Studio, wenn du an die Langhantel willst. Den Mix legen wir nach deinem Ziel fest.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Ist 1-zu-1 nicht zu viel?",
        a: "Im Gegenteil, genau dafür ist es da: die Last beginnt dort, wo du heute stehst, und steigt erst, wenn die Technik sitzt. Niemand schaut zu, niemand wartet aufs Gerät.",
      },
      {
        q: "Wie viele Einheiten pro Woche brauche ich?",
        a: "Zwei geführte Einheiten reichen für sichtbaren Fortschritt, wenn sie geplant sind. Für die Tage dazwischen bekommst du kurze Programme von 15 bis 20 Minuten ohne Geräte.",
      },
      {
        q: "Geht auch Ernährungsberatung dazu?",
        a: "Ja. Im Online Coaching übernimmt Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, die Ernährungsseite: Kalorienziel, Wochenplan und Check-ins, komplett online.",
      },
    ],
  },

  "deutz/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Deutz heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, bringt Struktur in Bürotage zwischen Messe, Bahnhof und Mittagsimbiss, komplett online. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Deutz mit Natalie: klare Regeln für Kantine, Mittagsimbiss und Bürotage, Kalorien- und Eiweißziel aufs Training abgestimmt. Erstgespräch kostenlos.",
    sections: [
      {
        title: "In Deutz wird mittags entschieden, nicht abends",
        body: "Deutz ist mit Messe, Bahnhof und den Büros rund um den Rheinboulevard einer der großen Arbeitsorte der Stadt, und genau das prägt das Essverhalten: gefrühstückt wird schnell, die Hauptentscheidung fällt mittags zwischen Kantine, Imbiss und Bäcker. Standardpläne mit frisch gekochtem Mittagessen gehen daran vorbei. Natalie setzt deshalb genau dort an, wo dein Tag wirklich stattfindet: mit klaren, einfachen Regeln für das Essen unterwegs statt mit Rezepten, die ein Homeoffice voraussetzen.",
      },
      {
        title: "Kantine und Imbiss sind kein Problem, fehlende Regeln sind eins",
        body: "Du musst in Deutz nicht mit der Tupperdose zur Arbeit, damit ein Plan funktioniert. Natalie gibt dir für die üblichen Optionen feste Entscheidungsregeln an die Hand: welche Kombination in der Kantine dein Eiweißziel trifft, was beim Bäcker die bessere Wahl ist, wie ein Messetag mit Catering nicht automatisch zum Ausnahmetag wird. Die Regeln sind bewusst wenige, dafür überall anwendbar, auch in Wochen voller Termine.",
      },
      {
        title: "Ein Ziel in Zahlen, kontrolliert im Wochenschnitt",
        body: "Am Anfang stehen dein Kalorienziel und die Eiweißmenge, abgestimmt auf Training und Ziel, ob Abnehmen oder Muskelaufbau. Danach zählt der Trend: Gewicht im Wochenschnitt, Umfänge, alle paar Wochen der Blick auf die Zahlen und die Anpassung. Ein einzelnes Geschäftsessen kippt dabei nichts, es ist eingerechnet. Was verschwindet, ist das Pendeln zwischen strenger Woche und verlorenem Wochenende, das die meisten Versuche in Bürovierteln scheitern lässt.",
      },
      {
        title: "Beratung per Video, Bewegung direkt vor der Tür",
        body: "Die Beratung läuft online, per Video-Gespräch und App, und passt damit auch in eine Mittagspause im Büro. Sie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit meinem Trainingsplan und wöchentlichen Check-ins. Wer das Training 1-zu-1 dazunehmen will, hat in Deutz kurze Wege: Einheiten im Rheinpark, am Rheinboulevard oder bei dir zu Hause, die Stunde zu 50€. Der erste Schritt ist ein kostenloses Erstgespräch mit uns beiden.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Deutz?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich esse mittags fast immer auswärts. Lässt sich damit arbeiten?",
        a: "Ja, das ist in Deutz der Normalfall. Natalie baut den Plan um Kantine, Imbiss und Bäcker herum, mit festen Entscheidungsregeln statt Kochpflicht.",
      },
      {
        q: "Wer berät mich?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Training und Ernährung kommen so aus einer Hand: sie steuert das Essen, ich das Training.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Die ersten zwei Wochen zeigen meist Bewegung auf der Waage, belastbar wird der Trend nach vier bis sechs Wochen im Wochenschnitt. Dann wird nachjustiert, nicht vorher.",
      },
      {
        q: "Macht ihr auch Ernährungstherapie bei Erkrankungen?",
        a: "Nein. Natalies Schwerpunkt ist Sport- und Fitnessernährung für gesunde Erwachsene. Medizinische Fragen gehören in ärztliche Hände, das sagen wir im Erstgespräch klar.",
      },
    ],
  },

  "muelheim/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Mülheim heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, baut dir einen Plan, in den auch der Abend auf der Keupstraße hineinpasst, komplett online. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Mülheim mit Natalie: Plan mit Budget für Keupstraße und Familienessen, Eiweißziel aufs Training abgestimmt, online. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Mülheim isst gut, und das soll so bleiben",
        body: "43.296 Menschen leben in Mülheim, und kaum ein Veedel hat mehr Esskultur auf der Straße: die Keupstraße mit ihren Restaurants und Bäckereien, die Lokale rund um den Wiener Platz, dazu Familientische, an denen niemand nach Kalorien fragt. Eine Beratung, die hier mit Verbotslisten anrückt, verliert in der ersten Woche. Natalie arbeitet deshalb mit einem Budget statt mit Verboten: das Essen im Veedel bleibt, es bekommt nur einen festen Platz im Wochenplan.",
      },
      {
        title: "Auswärts essen mit Plan statt mit schlechtem Gewissen",
        body: "Der Kern ist ein Kalorien- und Eiweißziel, das zu deinem Training passt, und eine einfache Logik für den Restauranttisch: Eiweiß zuerst, Beilagen nach Ziel, und der Rest der Woche fängt den Abend auf. So übersteht der Plan ein Essen auf der Keupstraße genauso wie das Familienfest am Sonntag. Gemessen wird am Wochenschnitt auf der Waage und an den Umfängen, nicht am einzelnen Tag, und alle paar Wochen stellt Natalie anhand der Zahlen nach.",
      },
      {
        title: "Gekocht wird einmal, nicht doppelt",
        body: "Viele Anfragen aus Mülheim kommen aus Haushalten, in denen mehrere Generationen oder Geschmäcker am selben Tisch sitzen. Das zweite Kochen nur für den eigenen Plan hält niemand durch, also plant Natalie andersherum: ein Gericht für alle, deine Portion und deine Eiweißquelle angepasst, dazu eine Einkaufsliste, die zum Wochenmarkt am Wiener Platz genauso passt wie zum Supermarkt. Entschieden wird beim Planen, nicht abends vor dem offenen Kühlschrank.",
      },
      {
        title: "Online-Beratung, Training auf Wunsch dazu",
        body: "Die Beratung läuft per Video und App und ist Teil des Online Coachings ab 150€ im Monat, zusammen mit meinem Trainingsplan und wöchentlichen Check-ins. Wer auf der Schäl Sick auch 1-zu-1 trainieren will, nimmt Stunden zu 50€ dazu: zu Hause, im Studio oder draußen am Rheinufer in Mülheim. Der Einstieg ist ein kostenloses Erstgespräch, in dem du Natalie und mich kennenlernst und wir deinen Alltag durchgehen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Mülheim?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan per App und wöchentlichen Check-ins. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Muss ich auf das Essen auf der Keupstraße verzichten?",
        a: "Nein. Der Plan arbeitet mit einem Budget: das Essen im Veedel ist eingeplant, nicht verboten. Entscheidend ist der Wochenschnitt, nicht der einzelne Abend.",
      },
      {
        q: "Wer macht die Beratung bei FitPrimo?",
        a: "Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie steuert die Ernährung, ich als Trainer das Training, abgestimmt aufeinander.",
      },
      {
        q: "Ich koche für die ganze Familie. Brauche ich einen Extraplan?",
        a: "Nein, das wäre der Fehler. Natalie plant ein Gericht für alle und passt nur deine Portion und deine Eiweißquelle an. So hält der Plan auch nach Wochen noch.",
      },
      {
        q: "Behandelt ihr auch Unverträglichkeiten oder Diabetes?",
        a: "Nein. Natalies Bereich ist Sport- und Fitnessernährung für gesunde Erwachsene. Medizinische Ernährungsfragen gehören in ärztliche Betreuung, das sagen wir dir offen.",
      },
    ],
  },
  "braunsfeld/personal-training": {
    answer:
      "Personal Training in Köln-Braunsfeld, geplant um deinen Arbeitstag: 1-zu-1 Einheiten vor oder nach dem Büro, bei dir zu Hause, im Studio oder draußen Richtung Stadtwald. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Braunsfeld: 1-zu-1 vor oder nach der Arbeit, zu Hause, im Studio oder am Stadtwald. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Viertel, das arbeitet und wohnt",
        body: "Braunsfeld hat zwei Gesichter: 12.362 Menschen wohnen hier auf 1,69 km², und tagsüber kommen die Beschäftigten aus den Büros rund um den TechnologiePark an der Eupener Straße dazu. Für beide Gruppen scheitert Training selten am Willen, sondern am Übergang: zwischen Feierabend und Abendessen ist kein Platz für eine Fahrt quer durch die Stadt. Deshalb lege ich die Einheiten dorthin, wo dein Tag ohnehin stattfindet, an die Wohnung oder ans Büro, als festen Termin mit Puffer statt als guten Vorsatz.",
      },
      {
        title: "Stadtwald vor der Tür, Langhantel im Studio",
        body: "Wenige Minuten südlich von Braunsfeld beginnt der Stadtwald, mit dem Lindenthaler Tierpark und Wegen, die lang genug für richtige Laufeinheiten sind. Dorthin verlege ich im Sommer Intervalle, Technikarbeit und Zirkel mit dem eigenen Körpergewicht. Die Kraftarbeit läuft drinnen: bei dir zu Hause mit mitgebrachten Kurzhanteln und Bändern oder im Studio an der Langhantel. Über die Aachener Straße mit der Linie 1 bist du schnell unterwegs, auch ohne Auto.",
      },
      {
        title: "Dein Plan rechnet mit vollen Wochen",
        body: "Die typische Braunsfelder Anfrage kommt von Berufstätigen zwischen 35 und 55: Verantwortung im Job, wenig Zeit, oft Jahre seit dem letzten regelmäßigen Sport. Dafür baue ich Pläne, die mit zwei geführten Stunden pro Woche auskommen und Dienstreisen überleben: kurze Ersatzeinheiten für das Hotelzimmer, klare Prioritäten, welche Einheit in einer vollen Woche zuerst fällt und welche nie. Fortschritt wird gemessen, an Kraftwerten und Wiederholungen, nicht am Gefühl nach einem guten Tag.",
      },
      {
        title: "Kosten und Einstieg in Braunsfeld",
        body: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App und wöchentlichem Check-in beginnt bei 150€ im Monat; für die Ernährung arbeitet Natalie mit, Ernährungsberaterin für Sport- und Fitnessernährung. Der Einstieg ist ein kostenloses Erstgespräch, gern in deiner Mittagspause: Ziel, Zeitbudget, Trainingsort. Danach entscheidest du ohne Druck.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Braunsfeld?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Kannst du vor der Arbeit trainieren?",
        a: "Ja. Frühtermine ab 6:30 Uhr sind in Braunsfeld gefragt und machbar, bei dir zu Hause oder draußen. Nach 60 Minuten sitzt du geduscht am Schreibtisch.",
      },
      {
        q: "Wo trainieren wir in Braunsfeld?",
        a: "Je nach Ziel: Kraft bei dir zu Hause oder im Studio, Ausdauer und Zirkel im Stadtwald ein paar Minuten südlich. Viele kombinieren beides in einer Woche.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Bin ich hier richtig?",
        a: "Genau dafür ist 1-zu-1 Training da. Wir starten mit einem Check von Beweglichkeit und Kraft und bauen von dort auf, ohne Vergleich mit anderen und ohne Studio-Publikum.",
      },
      {
        q: "Reichen zwei Einheiten pro Woche?",
        a: "Für die meisten Ziele ja, wenn sie geplant sind und du dich zwischen den Terminen etwas bewegst. Mehr Volumen bauen wir erst ein, wenn zwei Einheiten stabil im Kalender stehen.",
      },
    ],
  },

  "neubrueck/rueckentraining": {
    answer:
      "Rückentraining in Köln-Neubrück: zweimal pro Woche Kraftaufbau für Rumpf, Hüfte und hintere Kette, bei dir zu Hause in der Siedlung, dazu der Königsforst direkt vor der Tür für den Bewegungsausgleich. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos. Akute oder ausstrahlende Schmerzen klärt zuerst ein Arzt.",
    metaDescription:
      "Rückentraining in Köln-Neubrück: Kraft für Rumpf und hintere Kette, Training zu Hause, Ausgleich im Königsforst nebenan. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Neubrück sitzt im Auto und im Büro",
        body: "Neubrück ist als Siedlung der 1960er Jahre geplant worden: 8.342 Menschen auf gut einem Quadratkilometer, viel Grün zwischen den Wohnzeilen, und fast alles Weitere liegt außerhalb. Wer hier wohnt, pendelt, oft mit dem Auto über die A3 oder die Olpener Straße, und verbringt den Tag sitzend. Autositz plus Bürostuhl plus Sofa ergibt zehn bis zwölf Stunden in derselben gebeugten Haltung, und der untere Rücken ist meist die Stelle, die zuerst protestiert.",
      },
      {
        title: "Die Hüfte trainieren, nicht nur den Rücken",
        body: "Bei Vielsitzern aus dem Autopendel-Alltag arbeite ich stärker an Hüfte und hinterer Kette als am Rücken selbst: verkürzte Hüftbeuger und schwaches Gesäß zwingen die Lendenwirbelsäule in Arbeit, für die sie nicht gebaut ist. Im Training heißt das Hüftstrecken unter Last, Beinrückseite kräftigen, Rumpf gegen Rotation stabilisieren. Das geht vollständig bei dir zu Hause, mit Material, das ich mitbringe, ein freier Platz im Wohnzimmer reicht.",
      },
      {
        title: "Der Königsforst ist dein Ausgleichsprogramm",
        body: "Neubrück hat einen Vorteil, den kaum ein Kölner Veedel bietet: Am östlichen Rand beginnt der Königsforst, einer der größten Wälder der Stadt, mit breiten, ebenen Wegen auf weichem Boden. Zwischen den beiden Krafteinheiten gehört er fest in deinen Plan, zügiges Gehen, 30 bis 40 Minuten, bei jedem Wetter. Diese einfache, regelmäßige Bewegung nimmt dem Sitztag mehr Druck vom Rücken als jede einzelne Übung, und du musst dafür nicht einmal die Straße überqueren.",
      },
      {
        title: "Ablauf, Grenzen, Kosten",
        body: "Vor dem ersten Training steht ein kostenloses Gespräch über Vorgeschichte, Alltag und Ziel. Plötzliche, heftige oder ins Bein ausstrahlende Schmerzen gehören zuerst zum Arzt; mit Freigabe trainieren wir danach gezielt weiter und wählen die Übungen nach Befund. Die 1-zu-1 Stunde kostet 50€, die Begleitung per App mit Plan und wöchentlichem Check-in beginnt bei 150€ im Monat. Die meisten spüren nach einigen Wochen, dass der Arbeitstag weniger nachhängt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Neubrück?",
        a: "Die 1-zu-1 Stunde kostet 50€, Online-Begleitung mit Plan per App ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich dafür in ein Studio fahren?",
        a: "Nein. In Neubrück trainiere ich fast alle Kunden zu Hause, das Material bringe ich mit. Wer später mehr Last will, kann Einheiten im Studio in Köln ergänzen, muss aber nicht.",
      },
      {
        q: "Ich sitze täglich über eine Stunde im Auto. Was bringt Training dagegen?",
        a: "Viel, wenn es die richtigen Stellen trifft: Hüftbeuger lang, Gesäß und Beinrückseite stark, Rumpf stabil. Dazu regelmäßiges zügiges Gehen im Königsforst. Die Kombination entlastet die Lendenwirbelsäule spürbar.",
      },
      {
        q: "Reicht Spazierengehen im Königsforst nicht aus?",
        a: "Gehen ist der beste Ausgleich, baut aber keine Kraft auf. Ein Rücken, der lange Sitztage wegstecken soll, braucht beides: zwei Krafteinheiten pro Woche und dazwischen die Bewegung im Wald.",
      },
      {
        q: "Wie schnell lassen die Beschwerden nach?",
        a: "Unspezifische Beschwerden vom Sitzen bessern sich oft innerhalb von vier bis acht Wochen regelmäßigen Trainings. Ein Versprechen gibt es nicht; gemessen wird der Fortschritt über Kraftwerte und darüber, wie sich lange Tage anfühlen.",
      },
    ],
  },

  "ehrenfeld/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Ehrenfeld heißt bei uns: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, baut dir einen Plan für Tage ohne festen Rhythmus, vom späten Frühstück im Café bis zum Abend auf der Venloer Straße, komplett online. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Ehrenfeld mit Natalie: Pläne für unregelmäßige Tage, auch vegetarisch oder vegan, komplett online. Ab 150€/Monat im Coaching, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Veedel ohne Kantinenrhythmus",
        body: "In Ehrenfeld leben 38.405 Menschen auf 3,71 km², und auffällig viele davon arbeiten ohne feste Essenszeiten: Selbstständige, Schichtler, Leute im Homeoffice zwischen Küche und Schreibtisch. Der Tag startet mit Kaffee, die erste richtige Mahlzeit kommt irgendwann nachmittags, abends wird es dann viel. Genau dieses Muster ist der häufigste Grund, warum das Gewicht steht oder das Training nichts bringt. Natalie plant nicht gegen deinen Tag, sondern mit ihm: wenige feste Ankerpunkte, der Rest flexibel.",
      },
      {
        title: "Venloer Straße inklusive",
        body: "Zwischen Ehrenfeldgürtel und Innerer Kanalstraße reiht sich eine Küche an die andere, und niemand zieht hierher, um jeden Abend Reis mit Brokkoli zu essen. Deshalb arbeitet Natalie mit einem Wochenbudget statt mit Verboten: Die Abende im Veedel sind eingeplant, davor und danach gleicht der Plan aus. Du lernst, Gerichte grob einzuschätzen, statt jede Zutat zu wiegen. Das hält länger als jede Diät, weil es dein Leben nicht umbaut, sondern ordnet.",
      },
      {
        title: "Vegetarisch und vegan mit genug Eiweiß",
        body: "Kaum ein Kölner Veedel isst so oft fleischfrei wie Ehrenfeld. Das ist fürs Abnehmen kein Problem, fürs Training schon eher: Ohne Plan landet man vegetarisch schnell bei zu wenig Eiweiß, und der Muskel hat im Defizit nichts zu verteidigen. Natalie rechnet deinen Eiweiß-Zielwert aus und zeigt dir, wie du ihn mit Hülsenfrüchten, Milchprodukten oder komplett pflanzlich erreichst. Keine Pulver-Pflicht, aber ehrliche Zahlen.",
      },
      {
        title: "Beratung online, Training im Grüngürtel dazu",
        body: "Die Beratung läuft per Video und App: Anamnese, Wochenplan, dann kurze Check-ins, in denen Natalie nachsteuert. Wer Bewegung dazunehmen will, kombiniert sie mit Training bei mir, im Studio oder draußen im Inneren Grüngürtel, der direkt am Veedel liegt. Das Online Coaching ab 150€ im Monat enthält beides: Trainingsplan von mir, Ernährungssteuerung von Natalie. Das Erstgespräch kostet nichts.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Ehrenfeld?",
        a: "Die Beratung durch Natalie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit dem Trainingsplan. Das Erstgespräch ist kostenlos und klärt, ob das Format zu dir passt.",
      },
      {
        q: "Funktioniert der Plan auch vegetarisch oder vegan?",
        a: "Ja. Natalie hat den Schwerpunkt Sport- und Fitnessernährung und plant fleischfreie Ernährung regelmäßig. Wichtig ist der Eiweiß-Zielwert, und der lässt sich auch rein pflanzlich erreichen.",
      },
      {
        q: "Ich esse oft auswärts. Macht das die Beratung sinnlos?",
        a: "Nein, es macht sie nötig. Der Plan arbeitet mit einem Wochenbudget: Abende im Veedel sind eingeplant, die Tage drumherum gleichen aus. Verzicht auf dein soziales Leben ist keine Strategie, die hält.",
      },
      {
        q: "Muss ich dafür irgendwo hinkommen?",
        a: "Nein, die Beratung läuft komplett online per Video und App. Wenn du Training dazunehmen willst, trainieren wir im Studio oder draußen, zum Beispiel im Inneren Grüngürtel.",
      },
      {
        q: "Stellt Natalie Diagnosen oder behandelt Unverträglichkeiten?",
        a: "Nein. Medizinische Fragen gehören zum Arzt. Natalie arbeitet an Sport- und Alltagsernährung: Kalorien, Makros, Wochenstruktur und ein Plan, den du durchhalten kannst.",
      },
    ],
  },

  "suerth/abnehmen": {
    answer:
      "Abnehmen in Köln-Sürth plane ich über den Wochenschnitt: ein Kalorienziel, das Familienessen und Pendeltage übersteht, zwei Krafteinheiten pro Woche bei dir zu Hause oder im Studio, feste Geh-Kilometer am Rheinufer. Realistisch ist ein halbes bis ein Kilo Fett pro Woche. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Sürth: Kalorienziel im Wochenschnitt, Krafttraining zu Hause oder im Studio, feste Kilometer am Rheinufer. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Woran Abnehmen in Sürth wirklich scheitert",
        body: "Sürth ist ein Familien- und Pendlerstadtteil: 11.033 Einwohner, viele Häuser mit Garten, morgens die Linie 16 oder die A555 in die Stadt. Das Problem ist selten fehlendes Wissen, sondern der Tagesablauf. Mittags isst man unterwegs oder in der Kantine, abends sitzt die Familie am Tisch, und am Wochenende kommen Besuch und Ausflüge dazu. Ein Plan, der jeden Tag gleich aussieht, zerbricht daran in zwei Wochen. Deshalb rechne ich dein Defizit über die Woche, nicht über den einzelnen Tag.",
      },
      {
        title: "Der Rheinuferweg ist dein Grundumsatz-Hebel",
        body: "Zwischen Rodenkirchen und der Godorfer Grenze liegt ein langes, flaches Stück Rheinufer, und es ist der unterschätzte Teil jedes Abnehmplans in Sürth. Nicht als Sport, sondern als Sockel: feste Kilometer, die jede Woche stehen, bei jedem Wetter. Diese Alltagsbewegung verbrennt übers Jahr mehr als jede einzelne Trainingseinheit und kostet keine Willenskraft, sobald sie Gewohnheit ist. Im Plan steht sie deshalb genauso verbindlich wie das Krafttraining.",
      },
      {
        title: "Krafttraining, damit nur Fett verschwindet",
        body: "Wer nur weniger isst, verliert Muskeln mit, und genau die halten den Verbrauch hoch. Deshalb gehören zwei Krafteinheiten pro Woche in den Plan: bei dir zu Hause mit mitgebrachtem Material oder im Studio an der Langhantel. Gewichte und Wiederholungen werden notiert, alle vier Wochen schauen wir auf Waage, Umfänge und Kraftwerte zusammen. Sinkt das Gewicht bei stabilen Kraftwerten, verschwindet Fett und nicht Muskel. Das ist der ganze Trick, und er ist messbar.",
      },
      {
        title: "Essen plant Natalie mit dir, wenn du willst",
        body: "Für die Ernährungsseite arbeite ich mit Natalie, unserer Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie legt dein Kalorienziel fest und baut den Familientisch ein, statt dich davon auszuschließen: gleiche Gerichte, angepasste Portionen. Die Beratung läuft online und ist im Online Coaching ab 150€ im Monat enthalten. Wer nur trainieren will, bekommt von mir die Leitplanken, ohne eigenen Ernährungsplan.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Sürth?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan und Ernährungssteuerung durch Natalie beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wie viel kann ich realistisch abnehmen?",
        a: "Ein halbes bis ein Kilo Fett pro Woche ist bei sauberem Defizit realistisch, am Anfang durch Wasser oft mehr. Wer dir deutlich mehr verspricht, redet über Muskel- und Wasserverlust.",
      },
      {
        q: "Muss ich dafür ins Fitnessstudio?",
        a: "Nein. Die Krafteinheiten gehen bei dir zu Hause mit mitgebrachtem Material. Wer schwerer trainieren will, kombiniert das mit dem Studio in Köln, viele machen eine Einheit dort und eine daheim.",
      },
      {
        q: "Abends isst die ganze Familie zusammen. Passt das in den Plan?",
        a: "Ja, das ist sogar die Grundlage. Natalie plant das Abendessen als festen Bestandteil und steuert über Portionen und den Rest des Tages. Getrennt kochen hält niemand durch.",
      },
      {
        q: "Zählt Spazierengehen am Rhein wirklich?",
        a: "Ja, mehr als die meisten denken. Feste Wochenkilometer am Rheinufer erhöhen deinen Verbrauch zuverlässig und ohne Erschöpfung. Abnehmen entscheidet sich im Alltag, das Training schützt dabei die Muskeln.",
      },
    ],
  },

  "deutz/rueckentraining": {
    answer:
      "Rückentraining in Köln-Deutz heißt gezielte Kraftarbeit gegen den Bildschirm-Tag: Nacken, Schulterblätter und Rumpf, zweimal pro Woche im Studio oder als kompakte Einheit nahe deinem Büro, dazu Rheinpark und Rheinboulevard für den täglichen Ausgleich. Die Stunde kostet 50€, das Erstgespräch ist kostenlos. Akute Schmerzen klärt zuerst ein Arzt.",
    metaDescription:
      "Rückentraining in Köln-Deutz: Kraft für Nacken, Schulterblätter und Rumpf gegen lange Bürotage, Ausgleich im Rheinpark. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Deutz arbeitet im Sitzen",
        body: "Zwischen Messe, Bahnhof und den Bürotürmen am Rheinufer verbringen jeden Tag Zehntausende acht Stunden am Bildschirm, dazu kommen die 15.644, die in Deutz wohnen und oft genauso sitzen: erst im Zug, dann im Büro. Das typische Ergebnis kenne ich aus den Erstgesprächen: verspannter Nacken, Ziehen zwischen den Schulterblättern, ein unterer Rücken, der sich nach langen Tagen steif anfühlt. Das ist in den meisten Fällen kein Schaden, sondern fehlende Kraft an den richtigen Stellen. Und die lässt sich aufbauen.",
      },
      {
        title: "Oben anfangen: Nacken und Schulterblätter",
        body: "Bildschirmarbeit zieht den Kopf nach vorn und die Schultern nach oben. Deshalb beginnt das Programm in Deutz meist oben: Rudervarianten, Face Pulls, kontrollierte Überkopf-Arbeit, dazu Übungen, die die Schulterblätter wieder führen lernen. Der Rumpf kommt in jeder Einheit dazu, denn ein stabiler Rumpf nimmt dem Nacken Arbeit ab. Gedehnt wird ergänzend, aber Dehnen allein hält keinen Acht-Stunden-Tag aus, das schafft nur Kraft.",
      },
      {
        title: "Training, das in einen Messetag passt",
        body: "Wer in Deutz arbeitet, hat zwischen Terminen selten 90 Minuten übrig. Deshalb plane ich hier kompakte Einheiten: 60 Minuten von Tür zu Tür, mittags oder direkt nach Feierabend, im Studio oder draußen. Für den Ausgleich zwischen den Einheiten liegt das Beste direkt vor der Tür: der Rheinpark für zügige Runden, die Treppen am Rheinboulevard für kurze Belastungen, die den Kreislauf hochziehen, ohne Sportzeug zu brauchen. Zehn Minuten am Tag verändern lange Sitzwochen spürbar.",
      },
      {
        title: "Grenzen, Ablauf, Kosten",
        body: "Bei akuten, ausstrahlenden oder nächtlichen Schmerzen gehört der erste Weg zum Arzt, nicht zu mir. Trainiert wird, was ärztlich unbedenklich ist. Wir starten mit einem Check von Haltung, Beweglichkeit und Kraft, dann stehen zwei Einheiten pro Woche mit dokumentierten Gewichten. Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Deutz?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos und klärt, welcher Einstieg für deinen Rücken passt.",
      },
      {
        q: "Hilft Krafttraining überhaupt gegen Nackenverspannungen?",
        a: "Bei Verspannungen durch Bildschirmarbeit ja: Kräftigung von oberem Rücken und Schulterblatt-Muskulatur reduziert die Dauerspannung im Nacken. Massagen lindern kurzfristig, Kraft verändert die Ursache.",
      },
      {
        q: "Ich arbeite an der Messe und habe nur die Mittagspause. Reicht das?",
        a: "Ja, wenn der Ablauf steht: 60 Minuten von Tür zu Tür, zwei Mal pro Woche. Dazu kommen kurze tägliche Ausgleichsminuten, zum Beispiel eine zügige Runde durch den Rheinpark.",
      },
      {
        q: "Soll ich mit Schmerzen trainieren?",
        a: "Nein. Akute, ausstrahlende oder nachts auftretende Schmerzen klärt zuerst ein Arzt. Danach bauen wir auf, was freigegeben ist. Unspezifische Steifheit nach Sitztagen ist dagegen genau das, wofür das Training da ist.",
      },
      {
        q: "Wie lange dauert es, bis sich etwas verbessert?",
        a: "Die meisten spüren nach vier bis acht Wochen regelmäßigen Trainings den Unterschied an langen Bürotagen. Gemessen wird trotzdem: Kraftwerte und Haltung sagen mehr als das Tagesgefühl.",
      },
    ],
  },

  "merheim/abnehmen": {
    answer:
      "Abnehmen in Köln-Merheim baue ich auf drei Dinge: ein Kalorienziel, das auch Schichtwochen übersteht, zwei Krafteinheiten pro Woche bei dir zu Hause oder im Studio, und die Merheimer Heide vor der Tür als tägliche Bewegungsfläche. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Merheim: Kalorienziel auch für Schichtdienst, Krafttraining zu Hause, tägliche Runden in der Merheimer Heide. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Die Merheimer Heide ist dein wichtigstes Abnehm-Gerät",
        body: "Merheim hat 11.354 Einwohner und direkt am Stadtteil eine der größten freien Grünflächen des Kölner Ostens: die Merheimer Heide. Fürs Abnehmen ist das Gold wert, denn der größte Teil deines Kalorienverbrauchs entsteht nicht im Training, sondern in der Alltagsbewegung. Eine feste Runde durch die Heide, vier bis fünf Mal pro Woche, hebt deinen Verbrauch zuverlässiger als jede zusätzliche Schwitzeinheit. Im Plan bekommt sie deshalb einen festen Platz, mit Kilometern statt guter Vorsätze.",
      },
      {
        title: "Ein Plan, der mit dem Dienstplan lebt",
        body: "Mit den Kliniken der Stadt Köln steht in Merheim einer der großen Arbeitgeber des Rechtsrheinischen, und viele Anfragen von hier kommen aus Pflege und Klinikbetrieb: Wechselschichten, Essen zu wechselnden Zeiten, Schlaf, der mal reicht und mal nicht. Ein starrer Diätplan scheitert daran sofort. Deshalb bekommt jede Woche ein Kalorienbudget statt fester Mahlzeiten-Uhrzeiten, und die Trainingstermine wandern mit dem Dienstplan. Abnehmen funktioniert auch in Schichten, es braucht nur eine Struktur, die sich mitbewegt.",
      },
      {
        title: "Muskeln behalten, Fett verlieren",
        body: "Im Kaloriendefizit entscheidet das Krafttraining darüber, was dein Körper abbaut. Ohne Widerstand verschwinden Muskeln mit, und mit ihnen sinkt der Verbrauch, der Jojo ist dann eingebaut. Zwei Einheiten pro Woche reichen: bei dir zu Hause mit mitgebrachten Kurzhanteln und Bändern oder im Studio an der Langhantel. Ich dokumentiere Gewichte und Wiederholungen und kontrolliere alle vier Wochen Waage, Umfänge und Kraftwerte. So siehst du, dass die richtige Masse verschwindet.",
      },
      {
        title: "Zahlen von Natalie, wenn du die Ernährung mitlösen willst",
        body: "Dein Kalorienziel und die Eiweißmenge legt auf Wunsch Natalie fest, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie plant online, per Video und App, und steuert in kurzen Check-ins nach, wenn das Gewicht stehen bleibt. Im Online Coaching ab 150€ im Monat sind Trainingsplan und Ernährungssteuerung zusammen enthalten. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist in beiden Fällen kostenlos.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Merheim?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan und Ernährungssteuerung durch Natalie beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite im Schichtdienst an der Klinik. Funktioniert das trotzdem?",
        a: "Ja. Der Plan arbeitet mit einem Wochenbudget an Kalorien statt mit festen Essenszeiten, und die Trainingstermine lege ich um deinen Dienstplan. Viele meiner Kunden aus Merheim arbeiten in Schichten.",
      },
      {
        q: "Wie schnell nehme ich ab?",
        a: "Realistisch sind ein halbes bis ein Kilo Fett pro Woche, in der ersten Zeit durch Wasser oft mehr. Schnellere Versprechen gehen auf Kosten von Muskeln, und das rächt sich nach der Diät.",
      },
      {
        q: "Reichen Runden in der Merheimer Heide nicht aus?",
        a: "Gehen hebt den Verbrauch und ist der wichtigste Alltagsbaustein, aber es schützt die Muskeln im Defizit nicht. Erst die Kombination aus Defizit, Gehen und zwei Krafteinheiten pro Woche nimmt gezielt Fett ab.",
      },
      {
        q: "Muss ich für das Training irgendwo hinfahren?",
        a: "Nein. Ich komme mit dem Material zu dir nach Merheim, trainiert wird im Wohnzimmer, im Hof oder draußen an der Heide. Wer schwerer trainieren will, nimmt das Studio in Köln dazu.",
      },
    ],
  },

  "muelheim/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Mülheim nach Wettkampf-Prinzipien: Grundübungen an der Langhantel, dokumentierte Steigerung von Woche zu Woche und ein Eiweiß-Zielwert fürs Essen. Zwei Einheiten pro Woche reichen, eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau mit Personal Trainer in Köln-Mülheim: Langhantel-Grundübungen, dokumentierte Progression, Eiweiß-Zielwert. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Muskelaufbau ist ein Projekt über Monate",
        body: "Sichtbare Muskulatur entsteht nicht in vier Wochen, sondern über eine Aufbauphase von sechs bis zwölf Monaten. Ich sage das im Erstgespräch so deutlich, weil die meisten Abbrüche nicht an der Motivation scheitern, sondern an falschen Erwartungen. Als Wettkampfathlet im WABBA-Verband baue ich deinen Plan so, wie ich meine eigenen Aufbauphasen plane: wenige Grundübungen, saubere Technik, Gewichte, die nach Protokoll steigen. Was nicht notiert ist, ist nicht passiert.",
      },
      {
        title: "Training, das an deinem Mülheimer Tag andockt",
        body: "Mülheim ist mit über 43.000 Einwohnern das größte Veedel Kölns, und ein wachsender Teil davon arbeitet rund um das Carlswerk an der Schanzenstraße, zwischen Agenturen, Werkstätten und Bühnen. Für den Muskelaufbau ist das ein Vorteil: Die Krafteinheiten liegen im Studio, und ich lege die Termine an den Rand deines Arbeitstags, früh vor dem ersten Termin oder direkt nach Feierabend. Zwei feste Slots pro Woche, die so geplant sind, dass sie auch in vollen Wochen stehen bleiben.",
      },
      {
        title: "Ohne Essen wächst nichts: der Eiweiß-Zielwert",
        body: "Muskeln entstehen aus Reiz plus Material. Das Material heißt Eiweiß, und dein Zielwert hängt an deinem Körpergewicht, nicht an Gefühl oder Shakes. Ein leichter Kalorienüberschuss gehört dazu, die alte Masse-Logik mit Pizza und Pommes nicht: Was du in einer schlampigen Aufbauphase an Fett ansammelst, musst du später wieder abtrainieren. Wer beim Essen Struktur will, bekommt sie von Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung.",
      },
      {
        title: "Woran du merkst, dass es funktioniert",
        body: "Nicht am Spiegel nach zwei Wochen, sondern an den Zahlen: mehr Gewicht auf der Langhantel bei gleicher Technik, mehr Wiederholungen bei gleichem Gewicht, wachsende Umfänge an Arm, Brust und Bein. Ich messe alle vier Wochen nach und passe den Plan an, wenn eine Zahl stehen bleibt. So trainierst du nie monatelang an einem Plateau vorbei, das man mit einer Umstellung in zwei Wochen lösen kann.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Coaching in Köln-Mülheim?",
        a: "Die 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Trainingsplan per App, Eiweiß-Zielwert und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wie lange dauert es, bis man Muskelaufbau sieht?",
        a: "Kraftwerte steigen ab der ersten Woche, sichtbare Veränderungen brauchen bei sauberem Training und passendem Essen meist drei bis vier Monate. Nach sechs bis zwölf Monaten sprechen wir über eine andere Statur, nicht über Details.",
      },
      {
        q: "Reichen zwei Einheiten pro Woche für Muskelaufbau?",
        a: "Ja, wenn sie geplant sind. Zwei Ganzkörper-Einheiten mit Grundübungen und dokumentierter Steigerung schlagen vier planlose Studiobesuche. Mehr Volumen bauen wir erst ein, wenn dein Fortschritt es verlangt.",
      },
      {
        q: "Brauche ich dafür ein Fitnessstudio in Mülheim?",
        a: "Die schweren Langhantel-Einheiten laufen im Studio im Rahmen deiner Stunde. Ergänzende Einheiten mit Kurzhanteln und Bändern sind bei dir zu Hause möglich, viele kombinieren beides.",
      },
      {
        q: "Funktioniert Muskelaufbau auch ab 40?",
        a: "Ja. Der Aufbau läuft etwas langsamer und die Regeneration braucht mehr Beachtung, deshalb zählen Technik und Planung ab 40 doppelt. Genau dafür ist ein geführtes Programm da.",
      },
    ],
  },

  "suelz/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Sülz nutzt den Äußeren Grüngürtel direkt vor der Tür: Sprints und Richtungswechsel auf den Wiesen des Beethovenparks, lange Intervalle auf der flachen Runde am Decksteiner Weiher, Kraft und Sprungkraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Sülz: Sprints im Beethovenpark, Intervalle am Decksteiner Weiher, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Dicht bebautes Veedel, offenes Gelände daneben",
        body: "In Sülz leben 36.851 Menschen auf gut fünf Quadratkilometern, eng bebaut bis an die Sülzburgstraße. Aber am westlichen Rand kippt das Veedel direkt in den Äußeren Grüngürtel: Beethovenpark, dahinter die Wiesen und Wege Richtung Decksteiner Weiher. Für Athletiktraining ist diese Kombination ideal, weil das Aufwärmen auf dem Weg dorthin passiert und du keine Anfahrt brauchst, die den Termin frisst.",
      },
      {
        title: "Beethovenpark und Decksteiner Weiher: zwei verschiedene Reize",
        body: "Die großen Wiesen im Beethovenpark nehmen wir für alles Kurze und Explosive: Antritte über 20 bis 60 Meter, Richtungswechsel, Sprungserien auf weichem Boden. Die Runde am Decksteiner Weiher ist flach und bei Kölner Läufern seit Jahrzehnten etabliert, dort laufen wir längere Intervalle und Testläufe unter gleichbleibenden Bedingungen. Zwei Orte, keine zehn Minuten auseinander, die zusammen fast das komplette Ausdauer- und Schnelligkeitsprogramm abdecken.",
      },
      {
        title: "Vom Technik-Check zum Plan in Zahlen",
        body: "Am Anfang steht ein Check von Sprinttechnik, Sprungkraft und Rumpfstabilität. Daraus entsteht ein Plan mit zwei Einheiten pro Woche: eine draußen im Grüngürtel, eine im Studio für Kraft und Plyometrie. Alle vier bis sechs Wochen wird nachgemessen, Sprintzeit und Sprunghöhe schwarz auf weiß. Bewegt sich eine Zahl nicht, ändere ich den Plan und nicht die Ausrede.",
      },
      {
        title: "Wer in Sülz dafür anfragt",
        body: "Sülz ist jung und sportlich: Studierende und Mitarbeiter der nahen Uni, Läuferinnen, die ihre Weiher-Runde schneller laufen wollen, Vereinsspieler aus Fußball, Handball und Tennis, die im Winter an Schnelligkeit und Stabilität arbeiten. Athletiktraining braucht keinen Wettkampfkalender, nur ein Ziel: schneller, stabiler, belastbarer werden. Das Einstiegsniveau legt der Check fest.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Sülz?",
        a: "50€ pro 1-zu-1 Stunde, Online Coaching mit Plan und Video-Check-ins ab 150€ im Monat. Das Erstgespräch ist kostenlos und klärt, welches Format zu deinem Ziel passt.",
      },
      {
        q: "Wo genau trainieren wir in Sülz?",
        a: "Im Beethovenpark für Sprints, Sprünge und Richtungswechsel, auf der Runde am Decksteiner Weiher für Intervalle und Testläufe, im Studio für Kraft. Treffpunkt ist meist am Parkrand, das Warm-up beginnt zu Fuß.",
      },
      {
        q: "Ich laufe schon regelmäßig. Was bringt mir Athletiktraining?",
        a: "Tempo entsteht nicht nur über Kilometer. Sprungkraft, Rumpfstabilität und Sprinttechnik machen dich effizienter, und genau die fehlen den meisten Läufern. Viele laufen nach acht bis zwölf Wochen dieselbe Runde spürbar schneller.",
      },
      {
        q: "Ist das auch ohne Vereinssport sinnvoll?",
        a: "Ja. Schnelligkeit, Stabilität und Belastbarkeit helfen im Alltag genauso wie im Sport. Die Übungen werden an dein Niveau angepasst, der Check am Anfang legt den Startpunkt fest.",
      },
    ],
  },

  "lind/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Lind läuft bei uns komplett online: Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, plant deine Woche um den einen großen Einkauf herum, der im Dorf nun mal die Regel ist. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung für Köln-Lind mit Natalie: Wochenplan um den großen Einkauf, Vorrat statt Spontankauf, Eiweißziel aufs Training abgestimmt. Online, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Im Dorf entscheidet der Einkauf, nicht die Disziplin",
        body: "Lind ist mit 3.691 Einwohnern eines der kleinsten Veedel von Porz, und wer hier wohnt, kauft nicht spontan um die Ecke ein, sondern plant: einmal groß, mit dem Auto, meist Richtung Porz oder Wahn. Für die Ernährung ist das keine Schwäche, sondern ein Hebel. Ein Kühlschrank, der nach Plan gefüllt wurde, trifft die Abendentscheidung von Dienstag schon am Samstag. Natalie baut deine Woche genau um diesen Rhythmus herum, statt einen Großstadtplan über ein Dorf zu legen.",
      },
      {
        title: "Eine Einkaufsliste pro Woche, ein Vorrat, der trägt",
        body: "Der Kern der Beratung ist konkret: ein Kalorien- und Eiweißziel, das zu deinem Training passt, eine Einkaufsliste für den Wochenkauf und ein Vorrat aus Tiefkühlgemüse, Hülsenfrüchten und Eiweißquellen, der auch dann noch eine gute Mahlzeit hergibt, wenn der Plan der Woche längst gerissen ist. Gemessen wird am Wochenschnitt, nicht am einzelnen Tag, und nachjustiert wird alle paar Wochen anhand deiner Zahlen.",
      },
      {
        title: "Mahlzeiten, die das Pendeln überleben",
        body: "Von Lind aus wird gependelt, viele arbeiten am nahen Flughafen Köln/Bonn oder fahren über die A59 in die Stadt. Die kritischen Kalorien eines Pendlertags stecken selten im Mittagessen, sondern in dem, was unterwegs dazukommt: Tankstelle, Bäckertüte, Automat. Natalie plant deshalb Mahlzeiten, die sich vorbereiten und mitnehmen lassen, und setzt feste Essenszeiten, die zu deinen Arbeitszeiten passen, nicht zu einem Lehrbuch.",
      },
      {
        title: "Beratung am Bildschirm, Bewegung in der Heide",
        body: "Die Beratung läuft per Video, ohne Fahrt: Erstgespräch, Plan, dann regelmäßige Check-ins, bei denen Natalie anhand von Gewichtsverlauf und Umfängen nachsteuert. Wer Bewegung dazulegen will, hat in Lind die Wahner Heide am Ortsrand für feste Spaziergänge oder kombiniert die Beratung mit Training bei mir, zu Hause oder draußen. Pflicht ist das nicht: Die Ernährungsberatung steht auch allein.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Lind?",
        a: "Sie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Wie läuft die Beratung ab, wenn alles online ist?",
        a: "Erstgespräch per Video, danach bekommst du Wochenplan und Einkaufsliste. In den Check-ins schaut Natalie auf Gewichtsverlauf, Umfänge und deine Rückmeldungen und passt den Plan an. Du brauchst nur Handy oder Laptop.",
      },
      {
        q: "Muss ich jede Mahlzeit abwiegen und tracken?",
        a: "Nein. Am Anfang helfen zwei, drei Wochen Tracking, um ein Gefühl für Portionen zu bekommen. Danach arbeitet der Plan mit Baukasten-Mahlzeiten und Portionslogik, die ohne Waage im Alltag funktioniert.",
      },
      {
        q: "Funktioniert der Plan auch vegetarisch?",
        a: "Ja. Der Eiweiß-Zielwert bleibt derselbe, die Quellen ändern sich: Eier, Milchprodukte, Hülsenfrüchte, Tofu. Natalie plant das von Anfang an so ein, statt ein Fleischrezept zu halbieren.",
      },
      {
        q: "Kann ich Beratung und Training kombinieren?",
        a: "Ja. Viele kombinieren die Online-Beratung mit 1-zu-1 Training für 50€ pro Stunde, in Lind meist bei dir zu Hause oder draußen am Heiderand. Was sinnvoll ist, klären wir im kostenlosen Erstgespräch.",
      },
    ],
  },

  "vogelsang/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Vogelsang hat kurze Wege: Antritte und Sprungserien auf den Wiesen des Äußeren Grüngürtels am Veedelsrand, lange Intervalle Richtung Jahnwiesen am Sportpark Müngersdorf, Kraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Vogelsang: Sprints im Äußeren Grüngürtel, Intervalle an den Jahnwiesen beim Sportpark Müngersdorf, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ein ruhiges Veedel mit Sportgelände nebenan",
        body: "Vogelsang ist mit 8.336 Einwohnern auf 3,64 km² eines der ruhigeren Veedel im Bezirk Ehrenfeld: viel Wohnbebauung, wenig Durchgangsverkehr, und am Rand beginnt der Äußere Grüngürtel. Was Vogelsang besonders macht, ist die Nachbarschaft nach Süden: hinter Müngersdorf liegt der Sportpark Müngersdorf, das größte zusammenhängende Sportgelände der Stadt. Du wohnst also in Laufweite von Flächen, für die andere Kölner quer durch die Stadt fahren.",
      },
      {
        title: "Grüngürtel für das Kurze, Jahnwiesen für das Lange",
        body: "Die Wiesen und Wege des Äußeren Grüngürtels direkt am Veedel nutze ich für Antritte, Steigerungsläufe und Sprungserien auf weichem Boden. Für längere Intervalle laufen wir Richtung Jahnwiesen am Sportpark Müngersdorf: offene, flache Rasenflächen mit genug Platz, um Abschnitte sauber zu messen und Woche für Woche zu vergleichen. Beides erreichst du aus Vogelsang ohne Auto, das Aufwärmen passiert auf dem Weg.",
      },
      {
        title: "Schnelligkeit und Sprungkraft brauchen auch Kraft",
        body: "Draußen entsteht Tempo, im Studio entsteht die Basis dafür: Beinkraft an der Langhantel, Plyometrie mit sauberer Landetechnik, Rumpfarbeit gegen das Einknicken im Antritt. Der Plan hat zwei Einheiten pro Woche, eine draußen, eine drinnen, und alle vier bis sechs Wochen einen Testtag mit Sprintzeit und Sprunghöhe. Trainiert wird nach diesen Zahlen, nicht nach Gefühl.",
      },
      {
        title: "Für Vereinsspieler und Wiedereinsteiger",
        body: "Typische Anfragen aus Vogelsang und Umgebung: Fußballer und Handballerinnen aus den Vereinen im Kölner Westen, die explosiver werden wollen, Läufer mit dem Ziel einer schnelleren Runde, und Leute, die nach Jahren Pause wieder belastbar werden möchten. Das Niveau ist egal, der Technik-Check am Anfang legt den Startpunkt fest, gesteigert wird erst, wenn die Bewegung sitzt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Vogelsang?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App und Video-Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo trainieren wir in Vogelsang?",
        a: "Im Äußeren Grüngürtel direkt am Veedel für Sprints und Sprünge, an den Jahnwiesen beim Sportpark Müngersdorf für längere Intervalle, im Studio für Kraft und Plyometrie.",
      },
      {
        q: "Brauche ich Vorerfahrung für Athletiktraining?",
        a: "Nein. Der Technik-Check am Anfang zeigt, wo du stehst, und die Übungen werden darauf angepasst. Gerade Einsteiger profitieren schnell von besserer Stabilität und Körperspannung.",
      },
      {
        q: "Wie schnell sehe ich Fortschritte?",
        a: "Sprintzeit und Sprunghöhe messen wir alle vier bis sechs Wochen. Die meisten sehen nach zwei Messungen, also nach acht bis zwölf Wochen, einen klaren Unterschied in den Zahlen.",
      },
    ],
  },

  "heimersdorf/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Heimersdorf läuft über zwei geführte Krafteinheiten pro Woche: Grundübungen mit dokumentierter Steigerung, bei dir zu Hause mit mitgebrachtem Material oder im Studio, dazu ein Eiweiß-Zielwert fürs Essen. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau mit Personal Trainer in Köln-Heimersdorf: Grundübungen mit Protokoll, zu Hause oder im Studio, Eiweiß-Zielwert inklusive. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Krafttraining, das ins Reihenhaus passt",
        body: "Heimersdorf ist ein ruhiges Veedel im Kölner Norden: 6.278 Einwohner auf 1,75 km², viele Reihenhäuser mit Garten, gewachsene Nachbarschaften. Ein großes Fitnessstudio musst du hier nicht suchen, und für den Muskelaufbau brauchst du es auch nicht zwingend. Ich komme mit Kurzhanteln, Bändern und Plan zu dir: Kniebeugen-Varianten, Rudern, Drücken, alles lässt sich im Wohnzimmer, im Keller oder im Garten sauber ausführen. Wer schwer an der Langhantel arbeiten will, kombiniert die Hausbesuche mit Einheiten im Studio, die Linie 15 hält direkt im Veedel.",
      },
      {
        title: "Aufbau nach Protokoll, nicht nach Gefühl",
        body: "Muskeln wachsen, wenn der Reiz von Woche zu Woche planbar steigt. Deshalb wird bei mir jede Einheit dokumentiert: Übung, Gewicht, Wiederholungen, Pausenzeit. Als Wettkampfathlet im WABBA-Verband plane ich deine Aufbauphase so, wie ich meine eigenen plane, über sechs bis zwölf Monate, mit wenigen Grundübungen und sauberer Technik. Alle vier Wochen vergleichen wir die Zahlen. Steht eine Übung still, wird der Plan umgestellt, bevor du Monate auf einem Plateau verlierst.",
      },
      {
        title: "Essen fürs Wachstum, ohne den Familientisch umzubauen",
        body: "Ohne Baumaterial kein Aufbau: dein Eiweiß-Zielwert hängt am Körpergewicht und muss auch an Tagen stehen, an denen abends das Familienessen auf dem Tisch steht. Genau dafür bekommst du von mir einfache Regeln statt Spezialgerichte, und wer mehr Struktur will, arbeitet mit Natalie, unserer Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ein leichter Kalorienüberschuss reicht; wer im Aufbau wahllos isst, trainiert das Fett später mühsam wieder ab.",
      },
      {
        title: "Für wen das in Heimersdorf gedacht ist",
        body: "Die typische Anfrage aus dem Kölner Norden kommt nicht vom 20-jährigen Studiogänger, sondern von Berufstätigen und Eltern ab 35, die nach Jahren wieder Muskulatur aufbauen wollen, oft mit dem Hinweis vom Arzt, etwas für Kraft und Knochen zu tun. Dafür ist das Format gebaut: zwei feste Termine pro Woche, die auch neben Pendelzeiten und Familienkalender stehen bleiben, und als Ausgleich die Runde am Fühlinger See, der nur ein Veedel weiter liegt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Heimersdorf?",
        a: "Die 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Trainingsplan per App, Eiweiß-Zielwert und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Kann man zu Hause wirklich Muskeln aufbauen?",
        a: "Ja, wenn Widerstand und Steigerung stimmen. Mit Kurzhanteln, Bändern und dem eigenen Körpergewicht deckst du die ersten sechs bis zwölf Monate gut ab. Danach lohnt für manche Ziele die Kombination mit der Langhantel im Studio.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraftwerte steigen ab den ersten Wochen, sichtbare Veränderung braucht bei sauberem Training und passendem Essen meist drei bis vier Monate. Ich messe alle vier Wochen nach, damit du den Fortschritt an Zahlen siehst statt am Spiegelgefühl.",
      },
      {
        q: "Funktioniert Muskelaufbau auch ab 40 oder 50?",
        a: "Ja, gerade dann lohnt er sich: Muskulatur schützt Gelenke und Knochen. Der Aufbau läuft etwas langsamer, die Regeneration braucht mehr Platz im Plan, deshalb zählen Technik und Dosierung doppelt.",
      },
      {
        q: "Wo trainieren wir in Heimersdorf?",
        a: "Bei dir zu Hause mit mitgebrachtem Material, das ist hier der Normalfall. Alternativ im Studio, mit der Linie 15 oder dem Auto gut erreichbar. Viele kombinieren beides je nach Woche.",
      },
    ],
  },

  "suerth/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Sürth nutzt das flache Rheinufer als Messstrecke: Sprints und Intervalle auf dem Leinpfad Richtung Weiß, Technik und Rumpfarbeit auf den Wiesen am Wasser, Kraft und Sprungkraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Sürth: Sprints und Intervalle auf dem flachen Leinpfad am Rhein, Kraft und Sprungkraft im Studio, messbare Tests. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der Leinpfad am Rhein ist deine Laufbahn",
        body: "Sürth liegt direkt am Strom, und der Uferweg Richtung Weiß und Rodenkirchen ist flach, gerade und frei von Ampeln. Für Athletiktraining ist das entscheidend: Sprints über 30 bis 100 Meter und Tempointervalle lassen sich hier unter gleichbleibenden Bedingungen laufen, also kann ich deine Zeiten von Monat zu Monat ehrlich vergleichen. Der Wind vom Rhein kommt als Trainingsreiz dazu, Tempoarbeit gegen Gegenwind baut eine Basis auf, die auf dem Laufband nicht entsteht.",
      },
      {
        title: "Schnelligkeit draußen, Kraft im Studio",
        body: "Dein Plan hat zwei Bausteine. Draußen am Wasser arbeiten wir an Sprinttechnik, Tempo und Richtungswechseln auf den Wiesen am Ufer. Im Studio kommen Langhantel-Kraft und Sprungkraft dazu, denn wer schneller werden will, braucht Beine, die Kraft in den Boden bringen. Alle vier bis sechs Wochen stehen Tests an: Sprintzeit, Sprunghöhe, Rumpfstabilität. Trainiert wird nach diesen Zahlen, nicht nach Gefühl.",
      },
      {
        title: "Für Vereinssportler und ambitionierte Läufer im Kölner Süden",
        body: "Typische Anfragen aus Sürth und den Nachbarveedeln kommen von Fußballern und Tennisspielern aus den Vereinen des Südens, die in ihrem Sport explosiver werden wollen, und von Läufern, die seit Jahren dieselbe Runde in derselben Zeit laufen. Athletiktraining setzt genau da an: ein Technik-Check am Anfang zeigt, wo der Hebel liegt, oft bei Sprungkraft und Rumpf, nicht bei mehr Kilometern.",
      },
      {
        title: "Termine, die den Pendlertag überleben",
        body: "Sürth hat gut 11.000 Einwohner, und viele davon fahren morgens mit der Linie 16 oder über die Rheinuferstraße in die Stadt. Deshalb lege ich Einheiten an den Rand des Tages: früh am Wasser, bevor die Bahn fährt, oder abends als Feierabend-Einheit ab deiner Haustür. Das Aufwärmen beginnt auf dem Weg zum Ufer, nach 60 Minuten bist du zurück.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Sürth?",
        a: "Eine 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Plan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Wo genau trainieren wir in Sürth?",
        a: "Sprints und Intervalle auf dem flachen Leinpfad am Rhein Richtung Weiß, Technik und Rumpf auf den Uferwiesen, Kraft und Sprungkraft im Studio. Den Mix lege ich nach Ziel und Jahreszeit fest.",
      },
      {
        q: "Ich bin kein Wettkampfsportler. Passt Athletiktraining trotzdem?",
        a: "Ja. Athletiktraining heißt schneller, stabiler und belastbarer werden, das hilft im Verein, beim Laufen und im Alltag. Dein Einstiegsniveau bestimmt der Technik-Check am Anfang, nicht ein Wettkampfkalender.",
      },
      {
        q: "Wie oft pro Woche ist sinnvoll?",
        a: "Zwei geführte Einheiten pro Woche reichen, eine für Schnelligkeit draußen, eine für Kraft. Dazu bekommst du kurze Hausaufgaben von 15 bis 20 Minuten für die Tage dazwischen.",
      },
      {
        q: "Was passiert bei Regen?",
        a: "Techniktraining und Intervalle gehen bei fast jedem Wetter, der Leinpfad ist asphaltiert. Bei echtem Unwetter tauschen wir die Einheit gegen Kraft im Studio, der Plan läuft ohne Lücke weiter.",
      },
    ],
  },

  "deutz/personal-training": {
    answer:
      "Personal Training in Köln-Deutz heißt bei mir: 1-zu-1 mit Plan und dokumentierter Steigerung, die Einheit startet an deinem Büro oder deiner Wohnung, trainiert wird im Rheinpark, bei dir zu Hause oder im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Deutz: 1-zu-1 mit Plan und Progression, im Rheinpark, zu Hause oder im Studio, Termine früh, mittags und abends. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Training von Tür zu Tür, zwischen Bahnhof, Messe und Rhein",
        body: "Deutz ist ein Veedel der Wege: 15.644 Menschen wohnen hier, Zehntausende kommen täglich zu Messe, LANXESS Arena und in die Büros rund um den Bahnhof Deutz. Wer so einen Tag hat, scheitert selten am Willen, sondern am zweiten Weg nach Feierabend. Deshalb plane ich Einheiten von Tür zu Tür: Start an deinem Büro oder deiner Wohnung, das Warm-up passiert auf dem Weg in den Rheinpark, nach 60 Minuten bist du zurück. Auch eine lange Mittagspause reicht, wenn der Ablauf steht.",
      },
      {
        title: "Der Rheinpark ist das Freiluftstudio von Deutz",
        body: "Für die Einheiten draußen nutze ich den Rheinpark: weite Wiesen für Zirkel und Technik, flache Wege am Wasser für Intervalle, die Treppen am Rheinboulevard für Beine und Ausdauer. Die schwere Kraftarbeit an der Langhantel bleibt im Studio, ergänzende Einheiten mit Kurzhanteln und Bändern sind bei dir zu Hause möglich. Welcher Mix passt, hängt an deinem Ziel, nicht an einem festen Schema.",
      },
      {
        title: "Ein Plan, der sich an Zahlen messen lässt",
        body: "Am Anfang steht ein Check: Beweglichkeit, Kraft, Belastbarkeit, dazu dein Ziel in einem Satz. Daraus baue ich den Plan, meist zwei feste Einheiten pro Woche, und dokumentiere jede davon: Gewichte, Wiederholungen, Zeiten. Alle vier Wochen schauen wir gemeinsam auf die Entwicklung und stellen nach. Du weißt immer, ob sich etwas bewegt, statt es zu raten.",
      },
      {
        title: "Wer in Deutz bei mir trainiert",
        body: "Meist Berufstätige mit viel Sitzzeit und wenig Puffer im Kalender: das Ziel ist Kraft, ein gesunder Rücken oder einfach wieder Kondition für den Alltag. Dazu kommen Deutzer, die fürs Abnehmen eine Struktur suchen, und Wiedereinsteiger nach Jahren Pause. Das Erstgespräch ist kostenlos, dort legen wir Ziel, Trainingsort und Termine fest, und du entscheidest danach in Ruhe.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Deutz?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo trainieren wir in Deutz?",
        a: "Im Rheinpark und am Rheinboulevard, bei dir zu Hause mit mitgebrachtem Material oder im Studio. Viele kombinieren: Kraft im Studio, der Rest draußen am Wasser.",
      },
      {
        q: "Geht Training in der Mittagspause?",
        a: "Ja, wenn dein Büro in Deutz liegt. 60 Minuten von Tür zu Tür sind machbar, weil Rheinpark und Boulevard direkt vor der Haustür liegen. Duschen klären wir je nach Standort im Erstgespräch.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Wie starten wir?",
        a: "Mit dem Check am Anfang und zwei ruhigen Einheiten pro Woche. Gesteigert wird erst, wenn die Technik sitzt. Der Plan holt dich da ab, wo du stehst, nicht da, wo du vor zehn Jahren warst.",
      },
      {
        q: "Trainierst du auch früh morgens oder spät abends?",
        a: "Ja. Gerade in Deutz lege ich Termine an den Rand des Arbeitstags, früh vor dem ersten Termin oder nach Feierabend. Feste Slots halten den Plan auch in vollen Wochen am Leben.",
      },
    ],
  },

  "duennwald/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Dünnwald: zwei geführte Krafteinheiten pro Woche bei dir zu Hause oder im Studio, Grundübungen mit dokumentierter Steigerung, dazu ein Eiweiß-Zielwert fürs Essen und der Wald vor der Tür für die Erholung. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau mit Personal Trainer in Köln-Dünnwald: Grundübungen mit Protokoll zu Hause oder im Studio, Eiweiß-Zielwert, Regeneration im Wald. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der Wald baut keine Muskeln, die Hantel schon",
        body: "Dünnwald ist mit 10,84 km² eines der grünsten Veedel Kölns: Dünnwalder Wald, Wildpark, Höhenfelder See. Zum Spazieren und Laufen ist das ideal, aber Muskulatur entsteht nicht auf dem Waldweg, sondern unter Last. Deshalb drehe ich die Rollen klar: Der Aufbau passiert an Kurzhanteln, Bändern und Langhantel, mit Gewichten, die nach Protokoll steigen. Der Wald übernimmt den zweiten Job, der im Aufbau unterschätzt wird: lockere Bewegung an trainingsfreien Tagen, die die Regeneration beschleunigt.",
      },
      {
        title: "Hausbesuch statt Anfahrt quer durch den Kölner Osten",
        body: "Dünnwald liegt am Stadtrand Richtung Leverkusen, und wer hier wohnt, hat kein großes Studio um die Ecke. Also komme ich zu dir: Kurzhanteln, Bänder und Plan bringe ich mit, ein paar freie Quadratmeter im Wohnzimmer, Keller oder Garten reichen für eine vollständige Krafteinheit. Wer zusätzlich schwer an der Langhantel arbeiten will, kombiniert die Hausbesuche mit Studioterminen, viele Kunden wechseln je nach Woche.",
      },
      {
        title: "Sechs bis zwölf Monate, geplant wie eine Wettkampfvorbereitung",
        body: "Als Wettkampfathlet im WABBA-Verband plane ich deine Aufbauphase mit denselben Werkzeugen wie meine eigene: wenige Grundübungen, saubere Technik, jede Einheit dokumentiert. Alle vier Wochen werden Gewichte, Wiederholungen und Umfänge verglichen. Bleibt eine Zahl stehen, stelle ich den Plan um. Dazu gehört dein Eiweiß-Zielwert nach Körpergewicht und ein leichter Kalorienüberschuss; wer Struktur beim Essen will, arbeitet mit Natalie, unserer Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung.",
      },
      {
        title: "Für wen das in Dünnwald passt",
        body: "Hierher ziehen Familien und Menschen, die bewusst mehr Ruhe wollen als in Mülheim oder der Innenstadt. Entsprechend sehen die Anfragen aus: Berufstätige ab 35, die nach Jahren wieder Kraft aufbauen wollen, Eltern, die das Training in den Familienkalender schieben müssen, Männer und Frauen, denen der Arzt Krafttraining für Rücken und Knochen empfohlen hat. Zwei feste Termine pro Woche, die stehen bleiben, sind hier mehr wert als jeder Studiovertrag.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Dünnwald?",
        a: "Die 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Trainingsplan per App, Eiweiß-Zielwert und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Brauche ich eigene Geräte für das Training zu Hause?",
        a: "Nein. Kurzhanteln, Bänder und alles Weitere bringe ich mit. Erst wenn dein Fortschritt schwerere Lasten verlangt, sprechen wir über Studio-Einheiten oder eine kleine Grundausstattung.",
      },
      {
        q: "Wie lange dauert es, bis man etwas sieht?",
        a: "Kraftwerte steigen ab der ersten Woche, sichtbare Veränderung braucht meist drei bis vier Monate. Eine ehrliche Aufbauphase läuft über sechs bis zwölf Monate, das sage ich im Erstgespräch so deutlich, weil falsche Erwartungen der häufigste Abbruchgrund sind.",
      },
      {
        q: "Hilft Laufen im Dünnwalder Wald beim Muskelaufbau?",
        a: "Direkt nicht, aber indirekt: lockere Runden an trainingsfreien Tagen fördern die Durchblutung und die Erholung. Zu viel Ausdauer bremst den Aufbau allerdings, deshalb wird auch das im Plan dosiert.",
      },
      {
        q: "Funktioniert das auch ab 40 oder 50?",
        a: "Ja, gerade dann. Muskulatur schützt Gelenke und Knochen und hält den Stoffwechsel hoch. Der Aufbau läuft langsamer als mit 25, deshalb zählen saubere Technik und ein Plan, der die Regeneration ernst nimmt.",
      },
    ],
  },

  "ehrenfeld/abnehmen": {
    answer:
      "Abnehmen in Köln-Ehrenfeld plane ich über ein Wochenbudget statt Verbotslisten: zwei Krafteinheiten pro Woche, ein Kalorienziel, das Abende auf der Venloer Straße übersteht, und feste Geh-Kilometer im Inneren Grüngürtel. Realistisch ist ein halbes bis ein Kilo Fett pro Woche. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen mit Personal Trainer in Köln-Ehrenfeld: Kalorienbudget im Wochenschnitt, Krafttraining gegen Muskelverlust, Gehen im Grüngürtel. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ein Defizit, das dein Ehrenfelder Leben übersteht",
        body: "Ehrenfeld ist mit über 38.000 Einwohnern eines der dichtesten Veedel Kölns, und kaum irgendwo ist Essen so präsent: Cafés, Imbisse und Restaurants entlang der Venloer Straße, dazu Abende, die selten um 18 Uhr enden. Eine Diät, die das ignoriert, hält hier zwei Wochen. Deshalb rechne ich dein Kalorienziel im Wochenschnitt: Der Pizzaabend mit Freunden bleibt drin und wird von den anderen Tagen getragen. Entscheidend ist das Budget der Woche, nicht der perfekte Dienstag.",
      },
      {
        title: "Krafttraining zuerst, damit das Gewicht aus dem Fett kommt",
        body: "Wer nur weniger isst, verliert neben Fett auch Muskulatur, und mit ihr sinkt der Verbrauch, bis das Gewicht stagniert. Deshalb stehen bei mir zwei Krafteinheiten pro Woche im Zentrum: Grundübungen mit dokumentierter Steigerung, im Studio oder bei dir zu Hause mit mitgebrachtem Material. Die Muskulatur hält deinen Verbrauch hoch und sorgt dafür, dass am Ende ein strafferer Körper steht, nicht nur eine kleinere Zahl auf der Waage.",
      },
      {
        title: "Der Innere Grüngürtel ist dein Alltagswerkzeug",
        body: "Der dritte Baustein kostet nichts: Gehen. Direkt am Veedel liegt der Innere Grüngürtel, und feste Geh-Kilometer dort summieren sich über die Woche zu einem Verbrauch, den kein einzelnes Workout ersetzt. Viele meiner Kunden aus Ehrenfeld bauen das Gehen in den Arbeitsweg oder die Mittagspause ein, gerade wer im Homeoffice oder in den Büros und Ateliers rund um die Venloer Straße arbeitet, braucht diesen Gegenpol zum Sitzen.",
      },
      {
        title: "Gemessen wird am Trend, nicht an der Tagesform",
        body: "Die Waage schwankt mit Wasser, Salz und Schlaf, deshalb zählt bei mir der Wochentrend aus Gewicht, Umfängen und Fotos. Ein halbes bis ein Kilo Fett pro Woche ist das realistische Tempo; wer schneller verspricht, verkauft Wasserverlust. Alle vier Wochen schauen wir auf die Zahlen und stellen nach. Wer beim Essen mehr Struktur will, arbeitet zusätzlich mit Natalie, unserer Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Ehrenfeld?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan, Kalorienziel und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich auf Essengehen auf der Venloer Straße verzichten?",
        a: "Nein. Das Kalorienziel ist als Wochenbudget gerechnet, Restaurantabende sind eingeplant. Du bekommst einfache Regeln für die Auswahl vor Ort statt einer Verbotsliste.",
      },
      {
        q: "Wie schnell nehme ich realistisch ab?",
        a: "Ein halbes bis ein Kilo Fett pro Woche, bei konsequentem Defizit. Alles darüber ist meist Wasser und kommt zurück. Nach drei Monaten sprechen wir über fünf bis zehn Kilo, je nach Ausgangslage.",
      },
      {
        q: "Reicht Joggen im Grüngürtel nicht aus?",
        a: "Ausdauer verbrennt Kalorien, schützt aber die Muskulatur nicht. Die Kombination wirkt: Krafttraining hält den Verbrauch hoch, Gehen und lockere Läufe im Grüngürtel vergrößern das Defizit, das Essen entscheidet den Rest.",
      },
      {
        q: "Wo trainieren wir in Ehrenfeld?",
        a: "Kraft im Studio oder bei dir zu Hause mit mitgebrachtem Material, Geh- und Ausdauereinheiten im Inneren Grüngürtel direkt am Veedel. Termine lege ich auch früh morgens oder spät abends.",
      },
    ],
  },
  "fuehlingen/personal-training": {
    answer:
      "Personal Training in Köln-Fühlingen heißt: Ich komme zu dir ins Dorf, mit Material und Plan, oder wir trainieren draußen am Fühlinger See. Kein Studio nötig, keine Anfahrt für dich. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Fühlingen: 1-zu-1 bei dir zu Hause oder am Fühlinger See, Material bringe ich mit. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ein Dorf, dem das halbe Seeufer gehört",
        body: "Fühlingen ist mit 2.193 Einwohnern eines der kleinsten Veedel Kölns, ein echter Dorfkern mit Reitställen und Feldern, und direkt daneben liegt der Fühlinger See. Was anderswo eine Anfahrt wert wäre, ist hier der tägliche Blick aus dem Fenster: Uferwege für Ausdauer und Zirkel, Wiesen für Übungen mit dem eigenen Körpergewicht, und im Sommer trainieren wir früh, bevor die Badegäste aus der ganzen Stadt kommen. Wer in Fühlingen wohnt, hat das Gelände, das andere suchen.",
      },
      {
        title: "Das Training kommt zu dir, nicht umgekehrt",
        body: "Ein Fitnessstudio gibt es im Veedel nicht, und zur nächsten Stadtbahn muss man erst aus dem Dorf heraus. Deshalb drehe ich den Weg um: Kurzhanteln, Bänder und alles Weitere liegen in meinem Kofferraum, trainiert wird in deinem Wohnzimmer, in der Garage oder im Garten. Eine Stunde bleibt so wirklich eine Stunde, ohne Fahrtzeit davor und danach. Wer schwere Langhantelarbeit will, nimmt Termine im Studio dazu.",
      },
      {
        title: "Erst der Technik-Check, dann der Plan",
        body: "Am Anfang steht ein kostenloses Erstgespräch über Ziel, Alltag und Gesundheit, danach ein Technik-Check: Wie bewegst du dich, wo sind Schwachstellen, was ist realistisch. Daraus entsteht dein Plan, meist zwei Einheiten pro Woche. Gemessen wird regelmäßig an Kraftwerten, Umfängen und Gewicht, und was sich nach ein paar Wochen nicht bewegt, fliegt aus dem Plan. Du sollst sehen, wofür du bezahlst.",
      },
      {
        title: "Wer in Fühlingen bei mir trainiert",
        body: "Die Anfragen aus dem Kölner Norden kommen von Berufstätigen, die nach dem Pendeltag keine dritte Fahrt mehr antreten wollen, von Eltern, deren Zeitfenster zwischen Schule und Abendessen liegt, und auch von Reitern: Wer regelmäßig im Sattel sitzt, merkt schnell, was Rumpfkraft und stabile Beine ausmachen. Das Niveau spielt keine Rolle, der Plan startet dort, wo du stehst.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Fühlingen?",
        a: "50€ pro 1-zu-1 Stunde. Das Online Coaching mit Trainingsplan per App und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch kostet in beiden Fällen nichts.",
      },
      {
        q: "Wo trainieren wir genau?",
        a: "Bei dir zu Hause, im Garten oder draußen am Fühlinger See. Das Material bringe ich mit. Für schweres Langhanteltraining lassen sich Studio-Termine kombinieren.",
      },
      {
        q: "Können wir das ganze Jahr draußen trainieren?",
        a: "Ja, mit Anpassungen: Im Winter verlagern wir mehr in die Wohnung oder Garage, die Geh- und Laufanteile am See bleiben bei fast jedem Wetter machbar.",
      },
      {
        q: "Ich habe lange keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein. Der Technik-Check am Anfang legt den Startpunkt fest, und der Plan steigt von dort aus. Die meisten meiner Kunden starten nach Jahren Pause, nicht aus dem Verein.",
      },
    ],
  },

  "rath-heumar/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Rath/Heumar: zwei geführte Krafteinheiten pro Woche nach Protokoll, auf Wunsch an deiner eigenen kleinen Trainingsecke in Garage oder Keller, die ich mit dir plane, dazu ein Eiweiß-Zielwert fürs Essen. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau mit Personal Trainer in Köln-Rath/Heumar: Protokoll statt Gefühl, eigene Trainingsecke in Garage oder Keller, Eiweiß-Zielwert. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Platz ist hier der unterschätzte Vorteil",
        body: "Rath/Heumar gehört mit 12,91 km² zu den flächengrößten Veedeln Kölns: 11.833 Einwohner, viele Einfamilienhäuser mit Garage, Keller oder Garten. Für den Muskelaufbau ist das Gold wert, denn die beste Trainingslösung ist die, die dauerhaft dableibt. Statt jedes Mal Material zu schleppen, plane ich mit dir eine feste Ecke: zwei, drei Quadratmeter, eine durchdachte Grundausstattung, fertig. Bis sie steht, bringe ich alles mit, danach trainierst du an deinem eigenen Platz.",
      },
      {
        title: "Kaufen mit Plan statt Keller voller Fehlkäufe",
        body: "Die meisten Home-Gyms scheitern nicht am Willen, sondern am Einkauf: ein Heimtrainer hier, ein Bauchgerät da, nichts davon trägt eine echte Aufbauphase. Ich sage dir, was für dein Ziel wirklich nötig ist, in welcher Reihenfolge sich Anschaffungen lohnen und was du dir sparen kannst. Verstellbare Kurzhanteln und eine Bank decken die ersten Monate ab; ob sich später eine Langhantel lohnt, entscheiden deine Fortschritte, nicht der Katalog.",
      },
      {
        title: "Jede Einheit steht im Protokoll",
        body: "Muskeln wachsen über Steigerung, und Steigerung muss man nachweisen können. Deshalb wird bei mir jede Einheit notiert: Übung, Last, Wiederholungen. Alle vier Wochen vergleichen wir die Zahlen und messen Umfänge. Dazu kommt die Ernährungsseite: ein Eiweiß-Zielwert nach Körpergewicht und ein leichter Überschuss bei den Kalorien. Wer dort mehr Führung will, arbeitet mit Natalie, unserer Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung.",
      },
      {
        title: "Der Königsforst übernimmt die Pausentage",
        body: "Direkt am Veedel beginnt der Königsforst, und im Aufbau hat er eine klare Rolle: lockere Bewegung an den trainingsfreien Tagen, damit die Regeneration läuft, nicht mehr. Die schweren Reize passieren an der Hantel. Wer lieber auswärts trainiert, erreicht das Studio über die Linie 9, die in Rath/Heumar hält; viele kombinieren beides, Haustermine in vollen Wochen, Studio, wenn es der Kalender hergibt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Rath/Heumar?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan per App, Eiweiß-Zielwert und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Lohnt sich eine eigene Trainingsecke zu Hause?",
        a: "Wenn du länger als ein paar Monate aufbauen willst, ja. Sie kostet einmal überschaubar Geld und spart danach jede Anfahrt. Welche Ausstattung sinnvoll ist, hängt vom Ziel ab und gehört ins Erstgespräch, bevor du etwas kaufst.",
      },
      {
        q: "Wie lange dauert eine Aufbauphase?",
        a: "Rechne in Monaten, nicht in Wochen: Kraft steigt ab den ersten Einheiten, sichtbare Veränderung braucht meist ein Vierteljahr, eine volle Aufbauphase deutlich länger. Dafür bleibt das Ergebnis.",
      },
      {
        q: "Geht Muskelaufbau auch mit 45 oder 55 noch?",
        a: "Ja, und er wird mit jedem Jahr wichtiger: Muskulatur stützt Gelenke, Knochen und Stoffwechsel. Der Plan nimmt die Regeneration dann ernster und steigert vorsichtiger, das ist der ganze Unterschied.",
      },
      {
        q: "Zählt Joggen im Königsforst zum Aufbau?",
        a: "Es unterstützt die Erholung, baut aber keine Muskulatur auf. Zu viel Ausdauer bremst sogar; deshalb bekommt sie im Plan eine feste, begrenzte Rolle.",
      },
    ],
  },

  "bocklemuend-mengenich/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Bocklemünd/Mengenich mit Natalie: ein Plan, der mit dem ganz normalen Einkauf im Veedel funktioniert, denn gutes Eiweiß muss nicht teuer sein. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Bocklemünd/Mengenich mit Natalie: Eiweiß zum Discounterpreis, einfache Gerichte, keine Pulver. Online, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Gut essen ist keine Preisfrage",
        body: "Das hartnäckigste Gerücht über gesunde Ernährung ist, dass sie teuer sein muss. Stimmt nicht: Quark, Eier, Hülsenfrüchte, Haferflocken, Tiefkühlgemüse und Fisch aus der Dose gehören zu den günstigsten Lebensmitteln im Regal und tragen jeden Trainingsplan. Natalie rechnet in Eiweiß pro Euro statt in Superfoods, und genau so entsteht ein Plan, der am Monatsende nicht am Kontostand scheitert.",
      },
      {
        title: "Die Zutaten gibt es im Görlinger-Zentrum",
        body: "Ein Ernährungsplan taugt nur, wenn seine Zutaten dort liegen, wo du ohnehin einkaufst. Für Bocklemünd/Mengenich heißt das: Supermarkt und Discounter im und um das Görlinger-Zentrum, keine Spezialläden, keine Onlinebestellung mit Versandkosten. Natalie baut deine Woche aus einem überschaubaren Satz von Grundzutaten, die sich abwechselnd kombinieren lassen, damit aus derselben Einkaufsliste nicht jede Woche dasselbe Essen wird.",
      },
      {
        title: "Keine Pulver, keine Abos, keine Wundermittel",
        body: "Bevor Geld in Shakes oder Kapseln fließt, prüft Natalie, was dein Essen schon hergibt. In den meisten Fällen lässt sich der Eiweiß-Zielwert komplett über normale Lebensmittel erreichen, und das gesparte Geld wandert in besseres Essen statt in Dosen mit Etikett. Ergänzungen haben nur dann einen Platz, wenn eine echte Lücke bleibt, und auch dann die günstige Variante, nicht das Markenabo.",
      },
      {
        title: "So läuft die Beratung ab",
        body: "Alles passiert online: Erstgespräch per Video, dann bekommst du Kalorienziel, Eiweißwert und einen Wochenplan mit Einkaufsliste. In den Check-ins schaut Natalie auf den Gewichtstrend und deine Rückmeldungen und stellt nach. Wer Training dazunehmen will, bekommt es von mir, zu Hause im Veedel oder draußen am Ortsrand; nötig ist das nicht, die Beratung steht auch für sich.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Bocklemünd/Mengenich?",
        a: "Sie ist Teil des Online Coachings ab 150€ im Monat, mit Plan, Einkaufsliste und wöchentlichen Check-ins. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Funktioniert der Plan mit kleinem Budget?",
        a: "Ja, er ist dafür gebaut. Die Eiweißquellen kommen aus dem Discounter-Sortiment, und die Einkaufsliste bleibt bewusst kurz. Teurer wird es nur, wenn du es willst, nicht weil der Plan es verlangt.",
      },
      {
        q: "Brauche ich Proteinpulver?",
        a: "Meist nein. Erst wird geprüft, was über normales Essen geht; ein Shake ist höchstens eine bequeme Ergänzung für volle Tage, nie die Grundlage.",
      },
      {
        q: "Koche ich dann für die Familie extra?",
        a: "Nein. Die Gerichte sind so geplant, dass alle mitessen können und nur deine Portion und deine Eiweißquelle angepasst werden.",
      },
      {
        q: "Behandelt Natalie auch Unverträglichkeiten oder Erkrankungen?",
        a: "Nein, ihr Bereich ist Sport- und Fitnessernährung für gesunde Erwachsene. Medizinische Themen gehören zum Arzt, und genau das sagen wir dir im Erstgespräch auch.",
      },
    ],
  },

  "elsdorf/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Elsdorf läuft per Video mit Natalie, unserer Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung: Deine Gerichte bleiben auf dem Tisch, angepasst werden Mengen, Eiweiß und Timing. Teil des Online Coachings ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung für Köln-Elsdorf mit Natalie: deine Rezepte bleiben, Mengen und Eiweiß werden angepasst. Per Video, ohne Anfahrt. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Im kleinsten Veedel von Porz wird zu Hause gekocht",
        body: "Elsdorf hat 1.726 Einwohner auf 1,77 km² und ist damit das kleinste Veedel des Bezirks Porz: keine Restaurantmeile, kein Imbiss an jeder Ecke. Gegessen wird, was zu Hause auf den Herd kommt, und genau da setzt Natalie an. Nicht die Verlockung unterwegs ist hier das Problem, sondern Portionen, Beilagen und das, was zwischen den Mahlzeiten nebenbei läuft. Das ist eine gute Ausgangslage, denn die eigene Küche lässt sich steuern.",
      },
      {
        title: "Deine Rezepte bleiben, die Zahlen ändern sich",
        body: "Natalie fängt nicht mit einem fremden Plan an, sondern mit deinen Gerichten: was du ohnehin kochst, was die Woche hergibt, was allen schmeckt. Daran werden Stellschrauben gedreht: mehr Eiweiß auf dem Teller, Beilagen in Mengen, die zum Ziel passen, eine Reihenfolge beim Essen, die satt macht. So entsteht kein zweites Leben in der Küche, sondern dein normales Essen in einer Version, die abnimmt oder aufbaut, je nachdem, was du erreichen willst.",
      },
      {
        title: "Eine Liste pro Woche, eingekauft wird wie immer",
        body: "Eingekauft wird von Elsdorf aus meist in Urbach, Zündorf oder Porz-Mitte, und dabei bleibt es. Aus den angepassten Gerichten entsteht eine Wochenliste, die zu deinem normalen Einkaufsweg passt; Sonderzutaten, die man nur einmal braucht und dann vergisst, haben darin keinen Platz. Gemessen wird am Gewichtstrend über die Woche, nicht an einzelnen Tagen, und nachgestellt wird in den Video-Check-ins.",
      },
      {
        title: "Beratung ohne einen Kilometer Anfahrt",
        body: "Von Elsdorf aus ist fast alles eine Fahrt, die Beratung nicht: Erstgespräch, Plan und Check-ins laufen per Video, du brauchst nur ein Handy. Wer zusätzlich trainieren will, kombiniert die Beratung mit 1-zu-1 Stunden bei dir zu Hause für 50€, viele machen erst die Ernährung zur Gewohnheit und nehmen das Training später dazu. Beides zusammen ist kein Muss, sondern eine Option.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Elsdorf?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, inklusive Wochenplan, Einkaufsliste und Check-ins. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Muss ich meine Küche komplett umstellen?",
        a: "Nein, das ist der Kern des Ansatzes: Deine Gerichte bleiben, verändert werden Mengen, Eiweißanteil und Timing. Umstellen musst du Gewohnheiten, nicht den Speiseplan.",
      },
      {
        q: "Geht das auch, wenn ich für Kinder mitkoche?",
        a: "Ja. Es wird ein Essen für alle gekocht, nur deine Portion folgt den Zahlen. Kinderteller bleiben Kinderteller, da redet niemand rein.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Der Gewichtstrend zeigt nach zwei bis drei Wochen die Richtung. Haltbare Veränderung rechnet sich in Monaten, dafür bleibt sie, weil sich dein Alltag kaum verbiegen muss.",
      },
      {
        q: "Hilft Natalie auch bei Krankheiten oder Allergien?",
        a: "Nein. Ihr Schwerpunkt ist Sport- und Fitnessernährung für gesunde Erwachsene; medizinische Ernährungsfragen gehören in ärztliche Betreuung, das klären wir im Erstgespräch offen.",
      },
    ],
  },

  "longerich/abnehmen": {
    answer:
      "Abnehmen in Köln-Longerich entscheidet sich meistens am Abend: Der Tag läuft diszipliniert, nach Pendelstrecke und Abendessen kippt der Plan auf dem Sofa. Deshalb baue ich dein Defizit um feste Abendroutinen, zwei Krafteinheiten pro Woche und ein Kalorienziel von Natalie. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen mit Personal Trainer in Köln-Longerich: feste Abendroutine statt Sofa-Falle, Krafttraining zu Hause, Kalorienziel von Natalie. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Die Abendfalle, nicht das Mittagessen",
        body: "Longerich ist ein ruhiges Wohnveedel im Bezirk Nippes, 13.971 Einwohner, viele davon pendeln morgens mit der S11 oder der Linie 15 in die Stadt. In den Ernährungsprotokollen meiner Kunden aus solchen Veedeln steht das Problem fast nie beim Frühstück oder in der Kantine, sondern zwischen 20 und 23 Uhr: Chips, Süßes, das zweite Glas. Ein Plan, der das ignoriert und nur das Mittagessen optimiert, verliert jeden Abend wieder, was er tagsüber gewonnen hat.",
      },
      {
        title: "Der Abend bekommt eine Struktur",
        body: "Gegen die Abendfalle helfen keine Verbote, sondern Abläufe: ein Abendessen mit genug Eiweiß und Volumen, das wirklich satt macht, ein festes Budget für den Snack danach, eingeplant statt verheimlicht, und eine Runde zu Fuß nach dem Essen als stehender Termin. Zwanzig bis dreißig Minuten durchs Veedel reichen; entscheidend ist, dass die Runde zur Gewohnheit wird wie das Zähneputzen, nicht dass sie sportlich aussieht.",
      },
      {
        title: "Zwei Krafteinheiten sichern die Muskulatur",
        body: "Im Kaloriendefizit entscheidet das Krafttraining, woher das verlorene Gewicht kommt: Ohne Widerstand baut der Körper neben Fett auch Muskeln ab, und der Verbrauch sinkt mit. Zwei Einheiten pro Woche, bei dir zu Hause mit mitgebrachtem Material oder im Studio, halten die Muskulatur im Spiel. Für das Kalorienziel und die Eiweißmenge ist Natalie zuständig, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung.",
      },
      {
        title: "Ohne dritte Fahrt am Tag",
        body: "Wer nach Feierabend schon zweimal gesessen hat, Bahn und Schreibtisch, fährt ungern noch zu einem Studio. Deshalb findet das Training in Longerich bei dir statt, vor der Arbeit, am frühen Abend oder am Wochenende. Gemessen wird am Wochentrend von Gewicht und Umfängen, und alle paar Wochen stellen wir nach. Ein halbes bis ein Kilo pro Woche ist das Tempo, das bleibt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Longerich?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan, Kalorienziel von Natalie und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich abends ganz auf Snacks verzichten?",
        a: "Nein. Ein Verbot hält zwei Wochen, ein Budget hält Monate: Der Abendsnack wird eingeplant und ins Kalorienziel eingerechnet, damit er den Tag nicht mehr kippen kann.",
      },
      {
        q: "Wie viel kann ich realistisch abnehmen?",
        a: "Ein halbes bis ein Kilo pro Woche im Trend. Schnellere Versprechen bedeuten fast immer Wasser- und Muskelverlust, und beides kommt zurück.",
      },
      {
        q: "Brauche ich dafür ein Fitnessstudio?",
        a: "Nein. Kurzhanteln und Bänder bringe ich zu dir mit, und die Abendrunde durchs Veedel kostet nichts. Studio-Termine lassen sich dazunehmen, wenn du gern an Geräten arbeitest.",
      },
      {
        q: "Wann finden die Einheiten statt?",
        a: "Passend zu deinen Pendelzeiten: früh vor der Arbeit, am frühen Abend oder am Wochenende. Der Termin richtet sich nach deiner Woche, nicht umgekehrt.",
      },
    ],
  },

  "marienburg/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Marienburg mit Natalie heißt: Regeln für Geschäftsessen, Einladungen und Reisetage statt Verbotslisten, damit dein Ziel auch eine volle Kalenderwoche übersteht. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung für Köln-Marienburg mit Natalie: klare Regeln für Geschäftsessen, Einladungen und Reisetage. Online, diskret, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Wenn die Hälfte der Mahlzeiten nicht aus deiner Küche kommt",
        body: "Marienburg ist ein Veedel der Selbstständigen und Führungskräfte, und deren Ernährungsproblem sieht anders aus als im Lehrbuch: Geschäftsessen, Einladungen, Konferenztage, dazwischen Wochen, in denen kaum eine Mahlzeit zu Hause entsteht. Ein Plan, der auf selbst gekochten Gerichten beruht, scheitert an diesem Kalender. Natalie arbeitet deshalb mit Entscheidungsregeln für die Karte: Eiweiß als Anker des Tellers, Beilagen nach Ziel, eine klare Linie bei Brotkorb und Dessert, ohne dass es am Tisch jemand merkt.",
      },
      {
        title: "Auch der Wein bekommt eine Zahl",
        body: "Alkohol ist bei Geschäftsessen selten verhandelbar, aber er ist planbar. Statt eines Verbots, das beim ersten Kundentermin fällt, bekommt er ein Wochenbudget, das ins Kalorienziel eingerechnet ist. Dasselbe gilt für Reisetage: Hotelfrühstück, Bahnhof, Flughafen folgen immer denselben Mustern, und für jedes gibt es eine einfache Standardwahl, die du nicht jedes Mal neu überlegen musst. Je voller der Kalender, desto wertvoller werden solche Automatismen.",
      },
      {
        title: "Diskret, per Video, am Trend gemessen",
        body: "Die Beratung läuft komplett online: Erstgespräch per Video, dann Kalorienziel, Eiweißwert und Leitplanken für deine typischen Situationen. In den Check-ins schaut Natalie auf den Gewichtstrend über Wochen, nicht auf einzelne Tage, denn nach einem Abendessen mit Kunden lügt die Waage ohnehin. Nachgesteuert wird an den Regeln, nicht an deinem Terminkalender, der ist die feste Größe.",
      },
      {
        title: "Südpark, Rheinufer und Training vor der Haustür",
        body: "Bewegung hat in Marienburg kurze Wege: der Südpark mitten im Veedel, das Rheinufer am Rand, beides gut für feste Geh-Termine, die auch zwischen zwei Videocalls passen. Wer mehr will, kombiniert die Beratung mit 1-zu-1 Training für 50€ pro Stunde, bei dir zu Hause oder im Garten, viele Häuser hier haben den Platz dafür. Der Einstieg ist in jedem Fall ein kostenloses Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Marienburg?",
        a: "Sie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Funktioniert das mit drei, vier Restaurantterminen pro Woche?",
        a: "Ja, genau dafür ist der Ansatz gebaut. Du bekommst Entscheidungsregeln für die Karte statt eines starren Plans, und das Wochenziel verrechnet die Abende, statt an ihnen zu zerbrechen.",
      },
      {
        q: "Muss ich auf Wein verzichten?",
        a: "Nein. Alkohol bekommt ein festes Wochenbudget im Kalorienziel. Das ist ehrlicher als ein Verbot und hält auch einem Kundenessen stand.",
      },
      {
        q: "Wie viel Zeit kostet mich die Beratung?",
        a: "Wenig: ein Videotermin zum Start, danach kurze Check-ins und ein Protokoll, das in zwei, drei Minuten am Tag gepflegt ist. Der Plan arbeitet mit deinem Kalender, nicht dagegen.",
      },
      {
        q: "Kann ich Beratung und Personal Training kombinieren?",
        a: "Ja. Viele nehmen zur Online-Beratung 1-zu-1 Stunden zu Hause dazu, in Marienburg oft im eigenen Garten. Was sinnvoll ist, klären wir im kostenlosen Erstgespräch.",
      },
    ],
  },

  "widdersdorf/personal-training": {
    answer:
      "Personal Training in Köln-Widdersdorf heißt bei mir: 1-zu-1 Krafttraining mit Plan und Progression, auf Wunsch direkt bei dir zu Hause im Veedel. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Widdersdorf: 1-zu-1 Training mit Plan, zu Hause im Neubaugebiet oder im Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Training kommt dorthin, wo dein Tag endet",
        body: "Widdersdorf hängt ohne Stadtbahn am Bus und am Auto. Wer hier wohnt und in der Stadt arbeitet, hat abends schon zwei Fahrten hinter sich, und genau an der dritten scheitern die meisten Trainingsvorsätze. Deshalb drehe ich es um: ich komme nach Widdersdorf. Ein Wohnzimmer, eine Garage oder ein Stück Garten im Neubaugebiet reicht als Trainingsfläche völlig aus. Was an Ausrüstung fehlt, bringe ich mit.",
      },
      {
        title: "Was eine Stunde bei dir zu Hause leistet",
        body: "Der Ablauf ist derselbe wie im Studio: gezieltes Aufwärmen, dann Grundübungen mit Korrektur in jeder Wiederholung, zum Schluss der Teil, der zu deinem Ziel gehört, Rumpf, Ausdauer oder Beweglichkeit. Jede Einheit wird dokumentiert, Gewichte und Wiederholungen steigen nach Plan. Nach acht bis zwölf Wochen vergleichen wir die Zahlen vom Start. Wer lieber an Geräten trainiert, kombiniert Termine zu Hause mit Einheiten im Studio.",
      },
      {
        title: "Zwischen Ortskern und Feldern ist Platz für den Rest",
        body: "Für die Ausdauer-Bausteine müssen wir das Veedel nicht verlassen: hinter der letzten Häuserreihe beginnen flache, feste Wege durch die Felder, gut für zügige Geh- und Laufrunden als Ergänzung zum Krafttraining. Wer gezielt an Schnelligkeit und Sprungkraft arbeiten will, findet das im Athletiktraining, das ich in Widdersdorf separat anbiete. Im 1-zu-1 bleibt der Schwerpunkt auf Kraft, Haltung und einem Körper, der den Alltag leichter trägt.",
      },
      {
        title: "Wer in Widdersdorf bei mir anfragt",
        body: "Das Veedel ist durch Widdersdorf-Süd jung geworden: 12.398 Menschen, viele Familien, viele volle Kalender. Typische Anfragen kommen von Eltern, die nach Jahren wieder anfangen wollen, und von Pendlern, deren Feierabend zu spät für jedes Studio liegt. Ein fester Termin an der eigenen Haustür löst beides: keine Anfahrt, keine Ausrede, und wenn eine Woche kippt, verschieben wir statt zu streichen.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Widdersdorf?",
        a: "Die 1-zu-1 Stunde kostet 50€, auch bei dir zu Hause. Online Coaching mit Plan per App gibt es ab 150€ im Monat. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Brauche ich eigene Geräte für das Training zu Hause?",
        a: "Nein. Kurzhanteln, Bänder und alles Weitere für den Anfang bringe ich mit. Erst wenn du langfristig schwerer trainieren willst, lohnt sich eigenes Equipment oder der Wechsel in den Studio-Rhythmus.",
      },
      {
        q: "Wo findet das Training statt?",
        a: "Bei dir zu Hause in Widdersdorf, auf den Wegen rund ums Veedel oder im Studio. Die Mischung legen wir im kostenlosen Erstgespräch fest, sie darf sich mit den Jahreszeiten ändern.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraftwerte bewegen sich bei zwei Einheiten pro Woche nach vier bis sechs Wochen messbar. Sichtbare Veränderung braucht acht bis zwölf Wochen, je nach Ausgangspunkt und Ziel. Ich verspreche keine Abkürzungen, nur einen Plan, der eingehalten werden kann.",
      },
      {
        q: "Hilft mir jemand bei der Ernährung?",
        a: "Ja. Wenn Abnehmen oder Muskelaufbau das Ziel ist, steigt Natalie als Ernährungsberaterin für Sport- und Fitnessernährung mit ein: Wochenplan, Einkaufsliste, kurze Check-ins.",
      },
    ],
  },

  "neuehrenfeld/personal-training": {
    answer:
      "Personal Training in Köln-Neuehrenfeld: 1-zu-1 Krafttraining mit Plan und Progression, Outdoor-Einheiten im Blücherpark, Krafttraining im Studio. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Neuehrenfeld: 1-zu-1 mit Plan, Outdoor im Blücherpark, Kraft im Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Altbau-Wohnung statt Heimstudio? Kein Problem",
        body: "Neuehrenfeld ist dicht bebaut: 23.626 Menschen auf 2,54 km², die meisten in Gründerzeit-Wohnungen rund um Lenauplatz und Nußbaumerstraße. Für Hanteltraining mit Nachbarn unter dir ist das nichts, und genau deshalb arbeite ich hier mit zwei Orten: dem Blücherpark für alles, was draußen besser geht, und dem Studio für das schwere Krafttraining mit der Langhantel.",
      },
      {
        title: "Der Blücherpark ist deine Trainingsfläche",
        body: "Am Nordrand des Veedels liegt der Blücherpark mit seinen langen, geraden Alleen und offenen Wiesen. Die Alleen nutze ich für Intervalle und Lauftechnik, die Wiesen für Zirkel mit dem eigenen Körpergewicht. Die Runde um den Kahnweiher ist immer gleich lang, dadurch taugt sie als feste Messstrecke: gleiche Runde, bessere Zeit, sichtbarer Fortschritt ohne Laborgefühl.",
      },
      {
        title: "So baue ich dein 1-zu-1 auf",
        body: "Am Anfang steht das kostenlose Erstgespräch: Ziel, Wochenstruktur, Verletzungshistorie. Danach ein Technik-Check und zwei feste Einheiten pro Woche. Gewichte und Umfänge steigen nach Plan, alle vier Wochen schauen wir gemeinsam auf die Zahlen. Wenn dein Ziel Abnehmen ist, kommt Natalie dazu, Ernährungsberaterin für Sport- und Fitnessernährung, mit Wochenplan und Einkaufsliste statt Verbotsliste.",
      },
      {
        title: "Ruhiger als Ehrenfeld, kürzer zu Fuß",
        body: "Neuehrenfeld ist die wohnlichere Schwester von Ehrenfeld: weniger Ausgehviertel, mehr Alltag, die Linie 5 quer durchs Veedel. Viele meiner Anfragen von hier kommen von Berufstätigen, die morgens vor der Arbeit trainieren wollen, bevor der Tag sie frisst. Dafür halte ich frühe Slots frei. Treffpunkt ist dann der Parkeingang oder deine Haustür, das Aufwärmen beginnt auf dem Weg.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Neuehrenfeld?",
        a: "Die 1-zu-1 Stunde kostet 50€. Online Coaching mit Trainingsplan per App startet bei 150€ im Monat. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Wo trainieren wir in Neuehrenfeld?",
        a: "Draußen im Blücherpark, bei dir zu Hause, wenn der Platz reicht, und für das schwere Krafttraining im Studio. Die Aufteilung richtet sich nach deinem Ziel und der Jahreszeit.",
      },
      {
        q: "Gibt es Termine vor der Arbeit?",
        a: "Ja, frühe Termine gehören in Neuehrenfeld fest dazu. Eine Einheit im Blücherpark um sieben Uhr morgens ersetzt den Wecker besser als jeder Kaffee.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein, das ist der Normalfall. Der Technik-Check am Anfang legt dein Startniveau fest, und die ersten Wochen bauen Grundlagen auf, bevor die Gewichte steigen. Niemand muss fit sein, um anzufangen.",
      },
      {
        q: "Krafttraining oder Laufen, was bringt mehr?",
        a: "Beides zusammen. Kraft schützt Gelenke und Muskulatur, Ausdauer trägt den Alltag. In Neuehrenfeld lässt sich das gut verbinden: Kraft im Studio, Läufe und Intervalle im Blücherpark, beides in einem Plan.",
      },
    ],
  },

  "neustadt-nord/online-coaching": {
    answer:
      "Online Coaching für Köln-Neustadt-Nord: Trainingsplan per App, wöchentliche Video-Check-ins und Ernährungssteuerung, ab 150€ im Monat. Du trainierst, wo es in deine Woche passt, im eigenen Studio, im Stadtgarten oder unterwegs. Das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Neustadt-Nord: Plan per App, wöchentliche Video-Check-ins, Ernährungssteuerung. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Warum Online Coaching, mitten in Köln?",
        body: "Neustadt-Nord ist das Veedel zwischen Mediapark, Belgischem Viertel und Ebertplatz: 28.604 Menschen auf 3,49 km², dazu Agenturen, Kanzleien und Medienhäuser. Wer hier arbeitet, hat selten das Problem, kein Fitnessstudio zu finden. Das Problem sind Wochen, die sich ständig ändern: Projektphasen, Dienstreisen, Abendtermine. Online Coaching löst genau das. Der Plan passt sich deiner Woche an, nicht umgekehrt, und die Kontrolle bleibt trotzdem da.",
      },
      {
        title: "So funktioniert es konkret",
        body: "Du bekommst deinen Trainingsplan in der App, mit Video zu jeder Übung und klaren Vorgaben für Gewichte und Wiederholungen. Einmal pro Woche sprechen wir im Video-Check-in: was lief, was nicht, was sich ändert. Zwischen den Terminen schickst du Fragen oder Technik-Videos, ich antworte kurzfristig. Angepasst wird nach Zahlen, nicht nach Gefühl: Trainingslog, Körpergewicht im Wochenschnitt, auf Wunsch Fotos.",
      },
      {
        title: "Dein Veedel liefert die Ausdauer gratis",
        body: "Für die Cardio-Bausteine brauchst du kein Laufband: der Innere Grüngürtel beginnt direkt am Veedel-Rand, der Stadtgarten liegt mittendrin. Beides baue ich als feste Blöcke in den Plan ein, mit Strecke und Tempo statt vagem Vorsatz. Das Krafttraining machst du in deinem Studio oder zu Hause, der Plan wird auf die Geräte geschrieben, die du wirklich zur Verfügung hast.",
      },
      {
        title: "Online, 1-zu-1 oder beides",
        body: "Online Coaching trägt, wenn die Technik-Grundlagen sitzen. Wenn Kniebeuge und Kreuzheben noch wackeln, ist es ehrlicher, mit ein paar 1-zu-1 Stunden im Studio zu starten und dann online weiterzumachen. Auch die Mischung funktioniert: Plan und Check-ins online, einmal im Monat eine Technik-Stunde vor Ort. Was für dich passt, klären wir im kostenlosen Erstgespräch, ohne Verkaufsdruck.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching?",
        a: "Ab 150€ im Monat. Darin stecken der Trainingsplan per App, die wöchentlichen Video-Check-ins, die Ernährungssteuerung und die Betreuung zwischen den Terminen. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Brauche ich ein Fitnessstudio?",
        a: "Nein. Der Plan wird auf deine Möglichkeiten geschrieben: Studio, Homegym oder Körpergewicht plus Bänder. In Neustadt-Nord kommen Grüngürtel und Stadtgarten für die Ausdauer dazu.",
      },
      {
        q: "Wie läuft der wöchentliche Check-in ab?",
        a: "15 bis 20 Minuten per Video, zu einem festen Termin, der auch in eine Mittagspause passt. Wir gehen Trainingslog und Wochendaten durch und legen die nächste Woche fest. Fällt der Termin aus, wird er verschoben, nicht gestrichen.",
      },
      {
        q: "Ich bin kompletter Anfänger. Ist Online Coaching das Richtige?",
        a: "Ehrliche Antwort: meistens nicht sofort. Die Grundübungen sollten einmal unter Aufsicht sauber gelernt werden. Dafür reichen oft wenige 1-zu-1 Stunden, danach funktioniert online sehr gut.",
      },
      {
        q: "Was passiert, wenn ich eine Woche gar keine Zeit habe?",
        a: "Dann wird der Plan angepasst statt ignoriert: eine Minimalwoche mit zwei kurzen Einheiten hält den Stand, und der Check-in klärt, wie es weitergeht. Ein Plan, der nur in perfekten Wochen funktioniert, ist keiner.",
      },
    ],
  },

  "humboldt-gremberg/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Humboldt/Gremberg: Tempoarbeit im Gremberger Wäldchen, lange Intervalle auf den Poller Wiesen gleich nebenan, Kraft und Sprungkraft im Studio. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Humboldt/Gremberg: Tempoläufe im Gremberger Wäldchen, Intervalle auf den Poller Wiesen, Kraft im Studio. 50€/Std.",
    sections: [
      {
        title: "Ein dichtes Veedel, zwei Trainingsflächen am Rand",
        body: "Humboldt/Gremberg ist eng bebaut: 15.111 Menschen auf 2,82 km², dazwischen Gleise, Hauptstraßen und kaum Grün. Einen eigenen Park hat das Veedel nicht, aber zwei Flächen liegen direkt an der Grenze: südöstlich das Gremberger Wäldchen mit festen, schattigen Wegen, Richtung Rhein die Poller Wiesen. Beide erreichst du in wenigen Minuten, und beide decken zusammen alles ab, was Athletiktraining draußen braucht.",
      },
      {
        title: "Tempo im Wäldchen, lange Intervalle am Rhein",
        body: "Im Gremberger Wäldchen arbeiten wir an Tempoläufen und Lauftechnik: die Wege sind fest, eben und im Sommer angenehm schattig. Auf den Poller Wiesen ist Platz für das Großformat, fliegende Läufe, lange Intervalle und die regelmäßigen Testläufe auf immer derselben Strecke. So entsteht ein Außen-Programm mit zwei klaren Rollen, und keine Einheit hängt davon ab, dass irgendwo zufällig Platz frei ist.",
      },
      {
        title: "Stark wirst du drinnen",
        body: "Antritt und Sprunghöhe entscheiden sich an der Kraft, und die baue ich im Studio auf: Langhantel-Grundübungen, Sprungprogression, saubere Steigerung von Woche zu Woche. Gemessen wird in festen Abständen, Sprintzeit, Sprunghöhe, Kraftwerte, damit du siehst, was sich bewegt. Zwei Einheiten pro Woche, eine draußen und eine drinnen, sind der Rhythmus, der sich über Monate durchhalten lässt.",
      },
      {
        title: "Für wen das hier passt",
        body: "Das Veedel trägt den Namen der alten Humboldt-Maschinenbauwerke, und es ist bis heute eines, in dem gearbeitet wird: Schicht, Handwerk, Logistik. Viele Anfragen kommen von Hobbysportlern aus den rechtsrheinischen Vereinen, Fußball voran, die neben dem Mannschaftstraining an Schnelligkeit und Stabilität arbeiten wollen. Termine lege ich auch früh am Morgen oder am Nachmittag, nicht nur in die klassische Feierabendspitze.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Humboldt/Gremberg?",
        a: "Die 1-zu-1 Stunde kostet 50€, Online-Begleitung mit Plan per App ab 150€ im Monat. Das Erstgespräch ist kostenlos und klärt Ziel und Startniveau.",
      },
      {
        q: "Wo genau trainieren wir?",
        a: "Tempo und Technik im Gremberger Wäldchen, lange Intervalle und Tests auf den Poller Wiesen, Kraft und Sprungkraft im Studio. Den Treffpunkt legen wir nach deinem Wohnort fest.",
      },
      {
        q: "Ich spiele Fußball im Verein. Passt das zusammen?",
        a: "Ja, genau dafür ist es gedacht: Antritt, Sprungkraft und Stabilität ergänzen das Mannschaftstraining, ersetzen es aber nicht. Die Einheiten plane ich um Spiel- und Trainingstage herum.",
      },
      {
        q: "Wie schnell werde ich schneller?",
        a: "Erste messbare Veränderungen bei Sprintzeit und Sprunghöhe zeigen sich nach sechs bis acht Wochen, wenn zwei Einheiten pro Woche stehen. Versprochen wird nichts, gemessen wird alles.",
      },
      {
        q: "Was ist bei Regen oder im Winter?",
        a: "Die Wege im Gremberger Wäldchen sind fest und auch bei Nässe gut nutzbar. Wenn es draußen gar nicht geht, verschiebt sich der Schwerpunkt in die Kraft- und Sprungarbeit im Studio. Der Plan rechnet die Jahreszeit ein.",
      },
    ],
  },

  "worringen/personal-training": {
    answer:
      "Personal Training in Köln-Worringen: 1-zu-1 Krafttraining mit Plan und Progression, bei dir zu Hause oder draußen am Rheinufer, im nördlichsten Veedel der Stadt. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Worringen: 1-zu-1 zu Hause oder am Rheinufer, im nördlichsten Veedel Kölns. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das nördlichste Veedel Kölns trainiert zu Hause",
        body: "Worringen ist weiter vom Kölner Zentrum entfernt als jeder andere Stadtteil, und es funktioniert wie ein eigenes Dorf: 10.365 Menschen auf 11,73 km², eigene Geschäfte, eigene Vereine, eigener Ortskern. Der Weg in ein Studio in der Stadt kostet schnell eine Stunde zusätzlich pro Einheit. Deshalb kommt bei mir das Training nach Worringen: zu dir nach Hause, in den Garten oder vor die Tür, mit allem Material, das für den Anfang nötig ist.",
      },
      {
        title: "Rheinufer und Worringer Bruch liegen vor der Tür",
        body: "Für die Einheiten draußen hat Worringen mehr zu bieten als die meisten Innenstadt-Veedel: die flachen Dammwege am Rheinufer sind gerade und frei, gut für Intervalle und zügige Läufe mit messbarer Strecke. Im Worringer Bruch, dem alten Rheinarm am Westrand, laufen ruhige Runden durchs Naturschutzgebiet, die ich gern für Grundlagenausdauer und aktive Erholung nutze. Beides erreichst du zu Fuß, ohne Auto und ohne Fahrplan.",
      },
      {
        title: "So läuft das 1-zu-1 bei dir",
        body: "Nach dem kostenlosen Erstgespräch starten wir mit einem Technik-Check, dann stehen feste Termine, meist zwei pro Woche. Kraftarbeit mit Korrektur in jeder Wiederholung, dokumentierte Progression, alle vier bis sechs Wochen der Blick auf die Zahlen. Wer zusätzlich an Geräten trainieren will, kombiniert die Haus-Termine mit Studio-Einheiten, die S-Bahn hält mit der S6 direkt im Veedel.",
      },
      {
        title: "Termine, die mit Schichtplänen funktionieren",
        body: "Direkt hinter der Stadtgrenze beginnt der Chempark Dormagen, und viele in Worringen arbeiten dort oder in den anderen Industriebetrieben entlang des Rheins, oft in Wechselschicht. Ein Trainingsplan, der nur den klassischen Feierabend kennt, scheitert an solchen Wochen. Meiner nicht: die Termine wandern mit dem Schichtplan, früh, vormittags oder am Wochenende, und der Plan rechnet die Nachtschichtwochen von Anfang an ein.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Worringen?",
        a: "Die 1-zu-1 Stunde kostet 50€, auch bei dir zu Hause in Worringen. Online Coaching mit Plan per App gibt es ab 150€ im Monat. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Wo findet das Training statt?",
        a: "Bei dir zu Hause, am Rheinufer, im Worringer Bruch oder im Studio in der Stadt. Die Mischung legen wir gemeinsam fest, je nach Ziel, Jahreszeit und deinem Wochenplan.",
      },
      {
        q: "Ich arbeite in Wechselschicht. Geht das trotzdem?",
        a: "Ja. Die Termine folgen deinem Schichtplan und werden Woche für Woche gelegt, nicht starr am selben Tag. Gerade dafür lohnt sich das 1-zu-1: der Plan passt sich an, statt zu zerbrechen.",
      },
      {
        q: "Brauche ich Geräte zu Hause?",
        a: "Nein. Für den Anfang bringe ich Kurzhanteln, Bänder und das übrige Material mit. Später entscheiden wir gemeinsam, ob sich eigenes Equipment oder der Studio-Anteil lohnt.",
      },
      {
        q: "Trainierst du auch Einsteiger über 50?",
        a: "Ja, ein großer Teil meiner Kundschaft startet nach einer langen Pause oder zum ersten Mal. Der Technik-Check am Anfang legt das Niveau fest, gesteigert wird erst, wenn die Ausführung sitzt.",
      },
    ],
  },

  "loevenich/abnehmen": {
    answer:
      "Abnehmen in Köln-Lövenich funktioniert über ein realistisches Kaloriendefizit, Krafttraining zum Schutz der Muskulatur und einen Plan, der zum Pendler-Alltag passt. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Lövenich: Kaloriendefizit mit Plan, Krafttraining zum Muskelschutz, Gehrunden auf den Feldwegen. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Kurze Wege, und trotzdem sitzt der ganze Tag",
        body: "Lövenich ist ein Pendler-Veedel: 9.167 Menschen, eigener S-Bahn-Halt, morgens in die Stadt, abends zurück. Der Tag sieht dann so aus: sitzen in der Bahn, sitzen im Büro, abends das Auto für die Erledigungen. Der Kalorienverbrauch ist niedriger, als die meisten glauben, und genau deshalb scheitern Diäten, die nur am Essen drehen. Abnehmen braucht hier beides: ein geplantes Defizit und Bewegung, die fest im Tag verankert ist.",
      },
      {
        title: "Der Pendler-Tag bestimmt den Essensplan",
        body: "Ein Plan, der verlangt, dass du mittags Tupperdosen ins Büro schleppst, hält zwei Wochen. Meiner nimmt den Tag, wie er ist: Frühstück zu Hause, Mittagessen unterwegs nach klaren Auswahlregeln, Abendessen gekocht, mit einem Eiweiß-Anker in jeder Mahlzeit. Natalie, Ernährungsberaterin für Sport- und Fitnessernährung, setzt das Defizit so an, dass es neben Job und Familie durchhaltbar bleibt, und prüft es in kurzen Check-ins.",
      },
      {
        title: "Bewegung, die ohne Studio stattfindet",
        body: "Hinter Lövenich beginnen die Feldwege Richtung Widdersdorf und Esch: flach und fest, aber ohne Beleuchtung, also legen wir sie im Winter aufs Wochenende und auf den hellen Feierabend. Zwei bis drei feste Gehrunden pro Woche heben den Verbrauch spürbar, dazu zählt der Fußweg zum S-Bahn-Halt jeden Tag mit. Das Krafttraining, ein bis zwei Einheiten pro Woche bei dir zu Hause oder im Studio, schützt die Muskulatur, damit das Defizit Fett abbaut und nicht Kraft.",
      },
      {
        title: "Gemessen wird am Wochenschnitt, nicht am Montagmorgen",
        body: "Die Waage lügt von Tag zu Tag, also arbeiten wir mit dem Wochenschnitt, dem Maßband und, wer mag, Fotos im festen Abstand. Ein bis zwei Kilo Fett pro Monat sind das ehrliche Tempo, alles darüber kostet Muskeln und rächt sich. Alle vier Wochen schauen wir auf die Zahlen und stellen nach: Kalorien, Gehpensum oder Training, je nachdem, wo es hakt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Lövenich?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Ernährungssteuerung gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos, danach entscheidest du.",
      },
      {
        q: "Muss ich auf Brot, Pasta oder das Feierabendbier verzichten?",
        a: "Nein. Verbote erzeugen Heißhunger und Abbrüche. Alles bekommt seinen Platz im Kalorienrahmen, auch das Bier, nur eben eingeplant statt obendrauf.",
      },
      {
        q: "Reicht Spazierengehen zum Abnehmen?",
        a: "Gehen hebt den Verbrauch und ist der unterschätzteste Baustein, aber ohne Krafttraining verlierst du im Defizit auch Muskulatur. Die Kombination aus beidem macht den Unterschied, nicht eines allein.",
      },
      {
        q: "Wie schnell nehme ich ab?",
        a: "Realistisch ein bis zwei Kilo Fett pro Monat. Das klingt langsam, summiert sich aber in einem halben Jahr auf sechs bis zwölf Kilo, ohne Jojo und ohne dass die Kraft einbricht.",
      },
      {
        q: "Wo findet das Training statt?",
        a: "Bei dir zu Hause in Lövenich, auf den Feldwegen rund ums Veedel oder im Studio. Den Mix legen wir im kostenlosen Erstgespräch fest.",
      },
    ],
  },

  "altstadt-sued/personal-training": {
    answer:
      "Personal Training in der Kölner Südstadt heißt bei mir: 1-zu-1 Krafttraining mit Plan und Progression, draußen am Rheinufer zwischen Rheinauhafen und Südbrücke oder im Studio an der Langhantel. Zwei feste Termine pro Woche, eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln Altstadt-Süd: 1-zu-1 am Rheinufer zwischen Rheinauhafen und Südbrücke oder im Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Im dichtesten Veedel der Stadt fehlt vor allem eins: Platz",
        body: "Altstadt-Süd drängt 27.764 Menschen auf 2,36 km², fast zwölftausend pro Quadratkilometer. Die typische Wohnung zwischen Severinstraße und Ubierring ist Altbau, drei Zimmer, kein Keller, kein Platz für ein Rack. Genau deshalb funktioniert Personal Training hier anders als im Einfamilienhaus-Veedel: wir verlegen das Training dorthin, wo Platz ist. Das Rheinufer liegt von jedem Punkt des Veedels aus in Gehweite, und fürs schwere Krafttraining gibt es das Studio. Du brauchst keine Geräte und kein Auto, nur feste Termine.",
      },
      {
        title: "Das Rheinufer ist dein Trainingsplatz, nicht nur deine Joggingstrecke",
        body: "Zwischen Rheinauhafen und Südbrücke zieht sich ein langes, flaches Uferstück, das morgens und am frühen Vormittag erstaunlich leer ist. Dort arbeiten wir mit mitgebrachtem Material: Kettlebells, Bänder, Sprints, Treppen an der Promenade. Die Runde durch den Inneren Grüngürtel am Sachsenring nehmen wir für Ausdauerblöcke dazu. Wer in der Südstadt wohnt, hat kürzere Wege zu diesen Flächen als zu jedem Fitnessstudio mit Parkplatzsuche.",
      },
      {
        title: "Ein Plan mit Zahlen, nicht nur mit guten Wochen",
        body: "Wir starten mit einem Technik-Check und legen dann zwei feste Einheiten pro Woche. Jede Übung wird mit Gewicht und Wiederholungen notiert, alle vier Wochen vergleichen wir: Kraftwerte, Umfänge, auf Wunsch Gewicht. In der Südstadt kommen viele Anfragen von Leuten Mitte dreißig bis Mitte fünfzig, die jahrelang nur gelaufen sind oder gar nichts gemacht haben und jetzt merken, dass Kraft fehlt. Dafür ist der Einstieg mit Begleitung der kürzeste Weg: Technik zuerst, Last danach.",
      },
      {
        title: "Südstadt-Alltag eingeplant, nicht wegtrainiert",
        body: "Das Veedel lebt abends, vom Chlodwigplatz bis zur Severinstraße, und ein Plan, der Gastronomie und Wochenende verbietet, hält hier keine vier Wochen. Deshalb plane ich andersherum: zwei Krafteinheiten und ein Ausdauerblock stehen fest, der Rest des Lebens bleibt. Wenn du auch die Ernährung anfassen willst, legt Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, dir Kalorien- und Eiweißziele fest, die Abende im Veedel aushalten. Das klären wir im kostenlosen Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in der Altstadt-Süd?",
        a: "Eine 1-zu-1 Stunde kostet 50€. Wer lieber mit App-Plan und wöchentlichen Video-Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Wo genau trainieren wir?",
        a: "Draußen am Rheinufer zwischen Rheinauhafen und Südbrücke und im Inneren Grüngürtel, fürs schwere Krafttraining im Studio. Wenn deine Wohnung Platz hergibt, geht auch Training zu Hause mit mitgebrachtem Material.",
      },
      {
        q: "Ich habe nie Krafttraining gemacht. Ist das ein Problem?",
        a: "Nein, es ist der Normalfall. Wir fangen mit einem Technik-Check an und bauen die Grundübungen sauber auf. Das Tempo bestimmt dein Stand, nicht ein Standardplan.",
      },
      {
        q: "Trainieren wir auch im Winter draußen?",
        a: "Wenn du willst, ja: das Uferstück ist ganzjährig nutzbar und bei Kälte oft am leersten. Wer lieber drinnen bleibt, verlegt die Wintermonate komplett ins Studio. Beides ist im gleichen Plan abbildbar.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraftwerte bewegen sich bei zwei Einheiten pro Woche in den ersten vier bis sechs Wochen messbar. Sichtbare Veränderung am Körper braucht je nach Ziel zwei bis drei Monate. Beides steht bei uns dokumentiert im Log, nicht im Gefühl.",
      },
    ],
  },

  "muelheim/online-coaching": {
    answer:
      "Online Coaching für Köln-Mülheim: Trainingsplan per App, wöchentliche Video-Check-ins und Ernährungssteuerung, ab 150€ im Monat. Trainiert wird, wo deine Woche es zulässt, im Studio deiner Wahl, zu Hause oder am Mülheimer Rheinufer. Das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Mülheim: Plan per App, Video-Check-ins, Ernährungssteuerung. Für Spät- und Wechselschichten gebaut. Ab 150€/Monat.",
    sections: [
      {
        title: "Für Arbeitszeiten, die kein Kursplan abbildet",
        body: "Mülheim ist mit 43.296 Einwohnern eines der größten Veedel der Stadt, und es arbeitet zu allen Uhrzeiten: im Carlswerk an der Schanzenstraße sitzen Firmen, deren Projekte selten um 17 Uhr enden, dazu kommen Gastronomie am Wiener Platz, Veranstaltungsbetrieb in E-Werk und Palladium, Logistik und Pflege. Feste wöchentliche Trainingstermine scheitern an solchen Wochen regelmäßig. Online Coaching dreht das um: der Plan steht in der App, du legst die Einheiten dorthin, wo deine Schicht oder dein Projekt sie zulässt, und die Kontrolle läuft über den wöchentlichen Check-in statt über eine feste Uhrzeit im Studio.",
      },
      {
        title: "Plan in der App, Kontrolle im Video-Check-in",
        body: "Du bekommst jede Übung mit Video und klaren Vorgaben für Gewicht und Wiederholungen, geschrieben auf die Ausstattung, die du wirklich hast: dein Studio, dein Homegym oder Körpergewicht plus Bänder. Einmal pro Woche sprechen wir 15 bis 20 Minuten per Video, der Termin wandert mit deiner Schicht. Dazwischen schickst du Technik-Videos oder Fragen und bekommst kurzfristig Antwort. Gesteuert wird nach deinem Trainingslog und dem Wochenschnitt auf der Waage, nicht nach Bauchgefühl.",
      },
      {
        title: "Rheinufer und Stadtgarten als feste Cardio-Blöcke",
        body: "Die Ausdauer kostet in Mülheim kein Laufband: am Rheinufer unter der Mülheimer Brücke liegt eine flache, lange Strecke, der Mülheimer Stadtgarten eine kurze Runde für lockere Tage. Beides schreibe ich mit Strecke und Tempo in den Plan, damit aus dem vagen Vorsatz ein abhakbarer Block wird. Wer lieber drinnen bleibt, bekommt die gleichen Blöcke aufs Gerät im Studio geschrieben. Entscheidend ist nicht wo, sondern dass es im Log steht.",
      },
      {
        title: "Wenn online nicht reicht: 1-zu-1 vor Ort dazunehmen",
        body: "Online Coaching trägt, sobald die Grundübungen sauber sitzen. Wackeln Kniebeuge oder Kreuzheben noch, starten wir ehrlicher mit ein paar 1-zu-1 Stunden, ich trainiere regelmäßig in Mülheim, und wechseln dann online. Auch dauerhaft gemischt funktioniert es: Plan und Check-ins online, einmal im Monat eine Technik-Stunde vor Ort für 50€. Was zu deiner Woche passt, klären wir im kostenlosen Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Mülheim?",
        a: "Ab 150€ im Monat, mit Trainingsplan per App, wöchentlichem Video-Check-in, Ernährungssteuerung und Betreuung zwischen den Terminen. Einzelne 1-zu-1 Stunden vor Ort kosten 50€. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite in Wechselschicht. Funktioniert das?",
        a: "Ja, dafür ist das Format gebaut. Die Einheiten haben keine feste Uhrzeit, der Check-in-Termin wandert mit dem Dienstplan, und der Plan hat Minimalvarianten für Wochen, in denen wenig geht.",
      },
      {
        q: "Brauche ich ein Fitnessstudio?",
        a: "Nein. Der Plan wird auf deine Möglichkeiten geschrieben, vom voll ausgestatteten Studio bis zu Körpergewicht und Bändern zu Hause. Fürs Cardio reichen Rheinufer und Stadtgarten vor der Tür.",
      },
      {
        q: "Was unterscheidet das von einem Trainingsplan aus dem Internet?",
        a: "Die Steuerung. Ein PDF bleibt gleich, egal was passiert. Hier wird jede Woche nach Log und Wochenschnitt nachjustiert, Technik wird per Video korrigiert, und wenn eine Schichtwoche alles umwirft, wird der Plan angepasst statt abgebrochen.",
      },
      {
        q: "Kann ich online anfangen, obwohl ich Anfänger bin?",
        a: "Meistens ist es ehrlicher, die Grundübungen zuerst in wenigen 1-zu-1 Stunden zu lernen, das geht auch bei dir in Mülheim. Danach funktioniert online sehr gut, weil die Technik-Basis steht.",
      },
    ],
  },

  "dellbrueck/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Dellbrück macht bei uns Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung: Kalorien- und Eiweißziele, ein Wochenplan, der Familientisch und Vereinstraining übersteht, kurze Check-ins zum Nachsteuern. Die Beratung läuft online, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Dellbrück mit Natalie: Sport- und Fitnessernährung, Wochenplan für Familie und Vereinstraining, Online-Check-ins. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Viel Bewegung, und das Gewicht steht trotzdem",
        body: "Dellbrück ist ein sportliches Veedel: 21.954 Einwohner, die Dellbrücker Heide als Lauffläche vor der Tür, der Thielenbruch für lange Runden, dazu ein dichtes Vereinsleben. Genau deshalb klingen viele Anfragen von hier gleich: es wird zwei-, dreimal pro Woche trainiert, und auf der Waage passiert nichts. Die Antwort liegt fast nie im Training, sondern in der Energiebilanz drumherum. Natalie rechnet sie mit dir durch, mit echten Zahlen statt mit dem Gefühl, eigentlich ganz ordentlich zu essen.",
      },
      {
        title: "Erst die Bestandsaufnahme, dann das Ziel",
        body: "Am Anfang stehen ein ausführliches Gespräch und ein paar Tage Essprotokoll, so wie du wirklich isst, nicht wie du es dir vornimmst. Daraus legt Natalie Kalorienziel und Eiweißmenge fest, passend zu deinem Ziel: abnehmen, Muskeln aufbauen oder die Leistung im Verein stützen. Verbotslisten gibt es nicht. Es gibt eine Struktur aus Mahlzeiten, die zu deinem Tag passen, und klare Prioritäten, was zuerst zählt, wenn die Woche voll ist.",
      },
      {
        title: "Ein Plan für den Tisch, an dem mehrere sitzen",
        body: "Dellbrück ist ein Familienveedel, und ein Ernährungsplan, der ein eigenes Gericht nur für dich vorsieht, scheitert am Abendessen. Natalie plant deshalb mit dem Familientisch: gleiche Gerichte für alle, gesteuert wird über deine Portion und den Rest deines Tages. Auch Wochenende, Vereinsfest und Brauhaus bekommen einen Platz im Wochenbudget, statt es zu sprengen. Ein Plan, der das echte Leben einrechnet, hält Monate statt zwei Wochen.",
      },
      {
        title: "Online-Beratung, Training dazu, wenn du willst",
        body: "Die Beratung läuft per Video und App: feste Check-ins, dazwischen kurze Rückfragen, nachgesteuert wird nach dem Wochenschnitt auf der Waage. Wer Training und Ernährung zusammen angehen will, nimmt das Online Coaching ab 150€ im Monat, dort sind Trainingsplan und Ernährungssteuerung enthalten. Für Technik und Krafttraining vor Ort in Dellbrück gibt es die 1-zu-1 Stunde für 50€. Was sinnvoll ist, klären wir im kostenlosen Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Wer macht die Ernährungsberatung bei FitPrimo?",
        a: "Natalie, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie arbeitet eng mit dem Training zusammen, damit Essen und Plan zum selben Ziel führen.",
      },
      {
        q: "Was kostet die Ernährungsberatung in Dellbrück?",
        a: "Im Online Coaching ab 150€ im Monat ist die Ernährungssteuerung zusammen mit dem Trainingsplan enthalten. Das Erstgespräch ist kostenlos, dort klären wir auch, ob eine reine Beratung für dich reicht.",
      },
      {
        q: "Ich laufe schon regelmäßig in der Heide. Warum nehme ich nicht ab?",
        a: "Weil Laufen den Verbrauch weniger erhöht, als die meisten denken, und das Essen drumherum die Bilanz bestimmt. Mit einem realistischen Kalorienziel wird aus der Lauferei ein Hebel statt eines Alibis.",
      },
      {
        q: "Muss ich für meine Familie und für mich getrennt kochen?",
        a: "Nein. Natalie plant mit gemeinsamen Gerichten und steuert über deine Portionen und den Rest des Tages. Getrennte Töpfe hält niemand durch, und nötig sind sie nicht.",
      },
      {
        q: "Läuft die Beratung vor Ort oder online?",
        a: "Online, per Video und App, die Termine passen damit auch in eine Mittagspause. Training vor Ort in Dellbrück kannst du jederzeit dazunehmen.",
      },
    ],
  },

  "weiss/abnehmen": {
    answer:
      "Abnehmen in Köln-Weiß funktioniert ohne Studio im Veedel: ein realistisches Kaloriendefizit, zwei Krafteinheiten pro Woche bei dir zu Hause mit mitgebrachtem Material und die Rheinbogen-Runde als fester Bewegungssockel. Realistisch sind ein bis zwei Kilo Fett pro Monat. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Weiß: Kaloriendefizit ohne Crash-Diät, Krafttraining zu Hause, feste Runden im Rheinbogen. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Im Dorf am Rheinbogen gibt es kein Studio, und du brauchst auch keins",
        body: "Weiß ist mit 5.923 Einwohnern eines der kleinsten Veedel im Kölner Süden, ein altes Dorf in der Rheinschleife zwischen Rodenkirchen und Sürth. Ein Fitnessstudio gibt es im Ort nicht, und genau daran scheitern hier viele Abnehmversuche: die Fahrt nach Rodenkirchen oder in die Stadt fällt als Erstes aus, wenn der Tag voll ist. Deshalb kommt das Training zu dir. Ich bringe Kurzhanteln, Kettlebells und Bänder mit, trainiert wird im Wohnzimmer, im Garten oder direkt am Rheinufer.",
      },
      {
        title: "Die Rheinbogen-Runde ist dein täglicher Verbrauch",
        body: "Der größte Teil des Kalorienverbrauchs entsteht nicht in der Trainingsstunde, sondern in der Bewegung dazwischen, und dafür ist Weiß besser ausgestattet als die halbe Innenstadt: der Leinpfad am Rheinufer ist flach, ruhig und führt in beide Richtungen aus dem Dorf, nach Sürth oder Richtung Rodenkirchen. Diese Runde bekommt im Plan feste Kilometer pro Woche, bei jedem Wetter. Im Sommer, wenn die Fähre nach Zündorf übersetzt, lässt sich die Runde aufs andere Ufer verlängern. Gewohnheit schlägt Willenskraft, deshalb steht die Runde im Plan wie ein Termin.",
      },
      {
        title: "Defizit mit Muskelschutz statt Crash-Diät",
        body: "Wer nur weniger isst, verliert Muskeln mit, und der Verbrauch sinkt gleich hinterher, das ist der eingebaute Jojo. Deshalb gehören zwei Krafteinheiten pro Woche fest in den Plan. Gewichte und Wiederholungen werden notiert, alle vier Wochen schauen wir gemeinsam auf Waage, Umfänge und Kraftwerte: sinkt das Gewicht bei stabiler Kraft, verschwindet Fett und nicht Muskel. Dein Kalorienziel rechnet auf Wunsch Natalie durch, unsere Ernährungsberaterin für Sport- und Fitnessernährung, mit Check-ins, wenn das Gewicht stehen bleibt.",
      },
      {
        title: "Für wen das in Weiß gedacht ist",
        body: "Typische Anfragen aus Weiß kommen von Leuten, die hier wegen Ruhe und Rhein wohnen und im Auto oder am Schreibtisch sitzen: Pendler über die Rheinuferstraße, Selbstständige im Homeoffice, Eltern, bei denen der eigene Sport seit Jahren hinten ansteht. Der Plan rechnet mit genau diesem Alltag: zwei feste Krafteinheiten, die Rheinrunde als Sockel, ein Kalorienbudget, das Wochenende und Besuch übersteht. Keine Verbote, keine Pulverkur, dafür Zahlen, die sich kontrollieren lassen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Weiß?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und Material. Das Online Coaching mit Trainingsplan und Ernährungssteuerung durch Natalie beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wie viel kann ich realistisch abnehmen?",
        a: "Ein bis zwei Kilo Fett pro Monat, am Anfang durch Wasser oft mehr. Das klingt unspektakulär, summiert sich aber in einem halben Jahr auf sechs bis zwölf Kilo, ohne Jojo.",
      },
      {
        q: "Ich habe keine Geräte zu Hause. Reicht das trotzdem?",
        a: "Ja. Ich bringe Kurzhanteln, Kettlebells und Bänder mit, das reicht für ein vollwertiges Krafttraining. Wer irgendwann schwerer trainieren will, nimmt das Studio in Köln dazu.",
      },
      {
        q: "Reichen Spaziergänge am Rhein nicht aus?",
        a: "Sie sind der wichtigste Alltagsbaustein, aber sie schützen die Muskeln im Defizit nicht. Erst Defizit, feste Kilometer und zwei Krafteinheiten zusammen sorgen dafür, dass gezielt Fett verschwindet.",
      },
      {
        q: "Brauche ich einen strikten Ernährungsplan?",
        a: "Nein, ein Kalorienbudget mit Eiweißziel reicht. Natalie legt es so, dass Familienessen und Wochenende hineinpassen. Pläne mit Verbotslisten halten in der Praxis keine vier Wochen.",
      },
    ],
  },

  "rodenkirchen/abnehmen": {
    answer:
      "Abnehmen in Köln-Rodenkirchen mit Krafttraining statt Crash-Diät: ein realistisches Kaloriendefizit, zwei Einheiten pro Woche im Studio oder bei dir zu Hause und feste Runden am Rheinufer und im Forstbotanischen Garten. Realistisch sind ein bis zwei Kilo Fett pro Monat, ohne Jojo. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Rodenkirchen: Kaloriendefizit mit Muskelschutz, Krafttraining 1-zu-1, feste Runden am Rheinufer und im Forstbotanischen Garten. 50€/Std.",
    sections: [
      {
        title: "Rodenkirchen hat die besten Abnehm-Strecken im Kölner Süden",
        body: "Zwischen Rheinpromenade, Forstbotanischem Garten und Friedenswald liegt in Rodenkirchen ein zusammenhängendes Netz an Wegen, das die meisten nur vom Sonntagsspaziergang kennen. Im Abnehmplan wird daraus ein Werkzeug: feste Kilometer pro Woche, als Termin geplant statt als Vorsatz. Diese Alltagsbewegung hebt deinen Verbrauch zuverlässiger als jede zusätzliche Schwitzeinheit, weil sie keine Willenskraft kostet, sobald sie Gewohnheit ist. Die Promenade ist flach und beleuchtet, der Forstbotanische Garten liefert die ruhigere Runde für Wochenenden.",
      },
      {
        title: "Das Defizit macht den Unterschied, das Krafttraining sichert ihn ab",
        body: "Abgenommen wird im Kaloriendefizit, daran führt kein Weg vorbei. Aber was dein Körper im Defizit abbaut, entscheidet das Krafttraining: ohne Widerstand verschwinden Muskeln mit, der Verbrauch sinkt, und nach der Diät ist alles wieder da. Deshalb stehen zwei Krafteinheiten pro Woche im Plan, im Studio an der Langhantel oder bei dir zu Hause in Rodenkirchen mit mitgebrachtem Material. Gewichte und Wiederholungen werden dokumentiert, alle vier Wochen vergleichen wir Waage, Umfänge und Kraftwerte.",
      },
      {
        title: "Essen, das zum Leben am Rhein passt",
        body: "Rodenkirchen lebt draußen: die Promenade, die Biergärten am Wasser, Familienessen am Wochenende. Ein Abnehmplan, der das alles verbietet, hält zwei Wochen. Deshalb arbeitet dein Plan mit einem Wochenbudget an Kalorien statt mit täglichen Verboten, und das Abendessen am Rhein ist eingerechnet, nicht verboten. Dein Kalorienziel und die Eiweißmenge legt auf Wunsch Natalie fest, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, mit kurzen Online-Check-ins zum Nachsteuern.",
      },
      {
        title: "Messbar in vier Wochen, nicht erst im nächsten Sommer",
        body: "Du musst mir nicht glauben, dass der Plan funktioniert, du siehst es in den Zahlen. Nach vier Wochen stehen die ersten Vergleichswerte: Gewicht im Wochenschnitt, Umfänge, Kraftwerte. Sinkt das Gewicht bei stabiler Kraft, läuft es richtig. Steht es, wird nachjustiert, am Budget oder an der Bewegung, nicht mit mehr Härte. So kommen ein bis zwei Kilo Fett pro Monat zusammen, und sie bleiben weg, weil kein Jojo eingebaut ist.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Rodenkirchen?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Trainingsplan und Ernährungssteuerung durch Natalie beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wie schnell nehme ich ab?",
        a: "Realistisch ein bis zwei Kilo Fett pro Monat, am Anfang durch Wasser oft mehr. Schnellere Versprechen gehen auf Muskeln und Wasser, und das rächt sich nach der Diät.",
      },
      {
        q: "Wo findet das Training statt?",
        a: "Bei dir zu Hause in Rodenkirchen mit mitgebrachtem Material, draußen an Promenade und Forstbotanischem Garten oder im Studio an der Langhantel. Den Mix legen wir im kostenlosen Erstgespräch fest.",
      },
      {
        q: "Muss ich auf die Abende am Rhein verzichten?",
        a: "Nein. Der Plan rechnet mit einem Wochenbudget, und ein Abend im Biergarten ist darin eingeplant. Verbote funktionieren nicht, Budgets schon.",
      },
      {
        q: "Reicht Joggen an der Promenade nicht zum Abnehmen?",
        a: "Laufen erhöht den Verbrauch, aber ohne Defizit und ohne Krafttraining nimmst du damit kaum ab oder verlierst Muskeln mit. Die Kombination aus allen dreien macht den Unterschied, und sie ist messbar.",
      },
    ],
  },

  "merheim/personal-training": {
    answer:
      "Personal Training in Köln-Merheim heißt: 1-zu-1 Krafttraining mit Plan und Progression, bei dir zu Hause mit mitgebrachtem Material, draußen an der Merheimer Heide oder im Studio an der Langhantel. Zwei feste Termine pro Woche, 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Merheim: 1-zu-1 Krafttraining zu Hause, an der Merheimer Heide oder im Studio. Plan mit Progression, 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Training, das in die ruhigen Straßen von Merheim kommt",
        body: "Merheim ist mit 11.354 Einwohnern ein ruhiges Wohnveedel im Bezirk Kalk: viel Siedlung, viele Häuser mit Garten, die Stadtbahn-Linie 1 mitten durch. Ein eigenes Fitnessstudio sucht man im Veedel weitgehend vergeblich, und genau da setzt 1-zu-1 Training an: ich komme mit Kurzhanteln, Kettlebells und Bändern zu dir, trainiert wird im Wohnzimmer, in der Garage oder im Garten. Kein Anfahrtsweg, keine Wartezeit am Gerät, dafür eine volle Stunde Technik und Arbeit.",
      },
      {
        title: "Die Merheimer Heide als zweiter Trainingsort",
        body: "Direkt am Veedel liegt die Merheimer Heide, eine der größten freien Wiesenflächen im Kölner Osten. Für das Personal Training nutze ich sie anders als für reine Lauf-Einheiten: Ausfallschritte und Sprünge am Hang, Schlittenzieher-Ersatz mit Bändern, Tempopassagen als Abschluss der Krafteinheit. Draußen trainieren heißt hier nicht Bootcamp-Show, sondern die Übungen, die zu deinem Plan gehören, mit mehr Platz als in jedem Studio. Bei Dauerregen tauschen wir die Einheit gegen Wohnzimmer oder Studio, der Plan bleibt derselbe.",
      },
      {
        title: "Progression steht im Log, nicht im Gefühl",
        body: "Wir starten mit einem Technik-Check: Kniebeuge, Hüftstreckung, Rumpf. Danach stehen zwei Einheiten pro Woche mit klaren Vorgaben, und jede Übung wird mit Gewicht und Wiederholungen notiert. Alle vier bis sechs Wochen vergleichen wir die Werte. Wer aus Merheim anfragt, will meistens eines von dreien: wieder stark werden nach Jahren Pause, Rücken und Haltung gegen den Schreibtisch sichern oder gezielt Muskeln aufbauen. Für alle drei gilt derselbe Grundsatz: Technik zuerst, dann Last, und beides dokumentiert.",
      },
      {
        title: "Termine, die zu Klinik- und Pendler-Zeiten passen",
        body: "Mit dem Krankenhaus Merheim steht einer der großen Arbeitgeber des Rechtsrheinischen direkt im Veedel, und viele Nachbarn pendeln über die Linie 1 oder die A3 zur Arbeit. Deshalb lege ich Termine auch früh am Morgen oder am Nachmittag zwischen zwei Schichten, nicht nur in den klassischen Feierabend. Wer unregelmäßig arbeitet, kombiniert das 1-zu-1 Training mit dem Online Coaching ab 150€ im Monat: Plan in der App, Training vor Ort, wenn es passt. Was sinnvoll ist, klären wir im kostenlosen Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Merheim?",
        a: "Eine 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und Material. Das Online Coaching mit App-Plan und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Brauche ich eigene Geräte zu Hause?",
        a: "Nein. Ich bringe Kurzhanteln, Kettlebells und Bänder mit, das reicht für ein vollständiges Krafttraining. Wer schwerer an der Langhantel arbeiten will, nimmt das Studio dazu.",
      },
      {
        q: "Wo trainieren wir in Merheim?",
        a: "Bei dir zu Hause, draußen an der Merheimer Heide oder im Studio. Viele kombinieren: eine Einheit daheim, eine draußen oder im Studio. Den Mix legen wir nach deinem Ziel fest.",
      },
      {
        q: "Ich arbeite im Schichtdienst an der Klinik. Bekommen wir feste Termine hin?",
        a: "Ja. Die Termine wandern mit dem Dienstplan, auch früher Morgen oder Nachmittag ist möglich. Feste Routine entsteht über die Woche, nicht über die Uhrzeit.",
      },
      {
        q: "Wie schnell merke ich Fortschritt?",
        a: "Kraftwerte bewegen sich bei zwei Einheiten pro Woche in vier bis sechs Wochen messbar, Haltung und Alltag oft früher. Alles steht im Trainingslog, du siehst den Verlauf schwarz auf weiß.",
      },
    ],
  },

  "wahn/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Wahn macht bei uns Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ihr Ansatz für Wahn: Regeln fürs Essen unterwegs, am Flughafen und in der Kantine, statt eines Plans, der nur am heimischen Herd funktioniert. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Wahn mit Natalie: Regeln für Kantine, Flughafen und Essen unterwegs statt starrem Plan, online betreut. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Essen, das auch unterwegs funktioniert",
        body: "Wahn liegt direkt am Flughafen Köln/Bonn, viele hier arbeiten dort oder pendeln mit der S-Bahn in die Stadt. Das Essen passiert dann in der Kantine, am Terminal, an der Tankstelle oder abends spät zu Hause. Ein klassischer Wochenplan mit sieben gekochten Abendessen scheitert an so einem Alltag nach drei Tagen. Natalie dreht es deshalb um: Sie baut dir Entscheidungsregeln für genau die Orte, an denen du wirklich isst. Was nimmst du in der Kantine, wenn es drei Gerichte gibt? Was geht am Bäcker im Terminal, was nicht? Mit solchen Regeln bleibt das Kalorienziel auch in einer unplanbaren Woche stehen.",
      },
      {
        title: "Die Wahner Heide ist dein Konto für Bewegung",
        body: "Wahn gibt der Wahner Heide ihren Namen, und die liegt direkt vor der Tür. Für die Ernährungsberatung ist das mehr wert, als es klingt: Abnehmen steht und fällt mit dem Kalorienverbrauch im Alltag, nicht nur mit dem Training. Eine Stunde zügiges Gehen auf den Heidewegen, drei- bis viermal pro Woche, verschiebt dein Wochenbudget spürbar, ohne dass du dafür ein Studio brauchst. Natalie rechnet diese Bewegung in dein Kalorienziel ein, damit Essen und Alltag zusammenpassen statt gegeneinander zu laufen.",
      },
      {
        title: "So läuft die Beratung ab",
        body: "Am Anfang stehen ein Gespräch und ein ehrliches Protokoll: Was isst du wirklich, zu welchen Zeiten, an welchen Orten? Daraus baut Natalie dein Kalorien- und Eiweißziel und die ersten Regeln. Betreut wird komplett online, mit wöchentlichem Check-in: Gewichtstrend, Fotos vom Teller wenn du magst, und jede Woche eine konkrete Anpassung. Verbotslisten gibt es keine. Wer in Wahn wohnt und zusätzlich Training will, kombiniert die Beratung mit 1-zu-1 Einheiten bei Angelo, auch das klären wir im Erstgespräch.",
      },
      {
        title: "Für wen das in Wahn passt",
        body: "Typisch sind drei Situationen: Schichten und wechselnde Dienstzeiten rund um den Flughafen, Pendler mit langen Tagen und spätem Abendessen, und Eltern, bei denen das eigene Essen zwischen Familientisch und Resteteller untergeht. In allen drei Fällen ist das Problem selten das Wissen, sondern die Struktur. Genau die baut Natalie mit dir auf, in kleinen Schritten, die eine normale Woche in Wahn überleben.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Wahn?",
        a: "Die Beratung durch Natalie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Funktioniert das auch mit Schichtdienst am Flughafen?",
        a: "Ja. Natalie plant nicht nach Uhrzeiten, sondern nach deinem Dienstplan: Mahlzeiten-Anker, die sich verschieben lassen, und Regeln für Kantine und Essen unterwegs. Der Plan folgt deiner Woche, nicht umgekehrt.",
      },
      {
        q: "Muss ich kochen können oder Meal Prep machen?",
        a: "Nein. Meal Prep hilft, ist aber keine Bedingung. Wichtiger sind gute Entscheidungen an den Orten, wo du sowieso isst. Wer gern vorkocht, bekommt passende Rezepte, wer nicht, bekommt Einkaufs- und Bestellregeln.",
      },
      {
        q: "Gibt es Verbote oder eine Diätphase?",
        a: "Nein. Du bekommst ein Kalorien- und ein Eiweißziel und lernst, beides mit normalem Essen zu treffen. Auch das Wochenende mit Familie oder der Abend im Biergarten sind eingeplant, nicht verboten.",
      },
      {
        q: "Reicht Gehen in der Wahner Heide zum Abnehmen?",
        a: "Gehen allein selten, aber es ist der unterschätzte Hebel: Es erhöht deinen Verbrauch, ohne Hunger zu machen. In Kombination mit dem Kalorienziel und zwei Krafteinheiten pro Woche wird daraus ein Plan, der hält.",
      },
    ],
  },

  "kalk/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Kalk nach Wettkampf-Prinzipien: Grundübungen, ein geführtes Protokoll und ein Eiweiß-Zielwert fürs Essen. Viele in Kalk trainieren schon, nur ohne System, genau da setze ich an. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau mit Personal Trainer in Köln-Kalk: System statt planlosem Studio-Training, Grundübungen mit Protokoll, Eiweiß-Zielwert. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Du trainierst schon, aber es wächst nichts",
        body: "Kalk ist jung und dicht: fast 25.000 Menschen auf knapp drei Quadratkilometern, und rund um die Kalker Hauptstraße und die Arcaden gibt es mehr Fitnessstudios als in den meisten Kölner Veedeln. Die typische Anfrage aus Kalk kommt deshalb nicht vom Anfänger, sondern von jemandem, der seit ein, zwei Jahren trainiert und sich nicht mehr verändert. Die Ursache ist fast immer dieselbe: wechselnde Übungen, kein Protokoll, keine geplante Steigerung. Muskeln wachsen nicht von Abwechslung, sondern von messbar mehr Gewicht und Wiederholungen bei denselben Grundübungen über Monate.",
      },
      {
        title: "Das Protokoll ist der Unterschied",
        body: "Wir legen vier bis sechs Grundübungen fest: Kniebeuge, Kreuzheben, Bankdrücken, Rudern, Überkopfdrücken, je nach deinem Stand. Jede Einheit wird dokumentiert, jede Woche hat ein Ziel. Ich stelle deine Technik ein, damit die Steigerung aus den Muskeln kommt und nicht aus dem Schwung, und entscheide, wann mehr Gewicht dran ist und wann eine leichtere Woche. Trainieren kannst du mit mir im Studio oder, wenn du schon Mitglied bist, nach meinem Plan in deinem Studio in Kalk, mit Technik-Einheiten bei mir im Abstand von ein paar Wochen.",
      },
      {
        title: "Ohne Eiweiß kein Aufbau",
        body: "Der zweite Hebel steht nicht im Trainingsplan, sondern auf dem Teller. Für Muskelaufbau brauchst du einen festen Eiweiß-Zielwert pro Tag, als Faustregel 1,6 bis 2 Gramm pro Kilo Körpergewicht, und genug Kalorien drumherum. Den Wert rechnen wir im Erstgespräch aus, und du bekommst einfache Wege, ihn zu treffen: Einkaufsliste, Döner-und-Imbiss-Regeln für die Kalker Hauptstraße inklusive. Wer es genauer will, nimmt die Ernährungsbetreuung durch Natalie im Online Coaching dazu.",
      },
      {
        title: "Was du in drei Monaten erwarten kannst",
        body: "Als Einsteiger legst du in zwölf Wochen bei sauberer Ausführung deutlich an Kraft zu, die ersten sichtbaren Veränderungen folgen danach. Als Fortgeschrittener mit Stillstand ist der Effekt oft schneller sichtbar, weil das Protokoll die Lücken aufdeckt: meist zu wenig Progression bei den Grundübungen und zu wenig Eiweiß. Versprechen in Kilo Muskelmasse mache ich keine, Zahlen im Trainingsbuch bekommst du dafür jede Woche.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Kalk?",
        a: "Die 1-zu-1 Stunde kostet 50€. Wer schon im Studio trainiert und vor allem Plan und Kontrolle braucht, fährt mit dem Online Coaching ab 150€ im Monat oft besser: Plan per App, wöchentliche Check-ins, Technik-Feedback per Video. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich trainiere schon in einem Studio in Kalk. Lohnt sich das trotzdem?",
        a: "Gerade dann. Du behältst dein Studio und deine Zeiten, von mir kommen Plan, Protokoll und Technik-Korrektur. Das ist der Teil, der bei den meisten fehlt und ohne den die Mitgliedschaft wenig bringt.",
      },
      {
        q: "Wie oft muss ich für Muskelaufbau trainieren?",
        a: "Zwei bis drei Krafteinheiten pro Woche reichen, wenn sie geplant sind. Mehr Tage bringen erst etwas, wenn Ausführung, Progression und Essen stimmen, und kosten vorher nur Erholung.",
      },
      {
        q: "Brauche ich Supplemente?",
        a: "Nötig ist keines. Ein Eiweißpulver kann helfen, den Tageswert zu treffen, wenn du mit normalem Essen nicht hinkommst, und Kreatin ist gut untersucht. Alles andere besprechen wir ehrlich im Erstgespräch, verkaufen will ich dir nichts.",
      },
    ],
  },

  "volkhoven-weiler/rueckentraining": {
    answer:
      "Rückentraining in Köln-Volkhoven/Weiler: zweimal pro Woche gezielter Kraftaufbau für Rumpf, Hüfte und hintere Kette, bei dir zu Hause mit mitgebrachtem Material, dazu Gehrunden am Fühlinger See als täglicher Ausgleich. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos. Akute Schmerzen klärt zuerst ein Arzt.",
    metaDescription:
      "Rückentraining in Köln-Volkhoven/Weiler: Kraft für Rumpf und hintere Kette, Training bei dir zu Hause, Ausgleich am Fühlinger See. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Auto, Schreibtisch, Auto: der Rücken im Kölner Norden",
        body: "Volkhoven/Weiler ist ein Wohnstadtteil, in dem das Auto den Tag bestimmt: zur Arbeit gependelt, eingekauft, die Kinder gefahren. Dazu kommt bei vielen ein Schreibtischjob. Acht bis zehn Stunden Sitzen am Tag sind so schnell zusammen, und genau daher kommen die typischen Beschwerden: verspannter unterer Rücken, steife Hüfte, Nacken. Dagegen hilft auf Dauer kein Dehnen und keine Massage, sondern ein Rumpf und eine hintere Kette, die stark genug sind, das Sitzen wegzustecken.",
      },
      {
        title: "Das Training kommt zu dir, nicht umgekehrt",
        body: "Ein Studio gibt es in Volkhoven/Weiler nicht, und die Fahrt nach Chorweiler oder in die Stadt ist genau die Hürde, an der Vorsätze scheitern. Deshalb komme ich zu dir: Kurzhanteln, Widerstandsbänder und eine Matte bringe ich mit, mehr als ein freies Stück Wohnzimmer, Garage oder Garten braucht es nicht. Zweimal pro Woche 60 Minuten, feste Termine, und die Einheit beginnt in dem Moment, in dem es bei dir klingelt.",
      },
      {
        title: "Welche Übungen deinen Rücken wirklich entlasten",
        body: "Wir arbeiten mit Hüftstreckung und Rumpfspannung: rumänisches Kreuzheben mit Kurzhanteln, Hüftbrücken, Rudern am Band, Seitstütz, Tragen von Gewicht über Strecke. Dazu Mobilität für Brustwirbelsäule und Hüftbeuger, die beim Sitzen verkürzen. Alles beginnt leicht und wird dokumentiert gesteigert: ein Rücken wird nicht von vorsichtigen Bewegungen belastbar, sondern von planvoll wachsender Last. Nach sechs Wochen vergleichen wir: Spannung halten, Gewichte, und wie sich der Alltag anfühlt.",
      },
      {
        title: "Der Fühlinger See als tägliche Medizin",
        body: "Zwischen den Einheiten zählt, was du täglich tust. Volkhoven/Weiler grenzt direkt an den Fühlinger See: Die Wege dort sind flach, beleuchtet ist es rund um die Regattastrecke, und eine Runde um eines der Seebecken ist eine klare, wiederholbare Strecke. Dreißig bis vierzig Minuten zügiges Gehen an vier, fünf Tagen pro Woche halten Hüfte und Rücken in Bewegung und verstärken, was wir im Training aufbauen. Das ist deine Hausaufgabe, mehr nicht.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Volkhoven/Weiler?",
        a: "Die 1-zu-1 Stunde bei dir zu Hause kostet 50€, inklusive mitgebrachtem Material. Das Erstgespräch ist kostenlos und klärt, ob Training im Moment das Richtige ist.",
      },
      {
        q: "Ich habe gerade akute Rückenschmerzen. Kann ich anfangen?",
        a: "Bei akuten oder ausstrahlenden Schmerzen, Taubheit oder Kribbeln gehört der erste Weg zum Arzt. Training beginnt, wenn ernste Ursachen ausgeschlossen sind, dann aber gern früh: kontrollierte Bewegung hilft meist schneller als Schonung.",
      },
      {
        q: "Reicht zweimal pro Woche wirklich?",
        a: "Ja, wenn die Einheiten geplant sind und du zwischen den Terminen gehst statt nur zu sitzen. Zwei Krafteinheiten plus tägliche Gehrunden am See verändern in drei Monaten mehr als jedes tägliche Dehnprogramm.",
      },
      {
        q: "Brauche ich Geräte zu Hause?",
        a: "Nein. Ich bringe Kurzhanteln, Bänder und Matte mit. Wenn du später eigenes Material anschaffen willst, berate ich dich ehrlich, nötig ist es für dieses Training nicht.",
      },
    ],
  },

  "buchforst/ems-alternative": {
    answer:
      "Die ehrliche EMS-Alternative in Köln-Buchforst ist echtes Krafttraining: zwei geführte Einheiten pro Woche, messbare Steigerung statt Stromreiz, ohne Jahresvertrag. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos, und ich sage dir darin auch, wenn EMS für dich doch passt.",
    metaDescription:
      "EMS-Alternative in Köln-Buchforst: echtes Krafttraining mit messbarer Steigerung statt 20 Minuten Stromreiz im Abo. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Warum 20 Minuten Strom nicht reichen",
        body: "EMS wirbt mit 20 Minuten pro Woche, und genau das ist die Schwäche: Der Reiz kommt vom Strom, nicht von einer Bewegung, die schwerer wird. Kraft wächst, wenn du über Monate mehr Gewicht sauber bewegst, und das lässt sich nur steigern, wenn du wirklich etwas hebst, drückst und ziehst. Dazu lernt dein Körper bei echten Übungen das, was EMS nicht trainieren kann: Technik, Gleichgewicht, Beweglichkeit und ein Gefühl für Belastung. Das sind die Fähigkeiten, die im Alltag und beim Sport den Unterschied machen.",
      },
      {
        title: "Rechne die Kosten ehrlich nach",
        body: "EMS-Studios arbeiten fast immer mit Jahresverträgen, und aufs Jahr gerechnet landet man damit oft in derselben Größenordnung wie bei echtem Personal Training, nur mit Bindung. Bei mir gibt es kein Abo: Du zahlst die Stunde mit 50€ oder das Online Coaching ab 150€ im Monat, beides monatlich kündbar. In Buchforst selbst gibt es ohnehin kein EMS-Studio, die Anbieter sitzen in der Innenstadt und in den größeren Veedeln, du würdest also für jede Stromsitzung fahren. Mein Training kommt stattdessen zu dir.",
      },
      {
        title: "So sieht das Training in Buchforst aus",
        body: "Buchforst ist mit 0,83 Quadratkilometern der kompakteste Stadtteil im Bezirk Mülheim, bekannt für die denkmalgeschützten Siedlungen der Weißen Stadt und des Blauen Hofs aus den späten 1920er Jahren. Die Wohnungen dort sind durchdacht, aber nicht groß, deshalb plane ich das Training zweigleisig: Grundübungen mit mitgebrachtem Material bei dir zu Hause oder im Hof, die schweren Langhantel-Einheiten im Studio. Mit der eigenen S-Bahn-Station und der Nähe zu Mülheim und Kalk ist auch das Studio ohne Auto erreichbar.",
      },
      {
        title: "Messbar statt gefühlt",
        body: "Jede Einheit wird protokolliert: Übungen, Gewichte, Wiederholungen. Nach acht Wochen vergleichen wir Zahlen statt Eindrücke, und du siehst schwarz auf weiß, was sich bewegt hat. Genau diese Kontrolle fehlt beim Stromreiz, bei dem sich Intensität vor allem danach richtet, wie stark es kribbelt. Wenn du von EMS kommst, nehmen wir deine dort gewohnten 20 Minuten als Maßstab: Schon eine einzige geführte Krafteinheit pro Woche plus eine kurze Hausaufgabe schlägt sie auf Dauer deutlich.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Buchforst?",
        a: "Die geführte 1-zu-1 Stunde kostet 50€, ohne Vertragslaufzeit. Wer selbstständig trainieren will, nimmt das Online Coaching ab 150€ im Monat mit Plan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ist EMS nicht wenigstens gut für den Einstieg?",
        a: "Für den Einstieg ist Technik wichtiger als Intensität, und genau die lernt man am Stromgerät nicht. Wer mit leichten Grundübungen startet, baut dieselbe Anfangskraft auf und kann sie danach jahrelang steigern, ohne Studio-Abo.",
      },
      {
        q: "Ich habe wenig Zeit. EMS verspricht 20 Minuten pro Woche.",
        a: "Zeitmangel spricht für kurzes, geplantes Training, nicht für Strom: Zwei Einheiten à 45 bis 60 Minuten pro Woche reichen, auf Wunsch bei dir zu Hause in Buchforst, ohne Anfahrt. Das ist pro Woche kaum mehr Zeit als zwei EMS-Termine mit Umziehen und Fahrt.",
      },
      {
        q: "Kann ich EMS und Krafttraining kombinieren?",
        a: "Können ja, nötig ist es nicht. Wenn dir EMS Spaß macht, behalte es als Ergänzung. Die messbare Entwicklung von Kraft und Figur kommt aus den Grundübungen, deshalb würde ich Budget und Zeit zuerst dort investieren.",
      },
    ],
  },

  "klettenberg/personal-training": {
    answer:
      "Personal Training in Köln-Klettenberg: 1-zu-1 mit festen Terminen, draußen im Klettenbergpark und auf dem Grüngürtel oder im Studio, geplant um Gürtelbahn und Feierabend. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Klettenberg: 1-zu-1 im Klettenbergpark, auf dem Äußeren Grüngürtel oder im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der Klettenbergpark ist ein Trainingsgerät",
        body: "Der Klettenbergpark wurde ab 1905 in einer ehemaligen Kiesgrube angelegt, und genau das macht ihn fürs Training besonders: Er liegt tiefer als die Straßen drumherum und hat echte Hänge und Treppen, eine Seltenheit im flachen Köln. Wir nutzen das gezielt: Bergauf-Gehen und kurze Anstiege für Ausdauer und Beinkraft, Treppen für Schnelligkeit, die Wiesen am Weiher für Kraftübungen mit mitgebrachtem Material. Vom größten Teil Klettenbergs bist du in wenigen Minuten zu Fuß dort, das Warm-up ist der Weg.",
      },
      {
        title: "Grüngürtel, Studio, Wohnzimmer: drei Orte, ein Plan",
        body: "Klettenberg ist klein und dicht, gut 10.000 Menschen auf 1,8 Quadratkilometern Gründerzeit, und endet im Süden direkt am Äußeren Grüngürtel. Die langen, geraden Wege dort nehmen wir für Intervalle und Tempoarbeit. Für die schweren Grundübungen an der Langhantel gehen wir ins Studio, und wer gar nicht raus will, trainiert zu Hause: Kurzhanteln, Bänder und Matte bringe ich mit, ein freies Stück Altbauzimmer reicht. Welcher Mix passt, hängt von deinem Ziel ab und steht nach dem Erstgespräch fest.",
      },
      {
        title: "Termine, die den Feierabend überleben",
        body: "Viele Anfragen aus Klettenberg kommen von Berufstätigen, die über die Luxemburger Straße oder mit der Linie 18 pendeln und abends schon einen vollen Kalender haben. Deshalb arbeite ich mit festen Wochenterminen, auch früh ab 6:30 Uhr oder in der Mittagspause, und plane die Einheit von Tür zu Tür: 60 Minuten, Start an deiner Haustür oder am Parkeingang. Ein fester Termin mit einer Person, die auf dich wartet, hält erfahrungsgemäß länger als jeder Vorsatz.",
      },
      {
        title: "So starten wir",
        body: "Im kostenlosen Erstgespräch klären wir Ziel, Startpunkt und Ort: abnehmen, Kraft aufbauen, Rücken stabilisieren oder einfach wieder in Bewegung kommen. Danach bekommst du einen Plan mit zwei Einheiten pro Woche und kurzen Hausaufgaben dazwischen, oft nur eine Gehrunde durch den Grüngürtel. Alle vier bis sechs Wochen messen wir nach: Gewichte, Umfänge, wie sich der Alltag anfühlt. Was sich nicht bewegt, wird geändert.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Klettenberg?",
        a: "Die 1-zu-1 Stunde kostet 50€, egal ob im Klettenbergpark, bei dir zu Hause oder im Studio. Wer lieber mit App-Plan und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo trainieren wir im Winter?",
        a: "Entweder im Studio oder bei dir zu Hause mit mitgebrachtem Material. Der Klettenbergpark bleibt auch im Winter nutzbar, für Geh- und Laufeinheiten ist kaltes Wetter kein Hindernis, nur die Kraftübungen wandern nach drinnen.",
      },
      {
        q: "Ich habe lange keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein, das ist der Normalfall. Wir starten mit einem Technik- und Beweglichkeits-Check und bauen von dort auf. Die Hänge im Park lassen sich fein dosieren: erst zügig gehen, später laufen oder springen.",
      },
      {
        q: "Trainierst du auch Paare oder zu zweit?",
        a: "Ja, zu zweit funktioniert gut, wenn die Ziele zusammenpassen, und ihr teilt euch die Stunde. Ob das für euch sinnvoll ist, klären wir im kostenlosen Erstgespräch.",
      },
    ],
  },

  "westhoven/personal-training": {
    answer:
      "Personal Training in Köln-Westhoven: 1-zu-1 bei dir zu Hause oder am Rheinufer mit Blick auf die Rodenkirchener Brücke, Material und Plan bringe ich mit. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Westhoven: 1-zu-1 zu Hause oder am Rheinufer, Material bringe ich mit, Termine passend zur Linie 7. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Ruhiges Veedel, kurze Wege zum Wasser",
        body: "Westhoven liegt rechtsrheinisch zwischen Poll und Ensen: knapp 5.700 Einwohner, viel Wohnlage, kein Fitnessstudio im Stadtteil. Dafür ist das Rheinufer von fast jeder Straße aus in wenigen Minuten erreichbar, mit dem Leinpfad flussauf Richtung Porz und flussab unter der Rodenkirchener Brücke durch Richtung Poller Wiesen. Diese Strecke ist flach, durchgehend und frei von Ampeln, ideal für Geh- und Laufeinheiten mit klaren, wiederholbaren Abschnitten. Das Krafttraining findet bei dir zu Hause statt, in Wohnzimmer, Garage oder Garten, das Material bringe ich mit.",
      },
      {
        title: "Training, das zur Pendlerwoche passt",
        body: "Wer in Westhoven wohnt, pendelt meist: mit der Linie 7 nach Deutz und in die Innenstadt oder mit dem Auto über die Autobahn. Der Abend ist dadurch oft das Nadelöhr. Deshalb lege ich Termine auch auf den frühen Morgen, bevor die Bahn fährt, oder auf den frühen Abend direkt nach deiner Rückfahrt, als festen Wochentermin. Die Einheit dauert 60 Minuten von Tür zu Tür, ohne eigene Anfahrt. So bleibt Training auch in Wochen stehen, in denen sonst alles wackelt.",
      },
      {
        title: "Was wir in Westhoven konkret machen",
        body: "Der Kern sind zwei Einheiten pro Woche: eine Krafteinheit mit Kurzhanteln, Bändern und Körpergewicht bei dir zu Hause, dokumentiert und von Woche zu Woche gesteigert, und eine Einheit draußen am Rhein für Ausdauer, Tempo und Beweglichkeit. Wer schwere Langhantel-Arbeit will, kombiniert das mit Studio-Terminen. Ziele aus Westhoven sind meist konkret: ein paar Kilo runter, der Rücken soll den Bürotag aushalten, wieder Kondition für Radtouren am Rhein. Der Plan richtet sich danach, nicht umgekehrt.",
      },
      {
        title: "Messen statt hoffen",
        body: "Am Anfang stehen das kostenlose Erstgespräch und eine ehrliche Bestandsaufnahme: Beweglichkeit, Kraft, Ausdauer, Alltag. Danach bekommst du deinen Plan und kurze Hausaufgaben für die Tage dazwischen, meist eine Gehrunde auf dem Leinpfad. Alle vier bis sechs Wochen wird nachgemessen: Gewichte im Protokoll, Umfänge, Gehtempo auf demselben Uferabschnitt. Der Rhein liefert dafür die konstante Strecke, die ein Laufband nie ersetzt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Westhoven?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und mitgebrachtem Material. Alternativ gibt es das Online Coaching ab 150€ im Monat mit Trainingsplan per App und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo genau trainieren wir in Westhoven?",
        a: "Kraft bei dir zu Hause, in der Garage oder im Garten, Ausdauer und Tempo auf dem Leinpfad am Rheinufer zwischen Poller Wiesen und Porz. Im Winter oder bei Dauerregen verlagern wir alles nach drinnen oder ins Studio.",
      },
      {
        q: "Ich habe keine Geräte zu Hause. Geht das trotzdem?",
        a: "Ja. Kurzhanteln, Widerstandsbänder und Matte bringe ich zu jeder Einheit mit. Mehr als ein freies Stück Boden von zwei mal zwei Metern braucht es nicht.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraftwerte und Gehtempo bewegen sich bei zwei Einheiten pro Woche meist innerhalb der ersten sechs Wochen messbar, sichtbare Veränderungen folgen je nach Ziel und Essen danach. Versprochen wird nichts, gemessen alles.",
      },
    ],
  },

  "vingst/personal-training": {
    answer:
      "Personal Training in Köln-Vingst braucht weder Studio noch Hobbyraum: Ich komme mit Kurzhanteln, Kettlebell und Bändern zu dir, ein freies Eck in der Wohnung reicht, und für Draußen-Einheiten liegt die Merheimer Heide gleich hinter der Stadtteilgrenze. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Vingst: 1-zu-1 in deiner Wohnung mit mitgebrachtem Material oder draußen an der Merheimer Heide. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Im dichtesten Veedel des Bezirks zählt jeder Quadratmeter",
        body: "Vingst ist klein und voll: 12.711 Menschen auf 1,12 km², über 11.000 pro Quadratkilometer, mehr als in jedem anderen Stadtteil des Bezirks Kalk. Die meisten wohnen hier in Geschosswohnungen, und ein eigenes Zimmer fürs Training hat praktisch niemand. Mein Aufbau rechnet damit: Kurzhanteln, Kettlebell, Widerstandsbänder und eine Matte passen in zwei Taschen, die ich mitbringe. Zwei mal zwei Meter freier Boden genügen für eine komplette Krafteinheit, vom Aufwärmen bis zum letzten Satz.",
      },
      {
        title: "Die Merheimer Heide als zweiter Trainingsraum",
        body: "Hinter der östlichen Stadtteilgrenze, über Höhenberg und Ostheim, beginnt die Merheimer Heide: weite Wiesen und ruhige Wege, zu Fuß erreichbar statt mit Bahn und Tasche quer durch die Stadt. In den wärmeren Monaten verlege ich dorthin die Einheiten, die Platz brauchen: Lauf-ABC, Zirkel mit Körpergewicht und Bändern, längere Intervalle. So wechselt dein Training zwischen Wohnung und Wiese, ohne dass du je ein Studio betreten musst, außer du willst irgendwann schwer an die Langhantel, dann nehmen wir mein Studio dazu.",
      },
      {
        title: "Gemessen wird, nicht geschätzt",
        body: "Jede Einheit landet im Protokoll: Übungen, Gewichte, Wiederholungen, dazu alle vier Wochen Umfänge und, wenn du abnehmen willst, der Wochenschnitt auf der Waage. So sieht man schwarz auf weiß, ob der Plan arbeitet, und ich sehe früh, wo er klemmt. Steht eine Zahl zwei Kontrollen in Folge, wird nicht motiviert, sondern umgebaut: andere Übungsauswahl, anderes Volumen, andere Frequenz. Dein Einsatz ist zu wertvoll für einen Plan, der nur auf dem Papier gut aussieht.",
      },
      {
        title: "Termine um Schicht und Pendelzeit herum",
        body: "Viele Anfragen aus dem Kölner Osten kommen von Leuten, deren Tag nicht um 17 Uhr endet: Schichtdienst, Pendeln über die Linie 9 Richtung Deutz und Innenstadt, Familie am Abend. Deshalb lege ich Termine in Vingst auch auf den frühen Morgen, den Vormittag nach der Nachtschicht oder die Mittagszeit im Homeoffice. Der Rhythmus von zwei festen Einheiten pro Woche bleibt, die Uhrzeit richtet sich nach deinem Dienstplan, nicht umgekehrt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Vingst?",
        a: "Die 1-zu-1 Stunde kostet 50€, Anfahrt und Material sind enthalten. Wer lieber mit Plan und wöchentlichen Check-ins trainiert, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Meine Wohnung ist klein. Geht Training dort überhaupt?",
        a: "Ja. Zwei mal zwei Meter freie Fläche reichen, die Geräte bringe ich mit. In Vingst trainiere ich überwiegend genau so, und für alles, was Platz braucht, gehen wir in die Merheimer Heide.",
      },
      {
        q: "Wo in Vingst trainieren wir draußen?",
        a: "In der Merheimer Heide, die direkt hinter Höhenberg und Ostheim beginnt: Wiesen für Zirkel und Sprints, ruhige Wege für Intervalle. Treffpunkt und Strecke legen wir im ersten Termin fest.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraftwerte bewegen sich meist in den ersten vier bis sechs Wochen, sichtbare Veränderungen brauchen länger und hängen vom Ziel ab. Versprochen wird nichts, gemessen alles: Protokoll, Umfänge und alle vier Wochen der Vergleich.",
      },
    ],
  },

  "duennwald/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Dünnwald macht bei uns Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung: Sie rechnet dein Kalorien- und Eiweißziel aus, baut den Wochenplan um einen großen Einkauf herum und steuert per Online-Check-in nach. Das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Dünnwald mit Natalie: echte Zahlen statt Gefühl, Wochenplan rund um den Großeinkauf, Online-Check-ins. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Der Wald vor der Tür verbrennt weniger, als er verspricht",
        body: "Wer in Dünnwald wohnt, bewegt sich meist mehr als der Durchschnitt: Runden durch den Dünnwalder Wald, mit den Kindern in den Wildpark, im Sommer um den Höhenfelder See. Genau das führt in die typische Falle, dass sich der Tag nach viel Verbrauch anfühlt. Eine Stunde zügiges Gehen kostet aber nur grob 250 bis 350 Kilokalorien, ein belegtes Brötchen auf dem Rückweg holt das wieder rein. Natalie ersetzt dieses Gefühl durch Zahlen: dein tatsächlicher Verbrauch, dein Kalorienziel, deine Eiweißmenge. Erst damit wird aus viel Draußensein ein messbarer Vorteil.",
      },
      {
        title: "Ein Wochenplan, der um den Großeinkauf herum gebaut ist",
        body: "Am Stadtrand kauft man anders ein als in der Innenstadt: seltener, dafür groß, und was nicht im Haus ist, wird unter der Woche auch nicht schnell besorgt. Natalie nutzt das als Struktur statt als Hindernis. Aus dem Erstgespräch und ein paar Tagen Essprotokoll entsteht ein Wochenplan mit einer Einkaufsliste, die zu deinem Rhythmus passt: Grundzutaten, die mehrere Gerichte tragen, Vorrat, der ins Kalorienziel passt, und klare Prioritäten für die Tage, an denen der Plan wackelt. Verbotslisten gibt es keine, dafür ein Budget, in dem auch Kuchen am Sonntag Platz hat.",
      },
      {
        title: "Online-Beratung spart dir den Weg quer durch die Stadt",
        body: "Dünnwald liegt am nordöstlichen Rand Kölns, und ein Beratungstermin in der Innenstadt kostet schnell einen halben Abend. Deshalb läuft die Beratung bei Natalie komplett online: feste Video-Termine, dazwischen kurze Rückfragen per App, nachgesteuert wird nach dem Wochenschnitt auf der Waage, nicht nach Tagesschwankungen. Bleibt das Gewicht stehen, ändert sie konkret etwas an Ziel oder Plan, statt mehr Disziplin zu fordern.",
      },
      {
        title: "Essen und Training aus einer Hand, wenn du willst",
        body: "Ernährung wirkt am stärksten zusammen mit Krafttraining, denn nur so verschwindet im Defizit Fett statt Muskel. Wer beides angehen will, kombiniert die Beratung mit Training bei mir in Dünnwald: Ich komme mit Material zu dir nach Hause, der Wald übernimmt die Bewegung an den freien Tagen. Im Online Coaching ab 150€ im Monat sind Trainingsplan und Ernährungssteuerung zusammen enthalten, die 1-zu-1 Stunde vor Ort kostet 50€. Was für dich sinnvoll ist, klären wir im kostenlosen Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Wer berät mich bei FitPrimo in Dünnwald?",
        a: "Natalie, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Sie legt Kalorien- und Eiweißziel fest und steuert den Plan in festen Online-Check-ins nach.",
      },
      {
        q: "Was kostet die Ernährungsberatung in Dünnwald?",
        a: "Im Online Coaching ab 150€ im Monat ist die Ernährungssteuerung zusammen mit dem Trainingsplan enthalten. Ob dir eine reine Beratung reicht, klären wir im kostenlosen Erstgespräch.",
      },
      {
        q: "Zählen meine Runden im Wildpark als Training?",
        a: "Sie zählen als Alltagsbewegung und fließen in dein Kalorienziel ein, ersetzen aber kein Krafttraining. Die Kombination aus beidem entscheidet, ob du Fett verlierst oder nur Gewicht.",
      },
      {
        q: "Muss ich dafür irgendwo hinfahren?",
        a: "Nein. Die Beratung läuft per Video und App, die Termine passen auch in eine Mittagspause. Training vor Ort in Dünnwald kannst du jederzeit dazunehmen.",
      },
      {
        q: "Bekomme ich einen starren Essensplan?",
        a: "Nein. Du bekommst ein Kalorien- und Eiweißziel, einen Wochenplan rund um deinen Einkauf und Prioritäten für volle Tage. Was auf den Teller kommt, bleibt deine Küche.",
      },
    ],
  },

  "fuehlingen/abnehmen": {
    answer:
      "Abnehmen in Köln-Fühlingen baue ich auf Strecken, die nicht lügen: Die Wege am Fühlinger See sind vermessen, deine Geh-Kilometer dort zählen exakt ins Kalorienziel. Dazu kommen zwei Krafteinheiten pro Woche bei dir im Haus. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Fühlingen: vermessene Runden am Fühlinger See statt geschätzter Schritte, Kaloriendefizit mit Muskelschutz, Krafttraining zu Hause. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Schätzen war gestern: hier sind die Kilometer vermessen",
        body: "Die meisten Abnehmversuche scheitern an geschätzten Zahlen. Die Uhr zählt großzügig, der Kopf rundet auf, am Ende stimmt das Defizit nur auf dem Papier. Fühlingen hat dafür ein seltenes Gegenmittel direkt vor der Tür: Am Fühlinger See mit seinen sieben Becken ist die Regattastrecke vermessen, die Uferwege sind eben und immer gleich. Wenn deine Runde dort fest im Wochenplan steht, weiß ich genau, wie viel Bewegung wirklich stattgefunden hat, und rechne dein Essensbudget auf echte Zahlen statt auf Hoffnung.",
      },
      {
        title: "Das Defizit kommt vom Essen, der See sichert den Kopf",
        body: "Abgenommen wird in der Küche: Wir legen ein Kalorienziel fest, das zu deinem Alltag passt, mit einem Eiweiß-Anker pro Mahlzeit, damit der Hunger nicht regiert. Die festen See-Runden haben daneben zwei Aufgaben. Sie erhöhen deinen Verbrauch planbar, und sie geben der Woche eine Struktur, an der du auch nach einem schlechten Tag wieder andocken kannst. Wer im Sommer die Badegäste meiden will, geht morgens, der See gehört vor acht Uhr den Einheimischen.",
      },
      {
        title: "Zwei Krafteinheiten schützen, was du behalten willst",
        body: "Ohne Krafttraining verlierst du beim Abnehmen Muskeln mit, und genau die halten deinen Verbrauch hoch. Deshalb gehören zwei geführte Einheiten pro Woche in den Plan. Ein Studio gibt es im Dorf nicht, also bringe ich Hanteln, Bänder und Bank mit zu dir: Wohnzimmer, Garage oder Garten reichen für alles, was in einer Abnehmphase nötig ist. Gemessen wird alle vier Wochen an Umfängen und am Gewichtstrend, nicht an der Tagesform der Waage.",
      },
      {
        title: "Für wen das in Fühlingen passt",
        body: "Typisch für den äußersten Kölner Norden: Berufstätige mit Pendelstrecke, die abends keine dritte Fahrt zu einem Studio antreten wollen, und Leute, die schon viel spazieren gehen und sich wundern, warum sich nichts bewegt. Meist fehlt nicht die Bewegung, sondern das ehrliche Essensbudget dazu. Das Erstgespräch ist kostenlos, dort rechnen wir deinen Ausgangspunkt einmal sauber durch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Fühlingen?",
        a: "Die 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Kalorienziel, Trainingsplan und wöchentlichen Check-ins beginnt bei 150€ im Monat. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Reicht Gehen am Fühlinger See zum Abnehmen?",
        a: "Gehen erhöht den Verbrauch, aber ohne Kaloriendefizit beim Essen nimmst du nicht ab. Die Kombination macht es: festes Essensbudget, vermessene Runden, zwei Krafteinheiten pro Woche.",
      },
      {
        q: "Ich habe keine Geräte zu Hause. Geht das trotzdem?",
        a: "Ja. Ich bringe das Material mit, verstellbare Kurzhanteln und Bänder decken eine komplette Abnehmphase ab. Du brauchst nur ein paar freie Quadratmeter.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Der Gewichtstrend zeigt nach drei bis vier Wochen eine klare Richtung, wenn Defizit und Training stehen. Realistisch sind 0,3 bis 0,7 Kilo pro Woche, je nach Ausgangspunkt.",
      },
      {
        q: "Arbeitet ihr auch an der Ernährung mit?",
        a: "Ja. Das Kalorienziel gehört zum Coaching. Wer mehr Tiefe will, arbeitet mit Natalie, unserer Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung.",
      },
    ],
  },

  "heimersdorf/abnehmen": {
    answer:
      "Abnehmen in Köln-Heimersdorf scheitert selten am Willen, sondern an zu wenig Alltagsbewegung: In der ruhigen Siedlung sind alle Wege kurz. Ich baue deinen Grundverbrauch gezielt wieder auf, dazu ein Kalorienziel und zwei Krafteinheiten pro Woche. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Heimersdorf: Alltagsbewegung gezielt aufbauen, realistisches Kalorienziel, zwei Krafteinheiten pro Woche zu Hause. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Die Siedlung ist bequem, und genau das ist das Problem",
        body: "Heimersdorf ist als Siedlung der sechziger Jahre geplant worden: 6.278 Menschen auf 1,75 Quadratkilometern, ruhige Wohnwege, alles Nötige nah beieinander. Zum Wohnen ist das ideal, für den Kalorienverbrauch nicht. Wer hier lebt und zur Arbeit pendelt, kommt oft auf erschreckend wenige Schritte am Tag, und ein niedriger Grundverbrauch frisst jedes Diätvorhaben von unten auf. Der erste Hebel ist deshalb nicht die nächste Diät, sondern dein Bewegungssockel.",
      },
      {
        title: "Der Bewegungssockel wird geplant wie ein Termin",
        body: "Wir legen feste Geh-Fenster in deinen Tag, die ohne Umziehen funktionieren: eine Runde durch die Siedlung am Morgen, der Weg zum Einkauf zu Fuß statt mit dem Auto, am Wochenende die längere Strecke zum Fühlinger See hinüber. Das klingt banal, macht aber über die Woche mehrere hundert Kalorien Unterschied, jeden Tag. Erst auf diesen Sockel setze ich das Kaloriendefizit, so bleibt es moderat und durchhaltbar statt radikal und kurz.",
      },
      {
        title: "Krafttraining hält den Motor am Laufen",
        body: "Zweimal pro Woche trainieren wir Kraft, bei dir zu Hause mit mitgebrachtem Material oder im Studio. In einer Abnehmphase entscheidet das Krafttraining, ob das verlorene Gewicht aus dem Fett kommt oder aus der Muskulatur, und Muskulatur ist genau der Motor, der deinen Verbrauch auch in Ruhe oben hält. Beim Essen bekommst du ein Kalorienziel mit Eiweiß-Anker, keine Verbotsliste: Der Familientopf am Abend bleibt, die Portion wird geplant.",
      },
      {
        title: "Gemessen wird am Trend, nicht am Montagmorgen",
        body: "Die Waage schwankt mit Wasser, Salz und Wochenende, deshalb zählt bei mir der Sieben-Tage-Trend und das Maßband. Alle vier Wochen setzen wir uns über die Zahlen: Geht der Trend runter, bleibt alles wie es ist. Stagniert er, justiere ich zuerst die Bewegung, dann das Essensbudget. So weißt du immer, warum etwas passiert, und musst nie raten, ob es noch funktioniert.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Heimersdorf?",
        a: "50€ pro 1-zu-1 Stunde. Wer lieber mit App, Kalorienziel und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich sitze den ganzen Tag. Bringt mehr Gehen wirklich etwas?",
        a: "Ja, und zwar mehr als die meisten denken. Der Unterschied zwischen 3.000 und 9.000 Schritten am Tag liegt bei mehreren hundert Kalorien, das ist oft das halbe Defizit.",
      },
      {
        q: "Muss ich dafür in ein Studio fahren?",
        a: "Nein. Ich komme mit dem Material zu dir nach Heimersdorf. Wer schweres Langhanteltraining möchte, kann Studio-Termine dazunehmen, nötig ist es fürs Abnehmen nicht.",
      },
      {
        q: "Wie lange dauert es, bis ich etwas sehe?",
        a: "Mit stehendem Bewegungssockel, Defizit und zwei Krafteinheiten zeigt der Gewichtstrend nach etwa einem Monat klar nach unten. Umfänge an Bauch und Hüfte reagieren oft zuerst.",
      },
    ],
  },

  "finkenberg/personal-training": {
    answer:
      "Personal Training in Köln-Finkenberg nutzt, was das kompakteste Veedel von Porz hergibt: viel Grün zwischen den Wohnhäusern für das Training direkt vor der Haustür, das Treppenhaus für Ausdauer bei schlechtem Wetter, Material bringe ich mit. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Finkenberg: Training im Grün zwischen den Wohnhäusern, Treppenhaus-Intervalle bei Regen, Material wird mitgebracht. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Das kompakteste Veedel von Porz hat kurze Wege zum Training",
        body: "Finkenberg misst nur 0,64 Quadratkilometer, auf denen 6.870 Menschen wohnen, fast alles in den hohen Wohnhäusern der Siedlung aus den späten Sechzigern. Das heißt: Kein Punkt im Veedel ist weiter als ein paar Minuten zu Fuß entfernt, und zwischen den Häusern liegt deutlich mehr Grün, als der Ruf solcher Siedlungen vermuten lässt. Genau dort trainieren wir. Du kommst im Trainingszeug aus der Haustür, das Warm-up beginnt auf der Wiese vor dem Block, und nach einer Stunde bist du wieder oben.",
      },
      {
        title: "Wenn es regnet, übernimmt das Treppenhaus",
        body: "Die Wohnungen in Finkenberg sind selten groß genug für ein Heimstudio, aber die Häuser haben etwas Besseres: Treppenhäuser über viele Etagen. Treppenintervalle sind ehrliche Ausdauerarbeit für Beine, Gesäß und Kreislauf, und sie fallen nie wegen Wetter aus. Kraftübungen mit Kurzhanteln und Bändern passen danach in jedes Wohnzimmer, das Material trage ich hoch. So gibt es keine Saison, in der der Plan pausiert.",
      },
      {
        title: "Erst das Ziel, dann der Plan, dann die Zahlen",
        body: "Am Anfang steht das kostenlose Erstgespräch: Was willst du erreichen, was macht dein Körper mit, wie sieht deine Woche aus. Danach ein Technik-Check und ein Plan mit meist zwei Einheiten pro Woche. Jede Einheit wird dokumentiert, alle vier bis sechs Wochen vergleichen wir Kraftwerte, Umfänge und Gewichtstrend. Was sich nicht bewegt, wird geändert. Du bezahlst für Ergebnisse, nicht für Gesellschaft beim Schwitzen.",
      },
      {
        title: "Termine, die zu Porzer Arbeitszeiten passen",
        body: "Viele Anfragen aus Finkenberg und dem Rest von Porz kommen von Leuten mit frühen oder wechselnden Arbeitszeiten. Deshalb lege ich Termine ab 6:30 Uhr und auch in den frühen Nachmittag, nicht nur auf den Feierabend. Wer lieber auswärts trainiert: Die Stadtbahnlinie 7 hält direkt im Veedel, Studio-Termine lassen sich mit den Einheiten vor Ort kombinieren. Für längere Ausdauerblöcke weichen wir ins Grüne nach Gut Leidenhausen im Nachbarveedel Eil aus.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Finkenberg?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan per App und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch kostet in beiden Fällen nichts.",
      },
      {
        q: "Wo genau trainieren wir in Finkenberg?",
        a: "Auf den Grünflächen zwischen den Wohnhäusern, bei schlechtem Wetter im Treppenhaus und in deiner Wohnung. Das Material bringe ich mit. Studio-Termine sind über die Linie 7 gut kombinierbar.",
      },
      {
        q: "Meine Wohnung ist klein. Reicht das für Krafttraining?",
        a: "Ja. Für Kurzhanteln, Bänder und Körpergewichtsübungen reichen wenige freie Quadratmeter. Die platzhungrigen Anteile wie Ausdauer und Sprünge verlegen wir nach draußen oder ins Treppenhaus.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Wo fange ich an?",
        a: "Beim kostenlosen Erstgespräch und dem Technik-Check danach. Der Plan startet auf deinem tatsächlichen Stand, nicht auf dem von früher, und steigt von dort kontrolliert.",
      },
    ],
  },

  "wahn/personal-training": {
    answer:
      "Personal Training in Köln-Wahn plane ich um deinen Schichtplan, nicht um einen festen Wochentag: Die Termine rotieren mit deiner Schichtwoche, trainiert wird bei dir zu Hause oder draußen am Rand der Wahner Heide. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Wahn: Termine, die mit deinem Schichtplan rotieren, Training zu Hause oder am Rand der Wahner Heide. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Der feste Trainingstag ist der Feind des Schichtplans",
        body: "Wahn liegt ein paar Minuten vom Flughafen Köln/Bonn, und viele der 7.263 Menschen hier arbeiten dort oder im Umfeld: Frühschicht, Spätschicht, Nachtschicht, oft im wöchentlichen Wechsel. Das übliche Studio-Modell mit dem festen Dienstagstermin bricht an so einem Kalender nach drei Wochen zusammen. Deshalb drehe ich es um: Wir planen die Trainingswoche jeweils dann, wenn dein Schichtplan steht. Nach der Frühschicht am Nachmittag, vor der Spätschicht am Vormittag, in der Nachtschichtwoche kürzer und leichter.",
      },
      {
        title: "Die Belastung folgt der Schicht, nicht nur dem Plan",
        body: "Eine Nachtschichtwoche ist für den Körper nicht dieselbe Woche wie eine Frühschichtwoche, auch wenn der Kalender das behauptet. Schlafmangel senkt die Belastbarkeit, und wer dann stur sein schwerstes Programm durchzieht, sammelt Wehwehchen statt Fortschritt. Ich passe die Last an: schwere Einheiten in die erholten Wochen, Technik und moderates Volumen in die harten. Über Monate gerechnet kommst du so weiter als mit jedem starren Plan, weil keine Woche komplett ausfällt.",
      },
      {
        title: "Trainiert wird vor Ort, ohne zusätzliche Fahrt",
        body: "Nach einem Arbeitstag mit Anfahrt will kaum jemand noch eine dritte Strecke fahren. Also trainieren wir in Wahn: bei dir zu Hause mit mitgebrachten Hanteln und Bändern oder draußen, wo das Veedel an die Wahner Heide grenzt, mit festen Wegen für Aufwärmen und Ausdauerblöcke. Wer gezielt an die Langhantel will, kombiniert Termine im Studio dazu. Die S-Bahn hält in Porz-Wahn, auch das lässt sich in den Wochenplan einbauen.",
      },
      {
        title: "Dokumentiert wird alles, versprochen wird nichts Falsches",
        body: "Jede Einheit steht im Protokoll: Übung, Last, Wiederholungen, dazu alle vier bis sechs Wochen Umfänge und Kraftwerte im Vergleich. So siehst du schwarz auf weiß, ob das Modell mit den rotierenden Terminen bei dir trägt. Das Erstgespräch ist kostenlos und klärt Ziel, Gesundheit und deinen tatsächlichen Kalender. Mehr als zwei geführte Einheiten pro Woche brauchst du für den Anfang nicht.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Wahn?",
        a: "50€ pro 1-zu-1 Stunde, das Online Coaching mit Trainingsplan per App und wöchentlichen Check-ins ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite im Wechseldienst. Funktioniert regelmäßiges Training da überhaupt?",
        a: "Ja, wenn die Termine mit dem Schichtplan rotieren statt gegen ihn. Wir planen wochenweise, sobald dein Dienstplan steht, und passen die Trainingslast an die Schichtart an.",
      },
      {
        q: "Wo trainieren wir in Wahn?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen am Rand der Wahner Heide. Studio-Termine für Langhanteltraining lassen sich dazunehmen.",
      },
      {
        q: "Trainierst du auch früh morgens oder am Vormittag?",
        a: "Ja. Termine lege ich ab 6:30 Uhr und über den ganzen Tag. Gerade vor einer Spätschicht ist der Vormittag oft das beste Fenster.",
      },
    ],
  },

  "altstadt-nord/rueckentraining": {
    answer:
      "Rückentraining in der Kölner Altstadt-Nord für beide Arbeitstage des Zentrums: den sitzenden am Bildschirm und den stehenden in Laden und Gastronomie. Zweimal pro Woche gezielte Kraftarbeit, auch als kompakte Einheit nahe deinem Arbeitsplatz. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Rückentraining in Köln Altstadt-Nord: Kraftaufbau für Büro-Rücken und Steh-Rücken aus Handel und Gastronomie, Einheiten nahe dem Arbeitsplatz. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Das Zentrum hat zwei Sorten Rücken",
        body: "In der Altstadt-Nord arbeiten täglich weit mehr Menschen, als die 18.617 Einwohner vermuten lassen, und ihre Rücken erzählen zwei verschiedene Geschichten. Die eine kommt vom Sitzen: acht Stunden Bildschirm, runde Schultern, steife Hüfte. Die andere kommt vom Stehen und Heben in Einzelhandel und Gastronomie rund um Hauptbahnhof, Breslauer Platz und die Ringe: müde Lendenwirbelsäule, einseitige Tragemuster, Schmerzen am Abend. Beide brauchen Kraft, aber nicht an denselben Stellen, und genau da setzt der Plan an.",
      },
      {
        title: "Sitz-Rücken und Steh-Rücken trainieren verschieden",
        body: "Beim Sitz-Rücken arbeiten wir vor allem gegen die Haltung: Zugübungen für den oberen Rücken, Hüftstreckung, Rumpfspannung. Beim Steh-Rücken geht es um Entlastung durch Kraft: eine belastbare hintere Kette, sauberes Hebemuster für Kisten und Tabletts, Gesäß und Beine, die dem unteren Rücken Arbeit abnehmen. Im kostenlosen Erstgespräch und beim Bewegungs-Check sortieren wir, welches Muster bei dir überwiegt. Die meisten im Zentrum haben eine Mischung aus beidem.",
      },
      {
        title: "Die Einheit passt zwischen zwei Arbeitsblöcke",
        body: "Wer im Zentrum arbeitet, hat selten Lust, nach Feierabend noch quer durch die Stadt zu fahren. Deshalb lege ich Einheiten dorthin, wo dein Tag ohnehin stattfindet: kompakte 45 bis 60 Minuten vor der Schicht, in der Mittagspause oder direkt danach, draußen in der Grünanlage am Theodor-Heuss-Ring, am Rheinufer oder bei dir zu Hause. Material bringe ich mit. Für die Tage dazwischen bekommst du ein kurzes Programm von zehn Minuten, das ohne Geräte in jede Frühstückspause passt.",
      },
      {
        title: "Was das Training kann und was zum Arzt gehört",
        body: "Krafttraining ist das wirksamste Mittel gegen den unspezifischen Rückenschmerz aus Alltag und Arbeit, und genau den trainieren wir. Ausstrahlende Schmerzen ins Bein, Taubheit oder ein frischer Bandscheibenvorfall gehören zuerst in ärztliche Abklärung, danach baue ich das Training auf dem Befund auf. Diese Grenze spreche ich im Erstgespräch offen an, denn ein Trainer, der Diagnosen stellt, ist keiner.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in der Altstadt-Nord?",
        a: "Die 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Plan und wöchentlichen Check-ins beginnt bei 150€ im Monat, das Erstgespräch ist immer kostenlos.",
      },
      {
        q: "Ich stehe den ganzen Tag im Laden. Hilft Krafttraining auch da?",
        a: "Ja. Ein belastbarer unterer Rücken, kräftiges Gesäß und ein sauberes Hebemuster nehmen dem Steh-Tag die Spitzen. Die meisten spüren nach vier bis sechs Wochen einen klaren Unterschied am Abend.",
      },
      {
        q: "Geht eine Einheit in der Mittagspause?",
        a: "Ja, 45 Minuten reichen für eine vollwertige Rücken-Einheit. Wir trainieren in der Grünanlage am Theodor-Heuss-Ring, am Rheinufer oder bei dir, ohne lange Wege.",
      },
      {
        q: "Ich hatte schon einmal einen Bandscheibenvorfall. Könnt ihr trotzdem trainieren?",
        a: "Ja, nach ärztlicher Freigabe. Der Plan startet dann auf dem Befund, mit kontrollierten Progressionen statt Experimenten. Ohne Freigabe trainiere ich in so einem Fall nicht.",
      },
    ],
  },

  "bilderstoeckchen/rueckentraining": {
    answer:
      "Rückentraining in Köln-Bilderstöckchen für Rücken, die arbeiten: Handwerk, Lager, Pflege, Fahrdienst. Zweimal pro Woche Kraftaufbau gegen einseitiges Heben und Tragen, mit Terminen ab 6:30 Uhr vor der Frühschicht und dem Blücherpark für den Ausgleich. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Rückentraining in Köln-Bilderstöckchen: Kraftaufbau für körperlich Arbeitende, sauberes Hebemuster, Termine ab 6:30 Uhr, Blücherpark als Ausgleich. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Hier schmerzt der Rücken nicht vom Sitzen",
        body: "Bilderstöckchen ist ein Veedel, in dem viele der 15.516 Einwohner körperlich arbeiten: auf Baustellen, im Lager, in der Pflege, am Steuer. Dieser Rücken hat ein anderes Problem als der Bürorücken, der eine Etage weiter in den Ratgebern steht. Er bewegt sich den ganzen Tag, aber immer gleich: dieselbe Seite, die trägt, dieselbe gebückte Haltung, dieselben Hebewege. Die Lösung ist nicht Schonung, sondern Kraft an den Stellen, die der Job einseitig lässt.",
      },
      {
        title: "Stark machen, was der Job vernachlässigt",
        body: "Wer beruflich hebt, hat meist eine kräftige Vorderseite und eine vernachlässigte Rückseite. Im Training drehen wir das Verhältnis: Hüftstreckung und Gesäß als Fundament, der obere Rücken als Gegenspieler zur gebückten Arbeit, die seitliche Rumpfmuskulatur gegen das einseitige Tragen. Dazu schauen wir dein tatsächliches Hebemuster an, mit Lasten, wie sie im Job vorkommen, nicht mit Luftgewichten. Ziel ist, dass der Feierabendschmerz in ein paar Wochen nicht mehr der Normalzustand ist.",
      },
      {
        title: "Termine vor der Frühschicht, Training ohne Umweg",
        body: "Wer um sieben auf der Baustelle oder Station steht, trainiert nicht um 19 Uhr mit frischem Kopf. Deshalb beginnen meine Termine in Bilderstöckchen ab 6:30 Uhr, und auch der frühe Nachmittag nach der Frühschicht ist ein gutes Fenster. Trainiert wird bei dir zu Hause mit mitgebrachtem Material oder draußen am Blücherpark, der direkt am Veedel liegt. Für die trainingsfreien Tage reicht dort eine zügige Runde, damit der Rücken Bewegung ohne Last bekommt.",
      },
      {
        title: "Erst prüfen, dann belasten",
        body: "Am Anfang steht das kostenlose Erstgespräch mit Bewegungs-Check: Wie hebst du, wo zwickt es, was sagt die Vorgeschichte. Unspezifische Schmerzen aus Belastung und Einseitigkeit trainieren wir direkt weg, dokumentiert in jedem Termin. Bei Warnsignalen wie Ausstrahlung ins Bein oder Taubheit schicke ich dich zuerst zum Arzt und baue das Training danach auf dem Befund auf. So bleibt das Training ein Werkzeug und wird kein Risiko.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Bilderstöckchen?",
        a: "50€ pro 1-zu-1 Stunde. Das Online Coaching mit Plan per App und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Ich arbeite körperlich. Ist Krafttraining dann nicht zu viel?",
        a: "Nein, es ist das Gegenmittel. Der Job belastet einseitig, das Training gleicht gezielt aus und macht die vernachlässigten Muskeln belastbar. Volumen und Last plane ich um deine Arbeitswoche.",
      },
      {
        q: "Wie früh kann ich trainieren?",
        a: "Ab 6:30 Uhr. Viele meiner Kunden aus körperlichen Berufen trainieren vor der Frühschicht oder am frühen Nachmittag danach.",
      },
      {
        q: "Brauche ich dafür ein Studio?",
        a: "Nein. Ich bringe Hanteln, Bänder und Bank mit zu dir, und für Ausgleichsbewegung liegt der Blücherpark direkt vor der Tür. Studio-Termine lassen sich ergänzen, wenn du schwerer heben willst.",
      },
    ],
  },
  "riehl/personal-training": {
    answer:
      "Personal Training in Köln-Riehl: 1-zu-1 bei dir zu Hause oder draußen am flachen Rheinufer zwischen Zoobrücke und Niehl, mit einem Plan, der Kraft und Gleichgewicht gezielt aufbaut. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Riehl: Training zu Hause oder am Rheinufer Riehl, Kraftaufbau in jedem Alter, feste Termine. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Veedel zwischen Rhein, Flora und Zoo",
        body: "Riehl ist schmal geschnitten: 12.020 Menschen auf 2,39 km², eingerahmt vom Rheinufer auf der einen und der Flora mit dem Botanischen Garten auf der anderen Seite. Für dein Training heißt das: die Wege sind kurz. Vom größten Teil des Veedels bist du in wenigen Minuten zu Fuß am Wasser. Dort ist das Ufer flach und übersichtlich, ich kann Geh- und Laufintervalle sauber steuern und du musst für dein Training weder Auto noch Bahn nehmen.",
      },
      {
        title: "Kraft ist die beste Vorsorge, nicht nur Bewegung",
        body: "In Riehl fragen mich überdurchschnittlich oft Menschen an, die 55, 60 oder älter sind und merken, dass Spazierengehen allein nicht reicht. Die ehrliche Antwort: Muskelkraft und Gleichgewicht entscheiden darüber, wie selbstständig du in zehn Jahren bist, und beides lässt sich in jedem Alter trainieren. Wir arbeiten mit einfachen, sicheren Grundübungen, die Last steigt langsam und kontrolliert. Es geht nicht um Rekorde, sondern darum, dass Treppen, Einkäufe und das Aufstehen vom Boden leicht bleiben.",
      },
      {
        title: "Training dort, wo du dich sicher fühlst",
        body: "Viele meiner Einheiten in Riehl finden in der Wohnung statt: Ich bringe das nötige Material mit, mehr als ein freier Bereich von wenigen Quadratmetern ist nicht nötig. Wer lieber rausgeht, trainiert mit mir am Rheinufer oder auf den ruhigen Wegen Richtung Flora. Du bekommst feste, wiederkehrende Termine mit derselben Uhrzeit, denn ein Plan funktioniert nur, wenn er zur Woche passt und nicht jedes Mal neu verhandelt wird.",
      },
      {
        title: "Was am Anfang steht",
        body: "Im kostenlosen Erstgespräch schauen wir uns an, wo du stehst: Beweglichkeit, Kraft, Gleichgewicht, eventuelle Vorgaben vom Arzt. Daraus baue ich einen Plan mit ein bis zwei geführten Einheiten pro Woche und kurzen Übungen für die Tage dazwischen. Alle paar Wochen prüfen wir nach: Was früher schwer war, muss leichter geworden sein. Wenn nicht, ändere ich den Plan und nicht du deine Erwartungen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Riehl?",
        a: "Eine 1-zu-1 Stunde kostet 50€, bei dir zu Hause oder draußen im Veedel. Das Online Coaching mit Plan und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Ich bin über 60 und lange raus. Geht das trotzdem?",
        a: "Ja, gerade dann. Wir starten mit einem ruhigen Check und Übungen, die zu deinem heutigen Stand passen. Krafttraining wirkt in jedem Alter, die Steigerung ist nur behutsamer geplant.",
      },
      {
        q: "Wo trainieren wir in Riehl?",
        a: "Bei dir zu Hause mit mitgebrachtem Material oder draußen am Rheinufer Riehl und auf den Wegen Richtung Flora. Was besser passt, legen wir im Erstgespräch fest.",
      },
      {
        q: "Wie schnell merke ich etwas?",
        a: "Die meisten spüren nach vier bis sechs Wochen einen klaren Unterschied bei Treppen und Alltagswegen. Gemessen wird trotzdem: Wiederholungen, Gewichte und Gleichgewichtstests sagen mehr als das Gefühl an einem einzelnen Tag.",
      },
    ],
  },

  "altstadt-sued/athletiktraining": {
    answer:
      "Athletiktraining in der Kölner Südstadt nutzt, was das Veedel schon hat: den Inneren Grüngürtel als messbare Runde für Intervalle und das Rheinufer am Rheinauhafen für Sprints und Schnellkraft. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln Altstadt-Süd: Intervalle im Inneren Grüngürtel, Sprints am Rheinauhafen, Feierabend-Einheiten mit Messwerten. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Der Grüngürtel ist deine Bahn, nicht nur deine Kulisse",
        body: "Altstadt-Süd hat 27.764 Einwohner auf 2,36 km² und kaum freie Sportflächen, aber der Innere Grüngürtel zieht sich direkt am Veedel entlang. Das Entscheidende daran: die Abschnitte dort lassen sich wiederholen. Gleiche Strecke, gleiche Bedingungen, Woche für Woche. So werden aus Läufen Messwerte. Wenn dein 400-Meter-Abschnitt nach sechs Wochen bei gleichem Puls schneller ist, weißt du, dass das Training arbeitet und nicht nur müde macht.",
      },
      {
        title: "Schnellkraft am Wasser statt im Gerätepark",
        body: "Für Sprints, Richtungswechsel und Sprungkraft gehen wir ans Rheinufer rund um den Rheinauhafen: breite, ebene Flächen, dazu Rampen und Absätze für Antritte bergauf. Das ersetzt keinen Kraftraum, deshalb gehört eine Studio-Einheit mit Langhantel dazu, wenn dein Ziel mehr Grundkraft verlangt. Aber Explosivität, Tempo und saubere Mechanik entstehen draußen, wo Platz ist, und beides liegt in der Südstadt vor deiner Tür.",
      },
      {
        title: "Nach Feierabend, wenn das Veedel voll wird",
        body: "Die meisten Anfragen aus Altstadt-Süd kommen von Berufstätigen zwischen 25 und 45, die abends trainieren wollen, oft nach Jahren Vereinspause. Genau dafür plane ich: Einheiten ab 17 Uhr, Treffpunkt an deiner Haustür oder direkt am Grüngürtel, 60 Minuten inklusive Aufwärmen. Im Sommer weichen wir den vollsten Wiesen aus, im Winter verlegen wir die Kraftanteile nach drinnen. Der Plan folgt deinem Kalender, nicht umgekehrt.",
      },
      {
        title: "Was Athletiktraining hier konkret bringt",
        body: "Du wirst schneller und stabiler für deinen Sport, ob Fußball im Verein, Tennis oder die erste Laufserie. Und du wirst belastbarer im Alltag: Sprunggelenke, Knie und Rumpf halten mehr aus, wenn sie gezielt vorbereitet sind. Alle vier bis sechs Wochen stehen Tests an, Sprintzeit, Sprunghöhe, der Grüngürtel-Abschnitt. Danach entscheiden Zahlen, wie es weitergeht.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in der Südstadt?",
        a: "50€ pro 1-zu-1 Stunde. Wer zusätzlich einen Wochenplan mit Check-ins will, nimmt das Online Coaching ab 150€ im Monat dazu. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo genau trainieren wir in Altstadt-Süd?",
        a: "Intervalle und Lauftechnik im Inneren Grüngürtel, Sprints und Sprungkraft am Rheinufer beim Rheinauhafen, Grundkraft bei Bedarf im Studio. Treffpunkt ist deine Haustür oder der Trainingsort.",
      },
      {
        q: "Ich spiele nur hobbymäßig Fußball. Lohnt sich das?",
        a: "Ja. Die meisten Verletzungen im Hobbysport passieren, weil Antritt und Stopp nie trainiert wurden. Zwei Einheiten pro Woche über drei Monate machen einen messbaren Unterschied in Tempo und Stabilität.",
      },
      {
        q: "Was passiert bei Regen?",
        a: "Trainiert wird trotzdem, nur anders: Kraft- und Technikanteile wandern nach drinnen, kurze intensive Außenblöcke bleiben. Ausfallen lasse ich Einheiten nicht, verschieben geht bis 24 Stunden vorher.",
      },
    ],
  },

  "hoehenberg/personal-training": {
    answer:
      "Personal Training in Köln-Höhenberg: 1-zu-1 bei dir zu Hause oder auf der Merheimer Heide am Westrand des Veedels, mit einem Plan, der dich wieder belastbar macht, für Sport, Schicht und Alltag. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Höhenberg: Training zu Hause oder auf der Merheimer Heide, wieder fit werden im Fußball-Veedel. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Im Veedel des Sportparks wird über Fitness nicht geredet, sondern gespielt",
        body: "Höhenberg ist das Zuhause des Sportpark Höhenberg, hier spielt Viktoria Köln. Viele, die mich aus dem Veedel anfragen, haben selbst eine Fußball- oder Sportvergangenheit: früher Verein, dann Job, Familie, Pause. Der Körper erinnert sich an vieles, aber nicht an alles. Genau da setze ich an: Wir bauen erst die Basis wieder auf, Rumpf, Hüfte, Sprunggelenke, bevor es wieder schnell wird. Wer direkt wieder aufs Tempo von damals geht, holt sich die Zerrung, nicht die Form.",
      },
      {
        title: "Die Heide beginnt, wo Höhenberg aufhört",
        body: "Am östlichen Rand des Veedels liegt die Merheimer Heide, von den meisten Straßen Höhenbergs in wenigen Minuten erreichbar. Für dein Training ist sie der Platz für alles, was Raum braucht: Läufe, Intervalle, Übungen im Gehen und Springen. Die Kraftarbeit dagegen passiert dort, wo du wohnst. Ich bringe Material mit, ein paar freie Quadratmeter in der Wohnung reichen, auch in den Geschossbauten der Germaniasiedlung muss niemand erst einen Hobbyraum freiräumen.",
      },
      {
        title: "Termine, die eine Schichtwoche überleben",
        body: "Höhenberg arbeitet zu allen Uhrzeiten: Pflege, Handwerk, Logistik, Einzelhandel. Ein Trainingsplan, der nur den Dienstagabend kennt, scheitert hier in der zweiten Woche. Deshalb lege ich die Termine mit dir pro Woche neu, passend zur Schicht, und die Einheiten sind so gebaut, dass auch eine einzelne Stunde zählt. Dazu bekommst du zwei kurze Eigenprogramme von 15 bis 20 Minuten, die unabhängig von der Uhrzeit funktionieren.",
      },
      {
        title: "Messbar besser in zwölf Wochen",
        body: "Wir starten mit einem Check: Beweglichkeit, Grundkraft, Ausdauer. Danach trainierst du ein- bis zweimal pro Woche mit mir und einmal allein. Nach zwölf Wochen wird nachgemessen, mit denselben Tests wie am Anfang. Das Ziel formulierst du: wieder beim Betriebsturnier mitspielen, die Treppe zur Wohnung ohne Pause, zehn Kilo weniger auf der Waage. Mein Job ist, dass der Weg dahin in deine echte Woche passt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Höhenberg?",
        a: "50€ pro 1-zu-1 Stunde, bei dir zu Hause oder auf der Merheimer Heide. Online Coaching mit Wochenplan gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Wo fangen wir an?",
        a: "Mit einem ehrlichen Check statt mit Ehrgeiz. Die ersten Wochen gehören Rumpf, Gelenken und Technik. Erst wenn die Basis trägt, steigen Tempo und Last. So bleibt der Wiedereinstieg verletzungsfrei.",
      },
      {
        q: "Brauche ich Geräte oder einen Studio-Vertrag?",
        a: "Nein. Ich bringe das Material für das Training zu Hause mit. Ein Studio nehmen wir nur dazu, wenn dein Ziel schwere Langhantelarbeit verlangt, und auch das erst später.",
      },
      {
        q: "Klappt das Training auch mit Wechselschicht?",
        a: "Ja. Die Termine werden pro Woche gelegt, nicht als fester Wochentag. Frühschicht-Wochen trainieren nachmittags, Spätschicht-Wochen vormittags. Der Plan rechnet die Schicht ein, statt an ihr zu scheitern.",
      },
    ],
  },

  "lindenthal/rueckentraining": {
    answer:
      "Rückentraining in Köln-Lindenthal heißt gezieltes Krafttraining gegen die zwei häufigsten Rücken des Veedels: den vornübergebeugten aus Klinik und Praxis und den eingesunkenen vom Schreibtisch. 1-zu-1 bei dir zu Hause oder draußen am Stadtwald, 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "Rückentraining in Köln-Lindenthal: Kraftaufbau gegen Schmerzen vom Stehen in Klinik und Praxis oder vom Schreibtisch. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Lindenthals Rücken arbeiten vornüber",
        body: "Mit der Uniklinik und den vielen Praxen drumherum ist Lindenthal ein Veedel der Gesundheitsberufe, und deren Rücken leiden anders als der Büro-Rücken: stundenlanges Stehen, leicht vornübergebeugt am Bett, am Stuhl, am OP-Tisch, dazu Heben in ungünstigen Winkeln. Was dagegen hilft, ist nicht Schonung, sondern Kraft in der Gegenrichtung: Streckmuskulatur, Gesäß, hintere Schulter. Genau die trainieren wir, mit Zugübungen und Hüftstreckung, dosiert und steigerbar.",
      },
      {
        title: "Der Schreibtisch-Rücken bekommt ein anderes Programm",
        body: "Die zweite Gruppe in Lindenthal sitzt: Uni, Kanzleien, Homeoffice in der Altbauwohnung. Hier ist das Muster umgekehrt, die Hüfte verkürzt, der obere Rücken rundet ein, der Nacken übernimmt die Haltearbeit. Deshalb gibt es bei mir kein Einheitsprogramm gegen Rückenschmerzen. Im Erstgespräch schauen wir, welches Muster deines ist, und der Plan greift dort an. Zwei Menschen aus derselben Straße können bei mir zwei komplett verschiedene Pläne haben.",
      },
      {
        title: "Der Stadtwald hilft, aber er trainiert nicht",
        body: "Lindenthal hat mit dem Stadtwald und dem Aachener Weiher viel Platz zum Gehen, und Gehen tut einem gereizten Rücken gut: Durchblutung, Rhythmus, Stressabbau. Nur baut es keine Kraft auf. Die Kombination funktioniert so: zwei kurze Krafteinheiten pro Woche, die die Ursache angehen, plus deine Runden im Wald als aktive Erholung. Wer nur spaziert, verwaltet den Schmerz. Wer zusätzlich trainiert, wird ihn in den meisten Fällen los.",
      },
      {
        title: "Klare Grenzen, klarer Ablauf",
        body: "Rückentraining bei mir ist Training, keine Therapie. Bei Ausstrahlung ins Bein, Taubheit oder nach frischen Bandscheibenvorfällen gehört die erste Entscheidung zum Arzt, danach arbeite ich auf Wunsch mit dessen Vorgaben. Der Ablauf: Erstgespräch mit Bewegungs-Check, dann vier bis sechs Wochen Grundaufbau mit zwei Einheiten pro Woche, dann wird nachgemessen. Die meisten spüren in dieser Zeit den Unterschied beim Aufrichten, Stehen und Schlafen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Lindenthal?",
        a: "50€ pro 1-zu-1 Stunde, bei dir zu Hause oder draußen am Stadtwald. Online Coaching mit Plan und Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite in der Pflege und stehe den ganzen Tag. Hilft Training da überhaupt?",
        a: "Ja, gerade da. Stehen und Heben überlasten einen Rücken, der zu wenig Kraft in Streckern und Gesäß hat. Zwei gezielte Einheiten pro Woche bauen genau diese Kraft auf, die Beschwerden gehen in den meisten Fällen deutlich zurück.",
      },
      {
        q: "Reichen die Rückenübungen aus dem Internet nicht?",
        a: "Die Übungen sind selten das Problem, die Auswahl ist es. Ein Steh-Rücken braucht andere Schwerpunkte als ein Sitz-Rücken, und ohne saubere Ausführung reizt manche Übung mehr, als sie hilft. Genau das stelle ich im 1-zu-1 ein.",
      },
      {
        q: "Wann sollte ich zuerst zum Arzt?",
        a: "Bei Schmerzen, die ins Bein ausstrahlen, bei Taubheit oder Lähmungsgefühl, nach Unfällen und bei frischen Bandscheibenvorfällen. Mit ärztlichem Okay baue ich das Training danach entsprechend auf.",
      },
    ],
  },

  "longerich/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Longerich funktioniert auch mit Pendler-Kalender: zwei dichte Krafteinheiten pro Woche mit geplanter Steigerung schlagen vier halbherzige Studiobesuche. 1-zu-1 bei dir zu Hause oder im Studio, 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Longerich: zwei effektive Krafteinheiten pro Woche für Pendler, Progression nach Zahlen, Eiweiß im Alltag. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Zwei Einheiten reichen, wenn sie zählen",
        body: "Longerich ist ein Pendler-Veedel: S11 oder Linie 15 in die Stadt, abends zurück, dazwischen bleibt wenig. Die gute Nachricht für den Muskelaufbau: Mehr als zwei harte Krafteinheiten pro Woche braucht ein Einsteiger gar nicht, wenn Übungsauswahl und Steigerung stimmen. Was nicht funktioniert, ist das Gegenteil, viermal hin, Maschinenrunde ohne Plan, immer dieselben Gewichte. Muskeln wachsen von Steigerung, nicht von Anwesenheit.",
      },
      {
        title: "Progression nach Zahlen: erst Wiederholungen, dann Gewicht",
        body: "Bei mir trainierst du mit einem Log. Jede Übung hat eine Zielspanne, zum Beispiel 6 bis 10 Wiederholungen. Schaffst du die obere Grenze in allen Sätzen, steigt beim nächsten Mal das Gewicht, und du arbeitest dich wieder hoch. Dieses einfache System entscheidet über Erfolg oder Stillstand, und es ist genau das, was in Jahren unbegleiteten Trainings meist fehlt. Nach acht Wochen vergleichen wir die Zahlen vom Start, nicht den Blick in den Spiegel bei gutem Licht.",
      },
      {
        title: "Ohne Essen wächst nichts",
        body: "Der zweite Hebel ist Eiweiß: rund 1,6 bis 2 Gramm pro Kilo Körpergewicht am Tag, verteilt auf die Mahlzeiten. Für einen Pendlertag heißt das konkret: ein eiweißreiches Frühstück vor der S-Bahn, ein planbares Mittagessen, abends die größte Portion. Wenn du es genauer willst, rechnet Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, deinen Bedarf durch und baut ihn in deine echten Tage ein, nicht in einen Muster-Speiseplan.",
      },
      {
        title: "Zuhause in Longerich oder im Studio",
        body: "Beides geht. Für die ersten Monate reicht Training zu Hause völlig, ich bringe Kurzhanteln und Widerstandsmaterial mit, und Longerichs Wohnlagen haben fast überall den Platz dafür. Schwere Langhantelarbeit, Kniebeuge und Kreuzheben mit echter Last, verlegen wir später ins Studio, wenn dein Fortschritt sie verlangt. Die Reihenfolge ist bewusst so herum: erst Technik und Gewohnheit, dann Eisen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Longerich?",
        a: "50€ pro 1-zu-1 Stunde, zu Hause oder im Studio. Online Coaching mit Trainingsplan und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wie lange dauert es, bis man Muskeln sieht?",
        a: "Kraftzuwachs merkst du nach drei bis vier Wochen, sichtbare Veränderung braucht bei konsequentem Training und passendem Eiweiß meist drei Monate. Deshalb messen wir Umfänge und Gewichte, die zeigen den Fortschritt früher als der Spiegel.",
      },
      {
        q: "Bin über 40, lohnt sich Muskelaufbau noch?",
        a: "Mehr denn je. Ab etwa 40 verliert der Körper ohne Training schleichend Muskelmasse. Krafttraining dreht das um, auch bei spätem Einstieg. Die Pläne unterscheiden sich kaum, nur Aufwärmen und Steigerungstempo sind angepasst.",
      },
      {
        q: "Muss ich dafür ins Fitnessstudio?",
        a: "Nein. Die ersten Monate funktionieren komplett zu Hause mit mitgebrachtem Material. Ins Studio gehen wir erst, wenn du an Lasten arbeitest, die sich mit Kurzhanteln nicht mehr abbilden lassen.",
      },
    ],
  },

  "nippes/personal-training": {
    answer:
      "Personal Training in Köln-Nippes kommt dorthin, wo dein Tag sowieso stattfindet: zu dir nach Hause, ins Nippeser Tälchen oder in den Johannes-Giesberts-Park, als feste 60 Minuten zwischen Job, Kita und Wilhelmplatz. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Nippes: 1-zu-1 zu Hause, im Tälchen oder im Johannes-Giesberts-Park, feste Termine für volle Wochen. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Veedel, das zu Fuß lebt, und ein Training, das das nutzt",
        body: "Nippes drängt 36.913 Menschen auf 2,98 km², und fast alles passiert hier ohne Auto: Markt auf dem Wilhelmplatz, Kita um die Ecke, Bahn an der Neusser Straße. Dein Training funktioniert genauso. Ich komme zu deiner Haustür, und trainiert wird in der Wohnung, im Nippeser Tälchen oder im Johannes-Giesberts-Park, je nachdem, was näher liegt und was der Plan gerade braucht. Kein Anfahrtsweg, kein Parkplatzsuchen, keine verlorene halbe Stunde vor und nach der Einheit.",
      },
      {
        title: "Die 60 Minuten, die im Familienkalender halten",
        body: "Die häufigste Anfrage aus Nippes kommt von Eltern zwischen 30 und 45: Der Sport ist seit dem ersten Kind weg, die Abende gehören der Familie, das Studio-Abo läuft ungenutzt. Meine Antwort ist ein fester Slot, der sich nach dem Familienplan richtet, morgens nach der Kita-Übergabe, mittags im Homeoffice-Fenster oder abends, wenn beide Eltern da sind. Eine Stunde, vorbereitet von mir, ohne dass du davor oder danach etwas organisieren musst.",
      },
      {
        title: "Erst die Grundlagen, dann dein Ziel",
        body: "Nach Jahren Pause starten wir nicht mit deinem alten Trainingsplan, sondern mit einem Check: Wie bewegen sich Hüfte und Schultern, wie stabil ist der Rumpf, wo steht die Ausdauer. Darauf baue ich die ersten sechs Wochen auf. Danach bekommt das Training deine Richtung: Kraft, Abnehmen, wieder schmerzfrei sitzen und tragen, oder einfach die Energie zurück, die zwischen Job und Kindern verloren ging. Gemessen wird regelmäßig, damit du den Fortschritt schwarz auf weiß siehst.",
      },
      {
        title: "Wenn die Woche platzt, fängt der Plan das auf",
        body: "Krankes Kind, Dienstreise, ausgefallene Betreuung: In Familienwochen ist nicht der Wille das Problem, sondern der Kalender. Deshalb bekommst du von mir neben den gemeinsamen Einheiten zwei kurze Programme für zu Hause, 15 bis 20 Minuten, machbar mit Kind im Nebenzimmer. Und ein Termin, der platzt, wird verschoben statt gestrichen. So überlebt das Training auch die Wochen, in denen sonst alles hinten runterfällt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Nippes?",
        a: "50€ pro 1-zu-1 Stunde, bei dir zu Hause oder draußen im Veedel. Online Coaching mit Plan und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo trainieren wir in Nippes?",
        a: "In deiner Wohnung mit mitgebrachtem Material, im Nippeser Tälchen oder im Johannes-Giesberts-Park. Den Ort legen wir nach Wohnlage und Trainingsphase fest, der Treffpunkt ist immer deine Haustür.",
      },
      {
        q: "Geht Training auch morgens vor der Arbeit?",
        a: "Ja. Gerade in Nippes sind die frühen Slots gefragt, direkt nach der Kita-Übergabe oder vor dem ersten Termin im Homeoffice. Auch Mittagsfenster funktionieren, die Einheit ist auf 60 Minuten von Haustür zu Haustür gebaut.",
      },
      {
        q: "Ich war seit Jahren nicht mehr im Training. Ist das ein Problem?",
        a: "Nein, das ist der Normalfall. Der Einstieg beginnt mit einem ruhigen Check und Übungen auf deinem heutigen Stand. Die Steigerung kommt aus dem Plan, nicht aus dem Druck der ersten Woche.",
      },
    ],
  },
  "rath-heumar/personal-training": {
    answer:
      "Personal Training in Köln-Rath/Heumar kommt zu dir: 1-zu-1 Einheiten bei dir zu Hause oder im Garten, mit festen Terminen, die nicht am Stau vor dem Autobahnkreuz hängen. Ob Abnehmen, Kraft oder Rücken legt das kostenlose Erstgespräch fest. Die Stunde kostet 50€.",
    metaDescription:
      "Personal Training in Köln-Rath/Heumar: 1-zu-1 bei dir zu Hause oder im Garten, feste Termine ohne Anfahrtsstress, Königsforst vor der Tür. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Training wartet zu Hause, nicht hinter dem Kreuz",
        body: "Rath/Heumar liegt am Autobahnkreuz Köln-Ost, und wer hier wohnt, pendelt oft mit dem Auto: morgens raus, abends im zähen Verkehr zurück. Ein Studiotermin um 19 Uhr auf der anderen Rheinseite verliert gegen so einen Tag regelmäßig. Deshalb drehe ich es um: Ich bin zum vereinbarten Termin bei dir, das Training beginnt in dem Moment, in dem du die Haustür aufmachst. Was wegfällt, ist genau der Teil, an dem gute Vorsätze in diesem Veedel scheitern, die zweite Fahrt des Tages.",
      },
      {
        title: "Haus und Garten reichen völlig aus",
        body: "Mit 11.833 Einwohnern auf 12,91 km² ist Rath/Heumar locker bebaut, viele wohnen im Einfamilien- oder Reihenhaus. Für das 1-zu-1 heißt das: Platz ist da. Im Wohnzimmer oder Hobbyraum arbeiten wir mit dem Material, das ich mitbringe, im Sommer wandert die Einheit in den Garten. Du brauchst nichts anzuschaffen und niemand schaut zu, was gerade beim Wiedereinstieg nach Jahren für viele der eigentliche Grund ist, es endlich anzugehen.",
      },
      {
        title: "Ein Ziel, ein Plan, alle vier Wochen der Beweis",
        body: "Am Anfang steht das Erstgespräch: was willst du erreichen, was macht dein Körper mit, wie sehen deine Wochen aus. Daraus wird ein Plan mit zwei festen Einheiten pro Woche, egal ob das Ziel weniger Gewicht, mehr Kraft oder ein belastbarer Rücken ist. Jede Einheit steht im Protokoll, alle vier Wochen vergleichen wir Zahlen und Umfänge. Bewegt sich nichts, ändere ich den Plan. Das ist der Unterschied zu einem Jahr Studiomitgliedschaft, das still ausläuft.",
      },
      {
        title: "Der Königsforst spielt die Nebenrolle, nicht die Hauptrolle",
        body: "Der Wald vor der Haustür ist das Pfund des Veedels, aber im Personal Training nutze ich ihn bewusst dosiert: lockere Geh- oder Laufeinheiten an den trainingsfreien Tagen, im Sommer einzelne Draußen-Termine am Waldrand. Die eigentliche Arbeit, saubere Kraftübungen mit Steigerung, passiert bei dir zu Hause unter Aufsicht. So ergänzen sich beide, statt dass das Spazierengehen das Training ersetzt und am Ende nichts messbar wird.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Rath/Heumar?",
        a: "Die 1-zu-1 Stunde kostet 50€, Anfahrt und Material sind enthalten. Online Coaching mit Plan per App und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Brauche ich Geräte zu Hause?",
        a: "Nein. Kurzhanteln, Kettlebell, Bänder und Matte bringe ich mit. Wenn du später eine eigene Grundausstattung willst, sage ich dir, was sich lohnt und was nicht, aber Voraussetzung ist es keine.",
      },
      {
        q: "Ich pendle und bin oft erst spät zurück. Wann trainieren wir?",
        a: "Termine lege ich auch früh am Morgen vor der Abfahrt oder später am Abend. Der Vorteil des Haustermins: es gibt keine zusätzliche Fahrt, also hält der Termin auch in vollen Wochen.",
      },
      {
        q: "Für welche Ziele passt das 1-zu-1?",
        a: "Abnehmen, Muskelaufbau, Rücken, allgemeine Fitness nach langer Pause. Das Erstgespräch klärt Ziel und Startpunkt, der Plan wird darauf geschrieben, nicht auf ein Schema.",
      },
      {
        q: "Trainieren wir auch im Königsforst?",
        a: "Ja, aber gezielt: lockere Ausdauer an freien Tagen und einzelne Einheiten am Waldrand im Sommer. Die Kraftarbeit bleibt bei dir zu Hause, weil sie Aufsicht und Steigerung braucht.",
      },
    ],
  },

  "humboldt-gremberg/personal-training": {
    answer:
      "Personal Training in Köln-Humboldt/Gremberg heißt bei mir: 1-zu-1 bei dir zu Hause oder im Gremberger Wäldchen, mit einem Plan, der zu einem Körper passt, der tagsüber schon arbeitet. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Humboldt/Gremberg: 1-zu-1 zu Hause oder im Gremberger Wäldchen, Ausgleich statt Zusatzlast für körperlich Arbeitende. 50€/Std.",
    sections: [
      {
        title: "Training für Leute, deren Körper schon arbeitet",
        body: "Humboldt/Gremberg trägt den Namen der alten Maschinenbauwerke, und bis heute wird hier viel mit den Händen gearbeitet: Handwerk, Logistik, Pflege, Schicht. Wer abends von so einem Tag kommt, braucht kein Programm, das einfach noch mehr Last draufpackt. Ich baue das Training als Ausgleich: die Muskeln stärken, die der Job vernachlässigt, Hüfte und Schultern beweglich halten, den Rücken belastbar machen statt müde. Das Ziel ist, dass du die Arbeit in zehn Jahren noch gut wegsteckst.",
      },
      {
        title: "Dein Wohnzimmer oder das Wäldchen, beides ist nah",
        body: "Einen eigenen Park hat das Veedel nicht, 15.111 Menschen wohnen hier auf 2,82 km² zwischen Gleisen und Hauptstraßen. Für das 1-zu-1 ist das kein Hindernis: Die Krafteinheiten machen wir in deiner Wohnung mit dem Material, das ich mitbringe, und für alles, was Platz und frische Luft braucht, liegt das Gremberger Wäldchen direkt an der südöstlichen Grenze. Der Fußweg dorthin ist das Aufwärmen, kein verlorener Termin-Anteil.",
      },
      {
        title: "Erst schauen, was der Alltag schon verbraucht",
        body: "Im Erstgespräch frage ich zuerst nach deinem Tag, nicht nach deinem Wunschgewicht. Wer acht Stunden hebt, trägt oder steht, hat andere schwache und andere überlastete Stellen als jemand am Schreibtisch, und der Plan muss das abbilden: weniger Volumen, gezieltere Übungen, mehr Arbeit an Haltung und Gegenbewegung. Gemessen wird trotzdem, Protokoll in jeder Einheit, alle vier Wochen der Vergleich. Auch Ausgleich muss nachweisbar wirken.",
      },
      {
        title: "Termine, die den Dienstplan überleben",
        body: "Feste Kurszeiten funktionieren mit Wechselschicht nicht, deshalb arbeite ich hier anders: zwei Einheiten pro Woche bleiben gesetzt, die Uhrzeit wandert mit deinem Dienstplan, auch früh morgens nach der Nacht oder am freien Vormittag. Wenn du lieber unter Leuten trainierst, nehmen wir mein Studio dazu, über die KVB von Kalk aus gut erreichbar. Entscheidend ist nicht der Ort, sondern dass der Rhythmus steht.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Humboldt/Gremberg?",
        a: "50€ pro 1-zu-1 Stunde, inklusive Anfahrt und Material. Online Coaching mit Plan per App gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite körperlich. Ist Krafttraining dann nicht zu viel?",
        a: "Richtig dosiert ist es das Gegenteil: Arbeit belastet einseitig, Training gleicht gezielt aus. Der Plan nimmt deine Arbeitsbelastung mit auf und setzt weniger, dafür präzisere Reize.",
      },
      {
        q: "Wo trainieren wir genau?",
        a: "Kraft in deiner Wohnung mit mitgebrachtem Material, Bewegungs- und Ausdauerteile im Gremberger Wäldchen oder auf den Poller Wiesen Richtung Rhein. Den Treffpunkt legen wir nach deinem Wohnort fest.",
      },
      {
        q: "Geht das auch mit Wechselschicht?",
        a: "Ja. Die beiden Wochentermine bleiben fest, die Uhrzeit wandert mit dem Dienstplan. Das funktioniert nur im 1-zu-1, und genau deshalb fragen viele Schichtarbeiter hier an.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Wo fangen wir an?",
        a: "Mit einem ruhigen Check im Erstgespräch: Beweglichkeit, Rumpf, Grundkraft. Danach starten wir auf deinem heutigen Stand. Die Steigerung kommt aus dem Protokoll, nicht aus Druck.",
      },
    ],
  },

  "seeberg/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Seeberg macht bei uns Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ihr Ansatz hier: gutes Essen ohne teure Spezialprodukte, ein Wochenplan rund um einen Einkauf, Portionen, die für die ganze Familie mitkochen. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Seeberg mit Natalie: Eiweiß ohne teure Produkte, ein Wochenplan um einen Einkauf, familientauglich, online betreut. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Gute Ernährung braucht kein Spezialregal",
        body: "Die Fitnessbranche verkauft gern das Gefühl, gesundes Essen sei teuer: Proteinriegel, Shakes, fertige Bowls. Natalie räumt damit zuerst auf. Quark, Eier, Hülsenfrüchte, Haferflocken, TK-Gemüse und Hähnchen decken den Eiweißbedarf zuverlässiger als jedes Pulverregal, zu einem Bruchteil des Preises. Für Seeberg plant sie genau damit: ein Kalorien- und ein Eiweißziel, erreicht mit Zutaten aus dem normalen Supermarkt, ohne dass der Wocheneinkauf teurer wird als vorher.",
      },
      {
        title: "Ein Plan, der mit der Siedlung rechnet",
        body: "Seeberg ist kompakt: 11.094 Menschen auf 1,78 km², großgewachsene Wohnzeilen aus den Sechziger- und Siebzigerjahren, eingekauft wird meist einmal gründlich im Zentrum nebenan. Natalies Wochenplan ist um diesen einen Einkauf gebaut, mit einer Liste, die genau das enthält, was die Woche braucht. Spontane Zusatzkäufe, bei denen die meisten Pläne kippen, fallen damit fast weg. Was im Korb liegt, ist schon die Entscheidung.",
      },
      {
        title: "Eine Küche, ein Topf, die ganze Familie",
        body: "Kaum jemand in Seeberg kocht nur für sich. Deshalb gibt es bei Natalie keine Extra-Diätgerichte neben dem Familienessen: der Plan nutzt dieselben Mahlzeiten für alle und steuert über deine Portion und deinen Teller. Du wiegst nicht jede Zutat, du hältst Eckwerte ein, die sie mit dir festlegt. So bleibt das Abendessen ein gemeinsames, und dein Ziel läuft trotzdem mit, Woche für Woche im Online-Check-in nachgehalten.",
      },
      {
        title: "Der Fühlinger See ist dein Bewegungskonto",
        body: "Essen regelt das Gewicht, Bewegung hält den Stoffwechsel und den Kopf im Spiel. Direkt hinter Seeberg liegt der Fühlinger See mit flachen, vermessenen Wegen: ideal für zügiges Gehen oder lockeres Laufen, das Natalie als festen Block in die Woche schreibt. Wer zusätzlich Kraft aufbauen will, kombiniert die Beratung mit Training bei mir, 1-zu-1 vor Ort oder per Plan in der App. Beides zusammen verändert mehr als jede Diät allein.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Seeberg?",
        a: "Sie ist Teil des Online Coachings ab 150€ im Monat: Kalorien- und Eiweißziel, Wochenplan mit Einkaufsliste und wöchentliche Check-ins mit Natalie. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich teure Produkte oder Shakes kaufen?",
        a: "Nein. Der Plan ist bewusst auf normale Supermarkt-Zutaten gebaut: Quark, Eier, Hülsenfrüchte, TK-Gemüse. Ein Shake kann praktisch sein, nötig ist er nicht.",
      },
      {
        q: "Funktioniert der Plan, wenn ich für die Familie koche?",
        a: "Genau dafür ist er gemacht: ein Essen für alle, dein Ziel wird über Portion und Zusammensetzung deines Tellers gesteuert, nicht über ein separates Diätgericht.",
      },
      {
        q: "Wie läuft die Beratung ab, wenn alles online ist?",
        a: "Erstgespräch per Video, dann bekommst du Ziele und Wochenplan. Einmal pro Woche gibt es einen kurzen Check-in: Gewicht im Wochenschnitt, was funktioniert hat, was angepasst wird.",
      },
      {
        q: "Hilft Abnehmen ohne Sport überhaupt?",
        a: "Abnehmen entscheidet die Energiebilanz, also ja. Bewegung wie zügiges Gehen am Fühlinger See und etwas Krafttraining sorgen aber dafür, dass Muskeln bleiben und das Ergebnis hält.",
      },
    ],
  },

  "altstadt-nord/online-coaching": {
    answer:
      "Online Coaching für Köln-Altstadt-Nord: Trainingsplan per App, wöchentliche Video-Check-ins und Ernährungssteuerung, ab 150€ im Monat. Der Plan reist mit, ob die Woche am Schreibtisch am Ring stattfindet oder im ICE ab Hauptbahnhof. Das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Altstadt-Nord: Plan per App, Video-Check-ins, Varianten für Hotelgym und Dienstreise. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Veedel mit dem Gleisanschluss",
        body: "Altstadt-Nord ist das Veedel von Dom und Hauptbahnhof: 18.617 Einwohner auf 2,46 km², dazu Büros, Kanzleien und Hotels. Wer hier wohnt oder arbeitet, sitzt öfter im Zug als fast jeder andere Kölner, Messen, Mandanten, Projekte in anderen Städten. Genau an diesen Wochen sterben Studioverträge. Online Coaching ist dafür gebaut: der Plan liegt in der App und gilt überall, die Kontrolle läuft über den wöchentlichen Check-in, nicht über deine Anwesenheit an einem festen Ort.",
      },
      {
        title: "Jede Übung mit Hotel-Variante",
        body: "Der Unterschied zu einem starren Plan steckt in den Varianten: jede Krafteinheit gibt es in deiner Stammversion, fürs Studio oder die Wohnung, und in einer Fassung für das, was ein Hotelgym typischerweise hergibt, Kurzhanteln, Kabelzug, Laufband. Du meldest kurz, wie die Woche aussieht, und bekommst die passende Fassung. So zählt die Reisewoche als Trainingswoche, statt als Loch im Log, und die Steigerung läuft weiter.",
      },
      {
        title: "Check-in, der in den Kalender passt",
        body: "Einmal pro Woche sprechen wir 15 bis 20 Minuten per Video: Trainingslog, Gewicht im Wochenschnitt, die nächste Woche. Der Termin passt in eine Mittagspause oder in die Bahnfahrt und wird verschoben statt gestrichen, wenn etwas dazwischenkommt. Gesteuert wird nach Zahlen, nicht nach Vorsätzen, und auch das Essen unterwegs bekommt Regeln statt Verbote: was im Bordbistro geht, was beim Geschäftsessen, was im Hotelfrühstück.",
      },
      {
        title: "Zu Hause liegt der Rhein vor der Tür",
        body: "In den Wochen, die du in Köln bist, holt sich das Programm die Ausdauer draußen: das Rheinufer für Läufe mit Strecke und Tempo, die Grünanlage am Theodor-Heuss-Ring für kurze Runden am Morgen. Wer die Grundübungen noch nie unter Aufsicht gelernt hat, startet ehrlicher mit ein paar 1-zu-1 Stunden im Studio und wechselt dann online. Auch die Mischung funktioniert, Plan online, einmal im Monat eine Technik-Stunde vor Ort.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching?",
        a: "Ab 150€ im Monat, mit Trainingsplan per App, wöchentlichem Video-Check-in, Ernährungssteuerung und Betreuung zwischen den Terminen. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich bin jede Woche in einer anderen Stadt. Funktioniert das wirklich?",
        a: "Ja, das ist der Kernfall: jede Einheit hat eine Variante für Hotelgym oder Körpergewicht, der Check-in-Termin wandert mit deinem Kalender. Entscheidend ist das Log, nicht der Ort.",
      },
      {
        q: "Brauche ich ein Fitnessstudio in der Innenstadt?",
        a: "Nein. Der Plan wird auf das geschrieben, was du wirklich hast: Studio, Wohnung oder Hotelgym. Fürs Cardio reichen Rheinufer und Theodor-Heuss-Ring vor der Tür.",
      },
      {
        q: "Wie wird das Essen auf Reisen gesteuert?",
        a: "Mit Entscheidungsregeln statt Rezepten: Richtwerte für Restaurant, Hotelfrühstück und unterwegs, dazu ein Kalorien- und Eiweißziel. Der Wochenschnitt auf der Waage zeigt, ob es trägt.",
      },
      {
        q: "Ich bin Anfänger. Kann ich direkt online starten?",
        a: "Meist ist es ehrlicher, Kniebeuge und Kreuzheben erst in wenigen 1-zu-1 Stunden zu lernen und dann zu wechseln. Das klären wir im kostenlosen Erstgespräch ohne Verkaufsdruck.",
      },
    ],
  },

  "dellbrueck/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Dellbrück richtet sich an ein Ausdauer-Veedel: Viele hier laufen Heide und Thielenbruch rauf und runter, Kraft fehlt trotzdem. Zwei geführte Krafteinheiten pro Woche, die deinen Kilometern nichts wegnehmen, dazu ein Eiweiß-Zielwert. 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Dellbrück: zwei Krafteinheiten pro Woche neben dem Laufen, Interferenz sauber geplant, Eiweiß-Zielwert. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Viel Ausdauer, wenig Muskeln: das Dellbrücker Muster",
        body: "Dellbrück bewegt sich: 21.954 Einwohner, die Dellbrücker Heide und der Thielenbruch als Laufflächen vor der Tür, dazu ein dichtes Vereinsleben. Die typische Anfrage von hier kommt deshalb nicht vom Sofa, sondern vom Läufer: ausdauernd, drahtig, aber die Arme bleiben dünn, die Haltung sackt, und beim Umzug fehlt schlicht Kraft. Das ist kein Talentproblem. Wer fast nur läuft, gibt dem Körper keinen Grund, Muskulatur zu bauen. Der Reiz fehlt, nicht die Veranlagung.",
      },
      {
        title: "Kraft und Kilometer vertragen sich, wenn man plant",
        body: "Die Sorge, Krafttraining mache langsam und steif, hält sich hartnäckig und stimmt nicht: zwei Krafteinheiten pro Woche verbessern bei Läufern sogar die Laufökonomie. Was es braucht, ist Reihenfolge und Abstand. Ich lege die Krafttage so, dass zwischen schwerem Beintraining und deinem langen Lauf genug Zeit liegt, und in Wochen mit Wettkampf oder Vereinsspiel wird die Kraft reduziert statt gestrichen. Deine Läufe durch Heide und Thielenbruch bleiben im Plan, sie bekommen nur Gesellschaft.",
      },
      {
        title: "Grundübungen, Protokoll, Eiweiß: mehr System ist es nicht",
        body: "Aufgebaut wird mit wenigen Grundübungen und sauberer Steigerung, jede Einheit steht im Protokoll, alle vier Wochen vergleichen wir Lasten und Umfänge. Dazu kommt die Stellschraube, die bei Ausdauersportlern am häufigsten klemmt: Essen. Wer viel läuft, verbrennt viel, und wer dann noch zu wenig Eiweiß isst, baut nichts auf. Du bekommst einen Eiweiß-Zielwert nach Körpergewicht und einen leichten Kalorienüberschuss, der die Kilometer einrechnet.",
      },
      {
        title: "Zu Hause, im Studio oder beides",
        body: "Trainiert wird, wo es für dich hält: bei dir zu Hause mit mitgebrachtem Material, in meinem Studio an der Langhantel oder gemischt. Dellbrück ist mit 9,95 km² weitläufig, viele wohnen im Haus mit Platz für eine kleine feste Trainingsecke, auch das lässt sich einrichten. Über die Linien 3 und 18 bist du beweglich, falls du lieber auswärts trainierst. Entscheidend ist der Rhythmus von zwei Einheiten pro Woche, nicht die Adresse.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Dellbrück?",
        a: "Die 1-zu-1 Stunde kostet 50€, Online Coaching mit Plan per App, Eiweiß-Zielwert und wöchentlichen Check-ins ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Macht Krafttraining mich als Läufer langsamer?",
        a: "Nein, richtig geplant eher schneller: mehr Schrittkraft und eine stabilere Haltung verbessern die Laufökonomie. Wichtig ist der Abstand zwischen schwerem Beintraining und langen Läufen, und den plane ich.",
      },
      {
        q: "Muss ich dafür weniger laufen?",
        a: "Meist nicht. Zwei Krafteinheiten passen neben drei Laufeinheiten, nur die Reihenfolge in der Woche wird geordnet. In Aufbauphasen mit hohem Laufpensum wird die Kraft dosiert statt gestrichen.",
      },
      {
        q: "Wie viel Eiweiß brauche ich wirklich?",
        a: "Als Richtwert 1,6 bis 2 Gramm pro Kilo Körpergewicht am Tag, bei viel Ausdauer eher am oberen Rand. Den genauen Zielwert und wie du ihn im Alltag erreichst, legen wir im Erstgespräch fest.",
      },
      {
        q: "Wie schnell sieht man Muskelaufbau?",
        a: "Kraftwerte steigen ab den ersten Wochen, sichtbare Veränderung braucht etwa ein Vierteljahr, bei Ausdauersportlern mit Defizit auch länger. Gemessen wird alle vier Wochen, versprochen wird nichts.",
      },
    ],
  },

  "suelz/online-coaching": {
    answer:
      "Online Coaching für Köln-Sülz: Trainingsplan per App, wöchentliche Video-Check-ins und Ernährungssteuerung, ab 150€ im Monat. Der Plan wird auf dein Studio und deine Woche geschrieben, ob Klausurphase, Praxisdienst oder Weiher-Runde. Das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Sülz: Plan per App für dein Studio und deine Woche, Video-Check-ins, Ernährungssteuerung. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "In Sülz fehlt kein Studio, es fehlt die Regie",
        body: "Sülz ist jung, dicht und sportlich: 36.851 Menschen auf gut fünf Quadratkilometern, die Uni nebenan, Fitnessstudios an fast jeder Ecke und die Läuferrunde am Decksteiner Weiher als Veedel-Klassiker. Die typische Anfrage von hier lautet nicht, wo kann ich trainieren, sondern: ich trainiere seit Jahren und verändere mich nicht. Online Coaching setzt genau da an. Du behältst dein Studio und deine Runde, neu sind Plan, Protokoll und jemand, der jede Woche draufschaut.",
      },
      {
        title: "Der Plan wird auf deine Geräte geschrieben",
        body: "Nach dem Erstgespräch sagst du mir, wo du trainierst, und der Plan wird auf genau diese Ausstattung gebaut, mit Video zu jeder Übung und klaren Vorgaben für Last und Wiederholungen. Kein Umrechnen, kein Improvisieren. Läufst du zusätzlich, bekommen Weiher-Runde oder Beethovenpark feste Blöcke mit Strecke und Tempo, damit Kraft und Laufen sich ergänzen statt zu kollidieren. Alles landet im Log, und das Log entscheidet über die nächste Woche.",
      },
      {
        title: "Semester, Praxis, Projekt: der Rhythmus darf schwanken",
        body: "Viele in Sülz leben in Phasen: Vorlesungszeit und Klausurenblock, Klinikdienst, Projektabgaben. Ein starrer Wochenplan verliert gegen solche Zyklen. Deshalb hat dein Plan Stufen, eine volle Woche, eine kurze Woche, eine Minimalwoche mit zwei Einheiten à 30 Minuten, und im Check-in legen wir fest, welche gilt. So übersteht das Training auch die Wochen, in denen früher alles ausgefallen wäre, und der Wiedereinstieg entfällt, weil du nie ganz raus warst.",
      },
      {
        title: "Check-in per Video, Technik per Clip",
        body: "Einmal pro Woche sprechen wir 15 bis 20 Minuten per Video: Log, Gewicht im Wochenschnitt, die nächste Woche. Zwischendrin schickst du Technik-Videos aus deinem Studio und bekommst kurzfristig Korrektur, so bleibt die Ausführung sauber, obwohl ich nicht danebenstehe. Wer Kniebeuge und Kreuzheben noch nie gelernt hat, startet ehrlicher mit wenigen 1-zu-1 Stunden bei mir und wechselt dann online. Das klärt das kostenlose Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching?",
        a: "Ab 150€ im Monat: Trainingsplan per App, wöchentlicher Video-Check-in, Ernährungssteuerung und Betreuung zwischen den Terminen. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe schon ein Studio in Sülz. Passt der Plan dazu?",
        a: "Ja, genau so herum läuft es: du nennst mir deine Geräte, der Plan wird darauf geschrieben. Wechselst du das Studio, wird er angepasst statt neu gekauft.",
      },
      {
        q: "Funktioniert das im Studium mit Klausurphasen?",
        a: "Dafür hat der Plan Stufen bis zur Minimalwoche mit zwei kurzen Einheiten. Im Check-in legen wir vorher fest, welche Woche gilt, damit die Klausurphase das Training verkleinert statt beendet.",
      },
      {
        q: "Ich laufe die Runde am Decksteiner Weiher. Bleibt die im Plan?",
        a: "Ja, sie bekommt Strecke und Tempo statt Gefühl und wird mit den Krafttagen so gelegt, dass sich beides ergänzt. Viele laufen die Runde nach ein paar Monaten messbar schneller.",
      },
      {
        q: "Woher weißt du, ob meine Technik stimmt?",
        a: "Über kurze Videos aus deinem Training, die du mir in der App schickst. Reicht das nicht, nehmen wir eine 1-zu-1 Technik-Stunde im Studio dazu, die kostet 50€.",
      },
    ],
  },

  "altstadt-nord/muskelaufbau": {
    answer:
      "Muskelaufbau in der Kölner Innenstadt scheitert selten am Willen, sondern am Abend: Überstunden, Termine, das Veedel voller Lokale. Deshalb verankere ich deine zwei Krafteinheiten am Morgen oder in der langen Mittagspause, nah an deinem Büro. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln Altstadt-Nord: zwei feste Krafteinheiten am Morgen oder mittags statt nach Feierabend, Eiweiß auch beim Essen auswärts. 50€/Std.",
    sections: [
      {
        title: "Warum der Feierabend hier der falsche Trainingsplatz ist",
        body: "Altstadt-Nord ist das Veedel von Hauptbahnhof, Ringbüros und Gastronomie: 18.617 Einwohner auf 2,46 km², dazu die vielen, die hier nur arbeiten. Wer seinen Muskelaufbau auf 18 Uhr legt, verliert ihn an genau diesen Kalender: ein Kundentermin, eine Einladung, ein Abend im Veedel, und die Woche hat wieder nur eine Einheit gesehen. Aufbau braucht aber Wiederholung über Monate. Also drehe ich die Logik um: deine Einheiten liegen dort, wo dir niemand etwas hineinlegt, morgens vor dem ersten Termin oder in einer verlängerten Mittagspause.",
      },
      {
        title: "Zwei Einheiten, die niemand verschieben kann",
        body: "Das Programm selbst ist unspektakulär und wirkt genau deshalb: Kniebeuge, Kreuzheben-Varianten, Drücken, Ziehen, in jeder Einheit protokolliert mit Gewicht und Wiederholungen. Gesteigert wird erst, wenn beides sauber steht. Vor der Arbeit reichen 60 Minuten inklusive Umziehen, wenn der Ablauf vorbereitet ist, und genau das ist mein Job: du kommst an, die Einheit steht, kein Suchen, kein Grübeln. Nach zwölf Wochen vergleichen wir die Protokolle, nicht den Spiegel zuerst.",
      },
      {
        title: "Eiweiß, wenn du ständig auswärts isst",
        body: "In der Innenstadt wird gegessen, wo gearbeitet wird: Kantine, Imbiss, Geschäftsessen. Die übliche Muskelaufbau-Regel, jede Mahlzeit selbst zu kochen, ist hier unrealistisch, also arbeiten wir mit dem Angebot. Du lernst, auf jeder Karte die Wahl mit 30 bis 40 Gramm Eiweiß zu finden, das Frühstück und den Abend zu Hause als sichere Bank zu setzen und den Rest gelassen zu nehmen. Für die Feinsteuerung ist Natalie da, unsere Ernährungsberaterin für Sport- und Fitnessernährung.",
      },
      {
        title: "Für wen das gedacht ist",
        body: "Für Leute, die zwischen Dom, Ring und Rhein arbeiten oder wohnen und seit Jahren sagen, dass sie eigentlich Muskeln aufbauen wollten. Alter und Einstiegsniveau sind zweitrangig, der Kalender ist das eigentliche Hindernis, und der lässt sich lösen. Im kostenlosen Erstgespräch schauen wir auf deine Woche und legen die zwei Fenster fest. Danach: 50€ pro 1-zu-1 Stunde oder Online Coaching ab 150€ im Monat, wenn du lieber mit Plan und Check-ins arbeitest.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln Altstadt-Nord?",
        a: "50€ pro 1-zu-1 Stunde. Wer selbstständig trainieren will, nimmt das Online Coaching ab 150€ im Monat mit Plan per App und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Reichen zwei Einheiten pro Woche wirklich für Muskelaufbau?",
        a: "Ja, wenn sie geplant sind und die Last dokumentiert steigt. Zwei konsequente Einheiten über sechs Monate schlagen vier chaotische Wochen, auf die drei Wochen Pause folgen.",
      },
      {
        q: "Ich habe morgens nur 60 Minuten. Geht das?",
        a: "Das ist genau das Format, mit dem ich in der Innenstadt arbeite. Die Einheit ist vorbereitet, aufgewärmt wird gezielt für die erste Übung, und die Protokollführung übernehme ich.",
      },
      {
        q: "Muss ich dafür Mahlzeiten vorkochen?",
        a: "Nein. Wir bauen den Eiweiß-Zielwert auf deinen Alltag mit Kantine und Restaurant. Selbst kochen hilft, ist aber keine Bedingung, sonst hält der Plan keine vier Wochen.",
      },
      {
        q: "Wo trainieren wir in Altstadt-Nord?",
        a: "Im Studio mit Langhantel und Maschinen. Draußen baut man Kondition auf, für Muskelaufbau braucht es steigende Last, und die liegt drinnen.",
      },
    ],
  },

  "immendorf/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Immendorf nutzt einen Vorteil, den das Dorf dir schenkt: hier gibt es keinen Snack an jeder Ecke, wer hier wohnt, kocht ohnehin selbst. Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, baut den Plan auf deine eigene Küche. Erstgespräch kostenlos, Beratung vor Ort oder per Video.",
    metaDescription:
      "Ernährungsberatung in Köln-Immendorf mit Natalie: Plan auf Basis deiner eigenen Küche und deines Wocheneinkaufs, vor Ort oder per Video. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Kein Bäcker-Snack an jeder Ecke, und das ist dein Vorteil",
        body: "Immendorf ist mit 2.121 Einwohnern eines der kleinsten Dörfer Kölns, ganz am südlichen Stadtrand. Was nach Nachteil klingt, ist für die Ernährung ein Geschenk: die spontane Currywurst, der Coffee-to-go mit Gebäck, das Mittagsangebot in der Fußgängerzone, all die kleinen Entscheidungen, die in der Innenstadt täglich gegen dich laufen, gibt es hier schlicht nicht. Gegessen wird, was zu Hause steht. Natalie setzt genau dort an: nicht bei Verboten, sondern bei dem, was du einkaufst und kochst.",
      },
      {
        title: "Der Plan entsteht aus deinem Wocheneinkauf",
        body: "Wer in Immendorf wohnt, fährt zum Einkaufen mit dem Auto und kauft für mehrere Tage. Das macht die Ernährung planbar wie kaum sonst irgendwo: was nicht im Kofferraum liegt, landet auch nicht abends auf dem Teller. Im ersten Monat schaut Natalie deshalb auf deinen Einkaufszettel statt auf Kalorientabellen. Mehr Eiweißquellen in den Wagen, die Abendroutine entschärfen, Portionen an dein Ziel anpassen, ob das Abnehmen ist oder Muskelaufbau. Du kochst weiter deine Gerichte, nur mit anderem Fundament.",
      },
      {
        title: "Vor Ort im Kölner Süden oder per Video",
        body: "Die Beratung läuft wahlweise bei dir zu Hause, kombiniert mit Training im Kölner Süden, oder komplett per Video, was für Pendler aus Immendorf oft die ehrlichere Lösung ist: kein zusätzlicher Termin mit Anfahrt, sondern 30 Minuten am Bildschirm, wenn die Küche ohnehin in Sichtweite ist. Dazwischen hält ein kurzer Check per App den Kurs. Natalie berät zu Sport- und Fitnessernährung; medizinische Ernährungstherapie, etwa bei diagnostizierten Erkrankungen, gehört in ärztliche Hände.",
      },
      {
        title: "Essen und Bewegung gehören zusammen",
        body: "Die meisten Anfragen aus dem Kölner Süden wollen beides: ein paar Kilo weniger und wieder Kraft. Deshalb arbeiten Natalie und ich im Tandem. Sie steuert die Ernährung, ich das Training, 1-zu-1 bei dir zu Hause für 50€ pro Stunde oder im Online Coaching ab 150€ im Monat. Die Felder rund um Immendorf sind flach und ruhig, zügiges Gehen dort ist der einfachste Einstieg in mehr Alltagsbewegung. Der erste Schritt ist ein kostenloses Erstgespräch über Ziel, Alltag und Küche.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Immendorf?",
        a: "Das Erstgespräch ist kostenlos. Danach läuft die Beratung einzeln oder als Teil des Online Coachings ab 150€ im Monat, Training dazu kostet 50€ pro 1-zu-1 Stunde. Was zu deinem Ziel passt, klären wir im Erstgespräch.",
      },
      {
        q: "Muss ich dafür neue Gerichte kochen lernen?",
        a: "Nein. Natalie baut auf dem auf, was du ohnehin kochst, und verändert Zutaten, Mengen und Reihenfolge. Ein Plan aus fremden Rezepten hält erfahrungsgemäß keine drei Wochen.",
      },
      {
        q: "Funktioniert die Beratung auch komplett online?",
        a: "Ja, per Video und App-Check-ins. Gerade aus Immendorf heraus ist das oft praktischer als ein zusätzlicher Fahrtermin, die Qualität der Beratung ändert sich dadurch nicht.",
      },
      {
        q: "Hilft Natalie auch beim Abnehmen?",
        a: "Ja, Abnehmen über ein Kaloriendefizit mit genug Eiweiß ist der häufigste Auftrag. Keine Crash-Diät, sondern ein Tempo, das du neben Arbeit und Familie halten kannst.",
      },
      {
        q: "Was ist, wenn ich eine Erkrankung wie Diabetes habe?",
        a: "Dann gehört die Ernährungstherapie zuerst in ärztliche Betreuung. Natalie berät zu Sport- und Fitnessernährung und arbeitet nur im Rahmen, den dein Arzt freigibt.",
      },
    ],
  },

  "flittard/personal-training": {
    answer:
      "Personal Training in Köln-Flittard heißt bei mir: Termine, die mit deinem Schichtplan rotieren. Das Veedel liegt direkt an der Stadtgrenze zum Chempark Leverkusen, Früh-, Spät- und Nachtschicht sind hier Alltag. Trainiert wird bei dir zu Hause oder am Rheinufer Flittard, 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Flittard: 1-zu-1 Termine, die mit deinem Schichtplan rotieren, Training zu Hause oder am Rheinufer Flittard. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Veedel an der Werksgrenze",
        body: "Flittard ist der nördlichste rechtsrheinische Stadtteil Kölns, 8.133 Einwohner auf 7,7 km², und endet dort, wo der Chempark Leverkusen beginnt. Viele, die hier wohnen, arbeiten in Wechselschicht, im Werk oder drumherum, und genau daran scheitern die üblichen Fitnessangebote: ein fester Kurs am Dienstagabend nützt nichts, wenn du jede dritte Woche nachts arbeitest. Mein Kalender funktioniert anders. Wenn dein Schichtplan kommt, lege ich deine zwei Einheiten hinein, mal vormittags nach der Nacht ausgeschlafen, mal am frühen Nachmittag vor der Spätschicht.",
      },
      {
        title: "Dein Wohnzimmer ist das Studio, der Rhein die Strecke",
        body: "Ich bringe mit, was wir brauchen: Kurzhanteln, Bänder, bei Bedarf eine Klappbank. Für die Kraftarbeit reichen vier Quadratmeter im Wohnzimmer oder der Garage, und wer später an die Langhantel will, wechselt mit mir ins Studio. Für Ausdauer und Technik hat Flittard das Rheinufer direkt vor der Tür: flach, ruhig und lang genug für Geh-Intervalle und Läufe, ohne eine einzige Ampel. Im Winter und nach Nachtschichten bleibt alles drinnen planbar.",
      },
      {
        title: "Training, das Schichtarbeit ernst nimmt",
        body: "Wechselschicht verschiebt Schlaf und Appetit, das ignoriere ich nicht, sondern plane damit. Nach einer Nachtschichtwoche steht keine Rekordeinheit an, sondern Technik und moderate Last; in Frühschichtwochen, wenn der Nachmittag frei ist, wird progressiv gesteigert. Jede Einheit wird protokolliert, alle vier bis sechs Wochen vergleichen wir Kraftwerte. So entsteht Fortschritt trotz Rotation, nur eben in Wellen statt in einer geraden Linie, und genau das ist bei Schichtarbeit normal.",
      },
      {
        title: "Der erste Schritt",
        body: "Das Erstgespräch ist kostenlos und klärt Ziel, Schichtmodell und Trainingsort. Danach kostet die 1-zu-1 Stunde 50€; wer zwischen den Treffen selbstständig weitermachen will, ergänzt das Online Coaching ab 150€ im Monat mit Plan per App. Auch Stammheim und Dünnwald nebenan gehören zu meinem Gebiet, die Anfahrt innerhalb des Kölner Nordostens ist im Preis drin.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Flittard?",
        a: "50€ pro 1-zu-1 Stunde, inklusive Anfahrt und Material. Das Erstgespräch ist kostenlos, Online Coaching als Ergänzung gibt es ab 150€ im Monat.",
      },
      {
        q: "Ich arbeite Wechselschicht. Wie planen wir Termine?",
        a: "Nach deinem Schichtplan: sobald er steht, lege ich die zwei Einheiten der Woche hinein. Die Uhrzeit darf jede Woche anders sein, nur die Zahl der Einheiten bleibt fest.",
      },
      {
        q: "Trainieren wir bei mir zu Hause oder draußen?",
        a: "Beides ist möglich. Kraft meist zu Hause oder im Studio, Ausdauer und Lauftechnik am Rheinufer Flittard. Den Mix legen wir nach Ziel und Jahreszeit fest.",
      },
      {
        q: "Bin ich nach Nachtschichten überhaupt trainierbar?",
        a: "Ja, mit angepasster Last. Nach Nachtwochen trainieren wir moderater, in Frühschichtwochen steigern wir. Das Protokoll sorgt dafür, dass es über Monate trotzdem vorwärtsgeht.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Kraftwerte bewegen sich meist nach vier bis sechs Wochen messbar, sichtbare Veränderung braucht je nach Ziel zwei bis drei Monate. Versprochen wird nur, was das Protokoll zeigt.",
      },
    ],
  },

  "dellbrueck/online-coaching": {
    answer:
      "Online Coaching für Köln-Dellbrück ist für den Alltag gebaut, in dem der Abend der Familie gehört: dein Plan besteht aus Bausteinen von 30 bis 45 Minuten, früh morgens oder spät abends zu Hause, plus Läufen in der Dellbrücker Heide. Ab 150€ im Monat, Erstgespräch kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Dellbrück: Trainingsbausteine von 30-45 Minuten für Eltern, deren Abend der Familie gehört, Läufe in Heide und Thielenbruch. Ab 150€/Monat.",
    sections: [
      {
        title: "Wenn der Abend nicht dir gehört",
        body: "Dellbrück ist ein Familien-Veedel: 21.954 Einwohner, viele Häuser mit Garten, Vereine, Kinder. Das klassische Trainingsmodell, dreimal pro Woche um 19 Uhr ins Studio, verliert hier gegen Abendessen, Hausaufgaben und Zubettbringen, und zwar dauerhaft. Mein Online Coaching plant deshalb nicht gegen deine Familie, sondern um sie herum: die Einheiten sind 30 bis 45 Minuten kurz, brauchen kein Studio und liegen in den Fenstern, die dir wirklich gehören, meist vor dem Frühstück oder nachdem die Kinder schlafen.",
      },
      {
        title: "Bausteine statt Termine",
        body: "Du bekommst per App einen Wochenplan aus Bausteinen: zwei Krafteinheiten für Wohnzimmer, Keller oder Garten mit Kurzhanteln und Band, dazu ein Lauf- oder Gehbaustein. Fällt ein Fenster aus, weil ein Kind krank ist, verschiebst du den Baustein, statt die Woche abzuschreiben, der Plan rechnet mit Störungen. Jede erledigte Einheit landet mit Gewichten und Zeiten in der App, und einmal pro Woche schauen wir im Video-Check-in gemeinsam drauf: was lief, was nicht, was ändere ich.",
      },
      {
        title: "Heide und Thielenbruch sind dein Ausdauerteil",
        body: "Für die Laufbausteine hat Dellbrück zwei Gelände, um die dich halb Köln beneidet: die offene Dellbrücker Heide mit ihren Sandwegen und den Thielenbruch mit schattigen Waldwegen für den Sommer. Beide erreichst du aus dem Veedel zu Fuß oder mit dem Rad, die Anfahrtszeit, die sonst das Training frisst, fällt weg. Im Plan stehen konkrete Strecken und Zeiten, keine vagen Vorsätze, und wer lieber zügig geht statt läuft, startet genau damit.",
      },
      {
        title: "Online, aber nicht anonym",
        body: "Online Coaching heißt bei mir nicht Plan-PDF und Funkstille. Du schreibst mir in der App, wenn etwas zwickt oder nicht passt, und ich antworte, bevor sich Fehler einschleifen. Technik prüfe ich über kurze Videos deiner Übungen. Und weil Dellbrück in meinem Gebiet liegt, lässt sich jederzeit eine 1-zu-1 Stunde vor Ort für 50€ dazubuchen, etwa zum Start oder wenn eine Übung per Video nicht rund wird. Der Einstieg ist ein kostenloses Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Dellbrück?",
        a: "Ab 150€ im Monat: Wochenplan per App, wöchentlicher Video-Check-in, Technik-Feedback über Übungsvideos. Einzelne 1-zu-1 Stunden vor Ort kosten 50€ dazu, das Erstgespräch ist kostenlos.",
      },
      {
        q: "Reichen 30 bis 45 Minuten pro Einheit für echte Fortschritte?",
        a: "Ja, wenn die Einheit dicht geplant ist: wenige Übungen, sauber gesteigert, ohne Leerlauf. Drei solche Bausteine pro Woche schlagen jede gute Absicht von dreimal 90 Minuten, die nie stattfinden.",
      },
      {
        q: "Welche Ausrüstung brauche ich zu Hause?",
        a: "Für den Start reichen zwei Kurzhanteln und ein Widerstandsband, zusammen unter 100€. Was sinnvoll dazukommt, besprechen wir erst, wenn der Plan es wirklich braucht.",
      },
      {
        q: "Was passiert, wenn eine Woche komplett ausfällt?",
        a: "Dann passt der nächste Wochenplan die Last an, statt bei null anzufangen. Der Check-in bleibt auch in solchen Wochen, gerade dann entscheidet sich, ob das Training Bestand hat.",
      },
      {
        q: "Ich laufe schon in der Heide. Was bringt mir das Coaching zusätzlich?",
        a: "Struktur und Kraft: die meisten Dellbrücker Läufer trainieren Ausdauer im Überfluss und Kraft gar nicht. Zwei kurze Krafteinheiten machen dich stabiler und nehmen den Läufen nichts weg.",
      },
    ],
  },

  "duennwald/online-coaching": {
    answer:
      "Online Coaching für Köln-Dünnwald löst das eigentliche Problem des Veedels: Im Stadtteil selbst gibt es kein großes Fitnessstudio, die Anfahrt frisst den Vorsatz auf. Stattdessen werden Dünnwalder Wald, Höhenfelder See und dein Wohnzimmer zum Trainingsgelände, gesteuert per App. Ab 150€ im Monat, Erstgespräch kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Dünnwald: Wald und Höhenfelder See als Trainingsgelände, Kraft zu Hause, Plan und Check-ins per App statt Anfahrt. Ab 150€/Monat.",
    sections: [
      {
        title: "Am Stadtrand wohnt man grün, aber weit weg vom Studio",
        body: "Dünnwald liegt am nordöstlichen Rand von Köln: 11.662 Einwohner auf 10,84 km², ein großer Teil davon Wald. Wer hier wohnt, hat sich bewusst für Ruhe entschieden und gegen kurze Wege, und das spürt jeder Trainingsvorsatz: zum nächsten großen Studio fährt man durchs halbe Rechtsrheinische, hin und zurück kostet das mehr Zeit als das Training selbst. Mein Online Coaching dreht das um: nicht du fährst zum Training, das Training kommt dorthin, wo du ohnehin bist.",
      },
      {
        title: "Der Wald ersetzt das Cardiogerät",
        body: "Kaum ein Kölner Veedel hat ein besseres Ausdauergelände direkt vor der Tür. Der Dünnwalder Wald bietet kilometerlange, weiche Wege für Läufe und Geh-Intervalle, am Wildpark vorbei Richtung Höhenfelder See wird daraus eine Runde mit Wasser und Abwechslung. In deinem Wochenplan stehen diese Strecken konkret drin, mit Dauer und Tempoangabe, im Sommer schattig im Wald, im Winter auf den offeneren Wegen am See. Ein Laufband wirst du nicht vermissen.",
      },
      {
        title: "Kraft kommt aus dem Wohnzimmer",
        body: "Ausdauer allein macht nicht belastbar, deshalb enthält jeder Wochenplan zwei Krafteinheiten für zu Hause: Kurzhanteln, Widerstandsband, das eigene Körpergewicht, mehr braucht der Anfang nicht. Jede Übung steht mit Video im Plan, deine Sätze und Gewichte trägst du in die App ein, und über kurze Clips prüfe ich deine Technik, bevor sich Fehler festsetzen. Wenn nach einigen Monaten mehr Last sinnvoll wird, besprechen wir, was sich für Keller oder Garage lohnt, nicht vorher.",
      },
      {
        title: "Was das Coaching konkret enthält",
        body: "Ab 150€ im Monat bekommst du den Wochenplan per App, einen festen Video-Check-in pro Woche und zwischendurch kurze Antworten, wenn etwas hakt. Alle vier bis sechs Wochen werten wir Kraftwerte und Laufzeiten aus und stellen den Plan neu. Wer zum Start lieber einmal gemeinsam trainiert, bucht eine 1-zu-1 Stunde für 50€ dazu, Dünnwald gehört zu meinem Gebiet im Kölner Nordosten. Der erste Schritt ist ein kostenloses Erstgespräch über Ziel und Woche.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Dünnwald?",
        a: "Ab 150€ im Monat mit Wochenplan per App, Video-Check-in und Technik-Feedback. Eine 1-zu-1 Stunde vor Ort kostet 50€, das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe noch nie strukturiert trainiert. Ist Online Coaching dann das Richtige?",
        a: "Ja, wenn der Einstieg begleitet ist: jede Übung hat ein Video, deine ersten Einheiten prüfe ich über kurze Clips, und zum Start lässt sich eine gemeinsame Stunde vor Ort dazunehmen.",
      },
      {
        q: "Funktioniert das Training auch im Winter?",
        a: "Ja. Die Kraftbausteine liegen ohnehin drinnen, und für draußen bekommst du Strecken und Zeiten, die zur Jahreszeit passen. Zügiges Gehen im Wald zählt als vollwertige Einheit, nicht als Ersatz.",
      },
      {
        q: "Wie unterscheidet sich das von einer Fitness-App von der Stange?",
        a: "Eine App von der Stange kennt weder deine Woche noch deine Technik. Hier schreibt ein Mensch deinen Plan, schaut deine Videos an und ändert den Kurs, wenn dein Alltag sich ändert.",
      },
      {
        q: "Muss ich laufen können, um zu starten?",
        a: "Nein. Viele starten mit Geh-Intervallen im Dünnwalder Wald und steigern erst nach Wochen in Laufabschnitte. Das Tempo setzt dein aktueller Stand, nicht der Plan.",
      },
    ],
  },

  "bayenthal/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Bayenthal nutzt zwei Geländeteile, die das Veedel direkt am Rhein hat: die lange, flache Gerade des Rheinufers Richtung Süden für Tempoläufe und die Rampen an der Südbrücke für Steigungssprints und Schnellkraft. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Bayenthal: Tempoläufe auf der flachen Rheinufer-Geraden, Steigungssprints an der Südbrücke, Fortschritt in Messwerten. 50€/Std.",
    sections: [
      {
        title: "Klein, dicht, und alles in fünf Minuten erreichbar",
        body: "Bayenthal ist mit 1,28 km² eines der kompaktesten Veedel im Kölner Süden, 11.161 Menschen wohnen hier. Für Athletiktraining ist diese Enge ein Vorteil: vom größten Teil des Veedels stehst du in wenigen Gehminuten am Rhein, und damit auf dem Trainingsgelände. Keine Anfahrt, kein Umziehen in der Umkleide, die Einheit beginnt an deiner Haustür mit dem Warm-up auf dem Weg zum Wasser und endet dort auch wieder. Sechzig Minuten reichen für ein komplettes Programm.",
      },
      {
        title: "Die Gerade nach Süden ist deine Messstrecke",
        body: "Vom Bayenthaler Ufer zieht sich der Rheinweg flach und ohne Querstraßen nach Süden Richtung Marienburg. Genau solche Abschnitte braucht Tempoarbeit: gleiche Strecke, gleiche Bedingungen, jede Woche. Wir markieren feste Abschnitte, laufen sie in Intervallen und notieren die Zeiten. Nach sechs Wochen vergleichst du nicht dein Gefühl, sondern Zahlen bei gleichem Puls. Wind vom Rhein gibt es gratis dazu, und auch das nutzen wir: mal als Widerstand, mal als Rückenwind für Überschall-Gefühl an schweren Tagen.",
      },
      {
        title: "Die Südbrücke liefert die Steigung, die dem Süden fehlt",
        body: "Das linksrheinische Köln ist flach, Sprungkraft und Beschleunigung brauchen aber Widerstand. In Bayenthal lösen das die Auffahrtsrampen der Südbrücke: kurz, knackig und steil genug für Steigungssprints über sechs bis zehn Sekunden, mit vollständiger Pause zurück im Gehen. Dazu kommen Sprünge und Stabilitätsarbeit auf den Wiesen am Ufer. Die Langhantel-Kraft bleibt im Studio, aber Schnelligkeit, Sprungkraft und Rumpf entstehen hier draußen, zehn Gehminuten von deiner Wohnung.",
      },
      {
        title: "Für Vereinssportler und Wiedereinsteiger",
        body: "Typische Anfragen aus dem Kölner Süden: Fußballer und Tennisspieler, die in ihrem Sport explosiver werden wollen, Läufer mit Zielzeit und Berufstätige, die nach Jahren Büro wieder belastbar werden möchten. Der Einstieg ist immer gleich: ein kostenloses Erstgespräch, dann ein Technik-Check mit Sprint, Sprung und Rumpftest, der das Startniveau festlegt. Danach kostet die 1-zu-1 Stunde 50€, alternativ läuft die Steuerung über das Online Coaching ab 150€ im Monat mit Plan per App.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Bayenthal?",
        a: "50€ pro 1-zu-1 Stunde, das Erstgespräch ist kostenlos. Wer nach dem Startblock eigenständig weitertrainiert, nimmt das Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Wo genau trainieren wir in Bayenthal?",
        a: "Tempoläufe und Intervalle auf der flachen Rheinufer-Geraden Richtung Marienburg, Steigungssprints an den Rampen der Südbrücke, Sprünge und Rumpfarbeit auf den Uferwiesen. Kraft an der Langhantel läuft im Studio.",
      },
      {
        q: "Bin ich für Athletiktraining fit genug?",
        a: "Das Startniveau legt der Technik-Check fest, nicht ein Mindestmaß an Fitness. Steigungssprints lassen sich genauso als zügige Bergaufgänge dosieren, der Aufbau bleibt derselbe.",
      },
      {
        q: "Trainieren wir auch im Winter draußen?",
        a: "Ja, das Programm ist ganzjährig angelegt: kürzere Intervalle, längeres Warm-up, bei Glätte weicht die Einheit ins Studio aus. Ausfallen lassen wir Wochen deswegen nicht.",
      },
      {
        q: "Wie schnell werde ich messbar schneller?",
        a: "Bei zwei Einheiten pro Woche bewegen sich Sprintzeiten und Sprunghöhe meist nach vier bis sechs Wochen. Gemessen wird auf denselben Uferabschnitten, damit die Zahlen vergleichbar bleiben.",
      },
    ],
  },
};

export function getIntentCustom(stadtteil: string, intent: string): IntentCustom | undefined {
  return stadtteilIntentCustom[`${stadtteil}/${intent}`];
}
