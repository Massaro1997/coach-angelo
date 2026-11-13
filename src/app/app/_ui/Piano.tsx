"use client";

// /app/plan, sezione Plan: il calendario. Un controllo a segmenti sceglie
// settimana (righe con l'icona 3D del tipo di giorno e il titolo
// dell'allenamento) o mese (griglia con la legenda nella card); sotto, le
// frecce per spostarsi (o il dito di lato). "Heute" in testata riporta al
// periodo di oggi quando si e' altrove. Vista, mese e settimana restano
// nell'archivio: tornando da un giorno si ritrovano.

import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import type { DataISO, MeseISO } from "@/lib/app-coaching/tipi";
import { aggiungiGiorni, meseDi, oggiISO, spostaMese } from "@/lib/app-coaching/date";
import {
  caricaMese,
  impostaMeseVisto,
  impostaSettimanaVista,
  impostaVistaPiano,
  lunediDi,
  useArchivio,
  type VistaPiano,
} from "./archivio";
import { formatta, maiuscola, useTesti } from "./comuni";
import { useScorrimentoLaterale } from "./gesto";
import { ErroreBox, Scheda, Segmenti } from "./kit";
import AppShell from "./shell/AppShell";
import { GrigliaMese, Legenda, ListaSettimana } from "./Calendario";
import type { Testi } from "../testi";

const ENTRATA: Record<-1 | 0 | 1, string> = {
  [-1]: "animate-[app-da-sinistra_180ms_ease-out]",
  0: "",
  1: "animate-[app-da-destra_180ms_ease-out]",
};

const FRECCIA =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-colors active:bg-neutral-100";

/** "11.–17. November" / "11–17 novembre"; a cavallo di due mesi li scrive tutti e due. */
function titoloSettimana(lunedi: DataISO, t: Testi): string {
  const utc = (d: DataISO) => {
    const [y, m, g] = d.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, g));
  };
  const f = new Intl.DateTimeFormat(t.locale, { timeZone: "UTC", day: "numeric", month: "long" });
  const domenica = aggiungiGiorni(lunedi, 6);
  if (typeof f.formatRange === "function") return f.formatRange(utc(lunedi), utc(domenica));
  return `${f.format(utc(lunedi))} – ${f.format(utc(domenica))}`;
}

export default function Piano() {
  const t = useTesti();
  const a = useArchivio();
  // dopo Sessione c'e' sempre; oggiISO solo per i tipi
  const oggi = a.oggi ?? oggiISO();
  const vista = a.vistaPiano;
  const mese = a.meseVisto ?? meseDi(oggi);
  const lunedi = a.settimanaVista ?? lunediDi(oggi);
  const domenica = aggiungiGiorni(lunedi, 6);
  // da che lato entra il periodo nuovo (solo animazione)
  const [verso, setVerso] = useState<-1 | 0 | 1>(0);

  // i mesi che servono: uno per la griglia, uno o due per la settimana
  const meseA: MeseISO = vista === "mese" ? mese : meseDi(lunedi);
  const meseB: MeseISO = vista === "mese" ? mese : meseDi(domenica);
  useEffect(() => {
    void caricaMese(meseA);
    if (meseB !== meseA) void caricaMese(meseB);
  }, [meseA, meseB]);

  function sposta(n: -1 | 1) {
    setVerso(n);
    if (vista === "mese") impostaMeseVisto(spostaMese(mese, n));
    else impostaSettimanaVista(aggiungiGiorni(lunedi, 7 * n));
  }

  function vaiAOggi() {
    setVerso(0);
    impostaMeseVisto(meseDi(oggi));
    impostaSettimanaVista(lunediDi(oggi));
  }

  function cambiaVista(v: VistaPiano) {
    setVerso(0);
    if (v === "settimana") {
      // la settimana di oggi se si guarda il mese di oggi, se no la prima del mese
      impostaSettimanaVista(meseDi(oggi) === mese ? lunediDi(oggi) : lunediDi(`${mese}-01`));
    } else {
      // il mese che ha la maggior parte della settimana (quello del giovedi')
      impostaMeseVisto(meseDi(aggiungiGiorni(lunedi, 3)));
    }
    impostaVistaPiano(v);
  }

  const gesto = useScorrimentoLaterale(
    () => sposta(1),
    () => sposta(-1),
  );

  const suOggi = vista === "mese" ? mese === meseDi(oggi) : lunedi === lunediDi(oggi);
  const titolo =
    vista === "mese" ? maiuscola(formatta(`${mese}-01`, t, { month: "long", year: "numeric" })) : titoloSettimana(lunedi, t);
  const statoA = a.mesi[meseA];
  const statoB = a.mesi[meseB];
  const errore = statoA?.tipo === "errore" || statoB?.tipo === "errore";

  return (
    <AppShell
      tab="plan"
      titolo={t.titoloPlan}
      azioneDestra={
        !suOggi && (
          <button
            type="button"
            onClick={vaiAOggi}
            className="h-11 rounded-full px-3 text-[15px] font-semibold text-neutral-900 active:bg-black/[0.05]"
          >
            {t.oggi}
          </button>
        )
      }
    >
      <div className="pt-2">
        <Segmenti<VistaPiano>
          etichetta={`${t.vistaSettimana} / ${t.vistaMese}`}
          attiva={vista}
          onCambia={cambiaVista}
          voci={[
            { id: "settimana", etichetta: t.vistaSettimana },
            { id: "mese", etichetta: t.vistaMese },
          ]}
        />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => sposta(-1)}
          aria-label={vista === "mese" ? t.mesePrima : t.settimanaPrima}
          className={FRECCIA}
        >
          <IoChevronBack className="h-6 w-6" aria-hidden />
        </button>
        <h2 className="min-w-0 flex-1 truncate text-center text-[18px] font-bold" aria-live="polite">
          {titolo}
        </h2>
        <button
          type="button"
          onClick={() => sposta(1)}
          aria-label={vista === "mese" ? t.meseDopo : t.settimanaDopo}
          className={FRECCIA}
        >
          <IoChevronForward className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {errore && (
        <ErroreBox
          testo={t.erroreCarica}
          riprova={() => {
            void caricaMese(meseA);
            if (meseB !== meseA) void caricaMese(meseB);
          }}
        />
      )}

      {/* il dito di lato cambia periodo; in verticale scorre #app-scroll */}
      <div
        key={`${vista}-${vista === "mese" ? mese : lunedi}`}
        className={`mt-3 touch-pan-y touch-pinch-zoom ${ENTRATA[verso]}`}
        {...gesto}
      >
        {vista === "mese" ? (
          // griglia e legenda nella stessa card: un blocco solo invece di una scritta sciolta sotto
          <Scheda className="px-2 pb-4 pt-3">
            <GrigliaMese mese={mese} stato={statoA} oggi={oggi} />
            <div className="mx-2 mt-3 border-t border-black/[0.06] pt-3">
              <Legenda />
            </div>
          </Scheda>
        ) : (
          <ListaSettimana lunedi={lunedi} mesi={a.mesi} oggi={oggi} />
        )}
      </div>
    </AppShell>
  );
}
