"use client";

// Foglio che sale dal basso (bottom sheet), come nelle app. Copre la parte di
// schermo che si vede (sopra la tastiera, vedi Guscio); si chiude toccando il
// fondo scuro, con la X, con Esc o tirandolo giu' dalla maniglia. Se il
// contenuto e' piu' alto dello schermo scorre dentro il foglio, non la pagina:
// e' l'unica zona che scorre oltre a #app-scroll di AppShell.
// Si disegna dentro il Guscio ([data-app]) con un portale: cosi' nessun
// genitore animato (il giorno che entra di lato ha un transform) lo puo'
// spostare o tagliare, e restano le variabili della tastiera.

import { useEffect, useEffectEvent, useId, useRef, type ReactNode, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { SOVRAPPOSTO, useTesti } from "./comuni";

/** px verso il basso per chiudere tirando la maniglia */
const TIRO_CHIUDE = 60;

const ferma = (e: TouchEvent) => e.stopPropagation();

export default function Foglio({
  titolo,
  onChiudi,
  children,
}: {
  titolo: string;
  onChiudi: () => void;
  children: ReactNode;
}) {
  const t = useTesti();
  const id = useId();
  const pannello = useRef<HTMLDivElement>(null);
  const tiro = useRef<number | null>(null);
  const chiudiDaTastiera = useEffectEvent(() => onChiudi());

  useEffect(() => {
    // il fuoco va nel foglio (senza aprire la tastiera) e torna dov'era dopo
    const prima = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    pannello.current?.focus({ preventScroll: true });
    const tasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") chiudiDaTastiera();
    };
    document.addEventListener("keydown", tasto);
    return () => {
      document.removeEventListener("keydown", tasto);
      prima?.focus({ preventScroll: true });
    };
  }, []);

  function inizioTiro(e: TouchEvent) {
    tiro.current = e.touches.length === 1 ? e.touches[0].clientY : null;
  }

  function fineTiro(e: TouchEvent) {
    const y = tiro.current;
    tiro.current = null;
    const p = e.changedTouches[0];
    if (y !== null && p && p.clientY - y > TIRO_CHIUDE) onChiudi();
  }

  const foglio = (
    // i tocchi nel foglio non arrivano alla schermata sotto: nell'albero di
    // React il foglio puo' stare dentro la zona dove il dito di lato cambia giorno
    <div
      className={`${SOVRAPPOSTO} z-50 flex flex-col justify-end`}
      onTouchStart={ferma}
      onTouchEnd={ferma}
      onTouchCancel={ferma}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label={t.chiudi}
        onClick={onChiudi}
        className="absolute inset-0 animate-[app-appare_180ms_ease-out] bg-black/40"
      />
      <div
        ref={pannello}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        tabIndex={-1}
        className="relative mx-auto flex max-h-[calc(100%_-_max(2.5rem,_env(safe-area-inset-top)_+_0.75rem))] w-full max-w-xl animate-[app-sale_220ms_cubic-bezier(0.2,0.8,0.2,1)] flex-col rounded-t-3xl bg-white shadow-2xl outline-none"
      >
        {/* maniglia e titolo: da qui si tira giu' per chiudere */}
        <div
          className="shrink-0 touch-none"
          onTouchStart={inizioTiro}
          onTouchEnd={fineTiro}
          onTouchCancel={() => {
            tiro.current = null;
          }}
        >
          <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-neutral-300" aria-hidden />
          <div className="flex items-center justify-between gap-3 pb-1 pl-5 pr-2">
            <h2 id={id} className="min-w-0 truncate text-xl font-bold">
              {titolo}
            </h2>
            <button
              type="button"
              onClick={onChiudi}
              aria-label={t.chiudi}
              className="grid size-11 shrink-0 place-items-center rounded-full text-neutral-500 active:bg-neutral-100"
            >
              <IoClose className="size-6" aria-hidden />
            </button>
          </div>
        </div>
        {/* niente flex-1: il foglio e' alto quanto il contenuto, fino al tetto max-h */}
        <div className="min-h-0 overflow-y-auto overscroll-y-contain px-5 pt-2 pb-[max(1.25rem,var(--app-sotto,env(safe-area-inset-bottom)))]">
          {children}
        </div>
      </div>
    </div>
  );

  // si apre sempre dopo un tocco, mai sul server: document c'e'
  const guscio = typeof document === "undefined" ? null : document.querySelector<HTMLElement>("[data-app]");
  return guscio ? createPortal(foglio, guscio) : foglio;
}
