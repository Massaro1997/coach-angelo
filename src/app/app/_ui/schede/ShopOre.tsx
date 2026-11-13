"use client";

// Ore 1:1: ore del mese e credito extra, tasto che apre la scelta di giorno e
// ora (FoglioPrenota), poi "Meine Termine" con il dettaglio di ogni
// appuntamento in un Foglio (pagare, annullare o scrivere al coach).
//
// Grafica (13/11): card con la foto del coach in sala con un cliente, sotto
// le ore in tre tessere uguali (libere, usate, credito) e il tasto pieno per
// prenotare; gli appuntamenti sono righe col calendario 3D e lo stato in una
// Pillola.

import { useState } from "react";
import { IoCalendarClearOutline, IoCalendarNumberOutline, IoCardOutline, IoChatbubbleOutline, IoReload } from "react-icons/io5";
import type { OreCliente, Prenotazione } from "@/lib/app-coaching/tipi-v2";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import Foglio from "../Foglio";
import { Icona3D, Lista, Pillola, Riga, SchedaFoto, Sezione, Tasto, euro, useLingua } from "../kit";
import type { NomeIcona } from "../immagini";
import { chiama, testoErrore, vaiA, type StatoApi } from "./api";
import FoglioPrenota from "./FoglioPrenota";
import { giornoBreve, giornoLungo, maiuscola } from "./formati";
import { useT } from "./testi-schede";

export type Termini = { prossime: Prenotazione[]; passate: Prenotazione[] };

// stringhe nuove solo qui (testi-schede.ts e' condiviso con chi lavora in parallelo)
type TestiOre = {
  incluse: (n: number) => string;
  libere: (n: number) => string;
  usate: (n: number) => string;
  credito: (n: number) => string;
};
const TXT: Record<"de" | "it", TestiOre> = {
  de: {
    incluse: (n) => `${n} ${n === 1 ? "Stunde" : "Stunden"} im Monat inklusive`,
    libere: () => "frei",
    usate: () => "genutzt",
    credito: () => "Guthaben",
  },
  it: {
    incluse: (n) => `${n} ${n === 1 ? "ora" : "ore"} al mese incluse`,
    libere: (n) => (n === 1 ? "libera" : "libere"),
    usate: (n) => (n === 1 ? "usata" : "usate"),
    credito: () => "in credito",
  },
};

const TONO_PREN = { confermata: "ok", "da pagare": "attesa", svolta: "neutro", annullata: "neutro" } as const;

