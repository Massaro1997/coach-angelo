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

  const ctaText = language === 'de' ? 'Jetzt Starten' : 'Inizia Ora';
  const deClass = language === 'de' ? 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white' : 'text-white/70 hover:text-white';
  const itClass = language === 'it' ? 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white' : 'text-white/70 hover:text-white';
  const deMobileClass = language === 'de' ? 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white' : 'text-white/70';
  const itMobileClass = language === 'it' ? 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white' : 'text-white/70';
  const cartLabel = language === 'de' ? 'Warenkorb öffnen' : 'Apri carrello';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-bianco.png"
              alt="Angelo Magliarisi Fitness Coaching"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider transition-colors hover:text-fuchsia-400 text-white"
              >
                {t(link.labelKey)}
              </Link>
            ))}

            <div className="flex items-center space-x-1 bg-white/10 rounded-full p-1">
              <button
                type="button"
                onClick={() => setLanguage('de')}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-full transition-all ${deClass}`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLanguage('it')}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-full transition-all ${itClass}`}
              >
                IT
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative text-white hover:text-fuchsia-400 transition-colors"
              aria-label={cartLabel}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              href="/contatti"
              className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 transition-all rounded-full"
            >
              {ctaText}
            </Link>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white/10 rounded-full p-0.5">
              <button
                type="button"
                onClick={() => setLanguage('de')}
                className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${deMobileClass}`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLanguage('it')}
                className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${itMobileClass}`}
              >
                IT
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative text-white hover:text-fuchsia-400 transition-colors p-2"
              aria-label={cartLabel}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-neutral-900 shadow-lg">
            <div className="px-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-4 text-white text-lg font-medium uppercase tracking-wider border-b border-neutral-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <Link
                href="/contatti"
                className="block mt-6 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-6 py-4 text-center font-bold uppercase tracking-wider rounded-full"
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
