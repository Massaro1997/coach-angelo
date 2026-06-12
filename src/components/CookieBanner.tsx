"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
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
            Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.{" "}
            <Link href="/cookie" className="text-gold hover:text-gold-soft underline">
              Scopri di più
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={declineCookies}
            className="px-5 py-2 text-sm font-medium text-ink/70 hover:text-ink border border-line rounded-md transition-colors"
          >
            Rifiuta
          </button>
          <button
            type="button"
            onClick={acceptCookies}
            className="px-5 py-2 text-sm font-medium text-white bg-gold hover:bg-gold-soft rounded-md transition-colors"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
