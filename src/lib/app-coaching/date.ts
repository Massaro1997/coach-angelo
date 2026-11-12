// Date dell'app clienti: si ragiona in giorni di calendario a Colonia, come
// testo "YYYY-MM-DD". Funzioni pure, usabili sia sul server sia nel browser.

import type { DataISO, MeseISO } from "./tipi";

const FUSO = "Europe/Berlin";

/** Oggi a Colonia. */
export function oggiISO(ora: Date = new Date()): DataISO {
  // en-CA formatta gia' come YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(ora);
}

export const RE_DATA = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export const RE_MESE = /^\d{4}-(0[1-9]|1[0-2])$/;

export function dataValida(s: unknown): s is DataISO {
  if (typeof s !== "string" || !RE_DATA.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export function meseValido(s: unknown): s is MeseISO {
  return typeof s === "string" && RE_MESE.test(s);
}

/** Aritmetica sui giorni in UTC: niente sorprese col cambio dell'ora. */
export function aggiungiGiorni(data: DataISO, n: number): DataISO {
  const [y, m, d] = data.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

export function giorniTra(da: DataISO, a: DataISO): number {
  const t = (s: DataISO) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((t(a) - t(da)) / 86_400_000);
}

/** Primo e ultimo giorno del mese. */
export function limitiMese(mese: MeseISO): { primo: DataISO; ultimo: DataISO } {
  const [y, m] = mese.split("-").map(Number);
  const ultimoGiorno = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return {
    primo: `${mese}-01`,
    ultimo: `${mese}-${String(ultimoGiorno).padStart(2, "0")}`,
  };
}

export function meseDi(data: DataISO): MeseISO {
  return data.slice(0, 7);
}

export function spostaMese(mese: MeseISO, n: number): MeseISO {
  const [y, m] = mese.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1 + n, 1));
  return dt.toISOString().slice(0, 7);
}

/** Giorno della settimana, 0 = lunedi' ... 6 = domenica. */
export function giornoSettimana(data: DataISO): number {
  const [y, m, d] = data.split("-").map(Number);
  return (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7;
}

/** Le celle del calendario del mese: settimane da lunedi', null fuori mese. */
export function grigliaMese(mese: MeseISO): (DataISO | null)[][] {
  const { primo, ultimo } = limitiMese(mese);
  const celle: (DataISO | null)[] = Array(giornoSettimana(primo)).fill(null);
  for (let d = primo; d <= ultimo; d = aggiungiGiorni(d, 1)) celle.push(d);
  while (celle.length % 7) celle.push(null);
  const settimane: (DataISO | null)[][] = [];
  for (let i = 0; i < celle.length; i += 7) settimane.push(celle.slice(i, i + 7));
  return settimane;
}
