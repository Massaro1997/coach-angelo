"use client";

// Prenotazione di un'ora 1:1 nei buchi liberi del coach, tutta in un Foglio:
// settimana (7 giorni, frecce per le settimane dopo: niente striscia che
// scorre di lato), poi l'ora a pillole, poi il riepilogo con quanto costa.
// Il costo mostrato e' una previsione: decide il server (EsitoPrenotazione).
// Grafica (13/11): giorni e orari piu' grandi, icone 3D per esito, vuoto e
// riepilogo; scorre solo il foglio, come prima.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { IoChatbubbleOutline, IoChevronBack, IoChevronForward } from "react-icons/io5";
import type { DataISO } from "@/lib/app-coaching/tipi";
import type { DisponibilitaCliente, EsitoPrenotazione, OreCliente, Prenotazione, SlotLibero } from "@/lib/app-coaching/tipi-v2";
import { aggiungiGiorni, giornoSettimana, oggiISO } from "@/lib/app-coaching/date";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { useArchivio } from "../archivio";
import Foglio from "../Foglio";
import { ErroreBox, Icona3D, Pillola, Tasto, Vuoto, euro, useLingua } from "../kit";
import { chiama, testoErrore, useRitorno, vaiA, type StatoApi } from "./api";
import { formattaData, giornoLungo, intervallo } from "./formati";
import { useT } from "./testi-schede";

type Previsione = "inclusa" | "credito" | "extra";

const lunediDi = (d: DataISO) => aggiungiGiorni(d, -giornoSettimana(d));

/**
 * Come verra' probabilmente conteggiata l'ora: incluse del mese del giorno
 * scelto (per i mesi dopo: incluse meno quelle gia' prenotate li'), poi
 * credito extra, poi a pagamento.
 */
function previsione(slot: SlotLibero, ore: OreCliente, prossime: Prenotazione[], oggi: DataISO): Previsione {
  const mese = slot.data.slice(0, 7);
  let restanti = 0;
  if (ore.inclusePerMese > 0) {
    restanti =
      mese === oggi.slice(0, 7)
        ? ore.restantiQuestoMese
        : ore.inclusePerMese -
          prossime.filter((p) => p.tipo === "inclusa" && p.stato !== "annullata" && p.data.startsWith(mese)).length;
  }
  if (restanti > 0) return "inclusa";
  return ore.creditoExtra > 0 ? "credito" : "extra";
}

