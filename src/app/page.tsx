"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();

  const stats = language === 'de' ? [
    { number: "100+", label: "Zufriedene Kunden" },
    { number: "500+", label: "Kg Abgenommen" },
    { number: "98%", label: "Erfolgsrate" },
    { number: "10+", label: "Jahre Erfahrung" }
  ] : [
    { number: "100+", label: "Clienti Soddisfatti" },
    { number: "500+", label: "Kg Persi" },
    { number: "98%", label: "Tasso di Successo" },
    { number: "10+", label: "Anni Esperienza" }
  ];

  const heroCtaText = language === 'de' ? 'Jetzt Starten' : 'Inizia Ora';
  const heroServicesText = language === 'de' ? 'Meine Leistungen' : 'I Miei Servizi';
  const aboutBadge = language === 'de' ? 'Über Mich' : 'Chi Sono';
  const aboutText1 = language === 'de'
    ? 'Ich bin Angelo, italienischer Personal Trainer mit Sitz in Deutschland. Als Wettkampfathlet im WABBA International Verband bringe ich meine Wettkampferfahrung in die Arbeit mit jedem Kunden ein.'
    : "Sono Angelo, Personal Trainer italiano con base in Germania. Atleta agonista nella federazione WABBA International, porto la mia esperienza di competizione nel lavoro con ogni cliente.";
  const aboutText2 = language === 'de'
    ? 'Meine Philosophie ist einfach: keine Abkürzungen, nur harte Arbeit, richtige Ernährung und Beständigkeit. Die Ergebnisse kommen immer, wenn man sich engagiert.'
    : "La mia filosofia è semplice: niente scorciatoie, solo lavoro duro, alimentazione corretta e costanza. I risultati arrivano sempre quando c'è impegno.";
  const aboutText3 = language === 'de'
    ? 'Ob du abnehmen, Muskelmasse aufbauen oder dich auf einen Wettkampf vorbereiten möchtest - ich habe das richtige Programm für dich.'
    : "Che tu voglia perdere peso, aumentare la massa muscolare o prepararti per una competizione, ho il programma giusto per te.";
  const aboutCta = language === 'de' ? 'Mehr erfahren' : 'Scopri di più';

  const servicesBadge = language === 'de' ? 'Was ich anbiete' : 'Cosa Offro';
  const servicesTitle = language === 'de' ? 'MEINE' : 'I MIEI';
  const servicesTitleHighlight = language === 'de' ? 'LEISTUNGEN' : 'SERVIZI';

  const service1Title = language === 'de' ? 'FERTIGE PLÄNE' : 'SCHEDE PRONTE';
  const service1Price = language === 'de' ? 'ab €25' : 'da €25';
  const service1Desc = language === 'de'
    ? 'Fertige PDF-Programme für Anfänger, Fortgeschrittene und Profis. Sofortiger Download nach dem Kauf.'
    : "Programmi PDF pronti per Beginner, Intermediate e Advanced. Download immediato dopo l'acquisto.";
  const service1Cta = language === 'de' ? 'Jetzt Kaufen' : 'Acquista Ora';

  const service2Title = language === 'de' ? 'PERSONALISIERTE PLÄNE' : 'SCHEDE PERSONALIZZATE';
  const service2Badge = language === 'de' ? 'Maßgeschneidert' : 'Su Misura';
  const service2Desc = language === 'de'
    ? 'Ein Programm, das speziell für dich erstellt wird, basierend auf deinen Zielen und deiner Verfügbarkeit. WhatsApp-Support inklusive.'
    : "Programma creato su misura per te, basato sui tuoi obiettivi e la tua disponibilità. Supporto WhatsApp incluso.";
  const service2Cta = language === 'de' ? 'Anfragen' : 'Richiedi';

  const service3Title = 'PERSONAL TRAINING';
  const service3Badge = language === 'de' ? 'Vor Ort' : 'In Presenza';
  const service3Price = language === 'de' ? '€50/Std' : '€50/ora';
  const service3Desc = language === 'de'
    ? '1-zu-1 Training im Fitnessstudio. Echtzeit-Technikkorrektur und konstante Motivation. Verfügbar in Deutschland.'
    : "Allenamenti 1-to-1 in palestra. Correzione tecnica in tempo reale e motivazione costante. Disponibile in Germania.";
  const service3Cta = language === 'de' ? 'Buchen' : 'Prenota';

  const allServicesCta = language === 'de' ? 'Alle Leistungen' : 'Tutti i Servizi';

  const resultsBadge = language === 'de' ? 'Echte Transformationen' : 'Trasformazioni Reali';
  const resultsTitle = language === 'de' ? 'DIE ERGEBNISSE' : 'I RISULTATI';
  const resultsTitleHighlight = language === 'de' ? 'SPRECHEN' : 'PARLANO';
  const transformationText = language === 'de' ? 'Transformation' : 'Trasformazione';
  const allResultsCta = language === 'de' ? 'Alle Ergebnisse sehen' : 'Vedi Tutti i Risultati';

  const ctaBadge = language === 'de' ? 'Kostenlose Beratung' : 'Consulenza Gratuita';
  const ctaTitle = language === 'de' ? 'BEREIT FÜR' : 'PRONTO A';
  const ctaTitleHighlight = language === 'de' ? 'VERÄNDERUNG?' : 'CAMBIARE?';
  const ctaDesc = language === 'de'
    ? 'Die erste Beratung ist kostenlos. Lass uns über deine Ziele sprechen und gemeinsam den perfekten Weg für dich finden.'
    : "La prima consulenza è gratuita. Parliamo dei tuoi obiettivi e creiamo insieme il percorso perfetto per te.";
  const ctaButton = language === 'de' ? 'Jetzt Kontaktieren' : 'Contattami Ora';

  return (
    <div className="bg-neutral-900">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-end bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/images/Foto Angelo/Hero Banner 3.png"
            alt="Coach Angelo WABBA"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="absolute inset-0 sm:hidden bg-black pt-20">
          <div className="relative h-full">
            <Image
              src="/images/Foto Angelo/hero mobile.png"
              alt="Coach Angelo WABBA"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
          <div className="absolute top-20 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        </div>
        <div className="sm:hidden absolute bottom-24 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-[5]" />

        <div className="absolute bottom-8 sm:bottom-24 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
              <Link
                href="/contatti"
                className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-wider hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 transition-all duration-300 inline-flex items-center justify-center rounded-full shadow-lg shadow-fuchsia-500/25"
              >
                {heroCtaText} <span className="ml-2">→</span>
              </Link>
              <Link
                href="/servizi"
                className="border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center rounded-full backdrop-blur-sm"
              >
                {heroServicesText}
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats + About Combined Section */}
      <section className="relative overflow-hidden">
        {/* Unified gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-800"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-fuchsia-500/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl"></div>

        {/* Stats */}
        <div className="relative pt-12 sm:pt-20 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:border-fuchsia-500/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/60 uppercase tracking-wider text-[10px] sm:text-xs font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="relative pb-24">

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[600px] lg:h-[700px]">
                <Image
                  src="/images/Foto Angelo/angelo-3.jpg"
                  alt="Coach Angelo con medaglia WABBA"
                  fill
                  className="object-cover rounded-3xl"
                />
                <div className="absolute bottom-6 right-6 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 rounded-2xl p-5 shadow-2xl shadow-fuchsia-500/30">
                  <div className="text-2xl font-black text-white">WABBA</div>
                  <div className="text-xs text-white/70 font-medium">International</div>
                </div>
              </div>

              <div>
                <div className="inline-block px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full mb-6">
                  <p className="text-fuchsia-400 uppercase tracking-[0.2em] text-xs font-medium">
                    {aboutBadge}
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  ATLETA WABBA
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">INTERNATIONAL</span>
                </h2>
                <div className="space-y-6 text-lg text-white/60 leading-relaxed">
                  <p>{aboutText1}</p>
                  <p>{aboutText2}</p>
                  <p>{aboutText3}</p>
                </div>
                <Link
                  href="/chi-sono"
                  className="inline-flex items-center mt-8 bg-white/10 backdrop-blur-sm text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white/20 transition-all duration-300 rounded-full border border-white/10"
                >
                  {aboutCta} <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-neutral-900"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl -translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full mb-6">
              <p className="text-fuchsia-400 uppercase tracking-[0.2em] text-xs font-medium">
                {servicesBadge}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              {servicesTitle} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{servicesTitleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-3xl p-10 hover:border-fuchsia-500/50 transition-all duration-500 h-full">
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-bold uppercase rounded-full">
                  -50%
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{service1Title}</h3>
                <p className="text-fuchsia-400 font-bold mb-4">{service1Price}</p>
                <p className="text-white/70 mb-6 leading-relaxed">{service1Desc}</p>
                <Link href="/servizi" className="text-fuchsia-400 font-bold uppercase tracking-wider inline-flex items-center hover:text-fuchsia-300 transition-colors">
                  {service1Cta} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative md:-translate-y-6">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-pink-500/10 to-violet-500/10 backdrop-blur-sm border border-fuchsia-500/20 rounded-3xl p-10 hover:border-fuchsia-500/40 transition-all duration-500 h-full">
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white text-xs font-bold uppercase rounded-full">
                  {service2Badge}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{service2Title}</h3>
                <p className="text-fuchsia-400 font-bold mb-4">€50</p>
                <p className="text-white/70 mb-6 leading-relaxed">{service2Desc}</p>
                <Link href="/servizi" className="text-fuchsia-400 font-bold uppercase tracking-wider inline-flex items-center hover:text-fuchsia-300 transition-colors">
                  {service2Cta} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-3xl p-10 hover:border-fuchsia-500/50 transition-all duration-500 h-full">
                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase rounded-full">
                  {service3Badge}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{service3Title}</h3>
                <p className="text-fuchsia-400 font-bold mb-4">{service3Price}</p>
                <p className="text-white/70 mb-6 leading-relaxed">{service3Desc}</p>
                <Link href="/servizi" className="text-fuchsia-400 font-bold uppercase tracking-wider inline-flex items-center hover:text-fuchsia-300 transition-colors">
                  {service3Cta} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/servizi"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-8 py-4 font-bold uppercase tracking-wider hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 transition-all duration-300 rounded-full shadow-lg shadow-fuchsia-500/25"
            >
              {allServicesCta} <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-900"></div>
        <div className="absolute bottom-0 left-1/2 w-[800px] h-[400px] bg-fuchsia-500/10 rounded-full blur-3xl -translate-x-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full mb-6">
              <p className="text-fuchsia-400 uppercase tracking-[0.2em] text-xs font-medium">
                {resultsBadge}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              {resultsTitle} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{resultsTitleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-neutral-700 group-hover:border-fuchsia-500/50 transition-all duration-300">
                  <Image
                    src={`/images/Testimonianze/before-after-${num}.webp`}
                    alt={language === 'de' ? 'Kundentransformation' : 'Trasformazione cliente'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-sm font-bold">{transformationText} #{num}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/testimonianze"
              className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white/20 transition-all duration-300 rounded-full border border-white/20"
            >
              {allResultsCta} <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Foto Angelo/angelo-4.jpg"
            alt="Coach Angelo"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/80 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-end">
            <div className="max-w-2xl text-right">
              <div className="inline-block px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full mb-6 backdrop-blur-sm">
                <p className="text-fuchsia-400 uppercase tracking-[0.2em] text-xs font-medium">
                  {ctaBadge}
                </p>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                {ctaTitle} <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">{ctaTitleHighlight}</span>
              </h2>
              <p className="text-xl text-white/70 mb-10 leading-relaxed">
                {ctaDesc}
              </p>
              <Link
                href="/contatti"
                className="inline-flex items-center bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-10 py-5 font-bold uppercase tracking-wider hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 transition-all duration-300 text-lg rounded-full shadow-2xl shadow-fuchsia-500/30"
              >
                {ctaButton} <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
