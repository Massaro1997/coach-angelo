"use client";

// Grafici fatti a mano in SVG (niente librerie: pesano e non servono per due
// grafici). viewBox fisso e larghezza 100%: si allargano col telefono senza
// misurare niente; le linee restano sottili con vector-effect.

import type { DataISO } from "@/lib/app-coaching/tipi";
import type { SettimanaProgressi } from "@/lib/app-coaching/tipi-v2";
import { giorniTra } from "@/lib/app-coaching/date";

const COLORE = "var(--app-colore,#e30613)";
const BINARIO = "#ececef";

/* ------------------------------------------------------------- barre */

const ALTO_BARRE = 112;
const SLOT = 28;
const BARRA = 16;

/**
 * Una colonna per settimana: in grigio i giorni pianificati, sopra in colore
 * quelli fatti. Le settimane senza piano hanno un trattino grigio, cosi' la
 * fila resta leggibile e non sembra un grafico rotto.
 */
export function BarreSettimane({
  settimane,
  etichette,
  descrizione,
}: {
  settimane: SettimanaProgressi[];
  /** testo sotto ogni colonna ("" = niente) */
  etichette: string[];
  descrizione: string;
}) {
  const n = Math.max(settimane.length, 1);
  const max = Math.max(1, ...settimane.map((s) => Math.max(s.pianificati, s.fatti)));
  const alto = (v: number) => (v / max) * ALTO_BARRE;

  return (
    <div>
      <svg viewBox={`0 0 ${n * SLOT} ${ALTO_BARRE}`} className="block h-auto w-full" role="img" aria-label={descrizione}>
        {settimane.map((s, i) => {
          const x = i * SLOT + (SLOT - BARRA) / 2;
          const hp = Math.max(alto(s.pianificati), 4);
          const hf = alto(s.fatti);
          return (
            <g key={s.lunedi}>
              <rect x={x} y={ALTO_BARRE - hp} width={BARRA} height={hp} rx={Math.min(5, hp / 2)} fill={BINARIO} />
              {hf > 0 && (
                <rect x={x} y={ALTO_BARRE - hf} width={BARRA} height={hf} rx={Math.min(5, hf / 2)} fill={COLORE} />
              )}
            </g>
          );
        })}
      </svg>
      {/* stessa griglia delle colonne: ogni etichetta sta sotto la sua barra */}
      <div className="mt-1.5 grid text-[12px] text-neutral-500" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }} aria-hidden>
        {settimane.map((s, i) => (
          <span key={s.lunedi} className="flex justify-center whitespace-nowrap">
            {etichette[i] ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- linea */

const LARGO_LINEA = 320;
const ALTO_LINEA = 120;
const MARGINE = 10;
const GRIGLIA = "#ececef";
/** passi "tondi" della griglia del peso: al massimo 4 linee nella scala */
const PASSI = [1, 2, 5, 10, 20, 50];

/** Valori tondi (82, 84, 86) dentro la scala, per le linee leggere della griglia. */
function lineeGuida(min: number, max: number): number[] {
  const passo = PASSI.find((p) => (max - min) / p <= 4) ?? PASSI[PASSI.length - 1];
  const out: number[] = [];
  for (let v = Math.ceil(min / passo) * passo; v <= max; v += passo) out.push(v);
  return out;
}

/**
 * Peso nel tempo. Le x seguono le date vere (misure irregolari: due misure a
 * un giorno di distanza non devono sembrare lontane un mese); la scala y parte
 * dal minimo e dal massimo con un po' d'aria, cosi' anche mezzo chilo si vede.
 * Griglia leggera con i chili a destra: le cifre stanno in HTML accanto al
 * disegno, non nell'SVG, cosi' restano 11 px anche quando il grafico si allarga.
 */
export function LineaPeso({
  punti,
  descrizione,
  formato = String,
}: {
  punti: { data: DataISO; valore: number }[];
  descrizione: string;
  /** cifre della griglia nella lingua del cliente (82 / 82,5) */
  formato?: (n: number) => string;
}) {
  if (punti.length < 2) return null;
  const primo = punti[0].data;
  const giorni = giorniTra(primo, punti[punti.length - 1].data);
  const valori = punti.map((p) => p.valore);
  let min = Math.min(...valori);
  let max = Math.max(...valori);
  // linea quasi piatta: almeno 2 kg di scala, altrimenti 200 g sembrano un crollo
  if (max - min < 2) {
    const centro = (max + min) / 2;
    min = centro - 1;
    max = centro + 1;
  }
  const aria = (max - min) * 0.12;
  min -= aria;
  max += aria;

  const yDi = (v: number) => MARGINE + ((max - v) / (max - min)) * (ALTO_LINEA - 2 * MARGINE);
  const xy = punti.map((p, i) => {
    const quota = giorni > 0 ? giorniTra(primo, p.data) / giorni : i / (punti.length - 1);
    const x = MARGINE + quota * (LARGO_LINEA - 2 * MARGINE);
    return [x, yDi(p.valore)] as const;
  });
  const linea = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const ultimo = xy[xy.length - 1];
  const area = `${linea} L${ultimo[0].toFixed(1)} ${ALTO_LINEA} L${xy[0][0].toFixed(1)} ${ALTO_LINEA} Z`;
  const pochi = xy.length <= 24;
  const guide = lineeGuida(min, max).map((v) => ({ v, y: yDi(v) }));

  return (
    // la colonna delle cifre si allunga quanto l'SVG (flex stretch): le % di top tornano
    <div className="flex gap-2">
      <div className="min-w-0 flex-1">
        <svg viewBox={`0 0 ${LARGO_LINEA} ${ALTO_LINEA}`} className="block h-auto w-full overflow-visible" role="img" aria-label={descrizione}>
          {guide.map(({ v, y }) => (
            <line key={v} x1={0} x2={LARGO_LINEA} y1={y} y2={y} stroke={GRIGLIA} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}
          <path d={area} fill={COLORE} fillOpacity={0.07} />
          <path
            d={linea}
            fill="none"
            stroke={COLORE}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {pochi && xy.slice(0, -1).map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={COLORE} />)}
          <circle cx={ultimo[0]} cy={ultimo[1]} r={5.5} fill={COLORE} stroke="#fff" strokeWidth={2.5} />
        </svg>
      </div>
      <div className="relative w-7 shrink-0" aria-hidden>
        {guide.map(({ v, y }) => (
          <span
            key={v}
            className="absolute right-0 -translate-y-1/2 text-[11px] leading-none tabular-nums text-neutral-400"
            style={{ top: `${(y / ALTO_LINEA) * 100}%` }}
          >
            {formato(v)}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Larghezza della colonna delle cifre di LineaPeso (w-7 + gap-2): per allineare le date sotto. */
export const SPAZIO_CIFRE_PESO = "pr-9";