export default function FoglioPrenota({
  ore: oreShop,
  prossime,
  onChiudi,
  onPrenotata,
}: {
  ore: OreCliente;
  prossime: Prenotazione[];
  onChiudi: () => void;
  /** prenotazione fatta: shop e "Meine Termine" vanno riletti */
  onPrenotata: () => void;
}) {
  const t = useT();
  const lingua = useLingua();
  const oggiArchivio = useArchivio().oggi;
  const [disp, setDisp] = useState<StatoApi<DisponibilitaCliente>>({ tipo: "attesa" });
  const [giro, setGiro] = useState(0);
  const [lunediScelto, setLunediScelto] = useState<DataISO | null>(null);
  const [giorno, setGiorno] = useState<DataISO | null>(null);
  const [slot, setSlot] = useState<SlotLibero | null>(null);
  const [invio, setInvio] = useState(false);
  const [avviso, setAvviso] = useState<string | null>(null);
  const [fatta, setFatta] = useState<Prenotazione | null>(null);
  const riepilogo = useRef<HTMLDivElement>(null);
  useRitorno(() => setInvio(false));

  useEffect(() => {
    let vivo = true;
    void chiama<DisponibilitaCliente>("/api/app/prenotazioni/disponibili").then((r) => {
      if (!vivo) return;
      if (!r.ok) return setDisp({ tipo: "errore", testo: testoErrore(r, t) });
      const d = r.dati;
      setDisp({ tipo: "ok", dati: d });
      // si resta sul giorno scelto se ha ancora posti, altrimenti il primo libero
      setGiorno((g) =>
        g && d.giorni.some((x) => x.data === g && x.slot.length) ? g : (d.giorni.find((x) => x.slot.length)?.data ?? null),
      );
    });
    return () => {
      vivo = false;
    };
  }, [giro, t]);

  const ore = disp.tipo === "ok" ? disp.dati.ore : oreShop;
  const giorni = disp.tipo === "ok" ? disp.dati.giorni.filter((g) => g.slot.length > 0) : [];
  const perGiorno = new Map(giorni.map((g) => [g.data, g.slot]));
  // il foglio si apre solo nel browser: la data del telefono va bene se l'archivio non l'ha ancora
  const oggi = oggiArchivio ?? oggiISO();
  const primoLunedi = lunediDi(oggi);
  const ultimoLunedi = giorni.length ? lunediDi(giorni[giorni.length - 1].data) : primoLunedi;
  // con un giorno scelto si vede sempre la sua settimana (anche dopo un 409
  // che lo sposta altrove); senza, quella scelta con le frecce
  const lunedi = giorno ? lunediDi(giorno) : (lunediScelto ?? lunediDi(giorni[0]?.data ?? oggi));
  const settimana = Array.from({ length: 7 }, (_, i) => aggiungiGiorni(lunedi, i));
  const slotDelGiorno = giorno ? (perGiorno.get(giorno) ?? []) : [];
  const prev = slot ? previsione(slot, ore, prossime, oggi) : null;

  function cambiaSettimana(passo: number) {
    const nuovo = aggiungiGiorni(lunedi, passo * 7);
    setLunediScelto(nuovo);
    // nella settimana nuova si sceglie gia' il primo giorno libero: un tocco in meno
    const primo = Array.from({ length: 7 }, (_, i) => aggiungiGiorni(nuovo, i)).find((d) => perGiorno.has(d));
    setGiorno(primo ?? null);
    setSlot(null);
    setAvviso(null);
  }

  function scegliSlot(s: SlotLibero) {
    setSlot(s);
    setAvviso(null);
    // il riepilogo col tasto puo' finire sotto il bordo del foglio
    requestAnimationFrame(() => riepilogo.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  }

  async function prenota() {
    if (!slot || invio) return;
    setInvio(true);
    setAvviso(null);
    const r = await chiama<EsitoPrenotazione>("/api/app/prenotazioni", {
      metodo: "POST",
      corpo: { data: slot.data, inizio: slot.inizio },
    });
    if (r.ok) {
      onPrenotata();
      // ora extra da pagare: alla cassa (il tasto resta in attesa mentre si apre)
      if (vaiA(r.dati.linkPagamento ?? r.dati.prenotazione?.linkPagamento)) return;
      setInvio(false);
      setFatta(r.dati.prenotazione);
      return;
    }
    setInvio(false);
    if (r.stato === 409) {
      // presa da un altro un attimo prima: si rileggono i posti e lo si dice
      setAvviso(t.preso);
      setSlot(null);
      setGiro((g) => g + 1);
      return;
    }
    setAvviso(testoErrore(r, t));
  }

  /* ---------------------------------------------------------- contenuto */

  let corpo: ReactNode;
  if (fatta) {
    corpo = (
      <div className="flex flex-col items-center py-6 text-center">
        <Icona3D nome="spunta" dimensione={80} />
        <p className="mt-3 text-[22px] font-bold">{t.prenotato}</p>
        <p className="mt-1 max-w-xs text-[16px] leading-snug text-neutral-600">
          {t.prenotatoTesto(giornoLungo(fatta.data, lingua), fatta.inizio)}
        </p>
        <div className="mt-6 w-full">
          <Tasto pieno onClick={onChiudi}>
            {t.fatto}
          </Tasto>
        </div>
      </div>
    );
  } else if (disp.tipo === "attesa") {
    corpo = (
      <div className="grid grid-cols-7 gap-1 py-2" aria-busy="true">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="h-[64px] animate-pulse rounded-2xl bg-neutral-100" />
        ))}
      </div>
    );
  } else if (disp.tipo === "errore") {
    corpo = (
      <ErroreBox
        testo={disp.testo}
        riprova={() => {
          setDisp({ tipo: "attesa" });
          setGiro((g) => g + 1);
        }}
      />
    );
  } else if (!giorni.length) {
    corpo = (
      <Vuoto
        icona={<Icona3D nome="calendario" dimensione={72} />}
        titolo={t.nienteLibero}
        testo={t.nienteLiberoTesto(MARCHIO.coach)}
        azione={
          <Tasto variante="secondario" href="/app/coach" icona={<IoChatbubbleOutline aria-hidden />}>
            {t.scriviCoach}
          </Tasto>
        }
      />
    );
  } else {
    corpo = (
      <>
        <div className="flex items-center justify-between">
          <FrecciaSettimana etichetta={t.settimanaPrima} disabled={lunedi <= primoLunedi} onClick={() => cambiaSettimana(-1)}>
            <IoChevronBack className="h-6 w-6" aria-hidden />
          </FrecciaSettimana>
          <p className="text-[17px] font-bold tabular-nums">{intervallo(settimana[0], settimana[6], lingua)}</p>
          <FrecciaSettimana etichetta={t.settimanaDopo} disabled={lunedi >= ultimoLunedi} onClick={() => cambiaSettimana(1)}>
            <IoChevronForward className="h-6 w-6" aria-hidden />
          </FrecciaSettimana>
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {settimana.map((d) => {
            const libero = perGiorno.has(d);
            const scelto = d === giorno;
            return (
              <button
                key={d}
                type="button"
                disabled={!libero}
                aria-pressed={scelto}
                aria-label={giornoLungo(d, lingua)}
                onClick={() => {
                  setGiorno(d);
                  setSlot(null);
                  setAvviso(null);
                }}
                className={`flex h-[64px] min-w-0 flex-col items-center justify-center rounded-2xl transition-colors ${
                  scelto
                    ? "bg-[var(--app-colore,#e30613)] text-white"
                    : libero
                      ? "bg-neutral-100 text-neutral-900 active:bg-neutral-200"
                      : "text-neutral-400"
                }`}
              >
                <span className="text-[13px] font-semibold leading-tight">
                  {formattaData(d, lingua, { weekday: "short" }).replace(".", "")}
                </span>
                <span className="mt-0.5 text-[20px] font-bold leading-none tabular-nums">
                  {formattaData(d, lingua, { day: "numeric" })}
                </span>
              </button>
            );
          })}
        </div>

        {giorno ? (
          <>
            <p className="mb-2 mt-6 text-[17px] font-bold">{t.scegliOra}</p>
            <div className="grid grid-cols-3 gap-2">
              {slotDelGiorno.map((s) => {
                const scelto = slot?.data === s.data && slot.inizio === s.inizio;
                return (
                  <button
                    key={`${s.inizio}-${s.luogo ?? ""}`}
                    type="button"
                    aria-pressed={scelto}
                    onClick={() => scegliSlot(s)}
                    className={`h-12 rounded-full text-[17px] font-semibold tabular-nums transition-colors ${
                      scelto ? "bg-[var(--app-colore,#e30613)] text-white" : "bg-white ring-1 ring-black/10 active:bg-neutral-100"
                    }`}
                  >
                    {s.inizio}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <p className="mt-5 text-[15px] text-neutral-500">{t.nienteSettimana}</p>
        )}

        {avviso && (
          <p role="alert" className="mt-4 text-[15px] font-semibold text-[#b91c1c]">
            {avviso}
          </p>
        )}

        {slot && prev && (
          <div ref={riepilogo} className="mt-5">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <div className="flex items-start gap-3">
                <Icona3D nome="calendario" dimensione={48} />
                <div className="min-w-0 flex-1">
                  <p className="text-[17px] font-bold leading-snug">{giornoLungo(slot.data, lingua)}</p>
                  <p className="text-[16px] tabular-nums">{t.fascia(slot.inizio, slot.fine)}</p>
                  {slot.luogo && <p className="mt-0.5 text-[15px] leading-snug text-neutral-600">{slot.luogo}</p>}
                </div>
              </div>
              <div className="mt-3">
                <Pillola tono={prev === "extra" ? "attesa" : "ok"}>
                  {prev === "inclusa"
                    ? t.previsione.inclusa
                    : prev === "credito"
                      ? t.previsione.credito(ore.creditoExtra)
                      : t.previsione.extra(euro(ore.prezzoOra))}
                </Pillola>
              </div>
              {prev === "extra" && <p className="mt-2 text-[14px] leading-snug text-neutral-600">{t.extraNota}</p>}
            </div>
            <div className="mt-4">
              <Tasto pieno onClick={prenota} disabled={invio}>
                {invio ? t.prenotando : prev === "extra" ? t.prenotaPaga(euro(ore.prezzoOra)) : t.prenota}
              </Tasto>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <Foglio titolo={t.scegliTermine} onChiudi={onChiudi}>
      {corpo}
    </Foglio>
  );
}

function FrecciaSettimana({
  etichetta,
  disabled,
  onClick,
  children,
}: {
  etichetta: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={etichetta}
      disabled={disabled}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center rounded-full active:bg-neutral-100 disabled:opacity-25"
    >
      {children}
    </button>
  );
}
