"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WHATSAPP_HREF } from "@/lib/contatto";
import { IconaWhatsApp } from "@/components/IconeContatto";

/*
  La pillola WhatsApp in basso a destra (06/11/2026). Regola di Calogero: un
  solo richiamo WhatsApp per sito, piccolo, in basso a destra, che entra
  scorrendo e si chiude con la x; niente altro che galleggia, niente pulsanti
  WhatsApp sparsi in hero, schede e sezioni.

  Bianca con il tondo verde, non verde piena: il bianco su verde WhatsApp non
  si legge (contrasto 2:1). Sta sotto il banner dei cookie e il carrello
  (z-40 contro z-50), cosi' non li copre mai.

  Non c'e' dove si firma o si paga: gestionale, contratti, preventivo,
  pagamento, cassa, e la landing del QR (/start), che e' corta e ha gia' il
  wizard nel primo schermo. LayoutWrapper toglie gia' admin, preventivo e
  pagamento; qui si ripetono per sicurezza.
*/

const SENZA = ["/admin", "/preventivo", "/pagamento", "/contratti", "/checkout", "/start", "/bewerbung", "/lebenslauf"];
const CHIAVE = "fp_whatsapp_chiusa";
// quanto si scorre prima che entri, in px
const SOGLIA = 160;

export default function WhatsAppPill() {
  const pathname = usePathname() || "/";
  const [scorso, setScorso] = useState(false);
  const [chiusa, setChiusa] = useState(false);

  useEffect(() => {
    const aggiorna = () => {
      let giaChiusa = false;
      try {
        giaChiusa = sessionStorage.getItem(CHIAVE) === "1";
      } catch {
        // sessionStorage non disponibile (navigazione privata): resta apribile
      }
      if (giaChiusa) setChiusa(true);
      setScorso(window.scrollY > SOGLIA);
    };
    const primo = requestAnimationFrame(aggiorna);
    window.addEventListener("scroll", aggiorna, { passive: true });
    return () => {
      cancelAnimationFrame(primo);
      window.removeEventListener("scroll", aggiorna);
    };
  }, []);

  if (SENZA.some((r) => pathname === r || pathname.startsWith(r + "/"))) return null;
  if (chiusa) return null;

  const chiudi = () => {
    try {
      sessionStorage.setItem(CHIAVE, "1");
    } catch {
      // vedi sopra
    }
    setChiusa(true);
  };

  return (
    <div
      inert={!scorso}
      className={`fixed bottom-4 right-4 z-40 flex items-center rounded-full border border-black/10 bg-white text-[#121214] shadow-[0_16px_36px_-16px_rgba(18,18,20,0.5)] transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none sm:bottom-6 sm:right-6 ${
        scorso ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Angelo auf WhatsApp schreiben"
        className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-2 text-sm font-bold"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white">
          <IconaWhatsApp className="h-5 w-5" />
        </span>
        WhatsApp
      </a>
      <button
        type="button"
        onClick={chiudi}
        aria-label="WhatsApp-Hinweis schließen"
        className="mr-1.5 flex h-7 w-7 items-center justify-center rounded-full text-[#121214]/45 transition-colors hover:bg-black/5 hover:text-[#121214]"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
