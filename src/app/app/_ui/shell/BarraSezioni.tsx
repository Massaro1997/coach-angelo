"use client";

// La barra delle sezioni in basso, FERMA (13/11 sera). Prima la disegnava
// ogni schermata dentro AppShell e spariva nei dettagli (giorno): passando da
// una schermata all'altra la barra spariva e tornava, e al proprietario
// sembrava "una barra che sale e scende". Ora sta nel layout (Sessione), si
// disegna una volta sola e resta sempre li': cambia solo la voce accesa,
// presa dall'indirizzo. Si nasconde solo con la tastiera aperta sul telefono
// (app-via-con-tastiera), come in ogni app.
// Aspetto (13/11 notte): come la barra di iOS 26, una capsula bianca che
// galleggia sul grigio, larga al massimo come un telefono anche sul computer.
// Voce accesa: icona piena e scritta nel colore del marchio, su una pillola
// grigio chiaro che scivola da una voce all'altra (l'unico movimento). Voci
// spente: icona a filo grigia. Icone Ionicons (react-icons/io5), disegnate
// sul modello di iOS. Bocciata la versione nera con la pillola rossa che
// brillava («fa schifo»). Sul profilo (nessuna voce) la pillola sparisce.

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import type { IconType } from "react-icons";
import {
  IoBagHandle,
  IoBagHandleOutline,
  IoCalendar,
  IoCalendarOutline,
  IoChatbubbleEllipses,
  IoChatbubbleEllipsesOutline,
  IoHome,
  IoHomeOutline,
  IoStatsChart,
  IoStatsChartOutline,
} from "react-icons/io5";
import { useArchivio } from "../archivio";

type Voce = "home" | "plan" | "fortschritt" | "shop" | "coach";

/** icona: a filo (spenta), piena: accesa */
const VOCI: { tab: Voce; href: string; de: string; it: string; icona: IconType; piena: IconType }[] = [
  { tab: "home", href: "/app", de: "Home", it: "Home", icona: IoHomeOutline, piena: IoHome },
  { tab: "plan", href: "/app/plan", de: "Plan", it: "Piano", icona: IoCalendarOutline, piena: IoCalendar },
  { tab: "fortschritt", href: "/app/fortschritt", de: "Fortschritt", it: "Progressi", icona: IoStatsChartOutline, piena: IoStatsChart },
  { tab: "shop", href: "/app/shop", de: "Shop", it: "Shop", icona: IoBagHandleOutline, piena: IoBagHandle },
  { tab: "coach", href: "/app/coach", de: "Coach", it: "Coach", icona: IoChatbubbleEllipsesOutline, piena: IoChatbubbleEllipses },
];

/** La voce accesa per un indirizzo: i dettagli accendono la sezione da cui vengono. */
function voceDi(percorso: string): Voce | null {
  if (percorso.startsWith("/app/plan") || percorso.startsWith("/app/giorno")) return "plan";
  if (percorso.startsWith("/app/fortschritt")) return "fortschritt";
  if (percorso.startsWith("/app/shop")) return "shop";
  if (percorso.startsWith("/app/coach")) return "coach";
  if (percorso.startsWith("/app/profil")) return null;
  // home, guide e tutto il resto
  return "home";
}

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export default function BarraSezioni() {
  const a = useArchivio();
  const percorso = usePathname() ?? "/app";
  const lingua = a.lingua === "it" ? "it" : "de";
  const nonLetti = a.home.tipo === "ok" ? a.home.dati.messaggiNonLetti : 0;
  const accesa = voceDi(percorso);

  function tocca(e: MouseEvent, v: (typeof VOCI)[number]) {
    // ritoccare la sezione aperta (proprio lei, non un suo dettaglio) la
    // riporta in cima, come nelle app
    if (percorso !== v.href || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    document.getElementById("app-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
  }

  const indice = accesa ? VOCI.findIndex((v) => v.tab === accesa) : -1;

  return (
    <nav
      aria-label={lingua === "it" ? "Sezioni" : "Bereiche"}
      className="app-via-con-tastiera shrink-0 bg-[#f4f4f6] px-4 pb-[max(0.75rem,calc(env(safe-area-inset-bottom)-0.25rem))] pt-2"
    >
      <div className="relative mx-auto w-full max-w-md rounded-full bg-white p-1 shadow-[0_8px_28px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04]">
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc((100%_-_0.5rem)/5)] rounded-full bg-black/[0.055] transition-[transform,opacity] duration-[350ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(${Math.max(indice, 0) * 100}%)`, opacity: indice < 0 ? 0 : 1 }}
        />
        <ul className="relative grid grid-cols-5">
          {VOCI.map((v) => {
            const attiva = v.tab === accesa;
            const Icona = attiva ? v.piena : v.icona;
            return (
              <li key={v.tab}>
                <Link
                  href={v.href}
                  onClick={(e) => tocca(e, v)}
                  aria-current={attiva ? "page" : undefined}
                  className={cx(
                    "relative flex h-[54px] flex-col items-center justify-center gap-[3px] text-[10.5px] leading-none transition-colors duration-200",
                    attiva ? "font-semibold text-[var(--app-colore,#e30613)]" : "font-medium text-neutral-500 active:text-neutral-900",
                  )}
                >
                  <Icona className="h-[23px] w-[23px]" aria-hidden />
                  <span className="max-w-full truncate px-0.5">{lingua === "it" ? v.it : v.de}</span>
                  {v.tab === "coach" && nonLetti > 0 && (
                    <>
                      <span
                        aria-hidden
                        className="absolute right-[calc(50%-17px)] top-[8px] h-2.5 w-2.5 rounded-full bg-[var(--app-colore,#e30613)] ring-2 ring-white"
                      />
                      <span className="sr-only">({nonLetti})</span>
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
