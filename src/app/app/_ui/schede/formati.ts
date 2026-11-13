// Formati di date e numeri per le schede Fortschritt, Shop e Coach.
// Due tipi di data arrivano dalle API: giorni di calendario ("2026-11-19",
// gia' a Colonia: si formattano in UTC cosi' il fuso non li sposta) e istanti
// ISO completi (messaggi, rate: si mostrano nell'ora di Colonia).

import type { DataISO } from "@/lib/app-coaching/tipi";
import { oggiISO } from "@/lib/app-coaching/date";

type Lingua = "de" | "it";

const LOCALE: Record<Lingua, string> = { de: "de-DE", it: "it-IT" };
const FUSO = "Europe/Berlin";
const SOLO_GIORNO = /^\d{4}-\d{2}-\d{2}$/;

function comeData(s: string): { data: Date; timeZone: string } {
  if (SOLO_GIORNO.test(s)) {
    const [y, m, d] = s.split("-").map(Number);
    return { data: new Date(Date.UTC(y, m - 1, d)), timeZone: "UTC" };
  }
  return { data: new Date(s), timeZone: FUSO };
}

export function formattaData(s: string, lingua: Lingua, opzioni: Intl.DateTimeFormatOptions): string {
  const { data, timeZone } = comeData(s);
  if (Number.isNaN(data.getTime())) return s;
  return new Intl.DateTimeFormat(LOCALE[lingua], { timeZone, ...opzioni }).format(data);
}

export function maiuscola(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** 01.09.2026 */
export const dataCompleta = (s: string, l: Lingua) =>
  formattaData(s, l, { day: "2-digit", month: "2-digit", year: "numeric" });

/** 12.10. / 12/10: sotto i grafici */
export const dataBreve = (s: string, l: Lingua) => formattaData(s, l, { day: "numeric", month: "numeric" });

/** Mi., 19. Nov. / Mer 19 nov */
export const giornoBreve = (s: string, l: Lingua) =>
  maiuscola(formattaData(s, l, { weekday: "short", day: "numeric", month: "short" }));

/** Mittwoch, 19. November / Mercoledì 19 novembre */
export const giornoLungo = (s: string, l: Lingua) =>
  maiuscola(formattaData(s, l, { weekday: "long", day: "numeric", month: "long" }));

/** 17.–23. Nov. / 17–23 nov: la settimana nella scelta del giorno */
export function intervallo(da: DataISO, a: DataISO, l: Lingua): string {
  const f = new Intl.DateTimeFormat(LOCALE[l], { timeZone: "UTC", day: "numeric", month: "short" });
  return f.formatRange(comeData(da).data, comeData(a).data);
}

/** 07:12, ora di Colonia */
export const orario = (iso: string, l: Lingua) => formattaData(iso, l, { hour: "2-digit", minute: "2-digit" });

/** Il giorno di calendario (a Colonia) di un istante ISO. */
export function giornoDi(iso: string): DataISO {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso.slice(0, 10) : oggiISO(d);
}

/** 82,4 */
export function numero(n: number, l: Lingua, decimali = 1): string {
  return new Intl.NumberFormat(LOCALE[l], { maximumFractionDigits: decimali }).format(n);
}

/** 0.82 -> "82 %" (de) / "82%" (it) */
export function percentuale(quota: number, l: Lingua): string {
  return new Intl.NumberFormat(LOCALE[l], { style: "percent", maximumFractionDigits: 0 }).format(quota);
}

/** Differenza con segno vero (−3,1 / +0,5): il trattino corto si perde nei numeri. */
export function differenza(n: number, l: Lingua, decimali = 1): string {
  const arrotondato = Math.round(n * 10 ** decimali) / 10 ** decimali;
  if (arrotondato === 0) return numero(0, l, decimali);
  return `${arrotondato > 0 ? "+" : "−"}${numero(Math.abs(arrotondato), l, decimali)}`;
}

/** "82,4" o "82.4" -> 82.4; vuoto -> null; testo non numerico -> NaN. */
export function leggiNumero(s: string): number | null {
  const t = s.trim().replace(",", ".");
  if (t === "") return null;
  return /^\d{1,3}(\.\d{1,2})?$/.test(t) ? Number(t) : NaN;
}
