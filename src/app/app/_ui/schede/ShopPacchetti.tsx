"use client";

// Pacchetti dello shop: card del pacchetto, foglio di conferma prima della
// cassa (un tocco per sbaglio non deve creare un acquisto in sospeso) e la
// sezione "Extra-Stunden" con i pagamenti ancora aperti.
//
// Grafica (13/11): ogni pacchetto ha la sua icona 3D e il prezzo grande. Le
// ore extra stanno in tessere a due colonne solo se sono in numero pari
// (griglia sempre completa, stessa altezza); se sono dispari, e per i
// contratti nuovi (titoli e descrizioni lunghi), una card larga per riga.

import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import type { PacchettoShop, RataCliente } from "@/lib/app-coaching/tipi-v2";
import Foglio from "../Foglio";
import { Icona3D, Lista, Pillola, Riga, Sezione, Tasto, euro } from "../kit";
import type { NomeIcona } from "../immagini";
import { chiama, testoErrore, useRitorno, vaiA } from "./api";
import { useT } from "./testi-schede";

const centesimi = (n: number) => Math.round(n * 100) / 100;

const CARTA =
  "w-full rounded-[20px] bg-white p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-transform active:scale-[0.98]";

/** Un'ora sola = cronometro, pacchetto di ore = regalo, contratto nuovo = bersaglio (si parte). */
function iconaPacchetto(p: PacchettoShop): NomeIcona {
  if (p.tipo === "nuovo-contratto") return "bersaglio";
  return p.ore != null && p.ore > 1 ? "regalo" : "cronometro";
}

/** Card larga: icona, titolo, descrizione su due righe e prezzo grande. */
export function CartaPacchetto({ p, onClick }: { p: PacchettoShop; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`${CARTA} flex items-start gap-3`}>
      <Icona3D nome={iconaPacchetto(p)} dimensione={48} />
      <span className="min-w-0 flex-1">
        <span className="block text-[17px] font-bold leading-snug">{p.titolo}</span>
        {p.descrizione && (
          <span className="mt-0.5 line-clamp-2 text-[14px] leading-snug text-neutral-500">{p.descrizione}</span>
        )}
        <span className="mt-2 block text-[22px] font-bold leading-tight tabular-nums">{euro(p.prezzo)}</span>
      </span>
      <IoChevronForward className="mt-1 h-5 w-5 shrink-0 text-neutral-400" aria-hidden />
    </button>
  );
}

/** Tessera per la griglia a due: il prezzo in fondo, cosi' nelle due tessere sta alla stessa altezza. */
function TesseraPacchetto({ p, onClick }: { p: PacchettoShop; onClick: () => void }) {
  const t = useT();
  return (
    <button type="button" onClick={onClick} className={`${CARTA} flex h-full min-h-[176px] flex-col items-start`}>
      <Icona3D nome={iconaPacchetto(p)} dimensione={48} />
      <span className="mt-3 block text-[16px] font-bold leading-snug">{p.titolo}</span>
      <span className="mt-auto block pt-3 text-[24px] font-bold leading-none tabular-nums">{euro(p.prezzo)}</span>
      {p.ore != null && p.ore > 0 && (
        <span className="mt-1.5 block text-[13px] text-neutral-500">{t.prezzoOra(euro(centesimi(p.prezzo / p.ore)))}</span>
      )}
    </button>
  );
}

