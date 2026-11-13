"use client";

// "Dein Abo": pacchetto, stato, durata, importo al mese e soprattutto la
// prossima rata (quando e quanto, e se va pagata a mano). Le rate tutte in un
// Foglio; rinnovo con un tocco che porta al contratto da firmare. Chi non ha
// un abbonamento vede i pacchetti per cominciare.
//
// Grafica (13/11): card con la foto della sala (la prima della schermata,
// quindi `priorita`), titolo e importo sotto la foto, stato in una Pillola
// sulla foto; poi una lista di righe con l'icona 3D (rata, periodo, rate,
// contratto, rinnovo). Firma e rinnovo urgente stanno dentro la card: sono
// la cosa da fare, il tasto pieno deve vedersi subito.

import { useState } from "react";
import { IoCardOutline, IoChatbubbleOutline, IoCreateOutline, IoRefresh } from "react-icons/io5";
import type { PacchettoShop, RataCliente, RiassuntoAbbonamento } from "@/lib/app-coaching/tipi-v2";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { useArchivio } from "../archivio";
import Foglio from "../Foglio";
import { Icona3D, Lista, Pillola, Riga, SchedaFoto, Sezione, Tasto, euro, useLingua } from "../kit";
import { chiama, testoErrore, useRitorno, vaiA } from "./api";
import { dataCompleta, giornoDi, maiuscola } from "./formati";
import { FoglioAcquisto, GrigliaPacchetti } from "./ShopPacchetti";
import { useT, type TestiSchede } from "./testi-schede";

type Lingua = "de" | "it";

// stringhe nuove solo qui (testi-schede.ts e' condiviso con chi lavora in parallelo)
const TXT = {
  de: { rinnovaBreve: "Neuer Vertrag zum Unterschreiben" },
  it: { rinnovaBreve: "Nuovo contratto da firmare" },
} as const;

const TONO_ABO = { attivo: "ok", "da firmare": "attesa", "in scadenza": "attesa", concluso: "neutro" } as const;
const TONO_RATA = { aperto: "attesa", "in corso": "neutro", pagato: "ok", annullato: "neutro" } as const;

const CARTA = "rounded-[20px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]";
const ERRORE = "text-[15px] font-semibold text-[#b91c1c]";

export function SezioneAbo({
  abbonamento,
  pacchetti,
}: {
  abbonamento: RiassuntoAbbonamento | null;
  /** pacchetti "nuovo-contratto": servono solo a chi non ha un abbonamento */
  pacchetti: PacchettoShop[];
}) {
  const t = useT();
  return <Sezione titolo={t.abo}>{abbonamento ? <CartaAbo a={abbonamento} /> : <SenzaAbo pacchetti={pacchetti} />}</Sezione>;
}

/** Periodo del contratto in due righe (titolo e sotto) per la riga col calendario. */
function periodo(a: RiassuntoAbbonamento, t: TestiSchede, l: Lingua): { titolo: string; sotto?: string } | null {
  const d = (s: string) => dataCompleta(s, l);
  const durata = a.mesi > 0 ? t.durata(a.mesi) : undefined;
  if (a.aTempoIndeterminato)
    return a.inizio ? { titolo: t.dal(d(a.inizio)), sotto: maiuscola(t.continuo) } : { titolo: maiuscola(t.continuo) };
  if (a.inizio && a.fine) return { titolo: `${d(a.inizio)} – ${d(a.fine)}`, sotto: durata };
  if (a.inizio) return { titolo: t.dal(d(a.inizio)), sotto: durata };
  return durata ? { titolo: durata } : null;
}

