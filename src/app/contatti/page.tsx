"use client";

import { useLanguage } from "@/context/LanguageContext";
import LeadWizard from "@/components/LeadWizard";

export default function Contatti() {
  const { language } = useLanguage();
  const de = language === "de";

  const t = {
    heroTitle: de ? "Starte deine Veränderung" : "Inizia il tuo cambiamento",
    heroSubtitle: de
      ? "Beantworte 5 kurze Fragen und erhalte deine kostenlose Erstberatung. Antwort innerhalb von 24 Stunden."
      : "Rispondi a 5 domande veloci e ricevi la tua consulenza gratuita. Risposta entro 24 ore.",
    trust1: de ? "Kostenlose Erstberatung" : "Prima consulenza gratuita",
    trust2: de ? "Antwort innerhalb 24h" : "Risposta entro 24 ore",
    trust3: de ? "WABBA International Athlet" : "Atleta WABBA International",
  };

  return (
    <>
      {/* Hero + Wizard inline */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Colonna testo */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="inline-block bg-gold text-white text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm mb-5">
                {de ? '100% kostenlos · 60 Sekunden' : '100% gratis · 60 secondi'}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-ink uppercase mb-5 leading-[1.0]">
                {t.heroTitle}
              </h1>
              <p className="text-lg text-ink/60 leading-relaxed mb-8 max-w-md">
                {t.heroSubtitle}
              </p>
              <ul className="space-y-3 text-ink/70">
                {[t.trust1, t.trust2, t.trust3].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonna wizard inline (no card wrapper) */}
            <div className="lg:col-span-7">
              <LeadWizard bare />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
