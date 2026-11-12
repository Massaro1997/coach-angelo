"use client";

// Il guscio dell'app: una schermata sola, alta esattamente quanto lo schermo,
// come un'app vera. La pagina non scorre mai; scorrono solo le zone che lo
// dichiarano (lista esercizi, pasti, fogli dal basso).
//
// Di solito l'altezza e' 100dvh. Con la tastiera aperta (su iPhone la pagina
// non si accorcia: la tastiera ci finisce sopra) il guscio segue la parte
// visibile dello schermo (visualViewport): campo del codice e foglio della
// risposta restano sopra la tastiera invece di finirci sotto. Le variabili
// --app-alto, --app-su e --app-sotto le leggono anche i fogli (SOVRAPPOSTO).

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Quanto si deve accorciare lo schermo perche' sia la tastiera e non altro. */
const SOGLIA_TASTIERA = 150;

export default function Guscio({ style, children }: { style: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const vv = window.visualViewport;
    if (!el || !vv) return;

    let raf = 0;
    let larghezza = 0;
    let piena = 0;
    let aperta = false;

    const azzera = () => {
      if (!aperta) return;
      aperta = false;
      el.style.removeProperty("--app-alto");
      el.style.removeProperty("--app-su");
      el.style.removeProperty("--app-sotto");
      delete el.dataset.tastiera;
      // iPhone: chiusa la tastiera a volte la finestra resta spostata in su
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    const misura = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // girato il telefono: l'altezza piena si rimisura
        if (Math.abs(vv.width - larghezza) > 1 && vv.scale <= 1.01) {
          larghezza = vv.width;
          piena = 0;
        }
        // zoom con due dita: la pagina resta com'e', la si guarda solo da vicino
        if (vv.scale > 1.01) return azzera();
        piena = Math.max(piena, vv.height, window.innerHeight);
        const attivo = document.activeElement;
        const campo =
          attivo instanceof HTMLElement &&
          attivo.matches("input:not([type=checkbox]):not([type=radio]), textarea, select, [contenteditable]");
        if (!campo || piena - vv.height < SOGLIA_TASTIERA) return azzera();

        el.style.setProperty("--app-alto", `${vv.height}px`);
        el.style.setProperty("--app-su", `${vv.offsetTop}px`);
        // la barra del tasto Home sta sotto la tastiera: niente margine in piu'
        el.style.setProperty("--app-sotto", "0px");
        el.dataset.tastiera = "";
        if (!aperta) {
          aperta = true;
          // la zona si e' accorciata: il campo torna in vista dentro la sua zona
          requestAnimationFrame(() => attivo.scrollIntoView({ block: "nearest" }));
        }
      });
    };

    misura();
    vv.addEventListener("resize", misura);
    vv.addEventListener("scroll", misura);
    document.addEventListener("focusin", misura);
    document.addEventListener("focusout", misura);
    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener("resize", misura);
      vv.removeEventListener("scroll", misura);
      document.removeEventListener("focusin", misura);
      document.removeEventListener("focusout", misura);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-app=""
      className="fixed inset-x-0 top-[var(--app-su,0px)] flex h-[var(--app-alto,100dvh)] flex-col overflow-hidden text-[17px] leading-normal antialiased"
      style={style}
    >
      {children}
    </div>
  );
}
