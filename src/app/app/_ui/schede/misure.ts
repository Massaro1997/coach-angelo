// Le misure del corpo: campi, unita' e limiti, condivisi tra la scheda
// Fortschritt e il foglio "Messen".

import type { Misura } from "@/lib/app-coaching/tipi-v2";

export type CampoMisura = "peso" | "vita" | "fianchi" | "petto" | "braccio" | "coscia" | "grasso";

export const CIRCONFERENZE: CampoMisura[] = ["vita", "fianchi", "petto", "braccio", "coscia"];
export const CAMPI_MISURA: CampoMisura[] = ["peso", "grasso", ...CIRCONFERENZE];

export function unitaDi(c: CampoMisura): string {
  return c === "peso" ? "kg" : c === "grasso" ? "%" : "cm";
}

/** Fuori da qui e' un errore di battitura (82 scritto 820), non una misura. */
export const LIMITI: Record<CampoMisura, [number, number]> = {
  peso: [25, 350],
  grasso: [2, 75],
  vita: [30, 250],
  fianchi: [30, 250],
  petto: [30, 250],
  braccio: [10, 100],
  coscia: [20, 150],
};

/** Primo e ultimo valore di un campo (misure dalla piu' vecchia). */
export function estremi(misure: Misura[], c: CampoMisura): { primo: number; ultimo: number; quante: number } | null {
  const valori = misure.map((m) => m[c]).filter((v): v is number => v != null);
  if (!valori.length) return null;
  return { primo: valori[0], ultimo: valori[valori.length - 1], quante: valori.length };
}
