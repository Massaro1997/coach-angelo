"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { stadtteile } from "@/lib/koeln-stadtteile";
import { chiusuraPagina, temaChiaro } from "@/lib/chiusura-pagina";

export default function Footer() {
  const { language } = useLanguage();
  // Dietro gli angoli tondi in alto si vede il colore dell'ultima fascia della
  // pagina: bianco ovunque (recensioni, chiamata, testi legali), scuro solo
  // sotto le pagine dei contratti, che sono rimaste scure.
  const pathname = usePathname();
  // Dove la pagina finisce con la chiamata con Angelo, il pie' di pagina le
  // sale sopra di quanto sono alti i suoi angoli tondi: dietro gli angoli si
  // vede la banda rossa e Angelo sembra uscire da qui (Calogero, 04/10).
  const sopraChiamata = !!chiusuraPagina(pathname)?.chiamata;
  const fondoSopra = sopraChiamata ? "transparent" : temaChiaro(pathname) ? "#ffffff" : "#121214";

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
    { href: "/contatti", label: "Kontakt" },
  ] : [
    { href: "/", label: "Home" },
    { href: "/chi-sono", label: "Chi Sono" },
    { href: "/servizi", label: "Servizi" },
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

  const voce = "inline-block text-white/60 transition-all duration-200 hover:translate-x-1 hover:text-white";
  const social =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-[#e30613] hover:bg-[#e30613] hover:text-white";
  const titolo = "mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-white";

  return (
    /*
      Piè di pagina, tema FITPRIMO (04/10/2026).

      Terza versione. La fascia grigia piatta era povera ("un effetto e una
      forma migliore"), la scheda bianca che galleggiava sul nero con i
      blocchi inclinati era troppo ("fa schifo, fallo più professionale").
      Questa è sobria: fondo scuro pieno, colonne pulite, logo in versione su
      scuro. La forma sta solo negli angoli alti arrotondati, l'effetto in un
      filo rosso in cima e in un alone leggero. Niente scheda, niente blocchi.
    */
    <footer
      className={sopraChiamata ? "relative z-20 -mt-8 sm:-mt-11" : undefined}
      style={{ backgroundColor: fondoSopra }}
    >
      <div className="relative overflow-hidden rounded-t-[32px] bg-[#121214] text-white sm:rounded-t-[44px]">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e30613] to-transparent" />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-[#e30613]/[0.12] blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8 lg:pt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
            {/* Brand */}
            <div>
              <Link href="/" className="mb-6 block" aria-label="FITPRIMO, Home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/fitprimo/fitprimo-logo-su-scuro.svg"
                  alt="FITPRIMO"
                  width={226}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="mb-7 max-w-xs leading-relaxed text-white/60">{brandDesc}</p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/am_fitprimo" target="_blank" rel="noopener noreferrer" className={social} aria-label="Instagram">
                  <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@am_fitprimo" target="_blank" rel="noopener noreferrer" className={social} aria-label="TikTok">
                  <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={titolo}>{pagesTitle}</h4>
              <ul className="space-y-3.5">
                {pages.map((page) => (
                  <li key={page.href + page.label}>
                    <Link href={page.href} className={voce}>{page.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className={titolo}>{servicesTitle}</h4>
              <ul className="space-y-3.5">
                {services.map((service, idx) => (
                  <li key={idx}>
                    <Link href={service.href} className={voce}>{service.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className={titolo}>{contactTitle}</h4>
              <ul className="mb-7 space-y-3.5 text-white/60">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ff2b3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>{location}</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ff2b3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:magliarisiangelo912@gmail.com" className="break-all transition-colors hover:text-white">magliarisiangelo912@gmail.com</a>
                </li>
              </ul>
              <Link href="/contatti" className="fp-btn">
                {ctaFooter}
              </Link>
            </div>
          </div>

          {/* Fascia quartieri: link reali alle pagine Stadtteil (collassabile) */}
          <details className="group mt-14 border-t border-white/10 pt-7">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white">
              <span>{language === 'de' ? 'Personal Trainer in deinem Stadtteil' : 'Personal Trainer nel tuo quartiere'}</span>
              <span className="text-white/40 transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {topStadtteile.map((st) => (
                <Link
                  key={st.slug}
                  href={`/koeln/${st.slug}`}
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Personal Trainer Köln-{st.name}
                </Link>
              ))}
              <Link href="/personal-trainer-koeln" className="text-sm font-semibold text-[#ff2b3a] transition-colors hover:text-white">
                {language === 'de' ? 'Alle 86 Stadtteile →' : 'Tutti gli 86 quartieri →'}
              </Link>
            </div>
          </details>

          {/* Riga in fondo: diritti, pagine legali, firma */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-sm text-white/45 lg:flex-row">
            <p>&copy; {new Date().getFullYear()} Coach Angelo. {rightsText}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/termini" className="transition-colors hover:text-white">{termsLink}</Link>
              <Link href="/privacy" className="transition-colors hover:text-white">{privacyLink}</Link>
              <Link href="/cookie" className="transition-colors hover:text-white">{cookieLink}</Link>
            </div>
            <p>
              {madeBy}{" "}
              <a href="https://www.direzionex.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/80 transition-colors hover:text-white">DirezioneX</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
