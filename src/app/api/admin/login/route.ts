import { NextRequest, NextResponse } from "next/server";
import { checkPassword, issueToken, isAdmin, ADMIN_COOKIE, COOKIE_OPTS } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

// Rate limit in memoria: non regge il multi-istanza, ma alza il costo di un
// attacco a forza bruta senza dipendenze nuove.
const attempts = new Map<string, { n: number; until: number }>();
const MAX_TRIES = 8;
const WINDOW_MS = 10 * 60 * 1000;

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "sconosciuto";
}

/** GET: dice al client se la sessione corrente e' valida. */
export async function GET() {
  return NextResponse.json({ authenticated: await isAdmin() });
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && rec.until > now && rec.n >= MAX_TRIES) {
    return NextResponse.json(
      { error: "Troppi tentativi. Riprova tra qualche minuto." },
      { status: 429 }
    );
  }

  let password = "";
  try {
    ({ password } = await req.json());
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  if (!password || !checkPassword(password)) {
    const next = rec && rec.until > now ? { n: rec.n + 1, until: rec.until } : { n: 1, until: now + WINDOW_MS };
    attempts.set(ip, next);
    return NextResponse.json({ error: "Password errata" }, { status: 401 });
  }

  attempts.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, issueToken(), COOKIE_OPTS);
  return res;
}

/** DELETE: logout. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { ...COOKIE_OPTS, maxAge: 0 });
  return res;
}
