"use client";

// La card "Heute" in cima: il piano di oggi in due righe, tocco = apre il giorno.

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, CircleCheck, Dumbbell, Moon, Utensils } from "lucide-react";
import type { DataISO, Giornata } from "@/lib/app-coaching/tipi";
import { CARTA, formatta, haAlimentazione, haAllenamento, haPiano, Segnaposto, useTesti } from "./comuni";

function Riga({
  icona,
  titolo,
  dettaglio,
}: {
  icona: ReactNode;
  titolo: string;
  dettaglio?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icona}
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold leading-snug">{titolo}</p>
        {dettaglio && <p className="text-neutral-600">{dettaglio}</p>}
      </div>
    </div>
  );
}

const TONDO = "grid size-10 shrink-0 place-items-center rounded-full";

export default function CardOggi({
  oggi,
  giornata,
  pronta,
}: {
  oggi: DataISO | null;
  giornata: Giornata | undefined;
  /** il mese di oggi e' arrivato (anche vuoto) */
  pronta: boolean;
}) {
  const t = useTesti();
  if (!oggi || !pronta) return <Segnaposto altezze={["h-40"]} />;

  const g = haPiano(giornata) ? giornata : undefined;
  const allenamento = g && haAllenamento(g) ? g.allenamento : null;
  const alimentazione = g && haAlimentazione(g) ? g.alimentazione : null;
  const nEsercizi = allenamento?.esercizi?.length ?? 0;

  const dettaglioAllenamento = [nEsercizi > 0 ? t.esercizi(nEsercizi) : null, allenamento?.durata?.trim() || null]
    .filter(Boolean)
    .join(" · ");
  const nPasti = alimentazione?.pasti?.length ?? 0;
  const dettaglioAlimentazione = [
    nPasti > 0 ? t.pasti(nPasti) : null,
    alimentazione?.kcal != null ? `${alimentazione.kcal.toLocaleString(t.locale)} ${t.kcal}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/app/giorno/${oggi}`}
      className={`${CARTA} block p-5 transition-colors active:bg-neutral-50`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-2xl font-bold">{t.oggi}</h2>
        <span className="text-neutral-500">
          {formatta(oggi, t, { weekday: "short", day: "numeric", month: "long" })}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {!g && <p className="text-lg text-neutral-600">{t.nienteOggi}</p>}
        {allenamento && (
          <Riga
            icona={
              <span className={`${TONDO} bg-[var(--app-colore)]/10 text-[var(--app-colore)]`}>
                <Dumbbell className="size-5" aria-hidden />
              </span>
            }
            titolo={allenamento.titolo?.trim() || t.training}
            dettaglio={dettaglioAllenamento || undefined}
          />
        )}
        {g?.riposo && !allenamento && (
          <Riga
            icona={
              <span className={`${TONDO} bg-neutral-100 text-neutral-600`}>
                <Moon className="size-5" aria-hidden />
              </span>
            }
            titolo={t.riposo}
          />
        )}
        {alimentazione && (
          <Riga
            icona={
              <span className={`${TONDO} bg-emerald-50 text-emerald-600`}>
                <Utensils className="size-5" aria-hidden />
              </span>
            }
            titolo={t.alimentazione}
            dettaglio={dettaglioAlimentazione || undefined}
          />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-3">
        {g ? (
          g.fatto ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
              <CircleCheck className="size-5" aria-hidden />
              {t.fatto}
            </span>
          ) : (
            <span className="text-neutral-600">{t.daFare}</span>
          )
        ) : (
          <span className="text-neutral-600">{t.apriGiorno}</span>
        )}
        <ChevronRight className="size-6 text-neutral-400" aria-hidden />
      </div>
    </Link>
  );
}
