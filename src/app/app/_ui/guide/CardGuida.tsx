"use client";

// Card di una guida per le griglie a due colonne, in stile Apple (13/11
// notte): foto alta 4:5 che riempie la card, titolo e minuti DENTRO la foto in
// basso, bianchi su una sfumatura che sale dal fondo.
// Prima versione: (/app/guide e "Weiterlesen"
// sotto una guida; la puo' usare anche la home). Stesso aspetto di SchedaFoto
// del kit (foto 3:2 chiara in alto, testo SOTTO, mai sopra la foto), ma fatta
// per la colonna stretta: niente freccia a destra che ruba spazio al titolo
// (su un telefono da 360 px "anstrengend" a 18 px non ci stava), titolo a
// 17 px con la sillabazione della lingua giusta e i minuti sempre in fondo,
// cosi' le card di una riga sono alte uguali e i minuti stanno in fila.
// Va dentro una cella della griglia: occupa tutta l'altezza della cella.

import Image from "next/image";
import Link from "next/link";
import { fotoSrc } from "../immagini";
import { useLingua } from "../kit";
import { segnaAvanti } from "../navigazione";
import type { Guida } from "./dati";

/** "3 Min." / "3 min": i minuti di lettura, nelle card e sotto il titolo della guida. */
export function minutiLettura(minuti: number, lingua: "de" | "it"): string {
  return lingua === "it" ? `${minuti} min` : `${minuti} Min.`;
}

export default function CardGuida({ guida, priorita }: { guida: Guida; priorita?: boolean }) {
  const lingua = useLingua();
  return (
    <Link
      href={`/app/guide/${guida.slug}`}
      onClick={segnaAvanti}
      className="relative isolate flex h-full min-h-0 w-full flex-col justify-end overflow-hidden rounded-[22px] bg-neutral-800 text-left text-white shadow-[0_2px_14px_rgba(0,0,0,0.08)] transition-transform duration-200 active:scale-[0.98]"
      style={{ aspectRatio: "4/5" }}
    >
      <Image
        src={fotoSrc(guida.foto)}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 36rem) 50vw, 18rem"
        draggable={false}
        loading={priorita ? "eager" : "lazy"}
        fetchPriority={priorita ? "high" : undefined}
        className="-z-10 select-none object-cover"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[72%] bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0)_100%)]"
      />
      <span className="block p-3.5 pt-10">
        <span
          lang={lingua}
          className="block hyphens-auto break-words text-[17px] font-bold leading-[1.18] tracking-[-0.01em] [text-shadow:0_1px_10px_rgba(0,0,0,0.25)]"
        >
          {guida[lingua].titolo}
        </span>
        <span className="mt-1 block text-[13px] font-medium text-white/80">{minutiLettura(guida.minuti, lingua)}</span>
      </span>
    </Link>
  );
}
