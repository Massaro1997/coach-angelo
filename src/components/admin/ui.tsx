"use client";

import type { ReactNode } from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

// Primitivi del gestionale nella grafica dei CRM DirezioneX (admin di Shopify,
// Polaris), come Linea Erre: card bianche da 20px con ombra morbida e niente
// bordo, badge Polaris, tasto principale nero lucido, Inter 13px.
// Le classi crm-* stanno in fondo a globals.css. API invariata rispetto alla
// versione squadrata: le schede la usano tutte.

export const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Riporta in cima la scheda. Da desktop scorre il pannello (#pannello), non
 *  la finestra: window.scrollTo da solo li' non fa niente. */
export function scorriInCima() {
  document.getElementById("pannello")?.scrollTo({ top: 0, behavior: "instant" });
  window.scrollTo({ top: 0, behavior: "instant" });
}

/* ---------------------------------------------------------------- Card */

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
  bodyClassName,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** "" = corpo a filo (tabelle che arrivano ai bordi) */
  bodyClassName?: string;
}) {
  const testata = !!(title || action);
  return (
    <section className={cx("crm-card", className)}>
      {testata && (
        // niente riga sotto la testata: in Polaris titolo e corpo stanno nella stessa card
        <header className="flex items-start gap-3 px-4 pt-4">
          <div className="min-w-0 flex-1">
            {title && (
              <h2 className="text-[13px] font-[650] leading-5 text-crm-ink">{title}</h2>
            )}
            {subtitle && <p className="text-[13px] leading-5 text-crm-tenue">{subtitle}</p>}
          </div>
          {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
        </header>
      )}
      <div className={bodyClassName ?? (testata ? "px-4 pb-4 pt-3" : "p-4")}>{children}</div>
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
  // Metrica di Polaris: niente barretta colorata, il colore va solo sul
  // valore e solo quando dice qualcosa (rosso = da sistemare, verde = bene).
  const colore =
    tone === "red" ? "text-crm-rosso" : tone === "green" ? "text-crm-verde" : "text-crm-ink";
  const dentro = (
    <>
      <span className="flex items-start gap-2">
        <span className="text-[13px] font-[550] leading-5 text-crm-testo">{label}</span>
        {icon && (
          <span className="ml-auto shrink-0 text-crm-spento [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
        )}
      </span>
      <span
        className={cx(
          "mt-1 block text-xl font-[650] leading-7 tracking-[-0.02em] tabular-nums",
          colore
        )}
      >
        {value}
      </span>
      {sub && <span className="mt-0.5 block text-[12px] leading-4 text-crm-tenue">{sub}</span>}
    </>
  );
  const base = "crm-card flex w-full flex-col p-4 text-left";
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        base,
        "transition-colors hover:bg-[#fafafa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crm-blu"
      )}
    >
      {dentro}
    </button>
  ) : (
    <div className={base}>{dentro}</div>
  );
}

/* --------------------------------------------------------------- Badge */

// I toni vecchi (ink, brand, green...) restano validi e finiscono sui colori
// di Polaris; in piu' si possono usare i nomi Polaris (ok, attesa, errore...).
const TONES: Record<string, string> = {
  ink: "crm-badge-scuro",
  brand: "crm-badge-scuro",
  green: "crm-badge-ok",
  amber: "crm-badge-attesa",
  red: "crm-badge-errore",
  blue: "crm-badge-info",
  neutral: "",
  outline: "",
  ok: "crm-badge-ok",
  attesa: "crm-badge-attesa",
  avviso: "crm-badge-avviso",
  errore: "crm-badge-errore",
  info: "crm-badge-info",
  scuro: "crm-badge-scuro",
  neutro: "",
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
  return <span className={cx("crm-badge", TONES[tone] ?? "", className)}>{children}</span>;
}

/* ----------------------------------------------------------------- Btn */

const VARIANTI: Record<string, string> = {
  ink: "crm-btn-primario",
  brand: "crm-btn-primario",
  outline: "crm-btn",
  ghost: "crm-btn-piatto",
};

