"use client";

// Come mettere l'app sul telefono, in un foglio dal basso (dal menu o dalla
// riga in fondo alla schermata del codice). iPhone: solo a mano da Safari
// (Apple non ha un bottone). Android: il bottone di Chrome quando c'e', se no a mano.

import type { LucideIcon } from "lucide-react";
import { Download, EllipsisVertical, Share, SquarePlus } from "lucide-react";
import { installa, usePiattaforma, usePuoInstallare } from "./dispositivo";
import { useTesti } from "./comuni";
import Foglio from "./Foglio";

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
    <div>
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
    <div className="flex flex-col gap-5">
      {puo && (
        <button
          type="button"
          onClick={() => void installa()}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-lg font-semibold text-white transition-opacity active:opacity-80"
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

/** Le istruzioni in un foglio dal basso. */
export function FoglioInstalla({ onChiudi }: { onChiudi: () => void }) {
  const t = useTesti();
  return (
    <Foglio titolo={t.installaTitolo} onChiudi={onChiudi}>
      <Installa />
    </Foglio>
  );
}
