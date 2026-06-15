"use client";

import { useState } from "react";
import GSCDashboard from "./GSCDashboard";

// Stessa auth di /admin: password angelo2024, localStorage key "admin_auth".
// Login una volta su /admin sblocca anche questa pagina.
const ADMIN_PASSWORD = "angelo2024";

export default function GSCAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("admin_auth") === "true";
    return false;
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      localStorage.setItem("admin_auth", "true");
    } else {
      setError("Password errata");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-32 pb-20 flex items-center justify-center">
        <div className="bg-neutral-800 rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-gold focus:border-transparent outline-none"
                placeholder="Inserisci password"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gold text-white px-6 py-3 rounded-full font-semibold"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <GSCDashboard />;
}