function CartaAbo({ a }: { a: RiassuntoAbbonamento }) {
  const t = useT();
  const lingua = useLingua();
  const [rate, setRate] = useState(false);
  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  useRitorno(() => setInvio(false));

  async function rinnova() {
    // la riga non ha "disabled": un secondo tocco mentre si apre il contratto non deve ripartire
    if (invio) return;
    setInvio(true);
    setErrore(null);
    const r = await chiama<{ link: string }>("/api/app/shop/rinnovo", { metodo: "POST" });
    if (r.ok && vaiA(r.dati?.link)) return;
    setInvio(false);
    setErrore(r.ok ? t.erroreGenerico : testoErrore(r, t));
  }

  const quando = periodo(a, t, lingua);
  const valide = a.rate.filter((r) => r.stato !== "annullato");
  const pagate = valide.filter((r) => r.stato === "pagato").length;
  const daFirmare = a.stato === "da firmare";
  // abbonamento che finisce o e' finito: il rinnovo sale nella card col tasto pieno;
  // se e' in corso basta una riga della lista (possibile, non urgente)
  const urgente = a.rinnovabile && (a.stato === "in scadenza" || a.stato === "concluso");
  const rinnovoInRiga = a.rinnovabile && !urgente;
  const testoUrgente =
    a.stato === "concluso" ? t.conclusoTesto : a.fine ? t.inScadenzaTesto(dataCompleta(a.fine, lingua)) : null;
  // span e non p: nella card sta dentro gli span di SchedaFoto
  const avviso = errore && (
    <span role="alert" className={`mt-2 block px-1 ${ERRORE}`}>
      {errore}
    </span>
  );
  const conRata = !daFirmare && !!a.prossimaRata;
  const righe = conRata || !!quando || valide.length > 0 || !daFirmare || rinnovoInRiga;

  return (
    <>
      <SchedaFoto
        foto="palestra"
        proporzione="16/9"
        priorita
        sopra={<Pillola tono={TONO_ABO[a.stato]}>{t.statiAbo[a.stato]}</Pillola>}
        titolo={a.titolo}
        destra={
          a.periodicita === "mensile" && a.importoMese != null ? (
            <span className="block text-right">
              <span className="block text-[20px] font-bold leading-snug tabular-nums">{euro(a.importoMese)}</span>
              <span className="block text-[13px] text-neutral-500">{t.proMese}</span>
            </span>
          ) : undefined
        }
      >
        {daFirmare ? (
          <>
            <span className="flex items-center gap-3">
              <Icona3D nome="contratto" dimensione={48} />
              <span className="text-[15px] leading-snug text-neutral-700">{t.daFirmareTesto}</span>
            </span>
            <span className="mt-3 block">
              <Tasto pieno icona={<IoCreateOutline aria-hidden />} onClick={() => vaiA(a.linkContratto)}>
                {t.firma}
              </Tasto>
            </span>
          </>
        ) : urgente ? (
          <>
            {testoUrgente && (
              <span className="flex items-center gap-3">
                <Icona3D nome="germoglio" dimensione={48} />
                <span className="text-[15px] leading-snug text-neutral-700">{testoUrgente}</span>
              </span>
            )}
            <span className={`block ${testoUrgente ? "mt-3" : ""}`}>
              <Tasto pieno icona={<IoRefresh aria-hidden />} onClick={rinnova} disabled={invio}>
                {invio ? t.attendi : t.rinnova}
              </Tasto>
            </span>
            <span className="mt-2 block text-center text-[13px] text-neutral-500">{t.rinnovaNota}</span>
            {avviso}
          </>
        ) : null}
      </SchedaFoto>

      {righe && (
        <div className="mt-3">
          <Lista>
            {conRata && a.prossimaRata && <ProssimaRata r={a.prossimaRata} />}
            {quando && <Riga icona3d="calendario" titolo={quando.titolo} sotto={quando.sotto} />}
            {valide.length > 0 && (
              <Riga
                icona3d="scheda"
                titolo={t.tutteRate}
                sotto={t.ratePagate(pagate, valide.length)}
                onClick={() => setRate(true)}
              />
            )}
            {!daFirmare && (
              <Riga icona3d="contratto" titolo={t.contratto} sotto={a.numero} onClick={() => vaiA(a.linkContratto)} />
            )}
            {rinnovoInRiga && (
              <Riga
                icona3d="germoglio"
                titolo={invio ? t.attendi : t.rinnova}
                sotto={TXT[lingua].rinnovaBreve}
                onClick={rinnova}
              />
            )}
          </Lista>
          {rinnovoInRiga && avviso}
        </div>
      )}

      {rate && <FoglioRate rate={a.rate} onChiudi={() => setRate(false)} />}
    </>
  );
}

