"use client";

// Scheda Coach (app v2): in cima la card del coach (foto grande, nome, un solo
// tasto WhatsApp), sotto la chat nell'app. La card sta dentro la zona che
// scorre, non e' fissa: chi rilegge la chat la ritrova salendo. La chat scorre
// nella zona di AppShell (niente finestre dentro la scheda) e parte dal fondo;
// il campo di testo sta nel PiedeFisso, sopra la barra delle sezioni. Si
// aggiorna ogni 20 secondi solo mentre l'app e' in primo piano: in tasca non
// consuma batteria ne' richieste.

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { IoArrowUp } from "react-icons/io5";
import type { Messaggio } from "@/lib/app-coaching/tipi-v2";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { aggiungiGiorni } from "@/lib/app-coaching/date";
import { IconaWhatsApp } from "@/components/IconeContatto";
import { useArchivio } from "../archivio";
import { ErroreBox, Icona3D, useLingua } from "../kit";
import { PiedeFisso, useScroller } from "../shell/AppShell";
import { chiama, useApi } from "./api";
import { giornoBreve, giornoDi, orario } from "./formati";
import { useT } from "./testi-schede";

const OGNI_MS = 20_000;
/** lui scontornato con la cartellina, 800x1204 con trasparenza (da public/images/hero/angelo-cartellina.png, la foto dell'hero del sito) */
const FOTO_COACH = "/app-img/foto/coach.webp";
const MAX_TESTO = 2000;
const ALTEZZA_MAX_CAMPO = 128;
/** px dal fondo entro cui si considera "in fondo": la chat ci resta quando arriva qualcosa */
const VICINO_AL_FONDO = 96;

type InUscita = { id: string; testo: string; createdAt: string; stato: "invio" | "errore"; errore: string | null };
type Voce = { id: string; daCoach: boolean; testo: string; createdAt: string; uscita?: InUscita };