export function SezioneOre({
  ore,
  termini,
  riprovaTermini,
  onCambio,
  priorita,
}: {
  ore: OreCliente;
  termini: StatoApi<Termini>;
  riprovaTermini: () => void;
  /** prenotata o annullata un'ora: shop e termini vanno riletti */
  onCambio: () => void;
  /** senza abbonamento questa e' la prima foto della schermata */
  priorita?: boolean;
}) {
  const t = useT();
  const lingua = useLingua();
  const [prenota, setPrenota] = useState(false);
  const [aperta, setAperta] = useState<Prenotazione | null>(null);
  const [vediPassate, setVediPassate] = useState(false);
  const prossime = termini.tipo === "ok" ? (termini.dati.prossime ?? []) : [];
  const passate = termini.tipo === "ok" ? (termini.dati.passate ?? []) : [];
  const conIncluse = ore.inclusePerMese > 0;

  return (
    <>
      <Sezione titolo={maiuscola(t.ore1a1)}>
        <SchedaFoto
          foto="coach-cliente"
          proporzione="2/1"
          priorita={priorita}
          titolo={t.senzaOreIncluse(MARCHIO.coach)}
          // con le ore nel contratto si dice quante; senza, quanto costa un'ora
          sotto={conIncluse ? TXT[lingua].incluse(ore.inclusePerMese) : t.prezzoOra(euro(ore.prezzoOra))}
        >
          <Ore ore={ore} />
          <span className="mt-4 block">
            <Tasto pieno icona={<IoCalendarNumberOutline aria-hidden />} onClick={() => setPrenota(true)}>
              {t.prenotaTitolo}
            </Tasto>
          </span>
        </SchedaFoto>
      </Sezione>

      {/* in attesa niente scheletro: la sezione spesso e' vuota e salterebbe */}
      {termini.tipo === "errore" && (
        <Sezione titolo={t.termini}>
          <div className="flex items-center justify-between gap-3 px-1">
            <p className="text-[15px] text-neutral-500">{termini.testo}</p>
            <Tasto variante="testo" icona={<IoReload aria-hidden />} onClick={riprovaTermini}>
              {t.riprova}
            </Tasto>
          </div>
        </Sezione>
      )}
      {termini.tipo === "ok" && (prossime.length > 0 || passate.length > 0) && (
        <Sezione titolo={t.termini}>
          {prossime.length > 0 ? (
            <Lista>
              {prossime.map((p) => (
                <RigaTermine key={p.id} p={p} onClick={() => setAperta(p)} />
              ))}
            </Lista>
          ) : (
            <p className="px-1 text-[15px] text-neutral-500">{t.nessunTermine}</p>
          )}
          {passate.length > 0 && (
            <>
              <div className="mt-1 flex justify-center">
                <Tasto variante="testo" onClick={() => setVediPassate((v) => !v)}>
                  {vediPassate ? t.nascondiPassate : t.passate(passate.length)}
                </Tasto>
              </div>
              {vediPassate && (
                <div className="opacity-75">
                  <Lista>
                    {passate.map((p) => (
                      <RigaTermine key={p.id} p={p} onClick={() => setAperta(p)} />
                    ))}
                  </Lista>
                </div>
              )}
            </>
          )}
        </Sezione>
      )}

      {prenota && (
        <FoglioPrenota ore={ore} prossime={prossime} onChiudi={() => setPrenota(false)} onPrenotata={onCambio} />
      )}
      {aperta && (
        <FoglioTermine
          p={aperta}
          onChiudi={() => setAperta(null)}
          onAnnullata={() => {
            setAperta(null);
            onCambio();
          }}
        />
      )}
    </>
  );
}

/** Tessera piccola dentro la card: icona, numero grande, parola sotto. Tre uguali in fila. */
function TesseraOre({ icona, n, etichetta }: { icona: NomeIcona; n: number; etichetta: string }) {
  return (
    <span className="flex flex-col items-center rounded-2xl bg-neutral-50 px-2 py-3 text-center">
      <Icona3D nome={icona} dimensione={36} />
      <span className="mt-1.5 text-[24px] font-bold leading-none tabular-nums">{n}</span>
      <span className="mt-1 text-[13px] leading-snug text-neutral-500">{etichetta}</span>
    </span>
  );
}

// tutto in span: sta dentro gli span di SchedaFoto
function Ore({ ore }: { ore: OreCliente }) {
  const t = useT();
  const lingua = useLingua();
  const x = TXT[lingua];

  // senza ore incluse nel contratto (il prezzo e' gia' sotto il titolo): solo il credito, se c'e'
  if (ore.inclusePerMese <= 0) {
    if (ore.creditoExtra <= 0) return null;
    return (
      <span className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3">
        <Icona3D nome="regalo" dimensione={40} />
        <span className="text-[15px] font-semibold leading-snug">{t.credito(ore.creditoExtra)}</span>
      </span>
    );
  }

  const restanti = Math.max(0, ore.restantiQuestoMese);
  const usate = Math.max(0, ore.usateQuestoMese);
  const credito = Math.max(0, ore.creditoExtra);
  return (
    <>
      <span className="grid grid-cols-3 gap-2" role="group" aria-label={t.questoMese}>
        <TesseraOre icona="cronometro" n={restanti} etichetta={x.libere(restanti)} />
        <TesseraOre icona="spunta" n={usate} etichetta={x.usate(usate)} />
        <TesseraOre icona="regalo" n={credito} etichetta={x.credito(credito)} />
      </span>
      {restanti === 0 && credito === 0 && (
        <span className="mt-3 block text-[14px] leading-snug text-neutral-600">
          {t.tutteUsate} {t.previsione.extra(euro(ore.prezzoOra))}
        </span>
      )}
    </>
  );
}

