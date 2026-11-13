"use client";

// Andamento del peso in SVG, senza librerie. La linea si allarga con la card
// (preserveAspectRatio none); vector-effect tiene il tratto a 2 px e i punti
// tondi a qualunque larghezza. Le scritte stanno fuori, in HTML, cosi' non si
// deformano.

import { cx } from "../ui";
import type { DataISO } from "@/lib/app-coaching/tipi";
import { dataBreve } from "./comune";
import { giorniTra } from "@/lib/app-coaching/date";

const L = 100; // larghezza del viewBox
const H = 40; // altezza del viewBox

const kg = (n: number) => `${n.toLocaleString("it-IT", { maximumFractionDigits: 1 })} kg`;

export default function GraficoPeso({
  punti,
  className,
}: {
  /** dalla data piu' vecchia */
  punti: { data: DataISO; valore: number }[];
  className?: string;
}) {
  if (punti.length < 2) return null;
  const valori = punti.map((p) => p.valore);
  let min = Math.min(...valori);
  let max = Math.max(...valori);
  // un po' d'aria sopra e sotto; con tutti i pesi uguali la linea sta a meta'
  const aria = Math.max((max - min) * 0.15, 0.5);
  min -= aria;
  max += aria;

  // x sulla data vera, non sull'indice: due misure in una settimana e poi un
  // mese di vuoto si vedono come sono
  const giorni = Math.max(1, giorniTra(punti[0].data, punti[punti.length - 1].data));
  const xy = punti.map((p) => ({
    ...p,
    x: (giorniTra(punti[0].data, p.data) / giorni) * L,
    y: H - ((p.valore - min) / (max - min)) * H,
  }));
  const linea = xy.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  const area = `${linea} L${L} ${H} L0 ${H} Z`;
  const primo = punti[0];
  const ultimo = punti[punti.length - 1];

  return (
    <figure className={cx("m-0", className)}>
      <div className="flex gap-2">
        {/* scala a sinistra: massimo e minimo veri, non quelli con l'aria */}
        <div className="flex w-12 shrink-0 flex-col justify-between py-0.5 text-right text-[11px] tabular-nums leading-4 text-crm-spento">
          <span>{kg(Math.max(...valori))}</span>
          <span>{kg(Math.min(...valori))}</span>
        </div>
        <svg
          viewBox={`0 0 ${L} ${H}`}
          preserveAspectRatio="none"
          className="h-32 min-w-0 flex-1 overflow-visible"
          role="img"
          aria-label={`Peso da ${kg(primo.valore)} il ${dataBreve(primo.data)} a ${kg(ultimo.valore)} il ${dataBreve(ultimo.data)}`}
        >
          {[0, H / 2, H].map((y) => (
            <line key={y} x1={0} x2={L} y1={y} y2={y} stroke="#ebebeb" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}
          <path d={area} fill="#005bd3" fillOpacity={0.08} />
          <path
            d={linea}
            fill="none"
            stroke="#005bd3"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* un tratto lungo zero con estremi tondi e' un punto tondo anche se il viewBox si stira */}
          {xy.map((p, i) => (
            <path
              key={`${p.data}-${i}`}
              d={`M${p.x.toFixed(2)} ${p.y.toFixed(2)} l0 0`}
              stroke={i === xy.length - 1 ? "#005bd3" : "#ffffff"}
              strokeWidth={i === xy.length - 1 ? 8 : 6}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            >
              <title>{`${dataBreve(p.data)}: ${kg(p.valore)}`}</title>
            </path>
          ))}
          {xy.slice(0, -1).map((p, i) => (
            <path
              key={`c-${p.data}-${i}`}
              d={`M${p.x.toFixed(2)} ${p.y.toFixed(2)} l0 0`}
              stroke="#005bd3"
              strokeWidth={3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pointerEvents="none"
            />
          ))}
        </svg>
      </div>
      <figcaption className="ml-14 mt-1 flex justify-between text-[11px] leading-4 text-crm-spento">
        <span>{dataBreve(primo.data)}</span>
        <span>{dataBreve(ultimo.data)}</span>
      </figcaption>
    </figure>
  );
}
