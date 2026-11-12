"use client";

// Come mettere l'app sul telefono. iPhone: solo a mano da Safari (Apple non
// ha un bottone). Android: il bottone di Chrome quando c'e', se no a mano.

import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import { Download, EllipsisVertical, Share, SquarePlus, X } from "lucide-react";
import { installa, usePiattaforma, usePuoInstallare } from "./dispositivo";
import { useTesti } from "./comuni";

function Passi({
  titolo,
  passi,
  icone,
  nota,
}: {
  titolo?: string;
  passi: string[];
  icone: (LucideIcon | null)[];
  nota?: string;
}) {
  return (
    <div className="mt-5">
      {titolo && <h3 className="text-lg font-bold">{titolo}</h3>}
      <ol className="mt-2 space-y-3">
        {passi.map((p, i) => {
          const Icona = icone[i];
          return (
            <li key={i} className="flex items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-900 text-[15px] font-bold text-white tabular-nums">
                {i + 1}
              </span>
              <span className="flex-1">{p}</span>
              {Icona && <Icona className="size-6 shrink-0 text-neutral-500" aria-hidden />}
            </li>
          );
        })}
      </ol>
      {nota && <p className="mt-3 text-neutral-600">{nota}</p>}
    </div>
  );
}

export function Installa() {
  const t = useTesti();
  const piattaforma = usePiattaforma();
  const puo = usePuoInstallare();
  // prima di sapere che telefono e' (sul server) niente: evita il salto
  if (piattaforma === null) return null;
  // dal computer non si sa su che telefono andra': tutte e due
  const entrambe = piattaforma === "altro";

  return (
    <div>
      <h2 className="text-xl font-bold">{t.installaTitolo}</h2>
      {puo && (
        <button
          type="button"
          onClick={() => void installa()}
          className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-lg font-semibold text-white transition-opacity active:opacity-80"
        >
          <Download className="size-5" aria-hidden />
          {t.installaBottone}
        </button>
      )}
      {(piattaforma === "iphone" || entrambe) && (
        <Passi
          titolo={entrambe ? t.iphone : undefined}
          passi={t.passiIphone}
          icone={[Share, SquarePlus, null]}
          nota={t.notaIphone}
        />
      )}
      {(piattaforma === "android" || entrambe) && !puo && (
        <Passi
          titolo={entrambe ? t.android : undefined}
          passi={t.passiAndroid}
          icone={[EllipsisVertical, Download]}
        />
      )}
    </div>
  );
}

/** Le istruzioni in un foglio dal basso, aperto dal menu. */
export function FoglioInstalla({ onChiudi }: { onChiudi: () => void }) {
  const t = useTesti();

  useEffect(() => {
    const tasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChiudi();
    };
    document.addEventListener("keydown", tasto);
    return () => document.removeEventListener("keydown", tasto);
  }, [onChiudi]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-label={t.installaTitolo}>
      <button type="button" aria-label={t.chiudi} onClick={onChiudi} className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-xl rounded-t-3xl bg-white px-5 pb-[calc(1.5rem_+_env(safe-area-inset-bottom))] pt-5">
        <button
          type="button"
          onClick={onChiudi}
          aria-label={t.chiudi}
          className="absolute right-3 top-3 grid size-11 place-items-center rounded-full text-neutral-500 active:bg-neutral-100"
        >
          <X className="size-6" aria-hidden />
        </button>
        <Installa />
      </div>
    </div>
  );
}
