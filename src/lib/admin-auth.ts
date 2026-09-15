// Auth admin server-side.
//
// Prima di questo file la protezione era `ADMIN_PASSWORD = "angelo2024"` scritta
// dentro un componente "use client": finiva nel bundle JS pubblico, e le rotte
// GET /api/contact, /api/orders, /api/documents rispondevano a chiunque senza
// nessun controllo (lead con nome, email e telefono leggibili da fuori).
//
// Ora: la password sta solo in env server (ADMIN_PASSWORD), il client riceve un
// cookie di sessione HttpOnly firmato, e ogni rotta admin chiama requireAdmin().

import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE = "ac_admin";
const MAX_AGE_SEC = 60 * 60 * 12; // 12 ore

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_SESSION_SECRET o ADMIN_PASSWORD mancante in env");
  return s;
}

/** Confronto a tempo costante: niente timing attack sulla password. */
export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) {
    // confronto comunque, per non far trapelare la lunghezza dal tempo
    timingSafeEqual(ba, ba);
    return false;
  }
  return timingSafeEqual(ba, bb);
}

export function checkPassword(given: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(given, expected);
}

/** Token = <expiry>.<nonce>.<hmac>, firmato col secret server. */
export function issueToken(): string {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const nonce = randomBytes(12).toString("hex");
  const payload = `${exp}.${nonce}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [exp, nonce, sig] = parts;
  const expected = createHmac("sha256", secret()).update(`${exp}.${nonce}`).digest("hex");
  if (!safeEqual(sig, expected)) return false;
  return Number(exp) > Date.now();
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(ADMIN_COOKIE)?.value);
}

/**
 * Da chiamare all'inizio di ogni rotta admin.
 * Ritorna una 401 se non autenticato, altrimenti null.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
}

export const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SEC,
};
