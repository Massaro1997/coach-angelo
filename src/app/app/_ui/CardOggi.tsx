"use client";

// La card "Heute" in cima, compatta: data e stato su una riga, il piano di
// oggi in pillole sotto. Tocco = apre il giorno. Alta sempre uguale (anche il
// segnaposto), cosi' il calendario sotto non salta quando arrivano i dati.

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, CircleCheck, Dumbbell, MessageSquareText, Moon, Utensils } from "lucide-react";
import type { DataISO, Giornata } from "@/lib/app-coaching/tipi";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { CARTA, formatta, haAlimentazione, haAllenamento, haPiano, Segnaposto, useTesti } from "./comuni";
import { segnaDalCalendario } from "./navigazione";

/** Alta come la card: niente salto quando arriva il mese */
const ALTEZZA = "h-[5.75rem]";

function Pillola({
  icona,
  tono,
  cresce,
  children,
}: {
  icona: ReactNode;
  tono: string;
  /** prende lo spazio che resta (e si tronca) */
  cresce?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex h-9 min-w-0 items-center gap-1.5 rounded-lg px-2.5 text-[15px] font-semibold ${tono} ${
        cresce ? "flex-1" : "max-w-[60%] shrink-0"
      }`}
    >
      <span className="shrink-0">{icona}</span>
      <span className="truncate">{children}</span>
    </span>
  );
}

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
  if (!oggi || !pronta) {
    return (
      <div className="shrink-0">
        <Segnaposto altezze={[ALTEZZA]} />
      </div>
    );
  }

  const g = haPiano(giornata) ? giornata : undefined;
  const allenamento = g && haAllenamento(g) ? g.allenamento : null;
  const alimentazione = g && haAlimentazione(g) ? g.alimentazione : null;
  const nEsercizi = allenamento?.esercizi?.length ?? 0;
  const nPasti = alimentazione?.pasti?.length ?? 0;
  const dettaglioAlimentazione =
    alimentazione?.kcal != null
      ? `${alimentazione.kcal.toLocaleString(t.locale)} ${t.kcal}`
      : nPasti > 0
        ? t.pasti(nPasti)
        : t.alimentazione;
  const soloNota = !!g && !allenamento && !alimentazione && !g.riposo;

  return (
    <Link
      href={`/app/giorno/${oggi}`}
      onClick={segnaDalCalendario}
      className={`${CARTA} ${ALTEZZA} flex shrink-0 flex-col justify-center px-4 transition-colors active:bg-neutral-50`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 truncate">
          <span className="text-lg font-bold">{t.oggi}</span>
          <span className="ml-2 text-[15px] text-neutral-500">
            {formatta(oggi, t, { weekday: "short", day: "numeric", month: "long" })}
          </span>
        </p>
        <span className="flex shrink-0 items-center gap-1 text-[15px]">
          {g &&
            (g.fatto ? (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <CircleCheck className="size-4" aria-hidden />
                {t.fatto}
              </span>
            ) : (
              <span className="text-neutral-500">{t.daFare}</span>
            ))}
          <ChevronRight className="-mr-1 size-5 text-neutral-400" aria-hidden />
        </span>
      </div>

      <div className="mt-2 flex min-w-0 gap-2">
        {!g && <p className="h-9 min-w-0 truncate text-[15px] leading-9 text-neutral-600">{t.nienteOggi}</p>}
        {allenamento && (
          <Pillola
            cresce
            tono="bg-[var(--app-colore)]/10 text-[var(--app-colore-scuro)]"
            icona={<Dumbbell className="size-4" aria-hidden />}
          >
            {allenamento.titolo?.trim() || t.training}
            {nEsercizi > 0 && <span className="font-normal"> · {t.esercizi(nEsercizi)}</span>}
          </Pillola>
        )}
        {g?.riposo && !allenamento && (
          <Pillola
            cresce={!alimentazione}
            tono="bg-neutral-100 text-neutral-700"
            icona={<Moon className="size-4" aria-hidden />}
          >
            {t.riposo}
          </Pillola>
        )}
        {alimentazione && (
          <Pillola
            cresce={!allenamento && !g?.riposo}
            tono="bg-emerald-50 text-emerald-800"
            icona={<Utensils className="size-4" aria-hidden />}
          >
            {dettaglioAlimentazione}
          </Pillola>
        )}
        {/* c'e' solo la nota del coach: si legge aprendo il giorno */}
        {soloNota && (
          <Pillola
            cresce
            tono="bg-neutral-100 text-neutral-700"
            icona={<MessageSquareText className="size-4" aria-hidden />}
          >
            {t.notaCoach(MARCHIO.coach)}
          </Pillola>
        )}
      </div>
    </Link>
  );
}
