"use client";

import type { ReactNode } from "react";

// Primitivi del gestionale, stessa impostazione dell'admin DirezioneX:
// squadrato (niente angoli tondi), bordi neri all'10%, fondo #f4f4f5,
// tessere con la barretta di colore a sinistra.

export const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/* ---------------------------------------------------------------- Card */

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
  bodyClassName = "p-4 sm:p-5",
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cx("border border-black/10 bg-white", className)}>
      {(title || action) && (
        <header className="flex items-center gap-3 border-b border-black/[0.07] px-4 py-3 sm:px-5">
          <div className="min-w-0">
            {title && (
              <h2 className="text-sm font-bold tracking-tight text-neutral-900">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-0.5 truncate text-[11px] text-neutral-400">{subtitle}</p>
            )}
          </div>
          {action && <div className="ml-auto flex shrink-0 items-center gap-2">{action}</div>}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

/* ---------------------------------------------------------------- Stat */

export function Stat({
  label,
  value,
  sub,
  icon,
  tone = "ink",
  onClick,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: ReactNode;
  tone?: "ink" | "brand" | "green" | "red" | "blue" | "amber";
  onClick?: () => void;
}) {
  const bar: Record<string, string> = {
    ink: "bg-neutral-900",
    brand: "bg-gold",
    green: "bg-green-600",
    red: "bg-red-500",
    blue: "bg-blue-600",
    amber: "bg-amber-500",
  };
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={cx(
        "relative flex w-full flex-col overflow-hidden border border-black/10 bg-white p-3 text-left transition-all sm:p-4",
        onClick && "hover:border-gold/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
      )}
    >
      <span className={cx("absolute inset-y-0 left-0 w-1", bar[tone])} />
      <div className="flex items-start gap-2">
        <p className="text-[9.5px] font-bold uppercase leading-tight tracking-[0.14em] text-neutral-400 sm:text-[10px] sm:tracking-[0.18em]">
          {label}
        </p>
        {icon && <span className="ml-auto hidden text-neutral-300 sm:block">{icon}</span>}
      </div>
      <p className="mt-1.5 text-xl font-bold leading-none text-neutral-900 sm:mt-2 sm:text-2xl">
        {value}
      </p>
      {sub && (
        <p className="mt-1 text-[10.5px] leading-snug text-neutral-500 sm:mt-1.5 sm:text-[11px]">
          {sub}
        </p>
      )}
    </Wrapper>
  );
}

/* --------------------------------------------------------------- Badge */

const TONES: Record<string, string> = {
  ink: "bg-neutral-900 text-white",
  brand: "bg-gold text-white",
  green: "bg-green-600 text-white",
  red: "bg-red-500 text-white",
  amber: "bg-amber-500 text-white",
  blue: "bg-blue-600 text-white",
  neutral: "bg-neutral-200 text-neutral-700",
  outline: "border border-black/10 bg-[#f4f4f5] text-neutral-600",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES | string;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        TONES[tone] || TONES.neutral,
        className
      )}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- Btn */

export function Btn({
  children,
  onClick,
  variant = "ink",
  size = "md",
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ink" | "brand" | "ghost" | "outline";
  size?: "sm" | "md";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const v: Record<string, string> = {
    ink: "bg-neutral-900 text-white hover:bg-neutral-800",
    brand: "bg-gold text-white hover:opacity-90",
    ghost: "text-neutral-600 hover:bg-black/5",
    outline: "border border-black/15 bg-white text-neutral-700 hover:border-black/30",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "inline-flex items-center justify-center gap-1.5 font-semibold transition-all disabled:opacity-50",
        size === "sm" ? "px-2.5 py-1.5 text-[11px]" : "px-4 py-2 text-[13px]",
        v[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------- EmptyState */

export function EmptyState({
  titolo,
  testo,
  icon,
}: {
  titolo: string;
  testo?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      {icon && <div className="mb-3 text-neutral-300">{icon}</div>}
      <p className="text-sm font-bold text-neutral-700">{titolo}</p>
      {testo && <p className="mt-1 max-w-sm text-xs text-neutral-400">{testo}</p>}
    </div>
  );
}

/* ------------------------------------------------------------- Sparkbars */

/** Barrette verticali: l'andamento senza tirarsi dentro una libreria. */
export function Sparkbars({
  punti,
  etichetta,
}: {
  punti: { label: string; n: number }[];
  etichetta?: (p: { label: string; n: number }) => string;
}) {
  if (!punti.length) return null;
  const max = Math.max(...punti.map((p) => p.n), 1);
  return (
    <div className="flex h-24 items-end gap-[2px]">
      {punti.map((p) => (
        <div
          key={p.label}
          title={etichetta ? etichetta(p) : `${p.label}: ${p.n}`}
          className="min-h-[2px] flex-1 bg-gold/70 transition-colors hover:bg-gold"
          style={{ height: `${(p.n / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- Barre */

/** Classifica orizzontale: quanto pesa ogni voce sul totale. */
export function Barre({
  voci,
  vuoto = "Nessun dato nel periodo.",
}: {
  voci: { nome: string; n: number }[];
  vuoto?: string;
}) {
  if (!voci.length) return <p className="text-xs text-neutral-400">{vuoto}</p>;
  const max = Math.max(...voci.map((v) => v.n), 1);
  return (
    <div className="space-y-2">
      {voci.map((v) => (
        <div key={v.nome} className="flex items-center gap-3">
          <span className="w-40 shrink-0 truncate text-xs text-neutral-600" title={v.nome}>
            {v.nome}
          </span>
          <div className="h-4 flex-1 bg-black/[0.04]">
            <div className="h-full bg-gold/70" style={{ width: `${(v.n / max) * 100}%` }} />
          </div>
          <span className="w-8 shrink-0 text-right text-xs font-bold tabular-nums text-neutral-900">
            {v.n}
          </span>
        </div>
      ))}
    </div>
  );
}
