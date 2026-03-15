"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonianze() {
  const { language } = useLanguage();

  // Translations
  const t = {
    heroTitle: language === 'de' ? 'Erfahrungsberichte' : 'Testimonianze',
    heroSubtitle: language === 'de'
      ? 'Echte Geschichten von Menschen, die ihr Leben verändert haben.'
      : 'Storie vere di persone che hanno trasformato la loro vita.',

    stat1Label: language === 'de' ? 'Zufriedene Kunden' : 'Clienti Soddisfatti',
    stat2Label: language === 'de' ? 'Verlorene Kg Gesamt' : 'Kg Persi Totali',
    stat3Label: language === 'de' ? 'Erfolgsrate' : 'Tasso di Successo',
    stat4Label: language === 'de' ? 'Durchschnittliche Bewertung' : 'Valutazione Media',

    transformationsTitle1: language === 'de' ? 'Echte ' : 'Trasformazioni ',
    transformationsTitle2: language === 'de' ? 'Transformationen' : 'Reali',
    transformationsSubtitle: language === 'de'
      ? 'Konkrete Ergebnisse, die meine Kunden mit Engagement und Hingabe erzielt haben.'
      : 'Risultati concreti ottenuti dai miei clienti con impegno e dedizione.',

    trans1Title: language === 'de' ? 'Komplette Transformation' : 'Trasformazione Completa',
    trans1Desc: language === 'de' ? 'Gewichtsverlust und Definition' : 'Perdita peso e definizione',
    trans2Title: language === 'de' ? 'Muskelaufbau' : 'Aumento Massa',
    trans2Desc: language === 'de' ? '+8kg Muskelmasse' : '+8kg massa muscolare',
    trans3Title: language === 'de' ? 'Körperrekomposition' : 'Ricomposizione',
    trans3Desc: language === 'de' ? 'Abnehmen und Straffen' : 'Dimagrimento e tonificazione',
    trans4Title: language === 'de' ? 'Definition' : 'Definizione',
    trans4Desc: language === 'de' ? 'Athletische Vorbereitung' : 'Preparazione atletica',

    ctaTitle: language === 'de'
      ? 'Möchtest du die nächste Erfolgsgeschichte sein?'
      : 'Vuoi Essere la Prossima Storia di Successo?',
    ctaText: language === 'de'
      ? 'Starte heute deine Transformation. Die erste Beratung ist kostenlos!'
      : 'Inizia oggi il tuo percorso di trasformazione. La prima consulenza è gratuita!',
    ctaButton: language === 'de' ? 'Starte Deine Transformation' : 'Inizia la Tua Trasformazione',

    clientLabel: language === 'de' ? 'Kunde seit' : 'Cliente da',
    onlineClient: language === 'de' ? 'Online-Kunde' : 'Cliente online',
    months: language === 'de' ? 'Monaten' : 'mesi',
    year: language === 'de' ? 'Jahr' : 'anno',
  };

  const testimonials = language === 'de' ? [
    {
      name: "Marco R.",
      location: "Köln",
      duration: "6 Monaten",
      text: "Angelo hat mir geholfen, in 4 Monaten 15kg abzunehmen. Sein personalisierter Ansatz und seine ständige Motivation haben den Unterschied gemacht. Ich hätte nie gedacht, dass ich diese Ergebnisse erreichen könnte!",
      result: "-15kg in 4 Monaten",
    },
    {
      name: "Laura M.",
      location: "Köln",
      duration: "1 Jahr",
      text: "Endlich habe ich einen Trainer gefunden, der Italienisch spricht! Die Ergebnisse sind unglaublich und ich fühle mich stärker als je zuvor. Angelo weiß, wie man dich auch in den schwierigsten Momenten motiviert.",
      result: "Muskelmasse +20%",
    },
    {
      name: "Giuseppe T.",
      location: "Frankfurt",
      duration: "Online-Kunde",
      text: "Angelos Online-Coaching ist perfekt für meinen vollen Terminkalender. Klare Programme und kontinuierliche Unterstützung über WhatsApp. Trotz der Distanz fühle ich mich betreut, als wäre ich mit ihm im Fitnessstudio.",
      result: "Komplette Definition",
    },
    {
      name: "Francesca B.",
      location: "Düsseldorf",
      duration: "8 Monaten",
      text: "Nach der Schwangerschaft dachte ich, ich könnte nie wieder in Form kommen. Angelo hat ein perfektes Programm für meine Bedürfnisse erstellt und jetzt bin ich fitter als vorher!",
      result: "-12kg nach Schwangerschaft",
    },
    {
      name: "Andrea S.",
      location: "Stuttgart",
      duration: "3 Monaten",
      text: "Ich suchte einen seriösen und professionellen Personal Trainer. Mit Angelo habe ich viel mehr gefunden: einen Coach, der wirklich an seine Kunden glaubt. Die Ergebnisse sprechen für sich.",
      result: "+8kg Muskelmasse",
    },
    {
      name: "Giulia P.",
      location: "Köln",
      duration: "Online-Kunde",
      text: "Angelos Ernährungsplan hat meine Beziehung zum Essen komplett verändert. Keine extremen Diäten, nur ein gesunder und nachhaltiger Ansatz. Endlich verstehe ich, wie ich mich richtig ernähre!",
      result: "Ausgewogene Ernährung",
    },
  ] : [
    {
      name: "Marco R.",
      location: "Colonia",
      duration: "6 mesi",
      text: "Angelo mi ha aiutato a perdere 15kg in 4 mesi. Il suo approccio personalizzato e la sua motivazione costante hanno fatto la differenza. Non avrei mai pensato di poter raggiungere questi risultati!",
      result: "-15kg in 4 mesi",
    },
    {
      name: "Laura M.",
      location: "Colonia",
      duration: "1 anno",
      text: "Finalmente ho trovato un trainer che parla italiano! I risultati sono incredibili e mi sento più forte che mai. Angelo sa come motivarti anche nei momenti più difficili.",
      result: "Massa muscolare +20%",
    },
    {
      name: "Giuseppe T.",
      location: "Francoforte",
      duration: "Cliente online",
      text: "Il coaching online di Angelo è perfetto per i miei impegni. Programmi chiari e supporto continuo via WhatsApp. Nonostante la distanza, mi sento seguito come se fossi in palestra con lui.",
      result: "Definizione completa",
    },
    {
      name: "Francesca B.",
      location: "Düsseldorf",
      duration: "8 mesi",
      text: "Dopo la gravidanza pensavo di non poter più tornare in forma. Angelo ha creato un programma perfetto per le mie esigenze e ora sono più in forma di prima!",
      result: "-12kg post gravidanza",
    },
    {
      name: "Andrea S.",
      location: "Stoccarda",
      duration: "3 mesi",
      text: "Cercavo un personal trainer serio e professionale. Con Angelo ho trovato molto di più: un coach che crede veramente nei suoi clienti. I risultati parlano da soli.",
      result: "+8kg massa magra",
    },
    {
      name: "Giulia P.",
      location: "Colonia",
      duration: "Cliente online",
      text: "Il piano alimentare di Angelo ha cambiato completamente il mio rapporto con il cibo. Niente diete estreme, solo un approccio sano e sostenibile. Finalmente capisco come nutrirmi!",
      result: "Alimentazione equilibrata",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 bg-neutral-900 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>

        {/* Floating gradient orbs */}
        <div className="absolute top-12 left-12 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-16 w-80 h-80 bg-fuchsia-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.heroTitle}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-white/80">{t.stat1Label}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80">{t.stat2Label}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-white/80">{t.stat3Label}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5.0</div>
              <div className="text-white/80">{t.stat4Label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="relative py-20 bg-neutral-800 overflow-hidden">
        {/* Sophisticated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-fuchsia-950/12 to-neutral-800"></div>
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-pink-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-neutral-900 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div className="border-t border-neutral-700 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/50">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent font-semibold text-sm">{testimonial.result}</p>
                      <p className="text-xs text-white/50">{t.clientLabel} {testimonial.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="relative py-20 bg-neutral-900 overflow-hidden">
        {/* Refined gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-violet-950/15 to-neutral-900"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/8 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.transformationsTitle1}<span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{t.transformationsTitle2}</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {t.transformationsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Transformation 1 */}
            <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/Testimonianze/before-after-1.webp"
                  alt={language === 'de' ? 'Kundentransformation - Vorher und Nachher' : 'Trasformazione Cliente - Prima e Dopo'}
                  fill
                  className="object-contain bg-neutral-900 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-sm mb-1">{t.trans1Title}</h3>
                <p className="text-white/70 text-xs">{t.trans1Desc}</p>
              </div>
            </div>

            {/* Transformation 2 */}
            <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/Testimonianze/before-after-2.webp"
                  alt={language === 'de' ? 'Kundentransformation - Vorher und Nachher' : 'Trasformazione Cliente - Prima e Dopo'}
                  fill
                  className="object-contain bg-neutral-900 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-sm mb-1">{t.trans2Title}</h3>
                <p className="text-white/70 text-xs">{t.trans2Desc}</p>
              </div>
            </div>

            {/* Transformation 3 */}
            <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/Testimonianze/before-after-3.webp"
                  alt={language === 'de' ? 'Kundentransformation - Vorher und Nachher' : 'Trasformazione Cliente - Prima e Dopo'}
                  fill
                  className="object-contain bg-neutral-900 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-sm mb-1">{t.trans3Title}</h3>
                <p className="text-white/70 text-xs">{t.trans3Desc}</p>
              </div>
            </div>

            {/* Transformation 4 */}
            <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/Testimonianze/before-after-4.webp"
                  alt={language === 'de' ? 'Kundentransformation - Vorher und Nachher' : 'Trasformazione Cliente - Prima e Dopo'}
                  fill
                  className="object-contain bg-neutral-900 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-sm mb-1">{t.trans4Title}</h3>
                <p className="text-white/70 text-xs">{t.trans4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <Image
          src="/hero bassa.png"
          alt="Coach Angelo"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t.ctaText}
          </p>
          <Link
            href="/contatti"
            className="bg-white text-fuchsia-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all inline-block"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
