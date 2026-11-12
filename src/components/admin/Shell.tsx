"use client";

import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  FileSignature,
  Receipt,
  TrendingUp,
  Users,
  Smartphone,
  Handshake,
  Shirt,
  Menu,
  X,
  LogOut,
  ExternalLink,
  Search,
  CornerDownLeft,
} from "lucide-react";
import { cx } from "./ui";
import { adminLogout } from "@/components/AdminGate";

// La cornice dei CRM DirezioneX (admin di Shopify), la stessa di Linea Erre:
// colonna nera da 220px con logo, ricerca e menu; a destra il pannello bianco
// staccato di 4px con angoli da 16px, che da desktop scorre dentro di se'.
// Navbar e footer del sito pubblico sono esclusi da LayoutWrapper.

export type Vista =
  | "conversioni"
  | "clienti"
  | "app"
  | "commissioni"
  | "lead"
  | "preventivi"
  | "ordini"
  | "seo"
  | "merchandising";

const NAV: { key: Vista; label: string; icon: typeof LayoutDashboard; parole: string }[] = [
  { key: "conversioni", label: "Conversioni", icon: LayoutDashboard, parole: "home panoramica numeri andamento visite" },
  { key: "clienti", label: "Clienti", icon: Users, parole: "persone attivi rinnovi scadenze" },
  { key: "app", label: "App clienti", icon: Smartphone, parole: "allenamenti piani schede esercizi calendario" },
  { key: "commissioni", label: "DirezioneX", icon: Handshake, parole: "commissioni provvigioni rate" },
  { key: "preventivi", label: "Contratti", icon: FileSignature, parole: "preventivi offerte firma" },
  { key: "lead", label: "Lead", icon: Inbox, parole: "contatti richieste messaggi moduli" },
  { key: "ordini", label: "Ordini", icon: Receipt, parole: "negozio shop acquisti pagamenti" },
  { key: "seo", label: "SEO", icon: TrendingUp, parole: "google search console gsc posizioni ricerche" },
  // Scaletta, Marchio e Brand sheet tolte il 07/10: sono lavoro di Calogero
  // sul rebranding, ad Angelo non servono. I componenti restano nel repo.
  { key: "merchandising", label: "Merchandising", icon: Shirt, parole: "magliette borracce gadget" },
];

/** Le viste valide, per aprire l'admin gia' sulla scheda giusta (/admin#clienti). */
export const VISTE: Vista[] = NAV.map((n) => n.key);

// voci del menu: 30px, attiva con il gradiente bianco 14→9% di Shopify
const VOCE =
  "flex h-[30px] w-full items-center gap-2.5 rounded-[10px] px-2 text-left text-[13px] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white/40 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0";
const ATTIVA =
  "bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.09))] font-medium text-[#fcfcfc] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.04)]";
const SPENTA = "font-[450] text-[#dcdcdc] hover:bg-white/[0.06] hover:text-white";

