"use client";

// Training del giorno, dentro la sua linguetta: titolo e durata in una riga,
// poi gli esercizi come schede, nome grande e i numeri che servono in
// palestra subito sotto. Lo scorrimento lo fa il pannello che lo contiene.

import type { ReactNode } from "react";
import { CirclePlay, Clock, Dumbbell, Moon, Timer, Weight } from "lucide-react";
import type { Allenamento, Esercizio } from "@/lib/app-coaching/tipi";
import type { Testi } from "../testi";
import { CARTA, linkSicuro, useTesti } from "./comuni";

function Chip({ children, forte, icona }: { children: ReactNode; forte?: boolean; icona?: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 tabular-nums ${
        forte
          ? "bg-[var(--app-colore)]/10 text-lg font-bold text-[var(--app-colore-scuro)]"
          : "bg-neutral-100 font-medium text-neutral-800"
      }`}
    >
      {icona}
      {children}
    </span>
  );
}

function serieRipetizioni(e: Esercizio, t: Testi): string | null {
  const s = e.serie?.trim();
  const r = e.ripetizioni?.trim();
  if (s && r) return t.serieRip(s, r);
  if (s) return t.soloSerie(s);
  if (r) return t.soloRip(r);
  return null;
}

function SchedaEsercizio({ e, n }: { e: Esercizio; n: number }) {
  const t = useTesti();
  const sr = serieRipetizioni(e, t);
  const carico = e.carico?.trim();
  const pausa = e.pausa?.trim();
  const video = linkSicuro(e.video);

  return (
    <div className={`${CARTA} p-4`}>
      <div className="flex gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-900 text-[15px] font-bold text-white tabular-nums">
          {n}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold leading-snug break-words">{e.nome}</h3>
          {(sr || carico || pausa) && (
            <div className="mt-2 flex flex-wrap gap-2">
              {sr && <Chip forte>{sr}</Chip>}
              {carico && (
                <Chip icona={<Weight className="size-4 text-neutral-500" aria-label={t.carico} />}>{carico}</Chip>
              )}
              {pausa && (
                <Chip icona={<Timer className="size-4 text-neutral-500" aria-hidden />}>{t.pausa(pausa)}</Chip>
              )}
            </div>
          )}
          {e.note?.trim() && <p className="mt-2 whitespace-pre-line text-neutral-600">{e.note}</p>}
          {video && (
            <a
              href={video}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex h-11 items-center gap-2 rounded-xl bg-neutral-100 px-4 font-semibold text-neutral-900 active:bg-neutral-200"
            >
              <CirclePlay className="size-5 text-[var(--app-colore)]" aria-hidden />
              {t.video}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SezioneAllenamento({
  allenamento,
  riposo = false,
  titoloVisibile = false,
}: {
  allenamento: Allenamento;
  /** giorno segnato anche come riposo (es. solo mobilita') */
  riposo?: boolean;
  /** senza linguette sopra serve il titolo "Training" */
  titoloVisibile?: boolean;
}) {
  const t = useTesti();
  const titolo = allenamento.titolo?.trim();
  const durata = allenamento.durata?.trim();
  const esercizi = allenamento.esercizi ?? [];

  return (
    <section aria-labelledby="sezione-training">
      <h2
        id="sezione-training"
        className={titoloVisibile ? "mb-2 flex items-center gap-2 text-xl font-bold" : "sr-only"}
      >
        <Dumbbell className="size-5 text-[var(--app-colore)]" aria-hidden />
        {t.training}
      </h2>

      {riposo && (
        <p className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-2.5 py-1 font-medium text-neutral-700">
          <Moon className="size-4" aria-hidden />
          {t.riposo}
        </p>
      )}

      {(titolo || durata) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-lg">
          {titolo && <span className="font-semibold">{titolo}</span>}
          {durata && (
            <span className="inline-flex items-center gap-1.5 text-neutral-600">
              <Clock className="size-5" aria-label={t.durata} />
              {durata}
            </span>
          )}
        </div>
      )}
      {allenamento.note?.trim() && (
        <p className="mt-1.5 whitespace-pre-line text-neutral-700">{allenamento.note}</p>
      )}

      {esercizi.length > 0 && (
        <ol className={`space-y-2.5 ${titolo || durata || allenamento.note?.trim() ? "mt-3" : ""}`}>
          {esercizi.map((e, i) => (
            <li key={e.id || i}>
              <SchedaEsercizio e={e} n={i + 1} />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
