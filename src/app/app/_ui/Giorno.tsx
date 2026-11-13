"use client";

// /app/giorno/[data]: il piano di un giorno, schermata di dettaglio di
// AppShell ("‹" che torna da dove si e' venuti; la barra delle sezioni resta
// ferma sotto, la mette il layout). In testata il giorno e le frecce per il
// giorno prima/dopo (anche col dito di lato). Tutto in UNA zona che scorre
// (#app-scroll): in alto la foto del tipo di giorno (allenamento, recupero,
// pasti) col titolo SOTTO la foto e "Erledigt" in una Pillola sopra, la nota
// del coach, poi allenamento o alimentazione; se ci sono tutti e due, un
// controllo a segmenti che resta in alto mentre si scorre (sticky dentro lo
// scroller, non due pannelli che scorrono ciascuno per conto suo come nella
// v1). In fondo, dentro il contenuto, la card "Fertig?" (Risposta): dal 13/11
// non e' piu' un piede fisso, era la seconda barra che compariva entrando qui.
// Il giorno arriva dal mese nell'archivio; se si viene dalla home e il mese
// non c'e' ancora, dalla settimana che la home ha gia'.

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoBarbellOutline, IoCheckmark, IoChevronBack, IoChevronForward, IoRestaurantOutline } from "react-icons/io5";
import type { DataISO, Giornata } from "@/lib/app-coaching/tipi";
import { aggiungiGiorni, meseDi } from "@/lib/app-coaching/date";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import {
  caricaMese,
  giornataDallaHome,
  impostaMeseVisto,
  impostaSettimanaVista,
  lunediDi,
  useArchivio,
} from "./archivio";
import {
  CARTA,
  formatta,
  haAlimentazione,
  haAllenamento,
  haPiano,
  maiuscola,
  titoloGiorno,
  useTesti,
} from "./comuni";
import { useScorrimentoLaterale } from "./gesto";
import { Caricamento, ErroreBox, Icona3D, Pillola, SchedaFoto, Segmenti, Vuoto } from "./kit";
import type { NomeFoto } from "./immagini";
import { ricordoGiorno } from "./navigazione";
import AppShell, { useScroller } from "./shell/AppShell";
import SezioneAllenamento from "./Allenamento";
import SezioneAlimentazione from "./Alimentazione";
import Risposta from "./Risposta";

type Parte = "training" | "alimentazione";

/** Il giorno nuovo entra dal lato da cui arriva; da home e piano solo dissolvenza. */
const ENTRATA: Record<-1 | 0 | 1, string> = {
  [-1]: "animate-[app-da-sinistra_180ms_ease-out]",
  0: "animate-[app-appare_150ms_ease-out]",
  1: "animate-[app-da-destra_180ms_ease-out]",
};

const FRECCIA =
  "flex h-11 w-11 items-center justify-center rounded-full text-neutral-800 transition-colors active:bg-black/[0.06]";

/**
 * La foto in cima al giorno, dal tipo: recupero (anche con un po' di
 * mobilita'), allenamento, solo pasti; con la sola nota, il piano scritto.
 */
function fotoDelGiorno(g: Giornata): NomeFoto {
  if (g.riposo) return "mobilita";
  if (haAllenamento(g)) return "allenamento";
  if (haAlimentazione(g)) return "mealprep";
  return "piano";
}

// ---------------------------------------------------------------- pezzi

