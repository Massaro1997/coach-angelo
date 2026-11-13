"use client";

// Mattoncini comuni della v2. API FISSA (li usano schede scritte in parallelo):
//   Sezione  {titolo?, azione?, children}             gruppo con titoletto
//   Scheda   {children, className?, onClick?, href?}  card bianca 20px
//   Riga     {titolo, sotto?, destra?, icona?, onClick?, href?}  riga di lista con freccia
//   Tasto    {children, onClick?, href?, variante?: "primario"|"secondario"|"testo",
//             disabled?, pieno?, icona?, type?}
//   Pillola  {children, tono?: "neutro"|"marchio"|"ok"|"attesa"|"errore"}
//   Vuoto    {icona?, titolo, testo?, azione?}
//   Caricamento {}                                     scheletro grigio
//   ErroreBox {testo, riprova?}
//   useLingua(): "de" | "it"
//   euro(n): "50 €"
// Aggiunti dopo (13/11), stessa regola:
//   Lista    {children}                               card bianca 20px senza margini, righe divise (per Riga)
//   Segmenti {voci: {id, etichetta, icona?}[], attiva, onCambia, etichetta?}  controllo a segmenti
// Aggiunti il 13/11 sera (foto e icone 3D, vedi immagini.ts), stessa regola:
//   Icona3D   {nome, dimensione?=40, alt?}             icona 3D rossa e nera, sfondo trasparente
//   SchedaFoto {foto, titolo, sotto?, sopra?, destra?, proporzione?="16/9", href?, onClick?,
//               priorita?, vivo?, children?}          card stile Apple: titolo DENTRO la foto in
//                                                      basso, children sotto su bianco. Con
//                                                      href/onClick niente tasti nei children.
//   Tessera   {icona, titolo, sotto?, href?, onClick?, segnale?}  tessera quadrata per griglie a 2
//   Riga      + icona3d?: NomeIcona                    icona 3D al posto del tondo grigio
//   Sottolineata {children}                           parola rossa col tratto a mano sotto, come
//                                                      nei titoli del sito (globals.css .fp-sotto)
// Titoli di sezione e titoli dentro le foto usano .app-titolo (layout.tsx): il
// Kanit corsivo maiuscolo dei titoli del sito.
// Le icone Ionicons (react-icons/io5, stile iOS, dal 13/11 al posto di lucide) restano
// per i comandi (frecce, chiudi, indietro, spunte piccole);
// per dire "di cosa si parla" (card, righe, vuoti, tessere) si usa Icona3D.
// L'aspetto si puo' rifinire, i nomi e le props no.

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { IoChevronForward } from "react-icons/io5";
import { useArchivio } from "./archivio";
import { fotoSrc, iconaSrc, type NomeFoto, type NomeIcona } from "./immagini";

export function useLingua(): "de" | "it" {
  return useArchivio().lingua === "it" ? "it" : "de";
}

