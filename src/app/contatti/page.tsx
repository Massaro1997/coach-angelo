"use client";

import { useLanguage } from "@/context/LanguageContext";
import LeadWizard from "@/components/LeadWizard";
import { IconaTelefono, IconaWhatsApp } from "@/components/IconeContatto";
import { TELEFONO, TELEFONO_HREF, WHATSAPP_HREF } from "@/lib/contatto";

/*
  Kontakt / Contatti, tema FITPRIMO (04/10/2026).

  Titolo al centro e sotto le cinque domande, larghe quanto la pagina: la
  stessa veste del wizard in home, che Calogero ha approvato. Via il
  cartellino "100% kostenlos · 60 Sekunden" e l'elenco delle tre garanzie:
  nell'hero li ha fatti togliere, e il sottotitolo dice gia' che la consulenza
  e' gratuita e che la risposta arriva in 24 ore.
  La pagina di prima sta in brand/sito-prima-del-rebranding/pagine-interne/.

  06/11/2026: sotto il sottotitolo una riga per chi preferisce chiamare o
  scrivere subito ad Angelo. Collegamenti di testo, non pulsanti: il pulsante
  WhatsApp e' uno solo in tutto il sito (la pillola in basso a destra).
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
          <p className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[15px] text-ink/60">
            <span>{de ? "Lieber direkt?" : "Preferisci subito?"}</span>
            <a href={TELEFONO_HREF} className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
              <IconaTelefono className="h-4 w-4 text-gold" />
              {TELEFONO}
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold">
              <IconaWhatsApp className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </a>
          </p>
        </div>

        <LeadWizard bare largo />
      </div>
    </section>
  );
}