/** Foto del tipo di giorno con titolo e numeri sotto; "Erledigt" si vede gia' qui. */
function Copertina({ g }: { g: Giornata }) {
  const t = useTesti();
  const allenamento = haAllenamento(g) ? g.allenamento : null;
  const alimentazione = haAlimentazione(g) ? g.alimentazione : null;

  let sotto: string;
  if (allenamento) {
    const n = allenamento.esercizi?.length ?? 0;
    sotto = [allenamento.durata?.trim(), n > 0 && t.esercizi(n)].filter(Boolean).join(" · ");
  } else if (g.riposo) {
    sotto = t.riposoTesto;
  } else if (alimentazione) {
    // le kcal stanno gia' nelle tessere degli obiettivi, subito sotto
    const n = alimentazione.pasti?.length ?? 0;
    sotto = n > 0 ? t.pasti(n) : "";
  } else {
    sotto = "";
  }

  const pillole =
    g.fatto || (g.riposo && allenamento) ? (
      <>
        {g.fatto && (
          <Pillola tono="ok">
            <IoCheckmark className="size-3.5" aria-hidden />
            {t.fatto}
          </Pillola>
        )}
        {/* giorno di riposo con un po' di mobilita': il titolo e' quello dell'allenamento */}
        {g.riposo && allenamento && <Pillola>{t.riposo}</Pillola>}
      </>
    ) : undefined;

  return (
    <SchedaFoto
      foto={fotoDelGiorno(g)}
      proporzione="16/9"
      priorita
      titolo={<span className="block text-[24px] leading-[1.12] break-words">{titoloGiorno(g, t)}</span>}
      sotto={sotto ? <span className="tabular-nums">{sotto}</span> : undefined}
      sopra={pillole}
    />
  );
}

/** La nota del coach per intero: scorre con il resto, niente foglio da aprire. */
function NotaCoach({ testo }: { testo: string }) {
  const t = useTesti();
  return (
    <div className={`${CARTA} p-4`}>
      <div className="flex items-center gap-3">
        <Icona3D nome="chat" dimensione={40} />
        <h2 className="min-w-0 flex-1 truncate text-[17px] font-bold">{t.notaCoach(MARCHIO.coach)}</h2>
      </div>
      <p className="mt-3 whitespace-pre-line break-words text-[17px] leading-relaxed">{testo}</p>
    </div>
  );
}