export function euro(n: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
}

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export function Sezione({ titolo, azione, children }: { titolo?: ReactNode; azione?: ReactNode; children: ReactNode }) {
  return (
    <section className="mt-6 first:mt-2">
      {(titolo || azione) && (
        <div className="mb-2 flex items-center gap-2 px-1">
          {titolo && <h2 className="app-titolo text-[21px]">{titolo}</h2>}
          {azione && <div className="ml-auto">{azione}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Scheda({
  children,
  className,
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const cls = cx("block rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]", (onClick || href) && "active:scale-[0.99] transition-transform", className);
  if (href) return <Link href={href} onClick={onClick} className={cls}>{children}</Link>;
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={cx(cls, "w-full text-left")}>
        {children}
      </button>
    );
  return <div className={cls}>{children}</div>;
}

export function Riga({
  titolo,
  sotto,
  destra,
  icona,
  icona3d,
  onClick,
  href,
}: {
  titolo: ReactNode;
  sotto?: ReactNode;
  destra?: ReactNode;
  icona?: ReactNode;
  /** icona 3D (immagini.ts) al posto del tondo grigio con l'icona Ionicons */
  icona3d?: NomeIcona;
  onClick?: () => void;
  href?: string;
}) {
  const dentro = (
    <>
      {icona3d && <Icona3D nome={icona3d} dimensione={40} />}
      {!icona3d && icona && <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 [&_svg]:h-[18px] [&_svg]:w-[18px]">{icona}</span>}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold">{titolo}</span>
        {sotto && <span className="block truncate text-[13px] text-neutral-500">{sotto}</span>}
      </span>
      {destra && <span className="shrink-0 text-[14px] text-neutral-600">{destra}</span>}
      {(onClick || href) && <IoChevronForward className="h-4 w-4 shrink-0 text-neutral-400" />}
    </>
  );
  const cls = cx(
    "flex min-h-[56px] w-full items-center gap-3 px-4 py-2.5 text-left",
    (onClick || href) && "transition-colors active:bg-neutral-50"
  );
  if (href) return <Link href={href} onClick={onClick} className={cls}>{dentro}</Link>;
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={cls}>
        {dentro}
      </button>
    );
  return <div className={cls}>{dentro}</div>;
}

/** Card senza margini per una lista di Riga, con le linee tra una e l'altra. */
export function Lista({ children }: { children: ReactNode }) {
  return (
    <div className="divide-y divide-black/[0.06] overflow-hidden rounded-[20px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      {children}
    </div>
  );
}

/** Controllo a segmenti (Woche | Monat, Training | Ernährung, Deutsch | Italiano). */
export function Segmenti<T extends string>({
  voci,
  attiva,
  onCambia,
  etichetta,
}: {
  voci: { id: T; etichetta: ReactNode; icona?: ReactNode }[];
  attiva: T;
  onCambia: (id: T) => void;
  /** per il lettore di schermo */
  etichetta?: string;
}) {
  return (
    <div
      role="group"
      aria-label={etichetta}
      className="grid gap-1 rounded-full bg-black/[0.06] p-1"
      style={{ gridTemplateColumns: `repeat(${voci.length}, minmax(0, 1fr))` }}
    >
      {voci.map((v) => {
        const scelta = v.id === attiva;
        return (
          <button
            key={v.id}
            type="button"
            aria-pressed={scelta}
            onClick={() => onCambia(v.id)}
            className={cx(
              "flex h-11 min-w-0 items-center justify-center gap-2 rounded-full px-3 text-[15px] font-semibold transition-colors",
              scelta ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 active:bg-white/60"
            )}
          >
            {v.icona && <span className="shrink-0 [&_svg]:h-[18px] [&_svg]:w-[18px]">{v.icona}</span>}
            <span className="truncate">{v.etichetta}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Tasto({
  children,
  onClick,
  href,
  variante = "primario",
  disabled,
  pieno,
  icona,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variante?: "primario" | "secondario" | "testo";
  disabled?: boolean;
  pieno?: boolean;
  icona?: ReactNode;
  type?: "button" | "submit";
}) {
  const cls = cx(
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 text-center text-[15px] font-semibold transition-opacity active:opacity-80 disabled:opacity-50",
    pieno && "w-full",
    variante === "primario" && "bg-[var(--app-colore,#e30613)] text-white",
    variante === "secondario" && "bg-white text-neutral-900 ring-1 ring-black/10",
    variante === "testo" && "min-h-[44px] px-2 text-[var(--app-colore,#e30613)]"
  );
  const dentro = (
    <>
      {icona && <span className="[&_svg]:h-5 [&_svg]:w-5">{icona}</span>}
      {children}
    </>
  );
  // con href e onClick: si naviga e intanto onClick (es. segnare il passo avanti)
  if (href && !disabled) return <Link href={href} onClick={onClick} className={cls}>{dentro}</Link>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {dentro}
    </button>
  );
}

export function Pillola({ children, tono = "neutro" }: { children: ReactNode; tono?: "neutro" | "marchio" | "ok" | "attesa" | "errore" }) {
  const t = {
    neutro: "bg-neutral-100 text-neutral-700",
    marchio: "bg-[var(--app-colore,#e30613)] text-white",
    ok: "bg-[#dff5e3] text-[#14532d]",
    attesa: "bg-[#fff1c2] text-[#5c4300]",
    errore: "bg-[#ffe1de] text-[#7f1d1d]",
  }[tono];
  // nowrap: una pillola non va mai a capo in una riga stretta
  return <span className={cx("inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-semibold", t)}>{children}</span>;
}

export function Vuoto({ icona, titolo, testo, azione }: { icona?: ReactNode; titolo: ReactNode; testo?: ReactNode; azione?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      {icona && <div className="mb-3 text-neutral-300 [&_svg]:h-10 [&_svg]:w-10">{icona}</div>}
      <p className="text-[16px] font-semibold">{titolo}</p>
      {testo && <p className="mt-1 max-w-xs text-[14px] text-neutral-500">{testo}</p>}
      {azione && <div className="mt-4">{azione}</div>}
    </div>
  );
}

export function Caricamento() {
  return (
    <div className="space-y-3 pt-2" aria-busy="true">
      <div className="h-24 animate-pulse rounded-[20px] bg-white" />
      <div className="h-40 animate-pulse rounded-[20px] bg-white" />
      <div className="h-24 animate-pulse rounded-[20px] bg-white" />
    </div>
  );
}

export function ErroreBox({ testo, riprova }: { testo: ReactNode; riprova?: () => void }) {
  const lingua = useLingua();
  return (
    <div className="mt-2 rounded-[20px] bg-white p-4 text-center">
      <p className="text-[15px]">{testo}</p>
      {riprova && (
        <button type="button" onClick={riprova} className="mt-2 min-h-[44px] px-3 text-[15px] font-semibold text-[var(--app-colore,#e30613)]">
          {lingua === "it" ? "Riprova" : "Erneut versuchen"}
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- foto e icone 3D

/** Icona 3D del marchio (rosso e nero, sfondo trasparente). Decorativa se manca alt. */
export function Icona3D({ nome, dimensione = 40, alt = "" }: { nome: NomeIcona; dimensione?: number; alt?: string }) {
  return (
    <Image
      src={iconaSrc(nome)}
      alt={alt}
      width={dimensione}
      height={dimensione}
      unoptimized
      draggable={false}
      aria-hidden={alt ? undefined : true}
      className="shrink-0 select-none"
      style={{ width: dimensione, height: dimensione }}
    />
  );
}

/**
 * Card in stile Apple (App Store, Fitness): la foto riempie la card e il
 * titolo sta DENTRO la foto, in basso, bianco su una sfumatura scura che
 * sale dal fondo (13/11 notte: «card fatte bene, professionali, con foto e
 * heading li' dentro, stile Apple»; prima il testo stava sotto la foto).
 * `sopra`: segni piccoli in alto a sinistra (Pillola). `destra`: accanto al
 * titolo, in bianco. `children`: sotto la foto, su bianco (tasti, liste), cosi'
 * restano leggibili. La foto e' alta almeno `proporzione`; se il testo non ci
 * sta, la card cresce.
 */
export function SchedaFoto({
  foto,
  titolo,
  sotto,
  sopra,
  destra,
  proporzione = "16/9",
  href,
  onClick,
  priorita,
  vivo,
  children,
}: {
  foto: NomeFoto;
  titolo: ReactNode;
  sotto?: ReactNode;
  sopra?: ReactNode;
  destra?: ReactNode;
  /** la foto respira: zoom lentissimo avanti e indietro (solo la card principale) */
  vivo?: boolean;
  /** "4/3" card principali, "16/9" card grandi, "3/2" griglie, "2/1" strisce basse */
  proporzione?: "16/9" | "3/2" | "2/1" | "4/3";
  href?: string;
  onClick?: () => void;
  /** la prima foto della schermata: si carica subito */
  priorita?: boolean;
  children?: ReactNode;
}) {
  const tocco = !!(href || onClick);
  const dentro = (
    <>
      <span className="relative isolate flex w-full flex-col justify-end overflow-hidden bg-neutral-800" style={{ aspectRatio: proporzione }}>
        <Image
          src={fotoSrc(foto)}
          alt=""
          fill
          unoptimized
          draggable={false}
          loading={priorita ? "eager" : "lazy"}
          fetchPriority={priorita ? "high" : undefined}
          className={cx(
            "-z-10 select-none object-cover",
            vivo && "animate-[app-respiro_14s_ease-in-out_infinite_alternate] will-change-transform",
          )}
        />
        {/* la sfumatura solo dove c'e' il testo: in alto la foto resta chiara */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-[78%] bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.42)_45%,rgba(0,0,0,0)_100%)]"
        />
        {sopra && <span className="absolute left-3.5 top-3.5 flex gap-1.5">{sopra}</span>}
        <span className="flex items-end gap-3 px-5 pb-5 pt-16 text-white">
          <span className="min-w-0 flex-1">
            <span className="app-titolo block text-[24px] [text-shadow:0_1px_12px_rgba(0,0,0,0.25)]">{titolo}</span>
            {sotto && <span className="mt-1 block text-[15px] font-medium leading-snug text-white/85">{sotto}</span>}
          </span>
          {destra && <span className="shrink-0 text-white [&_*]:!text-white">{destra}</span>}
        </span>
      </span>
      {children && <span className="block bg-white p-4">{children}</span>}
    </>
  );
  const cls = cx(
    "block w-full overflow-hidden rounded-[22px] bg-white text-left shadow-[0_2px_14px_rgba(0,0,0,0.08)]",
    tocco && "transition-transform duration-200 active:scale-[0.985]",
  );
  if (href) return <Link href={href} onClick={onClick} className={cls}>{dentro}</Link>;
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={cls}>
        {dentro}
      </button>
    );
  return <div className={cls}>{dentro}</div>;
}

/** Tessera per griglie a due colonne: icona 3D in alto, titolo e riga sotto. */
export function Tessera({
  icona,
  titolo,
  sotto,
  href,
  onClick,
  segnale,
}: {
  icona: NomeIcona;
  titolo: ReactNode;
  sotto?: ReactNode;
  href?: string;
  onClick?: () => void;
  /** pallino rosso in alto a destra (qualcosa di nuovo) */
  segnale?: boolean;
}) {
  const dentro = (
    <>
      <Icona3D nome={icona} dimensione={48} />
      <span className="mt-3 block min-w-0">
        <span className="block truncate text-[16px] font-bold leading-snug">{titolo}</span>
        {sotto && <span className="mt-0.5 block line-clamp-2 text-[13px] leading-snug text-neutral-500">{sotto}</span>}
      </span>
      {segnale && (
        <span aria-hidden className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[var(--app-colore,#e30613)]" />
      )}
    </>
  );
  const cls = cx(
    "relative flex min-h-[124px] w-full flex-col items-start justify-between rounded-[20px] bg-white p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
    (href || onClick) && "transition-transform active:scale-[0.98]",
  );
  if (href) return <Link href={href} onClick={onClick} className={cls}>{dentro}</Link>;
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={cls}>
        {dentro}
      </button>
    );
  return <div className={cls}>{dentro}</div>;
}

/** Parola nel colore del marchio col tratto a mano sotto, come nei titoli del sito. */
export function Sottolineata({ children }: { children: ReactNode }) {
  return (
    <span className="fp-sotto text-[var(--app-colore,#e30613)]">
      {children}
      <svg viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden>
        <path d="M2 6 C 80 2, 200 2, 298 5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
