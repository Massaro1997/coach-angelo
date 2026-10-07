"use client";

import { useId } from "react";

// Il simbolo AM del logo FITPRIMO, da usare come iconografia nel sito:
// filigrana dietro le foto, angolo delle schede, fondo dei pannelli.
// E' lo stesso tracciato di brand/logo/fitprimo (simbolo techDodici).
// Colore: currentColor, quindi si governa con le classi text-*.

export const SIMBOLO_W = 158.8;
const D =
  "M2.5 100.0Q0.0 100.0 1.4 97.9L62.8 6.6Q67.3 0.0 75.3 0.0L76.8 0.0Q84.8 0.0 86.8 7.7L97.6 49.5Q98.6 53.4 101.1 50.2L136.2 6.3Q141.2 0.0 149.2 0.0L150.8 0.0Q158.8 0.0 157.1 7.8L138.0 97.6Q137.5 100.0 135.0 100.0L123.4 100.0Q120.9 100.0 121.4 97.6L135.3 32.3Q135.9 29.3 134.1 31.7L94.2 84.2Q90.6 88.9 88.8 83.2L72.0 27.4Q70.8 23.6 68.6 26.9L20.7 97.9Q19.3 100.0 16.8 100.0ZM50.2 63.1Q51.6 61.1 54.1 61.1L68.0 61.1Q70.5 61.1 71.2 63.5L74.4 76.0Q75.0 78.4 72.5 78.4L42.4 78.4Q39.9 78.4 41.3 76.3Z";

export default function SimboloAM({
  className = "",
  sfumato = false,
  contorno = false,
  velato = false,
}: {
  className?: string;
  /** rosso in trasparenza, che svanisce verso il basso: la filigrana delle
   *  schede di Trainex */
  velato?: boolean;
  /** riempito con la sfumatura rossa del marchio */
  sfumato?: boolean;
  /** solo il bordo, sottile: la versione "disegnata" di Trainex */
  contorno?: boolean;
}) {
  const gid = useId();
  return (
    <svg viewBox={`0 0 ${SIMBOLO_W} 100`} className={className} aria-hidden>
      {sfumato && (
        <defs>
          <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={SIMBOLO_W} y2="100">
            <stop offset="0" stopColor="#ff2b3a" />
            <stop offset="1" stopColor="#c1000f" />
          </linearGradient>
        </defs>
      )}
      {velato && (
        <defs>
          <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">
            <stop offset="0" stopColor="#e30613" stopOpacity="0.17" />
            <stop offset="1" stopColor="#e30613" stopOpacity="0.03" />
          </linearGradient>
        </defs>
      )}
      <path
        d={D}
        fill={contorno ? "none" : sfumato || velato ? `url(#${gid})` : "currentColor"}
        stroke={contorno ? "currentColor" : "none"}
        strokeWidth={contorno ? 0.6 : 0}
      />
    </svg>
  );
}
