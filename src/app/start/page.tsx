"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import LeadWizard from "@/components/LeadWizard";

/*
  /start, la pagina del codice QR (06/10/2026). Calogero: "un qr code che
  porta a una landing con il wizard per la lead generation", stampato su
  brochure e biglietto.

  Chi arriva qui ha gia' il foglio in mano e sta col telefono: niente da
  leggere, Angelo in faccia e subito le cinque domande. I due codici portano
  utm_source=brochure e utm_source=karte (scripts/esporta-stampa.mjs): il
  lead in admin dice da quale carta arriva.
*/
export default function Start() {
  const { language } = useLanguage();
  const de = language === "de";

  return (
    <section className="fp-hero relative overflow-hidden pb-12 pt-[88px] sm:pb-24 sm:pt-32 lg:pt-40">
      <div aria-hidden className="fp-forma -left-10 top-28 hidden h-48 w-36 bg-gold/[0.07] lg:block" />
      <div aria-hidden className="fp-forma right-[7%] top-32 hidden h-20 w-28 bg-ink/[0.04] lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-7 max-w-3xl text-center sm:mb-10 lg:mb-14">
          <div className="relative mx-auto mb-4 h-[72px] w-[72px] overflow-hidden rounded-full ring-[3px] ring-gold/80 ring-offset-[3px] ring-offset-white sm:mb-6 sm:h-28 sm:w-28 sm:ring-4 sm:ring-offset-4">
            <Image src="/images/angelo-profilo-v3.jpg" alt="Angelo Magliarisi" fill sizes="112px" className="object-cover" priority />
          </div>
          <h1 className="fp-titolo text-[clamp(30px,8.4vw,52px)] text-ink lg:text-[clamp(44px,4.2vw,62px)]">
            {de ? (
              <>Schön, dass du <span className="whitespace-nowrap text-gold">da bist</span></>
            ) : (
              <>Bello che tu sia <span className="whitespace-nowrap text-gold">qui</span></>
            )}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink/65 sm:mt-5 sm:text-lg">
            {de
              ? "5 kurze Fragen, dann melde ich mich innerhalb von 24 Stunden bei dir. Die Erstberatung ist kostenlos."
              : "5 domande veloci, poi ti scrivo entro 24 ore. La prima consulenza è gratuita."}
          </p>
        </div>

        <LeadWizard bare largo compatto />
      </div>
    </section>
  );
}
