"use client";

// Calendario del mese di un cliente: in ogni giorno cosa c'e' in programma e
// se il cliente l'ha fatto. Un tocco apre il giorno nell'editor.

import { ChevronLeft, ChevronRight, CircleCheck, Utensils } from "lucide-react";
import { cx } from "../ui";
import type { DataISO, Giornata, MeseISO } from "@/lib/app-coaching/tipi";
import { grigliaMese, meseDi, spostaMese } from "@/lib/app-coaching/date";
import { nomeMese } from "./comune";
import { titoloGiorno } from "./piano";

const GIORNI = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

export default function Calendario({
  mese,
  oggi,
  giornate,
  aperto,
  caricando,
  onMese,
  onGiorno,
}: {
  mese: MeseISO;
  oggi: DataISO;
  giornate: Record<DataISO, Giornata>;
  aperto: DataISO | null;
  caricando: boolean;
  onMese: (m: MeseISO) => void;
  onGiorno: (d: DataISO) => void;
}) {
  const settimane = grigliaMese(mese);
  const delMese = Object.values(giornate).filter((g) => meseDi(g.data) === mese);
  const fatti = delMese.filter((g) => g.fatto).length;

  return (
    <section className="border border-black/10 bg-white">
      <header className="flex items-center gap-2 border-b border-black/[0.07] px-3 py-2.5 sm:px-4">
        <button
          type="button"
          onClick={() => onMese(spostaMese(mese, -1))}
          aria-label="Mese prima"
          className="inline-flex h-9 w-9 items-center justify-center text-neutral-600 hover:bg-black/5"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="text-sm font-bold capitalize text-neutral-900">{nomeMese(mese)}</p>
          <p className="text-[11px] text-neutral-400">
            {caricando ? "Carico…" : `${delMese.length} giorni con piano · ${fatti} fatti`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onMese(spostaMese(mese, 1))}
          aria-label="Mese dopo"
          className="inline-flex h-9 w-9 items-center justify-center text-neutral-600 hover:bg-black/5"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        {meseDi(oggi) !== mese && (
          <button
            type="button"
            onClick={() => onMese(meseDi(oggi))}
            className="border border-black/15 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-700 hover:border-black/30"
          >
            Oggi
          </button>
        )}
      </header>

      <div className={cx("p-1.5 transition-opacity sm:p-3", caricando && "opacity-50")}>
        <div className="grid grid-cols-7 gap-px pb-1 text-center text-[10px] font-semibold uppercase tracking-wide text-neutral-400 sm:text-[11px]">
          {GIORNI.map((g) => (
            <span key={g}>
              <span className="sm:hidden">{g[0]}</span>
              <span className="hidden sm:inline">{g}</span>
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-black/[0.07] p-px">
          {settimane.flat().map((d, i) =>
            d ? (
              <Cella
                key={d}
                data={d}
                g={giornate[d]}
                oggi={d === oggi}
                passato={d < oggi}
                aperto={d === aperto}
                onClick={() => onGiorno(d)}
              />
            ) : (
              <div key={`vuoto-${i}`} className="bg-[#fafafa]" />
            )
          )}
        </div>

        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[11px] text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <CircleCheck className="h-3.5 w-3.5 text-green-600" /> fatto (fatica 1-5)
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-600" /> ha lasciato un commento
          </span>
          <span className="inline-flex items-center gap-1">
            <Utensils className="h-3 w-3" /> pasti
          </span>
        </p>
      </div>
    </section>
  );
}

function Cella({
  data,
  g,
  oggi,
  passato,
  aperto,
  onClick,
}: {
  data: DataISO;
  g?: Giornata;
  oggi: boolean;
  passato: boolean;
  aperto: boolean;
  onClick: () => void;
}) {
  const titolo = g ? titoloGiorno(g) : "";
  const pasti = g?.alimentazione?.pasti?.length ?? 0;
  const giorno = Number(data.slice(8));

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aperto}
      aria-label={`${giorno}${titolo ? `, ${titolo}` : g ? "" : ", vuoto"}${g?.fatto ? ", fatto" : ""}`}
      className={cx(
        "relative flex min-h-[62px] min-w-0 flex-col items-stretch gap-0.5 p-1 text-left transition-colors sm:min-h-[88px] sm:p-1.5",
        aperto
          ? "bg-neutral-900 text-white"
          : passato && !g
            ? "bg-[#fcfcfc] hover:bg-[#f4f4f5]"
            : "bg-white hover:bg-[#f7f7f8]"
      )}
    >
      <span className="flex items-center gap-1">
        <span
          className={cx(
            "inline-flex h-5 min-w-5 items-center justify-center px-1 text-[11px] font-bold tabular-nums sm:text-xs",
            oggi ? "bg-gold text-white" : aperto ? "text-white" : passato ? "text-neutral-400" : "text-neutral-800"
          )}
        >
          {giorno}
        </span>
        {g?.feedback && (
          <span
            className="ml-auto h-2 w-2 shrink-0 rounded-full bg-blue-600"
            title="Il cliente ha lasciato un commento"
          />
        )}
      </span>

      {g && titolo && (
        <span
          className={cx(
            "line-clamp-2 break-words text-[9.5px] font-semibold leading-tight sm:text-[11px]",
            aperto ? "text-white" : g.riposo ? "italic text-neutral-400" : "text-neutral-800"
          )}
        >
          {titolo}
        </span>
      )}

      <span className="mt-auto flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
        {pasti > 0 && (
          <span
            className={cx("inline-flex items-center gap-0.5 text-[10px] tabular-nums", aperto ? "text-white/70" : "text-neutral-500")}
            title={`${pasti} pasti`}
          >
            <Utensils className="h-2.5 w-2.5" />
            {pasti}
          </span>
        )}
        {g?.fatto && (
          <span
            className={cx("inline-flex items-center gap-0.5 text-[10px] font-bold tabular-nums", aperto ? "text-green-300" : "text-green-700")}
            title={`Fatto${g.fatica ? `, fatica ${g.fatica}/5` : ""}`}
          >
            <CircleCheck className="h-3 w-3" />
            {g.fatica ? <span className="hidden sm:inline">{g.fatica}/5</span> : null}
          </span>
        )}
      </span>
    </button>
  );
}
