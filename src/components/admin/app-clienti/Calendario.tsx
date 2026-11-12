"use client";

// Calendario del mese di un cliente: in ogni giorno cosa c'e' in programma e
// se il cliente l'ha fatto. Un tocco apre il giorno nell'editor.

import type { ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight, Utensils } from "lucide-react";
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
    <section className="crm-card">
      <header className="flex items-center gap-2 px-3 pb-1 pt-3 sm:px-4 sm:pt-4">
        <button
          type="button"
          onClick={() => onMese(spostaMese(mese, -1))}
          aria-label="Mese prima"
          className="crm-btn h-8 w-8 shrink-0 px-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="text-[15px] font-[650] capitalize leading-5 tracking-[-0.01em] text-crm-ink">{nomeMese(mese)}</p>
          <p className="text-[12px] leading-4 text-crm-tenue">
            {caricando ? "Carico…" : `${delMese.length} giorni con piano · ${fatti} fatti`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onMese(spostaMese(mese, 1))}
          aria-label="Mese dopo"
          className="crm-btn h-8 w-8 shrink-0 px-0"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        {meseDi(oggi) !== mese && (
          <button type="button" onClick={() => onMese(meseDi(oggi))} className="crm-btn h-8 shrink-0">
            Oggi
          </button>
        )}
      </header>

      <div className={cx("px-1.5 pb-3 pt-2 transition-opacity sm:px-4 sm:pb-4", caricando && "opacity-50")}>
        <div className="grid grid-cols-7 gap-0.5 pb-1.5 text-center text-[12px] font-[550] leading-4 text-crm-tenue sm:gap-1.5">
          {GIORNI.map((g) => (
            <span key={g}>
              <span className="sm:hidden">{g[0]}</span>
              <span className="hidden sm:inline">{g}</span>
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1.5">
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
              <div key={`vuoto-${i}`} />
            )
          )}
        </div>

        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1 text-[12px] leading-4 text-crm-tenue">
          <span className="inline-flex items-center gap-1.5">
            <SpuntaFatto /> fatto (fatica 1-5)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-crm-blu" /> ha lasciato un commento
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Utensils className="h-3 w-3" /> pasti
          </span>
        </p>
      </div>
    </section>
  );
}

/** La spunta verde di Polaris (badge "ok"), con la fatica accanto se c'e'. */
function SpuntaFatto({ children }: { children?: ReactNode }) {
  return (
    <span className="inline-flex h-4 shrink-0 items-center gap-0.5 rounded-[6px] bg-crm-ok px-1 text-[10px] font-[650] leading-none tabular-nums text-crm-ok-ink">
      <Check className="h-3 w-3" strokeWidth={3} />
      {children}
    </span>
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
        "relative flex min-h-[62px] min-w-0 flex-col items-stretch gap-0.5 rounded-lg p-1 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-crm-blu sm:min-h-[88px] sm:rounded-xl sm:p-1.5",
        aperto
          ? "bg-[#303030] text-white shadow-crm-card"
          : g
            ? "bg-white shadow-crm-anello hover:bg-crm-fondo"
            : passato
              ? "bg-[#fbfbfb] hover:bg-crm-fondo"
              : "bg-crm-fondo hover:bg-crm-fondo-2"
      )}
    >
      <span className="flex items-center gap-1">
        <span
          className={cx(
            "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-[650] tabular-nums sm:h-6 sm:min-w-6 sm:text-xs",
            oggi
              ? aperto
                ? "bg-white text-crm-ink"
                : "bg-crm-ink text-white"
              : aperto
                ? "text-white"
                : passato
                  ? "text-crm-spento"
                  : "text-crm-ink"
          )}
        >
          {giorno}
        </span>
        {g?.feedback && (
          <span
            className={cx("ml-auto h-2 w-2 shrink-0 rounded-full bg-crm-blu", aperto && "ring-2 ring-white/80")}
            title="Il cliente ha lasciato un commento"
          />
        )}
      </span>

      {g && titolo && (
        <span
          className={cx(
            "line-clamp-2 break-words text-[10px] font-[550] leading-tight sm:text-[11.5px] sm:leading-[15px]",
            aperto ? "text-white" : g.riposo ? "italic text-crm-tenue" : "text-crm-ink"
          )}
        >
          {titolo}
        </span>
      )}

      <span className="mt-auto flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
        {pasti > 0 && (
          <span
            className={cx("inline-flex items-center gap-0.5 text-[10px] tabular-nums sm:text-[11px]", aperto ? "text-white/70" : "text-crm-tenue")}
            title={`${pasti} pasti`}
          >
            <Utensils className="h-2.5 w-2.5" />
            {pasti}
          </span>
        )}
        {g?.fatto && (
          <span title={`Fatto${g.fatica ? `, fatica ${g.fatica}/5` : ""}`} className="inline-flex">
            <SpuntaFatto>{g.fatica ? <span className="hidden sm:inline">{g.fatica}/5</span> : null}</SpuntaFatto>
          </span>
        )}
      </span>
    </button>
  );
}
