"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/*
  La chiamata finale, come la fascia "Ready to Achieve Your Fitness Goals?"
  di Trainex: una banda nel colore del marchio con il bordo ad arco in alto,
  il titolo e il pulsante bianco a sinistra, Angelo scontornato a destra che
  esce dalla banda con la testa.

  Chiesta da Calogero il 04/10/2026 ("prova a fare anche una cta così con
  Angelo"). La mette LayoutWrapper dopo le recensioni, prima del pie' di
  pagina. Prende il posto della fascia con la foto del palco che chiudeva le
  pagine dei quartieri.

  Secondo giro, stesso giorno: "fai in modo che la foto di Angelo tocchi il
  footer, quasi sembra che esca da lì". Quindi sotto non c'e' piu' l'arco
  bianco ne' lo stacco: la banda arriva fino in fondo, il pie' di pagina le
  sale sopra con i suoi angoli tondi (lo fa Footer.tsx, con un margine
  negativo) e taglia Angelo alla vita. FOOTER_SOPRA e' quanto sale: lo spazio
  in fondo alla banda lo tiene libero.

  Dietro Angelo ci sono i blocchi inclinati a filo, NON il simbolo AM grande:
  quello dietro la sua foto e' gia' stato bocciato nell'hero.
*/
export default function ChiamataAngelo() {
  const { language } = useLanguage();
  const de = language === "de";

  return (
    <section className="fp relative z-10 overflow-hidden bg-white pt-24 sm:pt-32">
      <div className="relative">
        {/* la banda: il colore sta su un livello suo, cosi' l'arco bianco la
            taglia in alto senza tagliare Angelo */}
        <div aria-hidden className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#ff2b3a] via-[#e30613] to-[#a8000d]">
          <div className="absolute -top-10 left-[-5%] h-20 w-[110%] rounded-[50%] bg-white sm:-top-14 sm:h-28" />
          {/* i blocchi inclinati, a filo e pieni appena */}
          <div className="fp-forma right-[6%] top-[18%] hidden h-[52%] w-[13%] border border-white/20 lg:block" />
          <div className="fp-forma right-[30%] top-[30%] hidden h-[44%] w-[15%] border border-white/15 lg:block" />
          <div className="fp-forma right-[-3%] top-[26%] hidden h-[58%] w-[12%] bg-white/[0.06] lg:block" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-end px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:px-8">
          {/* in fondo, sul computer, 44 px in piu': li copre il pie' di pagina */}
          <div className="pb-10 pt-24 text-center sm:pt-28 lg:pb-[calc(7rem+44px)] lg:pl-[8%] lg:pt-28 lg:text-left">
            <h2 className="fp-titolo !leading-[1.12] text-[clamp(30px,7.6vw,44px)] text-white lg:text-[clamp(38px,3.5vw,54px)]">
              {de ? (
                <>
                  Bereit für dein Ziel?
                  <br />
                  Lass uns gemeinsam trainieren.
                </>
              ) : (
                <>
                  Pronto per il tuo obiettivo?
                  <br />
                  Alleniamoci insieme.
                </>
              )}
            </h2>
            <Link
              href="/contatti"
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-gold shadow-[0_18px_40px_-18px_rgba(18,18,20,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {de ? "Kostenlose Beratung" : "Consulenza gratuita"} <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Angelo: piu' alto della banda, esce in alto con la testa e in
              basso arriva sotto il pie' di pagina, che lo taglia */}
          <div className="relative mx-auto h-[340px] w-[260px] sm:h-[400px] sm:w-[300px] lg:mx-0 lg:h-full lg:w-auto">
            <div className="absolute inset-x-0 bottom-0 h-full lg:left-[6%] lg:right-[14%] lg:h-[calc(100%+7rem)]">
              <Image
                src="/images/Foto Angelo/hero-angelo.png"
                alt={de
                  ? "Angelo Magliarisi, Personal Trainer in Köln"
                  : "Angelo Magliarisi, personal trainer a Colonia"}
                fill
                sizes="(max-width: 1024px) 300px, 460px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
