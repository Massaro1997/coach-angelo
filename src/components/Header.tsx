"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", labelKey: "nav.home" },
    { href: "/chi-sono", labelKey: "nav.about" },
    { href: "/servizi", labelKey: "nav.services" },
    { href: "/testimonianze", labelKey: "nav.testimonials" },
    { href: "/contatti", labelKey: "nav.contact" },
  ];

  const ctaText = language === 'de' ? 'Kostenlose Beratung' : 'Consulenza Gratuita';
  const langBtn = (active: boolean) =>
    `px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
      active ? 'text-gold' : 'text-ink/50 hover:text-ink'
    }`;
  const cartLabel = language === 'de' ? 'Warenkorb öffnen' : 'Apri carrello';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-line py-3' : 'bg-transparent py-5'}`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-bianco.png"
              alt="Angelo Magliarisi Fitness Coaching"
              width={180}
              height={60}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-ink/80 hover:text-gold transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            ))}

            <div className="flex items-center border-l border-line pl-6">
              <button
                type="button"
                onClick={() => setLanguage('de')}
                className={langBtn(language === 'de')}
              >
                DE
              </button>
              <span className="text-ink/20">/</span>
              <button
                type="button"
                onClick={() => setLanguage('it')}
                className={langBtn(language === 'it')}
              >
                IT
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative text-ink/80 hover:text-gold transition-colors"
              aria-label={cartLabel}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              href="/contatti"
              className="bg-gold text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-gold-soft transition-colors rounded-md"
            >
              {ctaText}
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setLanguage('de')}
                className={langBtn(language === 'de')}
              >
                DE
              </button>
              <span className="text-ink/20">/</span>
              <button
                type="button"
                onClick={() => setLanguage('it')}
                className={langBtn(language === 'it')}
              >
                IT
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative text-ink/80 hover:text-gold transition-colors p-2"
              aria-label={cartLabel}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-line shadow-2xl">
            <div className="px-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-4 text-ink text-lg font-medium uppercase tracking-wider border-b border-line"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <Link
                href="/contatti"
                className="block mt-6 bg-gold text-white px-6 py-4 text-center font-bold uppercase tracking-wider rounded-md hover:bg-gold-soft transition-colors"
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
