import { Metadata } from "next";
import Link from "next/link";
import { stadtteile } from "@/lib/koeln-stadtteile";
import { bezirke } from "@/lib/bezirk-content";
import { intents } from "@/lib/stadtteil-intent";

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  title: "Personal Trainer Köln: 1-zu-1 für 50€/Stunde",
  description:
    "Personal Training in Köln mit Angelo Magliarisi: 1-zu-1 Stunde für 50€, Online Coaching ab 150€/Monat. Im Studio, draußen oder zu Hause. Kostenlose Erstberatung.",
  alternates: { canonical: `${siteUrl}/personal-trainer-koeln` },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/personal-trainer-koeln`,
    title: "Personal Trainer Köln | FitPrimo",
    description: "1-zu-1 Training für 50€ pro Stunde, Online Coaching ab 150€ im Monat. Im Studio, draußen oder bei dir zu Hause.",
    images: ["/opengraph-image"],
  },
};

const faq = [
  {
    q: "Wie viel kostet ein Personal Trainer in Köln?",
    a: "In Köln liegt die Stunde je nach Anbieter zwischen 50€ und 150€. Bei mir kostet die 1-zu-1 Stunde 50€, Online Coaching gibt es ab 150€ im Monat. Die Erstberatung ist kostenlos.",
  },
  {
    q: "Wird Personal Training von der Krankenkasse bezahlt?",
    a: "In der Regel nicht. Personal Training ist eine Privatleistung. Einige Kassen bezuschussen zertifizierte Präventionskurse, das klassische 1-zu-1 Training fällt aber normalerweise nicht darunter. Verbindliche Auskunft gibt dir nur deine Krankenkasse.",
  },
  {
    q: "Wie sinnvoll ist ein Personal Trainer?",
    a: "Sinnvoll ist er dann, wenn du ein klares Ziel hast und alleine nicht weiterkommst: Technik, die nicht sitzt, ein Plan, der nicht zu deinem Alltag passt, oder Training ohne sichtbaren Fortschritt. Ein guter Trainer verkürzt den Weg, weil er Fehler sofort korrigiert. Ob es für dich passt, klären wir in der kostenlosen Erstberatung.",
  },
  {
    q: "Wo findet das Training statt?",
    a: "Wo es für dich passt: im Studio, draußen oder bei dir zu Hause. Ich betreue Kunden in allen Kölner Stadtteilen, von Rodenkirchen bis Nippes, von Ehrenfeld bis Porz.",
  },
  {
    q: "Wie läuft die kostenlose Erstberatung ab?",
    a: "Du schreibst mir über das Kontaktformular, ich melde mich innerhalb von 24 Stunden. Wir sprechen 30 bis 45 Minuten über dein Ziel, deinen Alltag und deinen Startpunkt. Danach entscheidest du in Ruhe. Die Beratung verpflichtet dich zu nichts.",
  },
];

export default function PersonalTrainerKoeln() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="fp-hero pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl fp-titolo text-ink mb-6">
            Personal Trainer <span className="text-gold">Köln</span>
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-prose">
            Personal Training in Köln mit Angelo Magliarisi: 1-zu-1 Training für 50€ pro Stunde,
            Online Coaching ab 150€ im Monat. Trainiert wird im Studio, draußen oder bei dir zu
            Hause, in allen 86 Kölner Stadtteilen.
          </p>
          <div className="mt-6">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink/50">Unverbindlich. Antwort innerhalb von 24 Stunden.</p>
          <div className="mt-10 space-y-4 text-lg text-ink/70 leading-relaxed max-w-prose">
            <p>
              Ich bin Wettkampfathlet im WABBA International Verband. Die meisten Fitnessstudios
              sind voll mit Leuten, die seit Jahren dasselbe trainieren und sich nicht verändern.
              Genau da setze ich an: mit einem Plan, der zu deinem Ziel und deinem Alltag passt,
              und mit Technik, die in jeder Einheit korrigiert wird.
            </p>
          </div>
        </div>
      </section>

      {/* Preise */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Das kostet dein <span className="text-gold">Training</span>
          </h2>
          <p className="text-ink/60 max-w-prose mb-10">
            In Köln kostet eine Personal Training Stunde je nach Anbieter zwischen 50€ und 150€.
            Ich liege am unteren Ende, weil ich kein teures Boutique-Studio in der Innenstadt
            bezahle. Du zahlst für die Betreuung, nicht für die Adresse.
          </p>
          <div className="space-y-6 max-w-prose">
            <div className="border-b border-line pb-6">
              <h3 className="font-black text-ink mb-2">Personal Training 1-zu-1: 50€ pro Stunde</h3>
              <p className="text-ink/70 leading-relaxed">
                Training mit mir im Studio, draußen oder bei dir zu Hause. Technik, Plan und
                Korrektur in jeder Einheit.
              </p>
            </div>
            <div className="border-b border-line pb-6">
              <h3 className="font-black text-ink mb-2">Online Coaching: ab 150€ im Monat</h3>
              <p className="text-ink/70 leading-relaxed">
                Individueller Trainingsplan, Ernährungsberatung und wöchentliche Check-ins.
                Betreuung an 30 Tagen im Monat statt an ein paar Stunden.
              </p>
            </div>
            <div className="border-b border-line pb-6">
              <h3 className="font-black text-ink mb-2">Trainingspläne als PDF: ab 25€</h3>
              <p className="text-ink/70 leading-relaxed">
                Wenn du erstmal alleine starten willst, mit einem Plan, der auf dein Ziel passt.
              </p>
            </div>
          </div>
          <p className="mt-8 text-ink/60 max-w-prose">
            Alle Zahlen und Vergleiche stehen im Artikel{" "}
            <Link href="/blog/was-kostet-personal-trainer-koeln" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
              Was kostet ein Personal Trainer in Köln?
            </Link>
          </p>
        </div>
      </section>

      {/* Leistungen (category-intent) */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Womit ich dir <span className="text-gold">helfe</span>
          </h2>
          <p className="text-ink/60 max-w-prose mb-10">
            Acht Schwerpunkte, in allen Stadtteilen Kölns. Klick dich rein für die Details zu deinem Ziel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {intents.map((it) => (
              <Link
                key={it.key}
                href={`/leistungen/${it.key}`}
                className="fp-scheda group block p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="fp-titolo text-ink text-lg mb-1">{it.label}</h3>
                {it.price && <p className="text-gold text-xs font-bold">{it.price}</p>}
                <span className="inline-block mt-3 text-gold text-sm group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stadtteile nach Bezirk */}
      <section className="py-16 sm:py-20 bg-surface border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-4">
            Personal Training in deinem <span className="text-gold">Stadtbezirk</span>
          </h2>
          <p className="text-ink/60 max-w-prose mb-12">
            Wähle deinen Bezirk für Infos zu Training, Outdoor-Spots und Betreuung in deiner Nähe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {bezirke.map((b) => {
              const sts = stadtteile.filter((st) => st.bezirk === b.name);
              return (
                <div key={b.slug}>
                  <Link
                    href={`/personal-trainer-koeln/${b.slug}`}
                    className="block text-gold font-black uppercase tracking-wider text-sm mb-3 border-b border-line pb-2 hover:text-gold-soft transition-colors"
                  >
                    Personal Trainer Köln-{b.name} →
                  </Link>
                  <p className="text-ink/50 text-sm leading-relaxed">
                    {sts.map((st) => st.name).join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warum Angelo */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-10">
            Warum mit mir trainieren?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              {
                title: "Wettkampferfahrung",
                desc: "Ich stehe selbst als WABBA Athlet auf der Bühne. Was ich dir zeige, wende ich jeden Tag an mir selbst an.",
              },
              {
                title: "Kein Schema F",
                desc: "Dein Plan wird für dich gebaut: Ziel, Erfahrung, Zeitbudget, Verletzungen. Kein Copy-Paste-Programm.",
              },
              {
                title: "Italienisch & Deutsch",
                desc: "Ich betreue dich auf Deutsch oder Italienisch. Viele meiner Kunden sind Italiener in Köln und Umgebung.",
              },
            ].map((item, idx) => (
              <div key={item.title}>
                <div className="fp-titolo text-4xl text-gold/40 mb-3">0{idx + 1}</div>
                <h3 className="fp-titolo text-ink mb-2">{item.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 max-w-prose">
            <h2 className="fp-titolo text-2xl sm:text-3xl text-ink mb-4">
              Training und Ernährung aus <span className="text-gold">einer Hand</span>
            </h2>
            <p className="text-ink/70 leading-relaxed">
              Hinter FitPrimo stehen zwei Menschen. Ich kümmere mich um dein Training: Kraftaufbau,
              Technik, Plan. Natalie ist Ernährungsberaterin mit Schwerpunkt Sport- und
              Fitnessernährung und kümmert sich um den Ernährungsteil im Online Coaching. Jeder
              macht das, was er am besten kann. Wie sie arbeitet, steht auf der Seite{" "}
              <Link href="/leistungen/ernaehrungsberatung" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
                Ernährungsberatung in Köln
              </Link>.
            </p>
          </div>
          <div className="mt-10 max-w-prose">
            <p className="text-ink/70 leading-relaxed">
              Wie das in der Praxis aussieht, zeigt der Blog. Lies zum Beispiel{" "}
              <Link href="/blog/krafttraining-frauen-ab-50-trainingsplan" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
                Krafttraining für Frauen ab 50
              </Link>
              ,{" "}
              <Link href="/blog/muskelaufbau-ab-40-mann-trainingsplan-tipps" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
                Muskelaufbau ab 40
              </Link>{" "}
              oder{" "}
              <Link href="/blog/testosteron-krafttraining-mann-ab-40" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
                Testosteron und Krafttraining ab 40
              </Link>
              .
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/servizi" className="fp-btn-linea">
              Alle Leistungen
            </Link>
            <Link href="/blog" className="fp-btn-linea">
              Fitness Blog
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-surface border-t border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="fp-titolo text-3xl sm:text-4xl text-ink mb-8">
            Häufige Fragen zu Personal Training in Köln
          </h2>
          <div className="space-y-6">
            {faq.map((f) => (
              <div key={f.q} className="border-b border-line pb-6">
                <h3 className="font-black text-ink mb-2">{f.q}</h3>
                <p className="text-ink/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/contatti" className="fp-btn">
              Kostenlose Erstberatung anfragen <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