export default function Coach() {
  const t = useT();
  const lingua = useLingua();
  const oggi = useArchivio().oggi;
  const scroller = useScroller();
  const { stato, ricarica, riprova, modifica } = useApi<{ messaggi: Messaggio[] }>("/api/app/messaggi", t);
  const [testo, setTesto] = useState("");
  const [uscita, setUscita] = useState<InUscita[]>([]);
  const campo = useRef<HTMLTextAreaElement>(null);
  const contenuto = useRef<HTMLDivElement>(null);
  const inFondo = useRef(true);
  const contatore = useRef(0);

  // in fondo all'apertura e quando qualcosa cambia altezza (messaggi nuovi,
  // tastiera, campo che cresce), ma solo se si era gia' in fondo: chi sta
  // rileggendo un messaggio vecchio non deve essere riportato giu'
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const alFondo = () => {
      el.scrollTop = el.scrollHeight;
    };
    const su = () => {
      inFondo.current = el.scrollHeight - el.scrollTop - el.clientHeight < VICINO_AL_FONDO;
    };
    el.addEventListener("scroll", su, { passive: true });
    const ro = new ResizeObserver(() => {
      if (inFondo.current) alFondo();
    });
    ro.observe(el);
    if (contenuto.current) ro.observe(contenuto.current);
    // AppShell al montaggio riporta in cima dopo gli effetti dei figli: si scende dopo di lui
    const dopo = window.setTimeout(alFondo, 0);
    return () => {
      el.removeEventListener("scroll", su);
      ro.disconnect();
      window.clearTimeout(dopo);
    };
  }, [scroller]);

  // ogni 20 s, solo con l'app in primo piano; tornando in primo piano subito
  useEffect(() => {
    const giro = () => {
      if (document.visibilityState === "visible") ricarica();
    };
    const id = window.setInterval(giro, OGNI_MS);
    document.addEventListener("visibilitychange", giro);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", giro);
    };
  }, [ricarica]);

  async function invia(daInviare: string, idEsistente?: string) {
    const pulito = daInviare.trim().slice(0, MAX_TESTO);
    if (!pulito) return;
    const id = idEsistente ?? `locale-${++contatore.current}`;
    const voce: InUscita = { id, testo: pulito, createdAt: new Date().toISOString(), stato: "invio", errore: null };
    setUscita((l) => [...l.filter((x) => x.id !== id), voce]);
    inFondo.current = true;

    const r = await chiama<{ messaggio: Messaggio }>("/api/app/messaggi", { metodo: "POST", corpo: { testo: pulito } });
    if (r.ok && r.dati?.messaggio) {
      const m = r.dati.messaggio;
      modifica((d) => ({ ...d, messaggi: d.messaggi.some((x) => x.id === m.id) ? d.messaggi : [...d.messaggi, m] }));
      setUscita((l) => l.filter((x) => x.id !== id));
      // una lettura partita prima dell'invio arriverebbe senza questo messaggio:
      // ricaricare la annulla (useApi tiene solo l'ultima)
      ricarica();
    } else {
      setUscita((l) => l.map((x) => (x.id === id ? { ...x, stato: "errore", errore: r.ok ? null : r.errore } : x)));
    }
  }

  function adattaCampo() {
    const el = campo.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, ALTEZZA_MAX_CAMPO)}px`;
  }

  function inviaCampo(e?: FormEvent) {
    e?.preventDefault();
    if (!testo.trim()) return;
    void invia(testo);
    setTesto("");
    if (campo.current) campo.current.style.height = "";
    // la tastiera resta aperta: si scrive spesso due messaggi di fila
    campo.current?.focus();
  }

  function tasto(e: KeyboardEvent<HTMLTextAreaElement>) {
    // al computer Invio manda (Maiusc+Invio va a capo); sul telefono Invio va a capo
    if (e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    e.preventDefault();
    inviaCampo();
  }

  function usaEsempio(s: string) {
    setTesto(s.endsWith(":") ? `${s} ` : s);
    campo.current?.focus();
  }

  // in ordine di tempo anche se l'API un giorno li desse al contrario (ISO: confronto tra testi)
  const messaggi = stato.tipo === "ok" ? [...(stato.dati.messaggi ?? [])].sort((a, b) => a.createdAt.localeCompare(b.createdAt)) : [];
  const voci: Voce[] = [
    ...messaggi,
    ...uscita.map((u) => ({ id: u.id, daCoach: false, testo: u.testo, createdAt: u.createdAt, uscita: u })),
  ];
  const ieri = oggi ? aggiungiGiorni(oggi, -1) : null;
  const etichettaGiorno = (g: string) => (g === oggi ? t.oggi : g === ieri ? t.ieri : giornoBreve(g, lingua));

  let chat: ReactNode;
  if (voci.length) {
    chat = (
      <ol role="log" aria-label={MARCHIO.coach} className="mt-2">
        {voci.map((v, i) => {
          const prima = voci[i - 1];
          const giorno = giornoDi(v.createdAt);
          const nuovoGiorno = !prima || giornoDi(prima.createdAt) !== giorno;
          const cambioLato = nuovoGiorno || prima.daCoach !== v.daCoach;
          const mio = !v.daCoach;
          const u = v.uscita;
          return (
            <li key={v.id} className={cambioLato ? "mt-3" : "mt-1"}>
              {nuovoGiorno && (
                <p className="mb-3 mt-5 flex justify-center">
                  <span className="rounded-full bg-black/[0.05] px-3 py-1 text-[12px] font-semibold text-neutral-500">
                    {etichettaGiorno(giorno)}
                  </span>
                </p>
              )}
              {/* coach a sinistra in bianco, cliente a destra col colore del marchio */}
              <div className={`flex ${mio ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] rounded-[20px] px-4 py-2.5 text-[16px] leading-snug ${
                    mio
                      ? "rounded-br-md bg-[var(--app-colore,#e30613)] text-white"
                      : "rounded-bl-md bg-white text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                  } ${u ? "opacity-70" : ""}`}
                >
                  <p className="whitespace-pre-wrap break-words">{v.testo}</p>
                  <p className={`mt-1 text-right text-[11px] leading-none tabular-nums ${mio ? "text-white/75" : "text-neutral-400"}`}>
                    {u?.stato === "invio" ? t.invio : orario(v.createdAt, lingua)}
                  </p>
                </div>
              </div>
              {u?.stato === "errore" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => void invia(u.testo, u.id)}
                    className="min-h-[44px] max-w-[82%] px-1 text-right text-[13px] font-semibold leading-snug text-[#b91c1c]"
                  >
                    {u.errore && <span className="block font-normal">{u.errore}</span>}
                    {t.nonInviato}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    );
  } else if (stato.tipo === "attesa") {
    chat = <p className="py-10 text-center text-[15px] text-neutral-500">{t.caricoChat}</p>;
  } else if (stato.tipo === "errore") {
    chat = <ErroreBox testo={`${t.erroreChat} ${stato.testo}`} riprova={riprova} />;
  } else {
    // chat vuota: l'icona, due righe e qualche messaggio pronto, toccando va nel campo
    chat = (
      <div className="flex flex-col items-center px-2 pb-2 pt-6 text-center">
        <Icona3D nome="chat" dimensione={64} />
        <p className="mt-3 text-[18px] font-bold leading-snug">{t.chatVuotaTitolo(MARCHIO.coach)}</p>
        <p className="mx-auto mt-1 max-w-xs text-[15px] leading-snug text-neutral-500">{t.chatVuotaTesto}</p>
        <div className="mt-5 flex flex-col items-center gap-2">
          {t.esempi.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => usaEsempio(s)}
              className="min-h-[44px] rounded-full bg-white px-4 text-[15px] font-medium text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06] active:bg-neutral-100"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={contenuto} className="pb-2">
      <CartaCoach />
      {chat}

      <PiedeFisso>
        <form onSubmit={inviaCampo} className="border-t border-black/[0.06] bg-[#f4f4f6] px-3 py-2">
          <div className="mx-auto flex max-w-xl items-end gap-2">
            {/* 16px: sotto iPhone ingrandisce la pagina quando si tocca il campo */}
            <textarea
              ref={campo}
              rows={1}
              value={testo}
              maxLength={MAX_TESTO}
              onChange={(e) => {
                setTesto(e.target.value);
                adattaCampo();
              }}
              onKeyDown={tasto}
              placeholder={t.segnaposto}
              aria-label={t.segnaposto}
              className="block max-h-32 min-h-[44px] flex-1 resize-none rounded-[22px] bg-white px-4 py-[10px] text-[16px] leading-6 outline-none ring-1 ring-black/10 placeholder:text-neutral-400 focus:ring-2 focus:ring-[var(--app-colore,#e30613)]"
            />
            <button
              type="submit"
              aria-label={t.invia}
              disabled={!testo.trim()}
              // il tocco sul tasto non toglie il fuoco al campo: la tastiera resta su
              onMouseDown={(e) => e.preventDefault()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--app-colore,#e30613)] text-white transition-opacity disabled:opacity-35"
            >
              <IoArrowUp className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </form>
      </PiedeFisso>
    </div>
  );
}

/**
 * La card del coach in cima alla chat, come l'hero della home del sito
 * (13/11 notte: «metti solo a lui come nella hero della home di FitPrimo»):
 * lui scontornato con la cartellina su fondo chiaro rosato, le due forme
 * inclinate del sito dietro (una rossa sfumata, una grigia) e una scheda
 * bianca che galleggia in basso col nome nel carattere dei titoli del sito,
 * il ruolo e WhatsApp. Niente promesse (tempi di risposta e simili).
 * Altezza data dalla proporzione: la foto che arriva non sposta la chat.
 */
function CartaCoach() {
  const t = useT();
  return (
    <div
      className="relative isolate mt-2 overflow-hidden rounded-[22px] shadow-[0_2px_14px_rgba(0,0,0,0.08)]"
      style={{
        background:
          "radial-gradient(60% 80% at 30% 40%, color-mix(in srgb, var(--app-colore,#e30613) 10%, transparent) 0%, transparent 70%), linear-gradient(180deg, #fdf3f3 0%, #ffffff 75%)",
      }}
    >
      <div
        aria-hidden
        className="app-forma -bottom-4 left-[25%] h-[80%] w-[50%] opacity-90"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--app-colore,#e30613) 82%, white) 0%, color-mix(in srgb, var(--app-colore,#e30613) 82%, black) 100%)",
        }}
      />
      <div aria-hidden className="app-forma -bottom-4 left-[64%] h-[54%] w-[30%] bg-black/[0.06]" />
      <div className="relative w-full" style={{ aspectRatio: "1.1" }}>
        <Image
          src={FOTO_COACH}
          alt=""
          fill
          unoptimized
          loading="eager"
          draggable={false}
          className="select-none object-contain object-bottom"
        />
      </div>
      {/* la scheda bianca che galleggia, come i cartellini dell'hero */}
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[16px] border border-black/[0.08] bg-white p-3 pl-4 shadow-[0_22px_50px_-24px_rgba(18,18,20,0.45)]">
        <div className="min-w-0 flex-1">
          <p className="app-titolo truncate text-[22px] text-neutral-950">{MARCHIO.coach}</p>
          <p className="mt-0.5 truncate text-[14px] text-neutral-500">{t.ruolo}</p>
        </div>
        <a
          href={`https://wa.me/${MARCHIO.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-4 text-[15px] font-semibold text-white active:opacity-85"
        >
          <IconaWhatsApp className="h-5 w-5" />
          {t.whatsapp}
        </a>
      </div>
    </div>
  );
}
