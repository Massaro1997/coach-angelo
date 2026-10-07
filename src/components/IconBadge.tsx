"use client";

import type { LucideIcon } from "lucide-react";

/*
  ─────────────────────────────────────────────────────────────────────────
  IconBadge, lo stile icona del sito (22.09.2026).

  Fino a oggi ogni icona lucide stava per conto suo: nel wizard nuda dentro
  la pillola, nell'admin dentro riquadri inventati caso per caso. Nessuna
  firma riconoscibile. Qui la firma e' una sola e vive in un posto solo:
  "cerchio inciso, tratto rosso".

  Inciso vuol dire che il cerchio sembra scavato nella superficie, non un
  bottone appoggiato sopra: per questo l'ombra sta dentro e non c'e' nessuna
  ombra che cade verso l'esterno. L'anello rosso resta sottile e lascia
  parlare il tratto dell'icona, che e' il protagonista.

  Non si ridisegnano icone: si passa una qualunque icona di lucide-react e
  prende questa veste. Il giorno che ne serve una nuova basta sceglierla nel
  catalogo e la firma arriva gratis.
*/

type Misura = "sm" | "md" | "lg";

type IconBadgeProps = {
  /* L'icona lucide, passata come componente: <IconBadge come={Flame} /> */
  come: LucideIcon;
  misura?: Misura;
  /*
    Le risposte gia' scelte nel wizard devono staccare a colpo d'occhio:
    qui il cerchio si riempie di rosso e il tratto diventa chiaro.
  */
  attivo?: boolean;
  className?: string;
};

/*
  Tre misure, perche' tre bastano: la pillola del wizard (sm), le card e le
  liste (md), i titoli di sezione (lg). Il tratto si assottiglia man mano
  che il cerchio cresce, altrimenti sulle misure grandi l'icona sembrerebbe
  tracciata col pennarello.

  La misura sm sta volutamente sui 28 px: nella pillola del wizard un
  cerchio da 36 mandava a capo le risposte lunghe sul telefono, dove le
  opzioni stanno gia' su una colonna sola.
*/
const MISURE: Record<Misura, { box: string; icona: string; tratto: number }> = {
  sm: { box: "h-7 w-7", icona: "h-4 w-4", tratto: 2.25 },
  md: { box: "h-12 w-12", icona: "h-6 w-6", tratto: 2 },
  lg: { box: "h-16 w-16", icona: "h-8 w-8", tratto: 1.75 },
};

export default function IconBadge({
  come: Icona,
  misura = "md",
  attivo = false,
  className = "",
}: IconBadgeProps) {
  const m = MISURE[misura];

  /*
    L'incisione e' un nero a bassa opacita', non currentColor: currentColor
    seguirebbe il rosso del tratto e sporcherebbe il bordo, mentre un nero
    trasparente legge come incavo sia sul grigio scuro sia sul grigio
    chiaro. La hairline bianca al 3% fa da bordo interno illuminato, e nello
    stato attivo sparisce perche' sul pieno rosso si vedrebbe come sporco.
  */
  const inciso = attivo
    ? "inset 0 1px 2px rgba(0, 0, 0, 0.35)"
    : "inset 0 1px 2px rgba(0, 0, 0, 0.28), inset 0 0 0 1px rgba(255, 255, 255, 0.03)";

  /*
    Fondo e colore del tratto passano dalle variabili CSS lette qui, non
    dalle classi Tailwind bg-elevated / bg-gold. Due motivi, tutti e due
    concreti:

    - la skin .wizard-light in globals.css ha un selettore ad attributo,
      [class*="bg-elevated"], che aggancerebbe QUALUNQUE discendente del
      bottone e forzerebbe il cerchio al grigio scuro dentro una card
      bianca, senza che React possa vincerlo;
    - la regola globale .bg-gold sostituisce il fondo col gradiente firma,
      che ha i rossi scritti a mano: il cerchio attivo uscirebbe nei rossi
      del tema scuro anche dentro le sezioni chiare.

    Leggendo var(--gold) e var(--elevated) il badge segue davvero il tema
    ovunque, che e' quello che questo componente promette.
  */
  return (
    <span
      /*
        Decorativo: il cerchio non aggiunge nulla a quello che dice il testo
        accanto. aria-hidden sta sia qui sia sull'icona, cosi' nessun lettore
        di schermo annuncia due volte la stessa cosa.
      */
      aria-hidden
      data-icona-cerchio=""
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-full border transition-colors",
        m.box,
        attivo ? "border-gold" : "border-gold/35",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        boxShadow: inciso,
        background: attivo ? "var(--gold)" : "var(--elevated)",
        color: attivo ? "var(--background)" : "var(--gold)",
      }}
    >
      <Icona className={m.icona} strokeWidth={m.tratto} aria-hidden />
    </span>
  );
}
