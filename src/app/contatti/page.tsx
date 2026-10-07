"use client";

import { useLanguage } from "@/context/LanguageContext";
import LeadWizard from "@/components/LeadWizard";

/*
  Kontakt / Contatti, tema FITPRIMO (04/10/2026).

  Titolo al centro e sotto le cinque domande, larghe quanto la pagina: la
  stessa veste del wizard in home, che Calogero ha approvato. Via il
  cartellino "100% kostenlos · 60 Sekunden" e l'elenco delle tre garanzie:
  nell'hero li ha fatti togliere, e il sottotitolo dice gia' che la consulenza
  e' gratuita e che la risposta arriva in 24 ore.
  La pagina di prima sta in brand/sito-prima-del-rebranding/pagine-interne/.
*/
export default function Contatti() {
  const { language } = useLanguage();
  const de = language === "de";

  return (
    <section className="fp-hero relative overflow-hidden pb-20 pt-32 sm:pb-28 lg:pt-44">
      <div aria-hidden className="fp-forma -left-10 top-32 hidden h-48 w-36 bg-gold/[0.07] lg:block" />
      <div aria-hidden className="fp-forma right-[7%] top-36 hidden h-20 w-28 bg-ink/[0.04] lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <h1 className="fp-titolo text-[clamp(36px,9.5vw,54px)] text-ink lg:text-[clamp(46px,4.4vw,64px)]">
            {de ? (
              <>Starte deine <span className="whitespace-nowrap text-gold">Veränderung</span></>
            ) : (
              <>Inizia il tuo <span className="whitespace-nowrap text-gold">cambiamento</span></>
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
            {de
              ? "Beantworte 5 kurze Fragen und erhalte deine kostenlose Erstberatung. Antwort innerhalb von 24 Stunden."
              : "Rispondi a 5 domande veloci e ricevi la tua consulenza gratuita. Risposta entro 24 ore."}
          </p>
        </div>

        <LeadWizard bare largo />
      </div>
    </section>
  );
}
