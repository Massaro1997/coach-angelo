// Sessione del cliente dell'app (/app). Separata da quella del gestionale:
// cookie diverso, firma con un prefisso diverso, durata lunga (il cliente
// non deve rientrare ogni giorno).
//
// Cookie fp_app = <clienteId>.<scadenza>.<hmac>. A ogni richiesta si rilegge
// il cliente dal DB: se il coach lo disattiva o cambia il codice, la sessione
// smette di valere (il codice entra nella firma).

import { createHmac, randomBytes, randomInt } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { safeEqual } from "@/lib/admin-auth";
import type { AppCliente } from "@prisma/client";

export const APP_COOKIE = "fp_app";
const MAX_AGE_SEC = 60 * 60 * 24 * 180; // 180 giorni

export const APP_COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SEC,
};

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_SESSION_SECRET o ADMIN_PASSWORD mancante in env");
  return `app-clienti:${s}`;
}

function firma(clienteId: string, exp: number, codice: string): string {
  return createHmac("sha256", secret()).update(`${clienteId}.${exp}.${codice}`).digest("hex");
}

export function tokenSessione(c: Pick<AppCliente, "id" | "codice">): string {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  return `${c.id}.${exp}.${firma(c.id, exp, c.codice)}`;
}

/** Il cliente della sessione corrente, o null. */
export async function clienteCorrente(): Promise<AppCliente | null> {
  const jar = await cookies();
  const raw = jar.get(APP_COOKIE)?.value;
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [id, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!id || !Number.isFinite(exp) || exp < Date.now()) return null;
  const c = await prisma.appCliente.findUnique({ where: { id } });
  if (!c || !c.attivo) return null;
  if (!safeEqual(sig, firma(c.id, exp, c.codice))) return null;
  return c;
}

/** Da chiamare all'inizio di ogni rotta /api/app: cliente o risposta 401. */
export async function richiediCliente(): Promise<
  { cliente: AppCliente; errore: null } | { cliente: null; errore: NextResponse }
> {
  const c = await clienteCorrente();
  if (c) return { cliente: c, errore: null };
  return {
    cliente: null,
    errore: NextResponse.json({ error: "Non autorizzato" }, { status: 401 }),
  };
}

/** 8 cifre, senza zeri in testa (cosi' non si perdono copiando). */
export function nuovoCodice(): string {
  return String(randomInt(10_000_000, 100_000_000));
}

export function nuovoToken(): string {
  return randomBytes(16).toString("hex");
}

/** "12345678" -> "1234 5678", come si mostra al cliente e al coach. */
export function codiceLeggibile(codice: string): string {
  return codice.length === 8 ? `${codice.slice(0, 4)} ${codice.slice(4)}` : codice;
}
