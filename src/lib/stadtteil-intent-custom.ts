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

  "kalk/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Kalk nutzt den Bürgerpark als Trainingsfeld: kurze Antritte, Richtungswechsel und Sprungserien auf kompaktem Raum, die Kraftarbeit läuft im Studio. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Kalk: Antritte, Richtungswechsel und Sprungkraft im Bürgerpark Kalk, Kraft im Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Athletik braucht keine 400-Meter-Bahn",
        body: "Kalk ist dicht bebaut: knapp 25.000 Menschen auf 2,97 km², dazwischen wenig freie Fläche. Für Athletiktraining ist das kein Hindernis, denn die Fähigkeiten, die im Sport und im Alltag zählen, entstehen auf kurzer Strecke: Antritte über 10 bis 30 Meter, Stopps, Richtungswechsel, Sprünge. Genau dafür reicht der Bürgerpark Kalk, der auf dem Gelände der früheren Chemischen Fabrik entstanden ist. Ein Rasenstück von 40 Metern ist hier mehr wert als eine Tartanbahn am anderen Ende der Stadt, zu der du nie fährst.",
      },
      {
        title: "Schnelligkeit draußen, Kraft drinnen",
        body: "Die Einheiten im Park bauen Antritt, Fußarbeit und Sprungkraft auf: Skippings, Steigerungsläufe, Sprungserien, dazwischen Rumpfarbeit. Hürden, Markierungen und Widerstandsband bringe ich mit. Was draußen nicht geht, schwere Kniebeugen und Zugübungen an der Langhantel, läuft im Studio als zweite Einheit der Woche. Beide Teile folgen demselben Plan, und alle vier bis sechs Wochen messe ich Sprintzeit und Sprunghöhe nach, auf derselben Strecke, damit die Zahlen vergleichbar sind.",
      },
      {
        title: "Termine, die zu Kalker Arbeitszeiten passen",
        body: "Wer in Kalk wohnt, arbeitet oft im Handel rund um die Kalker Hauptstraße, in der Pflege oder im Schichtbetrieb, und selten im Neun-bis-fünf-Takt. Deshalb lege ich Einheiten auch auf den Vormittag oder den frühen Nachmittag, wenn der Park leer ist und dein Dienstplan ein Loch hat. Zwei feste Stunden pro Woche reichen, wenn sie geplant sind; kurze Hausaufgaben für die Tage dazwischen bekommst du dazu.",
      },
      {
        title: "Für wen das in Kalk gedacht ist",
        body: "Für Fußballer und Kampfsportler aus den Vereinen des Kölner Ostens, die explosiver werden wollen. Für Läufer, denen auf den letzten Kilometern die Spannung wegbricht. Und für alle, die nach Jahren Pause wieder einsteigen und erst Stabilität brauchen, bevor Tempo dazukommt. Das Startniveau legt ein Technik-Check im kostenlosen Erstgespräch fest, nicht dein aktueller Fitnessstand.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Kalk?",
        a: "50€ pro 1-zu-1 Stunde. Wer nach dem Start eigenständig weitertrainieren will, wechselt ins Online Coaching ab 150€ im Monat, mit Plan per App und wöchentlichem Check-in. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo trainieren wir in Kalk?",
        a: "Antritte, Richtungswechsel und Sprünge im Bürgerpark Kalk, die Kraftarbeit an der Langhantel im Studio. Material für die Outdoor-Einheiten bringe ich mit.",
      },
      {
        q: "Reicht der Bürgerpark für richtiges Athletiktraining?",
        a: "Ja. Antritt, Beschleunigung und Richtungswechsel spielen sich auf 10 bis 40 Metern ab, mehr Fläche braucht kaum eine Übung. Nur lange Tempoläufe verlegen wir bei Bedarf an den Rhein, eine Station entfernt.",
      },
      {
        q: "Ich habe lange keinen Sport gemacht. Ist das zu hart?",
        a: "Nein. Der Technik-Check am Anfang legt fest, womit wir starten: aus Sprüngen werden erst Aufstiege, aus Sprints zügige Steigerungen. Die Struktur bleibt gleich, die Dosierung wächst mit dir.",
      },
    ],
  },

  "libur/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Libur, dem südlichsten Stadtteil der Stadt: Tempoläufe und Intervalle auf den Wirtschaftswegen rund ums Dorf, Sprung- und Rumpfarbeit auf der Wiese, Kraft im Studio oder mit mitgebrachtem Material bei dir. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Libur: Tempoläufe auf den Feldwegen rund ums Dorf, feste Messstrecken, Kraft im Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ganz im Süden, ganz viel Platz",
        body: "Libur ist der südlichste Stadtteil Kölns: 1.145 Einwohner auf 6,35 km², der Rest sind Felder. Die asphaltierten Wirtschaftswege zwischen den Äckern sind flach, gerade und fast autofrei, du kannst Intervalle laufen, ohne an einer Ampel abzubrechen oder Fußgängern auszuweichen. Aus den Wegen rund ums Dorf lassen sich Runden von einem bis mehreren Kilometern bauen, und weil die Strecken immer gleich bleiben, taugen sie als Messstrecke: gleicher Weg, gleiche Distanz, vergleichbare Zeit.",
      },
      {
        title: "Der Wind läuft mit",
        body: "Zwischen den Feldern gibt es keinen Windschatten. Was beim Sonntagslauf nervt, ist im Athletiktraining ein Werkzeug: Tempoabschnitte gegen den Wind bauen Kraftausdauer auf, die Abschnitte mit Rückenwind nutzen wir für Frequenz und Lauftechnik. Ich plane die Richtung der Intervalle nach dem Wetter, so wird aus derselben Runde jede Woche ein anderer Reiz.",
      },
      {
        title: "Kraft und Sprungkraft: im Studio oder im Dorf",
        body: "Maximalkraft an der Langhantel läuft im Studio, als zweite Einheit der Woche. Wer die Fahrt sparen will, trainiert zu Hause: für Sprungserien, Ausfallschritte und Zugübungen mit Band und Kurzhanteln reichen Garten oder Einfahrt, das Material bringe ich mit. Alle vier bis sechs Wochen stehen Tests an, Sprintzeit und Sprunghöhe, damit der Plan an Zahlen hängt und nicht am Gefühl.",
      },
      {
        title: "Wer hier trainiert",
        body: "Aus Libur und den Nachbardörfern Zündorf und Langel fragen vor allem Vereinssportler an, Fußball und Tennis, dazu Läufer, die für einen Zehner oder Halbmarathon eine Zielzeit haben. Die Anfahrt ins nächste Studio kostet von hier schnell eine halbe Stunde pro Richtung; zwei geführte Einheiten pro Woche vor Ort ersetzen sie. Der Einstieg ist ein kostenloses Erstgespräch mit Technik-Check.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Libur?",
        a: "50€ pro 1-zu-1 Stunde, das Erstgespräch ist kostenlos. Für die eigenständige Variante gibt es das Online Coaching ab 150€ im Monat, mit Plan per App und Video-Check-ins.",
      },
      {
        q: "Wo genau trainieren wir in Libur?",
        a: "Tempoläufe und Intervalle auf den Wirtschaftswegen rund ums Dorf, Sprünge und Rumpfarbeit auf der Wiese oder bei dir im Garten, schwere Kraftarbeit im Studio. Hürden, Bänder und Kurzhanteln bringe ich mit.",
      },
      {
        q: "Lohnt sich ein Trainer für ein Dorf wie Libur überhaupt?",
        a: "Gerade hier: das nächste Studio liegt weit weg, und die Bedingungen vor Ort sind besser als in der Innenstadt. Flache, leere, immer gleiche Strecken sind genau das, was strukturiertes Lauftraining braucht.",
      },
      {
        q: "Trainieren wir auch bei schlechtem Wetter?",
        a: "Ja. Regen verschiebt nur die Inhalte: statt Tempoläufen stehen dann Kraft, Sprungtechnik oder Mobility unter Dach an. Der Wochenrhythmus von zwei Einheiten bleibt stehen.",
      },
    ],
  },

  "lind/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Lind funktioniert ohne Studio-Anfahrt: verstellbare Kurzhanteln, eine Bank und ein Band reichen für drei Monate dokumentierte Steigerung, ich komme dafür zu dir. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Lind: Training zu Hause mit wenig Gerät, dokumentierte Steigerung, Eiweiß-Zielwert. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Gerät ist nicht der Engpass",
        body: "Von Lind aus kostet jedes Studio eine Fahrt, und genau daran sterben die meisten Aufbau-Pläne: nicht an der Übungsauswahl, sondern an der dritten Woche, in der die Fahrt zu oft ausfällt. Muskelaufbau braucht aber keinen Gerätepark. Er braucht Übungen, die schwerer werden können, und ein Protokoll, das das belegt. Mit verstellbaren Kurzhanteln bis 24 kg, einer Bank und einem Widerstandsband deckst du Beine, Rücken, Brust und Schultern ab, in deinem Keller, deiner Garage oder deinem Wohnzimmer.",
      },
      {
        title: "Progression wird geplant, nicht gehofft",
        body: "Jede Einheit steht im Protokoll: Übung, Gewicht, Wiederholungen. Gesteigert wird nach Plan, erst Wiederholungen, dann Gewicht, und wenn die Kurzhanteln für Kniebeugen und Rumänisches Kreuzheben zu leicht werden, wechseln die Übungen auf einbeinige Varianten, bevor neues Gerät nötig wird. Zwei geführte Einheiten pro Woche à 60 Minuten reichen; mehr Volumen bringt am Anfang nichts außer Muskelkater.",
      },
      {
        title: "Essen im Dorf: der Eiweiß-Anker",
        body: "Ohne Baumaterial wächst nichts: als Richtwert 1,6 bis 2 Gramm Eiweiß pro Kilo Körpergewicht am Tag, verteilt auf drei bis vier Mahlzeiten. In Lind wird meist zu Hause gekocht, das macht es leichter als in der Innenstadt, du brauchst nur einen Wochenvorrat, der den Zielwert trägt: Quark, Eier, Hülsenfrüchte, Fleisch oder Fisch nach Geschmack. Wenn du mehr Steuerung willst, baut Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, den Plan um deinen Einkauf herum.",
      },
      {
        title: "Was nach drei Monaten da ist",
        body: "Realistisch bei zwei Einheiten pro Woche: deutlich mehr Kraft in den Grundmustern, sichtbar mehr Spannung in Schultern, Rücken und Beinen, ein bis zwei Kilo Muskelmasse, je nach Ausgangslage und Alter. Was ich nicht verspreche: einen anderen Körper in vier Wochen. Die Zahlen im Protokoll zeigen dir vor dem Spiegel, dass es funktioniert. Der Einstieg ist ein kostenloses Erstgespräch bei dir vor Ort.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Lind?",
        a: "50€ pro 1-zu-1 Stunde bei dir zu Hause. Wer nach den ersten Wochen eigenständig trainiert, wechselt ins Online Coaching ab 150€ im Monat mit Plan per App und wöchentlichem Check-in.",
      },
      {
        q: "Brauche ich eigenes Equipment?",
        a: "Für den Start nicht, ich bringe Kurzhanteln und Bänder mit. Wer dauerhaft zu Hause aufbauen will, investiert einmal in verstellbare Kurzhanteln und eine Bank, zusammen deutlich weniger als ein Jahr Studiobeitrag plus Fahrten.",
      },
      {
        q: "Geht Muskelaufbau ohne Langhantel wirklich?",
        a: "Ja, bis weit über das Anfängerniveau hinaus. Entscheidend ist, dass die Belastung planmäßig steigt, nicht womit. Einbeinige Kniebeugen mit 20-kg-Kurzhanteln sind für die meisten schwerer als eine halbvolle Langhantel.",
      },
      {
        q: "Ich bin über 40, lohnt sich das noch?",
        a: "Gerade dann. Der Aufbau läuft etwas langsamer, aber zuverlässig, und die Kraft hält, was im Alltag zählt. Viele Anfragen aus dem Kölner Süden kommen aus genau dieser Altersgruppe.",
      },
      {
        q: "Hilft die Wahner Heide beim Muskelaufbau?",
        a: "Als Ausgleich ja, als Baustein nein. Spazieren und Laufen halten dich beweglich und erholt, Muskeln baust du mit ansteigender Last auf. Die Heide ist bei uns Regenerationsfläche, nicht Trainingsgerät.",
      },
    ],
  },

  "muelheim/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Mülheim hat sein Gelände direkt am Wasser: Schnellkraft an den Rampen der Mülheimer Brücke und der Hafenbrücke, Tempoläufe auf der langen Ufergeraden, Tests alle vier bis sechs Wochen. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Mülheim: Rampensprints an Mülheimer Brücke und Hafenbrücke, Tempoläufe am Rheinufer, messbare Tests. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Rampen statt Berge: Schnellkraft am Brückenkopf",
        body: "Mülheim ist flach, aber seine Brücken ersetzen den Hügel. Die Auffahrtsrampen der Mülheimer Brücke und der geschwungenen Hafenbrücke am Mülheimer Hafen sind gleichmäßig geneigt und genau lang genug für Steigungssprints: sechs bis zehn Sekunden Vollgas bergauf, gehend zurück, wieder hoch. Bergauf beschleunigen zwingt in die Streckung und baut Antritt auf, ohne die Achillessehne so zu reizen wie flache Vollsprints. Zwei Serien pro Woche verändern den ersten Schritt spürbar.",
      },
      {
        title: "Die Ufergerade ist deine Messstrecke",
        body: "Für Tempoläufe und Intervalle nutzen wir die lange, flache Gerade am Mülheimer Rheinufer. Sie ist frei von Ampeln und immer gleich, deshalb dienen feste Abschnitte dort als Teststrecke: alle vier bis sechs Wochen laufe ich mit dir dieselben Distanzen auf Zeit, dazu kommen Sprunghöhe und ein Rumpftest. Trainiert wird nach diesen Zahlen, nicht nach Gefühl, und du siehst schwarz auf weiß, ob der Plan arbeitet.",
      },
      {
        title: "Kraft im Studio, Termine für die Schäl Sick",
        body: "Die zweite Einheit der Woche gehört der Kraft: Kniebeugen, Zugübungen, Sprungkraftaufbau an der Langhantel im Studio. Beides plane ich rechtsrheinisch und zeitlich um deinen Tag herum, auch früh morgens oder am späten Abend, denn wer in Mülheim wohnt, hat selten Lust, für Sport noch einmal über den Rhein zu fahren. Zwischen den Terminen bleiben dir kurze Hausaufgaben von 15 bis 20 Minuten.",
      },
      {
        title: "Für Vereinssportler und Wiedereinsteiger im Kölner Osten",
        body: "Typische Anfragen aus Mülheim, Buchheim und Stammheim: Fußballer, die im Antritt verlieren, Läufer mit Zielzeit, Berufstätige, die nach Jahren wieder belastbar werden wollen. Das Niveau setzt der Technik-Check im kostenlosen Erstgespräch, von dort an wird gesteigert. Athletiktraining heißt hier nicht Leistungssport, sondern: schneller, stabiler, belastbarer werden, mit Zahlen als Beleg.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Mülheim?",
        a: "50€ pro 1-zu-1 Stunde, das Erstgespräch ist kostenlos. Wer eigenständig weitertrainiert, nimmt das Online Coaching ab 150€ im Monat mit Plan per App und wöchentlichen Check-ins.",
      },
      {
        q: "Wo genau trainieren wir in Mülheim?",
        a: "Steigungssprints an den Rampen der Mülheimer Brücke und der Hafenbrücke, Tempoläufe und Tests auf der Ufergeraden, Kraft und Sprungkraftaufbau im Studio. Hürden, Markierungen und Bänder bringe ich mit.",
      },
      {
        q: "Sind Rampensprints nicht zu hart für den Einstieg?",
        a: "Die Rampe dosiert sich von selbst: aus Sprints werden zügige Bergaufgänge, aus zehn Sekunden werden sechs. Die Steigung schützt dabei sogar, weil sie das Tempo begrenzt und die Landung weicher macht als flaches Sprinten.",
      },
      {
        q: "Wie schnell sehe ich messbare Fortschritte?",
        a: "Bei zwei Einheiten pro Woche bewegen sich Sprintzeiten und Sprunghöhe meist nach vier bis sechs Wochen. Gemessen wird immer auf denselben Uferabschnitten, damit die Werte vergleichbar bleiben.",
      },
    ],
  },

  "weiden/personal-training": {
    answer:
      "Personal Training in Köln-Weiden ohne zweite Fahrt am Tag: zwei feste 1-zu-1 Termine pro Woche bei dir zu Hause oder draußen am Feldrand Richtung Widdersdorf, geplant um Linie 1 und S-Bahn herum. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "1-zu-1 Personal Training in Köln-Weiden: Termine bei dir zu Hause, geplant um Pendelzeiten, Outdoor am Feldrand. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Der Tag pendelt, das Training nicht",
        body: "Weiden liegt am westlichen Stadtrand: 17.795 Einwohner, und ein großer Teil davon fährt morgens mit der Linie 1 oder ab Weiden West stadteinwärts. Wer abends zurückkommt, steigt nicht noch einmal in die Bahn, um zu trainieren, und genau daran scheitern die meisten Vorsätze. Deshalb drehe ich es um: das Training findet in Weiden statt, bei dir zu Hause, im Garten oder draußen am Ortsrand. Keine Anfahrt, keine Ausrede.",
      },
      {
        title: "Was eine Stunde bei dir leistet",
        body: "Kurzhanteln, Bänder und bei Bedarf eine Bank bringe ich mit, mehr braucht ein sauber geplanter Kraftaufbau nicht. Jede Übung wird technisch aufgebaut, jedes Gewicht notiert, gesteigert wird nach Protokoll. Für die Ausdauer- und Outdoor-Anteile nutzen wir die Feldwege zwischen Weiden und Widdersdorf: flach, ruhig, direkt vor der Tür. Alle vier Wochen schauen wir gemeinsam auf Kraftwerte, Gewicht und Umfänge.",
      },
      {
        title: "Zwei feste Termine, die der Familienkalender übersteht",
        body: "In Weiden fragen vor allem Berufstätige mit Familie an, Mitte dreißig bis Ende fünfzig. Der Kalender ist voll, also bekommen die zwei Wochentermine feste Plätze: früh, bevor das Haus wach ist, oder abends, wenn die Kinder versorgt sind. Fällt ein Termin aus, wird er in derselben Woche verschoben statt gestrichen. Diese Verlässlichkeit, nicht das perfekte Programm, entscheidet nach drei Monaten über das Ergebnis.",
      },
      {
        title: "Ernährung dazu, wenn du mehr willst",
        body: "Wenn Abnehmen oder Muskelaufbau das Ziel ist, reicht Training allein selten. Natalie, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, plant auf Wunsch deine Woche um den Großeinkauf herum, der im Kölner Westen meist am Samstag passiert. Beides zusammen, Training vor Ort und Ernährungssteuerung online, greift schneller als jede Diät allein. Der Einstieg ist in jedem Fall ein kostenloses Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Weiden?",
        a: "50€ pro 1-zu-1 Stunde bei dir zu Hause oder draußen. Die Erstberatung ist kostenlos. Für die eigenständige Variante gibt es das Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Brauche ich Geräte oder Platz zu Hause?",
        a: "Nein. Ein paar Quadratmeter im Wohnzimmer oder Garten reichen, das Material bringe ich mit. Wer dauerhaft zu Hause trainieren will, bekommt eine kurze Einkaufsliste, die unter dem Preis eines Jahres Studiobeitrag bleibt.",
      },
      {
        q: "Wann finden die Termine statt?",
        a: "Dort, wo dein Pendeltag Platz lässt: früh morgens vor der Bahn oder abends nach der Rückfahrt. Die beiden Wochentermine stehen fest und werden bei Ausfall in derselben Woche nachgeholt.",
      },
      {
        q: "Trainieren wir auch draußen?",
        a: "Ja, auf den Feldwegen am Ortsrand Richtung Widdersdorf und Lövenich: Geh- und Laufintervalle, Zirkel mit dem eigenen Körpergewicht. Im Winter verschiebt sich der Mix nach drinnen, der Plan bleibt derselbe.",
      },
    ],
  },

  "weidenpesch/rueckentraining": {
    answer:
      "Rückentraining in Köln-Weidenpesch heißt gezielter Kraftaufbau in zwei Einheiten pro Woche, vor allem über Zugübungen. Die Runden durch den Weidenpescher Park und an der Rennbahn bleiben als Ausgleich, aber stark wird der Rücken unter Last. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Rückentraining in Köln-Weidenpesch: Kraftaufbau mit Zugübungen in zwei Einheiten pro Woche, der Weidenpescher Park als Ausgleich. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Viel Bewegung, trotzdem Schmerzen: das Weidenpescher Muster",
        body: "Weidenpesch ist zum Gehen gebaut: der Weidenpescher Park, die Wege rund um die Galopprennbahn, der Grünzug Richtung Niehl. Viele, die hier anfragen, bewegen sich längst jeden Tag und wundern sich, dass der Rücken trotzdem meldet. Die Erklärung ist unbequem, aber einfach: Gehen hält den Rücken geschmeidig und baut Stress ab, es macht ihn aber nicht stärker. Ein Rumpf, der acht Stunden Schreibtisch oder Schicht tragen soll, braucht Last, keine Schritte.",
      },
      {
        title: "Zug schlägt Schonung",
        body: "Der schmerzende Rücken ist meist der untrainierte, nicht der überlastete. Deshalb steht Ziehen im Zentrum: Rudern mit Kurzhantel und Band, Hüftstrecken, Rumänisches Kreuzheben in sauber gesteigerter Dosierung, dazu Rumpfarbeit gegen das Einsinken. Zwei Einheiten pro Woche à 60 Minuten, jedes Gewicht im Protokoll. Die meisten spüren nach vier bis sechs Wochen, dass langes Sitzen und Tragen aufhören, ein Thema zu sein.",
      },
      {
        title: "Der Park bleibt im Plan, aber mit anderer Rolle",
        body: "Deine Runde durch den Weidenpescher Park musst du nicht aufgeben, sie bekommt nur eine neue Aufgabe: aktive Erholung an den Tagen zwischen den Krafteinheiten, zwanzig bis vierzig Minuten zügiges Gehen, das die Muskulatur durchblutet und den Kopf leert. Trainiert wird bei dir zu Hause oder im Studio; für die Einheiten daheim bringe ich Hanteln und Bänder mit, ein paar Quadratmeter reichen.",
      },
      {
        title: "Erst der Check, dann die Last",
        body: "Vor der ersten Einheit steht ein Beweglichkeits- und Kraft-Check: Hüfte, Brustwirbelsäule, Rumpf. Danach weißt du, wo dein Rücken wirklich schwach ist, und der Plan setzt genau dort an. Klare Grenze: akute Schmerzen mit Ausstrahlung ins Bein, Taubheit oder nächtlicher Schmerz gehören zuerst zum Arzt. Trainiert wird, was belastbar ist, und das wächst von Woche zu Woche. Der Einstieg ist ein kostenloses Erstgespräch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Weidenpesch?",
        a: "50€ pro 1-zu-1 Stunde, bei dir zu Hause oder im Studio. Das Erstgespräch mit Beweglichkeits-Check ist kostenlos. Eigenständige Steuerung gibt es im Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Ich gehe schon jeden Tag spazieren. Warum reicht das nicht?",
        a: "Gehen entlastet und hält beweglich, aber es setzt keinen Kraftreiz. Ein Rücken wird stärker, wenn er gegen Widerstand zieht und streckt, und genau das trainieren wir zweimal pro Woche. Die Parkrunde bleibt als Erholung im Plan.",
      },
      {
        q: "Mein Rücken schmerzt aktuell. Kann ich trotzdem anfangen?",
        a: "Bei unspezifischem Schmerz ohne Warnsignale ist dosiertes Training meist genau das Richtige, der Check am Anfang legt die Startlast fest. Bei Ausstrahlung ins Bein, Taubheit oder Nachtschmerz gehst du zuerst zum Arzt, danach bauen wir auf dem Befund auf.",
      },
      {
        q: "Trainieren wir im Weidenpescher Park?",
        a: "Die Krafteinheiten laufen drinnen, bei dir zu Hause oder im Studio, weil saubere Zugübungen Gerät brauchen. Der Park übernimmt die Tage dazwischen: zügiges Gehen als aktive Erholung, bei Bedarf mit kurzen Mobility-Stopps.",
      },
    ],
  },
  "zollstock/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Zollstock nutzt den Vorgebirgspark für Antritte, Richtungswechsel und Sprungkraft auf dem Rasen und den Äußeren Grüngürtel für Intervalle auf immer gleicher Strecke. Die Kraftarbeit kommt aus dem Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Zollstock: Antritte und Sprungkraft im Vorgebirgspark, Intervalle auf dem Äußeren Grüngürtel, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Das Veedel des Südstadions ist voller Mannschaftssportler",
        body: "In Zollstock leben 23.327 Menschen auf 5,03 km², und mitten im Veedel steht das Südstadion, die Heimat von Fortuna Köln. Entsprechend viele Anfragen aus dem Kölner Süden kommen von Leuten, die schon in einer Mannschaft spielen: Fußball, Handball, Hockey. Genau dort setzt Athletiktraining an. Im Mannschaftstraining wird Taktik und Spielform geübt, für Schnelligkeit, Sprungkraft und Stabilität bleibt selten Zeit. Diese Lücke fülle ich im 1-zu-1, abgestimmt auf deine Position und deine Schwachstelle.",
      },
      {
        title: "Der Vorgebirgspark gibt dir Rasen mit geraden Kanten",
        body: "Der Vorgebirgspark wurde von Gartendirektor Fritz Encke entworfen und 1914 eröffnet. Seine großen, rechteckig gefassten Wiesen sind fürs Athletiktraining ein Glücksfall: gerade Kanten zum Abmessen von Antritten über 10 bis 30 Meter, ebener Rasen für Richtungswechsel und Sprünge, der die Gelenke schont. Wir markieren feste Distanzen und arbeiten mit der Stoppuhr, damit jede Wiederholung vergleichbar ist.",
      },
      {
        title: "Der Grüngürtel liefert die langen Reize",
        body: "Für Tempoläufe und lange Intervalle wechseln wir auf den Äußeren Grüngürtel am Rand des Veedels: flache, durchgehende Wege ohne Ampeln, auf denen dieselbe Runde Woche für Woche gleich bleibt. So kann ich deine Zeiten ehrlich vergleichen. Alle vier bis sechs Wochen steht ein Testtag mit Sprintzeit, Sprunghöhe und einer Tempostrecke, und der Plan wird an den Zahlen ausgerichtet, nicht am Gefühl.",
      },
      {
        title: "Saisonlogik statt Dauervollgas",
        body: "Wer im Verein spielt, trainiert bei mir nach Kalender: In der Saison hält eine kurze, harte Einheit pro Woche Schnelligkeit und Stabilität, ohne die Beine fürs Wochenende zu leeren. In der Sommer- und Winterpause bauen wir auf, mit zwei Einheiten pro Woche und mehr Kraftarbeit im Studio. Wer ohne Verein kommt, bekommt denselben Aufbau ohne Spielplan, dafür mit eigenem Zielwert.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Zollstock?",
        a: "Die 1-zu-1 Stunde kostet 50€. Wer nach Plan selbst trainiert und wöchentliche Check-ins will, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich spiele im Verein. Passt das neben das Mannschaftstraining?",
        a: "Ja, dafür ist es gedacht. In der Saison reicht eine Einheit pro Woche, gelegt auf den Tag mit dem größten Abstand zum Spiel. Die Belastung stimme ich auf deinen Spielplan ab, damit du am Wochenende frische Beine hast.",
      },
      {
        q: "Wo genau trainieren wir in Zollstock?",
        a: "Antritte, Richtungswechsel und Sprünge im Vorgebirgspark, Tempoläufe und Intervalle auf dem Äußeren Grüngürtel, Kraft und Maximalkraft im Studio. Die Aufteilung richtet sich nach deinem Ziel und der Jahreszeit.",
      },
      {
        q: "Brauche ich Vorerfahrung oder ein bestimmtes Niveau?",
        a: "Nein. Am Anfang steht ein Technik-Check mit Sprint, Sprung und Rumpfstabilität. Der legt fest, wo wir starten, egal ob du Vereinsspieler bist oder nach Jahren wieder anfängst.",
      },
    ],
  },

  "nippes/online-coaching": {
    answer:
      "Online Coaching für Köln-Nippes: Trainingsplan per App, wöchentliche Video-Check-ins und Ernährungssteuerung, ab 150€ im Monat. Jede Trainingswoche bekommst du in zwei Fassungen, eine für Tage zu Hause im Veedel und eine für Büro- und Studiotage, damit der Plan deine Woche mitmacht statt an ihr zu scheitern.",
    metaDescription:
      "Online Coaching in Köln-Nippes: Plan per App in zwei Fassungen für Zuhause- und Bürotage, Video-Check-ins, Cardio im Nippeser Tälchen. Ab 150€/Monat.",
    sections: [
      {
        title: "Keine Woche in Nippes gleicht der anderen",
        body: "Zwei Tage Homeoffice, drei im Büro, dazwischen Kita-Übergabe und samstags der Markt auf dem Wilhelmplatz: So sehen die Wochen aus, die mir Leute aus Nippes beschreiben. Ein Plan mit festen Studioterminen verliert gegen diesen Kalender. Deshalb plane ich nicht Termine, sondern Einheiten: Du bekommst pro Woche zwei bis drei Workouts, und die App zeigt dir für jedes an, wie es heute und hier geht.",
      },
      {
        title: "Jede Einheit hat eine Zuhause-Fassung",
        body: "Dieselbe Einheit existiert in zwei Versionen: eine für die Altbauwohnung mit Kurzhanteln, Band und eigenem Körpergewicht, eine für den Tag, an dem du an einem Studio vorbeikommst oder draußen trainieren willst. Beide folgen derselben Progression, du verlierst also nichts, wenn die Woche kippt. Welche Fassung du nimmst, entscheidest du am Tag selbst, nicht am Sonntag davor.",
      },
      {
        title: "Das Nippeser Tälchen ist dein fester Cardio-Block",
        body: "Für den Ausdauerteil brauchst du kein Gerät: Das Nippeser Tälchen und der Johannes-Giesberts-Park liegen im Veedel, beide eben und gut beleuchtet. Dein Plan enthält dort feste Blöcke aus zügigem Gehen oder Intervallen, 25 bis 40 Minuten, die in der App abgehakt und mitgezählt werden. So entsteht der Kalorienverbrauch im Alltag, nicht in einer dritten Trainingsfahrt.",
      },
      {
        title: "Check-in per Video, Technik per Clip, Angelo vor Ort",
        body: "Einmal pro Woche sprechen wir 20 Minuten per Video über Zahlen, Schlaf und die kommende Woche. Zwischendrin schickst du kurze Übungsclips, auf die ich mit Korrekturen antworte. Und weil ich in Köln arbeite, gibt es eine Abkürzung, die reine Online-Anbieter nicht haben: Wenn eine Übung hakt, legen wir eine 1-zu-1 Stunde (50€) in Nippes dazwischen und lösen es vor Ort.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Nippes?",
        a: "Ab 150€ im Monat, monatlich kündbar: Trainingsplan per App in zwei Fassungen, wöchentlicher Video-Check-in, Ernährungssteuerung und Technik-Feedback auf deine Übungsclips. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Welche Ausrüstung brauche ich zu Hause?",
        a: "Für den Start reichen ein Satz Kurzhanteln oder ein verstellbares Paar und ein Widerstandsband. Die Zuhause-Fassung jeder Einheit ist darauf geschrieben. Wenn du ein Studio-Abo hast, nutzt die zweite Fassung dessen Geräte.",
      },
      {
        q: "Was passiert, wenn meine Woche komplett platzt?",
        a: "Dann wird nicht nachgeholt, sondern umgebaut: Im Check-in kürzen wir die Woche auf das Minimum, das die Progression hält, meist zwei kurze Einheiten. Ein Plan, der nur in perfekten Wochen funktioniert, ist keiner.",
      },
      {
        q: "Kann ich Online Coaching und Training vor Ort mischen?",
        a: "Ja. Viele starten online und nehmen alle paar Wochen eine 1-zu-1 Stunde in Nippes für Technik dazu. Das Coaching bleibt die Basis, die Stunde wird einzeln mit 50€ gerechnet.",
      },
    ],
  },

  "esch-auweiler/abnehmen": {
    answer:
      "Abnehmen in Köln-Esch/Auweiler plane ich gegen das Auto: Im Doppeldorf am Stadtrand wird fast jeder Weg gefahren, also bauen wir deinen Grundverbrauch mit festen Runden auf den Feldwegen zwischen Esch und Auweiler wieder auf, dazu zwei Krafteinheiten pro Woche bei dir zu Hause und ein Kalorienziel, das Natalie mit dir festlegt. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Esch/Auweiler: feste Runden auf den Feldwegen, zwei Krafteinheiten zu Hause, Kalorienziel mit Ernährungsberaterin Natalie. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Zwei Dörfer, viele Felder, fast alles mit dem Auto",
        body: "Esch/Auweiler besteht aus zwei alten Ortskernen mit zusammen 6.964 Einwohnern auf 7,61 km², dazwischen und drumherum liegen Felder. Das Leben hier ist ruhig, aber es läuft über das Auto: Einkauf, Arbeit, Kinder bringen. Dabei verschwinden genau die Schritte, die in der Innenstadt nebenbei passieren. Wer hier abnehmen will, muss den Grundverbrauch nicht erhöhen, sondern erst einmal zurückholen.",
      },
      {
        title: "Die Feldwege sind deine Verbrauchsrunden",
        body: "Zwischen Esch und Auweiler und hinüber Richtung Pesch und Widdersdorf liegt ein Netz aus ebenen, ruhigen Feldwegen. Daraus bauen wir zwei feste Runden, eine für 30 und eine für 45 Minuten zügiges Gehen, die an definierten Tagen im Kalender stehen wie ein Termin. Weil die Strecken immer gleich sind, zählt jeder Kilometer verlässlich ins Wochenziel, und du siehst nach vier Wochen, was die Runden am Gewichtstrend ändern.",
      },
      {
        title: "Zwei Krafteinheiten zu Hause halten die Muskeln im Defizit",
        body: "Ein Fitnessstudio gibt es im Doppeldorf nicht, und für diesen Plan braucht es auch keins: Ich komme mit Material zu dir und wir trainieren zweimal pro Woche die großen Grundübungen. Im Kaloriendefizit entscheidet genau das darüber, ob das verlorene Gewicht aus dem Fett kommt oder aus der Muskulatur. Wer zusätzlich schwer heben will, nimmt einzelne Einheiten im Studio dazu.",
      },
      {
        title: "Gegessen wird weiter zu Hause, nur gerechnet",
        body: "Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, legt mit dir ein Kalorienziel fest, das Familienessen und Wochenende übersteht, realistisch für ein bis zwei Kilo Fett pro Monat. Bewertet wird der Verlauf über Wochen, nicht der einzelne Tag: Ein Geburtstag im Dorf wirft den Plan nicht um, er ist eingerechnet.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Esch/Auweiler?",
        a: "Die 1-zu-1 Stunde bei dir zu Hause kostet 50€. Wer lieber mit App-Plan und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Gibt es in Esch/Auweiler ein Studio für das Training?",
        a: "Nein, im Stadtteil selbst nicht. Deshalb kommt das Training zu dir: zwei Krafteinheiten pro Woche zu Hause mit mitgebrachtem Material, die Geh-Runden direkt vor der Tür auf den Feldwegen. Studio-Einheiten sind möglich, aber nicht nötig.",
      },
      {
        q: "Muss ich joggen, um abzunehmen?",
        a: "Nein. Zügiges Gehen auf den festen Runden reicht als Basis völlig, es ist gelenkschonend und lässt sich auch an vollen Tagen durchziehen. Das Defizit kommt ohnehin vor allem vom Essen, die Runden sichern den Verbrauch ab.",
      },
      {
        q: "Wie schnell nehme ich damit ab?",
        a: "Realistisch sind ein bis zwei Kilo Fett pro Monat. Das klingt langsam, bleibt aber ohne Jojo-Effekt, weil Muskulatur und Essgewohnheiten erhalten bleiben. Nach vier Wochen siehst du den Trend auf der Waage und an den Zahlen der Runden.",
      },
    ],
  },

  "altstadt-nord/abnehmen": {
    answer:
      "Abnehmen in der Kölner Innenstadt hat ein eigenes Muster: Schritte machst du hier genug, aber gegessen wird fast immer auswärts, und dort verliert jedes Defizit. Deshalb plane ich dein Kalorienziel um Kantine, Lokal und Geschäftsessen herum, mit zwei Krafteinheiten pro Woche als Muskelschutz. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Altstadt-Nord: Kalorienziel für Kantine und Gastro statt Verbotsliste, zwei Krafteinheiten ab Bürotür, Muskelschutz im Defizit. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Viele Schritte, trotzdem kein Defizit",
        body: "Wer in Altstadt-Nord wohnt oder arbeitet, geht automatisch viel: 18.617 Menschen leben hier auf 2,46 km², dazu kommen täglich Zehntausende Pendler, und fast jeder Weg ist ein Fußweg. Trotzdem stagniert bei vielen das Gewicht. Der Grund: Diese Schritte sind längst dein Normalzustand, dein Körper hat sie eingepreist. Das Defizit entsteht im Zentrum nicht über noch mehr Bewegung, sondern über das, was mittags und abends auf den Tisch kommt.",
      },
      {
        title: "Auswärts essen mit Plan statt Verbotsliste",
        body: "Kantine, Mittagstisch, Geschäftsessen, nach Feierabend ein Lokal: In diesem Alltag scheitern Diätpläne, die auf selbst gekochte Mahlzeiten bauen. Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, legt mit dir stattdessen ein Tagesbudget und einfache Bestellregeln fest, die in jeder Karte funktionieren: Eiweißquelle zuerst, Beilage nach Budget, Getränke mitzählen. Du isst weiter dort, wo dein Tag stattfindet, nur nicht mehr blind.",
      },
      {
        title: "Zwei Krafteinheiten, die an deiner Bürotür starten",
        body: "Im Kaloriendefizit entscheidet Krafttraining darüber, ob Fett oder Muskel verschwindet. Deshalb stehen zwei Einheiten pro Woche fest im Kalender, und die Anfahrt ist hier kein Argument: Wir starten an deiner Büro- oder Wohnungstür, trainieren im Studio oder draußen am Rheinufer und sind nach 60 Minuten fertig. Auch eine lange Mittagspause reicht, wenn der Ablauf eingespielt ist.",
      },
      {
        title: "Gemessen wird die Richtung, nicht der Morgen danach",
        body: "Nach einem Geschäftsessen zeigt die Waage mehr an, das ist Wasser und kein Rückfall. Deshalb bewerten wir den Wochendurchschnitt und den Verlauf über vier Wochen: ein bis zwei Kilo Fett pro Monat sind das realistische Tempo. Dazu kommen Umfänge und die Zahlen aus dem Training, denn wenn die Kraft stabil bleibt, während das Gewicht sinkt, verlierst du das Richtige.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in der Kölner Innenstadt?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit App-Plan und wöchentlichen Check-ins ab 150€ im Monat. Die Ernährungsberatung mit Natalie wird im Erstgespräch dazugeplant, das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich esse mittags immer auswärts. Funktioniert das trotzdem?",
        a: "Ja, der Plan ist genau darauf gebaut. Du bekommst ein Tagesbudget und Bestellregeln statt Rezepte. Verzicht auf das Auswärtsessen wäre ohnehin nicht haltbar, also rechnen wir es von Anfang an ein.",
      },
      {
        q: "Reicht nicht einfach noch mehr Gehen?",
        a: "In Altstadt-Nord selten. Die Schritte des Innenstadtalltags sind schon in deinem Verbrauch enthalten, mehr davon bringt wenig zusätzliches Defizit. Wirksam ist die Kombination aus Essensbudget und zwei Krafteinheiten pro Woche.",
      },
      {
        q: "Wie trainieren wir, wenn ich kein Studio-Abo habe?",
        a: "Dann trainieren wir draußen am Rheinufer oder bei dir zu Hause mit mitgebrachtem Material. Für die schweren Grundübungen gibt es die Option Studio, nötig für den Start ist sie nicht.",
      },
    ],
  },

  "altstadt-sued/abnehmen": {
    answer:
      "Abnehmen in der Kölner Südstadt funktioniert nur mit einem Plan, der das Veedel-Leben einrechnet: Zwei Abende pro Woche bleiben frei für Severinstraße und Chlodwigplatz und stehen trotzdem im Kalorienbudget, die übrigen Tage tragen das Defizit. Dazu zwei Krafteinheiten pro Woche am Rheinufer oder im Studio. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in der Kölner Südstadt: Wochenplan mit zwei eingeplanten freien Abenden, Kölsch wird gerechnet statt verboten, Krafttraining am Rheinufer. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Zwei freie Abende sind Teil des Plans, nicht sein Scheitern",
        body: "Die Südstadt lebt abends, und ein Abnehmplan, der so tut, als wohntest du woanders, hält hier keine drei Wochen. Deshalb drehe ich es um: Zwei Abende pro Woche sind von vornherein frei, mit festem Kalorienrahmen statt schlechtem Gewissen. Die anderen fünf Tage tragen das Defizit. Ein Kölsch hat auf 0,2 Liter rund 100 Kilokalorien, das ist keine Katastrophe, sondern eine Zahl, und Zahlen kann man planen.",
      },
      {
        title: "Krafttraining zwischen Rheinauhafen und Südbrücke",
        body: "Damit das verlorene Gewicht aus dem Fett kommt und nicht aus der Muskulatur, stehen zwei Krafteinheiten pro Woche im Plan. In der Südstadt trainieren wir draußen am Rheinufer zwischen Rheinauhafen und Südbrücke mit mitgebrachtem Material oder im Studio, wenn du schwer heben willst. Die Einheiten dauern 60 Minuten und liegen bewusst nicht an deinen freien Abenden.",
      },
      {
        title: "Grüngürtel und Rheinufer zählen in dein Wochenziel",
        body: "Für den Verbrauch zwischen den Einheiten nutzt du, was die Südstadt ohnehin hat: die Runde über den Inneren Grüngürtel und das Rheinufer. Daraus machen wir zwei bis drei feste Geh-Blöcke pro Woche von 30 bis 40 Minuten, die in der App mitgezählt werden. Kein drittes Trainingsgerät, keine Anfahrt, nur eine Strecke, die du sowieso magst.",
      },
      {
        title: "Natalie rechnet, du isst weiter im Veedel",
        body: "Das Kalorienziel legt Natalie fest, unsere Ernährungsberaterin für Sport- und Fitnessernährung: realistisch für ein bis zwei Kilo Fett pro Monat, gerechnet als Wochenbudget, in dem die zwei freien Abende schon stecken. Bewertet wird der Verlauf über mehrere Wochen. Ein voller Samstag ist damit kein Rückfall, sondern eingeplant, und genau das macht den Plan haltbar.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in der Kölner Südstadt?",
        a: "Die 1-zu-1 Stunde kostet 50€, das Online Coaching mit Plan und wöchentlichen Check-ins ab 150€ im Monat. Das Erstgespräch ist kostenlos und klärt, welche Mischung zu deinem Ziel passt.",
      },
      {
        q: "Muss ich auf Kölsch und Essen gehen verzichten?",
        a: "Nein. Zwei Abende pro Woche sind mit festem Rahmen eingeplant, inklusive Kölsch. Verbote funktionieren in der Südstadt nicht, Budgets schon. Entscheidend ist, dass die übrigen Tage das Defizit tragen.",
      },
      {
        q: "Wo findet das Training statt, wenn meine Wohnung klein ist?",
        a: "Draußen am Rheinufer zwischen Rheinauhafen und Südbrücke, ich bringe das Material mit. Alternativ im Studio. Die typische Südstadt-Altbauwohnung braucht für diesen Plan keinen Trainingsplatz.",
      },
      {
        q: "Wann sehe ich erste Ergebnisse?",
        a: "Auf der Waage nach etwa vier Wochen als klarer Trend, sichtbar an Umfängen und Kleidung meist nach acht bis zwölf Wochen. Ein bis zwei Kilo Fett pro Monat sind das Tempo, das ohne Jojo-Effekt bleibt.",
      },
    ],
  },

  "bayenthal/ems-alternative": {
    answer:
      "Die ehrliche EMS-Alternative in Köln-Bayenthal ist Krafttraining mit echter Bewegung: zwei geführte Einheiten pro Woche bei dir zu Hause, am Rheinufer Süd oder im Studio, mit Gewichten, die über Monate steigen, statt Strom, der nur kribbelt. Die Stunde kostet 50€, ohne Laufzeit, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Bayenthal: Krafttraining mit echter Bewegung statt Stromreiz, zu Hause oder am Rheinufer Süd, ohne Vertragslaufzeit. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Der Stromreiz lehrt dich keine einzige Bewegung",
        body: "EMS lässt Muskeln anspannen, aber niemand lernt dabei, etwas zu heben. Im Alltag zählt genau das: der Wasserkasten in den dritten Stock, das Kind auf den Arm, die Gartenerde in den Kofferraum. Diese Bewegungen haben eine Technik, und die entsteht nur, wenn du sie unter Last übst, mit Rückmeldung bei jeder Wiederholung. Deshalb trainieren wir Heben, Drücken, Ziehen und Tragen als Bewegungen, nicht als Stromprogramm am stehenden Körper.",
      },
      {
        title: "Das Veedel ist klein, dein Trainingsplatz nicht",
        body: "Bayenthal misst 1,28 km², vom größten Teil des Veedels bist du in wenigen Minuten am Rheinufer Süd. Eine EMS-Sitzung findet dagegen immer im selben Raum am selben Gerät statt. Wir nutzen den Unterschied: Kraftarbeit bei dir zu Hause oder im Studio, dazu Einheiten draußen am Wasser, wo Ausdauer und Tragen gleich mittrainiert werden. Das Training wechselt mit der Jahreszeit, der Stromanzug kennt keine.",
      },
      {
        title: "Nach zwölf Wochen vergleichen wir dein Protokoll",
        body: "Beim EMS richtet sich die Intensität danach, wie stark es kribbelt, und das lässt sich weder notieren noch steigern. Bei mir steht jede Einheit im Protokoll: Übung, Gewicht, Wiederholungen. Nach zwölf Wochen liest du schwarz auf weiß, wie viel mehr du bewegst als am Anfang, typischerweise deutlich mehr, als ein Einsteiger erwartet. Diese Steigerung ist der Beweis, dass der Körper sich anpasst, und genau sie fehlt beim Reizstrom.",
      },
      {
        title: "Keine Laufzeit, kein Abo, keine Anfahrt",
        body: "EMS-Studios arbeiten fast immer mit längeren Vertragslaufzeiten. Bei mir zahlst du die geführte Stunde mit 50€ oder das Online Coaching ab 150€ im Monat, beides ohne Jahresbindung. In Bayenthal selbst kommt dazu, dass ich zu dir komme: kein Termin im Studioraum, kein Umziehen in fremden Kabinen. Wenn du nach dem Erstgespräch findest, dass EMS besser zu dir passt, sage ich dir das offen, dafür ist es da.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Bayenthal?",
        a: "Die geführte 1-zu-1 Stunde kostet 50€, ohne Vertragslaufzeit. Selbstständig mit Plan und wöchentlichen Check-ins trainierst du im Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe nur zweimal 30 Minuten pro Woche. Reicht das?",
        a: "Ja, wenn sie geplant sind. Zwei kompakte Einheiten mit Grundübungen schlagen auf Monate gerechnet jede 20-Minuten-Stromsitzung, weil die Last steigerbar ist. Ohne Anfahrt in Bayenthal bleiben die 30 Minuten auch wirklich Training.",
      },
      {
        q: "Bringt EMS denn gar nichts?",
        a: "Der Reiz ist real und als Ergänzung kann EMS seinen Platz haben. Was fehlt, sind Technik, Beweglichkeit und eine messbare Steigerung über Monate. Wer nur eine Sache macht, fährt mit echtem Krafttraining besser.",
      },
      {
        q: "Wo trainieren wir in Bayenthal?",
        a: "Bei dir zu Hause mit mitgebrachtem Material, draußen am Rheinufer Süd oder im Studio für die schweren Grundübungen. Die Mischung legen wir im kostenlosen Erstgespräch fest.",
      },
    ],
  },

  "elsdorf/personal-training": {
    answer:
      "Personal Training in Köln-Elsdorf findet bei dir statt: in deinem Haus, im Garten oder auf den ruhigen Wegen Richtung Zündorf, denn ein Studio gibt es im kleinsten Porzer Ortsteil nicht. Feste 60 Minuten, Plan nach Messung, 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Elsdorf: 1-zu-1 bei dir zu Hause oder im Garten, feste Termine ohne Anfahrt ins Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Im Dorf trainiert es sich besser als unterwegs",
        body: "Elsdorf ist mit 1.726 Einwohnern auf 1,77 km² einer der kleinsten Stadtteile Kölns, ein Dorf am rechten Rand von Porz zwischen Urbach, Wahnheide und Zündorf. Ein Fitnessstudio gibt es hier nicht, und die meisten, die mir von hier schreiben, haben es lange mit Anfahrten versucht: nach Porz-Mitte, nach Rath oder über die Autobahn. Irgendwann kippt jede Routine, die mit 25 Minuten Fahrt beginnt. Deshalb drehe ich es um und bringe das Training zu dir, mit Hanteln, Bändern und allem, was die Einheit braucht.",
      },
      {
        title: "Haus, Garten und die Wege ins Feld reichen völlig",
        body: "Die typischen Elsdorfer Grundstücke geben mehr her als jede Studiofläche zur Stoßzeit: Im Wohnzimmer oder Garten stehen die Grundübungen mit mitgebrachtem Gewicht, und für Ausdauerblöcke nehmen wir die ruhigen Straßen und Feldwege Richtung Zündorf und zur Groov. Dort lässt sich dieselbe Runde Woche für Woche wiederholen, und nur wiederholbare Strecken machen Fortschritt messbar. Wer zusätzlich schwere Langhantel-Einheiten will, legt einzelne Termine ins Studio.",
      },
      {
        title: "Ein kleiner Ort heißt: dein Plan ist wirklich deiner",
        body: "In einem Stadtteil dieser Größe arbeite ich nicht mit Schema F. Am Anfang steht ein Check aus Beweglichkeit, Kraft und ein paar ehrlichen Fragen zu deinem Alltag: Pendelst du zur Arbeit, sitzt du im Homeoffice, was hat früher funktioniert? Daraus entsteht ein Plan mit zwei festen Einheiten pro Woche. Alle vier bis sechs Wochen wird nachgemessen, und wenn sich nichts bewegt, ändere ich den Plan, nicht die Ausrede.",
      },
      {
        title: "Feste Termine schlagen gute Vorsätze",
        body: "Gerade außerhalb des Zentrums entscheidet die Verbindlichkeit: Ein Termin, zu dem jemand vor deiner Tür steht, fällt nicht aus, weil es regnet oder der Tag lang war. Viele meiner Kunden aus dem Kölner Südosten trainieren früh morgens vor dem Pendeln oder am frühen Abend, wenn die Kinder versorgt sind. Beides lässt sich in Elsdorf planen, weil die Wege kurz sind, sobald das Training zu dir kommt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Elsdorf?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und Material. Wer nach Plan selbst trainiert, nimmt das Online Coaching ab 150€ im Monat mit wöchentlichen Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe keine Geräte zu Hause. Geht das trotzdem?",
        a: "Ja. Ich bringe Kurzhanteln, Widerstandsbänder und was die Einheit sonst braucht mit. Für die ersten Monate reicht das vollständig, danach besprechen wir, ob sich eine kleine Grundausstattung für dich lohnt.",
      },
      {
        q: "Trainierst du auch draußen in Elsdorf?",
        a: "Ja, wenn Ziel und Wetter passen: Ausdauer- und Intervallblöcke auf den ruhigen Wegen Richtung Zündorf, Kraft im Haus oder Garten. Die Aufteilung richtet sich nach deinem Plan, nicht nach einem festen Muster.",
      },
      {
        q: "Lohnt sich Personal Training auch für Einsteiger?",
        a: "Gerade dann. Die ersten Wochen entscheiden über Technik und Gewohnheit, und beides lernt sich im 1-zu-1 schneller als allein. Viele starten mit zwei geführten Einheiten pro Woche und wechseln später auf eine plus Eigentraining.",
      },
    ],
  },

  "heimersdorf/personal-training": {
    answer:
      "Personal Training in Köln-Heimersdorf heißt 1-zu-1 bei dir zu Hause in der Siedlung, auf den autofreien Fußwegen zwischen den Wohnzeilen oder am Fühlinger See gleich nebenan. Zwei feste Einheiten pro Woche, Plan nach Messung, 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Heimersdorf: Training zu Hause, auf den Fußwegen der Siedlung oder am Fühlinger See. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Heimersdorf hat, was ein Training braucht: Ruhe und kurze Wege",
        body: "Zwischen Seeberg, Chorweiler und Pesch gelegen, ist Heimersdorf mit 6.278 Einwohnern eines der ruhigsten Veedel im Kölner Norden. Die Wohnzeilen sind durch Fußwege verbunden, auf denen kein Auto fährt, und genau dort lässt sich hervorragend arbeiten: Aufwärmen, Gehblöcke, Technikübungen mit dem eigenen Körpergewicht, direkt vor deiner Haustür. Für alles mit Gewicht komme ich mit Material zu dir in die Wohnung oder ins Reihenhaus.",
      },
      {
        title: "Der Fühlinger See ist deine Außenstelle",
        body: "Hinter Seeberg beginnt das Gelände am Fühlinger See, eine der größten zusammenhängenden Sport- und Erholungsflächen Kölns, von Heimersdorf aus in wenigen Minuten mit dem Rad erreichbar. Dorthin verlege ich die langen Einheiten: Intervalle auf den ebenen Wegen rund um die Seen, Ausdauerblöcke mit messbarer Runde. Im Veedel bleibt das kurze, häufige Training, am See das lange. Diese Mischung hält einen Plan über Monate am Leben.",
      },
      {
        title: "Kein Studio nötig, keine Blicke, kein Abo",
        body: "Viele Anfragen aus Chorweiler und Umgebung beginnen mit demselben Satz: Ich will erst in Form kommen, bevor ich mich in ein Studio stelle. Im 1-zu-1 entfällt dieses Problem komplett. Niemand schaut zu, kein Gerät ist besetzt, und du zahlst keine Grundgebühr für Monate, in denen du nicht hingehst. Du bezahlst die Stunde, in der trainiert wird, und bekommst dafür Technik, Korrektur und einen Plan, der zu deinem Kalender passt.",
      },
      {
        title: "Gemessen wird, sonst ist es nur Bewegung",
        body: "Am Anfang steht ein Eingangs-Check: Kraftwerte, Beweglichkeit, ein paar Umfänge, dazu deine Ziele in einem Satz. Danach trainieren wir zwei Mal pro Woche, und alle vier bis sechs Wochen vergleichen wir die Zahlen mit dem Start. So siehst du schwarz auf weiß, ob der Plan arbeitet. Tut er es nicht, wird er geändert. Diese Schleife ist der eigentliche Unterschied zum Training auf eigene Faust.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Heimersdorf?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und mitgebrachtem Material. Das Online Coaching mit Plan und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo genau trainieren wir in Heimersdorf?",
        a: "Bei dir zu Hause, auf den autofreien Fußwegen der Siedlung oder am Fühlinger See für die langen Einheiten. Was wann dran ist, legt der Plan fest, nicht die Gewohnheit.",
      },
      {
        q: "Ich war lange nicht mehr sportlich aktiv. Ist das ein Problem?",
        a: "Nein, das ist der Normalfall. Wir starten mit einem Check und bauen von dort auf, mit Übungen, die zu deinem heutigen Stand passen. Steigerung kommt aus sauberer Technik, nicht aus Härte in der ersten Woche.",
      },
      {
        q: "Geht Training auch zu zweit, etwa mit Partner oder Nachbarin?",
        a: "Ja, zu zweit funktioniert gut, wenn die Ziele ähnlich sind. Die Stunde wird dann geteilt geplant, mit eigenen Gewichten und eigener Progression für beide. Sprich es im kostenlosen Erstgespräch an.",
      },
    ],
  },

  "hoehenhaus/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Höhenhaus ist geführtes Krafttraining ohne Stromweste und ohne Jahresvertrag: zwei Einheiten pro Woche bei dir zu Hause in der Gartensiedlung, protokollierte Gewichte statt Kribbeln als Maßstab. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Höhenhaus: geführtes Krafttraining zu Hause statt Stromweste im Abo, Fortschritt im Protokoll. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Für EMS musst du aus Höhenhaus rausfahren, fürs Training nicht",
        body: "Höhenhaus ist ein Wohnveedel: 15.897 Menschen, viel Gartensiedlung, wenig Gewerbe. Wer hier eine EMS-Sitzung buchen will, fährt dafür in der Regel nach Mülheim oder in die Innenstadt, und aus den beworbenen 20 Minuten wird mit Fahrt und Umziehen schnell eine Stunde. Dieselbe Stunde kannst du komplett in Training investieren: Ich komme mit Material zu dir, und die Einheit beginnt an deiner Haustür statt an einer Studiotheke.",
      },
      {
        title: "Strom ersetzt keine Bewegung, die schwerer wird",
        body: "EMS reizt den Muskel elektrisch, während du statische Positionen hältst. Was dabei nicht passiert: Du bewegst kein steigendes Gewicht über volle Bewegungsumfänge. Kraft, die im Alltag trägt, entsteht aber genau daraus, aus Kniebeuge, Zug und Druck mit sauberer Technik und wachsender Last. Dazu kommt, was der Strom nicht lehren kann: Gleichgewicht, Koordination und das Gefühl dafür, wie viel dein Körper heute verträgt.",
      },
      {
        title: "Die Gartensiedlung ist dein Trainingsraum",
        body: "Die Siedlungshäuser mit Garten, die Höhenhaus prägen, sind für dieses Training ideal: Platz für Grundübungen mit Kurzhanteln und Band, im Sommer draußen, im Winter im Wohnzimmer. Für die Ausdauerbasis liegt der Dünnwalder Wald direkt hinter der Stadtteilgrenze, mit ebenen Wegen für feste Gehrunden oder lockere Läufe. Wer schwere Langhantel-Arbeit will, nimmt einzelne Studio-Termine dazu. Ein Abo braucht es für nichts davon.",
      },
      {
        title: "Dein Fortschritt steht im Protokoll, nicht im Gefühl",
        body: "Jede Einheit wird notiert: Übung, Gewicht, Wiederholungen, dazu alle paar Wochen ein paar Umfänge. Nach zwei Monaten vergleichen wir die Zahlen mit dem Start, und du siehst, was sich bewegt hat. Beim Stromtraining richtet sich die Intensität vor allem danach, wie stark es kribbelt, und genau deshalb bleibt der Fortschritt dort so schwer zu belegen. Messbarkeit ist kein Extra, sie ist der Grund, warum Training funktioniert.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Höhenhaus?",
        a: "Die geführte 1-zu-1 Stunde kostet 50€, ohne Vertragslaufzeit und inklusive Anfahrt. Wer selbstständig trainieren will, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "EMS verspricht Ergebnisse in 20 Minuten pro Woche. Was setzt du dagegen?",
        a: "Zwei Einheiten à 45 bis 60 Minuten bei dir zu Hause, ohne Anfahrt. Rechnet man bei EMS Fahrt nach Mülheim und Umziehen dazu, ist der Zeitunterschied klein, der Unterschied im Ergebnis nach einem halben Jahr nicht.",
      },
      {
        q: "Ich habe Rückenprobleme. Ist EMS da nicht schonender?",
        a: "Schonung ist nicht das Ziel, Belastbarkeit ist es. Ein kontrolliert gesteigertes Krafttraining mit sauberer Technik baut genau die Stützmuskulatur auf, die der Rücken braucht. Bei akuten Beschwerden gehört vorher ein ärztlicher Blick dazu, dann passe ich den Plan an.",
      },
      {
        q: "Kann ich mein EMS-Abo parallel weiterlaufen lassen?",
        a: "Wenn es dir Spaß macht, spricht nichts dagegen. Die messbare Entwicklung kommt aus den Grundübungen mit steigender Last, deshalb würde ich Zeit und Budget zuerst dort einsetzen und das Abo beim nächsten Stichtag ehrlich prüfen.",
      },
    ],
  },
  "holweide/abnehmen": {
    answer:
      "Abnehmen in Köln-Holweide plane ich um unregelmäßige Tage herum: ein Kalorienziel, das auch Schichtdienste übersteht, feste Gehrunden Richtung Thielenbruch und zwei Krafteinheiten pro Woche bei dir zu Hause. Natalie legt die Ernährung mit dir fest. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Holweide: Kalorienziel für unregelmäßige Tage und Schichtdienst, Gehrunden Richtung Thielenbruch, Kraft zu Hause. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Holweide lebt in Schichten, und Diätpläne tun das nicht",
        body: "Mit dem Krankenhaus Holweide steht mitten im Veedel einer der großen Kölner Klinikstandorte, und ein Teil der 21.001 Holweider arbeitet dort oder in ähnlichen Rhythmen: Frühdienst, Spätdienst, Nachtdienst. Die üblichen Abnehmpläne mit fünf festen Mahlzeiten um feste Uhrzeiten scheitern an so einem Kalender zuverlässig. Deshalb beginnt mein Plan nicht mit Uhrzeiten, sondern mit einem Wochenbudget an Kalorien, das sich auf gute und chaotische Tage verteilen lässt.",
      },
      {
        title: "Natalie baut die Ernährung um deinen Dienstplan",
        body: "Ernährungsberaterin Natalie setzt mit dir ein realistisches Defizit auf und übersetzt es in Mahlzeiten, die zu deinen Tagen passen: etwas Vorbereitetes für die Nachtschicht statt Kantinenlücke, ein spätes, sattes Essen nach dem Spätdienst ohne schlechtes Gewissen, einfache Regeln für die freien Tage. Gemessen wird am Wochenmittel auf der Waage, nicht am einzelnen Morgen, denn nach Nachtdiensten lügt das Tagesgewicht ohnehin.",
      },
      {
        title: "Die Gehrunden liegen vor der Tür, nicht hinter einer Anfahrt",
        body: "Holweide grenzt an Dellbrück, und dahinter beginnt mit dem Thielenbruch eines der ruhigsten Waldgebiete im Kölner Rechtsrheinischen. Daraus bauen wir zwei feste Runden, 30 und 45 Minuten, die unabhängig von der Schicht funktionieren: morgens nach dem Nachtdienst zum Runterkommen, nachmittags vor dem Spätdienst. Diese Runden sind der stille Motor des Abnehmens, denn sie erhöhen deinen Verbrauch, ohne Willenskraft zu kosten wie ein Studiobesuch.",
      },
      {
        title: "Zweimal Kraft pro Woche sichert, was du verlierst",
        body: "Im Kaloriendefizit entscheidet Krafttraining darüber, ob das verlorene Gewicht aus Fett oder aus Muskulatur besteht. Ich komme dafür mit Material zu dir nach Hause, zwei Einheiten pro Woche à 45 bis 60 Minuten, auf Wunsch um deinen Dienstplan herum terminiert und Woche für Woche neu gelegt. Nach acht Wochen vergleichen wir Gewichtstrend, Umfänge und Kraftwerte mit dem Start und stellen den Plan auf die Zahlen ein.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Holweide?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und Material. Das Online Coaching mit Plan, Ernährungssteuerung und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite im Schichtdienst. Funktioniert das wirklich?",
        a: "Ja, der Plan ist genau dafür gebaut: Kalorien als Wochenbudget statt fester Essenszeiten, Termine, die mit dem Dienstplan wandern, und Gehrunden, die zu jeder Tageszeit funktionieren. Gemessen wird am Wochentrend, nicht am einzelnen Tag.",
      },
      {
        q: "Wie schnell nehme ich damit ab?",
        a: "Geplant wird mit etwa 0,5 bis 1 Prozent Körpergewicht pro Woche, mehr verspreche ich nicht. Schnellere Diäten kosten Muskulatur und enden fast immer im Jojo. Nach acht Wochen zeigen Trend und Umfänge, ob das Tempo stimmt.",
      },
      {
        q: "Muss ich dafür in ein Studio?",
        a: "Nein. Kraft trainieren wir bei dir zu Hause mit mitgebrachtem Material, die Ausdauer kommt aus festen Gehrunden im Veedel und Richtung Thielenbruch. Einzelne Studio-Einheiten lassen sich dazulegen, nötig sind sie nicht.",
      },
    ],
  },

  "junkersdorf/personal-training": {
    answer:
      "Personal Training in Köln-Junkersdorf nutzt die beste Lage des Veedels: den Äußeren Grüngürtel vor der Haustür für die Außeneinheiten und dein Zuhause für die Kraftarbeit, geführt im 1-zu-1 mit gemessenem Fortschritt. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Junkersdorf: 1-zu-1 im Äußeren Grüngürtel oder bei dir zu Hause, Plan nach Messung statt Schema. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Junkersdorf liegt am grünen Rand, und genau da trainieren wir",
        body: "Der Äußere Grüngürtel zieht sich direkt an Junkersdorf entlang, und gleich hinter der Stadtteilgrenze in Müngersdorf beginnt der Sportpark rund ums Stadion. Für ein Veedel mit 15.301 Einwohnern auf großzügigen 7,38 km² ist das ein seltener Luxus: ebene, breite Wege für Läufe und Intervalle, Wiesen für Technik- und Sprungarbeit, alles ohne Anfahrt. Wer hier wohnt und trotzdem quer durch die Stadt ins Studio fährt, verschenkt seine beste Trainingsfläche.",
      },
      {
        title: "Draußen Ausdauer und Athletik, drinnen die Kraft",
        body: "Mein Aufbau für Junkersdorf ist zweigeteilt: Im Grüngürtel laufen wir Intervalle auf immer derselben Strecke, damit die Zeiten vergleichbar bleiben, und arbeiten an Schnelligkeit und Stabilität auf dem Rasen. Die Kraftarbeit findet bei dir zu Hause statt, mit mitgebrachten Gewichten und Band, oder auf Wunsch im Studio an der Langhantel. Was wann dran ist, bestimmt dein Ziel, nicht das Wetter: Für jede Außeneinheit existiert eine gleichwertige Variante für drinnen.",
      },
      {
        title: "Viele hier laufen schon. Ich mache daraus ein Training",
        body: "Die häufigste Sorte Anfrage aus dem Kölner Westen: Es wird seit Jahren gejoggt, zwei- bis dreimal pro Woche dieselbe Runde im selben Tempo, und es verändert sich nichts mehr. Das ist kein Motivationsproblem, sondern ein Reizproblem. Ich ergänze das Laufen um gezielte Intervalle und vor allem um Kraft, denn ab Mitte dreißig entscheidet die Muskulatur über Tempo, Haltung und Gelenke. Nach acht Wochen vergleichen wir deine Zeiten, nicht dein Gefühl.",
      },
      {
        title: "Feste Stunde, voller Fokus, keine Vertragsbindung",
        body: "Die Stunde gehört dir: Technik wird korrigiert, Gewichte werden gestellt, der Plan wird nach jedem Block angepasst. Terminlich lege ich mich auf feste Slots fest, früh vor der Arbeit oder am Abend, denn Regelmäßigkeit schlägt jede perfekt geplante Einzelwoche. Es gibt kein Abo und keine Laufzeit: Du zahlst die Stunde mit 50€ oder das Online Coaching ab 150€ im Monat, beides monatlich beendbar.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Junkersdorf?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und Material. Das Online Coaching mit Plan per App und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo findet das Training in Junkersdorf statt?",
        a: "Im Äußeren Grüngürtel und Richtung Sportpark Müngersdorf für Ausdauer und Athletik, bei dir zu Hause für die Kraftarbeit. Bei schlechtem Wetter hat jede Außeneinheit eine gleichwertige Indoor-Variante.",
      },
      {
        q: "Ich laufe schon regelmäßig. Was bringt mir ein Trainer zusätzlich?",
        a: "Struktur und Reizwechsel: gezielte Intervalle statt immer derselben Runde und Krafttraining für Tempo, Haltung und Gelenke. Die meisten Läufer verbessern ihre Zeiten in den ersten acht Wochen messbar, weil erstmals ein Plan dahinter liegt.",
      },
      {
        q: "Trainierst du in Junkersdorf auch früh morgens?",
        a: "Ja. Gerade Pendler und Selbstständige legen die Einheit auf 6:30 oder 7 Uhr in den Grüngürtel und sind vor dem ersten Termin fertig. Feste frühe Slots halten erfahrungsgemäß am längsten.",
      },
    ],
  },

  "nippes/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Nippes ist Krafttraining mit echten Übungen statt Stromweste: geführt im 1-zu-1 bei dir zu Hause, mit steigender Last und ohne Jahresvertrag. In Nippes ist EMS zwar in Reichweite, der Unterschied liegt in der Methode. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Nippes: echtes Krafttraining im 1-zu-1 statt Stromweste, steigende Last statt Kribbeln, ohne Jahresvertrag. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "In Nippes ist der Weg kein Argument, also reden wir über die Methode",
        body: "Anders als in den Randveedeln ist EMS von Nippes aus gut erreichbar, in einem dicht besiedelten Veedel mit 36.913 Einwohnern gibt es Anbieter in Reichweite. Die Entscheidung fällt hier also nicht über die Anfahrt, sondern über die Frage, was im Körper passiert. Beim EMS hältst du statische Positionen, während Strom den Muskel reizt. Bei mir bewegst du Gewichte über den vollen Bewegungsumfang, und die Last wächst von Woche zu Woche. Nur das Zweite kann dein Körper in Technik, Haltung und Alltagskraft übersetzen.",
      },
      {
        title: "Das 20-Minuten-Versprechen löst das falsche Problem",
        body: "EMS verkauft Zeitersparnis, aber der Engpass bei vollen Wochen ist selten die reine Trainingszeit, sondern der Aufwand drumherum: Termin buchen, hinkommen, umziehen, zurück. Genau den streiche ich, indem ich mit Material zu dir in die Wohnung komme. Zwei Einheiten à 45 bis 60 Minuten an deiner Haustür kosten in Summe kaum mehr Alltagszeit als zwei EMS-Termine mit allem Drumherum, und sie bauen etwas auf, das bleibt.",
      },
      {
        title: "Die Altbauwohnung reicht als Studio",
        body: "Für wirksames Krafttraining braucht es weniger Platz, als die Gerätewelt suggeriert: zwei mal zwei Meter im Wohnzimmer, Kurzhanteln, ein Band, eine Matte. Damit sind Kniebeuge, Zug, Druck und Rumpfarbeit in allen Stufen abbildbar, vom Wiedereinstieg bis zu fordernden Varianten. Wer irgendwann schwer an die Langhantel will, legt einzelne Studio-Termine dazu. Der Kern des Fortschritts entsteht trotzdem in der Wohnung, weil dort die Hürde am kleinsten ist.",
      },
      {
        title: "Ohne Bindung, mit Belegen",
        body: "EMS-Studios arbeiten überwiegend mit Laufzeitverträgen, bei mir gibt es keine: Du zahlst die Stunde mit 50€ oder das Online Coaching ab 150€ im Monat, beides monatlich beendbar. Was du dafür bekommst, lässt sich prüfen: Nach acht Wochen stehen deine Anfangswerte neben den aktuellen, von der Kniebeuge bis zum Rumpf. Wenn die Zahlen stillstehen, ändere ich den Plan. Dieses Risiko trage ich, nicht ein Vertrag, der weiterläuft.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Nippes?",
        a: "Die geführte 1-zu-1 Stunde kostet 50€, ohne Laufzeit und inklusive Anfahrt und Material. Das Online Coaching gibt es ab 150€ im Monat, monatlich beendbar. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe EMS probiert und fand es anstrengend. Reicht das nicht als Reiz?",
        a: "Anstrengung ist nicht dasselbe wie Fortschritt. Der Stromreiz fühlt sich intensiv an, aber er wächst nicht systematisch mit wie ein Gewicht, das jede Woche etwas schwerer wird. Für dauerhafte Veränderung braucht der Körper steigende, messbare Last.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse im Vergleich zu EMS?",
        a: "In den ersten vier Wochen verbessert sich vor allem Technik und Ansteuerung, ab Woche sechs bis acht werden Kraftwerte und Haltung sichtbar. Versprochen wird nichts, gemessen alles: Deine Startwerte stehen im Protokoll und werden regelmäßig verglichen.",
      },
      {
        q: "Passt das Training in eine Nippeser Altbauwohnung mit Nachbarn darunter?",
        a: "Ja. Geplant wird ohne Sprünge und ohne fallende Gewichte: Kniebeugen, Zug- und Druckübungen, Rumpfarbeit auf der Matte. Das ist leiser als ein Heimtrainer und braucht nur wenige Quadratmeter.",
      },
    ],
  },

  "porz/rueckentraining": {
    answer:
      "Rückentraining in Köln-Porz heißt: gezielter Kraftaufbau für Rumpf und hintere Kette in zwei Einheiten pro Woche, bei dir zu Hause oder im Studio, dazu das Rheinufer Porz für den aktiven Ausgleich. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Rückentraining in Köln-Porz: Kraft für Rumpf und hintere Kette, sauberes Heben statt Schonung, Ausgleich am Rheinufer. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "In Porz meldet sich der Rücken oft trotz Bewegung",
        body: "Porz ist das Zentrum des rechtsrheinischen Südens, 15.155 Menschen auf 3,12 km², und viele davon arbeiten körperlich: Lager, Handwerk, Pflege, Fahrdienste. Wer hier wegen Rückenschmerzen anfragt, sitzt selten den ganzen Tag. Das Problem ist ein anderes: Der Rücken trägt und hebt seit Jahren, aber ohne Ausgleich und ohne dass die Kraft planmäßig mitwächst. Die Lösung ist nicht Schonung, sondern ein Rumpf und eine hintere Kette, die stärker sind als das, was der Alltag von ihnen verlangt.",
      },
      {
        title: "Heben lernen statt Heben vermeiden",
        body: "Der Kern des Trainings sind die Bewegungen, die im Alltag wehtun, in sauberer Form und mit kontrollierter Steigerung: Kreuzheben-Varianten, Rudern, Tragen über Strecke. Du lernst, aus Hüfte und Beinen zu heben statt aus dem unteren Rücken, erst mit leichtem Gewicht, dann messbar schwerer. Nach ein paar Wochen merkst du das nicht im Studio, sondern beim Kasten Wasser und bei der Schicht. Eine klare Grenze gibt es: Bei akuten Schmerzen gehört der erste Weg zum Arzt, das Training beginnt erst, wenn Belastung freigegeben ist.",
      },
      {
        title: "Zu Hause, im Studio, und das Rheinufer als Ausgleich",
        body: "Die Krafteinheiten machen wir bei dir zu Hause, ich bringe Kurzhanteln, Bänder und das übrige Material mit, oder im Studio an der Langhantel. Für die Tage dazwischen hat Porz einen Vorteil, den viele unterschätzen: die flachen Wege am Rheinufer Porz. Zügiges Gehen dort ist der beste aktive Ausgleich für einen gereizten Rücken, kostet nichts und lässt sich auch nach einer Spätschicht noch unterbringen. Im Plan steht es als fester Baustein, nicht als netter Vorschlag.",
      },
      {
        title: "So startest du in Porz",
        body: "Am Anfang steht ein kostenloses Erstgespräch mit Beweglichkeits- und Kraftcheck: Wie bückst du dich, wie hebst du, wo zwickt es. Daraus entsteht ein Plan mit zwei geführten Einheiten pro Woche und kurzen Hausaufgaben von 10 bis 15 Minuten. Nach vier bis sechs Wochen vergleichen wir die Werte vom Anfang. Wenn sich Kraft und Beschwerden nicht bewegen, ändere ich den Plan, nicht die Ausrede.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Porz?",
        a: "Die 1-zu-1 Stunde kostet 50€. Wer lieber mit Plan und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Hilft Rückentraining auch, wenn ich körperlich arbeite?",
        a: "Gerade dann. Wer im Job hebt und trägt, braucht keinen geschonten Rücken, sondern einen, der mehr verträgt als die Schicht verlangt. Das Training macht genau diese Reserve planmäßig größer.",
      },
      {
        q: "Ich habe gerade akute Rückenschmerzen. Kann ich trotzdem anfangen?",
        a: "Nein, erst zum Arzt. Training ersetzt keine Diagnose. Sobald Belastung freigegeben ist, bauen wir die Kraft Schritt für Schritt wieder auf, das ist der Teil, den ich übernehme.",
      },
      {
        q: "Wo trainieren wir in Porz?",
        a: "Zu Hause mit mitgebrachtem Material oder im Studio. Das zügige Gehen am Rheinufer Porz kommt als Ausgleich an den trainingsfreien Tagen dazu.",
      },
      {
        q: "Reichen zwei Einheiten pro Woche für den Rücken?",
        a: "Ja, wenn sie geplant sind und die Hausaufgaben dazwischen stehen. Mehr Umfang bringt beim Rückentraining selten mehr, sauberere Steigerung dagegen fast immer.",
      },
    ],
  },

  "roggendorf-thenhoven/personal-training": {
    answer:
      "Personal Training in Roggendorf/Thenhoven heißt: 1-zu-1 Krafttraining bei dir zu Hause, ich bringe das Material mit, und für die Ausdauer liegt der Chorbusch direkt am Ortsrand. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Roggendorf/Thenhoven: 1-zu-1 bei dir zu Hause mit mitgebrachtem Material, Ausdauer im Chorbusch. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Zwei Dörfer, kein Studio, trotzdem volles Training",
        body: "Roggendorf/Thenhoven ist einer der dünnsten besiedelten Stadtteile Kölns: 4.784 Menschen auf 13,76 km², zwei Ortsteile mit dörflichem Kern, ganz im Nordwesten der Stadt. Ein Fitnessstudio gibt es im Veedel nicht, jede Einheit anderswo beginnt mit einer Autofahrt. Deshalb drehe ich es um: Das Training kommt zu dir. Kurzhanteln, Bänder, Matte und was sonst nötig ist, bringe ich mit, und ein paar Quadratmeter in Wohnzimmer, Garage oder Garten reichen für sauberes Krafttraining mit Steigerung.",
      },
      {
        title: "Der Chorbusch ist deine Ausdauerstrecke",
        body: "Am Rand des Stadtteils beginnt der Chorbusch, eines der großen Waldgebiete im Kölner Nordwesten. Die Wege dort sind flach, ruhig und lang genug für alles von lockeren Grundlagenläufen bis zu Intervallen. Für die Einheiten draußen ist das ein besserer Trainingsort als jedes Laufband: messbare Strecken, weicher Boden, keine Wartezeit an Geräten. Wer lieber geht statt läuft, nutzt dieselben Wege für zügige Runden mit klarer Zeitvorgabe.",
      },
      {
        title: "Ein Plan, der das Pendeln übersteht",
        body: "Wer hier wohnt, arbeitet selten um die Ecke. Lange Arbeitstage plus Fahrtzeit sind der Normalfall, und genau daran scheitern die meisten Studio-Anläufe: Nach der Rückfahrt noch einmal losfahren passiert auf Dauer nicht. Das Heimtraining spart diese zweite Fahrt komplett. Zwei feste Termine pro Woche, früh morgens oder am Abend bei dir, dazu kurze Hausaufgaben für die Tage dazwischen. Alle vier bis sechs Wochen vergleichen wir die Zahlen vom Start, damit du siehst, dass sich etwas bewegt.",
      },
      {
        title: "Für wen das in Roggendorf/Thenhoven passt",
        body: "Die typischen Anfragen aus den Dörfern im Kölner Norden kommen von Wiedereinsteigern, von Eltern, die das Training um Familie und Arbeit herum legen müssen, und von Leuten ab 40, die Kraft aufbauen wollen, bevor der Rücken oder die Knie entscheiden. Ehrlich gesagt: Wer die Gerätevielfalt eines Großstudios will, wird mit Heimtraining nicht glücklich. Wer Ergebnisse will, braucht aber keine 50 Maschinen, sondern eine Handvoll Übungen, die Woche für Woche schwerer werden, und jemanden, der das kontrolliert.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Roggendorf/Thenhoven?",
        a: "Die 1-zu-1 Stunde bei dir zu Hause kostet 50€. Das Online Coaching mit Trainingsplan per App und wöchentlichen Video-Check-ins gibt es ab 150€ im Monat. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Brauche ich eigene Geräte zu Hause?",
        a: "Nein. Ich bringe Kurzhanteln, Bänder und das übrige Material mit. Ein paar freie Quadratmeter reichen, auch in der Garage oder im Garten.",
      },
      {
        q: "Kommst du nach Roggendorf und nach Thenhoven?",
        a: "Ja, in beide Ortsteile. Trainiert wird bei dir zu Hause oder draußen, zum Beispiel auf den Wegen im Chorbusch.",
      },
      {
        q: "Geht auch reines Online Coaching?",
        a: "Ja, ab 150€ im Monat: Plan in der App, wöchentlicher Video-Check-in, Anpassung nach deinen Werten. Das passt gut, wenn deine Wochen durch Pendeln oder Dienstreisen unplanbar sind.",
      },
      {
        q: "Wie schnell sehe ich erste Ergebnisse?",
        a: "Die ersten Wochen verbessern vor allem Technik und Ansteuerung, ab Woche vier bis sechs steigen die Gewichte messbar. Wir vergleichen regelmäßig mit deinen Startwerten, versprochen wird nichts, gemessen alles.",
      },
    ],
  },

  "vogelsang/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Vogelsang braucht kein Studio an jeder Ecke: zwei geführte Krafteinheiten pro Woche mit Langhantel und Trainingsprotokoll, bei dir zu Hause oder im Studio, dazu ein Eiweißziel für den Alltag. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Vogelsang: 2 Krafteinheiten pro Woche mit Protokoll, zu Hause oder im Studio, Eiweißziel inklusive. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Wohnveedel ohne Fitnessmeile",
        body: "Vogelsang ist mit 8.336 Einwohnern auf 3,64 km² fast reines Wohngebiet zwischen Bickendorf, Bocklemünd und Müngersdorf. Eine Studiomeile wie an der Venloer Straße gibt es hier nicht, und genau daran scheitern viele Muskelaufbau-Vorsätze: erst die Fahrt, dann das volle Studio, nach drei Wochen bleibt man zu Hause. Mein Ansatz dreht das um. Entweder ich komme mit dem nötigen Equipment zu dir nach Vogelsang, oder wir trainieren gemeinsam im Studio, dann aber mit festem Termin, der nicht verhandelbar ist.",
      },
      {
        title: "Wenige Übungen, die sich lohnen müssen",
        body: "Muskeln wachsen nicht durch Abwechslung, sondern durch Wiederholung mit steigender Last. Dein Plan besteht deshalb aus einer Handvoll Übungen: eine Kniebeuge-Variante, eine Hüftstreckung, Drücken und Ziehen in zwei Richtungen. Jede Einheit steht im Protokoll mit Gewicht und Wiederholungen, und die nächste Einheit baut darauf auf. Nach acht Wochen liest du den Fortschritt in Zahlen ab, nicht im Spiegelgefühl.",
      },
      {
        title: "Gewachsen wird zwischen den Einheiten",
        body: "Zwei Krafteinheiten pro Woche reichen für kontinuierlichen Aufbau, wenn die Tage dazwischen stimmen: genug Schlaf, genug Eiweiß, leichte Bewegung statt Komplettpause. Als Richtwert bekommst du ein Eiweißziel pro Tag und ein paar einfache Wege, es ohne Kochmarathon zu erreichen. Mehr Regeln braucht es am Anfang nicht, und alles Weitere besprechen wir, wenn die Grundlagen sitzen.",
      },
      {
        title: "Wer aus Vogelsang anfragt",
        body: "Die typische Anfrage aus Vogelsang kommt nicht von Bodybuildern, sondern von Leuten zwischen 30 und 55, die merken, dass Kraft und Form nachlassen: nach Jahren ohne Sport, nach einer Verletzungspause, oder weil der Hausarzt zu Krafttraining geraten hat. Der Einstieg ist immer gleich: kostenloses Erstgespräch, Technik-Check, dann ein Plan, der zu deinem Kalender passt und nicht umgekehrt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Vogelsang?",
        a: "Die geführte 1-zu-1 Stunde kostet 50€. Wer selbstständig trainiert und nur Plan und Kontrolle will, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch kostet in beiden Fällen nichts.",
      },
      {
        q: "Kann ich in Vogelsang zu Hause Muskeln aufbauen?",
        a: "Ja. Für die ersten Monate reichen Kurzhanteln, Langhantel und das eigene Körpergewicht, das Equipment bringe ich mit. Wer später schwerer trainieren will, wechselt für einzelne Einheiten ins Studio.",
      },
      {
        q: "Wie lange dauert es, bis man Muskeln sieht?",
        a: "Kraftwerte steigen ab den ersten Wochen messbar. Sichtbare Veränderungen brauchen je nach Ausgangspunkt zwei bis vier Monate konsequentes Training. Wer anderes verspricht, verkauft etwas.",
      },
      {
        q: "Reichen zwei Einheiten pro Woche wirklich?",
        a: "Für die meisten Berufstätigen ja, wenn beide Einheiten geplant sind und die Last regelmäßig steigt. Drei Einheiten bringen mehr, aber nur, wenn sie dauerhaft in deine Woche passen.",
      },
    ],
  },

  "vogelsang/personal-training": {
    answer:
      "Personal Training in Köln-Vogelsang heißt: das Training kommt zu dir, nach Hause, an den Rand des Äußeren Grüngürtels oder ins Studio, mit einem Plan, der an deinem Kalender gemessen wird. Die Stunde kostet 50€, das Erstgespräch mit Bewegungs-Check ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Vogelsang: 1-zu-1 Training zu Hause, draußen oder im Studio, Plan mit messbaren Zielen. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Veedel, aus dem man für alles rausfährt",
        body: "Vogelsang liegt am Westrand des Bezirks Ehrenfeld: ruhig, grün, gut zum Wohnen, aber für Einkäufe, Ausgehen und eben auch fürs Fitnessstudio fahren die meisten der 8.336 Einwohner raus aus dem Veedel. Beim Training lässt sich genau diese Fahrt streichen: ich komme zu dir, und die Stunde beginnt an deiner Haustür statt auf dem Parkplatz eines Studios. Bei zwei Einheiten pro Woche spart das schnell zwei Stunden Wegezeit, und gestrichene Wegezeit ist der Hauptgrund, warum Leute dranbleiben.",
      },
      {
        title: "Erst der Check, dann der Plan",
        body: "Jede Zusammenarbeit beginnt mit dem kostenlosen Erstgespräch samt Bewegungs-Check: Wie bewegst du dich, was sagt die Vorgeschichte, was ist das Ziel in einem Satz. Daraus entsteht ein Plan mit Zahlen, an denen wir uns messen lassen: Kraftwerte, Gewicht im Wochenschnitt, Ausdauerwerte, je nach Ziel. Alle vier bis sechs Wochen wird nachgemessen, und wenn sich nichts bewegt, ändere ich den Plan und nicht die Ausrede.",
      },
      {
        title: "Wohnung, Wiese oder Studio, je nach Phase",
        body: "Vogelsang grenzt direkt an den Äußeren Grüngürtel, und von Frühjahr bis Herbst nutzen wir das: Krafttraining mit dem eigenen Körpergewicht und Zusatzlast auf der Wiese, Ausdauerblöcke auf den Wegen Richtung Müngersdorf. Im Winter verlagert sich das Training in deine Wohnung oder ins Studio. Der Plan bleibt derselbe, nur der Ort wechselt, und du brauchst dafür keine eigene Ausrüstung.",
      },
      {
        title: "Für wen Personal Training in Vogelsang gedacht ist",
        body: "Für Berufstätige, die es allein nicht ins Training schaffen, für Eltern, die das Zeitfenster zwischen Kita und Abendessen nutzen wollen, und für alle, die nach Pause oder Verletzung einen kontrollierten Wiedereinstieg brauchen. Nicht gedacht ist es für Leute, die nur einen Anschreier suchen: Ich korrigiere Technik und steuere Belastung, motivieren muss das sichtbare Ergebnis.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Vogelsang?",
        a: "50€ pro Stunde im 1-zu-1 Training, ohne Vertragslaufzeit. Das Erstgespräch mit Bewegungs-Check ist kostenlos, danach entscheidest du.",
      },
      {
        q: "Wo findet das Training in Vogelsang statt?",
        a: "Bei dir zu Hause, im Äußeren Grüngürtel direkt am Veedel oder im Studio. Den Ort legen wir nach Ziel, Jahreszeit und deinem Tagesablauf fest.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein, das ist der Normalfall. Der Bewegungs-Check am Anfang legt den Startpunkt fest, und gesteigert wird erst, wenn die Technik sitzt. Niemand muss fit sein, um anzufangen.",
      },
      {
        q: "Wie schnell merke ich etwas?",
        a: "Die ersten Wochen verbessern Technik und Alltagsgefühl, nach vier bis sechs Wochen zeigen die Messwerte die Richtung. Versprochen wird kein Datum, gemessen wird jedes Mal.",
      },
    ],
  },

  "altstadt-nord/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für die Kölner Innenstadt: Natalie betreut als Ernährungsberaterin für Sport- und Fitnessernährung Menschen, deren Essen zwischen Terminen stattfindet, per Video und App, ohne Kochplan-Illusionen. Die Beratung ist Teil des Online Coachings ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln Altstadt-Nord mit Natalie: Sport- und Fitnessernährung für den Arbeitstag zwischen Terminen, per Video und App. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Trainiert wird im Zentrum viel, gegessen nebenbei",
        body: "Altstadt-Nord ist das Veedel zwischen Dom, Hauptbahnhof und Ringen: 18.617 Einwohner, dazu jeden Tag die Belegschaften von Büros, Kanzleien und Hotels. Auffällig an den Anfragen von hier: trainiert wird längst, im Studio um die Ecke oder morgens an der Ringstrecke. Was fehlt, ist die Ernährungsseite, denn gegessen wird, was der Terminkalender übrig lässt: das Teilchen vom Bäcker im Gehen, mittags die schnelle Theke, abends spät und viel. Genau an diesem Muster setzt Natalie an.",
      },
      {
        title: "Eiweiß zuerst, und zwar über den ganzen Tag",
        body: "Für Trainingsfortschritt ist nicht nur die Eiweißmenge entscheidend, sondern ihre Verteilung, und die ist beim Innenstadt-Arbeitstag meist schief: morgens fast nichts, abends alles. Natalie legt mit dir ein Tagesziel fest und verteilt es auf die Fenster, die dein Kalender wirklich hat, mit konkreten Bestellungen für Bäcker, Kantine und Mittagstheke statt mit Rezepten, die eine Küche voraussetzen, die du um 13 Uhr nicht hast.",
      },
      {
        title: "Beratung, die zwischen zwei Termine passt",
        body: "Die Beratung läuft komplett online: Analysegespräch per Video, danach Plan und Anpassungen in der App und ein wöchentlicher Check-in von 15 bis 20 Minuten, der sich in eine Mittagspause legen lässt. Du musst nirgendwo hinfahren, nichts ausdrucken und kein Ernährungstagebuch von Hand führen. Fotos und kurze Notizen in der App reichen, den Rest wertet Natalie aus.",
      },
      {
        title: "Was Natalie macht und was nicht",
        body: "Natalie arbeitet mit gesunden Erwachsenen an Sport- und Fitnessernährung: Muskelaufbau, Gewichtsmanagement, Energie für Training und Arbeitstag. Sie behandelt keine Erkrankungen und ersetzt keine ärztliche Beratung. Wenn in deinem Fall medizinische Fragen offen sind, gehört die erste Station zum Arzt, und das sagt sie dir im Erstgespräch auch so.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in der Kölner Innenstadt?",
        a: "Die Beratung mit Natalie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Findet die Beratung vor Ort in Altstadt-Nord statt?",
        a: "Nein, die Ernährungsberatung läuft per Video und App. Für Menschen mit vollem Kalender ist das der Punkt, an dem sie durchhalten: kein zusätzlicher Weg, kein fester Ort, Check-in aus dem Büro.",
      },
      {
        q: "Ich esse fast immer auswärts. Funktioniert das trotzdem?",
        a: "Ja, der Plan wird genau darauf gebaut. Natalie arbeitet mit Bestell-Logik für Kantine, Theke und Restaurant statt mit Kochrezepten. Selbst kochen hilft, ist aber keine Voraussetzung.",
      },
      {
        q: "Brauche ich dafür ein Training bei FitPrimo?",
        a: "Die Beratung ist Teil des Online Coachings, in dem Training und Ernährung zusammen geplant werden. Wenn du schon woanders trainierst, passt Natalie die Ernährungsseite an dein bestehendes Training an.",
      },
    ],
  },

  "bayenthal/online-coaching": {
    answer:
      "Online Coaching für Köln-Bayenthal: Trainingsplan in der App, wöchentlicher Video-Check-in und ein Coach, der jede Einheit mitliest, egal ob du im Studio, in der Wohnung oder am Rhein trainierst. Ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Bayenthal: Plan in der App, wöchentlicher Video-Check-in, Technikkorrektur per Video. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Für alle, die längst trainieren, nur ohne Richtung",
        body: "Die typische Online-Coaching-Anfrage aus Bayenthal kommt nicht von Anfängern. Das Veedel liegt nah an der Innenstadt, viele der 11.161 Bewohner haben eine Studio-Mitgliedschaft dort, wo sie arbeiten, und trainieren seit Jahren, nur eben ohne Plan: dieselben Geräte, dieselben Gewichte, dasselbe Ergebnis. Online Coaching setzt genau da an. Du behältst dein Studio und deine Zeiten, neu sind das Programm, die Progression und jemand, der kontrolliert, ob beides eingehalten wird.",
      },
      {
        title: "Dein Training steht in der App, bevor du es machst",
        body: "Jede Woche liegt der Plan fertig in der App: Übungen, Sätze, Zielgewichte, aufgebaut auf dem, was du in der Vorwoche eingetragen hast. Bei Übungen, die neu für dich sind, lädst du ein kurzes Video hoch und bekommst die Korrektur, bevor sich ein Fehler einschleift. So entsteht der Effekt eines Personal Trainings, nur zeitversetzt und zu einem Drittel der Kosten bei zwei Einheiten pro Woche.",
      },
      {
        title: "Einmal pro Woche schauen wir auf die Zahlen",
        body: "Im wöchentlichen Video-Check-in geht es um drei Dinge: was der Trainingslog zeigt, was die Woche sonst gemacht hat, und was im Plan der nächsten Woche anders wird. Kein Smalltalk-Termin, sondern eine Viertelstunde Steuerung. Wenn Dienstreise oder Krankheit dazwischenkommen, wird der Plan umgebaut statt ausgesetzt, denn verlorene Wochen sind das, was Fortschritt im Selbsttraining normalerweise frisst.",
      },
      {
        title: "Was Bayenthal zum Plan beisteuert",
        body: "Die Ausdauerblöcke des Programms brauchen kein Laufband: vom kompakten Veedel bist du in wenigen Minuten am Wasser, und die flachen Kilometer stromaufwärts wie stromabwärts eignen sich für ruhige Grundlagenläufe nach Puls oder Tempo. Die Läufe trägst du wie jede Krafteinheit in die App ein, damit die Belastung der ganzen Woche zusammenpasst und nicht Kraft- und Lauftage sich gegenseitig die Erholung stehlen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Bayenthal?",
        a: "Ab 150€ im Monat, monatlich kündbar: Trainingsplan in der App, wöchentlicher Video-Check-in, Technikkorrektur per Video und Anpassungen, sooft die Woche es verlangt. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Worin unterscheidet sich das vom Personal Training vor Ort?",
        a: "Beim Personal Training stehe ich neben dir und korrigiere in der Sekunde, beim Online Coaching kommt die Korrektur zeitversetzt per Video. Dafür trainierst du, wann und wo du willst, zu deutlich geringeren Monatskosten.",
      },
      {
        q: "Brauche ich eine Studio-Mitgliedschaft?",
        a: "Nein. Der Plan wird auf das gebaut, was du hast: Studio, Kurzhanteln in der Wohnung oder nur Körpergewicht und ein Rheinufer vor der Tür. Mit mehr Ausrüstung geht mehr, aber der Einstieg geht mit wenig.",
      },
      {
        q: "Kann ich Online Coaching und 1-zu-1 Stunden kombinieren?",
        a: "Ja, das ist in Bayenthal sogar häufig: Online Coaching als Grundgerüst und einzelne 1-zu-1 Stunden für 50€, wenn eine neue Übung sauber gelernt werden soll.",
      },
    ],
  },

  "bilderstoeckchen/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Bilderstöckchen für Menschen, die körperlich arbeiten: Natalie plant dein Essen um Frühschicht, Pausenfenster und echte Erschöpfung herum statt um einen Bürotag. Per Video und App, als Teil des Online Coachings ab 150€ im Monat, Erstgespräch kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Bilderstöckchen: Essen nach Schichtplan, Eiweiß für die Erholung nach körperlicher Arbeit. Mit Natalie, per Video und App. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Körperliche Arbeit ist kein Freifahrtschein",
        body: "In Bilderstöckchen verdienen viele der 15.516 Einwohner ihr Geld mit den Händen, und daraus entsteht ein verbreiteter Irrtum: Wer den ganzen Tag schuftet, dürfe essen, was er will. Die Arbeit verbrennt viel, aber selten so viel, wie der Tag an Imbiss, süßen Pausen und Feierabendessen zurückbringt. Das Ergebnis sieht man oft erst mit 40: Gewicht rauf, Energie runter, obwohl der Job körperlich geblieben ist. Genau dieses Muster sortiert Natalie, ohne dir die Currywurst grundsätzlich zu verbieten.",
      },
      {
        title: "Essen nach Schichtplan statt nach Lehrbuch",
        body: "Ernährungsratgeber gehen von einem Tag aus, der um sieben beginnt und um 18 Uhr Feierabend macht. Eine Frühschicht sieht anders aus: Frühstück um fünf oder gar nicht, Pause um neun, die warme Mahlzeit irgendwann nach Schichtende. Natalie baut den Plan auf deine echten Zeiten: was vor der Schicht funktioniert, was in die Brotdose gehört, was abends auf den Tisch kommt, wenn die Familie mitisst. Der Plan muss zum Schichtzettel passen, nicht umgekehrt.",
      },
      {
        title: "Eiweiß ist Erholung, nicht nur Sportlerfutter",
        body: "Wer täglich hebt, trägt und steht, verschleißt Muskulatur wie ein Sportler im Training, isst aber selten wie einer. Zu wenig Eiweiß heißt dann: die Erholung über Nacht reicht nicht, und die Woche wird von Tag zu Tag zäher. Deshalb steht im Zentrum des Plans ein Eiweißziel mit alltagstauglichen Quellen vom Discounter, nicht mit Spezialprodukten. Das kostet kaum mehr, macht satt und nimmt dem Heißhunger am Abend die Grundlage.",
      },
      {
        title: "Beratung ohne zusätzlichen Termin quer durch die Stadt",
        body: "Nach acht Stunden Lager, Baustelle oder Station fährt niemand freiwillig noch zu einem Beratungstermin. Deshalb läuft die Ernährungsberatung per Video und App: das Analysegespräch legst du auf einen freien Nachmittag nach der Frühschicht, die wöchentlichen Check-ins dauern eine Viertelstunde und gehen vom Sofa aus. Zwischendrin reichen Fotos vom Teller in der App, Natalie sieht sie durch und sagt dir konkret, was sie ändern würde.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Bilderstöckchen?",
        a: "Sie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichem Check-in. Das Erstgespräch ist kostenlos, danach entscheidest du in Ruhe.",
      },
      {
        q: "Funktioniert das auch bei Wechselschicht?",
        a: "Ja. Der Plan hat dann zwei oder drei Varianten, eine pro Schichtlage, mit denselben Grundregeln. Das ist mehr Arbeit beim Erstellen, im Alltag aber einfacher als jede starre Diät.",
      },
      {
        q: "Muss ich kochen lernen oder Mahlzeiten vorbereiten?",
        a: "Nein. Vorkochen hilft, ist aber keine Bedingung. Natalie arbeitet mit dem, was dein Tag hergibt: Bäcker, Kantine, Imbiss, Discounter. Es geht um bessere Auswahl, nicht um ein zweites Leben in der Küche.",
      },
      {
        q: "Ich will vor allem abnehmen. Bin ich hier richtig?",
        a: "Ja, Gewichtsmanagement ist der häufigste Grund für Anfragen. Natalie setzt ein realistisches Kalorienziel und schützt mit dem Eiweißziel die Muskulatur, damit das verlorene Gewicht Fett ist und nicht Kraft.",
      },
    ],
  },

  "blumenberg/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Blumenberg: zwei feste Krafteinheiten pro Woche mit Protokoll, bei dir zu Hause in der Siedlung oder im Studio, dazu Eiweißziel und Nachmessen alle vier bis sechs Wochen. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Blumenberg: 2 geführte Krafteinheiten pro Woche mit Protokoll, zu Hause oder im Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ganz im Norden, und das Training kommt trotzdem pünktlich",
        body: "Blumenberg ist mit 5.147 Einwohnern eine der jüngsten Siedlungen Kölns, gebaut ab den späten Achtzigern am nördlichen Stadtrand zwischen Chorweiler und Worringen, mit eigener S-Bahn-Station an der S11. Wer hier wohnt, pendelt meist in die Innenstadt und kennt das Problem: Nach Arbeitsweg und Feierabendverkehr ist der Weg zu einem Studio die Hürde, an der das Vorhaben Muskelaufbau scheitert. Deshalb drehe ich es um und komme zu dir, mit allem, was für die ersten Monate an Ausrüstung nötig ist.",
      },
      {
        title: "Aufbau braucht Last, nicht Geräteparks",
        body: "Für stetigen Muskelaufbau reichen wenige Übungen, die immer schwerer werden: Kniebeugen und Ausfallschritte mit Zusatzgewicht, Kreuzheben-Varianten, Drücken und Rudern. Entscheidend ist nicht das Gerät, sondern das Protokoll: jede Einheit steht mit Gewicht und Wiederholungen im Log, und gesteigert wird nach Plan statt nach Tagesform. Wenn die Haushantel-Phase ausgereizt ist, verlegen wir einzelne Einheiten ins Studio und holen uns die schweren Grundübungen dazu.",
      },
      {
        title: "Essen und Schlaf entscheiden die Hälfte",
        body: "Das Training setzt den Reiz, wachsen muss der Körper selbst, und dafür braucht er Baumaterial und Ruhe. Du bekommst ein tägliches Eiweißziel mit einfachen Lösungen für Familientisch und Pendleralltag und die Regel, zwischen zwei Krafteinheiten mindestens einen Tag Luft zu lassen. Wer vier Mal pro Woche halbherzig trainiert, baut weniger auf als mit zwei harten, gut erholten Einheiten. Das klingt bequem, ist aber Physiologie.",
      },
      {
        title: "Ehrliche Erwartungen für den Start",
        body: "Die Kraftwerte steigen vom ersten Monat an, das zeigt jedes Protokoll. Sichtbare Veränderung an Schultern, Armen und Haltung braucht je nach Ausgangslage zwei bis vier Monate, bei Wiedereinsteigern oft schneller, weil der Körper sich erinnert. Im kostenlosen Erstgespräch schauen wir auf deinen Startpunkt und setzen ein Ziel, das in zwölf Wochen erreichbar ist, und dann wird gemessen statt gehofft.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Blumenberg?",
        a: "Die 1-zu-1 Stunde kostet 50€, ohne Laufzeitvertrag. Alternativ gibt es das Online Coaching ab 150€ im Monat mit Plan in der App und wöchentlichem Check-in. Das Erstgespräch ist immer kostenlos.",
      },
      {
        q: "Geht Muskelaufbau zu Hause in Blumenberg überhaupt?",
        a: "Ja, für die ersten Monate sehr gut: verstellbare Kurzhanteln, eine Langhantel und saubere Steigerung reichen weit. Erst wenn die Gewichte zu Hause nicht mehr ausreichen, lohnt sich das Studio für einzelne Einheiten.",
      },
      {
        q: "Ich pendle täglich. Wann soll das Training stattfinden?",
        a: "Die meisten Einheiten in Blumenberg lege ich früh vor der S-Bahn oder direkt nach Feierabend, damit kein zweiter Anlauf am Abend nötig ist. Der feste Termin ist Teil der Methode.",
      },
      {
        q: "Bin ich mit über 40 zu alt, um noch Muskeln aufzubauen?",
        a: "Nein. Der Aufbau geht langsamer als mit 25, aber er geht nachweislich in jedem Alter, und gerade ab 40 ist Krafttraining die beste Investition in Rücken, Stoffwechsel und Alltagskraft.",
      },
    ],
  },
  "buchheim/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Buchheim auch für alle, die noch nie eine Langhantel angefasst haben: Wir starten mit Technik an leichten Gewichten, steigern nach Protokoll und legen ein Eiweißziel fest. Zwei Einheiten pro Woche, 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Buchheim: Einstieg ohne Vorerfahrung, Technik vor Last, Protokoll und Eiweißziel. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Noch nie trainiert? Genau dafür ist das gebaut",
        body: "Viele Anfragen zum Muskelaufbau beginnen mit demselben Satz: Ich war noch nie im Studio und traue mich da nicht rein. In Buchheim muss das niemanden aufhalten. Die ersten Wochen laufen bei dir zu Hause, mit Material, das ich mitbringe. Kniebeuge, Rudern, Drücken, alles erst mit leichtem Gewicht, bis die Bewegung sitzt. Wer mit sauberer Technik startet, steigert sich danach schneller und verletzungsfrei. Wer mit Ego-Gewichten startet, steht nach sechs Wochen beim Arzt statt an der Hantel.",
      },
      {
        title: "Technik zuerst, dann wird gesteigert",
        body: "Der Plan für die ersten drei Monate ist bewusst schlicht: fünf bis sechs Grundübungen, zwei Einheiten pro Woche, jede Einheit steht im Protokoll. Gesteigert wird erst, wenn eine Übung technisch sauber ist, dann aber konsequent, in kleinen Schritten von Woche zu Woche. Für dich heißt das: Du musst dir nichts merken und nichts ausdenken. Du siehst im Protokoll, was du letzte Woche geschafft hast und was diese Woche dran ist.",
      },
      {
        title: "Essen gehört von Anfang an dazu",
        body: "Ohne Baumaterial kein Aufbau: Als Einsteiger brauchst du vor allem genug Eiweiß, als Faustwert 1,6 bis 2 Gramm pro Kilo Körpergewicht am Tag. Das klingt nach mehr, als es ist, wenn man es auf drei Mahlzeiten verteilt. Du bekommst von mir einen konkreten Zielwert und ein paar einfache Buchheimer Alltagslösungen dafür, ohne Pulverzwang und ohne dass du anders kochen musst als bisher.",
      },
      {
        title: "Buchheim liegt näher am Training, als viele denken",
        body: "Buchheim ist mit rund 13.000 Einwohnern auf 2,86 km² ein dichtes Wohnveedel ohne eigene Studiolandschaft, aber mit kurzen Wegen: Mülheim liegt direkt nebenan, die Merheimer Heide beginnt gleich hinter der südlichen Stadtteilgrenze. Fürs Krafttraining brauchst du davon erstmal nichts, das findet in deiner Wohnung statt. Die Heide nehmen wir später dazu, wenn du an trainingsfreien Tagen Bewegung willst, die die Erholung unterstützt statt sie zu stören.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Buchheim?",
        a: "Eine geführte 1-zu-1 Stunde kostet 50€. Wer nach der Technikphase selbstständig weitertrainieren will, wechselt ins Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe null Erfahrung mit Gewichten. Ist das ein Problem?",
        a: "Nein, es ist der Normalfall. Die ersten Einheiten laufen mit leichtem Gewicht und viel Technikarbeit. Niemand steht dabei und schaut zu: Wir trainieren bei dir zu Hause in Buchheim, bis du dich sicher fühlst.",
      },
      {
        q: "Brauche ich dafür Geräte in der Wohnung?",
        a: "Nein. Ich bringe Kurzhanteln, Widerstandsbänder und was sonst nötig ist mit. Erst wenn du nach einigen Monaten an schwerere Langhantelarbeit gehst, reden wir über Studio-Einheiten.",
      },
      {
        q: "Wie lange dauert es, bis man etwas sieht?",
        a: "Kraftzuwachs steht nach vier bis sechs Wochen messbar im Protokoll. Sichtbare Veränderung am Körper braucht als Einsteiger meist drei bis vier Monate, vorausgesetzt das Eiweißziel wird erreicht.",
      },
    ],
  },

  "dellbrueck/abnehmen": {
    answer:
      "Abnehmen in Köln-Dellbrück geht auch ohne Laufen: zügige Geh-Runden auf den Sandwegen der Dellbrücker Heide, zwei Krafteinheiten pro Woche und ein Kalorienziel, das Natalie mit dir festlegt. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Dellbrück ohne Laufzwang: Geh-Runden in der Dellbrücker Heide, 2 Krafteinheiten pro Woche, klares Kalorienziel. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Du musst nicht laufen, um abzunehmen",
        body: "Dellbrück ist ein Läuferveedel, und genau das entmutigt viele: Wer 20 oder 30 Kilo zu viel trägt, für den ist Joggen anfangs keine Hilfe, sondern eine Verletzungsquelle für Knie und Achillessehne. Die ehrliche Reihenfolge ist anders. Erst kommt das Kaloriendefizit aus dem Essen, dann Gehen als Grundverbrauch, dann Krafttraining als Muskelschutz. Laufen kommt irgendwann dazu, wenn Gewicht und Gelenke so weit sind, oder auch gar nicht. Abnehmen funktioniert auch komplett ohne.",
      },
      {
        title: "Die Heide ist zum Gehen besser als zum Rennen",
        body: "Die Dellbrücker Heide hat etwas, das kaum ein Kölner Park bietet: offene Sandflächen. Auf nachgiebigem Boden kostet jeder Schritt mehr Kraft als auf Asphalt, bei deutlich weniger Stoßbelastung für die Gelenke. Deine Runden dort sind also kein Spazierersatz, sondern ein planbarer Verbrauchsposten: drei bis vier feste Geh-Einheiten pro Woche, Dauer und Tempo steigen mit der Fitness. Wer lieber im Schatten geht, weicht auf die Waldwege Richtung Thielenbruch aus.",
      },
      {
        title: "Zwei Krafteinheiten entscheiden, was du verlierst",
        body: "Ohne Krafttraining verlierst du im Defizit Muskeln und Fett gemischt, und am Ende steht eine kleinere, aber weichere Version von dir. Deshalb gehören zwei geführte Krafteinheiten pro Woche fest in den Plan, bei dir zu Hause in Dellbrück oder im Studio. Dazu setzt Natalie, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, dein Kalorien- und Eiweißziel so, dass das Defizit wirkt, ohne dass du hungrig durch den Tag gehst.",
      },
      {
        title: "Gemessen wird am Umfang, nicht an der Tageslaune der Waage",
        body: "Die Waage schwankt mit Wasser, Salz und Zyklus, in den ersten Wochen oft gegen jede Logik. Deshalb messen wir alle zwei Wochen Bauchumfang und Gewicht im Wochenschnitt und entscheiden nach diesen Zahlen, nicht nach einem einzelnen Morgenwert. Bewegt sich vier Wochen nichts, ändern wir Essen oder Training. So weißt du jederzeit, ob der Plan arbeitet, statt es zu hoffen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Dellbrück?",
        a: "Die geführte 1-zu-1 Stunde kostet 50€. Das Online Coaching mit Trainingsplan, Ernährungssteuerung durch Natalie und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich dafür joggen können?",
        a: "Nein. Der Plan startet mit Geh-Runden in der Dellbrücker Heide und zwei Krafteinheiten pro Woche. Laufen nehmen wir nur dazu, wenn Gelenke und Gewicht es sinnvoll machen und du es willst.",
      },
      {
        q: "Wie schnell nehme ich damit ab?",
        a: "Realistisch sind 0,5 bis 1 Prozent des Körpergewichts pro Woche. Schneller heißt fast immer: mehr Muskelverlust und höhere Rückfallquote. Das Ziel ist ein Gewicht, das bleibt, nicht ein Crash-Ergebnis.",
      },
      {
        q: "Wo findet das Krafttraining statt?",
        a: "Bei dir zu Hause in Dellbrück mit Material, das ich mitbringe, oder im Studio. Für den Anfang reicht die Wohnung völlig, die Übungsauswahl passe ich an den Platz an.",
      },
    ],
  },

  "dellbrueck/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Dellbrück ist Krafttraining mit echter Last: zwei geführte Einheiten pro Woche, die auch deine Läufe in Heide und Thielenbruch schneller machen, ohne Stromweste und ohne Jahresvertrag. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Dellbrück: echtes Krafttraining statt Stromweste, mit Übertrag auf deine Läufe in der Heide. 50€/Std, ohne Vertrag, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Was der Stromreiz deinen Läufen nicht gibt",
        body: "Viele, die in Dellbrück über EMS nachdenken, laufen bereits: Heide, Thielenbruch, Königsforst. Gesucht wird ein Kraftzusatz, der wenig Zeit kostet. Genau da liegt das Problem: EMS reizt Muskeln im Stand, ohne Bewegung gegen steigende Last. Was Läuferknie, Hüfte und Waden belastbarer macht, ist aber genau das: Kniebeugen, Ausfallschritte, Wadenheben mit Gewicht, über Monate gesteigert. Der Stromreiz kann einen Muskel ermüden. Eine Bewegung stärker machen kann er nicht.",
      },
      {
        title: "Zwei Einheiten, die sich im Training draußen auszahlen",
        body: "Der Plan ist auf Übertrag gebaut: eine Einheit für Beine und Rumpf, eine für den Oberkörper und die Haltung, beide mit Übungen, deren Gewicht im Protokoll von Woche zu Woche steigt. Nach acht bis zwölf Wochen merkst du es dort, wo es zählt: Die letzten Kilometer in der Heide werden stabiler, Anstiege im Königsforst kosten weniger, und das Hohlkreuz am Ende langer Läufe verschwindet.",
      },
      {
        title: "Kein Studio-Umweg, kein Vertrag",
        body: "Trainiert wird bei dir zu Hause in Dellbrück mit mitgebrachtem Material oder im Studio, wie es dir passt. Es gibt keine Mindestlaufzeit und kein Abo: Du zahlst 50€ pro Stunde, solange das Training dir etwas bringt. EMS-Anbieter arbeiten fast immer mit Jahresverträgen ab etwa 80 bis 100€ im Monat. Rechne beides auf zwölf Monate hoch und vergleiche, was du am Ende kannst: messbar mehr Gewicht auf der Stange oder eine abgelaufene Mitgliedschaft.",
      },
      {
        title: "Wann EMS trotzdem eine Option ist",
        body: "Es gibt Fälle, in denen EMS seinen Platz hat, etwa als ärztlich begleiteter Wiedereinstieg, wenn normale Last noch nicht möglich ist. Wenn das auf dich zutrifft, sage ich dir das im Erstgespräch offen, statt dir eine Stunde zu verkaufen. Für gesunde Freizeitsportler mit dem Ziel Kraft, Figur oder bessere Laufleistung bleibt die Antwort klar: echte Last schlägt Strom, weil nur sie Bewegungen trainiert.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Dellbrück?",
        a: "50€ pro geführter Stunde, ohne Vertragslaufzeit. Zum Vergleich: EMS-Studios binden meist über Jahresverträge. Das Erstgespräch bei mir ist kostenlos, auch wenn dabei herauskommt, dass du mich nicht brauchst.",
      },
      {
        q: "Ich laufe schon viel. Reicht EMS nicht als Ergänzung?",
        a: "Fürs Laufen brauchst du Kraft in der Bewegung: Beinachse, Hüftstreckung, Rumpf unter Ermüdung. Das trainiert nur echte Last mit steigendem Gewicht. EMS reizt Muskeln im Stand und verbessert deine Laufökonomie nicht messbar.",
      },
      {
        q: "Wie viel Zeit kostet das pro Woche wirklich?",
        a: "Zwei Einheiten à 60 Minuten, bei dir zu Hause in Dellbrück ohne Anfahrt. Das ist mehr als die beworbenen 20 EMS-Minuten, aber mit Anfahrt zum EMS-Studio schrumpft der Unterschied, und das Ergebnis ist ein anderes.",
      },
      {
        q: "Kann ich Krafttraining und meine Läufe am selben Tag machen?",
        a: "Ja, wenn die Reihenfolge stimmt: erst Kraft, dann ein lockerer Lauf, oder beides mit einigen Stunden Abstand. Harte Tempoläufe und schwere Beineinheiten legen wir im Plan auf verschiedene Tage.",
      },
    ],
  },
  "fuehlingen/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Fühlingen macht bei uns Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ihr Fokus hier: Essen, das lange Einheiten am Fühlinger See trägt, mit Kohlenhydraten um das Training herum und klaren Eiweißmengen für die Erholung. Komplett online, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung für Köln-Fühlingen mit Natalie: Essen für lange Einheiten am Fühlinger See, Energie ums Training, Eiweiß für die Erholung. Online, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Dorf, in dem auffällig viel trainiert wird",
        body: "Fühlingen hat nur rund 2.200 Einwohner, aber mit dem Fühlinger See eine der meistgenutzten Ausdauer-Trainingsflächen Kölns direkt vor der Tür: Läufer und Radfahrer auf den vermessenen Wegen, Ruderer auf der Regattastrecke, Schwimmer im Freiwasser, dazu Triathlon-Wettkämpfe im Sommer. Wer hier wohnt und trainiert, hat selten ein Bewegungsproblem. Die häufigere Frage ist eine andere: Warum werde ich trotz der vielen Stunden nicht schneller, oder warum bleibt das Gewicht stehen?",
      },
      {
        title: "Ausdauertraining verzeiht falsches Essen nicht",
        body: "Lange Einheiten mit leerem Speicher fühlen sich diszipliniert an, bremsen aber genau die Anpassung, für die du trainierst. Natalie legt mit dir fest, wann Kohlenhydrate hingehören, nämlich gezielt vor und nach langen Einheiten statt gleichmäßig über den Tag verstreut, und wie viel Eiweiß deine Erholung tatsächlich braucht. Das Ergebnis ist kein Verzichtsplan, sondern eine Umverteilung: gleiche Lebensmittel, andere Zeitpunkte, spürbar mehr Energie in der zweiten Stunde.",
      },
      {
        title: "Abnehmen neben dem Ausdauertraining, ohne einzubrechen",
        body: "Viele am See trainieren auch, um Gewicht zu verlieren, und geraten in die klassische Falle: großes Defizit plus hohes Pensum, zwei Wochen läuft es, dann kommen Heißhunger, Infekt oder Leistungsknick. Natalie setzt das Defizit bewusst moderat an und legt es auf die richtigen Tage: an Ruhetagen weniger, um lange Einheiten herum normal. So verlierst du Fett, ohne dass die Form am See einbricht.",
      },
      {
        title: "Online-Beratung passt zum Dorf am Stadtrand",
        body: "Die Beratung läuft komplett online: Video-Termine, ein Plan, der zu deinem Training passt, kurze Check-ins zum Nachsteuern. Gerade in Fühlingen, wo jeder Termin in der Stadt eine Fahrt bedeutet, ist das der Punkt, an dem Beratung durchgehalten wird statt nach drei Wochen zu kippen. Wer zusätzlich Krafttraining will, kombiniert die Beratung mit 1-zu-1 Einheiten, für die ich zu dir komme.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Fühlingen?",
        a: "Die Beratung durch Natalie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich trainiere für einen Wettkampf am Fühlinger See. Hilft mir das?",
        a: "Ja, genau dafür ist der Schwerpunkt Sport- und Fitnessernährung da: Energie für lange Einheiten, Essen an Belastungstagen, Eiweiß für die Erholung. Medizinische Ernährungstherapie bietet Natalie nicht an.",
      },
      {
        q: "Muss ich dafür Kalorien zählen?",
        a: "Am Anfang ja, zwei bis drei Wochen, damit ihr wisst, wo du stehst. Danach arbeitet Natalie mit Portionslogik und festen Mahlzeiten-Bausteinen, die ohne tägliches Tracken funktionieren.",
      },
      {
        q: "Geht die Beratung auch ohne Ausdauersport?",
        a: "Ja. Der Ablauf ist derselbe: Bestandsaufnahme, Ziel, Wochenplan, Check-ins. Der Sport bestimmt nur, wie das Essen verteilt wird, nicht ob die Beratung funktioniert.",
      },
    ],
  },

  "niehl/online-coaching": {
    answer:
      "Online Coaching für Köln-Niehl ist für Schichtpläne gebaut: Trainingsplan in der App in einer Früh-, Spät- und Nachtschicht-Fassung, Check-ins per Video oder Sprachnachricht, wenn du wach bist. Ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching für Köln-Niehl: Trainingsplan, der mit deinem Schichtplan rotiert, Check-ins wann du wach bist. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Stadtteil, der im Schichttakt lebt",
        body: "Niehl ist mit den Ford-Werken und dem Hafen einer der großen Industriestandorte Kölns, und das prägt auch, wer hier wohnt: Viele der rund 20.000 Niehler arbeiten im Wechsel von Früh-, Spät- und Nachtschicht. Für klassische Studio-Kurse oder feste Trainer-Termine ist so ein Rhythmus Gift, jede zweite Woche fällt alles aus. Online Coaching dreht das um: Nicht du passt dich einem Stundenplan an, der Plan rotiert mit deiner Schicht.",
      },
      {
        title: "Drei Fassungen derselben Trainingswoche",
        body: "Dein Plan liegt in der App in drei Fassungen: In der Frühschicht trainierst du am frühen Nachmittag, in der Spätschicht vormittags, in der Nachtschichtwoche stehen kürzere Einheiten mit reduzierter Last, weil der Schlaf dann die knappste Ressource ist und Rekorde in dieser Woche nichts verloren haben. Du wechselst die Fassung mit einem Tipp, die Übungen und die Steigerungslogik bleiben dieselben. So reißt die Kette nicht ab, egal was der Dienstplan macht.",
      },
      {
        title: "Check-ins, wenn du wach bist, nicht wenn Büros offen haben",
        body: "Einmal pro Woche schauen wir gemeinsam auf deine Zahlen: erledigte Einheiten, Gewichte, Schlaf, Gewicht. Das geht per Video, aber genauso per Sprachnachricht am freien Vormittag, wenn deine Woche gerade keine festen Termine verträgt. Ich lese jede protokollierte Einheit mit und passe den Plan an, bevor sich Probleme festsetzen, etwa wenn die Nachtschichtwochen dauerhaft zu schwer geplant sind.",
      },
      {
        title: "Nordpark und Rheinufer für den Ausgleich",
        body: "Fürs Krafttraining reicht deine Wohnung mit wenig Material, das wir am Anfang gemeinsam festlegen. Für den Ausdauerteil hat Niehl mehr, als viele denken: Der Nordpark ist weitläufig und auch unter der Woche ruhig, am Rhein Richtung Merkenich laufen flache, lange Wege. Die lockeren Einheiten dort sind bewusst ohne Uhr geplant, als Gegengewicht zu einem Alltag, der ohnehin durchgetaktet ist.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Niehl?",
        a: "Ab 150€ im Monat, mit Trainingsplan in der App, Ernährungssteuerung und wöchentlichem Check-in. Keine Jahresbindung, das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite Wechselschicht. Funktioniert das wirklich?",
        a: "Ja, der Plan ist genau dafür gebaut: drei Fassungen pro Woche, die Nachtschicht-Fassung bewusst leichter. Du sagst mir deinen Schichtrhythmus im Erstgespräch, danach rotiert der Plan automatisch mit.",
      },
      {
        q: "Brauche ich ein Studio in der Nähe?",
        a: "Nein. Die Pläne funktionieren mit Grundausstattung zu Hause, und den Ausdauerteil legen wir in den Nordpark oder ans Rheinufer. Wer ein Studio nutzen will, bekommt die Studio-Fassung derselben Einheiten.",
      },
      {
        q: "Was passiert, wenn ich eine Woche komplett ausfalle?",
        a: "Dann setzt der Plan nicht einfach fort, als wäre nichts gewesen: Ich passe die Folgewoche an, meist mit einer leichten Wiedereinstiegseinheit. Ausfälle sind im Schichtalltag normal und im System eingeplant.",
      },
    ],
  },

  "pesch/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Pesch ist geführtes Krafttraining, das zu dir nach Hause kommt: zwei Einheiten pro Woche mit echter Last und Protokoll, null Anfahrt, kein Jahresvertrag. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Pesch: echtes Krafttraining bei dir zu Hause statt 20 Minuten Strom plus Anfahrt. 50€/Std, ohne Vertrag, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Rechne die 20 Minuten ehrlich in Zeit um",
        body: "Das EMS-Versprechen lautet: nur 20 Minuten pro Woche. Nur steht das Studio dafür nicht in Pesch. Von hier aus heißt das: hinfahren, umziehen, Weste anlegen, trainieren, duschen, zurückfahren. Aus 20 Minuten Strom wird schnell eine Stunde und mehr, Woche für Woche. Beim Training mit mir fällt genau dieser Posten weg: Ich komme mit dem Material zu dir, die Stunde beginnt an deiner Haustür und endet dort. Netto trainierst du länger und bist trotzdem nicht mehr Zeit los.",
      },
      {
        title: "Die Stunde steckt voller Arbeit, nicht voller Strom",
        body: "Der zweite Unterschied ist der Inhalt. EMS reizt viele Muskeln gleichzeitig im Stehen, aber niemand lernt dabei eine Kniebeuge, ein Kreuzheben oder einen sauberen Zug. Genau diese Bewegungen sind es, die Alltag und Rücken stärker machen, weil sie mit steigendem Gewicht trainierbar sind. In deinem Protokoll steht nach drei Monaten schwarz auf weiß, wie viel mehr du bewegst. Ein Kribbeln unter der Weste kann man nicht steigern, nur lauter drehen.",
      },
      {
        title: "Training, das in Haus und Garten passt",
        body: "Pesch ist ein ruhiges Wohnveedel mit knapp 7.800 Einwohnern, viel Einfamilien- und Reihenhausbestand und ohne eigene Studioszene. Für das Training ist das kein Nachteil: Wohnzimmer, Keller oder Garten reichen für den kompletten Plan. Ich bringe Kurzhanteln, Bänder und Zusatzlast mit. Im Sommer verlegen wir Einheiten nach draußen, die Felder Richtung Esch und Auweiler liegen für Geh- und Lauf-Hausaufgaben direkt vor der Tür.",
      },
      {
        title: "Ohne Bindung, mit offenem Vergleich",
        body: "EMS läuft fast immer über Jahresverträge. Bei mir zahlst du pro Stunde und hörst auf, wann du willst, auch das gehört zu einer ehrlichen Alternative. Und wenn im kostenlosen Erstgespräch herauskommt, dass für dich tatsächlich EMS sinnvoller wäre, etwa weil du nach ärztlicher Vorgabe vorerst keine normale Last bewegen sollst, sage ich dir das offen. In allen anderen Fällen gilt: Bewegung unter steigender Last schlägt Strom im Stand.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Pesch?",
        a: "50€ pro geführter 1-zu-1 Stunde, ohne Vertragslaufzeit und ohne Anfahrtkosten für dich. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Gibt es in Pesch überhaupt ein EMS-Studio?",
        a: "In Pesch selbst wirst du kaum fündig, die Anbieter sitzen Richtung Innenstadt und in den größeren Veedeln. Genau deshalb lohnt der Zeitvergleich: Training bei dir zu Hause spart die Fahrt komplett.",
      },
      {
        q: "Ist echtes Krafttraining nicht anstrengender als EMS?",
        a: "Anstrengend sind beide. Der Unterschied: Beim Krafttraining steuern wir die Last exakt und steigern sie planbar. Die Einheiten starten so leicht, wie dein Stand es verlangt, auch mit 50 oder 60 Jahren.",
      },
      {
        q: "Was brauche ich an Ausrüstung zu Hause?",
        a: "Nichts. Kurzhanteln, Widerstandsbänder und Zusatzgewichte bringe ich mit. Ein paar Quadratmeter freie Fläche im Wohnzimmer, Keller oder Garten reichen aus.",
      },
    ],
  },

  "pesch/rueckentraining": {
    answer:
      "Rückentraining in Köln-Pesch ist bei mir Aufbau in Stufen: Nach einer Schmerz-Episode bekommt dein Rücken erst kontrollierte, dann steigende Last, bis du ihm wieder vertraust. Trainiert wird 1-zu-1 bei dir zu Hause in Pesch, eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Rückentraining in Köln-Pesch: stufenweiser Kraftaufbau nach der Schmerz-Episode, 1-zu-1 bei dir zu Hause, mit Protokoll. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Nach dem Schreck kommt die Schonung, und die macht es schlimmer",
        body: "Die häufigste Geschichte, die ich höre, geht so: Der Rücken hat einmal richtig zugemacht, seitdem wird vorsichtig gehoben, der Sport ruht, jede Bewegung wird abgewogen. Verständlich, aber genau diese Schonung hält das Problem am Leben. Ein Rücken, der nichts mehr tragen muss, wird schwächer, und ein schwächerer Rücken meldet sich schneller. Sobald ärztlich geklärt ist, dass nichts Strukturelles dagegen spricht, ist steigende Belastung der Weg zurück, nicht noch mehr Vorsicht.",
      },
      {
        title: "Vertrauen wird trainiert wie Kraft: in Stufen",
        body: "Wir fangen dort an, wo du dich sicher fühlst, oft mit Hüftbeugen ohne Gewicht, Zugübungen mit Band und kurzen Trageübungen. Dann wird es von Woche zu Woche ein Stück schwerer, und jeder Schritt steht im Protokoll. So siehst du schwarz auf weiß: Vor vier Wochen waren 8 Kilo Thema, heute sind es 16, und nichts ist passiert. Diese Belege nehmen dem Kopf die Angst, und der Kopf ist beim Rücken oft die halbe Baustelle.",
      },
      {
        title: "Das Training kommt nach Pesch, mit allem, was es braucht",
        body: "Pesch ist ein ruhiges Veedel mit knapp 7.800 Einwohnern, ein eigenes Studio gibt es hier nicht. Für dein Rückentraining brauchst du auch keins: Ich komme mit Bändern, Kurzhanteln und Gewichten zu dir, Wohnzimmer oder Garten reichen für den kompletten Aufbau. Zwei Einheiten pro Woche à 60 Minuten, dazu eine kurze Routine von zehn Minuten für die Tage dazwischen, die ohne Material funktioniert.",
      },
      {
        title: "Was das Training leistet und wo der Arzt zuständig ist",
        body: "Klare Grenze: Akute Schmerzen, Taubheit oder Ausstrahlung ins Bein gehören zuerst in ärztliche Abklärung, das ersetzt kein Training der Welt. Mein Teil beginnt danach: aus einem freigegebenen, aber verunsicherten Rücken wieder einen belastbaren machen. Im kostenlosen Erstgespräch gehen wir deine Vorgeschichte durch und legen fest, auf welcher Stufe wir einsteigen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Pesch?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt nach Pesch und Material. Das Erstgespräch ist kostenlos. Wer nach dem Aufbau selbstständig weitermachen will, kann ins Online Coaching ab 150€ im Monat wechseln.",
      },
      {
        q: "Mein Rücken hat vor Monaten blockiert. Darf ich überhaupt wieder Gewichte heben?",
        a: "Das klärt zuerst dein Arzt. Gibt er grünes Licht, ist Heben mit sauberer Technik und passender Last genau das Richtige: Die Muskulatur um die Wirbelsäule wird stärker und schützt sie bei allem, was der Alltag verlangt.",
      },
      {
        q: "Wie lange dauert es, bis ich dem Rücken wieder vertraue?",
        a: "Die meisten spüren nach vier bis sechs Wochen den Unterschied: Bewegungen, die sie vermieden haben, gehen wieder ohne Nachdenken. Der volle Aufbau auf alltagsfeste Kraft dauert eher drei bis sechs Monate, je nach Ausgangspunkt.",
      },
      {
        q: "Brauche ich Geräte zu Hause in Pesch?",
        a: "Nein. Bänder, Kurzhanteln und Zusatzgewichte bringe ich mit. Ein freier Platz von zwei mal zwei Metern reicht, im Sommer geht auch der Garten.",
      },
    ],
  },

  "weidenpesch/abnehmen": {
    answer:
      "Abnehmen in Köln-Weidenpesch plane ich dort, wo dein Defizit wirklich entsteht: beim Wocheneinkauf. Dazu kommen zwei Krafteinheiten pro Woche und die Runde um Rennbahn und Weidenpescher Park als fester Bewegungsanteil. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Weidenpesch: Defizit, das beim Wocheneinkauf beginnt, zwei Krafteinheiten pro Woche, Gehrunden um Rennbahn und Park. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Dein Defizit entsteht im Einkaufswagen, nicht am Esstisch",
        body: "Abends um neun gewinnt immer das, was da ist. Deshalb setzen wir nicht bei der Willenskraft an, sondern eine Stufe früher: beim Wocheneinkauf. Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, baut mit dir einen Einkauf, der satt macht und trotzdem ins Kalorienziel passt, mit genug Eiweiß und mit Platz für die Dinge, die du nicht hergeben willst. Was nicht im Schrank liegt, musst du abends nicht wegdiskutieren.",
      },
      {
        title: "Zwei Krafteinheiten entscheiden, woraus die Kilos bestehen",
        body: "Wer nur weniger isst, verliert Muskeln gleich mit, und der Verbrauch sinkt. Deshalb gehören zwei Krafteinheiten pro Woche fest in den Plan: Grundübungen mit Hanteln und Bändern, bei dir zu Hause in Weidenpesch oder im Studio. Gewichte und Wiederholungen notiere ich mit. Solange die Kraftwerte halten oder steigen, kommt das verlorene Gewicht aus dem Fett, und genau das wollen wir.",
      },
      {
        title: "Rennbahn und Park: deine Grundbewegung liegt vor der Tür",
        body: "Weidenpesch hat, was vielen Veedeln fehlt: eine große, zusammenhängende Grünfläche direkt im Stadtteil. Die Runde am Weidenpescher Park entlang der Galopprennbahn ist eben, beleuchtet nah an der Neusser Straße und in einer halben bis dreiviertel Stunde gegangen. Drei bis vier dieser Runden pro Woche heben deinen Verbrauch spürbar, ohne dass du dafür joggen oder ein Studio buchen musst. Im Plan stehen sie als feste Bausteine, nicht als guter Vorsatz.",
      },
      {
        title: "Gemessen wird, was zählt: Trend und Umfang",
        body: "Die Waage springt mit Wasser und Tagesform, deshalb schauen wir auf den Wochenschnitt und auf den Bauchumfang. Ein halbes bis ein Kilo pro Woche nach unten ist das gesunde Tempo, alles darüber kostet meist Muskeln. Alle vier Wochen setzen wir uns über die Zahlen: Was hat funktioniert, wo hakt der Einkauf, was ändern wir. So bleibt der Plan deiner, statt ein Programm von der Stange zu sein.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Weidenpesch?",
        a: "Die 1-zu-1 Trainingsstunde kostet 50€. Wenn Natalie die Ernährungsseite mit dir plant, besprechen wir den Umfang im kostenlosen Erstgespräch. Online Coaching mit Plan und wöchentlichen Check-ins gibt es ab 150€ im Monat.",
      },
      {
        q: "Muss ich für das Abnehmen joggen?",
        a: "Nein. Das Defizit kommt aus dem Essen, die Gehrunden um Rennbahn und Park sichern den Verbrauch, das Krafttraining schützt die Muskulatur. Laufen kannst du später ergänzen, wenn du Lust darauf hast, nötig ist es nicht.",
      },
      {
        q: "Wie schnell nehme ich realistisch ab?",
        a: "Ein halbes bis ein Kilo pro Woche im Schnitt. Bei 8 bis 10 Kilo Ziel bist du also eher drei bis fünf Monate unterwegs. Das klingt langsam, hält aber, weil unterwegs keine Muskulatur verloren geht.",
      },
      {
        q: "Was ist, wenn meine Familie normal weiteressen will?",
        a: "Dann plant Natalie genau damit. Der Einkauf wird so gebaut, dass dieselben Gerichte auf dem Tisch stehen können und nur deine Portionen und Beilagen anders gewichtet sind. Ein zweiter Kochtopf ist keine Bedingung.",
      },
    ],
  },

  "ehrenfeld/online-coaching": {
    answer:
      "Online Coaching für Köln-Ehrenfeld ist für Wochen gebaut, die nie gleich aussehen: Dein Trainingsplan in der App atmet mit, in Deadline-Wochen kürzer, in ruhigen Wochen mehr, dazu ein wöchentlicher Video-Check-in. Ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Ehrenfeld: Plan, der mit Projektphasen atmet, Video-Check-ins, Ernährungssteuerung. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ehrenfeld arbeitet in Wellen, dein Plan sollte das auch tun",
        body: "In Ehrenfeld arbeiten auffällig viele Menschen selbstständig oder in Projekten: Agentur, Atelier, eigener Laden an der Venloer Straße. Der Kalender kennt dort keine gleichmäßigen Wochen, sondern Abgabephasen und Luft danach. Ein starrer Plan mit drei festen Terminen scheitert daran zuverlässig. Dein Online-Plan hat deshalb zwei Gänge: eine volle Woche mit drei Einheiten und eine Minimalwoche mit zwei kurzen, die auch eine Deadline übersteht. Du sagst mir, welche Woche ansteht, der Plan passt sich an.",
      },
      {
        title: "Die Minimalwoche ist der eigentliche Trick",
        body: "Fortschritt stirbt selten an zu wenig Ehrgeiz, sondern an Null-Wochen: Eine volle Woche fällt aus, dann noch eine, dann ist der Faden weg. Die Minimalwoche verhindert genau das. Zwei Einheiten à 30 Minuten, zu Hause oder im Studio deiner Wahl, halten Kraft und Gewohnheit am Leben. Nach der Abgabe schaltest du wieder hoch, ohne von vorn anzufangen. Über ein Jahr schlägt dieses Auf und Ab jede Vorsatz-Phase, die im Februar endet.",
      },
      {
        title: "Check-in, wenn es bei dir passt, nicht um neun Uhr morgens",
        body: "Einmal pro Woche schauen wir per Video auf deine Woche: Trainingslog, Gewichtstrend, wie die Einheiten sich angefühlt haben. Zwischendurch schickst du Technik-Videos direkt aus der App, ich antworte mit kurzen Korrekturen. Termine lege ich auch abends oder in die Mittagszeit, und wer in Ehrenfeld wohnt, kann den Check-in mit einer 1-zu-1 Stunde im Inneren Grüngürtel tauschen, wenn es mal wieder echtes Gegenüber braucht.",
      },
      {
        title: "Essen in einem Veedel, das an jeder Ecke kocht",
        body: "Zwischen Venloer Straße und Körnerstraße ist gutes Essen immer drei Minuten entfernt, und ein Ernährungsplan, der das ignoriert, hält keine zwei Wochen. Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, rechnet deine Auswärts-Abende in ein Wochenbudget ein, statt sie zu verbieten. Du bekommst einfache Regeln für die Bestellung und ein Eiweißziel pro Tag, der Rest bleibt dein Leben.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Ehrenfeld?",
        a: "Ab 150€ im Monat: Trainingsplan in der App, wöchentlicher Video-Check-in, Technik-Feedback und Ernährungssteuerung. Das Erstgespräch ist kostenlos, 1-zu-1 Stunden vor Ort lassen sich für 50€ dazunehmen.",
      },
      {
        q: "Brauche ich ein Fitnessstudio in Ehrenfeld?",
        a: "Nein. Der Plan wird auf das geschrieben, was du hast: ein Studio deiner Wahl, Kurzhanteln zu Hause oder nur das eigene Körpergewicht plus Band. Beim Wechsel der Umgebung wird der Plan umgeschrieben, nicht dein Ziel.",
      },
      {
        q: "Was passiert, wenn ich eine Woche komplett ausfalle?",
        a: "Dann greift die Minimalwoche mit zwei kurzen Einheiten. Fällt auch die aus, starten wir die Folgewoche eine Stufe leichter und holen den Faden wieder auf. Der Plan rechnet mit deinem Kalender, nicht gegen ihn.",
      },
      {
        q: "Wie unterscheidet sich das vom Training vor Ort?",
        a: "Online steuere ich dich über Plan, Videos und Check-ins, trainieren tust du allein und flexibel. Vor Ort korrigiere ich jede Wiederholung direkt. Viele in Ehrenfeld kombinieren beides: online als Basis, eine 1-zu-1 Stunde, wenn eine neue Übung ansteht.",
      },
    ],
  },

  "stammheim/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Stammheim ist Krafttraining mit echter Last statt Stromweste, gerade wenn dir EMS als die schonende Lösung ab 50 verkauft wurde: Knochen und Gelenke werden von steigenden Gewichten stärker, nicht von Impulsen. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Stammheim: echtes Krafttraining statt Stromweste, auch und gerade ab 50. 1-zu-1 bei dir oder am Schlosspark, 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Wort 'gelenkschonend' führt dich in die falsche Richtung",
        body: "EMS wird gern an Menschen verkauft, die sich für zu alt oder zu empfindlich fürs Gewichtstraining halten: 20 Minuten, kein Gewicht, klingt vernünftig. Nur wollen Knochen und Gelenke gar nicht geschont werden, sie wollen belastet werden. Knochen reagieren auf Zug und Druck, Sehnen und Knorpel auf wiederholte, dosierte Last. Genau die fehlt, wenn der Reiz aus der Weste kommt statt aus einer Bewegung mit Gewicht. Schonung ist für die Tage nach dem Training, nicht als Methode.",
      },
      {
        title: "Dosiert heißt: an dich angepasst, nicht leicht",
        body: "Der Einstieg richtet sich nach deinem Stand, nicht nach deinem Geburtsjahr. Wir beginnen mit Varianten, die deine Gelenke heute können, oft Kniebeugen zur Bank, Zugübungen mit Band, Tragen mit Kurzhanteln. Dann steigt die Last in kleinen Schritten, und jeder Schritt steht im Protokoll. Nach zwölf Wochen vergleichen wir: mehr Gewicht bei denselben Übungen, Treppen und Einkaufstaschen als Nebeneffekt leichter. Das ist der Unterschied, den eine Stromweste nicht liefert.",
      },
      {
        title: "Stammheim hat kein EMS-Studio, und braucht auch keins",
        body: "Für EMS müsstest du aus Stammheim ohnehin rausfahren, Richtung Mülheim oder weiter. Fürs Krafttraining nicht: Ich komme mit Material zu dir, und für Technikarbeit, Ausgleich und Geh-Einheiten liegt der Schlosspark Stammheim mit dem Rheinufer direkt vor der Tür. Zwei geführte Einheiten pro Woche à 60 Minuten reichen für einen sauberen Aufbau, ganz ohne Vertrag mit Laufzeit.",
      },
      {
        title: "Wo EMS bleiben darf und was es nicht ersetzt",
        body: "EMS kann einen Reiz setzen, wenn gar nichts anderes stattfindet, und manche mögen den kurzen Termin. Nur ersetzt es weder das Bewegungslernen noch die steigende Last, an der Kraft, Knochendichte und Alltagssicherheit hängen. Wenn du schon bei EMS warst und wissen willst, wo du stehst: Im kostenlosen Erstgespräch machen wir einen einfachen Kraft-Check, danach weißt du, womit wir arbeiten.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Stammheim?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und Material, ohne Jahresvertrag. Zum Vergleich: EMS-Studios liegen meist bei 80 bis 120€ im Monat mit Laufzeit. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich bin über 50 und war lange nicht beim Sport. Ist Gewichtstraining nicht riskant?",
        a: "Mit Begleitung ist es das Gegenteil: Der Einstieg wird an deine Gelenke angepasst und steigt langsam. Riskanter ist auf Dauer die fehlende Kraft, denn sie entscheidet über Stürze, Treppen und Selbstständigkeit. Bei Vorerkrankungen klären wir den Start mit deinem Arzt.",
      },
      {
        q: "EMS verspricht Ergebnisse in 20 Minuten pro Woche. Warum reicht das nicht?",
        a: "Weil der Körper auf Bewegung unter steigender Last umbaut, nicht auf Reizminuten. 20 Minuten Strom lassen sich nicht steigern wie ein Gewicht, und genau an der Steigerung hängt der Fortschritt. Zweimal 60 Minuten echte Arbeit pro Woche schlagen das zuverlässig.",
      },
      {
        q: "Wo trainieren wir in Stammheim?",
        a: "Meist bei dir zu Hause, Material bringe ich mit. Bei gutem Wetter verlegen wir Teile in den Schlosspark oder ans Rheinufer, fürs Hanteltraining mit mehr Gewicht gibt es die Studio-Option. Den Mix legen wir im Erstgespräch fest.",
      },
    ],
  },

  "bickendorf/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Bickendorf dreht den üblichen Ansatz um: Schnell wird, wer bremsen kann. Wir trainieren Abstoppen, Landen und Richtungswechsel auf den Wiesen des Äußeren Grüngürtels, die Kraft dahinter im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Bickendorf: Abbremsen, Landen, Richtungswechsel im Äußeren Grüngürtel, Kraft im Studio. Für Fußballer und Hobbysportler. 50€/Std.",
    sections: [
      {
        title: "Die meisten Verletzungen passieren beim Bremsen, nicht beim Sprinten",
        body: "Zerrung beim Abstoppen, Umknicken nach der Landung, Knieprobleme beim Richtungswechsel: Wer am Wochenende Fußball oder Tennis spielt, kennt mindestens eine dieser Geschichten. Der Antritt wird in jedem Training geübt, das Abbremsen fast nie, dabei wirken dort die größten Kräfte. Genau deshalb beginnt Athletiktraining bei mir mit der Frage, wie du stoppst und landest, nicht wie schnell du auf 30 Metern bist.",
      },
      {
        title: "Der Äußere Grüngürtel ist das passende Übungsgelände",
        body: "Am Westrand von Bickendorf, Richtung Vogelsang, liegt der Äußere Grüngürtel mit breiten, ebenen Rasenflächen. Rasen verzeiht beim Lernen von Landungen und Richtungswechseln mehr als Asphalt, und Platz für Übungsreihen über 10 bis 20 Meter ist immer da. Dort arbeiten wir an Abstopp-Serien, Sprüngen mit sauberer Landung und Wechseln unter Tempo. Von den meisten Ecken Bickendorfs bist du zu Fuß in zehn Minuten dort.",
      },
      {
        title: "Bremsen braucht Kraft, und die holen wir im Studio",
        body: "Abfangen ist Muskelarbeit: Beinachse, hintere Kette, Rumpf. Deshalb gehört zu den Außeneinheiten eine Studioeinheit mit Kniebeugen-Varianten, einbeinigen Übungen und Zugarbeit. Gewichte und Sprungwerte stehen im Protokoll, alle vier bis sechs Wochen wird gemessen: Sprunghöhe, Stopp-Qualität, Sprintzeit. Du siehst, ob das Training wirkt, bevor die Saison es zeigt.",
      },
      {
        title: "Für wen das in Bickendorf gedacht ist",
        body: "Für Amateurfußballer und Tennisspieler aus den Vereinen im Kölner Westen, die immer wieder an denselben kleinen Verletzungen hängen bleiben. Für Läufer, die stabiler werden wollen. Und für alle ab 40, die ihren Sport behalten wollen, ohne jedes Jahr eine Zwangspause zu schieben. Das Einstiegsniveau prüft der Technik-Check am Anfang, nicht dein Lebenslauf.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Bickendorf?",
        a: "50€ pro 1-zu-1 Stunde, das Erstgespräch ist kostenlos. Wer nach dem Technik-Block eigenständig weitertrainieren will, bekommt das Online Coaching ab 150€ im Monat mit Plan und Video-Check-ins.",
      },
      {
        q: "Ich spiele nur einmal pro Woche Fußball. Lohnt sich Athletiktraining trotzdem?",
        a: "Gerade dann. Einmal Vollgas pro Woche ohne Vorbereitung ist das klassische Zerrungs-Rezept. Eine gezielte Einheit pro Woche plus kurze Hausaufgaben machen den Spieltag deutlich sicherer.",
      },
      {
        q: "Wo genau trainieren wir in Bickendorf?",
        a: "Draußen auf den Rasenflächen des Äußeren Grüngürtels zwischen Bickendorf und Vogelsang, die Kraftarbeit im Studio. Im Winter verschiebt sich der Mix nach drinnen, die Inhalte bleiben gleich.",
      },
      {
        q: "Hilft das Training nach einer Verletzung?",
        a: "Nach abgeschlossener Reha ja: Der Wiedereinstieg in Stopps, Sprünge und Richtungswechsel ist genau die Lücke zwischen Physiotherapie und Mannschaftstraining. Die Freigabe deines Arztes oder Physios ist dafür die Voraussetzung.",
      },
    ],
  },

  "loevenich/online-coaching": {
    answer:
      "Online Coaching für Köln-Lövenich ist für Pendler gebaut: Dein Training beginnt an der Haustür, nicht nach einer zweiten Fahrt. Plan in der App für Wohnzimmer, Garten und Feldwege, Check-in per Video am Abend oder Wochenende. Ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Lövenich: Training ab Haustür statt zweiter Fahrt, App-Plan, Video-Check-ins, Ernährungssteuerung. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Die zweite Fahrt des Tages killt jeden Trainingsplan",
        body: "Lövenich lebt in vielen Fällen nach demselben Muster: morgens mit S-Bahn oder Auto in die Stadt, abends zurück, und dann soll noch einmal jemand freiwillig losfahren, Richtung Studio in Weiden oder Ehrenfeld. Nach ein paar Wochen gewinnt das Sofa, verständlicherweise. Das Online Coaching dreht die Logik um: Die Einheit wartet zu Hause, beginnt zwanzig Minuten nach dem Ausstieg und braucht keinen Parkplatz. Die Hürde zwischen Feierabend und Training ist eine Zimmertür.",
      },
      {
        title: "Was in einem Lövenicher Haushalt an Plan möglich ist",
        body: "Mehr, als die meisten denken. Mit zwei Kurzhanteln, einem Band und einer Tür reichen drei Einheiten à 40 Minuten für einen sauberen Kraftaufbau, und wer Garten oder Keller hat, kann mit wenig Zubehör über Jahre steigern. Jede Übung liegt als Video in der App, deine Gewichte und Sätze trägst du direkt ein, ich lese mit. Wenn Material fehlt, sage ich dir, welche zwei Anschaffungen wirklich etwas bringen, mehr braucht es selten.",
      },
      {
        title: "Die Feldwege Richtung Widdersdorf sind dein Ausdauerteil",
        body: "Am Rand von Lövenich beginnen die Feldwege Richtung Widdersdorf und Weiden: flach, ruhig, ohne Ampeln. Im Plan stehen sie als feste Geh- oder Laufblöcke, je nach Ziel zwei bis drei pro Woche. Das ist der Teil, den kein Studio dir abnimmt und der hier buchstäblich vor der Tür liegt. Fürs Protokoll zählt die Zeit in Bewegung, nicht das Tempo, gerade am Anfang.",
      },
      {
        title: "Kontrolle läuft übers Wochenende, nicht über Bürozeiten",
        body: "Einmal pro Woche sehen wir uns per Video, bei Pendlern meist am frühen Abend oder samstags: Trainingslog, Gewichtstrend, nächste Woche. Zwischendurch schickst du Technik-Videos aus der App und bekommst kurze Korrekturen zurück. Und wenn eine neue Übung ansteht oder die Technik hakt, nehme ich eine 1-zu-1 Stunde bei dir in Lövenich dazu, danach läuft es wieder online weiter.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Lövenich?",
        a: "Ab 150€ im Monat: Trainingsplan in der App, wöchentlicher Video-Check-in, Technik-Feedback per Video und Ernährungssteuerung. Das Erstgespräch ist kostenlos. Einzelne 1-zu-1 Stunden vor Ort kosten 50€.",
      },
      {
        q: "Ich habe kein Studio in Lövenich. Reicht Training zu Hause wirklich?",
        a: "Für Kraftaufbau auf Alltagsniveau und deutlich darüber: ja. Entscheidend ist die Steigerung, nicht der Gerätepark. Der Plan wird auf dein Material geschrieben, und wenn du später doch ein Studio nimmst, schreibe ich ihn um.",
      },
      {
        q: "Wann finden die Check-ins statt?",
        a: "Dann, wenn dein Tag es hergibt: früher Abend nach der Rückfahrt oder am Wochenende. Der Termin steht fest wie eine Trainingseinheit, dauert aber nur 20 bis 30 Minuten.",
      },
      {
        q: "Funktioniert das auch, wenn ich im Homeoffice arbeite?",
        a: "Sogar besonders gut: Dann liegt die Einheit in der Mittagspause oder direkt nach Feierabend, und die Feldwege übernehmen die Rolle des Arbeitswegs, der sonst für Bewegung sorgt. Der Plan unterscheidet Büro- und Homeoffice-Tage, wenn du beides hast.",
      },
    ],
  },
  "blumenberg/abnehmen": {
    answer:
      "Abnehmen in Köln-Blumenberg funktioniert bei mir über Sättigung statt Verbote: Eiweiß und Volumen zuerst auf den Teller, dazu feste Geh-Runden über die Felder Richtung Worringer Bruch und zwei Krafteinheiten pro Woche bei dir zu Hause. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Blumenberg: satt essen statt hungern, Geh-Runden über die Felder, zwei Krafteinheiten pro Woche zu Hause. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Satt werden ist die halbe Diät",
        body: "Die meisten Abnehmversuche scheitern nicht an fehlender Disziplin, sondern am Hunger um 21 Uhr. Deshalb drehe ich die Reihenfolge um: Erst kommt das Eiweiß auf den Teller, dann Gemüse und Beilagen mit Volumen, und erst danach wird gerechnet. Wer satt ist, braucht keine Verbotsliste. Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, baut dir diese Teller-Logik aus Gerichten, die du ohnehin kochst. Verboten ist nichts, auch nicht das Eis mit den Kindern am Wochenende.",
      },
      {
        title: "Die Felder hinter der Siedlung sind deine Verbrauchsstrecke",
        body: "Blumenberg ist mit rund 5.100 Einwohnern eine überschaubare Siedlung am nördlichen Stadtrand, und genau dahinter beginnt offenes Land: Feldwege Richtung Worringen und zum Worringer Bruch, flach und ohne eine einzige Ampel. Dort legen wir deine Geh-Runden fest, 30 bis 45 Minuten, an festen Tagen. Das ist kein Sportprogramm, das ist dein Grundverbrauch, und er beginnt direkt an der Haustür statt hinter einer Anfahrt.",
      },
      {
        title: "Zweimal Kraft pro Woche, damit das Gewicht aus Fett verschwindet",
        body: "Ohne Krafttraining verlierst du im Defizit Muskeln mit, und der Körper verbraucht danach weniger als vorher. Deshalb gehören zwei geführte Krafteinheiten pro Woche in den Plan, bei dir zu Hause mit Material, das ich mitbringe, oder im Studio. Grundübungen, moderate Gewichte, saubere Steigerung. So bestimmen wir, woraus die verlorenen Kilos bestehen.",
      },
      {
        title: "Kontrolle ohne Waagen-Drama",
        body: "Gewogen wird täglich, bewertet wird wöchentlich: Zählen tut nur der Sieben-Tage-Schnitt, dazu Bauchumfang und zwei, drei Fotos im Monat. Einmal pro Woche schauen wir gemeinsam auf die Zahlen und stellen nach. Realistisch sind 0,3 bis 0,5 Kilo pro Woche, und zwar so, dass du den Weg mit Familie, Job und normalem Essen durchhältst.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Coaching in Köln-Blumenberg?",
        a: "Die 1-zu-1 Stunde kostet 50€. Wer vor allem Plan und Kontrolle braucht, fährt mit dem Online Coaching ab 150€ im Monat oft besser: Ernährungsziel, Trainingsplan und wöchentlicher Check-in. Das Erstgespräch kostet nichts.",
      },
      {
        q: "Muss ich dafür in ein Studio fahren?",
        a: "Nein. Die Krafteinheiten machen wir bei dir zu Hause, das Material bringe ich mit. Die Geh-Runden liegen auf den Feldwegen hinter der Siedlung. Wer lieber im Studio trainiert, bekommt den Plan dafür.",
      },
      {
        q: "Welche Lebensmittel muss ich streichen?",
        a: "Keine. Wir arbeiten mit einem Kalorienrahmen und einer Teller-Reihenfolge, die satt macht: Eiweiß zuerst, dann Volumen. Was in den Rahmen passt, ist erlaubt. Verbote funktionieren nur bis zum ersten Geburtstag im Freundeskreis.",
      },
      {
        q: "Wie schnell nehme ich damit ab?",
        a: "Geplant sind 0,3 bis 0,5 Kilo pro Woche im Sieben-Tage-Schnitt. Das klingt unspektakulär, summiert sich aber in drei Monaten auf vier bis sechs Kilo, die nicht zurückkommen, weil die Muskulatur erhalten bleibt.",
      },
    ],
  },

  "urbach/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Urbach: zwei geführte Krafteinheiten pro Woche mit steigender Last und Protokoll, bei dir zu Hause oder im Studio. Wer körperlich arbeitet, trainiert bei mir anders als ein Büromensch, aber trainieren muss er trotzdem. 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Urbach: geplante Steigerung statt schwerer Arbeit, zwei Einheiten pro Woche zu Hause oder im Studio. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Den ganzen Tag auf den Beinen heißt nicht trainiert",
        body: "Viele Anfragen aus dem Kölner Südosten klingen gleich: Ich arbeite doch körperlich, warum wachse ich nicht? Die Antwort ist unbequem: Arbeit belastet immer gleich, Muskelaufbau braucht steigende Last. Wer acht Stunden trägt, hebt und steht, hat abends einen müden Körper, aber keinen Wachstumsreiz. Genau da setzt das Training an: wenige, schwere Sätze mit geplanter Steigerung, die deine Arbeit nicht liefert.",
      },
      {
        title: "Zwei Einheiten, die neben Job und Familie stehen bleiben",
        body: "Urbach ist mit rund 13.000 Einwohnern auf gut zwei Quadratkilometern eines der dichter besiedelten Veedel im Bezirk Porz: Reihenhäuser, Familien, volle Tage. Deshalb plane ich zwei Einheiten pro Woche, nicht vier, und lege sie auf feste Slots, früh morgens oder nach Feierabend. Zu Hause reicht eine freie Ecke, das Material bringe ich mit. Wer ein Studio bevorzugt, bekommt den Plan dort umgesetzt.",
      },
      {
        title: "Das Protokoll entscheidet, nicht das Gefühl",
        body: "Jede Einheit steht im Trainingslog: Übung, Gewicht, Wiederholungen. Nach vier bis sechs Wochen vergleichen wir, und wenn die Zahlen nicht steigen, ändere ich den Plan, nicht du deine Motivation. Für müde Tage nach anstrengenden Schichten gibt es eine Kurzversion der Einheit, denn ausgefallenes Training ist der einzige echte Feind des Aufbaus.",
      },
      {
        title: "Essen für Aufbau, ohne den Speiseplan umzuwerfen",
        body: "Muskeln entstehen in der Küche mit: Als Zielwert rechnen wir mit etwa 1,6 bis 2 Gramm Eiweiß pro Kilo Körpergewicht am Tag. Das erreichst du mit normalen Gerichten, wenn die Reihenfolge stimmt. Wer es genauer will, holt sich Natalie dazu, unsere Ernährungsberaterin für Sport- und Fitnessernährung. Mehr als ein leichter Kalorienüberschuss ist nicht nötig, sonst baust du Fett statt Muskeln auf.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Urbach?",
        a: "50€ pro 1-zu-1 Stunde, bei dir zu Hause oder im Studio. Für Selbsttrainierer gibt es das Online Coaching ab 150€ im Monat mit Plan, Technik-Videos und Wochen-Check-in. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite körperlich. Trainiere ich dann nicht genug?",
        a: "Du belastest viel, aber ohne Steigerung, und oft einseitig. Das Training setzt gezielt die Reize, die deine Arbeit nicht liefert, und gleicht die einseitigen Muster aus. Zwei Einheiten pro Woche reichen dafür.",
      },
      {
        q: "Brauche ich ein Fitnessstudio in der Nähe?",
        a: "Nein. Für die ersten sechs bis zwölf Monate reichen Kurzhanteln, eine Bank und ein Band, und das bringe ich zu dir nach Urbach mit. Später kann ein Studio sinnvoll werden, wenn die Gewichte zu groß fürs Wohnzimmer werden.",
      },
      {
        q: "Wie lange dauert es, bis man etwas sieht?",
        a: "Kraftwerte steigen ab Woche drei bis vier, sichtbare Veränderung kommt je nach Ausgangslage nach acht bis zwölf Wochen. Ich zeige dir im Protokoll den Fortschritt, bevor der Spiegel ihn zeigt, denn genau in dieser Lücke geben die meisten auf.",
      },
    ],
  },

  "raderthal/personal-training": {
    answer:
      "Personal Training in Köln-Raderthal: 1-zu-1 bei dir zu Hause oder im Vorgebirgspark, der direkt im Veedel liegt. Kein Studio nötig, keine Anfahrt, volle Aufmerksamkeit. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Raderthal: Training zu Hause oder im Vorgebirgspark, 1-zu-1 mit Plan und Progression. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein kleines Veedel mit einem großen Park",
        body: "Raderthal hat keine 5.000 Einwohner und kein einziges Fitnessstudio, dafür den Vorgebirgspark: weite Wiesen, alte Baumreihen, angelegt vor über hundert Jahren vom Kölner Gartendirektor Fritz Encke. Vormittags und am frühen Nachmittag ist der Park fast leer. Für Personal Training ist das die beste Fläche im Kölner Süden: Platz für Sprints, Stufen für Stützarbeit, Wiesen für alles mit Eigengewicht, und niemand schaut zu.",
      },
      {
        title: "Dein Wohnzimmer ist die zweite Trainingsfläche",
        body: "Die Kraftarbeit mit Zusatzgewicht verlegen wir zu dir nach Hause: Ich bringe Kurzhanteln, Bänder und eine Matte mit, eine freie Ecke genügt. Zwischen Militärring und Grüngürtel wohnt man in Raderthal ruhig, und genau so trainiert es sich auch: Tür auf, 60 Minuten, Tür zu, kein Umziehen in der Umkleide, kein Gerät blockiert. Bei gutem Wetter kombinieren wir beide Orte in einer Einheit.",
      },
      {
        title: "Plan und Progression statt bunter Übungssammlung",
        body: "Am Anfang steht ein Check: Beweglichkeit, Kraftwerte, Ziele, danach schreibe ich deinen Plan. Zwei Einheiten pro Woche, jede dokumentiert, alle vier bis sechs Wochen wird nachgemessen. Ob dein Ziel Abnehmen, Kraft oder einfach Belastbarkeit im Alltag ist: Du siehst in Zahlen, ob es vorangeht, und ich passe an, wenn nicht.",
      },
      {
        title: "Für wen das in Raderthal passt",
        body: "Typisch sind Berufstätige, die nach Feierabend keine Fahrt mehr durch die Stadt wollen, Eltern, die trainieren, während das Kind schläft, und Leute über 50, die wieder anfangen und sich dafür Begleitung wünschen. Das Einstiegsniveau spielt keine Rolle: Der Check am Anfang legt fest, wo wir starten, nicht dein letzter Studiobesuch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Raderthal?",
        a: "50€ pro Stunde im 1-zu-1, ohne Vertragsbindung. Das Erstgespräch ist kostenlos, dabei klären wir Ziel, Ort und Frequenz. Wer selbstständig mit Plan trainieren will, nimmt das Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Wo trainieren wir im Winter?",
        a: "Drinnen bei dir, mit mitgebrachtem Material. Der Vorgebirgspark bleibt bei trockenem Wetter auch im Winter nutzbar, für die kalten Wochen liegt der Schwerpunkt auf der Kraftarbeit in der Wohnung.",
      },
      {
        q: "Ich war lange nicht mehr sportlich aktiv. Ist das ein Problem?",
        a: "Nein, das ist der häufigste Fall. Wir starten mit einem Check und leichten Lasten, die Steigerung kommt in kleinen Schritten. Nach einer längeren Pause zählt der Wiedereinstieg ohne Verletzung mehr als jedes Tempo.",
      },
      {
        q: "Wie schnell bekomme ich einen Termin?",
        a: "In der Regel innerhalb einer Woche. Raderthal liegt für mich günstig zwischen Zollstock und Marienburg, deshalb sind auch Randzeiten am frühen Morgen oder späten Abend möglich. Schreib mir einfach über das Kontaktformular.",
      },
    ],
  },
  "duennwald/personal-training": {
    answer:
      "Personal Training in Köln-Dünnwald macht aus deinen Runden durch den Dünnwalder Wald ein System: Tempoarbeit draußen, Kraft bei dir zu Hause, Fortschritt in Zahlen. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Dünnwald: Tempoarbeit im Wald, Krafttraining zu Hause, messbarer Fortschritt im 1-zu-1. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Du bewegst dich schon, aber ohne Reiz",
        body: "Wer in Dünnwald wohnt, ist meist schon draußen: die Runde durch den Wald, der Weg am Wildpark vorbei, um den Höhenfelder See. Das ist mehr Grundbewegung, als die meisten Kölner haben, und trotzdem ändert sich am Körper oft nichts, weil die Belastung immer gleich bleibt. Personal Training heißt hier nicht, bei null anzufangen: Ich nehme die Wege, die du ohnehin gehst, und mache aus ihnen Einheiten mit Tempo, Intervallen und einem Ziel.",
      },
      {
        title: "Der Wald für die Ausdauer, das Wohnzimmer für die Kraft",
        body: "Dünnwald ist mit fast elf Quadratkilometern eines der grünsten Veedel im Kölner Osten, aber Bäume ersetzen keine Hanteln. Deshalb läuft der Plan zweigleisig: Intervalle und zügige Abschnitte auf den Waldwegen, Kraftarbeit mit mitgebrachten Kurzhanteln, Bank und Bändern bei dir zu Hause. Du brauchst kein Studio und keine Fahrt quer durch den Osten, der Plan steht auf dem, was vor deiner Tür und in deiner Wohnung liegt.",
      },
      {
        title: "Gemessen wird, sonst ist es nur Spazierengehen mit Begleitung",
        body: "Am Anfang steht ein Check: Kraftwerte, Beweglichkeit, eine Referenzstrecke im Wald mit Zeit. Alle vier bis sechs Wochen messen wir dieselben Dinge nach. So siehst du schwarz auf weiß, ob die Runde schneller, die Hantel schwerer und der Alltag leichter wird. Wenn eine Zahl stehen bleibt, ändere ich den Plan, dafür bezahlst du mich.",
      },
      {
        title: "Termine, die am Stadtrand funktionieren",
        body: "Viele Dünnwalder pendeln, nach Mülheim, in die Innenstadt oder nach Leverkusen, und abends soll das Training nicht noch eine Fahrt kosten. Deshalb komme ich zu dir: früh vor der Arbeit, am frühen Abend oder am Wochenende, 60 Minuten von Tür zu Tür. Zwei feste Einheiten pro Woche reichen, wenn sie geplant sind und stattfinden.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Dünnwald?",
        a: "50€ pro 1-zu-1 Stunde, inklusive Anfahrt und Material. Das Erstgespräch ist kostenlos. Wer lieber eigenständig trainiert und nur Plan und Kontrolle will, nimmt das Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Trainieren wir auch im Wald?",
        a: "Ja, wenn es zu deinem Ziel passt: Intervalle, Tempoabschnitte und Übungen mit Eigengewicht auf den Waldwegen, die Kraftarbeit mit Gewichten machen wir bei dir zu Hause. Die Mischung lege ich nach Ziel und Jahreszeit fest.",
      },
      {
        q: "Ich gehe schon jeden Tag spazieren. Was bringt mir Training zusätzlich?",
        a: "Gehen hält gesund, verändert aber wenig, sobald der Körper sich daran gewöhnt hat. Fortschritt braucht steigende Belastung: mehr Tempo, mehr Last, neue Muster. Genau das setze ich auf deine bestehende Routine drauf, statt sie zu ersetzen.",
      },
      {
        q: "Bin ich für Personal Training fit genug?",
        a: "Die Frage stellt sich andersrum: Das Training wird auf deinen Stand gebaut, nicht du auf das Training. Der Check am Anfang legt das Niveau fest, und gesteigert wird erst, wenn die Technik sitzt.",
      },
    ],
  },

  "dellbrueck/rueckentraining": {
    answer:
      "Rückentraining in Köln-Dellbrück baut die Kraft auf, die dein Rücken am Wochenende braucht: Garten, Keller, Umbau, Kinder tragen. Zwei Einheiten pro Woche, bei dir zu Hause oder im Studio, dazu die Dellbrücker Heide als Ausgleich. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Rückentraining in Köln-Dellbrück: Kraft für Garten, Haus und Alltag statt Schonung. Zwei Einheiten pro Woche, zu Hause oder im Studio. 50€/Std.",
    sections: [
      {
        title: "Der Dellbrücker Rücken meldet sich am Wochenende",
        body: "Dellbrück ist ein Veedel mit Haus und Garten: knapp 22.000 Einwohner auf fast zehn Quadratkilometern, viel davon mit eigenem Stück Grün. Genau das ist das Muster, das ich hier am häufigsten sehe: Unter der Woche sitzt der Rücken im Büro, am Samstag hebt er Pflanzsäcke, schleppt Kisten in den Keller oder trägt das Enkelkind, und am Montag streikt er. Nicht die Gartenarbeit ist das Problem, sondern der untrainierte Rücken, der sie unvorbereitet bekommt.",
      },
      {
        title: "Wir trainieren das, was am Samstag gebraucht wird",
        body: "Dein Programm besteht aus den Mustern, an denen der Rücken am Wochenende scheitert: Heben von Boden und Kiste, Tragen über Strecke, Aufrichten gegen Last. Zwei Einheiten pro Woche, zu Hause mit mitgebrachtem Material oder im Studio. Die Gewichte beginnen deutlich unter dem Pflanzsack und steigen planmäßig darüber hinaus, denn ein Rücken, der 40 Kilo kontrolliert bewegt, verzeiht die 20 unkontrollierten im Garten.",
      },
      {
        title: "Heide und Thielenbruch sind dein Programm für die Tage dazwischen",
        body: "An den trainingsfreien Tagen gehört Gehen in den Plan, und dafür ist Dellbrück privilegiert: die sandigen Wege der Dellbrücker Heide und die Waldwege Richtung Thielenbruch liegen direkt am Veedel. 30 Minuten zügiges Gehen halten die Strukturen versorgt, die das Krafttraining aufbaut. Schonung dagegen macht den Rücken schwächer und die nächste Episode wahrscheinlicher.",
      },
      {
        title: "Was das Training kann und wo der Arzt zuständig ist",
        body: "Rückentraining bei mir ist Kraftaufbau für einen belastbaren Rücken, keine Therapie. Akute Schmerzen mit Ausstrahlung, Taubheit oder nächtlichem Schmerz gehören zuerst zum Arzt. Danach, und bei dem üblichen unspezifischen Ziehen nach Belastung, ist gezieltes Krafttraining der am besten belegte Weg, damit es nicht chronisch wird. Im kostenlosen Erstgespräch klären wir, wo du stehst.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in Köln-Dellbrück?",
        a: "50€ pro 1-zu-1 Stunde, bei dir zu Hause mit mitgebrachtem Material oder im Studio. Das Erstgespräch ist kostenlos und klärt, ob Training der richtige nächste Schritt ist.",
      },
      {
        q: "Mein Rücken tut nach der Gartenarbeit weh. Soll ich sie sein lassen?",
        a: "Nein, im Gegenteil: Der Garten ist ein gutes Trainingsziel. Wir bauen die Hebe- und Tragekraft systematisch auf, bis das Wochenende im Garten unter deiner trainierten Belastung liegt statt darüber. Aufhören müsstest du nur mit dem unvorbereiteten Heben.",
      },
      {
        q: "Reichen Übungen ohne Geräte?",
        a: "Für den Anfang ja, auf Dauer nicht. Rumpfübungen mit Eigengewicht sind der Einstieg, aber ein Rücken wird belastbar, wenn er gegen steigende Last hebt, zieht und trägt. Dafür reichen Kurzhanteln und ein Band, die ich mitbringe.",
      },
      {
        q: "Wie schnell wird es besser?",
        a: "Die meisten spüren nach vier bis sechs Wochen den Unterschied im Alltag: Heben fühlt sich sicherer an, der Montag nach dem Gartentag bleibt ruhig. Belastbar im eigentlichen Sinn wird ein Rücken über drei bis sechs Monate konsequenten Trainings.",
      },
    ],
  },

  "widdersdorf/abnehmen": {
    answer:
      "Abnehmen in Köln-Widdersdorf plane ich um den Familientisch herum: ein Abendessen für alle statt Extra-Diätessen, Portionen mit System von Natalie, dazu Geh-Runden über die Feldwege am Ortsrand und zwei Krafteinheiten pro Woche. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Widdersdorf: ein Essen für die ganze Familie statt Diät-Extrawurst, Feldweg-Runden, zwei Krafteinheiten pro Woche. 50€/Std.",
    sections: [
      {
        title: "Die Extrawurst ist der Grund, warum Familiendiäten scheitern",
        body: "Widdersdorf ist ein Familien-Veedel: Rund um den alten Ortskern ist mit Widdersdorf-Süd eines der größten Neubaugebiete Kölns entstanden, und an den meisten Esstischen sitzen Kinder. Wer hier abnehmen will, scheitert selten am Wissen, sondern an der Logistik: Zwei Gerichte kochen hält niemand durch. Deshalb bauen wir dein Defizit in das eine Essen ein, das ohnehin auf den Tisch kommt. Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, stellt die Portionen so zusammen, dass die Familie normal isst und du trotzdem im Ziel landest.",
      },
      {
        title: "Die Feldwege am Ortsrand sind deine tägliche Runde",
        body: "Hinter den neuen Straßenzügen hört Widdersdorf schnell auf und die Felder Richtung Lövenich und Bocklemünd fangen an: flache, ruhige Wege ohne Verkehr, mit Kinderwagen genauso machbar wie allein mit Kopfhörern. Dort liegt deine Grundbewegung, 30 bis 45 Minuten an festen Tagen. Das verbrennt nicht spektakulär viel, aber es verbrennt zuverlässig, und Zuverlässigkeit schlägt beim Abnehmen jede Intensität.",
      },
      {
        title: "Zwei Krafteinheiten, wenn die Kinder im Bett sind",
        body: "Im Kaloriendefizit entscheidet Krafttraining, ob du Fett verlierst oder Muskeln. Zwei Einheiten pro Woche reichen, und sie finden statt, wo du sie durchhältst: bei dir im Wohnzimmer, mit Material, das ich mitbringe, gern um 20 Uhr, wenn der Tag mit den Kindern durch ist. 45 Minuten genügen, wenn der Plan steht und niemand auf ein freies Gerät wartet.",
      },
      {
        title: "Der Wochenschnitt zählt, nicht der Sonntagmorgen",
        body: "Familienleben hat Geburtstage, Besuch und Pizza-Freitage, und ein Plan, der daran zerbricht, ist ein schlechter Plan. Gemessen wird deshalb am Sieben-Tage-Schnitt von Gewicht und Bauchumfang, nicht an einzelnen Tagen. Realistisch sind 0,3 bis 0,5 Kilo pro Woche. Einmal wöchentlich schauen wir auf die Zahlen, und wenn der Trend steht, stellen wir das Essen nach, nicht deinen Alltag.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehm-Betreuung in Köln-Widdersdorf?",
        a: "Die 1-zu-1 Stunde kostet 50€ inklusive Anfahrt und Material. Für die reine Plan- und Ernährungsbegleitung gibt es das Online Coaching ab 150€ im Monat mit wöchentlichem Check-in. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Muss die ganze Familie jetzt Diät essen?",
        a: "Nein, das ist der Kern des Ansatzes: Es gibt ein Essen für alle. Dein Defizit entsteht über deine Portion und ihre Zusammensetzung, nicht über ein zweites Gericht. Die Kinder merken davon nichts.",
      },
      {
        q: "Ich habe nach der Schwangerschaft zugenommen. Ist das Programm dafür geeignet?",
        a: "Ja, das ist in Widdersdorf eine der häufigsten Ausgangslagen. Wir starten ruhig, mit Rumpf- und Grundkraft und einem moderaten Defizit. Nach Geburt oder Kaiserschnitt gilt: erst die Freigabe von Ärztin oder Hebamme, dann der Aufbau.",
      },
      {
        q: "Wie viel kann ich in drei Monaten abnehmen?",
        a: "Mit 0,3 bis 0,5 Kilo pro Woche sind es vier bis sechs Kilo, bei größerem Startgewicht auch mehr. Wichtiger als die Zahl: Durch die Krafteinheiten kommt der Verlust aus dem Fett, und der Familientisch-Ansatz sorgt dafür, dass er nach den drei Monaten nicht zurückkommt.",
      },
    ],
  },
  "vingst/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Vingst macht bei uns Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ihr Ansatz für Vingst: klare Regeln für Büdchen, Imbiss und schnelles Essen unterwegs statt einer Verbotsliste, die im Veedel-Alltag nicht hält. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Vingst mit Natalie: Regeln für Imbiss und Alltag statt Verbote, Eiweißziel für deine eigene Küche. Online, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Plan, der das Veedel nicht ignoriert",
        body: "Vingst ist dicht: 12.711 Menschen auf 1,12 Quadratkilometern, eines der am dichtesten besiedelten Veedel im rechtsrheinischen Köln. Essen ist hier immer in Reichweite, der Bäcker auf dem Weg zur Bahn, der Imbiss an der Ostheimer Straße, das Büdchen um die Ecke. Ein Ernährungsplan, der so tut, als gäbe es das alles nicht, hält zwei Wochen. Natalie plant deshalb andersherum: Sie legt fest, was unterwegs die bessere Wahl ist und wie oft sie drin ist, statt dir das Veedel zu verbieten.",
      },
      {
        title: "Gekocht wird, was du kennst",
        body: "Natalie rechnet zuerst dein Kalorien- und Eiweißziel aus. Dann legt sie es über die Gerichte, die bei dir ohnehin auf den Herd kommen, egal aus welcher Küche sie stammen. Verändert werden Mengen, Beilagen und die Eiweißquelle, nicht deine Essgewohnheiten als Ganzes. Das ist der Unterschied zwischen einem Plan, den du durchhältst, und einem, den du nach dem ersten Familienessen aufgibst.",
      },
      {
        title: "So läuft die Beratung ab",
        body: "Die Beratung läuft per Video und App: Erstgespräch mit Zielen und Essgewohnheiten, dann ein Wochenrahmen mit Eiweißmengen und Portionsregeln. Zwischen den Terminen schickst du Fotos deiner Mahlzeiten, Natalie antwortet kurz und konkret. Nachgesteuert wird alle zwei Wochen, nicht erst, wenn die Waage vier Wochen stillsteht.",
      },
      {
        title: "Essen und Training greifen ineinander",
        body: "Wer in Vingst auch trainieren will, bekommt beides aus einer Hand: Angelo übernimmt das Training, zu Hause oder draußen in der Merheimer Heide gleich hinter der Stadtteilgrenze, Natalie das Essen. Die beiden stimmen Eiweißziel und Trainingsplan aufeinander ab, damit nicht zwei Pläne gegeneinander arbeiten.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Vingst?",
        a: "Die Beratung mit Natalie ist Teil des Online Coachings ab 150€ im Monat, auf Wunsch kombiniert mit 1-zu-1 Training bei dir in Vingst für 50€ pro Stunde. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich auf Imbiss und Büdchen verzichten?",
        a: "Nein. Verbote funktionieren in einem Veedel voller Gelegenheiten nicht lange. Du bekommst Regeln: was unterwegs die bessere Wahl ist, wie oft es passt und wie der Rest des Tages dann aussieht.",
      },
      {
        q: "Brauche ich teure Spezialprodukte?",
        a: "Nein. Der Plan baut auf deinem normalen Einkauf auf. Eiweiß lässt sich aus Eiern, Quark, Hülsenfrüchten und günstigen Fleisch- oder Fischsorten decken, Pulver ist eine Option, keine Pflicht.",
      },
      {
        q: "Findet die Beratung vor Ort in Vingst statt?",
        a: "Die Ernährungsberatung läuft komplett online per Video und App, das spart dir Wege und macht kurze Check-ins möglich. Das Training mit Angelo findet dagegen vor Ort statt, bei dir zu Hause oder draußen.",
      },
    ],
  },

  "dellbrueck/personal-training": {
    answer:
      "Personal Training in Köln-Dellbrück kommt zu dir: 1-zu-1 bei dir zu Hause, zwischen Thielenbruch und Dellbrücker Hauptstraße, oder früh morgens draußen in der Heide. Feste Termine, ein Plan für dein Ziel, eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Dellbrück: 1-zu-1 bei dir zu Hause oder in der Dellbrücker Heide, feste Termine neben Pendeln und Familie. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Veedel wie eine Kleinstadt, Training ohne zweiten Weg",
        body: "Dellbrück hat 21.954 Einwohner auf fast zehn Quadratkilometern, das ist eher Kleinstadt als Veedel. Wer hier wohnt, hat meist bewusst gewählt: Haus oder Wohnung mit Grün, S-Bahn ins Büro, Verein um die Ecke. Was fehlt, ist selten der Wille, sondern der zweite Weg am Tag. Deshalb komme ich zu dir, mit Kurzhanteln, Kettlebell und Bändern, von Alt-Dellbrück bis hoch zum Thielenbruch. Dein Training findet da statt, wo dein Abend sowieso ist.",
      },
      {
        title: "Die Heide am Morgen gehört dir",
        body: "Die Dellbrücker Heide ist um 7 Uhr fast leer. Wer vor der Arbeit trainieren will, bekommt dort Einheiten, für die andere quer durch die Stadt fahren: Sand und Wiesenwege für Läufe und Sprünge, Platz für alles, was mit dem eigenen Körpergewicht geht. Die Kraftarbeit mit Gewichten legen wir in deine Wohnung oder ins Studio, je nachdem, was dein Ziel verlangt.",
      },
      {
        title: "Feste Termine schlagen gute Vorsätze",
        body: "Viele Dellbrücker pendeln mit der S11 oder der Linie 3 und 18 ab Thielenbruch. Deshalb lege ich Termine an die Ränder des Tages: früh vor der Bahn, am frühen Abend danach oder am Wochenende. Zwei Einheiten pro Woche, 60 Minuten von Tür zu Tür, und sie finden statt, weil jemand vor der Tür steht. Das ist der halbe Unterschied zum Studiovertrag, der nur Geld abbucht.",
      },
      {
        title: "Dein Ziel bestimmt den Plan",
        body: "Abnehmen, Kraft aufbauen, nach Jahren wieder einsteigen oder fit bleiben für Garten, Kinder und Vereinssport: Am Anfang steht ein Check mit Kraftwerten und Beweglichkeit, daraus entsteht der Plan. Alle vier bis sechs Wochen wird nachgemessen. Wenn sich eine Zahl nicht bewegt, ändere ich den Plan, nicht die Ausrede.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Dellbrück?",
        a: "50€ pro 1-zu-1 Stunde, Anfahrt und Material inklusive. Das Erstgespräch ist kostenlos. Wer nur Plan und wöchentliche Kontrolle will, nimmt das Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Wo genau trainieren wir in Dellbrück?",
        a: "Bei dir zu Hause mit mitgebrachtem Material, draußen in der Dellbrücker Heide oder am Thielenbruch, oder im Studio. Die Mischung richtet sich nach deinem Ziel und der Jahreszeit.",
      },
      {
        q: "Geht Training auch früh vor der Arbeit?",
        a: "Ja. Gerade in Dellbrück sind die frühen Termine gefragt, bevor die S11 Richtung Innenstadt fährt. Eine Einheit dauert 60 Minuten von Tür zu Tür, danach beginnt dein Tag wie sonst auch.",
      },
      {
        q: "Reichen zwei Einheiten pro Woche?",
        a: "Ja, wenn sie geplant sind und stattfinden. Dazu bekommst du kurze Aufgaben für die Tage dazwischen, meist 15 bis 20 Minuten. Mehr Volumen bringt erst dann etwas, wenn die Basis steht.",
      },
    ],
  },

  "riehl/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung in Köln-Riehl macht bei uns Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ihr Fokus in Riehl: Essen, das Kraft und Muskeln auch jenseits der 50 erhält, mit klaren Eiweißmengen und Portionen für kleine Haushalte. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Riehl mit Natalie: Eiweiß und Portionen, die Muskeln ab 50 erhalten, geplant für kleine Haushalte. Online, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Warum Eiweiß mit den Jahren wichtiger wird",
        body: "Ab der Lebensmitte baut der Körper Muskeln schneller ab, als er sie aufbaut, wenn zwei Dinge fehlen: Training und genug Eiweiß. Viele essen abends ein Brot und wundern sich, dass die Kraft nachlässt. Natalie legt deshalb zuerst die Eiweißmenge pro Tag fest und verteilt sie auf die Mahlzeiten, denn eine große Portion am Abend gleicht ein eiweißarmes Frühstück nicht aus. Das ist keine Diät, sondern Versorgung.",
      },
      {
        title: "Portionen für ein und zwei Personen",
        body: "Riehl ist ein Veedel der kleinen Haushalte, und die meisten Rezepte sind für vier geschrieben. Wer für eine oder zwei Personen kocht, kennt das Ergebnis: Reste, Verschwendung oder dreimal dasselbe. Natalie plant Gerichte, die in kleinen Mengen funktionieren oder sich gezielt für zwei Tage vorkochen lassen, mit einer Einkaufsliste, die am Ende der Woche aufgeht.",
      },
      {
        title: "Bewegung hast du in Riehl vor der Tür",
        body: "Zwischen Flora, Botanischem Garten und dem flachen Rheinufer Richtung Niehl lässt sich jeder Tag mit einem Spaziergang füllen, und das ist gut so. Nur entscheidet beim Gewicht und beim Muskelerhalt am Ende das Essen und die Kraftarbeit, nicht die Schrittzahl. Wer beides angehen will, kombiniert Natalies Beratung mit Krafttraining bei Angelo, zu Hause in Riehl oder draußen am Rhein.",
      },
      {
        title: "So arbeitet Natalie",
        body: "Erstgespräch per Video, dann ein Wochenrahmen mit Eiweißziel, Portionsregeln und deinen eigenen Gerichten als Basis. Über die App schickst du kurze Rückmeldungen, Natalie steuert alle zwei Wochen nach. Es gibt keinen Plan von der Stange und keine Lebensmittel, die du kaufen musst, weil sie gerade Mode sind.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Riehl?",
        a: "Die Beratung mit Natalie ist Teil des Online Coachings ab 150€ im Monat. Wer zusätzlich 1-zu-1 trainieren will, zahlt 50€ pro Stunde mit Angelo. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Ich bin über 60. Lohnt sich das noch?",
        a: "Ja. Muskeln reagieren in jedem Alter auf Training und ausreichend Eiweiß, das ist gut belegt. Die Pläne werden an deinen Stand angepasst, nicht umgekehrt, und gesteigert wird langsam.",
      },
      {
        q: "Ersetzt die Beratung eine medizinische Ernährungstherapie?",
        a: "Nein. Natalie ist Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Bei Erkrankungen, die eine Ernährungstherapie verlangen, gehört die Behandlung in ärztliche Hände, und das sagen wir dir im Erstgespräch auch offen.",
      },
      {
        q: "Muss ich dafür kochen können?",
        a: "Es reichen einfache Gerichte mit wenigen Zutaten. Natalie baut den Plan auf dem auf, was du heute schon kochst, und ergänzt dort, wo Eiweiß oder Gemüse fehlen.",
      },
    ],
  },

  "poll/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Poll stößt mit Eigengewicht irgendwann an eine Decke: Neuer Muskel braucht steigende Last. Zwei geführte Krafteinheiten pro Woche mit Protokoll, bei dir zu Hause oder im Studio, und die Poller Wiesen bleiben für Ausdauer und Ausgleich. 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Poll: steigende Gewichte statt Eigengewichts-Plateau, zwei geführte Einheiten pro Woche mit Protokoll. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Die Decke des Eigengewichts",
        body: "Poll trainiert draußen: Läufer auf dem Rheinuferweg, Workouts auf den Poller Wiesen, Liegestütze und Klimmzüge im Grünen. Das baut am Anfang Muskeln auf, und dann hört es auf, weil die Last immer dieselbe bleibt. Der Körper passt sich nur an, was ihn fordert. Ab diesem Punkt braucht es Gewichte, die von Monat zu Monat steigen, und genau da setze ich an, ohne dir die Wiesen wegzunehmen.",
      },
      {
        title: "Steigende Last, schwarz auf weiß",
        body: "Zwei Krafteinheiten pro Woche, aufgebaut auf wenigen Grundübungen: Drücken, Ziehen, Kniebeuge, Hüftstreckung. Jede Einheit steht im Protokoll, jede Steigerung ist geplant statt gefühlt. Trainiert wird bei dir zu Hause in Poll mit mitgebrachten Kurzhanteln und Bändern oder im Studio an der Langhantel, wenn dein Ziel mehr Last verlangt.",
      },
      {
        title: "Die Wiesen behalten ihren Platz",
        body: "Ausdauer und Muskelaufbau schließen sich nicht aus, sie brauchen nur eine Reihenfolge. Deine Läufe am Rheinufer und die Einheiten auf den Poller Wiesen bleiben im Plan, sie rücken an die Tage zwischen den Krafteinheiten. So stören sie die Erholung nicht, von der der Muskel tatsächlich wächst.",
      },
      {
        title: "Essen entscheidet mit",
        body: "Ohne Baumaterial kein Aufbau: Zu jedem Plan gehört ein Eiweißziel pro Tag, abgestimmt auf dein Gewicht und dein Training. Wer es genauer will, nimmt die Ernährungsberatung mit Natalie dazu, unserer Ernährungsberaterin für Sport- und Fitnessernährung. Nachgemessen wird alle vier bis sechs Wochen: Gewichte, Umfänge, Wiederholungen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Poll?",
        a: "50€ pro 1-zu-1 Stunde, inklusive Anfahrt und Material. Das Erstgespräch ist kostenlos. Für eigenständiges Training mit Plan und Kontrolle gibt es das Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Reichen Kurzhanteln zu Hause für echten Muskelaufbau?",
        a: "Für die ersten Monate ja, wenn sie verstellbar sind und die Steigerung geplant ist. Irgendwann verlangen Beine und Rücken mehr Last, dann wechseln wir für einzelne Übungen ins Studio.",
      },
      {
        q: "Muss ich mit dem Laufen aufhören?",
        a: "Nein. Deine Kilometer am Rheinufer bleiben, sie werden nur um die Krafteinheiten herum gelegt. Nur wer fünfmal pro Woche läuft und nie Kraft trainiert, baut keinen Muskel auf.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Messbar nach acht bis zwölf Wochen: mehr Gewicht bei gleicher Technik, veränderte Umfänge. Sichtbar dauert es länger und hängt am Essen. Versprechen, die schneller klingen, halten nicht.",
      },
    ],
  },

  "lindweiler/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Lindweiler macht bei uns Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ihr Ansatz hier: eine feste Rotation einfacher Gerichte, damit nicht jeden Abend neu entschieden werden muss, was auf den Tisch kommt. Komplett online, enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Lindweiler mit Natalie: feste Gerichte-Rotation statt täglicher Entscheidung, Eiweißziel inklusive. Online, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Problem ist selten das Wissen, sondern der Abend",
        body: "Lindweiler ist mit 3.549 Einwohnern eine der kleinsten Ecken im Kölner Norden, Restaurants und Lieferdienste sind hier nicht die Lösung, gekocht wird selbst. Genau daran scheitern die meisten guten Vorsätze: nicht am Wissen, sondern an der täglichen Frage, was es heute gibt. Wer müde von der Arbeit kommt, entscheidet sich für das Schnellste. Natalie nimmt dir diese Entscheidung ab, mit einer festen Rotation aus acht bis zehn einfachen Gerichten, die zu deinem Ziel passen.",
      },
      {
        title: "Aus der Rotation wird die Einkaufsliste",
        body: "Steht die Rotation, schreibt sich die Einkaufsliste von selbst: ein Wocheneinkauf, der aufgeht, statt dreimal pro Woche loszufahren, weil etwas fehlt. Die Gerichte sind so gewählt, dass Zutaten sich überschneiden und nichts in der Tonne landet. Angepasst wird die Rotation alle paar Wochen, damit sie nicht langweilt.",
      },
      {
        title: "Mengen statt Verzicht",
        body: "Auf die Rotation legt Natalie dein Kalorien- und Eiweißziel: dieselben Gerichte, aber mit Portionsregeln, die zu Abnehmen oder Muskelerhalt passen. Isst die Familie mit, wird nicht doppelt gekocht, nur anders geschöpft. Verbotslisten gibt es keine, die halten erfahrungsgemäß bis zum ersten Geburtstag im Bekanntenkreis.",
      },
      {
        title: "Online heißt: kein Weg",
        body: "Die Beratung läuft per Video und App, von Lindweiler aus musst du nirgendwo hinfahren. Kurze Check-ins alle zwei Wochen, Fotos statt Ernährungstagebuch, nachgesteuert wird, sobald eine Zahl stehen bleibt. Wer zusätzlich trainieren will, holt sich Angelo dazu: 1-zu-1 bei dir zu Hause, das Material bringt er mit.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Lindweiler?",
        a: "Die Beratung mit Natalie ist Teil des Online Coachings ab 150€ im Monat, das Erstgespräch ist kostenlos. Training mit Angelo bei dir zu Hause kostet 50€ pro Stunde dazu.",
      },
      {
        q: "Funktioniert die Rotation auch für eine Familie?",
        a: "Ja, sie ist sogar dafür gedacht: Alle essen dieselben Gerichte, nur die Portionen unterscheiden sich. Niemand kocht zweimal, und dein Ziel bleibt trotzdem auf Kurs.",
      },
      {
        q: "Wird das nicht eintönig?",
        a: "Acht bis zehn Gerichte in Rotation sind mehr Abwechslung, als die meisten Haushalte real haben. Alle paar Wochen fliegt ein Gericht raus und ein neues kommt rein, nach deinem Geschmack.",
      },
      {
        q: "Muss ich Kalorien zählen?",
        a: "Nein. Die Rotation ist so gebaut, dass Portionsregeln reichen: Teller-Aufteilung, Eiweiß zuerst, feste Mengen bei den Beilagen. Gezählt wird nur, wenn du es ausdrücklich willst.",
      },
    ],
  },

  "mauenheim/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Mauenheim ist Krafttraining mit echter Bewegung bei dir zu Hause. Rechne ehrlich: 20 Minuten Strom plus Hin- und Rückweg zum Studio sind fast eine Stunde, nur ohne gelernte Technik und ohne steigende Gewichte. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Mauenheim: Krafttraining zu Hause statt 20 Minuten Strom plus Anfahrt. Echte Bewegung, steigende Last, kein Jahresvertrag. 50€/Std.",
    sections: [
      {
        title: "Die 20-Minuten-Rechnung",
        body: "EMS verkauft Zeitersparnis, und auf dem Papier stimmt sie: 20 Minuten pro Woche. Nur steht das Studio nicht in Mauenheim, sondern Richtung Nippes oder Innenstadt. Mit Umziehen, Hin- und Rückweg wird aus 20 Minuten Strom schnell eine Stunde Aufwand. Dieselbe Stunde bekommst du bei mir komplett als Training, denn ich komme zu dir: 60 Minuten von Tür zu Tür, in deiner Wohnung.",
      },
      {
        title: "Strom reizt, Bewegung lehrt",
        body: "Die Weste zieht Muskeln zusammen, aber sie bringt dir keine Bewegung bei. Eine saubere Kniebeuge, ein Kreuzheben mit geradem Rücken, ein kontrollierter Ausfallschritt: Das sind die Muster, die beim Tragen, Heben und Treppensteigen schützen, und sie entstehen nur durch Üben mit echter Last. Deshalb ist geführtes Krafttraining nicht die langsamere Variante von EMS, sondern eine andere Kategorie.",
      },
      {
        title: "Klein, ruhig, ideal für Training zu Hause",
        body: "Mauenheim ist mit 5.596 Einwohnern auf einem halben Quadratkilometer eines der kleinsten Veedel Kölns, eine ruhige Insel zwischen Nippes und Weidenpesch. Für das Training heißt das: kurze Wege für mich, keine für dich. Ich bringe Kurzhanteln, Kettlebell und Bänder mit, ein freies Eck in der Wohnung reicht. Für Einheiten draußen liegt der Weidenpescher Park direkt nebenan.",
      },
      {
        title: "Fortschritt steht im Protokoll, nicht im Vertrag",
        body: "Jede Einheit wird dokumentiert: Übungen, Gewichte, Wiederholungen. Über Monate steigt die Last, und genau daran erkennst du Fortschritt, nicht am Kribbeln nach der Einheit. Es gibt keinen Jahresvertrag und keine Mindestlaufzeit, du buchst Stunden, solange sie dir etwas bringen.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Mauenheim?",
        a: "50€ pro 1-zu-1 Stunde bei dir zu Hause, Anfahrt und Material inklusive, ohne Vertragsbindung. Das Erstgespräch ist kostenlos. Zum Vergleich: EMS-Studios liegen meist bei 80 bis 100€ im Monat mit Laufzeit.",
      },
      {
        q: "Ist EMS bei wenig Zeit nicht trotzdem die bessere Wahl?",
        a: "Wenn du die Anfahrt mitrechnest, schrumpft der Zeitvorteil auf wenige Minuten. Was bleibt, ist der Unterschied in der Sache: Strom setzt einen Reiz, Training baut Kraft und Technik auf, die im Alltag tragen. Im Erstgespräch sage ich dir ehrlich, ob EMS zu deinem Fall passt.",
      },
      {
        q: "Brauche ich eigene Geräte?",
        a: "Nein. Ich bringe verstellbare Kurzhanteln, Kettlebell und Bänder mit. Wenn dein Ziel irgendwann mehr Last verlangt, planen wir gemeinsam, was sich für zu Hause lohnt, oder wechseln für einzelne Übungen ins Studio.",
      },
      {
        q: "Für wen ist echtes Krafttraining besser als EMS?",
        a: "Für alle, die über Monate stärker werden, Haltung und Alltag verbessern oder nach Jahren wieder einsteigen wollen. Die Belastung lässt sich feiner steuern als ein Stromimpuls, und du lernst Bewegungen, die bleiben, auch wenn du mal pausierst.",
      },
    ],
  },

  "westhoven/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Westhoven mit Natalie, Ernährungsberaterin für Sport- und Fitnessernährung: Wir bauen deine zweite Tageshälfte um, denn die meisten Ernährungstage scheitern nicht am Mittag, sondern zwischen Feierabend und Couch. Enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Westhoven mit Natalie: Plan für die kritischen Stunden nach Feierabend, echtes Abendessen statt Snack-Kette. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Der Tag ist gut, der Abend kippt",
        body: "Das Muster sehen wir in fast jeder Anamnese: Frühstück klein, Mittag vernünftig, und ab 18 Uhr läuft es aus dem Ruder. Erst der Hunger auf dem Heimweg, dann ein spätes Abendessen, danach noch etwas vor dem Fernseher. Am Morgen ist das schlechte Gewissen da, und das Spiel beginnt von vorn. Natalie setzt genau an dieser Stelle an. Nicht mit Verboten für den Abend, sondern mit einem Tag, der so verteilt ist, dass du um 18 Uhr nicht ausgehungert bist: mehr Eiweiß in der ersten Tageshälfte, eine geplante Zwischenmahlzeit am Nachmittag und ein Abendessen, das satt macht und trotzdem ins Ziel passt.",
      },
      {
        title: "Geplant wird für Westhoven, nicht für ein Lehrbuch",
        body: "Westhoven ist ein ruhiger Wohnstadtteil mit 5.715 Einwohnern, viele arbeiten tagsüber auswärts und kommen mit der Linie 7 oder über die Autobahn zurück. Der Plan muss also abends funktionieren, wenn die Energie fürs Kochen klein ist. Natalie arbeitet deshalb mit Gerichten, die in 20 Minuten stehen, mit einer Einkaufsliste für den Wochenstart und mit zwei vorbereiteten Reserve-Abendessen für die Tage, an denen es später wird. Du musst nichts dokumentieren, was länger dauert als das Essen selbst.",
      },
      {
        title: "Essen und Training greifen ineinander",
        body: "Die Beratung läuft komplett online: Erstgespräch per Video, danach feste Check-ins, zwischendurch kurze Rückfragen per Nachricht. Wer zusätzlich trainiert, bei mir am Rheinufer in Westhoven oder für sich allein, bekommt die Mahlzeiten um die Einheiten herum gelegt, damit Kraft und Erholung nicht am leeren Speicher scheitern. Nötig ist das Training für die Beratung aber nicht: Auch ohne Sport lässt sich mit der Abendstruktur allein viel bewegen.",
      },
      {
        title: "Woran du nach vier Wochen merkst, dass es wirkt",
        body: "Wir machen keine Versprechen auf der Waage für Woche eins. Was sich nach vier Wochen messbar ändern soll: Der Heißhunger am späten Nachmittag wird seltener, die Abende laufen öfter nach Plan als dagegen, und das Frühstück fällt dir leichter, weil der Vorabend nicht mehr zu schwer war. Erst wenn diese Struktur steht, drehen wir an Kalorien und Zielwerten. Umgekehrt funktioniert es nicht dauerhaft.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Westhoven?",
        a: "Die Beratung mit Natalie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Muss ich abends auf Kohlenhydrate verzichten?",
        a: "Nein. Entscheidend ist die Tagesbilanz, nicht die Uhrzeit. Ein geplantes Abendessen mit Kohlenhydraten ist besser als ein verbotenes, das durch Snacks ersetzt wird. Natalie legt die Verteilung so, dass sie zu deinem Tag passt.",
      },
      {
        q: "Läuft die Beratung vor Ort in Westhoven oder online?",
        a: "Online, per Video und Nachricht. Das hat einen praktischen Grund: Die Entscheidungen fallen bei dir zu Hause, beim Einkaufen und am Abend, nicht in einem Beratungsraum. Dort setzt die Betreuung an.",
      },
      {
        q: "Ist das eine medizinische Ernährungstherapie?",
        a: "Nein. Natalie ist Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Bei diagnostizierten Erkrankungen, die eine Ernährungstherapie erfordern, gehört die Behandlung in ärztliche Hand. Das sagen wir im Erstgespräch offen.",
      },
    ],
  },

  "loevenich/personal-training": {
    answer:
      "Personal Training in Köln-Lövenich heißt: ein fester Termin mit einem Menschen statt eines guten Vorsatzes mit einem Studio. Ich komme zweimal pro Woche zu dir, Material und Plan bringe ich mit. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Lövenich: feste 1-zu-1 Termine bei dir zu Hause, Material wird mitgebracht, messbarer Fortschritt. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Warum der feste Termin gewinnt",
        body: "Die meisten Trainingspläne scheitern nicht an der Übungsauswahl, sondern an der Verbindlichkeit. Ein Studio wartet nicht auf dich: Ob du kommst oder nicht, merkt niemand. Ein Termin mit mir ist anders. Ich stehe um 7 oder um 19 Uhr vor deiner Tür in Lövenich, und genau deshalb findet die Einheit statt, auch in Wochen, in denen du sie allein ausfallen lassen würdest. Nach drei Monaten ist nicht der Plan der Unterschied, sondern die Zahl der Einheiten, die wirklich stattgefunden haben.",
      },
      {
        title: "Trainiert wird dort, wo du ohnehin bist",
        body: "Lövenich ist mit 9.167 Einwohnern auf 3,57 km² ein überschaubares Veedel mit altem Dorfkern und vielen Häusern mit Garten oder Garage. Mehr braucht es nicht: Ich bringe verstellbare Kurzhanteln, Kettlebell und Bänder mit, Wohnzimmer oder Garten werden zur Trainingsfläche. Du sparst dir die Fahrt, die bei jedem Studiobesuch dazukäme, und investierst die Zeit in Aufwärmen und saubere Technik statt in den Weg.",
      },
      {
        title: "So sieht der Einstieg aus",
        body: "Im kostenlosen Erstgespräch klären wir Ziel, Gesundheitsstatus und Wochenrhythmus. Danach starten zwei geführte Einheiten pro Woche: Krafttraining mit Grundübungen, jede Einheit mit notierten Gewichten und Wiederholungen. Alle vier bis sechs Wochen vergleichen wir die Zahlen mit dem Start. Steigen sie nicht, ändere ich den Plan, nicht du deine Erwartung. Zwischen den Terminen bekommst du kurze Aufgaben von 15 bis 20 Minuten, mehr nicht.",
      },
      {
        title: "Für wen das in Lövenich passt",
        body: "Typisch sind drei Fälle: Berufstätige, deren Sport in den letzten Jahren still eingeschlafen ist. Eltern, die das Training nur halten können, wenn es nach Hause kommt. Und Wiedereinsteiger ab 40, die nach Pause oder Beschwerden einen kontrollierten Aufbau wollen statt eines Kaltstarts im Kursraum. Wer lieber mit App und wöchentlichem Video-Check-in arbeitet, findet auf der Seite zum Online Coaching für Lövenich das passende Format.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Lövenich?",
        a: "Eine 1-zu-1 Stunde kostet 50€, ohne Vertragslaufzeit und ohne Paketzwang. Das Erstgespräch ist kostenlos. Wer Betreuung mit Plan und Check-ins per App bevorzugt, nimmt das Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Brauche ich Geräte oder einen eigenen Raum?",
        a: "Nein. Kurzhanteln, Kettlebell und Bänder bringe ich mit. Eine freie Fläche von wenigen Quadratmetern im Wohnzimmer, in der Garage oder im Garten reicht für ein vollständiges Krafttraining.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Die notierten Gewichte steigen bei konsequenten zwei Einheiten pro Woche meist schon im ersten Monat. Sichtbare Veränderungen brauchen länger und hängen auch am Essen. Ich nenne dir im Erstgespräch eine ehrliche Spanne für dein Ziel, keine Pauschale.",
      },
      {
        q: "Was passiert, wenn ich einen Termin verschieben muss?",
        a: "Wir legen die Termine um deine Woche, nicht umgekehrt, und verschieben rechtzeitig angekündigte Einheiten einfach. Der Rhythmus von zwei Einheiten pro Woche bleibt dabei das Ziel, weil er den Fortschritt trägt.",
      },
    ],
  },

  "marienburg/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Marienburg rechnet Effizienz richtig: nicht Minuten pro Woche, sondern Ergebnis pro Zeit. Zwei geführte Krafteinheiten bei dir zu Hause bauen Kraft auf, die bleibt, statt eines Reizes, der verpufft. Die Stunde kostet 50€, ohne Jahresvertrag, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Marienburg: Krafttraining privat bei dir zu Hause statt 20 Minuten Strom. Ergebnis pro Zeit statt Minuten pro Woche. 50€/Std, kein Jahresvertrag.",
    sections: [
      {
        title: "Effizienz heißt Ergebnis pro Zeit",
        body: "EMS wird über das Zeitargument verkauft: 20 Minuten pro Woche für Menschen mit vollem Kalender. Das klingt nach einer Rechnung für Marienburg, wo viele beruflich stark eingespannt sind. Aber Effizienz misst sich nicht an den eingesetzten Minuten, sondern an dem, was dabei herauskommt. Nach zwölf Wochen Stromreiz kannst du keine Bewegung besser als vorher. Nach zwölf Wochen geführtem Krafttraining hebst du nachweislich mehr, deine Haltung trägt den Schreibtischtag, und du hast Technik gelernt, die jedes spätere Training schneller macht. Das ist die Rendite, die zählt.",
      },
      {
        title: "Privat bei dir statt im Studio am Schaufenster",
        body: "EMS-Anbieter arbeiten in Ladenlokalen, oft mit Blick von der Straße. Wer das nicht will, muss es nicht wollen. Ich trainiere mit dir im 1-zu-1 bei dir zu Hause in Marienburg: Material bringe ich mit, eine freie Fläche im Haus oder im Garten genügt. Kein Umziehen vor fremden Leuten, kein Terminfenster eines Studios, kein Smalltalk. Nur die Stunde, dein Plan und notierte Gewichte, an denen wir den Fortschritt festmachen.",
      },
      {
        title: "Südpark und Rheinufer gehören zum Plan",
        body: "Marienburg hat mit dem Südpark und dem Rheinufer zwei Trainingsflächen, die kein Studio ersetzt. Die Krafteinheiten bleiben drinnen oder im Garten, aber Aufwärmprogramm, Geh- und Laufeinheiten und die Ausgleichsarbeit lege ich nach draußen, wenn du das magst. So entsteht ein Wochenaufbau, der nicht von einem Gerät abhängt: Kraft mit steigender Last, Ausdauer im Park, Beweglichkeit dort, wo Zeit ist.",
      },
      {
        title: "Der nüchterne Vergleich",
        body: "EMS läuft fast immer über Jahresverträge mit monatlicher Zahlung. Bei mir zahlst du 50€ pro Stunde, solange dir das Training etwas bringt, und kündigst nichts, wenn es nicht passt. Im kostenlosen Erstgespräch sage ich dir auch, wann EMS tatsächlich eine Option ist, etwa als Einstieg nach langer Pause unter Aufsicht. Für das Ziel, über Monate belastbarer und stärker zu werden, führt an echter, steigender Last kein Weg vorbei.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Marienburg?",
        a: "50€ pro geführter 1-zu-1 Stunde, ohne Jahresvertrag und ohne Mindestlaufzeit. Das Erstgespräch ist kostenlos. Zum Vergleich: EMS-Studios binden fast immer über Verträge mit zwölf Monaten Laufzeit.",
      },
      {
        q: "Ich habe wirklich wenig Zeit. Reichen zwei Stunden pro Woche?",
        a: "Ja, wenn sie geplant sind. Zwei geführte Krafteinheiten pro Woche mit steigender Last sind der Standard, mit dem meine Kunden messbar stärker werden. Dazu kommen kurze Aufgaben von 15 bis 20 Minuten für die Tage dazwischen.",
      },
      {
        q: "Ist EMS nicht schonender für den Rücken?",
        a: "Der Rücken wird nicht durch Schonung stabil, sondern durch kontrolliert steigende Belastung der Muskulatur, die ihn hält. Genau das leistet geführtes Krafttraining mit sauberer Technik. Bei akuten Beschwerden klären wir vorher ärztlich ab, was erlaubt ist.",
      },
      {
        q: "Muss ich dafür Geräte kaufen?",
        a: "Nein. Verstellbare Kurzhanteln, Kettlebell und Bänder bringe ich zu jedem Termin mit. Erst wenn dein Kraftniveau mehr Last verlangt, besprechen wir, ob sich eine kleine Ausstattung für zu Hause lohnt.",
      },
    ],
  },

  "meschenich/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Meschenich braucht kein Supplement-Regal: Zwei geführte Krafteinheiten pro Woche mit steigender Last und Eiweiß aus dem normalen Supermarkt reichen für messbaren Aufbau. Ich komme dafür zu dir ins Veedel. 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Meschenich: steigende Last statt Pulver, Eiweiß aus dem Supermarkt statt Supplement-Regal, Training bei dir zu Hause. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Muskeln entstehen an der Hantel, nicht im Shaker",
        body: "Die Fitness-Industrie verkauft Muskelaufbau als Einkaufsliste: Proteinpulver, Kreatin, Booster, Riegel. Die Reihenfolge ist falsch. Muskeln wachsen, wenn die Belastung über Wochen steigt und genug Eiweiß im Essen steckt. Beides kostet kein Abo im Supplement-Shop. Bei mir beginnt der Aufbau mit Technik an Grundübungen und einem Protokoll, in dem jede Einheit mit Gewicht und Wiederholungen steht. Erst wenn das läuft, reden wir überhaupt über Pulver, und meistens stellt sich heraus: Es braucht keins.",
      },
      {
        title: "Eiweiß aus dem Supermarkt, geplant mit Natalie",
        body: "Dein Eiweißziel deckst du mit Dingen, die es in jedem Markt in Meschenich und Umgebung gibt: Quark, Eier, Hülsenfrüchte, Fisch aus der Dose, Geflügel. Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, rechnet dir den Tagesbedarf aus und verteilt ihn auf Mahlzeiten, die zu deinem Tag passen und das Haushaltsbudget nicht sprengen. Das ist oft der Punkt, an dem Muskelaufbau zum ersten Mal planbar wird: nicht mehr Motivation, sondern eine Einkaufsliste.",
      },
      {
        title: "Training zu Hause im Kölner Süden",
        body: "Meschenich ist der südlichste Stadtteil des Bezirks Rodenkirchen, 7.789 Einwohner, von Feldern Richtung Rondorf und Immendorf umgeben, und ein eigenes Fitnessstudio gibt es im Veedel nicht. Deshalb kommt das Training zu dir: Ich bringe verstellbare Kurzhanteln, Kettlebell und Bänder mit, trainiert wird in der Wohnung, im Hof oder im Garten. Mit diesem Material und einem Protokoll ist eine dokumentierte Steigerung über Monate möglich, ohne dass du für jede Einheit nach Rodenkirchen oder Brühl fahren musst.",
      },
      {
        title: "Der Plan für die ersten zwölf Wochen",
        body: "Wochen eins bis vier: Technik an leichten Gewichten, Kniebeuge, Drücken, Ziehen, Rumpf. Wochen fünf bis acht: Steigerung nach Protokoll, erst über Wiederholungen, dann über Last. Wochen neun bis zwölf: Nachmessen und Vergleich mit dem Start, bei Kraftwerten und Umfängen. Steigen die Zahlen nicht, liegt es fast immer an Schlaf, Eiweiß oder ausgefallenen Einheiten, und genau das schauen wir uns dann an, statt ein neues Wundermittel zu suchen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Meschenich?",
        a: "Eine geführte 1-zu-1 Stunde kostet 50€, ohne Vertragslaufzeit. Wer mit Plan, App und wöchentlichen Check-ins arbeiten will, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Brauche ich Proteinpulver für den Muskelaufbau?",
        a: "Nein. Pulver ist nur gepresste Bequemlichkeit: praktisch, wenn der Tag keine Zeit für eine Mahlzeit lässt, aber kein Muss. Wer sein Eiweißziel mit normalem Essen erreicht, baut genauso auf. Natalie zeigt dir, wie das rechnerisch aufgeht.",
      },
      {
        q: "Geht Muskelaufbau ohne Fitnessstudio?",
        a: "Ja, über Monate hinweg. Verstellbare Kurzhanteln, Kettlebell und Bänder decken alle Grundübungen ab, und ich bringe sie mit. Grenzen setzt erst ein fortgeschrittenes Kraftniveau, und dann planen wir gemeinsam den nächsten Schritt.",
      },
      {
        q: "Wie lange dauert es, bis man etwas sieht?",
        a: "Die Protokollwerte steigen meist ab dem ersten Monat, sichtbare Veränderungen brauchen bei konsequentem Training und passendem Essen in der Regel acht bis zwölf Wochen. Versprechen auf ein Datum gebe ich nicht, Messwerte alle vier bis sechs Wochen schon.",
      },
      {
        q: "Ich habe nie trainiert. Ist das Programm trotzdem machbar?",
        a: "Ja. Die ersten Wochen bestehen aus Technik an leichten Gewichten, das Einstiegsniveau bestimmt der Check am Anfang. Gesteigert wird erst, wenn die Bewegung sauber sitzt.",
      },
    ],
  },
  "wahn/online-coaching": {
    answer:
      "Online Coaching für Köln-Wahn ist für Wochen gebaut, die du nicht selbst bestimmst: Dein Plan reist mit, jede Einheit gibt es auch als Hotel-Fassung ohne Geräte, Check-ins laufen dann, wenn du Zeit hast. Ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Wahn: Plan, der Dienstreisen und wechselnde Wochen übersteht, jede Einheit auch ohne Geräte, Check-ins wann du kannst. Ab 150€/Monat.",
    sections: [
      {
        title: "Dein Plan reist mit, statt zu Hause zu warten",
        body: "Rund um Wahn arbeiten viele Menschen in Jobs, die den Kalender diktieren: der Flughafen Köln/Bonn liegt ein paar Minuten entfernt, die Luftwaffenkaserne direkt nebenan in Wahnheide. Dienstreise, Lehrgang, kurzfristige Planänderung, und der feste Studiotermin ist weg. Deshalb bekommst du von mir jede Trainingswoche doppelt: eine Fassung für zu Hause mit dem, was du da hast, und eine Hotel-Fassung, die in einem Zimmer mit drei Quadratmetern freier Fläche funktioniert. Du entscheidest morgens, welche dran ist. Die Woche zählt trotzdem.",
      },
      {
        title: "Check-ins ohne festen Termin",
        body: "Einmal pro Woche schauen wir gemeinsam auf deine Einheiten, dein Gewicht und dein Essen. Wenn ein Videotermin in deine Woche passt, machen wir einen. Wenn nicht, schickst du mir deine Rückmeldung, wenn du am Gate sitzt oder abends im Quartier bist, und bekommst meine Antwort als Audio zurück. Entscheidend ist nicht, wann wir sprechen, sondern dass jede Woche jemand deine Daten liest und den Plan anpasst, bevor sich Fehler einschleifen.",
      },
      {
        title: "Wenn du da bist, nutzen wir die Wahner Heide",
        body: "In den Wochen zu Hause baue ich dir Läufe und zügige Geh-Einheiten am Rand der Wahner Heide in den Plan, eines der größten Naturschutzgebiete im Kölner Süden, ein paar Minuten von der Haustür. So besteht dein Training nicht nur aus Zimmerübungen: Kraft drinnen, Ausdauer draußen, und in Reisewochen hält die Hotel-Fassung das Niveau, bis du zurück bist.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Wahn?",
        a: "Ab 150€ im Monat. Enthalten sind dein Trainingsplan in der App, die wöchentliche Auswertung und die Ernährungssteuerung. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Funktioniert das Coaching auch bei Dienstreisen und Lehrgängen?",
        a: "Ja, genau dafür ist es gebaut. Jede Einheit gibt es in einer Fassung ohne Geräte, die in einem Hotelzimmer funktioniert. Der Check-in läuft per Nachricht, wenn ein Videotermin nicht in die Woche passt.",
      },
      {
        q: "Brauche ich Geräte zu Hause?",
        a: "Nein. Ich plane mit dem, was da ist. Zwei Kurzhanteln oder ein Widerstandsband erweitern die Auswahl, Pflicht sind sie nicht.",
      },
      {
        q: "Kann ich später zu 1-zu-1 Training wechseln?",
        a: "Ja. Viele starten online und buchen später einzelne Technikstunden dazu, bei dir zu Hause in Wahn oder draußen. Die 1-zu-1 Stunde kostet 50€.",
      },
    ],
  },

  "langel/personal-training": {
    answer:
      "Personal Training in Köln-Langel findet dort statt, wo du wohnst: bei dir zu Hause und auf den flachen Dammwegen am Rheinufer, die sich besser zum Trainieren eignen als manches Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Langel: 1-zu-1 bei dir zu Hause und auf den Dammwegen am Rheinufer, Plan nach Messung. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Der Rheindamm ist deine Messstrecke",
        body: "Langel liegt am südlichen Rand von Köln direkt am Rhein, zwischen Zündorf und Libur. Die Dammwege am Ufer sind flach, gerade und fast immer frei, und genau das macht sie wertvoll: Auf einer Strecke, die sich nie ändert, kann ich deine Fortschritte sauber messen. Dieselbe Runde, alle vier Wochen, gleiche Bedingungen. Wenn deine Zeit sinkt oder dein Puls bei gleichem Tempo runtergeht, ist das ein echter Fortschritt und kein Gefühl.",
      },
      {
        title: "Krafttraining in deinem Wohnzimmer, mit Plan",
        body: "Auf 5,33 Quadratkilometern wohnen in Langel rund 3.600 Menschen, viel Dorf, viel Grün, kein Fitnessstudio. Für dein Krafttraining braucht es auch keins: Ich bringe Material mit und baue die Einheiten um deine Wohnung oder deinen Garten herum auf. Am Anfang steht eine Messung, Kraft, Beweglichkeit, Ausdauer, danach bekommst du einen Plan mit festen Steigerungen. Du siehst in jeder Einheit, welches Gewicht und wie viele Wiederholungen heute dran sind.",
      },
      {
        title: "Ein Coach, der zu dir rausfährt",
        body: "Wer in Langel wohnt, fährt für fast alles ein Stück: Arbeit, Einkauf, Verein. Dein Training muss da nicht auch noch auf die Liste. Ich komme zu dir, zu festen Terminen, die wir gemeinsam legen, morgens vor der Arbeit oder am frühen Abend. Die Stunde gehört dir allein, und der Weg dorthin kostet dich null Minuten.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Langel?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt, Material und Plan. Das Erstgespräch ist kostenlos. Wer lieber mit App und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Wo trainieren wir in Langel?",
        a: "Kraft bei dir zu Hause oder im Garten, Ausdauer und Intervalle auf den Dammwegen am Rheinufer. Bei Dauerregen verlegen wir die Einheit komplett nach drinnen, der Plan hat für beides eine Fassung.",
      },
      {
        q: "Ich habe keine Geräte zu Hause. Geht das trotzdem?",
        a: "Ja. Kurzhanteln, Widerstandsbänder und alles, was die Einheit braucht, bringe ich mit. Du brauchst nur ein paar Quadratmeter freie Fläche.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Nach vier Wochen messen wir zum ersten Mal nach, auf derselben Strecke und mit denselben Übungen wie am Anfang. Kraftwerte bewegen sich meist zuerst, Ausdauer und Gewicht folgen, wenn du zweimal pro Woche dabei bleibst.",
      },
    ],
  },

  "braunsfeld/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Braunsfeld mit Natalie, Ernährungsberaterin für Sport- und Fitnessernährung: Schluss mit dem Dauer-Snacken am Schreibtisch, stattdessen drei echte Mahlzeiten, die satt machen. Komplett online, enthalten im Online Coaching ab 150€ im Monat.",
    metaDescription:
      "Ernährungsberatung in Köln-Braunsfeld mit Natalie: raus aus dem Dauer-Snacken am Schreibtisch, rein in drei Mahlzeiten, die tragen. Online, ab 150€/Monat.",
    sections: [
      {
        title: "Das Problem heißt selten Abendessen, sondern 14 Uhr",
        body: "Braunsfeld ist ein Büro-Veedel: Entlang der Aachener Straße und im Technologiepark sitzen Firmen, in denen der Tag am Schreibtisch stattfindet. Typisches Muster, das Natalie dort sieht: Frühstück fällt aus, mittags etwas Schnelles, ab 14 Uhr läuft der Snack-Automat, Kekse im Meeting, Riegel in der Schublade. Am Ende des Tages sind da 600 Kalorien, die nie wie Essen ausgesehen haben. Natalie dreht das um: drei Mahlzeiten mit genug Eiweiß, die so satt machen, dass der Griff zur Schublade gar nicht erst kommt.",
      },
      {
        title: "So läuft die Beratung ab",
        body: "Du fotografierst eine Woche lang dein Essen in der App, ohne etwas zu ändern. Dann baut Natalie mit dir im Videotermin den Tag um, und zwar in der Reihenfolge, die am meisten bringt: zuerst das Eiweiß in den Mahlzeiten, dann die Pausenstruktur, zuletzt die Snacks. Du musst nichts abwiegen und nichts Exotisches kochen. Die Pläne bestehen aus Zutaten, die du im Veedel in jedem Supermarkt bekommst.",
      },
      {
        title: "Die Mittagspause wird Teil des Plans",
        body: "Der Stadtwald beginnt direkt an der Südkante von Braunsfeld. Natalie und ich nutzen das: Eine zügige Runde von 20 Minuten nach dem Mittagessen senkt nachweislich das Nachmittagstief, das viele für Hunger halten. Wer mag, kombiniert die Beratung mit Training: als Online Coaching mit Plan in der App oder mit 1-zu-1 Stunden bei dir zu Hause oder im Stadtwald für 50€ pro Stunde.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Braunsfeld?",
        a: "Die Beratung mit Natalie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichem Check-in. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich dafür irgendwo hinfahren?",
        a: "Nein. Die Beratung läuft komplett online, per Video und App. Das passt in eine Mittagspause im Büro genauso wie in einen Homeoffice-Tag.",
      },
      {
        q: "Verbietet Natalie Snacks komplett?",
        a: "Nein. Sie sorgt zuerst dafür, dass deine Mahlzeiten satt machen. Wenn das steht, verlieren die meisten Snacks von selbst ihren Reiz. Was bleibt, wird eingeplant statt verboten.",
      },
      {
        q: "Ich esse mittags in der Kantine oder beim Bäcker. Funktioniert das trotzdem?",
        a: "Ja. Natalie arbeitet mit dem, was es dort wirklich gibt, und gibt dir einfache Auswahlregeln an die Hand. Ein Plan, der nur mit Kochen zu Hause funktioniert, wäre für Bürotage wertlos.",
      },
    ],
  },

  "ostheim/abnehmen": {
    answer:
      "Abnehmen in Köln-Ostheim baue ich in deinen Alltag ein, nicht neben ihn: Wege im Veedel zu Fuß statt mit der Bahn, zwei Krafteinheiten pro Woche bei dir zu Hause und ein Kalorienziel, das Natalie mit dir festlegt. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Ostheim: Alltagswege zu Fuß, zwei Krafteinheiten pro Woche zu Hause, Kalorienziel mit Natalie. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Deine Alltagswege verbrennen mehr als der Sport-Sonntag",
        body: "Ostheim ist kompakt: knapp 14.000 Menschen auf 3,75 Quadratkilometern, Einkauf, Schule und Haltestelle liegen nah beieinander. Genau das nutzen wir. Wer seine Wege im Veedel zu Fuß geht, kommt ohne eine Minute Sport auf mehrere tausend Schritte am Tag, und diese Alltagsbewegung entscheidet beim Abnehmen mehr als die eine große Trainingseinheit am Wochenende. Ich schaue mit dir auf eine normale Woche und lege fest, welche Wege ab jetzt zu Fuß laufen. Das klingt banal und ist der Teil, der bei den meisten den Unterschied macht.",
      },
      {
        title: "Zwei Krafteinheiten pro Woche, ohne Studio",
        body: "Beim Abnehmen schützt Krafttraining deine Muskulatur, damit das Defizit Fett abbaut und nicht Muskeln. Wir trainieren bei dir zu Hause, ich bringe Material mit, 45 bis 60 Minuten, zweimal pro Woche. Eine Studio-Mitgliedschaft brauchst du dafür nicht, und du sparst dir die Fahrt quer durch den Bezirk. Für längere zügige Geh-Einheiten am Wochenende beginnt am Ostheimer Rand die Merheimer Heide.",
      },
      {
        title: "Das Kalorienziel legt Natalie mit dir fest",
        body: "Hungern führt in Jo-Jo, deshalb rechnet Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, dein Defizit so, dass du satt wirst und durchhältst. Realistisch sind ein halbes bis ein Kilo Fett pro Woche am Anfang, später etwas weniger. Jede Woche schauen wir auf Gewicht, Essen und Training zusammen und stellen nach, bevor der Fortschritt stehen bleibt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Ostheim?",
        a: "Die 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und Material. Wer lieber mit App, Plan und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wie viel kann ich realistisch abnehmen?",
        a: "Ein halbes bis ein Kilo Fett pro Woche am Anfang, wenn Kalorienziel, zwei Krafteinheiten und Alltagsschritte zusammenkommen. Schnellere Versprechen halten selten länger als vier Wochen.",
      },
      {
        q: "Muss ich joggen?",
        a: "Nein. Zügiges Gehen reicht für den Anfang völlig, auf deinen Alltagswegen und am Wochenende in der Merheimer Heide. Laufen bauen wir nur ein, wenn du es willst und deine Gelenke mitspielen.",
      },
      {
        q: "Brauche ich eine Diät oder spezielle Lebensmittel?",
        a: "Nein. Natalie plant mit normalen Lebensmitteln aus dem Supermarkt und baut dein Essen so um, dass das Defizit nebenbei entsteht. Verbotslisten und Ersatzprodukte kommen nicht vor.",
      },
    ],
  },

  "brueck/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Brück ist Kraft, die du draußen wiederfindest: zwei geführte Einheiten pro Woche bei dir zu Hause bauen Beine, Rücken und Griffkraft auf, die du am Wochenende im Königsforst tatsächlich benutzt. Die 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Brück: geführtes Krafttraining zu Hause statt Stromweste, Kraft für Königsforst und Alltag. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Kraft, die du benutzen kannst, statt eines Reizes im Studio",
        body: "EMS reizt Muskeln unter einer Weste, während du fast stillstehst. Was dabei nicht entsteht: Bewegungen, die du außerhalb des Studios abrufen kannst. In Brück liegt der Königsforst direkt an der Veedelgrenze, und genau daran messe ich das Training. Kniebeugen, Ausfallschritte und Zugübungen mit steigender Last machen sich bemerkbar, wenn du dort wanderst, läufst oder mit dem Rad die Forstwege fährst. Eine Stromweste macht das nicht, egal wie oft du hingehst.",
      },
      {
        title: "Zwei Einheiten pro Woche, bei dir zu Hause in Brück",
        body: "Ich komme mit Kurzhanteln, Kettlebell und Bändern zu dir, zwischen Olpener Straße und Waldrand. Jede Einheit dauert 45 bis 60 Minuten: Aufwärmen, drei bis vier Grundübungen mit protokollierter Last, zum Schluss Rumpf. Alle vier bis sechs Wochen vergleichen wir die Zahlen. Du siehst, was stärker geworden ist, statt es glauben zu müssen. Einen Jahresvertrag gibt es bei mir nicht, du buchst Stunden.",
      },
      {
        title: "Warum gerade Brück dafür gebaut ist",
        body: "Das Veedel hat gut 10.000 Einwohner auf 7,5 Quadratkilometern und mit der Stadtbahn-Linie 1 eine direkte Achse in die Stadt. Viele hier sind sowieso draußen unterwegs, im Königsforst oder auf dem Mauspfad. Für die ist ein Training sinnlos, das nur in einem Studioraum existiert. Sinnvoller ist der Kreislauf aus zwei Krafteinheiten pro Woche und der Bewegung, die du ohnehin schon magst: Die Kraft aus dem Wohnzimmer macht die Waldrunde leichter, und die Waldrunde hält dich zwischen den Einheiten in Schwung.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Brück?",
        a: "Eine geführte 1-zu-1 Stunde kostet 50€, Anfahrt und Material inklusive. Es gibt keinen Jahresvertrag und keine Aufnahmegebühr. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ist EMS nicht viel zeitsparender?",
        a: "Die reine Impulszeit ist kürzer, aber der Effekt bleibt im Studio. Zwei richtige Krafteinheiten pro Woche bauen Technik und Last auf, die draußen und im Alltag tragen. Zeit sparst du bei mir an anderer Stelle: Ich komme nach Brück, du fährst nirgendwo hin.",
      },
      {
        q: "Brauche ich eigene Geräte zu Hause?",
        a: "Nein. Ich bringe alles mit, was wir für steigende Lasten brauchen. Ein freies Stück Boden von zwei mal zwei Metern reicht, der Garten geht im Sommer genauso.",
      },
      {
        q: "Ich war lange nicht sportlich aktiv. Ist das trotzdem machbar?",
        a: "Ja. Wir starten mit einem Technik-Check an leichten Gewichten und steigern erst, wenn die Ausführung sitzt. Das Protokoll richtet sich nach deinem Stand, nicht nach einem Standardplan.",
      },
    ],
  },

  "holweide/personal-training": {
    answer:
      "Personal Training in Köln-Holweide plane ich um Dienste und Familienzeiten, nicht umgekehrt: 1-zu-1 bei dir zu Hause, mit Terminen, die auch vor dem Frühdienst oder nach der Übergabe funktionieren. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Holweide: 1-zu-1 zu Hause, Termine passend zu Dienstplan und Familie, Kraft für Rücken und Alltag. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Veedel, in dem viele beruflich körperlich arbeiten",
        body: "Holweide ist das Veedel des Evangelischen Krankenhauses, einer der großen Kliniken im Kölner Osten. Viele Anfragen von hier kommen aus Pflege, Praxis und Therapie: Menschen, die acht bis zwölf Stunden auf den Beinen sind, heben, stützen und umlagern, und deren Rücken das irgendwann quittiert. Für diesen Alltag trainiere ich gezielt: Kreuzheben-Varianten für sauberes Heben, Rumpfkraft fürs Stützen, Beinkraft für lange Stehphasen. Das ist kein Fitnessprogramm neben dem Beruf, es ist eines für den Beruf.",
      },
      {
        title: "Termine, die mit dem Dienstplan leben",
        body: "Ein fester Montagabend nützt nichts, wenn deine Woche zwischen Früh-, Spät- und Wochenenddienst wechselt. Deshalb legen wir die zwei Einheiten pro Woche jede Woche neu, auch morgens um sieben oder am frühen Nachmittag vor dem Spätdienst. Trainiert wird bei dir zu Hause, ich bringe das Material mit. Holweide ist mit 21.000 Einwohnern auf gut vier Quadratkilometern dicht gebaut, zwischen zwei Terminen im Veedel liegen für mich nur Minuten, deshalb kann ich hier auch kurzfristig Zeiten halten.",
      },
      {
        title: "Plan, Protokoll und messbare Schritte",
        body: "Jede Einheit folgt einem Plan: Aufwärmen, Grundübungen mit dokumentierter Steigerung, gezielte Arbeit an deinen Schwachstellen. Alle vier bis sechs Wochen messen wir nach, Kraftwerte und, wenn du willst, Umfänge und Gewicht. Wenn Abnehmen Teil des Ziels ist, rechnet Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, dein Kalorienziel dazu. Auch das läuft flexibel per App und Video, ohne zusätzliche Termine im Kalender.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Holweide?",
        a: "Eine 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und Material. Alternativ gibt es das Online Coaching ab 150€ im Monat mit Plan in der App und wöchentlichem Check-in. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich arbeite im Schichtdienst. Wie flexibel sind die Termine wirklich?",
        a: "Wir planen Woche für Woche neu, passend zu deinem Dienstplan. Frühe Morgentermine und frühe Nachmittage sind ausdrücklich möglich, nicht nur der klassische Feierabend.",
      },
      {
        q: "Mein Rücken meldet sich schon. Kann ich trotzdem trainieren?",
        a: "In den meisten Fällen ja, gerade dann. Wir starten mit einem Check und bauen Belastung schrittweise auf. Bei akuten Beschwerden oder nach Verletzungen gehört die ärztliche Abklärung zuerst dazu, danach übernehme ich.",
      },
      {
        q: "Wo findet das Training statt?",
        a: "Bei dir zu Hause in Holweide, ich bringe alles mit. Wer lieber draußen trainiert: Die Dellbrücker Heide und der Thielenbruch liegen direkt hinter der Veedelgrenze und eignen sich gut für Ausdauer-Anteile.",
      },
    ],
  },

  "eil/online-coaching": {
    answer:
      "Online Coaching für Köln-Eil macht aus dem weitläufigsten Veedel von Porz dein Trainingsgelände: Kraftplan in der App für zu Hause, Ausdauereinheiten auf den Wegen der Wahner Heide, wöchentlicher Video-Check-in mit mir. Ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Online Coaching in Köln-Eil: Kraftplan per App für zu Hause, Ausdauer in der Wahner Heide, wöchentlicher Video-Check-in. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "16 Quadratkilometer Veedel, null Studio nötig",
        body: "Eil ist flächenmäßig riesig: gut 16 Quadratkilometer, aber nur rund 9.300 Einwohner, weil ein großer Teil zur Wahner Heide gehört. Ein Fitnessstudio suchst du im Ortskern vergeblich, und genau deshalb funktioniert hier Online Coaching so gut. Die Kraftarbeit passiert zu Hause nach Plan in der App, mit Übungen, die zu deinem Material passen. Die Ausdauer holst du dir vor der Haustür: Die Heide beginnt am Ortsrand, und ihre markierten Wege sind flach genug für saubere, vergleichbare Läufe und zügige Geh-Einheiten.",
      },
      {
        title: "So funktioniert der Plan in der Praxis",
        body: "Nach dem kostenlosen Erstgespräch bekommst du deinen Plan in die App: zwei bis drei Krafteinheiten für zu Hause, dazu Ausdauervorgaben für die Heide mit Pulsbereich oder Tempo, je nachdem, womit du arbeitest. Du hakst jede Einheit ab, ich lese mit. Einmal pro Woche sprechen wir per Video: Was lief, was nicht, was ändern wir. Die Wahner Heide ist Naturschutzgebiet, geplant wird deshalb konsequent auf den freigegebenen Wegen, die für Training mehr als genug hergeben.",
      },
      {
        title: "Ernährung läuft im selben System mit",
        body: "Wenn du nebenbei Gewicht verlieren oder Muskeln aufbauen willst, steigt Natalie ein, unsere Ernährungsberaterin für Sport- und Fitnessernährung. Sie legt mit dir Kalorien- und Eiweißziel fest und schaut wöchentlich auf deine Fotos und Einträge. Alles in derselben App, ohne zweiten Anbieter. Und wenn du zwischendurch eine Technik-Kontrolle mit mir vor Ort willst: Die 1-zu-1 Stunde in Eil kostet 50€ und lässt sich mit dem Online Coaching kombinieren.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Eil?",
        a: "Ab 150€ im Monat, mit Trainingsplan in der App, Ernährungssteuerung und wöchentlichem Video-Check-in. Das Erstgespräch ist kostenlos, eine Mindestlaufzeit über die Garantiezeit von 14 Tagen hinaus gibt es nicht.",
      },
      {
        q: "Brauche ich Geräte für die Kraftarbeit zu Hause?",
        a: "Ein Grundstock hilft: verstellbare Kurzhanteln oder eine Kettlebell und ein Widerstandsband. Ich plane mit dem, was du hast, und sage dir ehrlich, welche eine Anschaffung als Nächstes am meisten bringt.",
      },
      {
        q: "Darf man in der Wahner Heide überhaupt trainieren?",
        a: "Laufen und Gehen auf den freigegebenen Wegen ist erlaubt, und genau so plane ich deine Einheiten. Abseits der Wege wird nichts geplant, das Gebiet ist Naturschutzgebiet.",
      },
      {
        q: "Was unterscheidet das von einer Trainings-App von der Stange?",
        a: "Der Plan wird jede Woche von einem Menschen nachgestellt, der deine Einträge wirklich liest. Wenn eine Woche kippt, kippt der Plan mit, statt dich mit verpassten Einheiten zu frustrieren.",
      },
    ],
  },

  "longerich/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Longerich ist Krafttraining, das dir etwas beibringt: Nach drei Monaten beherrschst du Technik und kennst deine Zahlen, beides gehört dir und geht nie verloren. Zwei geführte Einheiten pro Woche bei dir zu Hause, die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Longerich: Krafttraining zu Hause, das Technik und messbare Kraft aufbaut statt Stromreiz. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Nach drei Monaten EMS kannst du nur eines: wieder hingehen",
        body: "Das ist der Kern des Unterschieds. EMS liefert einen Reiz, solange du zahlst und unter der Weste stehst. Es hinterlässt keine Fähigkeit. Krafttraining funktioniert umgekehrt: Du lernst Kniebeuge, Hüftbeuge und Zugmuster sauber auszuführen, und dieses Können bleibt, auch in jedem Urlaub, auch wenn du mal pausierst. Dazu kommt ein Protokoll mit deinen Lasten. Wer nach zwölf Wochen bei mir aufhören würde, nähme Technik und Zahlen mit. Wer bei EMS aufhört, nimmt nichts mit.",
      },
      {
        title: "Zu Hause in Longerich, ohne Vertrag",
        body: "Longerich ist ein ruhiges Wohnveedel im Kölner Norden, knapp 14.000 Einwohner auf gut sechs Quadratkilometern, viele Häuser mit Keller oder Garten. Mehr braucht es nicht: Ich komme zweimal pro Woche mit Material zu dir, wir trainieren im Wohnzimmer, im Keller oder draußen. Du buchst Stunden statt eines Jahresvertrags, und wenn es nicht passt, greift die 14-Tage-Garantie. Die Anfahrtszeit, die ein Studiotermin kosten würde, steckst du in die Einheit selbst.",
      },
      {
        title: "Messbar statt gefühlt",
        body: "Alle vier bis sechs Wochen vergleichen wir: Welche Last bewegst du in den Grundübungen, wie stabil ist der Rumpf, wie fühlen sich Treppen, Einkäufe, Gartenarbeit an. Diese Alltagsmomente sind der eigentliche Test, denn dafür trainierst du. Ein Stromimpuls kann Muskeln reizen, aber er kann dir nicht beibringen, eine Kiste sauber vom Boden zu heben. Genau das lernst du hier in den ersten Wochen.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Longerich?",
        a: "Die geführte 1-zu-1 Stunde kostet 50€, Anfahrt nach Longerich und Material inklusive. Kein Jahresvertrag, keine Aufnahmegebühr, Erstgespräch kostenlos.",
      },
      {
        q: "EMS wird mir als gelenkschonend empfohlen. Ist Krafttraining riskanter?",
        a: "Sauber dosiertes Krafttraining ist gelenkfreundlich und stärkt nebenbei Knochen und Sehnen, weil echte Last darauf wirkt. Wir beginnen leicht, steigern nach Protokoll, und ich korrigiere jede Wiederholung live.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Die ersten Kraftzuwächse zeigen sich im Protokoll meist nach drei bis vier Wochen, sichtbare Veränderungen je nach Ausgangslage nach acht bis zwölf. Versprochen wird nichts, gemessen alles.",
      },
      {
        q: "Kann ich das mit Laufen oder Radfahren kombinieren?",
        a: "Ja, das ist sogar ideal. Zwei Krafteinheiten pro Woche lassen genug Raum für Ausdauer, und die stärkeren Beine merkst du auf dem Rad und beim Laufen zuerst.",
      },
    ],
  },

  "seeberg/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Seeberg funktioniert auch in der Etagenwohnung: zwei geführte Krafteinheiten pro Woche mit kontrolliertem Tempo statt fallender Gewichte, leise genug für jedes Mehrfamilienhaus. Ich bringe das Material mit, die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Seeberg: leises Krafttraining in der Wohnung, kontrolliertes Tempo, Protokoll und Eiweißziel. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Krafttraining, das deine Nachbarn nicht hören",
        body: "Seeberg ist dicht gebaut: rund 11.000 Menschen auf nicht einmal zwei Quadratkilometern, die meisten in Etagenwohnungen. Der häufigste Einwand gegen Training zu Hause lautet hier: zu laut, zu wenig Platz, die Nachbarn unter mir. Beides ist lösbar. Wir arbeiten ohne Sprünge und ohne abgelegte Hanteln, mit Übungen, die auf zwei mal zwei Metern stattfinden. Eine Matte unter dir dämpft den Rest, und die lauteste Phase einer Einheit bleibt dein Atem.",
      },
      {
        title: "Langsames Tempo baut mehr Muskel auf, nicht weniger",
        body: "Was nach Kompromiss klingt, ist Trainingslehre: Muskelaufbau entsteht durch Spannung über Zeit. Eine Kniebeuge mit drei Sekunden Absenken reizt den Muskel stärker als eine schnelle, schlampige, und sie ist dabei praktisch lautlos. Wir nutzen verstellbare Kurzhanteln, eine Kettlebell und Bänder, gesteigert wird über Last, Tempo und Pausenlänge, alles im Protokoll. Alle vier bis sechs Wochen wird nachgemessen: Kraftwerte und, wenn du willst, Umfänge an Arm, Brust und Bein.",
      },
      {
        title: "Essen entscheidet die Hälfte",
        body: "Ohne Eiweiß und genug Kalorien wächst nichts, egal wie gut das Training ist. Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, legt mit dir ein Eiweißziel fest, das mit normalem Supermarkt-Einkauf erreichbar ist. Für die Erholung zwischen den Einheiten liegt der Fühlinger See direkt vor der Tür: lockere Runden am Wasser statt dritter Krafteinheit, denn gewachsen wird in der Pause.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Seeberg?",
        a: "Die geführte 1-zu-1 Stunde kostet 50€, inklusive Anfahrt und Material. Mit App-Plan und wöchentlichem Check-in gibt es das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Reicht Training in der Wohnung wirklich für sichtbare Muskeln?",
        a: "Ja, wenn die Last planmäßig steigt. Verstellbare Kurzhanteln decken die ersten sechs bis zwölf Monate locker ab. Entscheidend ist das Protokoll, nicht die Postleitzahl des Trainingsorts.",
      },
      {
        q: "Wie oft muss ich trainieren?",
        a: "Zwei Einheiten pro Woche reichen für kontinuierlichen Aufbau, wenn Eiweiß und Schlaf stimmen. Mehr bringt erst etwas, wenn du fortgeschritten bist, und auch dann planen wir es gemeinsam.",
      },
      {
        q: "Brauche ich Proteinpulver?",
        a: "Nein. Das Eiweißziel lässt sich mit Quark, Eiern, Hülsenfrüchten, Fleisch oder Fisch erreichen. Pulver ist höchstens eine bequeme Ergänzung, nie die Voraussetzung.",
      },
    ],
  },

  "roggendorf-thenhoven/muskelaufbau": {
    answer:
      "Muskelaufbau in Roggendorf/Thenhoven scheitert nicht an den Übungen, sondern an der Anfahrt zum nächsten Studio. Deshalb drehe ich es um: Ich komme mit dem Material in Kölns nördlichstes Doppeldorf, zwei Einheiten pro Woche mit Protokoll. Die Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln Roggendorf/Thenhoven: der Trainer kommt ins Dorf, zwei Einheiten pro Woche mit Protokoll und Eiweißziel. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Muskel wächst aus Regelmäßigkeit, und die stirbt am Fahrweg",
        body: "Roggendorf/Thenhoven ist der nördlichste Stadtteil auf der linken Rheinseite, zwei Dörfer mit zusammen knapp 4.800 Einwohnern auf fast 14 Quadratkilometern, ohne eigenes Studio. Wer hier Muskeln aufbauen will, plant pro Studiobesuch schnell eine Stunde nur für Hin- und Rückweg. Zwei Besuche pro Woche heißt: ein halber Arbeitstag im Monat fürs Fahren. Genau an dieser Rechnung sterben die meisten Vorsätze, nicht an der Motivation. Also fahre ich, nicht du.",
      },
      {
        title: "So sieht das Training im Dorf aus",
        body: "Ich bringe verstellbare Kurzhanteln, Kettlebell und Bänder mit, trainiert wird im Wohnzimmer, in der Garage oder im Garten. Der Plan steht auf Grundübungen: Kniebeuge-, Druck- und Zugvarianten, jede Woche mit protokollierter Last. Alle vier bis sechs Wochen messen wir nach. Wer eigene Ausrüstung anschaffen will, bekommt von mir eine ehrliche Reihenfolge: erst das, was das Protokoll wirklich verlangt, nicht das, was der Sportversand empfiehlt.",
      },
      {
        title: "Eiweiß, Erholung und der Chorbusch",
        body: "Fürs Wachstum braucht es neben der Last zwei Dinge: ein Eiweißziel, das Natalie, unsere Ernährungsberaterin für Sport- und Fitnessernährung, mit dir festlegt, und echte Erholung zwischen den Einheiten. Dafür liegt der Chorbusch direkt am Ortsrand: lockere Spaziergänge oder Radrunden dort halten den Kreislauf in Gang, ohne die Muskeln zusätzlich zu ermüden. Mehr Infrastruktur braucht dein Aufbau nicht.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Roggendorf/Thenhoven?",
        a: "Die 1-zu-1 Stunde kostet 50€, Anfahrt ins Dorf und Material inklusive. Alternativ gibt es das Online Coaching ab 150€ im Monat, wenn du lieber nach App-Plan trainierst. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Lohnt sich das ohne Studio-Geräte überhaupt?",
        a: "Ja. Für die ersten sechs bis zwölf Monate Aufbau reichen steigende Lasten mit Kurzhanteln und Kettlebell vollständig. Maschinen werden erst viel später interessant, wenn überhaupt.",
      },
      {
        q: "Wie schnell baue ich Muskeln auf?",
        a: "Realistisch sind als Einsteiger ein bis zwei Kilo Muskelmasse in den ersten drei Monaten, danach wird es langsamer. Das Protokoll zeigt dir den Fortschritt früher als der Spiegel.",
      },
      {
        q: "Zu welchen Zeiten kommst du nach Roggendorf/Thenhoven?",
        a: "Morgens, nachmittags und am frühen Abend, die genauen Fenster klären wir im kostenlosen Erstgespräch. Die Termine bleiben dann fest, denn feste Termine sind hier der halbe Fortschritt.",
      },
    ],
  },

  "neustadt-nord/rueckentraining": {
    answer:
      "Rückentraining in der Kölner Neustadt-Nord richtet sich gegen die Haltung, die hier den ganzen Tag dominiert: vorgebeugt am Schreibtisch, vorgebeugt auf dem Rad. Zwei Krafteinheiten pro Woche bauen Streckung und hintere Kette auf, im Inneren Grüngürtel, bei dir zu Hause oder im Studio. 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Rückentraining in Köln Neustadt-Nord: raus aus der Dauerbeuge von Schreibtisch und Fahrrad, Kraft für Streckung und hintere Kette. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Dein Tag findet in der Beuge statt",
        body: "Die Neustadt-Nord ist das Veedel der kurzen Wege und der langen Sitzzeiten: 28.604 Menschen auf 3,49 km², dazu die Büros am Mediapark, am Friesenplatz und entlang der Ringe. Wer hier lebt, fährt Rad und sitzt dann acht Stunden am Bildschirm. Beides passiert in derselben Position: Hüfte gebeugt, Rücken rund, Arme nach vorn. Der Körper bekommt von morgens bis abends ein einziges Signal. Die Rückseite, also Gesäß, hintere Oberschenkel und die Muskeln entlang der Wirbelsäule, arbeitet dabei fast nie. Genau da setzt das Training an.",
      },
      {
        title: "Die Gegenrichtung trainieren, nicht die Beuge dehnen",
        body: "Ein verspannter Rücken aus der Dauerbeuge braucht keine Schonung und keine endlosen Dehnübungen, er braucht Kraft in der Gegenrichtung. Im Plan stehen deshalb Hüftstrecken, Rudern, Kreuzheben-Varianten mit sauberer Technik und gezielte Arbeit für die Schulterblätter. Zwei Einheiten pro Woche reichen, wenn die Last Schritt für Schritt steigt. Nach vier bis sechs Wochen merkst du es zuerst auf dem Rad: Der Nacken meldet sich später, das lange Sitzen danach kippt dich nicht mehr so schnell zusammen.",
      },
      {
        title: "Stadtgarten, Grüngürtel oder dein Wohnzimmer",
        body: "Du musst für das Training nicht aus dem Veedel raus. Der Innere Grüngürtel und der Stadtgarten liegen direkt vor der Tür, dort arbeiten wir mit Körpergewicht, Kurzhanteln und Widerstandsbändern, die ich mitbringe. Wer lieber drinnen trainiert, macht die Einheiten zu Hause oder im Studio mit Langhantel. Für Bürotage am Mediapark plane ich auch Mittagseinheiten: 60 Minuten von Tür zu Tür, Technik und Hauptübungen sind in dieser Zeit sauber machbar.",
      },
      {
        title: "Erst verstehen, wo es klemmt, dann laden",
        body: "Wir starten mit einem Check: Wie weit streckt deine Hüfte, was machen die Schulterblätter, wo weicht der Rücken unter Last aus. Daraus entsteht der Plan, und alle vier bis sechs Wochen wird nachgemessen. Bei akuten Schmerzen, die in Bein oder Arm ausstrahlen, gehört der erste Weg zum Arzt. Das Training übernimmt danach: stärker werden, damit der Alltag in der Beuge dich nicht mehr festhält.",
      },
    ],
    faq: [
      {
        q: "Was kostet Rückentraining in der Neustadt-Nord?",
        a: "Eine 1-zu-1 Stunde kostet 50€. Wer selbstständig mit Plan und wöchentlichen Check-ins arbeiten will, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Ich fahre viel Rad. Reicht das nicht als Bewegung?",
        a: "Radfahren ist gute Ausdauer, aber es findet in der gleichen gebeugten Haltung statt wie der Schreibtisch. Für den Rücken zählt die Gegenrichtung: Streckung und Zugkraft. Die bekommst du nur über gezieltes Krafttraining.",
      },
      {
        q: "Wo trainieren wir in der Neustadt-Nord?",
        a: "Draußen im Inneren Grüngürtel oder im Stadtgarten, bei dir zu Hause mit mitgebrachtem Equipment oder im Studio. Den Ort legen wir nach deinem Tagesablauf fest, auch eine Mittagspause am Mediapark reicht für eine volle Einheit.",
      },
      {
        q: "Wie schnell lassen Rückenschmerzen vom Sitzen nach?",
        a: "Die meisten spüren nach vier bis sechs Wochen mit zwei Einheiten pro Woche einen Unterschied im Alltag. Messbar machen wir es über die Kraftwerte im Plan. Bleibt ein Schmerz unverändert oder strahlt er aus, gehört er zuerst in ärztliche Abklärung.",
      },
    ],
  },

  "weiss/personal-training": {
    answer:
      "Personal Training in Köln-Weiß kommt zu dir ins Dorf: 1-zu-1 Einheiten bei dir zu Hause oder draußen am Weißer Rheinbogen, mit Equipment, das ich mitbringe, und einem Plan mit messbarer Progression. 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Weiß: 1-zu-1 bei dir zu Hause oder am Weißer Rheinbogen, Equipment kommt mit, Plan mit Progression. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Dorf am Rhein, in dem das Training zu dir kommt",
        body: "Weiß hat 5.923 Einwohner auf 4,16 km², einen eigenen Rheinabschnitt und keine einzige Trainingsfläche mit Geräten. Wer hier ernsthaft trainieren will, fährt bisher raus, nach Rodenkirchen oder weiter. Beim Personal Training drehe ich das um: Ich komme mit Kurzhanteln, Kettlebells und Widerstandsbändern zu dir. Dein Wohnzimmer, deine Garage oder dein Garten reichen für vollwertiges Krafttraining, wenn Übungsauswahl und Progression stimmen. Die Fahrzeit, die du dir sparst, ist ein Trainingstag mehr pro Woche.",
      },
      {
        title: "Der Rheinbogen ist dein zweiter Trainingsort",
        body: "Direkt am Veedel liegt das Naturschutzgebiet Weißer Rheinbogen: flache Wege am Wasser, Wiesen, kaum Verkehr. Dort verlege ich bei gutem Wetter ganze Einheiten nach draußen, Kraftzirkel auf der Wiese, Intervalle und zügige Läufe auf dem Leinpfad. Im Naturschutzgebiet bleiben wir auf den Wegen, Platz ist trotzdem mehr als genug. So entsteht ein Wechsel, den kein Studio bietet: Kraft zu Hause, Ausdauer und Technik am Wasser.",
      },
      {
        title: "Plan, Zahlen und ein fester Termin",
        body: "Am Anfang steht ein Check: Beweglichkeit, Grundkraft, dein Ziel und dein Kalender. Daraus baue ich einen Plan mit zwei Einheiten pro Woche und trage jede Einheit in der App mit: Gewichte, Wiederholungen, Fortschritt. Alle vier bis sechs Wochen vergleichen wir die Zahlen mit dem Start. Wenn sich nichts bewegt, ändere ich den Plan, nicht du deinen Anspruch. Der feste Termin tut den Rest: In einem Dorf wie Weiß sage ich nicht anonym ab, ich stehe vor deiner Tür.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Weiß?",
        a: "Die 1-zu-1 Stunde kostet 50€, auch bei dir zu Hause in Weiß. Wer lieber mit App-Plan und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe keine Geräte zu Hause. Geht das trotzdem?",
        a: "Ja. Ich bringe Kurzhanteln, Kettlebells und Bänder mit. Für Muskelaufbau und Rückenkraft reicht das in den ersten Monaten vollständig, die Progression steuere ich über Last, Tempo und Übungsauswahl.",
      },
      {
        q: "Wo genau trainieren wir draußen in Weiß?",
        a: "Am Rheinufer von Weiß und auf den Wegen durch den Weißer Rheinbogen. Flach, ruhig und direkt vor der Tür. Im Winter oder bei Dauerregen verlegen wir die Einheit nach drinnen, der Plan läuft durch.",
      },
      {
        q: "Für wen lohnt sich Personal Training im Veedel?",
        a: "Für alle, die in Weiß wohnen und nicht für jede Einheit nach Rodenkirchen oder in die Stadt fahren wollen: Wiedereinsteiger, Berufstätige mit engem Kalender, Eltern, die trainieren wollen, während die Kinder zu Hause sind.",
      },
    ],
  },

  "suelz/personal-training": {
    answer:
      "Personal Training in Köln-Sülz löst das Problem, das hier fast jeder kennt: angefangen wird oft, durchgehalten selten. 1-zu-1 Einheiten mit festem Termin, bei dir zu Hause, im Beethovenpark oder im Studio, mit dokumentierter Progression. 50€ pro Stunde, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Sülz: fester Termin statt drittem Fehlstart, Training zu Hause, im Beethovenpark oder im Studio, Fortschritt dokumentiert. 50€/Std.",
    sections: [
      {
        title: "In Sülz scheitert niemand am Angebot",
        body: "Sülz ist mit 36.851 Einwohnern auf 5,17 km² eines der größten Veedel der Stadt, und an Sportmöglichkeiten fehlt es nicht: Studios, Vereine, Laufgruppen, der Beethovenpark. Trotzdem erzählen mir die meisten beim Erstgespräch dieselbe Geschichte: zweimal, dreimal angefangen, nach sechs Wochen versandet. Nicht aus Faulheit, sondern weil niemand merkt, wenn du fehlst. Personal Training ändert genau diesen Punkt: Der Termin steht, ich stehe da, und das Training ist auf dich gebaut statt auf den Durchschnitt eines Kursplans.",
      },
      {
        title: "Beethovenpark, dein Wohnzimmer oder die Langhantel im Studio",
        body: "Trainiert wird dort, wo es in deine Woche passt. Im Beethovenpark arbeiten wir draußen mit Körpergewicht, Kurzhanteln und Bändern, die ich mitbringe. Zu Hause reicht ein freier Streifen Boden, auch in einer Sülzer Altbauwohnung. Für schwere Grundübungen mit der Langhantel gehen wir ins Studio. Viele kombinieren: eine Einheit draußen oder daheim, eine am Eisen. Der Plan bleibt derselbe, nur der Ort wechselt.",
      },
      {
        title: "Fortschritt steht bei mir in Zahlen, nicht im Gefühl",
        body: "Jede Einheit wird in der App dokumentiert: Übungen, Gewichte, Wiederholungen. Alle vier bis sechs Wochen vergleichen wir mit dem Start und entscheiden anhand der Zahlen, was sich ändert. Das ist der Unterschied zum vierten Anlauf auf eigene Faust: Du siehst schwarz auf weiß, dass sich etwas bewegt, und genau das hält Menschen bei der Stange, nicht Motivation aus dem Kalenderblatt.",
      },
      {
        title: "Für Sülzer Kalender gebaut",
        body: "Hier wohnen viele Familien mit zwei Berufen und vollen Wochen. Deshalb lege ich Termine früh am Morgen, in die Mittagszeit oder auf den frühen Abend und halte sie Woche für Woche gleich, damit das Training ein fester Block wird statt Verhandlungsmasse. Fällt ein Termin aus, wird er verschoben, nicht gestrichen. Zwei Einheiten pro Woche reichen für sichtbaren Aufbau in drei Monaten.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Sülz?",
        a: "Die 1-zu-1 Stunde kostet 50€. Als Alternative gibt es das Online Coaching ab 150€ im Monat mit Trainingsplan in der App und wöchentlichem Check-in. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe schon mehrmals angefangen und aufgehört. Warum sollte es diesmal halten?",
        a: "Weil zwei Dinge anders sind: Es gibt einen festen Termin mit einer Person, die auf dich wartet, und einen dokumentierten Fortschritt, den du alle paar Wochen schwarz auf weiß siehst. Beides fehlt beim Training auf eigene Faust.",
      },
      {
        q: "Wo trainieren wir in Sülz?",
        a: "Im Beethovenpark, bei dir zu Hause mit mitgebrachtem Equipment oder im Studio an der Langhantel. Auch der Grüngürtel Richtung Decksteiner Weiher ist für Ausdauerblöcke nah genug. Den Mix legen wir im Erstgespräch fest.",
      },
      {
        q: "Reichen zwei Einheiten pro Woche?",
        a: "Ja, wenn sie geplant sind und die Last steigt. Dazu bekommst du kurze Aufgaben für die Tage dazwischen, meist 15 bis 20 Minuten. Mehr Volumen bauen wir erst ein, wenn die Basis steht.",
      },
    ],
  },

  "neubrueck/personal-training": {
    answer:
      "Personal Training in Köln-Neubrück heißt: 1-zu-1 Training mit festem Plan und messbarer Progression, bei dir zu Hause in der Siedlung oder draußen am Königsforst, der direkt hinter dem Veedel beginnt. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Neubrück: 1-zu-1 bei dir zu Hause oder am Königsforst, fester Plan, messbarer Fortschritt. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Im kompaktesten Veedel des Bezirks ist der Weg nie die Ausrede",
        body: "Neubrück ist mit 1,1 km² das kompakteste Veedel im Bezirk Kalk: 8.342 Menschen, kurze Wege, alles beieinander. Ein Studio gibt es hier trotzdem nicht, und die Fahrt nach Kalk oder in die Stadt frisst genau die Zeit, an der Trainingsvorsätze scheitern. Deshalb komme ich zu dir: mit Kurzhanteln, Kettlebells und Widerstandsbändern reicht dein Wohnzimmer für vollwertiges Krafttraining. Von jeder Haustür in Neubrück stehst du außerdem in wenigen Minuten am Rand des Königsforsts.",
      },
      {
        title: "Kraft drinnen, Ausdauer im Königsforst",
        body: "Der Wechsel macht den Plan: Die Krafteinheiten laufen bei dir zu Hause, sauber dokumentiert mit Gewichten und Wiederholungen in der App. Für Ausdauer, Intervalle und lange Grundlagenblöcke nutzen wir die breiten, flachen Wege des Königsforsts, die direkt an Neubrück anschließen. So entsteht ein komplettes Training ohne Mitgliedschaft und ohne Anfahrt, und alle vier bis sechs Wochen zeigen die Zahlen, ob es wirkt. Wenn nicht, ändere ich den Plan.",
      },
      {
        title: "Für wen das in Neubrück passt",
        body: "Die typischen Anfragen aus Neubrück kommen von Berufstätigen, die morgens mit Auto oder Bahn rauspendeln und abends keine zweite Fahrt mehr antreten wollen, und von Eltern, die trainieren möchten, ohne das Haus lange zu verlassen. Das Einstiegsniveau spielt keine Rolle: Am Anfang steht ein Check von Beweglichkeit und Grundkraft, daraus entsteht dein Plan mit zwei Einheiten pro Woche.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Neubrück?",
        a: "Eine 1-zu-1 Stunde kostet 50€, auch bei dir zu Hause. Wer lieber eigenständig mit Plan und wöchentlichem Check-in arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Brauche ich eigene Geräte oder einen Hobbyraum?",
        a: "Nein. Ich bringe das Equipment mit, ein freier Streifen Boden im Wohnzimmer reicht. Schwere Langhantelarbeit bauen wir erst ein, wenn dein Ziel sie wirklich braucht, dann im Studio.",
      },
      {
        q: "Trainieren wir auch im Königsforst?",
        a: "Ja, er beginnt direkt hinter dem Veedel. Dort laufen Intervalle, zügige Läufe und Technikblöcke auf breiten, flachen Wegen. Kraft bleibt drinnen, Ausdauer geht nach draußen, der Plan verbindet beides.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Mit zwei geführten Einheiten pro Woche sind Kraftzuwächse nach vier bis sechs Wochen messbar, sichtbare Veränderung braucht etwa drei Monate. Jede Einheit steht in der App, du siehst den Verlauf schwarz auf weiß.",
      },
    ],
  },

  "vogelsang/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Vogelsang mit Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung: ein Plan, der aus deiner Familienküche kommt, statt neben ihr herzulaufen. Komplett online per Video und App, enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Vogelsang mit Natalie: ein Essen für den ganzen Haushalt statt Extra-Diät, online per Video und App. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Ein Essen für alle statt zwei Küchen",
        body: "Vogelsang ist ein Wohnveedel: 8.336 Menschen, viele Häuser mit Familienküche, gekocht wird abends für alle. Genau daran scheitern die meisten Diäten, denn sie verlangen ein zweites Essen nur für dich. Natalie baut deinen Plan deshalb um den gemeinsamen Topf: dieselben Gerichte für den ganzen Haushalt, bei dir ändern sich Portionsaufbau und Eiweißanteil. Niemand am Tisch isst Diätkost, und du musst nicht doppelt kochen. Das ist der Unterschied zwischen einem Plan, der zwei Wochen hält, und einem, der bleibt.",
      },
      {
        title: "So läuft die Beratung in Vogelsang ab",
        body: "Die Beratung ist komplett online, du fährst also für keinen Termin aus dem Veedel. Erst fotografierst du eine Woche lang dein Essen in der App, ohne etwas zu ändern. Im Videotermin baut Natalie dann mit dir um, in der Reihenfolge mit der größten Wirkung: zuerst Eiweiß in den Hauptmahlzeiten, dann die Abendportionen, zuletzt das, was zwischen den Mahlzeiten läuft. Die Zutaten bleiben die, die du beim normalen Wocheneinkauf sowieso kaufst.",
      },
      {
        title: "Wenn du willst, kommt das Training dazu",
        body: "Ernährung steuert das Gewicht, Training entscheidet, was davon Muskel bleibt. Wer beides will, kombiniert die Beratung mit zwei Krafteinheiten pro Woche: als Online Coaching mit Plan in der App oder als 1-zu-1 Training für 50€ pro Stunde, bei dir zu Hause oder auf den Wiesen des Äußeren Grüngürtels am Rand des Veedels. Erstgespräch und Bestandsaufnahme sind in beiden Fällen kostenlos.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Vogelsang?",
        a: "Die Beratung mit Natalie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichem Check-in. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Muss ich für meine Familie und mich getrennt kochen?",
        a: "Nein, das ist genau der Punkt des Plans: ein Gericht für alle, bei dir angepasst über Portionsgröße und Eiweißanteil. Pläne mit Extra-Essen nur für dich scheitern erfahrungsgemäß am Alltag.",
      },
      {
        q: "Brauche ich spezielle Produkte oder Shakes?",
        a: "Nein. Natalie arbeitet mit normalen Lebensmitteln aus dem Supermarkt. Keine Pulver, keine Ersatzmahlzeiten, keine Abos.",
      },
      {
        q: "Wie schnell nehme ich damit ab?",
        a: "Realistisch sind 0,3 bis 0,5 Kilo pro Woche, je nach Ausgangslage. Natalie legt das Tempo mit dir fest und prüft es in den Check-ins. Schneller geht fast immer auf Kosten von Muskeln, und das rächt sich danach.",
      },
    ],
  },

  "brueck/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Brück mit Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung: für Tage, die mit Pendeln enden und bei denen das erste richtige Essen oft erst abends auf dem Tisch steht. Komplett online per Video und App, enthalten im Online Coaching ab 150€ im Monat, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Brück mit Natalie: Schluss mit dem Essens-Stau am Abend nach dem Pendeltag, online per Video und App. Ab 150€/Monat, Erstgespräch kostenlos.",
    sections: [
      {
        title: "In Brück staut sich das Essen am Abend",
        body: "Brück liegt am Stadtrand, viele der 10.234 Bewohner pendeln mit der Linie 1 oder dem Auto in die Stadt und zurück. Das typische Muster, das Natalie in den Bestandsaufnahmen von hier sieht: morgens fast nichts, mittags irgendwas Schnelles, und zwischen 19 und 23 Uhr kommt dann der ganze Tag auf einmal auf den Teller. Die Tageskalorien sind oft gar nicht zu hoch, sie sind nur falsch verteilt: Der Abend wird übergroß, der Schlaf schlechter, der nächste Morgen startet wieder ohne Hunger. Diesen Kreis bricht die Beratung auf.",
      },
      {
        title: "Der Tag wird umgebaut, nicht der Feierabend verboten",
        body: "Natalie verbietet dir das Abendessen nicht, sie nimmt ihm den Druck. Zuerst bekommt der Tag zwei echte Mahlzeiten mit genug Eiweiß, auch wenn eine davon im Zug oder am Arbeitsplatz stattfindet. Dann wird das Abendessen geplant statt improvisiert: eine richtige, sättigende Mahlzeit, aber nicht mehr die einzige des Tages. Du fotografierst eine Woche lang dein Essen in der App, danach baut Natalie im Videotermin mit dir um. Gekocht wird mit dem, was du in Brück sowieso einkaufst.",
      },
      {
        title: "Bewegung hat Brück vor der Tür, die Steuerung kommt dazu",
        body: "Mit dem Königsforst direkt am Veedel bewegen sich viele Brücker ohnehin: Spaziergänge, Läufe, Rad. Was fehlt, ist selten der Wille, sondern die Steuerung von Kalorien und Eiweiß. Wer zur Beratung auch Training will, kombiniert beides: Online Coaching mit Plan in der App oder 1-zu-1 Einheiten für 50€ pro Stunde, zu Hause oder am Waldrand. Die Beratung selbst bleibt komplett online und passt damit auch in Pendlerwochen.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Brück?",
        a: "Die Beratung mit Natalie ist Teil des Online Coachings ab 150€ im Monat, zusammen mit Trainingsplan und wöchentlichem Check-in. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich esse abends am meisten. Muss das weg?",
        a: "Nein. Das Abendessen bleibt eine vollwertige Mahlzeit. Es hört nur auf, die einzige des Tages zu sein, denn genau das treibt Portionen und Heißhunger nach oben.",
      },
      {
        q: "Wie läuft die Beratung ab, wenn ich pendle?",
        a: "Komplett online: Du dokumentierst dein Essen per Foto in der App, die Termine mit Natalie laufen per Video am Abend oder am Wochenende. Du musst für keinen Termin irgendwo hinfahren.",
      },
      {
        q: "Ich laufe schon regelmäßig im Königsforst. Warum nehme ich nicht ab?",
        a: "Weil Bewegung den Verbrauch nur zum Teil bestimmt. Wenn der Abend die Kalorien des ganzen Tages nachholt, gleicht kein Lauf das aus. Die Bestandsaufnahme zeigt, wo deine Kalorien wirklich stehen, erst dann wird geändert.",
      },
    ],
  },

  "immendorf/abnehmen": {
    answer:
      "Abnehmen in Köln-Immendorf funktioniert ohne Kurs, ohne Studio und ohne Publikum: zwei Krafteinheiten pro Woche bei dir zu Hause, ein Kalorienziel von Natalie und feste Gehrunden am Dorfrand. Eine 1-zu-1 Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Abnehmen in Köln-Immendorf: 1-zu-1 Training bei dir zu Hause statt Abnehmkurs, Kalorienziel von Natalie, Gehrunden am Dorfrand. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Abnehmen, ohne dass das halbe Dorf mitredet",
        body: "In Immendorf leben 2.121 Menschen, und man kennt sich. Genau das hält viele vom Anfangen ab: der Abnehmkurs, die Laufgruppe, das Studio in Rodenkirchen, überall trifft man Bekannte, und plötzlich ist das eigene Gewicht Gesprächsthema an der Kasse. Beim 1-zu-1 bei dir zu Hause gibt es kein Publikum. Niemand sieht deine Startwerte außer dir und mir, und du musst nichts erklären, bevor die ersten Kilos weg sind. Erzählen kannst du es später, wenn man dich darauf anspricht.",
      },
      {
        title: "Das Defizit entsteht am Esstisch, nicht auf dem Feldweg",
        body: "Wer im Dorf wohnt und mit dem Auto pendelt, verbrennt im Alltag wenig nebenbei. Deshalb rechnen wir ehrlich: das Kaloriendefizit kommt zu etwa vier Fünfteln aus dem Essen. Natalie legt mit dir ein Tagesziel fest, das zu deiner Küche passt, ohne das Kochen für die Familie umzuwerfen. Die Bewegung obendrauf planen wir trotzdem fest ein, nur eben als Termin statt als Hoffnung: zügige Runden am Dorfrand, zu Zeiten, die dein Pendeltag hergibt.",
      },
      {
        title: "Zwei Krafteinheiten entscheiden, woraus du die Kilos verlierst",
        body: "Ohne Krafttraining verschwindet im Defizit beides, Fett und Muskel, und am Ende bist du leichter, aber weicher. Zwei Einheiten pro Woche in deinem Wohnzimmer oder Garten reichen, um die Muskulatur zu halten: Kniebeuge, Drücken, Ziehen, mit Kurzhanteln und deinem Körpergewicht, sauber gesteigert. Geräte brauchst du dafür nicht, und eine Anfahrt auch nicht, denn ich komme in den Kölner Süden zu dir raus.",
      },
      {
        title: "Gemessen wird leise: Trend und Umfang statt großer Ansagen",
        body: "Du wiegst dich mehrmals pro Woche, zählt wird aber nur der Wochenschnitt, dazu alle vier Wochen der Bauchumfang. So siehst du schwarz auf weiß, ob der Plan arbeitet, ohne dass eine einzelne Zahl dich aus der Bahn wirft. Wenn sich vier Wochen nichts bewegt, ändern wir Essen oder Training, nicht die Ausrede. Der erste Schritt ist ein kostenloses Erstgespräch über Ziel, Alltag und Startpunkt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Abnehmen mit Personal Trainer in Köln-Immendorf?",
        a: "Eine 1-zu-1 Stunde bei dir zu Hause kostet 50€. Wer vor allem Plan und Kontrolle will, nimmt das Online Coaching ab 150€ im Monat, die Ernährungsarbeit mit Natalie ist dort Teil des Pakets. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Brauche ich ein Fitnessstudio, um abzunehmen?",
        a: "Nein. Das Defizit entsteht über das Essen, und die zwei Krafteinheiten pro Woche funktionieren mit Kurzhanteln und Körpergewicht in deiner Wohnung. In Immendorf gibt es ohnehin kein Studio, und für dieses Ziel fehlt dir dadurch nichts.",
      },
      {
        q: "Wie schnell nehme ich damit ab?",
        a: "Geplant sind 0,5 bis 1% des Körpergewichts pro Woche, je nach Startpunkt. Das klingt unspektakulär, bleibt aber haltbar: schnellere Diäten kosten Muskeln und enden meist im Jojo. Nach vier Wochen siehst du den ersten belastbaren Trend.",
      },
      {
        q: "Muss ich für die Ernährungsberatung irgendwo hinfahren?",
        a: "Nein. Natalie arbeitet vor Ort bei dir oder per Video, die Kontrolle dazwischen läuft per App. Für Pendler aus Immendorf ist Video meist die ehrlichere Lösung, weil kein zusätzlicher Termin mit Anfahrt entsteht.",
      },
    ],
  },

  "urbach/ems-alternative": {
    answer:
      "Die ehrliche EMS-Alternative in Köln-Porz-Urbach ist Krafttraining mit echter Last: Strom reizt den Muskel, aber Knochen, Sehnen und Gelenke passen sich nur an Gewicht an, das du wirklich bewegst. Zwei 1-zu-1 Einheiten pro Woche bei dir zu Hause, 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Urbach: Training mit echter Last statt Stromreiz, denn Knochen und Sehnen reagieren nur auf Gewicht. 1-zu-1 bei dir, 50€/Std, ohne Vertrag.",
    sections: [
      {
        title: "Strom erreicht den Muskel, aber nicht dein Skelett",
        body: "EMS kann einen Muskel zum Anspannen bringen, das ist unbestritten. Aber ein Körper besteht nicht nur aus Muskeln: Knochendichte, Sehnen und Bänder passen sich nur an, wenn echte Last durch sie hindurchgeht, beim Aufstehen aus der Kniebeuge, beim Heben vom Boden, beim Tragen. Genau diese Strukturen entscheiden ab 40 darüber, ob du belastbar alt wirst. Eine Weste, die dich im Stehen anspannen lässt, trainiert sie nicht mit. Gewicht in der Hand tut es.",
      },
      {
        title: "Urbach hat 13.000 Einwohner und keinen Grund für ein Studio-Abo",
        body: "Urbach ist mit 13.179 Einwohnern auf 2,29 km² eines der dichtesten Veedel im Bezirk Porz, gewachsen aus Wohnstraßen, nicht aus Gewerbeflächen. Für EMS fährst du Richtung Porz-Mitte oder weiter und bindest dich an Laufzeiten. Beim 1-zu-1 komme ich zu dir: Kurzhanteln, Langhantel je nach Phase, dein Wohnzimmer oder der Garten reichen. Keine Anfahrt, kein Vertrag, und die Stunde gehört komplett deiner Technik und deiner Steigerung.",
      },
      {
        title: "20 Minuten Reiz gegen 60 Minuten Arbeit",
        body: "Das EMS-Versprechen lautet: voller Effekt in 20 Minuten. Nur steht in diesen 20 Minuten kein einziges Bewegungsmuster, das du danach im Alltag abrufen kannst. In einer Trainingsstunde bei mir lernst du heben, drücken, ziehen und stabil stehen, mit Lasten, die von Woche zu Woche dokumentiert steigen. Nach zwölf Wochen kannst du den Unterschied nicht nur fühlen, sondern nachlesen: jede Einheit steht im Protokoll.",
      },
      {
        title: "Wann EMS trotzdem seinen Platz hat",
        body: "Als ergänzender Reiz für Leute, die bereits schwer trainieren, oder in der Physiotherapie nach Verletzung kann EMS sinnvoll sein. Als Ersatz für Krafttraining ist es das nicht, und als Abo neben einem vollen Familien- und Pendlertag erst recht nicht. Wenn du in Urbach wohnst und überlegst, womit du anfängst: fang mit echter Last an. Das Erstgespräch ist kostenlos, danach entscheidest du.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Urbach?",
        a: "Eine 1-zu-1 Stunde bei dir zu Hause kostet 50€, ohne Vertragsbindung und ohne Anfahrtkosten im Kölner Stadtgebiet. Zum Vergleich: EMS-Studios liegen meist bei 80 bis 100€ im Monat mit Laufzeit. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ist EMS nicht gelenkschonender als Hanteltraining?",
        a: "Schonung ist nicht automatisch gut: Gelenke, Sehnen und Knochen brauchen dosierte Last, um belastbar zu bleiben. Dosiert heißt an dich angepasst, nicht weggelassen. Sauberes Krafttraining mit passender Steigerung ist für gesunde Gelenke kein Risiko, sondern ihre Versicherung.",
      },
      {
        q: "Brauche ich eigene Geräte für das Training zu Hause?",
        a: "Nein. Für den Anfang bringe ich mit, was wir brauchen, meist Kurzhanteln und Widerstandsbänder. Wenn du später aufrüsten willst, beraten wir das anhand deines Plans, nicht anhand eines Katalogs.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse im Vergleich zu EMS?",
        a: "Die ersten Kraftsteigerungen stehen nach zwei bis drei Wochen im Protokoll, sichtbare Veränderungen brauchen je nach Ziel acht bis zwölf Wochen. Der Unterschied: diese Fortschritte gehören dir, weil du die Bewegungen gelernt hast, nicht gemietet.",
      },
    ],
  },

  "muengersdorf/athletiktraining": {
    answer:
      "Athletiktraining in Köln-Müngersdorf findet dort statt, wo Köln seinen Sport gebaut hat: Sprints und Tempoläufe auf den Jahnwiesen am RheinEnergieStadion, lange Intervalle im Äußeren Grüngürtel, Kraft und Sprungkraft im Studio. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Athletiktraining in Köln-Müngersdorf: Sprints auf den Jahnwiesen am Stadion, Intervalle im Äußeren Grüngürtel, Kraft im Studio. 50€/Std, Erstberatung kostenlos.",
    sections: [
      {
        title: "Du wohnst im Sport-Veedel der Stadt, nutze es wie eins",
        body: "Müngersdorf ist das Veedel des RheinEnergieStadions: rund um die Arena liegen die Jahnwiesen, Trainingsplätze, Schwimmbad und der Äußere Grüngürtel, mehr Sportfläche hat kein anderer Kölner Stadtteil direkt vor der Tür. 8.305 Einwohner teilen sich 5,13 km², es ist also auch unter der Woche Platz. Was den meisten hier fehlt, ist nicht die Infrastruktur, sondern die Struktur: ein Plan, der aus dem Gelände messbare Fortschritte macht statt netter Runden.",
      },
      {
        title: "Die Jahnwiesen sind dein Rasenplatz, der Grüngürtel deine Langstrecke",
        body: "Auf dem ebenen, gepflegten Rasen der Jahnwiesen laufen wir Sprints über 30 bis 60 Meter, Richtungswechsel und Beschleunigungen, so wie du sie im Vereinssport brauchst. Für die Ausdauerbasis wechseln wir in den Äußeren Grüngürtel: lange Intervalle auf weichem Boden, bei jedem Wetter. Beide Flächen liegen so nah beieinander, dass eine einzige Einheit beides enthalten kann, ohne Fahrtzeit dazwischen.",
      },
      {
        title: "Schnell wirst du draußen, stark wirst du drinnen",
        body: "Sprintzeiten und Sprunghöhe verbessern sich nur, wenn auch die Kraft dahinter wächst. Deshalb gehört neben den Außeneinheiten eine Krafteinheit in den Plan: Kniebeuge, Hüftstreckung, Rumpf, im Studio oder bei dir zu Hause. Alle vier bis sechs Wochen messe ich Sprintzeit und Sprunghöhe nach. Trainiert wird nach diesen Zahlen, nicht nach Gefühl, und wenn sie sich nicht bewegen, ändere ich den Plan.",
      },
      {
        title: "Für Vereinssportler und Leute, die es wieder wissen wollen",
        body: "Typische Anfragen aus Müngersdorf und Umgebung: Fußballer und Hockeyspieler aus den Vereinen rund um den Sportpark, Läufer, die schneller werden wollen, und Wiedereinsteiger, die nach Jahren Büro wieder sprinten können möchten, ohne sich beim ersten Antritt zu verletzen. Das Einstiegsniveau ist egal, der Technik-Check am Anfang legt fest, wo wir starten. Danach reichen zwei geführte Einheiten pro Woche.",
      },
    ],
    faq: [
      {
        q: "Was kostet Athletiktraining in Köln-Müngersdorf?",
        a: "Eine 1-zu-1 Stunde kostet 50€. Wer mit Plan und wöchentlichen Check-ins arbeiten will, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Wo genau trainieren wir in Müngersdorf?",
        a: "Sprints und Richtungswechsel auf den Jahnwiesen am RheinEnergieStadion, lange Intervalle im Äußeren Grüngürtel, Kraft im Studio oder bei dir zu Hause. Den Mix lege ich nach deinem Ziel und der Saison fest.",
      },
      {
        q: "Ich spiele im Verein. Ersetzt das Athletiktraining mein Mannschaftstraining?",
        a: "Nein, es ergänzt es. Im Verein trainierst du deinen Sport, bei mir die Basis darunter: Schnelligkeit, Sprungkraft, Stabilität, Bremskraft. Eine gezielte Einheit pro Woche neben dem Vereinstraining reicht meist, den Umfang stimmen wir auf deinen Spielplan ab.",
      },
      {
        q: "Bin ich für Athletiktraining fit genug?",
        a: "Der Technik-Check am Anfang beantwortet genau das: Sprint, Sprung, Rumpfstabilität. Danach startet der Plan auf deinem Niveau. Wiedereinsteiger beginnen mit Lauftechnik und Grundkraft, nicht mit maximalen Sprints.",
      },
    ],
  },

  "porz/personal-training": {
    answer:
      "Personal Training in Köln-Porz heißt: du musst für dein Training nicht mehr über den Rhein. Zwei 1-zu-1 Einheiten pro Woche bei dir zu Hause oder am Porzer Rheinufer, geplant um S-Bahn-Pendeln und Familienkalender. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Porz: 1-zu-1 bei dir zu Hause oder am Porzer Rheinufer, ohne Fahrt in die Innenstadt. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Porz hat alles, nur dein Training war bisher woanders",
        body: "Porz-Mitte ist das Zentrum eines Bezirks mit über 110.000 Menschen: Ärzte, Einkauf, S-Bahn, alles da. Trotzdem fahren viele für ihr Training in die Innenstadt oder nach Deutz und verlieren pro Einheit eine Stunde an Brücke und Bahn. Beim 1-zu-1 drehe ich das um: ich komme ins Veedel, trainiert wird in deiner Wohnung, im Hof oder draußen am Wasser. Die Stunde, die du bisher für den Weg gebraucht hast, steckt dann im Training.",
      },
      {
        title: "Das Porzer Rheinufer ist dein Außenstudio",
        body: "Zwischen Fähranleger und Promenade hat Porz einen der ruhigsten Uferabschnitte im rechtsrheinischen Köln, flach und gerade, mit Blick auf die linke Rheinseite. Hier laufen wir Intervalle und Technik, machen Ausfallschritte, Sprünge und Rumpfarbeit an der frischen Luft. Die Kraftarbeit mit Gewichten bleibt drinnen: Kurzhanteln und Langhantel in deinem Wohnzimmer reichen, Geräte musst du dafür nicht kaufen, ich bringe den Anfang mit.",
      },
      {
        title: "Ein Plan, der Pendeln und Schichten übersteht",
        body: "Viele Anfragen aus Porz kommen von Leuten mit unregelmäßigen Tagen: Pendler mit S12 und S19, Schichtarbeit am Flughafen, Homeoffice-Tage dazwischen. Deshalb stehen bei uns zwei feste Einheiten pro Woche, aber die Uhrzeit rotiert mit deinem Kalender, früh morgens, mittags oder nach Feierabend. Jede Einheit steht im Protokoll: Übungen, Gewichte, Steigerung. Alle vier Wochen schauen wir auf die Zahlen und stellen nach.",
      },
      {
        title: "Kosten, Ablauf und der erste Schritt",
        body: "Die 1-zu-1 Stunde kostet 50€, ohne Vertragslaufzeit und ohne Anfahrtkosten im Kölner Stadtgebiet. Wer lieber mit App-Plan und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat, die Ernährungsseite übernimmt dort Natalie. Der Einstieg ist in beiden Fällen gleich: ein kostenloses Erstgespräch über Ziel, Gesundheit und Wochenablauf, danach der Technik-Check und der erste Plan.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Porz?",
        a: "Eine 1-zu-1 Stunde kostet 50€, inklusive Anfahrt nach Porz. Das Online Coaching mit Plan und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo findet das Training in Porz statt?",
        a: "Bei dir zu Hause, im Hof oder draußen am Porzer Rheinufer, je nach Wetter und Phase deines Plans. Ein Studio brauchst du nicht, die nötige Grundausstattung bringe ich am Anfang mit.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Geht das trotzdem?",
        a: "Ja, das ist sogar der häufigste Fall. Wir starten mit einem Technik- und Belastungscheck und bauen von da auf, in deinem Tempo. Die Steigerung steht jede Woche im Protokoll, nicht in einer Vorgabe von der Stange.",
      },
      {
        q: "Wie oft pro Woche sollte ich trainieren?",
        a: "Zwei geführte Einheiten pro Woche sind der Standard, dazu kurze Hausaufgaben von 15 bis 20 Minuten für die Tage dazwischen. Wer nur eine Einheit schafft, kombiniert sie mit einem App-Plan für die zweite.",
      },
      {
        q: "Trainierst du auch in anderen Teilen von Porz?",
        a: "Ja, im ganzen Bezirk: von Ensen und Westhoven über Urbach und Zündorf bis Wahn und Lind. Für Termine außerhalb Kölns klären wir die Anfahrt im kostenlosen Erstgespräch.",
      },
    ],
  },

  "klettenberg/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Klettenberg ist vor allem für eine Gruppe gedacht, über die selten gesprochen wird: Leute, die gerade abgenommen haben und jetzt wieder Substanz aufbauen wollen. Zwei Krafteinheiten pro Woche, leicht erhöhte Kalorien, dokumentierte Steigerung. 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Klettenberg: der Aufbau-Block nach der Diät, zwei Krafteinheiten pro Woche mit Protokoll, Essensplan von Natalie. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Nach der Diät ist vor dem Aufbau",
        body: "Viele Anfragen zum Muskelaufbau beginnen mit demselben Satz: ich habe abgenommen, aber jetzt fühle ich mich schlaff. Das ist kein Scheitern, sondern Physik: in jedem Defizit geht neben Fett auch Muskel verloren, wenn das Krafttraining fehlt. Der Block danach dreht das um. Kalorien leicht über den Verbrauch, Eiweiß hoch, zwei Krafteinheiten pro Woche, und das Gewicht darf dabei langsam steigen, weil es jetzt aus dem richtigen Material besteht.",
      },
      {
        title: "Die Waage lügt in dieser Phase, das Protokoll nicht",
        body: "Wer nach einer Diät wieder zunimmt, erschrickt schnell. Deshalb messen wir im Aufbau anders: entscheidend sind die Lasten im Trainingsprotokoll, der Oberarm- und Beinumfang und alle vier Wochen ein Foto, nicht die Tageszahl auf der Waage. Steigen die Gewichte und bleiben die Bauchmaße stabil, läuft der Aufbau sauber. Genau diese Unterscheidung fehlt beim Training auf eigene Faust, und sie ist der Grund, warum viele nach der Diät wieder aufgeben.",
      },
      {
        title: "Klettenberger Altbau reicht als Trainingsraum",
        body: "Klettenberg ist dicht bebaut, 10.476 Menschen auf 1,8 km², die meisten in Gründerzeitwohnungen ohne Hobbykeller. Für den Aufbau reicht das: Kniebeuge, Rumänisches Kreuzheben, Drücken und Rudern funktionieren mit Kurzhanteln auf wenigen Quadratmetern, und sobald die Lasten wachsen, wechseln wir für die schweren Grundübungen ins Studio. Der Klettenbergpark um die Ecke übernimmt die Pausentage: Spaziergänge halten den Kopf im Projekt, ohne die Erholung zu stören.",
      },
      {
        title: "Essen für den Aufbau, ohne die Diät-Disziplin zu verlieren",
        body: "Der häufigste Fehler nach der Diät ist das Entweder-oder: entweder weiter hungern oder zurück zu alten Mengen. Natalie legt mit dir die Mitte fest, meist 200 bis 300 Kilokalorien über dem Verbrauch und 1,6 bis 2 Gramm Eiweiß pro Kilo Körpergewicht, verteilt auf Mahlzeiten, die in deinen Tag passen. So wächst Muskel statt Fettpolster, und die Gewohnheiten aus der Diätphase bleiben dein Fundament statt dein Feind.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Klettenberg?",
        a: "Eine 1-zu-1 Stunde kostet 50€, bei dir zu Hause oder im Studio. Das Online Coaching mit Trainingsplan, Ernährung und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe gerade abgenommen. Nehme ich im Aufbau wieder zu?",
        a: "Leicht, und das ist gewollt: ohne kleinen Kalorienüberschuss wächst kaum Muskel. Wir steuern das eng, mit Umfangsmessungen und Protokoll statt Tageswiegen, damit der Zuwachs aus Muskel besteht und nicht aus dem alten Polster.",
      },
      {
        q: "Wie lange dauert es, bis man Muskelaufbau sieht?",
        a: "Kraftwerte steigen ab der zweiten, dritten Woche, sichtbare Veränderungen brauchen acht bis zwölf Wochen konsequenter Arbeit. Ein ehrlicher Aufbau-Block dauert vier bis sechs Monate, und jede Einheit davon steht im Protokoll.",
      },
      {
        q: "Geht Muskelaufbau auch ohne Fitnessstudio?",
        a: "Die ersten Monate ja: Kurzhanteln und Körpergewicht in deiner Wohnung reichen, solange die Steigerung geplant ist. Wenn die Lasten später zu groß für zu Hause werden, nehmen wir fürs schwere Grundprogramm das Studio dazu.",
      },
    ],
  },

  "zuendorf/personal-training": {
    answer:
      "Personal Training in Köln-Zündorf nutzt, was andere nur am Sonntag besuchen: die Groov als zweiten Trainingsort, dein Zuhause für die Kraftarbeit, ein Coach, der ans Ende der Linie 7 rausfährt. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Zündorf: Kraft bei dir zu Hause, Ausdauer und Technik an der Groov am Rheinufer. 1-zu-1 für 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Die Groov ist sonntags Ausflugsziel und dienstags dein Trainingsplatz",
        body: "Halb Köln kennt Zündorf von der Groov: die Freizeitinsel mit Weiher und Rheinufer, Minigolf und Biergarten. Am Wochenende ist sie voll, unter der Woche gehört sie den Zündorfern. Genau dann trainieren wir dort: flache Runden um den Weiher für Intervalle und Gehpausen, die Wiesen für Sprünge, Ausfallschritte und Rumpfarbeit, der Rheinuferweg für alles, was länger ist. Du wohnst neben einer der schönsten Trainingsflächen im Kölner Südosten, sie war bisher nur als Kulisse eingeplant.",
      },
      {
        title: "Am Ende der Linie 7 kommt das Training zu dir",
        body: "Zündorf liegt weit draußen, 11.699 Einwohner auf 8,12 km², mit altem Ortskern und Neubaugebieten, aber ohne Fitnessstudio-Dichte der Innenstadt. Wer hierhin gezogen ist, hat sich für Platz und gegen tägliche Extra-Fahrten entschieden, und das Training sollte das respektieren: ich komme zu dir raus, die Kraftarbeit passiert mit Kurzhanteln und Langhantel in deinem Wohnzimmer, Hof oder Garten. Den Anfang an Ausrüstung bringe ich mit.",
      },
      {
        title: "Zwei feste Einheiten, ein Protokoll, alle vier Wochen der Beweis",
        body: "Der Plan ist unspektakulär und funktioniert genau deshalb: zwei geführte Einheiten pro Woche, eine mit Schwerpunkt Kraft, eine draußen an der Groov oder am Rheinufer, dazu 15 Minuten Hausaufgabe an zwei weiteren Tagen. Jede Übung, jedes Gewicht und jede Steigerung steht im Protokoll. Alle vier Wochen vergleichen wir die Zahlen mit deinem Ziel, ob das Abnehmen ist, Kraft oder einfach wieder Belastbarkeit für Job und Familie.",
      },
      {
        title: "Für wen das in Zündorf gedacht ist",
        body: "Die typischen Anfragen aus dem Kölner Südosten: Eltern, deren Sportprogramm beim ersten Kind geendet hat, Pendler, die abends nicht noch einmal losfahren wollen, und Leute ab 40, die merken, dass von allein nichts mehr besser wird. Das Startniveau ist egal, der Technik-Check in der ersten Stunde legt fest, womit wir anfangen. Der Schritt davor ist ein kostenloses Erstgespräch über Ziel, Gesundheit und deinen Wochenablauf.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Personal Trainer in Köln-Zündorf?",
        a: "Eine 1-zu-1 Stunde kostet 50€, inklusive Anfahrt nach Zündorf. Alternativ gibt es das Online Coaching mit App-Plan und wöchentlichen Check-ins ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Wo trainieren wir in Zündorf?",
        a: "Kraft bei dir zu Hause, Ausdauer und Technik an der Groov oder auf dem Rheinuferweg. Unter der Woche sind beide Flächen ruhig, und den Mix lege ich nach deinem Ziel und dem Wetter fest.",
      },
      {
        q: "Brauche ich eigene Hanteln oder Geräte?",
        a: "Zum Start nicht, ich bringe Kurzhanteln und Bänder mit. Ob sich später eigene Ausrüstung lohnt, entscheidet dein Plan: viele bleiben dauerhaft bei einer kleinen Grundausstattung, die in einen Schrank passt.",
      },
      {
        q: "Funktioniert das auch mit unregelmäßigen Arbeitszeiten?",
        a: "Ja. Die zwei Termine pro Woche stehen fest, aber ihre Uhrzeit rotiert mit deinem Kalender, früh, mittags oder abends. Fällt ein Termin aus, wird er verschoben statt gestrichen, das ist der Sinn des festen Rhythmus.",
      },
    ],
  },

  "langel/ems-alternative": {
    answer:
      "EMS verspricht dir gesparte Zeit, aber von Köln-Langel aus gibt es diese Rechnung nicht: Im Dorf selbst steht kein EMS-Studio, jeder Termin beginnt mit Anfahrt. Meine Alternative kommt zu dir: zwei geführte Krafteinheiten pro Woche mit echter Last und Protokoll, 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Langel: geführtes Krafttraining bei dir zu Hause statt Anfahrt zur Stromweste. Echte Last, Protokoll, kein Jahresvertrag. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Zeitargument kippt am südlichsten Zipfel von Köln",
        body: "Langel ist mit 3.588 Einwohnern eines der kleinsten Veedel der Stadt und liegt ganz im Süden des rechten Rheinufers, an der Fähre nach Hitdorf. Das Verkaufsargument von EMS lautet überall gleich: 20 Minuten pro Woche reichen. Nur stehen diese 20 Minuten in einem Studio, das von Langel aus erst erreicht werden muss. Ich drehe die Logik um und bringe das Training zu dir: Hanteln, Bank und Plan stehen in deinem Wohnzimmer oder deinem Garten, die Anfahrt übernehme ich.",
      },
      {
        title: "Was die Stromweste nicht kann",
        body: "EMS reizt Muskeln mit Impulsen, während du statische Positionen hältst. Was dabei fehlt, ist Bewegung unter Last: Kniebeuge, Hüftstreckung, Druck und Zug über den vollen Weg. Genau diese Muster brauchst du im Alltag, beim Heben, Tragen, Treppensteigen. Deshalb arbeite ich mit Gewichten, die sich von Woche zu Woche steigern lassen, und einem Protokoll, in dem du die Steigerung schwarz auf weiß siehst. Ein Kribbeln lässt sich nicht protokollieren.",
      },
      {
        title: "Der Rheindamm ist die zweite Hälfte des Programms",
        body: "Zwischen den Krafteinheiten nutzt du, was Langel ohnehin hat: die flachen, ruhigen Dammwege am Rheinufer. Zügiges Gehen oder lockeres Laufen dort ist die Grundlagenausdauer, die keine Weste ersetzt, und sie kostet weder Vertrag noch Termin. Ich gebe dir dafür klare Vorgaben mit, Dauer und Tempo, damit die Tage zwischen den Einheiten zählen statt zu verpuffen.",
      },
      {
        title: "Ohne Jahresvertrag, mit messbarem Stand",
        body: "Du zahlst pro Stunde, 50€, ohne Laufzeit. Alle vier bis sechs Wochen messen wir nach: Gewichte, Wiederholungen, bei Bedarf Umfänge. Wenn die Zahlen stehen bleiben, ändere ich den Plan. Das Erstgespräch ist kostenlos, und wenn EMS für deinen Fall tatsächlich die bessere Wahl wäre, sage ich dir das darin offen.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Langel?",
        a: "Eine geführte 1-zu-1 Stunde kostet 50€, ohne Jahresvertrag und ohne Anmeldegebühr. Zum Vergleich: EMS-Abos liegen meist bei 80 bis 130€ im Monat bei 12 Monaten Laufzeit, plus deine Fahrzeit zu jedem Termin.",
      },
      {
        q: "Brauche ich Geräte zu Hause?",
        a: "Nein. Ich bringe Kurzhanteln, Bänder und bei Bedarf eine Klappbank mit. Was du brauchst, sind etwa vier Quadratmeter freie Fläche, in der Wohnung, der Garage oder im Garten.",
      },
      {
        q: "Ist Krafttraining nicht anstrengender als EMS?",
        a: "Es fühlt sich anders an: Statt 20 Minuten Dauerreiz arbeitest du in Sätzen mit Pausen. Die Belastung steuere ich über Gewicht und Tempo, vom Einstieg nach Jahren Pause bis zum ambitionierten Niveau. Anstrengung ist planbar, genau das ist der Punkt.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Die ersten vier bis sechs Wochen bringen vor allem Technik und spürbar mehr Kraft, sichtbare Veränderung folgt bei zwei Einheiten pro Woche meist ab Woche acht. Im Protokoll siehst du den Fortschritt aber ab der ersten Woche.",
      },
    ],
  },

  "lindweiler/personal-training": {
    answer:
      "Personal Training in Köln-Lindweiler heißt: Das Training kommt zu dir, nicht umgekehrt. Auf 1,16 Quadratkilometern gibt es kein Studio, also trainieren wir 1-zu-1 bei dir zu Hause oder draußen am Siedlungsrand, mit mitgebrachtem Material. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Training in Köln-Lindweiler: 1-zu-1 bei dir zu Hause, Material bringe ich mit. Fester Termin, messbarer Fortschritt. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Lindweiler hat keine Trainingsinfrastruktur, und das ist lösbar",
        body: "Mit 3.549 Einwohnern auf 1,16 Quadratkilometern ist Lindweiler eine der kleinsten Ecken im Bezirk Chorweiler. Wer hier trainieren will, fährt bisher raus, nach Longerich, Pesch oder weiter. Genau dieser Weg ist der häufigste Grund, warum Vorsätze nach drei Wochen enden. Ich nehme ihn aus der Gleichung: Kurzhanteln, Bänder und Bank kommen mit mir, dein Wohnzimmer oder der Hof wird zur Trainingsfläche, und der Termin steht fest in deinem Kalender.",
      },
      {
        title: "So sieht eine Woche mit mir aus",
        body: "Zwei Einheiten pro Woche, jede 60 Minuten: Krafttraining mit Grundübungen, aufgebaut nach einem Plan, der zu deinem Startpunkt passt, nicht zu einem Idealbild. Dazwischen bekommst du eine kurze Aufgabe für einen dritten Tag, meist 20 Minuten Gehen oder Mobility. Alle vier bis sechs Wochen messen wir nach, Gewichte, Wiederholungen, auf Wunsch Umfänge, und du siehst, ob sich etwas bewegt. Wenn nicht, ändere ich den Plan, nicht du deine Motivation.",
      },
      {
        title: "Für wen das in Lindweiler gedacht ist",
        body: "Die typischen Anfragen aus dem Kölner Norden kommen von Leuten, die nach Jahren wieder anfangen wollen, von Eltern, deren Zeitfenster zwischen Arbeit und Familie liegt, und von Menschen über 50, die Kraft für den Alltag zurückwollen. Dafür braucht es kein Studio, sondern einen Plan und jemanden, der die Technik korrigiert, bevor sich Fehler einschleifen. Termine lege ich auch früh morgens oder am frühen Abend, wenn der Tag es verlangt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Lindweiler?",
        a: "Eine 1-zu-1 Stunde kostet 50€, ohne Vertragslaufzeit. Wer lieber eigenständig mit Plan und wöchentlichen Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist in beiden Fällen kostenlos.",
      },
      {
        q: "Reicht meine Wohnung zum Trainieren?",
        a: "Ja. Vier Quadratmeter freie Fläche genügen, das Material bringe ich mit. In der warmen Jahreszeit verlegen wir Einheiten nach draußen an den Siedlungsrand, Richtung Felder zwischen Lindweiler und Pesch.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein, das ist der Normalfall. Wir starten mit einem Technik- und Beweglichkeits-Check und bauen von dort auf. Die ersten Wochen sind bewusst leichter, als du erwartest: Erst kommt das Muster, dann das Gewicht.",
      },
      {
        q: "Wie schnell merke ich etwas?",
        a: "Mehr Kraft und ein stabileres Alltagsgefühl kommen meist in den ersten vier Wochen, sichtbare Veränderung bei zwei Einheiten pro Woche ab etwa Woche acht. Dein Protokoll zeigt den Fortschritt ab der ersten Einheit.",
      },
    ],
  },

  "hoehenhaus/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Höhenhaus mit Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ihr Ansatz hier: Selbst gekocht heißt nicht automatisch kaloriengerecht. Deine Gerichte bleiben, Natalie stellt Mengen, Eiweiß und Reihenfolge richtig. Komplett online, enthalten im Online Coaching ab 150€ im Monat, Erstgespräch kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Höhenhaus mit Natalie: selbst gekocht, trotzdem kein Fortschritt? Mengen und Eiweiß statt neuer Rezepte. Online, im Coaching ab 150€/Monat.",
    sections: [
      {
        title: "Das Höhenhaus-Problem: gut gekocht, trotzdem keine Veränderung",
        body: "In der Gartensiedlung wird gekocht, oft täglich und besser als in mancher Innenstadtküche. Trotzdem bewegt sich die Waage nicht, und genau das frustriert mehr als jede Fast-Food-Gewohnheit, denn es fühlt sich an, als wäre schon alles richtig. Natalies Erfahrung: Das Problem sind fast nie die Gerichte, sondern Portionsgrößen, Öl und Butter beim Anbraten, das Brot am Abend und die Kleinigkeiten zwischendurch. Deshalb beginnt sie nicht mit neuen Rezepten, sondern mit einer ehrlichen Bestandsaufnahme von dem, was du ohnehin kochst.",
      },
      {
        title: "Mengen statt Verbote, Eiweiß zuerst",
        body: "Aus der Bestandsaufnahme entsteht dein Kalorien- und Eiweißziel. Die Gerichte deiner Woche bleiben auf dem Tisch, angepasst wird die Zusammensetzung: mehr Eiweiß auf den Teller, Beilagen in Mengen, die zu deinem Ziel passen, und klare Regeln für das Abendbrot, das in Höhenhaus häufiger über Erfolg und Misserfolg entscheidet als das Mittagessen. Verbotslisten gibt es nicht, weil sie den Familientisch spalten und nach drei Wochen kippen.",
      },
      {
        title: "So läuft die Beratung ab",
        body: "Alles findet online statt, per Video-Termin und App: Du fotografierst ein paar Tage dein Essen, Natalie wertet aus, dann steht der Plan. Danach gibt es wöchentliche Check-ins, in denen Gewicht, Energie und Alltag zusammen betrachtet werden. Die Ernährungsberatung ist Teil des Online Coachings ab 150€ im Monat, auf Wunsch kombiniert mit Krafttraining bei dir zu Hause in Höhenhaus, denn Muskeln sind der Teil der Rechnung, den keine Diät ersetzt.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung für Köln-Höhenhaus?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos und klärt, ob der Ansatz zu dir passt.",
      },
      {
        q: "Muss ich neue Rezepte lernen?",
        a: "Nein, das ist der Kern von Natalies Ansatz: Deine Gerichte bleiben. Angepasst werden Mengen, Eiweißanteil und die Verteilung über den Tag. Neue Rezepte kommen nur dazu, wenn du sie dir wünschst.",
      },
      {
        q: "Funktioniert das für die ganze Familie?",
        a: "Ja. Es wird einmal gekocht, nicht doppelt: Deine Portion unterscheidet sich in Menge und Beilage, nicht im Gericht. So bleibt der Familientisch gemeinsam, und dein Ziel läuft trotzdem mit.",
      },
      {
        q: "Zählt Natalie jede Kalorie?",
        a: "Nur am Anfang, um ein realistisches Bild zu bekommen. Danach arbeitet sie mit Portionsregeln und festen Ankern, die ohne tägliches Rechnen funktionieren. Wer gern trackt, kann das tun, Pflicht ist es nicht.",
      },
    ],
  },

  "ehrenfeld/muskelaufbau": {
    answer:
      "Muskelaufbau in Köln-Ehrenfeld scheitert selten am Angebot, eher am Überangebot: Wer ständig Kurs, Studio und Methode wechselt, gibt dem Muskel keinen Grund zu wachsen. Ich setze dagegen auf Wiederholung: dieselben Grundübungen, steigende Last, Protokoll. 1-zu-1 für 50€ pro Stunde, Erstgespräch kostenlos.",
    metaDescription:
      "Muskelaufbau in Köln-Ehrenfeld: ein fester Plan statt ständig neuer Workouts. Grundübungen, steigende Last, Protokoll, 1-zu-1. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Warum ausgerechnet Ehrenfeld beim Muskelaufbau stolpert",
        body: "Kaum ein Veedel hat so viel Auswahl: Studios, Kurse, immer neue Trainingskonzepte zwischen Venloer Straße und Grünem Weg, auf 3,71 Quadratkilometern mit über 38.000 Menschen. Für die Fitness ist das großartig, für Muskelaufbau ist es eine Falle. Muskeln wachsen durch denselben Reiz, der über Monate planvoll größer wird, nicht durch jede Woche ein neues Workout. Wer ständig wechselt, startet immer wieder bei null und nennt es Abwechslung.",
      },
      {
        title: "Mein Programm ist absichtlich unspektakulär",
        body: "Wir wählen fünf bis sechs Grundübungen, die zu deinem Körper und deiner Ausgangslage passen: Varianten von Kniebeuge, Hüftstreckung, Drücken und Ziehen. Diese Übungen bleiben, nur Gewicht, Wiederholungen und Tempo ändern sich, dokumentiert in deinem Protokoll. Nach acht Wochen vergleichst du nicht Gefühle, sondern Zahlen. Trainiert wird 1-zu-1 bei dir zu Hause, draußen am Inneren Grüngürtel oder in deinem Studio, wenn du schon eine Mitgliedschaft hast.",
      },
      {
        title: "Essen entscheidet die zweite Hälfte",
        body: "Ohne Baumaterial kein Aufbau: Du bekommst ein Eiweißziel pro Tag, abgestimmt auf dein Gewicht, und einen leichten Kalorienüberschuss, der Muskeln ernährt, ohne dich aufzuschwemmen. Wenn du es genauer willst, steigt Natalie ein, unsere Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung, und baut das Ziel in deinen Ehrenfelder Alltag ein, auch wenn der selten um 18 Uhr Feierabend macht.",
      },
      {
        title: "Messbar in Wochen, sichtbar in Monaten",
        body: "Die ehrliche Zeitrechnung: Kraft steigt ab den ersten Wochen, sichtbare Veränderung braucht bei zwei Einheiten pro Woche etwa acht bis zwölf Wochen, je nach Ausgangspunkt. Alle vier bis sechs Wochen messen wir nach. Stagniert das Protokoll, ändere ich Volumen oder Übungsauswahl, das ist mein Job, nicht deiner.",
      },
    ],
    faq: [
      {
        q: "Was kostet Muskelaufbau-Training in Köln-Ehrenfeld?",
        a: "Eine geführte 1-zu-1 Stunde kostet 50€, ohne Laufzeit. Wer selbstständig trainiert und nur Plan plus wöchentliche Kontrolle will, nimmt das Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich habe schon ein Studio-Abo in Ehrenfeld. Brauche ich dich trotzdem?",
        a: "Gerade dann: Das Abo liefert Geräte, aber keinen Plan und keine Technikkorrektur. Ich kann die Einheiten in deinem Studio führen oder dir einen Plan dafür schreiben, den wir regelmäßig gemeinsam prüfen.",
      },
      {
        q: "Geht Muskelaufbau auch ohne Studio?",
        a: "Ja. Mit Kurzhanteln, Band und Bank, die ich mitbringe, sind die ersten sechs bis neun Monate problemlos abgedeckt. Danach entscheidet dein Protokoll, ob schwereres Gerät nötig ist.",
      },
      {
        q: "Wie oft muss ich pro Woche trainieren?",
        a: "Zwei konsequente Einheiten reichen für soliden Aufbau, drei beschleunigen ihn. Wichtiger als die Anzahl ist, dass dieselben Übungen regelmäßig und mit steigender Last wiederkommen.",
      },
    ],
  },

  "blumenberg/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Blumenberg mit Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ihr Ansatz hier: Die Woche wird aus dem Vorrat geplant, nicht aus dem Spontankauf, damit kein Abend am fehlenden Einkauf scheitert. Komplett online, enthalten im Online Coaching ab 150€ im Monat, Erstgespräch kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Blumenberg mit Natalie: Wochenplan aus dem Vorrat statt Spontankauf. Kalorien- und Eiweißziel, online per Video. Im Coaching ab 150€/Monat.",
    sections: [
      {
        title: "Warum in Blumenberg der Vorrat gewinnt",
        body: "Blumenberg liegt am nördlichen Stadtrand, 5.147 Einwohner zwischen Feldern Richtung Worringen und Roggendorf/Thenhoven. Wer hier nach Feierabend merkt, dass nichts im Haus ist, bestellt oder improvisiert, und genau an diesen Abenden kippen die meisten Ernährungsvorsätze. Natalie plant deshalb andersherum: Deine Woche wird aus einer festen Vorratsbasis gebaut, tiefgekühltes Gemüse, Hülsenfrüchte, Eier, Quark, Reis und das, was du ohnehin magst. Der Wocheneinkauf füllt die Basis auf, der Rest der Woche hängt an keinem Laden mehr.",
      },
      {
        title: "Vom Vorrat zum Ziel",
        body: "Aus der Basis entstehen Gerichte, die in 20 Minuten stehen und zu deinem Kalorien- und Eiweißziel passen, das Natalie am Anfang berechnet. Es gibt keine Verbotsliste und kein Superfood-Regal: gutes Eiweiß kommt aus dem normalen Supermarkt. Angepasst werden Mengen und Zusammenstellung, nicht dein Geschmack. Wenn Kinder mitessen, wird einmal gekocht, deine Portion unterscheidet sich in Menge und Beilage.",
      },
      {
        title: "Online-Beratung, die zum Stadtrand passt",
        body: "Die Beratung läuft komplett per Video und App, ohne Fahrt in eine Praxis: Bestandsaufnahme mit Fotos deiner echten Woche, dann Plan, dann wöchentliche Check-ins mit Blick auf Gewicht, Energie und Alltag. Enthalten ist das im Online Coaching ab 150€ im Monat. Wer zusätzlich Kraft aufbauen will, kombiniert es mit Training bei sich zu Hause in Blumenberg, die Geh-Runden über die Felder gibt es vor der Haustür gratis dazu.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung für Köln-Blumenberg?",
        a: "Sie ist im Online Coaching ab 150€ im Monat enthalten, zusammen mit Trainingsplan und wöchentlichen Check-ins. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Brauche ich teure Spezialprodukte?",
        a: "Nein. Die Vorratsbasis besteht aus normalen Supermarkt-Lebensmitteln: TK-Gemüse, Hülsenfrüchte, Eier, Quark, Haferflocken, Reis. Eiweißpulver ist eine Option für volle Tage, nie eine Pflicht.",
      },
      {
        q: "Was passiert, wenn eine Woche komplett anders läuft als geplant?",
        a: "Dafür ist der Vorrat da: Der Plan kennt für jede Mahlzeit eine schnelle Ausweichvariante aus der Basis. Im wöchentlichen Check-in schaut Natalie, woran es lag, und passt die nächste Woche an, statt dich von vorn anfangen zu lassen.",
      },
      {
        q: "Hilft die Beratung auch beim Abnehmen?",
        a: "Ja, über ein Kalorienziel mit Sättigung statt Hunger: Eiweiß und Volumen zuerst auf den Teller. In Kombination mit zwei Krafteinheiten pro Woche bleibt dabei die Muskulatur erhalten, das unterscheidet den Ansatz von Crash-Diäten.",
      },
    ],
  },

  "suelz/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Sülz steht direkt vor deiner Tür: echtes Krafttraining mit steigender Last, kombiniert mit Beethovenpark und Decksteiner Weiher statt 20 Minuten Stromweste im fensterlosen Raum. Zwei geführte 1-zu-1 Einheiten pro Woche, 50€ pro Stunde, kein Jahresvertrag, Erstgespräch kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Sülz: Krafttraining mit echter Last plus Grüngürtel vor der Tür statt Stromweste. Kein Jahresvertrag. 50€/Std, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Sülz hat das, was kein EMS-Studio verkaufen kann",
        body: "Das EMS-Versprechen richtet sich an Menschen ohne Zeit und ohne Trainingsumgebung. In Sülz stimmt die zweite Hälfte nicht: Der Äußere Grüngürtel beginnt am Veedelsrand, der Beethovenpark und die flache Runde am Decksteiner Weiher liegen für über 36.000 Sülzer in Geh-Entfernung. Wer hier für 20 Minuten Stromreiz in einen Raum ohne Tageslicht geht, tauscht die beste Trainingsfläche der Stadt gegen eine Weste. Ich baue dein Training andersherum: Kraft mit echter Last, dazu der Grüngürtel als Ausdauer- und Ausgleichsfläche.",
      },
      {
        title: "Echte Last schlägt Impuls, und sie ist messbar",
        body: "EMS reizt den Muskel, während du statisch hältst. Krafttraining bewegt Gewicht über den vollen Weg: Kniebeuge, Hüftstreckung, Drücken, Ziehen. Nur so lernen Technik und Nervensystem mit, nur so lässt sich die Belastung Woche für Woche steigern und protokollieren. Nach drei Monaten bei mir kannst du deine Entwicklung in Kilo und Wiederholungen nachlesen. Nach drei Monaten EMS hast du Termine absolviert.",
      },
      {
        title: "So trainieren wir in Sülz",
        body: "Zwei 1-zu-1 Einheiten pro Woche, bei dir zu Hause mit mitgebrachtem Material, in deinem Studio oder bei passendem Wetter im Beethovenpark. Dazwischen bekommst du eine Vorgabe für die Runde am Decksteiner Weiher, zügiges Gehen oder lockeres Laufen mit klarer Dauer. Alle vier bis sechs Wochen wird nachgemessen. Du zahlst 50€ pro Stunde, ohne Laufzeit, und kannst jederzeit aufhören, auch das unterscheidet das Modell vom EMS-Jahresvertrag.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Sülz?",
        a: "50€ pro geführter 1-zu-1 Stunde, ohne Jahresvertrag und ohne Anmeldegebühr. EMS-Studios liegen meist bei 80 bis 130€ im Monat mit 12 Monaten Bindung. Das Erstgespräch bei mir ist kostenlos.",
      },
      {
        q: "Ich habe wirklich wenig Zeit. Reichen zwei Stunden pro Woche?",
        a: "Ja, wenn sie geplant sind: zwei Krafteinheiten mit Protokoll plus eine Geh- oder Laufvorgabe im Grüngürtel decken Kraft und Ausdauer ab. Das ist mehr Wirkung pro Woche als 20 Minuten Stromreiz, bei ehrlicher Rechnung inklusive Anfahrt oft kaum Mehraufwand.",
      },
      {
        q: "Ist EMS nicht gelenkschonender?",
        a: "Gelenke, Sehnen und Knochen werden belastbarer, wenn sie kontrolliert steigende Last erfahren, genau das leistet geführtes Krafttraining mit sauberer Technik. Die Stromweste spart die Bewegung ein, und damit auch die Anpassung, die du im Alltag brauchst.",
      },
      {
        q: "Kann ich bei dir auch im Studio trainieren, statt zu Hause?",
        a: "Ja. Wenn du bereits Mitglied in einem Studio in Sülz oder Umgebung bist, führe ich die Einheiten dort. Zu Hause reichen sonst vier Quadratmeter, das Material bringe ich mit.",
      },
    ],
  },
  "neustadt-sued/online-coaching": {
    answer:
      "Online Coaching für Köln-Neustadt-Süd: Trainingsplan per App, wöchentliche Video-Check-ins und Ernährungssteuerung, ab 150€ im Monat. Der Plan ist für Tage gebaut, an denen der Abend im Veedel schon vergeben ist: du trainierst morgens oder mittags, kurz und geführt, statt auf den freien Abend zu warten.",
    metaDescription:
      "Online Coaching für Köln-Neustadt-Süd: Plan per App für volle Südstadt-Tage, Einheiten vor der Arbeit oder mittags, Volksgarten als Lauf-Anker. Ab 150€/Monat.",
    sections: [
      {
        title: "In der Südstadt ist der Abend das Problem",
        body: "Neustadt-Süd ist das Veedel der vollen Kalender: Kneipen, Konzerte, Verabredungen rund um Chlodwigplatz und Zülpicher Straße. Wer sein Training auf „heute Abend“ legt, verliert es genau an diesen Abenden. Deshalb drehe ich den Plan um: deine Einheiten liegen vor der Arbeit oder in der Mittagspause, dauern 30 bis 45 Minuten und stehen als feste Blöcke in der App. Der Abend bleibt frei, das Training findet trotzdem statt.",
      },
      {
        title: "37.803 Menschen auf 2,87 km², also planen wir mit wenig Platz",
        body: "Kaum ein Kölner Stadtteil ist so dicht besiedelt wie Neustadt-Süd, und die Wohnungen sind entsprechend geschnitten. Dein Plan braucht deshalb keine Hantelbank im Wohnzimmer: jede Krafteinheit kommt in einer Fassung für zwei Quadratmeter Bodenfläche, mit Körpergewicht, Kurzhanteln oder Band. Wenn du in einem Studio angemeldet bist, schreibe ich den Plan stattdessen auf dessen Geräte. Beides geht, die App führt dich durch jede Wiederholung.",
      },
      {
        title: "Der Volksgarten ist dein fester Ausdauer-Anker",
        body: "Für die Cardio-Blöcke brauchst du keine Anfahrt: der Volksgarten liegt mitten im Veedel, der Innere Grüngürtel schließt direkt an. Eine Runde dort steht einmal pro Woche fest im Plan, mit Vorgabe für Tempo oder Dauer, die ich nach deinem Stand anpasse. Du läufst vor der Tür, die Auswertung passiert in der App, und beim wöchentlichen Video-Check-in besprechen wir, ob die Belastung rauf oder runter geht.",
      },
      {
        title: "Check-in jede Woche, Angelo bleibt erreichbar",
        body: "Einmal pro Woche sehen wir uns per Video: Rückblick auf die Trainingswoche, Blick auf dein Protokoll, nächste Schritte. Zwischendurch schickst du Technik-Videos direkt aus der App und bekommst Korrekturen, bevor sich Fehler einschleifen. Die Ernährungssteuerung läuft parallel mit: Kalorien- und Eiweißziel, abgestimmt darauf, dass in der Südstadt auch mal gegessen und gefeiert wird. Wenn du später lieber 1-zu-1 trainieren willst, geht das jederzeit, ich bin in Köln.",
      },
    ],
    faq: [
      {
        q: "Was kostet Online Coaching in Köln-Neustadt-Süd?",
        a: "Ab 150€ im Monat: Trainingsplan per App, wöchentliche Video-Check-ins, Technik-Korrektur per Video und Ernährungssteuerung. Das Erstgespräch ist kostenlos und unverbindlich.",
      },
      {
        q: "Ich habe weder Geräte noch Platz in der Wohnung. Geht das trotzdem?",
        a: "Ja. Jede Einheit gibt es in einer Fassung für kleine Wohnungen: Körpergewicht, Band oder ein Paar Kurzhanteln reichen. Für die Ausdauer nutzt du Volksgarten und Grüngürtel vor der Tür.",
      },
      {
        q: "Warum Online Coaching statt Studio-Mitgliedschaft in der Innenstadt?",
        a: "Das eine schließt das andere nicht aus. Online Coaching liefert das, was der Studiovertrag nicht enthält: einen Plan, der auf deine Woche geschrieben ist, wöchentliche Kontrolle und jemanden, der nachfragt, wenn du aussetzt. Trainieren kannst du damit im Studio, zu Hause oder im Park.",
      },
      {
        q: "Was passiert, wenn eine Woche komplett voll ist?",
        a: "Dann wird der Plan angepasst statt ausgesetzt: kürzere Einheiten, andere Tage, notfalls eine Erhaltungswoche. Das klären wir im Check-in. Ein Plan, der nur in perfekten Wochen funktioniert, ist keiner.",
      },
    ],
  },

  "longerich/ernaehrungsberatung": {
    answer:
      "Ernährungsberatung für Köln-Longerich mit Natalie, Ernährungsberaterin mit Schwerpunkt Sport- und Fitnessernährung. Ihr Ansatz hier: ein Topf, zwei Ziele. Die Familie isst weiter ein gemeinsames Essen, nur deine Portion wird auf dein Ziel gerechnet. Die Beratung läuft online, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Ernährungsberatung in Köln-Longerich: ein Familienessen, deine Portion aufs Ziel gerechnet. Natalie plant Mengen statt Extra-Gerichte. Online, Erstgespräch kostenlos.",
    sections: [
      {
        title: "Das Longerich-Problem: niemand kocht zweimal",
        body: "Longerich ist ein Familien-Veedel: Reihenhäuser, Gärten, gemeinsames Abendessen. Genau daran scheitern die meisten Ernährungspläne, denn sie verlangen ein zweites Gericht nur für dich. Das hält niemand durch, der abends für drei oder vier Leute kocht. Natalie plant deshalb andersherum: das Familienessen bleibt, wie es ist. Verändert wird deine Portion, nicht der Topf.",
      },
      {
        title: "Ein Topf, zwei Ziele: so funktioniert die Rechnung",
        body: "Aus denselben Zutaten lassen sich sehr verschiedene Teller bauen. Wer abnehmen will, bekommt mehr vom Gemüse und vom Eiweiß und weniger von der Beilage; wer Muskeln aufbaut, stockt gezielt auf. Natalie rechnet mit dir die drei, vier Gerichte durch, die bei euch am häufigsten auf dem Tisch stehen, und legt fest, wie dein Teller davon aussieht. Du wiegst am Anfang ein paar Wochen mit, danach reicht das Auge.",
      },
      {
        title: "Eiweiß zuerst, auch für den Rest der Familie kein Schaden",
        body: "Der häufigste Befund in der Beratung: zu wenig Eiweiß, zu viel Beilage. Die Korrektur hilft allen am Tisch, auch wenn nur du ein Ziel verfolgst. Natalie legt dein Tagesziel für Eiweiß und Kalorien fest, abgestimmt auf dein Training mit mir oder auf das, was du allein machst. Keine verbotenen Lebensmittel, keine Sonderprodukte, nur Mengen, die zu deinem Ziel passen.",
      },
      {
        title: "Online-Beratung, die neben Familie und Job Platz hat",
        body: "Die Termine mit Natalie laufen per Video, auch abends, wenn die Kinder im Bett sind. Kein Babysitter, keine Fahrt durch die Stadt. Zwischen den Terminen schickst du Fotos deiner Teller oder kurze Fragen, und beim nächsten Gespräch wird nachjustiert. Wer in Longerich im Schichtdienst arbeitet, etwa im Krankenhaus, bekommt die Mahlzeiten um den Dienstplan gelegt statt um ein Lehrbuch.",
      },
    ],
    faq: [
      {
        q: "Was kostet Ernährungsberatung in Köln-Longerich?",
        a: "Das Erstgespräch mit Natalie ist kostenlos, dort besprecht ihr Ziel und Umfang. Danach läuft die Beratung einzeln oder als Teil des Online Coachings ab 150€ im Monat, zusammen mit dem Training.",
      },
      {
        q: "Muss meine Familie die Ernährung mit umstellen?",
        a: "Nein. Das gemeinsame Essen bleibt. Geplant wird nur deine Portion: mehr Eiweiß, passende Mengen, die Beilage nach deinem Ziel. Niemand am Tisch bekommt ein Diätgericht vorgesetzt.",
      },
      {
        q: "Funktioniert das auch, wenn ich gar nicht selbst koche?",
        a: "Ja. Dann arbeitet Natalie mit dem, was bei euch auf den Tisch kommt oder was du unterwegs isst, und legt die Auswahl- und Mengenregeln dafür fest. Entscheidend ist, dass der Plan deinen Alltag abbildet, nicht einen idealen.",
      },
      {
        q: "Wie schnell sehe ich Ergebnisse?",
        a: "Mit einem sauber gerechneten Kaloriendefizit sind 0,3 bis 0,5 Kilo pro Woche realistisch und haltbar. Versprochen wird nichts darüber hinaus: Natalie arbeitet mit Wiegedaten und passt an, wenn sich vier Wochen nichts bewegt.",
      },
    ],
  },

  "hoehenhaus/personal-training": {
    answer:
      "Personal Training in Köln-Höhenhaus läuft 1-zu-1 bei dir zu Hause: zwei feste Termine pro Woche, Krafttraining mit Technik-Korrektur und Protokoll, die Ausdauer-Anteile im Dünnwalder Wald direkt nebenan. Eine Stunde kostet 50€, das Erstgespräch ist kostenlos.",
    metaDescription:
      "Personal Trainer in Köln-Höhenhaus: 1-zu-1 bei dir zu Hause, Ausdauer im Dünnwalder Wald nebenan, zwei feste Termine pro Woche mit Protokoll. 50€/Std.",
    sections: [
      {
        title: "Höhenhaus hat kein Studio im Veedel, und braucht auch keins",
        body: "Wer in Höhenhaus trainieren will, fährt bisher raus: nach Mülheim, nach Dellbrück oder weiter. Beim 1-zu-1 Training drehe ich das um und komme zu dir, zwischen Honschaftsstraße und Im Weidenbruch. Was eine Stunde braucht, bringe ich mit: Kurzhanteln, Band, Gewichtsweste. Die Fahrt, die du dir sparst, steckt als Trainingszeit in der Stunde, und ein Termin bei dir zu Hause fällt deutlich seltener aus als einer, zu dem man erst hinfahren muss.",
      },
      {
        title: "Der Dünnwalder Wald liegt direkt an der Stadtteilgrenze",
        body: "Für die Ausdauer- und Lauftechnik-Anteile müssen wir Höhenhaus kaum verlassen: der Dünnwalder Wald beginnt gleich hinter der nördlichen Stadtteilgrenze, mit ebenen, ruhigen Wegen, die sich für Intervalle und lockere Läufe gleichermaßen eignen. Im Plan heißt das: Kraft bei dir zu Hause, ein Wald-Block pro Woche, je nach Ziel als Tempoarbeit oder als ruhiger Ausdauerlauf. Im Sommer verlegen wir auch Krafteinheiten nach draußen.",
      },
      {
        title: "Zwei Termine pro Woche, jeder Satz im Protokoll",
        body: "Wir starten mit einem Check: Beweglichkeit, Grundkraft, Technik bei Kniebeuge und Hüftstreckung. Daraus entsteht dein Plan mit zwei festen Terminen pro Woche. Jede Einheit wird protokolliert, Gewicht, Wiederholungen, Tempo, und alle vier bis sechs Wochen vergleichen wir die Zahlen. Wenn sich nichts bewegt, ändere ich den Plan, nicht die Ausrede. Nach 90 Tagen siehst du schwarz auf weiß, was sich verändert hat.",
      },
      {
        title: "Für wen das 1-zu-1 Training in Höhenhaus gedacht ist",
        body: "Die typische Anfrage aus Höhenhaus kommt nicht von Wettkampfsportlern, sondern von Leuten zwischen 35 und 60, die nach Jahren Pause wieder anfangen wollen: Rücken meldet sich, Kondition ist weg, allein im Studio fehlt der Faden. Genau dafür ist das Format gebaut. Das Einstiegsniveau spielt keine Rolle, der Check am Anfang legt fest, wo wir starten. Garantie: wenn du nach 14 Tagen nicht weitermachen willst, bekommst du dein Geld zurück.",
      },
    ],
    faq: [
      {
        q: "Was kostet Personal Training in Köln-Höhenhaus?",
        a: "50€ pro Stunde im 1-zu-1, ohne Anfahrtskosten innerhalb von Höhenhaus und ohne Vertragsbindung. Das Erstgespräch ist kostenlos. Wer lieber mit App-Plan und Video-Check-ins arbeitet, nimmt das Online Coaching ab 150€ im Monat.",
      },
      {
        q: "Brauche ich Geräte zu Hause?",
        a: "Nein. Kurzhanteln, Bänder und Gewichtsweste bringe ich mit, ein paar Quadratmeter im Wohnzimmer oder Garten reichen. Mit steigender Kraft passe ich das Material an.",
      },
      {
        q: "Trainieren wir auch draußen?",
        a: "Ja, der Dünnwalder Wald liegt direkt an der Stadtteilgrenze: dort laufen die Ausdauer-Blöcke, bei gutem Wetter auch ganze Einheiten. Den Mix aus drinnen und draußen legen wir nach deinem Ziel und der Jahreszeit fest.",
      },
      {
        q: "Ich habe seit Jahren keinen Sport gemacht. Ist das ein Problem?",
        a: "Nein, das ist der Normalfall in meinen Anfragen aus Höhenhaus. Der Check am ersten Termin legt dein Startniveau fest, die ersten Wochen bauen Technik und Grundlage auf, gesteigert wird erst, wenn die Ausführung sitzt.",
      },
    ],
  },

  "weiden/ems-alternative": {
    answer:
      "Die EMS-Alternative in Köln-Weiden ist echtes Krafttraining im 1-zu-1: 50€ pro Stunde, jederzeit kündbar, statt Stromweste im Jahresvertrag. Bevor du ein EMS-Abo unterschreibst, lohnt eine ehrliche Rechnung in Euro und in Ergebnissen. Das Erstgespräch ist kostenlos.",
    metaDescription:
      "EMS-Alternative in Köln-Weiden: rechne das Jahresabo ehrlich gegen 50€/Std echtes Krafttraining ohne Bindung. Messbare Kraft statt Stromreiz. Erstgespräch kostenlos.",
    sections: [
      {
        title: "Mach die Abo-Rechnung, bevor du unterschreibst",
        body: "EMS-Studios verkaufen fast immer Laufzeitverträge: du zahlst zwölf Monate, ob du hingehst oder nicht. Beim 1-zu-1 Training zahlst du die Stunde, 50€, und kannst jederzeit aufhören. Rechne beides auf ein Jahr hoch und auf die Einheiten, die du realistisch schaffst, nicht die, die im Prospekt stehen. Dazu kommt die 14-Tage-Garantie: wenn du nach zwei Wochen nicht weitermachen willst, bekommst du dein Geld zurück. Ein Jahresvertrag kennt diesen Ausstieg nicht.",
      },
      {
        title: "Was der Stromreiz nicht liefert",
        body: "EMS reizt den Muskel, aber es lehrt ihn nichts: keine Kniebeuge mit sauberer Tiefe, kein Heben vom Boden, keine Last, die von Monat zu Monat steigt. Genau diese steigende Last ist der Mechanismus, über den Kraft und Muskulatur langfristig wachsen, und sie lässt sich messen. In deinem Protokoll steht nach acht Wochen, wie viel mehr du bewegst als am Anfang. Nach acht Wochen EMS steht da nur, dass du acht Mal in der Weste gestanden hast.",
      },
      {
        title: "Training in Weiden, ohne zusätzliche Fahrt",
        body: "Das Training kommt zu dir: 1-zu-1 bei dir zu Hause in Weiden, Kurzhanteln, Band und Gewichtsweste bringe ich mit. Wer lieber draußen trainiert, nutzt die Feldwege Richtung Widdersdorf für die Ausdauer-Anteile. Zwei feste Termine pro Woche, jede Einheit mit Technik-Korrektur, denn sauber ausgeführte Übungen sind auch das beste Rückenprogramm, ganz ohne Reizstrom.",
      },
      {
        title: "Für wen EMS trotzdem gedacht sein mag, und für wen nicht",
        body: "Wer ausschließlich 20 Minuten pro Woche investieren kann und will, für den ist EMS besser als nichts. Wer aber in Weiden nach einer EMS-Alternative sucht, will meist etwas anderes: messbar stärker werden, Gewicht verlieren oder den Rücken stabil bekommen, mit jemandem, der die Ausführung korrigiert. Dafür braucht es echte Bewegung gegen echte Last, zweimal pro Woche, mit Plan. Das Erstgespräch kostet nichts, danach entscheidest du mit Zahlen auf dem Tisch.",
      },
    ],
    faq: [
      {
        q: "Was kostet die EMS-Alternative in Köln-Weiden?",
        a: "50€ pro Stunde im 1-zu-1, ohne Jahresvertrag und ohne Anmeldegebühr, plus kostenloses Erstgespräch. Zum Vergleich lohnt es, dein EMS-Angebot auf zwölf Monate hochzurechnen, inklusive aller Nebenkosten im Vertrag.",
      },
      {
        q: "Ist EMS nicht effizienter, weil es nur 20 Minuten dauert?",
        a: "Die 20 Minuten gelten nur für den Reiz selbst. Kraftaufbau braucht steigende Last und saubere Bewegung, und beides liefert EMS nicht. Effizient ist das Training, das dein Ziel erreicht, nicht das kürzeste.",
      },
      {
        q: "Wo trainieren wir in Weiden?",
        a: "Bei dir zu Hause, das Material bringe ich mit. Für Ausdauer-Blöcke nutzen wir die Feldwege am westlichen Rand von Weiden Richtung Widdersdorf. Studio-Einheiten sind möglich, wenn du bereits irgendwo Mitglied bist.",
      },
      {
        q: "Ich habe schon ein EMS-Abo. Lohnt der Wechsel?",
        a: "Rechne aus, was die Restlaufzeit kostet, und nimm das kostenlose Erstgespräch als zweite Meinung: wir messen deinen Stand und du vergleichst nach vier Wochen echtem Krafttraining die Zahlen. Entscheiden kannst du dann mit Daten statt mit Werbeversprechen.",
      },
    ],
  },
};

export function getIntentCustom(stadtteil: string, intent: string): IntentCustom | undefined {
  return stadtteilIntentCustom[`${stadtteil}/${intent}`];
}
