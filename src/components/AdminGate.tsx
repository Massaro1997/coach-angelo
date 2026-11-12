"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CircleAlert } from "lucide-react";

// Login admin condiviso da /admin e /admin/gsc.
// La password non sta piu' nel bundle: va a POST /api/admin/login, che risponde
// con un cookie HttpOnly firmato. Qui teniamo solo un flag "sono dentro",
// e comunque ogni rotta admin ricontrolla il cookie lato server.
// Grafica: il login di Shopify, card bianca da 20px sul nero della cornice.
export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"checking" | "out" | "in">("checking");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Residuo della vecchia auth: non vale piu' niente, ma toglierlo evita
    // confusione se qualcuno lo ritrova nel browser.
    localStorage.removeItem("admin_auth");
    fetch("/api/admin/login")
      .then((r) => r.json())
      .then((d) => setState(d.authenticated ? "in" : "out"))
      .catch(() => setState("out"));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setPassword("");
        setState("in");
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Password errata");
      }
    } catch {
      setError("Errore di rete");
    } finally {
      setBusy(false);
    }
  }

  if (state === "checking") {
    // stesso nero della cornice: niente lampo di colore prima del gestionale
    return (
      <div className="crm-admin flex min-h-screen items-center justify-center">
        <p className="text-[13px] text-[#8a8a8a]" role="status">
          Caricamento…
        </p>
      </div>
    );
  }

  if (state === "out") {
    return (
      <div className="crm-admin flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px] rounded-[20px] bg-white p-8 text-crm-ink shadow-crm-card sm:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/fitprimo/fitprimo-logo-nero.svg" alt="FitPrimo" className="h-6 w-auto" />
          <h1 className="mt-8 text-[20px] font-[650] leading-7 tracking-[-0.02em]">Accedi</h1>
          <p className="mt-0.5 text-[13px] leading-5 text-crm-tenue">al gestionale di FitPrimo</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-password" className="crm-etichetta">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "admin-errore" : undefined}
                className="crm-campo min-h-10"
                autoFocus
              />
              {error && (
                <p
                  id="admin-errore"
                  role="alert"
                  className="mt-2 flex items-center gap-1.5 text-[13px] leading-5 text-crm-rosso"
                >
                  <CircleAlert className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={busy}
              className="crm-btn-primario min-h-10 w-full text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crm-blu"
            >
              {busy ? "Verifico…" : "Accedi"}
            </button>
          </form>
        </div>

        <Link href="/" className="mt-6 text-[12px] text-[#8a8a8a] transition-colors hover:text-[#e3e3e3]">
          fitprimo.de
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

export async function adminLogout() {
  await fetch("/api/admin/login", { method: "DELETE" });
  location.reload();
}
