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

    transformations: language === 'de' ? [
      { title: 'Komplette Transformation', desc: 'Gewichtsverlust und Definition' },
      { title: 'Muskelaufbau', desc: '+8kg Muskelmasse' },
      { title: 'Körperrekomposition', desc: 'Abnehmen und Straffen' },
      { title: 'Definition', desc: 'Athletische Vorbereitung' },
    ] : [
      { title: 'Trasformazione Completa', desc: 'Perdita peso e definizione' },
      { title: 'Aumento Massa', desc: '+8kg massa muscolare' },
      { title: 'Ricomposizione', desc: 'Dimagrimento e tonificazione' },
      { title: 'Definizione', desc: 'Preparazione atletica' },
    ],

    ctaTitle: language === 'de'
      ? 'Möchtest du die nächste Erfolgsgeschichte sein?'
      : 'Vuoi Essere la Prossima Storia di Successo?',
    ctaText: language === 'de'
      ? 'Starte heute deine Transformation. Die erste Beratung ist kostenlos!'
      : 'Inizia oggi il tuo percorso di trasformazione. La prima consulenza è gratuita!',
    ctaButton: language === 'de' ? 'Starte Deine Transformation' : 'Inizia la Tua Trasformazione',

    clientLabel: language === 'de' ? 'Kunde seit' : 'Cliente da',
  };

  const stats = [
    { number: "100+", label: t.stat1Label },
    { number: "500+", label: t.stat2Label },
    { number: "98%", label: t.stat3Label },
    { number: "5.0", label: t.stat4Label },
  ];

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
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ink uppercase">
            {t.heroTitle}
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`py-10 sm:py-12 text-center ${index > 0 ? 'border-l border-line max-md:[&:nth-child(3)]:border-l-0' : ''} ${index >= 2 ? 'max-md:border-t max-md:border-line' : ''}`}
              >
                <div className="text-4xl md:text-5xl font-black text-gold mb-2">{stat.number}</div>
                <div className="text-ink/60 uppercase tracking-wider text-[10px] sm:text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-surface border border-line rounded-lg p-8 hover:border-gold-deep transition-colors">
                <div className="flex items-center mb-4" aria-label="5/5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-ink/70 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="border-t border-line pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-ink">{testimonial.name}</p>
                      <p className="text-sm text-ink/50">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gold font-bold text-sm">{testimonial.result}</p>
                      <p className="text-xs text-ink/50">{t.clientLabel} {testimonial.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 sm:py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-ink uppercase mb-4">
              {t.transformationsTitle1}<span className="text-accent">{t.transformationsTitle2}</span>
            </h2>
            <p className="text-lg text-ink/60 max-w-2xl">
              {t.transformationsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.transformations.map((trans, idx) => (
              <div key={trans.title} className="bg-background border border-line rounded-lg overflow-hidden hover:border-gold-deep transition-colors">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={`/images/Testimonianze/before-after-${idx + 1}.webp`}
                    alt={language === 'de' ? 'Kundentransformation - Vorher und Nachher' : 'Trasformazione Cliente - Prima e Dopo'}
                    fill
                    className="object-contain bg-background"
                  />
                </div>
                <div className="p-4 border-t border-line">
                  <h3 className="font-bold text-ink text-sm uppercase mb-1">{trans.title}</h3>
                  <p className="text-ink/60 text-xs">{trans.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 sm:py-32 border-t border-line">
        <Image
          src="/hero bassa.png"
          alt="Coach Angelo"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-ink uppercase mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-ink/80 mb-8 max-w-2xl mx-auto">
            {t.ctaText}
          </p>
          <Link
            href="/contatti"
            className="bg-gold text-white hover:bg-gold-soft px-8 py-4 rounded-md font-bold uppercase tracking-wider text-lg transition-colors inline-block"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
