"use client";

// Ernaehrung del giorno, dentro la sua linguetta: obiettivi (kcal, macro,
// acqua) come righe di una tabella, che reggono anche "Kohlenhydrate" sul
// telefono piu' stretto, poi i pasti con orario e le voci con la quantita'.
// Lo scorrimento lo fa il pannello che lo contiene.

import { Clock, Utensils } from "lucide-react";
import type { Alimentazione } from "@/lib/app-coaching/tipi";
import { CARTA, useTesti } from "./comuni";

export default function SezioneAlimentazione({
  alimentazione,
  titoloVisibile = false,
}: {
  alimentazione: Alimentazione;
  /** senza linguette sopra serve il titolo "Ernährung" */
  titoloVisibile?: boolean;
}) {
  const t = useTesti();
  const n = (v: number) => v.toLocaleString(t.locale);

  const obiettivi = [
    alimentazione.kcal != null && { etichetta: t.calorie, valore: `${n(alimentazione.kcal)} ${t.kcal}` },
    alimentazione.proteine != null && { etichetta: t.proteine, valore: t.grammi(alimentazione.proteine) },
    alimentazione.carboidrati != null && { etichetta: t.carboidrati, valore: t.grammi(alimentazione.carboidrati) },
    alimentazione.grassi != null && { etichetta: t.grassi, valore: t.grammi(alimentazione.grassi) },
    alimentazione.acqua?.trim() && { etichetta: t.acqua, valore: alimentazione.acqua.trim() },
  ].filter((o): o is { etichetta: string; valore: string } => !!o);

  const pasti = alimentazione.pasti ?? [];

  return (
    <section aria-labelledby="sezione-alimentazione" className="space-y-3">
      <h2
        id="sezione-alimentazione"
        className={titoloVisibile ? "flex items-center gap-2 text-xl font-bold" : "sr-only"}
      >
        <Utensils className="size-5 text-emerald-600" aria-hidden />
        {t.alimentazione}
      </h2>

      {obiettivi.length > 0 && (
        <dl className={`${CARTA} divide-y divide-black/[0.06]`}>
          {obiettivi.map((o) => (
            <div key={o.etichetta} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
              <dt className="text-neutral-600">{o.etichetta}</dt>
              <dd className="text-lg font-bold tabular-nums">{o.valore}</dd>
            </div>
          ))}
        </dl>
      )}

      {alimentazione.note?.trim() && (
        <p className="whitespace-pre-line text-neutral-700">{alimentazione.note}</p>
      )}

      {pasti.length > 0 && (
        <ol className="space-y-2.5">
          {pasti.map((p, i) => (
            <li key={p.id || i} className={`${CARTA} p-4`}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="min-w-0 text-xl font-bold leading-snug break-words">{p.nome}</h3>
                {p.orario?.trim() && (
                  <span className="inline-flex shrink-0 items-center gap-1 text-neutral-600 tabular-nums">
                    <Clock className="size-4 self-center" aria-hidden />
                    {p.orario}
                  </span>
                )}
              </div>
              {(p.voci?.length ?? 0) > 0 && (
                <ul className="mt-2 divide-y divide-black/[0.06]">
                  {p.voci.map((v, j) => (
                    <li key={v.id || j} className="flex items-baseline justify-between gap-4 py-2">
                      <span className="min-w-0 break-words">{v.testo}</span>
                      {v.quantita?.trim() && (
                        <span className="shrink-0 font-semibold text-neutral-700 tabular-nums">{v.quantita}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {p.kcal != null && (
                <p className="mt-2 text-neutral-600 tabular-nums">
                  {n(p.kcal)} {t.kcal}
                </p>
              )}
              {p.note?.trim() && <p className="mt-2 whitespace-pre-line text-neutral-600">{p.note}</p>}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