/** Pacchetti in griglia completa: due colonne se sono pari, altrimenti card larghe. */
export function GrigliaPacchetti({
  pacchetti,
  onScegli,
  larghe,
}: {
  pacchetti: PacchettoShop[];
  onScegli: (p: PacchettoShop) => void;
  /** sempre card larghe (contratti: titoli e descrizioni lunghi) */
  larghe?: boolean;
}) {
  if (!larghe && pacchetti.length % 2 === 0) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {pacchetti.map((p) => (
          <TesseraPacchetto key={p.key} p={p} onClick={() => onScegli(p)} />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {pacchetti.map((p) => (
        <CartaPacchetto key={p.key} p={p} onClick={() => onScegli(p)} />
      ))}
    </div>
  );
}

export function FoglioAcquisto({
  pacchetto: p,
  url,
  tasto,
  nota,
  onChiudi,
}: {
  pacchetto: PacchettoShop;
  /** /api/app/shop/ore o /api/app/shop/nuovo: rispondono entrambe {link} */
  url: string;
  tasto: string;
  nota: string;
  onChiudi: () => void;
}) {
  const t = useT();
  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  useRitorno(() => setInvio(false));

  async function compra() {
    setInvio(true);
    setErrore(null);
    const r = await chiama<{ link: string }>(url, { metodo: "POST", corpo: { key: p.key } });
    // il tasto resta in attesa mentre si apre la cassa
    if (r.ok && vaiA(r.dati?.link)) return;
    setInvio(false);
    setErrore(r.ok ? t.erroreGenerico : testoErrore(r, t));
  }

  return (
    <Foglio titolo={p.titolo} onChiudi={onChiudi}>
      {p.descrizione && <p className="whitespace-pre-line text-[16px] leading-snug text-neutral-700">{p.descrizione}</p>}
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-neutral-50 p-4">
        <Icona3D nome={iconaPacchetto(p)} dimensione={44} />
        <span className="min-w-0 flex-1 text-[15px] text-neutral-600">{p.ore != null ? t.oreN(p.ore) : t.prezzo}</span>
        <span className="shrink-0 text-[26px] font-bold tabular-nums">{euro(p.prezzo)}</span>
      </div>
      {p.ore != null && p.ore > 1 && (
        <p className="mt-1.5 px-1 text-right text-[13px] text-neutral-500">{t.prezzoOra(euro(centesimi(p.prezzo / p.ore)))}</p>
      )}
      <p className="mt-4 text-[14px] leading-snug text-neutral-500">{nota}</p>
      {errore && (
        <p role="alert" className="mt-3 text-[15px] font-semibold text-[#b91c1c]">
          {errore}
        </p>
      )}
      <div className="mt-4">
        <Tasto pieno onClick={compra} disabled={invio}>
          {invio ? t.attendi : tasto}
        </Tasto>
      </div>
    </Foglio>
  );
}

export function SezioneExtra({ pacchetti, sospesi }: { pacchetti: PacchettoShop[]; sospesi: RataCliente[] }) {
  const t = useT();
  const [scelto, setScelto] = useState<PacchettoShop | null>(null);
  useRitorno(() => setScelto(null));
  if (!pacchetti.length && !sospesi.length) return null;

  return (
    <>
      {/* prima i pagamenti aperti: sono la cosa da fare */}
      {sospesi.length > 0 && (
        <Sezione titolo={t.sospesi}>
          <Lista>
            {sospesi.map((r, i) => (
              <Riga
                key={`${r.descrizione}-${i}`}
                icona3d="carta"
                titolo={r.descrizione}
                sotto={<span className="tabular-nums">{euro(r.importo)}</span>}
                destra={
                  r.link ? (
                    // senza icona: nella riga il tasto deve lasciare posto alla descrizione
                    <Tasto onClick={() => vaiA(r.link)}>
                      {t.paga}
                    </Tasto>
                  ) : (
                    <Pillola tono="attesa">{t.statiRata[r.stato]}</Pillola>
                  )
                }
              />
            ))}
          </Lista>
        </Sezione>
      )}

      {pacchetti.length > 0 && (
        <Sezione titolo={t.extraTitolo}>
          <GrigliaPacchetti pacchetti={pacchetti} onScegli={setScelto} />
        </Sezione>
      )}

      {scelto && (
        <FoglioAcquisto
          pacchetto={scelto}
          url="/api/app/shop/ore"
          tasto={t.allaCassa(euro(scelto.prezzo))}
          nota={t.pacchettoNota}
          onChiudi={() => setScelto(null)}
        />
      )}
    </>
  );
}