export function Btn({
  children,
  onClick,
  variant = "ink",
  size = "md",
  type = "button",
  disabled,
  className = "",
  title,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ink" | "brand" | "ghost" | "outline";
  size?: "sm" | "md";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  /** suggerimento al passaggio (utile sui tasti con la sola icona) */
  title?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      className={cx(
        VARIANTI[variant] ?? VARIANTI.ink,
        // le utility vincono sulle classi crm-* (layer components): qui solo
        // altezza, focus e disabilitato, il resto lo da' la classe
        "justify-center whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-crm-blu disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
        size === "sm"
          ? "min-h-6 px-2 py-0.5 [&_svg]:h-3.5 [&_svg]:w-3.5"
          : "min-h-7 [&_svg]:h-4 [&_svg]:w-4",
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
  azione,
}: {
  titolo: string;
  testo?: string;
  icon?: ReactNode;
  /** tasto sotto il testo, es. «Nuovo cliente» */
  azione?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      {icon && (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-crm-fondo-2 text-crm-spento [&_svg]:h-5 [&_svg]:w-5">
          {icon}
        </div>
      )}
      <p className="text-[13px] font-[650] leading-5 text-crm-ink">{titolo}</p>
      {testo && <p className="mt-1 max-w-sm text-[13px] leading-5 text-crm-tenue">{testo}</p>}
      {azione && <div className="mt-4">{azione}</div>}
    </div>
  );
}

/* ------------------------------------------------------------- Sparkbars */

/** Barrette verticali: l'andamento senza tirarsi dentro una libreria.
 *  Blu Polaris come i grafici di Shopify, niente rosso del marchio. */
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
          className="min-h-[2px] flex-1 rounded-t-[3px] bg-crm-blu/70 transition-colors hover:bg-crm-blu"
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
  if (!voci.length) return <p className="text-[13px] text-crm-tenue">{vuoto}</p>;
  const max = Math.max(...voci.map((v) => v.n), 1);
  return (
    <div className="space-y-2.5">
      {voci.map((v) => (
        <div key={v.nome} className="flex items-center gap-3">
          <span className="w-40 shrink-0 truncate text-[13px] text-crm-testo" title={v.nome}>
            {v.nome}
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-crm-fondo-2">
            <div
              className="h-full rounded-full bg-crm-blu/80"
              style={{ width: `${(v.n / max) * 100}%` }}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-[13px] font-[550] tabular-nums text-crm-ink">
            {v.n}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ======================================================================
   Primitive in piu' (12/11/2026), prese dal gestionale di Linea Erre
   ====================================================================== */

/** Titolo grande delle schede di dettaglio ("Nuovo cliente" di Shopify). */
export function TitoloPagina({
  children,
  sotto,
  azioni,
}: {
  children: ReactNode;
  /** riga piccola sotto il titolo: badge, date, contatti */
  sotto?: ReactNode;
  /** tasti a destra del titolo */
  azioni?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start gap-3">
      <div className="min-w-0 flex-1">
        {/* h2: l'h1 e' il nome della sezione nella testata del pannello */}
        <h2 className="text-[20px] font-[650] leading-7 tracking-[-0.02em] text-crm-ink">
          {children}
        </h2>
        {sotto && (
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-crm-tenue">
            {sotto}
          </div>
        )}
      </div>
      {azioni && <div className="flex shrink-0 flex-wrap items-center gap-2">{azioni}</div>}
    </div>
  );
}

/** Campo con etichetta sopra e aiuto/errore sotto. Dentro va un
 *  <input className="crm-campo"> (o select/textarea). */
export function Campo({
  label,
  aiuto,
  errore,
  children,
  className,
}: {
  label?: ReactNode;
  aiuto?: ReactNode;
  /** se c'e', prende il posto dell'aiuto, in rosso */
  errore?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cx("block", className)}>
      {label && <span className="crm-etichetta">{label}</span>}
      {children}
      {errore ? (
        <span className="mt-1 flex items-center gap-1.5 text-[13px] leading-5 text-crm-rosso">
          <CircleAlert className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          {errore}
        </span>
      ) : (
        aiuto && <span className="mt-1 block text-[12px] leading-4 text-crm-tenue">{aiuto}</span>
      )}
    </label>
  );
}

/** Le linguette sopra gli elenchi ("Tutti / Attivi / Bozze" di Shopify). */
export function Linguette<K extends string>({
  voci,
  attiva,
  onChange,
  className,
}: {
  voci: { key: K; label: ReactNode; conteggio?: number }[];
  attiva: K;
  onChange: (k: K) => void;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-wrap gap-1", className)}>
      {voci.map((v) => {
        const on = v.key === attiva;
        return (
          <button
            key={v.key}
            type="button"
            onClick={() => onChange(v.key)}
            data-attiva={on ? "true" : undefined}
            aria-pressed={on}
            className="crm-linguetta inline-flex items-center gap-1.5 transition-colors"
          >
            {v.label}
            {v.conteggio !== undefined && (
              <span className="text-[12px] font-medium tabular-nums text-crm-spento">
                {v.conteggio}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Coppie etichetta / valore nelle schede di dettaglio. */
export function Dati({ righe }: { righe: [ReactNode, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-[minmax(110px,40%)_1fr] gap-x-4 gap-y-2 text-[13px] leading-5">
      {righe.map(([k, v], i) => (
        <div key={i} className="contents">
          <dt className="text-crm-tenue">{k}</dt>
          <dd className="min-w-0 break-words text-crm-ink">{v ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

const AVVISI = {
  info: { cls: "bg-[#eaf4ff] text-[#00527c]", Icona: Info },
  ok: { cls: "bg-[#e3f1df] text-[#0c5132]", Icona: CircleCheck },
  avviso: { cls: "bg-[#fff1e3] text-[#5e4200]", Icona: TriangleAlert },
  errore: { cls: "bg-[#fee9e8] text-[#8e1f0b]", Icona: CircleAlert },
} as const;

/** Il Banner di Polaris: un messaggio dentro la pagina (errore di rete,
 *  dati mancanti, conferma). Fondo tenue, icona, niente bordo. */
export function Avviso({
  tone = "info",
  titolo,
  children,
  azione,
  className,
}: {
  tone?: keyof typeof AVVISI;
  titolo?: ReactNode;
  children?: ReactNode;
  azione?: ReactNode;
  className?: string;
}) {
  const { cls, Icona } = AVVISI[tone];
  return (
    <div
      role={tone === "errore" ? "alert" : "status"}
      className={cx("flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-[13px] leading-5", cls, className)}
    >
      <Icona className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
      <div className="min-w-0 flex-1">
        {titolo && <p className="font-[650]">{titolo}</p>}
        {children && <div className={titolo ? "text-crm-testo" : undefined}>{children}</div>}
      </div>
      {azione && <div className="shrink-0">{azione}</div>}
    </div>
  );
}
