"use client";

import { useState, useEffect } from "react";

// Login admin condiviso da /admin e /admin/gsc.
// La password non sta piu' nel bundle: va a POST /api/admin/login, che risponde
// con un cookie HttpOnly firmato. Qui teniamo solo un flag "sono dentro",
// e comunque ogni rotta admin ricontrolla il cookie lato server.
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
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <p className="text-white/50">Caricamento...</p>
      </div>
    );
  }

  if (state === "out") {
    return (
      <div className="min-h-screen bg-neutral-900 pt-32 pb-20 flex items-center justify-center px-4">
        <div className="bg-neutral-800 rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Password"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-white text-neutral-900 px-6 py-3 rounded-full font-semibold disabled:opacity-50"
            >
              {busy ? "Verifico..." : "Accedi"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export async function adminLogout() {
  await fetch("/api/admin/login", { method: "DELETE" });
  location.reload();
}
