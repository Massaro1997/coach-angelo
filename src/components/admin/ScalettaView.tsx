"use client";

import { Check, Circle, CircleDot } from "lucide-react";
import { Card, Badge, Stat, cx } from "./ui";
import { SCALETTA, AGGIORNATA, type Stato, type Fase } from "@/lib/scaletta";

// La scaletta del rebranding: le fasi in ordine, e per ogni voce a che punto
// siamo e cosa serve per andare avanti. I dati stanno in lib/scaletta.ts.

const ETICHETTA: Record<Stato, { testo: string; tone: string }> = {
  fatto: { testo: "Fatto", tone: "green" },
  "in-corso": { testo: "In corso", tone: "blue" },
  "da-fare": { testo: "Da fare", tone: "outline" },
};

function Icona({ stato }: { stato: Stato }) {
  if (stato === "fatto") return <Check className="h-4 w-4 text-green-600" />;
  if (stato === "in-corso") return <CircleDot className="h-4 w-4 text-blue-600" />;
  return <Circle className="h-4 w-4 text-neutral-300" />;
}

function statoFase(f: Fase): Stato {
  if (f.voci.every((v) => v.stato === "fatto")) return "fatto";
  if (f.voci.some((v) => v.stato !== "da-fare")) return "in-corso";
  return "da-fare";
}

export default function ScalettaView({ onMarchio }: { onMarchio: () => void }) {
  const voci = SCALETTA.flatMap((f) => f.voci);
  const fatte = voci.filter((v) => v.stato === "fatto").length;
  const inCorso = voci.filter((v) => v.stato === "in-corso").length;
  const daTe = voci.filter((v) => v.serve && v.stato !== "fatto").length;
  const perc = Math.round((fatte / voci.length) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Voci in scaletta" value={voci.length} sub={`${SCALETTA.length} fasi`} />
        <Stat label="Fatte" value={fatte} sub={`${perc}% del totale`} tone="green" />
        <Stat label="In corso" value={inCorso} sub="Fase 1, nome e logo" tone="blue" onClick={onMarchio} />
        <Stat label="Aspettano te" value={daTe} sub="Scelte e materiali" tone="amber" />
      </div>

      <div className="h-1.5 bg-black/[0.06]">
        <div className="h-full bg-green-600" style={{ width: `${perc}%` }} />
      </div>

      {SCALETTA.map((f) => {
        const s = statoFase(f);
        return (
          <Card
            key={f.n}
            title={`Fase ${f.n}. ${f.titolo}`}
            action={<Badge tone={ETICHETTA[s].tone}>{ETICHETTA[s].testo}</Badge>}
            bodyClassName=""
          >
            <p className="border-b border-black/[0.07] px-4 py-3 text-xs leading-relaxed text-neutral-500 sm:px-5">
              {f.obiettivo}
            </p>
            <ul className="divide-y divide-black/[0.07]">
              {f.voci.map((v) => (
                <li key={v.titolo} className="flex gap-3 px-4 py-3 sm:px-5">
                  <span className="mt-0.5 shrink-0">
                    <Icona stato={v.stato} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cx(
                        "text-[13px] font-semibold leading-snug",
                        v.stato === "fatto" ? "text-neutral-400 line-through" : "text-neutral-900"
                      )}
                    >
                      {v.titolo}
                    </p>
                    {v.nota && <p className="mt-1 text-xs leading-relaxed text-neutral-500">{v.nota}</p>}
                    {v.serve && v.stato !== "fatto" && (
                      <p className="mt-1.5 border-l-2 border-amber-500 pl-2 text-xs leading-relaxed text-neutral-700">
                        <span className="font-bold">Serve da te: </span>
                        {v.serve}
                      </p>
                    )}
                  </div>
                  <Badge tone={ETICHETTA[v.stato].tone} className="hidden h-fit shrink-0 sm:inline-flex">
                    {ETICHETTA[v.stato].testo}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        );
      })}

      <p className="text-[11px] text-neutral-400">
        Aggiornata il {AGGIORNATA}. Lo stato delle voci si aggiorna a ogni sessione di lavoro.
      </p>
    </div>
  );
}
