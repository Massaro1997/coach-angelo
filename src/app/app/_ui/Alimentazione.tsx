"use client";

// Ernaehrung del giorno: testata con la ciotola 3D, gli obiettivi (kcal,
// macro, acqua) in tessere uguali su una griglia a due SEMPRE completa (se
// sono dispari la prima, le kcal, prende tutta la riga), la nota del coach,
// poi i pasti come card. Una sola ha la foto: la colazione se c'e', se no il
// primo pasto col mealprep, ma solo se la foto del giorno non e' gia' quella
// (una foto, non dappertutto). Le altre card hanno la ciotola 3D. Le voci
// hanno la quantita' allineata a destra. Nessuno scorrimento proprio: scorre
// #app-scroll di AppShell.

import type { Alimentazione, Pasto } from "@/lib/app-coaching/tipi";
import { CARTA, useTesti } from "./comuni";
import { Icona3D, SchedaFoto } from "./kit";
import type { NomeFoto } from "./immagini";
import { NotaPiano, TestataParte } from "./Allenamento";

/** Il pasto del mattino, come lo scrive il coach in tedesco, italiano o inglese. */
const COLAZIONE = /fr(ü|ue|u)hst|colazion|breakfast|morgen/i;

function VociPasto({ p }: { p: Pasto }) {
  const voci = p.voci ?? [];
  const nota = p.note?.trim();
  return (
    <>
      {voci.length > 0 && (
        <ul className="divide-y divide-black/[0.06]">
          {voci.map((v, j) => (
            <li key={v.id || j} className="flex items-baseline justify-between gap-4 py-2.5">
              <span className="min-w-0 break-words text-[16px]">{v.testo}</span>
              {v.quantita?.trim() && (
                <span className="shrink-0 text-right text-[16px] font-semibold text-neutral-700 tabular-nums">
                  {v.quantita}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {nota && (
        <p className={`whitespace-pre-line break-words text-[15px] leading-relaxed text-neutral-600 ${voci.length > 0 ? "mt-2" : ""}`}>
          {nota}
        </p>
      )}
    </>
  );
}

export default function SezioneAlimentazione({
  alimentazione,
  fotoGiorno,
}: {
  alimentazione: Alimentazione;
  /** la foto in cima al giorno: qui non si ripete */
  fotoGiorno?: NomeFoto;
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
  // griglia a due completa: con un numero dispari la prima tessera fa tutta la riga
  const dispari = obiettivi.length % 2 === 1;

  const pasti = alimentazione.pasti ?? [];
  const nota = alimentazione.note?.trim();

  // il pasto con la foto: la colazione, se no il primo col mealprep (se la foto
  // del giorno non e' gia' il mealprep); -1 = nessuno
  const iColazione = pasti.findIndex((p) => COLAZIONE.test(p.nome));
  const conFoto = iColazione >= 0 ? iColazione : pasti.length > 0 && fotoGiorno !== "mealprep" ? 0 : -1;
  const fotoPasto: NomeFoto = iColazione >= 0 ? "colazione" : "mealprep";

  return (
    <section aria-labelledby="sezione-alimentazione">
      <TestataParte id="sezione-alimentazione" icona="ciotola" titolo={t.alimentazione} />

      {obiettivi.length > 0 && (
        <dl className="grid grid-cols-2 gap-2">
          {obiettivi.map((o, i) => (
            <div
              key={o.etichetta}
              // valore grande sopra, nome sotto; dt prima nel DOM per chi legge con la voce
              className={`${CARTA} flex min-h-[84px] flex-col-reverse justify-center px-4 py-3 ${
                dispari && i === 0 ? "col-span-2" : ""
              }`}
            >
              <dt className="mt-0.5 truncate text-[15px] text-neutral-500">{o.etichetta}</dt>
              <dd className="text-[22px] font-bold leading-tight break-words tabular-nums">{o.valore}</dd>
            </div>
          ))}
        </dl>
      )}

      {nota && (
        <div className={obiettivi.length > 0 ? "mt-3" : ""}>
          <NotaPiano testo={nota} />
        </div>
      )}

      {pasti.length > 0 && (
        <ol className={`space-y-3 ${obiettivi.length > 0 || nota ? "mt-3" : ""}`}>
          {pasti.map((p, i) => {
            const info = [p.orario?.trim(), p.kcal != null && `${n(p.kcal)} ${t.kcal}`].filter(Boolean).join(" · ");
            const dentro = (p.voci?.length ?? 0) > 0 || !!p.note?.trim();
            if (i === conFoto) {
              return (
                <li key={p.id || i}>
                  <SchedaFoto
                    foto={fotoPasto}
                    proporzione="2/1"
                    titolo={<h3 className="break-words">{p.nome}</h3>}
                    sotto={info ? <span className="tabular-nums">{info}</span> : undefined}
                  >
                    {dentro ? <VociPasto p={p} /> : undefined}
                  </SchedaFoto>
                </li>
              );
            }
            return (
              <li key={p.id || i} className={`${CARTA} p-4`}>
                <div className="flex items-center gap-3">
                  <Icona3D nome="ciotola" dimensione={40} />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[18px] font-bold leading-snug break-words">{p.nome}</h3>
                    {info && <p className="text-[15px] leading-snug text-neutral-500 tabular-nums">{info}</p>}
                  </div>
                </div>
                {dentro && (
                  <div className="mt-3">
                    <VociPasto p={p} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