function RigaTermine({ p, onClick }: { p: Prenotazione; onClick: () => void }) {
  const t = useT();
  const lingua = useLingua();
  return (
    // giorno sopra e ora sotto: con la pillola dello stato a destra
    // "Mi., 19. Nov. · 10:00" su una riga sola verrebbe tagliato
    <Riga
      icona3d="calendario"
      titolo={giornoBreve(p.data, lingua)}
      sotto={<span className="tabular-nums">{t.fascia(p.inizio, p.fine) + (p.luogo ? ` · ${p.luogo}` : "")}</span>}
      destra={<Pillola tono={TONO_PREN[p.stato]}>{t.statiPren[p.stato]}</Pillola>}
      onClick={onClick}
    />
  );
}

function FoglioTermine({ p, onChiudi, onAnnullata }: { p: Prenotazione; onChiudi: () => void; onAnnullata: () => void }) {
  const t = useT();
  const lingua = useLingua();
  const [conferma, setConferma] = useState(false);
  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  // il server dice 409 se nel frattempo sono passate le 24 ore
  const [troppoTardi, setTroppoTardi] = useState(false);

  const attiva = p.stato === "confermata" || p.stato === "da pagare";
  const annullabile = attiva && p.annullabile && !troppoTardi;

  async function annulla() {
    setInvio(true);
    setErrore(null);
    const r = await chiama<{ ok: boolean }>(`/api/app/prenotazioni/${encodeURIComponent(p.id)}`, { metodo: "DELETE" });
    setInvio(false);
    if (r.ok) return onAnnullata();
    if (r.stato === 409) {
      setTroppoTardi(true);
      setConferma(false);
      return;
    }
    setErrore(testoErrore(r, t));
  }

  return (
    <Foglio titolo={t.termineTitolo} onChiudi={onChiudi}>
      <div className="flex items-start gap-3">
        <Icona3D nome="calendario" dimensione={56} />
        <div className="min-w-0 flex-1">
          <p className="text-[20px] font-bold leading-tight">{giornoLungo(p.data, lingua)}</p>
          <p className="mt-1 text-[17px] tabular-nums">{t.fascia(p.inizio, p.fine)}</p>
          {p.luogo && <p className="mt-1 text-[15px] leading-snug text-neutral-600">{p.luogo}</p>}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Pillola tono={TONO_PREN[p.stato]}>{t.statiPren[p.stato]}</Pillola>
        <Pillola>{t.tipoPren[p.tipo]}</Pillola>
      </div>
      {p.nota && <p className="mt-3 whitespace-pre-wrap rounded-2xl bg-neutral-50 p-3.5 text-[15px] leading-snug">{p.nota}</p>}

      {p.stato === "da pagare" && p.linkPagamento && (
        <div className="mt-4">
          <Tasto pieno icona={<IoCardOutline aria-hidden />} onClick={() => vaiA(p.linkPagamento)}>
            {t.pagaOra}
          </Tasto>
        </div>
      )}

      {annullabile &&
        (conferma ? (
          <div className="mt-5 rounded-2xl bg-[#fff1f0] p-4">
            <p className="text-[15px] leading-snug">{t.confermaAnnulla(giornoBreve(p.data, lingua), p.inizio)}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Tasto variante="secondario" onClick={() => setConferma(false)} disabled={invio}>
                {t.tieni}
              </Tasto>
              <Tasto onClick={annulla} disabled={invio}>
                {invio ? t.annullando : t.siAnnulla}
              </Tasto>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <Tasto variante="testo" icona={<IoCalendarClearOutline aria-hidden />} onClick={() => setConferma(true)}>
              {t.annullaTermine}
            </Tasto>
          </div>
        ))}

      {attiva && !annullabile && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-neutral-50 p-4">
          <Icona3D nome="chat" dimensione={40} />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] leading-snug text-neutral-700">{t.nonAnnullabile(MARCHIO.coach)}</p>
            <div className="mt-3">
              <Tasto variante="secondario" href="/app/coach" icona={<IoChatbubbleOutline aria-hidden />}>
                {t.scriviCoach}
              </Tasto>
            </div>
          </div>
        </div>
      )}

      {errore && (
        <p role="alert" className="mt-3 text-[15px] font-semibold text-[#b91c1c]">
          {errore}
        </p>
      )}
    </Foglio>
  );
}