function PianoDelGiorno({ g }: { g: Giornata }) {
  const t = useTesti();
  const scroller = useScroller();
  // dove stanno i segmenti quando non sono incollati in alto
  const segno = useRef<HTMLDivElement>(null);
  // la parte scelta resta tra un giorno e l'altro
  const [scelta, setScelta] = useState<Parte>(() => ricordoGiorno.linguetta);
  const allenamento = haAllenamento(g) ? g.allenamento : null;
  const alimentazione = haAlimentazione(g) ? g.alimentazione : null;
  const nota = g.notaCoach?.trim() || null;
  const due = !!allenamento && !!alimentazione;
  const parte: Parte = due ? scelta : allenamento ? "training" : "alimentazione";

  function cambia(p: Parte) {
    ricordoGiorno.linguetta = p;
    setScelta(p);
    // scesi oltre i segmenti: la parte nuova si legge dal suo inizio
    const s = scroller.current;
    const m = segno.current;
    if (!s || !m) return;
    const inizio = m.getBoundingClientRect().top - s.getBoundingClientRect().top + s.scrollTop;
    if (s.scrollTop > inizio) s.scrollTo({ top: inizio });
  }

  return (
    <div className="pt-2">
      <Copertina g={g} />

      {nota && (
        <div className="mt-4">
          <NotaCoach testo={nota} />
        </div>
      )}

      {(allenamento || alimentazione) && (
        // il segno e' il contenitore: i segmenti restano incollati finche' dura
        <div ref={segno} className="mt-5">
          {due && (
            // resta in alto mentre si scorre, sopra le card
            <div className="sticky top-0 z-10 -mx-4 mb-3 bg-[#f4f4f6] px-4 pb-2 pt-1">
              <Segmenti<Parte>
                etichetta={`${t.training} / ${t.alimentazione}`}
                attiva={parte}
                onCambia={cambia}
                voci={[
                  { id: "training", etichetta: t.training, icona: <IoBarbellOutline aria-hidden /> },
                  { id: "alimentazione", etichetta: t.alimentazione, icona: <IoRestaurantOutline aria-hidden /> },
                ]}
              />
            </div>
          )}

          {/* nascosto e non smontato: tornando sulla parte si ritrova com'era */}
          {allenamento && (
            <div hidden={parte !== "training"}>
              <SezioneAllenamento allenamento={allenamento} />
            </div>
          )}
          {alimentazione && (
            <div hidden={parte !== "alimentazione"}>
              <SezioneAlimentazione alimentazione={alimentazione} fotoGiorno={fotoDelGiorno(g)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- schermata

export default function Giorno({ data }: { data: DataISO }) {
  const t = useTesti();
  const router = useRouter();
  const a = useArchivio();
  const mese = meseDi(data);
  const statoMese = a.mesi[mese];
  // da che lato entra questo giorno: frecce e dito lo segnano prima di partire
  const [verso] = useState(() => ricordoGiorno.verso);

  useEffect(() => {
    // tornando al piano si ritrova il mese di questo giorno
    impostaMeseVisto(mese);
    void caricaMese(mese);
  }, [mese]);

  useEffect(() => {
    impostaSettimanaVista(lunediDi(data));
  }, [data]);

  const prima = aggiungiGiorni(data, -1);
  const dopo = aggiungiGiorni(data, 1);

  // tra un giorno e l'altro si sostituisce: "‹" torna da dove si era partiti
  function vai(n: -1 | 1) {
    ricordoGiorno.verso = n;
    router.replace(`/app/giorno/${n < 0 ? prima : dopo}`, { scroll: false });
  }
  const gesto = useScorrimentoLaterale(
    () => vai(1),
    () => vai(-1),
  );

  // dal mese se e' arrivato, se no dalla home (settimana di oggi)
  const dalMese = statoMese?.tipo === "ok" ? (statoMese.giornate[data] ?? null) : undefined;
  const g = dalMese !== undefined ? dalMese : giornataDallaHome(a, data);
  const eOggi = a.oggi === data;
  const futuro = a.oggi !== null && data > a.oggi;
  const stessoAnno = a.oggi?.slice(0, 4) === data.slice(0, 4);

  const giornoSettimana = maiuscola(formatta(data, t, { weekday: "long" }));
  const dataLunga = formatta(data, t, stessoAnno ? { day: "numeric", month: "long" } : { day: "numeric", month: "long", year: "numeric" });

  let contenuto: ReactNode;
  if (g === undefined) {
    contenuto =
      statoMese?.tipo === "errore" ? (
        <ErroreBox testo={t.erroreCarica} riprova={() => void caricaMese(mese)} />
      ) : (
        <Caricamento />
      );
  } else if (haPiano(g)) {
    contenuto = <PianoDelGiorno g={g} />;
  } else {
    contenuto = <Vuoto icona={<Icona3D nome="calendario" dimensione={64} />} titolo={t.nientePiano(MARCHIO.coach)} />;
  }
  // "Fertig?" solo se c'e' qualcosa da fare e il giorno non deve ancora venire
  const conRisposta = !!g && !futuro && (haAllenamento(g) || haAlimentazione(g));

  const titolo = (
    <span className="block">
      <span className="block truncate text-[20px] leading-6">{giornoSettimana}</span>
      <span className="block truncate text-[14px] font-medium leading-5 text-neutral-500">
        {eOggi ? `${dataLunga} · ${t.oggi}` : dataLunga}
      </span>
    </span>
  );

  const frecce = (
    <>
      <Link
        href={`/app/giorno/${prima}`}
        replace
        scroll={false}
        onClick={() => {
          ricordoGiorno.verso = -1;
        }}
        aria-label={t.giornoPrima}
        className={FRECCIA}
      >
        <IoChevronBack className="h-6 w-6" aria-hidden />
      </Link>
      <Link
        href={`/app/giorno/${dopo}`}
        replace
        scroll={false}
        onClick={() => {
          ricordoGiorno.verso = 1;
        }}
        aria-label={t.giornoDopo}
        className={`-mr-2 ${FRECCIA}`}
      >
        <IoChevronForward className="h-6 w-6" aria-hidden />
      </Link>
    </>
  );

  return (
    <AppShell tab="plan" indietro="/app/plan" titolo={titolo} azioneDestra={frecce}>
      {/* il dito di lato cambia giorno; in verticale scorre #app-scroll */}
      <div className={`min-h-full touch-pan-y touch-pinch-zoom ${ENTRATA[verso]}`} {...gesto}>
        {contenuto}
        {/* in fondo al giorno, nel contenuto: nessuna barra fissa in piu' */}
        {conRisposta && g && (
          <div className="mt-6">
            <Risposta key={g.data} giornata={g} />
          </div>
        )}
      </div>
    </AppShell>
  );
}
