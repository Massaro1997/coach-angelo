import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { stadtteile } from "@/lib/koeln-stadtteile";
import { bezirke } from "@/lib/bezirk-content";
import { intents } from "@/lib/stadtteil-intent";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Personal Trainer Köln | Coach Angelo, WABBA Athlet",
  description:
    "Personal Trainer in Köln: 1-zu-1 Training (50€/Std), Online Coaching ab 150€/Monat, individuelle Trainingspläne. WABBA International Athlet. Kostenlose Erstberatung, Antwort in 24h.",
  alternates: { canonical: `${siteUrl}/personal-trainer-koeln` },
};

export default function PersonalTrainerKoeln() {
  const totalEinwohner = stadtteile.reduce((s, st) => s + st.einwohner, 0);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
            Köln · Alle 9 Stadtbezirke
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ink uppercase mb-6">
            Personal Trainer <span className="text-accent">Köln</span>
          </h1>
          <div className="space-y-4 text-lg text-ink/70 leading-relaxed max-w-prose">
            <p>
              Ich bin Angelo Magliarisi, Personal Trainer in Köln und Wettkampfathlet im WABBA
              International Verband. Ich betreue Kunden aus allen 86 Kölner Stadtteilen, von der
              Innenstadt bis Porz, von Chorweiler bis Rodenkirchen. Insgesamt leben über{" "}
              {Math.round(totalEinwohner / 100000) / 10} Millionen Menschen in Köln, und die meisten
              Fitnessstudios sind voll mit Leuten, die seit Jahren dasselbe trainieren und sich nicht
              verändern. Genau da setze ich an.
            </p>
            <p>
              Mein Angebot ist bewusst einfach: Personal Training 1-zu-1 im Studio für 50€ pro
              Stunde, Online Coaching mit individuellem Trainingsplan, Ernährungsberatung und
              wöchentlichen Check-ins ab 150€ im Monat, oder fertige Trainingspläne als PDF ab 25€.
              Die Erstberatung ist kostenlos und unverbindlich.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/contatti"
              className="inline-flex items-center bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider rounded-md"
            >
              Kostenlose Beratung anfragen <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Leistungen (category-intent) */}
      <section className="py-16 sm:py-20 bg-background border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-4">
            Womit ich dir <span className="text-accent">helfe</span>
          </h2>
          <p className="text-ink/60 max-w-prose mb-10">
            Acht Schwerpunkte, in allen Stadtteilen Kölns. Klick dich rein für die Details zu deinem Ziel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {intents.map((it) => (
              <Link
                key={it.key}
                href={`/leistungen/${it.key}`}
                className="group bg-surface border border-line rounded-lg p-6 hover:border-gold-deep transition-colors"
              >
                <h3 className="font-black text-ink uppercase text-sm mb-1 leading-tight">{it.label}</h3>
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
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-4">
            Personal Training in deinem <span className="text-accent">Stadtbezirk</span>
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
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-10">
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
                <div className="text-4xl font-black text-gold/40 mb-3">0{idx + 1}</div>
                <h3 className="font-black text-ink uppercase mb-2">{item.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/servizi"
              className="inline-flex items-center border border-line text-ink px-6 py-3 font-bold uppercase tracking-wider rounded-md hover:bg-elevated transition-colors"
            >
              Alle Leistungen
            </Link>
            <Link
              href="/testimonianze"
              className="inline-flex items-center border border-line text-ink px-6 py-3 font-bold uppercase tracking-wider rounded-md hover:bg-elevated transition-colors"
            >
              Ergebnisse ansehen
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center border border-line text-ink px-6 py-3 font-bold uppercase tracking-wider rounded-md hover:bg-elevated transition-colors"
            >
              Fitness Blog
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-line">
        <Image src="/hero bassa.png" alt="Coach Angelo, Personal Trainer Köln" fill className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-ink uppercase mb-4">
            Bereit für echte Ergebnisse?
          </h2>
          <p className="text-lg text-ink/70 mb-8 max-w-2xl mx-auto">
            5 kurze Fragen, kostenlose Erstberatung, Antwort innerhalb von 24 Stunden.
          </p>
          <Link
            href="/contatti"
            className="inline-flex items-center bg-gold text-white px-10 py-5 font-bold uppercase tracking-wider rounded-md text-lg"
          >
            Jetzt starten <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
