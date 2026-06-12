import { Metadata } from "next";
import Link from "next/link";
import { fitnessFaqs, faqCategories, faqsByCategory } from "@/lib/fitness-faq";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Fitness FAQ | Antworten zu Abnehmen, Muskelaufbau & Training",
  description:
    "Ehrliche Antworten auf die häufigsten Fitness-Fragen: Abnehmen, Muskelaufbau, Ernährung und Training. Von Angelo Magliarisi, Personal Trainer in Köln und WABBA Athlet.",
  alternates: { canonical: `${siteUrl}/fitness-faq` },
};

export default function FitnessFaqIndex() {
  return (
    <>
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">Fitness FAQ</p>
          <h1 className="text-4xl sm:text-5xl font-black text-ink uppercase mb-6 leading-tight">
            Deine Fragen, <span className="text-accent">ehrlich beantwortet</span>
          </h1>
          <p className="text-lg text-ink/70 max-w-prose">
            Abnehmen, Muskelaufbau, Ernährung, Training: Hier findest du klare Antworten auf die
            Fragen, die mir meine Kunden in Köln am häufigsten stellen. Kein Bro-Science, kein
            Verkaufsgerede.
          </p>
        </div>
      </section>

      {faqCategories.map((cat) => {
        const items = faqsByCategory(cat.key);
        if (!items.length) return null;
        return (
          <section key={cat.key} className="py-12 sm:py-16 bg-background border-t border-line">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-8">
                <span className="text-accent">{cat.label}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/fitness-faq/${f.slug}`}
                    className="group flex items-center justify-between bg-surface border border-line rounded-lg px-5 py-4 hover:border-gold-deep transition-colors"
                  >
                    <span className="text-ink/80 font-medium leading-snug pr-3">{f.question}</span>
                    <span className="text-gold font-bold text-lg group-hover:translate-x-1 transition-transform flex-shrink-0">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-16 sm:py-20 bg-surface border-t border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase mb-4">
            Deine Frage ist nicht dabei?
          </h2>
          <p className="text-lg text-ink/70 mb-8 max-w-2xl mx-auto">
            Stell sie mir direkt. In der kostenlosen Erstberatung gehen wir deine Situation durch,
            ganz konkret, ohne Verkaufsdruck.
          </p>
          <Link href="/contatti" className="inline-flex items-center bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider rounded-md">
            Kostenlose Beratung <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
