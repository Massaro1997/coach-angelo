import { Metadata } from "next";
import Link from "next/link";
import { stadtteile } from "@/lib/koeln-stadtteile";
import { intents, siteUrl } from "@/lib/stadtteil-intent";
import { bezirke } from "@/lib/bezirk-content";

const url = `${siteUrl}/leistungen/athletiktraining`;

export const metadata: Metadata = {
  title: "Athletiktraining Köln: 1-zu-1 für 50€/Stunde",
  description:
    "Athletiktraining in Köln mit Athletiktrainer Angelo: Schnelligkeit, Sprungkraft und Stabilität für Hobbysportler. 1-zu-1 für 50€ pro Stunde, im Studio, draußen oder zuhause. Kostenlose Erstberatung.",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url,
    title: "Athletiktraining Köln | FitPrimo",
    description:
      "Schnelligkeit, Sprungkraft und Stabilität für Hobbysportler: Athletiktraining im 1-zu-1 für 50€ pro Stunde, im Studio, draußen oder zuhause.",
    images: ["/opengraph-image"],
  },
};

export default function AthletiktrainingKoeln() {
  const byBezirk = bezirke.map((b) => ({
    name: b.name,
    items: stadtteile.filter((st) => st.bezirk === b.name),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Personal Trainer Köln", item: `${siteUrl}/personal-trainer-koeln` },
          { "@type": "ListItem", position: 2, name: "Athletiktraining", item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Athletiktraining",
        provider: { "@type": "Person", name: "Angelo Magliarisi", jobTitle: "Personal Trainer", url: siteUrl },
        areaServed: { "@type": "City", name: "Köln" },
        mainEntityOfPage: url,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="fp-hero pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="mb-5 text-sm font-medium text-ink/50">
            <Link href="/personal-trainer-koeln" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">Personal Trainer Köln</Link> / Athletiktraining
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl fp-titolo text-ink mb-6">
            Athletiktraining in <span className="text-gold">Köln</span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-prose">
            Athletiktraining in Köln mit Angelo Magliarisi: Schnelligkeit, Sprungkraft und
            Stabilität für Hobbysportler, im 1-zu-1 für 50€ pro Stunde, im Studio, draußen
            oder bei dir zuhause. Die Basis ist sauberes Krafttraining, darauf kommen
            Sprints, Plyometrie und Rumpfstabilität, abgestimmt auf deinen Sport.
          </p>
          <div className="mt-6">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink/50">Unverbindlich. Antwort innerhalb von 24 Stunden.</p>
          <div className="mt-10 space-y-4 text-lg text-ink/70 leading-relaxed max-w-prose">
            <p>
              Viele trainieren für ihren Sport, aber nicht an dem, was ihren Sport schneller
              macht. Wer nur spielt oder nur läuft, stagniert irgendwann: Der Antritt fehlt,
              der Sprung bleibt flach, die Gelenke melden sich. Genau da setzt das
              Athletiktraining an, als Ergänzung zu deinem Sport, nicht als Ersatz.
            </p>
          </div>
        </div>
      </section>

      {/* Come si lavora */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Schneller und stabiler in deinem <span className="text-gold">Sport</span>
          </h2>
          <div className="space-y-4 text-ink/70 leading-relaxed max-w-prose">
            <p>
              Am Anfang schauen wir, wo du stehst: dein Sport, deine Schwachstellen, dein
              Zeitbudget. Daraus entsteht ein Plan mit klarer Reihenfolge. Zuerst die Basis,
              Kraft in den Grundübungen und ein stabiler Rumpf, denn ohne sie verpufft jede
              Schnelligkeitseinheit. Darauf bauen Sprints, Richtungswechsel und Plyometrie
              auf, dosiert und mit sauberer Technik, damit Sehnen und Gelenke mitwachsen
              statt zu streiken.
            </p>
            <p>
              Trainiert wird dort, wo es für dich passt: im Studio, auf realen Strecken in
              deinem Stadtteil oder bei dir zuhause. Angelo ist Personal Trainer und
              WABBA-Athlet und korrigiert jede Wiederholung direkt, im{" "}
              <Link href="/leistungen/personal-training" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">1-zu-1 Personal Training</Link>.
              Der Fortschritt wird gemessen, nicht geschätzt: Sprintzeiten, Sprunghöhe und
              die Gewichte in den Grundübungen zeigen dir schwarz auf weiß, ob der Plan
              funktioniert.
            </p>
          </div>
        </div>
      </section>

      {/* Preise */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Das kostet das <span className="text-gold">Training</span>
          </h2>
          <div className="space-y-4 text-ink/70 leading-relaxed max-w-prose">
            <p>
              Die 1-zu-1 Stunde mit Angelo kostet 50€, im Studio, draußen oder bei dir zu
              Hause. Wer lieber mit Plan und wöchentlichen Check-ins selbst trainiert, nimmt
              das Online Coaching ab 150€ im Monat. Alle Details stehen auf der Seite{" "}
              <Link href="/personal-trainer-koeln" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
                Personal Training in Köln
              </Link>.
            </p>
            <p>
              Das Erstgespräch ist kostenlos und unverbindlich: 30 bis 45 Minuten über
              deinen Sport, dein Ziel und deinen Startpunkt. Danach entscheidest du in Ruhe.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Was ein Athletiktrainer macht */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Was ein Athletiktrainer macht, und was <span className="text-gold">nicht</span>
          </h2>
          <div className="space-y-4 text-ink/70 leading-relaxed max-w-prose">
            <p>
              Ein Athletiktrainer trainiert nicht deinen Sport, sondern die körperlichen
              Grundlagen dahinter: Maximalkraft, Schnelligkeit, Sprungkraft, Rumpfstabilität
              und Beweglichkeit. Die Taktik und die Technik deiner Sportart bleiben bei
              deinem Verein oder deinem Lauftraining. Meine Aufgabe ist, dass du dort mit
              mehr Antritt, mehr Stabilität und weniger Verletzungen ankommst.
            </p>
            <p>
              Konkret heißt das in Köln: Kniebeugen, Kreuzheben und Ausfallschritte als
              Kraftbasis im Studio, Sprints über 10 bis 60 Meter und Richtungswechsel auf
              Rasen oder Tartan, Sprünge und Landetechnik mit Steigerung über Wochen, dazu
              gezielte Rumpf- und Sprunggelenksarbeit. Was davon in deinem Plan landet,
              hängt von deinem Sport und deinem Technik-Check am Anfang ab, nicht von einem
              Schema aus der Schublade.
            </p>
            <p>
              Für reine Fitnessziele ohne Sportbezug, etwa Muskelaufbau oder Abnehmen, ist
              das klassische{" "}
              <Link href="/leistungen/personal-training" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">Personal Training</Link>{" "}
              der passendere Rahmen. Viele Kunden kombinieren beides: erst die Basis, dann
              die Athletik.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-8">
            Häufige Fragen zum <span className="text-gold">Athletiktraining</span>
          </h2>
          <div className="space-y-8 max-w-prose">
            <div>
              <h3 className="font-bold text-ink mb-2">Für welche Sportarten lohnt sich Athletiktraining?</h3>
              <p className="text-ink/70 leading-relaxed">
                Für jede Sportart mit Laufen, Springen oder Richtungswechseln: Fußball,
                Tennis, Handball, Basketball, Laufen, Triathlon. Auch Hobbyläufer, die nur
                schneller und verletzungsfreier werden wollen, profitieren von der
                Kombination aus Kraft und Sprinttechnik.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-ink mb-2">Wie oft pro Woche sollte ich trainieren?</h3>
              <p className="text-ink/70 leading-relaxed">
                Zwei geführte Einheiten pro Woche reichen neben deinem Sport, eine für
                Kraft, eine für Schnelligkeit und Sprungkraft. Wichtiger als die Menge ist
                die Abstimmung mit deinen Spielen oder Wettkämpfen, damit du erholt in den
                Verein gehst statt müde.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-ink mb-2">Brauche ich einen Verein oder Wettkampfambitionen?</h3>
              <p className="text-ink/70 leading-relaxed">
                Nein. Athletiktraining heißt nur: schneller, stabiler und belastbarer
                werden. Der Technik-Check am Anfang legt dein Niveau fest, nicht ein
                Wettkampfkalender.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-ink mb-2">Wo in Köln findet das Training statt?</h3>
              <p className="text-ink/70 leading-relaxed">
                Kraft und Sprungkraft im Studio, Sprints und Intervalle draußen: am
                Rheinufer, im Stadtwald, am Fühlinger See oder auf einem Platz in deinem
                Stadtteil. Die Liste unten zeigt alle Stadtteile, in denen ich trainiere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Andere Leistungen */}
      <section className="bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {intents.filter((x) => x.key !== "athletiktraining").map((x) => (
              <Link key={x.key} href={`/leistungen/${x.key}`} className="rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink/70 transition-colors hover:text-gold">
                {x.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stadtteil-Liste */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-10">
            Athletiktraining in deinem <span className="text-gold">Stadtteil</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {byBezirk.map((b) => (
              <div key={b.name}>
                <h3 className="text-gold font-black uppercase tracking-wider text-sm mb-3 border-b border-line pb-2">
                  {b.name}
                </h3>
                <ul className="space-y-1.5">
                  {b.items.map((st) => (
                    <li key={st.slug}>
                      <Link href={`/koeln/${st.slug}/athletiktraining`} className="text-ink/70 hover:text-gold transition-colors text-sm">
                        Athletiktraining Köln-{st.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
