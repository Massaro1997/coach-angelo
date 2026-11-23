// Contenuto su misura per le pagine /leistungen/[intent] (giro 95, 23/11/2026).
// Campo facoltativo per pagina, letto dal template: le pagine senza voce qui
// restano esattamente come prima. Non tocca URL, canonical o sitemap.
import Link from "next/link";
import type { ReactNode } from "react";

const a = "underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold";

export interface LeistungContent {
  sections: { title: ReactNode; body: ReactNode }[];
  faq: { q: string; a: string }[];
}

export const leistungenContent: Record<string, LeistungContent> = {
  muskelaufbau: {
    sections: [
      {
        title: (
          <>
            So baust du mit mir <span className="text-gold">Muskeln</span> auf
          </>
        ),
        body: (
          <>
            <p>
              Am Anfang steht keine Trainingsplan-Vorlage, sondern ein Technik-Check. Ich schaue
              mir an, wie du Kniebeuge, Bankdrücken, Kreuzheben und Rudern ausführst, und darauf
              bauen wir auf. Diese Grundübungen bleiben das Fundament, weil sie die meiste
              Muskelmasse in der kürzesten Zeit ansprechen.
            </p>
            <p>
              Danach zählt nur eines: progressive Überlastung. Jede Einheit wird dokumentiert,
              und jede Woche kommt entweder Gewicht oder eine Wiederholung dazu. Dazu bekommst du
              einen Eiweiß-Zielwert von 1,6 bis 2 Gramm pro Kilo Körpergewicht. Zwei bis drei
              Einheiten pro Woche reichen, denn der Muskel wächst in der Erholung, nicht im
              Training.
            </p>
            <p>
              Realistische Zahlen, damit du weißt, worauf du dich einlässt: Kraftzuwächse spürst
              du nach vier bis sechs Wochen, sichtbare Veränderungen kommen nach zwei bis drei
              Monaten. Als Anfänger sind drei bis sechs Kilo Muskelmasse im ersten Jahr drin. Wer
              über 40 startet, braucht etwas mehr Geduld bei der Erholung, baut aber genauso auf.
              Wie das konkret aussieht, steht im Artikel{" "}
            <Link href="/blog/muskelaufbau-ab-40-mann-trainingsplan-tipps" className={a}>
              Muskelaufbau ab 40
            </Link>
            .
            </p>
          </>
        ),
      },
      {
        title: (
          <>
            Training im Studio, draußen oder <span className="text-gold">bei dir</span>
          </>
        ),
        body: (
          <p>
            Die meisten meiner Muskelaufbau-Kunden trainieren mit mir im Studio, weil Hanteln und
            Racks die Progression am einfachsten machen. Es geht aber auch mit Kurzhanteln bei dir
            zu Hause. Ich betreue unter anderem Kunden in{" "}
            <Link href="/koeln/nippes" className={a}>
              Köln-Nippes
            </Link>
            ,{" "}
            <Link href="/koeln/ehrenfeld" className={a}>
              Köln-Ehrenfeld
            </Link>{" "}
            und{" "}
            <Link href="/koeln/rodenkirchen" className={a}>
              Köln-Rodenkirchen
            </Link>
            , und außerhalb der Stadtgrenze in{" "}
            <Link href="/personal-trainer-frechen" className={a}>
              Frechen
            </Link>
            , wo ich selbst wohne.
          </p>
        ),
      },
    ],
    faq: [
      {
        q: "Wie lange dauert es, bis man Muskelaufbau sieht?",
        a: "Kraftzuwächse spürst du nach vier bis sechs Wochen, sichtbare Veränderungen kommen meist nach zwei bis drei Monaten. Als Anfänger kannst du im ersten Jahr mit drei bis sechs Kilo Muskelmasse rechnen, danach wird es langsamer. Alles, was deutlich schneller verspricht, ist Marketing.",
      },
      {
        q: "Was kostet Muskelaufbau Coaching in Köln?",
        a: "Die 1-zu-1 Stunde mit mir kostet 50€, Online Coaching mit Trainingsplan, Ernährungssteuerung und wöchentlichen Check-ins gibt es ab 150€ im Monat. Das Erstgespräch ist kostenlos und verpflichtet dich zu nichts.",
      },
      {
        q: "Wie oft pro Woche muss ich für Muskelaufbau trainieren?",
        a: "Zwei bis drei Einheiten pro Woche reichen, wenn die Intensität stimmt und die Belastung von Woche zu Woche steigt. Mehr Einheiten bringen als Einsteiger kaum zusätzliches Wachstum, weil der Muskel in der Erholung wächst.",
      },
      {
        q: "Funktioniert Muskelaufbau auch ab 40 oder 50?",
        a: "Ja. Der Aufbau läuft etwas langsamer und die Erholung braucht mehr Beachtung, aber das Prinzip bleibt gleich: Grundübungen, steigende Gewichte, genug Eiweiß und Schlaf. Ein großer Teil meiner Kunden ist über 40.",
      },
      {
        q: "Muss ich dafür ins Fitnessstudio?",
        a: "Nein. Mit zwei verstellbaren Kurzhanteln geht Muskelaufbau auch zu Hause, und die ersten Monate funktionieren sogar mit dem eigenen Körpergewicht. Im Studio ist die Progression über Jahre allerdings einfacher zu steuern.",
      },
    ],
  },

  rueckentraining: {
    sections: [
      {
        title: (
          <>
            So läuft das <span className="text-gold">Rückentraining</span> ab
          </>
        ),
        body: (
          <>
            <p>
              Fast alle, die deswegen zu mir kommen, sitzen den Tag über am Schreibtisch: unterer
              Rücken verspannt, Nacken steif, nach langem Sitzen zieht es beim Aufstehen. Deshalb
              beginnen wir nicht mit Übungen, sondern mit deinem Alltag: wie viel du sitzt, wie du
              sitzt, was dein Rücken im Lauf des Tages abbekommt.
            </p>
            <p>
              Das Training selbst stärkt dann das, was beim Sitzen verkümmert: Rumpf, Gesäß,
              Hüftstrecker und die gesamte hintere Kette. Wir starten mit leichten Gewichten und
              sauberer Ausführung und steigern langsam. Zwei gezielte Einheiten pro Woche genügen,
              ergänzt um kurze Übungen, die du selbst am Schreibtisch machst. Welche das sind,
              zeige ich im Artikel{" "}
              <Link href="/blog/rueckenschmerzen-bueroarbeit-uebungen" className={a}>
                Rückenschmerzen durch Büroarbeit
              </Link>
              .
            </p>
            <p>
              Ein ehrlicher Hinweis: Bei akuten Schmerzen, Ausstrahlung ins Bein oder
              Taubheitsgefühlen gehört der erste Termin zum Arzt, nicht zu mir. Ich arbeite mit
              unspezifischen Beschwerden, die vom vielen Sitzen und von fehlender Kraft kommen,
              und das sind die meisten Fälle.
            </p>
          </>
        ),
      },
      {
        title: (
          <>
            Training dort, wo du <span className="text-gold">wohnst</span>
          </>
        ),
        body: (
          <p>
            Trainiert wird im Studio, bei dir zu Hause oder draußen. Rückentraining braucht wenig
            Ausrüstung, deshalb klappt es fast überall. Kunden betreue ich zum Beispiel in{" "}
            <Link href="/koeln/suelz" className={a}>
              Köln-Sülz
            </Link>
            ,{" "}
            <Link href="/koeln/dellbrueck" className={a}>
              Köln-Dellbrück
            </Link>{" "}
            und{" "}
            <Link href="/koeln/rodenkirchen" className={a}>
              Köln-Rodenkirchen
            </Link>
            , im Umland auch in{" "}
            <Link href="/personal-trainer-huerth" className={a}>
              Hürth
            </Link>{" "}
            und{" "}
            <Link href="/personal-trainer-frechen" className={a}>
              Frechen
            </Link>
            .
          </p>
        ),
      },
    ],
    faq: [
      {
        q: "Hilft Krafttraining wirklich gegen Rückenschmerzen?",
        a: "Bei unspezifischen Rückenschmerzen, also ohne klare medizinische Ursache, ja: ein stärkerer Rumpf und eine kräftige hintere Kette entlasten die Wirbelsäule im Alltag spürbar. Bei akuten Schmerzen oder Ausstrahlung ins Bein gehört die Abklärung zuerst zum Arzt.",
      },
      {
        q: "Wie oft sollte ich den Rücken trainieren?",
        a: "Zwei gezielte Einheiten pro Woche reichen, wenn sie konsequent kommen. Wichtiger als mehr Training ist, das lange Sitzen regelmäßig zu unterbrechen: alle 45 bis 60 Minuten kurz aufstehen wirkt zusammen mit dem Training am besten.",
      },
      {
        q: "Was kostet Rückentraining mit Personal Trainer in Köln?",
        a: "Die 1-zu-1 Stunde kostet 50€, im Studio, draußen oder bei dir zu Hause. Wer lieber mit Plan und wöchentlichen Check-ins arbeitet, bekommt Online Coaching ab 150€ im Monat. Das Erstgespräch ist kostenlos.",
      },
      {
        q: "Ich sitze acht Stunden am Tag. Bringt Training da überhaupt etwas?",
        a: "Ja, gerade dann. Acht Stunden Sitzen kannst du nicht wegtrainieren, aber zwei kräftigende Einheiten pro Woche plus kurze Unterbrechungen im Büro verändern bei den meisten innerhalb weniger Wochen, wie sich der Rücken anfühlt.",
      },
      {
        q: "Zahlt die Krankenkasse das Rückentraining?",
        a: "Das 1-zu-1 Training mit einem Personal Trainer zahlst du selbst. Manche Kassen bezuschussen zertifizierte Rücken-Präventionskurse in Gruppen, das ist aber ein anderes Format. Was für dich gilt, beantwortet nur deine Kasse verbindlich.",
      },
    ],
  },

  "ems-alternative": {
    sections: [
      {
        title: (
          <>
            Was EMS kann und was <span className="text-gold">nicht</span>
          </>
        ),
        body: (
          <>
            <p>
              EMS heißt elektrische Muskelstimulation: 20 Minuten im Anzug, Strom aktiviert die
              Muskeln. Und ja, am Anfang funktioniert das. Der Reiz ist neu, Einsteiger werden
              messbar kräftiger, und 20 Minuten pro Woche klingen unschlagbar, wenn der Kalender
              voll ist.
            </p>
            <p>
              Das Problem kommt danach. Beim Krafttraining steigerst du die Last über Jahre, von
              20 auf 40 auf 80 Kilo. Beim EMS lässt sich der Stromreiz nicht endlos steigern, und
              der Fortschritt flacht früh ab. Dazu lernst du keine Bewegung, die dir im Alltag
              etwas bringt, und dein Skelett bekommt nicht die mechanische Last, die Knochen und
              Gelenke stark hält. Meist hängt am Ganzen außerdem ein langer Vertrag.
            </p>
            <p>
              Echtes Krafttraining dreht das um: Der Fortschritt steht in Kilo auf der Stange,
              die Technik gehört dir für immer, und du bindest dich bei mir an kein Jahresabo.
            </p>
          </>
        ),
      },
      {
        title: (
          <>
            So sieht die Alternative <span className="text-gold">bei mir</span> aus
          </>
        ),
        body: (
          <p>
            Zwei Einheiten pro Woche à 45 bis 60 Minuten, 1-zu-1 für 50€ pro Stunde, jede Einheit
            dokumentiert. Das ist mehr Zeit als EMS, aber es ist die Zeit, die ein Körper für
            echte Anpassung braucht. Trainiert wird im Studio, draußen oder bei dir zu Hause, zum
            Beispiel in{" "}
            <Link href="/koeln/ehrenfeld" className={a}>
              Köln-Ehrenfeld
            </Link>
            ,{" "}
            <Link href="/koeln/porz" className={a}>
              Köln-Porz
            </Link>{" "}
            und{" "}
            <Link href="/koeln/nippes" className={a}>
              Köln-Nippes
            </Link>
            , im Umland etwa in{" "}
            <Link href="/personal-trainer-pulheim" className={a}>
              Pulheim
            </Link>{" "}
            und{" "}
            <Link href="/personal-trainer-frechen" className={a}>
              Frechen
            </Link>
            . Wenn dich das Zeitargument zu EMS gebracht hat: Wie effizientes Krafttraining mit
            vollem Kalender aussieht, steht im Artikel{" "}
            <Link href="/blog/trainingsplan-berufstaetige-wenig-zeit" className={a}>
              Trainingsplan für Berufstätige
            </Link>
            .
          </p>
        ),
      },
    ],
    faq: [
      {
        q: "Was bringt EMS-Training wirklich?",
        a: "Für Einsteiger einen echten, messbaren Kraftreiz bei sehr wenig Zeitaufwand. Der Fortschritt flacht aber früh ab, weil sich der Stromreiz nicht wie ein Gewicht über Jahre steigern lässt. Als Einstieg okay, als langfristige Strategie schwach.",
      },
      {
        q: "Warum ist klassisches Krafttraining die bessere Alternative?",
        a: "Drei Gründe: Die Last lässt sich über Jahre steigern und der Fortschritt bleibt messbar. Die mechanische Belastung stärkt neben den Muskeln auch Knochen und Gelenke. Und du lernst Bewegungen, die dir beim Heben, Tragen und Treppensteigen im Alltag helfen.",
      },
      {
        q: "Was kostet das Training bei FitPrimo im Vergleich zu EMS?",
        a: "Die 1-zu-1 Stunde kostet 50€, ohne Jahresvertrag und ohne Mindestlaufzeit. EMS-Studios arbeiten dagegen fast immer mit Abos über viele Monate. Das Erstgespräch bei mir ist kostenlos, danach entscheidest du frei.",
      },
      {
        q: "Ich habe wenig Zeit. Schaffe ich echtes Krafttraining trotzdem?",
        a: "Ja. Zwei Einheiten pro Woche à 45 bis 60 Minuten reichen für konstanten Fortschritt, wenn der Plan auf Grundübungen aufbaut und nichts Überflüssiges enthält. Das sind unter zwei Stunden pro Woche, fest verabredet und damit auch planbar.",
      },
      {
        q: "Ich komme vom EMS. Wie steige ich um?",
        a: "Besser als bei null: Eine Grundaktivierung der Muskulatur ist da. Was fehlt, ist die Technik der Grundübungen. Die bauen wir in den ersten Wochen mit moderaten Gewichten auf, danach übernimmt die normale Progression.",
      },
    ],
  },
};
