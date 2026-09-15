"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  FileSignature,
  Receipt,
  TrendingUp,
  Menu,
  X,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cx } from "./ui";
import { adminLogout } from "@/components/AdminGate";

// Shell dell'area admin, stessa impostazione del gestionale DirezioneX:
// barra laterale scura fissa a 256px, topbar sticky scura, corpo su #f4f4f5.
// Navbar e footer del sito pubblico sono esclusi da LayoutWrapper.

export type Vista = "conversioni" | "lead" | "preventivi" | "ordini" | "seo";

const NAV: { key: Vista; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "conversioni", label: "Conversioni", icon: LayoutDashboard },
  { key: "lead", label: "Lead", icon: Inbox },
  { key: "preventivi", label: "Preventivi", icon: FileSignature },
  { key: "ordini", label: "Ordini", icon: Receipt },
  { key: "seo", label: "SEO", icon: TrendingUp },
];

export function Shell({
  vista,
  setVista,
  conteggi,
  children,
}: {
  vista: Vista;
  setVista: (v: Vista) => void;
  conteggi?: Partial<Record<Vista, number>>;
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f4f5]">
      {/* ------------------------------------------------------- sidebar */}
      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-[60] flex w-64 flex-col bg-neutral-900 text-white transition-transform lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Favicon.png" alt="" className="h-7 w-7 shrink-0 object-contain" />
          <div>
            <p className="text-base font-bold leading-none">Coach Angelo</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-white/40">
              Gestionale
            </p>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="ml-auto text-white/50 lg:hidden"
            aria-label="Chiudi menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-0.5">
            {NAV.map((n) => {
              const Icon = n.icon;
              const on = vista === n.key;
              const badge = conteggi?.[n.key] || 0;
              return (
                <button
                  key={n.key}
                  onClick={() => {
                    setVista(n.key);
                    setMenuOpen(false);
                  }}
                  className={cx(
                    "flex w-full items-center gap-3 px-3 py-2 text-sm font-semibold transition-all",
                    on
                      ? "bg-gold text-white"
                      : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{n.label}</span>
                  {badge > 0 && (
                    <span
                      className={cx(
                        "ml-auto shrink-0 px-1.5 py-0.5 text-[10px] font-bold",
                        on ? "bg-white/25" : "bg-white/10 text-white/70"
                      )}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-semibold text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Vedi il sito
          </a>
          <button
            onClick={() => adminLogout()}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-semibold text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Esci
          </button>
        </div>
      </aside>

      {/* velo sul telefono quando il menu e' aperto */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
        />
      )}

      <div className="lg:pl-64">
        {/* -------------------------------------------------------- topbar */}
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-white/10 bg-[#1f1f1f]/95 px-4 py-3 backdrop-blur sm:px-6">
          <button
            onClick={() => setMenuOpen(true)}
            className="shrink-0 text-white/60 hover:text-white lg:hidden"
            aria-label="Apri menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-sm font-bold text-white">
            {NAV.find((n) => n.key === vista)?.label}
          </p>
          <span className="ml-auto text-[11px] text-white/40">angelocoach.com</span>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