export function Shell({
  vista,
  setVista,
  conteggi,
  children,
}: {
  vista: Vista;
  setVista: (v: Vista) => void;
  conteggi?: Partial<Record<Vista, number>>;
  children: React.ReactNode;
}) {
  const [aperto, setAperto] = useState(false); // colonna sul telefono
  const [cerca, setCerca] = useState(false); // tavolozza di ricerca
  const pannello = useRef<HTMLDivElement>(null);
  const tastoMenu = useRef<HTMLButtonElement>(null);
  const tastoChiudi = useRef<HTMLButtonElement>(null);
  const eraAperto = useRef(false);
  const voce = NAV.find((n) => n.key === vista) ?? NAV[0];
  const IconaVoce = voce.icon;

  const vai = (v: Vista) => {
    setVista(v);
    setAperto(false);
    setCerca(false);
  };

  // Ctrl K / Cmd K apre (o chiude) la ricerca da qualunque punto, come in
  // Shopify; Esc chiude la colonna sul telefono.
  useEffect(() => {
    const tasto = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key || "").toLowerCase() === "k") {
        e.preventDefault();
        setCerca((c) => !c);
      }
      if (e.key === "Escape") setAperto(false);
    };
    window.addEventListener("keydown", tasto);
    return () => window.removeEventListener("keydown", tasto);
  }, []);

  // Cambiando sezione si riparte dall'alto. Da desktop scorre il pannello e
  // non la finestra, quindi il window.scrollTo delle schede li' non basta.
  useEffect(() => {
    pannello.current?.scrollTo({ top: 0, behavior: "instant" });
    window.scrollTo({ top: 0, behavior: "instant" }); // il sito ha scroll-behavior: smooth
  }, [vista]);

  // il nome della sezione anche sulla linguetta del browser
  useEffect(() => {
    document.title = `${voce.label} · Gestionale FitPrimo`;
  }, [voce.label]);

  // Telefono: aprendo la colonna il fuoco va dentro, chiudendola torna al tasto
  useEffect(() => {
    if (aperto) {
      eraAperto.current = true;
      tastoChiudi.current?.focus();
    } else if (eraAperto.current) {
      eraAperto.current = false;
      tastoMenu.current?.focus();
    }
  }, [aperto]);

  return (
    <div className="crm-admin min-h-screen bg-[#0a0a0a]">
      {/* ------------------------------------------------------- colonna */}
      <aside
        id="menu-gestionale"
        aria-label="Menu del gestionale"
        className={cx(
          // da desktop sta sotto il pannello (z-10 < z-20): cosi' le finestre
          // a schermo intero delle schede coprono anche la colonna
          "crm-colonna fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#0a0a0a] duration-200 lg:visible lg:z-10 lg:w-[220px] lg:translate-x-0",
          // visibility passa subito a visible in apertura (il fuoco ci deve
          // entrare) e resta visibile fino a fine scorrimento in chiusura
          aperto
            ? "visible translate-x-0 transition-[translate]"
            : "invisible -translate-x-full transition-[translate,visibility]"
        )}
      >
        {/* il logo di FitPrimo al posto del sacchetto di Shopify */}
        <div className="flex h-[56px] shrink-0 items-center pl-4 pr-3 pt-2">
          <button
            type="button"
            onClick={() => vai("conversioni")}
            aria-label="FitPrimo, torna a Conversioni"
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/fitprimo/fitprimo-logo-bianco.svg" alt="" className="h-5 w-auto" />
          </button>
          <button
            ref={tastoChiudi}
            type="button"
            onClick={() => setAperto(false)}
            className="ml-auto rounded-lg p-1 text-[#a6a6a6] hover:bg-white/[0.06] lg:hidden"
            aria-label="Chiudi menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* il campo «Cerca» apre la tavolozza: le sezioni sono poche, si filtrano li' */}
        <div className="shrink-0 px-3.5 pb-2.5 pt-1">
          <button
            type="button"
            onClick={() => setCerca(true)}
            aria-haspopup="dialog"
            aria-keyshortcuts="Control+K Meta+K"
            className="flex h-7 w-full items-center gap-2 rounded-[10px] bg-white/[0.13] pl-2.5 pr-2.5 text-[13px] text-[#a6a6a6] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(255,255,255,0.05)] transition-colors hover:bg-white/[0.16] focus-visible:bg-white/[0.18] focus-visible:outline-2 focus-visible:outline-white/40"
          >
            <Search className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span>Cerca</span>
            <span className="ml-auto">Ctrl K</span>
          </button>
        </div>

        <nav aria-label="Sezioni" className="crm-menu-nero min-h-0 flex-1 overflow-y-auto px-3 pb-3 pt-1">
          <ul className="space-y-px">
            {NAV.map((n) => {
              const Icon = n.icon;
              const on = vista === n.key;
              const badge = conteggi?.[n.key] || 0;
              return (
                <li key={n.key}>
                  <button
                    type="button"
                    onClick={() => vai(n.key)}
                    aria-current={on ? "page" : undefined}
                    className={cx(VOCE, on ? ATTIVA : SPENTA)}
                  >
                    <Icon strokeWidth={1.75} className={on ? "text-[#fcfcfc]" : "text-[#b5b5b5]"} />
                    <span className="truncate">{n.label}</span>
                    {badge > 0 && (
                      <span className="ml-auto min-w-5 shrink-0 rounded-full bg-white/[0.11] px-1.5 text-center text-[11px] font-medium leading-5 tabular-nums text-[#e3e3e3]">
                        {badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 space-y-px px-3 pb-3 pt-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className={cx(VOCE, SPENTA)}>
            <ExternalLink strokeWidth={1.75} className="text-[#b5b5b5]" />
            Vedi il sito
          </a>
          <button type="button" onClick={() => adminLogout()} className={cx(VOCE, SPENTA)}>
            <LogOut strokeWidth={1.75} className="text-[#b5b5b5]" />
            Esci
          </button>
        </div>
      </aside>

      {/* velo sul telefono quando la colonna e' aperta */}
      {aperto && (
        <div
          aria-hidden="true"
          onClick={() => setAperto(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ------------------------------------------------------- pannello */}
      <div
        id="pannello"
        ref={pannello}
        // text-crm-ink esplicito: il body del sito ha color #fafafa
        className="crm-pannello min-h-screen bg-white text-crm-ink lg:fixed lg:inset-y-1 lg:left-[220px] lg:right-1 lg:z-20 lg:min-h-0 lg:overflow-y-auto lg:rounded-2xl"
      >
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex min-h-[52px] w-full max-w-[1400px] items-center gap-2 px-4 py-2 sm:px-6 lg:px-8">
            <button
              ref={tastoMenu}
              type="button"
              onClick={() => setAperto(true)}
              aria-label="Apri menu"
              aria-expanded={aperto}
              aria-controls="menu-gestionale"
              className="-ml-1 mr-1 rounded-lg p-1 text-[#4a4a4a] hover:bg-black/[0.05] lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <IconaVoce className="h-4 w-4 shrink-0 text-crm-ink" strokeWidth={1.75} aria-hidden="true" />
            <h1 className="truncate text-[13px] font-medium leading-5 tracking-[-0.02em] text-crm-ink">
              {voce.label}
            </h1>
            {/* sul telefono il campo «Cerca» sta nella colonna chiusa: qui la lente */}
            <button
              type="button"
              onClick={() => setCerca(true)}
              aria-label="Cerca"
              aria-haspopup="dialog"
              className="ml-auto rounded-lg p-1 text-[#4a4a4a] hover:bg-black/[0.05] lg:hidden"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-2 sm:px-6 lg:px-8">{children}</main>
      </div>

      {cerca && (
        <Tavolozza vista={vista} conteggi={conteggi} vai={vai} chiudi={() => setCerca(false)} />
      )}
    </div>
  );
}

/* --------------------------------------------------------------- ricerca */

// minuscolo e senza accenti: «sezioni» trova anche «Sezióni»
const piano = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function trova(q: string) {
  const parole = piano(q).split(/\s+/).filter(Boolean);
  if (!parole.length) return NAV;
  return NAV.map((n) => {
    const nome = piano(n.label);
    const tutto = `${nome} ${piano(n.parole)}`;
    if (!parole.every((p) => tutto.includes(p))) return null;
    // prima chi comincia per la ricerca, poi chi la ha nel nome, poi le parole chiave
    const punti = nome.startsWith(parole[0]) ? 0 : nome.includes(parole[0]) ? 1 : 2;
    return { n, punti };
  })
    .filter((r): r is { n: (typeof NAV)[number]; punti: number } => r !== null)
    .sort((a, b) => a.punti - b.punti)
    .map((r) => r.n);
}

const TASTO_KBD =
  "inline-flex min-w-5 items-center justify-center rounded-md bg-white px-1 text-[11px] font-[550] leading-[18px] text-crm-testo shadow-crm-anello";

/** La tavolozza di Ctrl K: filtra le sezioni, frecce + Invio per saltarci. */
function Tavolozza({
  vista,
  conteggi,
  vai,
  chiudi,
}: {
  vista: Vista;
  conteggi?: Partial<Record<Vista, number>>;
  vai: (v: Vista) => void;
  chiudi: () => void;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const campo = useRef<HTMLInputElement>(null);
  const risultati = trova(q);
  const scelta = risultati[Math.min(sel, risultati.length - 1)];

  // Fuoco nel campo all'apertura; alla chiusura torna dov'era prima
  // (niente autoFocus: altrimenti non si sa piu' chi aveva il fuoco).
  useEffect(() => {
    const prima = document.activeElement;
    campo.current?.focus();
    return () => {
      if (prima instanceof HTMLElement) prima.focus();
    };
  }, []);

  // la voce scelta con le frecce resta visibile nell'elenco
  useEffect(() => {
    if (scelta) document.getElementById(`tavolozza-${scelta.key}`)?.scrollIntoView({ block: "nearest" });
  }, [scelta]);

  const tasti = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const n = risultati.length;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (n) setSel((s) => (Math.min(s, n - 1) + (e.key === "ArrowDown" ? 1 : -1) + n) % n);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (scelta) vai(scelta.key);
    } else if (e.key === "Escape") {
      // fermato qui: Esc non deve chiudere anche la colonna sotto
      e.preventDefault();
      e.stopPropagation();
      chiudi();
    } else if (e.key === "Tab") {
      // il fuoco resta nel campo finche' la tavolozza e' aperta
      e.preventDefault();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/25 px-3"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) chiudi();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cerca nel gestionale"
        className="crm-tavolozza mx-auto mt-3 w-full max-w-[560px] overflow-hidden rounded-2xl bg-white text-crm-ink shadow-crm-pop sm:mt-[12vh]"
      >
        <div className="flex h-12 items-center gap-2.5 border-b border-crm-filo px-4">
          <Search className="h-4 w-4 shrink-0 text-crm-spento" strokeWidth={1.75} aria-hidden="true" />
          <input
            ref={campo}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={tasti}
            placeholder="Cerca una sezione"
            role="combobox"
            aria-expanded="true"
            aria-controls="tavolozza-voci"
            aria-autocomplete="list"
            aria-activedescendant={scelta ? `tavolozza-${scelta.key}` : undefined}
            autoComplete="off"
            spellCheck={false}
            // 16px sul telefono, se no Safari su iPhone ingrandisce la pagina
            className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-crm-ink outline-none placeholder:text-crm-spento sm:text-[14px]"
          />
          <button
            type="button"
            onClick={chiudi}
            aria-label="Chiudi la ricerca"
            className="shrink-0 rounded-md text-crm-tenue hover:text-crm-ink"
          >
            <kbd className={cx(TASTO_KBD, "hidden sm:inline-flex")}>Esc</kbd>
            <X className="h-5 w-5 sm:hidden" strokeWidth={1.75} />
          </button>
        </div>

        <div className="max-h-[min(420px,60vh)] overflow-y-auto p-1.5">
          {risultati.length === 0 ? (
            <p className="px-3 py-8 text-center text-[13px] text-crm-tenue">
              Nessuna sezione per «{q.trim()}»
            </p>
          ) : (
            <>
              <p className="px-2.5 pb-1 pt-1.5 text-[12px] font-[550] text-crm-tenue">Sezioni</p>
              <ul id="tavolozza-voci" role="listbox" aria-label="Sezioni">
                {risultati.map((n) => {
                  const Icon = n.icon;
                  const on = n.key === scelta?.key;
                  const badge = conteggi?.[n.key] || 0;
                  return (
                    <li
                      key={n.key}
                      id={`tavolozza-${n.key}`}
                      role="option"
                      aria-selected={on}
                      // onMouseMove e non onMouseEnter: il puntatore fermo non
                      // ruba la scelta a chi sta usando le frecce
                      onMouseMove={() => setSel(risultati.indexOf(n))}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => vai(n.key)}
                      className={cx(
                        "flex h-10 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-[13px] sm:h-9",
                        on && "bg-crm-fondo-2"
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-crm-fondo-2 text-crm-testo shadow-crm-anello">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </span>
                      <span className="truncate font-[550]">{n.label}</span>
                      {n.key === vista && <span className="shrink-0 text-[12px] text-crm-tenue">Sei qui</span>}
                      <span className="ml-auto flex shrink-0 items-center gap-2">
                        {badge > 0 && <span className="crm-badge">{badge}</span>}
                        {on && <CornerDownLeft className="h-4 w-4 text-crm-spento" strokeWidth={1.75} aria-hidden="true" />}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        <div className="hidden items-center gap-4 border-t border-crm-filo bg-crm-fondo px-4 py-2 text-[12px] text-crm-tenue sm:flex">
          <span className="flex items-center gap-1">
            <kbd className={TASTO_KBD}>↑</kbd>
            <kbd className={TASTO_KBD}>↓</kbd>
            per scegliere
          </span>
          <span className="flex items-center gap-1">
            <kbd className={TASTO_KBD}>Invio</kbd>
            per aprire
          </span>
          <span className="flex items-center gap-1">
            <kbd className={TASTO_KBD}>Esc</kbd>
            per chiudere
          </span>
        </div>
      </div>
    </div>
  );
}
