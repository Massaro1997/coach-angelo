"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import LeadWizard from "@/components/LeadWizard";
import ReviewsCarousel from "@/components/ReviewsCarousel";

export default function Home() {
  const { language } = useLanguage();

  const heroEyebrow = language === 'de' ? 'WABBA International Athlet · Köln' : 'Atleta WABBA International · Colonia';
  const heroHeadline1 = language === 'de' ? 'In 90 Tagen ein' : 'In 90 giorni un';
  const heroHeadlineHighlight = language === 'de' ? 'neuer Körper.' : 'corpo nuovo.';
  const heroHeadline2 = language === 'de' ? 'Garantiert.' : 'Garantito.';
  const heroSub = language === 'de'
    ? 'Persönlicher Trainingsplan, Ernährung und Betreuung jede Woche. Schluss mit Ausreden, ab heute zählen nur Ergebnisse. Wenn du dranbleibst und nichts passiert, bekommst du dein Geld zurück.'
    : "Piano di allenamento, alimentazione e supporto ogni settimana. Basta scuse: da oggi contano solo i risultati. Se segui il piano e non cambia niente, sei rimborsato.";
  const heroCtaText = language === 'de' ? 'Kostenlose Beratung sichern' : 'Prendi la consulenza gratis';
  const heroServicesText = language === 'de' ? 'Meine Leistungen' : 'I Miei Servizi';
  const heroBadges = language === 'de'
    ? ['100+ Transformationen', 'Antwort in 24h', 'Geld-zurück-Garantie']
    : ['100+ trasformazioni', 'Risposta in 24h', 'Soddisfatto o rimborsato'];
  const aboutBadge = language === 'de' ? 'Über Mich' : 'Chi Sono';
  const aboutText1 = language === 'de'
    ? 'Ich bin Angelo, italienischer Personal Trainer mit Sitz in Köln. Als Wettkampfathlet im WABBA International Verband bringe ich meine Wettkampferfahrung in die Arbeit mit jedem Kunden ein.'
    : "Sono Angelo, Personal Trainer italiano con base a Colonia. Atleta agonista nella federazione WABBA International, porto la mia esperienza di competizione nel lavoro con ogni cliente.";
  const aboutText2 = language === 'de'
    ? 'Meine Philosophie ist einfach: keine Abkürzungen, nur harte Arbeit, richtige Ernährung und Beständigkeit. Die Ergebnisse kommen immer, wenn man sich engagiert.'
    : "La mia filosofia è semplice: niente scorciatoie, solo lavoro duro, alimentazione corretta e costanza. I risultati arrivano sempre quando c'è impegno.";
  const aboutText3 = language === 'de'
    ? 'Ob du abnehmen, Muskelmasse aufbauen oder dich auf einen Wettkampf vorbereiten möchtest - ich habe das richtige Programm für dich.'
    : "Che tu voglia perdere peso, aumentare la massa muscolare o prepararti per una competizione, ho il programma giusto per te.";
  const aboutCta = language === 'de' ? 'Mehr erfahren' : 'Scopri di più';

  const servicesTitle = language === 'de' ? 'MEINE' : 'I MIEI';
  const servicesTitleHighlight = language === 'de' ? 'LEISTUNGEN' : 'SERVIZI';

  const services = language === 'de' ? [
    {
      num: "01",
      title: "FERTIGE PLÄNE",
      price: "ab €25",
      tag: "-50%",
      img: "/images/services/schede.png",
      desc: "Fertige PDF-Programme für Anfänger, Fortgeschrittene und Profis. Sofortiger Download nach dem Kauf.",
      cta: "Jetzt kaufen",
    },
    {
      num: "02",
      title: "ONLINE COACHING",
      price: "ab €150/Monat",
      img: "/images/services/online.png",
      desc: "Individueller Trainingsplan, Ernährungsberatung und wöchentliche Check-ins. Betreuung, wo immer du bist.",
      cta: "Anfragen",
      featured: true,
    },
    {
      num: "03",
      title: "PERSONAL TRAINING",
      price: "€50/Std",
      tag: "Nur Köln",
      img: "/images/services/personal.png",
      desc: "1-zu-1 Training im Fitnessstudio in Köln. Echtzeit-Technikkorrektur und konstante Motivation.",
      cta: "Buchen",
    },
  ] : [
    {
      num: "01",
      title: "SCHEDE PRONTE",
      price: "da €25",
      tag: "-50%",
      img: "/images/services/schede.png",
      desc: "Programmi PDF pronti per Beginner, Intermediate e Advanced. Download immediato dopo l'acquisto.",
      cta: "Acquista ora",
    },
    {
      num: "02",
      title: "COACHING ONLINE",
      price: "da €150/mese",
      img: "/images/services/online.png",
      desc: "Scheda personalizzata, supporto alimentare e check settimanali. Ti seguo ovunque tu sia.",
      cta: "Richiedi",
      featured: true,
    },
    {
      num: "03",
      title: "PERSONAL TRAINING",
      price: "€50/ora",
      tag: "Solo Colonia",
      img: "/images/services/personal.png",
      desc: "Allenamenti 1-to-1 in palestra a Colonia. Correzione tecnica in tempo reale e motivazione costante.",
      cta: "Prenota",
    },
  ];

  const featuredLabel = language === 'de' ? '★ Bestseller' : '★ Il più richiesto';
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
    ? 'In sechs Monaten kannst du derselbe Mensch sein wie heute. Oder der, der in den Spiegel schaut und lächelt. Die erste Beratung ist kostenlos: reden wir.'
    : "Tra sei mesi puoi essere la stessa persona di oggi. Oppure quella che si guarda allo specchio e sorride. La prima consulenza è gratuita: parliamone.";
  const ctaButton = language === 'de' ? 'Jetzt anfragen' : 'Richiedi ora';

  return (
    <div className="bg-background">
      {/* Hero — immagine originale (desktop + mobile dedicate) */}
      <section className="relative w-full bg-background overflow-hidden">
        {/* Desktop */}
        <div className="hidden sm:block relative w-full h-[78vh]">
          <Image
            src="/images/Foto Angelo/Hero Banner 3.png"
            alt="Coach Angelo, Personal Trainer und WABBA International Athlet in Köln"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        {/* Mobile */}
        <div className="sm:hidden relative w-full aspect-[3/4]">
          <Image
            src="/images/Foto Angelo/hero mobile.png"
            alt="Coach Angelo, Personal Trainer in Köln"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </section>

      {/* Trust bar — stile ecommerce */}
      <section className="bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-line">
            {/* Rating */}
            <div className="flex items-center justify-center gap-2 py-4 sm:py-5 px-2 text-center">
              <div className="flex gap-0.5 flex-shrink-0">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-ink/70 font-medium leading-tight">
                4,9/5 · 100+ {language === 'de' ? 'Kunden' : 'clienti'}
              </span>
            </div>
            {/* Garanzia */}
            <div className="flex items-center justify-center gap-2 py-4 sm:py-5 px-2 text-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs sm:text-sm text-ink/70 font-medium leading-tight">
                {language === 'de' ? '90-Tage Geld zurück' : '90gg garantito o rimborsato'}
              </span>
            </div>
            {/* WABBA */}
            <div className="flex items-center justify-center gap-2 py-4 sm:py-5 px-2 text-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-xs sm:text-sm text-ink/70 font-medium leading-tight">WABBA Athlet</span>
            </div>
            {/* Risposta 24h */}
            <div className="flex items-center justify-center gap-2 py-4 sm:py-5 px-2 text-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm text-ink/70 font-medium leading-tight">
                {language === 'de' ? 'Antwort in 24h' : 'Risposta in 24h'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 2 — Headline + CTA + storytelling */}
      <section className="bg-background border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Headline + CTA */}
            <div className="lg:col-span-7">
              <span className="inline-block bg-gold text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm mb-5">
                {heroEyebrow}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink uppercase leading-[1.0] mb-5">
                {heroHeadline1} <span className="text-accent">{heroHeadlineHighlight}</span> {heroHeadline2}
              </h1>
              <p className="text-base lg:text-lg text-ink/70 leading-relaxed mb-7 max-w-xl">
                {heroSub}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="#inizia"
                  className="bg-gold text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-wider inline-flex items-center justify-center rounded-md"
                >
                  {heroCtaText} <span className="ml-2">→</span>
                </Link>
                <Link
                  href="/servizi"
                  className="border border-ink/30 text-ink px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-elevated hover:border-ink/50 transition-colors inline-flex items-center justify-center rounded-md"
                >
                  {heroServicesText}
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
                {heroBadges.map((badge) => (
                  <span key={badge} className="flex items-center gap-2 text-sm text-ink/70 font-medium">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Storytelling — chi è, cosa fa, come aiuta */}
            <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-12">
              <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
                {language === 'de' ? 'Wer ich bin' : 'Chi sono'}
              </p>
              <div className="space-y-5 text-ink/70 leading-relaxed">
                <p>
                  {language === 'de'
                    ? 'Ich bin Angelo Magliarisi, Personal Trainer in Köln und Wettkampfathlet im WABBA International Verband. Ich stehe selbst auf der Bühne, also weiß ich aus erster Hand, was einen Körper wirklich verändert, und was nur leere Versprechen sind.'
                    : 'Sono Angelo Magliarisi, Personal Trainer a Colonia e atleta agonista nella federazione WABBA International. Salgo io stesso sul palco, quindi so per esperienza diretta cosa trasforma davvero un corpo e cosa sono solo promesse vuote.'}
                </p>
                <p>
                  {language === 'de'
                    ? 'Was ich mache, ist einfach: Ich baue dir einen Trainings- und Ernährungsplan, der in DEIN Leben passt, und ich begleite dich Woche für Woche, damit du nicht wieder nach zwei Wochen aufgibst.'
                    : 'Quello che faccio è semplice: ti costruisco un piano di allenamento e alimentazione che entra nella TUA vita, e ti seguo settimana dopo settimana, così non molli di nuovo dopo due settimane.'}
                </p>
                <p>
                  {language === 'de'
                    ? 'Ob du abnehmen, Muskeln aufbauen oder dich für einen Wettkampf vorbereiten willst: Ich helfe dir, im Spiegel endlich jemanden zu sehen, auf den du stolz bist.'
                    : 'Che tu voglia dimagrire, mettere muscoli o prepararti per una gara: ti aiuto a vedere finalmente allo specchio una persona di cui sei fiero.'}
                </p>
              </div>
              <Link
                href="/chi-sono"
                className="inline-flex items-center mt-7 text-gold font-bold uppercase tracking-wider text-sm hover:text-gold-soft transition-colors"
              >
                {language === 'de' ? 'Meine Geschichte' : 'La mia storia'} <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain / Empathy — immagine + testo affianco, grigio scuro */}
      <section className="section-dim py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Immagine */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden order-2 lg:order-1 shadow-lg">
              <Image
                src="/images/services/pain-v2.png"
                alt={language === 'de' ? 'Entschlossener Athlet im Fitnessstudio' : 'Atleta determinato in palestra'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Testo parlato */}
            <div className="order-1 lg:order-2">
              <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
                {language === 'de' ? 'Reden wir Klartext' : 'Parliamoci chiaro'}
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-ink uppercase mb-6 leading-tight">
                {language === 'de' ? (
                  <>Erkennst du <span className="text-accent">dich wieder?</span></>
                ) : (
                  <>Ti <span className="text-accent">riconosci?</span></>
                )}
              </h2>
              <div className="space-y-5 text-lg text-ink/70 leading-relaxed">
                <p>
                  {language === 'de'
                    ? 'Du stehst morgens auf, schaust kurz in den Spiegel und schaust schnell wieder weg. Die Klamotten von vor zwei Jahren liegen ganz hinten im Schrank, weil sie nicht mehr passen.'
                    : "Ti alzi la mattina, ti guardi un attimo allo specchio e distogli subito lo sguardo. I vestiti di due anni fa sono in fondo all'armadio, perché non ti entrano più."}
                </p>
                <p>
                  {language === 'de'
                    ? 'Du hast es versucht. Diäten, ein paar Wochen Studio, dieses eine Programm aus dem Internet. Zwei Wochen lief es, dann kam das Leben dazwischen und alles war wieder wie vorher. Und jeden Abend sagst du dir: "Ab Montag." Aber Montag kommt nie.'
                    : 'Ci hai provato. Le diete, qualche settimana in palestra, quel programma trovato online. Due settimane andavano, poi la vita si è messa in mezzo e tutto è tornato come prima. E ogni sera ti dici: "Da lunedì." Ma lunedì non arriva mai.'}
                </p>
                <p className="text-ink font-bold text-xl">
                  {language === 'de'
                    ? 'Hör mir gut zu: Du bist nicht faul. Dir hat eine Methode gefehlt. Und jemand, der dich nicht vom Haken lässt.'
                    : 'Ascoltami bene: non sei pigro. Ti è mancato un metodo. E qualcuno che non ti molla.'}
                </p>
                <p>
                  {language === 'de'
                    ? 'Genau das mache ich. Beantworte unten 5 kurze Fragen, und ich zeige dir in einem kostenlosen Gespräch ganz konkret, wie dein Weg aussieht. Kein Verkaufsgespräch. Versprochen.'
                    : "È esattamente quello che faccio io. Rispondi alle 5 domande qui sotto e in una consulenza gratuita ti mostro nero su bianco com'è il tuo percorso. Niente discorso da venditore. Promesso."}
                </p>
              </div>
              <a
                href="#inizia"
                className="inline-flex items-center mt-8 bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider rounded-md"
              >
                {language === 'de' ? 'Ja, das bin ich. Los geht\'s' : 'Sì, sono io. Si parte'} <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard Section — full width, no card */}
      <section id="inizia" className="py-20 sm:py-28 bg-surface border-t border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-gold text-white text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm mb-5">
              {language === 'de' ? '100% kostenlos · 60 Sekunden' : '100% gratis · 60 secondi'}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-ink uppercase">
              {language === 'de' ? 'STARTE' : 'INIZIA'} <span className="text-accent">{language === 'de' ? 'JETZT' : 'ORA'}</span>
            </h2>
          </div>

          <LeadWizard bare />
        </div>
      </section>

      {/* About */}
      <section className="py-20 sm:py-28 bg-surface border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="relative h-[480px] lg:h-[640px] lg:col-span-5">
              <Image
                src="/images/Foto Angelo/angelo-3.jpg"
                alt="Coach Angelo con medaglia WABBA"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute bottom-5 right-5 bg-background/90 border border-gold-deep rounded-md px-5 py-3">
                <div className="text-xl font-black text-gold leading-tight">WABBA</div>
                <div className="text-[11px] text-ink/60 font-medium uppercase tracking-wider">International</div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
                {aboutBadge}
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-ink mb-8 leading-tight uppercase">
                Atleta WABBA
                <br />
                <span className="text-accent">International</span>
              </h2>
              <div className="space-y-6 text-lg text-ink/60 leading-relaxed max-w-prose">
                <p>{aboutText1}</p>
                <p>{aboutText2}</p>
                <p>{aboutText3}</p>
              </div>
              <Link
                href="/chi-sono"
                className="inline-flex items-center mt-8 border border-line text-ink px-7 py-3.5 font-bold uppercase tracking-wider hover:bg-elevated hover:border-ink/40 transition-colors rounded-md"
              >
                {aboutCta} <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services — editorial rows */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-ink uppercase">
              {servicesTitle} <span className="text-accent">{servicesTitleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.num}
                href="/servizi"
                className={`group flex flex-col rounded-xl overflow-hidden border transition-colors ${
                  service.featured ? 'border-gold' : 'border-line hover:border-gold-deep'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {service.featured && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-gold rounded-sm px-2 py-1">
                        {featuredLabel}
                      </span>
                    )}
                    {service.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-background/80 backdrop-blur-sm rounded-sm px-2 py-1">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <h3 className="text-xl font-black text-ink uppercase leading-tight">{service.title}</h3>
                    <span className="text-gold font-black whitespace-nowrap">{service.price}</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-6 bg-surface">
                  <p className="text-ink/60 leading-relaxed text-sm mb-5 flex-1">{service.desc}</p>
                  <span className="inline-flex items-center text-gold font-bold uppercase tracking-wider text-sm">
                    {service.cta} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/servizi"
              className="inline-flex items-center bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-gold-soft transition-colors rounded-md"
            >
              {allServicesCta} <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
              {resultsBadge}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-ink uppercase">
              {resultsTitle} <span className="text-accent">{resultsTitleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="group relative aspect-square rounded-lg overflow-hidden border border-line hover:border-gold-deep transition-colors">
                <Image
                  src={`/images/Testimonianze/before-after-${num}.webp`}
                  alt={language === 'de' ? 'Kundentransformation' : 'Trasformazione cliente'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent pt-10 pb-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-sm font-bold text-ink">{transformationText} #{num}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/testimonianze"
              className="inline-flex items-center border border-line text-ink px-8 py-4 font-bold uppercase tracking-wider hover:bg-elevated hover:border-ink/40 transition-colors rounded-md"
            >
              {allResultsCta} <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recensioni — carosello grande a comparsa, senza titolo */}
      <section className="py-24 sm:py-36 border-t border-line bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <ReviewsCarousel />

          <div className="mt-14 text-center">
            <Link
              href="/testimonianze"
              className="inline-flex items-center text-gold font-bold uppercase tracking-wider text-sm hover:text-gold-soft transition-colors"
            >
              {language === 'de' ? 'Alle Bewertungen lesen' : 'Leggi tutte le recensioni'} <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Offerta irresistibile — sfondo scuro, card bianca */}
      <section className="py-20 sm:py-28 border-t border-line bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-gold text-white text-xs font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-sm mb-5">
              {language === 'de' ? 'Das Coach Angelo Versprechen' : 'La promessa di Coach Angelo'}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-ink uppercase leading-tight mb-5">
              {language === 'de' ? (
                <>Ergebnisse in 90 Tagen<br /><span className="text-accent">oder Geld zurück.</span></>
              ) : (
                <>Risultati in 90 giorni<br /><span className="text-accent">o sei rimborsato.</span></>
              )}
            </h2>
            <p className="text-lg text-ink/60 max-w-2xl mx-auto">
              {language === 'de'
                ? 'Wenn du meinen Plan befolgst und nach 90 Tagen keine sichtbaren Ergebnisse siehst, bekommst du dein Geld zurück. Ohne Diskussion. Das Risiko trage ich, nicht du.'
                : 'Se segui il mio piano e dopo 90 giorni non vedi risultati concreti, ti rimborso. Senza discutere. Il rischio me lo prendo io, non tu.'}
            </p>
          </div>

          <div className="section-paper bg-surface border-2 border-gold rounded-xl p-8 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-8">
              {(language === 'de'
                ? [
                    'Individueller Trainingsplan, gebaut um DEINEN Alltag',
                    'Persönlicher Ernährungsplan, kein Hungern',
                    'Wöchentliche Check-ins, ich lasse dich nicht vom Haken',
                    'Technik-Korrektur per Video oder im Studio',
                    'Direkter Draht zu mir, nicht zu einem Callcenter',
                    'Anpassung bei Plateau, Urlaub oder Verletzung',
                  ]
                : [
                    'Scheda di allenamento costruita sulla TUA vita',
                    'Piano alimentare personale, senza patire la fame',
                    'Check settimanali: non ti mollo mai',
                    'Correzione tecnica via video o in palestra',
                    'Linea diretta con me, non con un call center',
                    'Adattamenti per stalli, vacanze o infortuni',
                  ]
              ).map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-ink/80 leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-line pt-7 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-ink/40 line-through text-xl">€300</span>
                  <span className="text-4xl font-black text-gold">€150</span>
                  <span className="text-ink/60">{language === 'de' ? '/ erster Monat' : '/ primo mese'}</span>
                </div>
                <p className="text-sm text-ink/50 mt-1">
                  {language === 'de'
                    ? '✦ Bonus: Ernährungsplan im Wert von €90 gratis bei Start diese Woche'
                    : '✦ Bonus: piano alimentare del valore di €90 gratis se inizi questa settimana'}
                </p>
              </div>
              <a
                href="#inizia"
                className="w-full sm:w-auto text-center bg-gold text-white px-8 py-4 font-bold uppercase tracking-wider rounded-md whitespace-nowrap"
              >
                {language === 'de' ? 'Platz sichern' : 'Prendi il tuo posto'} <span className="ml-1">→</span>
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-ink/50 mt-6">
            {language === 'de'
              ? 'Ich nehme pro Monat nur eine begrenzte Zahl neuer 1-zu-1 Kunden an, damit jeder die Betreuung bekommt, die er verdient.'
              : 'Ogni mese prendo solo un numero limitato di nuovi clienti 1-to-1, così ognuno riceve il seguito che merita.'}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 sm:py-36 overflow-hidden border-t border-line">
        <div className="absolute inset-0">
          <Image
            src="/images/Foto Angelo/angelo-4.jpg"
            alt="Coach Angelo"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/80 to-background/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-end">
            <div className="max-w-2xl text-right">
              <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-5">
                {ctaBadge}
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-ink mb-6 uppercase">
                {ctaTitle} <span className="text-accent">{ctaTitleHighlight}</span>
              </h2>
              <p className="text-xl text-ink/70 mb-10 leading-relaxed">
                {ctaDesc}
              </p>
              <Link
                href="/contatti"
                className="inline-flex items-center bg-gold text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-gold-soft transition-colors text-lg rounded-md"
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
