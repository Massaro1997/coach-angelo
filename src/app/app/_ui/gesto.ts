// Scorrimento laterale col dito (giorno prima/dopo, mese prima/dopo). Solo un
// gesto deciso e orizzontale: lo scorrimento in verticale delle liste non deve
// mai cambiare giorno per sbaglio.

import { useRef, type TouchEvent } from "react";

const SOGLIA = 60; // px in orizzontale
const DURATA_MAX = 700; // ms: oltre e' un trascinare lento, non un gesto
/** Vicino ai bordi partono i gesti del telefono (indietro di Safari/Android). */
const BORDO = 24;

type Inizio = { x: number; y: number; t: number };

/**
 * Restituisce i gestori da mettere sulla zona: `avanti` quando il dito va verso
 * sinistra (arriva quello dopo, da destra), `indietro` quando va verso destra.
 */
export function useScorrimentoLaterale(avanti: () => void, indietro: () => void) {
  const inizio = useRef<Inizio | null>(null);

  return {
    onTouchStart(e: TouchEvent) {
      const p = e.touches[0];
      const larghezza = e.currentTarget.ownerDocument.documentElement.clientWidth;
      inizio.current =
        e.touches.length === 1 && p.clientX > BORDO && p.clientX < larghezza - BORDO
          ? { x: p.clientX, y: p.clientY, t: e.timeStamp }
          : null;
    },
    onTouchEnd(e: TouchEvent) {
      const s = inizio.current;
      inizio.current = null;
      const p = e.changedTouches[0];
      if (!s || !p) return;
      const dx = p.clientX - s.x;
      const dy = p.clientY - s.y;
      if (Math.abs(dx) < SOGLIA || Math.abs(dx) < Math.abs(dy) * 2 || e.timeStamp - s.t > DURATA_MAX) return;
      if (dx < 0) avanti();
      else indietro();
    },
    onTouchCancel() {
      inizio.current = null;
    },
  };
}
