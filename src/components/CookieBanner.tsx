"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CookieBanner() {
  // Era scritto solo in italiano, su un sito che e' in tedesco (13/10/2026).
  const { language } = useLanguage();
  const de = language === "de";
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t border-line shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-ink/80 text-sm text-center sm:text-left">
          <p>
            {de
              ? "Diese Website verwendet Cookies, um dein Nutzungserlebnis zu verbessern."
              : "Questo sito utilizza cookie per migliorare la tua esperienza di navigazione."}{" "}
            <Link href="/cookie" className="text-gold hover:text-gold-soft underline">
              {de ? "Mehr erfahren" : "Scopri di più"}
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={declineCookies}
            className="px-5 py-2 text-sm font-medium text-ink/70 hover:text-ink border border-line rounded-md transition-colors"
          >
            {de ? "Ablehnen" : "Rifiuta"}
          </button>
          <button
            type="button"
            onClick={acceptCookies}
            className="px-5 py-2 text-sm font-medium text-white bg-gold hover:bg-gold-soft rounded-md transition-colors"
          >
            {de ? "Akzeptieren" : "Accetta"}
          </button>
        </div>
      </div>
    </div>
  );
}
