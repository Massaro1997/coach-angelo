"use client";

// /app/giorno/[data]: il piano di un giorno. Prende il mese dall'archivio (se
// si arriva dal calendario c'e' gia') e lo riaggiorna in sottofondo.

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, MessageCircle, MessageSquareText, Moon } from "lucide-react";
import type { DataISO, Giornata } from "@/lib/app-coaching/tipi";
import { aggiungiGiorni, meseDi } from "@/lib/app-coaching/date";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { caricaMese, caricaProfilo, impostaMeseVisto, useArchivio } from "./archivio";
import {
  AvvisoOffline,
  CARTA,
  Corpo,
  Errore,
  formatta,
  haAlimentazione,
  haAllenamento,
  haPiano,
  linkWhatsapp,
  maiuscola,
  Segnaposto,
  Testata,
  useTesti,
} from "./comuni";
import SezioneAllenamento from "./Allenamento";
import SezioneAlimentazione from "./Alimentazione";
import Risposta from "./Risposta";

const FRECCIA =
  "grid size-12 shrink-0 place-items-center rounded-full bg-white text-neutral-700 ring-1 ring-black/[0.06] active:bg-neutral-100";

function Piano({ g, futuro }: { g: Giornata; futuro: boolean }) {
  const t = useTesti();
  return (
    <>
      {g.riposo && (
        <section className={`${CARTA} mt-6 flex items-start gap-4 p-5`}>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-600">
            <Moon className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-2xl font-bold">{t.riposo}</h2>
            <p className="mt-1 text-neutral-600">{t.riposoTesto}</p>
          </div>
        </section>
      )}
      {g.allenamento && haAllenamento(g) && <SezioneAllenamento allenamento={g.allenamento} />}
      {g.alimentazione && haAlimentazione(g) && <SezioneAlimentazione alimentazione={g.alimentazione} />}
      {g.notaCoach?.trim() && (
        <section className={`${CARTA} mt-8 p-4`} aria-labelledby="sezione-nota">
          <h2 id="sezione-nota" className="flex items-center gap-2 text-lg font-bold">
            <MessageSquareText className="size-5 text-[var(--app-colore)]" aria-hidden />
            {t.notaCoach(MARCHIO.coach)}
          </h2>
          <p className="mt-2 whitespace-pre-line">{g.notaCoach}</p>
        </section>
      )}
      {/* un giorno che deve ancora venire non si puo' aver fatto */}
      {!futuro && <Risposta key={g.data} giornata={g} />}
    </>
  );
}

export default function Giorno({ data }: { data: DataISO }) {
  const t = useTesti();
  const router = useRouter();
  const a = useArchivio();
  const mese = meseDi(data);
  const statoMese = a.mesi[mese];
  const anonimo = a.profilo.tipo === "anonimo";

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

  const giornoSettimana = maiuscola(formatta(data, t, { weekday: "long" }));
  const dataLunga = formatta(data, t, { day: "numeric", month: "long", year: "numeric" });
  const eOggi = a.oggi === data;
  const futuro = a.oggi !== null && data > a.oggi;
  const g = statoMese?.tipo === "ok" ? statoMese.giornate[data] : undefined;

  let contenuto;
  if (statoMese?.tipo === "ok") {
    contenuto = haPiano(g) ? (
      <Piano g={g} futuro={futuro} />
    ) : (
      <p className={`${CARTA} mt-6 p-5 text-lg text-neutral-600`}>{t.nientePiano(MARCHIO.coach)}</p>
    );
  } else if (statoMese?.tipo === "errore") {
    contenuto = (
      <div className="mt-6">
        <Errore testo={t.erroreCarica} onRiprova={() => void caricaMese(mese)} />
      </div>
    );
  } else {
    contenuto = (
      <div className="mt-6">
        <Segnaposto altezze={["h-24", "h-32", "h-32"]} />
      </div>
    );
  }

  return (
    <>
      <Testata
        sinistra={
          <Link
            href="/app"
            className="-ml-2 flex h-11 items-center gap-1 rounded-full pr-3 text-[17px] font-semibold text-[var(--app-colore-scuro)] active:bg-neutral-100"
          >
            <ChevronLeft className="size-6" aria-hidden />
            {t.calendario}
          </Link>
        }
        destra={
          // eslint-disable-next-line @next/next/no-img-element
          <img src={MARCHIO.simbolo} alt="" className="h-6 w-auto" />
        }
      />
      {a.offline && <AvvisoOffline />}
      <Corpo>
        <div className="flex items-center gap-3">
          <Link href={`/app/giorno/${aggiungiGiorni(data, -1)}`} aria-label={t.giornoPrima} className={FRECCIA}>
            <ChevronLeft className="size-6" aria-hidden />
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <h1 className="fp-titolo truncate text-[30px]">{giornoSettimana}</h1>
            <p className="mt-1 text-neutral-600">
              {dataLunga}
              {eOggi && (
                <span className="ml-2 rounded-md bg-[var(--app-colore)]/10 px-1.5 py-0.5 font-semibold text-[var(--app-colore-scuro)]">
                  {t.oggi}
                </span>
              )}
            </p>
          </div>
          <Link href={`/app/giorno/${aggiungiGiorni(data, 1)}`} aria-label={t.giornoDopo} className={FRECCIA}>
            <ChevronRight className="size-6" aria-hidden />
          </Link>
        </div>

        {contenuto}

        {/* un solo contatto col coach, discreto, in fondo */}
        {!anonimo && (
          <div className="mt-10 text-center">
            <a
              href={linkWhatsapp(t.messaggioWhatsapp(dataLunga))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 px-3 text-neutral-600 underline-offset-4 active:text-neutral-900"
            >
              <MessageCircle className="size-5" aria-hidden />
              <span>
                {t.domanda(MARCHIO.coach)} <span className="underline">{t.scriviWhatsapp}</span>
              </span>
            </a>
          </div>
        )}
      </Corpo>
    </>
  );
}
