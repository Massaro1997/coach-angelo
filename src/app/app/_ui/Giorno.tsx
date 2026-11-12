"use client";

// /app/giorno/[data]: il piano di un giorno, in una schermata sola come in
// un'app. In alto fissi: "‹ Kalender", il contatto col coach e la data con le
// frecce (o il dito di lato) per il giorno prima/dopo. Sotto, la nota del
// coach compatta e le linguette "Training | Ernährung": ognuna scorre per conto
// suo, la pagina mai. In fondo la barra fissa con "Erledigt" (Risposta).
// Prende il mese dall'archivio (se si arriva dal calendario c'e' gia') e lo
// riaggiorna in sottofondo.

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  MessageCircle,
  MessageSquareText,
  Moon,
  Utensils,
} from "lucide-react";
import type { DataISO, Giornata } from "@/lib/app-coaching/tipi";
import { aggiungiGiorni, meseDi } from "@/lib/app-coaching/date";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { caricaMese, caricaProfilo, impostaMeseVisto, useArchivio } from "./archivio";
import {
  AvvisoOffline,
  Centrato,
  Errore,
  formatta,
  haAlimentazione,
  haAllenamento,
  haPiano,
  LATI,
  linkWhatsapp,
  maiuscola,
  SCORRE,
  Segnaposto,
  Testata,
  useTesti,
} from "./comuni";
import { useScorrimentoLaterale } from "./gesto";
import { ricordoGiorno, tornaAlCalendario } from "./navigazione";
import Foglio from "./Foglio";
import SezioneAllenamento from "./Allenamento";
import SezioneAlimentazione from "./Alimentazione";
import Risposta from "./Risposta";

type Linguetta = "training" | "alimentazione";

const FRECCIA =
  "grid size-11 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition-colors active:bg-neutral-200";

/** Il giorno nuovo entra dal lato da cui arriva; dal calendario solo dissolvenza. */
const ENTRATA: Record<-1 | 0 | 1, string> = {
  [-1]: "animate-[app-da-sinistra_180ms_ease-out]",
  0: "animate-[app-appare_150ms_ease-out]",
  1: "animate-[app-da-destra_180ms_ease-out]",
};

// ---------------------------------------------------------------- pezzi

/** Simbolo grande in un tondo, per le schermate al centro. */
function Tondo({ children }: { children: ReactNode }) {
  return (
    <span className="mx-auto grid size-16 place-items-center rounded-full bg-white text-neutral-500 ring-1 ring-black/[0.06]">
      {children}
    </span>
  );
}

function Riposo() {
  const t = useTesti();
  return (
    <div className="text-center">
      <Tondo>
        <Moon className="size-7" aria-hidden />
      </Tondo>
      <h2 className="mt-4 text-2xl font-bold">{t.riposo}</h2>
      <p className="mt-1.5 text-neutral-600">{t.riposoTesto}</p>
    </div>
  );
}

/**
 * La nota del coach in evidenza ma compatta: due righe, il resto in un foglio.
 * `intera` quando la schermata e' vuota (solo riposo o solo la nota).
 */
function NotaCoach({ testo, intera = false }: { testo: string; intera?: boolean }) {
  const t = useTesti();
  const [aperta, setAperta] = useState(false);
  const titolo = t.notaCoach(MARCHIO.coach);
  const stile =
    "flex w-full gap-3 rounded-2xl bg-[var(--app-colore)]/[0.06] p-3 text-left ring-1 ring-[var(--app-colore)]/15";
  const corpo = (
    <>
      <MessageSquareText className="mt-0.5 size-5 shrink-0 text-[var(--app-colore)]" aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold">{titolo}</span>
        <span
          className={`mt-0.5 whitespace-pre-line text-[15px] leading-snug text-neutral-700 ${
            intera ? "block" : "line-clamp-2"
          }`}
        >
          {testo}
        </span>
      </span>
    </>
  );

  if (intera) return <div className={stile}>{corpo}</div>;
  return (
    <>
      <button
        type="button"
        onClick={() => setAperta(true)}
        aria-haspopup="dialog"
        className={`${stile} transition-opacity active:opacity-75`}
      >
        {corpo}
        <ChevronRight className="size-5 shrink-0 self-center text-neutral-400" aria-hidden />
      </button>
      {aperta && (
        <Foglio titolo={titolo} onChiudi={() => setAperta(false)}>
          <p className="whitespace-pre-line text-[17px] leading-relaxed">{testo}</p>
        </Foglio>
      )}
    </>
  );
}

