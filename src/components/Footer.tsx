"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { stadtteile } from "@/lib/koeln-stadtteile";

export default function Footer() {
  const { language } = useLanguage();

  // Quartieri principali (per popolazione) → link alle pagine reali /koeln/[slug]
  const topStadtteile = [...stadtteile]
    .sort((a, b) => b.einwohner - a.einwohner)
    .slice(0, 24);

  const brandDesc = language === 'de'
    ? 'Personal Trainer in Köln. WABBA International Athlet. Transformiere deinen Körper mit personalisierten Programmen.'
    : 'Personal Trainer a Colonia. Atleta WABBA International. Trasforma il tuo corpo con programmi personalizzati.';

  const pagesTitle = language === 'de' ? 'Seiten' : 'Pagine';
  const servicesTitle = language === 'de' ? 'Leistungen' : 'Servizi';
  const contactTitle = language === 'de' ? 'Kontakt' : 'Contatti';

  const pages = language === 'de' ? [
    { href: "/", label: "Home" },
    { href: "/chi-sono", label: "Über Mich" },
    { href: "/servizi", label: "Leistungen" },
    { href: "/testimonianze", label: "Ergebnisse" },
    { href: "/contatti", label: "Kontakt" },
  ] : [
    { href: "/", label: "Home" },
    { href: "/chi-sono", label: "Chi Sono" },
    { href: "/servizi", label: "Servizi" },
    { href: "/testimonianze", label: "Risultati" },
    { href: "/contatti", label: "Contatti" },
  ];

  const services = language === 'de' ? [
    { href: "/servizi", label: "Fertige Trainingspläne" },
    { href: "/servizi", label: "Personalisierte Pläne" },
    { href: "/servizi", label: "Personal Training" },
    { href: "/servizi#percorso", label: "Coaching-Pakete" },
    { href: "/personal-trainer-koeln", label: "Personal Trainer Köln" },
    { href: "/fitness-faq", label: "Fitness FAQ" },
    { href: "/blog", label: "Fitness Blog" },
  ] : [
    { href: "/servizi", label: "Schede Pronte" },
    { href: "/servizi", label: "Schede Personalizzate" },
    { href: "/servizi", label: "Personal Training" },
    { href: "/servizi#percorso", label: "Percorso Personalizzato" },
    { href: "/personal-trainer-koeln", label: "Personal Trainer Köln" },
    { href: "/blog", label: "Fitness Blog" },
  ];

  const location = language === 'de' ? 'Köln, Deutschland' : 'Colonia, Germania';
  const ctaFooter = language === 'de' ? 'Kostenlose Beratung anfragen' : 'Richiedi consulenza gratuita';
  const termsLink = language === 'de' ? 'AGB' : 'Termini e Condizioni';
  const privacyLink = language === 'de' ? 'Datenschutz' : 'Privacy Policy';
  const cookieLink = language === 'de' ? 'Cookie-Richtlinie' : 'Cookie Policy';
  const rightsText = language === 'de' ? 'Alle Rechte vorbehalten.' : 'Tutti i diritti riservati.';
  const madeBy = language === 'de' ? 'Website erstellt von' : 'Sito realizzato da';

  return (
    <footer className="bg-background border-t border-line text-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-6">
              <Image
                src="/logo-bianco.png"
                alt="Coach Angelo"
                width={180}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-ink/60 mb-6">{brandDesc}</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/angelo_fitnesscoach" target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-line rounded-md flex items-center justify-center text-ink/70 hover:text-gold hover:border-gold-deep transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@angelo.fitnesscoach" target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-line rounded-md flex items-center justify-center text-ink/70 hover:text-gold hover:border-gold-deep transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6">{pagesTitle}</h4>
            <ul className="space-y-4">
              {pages.map((page) => (
                <li key={page.href + page.label}>
                  <Link href={page.href} className="text-ink/60 hover:text-gold transition-colors">{page.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6">{servicesTitle}</h4>
            <ul className="space-y-4">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link href={service.href} className="text-ink/60 hover:text-gold transition-colors">{service.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6">{contactTitle}</h4>
            <ul className="space-y-4 text-ink/60 mb-6">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{location}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>magliarisiangelo912@gmail.com</span>
              </li>
            </ul>
            <Link
              href="/contatti"
              className="inline-block bg-gold text-white px-5 py-3 text-sm font-bold uppercase tracking-wider rounded-md hover:bg-gold-soft transition-colors"
            >
              {ctaFooter}
            </Link>
          </div>
        </div>

        {/* Fascia quartieri — link reali alle pagine Stadtteil (collassabile) */}
        <details className="mt-12 border-t border-line pt-8 group">
          <summary className="cursor-pointer list-none flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-gold">
            <span>{language === 'de' ? 'Personal Trainer in deinem Stadtteil' : 'Personal Trainer nel tuo quartiere'}</span>
            <span className="text-ink/40 group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {topStadtteile.map((st) => (
              <Link
                key={st.slug}
                href={`/koeln/${st.slug}`}
                className="text-sm text-ink/50 hover:text-gold transition-colors"
              >
                Personal Trainer Köln-{st.name}
              </Link>
            ))}
            <Link href="/personal-trainer-koeln" className="text-sm text-gold hover:text-gold-soft transition-colors font-semibold">
              {language === 'de' ? 'Alle 86 Stadtteile →' : 'Tutti gli 86 quartieri →'}
            </Link>
          </div>
        </details>
      </div>

      {/* Legal Links */}
      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-ink/40">
            <Link href="/termini" className="hover:text-gold transition-colors">{termsLink}</Link>
            <Link href="/privacy" className="hover:text-gold transition-colors">{privacyLink}</Link>
            <Link href="/cookie" className="hover:text-gold transition-colors">{cookieLink}</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-ink/40">
            <p>&copy; {new Date().getFullYear()} Coach Angelo. {rightsText}</p>
            <p className="mt-2 md:mt-0">
              {madeBy}{" "}
              <a href="https://massaromarketer.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-soft transition-colors">Massaromarketer.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
