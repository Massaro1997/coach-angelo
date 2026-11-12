"use client";

import { useState } from "react";
import { Card, cx } from "../ui";
import { giornoBreve, giornoLungo, num, pos, type DatiSeo } from "./tipi";

type Metrica = "clic" | "impressioni";

/** Tetto "tondo" per l'asse: 37 -> 40, 180 -> 200, 1.340 -> 2.000. */
function tetto(n: number): number {
  if (n <= 4) return 4;
  const mag = 10 ** Math.floor(Math.log10(n));
  const f = n / mag;
  const passo = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return passo * mag;
}

/**
 * Barre blu = ultimi 28 giorni. Linea tratteggiata = i 28 giorni prima,
 * allineati: 28 giorni sono 4 settimane esatte, quindi ogni barra si
 * confronta con lo stesso giorno della settimana.
 */
export default function Andamento({ dati }: { dati: DatiSeo }) {
  const [metrica, setMetrica] = useState<Metrica>("clic");
  const [sel, setSel] = useState<number | null>(null);

  const ora = dati.giorni.slice(-28);
  const prima = dati.giorni.slice(0, Math.max(0, dati.giorni.length - 28));
  const valori = ora.map((g) => g[metrica]);
  const vecchi = prima.map((g) => g[metrica]);
  const max = tetto(Math.max(...valori, ...vecchi, 1));
  const n = ora.length || 1;

  const totale = valori.reduce((s, v) => s + v, 0);
  const iMigliore = valori.reduce((best, v, i) => (v > (valori[best] ?? -1) ? i : best), 0);
  const parola = metrica === "clic" ? "click" : "comparse";

  const g = sel !== null ? ora[sel] : undefined;
  const v = sel !== null ? prima[sel] : undefined;

  const linea = vecchi
    .map((val, i) => `${(((i + 0.5) / n) * 100).toFixed(2)},${(100 - (val / max) * 100).toFixed(2)}`)
    .join(" ");

  return (
    <Card
      title="Andamento giorno per giorno"
      action={
        <div className="flex gap-1" role="group" aria-label="Cosa mostrare">
          {(["clic", "impressioni"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetrica(m)}
              aria-pressed={metrica === m}
              data-attiva={metrica === m}
              className="crm-linguetta"
            >
              {m === "clic" ? "Click" : "Comparse"}
            </button>
          ))}
        </div>
      }
    >
      {/* Riga che cambia col dito o col mouse: niente tooltip che sparisce sul telefono. */}
      <p className="min-h-[2.5rem] text-[13px] leading-5 text-crm-testo sm:min-h-0" aria-live="polite">
        {g ? (
          <>
            <span className="font-[650] text-crm-ink">{giornoLungo(g.data)}</span>:{" "}
            <span className="font-[650] text-crm-ink">{num(g.clic)}</span> click, comparso{" "}
            {num(g.impressioni)} volte
            {g.impressioni > 0 && <>, posizione media {pos(g.posizione)}</>}
            {v && (
              <span className="text-crm-spento">
                {" "}
                (quattro settimane prima: {num(v[metrica])} {parola})
              </span>
            )}
          </>
        ) : totale === 0 ? (
          <>Nessun{metrica === "clic" ? " click" : "a comparsa"} negli ultimi 28 giorni.</>
        ) : (
          <>
            In 28 giorni <span className="font-[650] text-crm-ink">{num(totale)}</span> {parola}, in media{" "}
            {(totale / n).toLocaleString("it-IT", { maximumFractionDigits: 1 })} al giorno. Il giorno migliore è
            stato {giornoLungo(ora[iMigliore]!.data)} con {num(valori[iMigliore]!)}.
          </>
        )}
      </p>

      <div className="mt-4 flex gap-2">
        {/* asse */}
        <div className="relative w-9 shrink-0 text-right text-[11px] tabular-nums text-crm-spento sm:w-11">
          <span className="absolute right-0 top-0 -translate-y-1/2">{num(max)}</span>
          <span className="absolute right-0 top-1/2 -translate-y-1/2">{num(max / 2)}</span>
          <span className="absolute bottom-0 right-0 translate-y-1/2">0</span>
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="relative h-44 border-b border-crm-bordo sm:h-56 xl:h-64"
            onMouseLeave={() => setSel(null)}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 border-t border-dashed border-crm-filo" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-crm-filo" />

            <div className="absolute inset-0 flex items-end">
              {ora.map((giorno, i) => {
                const val = valori[i] ?? 0;
                const attivo = sel === i;
                return (
                  <button
                    key={giorno.data}
                    type="button"
                    onMouseEnter={() => setSel(i)}
                    onFocus={() => setSel(i)}
                    onClick={() => setSel(attivo ? null : i)}
                    aria-label={`${giornoLungo(giorno.data)}: ${num(val)} ${parola}`}
                    className="group flex h-full flex-1 items-end px-[1px] outline-none sm:px-[3px] 2xl:px-1"
                  >
                    <span
                      className={cx(
                        "block w-full rounded-t-[3px] transition-colors",
                        attivo ? "bg-crm-ink" : "bg-crm-blu/80 group-hover:bg-crm-blu"
                      )}
                      style={{ height: val > 0 ? `max(2px, ${(val / max) * 100}%)` : "0px" }}
                    />
                  </button>
                );
              })}
            </div>

            {vecchi.length === n && (
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden
              >
                <polyline
                  points={linea}
                  fill="none"
                  stroke="#616161"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}
          </div>

          {/* date: una a settimana, sotto la barra giusta */}
          <div className="relative mt-1.5 h-4 text-[11px] text-crm-spento">
            {ora.map((giorno, i) =>
              i % 7 === 0 || i === n - 1 ? (
                <span
                  key={giorno.data}
                  className={cx(
                    "absolute whitespace-nowrap",
                    i === 0 ? "" : i === n - 1 ? "-translate-x-full" : "-translate-x-1/2",
                    // sul telefono l'ultima data si scontrerebbe con quella prima
                    i === n - 1 && n - 1 - Math.floor((n - 1) / 7) * 7 < 3 && "hidden sm:inline"
                  )}
                  style={{ left: i === 0 ? 0 : i === n - 1 ? "100%" : `${((i + 0.5) / n) * 100}%` }}
                >
                  {giornoBreve(giorno.data)}
                </span>
              ) : null
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-crm-tenue">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-crm-blu/80" /> ultimi 28 giorni
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="18" height="4" aria-hidden>
            <line x1="0" y1="2" x2="18" y2="2" stroke="#616161" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
          i 28 giorni prima, stesso giorno della settimana
        </span>
      </div>
    </Card>
  );
}