/** Prima voce della lista: quanto, quando e, se va pagata a mano, il tasto per pagarla. */
function ProssimaRata({ r }: { r: RataCliente }) {
  const t = useT();
  const lingua = useLingua();
  const oggi = useArchivio().oggi;
  const scaduta = r.stato === "aperto" && !!r.scadenza && !!oggi && giornoDi(r.scadenza) < oggi;

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3">
        <Icona3D nome="carta" dimensione={40} />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-snug">{t.prossimaRata}</p>
          <p className="text-[14px] leading-snug text-neutral-500">
            {r.scadenza ? dataCompleta(r.scadenza, lingua) : r.descrizione}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <p className="text-[20px] font-bold leading-tight tabular-nums">{euro(r.importo)}</p>
          {scaduta && <Pillola tono="errore">{t.scaduta}</Pillola>}
        </div>
      </div>

      {r.link ? (
        <div className="mt-3">
          <Tasto pieno icona={<IoCardOutline aria-hidden />} onClick={() => vaiA(r.link)}>
            {t.pagaOra}
          </Tasto>
        </div>
      ) : (
        // sotto il testo, allineato al titolo (icona 40 + spazio 12)
        <p className="mt-1 pl-[52px] text-[14px] leading-snug text-neutral-600">
          {r.stato === "in corso" ? t.inElaborazione : t.addebitoAuto}
        </p>
      )}
    </div>
  );
}

function FoglioRate({ rate, onChiudi }: { rate: RataCliente[]; onChiudi: () => void }) {
  const t = useT();
  const lingua = useLingua();
  const d = (s: string) => dataCompleta(s, lingua);

  return (
    <Foglio titolo={t.tutteRate} onChiudi={onChiudi}>
      {rate.length === 0 ? (
        <p className="py-4 text-[15px] text-neutral-500">{t.nessunaRata}</p>
      ) : (
        <ul className="divide-y divide-black/[0.06]">
          {rate.map((r, i) => (
            <li key={`${r.descrizione}-${i}`} className={`flex items-center gap-3 py-3 ${r.stato === "annullato" ? "opacity-50" : ""}`}>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[16px] font-semibold">{r.descrizione}</p>
                <p className="text-[14px] text-neutral-500">
                  {r.stato === "pagato" && r.pagatoAt ? t.pagatoIl(d(r.pagatoAt)) : r.scadenza ? t.scadenzaIl(d(r.scadenza)) : ""}
                </p>
                {r.link && (
                  <button
                    type="button"
                    onClick={() => vaiA(r.link)}
                    className="-ml-1 mt-1 min-h-[44px] px-1 text-[15px] font-semibold text-[var(--app-colore,#e30613)]"
                  >
                    {t.pagaOra}
                  </button>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <p className="text-[17px] font-bold tabular-nums">{euro(r.importo)}</p>
                <Pillola tono={TONO_RATA[r.stato]}>{t.statiRata[r.stato]}</Pillola>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Foglio>
  );
}

function SenzaAbo({ pacchetti }: { pacchetti: PacchettoShop[] }) {
  const t = useT();
  const [scelto, setScelto] = useState<PacchettoShop | null>(null);
  useRitorno(() => setScelto(null));

  return (
    <>
      {/* stato vuoto: icona grande, una frase, nessuna spinta in piu' */}
      <div className={`${CARTA} flex flex-col items-center px-6 py-8 text-center`}>
        <Icona3D nome="borsa" dimensione={80} />
        <p className="mt-3 text-[18px] font-bold leading-snug">{t.nessunAbo}</p>
        <p className="mt-1 max-w-xs text-[15px] leading-snug text-neutral-500">
          {pacchetti.length ? t.nessunAboTesto(MARCHIO.coach) : t.nessunPacchetto(MARCHIO.coach)}
        </p>
        {!pacchetti.length && (
          <div className="mt-4">
            <Tasto variante="secondario" href="/app/coach" icona={<IoChatbubbleOutline aria-hidden />}>
              {t.scriviCoach}
            </Tasto>
          </div>
        )}
      </div>

      {pacchetti.length > 0 && (
        <div className="mt-3">
          <GrigliaPacchetti pacchetti={pacchetti} onScegli={setScelto} larghe />
        </div>
      )}

      {scelto && (
        <FoglioAcquisto
          pacchetto={scelto}
          url="/api/app/shop/nuovo"
          tasto={t.versoContratto}
          nota={t.contrattoNota}
          onChiudi={() => setScelto(null)}
        />
      )}
    </>
  );
}
