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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-neutral-900 border-t border-neutral-700 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white/80 text-sm text-center sm:text-left">
          <p>
            Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.{" "}
            <Link href="/cookie" className="text-fuchsia-400 hover:text-fuchsia-300 underline">
              Scopri di più
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white border border-neutral-600 rounded-full transition-colors"
          >
            Rifiuta
          </button>
          <button
            onClick={acceptCookies}
            className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 hover:from-pink-400 hover:via-fuchsia-400 hover:to-violet-400 rounded-full transition-all"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
