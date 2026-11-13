"use client";

// Il guscio della v2: testata in alto, UNA sola zona che scorre, barra delle
// sezioni in basso. Regola della v2 (il proprietario ha bocciato la v1 per
// "troppe finestre di scroll"): dentro una scheda niente altri overflow-auto,
// scorre solo #app-scroll. Eccezioni: i fogli dal basso (Foglio.tsx).
//
// API FISSA (la usano altre schede scritte in parallelo): AppShell {tab,
// titolo?, indietro?, azioneDestra?, senzaBarra?, lingua?, nonLetti?,
// children}, PiedeFisso {children}, useScroller(). L'aspetto si puo'
// cambiare, le props no.
//
// Dal 13/11 sera la barra delle sezioni NON sta piu' qui: e' BarraSezioni,
// disegnata una volta nel layout (Sessione) e sempre ferma in basso, anche
// nei dettagli. senzaBarra e nonLetti restano nell'API ma non fanno piu'
// niente: la barra che spariva e tornava cambiando schermata era il difetto.
//
// Dentro il Guscio del layout: ne prende tutta l'altezza, che con la tastiera
// aperta su iPhone e' solo la parte visibile (visualViewport). Cosi' il campo
// della chat in PiedeFisso resta sopra la tastiera, e la barra delle sezioni
// sparisce finche' la tastiera e' su (classe app-via-con-tastiera).
// lingua, se non passata, viene dall'archivio dell'app.

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { IoChevronBack, IoPersonOutline } from "react-icons/io5";
import { useArchivio } from "../archivio";
import { AvvisoOffline, primoNome } from "../comuni";
import { dimenticaAvanti, segnaAvanti, tornaIndietro } from "../navigazione";

export type TabApp = "home" | "plan" | "fortschritt" | "shop" | "coach" | "profil";

/** Testata, piede e barra centrati come il contenuto (tablet, computer). */
const LARGO = "mx-auto w-full max-w-xl";

/**
 * Margini laterali di #app-scroll: almeno 1rem (o la tacca), e su schermi
 * larghi quanto serve a tenere il contenuto a 36rem. Col padding e non con un
 * contenitore in piu': i figli restano figli diretti dello scroller (min-h-full
 * funziona, per esempio per una chat che parte dal fondo).
 */
const MARGINI_SCROLL =
  "pl-[max(1rem,env(safe-area-inset-left),calc((100%_-_36rem)/2))] pr-[max(1rem,env(safe-area-inset-right),calc((100%_-_36rem)/2))]";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type Ctx = { scroller: RefObject<HTMLDivElement | null>; piede: HTMLDivElement | null };
const ShellCtx = createContext<Ctx | null>(null);

/** Il contenitore che scorre: per portare in fondo una chat o in cima una lista. */
export function useScroller(): RefObject<HTMLDivElement | null> {
  const c = useContext(ShellCtx);
  if (!c) throw new Error("useScroller fuori da AppShell");
  return c.scroller;
}

/** Barra fissa sopra la barra delle sezioni (campo della chat, tasto principale). */
export function PiedeFisso({ children }: { children: ReactNode }) {
  const c = useContext(ShellCtx);
  if (!c?.piede) return null;
  return createPortal(children, c.piede);
}

export default function AppShell({
  tab,
  titolo,
  indietro,
  azioneDestra,
  lingua: linguaScelta,
  children,
}: {
  tab: TabApp;
  titolo?: ReactNode;
  /** schermate di dettaglio: "‹" che torna qui (o un passo indietro vero) */
  indietro?: string;
  azioneDestra?: ReactNode;
  /** non fa piu' niente: la barra delle sezioni ora e' sempre visibile (BarraSezioni) */
  senzaBarra?: boolean;
  lingua?: "de" | "it";
  /** non fa piu' niente: il pallino lo mette BarraSezioni dall'archivio */
  nonLetti?: number;
  children: ReactNode;
}) {
  const a = useArchivio();
  const router = useRouter();
  const lingua = linguaScelta ?? (a.lingua === "it" ? "it" : "de");
  const scroller = useRef<HTMLDivElement | null>(null);
  // il ref che diventa stato: PiedeFisso lo trova gia' al primo disegno
  // (l'aggiornamento parte durante il commit, prima che lo schermo si ridisegni)
  const [piede, setPiede] = useState<HTMLDivElement | null>(null);
  const radice = !indietro;
  const iniziale = a.profilo.tipo === "ok" ? primoNome(a.profilo.profilo.nome).charAt(0).toUpperCase() : "";

  // cambiando scheda si riparte dall'alto
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [tab]);

  // su una sezione: il prossimo dettaglio (giorno, profilo) riparte da qui
  useEffect(() => {
    if (radice) dimenticaAvanti();
  }, [radice]);

  return (
    <ShellCtx.Provider value={{ scroller, piede }}>
      <div className="flex min-h-0 flex-1 flex-col bg-[#f4f4f6] text-neutral-900">
        <header className="shrink-0 bg-[#f4f4f6] pt-[env(safe-area-inset-top)]">
          <div
            className={cx(
              LARGO,
              "flex h-[52px] items-center gap-1 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]",
            )}
          >
            {indietro && (
              <Link
                href={indietro}
                replace
                onClick={(e) => tornaIndietro(e, () => router.back())}
                aria-label={lingua === "it" ? "Indietro" : "Zurück"}
                className="-ml-2.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full active:bg-black/[0.05]"
              >
                <IoChevronBack className="h-7 w-7" />
              </Link>
            )}
            {/* i titoli semplici nel carattere dei titoli del sito; chi passa un nodo decide da se' */}
            <h1
              className={cx(
                "min-w-0 flex-1 truncate leading-7",
                typeof titolo === "string" ? "app-titolo pt-1 text-[26px]" : "text-[22px] font-bold",
              )}
            >
              {titolo}
            </h1>
            {azioneDestra && <div className="flex shrink-0 items-center gap-1">{azioneDestra}</div>}
            {radice && tab !== "profil" && (
              <Link
                href="/app/profil"
                onClick={segnaAvanti}
                aria-label={lingua === "it" ? "Profilo" : "Profil"}
                className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-[15px] font-bold text-white">
                  {iniziale || <IoPersonOutline className="h-5 w-5" aria-hidden />}
                </span>
              </Link>
            )}
          </div>
        </header>

        {a.offline && <AvvisoOffline />}

        <div
          id="app-scroll"
          ref={scroller}
          className={cx(
            "min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-6",
            MARGINI_SCROLL,
          )}
        >
          {children}
        </div>

        {/* PiedeFisso finisce qui, sopra la barra delle sezioni; vuoto non occupa spazio */}
        <div ref={setPiede} className="shrink-0 empty:hidden" />

      </div>
    </ShellCtx.Provider>
  );
}
