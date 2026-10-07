"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

// Testata, tema FITPRIMO (03/10/2026): barra bianca sul modello Trainex.
// Logo a sinistra, voci al centro, pulsante a destra. Sta nel tema chiaro
// (.fp) anche sulle pagine interne ancora scure: una barra bianca sopra una
// pagina scura si legge, il contrario no.
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  // Chiesto da Calogero il 03/10: sulla home, finche' si e' sopra l'hero, la
  // barra e' trasparente e il fondo dell'hero le passa sotto. Appena si
  // scorre torna bianca. Sulle pagine interne resta sempre bianca: sono ancora
  // scure e il logo scuro non si leggerebbe.
  const pathname = usePathname();
  const trasparente = pathname === "/" && !isScrolled && !isMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", labelKey: "nav.home" },
    { href: "/chi-sono", labelKey: "nav.about" },
    { href: "/servizi", labelKey: "nav.services" },
    // "Bewertungen" non c'e' piu' (Calogero, 04/10): la pagina e' stata tolta,
    // recensioni e trasformazioni stanno in fondo a ogni pagina.
    // "Kontakt" non c'e' piu' (Calogero, 04/10): accanto c'e' gia' il pulsante
    // della consulenza, che porta alla stessa pagina. Due voci per la stessa
    // cosa non hanno senso.
  ];

  const ctaText = language === 'de' ? 'Kostenlose Beratung' : 'Consulenza Gratuita';

  // Selettore della lingua: una pillola a due posizioni, quella attiva piena.
  // Prima erano due sigle separate da una barra, che non sembravano un comando.
  const lingue = (
    <div
      role="group"
      aria-label={language === 'de' ? 'Sprache' : 'Lingua'}
      className="inline-flex items-center rounded-full border border-ink/15 bg-white/70 p-0.5"
    >
      {(['de', 'it'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLanguage(l)}
          aria-pressed={language === l}
          className={`min-h-8 rounded-full px-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            language === l ? 'bg-[#121214] text-white' : 'text-ink/55 hover:text-ink'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  // Il carrello non sta piu' nella barra (Calogero, 04/10): il sito e' tornato
  // a raccogliere contatti, non a vendere dal carrello. Il carrello in se'
  // esiste ancora (CartSidebar) e si apre da solo se nella pagina servizi
  // qualcuno aggiunge una scheda.

  return (
    <header
      className={`fp fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        trasparente
          ? '!bg-transparent border-b border-transparent py-4'
          : isScrolled
            ? '!bg-white/95 backdrop-blur-sm border-b border-line shadow-[0_10px_30px_-22px_rgba(18,18,20,0.5)] py-2.5'
            : '!bg-white border-b border-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="FITPRIMO, Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/fitprimo/fitprimo-logo-colore.svg"
              alt="FITPRIMO"
              width={226}
              height={40}
              className="h-8 w-auto sm:h-9 lg:h-10"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/75 hover:text-gold transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            {lingue}
            {/* bordo e testo rossi (Calogero, 04/10); al passaggio si riempie */}
            <Link
              href="/contatti"
              className="fp-btn-linea !border-gold !bg-transparent !px-5 !py-2.5 !text-xs !text-gold hover:!bg-gold hover:!text-white"
            >
              {ctaText}
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {lingue}
            <button
              type="button"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-line shadow-2xl">
            <div className="px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-4 text-ink text-base font-semibold uppercase tracking-[0.12em] border-b border-line"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <Link
                href="/contatti"
                className="fp-btn mt-6 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {ctaText} →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