/** Controllo a segmenti: Training | Ernährung (o Ruhetag | Ernährung). */
function Segmenti({
  voci,
  attiva,
  onCambia,
}: {
  voci: { id: Linguetta; etichetta: string; icona: ReactNode }[];
  attiva: Linguetta;
  onCambia: (l: Linguetta) => void;
}) {
  return (
    <div role="tablist" className="grid grid-cols-2 gap-1 rounded-xl bg-black/[0.06] p-1">
      {voci.map((v, i) => {
        const scelta = v.id === attiva;
        return (
          <button
            key={v.id}
            type="button"
            role="tab"
            id={`linguetta-${v.id}`}
            aria-selected={scelta}
            aria-controls={`pannello-${v.id}`}
            tabIndex={scelta ? 0 : -1}
            onClick={() => onCambia(v.id)}
            onKeyDown={(e) => {
              // frecce della tastiera: come le linguette vere
              if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
              e.preventDefault();
              const altra = voci[(i + 1) % voci.length];
              onCambia(altra.id);
              document.getElementById(`linguetta-${altra.id}`)?.focus();
            }}
            className={`flex h-11 min-w-0 items-center justify-center gap-2 rounded-lg px-2 text-base font-semibold transition-colors ${
              scelta ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 active:bg-white/60"
            }`}
          >
            <span className="shrink-0">{v.icona}</span>
            <span className="truncate">{v.etichetta}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Contenuto di una linguetta: scorre da solo. Nascosto, non smontato: tiene il punto. */
function Pannello({
  id,
  visibile,
  conLinguette,
  centrato = false,
  children,
}: {
  id: Linguetta;
  visibile: boolean;
  conLinguette: boolean;
  centrato?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      id={`pannello-${id}`}
      role={conLinguette ? "tabpanel" : undefined}
      aria-labelledby={conLinguette ? `linguetta-${id}` : undefined}
      hidden={!visibile}
      className={`flex flex-col ${SCORRE}`}
    >
      {/* in fondo il margine del tasto Home: nei giorni futuri sotto non c'e' la barra */}
      <div
        className={`mx-auto w-full max-w-xl pt-3 pb-[max(1.25rem,var(--app-sotto,env(safe-area-inset-bottom)))] ${LATI} ${
          centrato ? "my-auto" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Piano({ g }: { g: Giornata }) {
  const t = useTesti();
  // la linguetta scelta resta tra un giorno e l'altro
  const [scelta, setScelta] = useState<Linguetta>(() => ricordoGiorno.linguetta);
  const allenamento = g.allenamento && haAllenamento(g) ? g.allenamento : null;
  const alimentazione = g.alimentazione && haAlimentazione(g) ? g.alimentazione : null;
  const nota = g.notaCoach?.trim() || null;

  // solo riposo e/o la nota: una schermata pulita, al centro
  if (!allenamento && !alimentazione) {
    return (
      <Centrato>
        {g.riposo && <Riposo />}
        {nota && (
          <div className={g.riposo ? "mt-8" : ""}>
            <NotaCoach testo={nota} intera />
          </div>
        )}
      </Centrato>
    );
  }

  // la prima linguetta e' il training, o il riposo se quel giorno c'e' solo la dieta
  const primo = allenamento ? "training" : g.riposo ? "riposo" : null;
  const due = primo !== null && alimentazione !== null;
  const attiva: Linguetta = due ? scelta : allenamento || primo ? "training" : "alimentazione";

  function cambia(l: Linguetta) {
    ricordoGiorno.linguetta = l;
    setScelta(l);
  }

  return (
    <>
      {(nota || due) && (
        <div className={`mx-auto w-full max-w-xl shrink-0 space-y-2.5 pt-3 ${LATI}`}>
          {nota && <NotaCoach testo={nota} />}
          {due && (
            <Segmenti
              attiva={attiva}
              onCambia={cambia}
              voci={[
                primo === "training"
                  ? { id: "training", etichetta: t.training, icona: <Dumbbell className="size-5" aria-hidden /> }
                  : { id: "training", etichetta: t.riposo, icona: <Moon className="size-5" aria-hidden /> },
                {
                  id: "alimentazione",
                  etichetta: t.alimentazione,
                  icona: <Utensils className="size-5" aria-hidden />,
                },
              ]}
            />
          )}
        </div>
      )}
      {primo && (
        <Pannello id="training" visibile={attiva === "training"} conLinguette={due} centrato={!allenamento}>
          {allenamento ? (
            <SezioneAllenamento allenamento={allenamento} riposo={g.riposo} titoloVisibile={!due} />
          ) : (
            <Riposo />
          )}
        </Pannello>
      )}
      {alimentazione && (
        <Pannello id="alimentazione" visibile={attiva === "alimentazione"} conLinguette={due}>
          <SezioneAlimentazione alimentazione={alimentazione} titoloVisibile={!due} />
        </Pannello>
      )}
    </>
  );
}

// ---------------------------------------------------------------- schermata

export default function Giorno({ data }: { data: DataISO }) {
  const t = useTesti();
  const router = useRouter();
  const a = useArchivio();
  const mese = meseDi(data);
  const statoMese = a.mesi[mese];
  const anonimo = a.profilo.tipo === "anonimo";
  // da che lato entra questo giorno: frecce e dito lo segnano prima di partire
  const [verso] = useState(() => ricordoGiorno.verso);

  useEffect(() => {
    void caricaProfilo();
  }, []);

  useEffect(() => {
    // tornando al calendario si ritrova il mese di questo giorno
    impostaMeseVisto(mese);
    void caricaMese(mese);
  }, [mese]);

  useEffect(() => {
    if (anonimo) router.replace("/app");
  }, [anonimo, router]);

  const prima = aggiungiGiorni(data, -1);
  const dopo = aggiungiGiorni(data, 1);

  // tra un giorno e l'altro si sostituisce: indietro torna al calendario
  function vai(n: -1 | 1) {
    ricordoGiorno.verso = n;
    router.replace(`/app/giorno/${n < 0 ? prima : dopo}`);
  }
  const gesto = useScorrimentoLaterale(
    () => vai(1),
    () => vai(-1),
  );

  const giornoSettimana = maiuscola(formatta(data, t, { weekday: "long" }));
  const dataLunga = formatta(data, t, { day: "numeric", month: "long", year: "numeric" });
  const eOggi = a.oggi === data;
  const futuro = a.oggi !== null && data > a.oggi;
  const g = statoMese?.tipo === "ok" ? statoMese.giornate[data] : undefined;

  let contenuto: ReactNode;
  // un giorno che deve ancora venire non si puo' aver fatto
  let conRisposta = false;
  if (statoMese?.tipo === "ok") {
    if (haPiano(g)) {
      contenuto = <Piano g={g} />;
      conRisposta = !futuro;
    } else {
      contenuto = (
        <Centrato>
          <div className="text-center">
            <Tondo>
              <CalendarDays className="size-7" aria-hidden />
            </Tondo>
            <p className="mt-4 text-lg text-neutral-600">{t.nientePiano(MARCHIO.coach)}</p>
          </div>
        </Centrato>
      );
    }
  } else if (statoMese?.tipo === "errore") {
    contenuto = (
      <Centrato>
        <Errore testo={t.erroreCarica} onRiprova={() => void caricaMese(mese)} />
      </Centrato>
    );
  } else {
    contenuto = (
      <div className={`mx-auto min-h-0 w-full max-w-xl flex-1 overflow-hidden pt-3 ${LATI}`}>
        <Segnaposto altezze={["h-16", "h-[52px]", "h-32", "h-32"]} />
      </div>
    );
  }

  return (
    <>
      <Testata
        sinistra={
          <Link
            href="/app"
            replace
            onClick={(e) => tornaAlCalendario(e, () => router.back())}
            className="-ml-2 flex h-11 items-center gap-0.5 rounded-full pr-3 text-[17px] font-semibold text-[var(--app-colore-scuro)] active:bg-neutral-100"
          >
            <ChevronLeft className="size-6" aria-hidden />
            {t.calendario}
          </Link>
        }
        destra={
          anonimo ? (
            <span className="size-11" aria-hidden />
          ) : (
            // un solo contatto col coach, discreto
            <a
              href={linkWhatsapp(t.messaggioWhatsapp(dataLunga))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.domanda(MARCHIO.coach)} ${t.scriviWhatsapp}`}
              title={t.scriviWhatsapp}
              className="-mr-2 grid size-11 place-items-center rounded-full text-neutral-600 active:bg-neutral-100"
            >
              <MessageCircle className="size-6" aria-hidden />
            </a>
          )
        }
      >
        <div className={`mx-auto flex max-w-xl items-center gap-2 pb-2.5 ${LATI}`}>
          <Link
            href={`/app/giorno/${prima}`}
            replace
            onClick={() => {
              ricordoGiorno.verso = -1;
            }}
            aria-label={t.giornoPrima}
            className={FRECCIA}
          >
            <ChevronLeft className="size-6" aria-hidden />
          </Link>
          <div className="min-w-0 flex-1 text-center">
            {/* px/py: il corsivo e gli accenti (LUNEDÌ) non si tagliano */}
            <h1 className="fp-titolo truncate px-1 py-0.5 text-[24px]">{giornoSettimana}</h1>
            <p className="mt-0.5 flex items-center justify-center gap-2 text-[15px] text-neutral-600">
              <span className="truncate">{dataLunga}</span>
              {eOggi && (
                <span className="shrink-0 rounded-md bg-[var(--app-colore)]/10 px-1.5 py-px text-[13px] font-semibold text-[var(--app-colore-scuro)]">
                  {t.oggi}
                </span>
              )}
            </p>
          </div>
          <Link
            href={`/app/giorno/${dopo}`}
            replace
            onClick={() => {
              ricordoGiorno.verso = 1;
            }}
            aria-label={t.giornoDopo}
            className={FRECCIA}
          >
            <ChevronRight className="size-6" aria-hidden />
          </Link>
        </div>
      </Testata>
      {a.offline && <AvvisoOffline />}

      {/* il dito di lato cambia giorno; in verticale scorrono le linguette */}
      <main
        key={data}
        className={`flex min-h-0 flex-1 touch-pan-y touch-pinch-zoom flex-col ${ENTRATA[verso]}`}
        {...gesto}
      >
        {contenuto}
      </main>

      {conRisposta && g && <Risposta key={g.data} giornata={g} />}
    </>
  );
}
