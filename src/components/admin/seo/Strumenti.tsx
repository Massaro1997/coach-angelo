"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Btn, cx } from "../ui";
import { baseSito, giornoBreve, num, type DatiSeo } from "./tipi";

// Gli strumenti di prima (sitemap, controllo URL, richiesta di nuovo
// passaggio) restano, ma chiusi in fondo: servono ogni tanto, non ogni giorno.
// Usano le API /api/gsc/* esistenti, senza cambiarle.

// Pagine chiave da far ripassare. NON le 688 pagine di quartiere: consumano
// la quota giornaliera condivisa e Google le trova comunque dalla sitemap.
const PAGINE_CHIAVE = [
  "/",
  "/personal-trainer-koeln",
  "/leistungen/personal-training",
  "/leistungen/abnehmen",
  "/leistungen/muskelaufbau",
  "/koeln/ehrenfeld",
  "/koeln/lindenthal",
  "/blog",
  "/fitness-faq",
].join("\n");

interface Ispezione {
  error?: string;
  indexStatusResult?: {
    verdict?: string;
    coverageState?: string;
    lastCrawlTime?: string;
    robotsTxtState?: string;
    pageFetchState?: string;
  };
  inspectionResultLink?: string;
}

const dataOra = (s?: string | null) => (s ? giornoBreve(s) + " " + s.slice(0, 4) : "mai");

function Esito({ ok, children }: { ok: boolean | null; children: React.ReactNode }) {
  return (
    <p
      className={cx(
        "mt-3 border-l-2 px-3 py-2 text-[13px] leading-snug",
        ok === null
          ? "border-neutral-300 bg-[#f4f4f5] text-neutral-600"
          : ok
            ? "border-green-600 bg-green-50 text-green-800"
            : "border-red-500 bg-red-50 text-red-700"
      )}
    >
      {children}
    </p>
  );
}

function Sitemap({ dati }: { dati: DatiSeo }) {
  const [esito, setEsito] = useState<{ ok: boolean; testo: string } | null>(null);
  const [invio, setInvio] = useState(false);

  const invia = async () => {
    setInvio(true);
    setEsito(null);
    try {
      const r = await fetch("/api/gsc/submit-sitemap", { method: "POST" });
      const d = await r.json();
      setEsito(
        d.ok
          ? { ok: true, testo: "Sitemap inviata. Google la rilegge di solito entro un giorno." }
          : { ok: false, testo: `Non inviata: ${d.error || d.results?.[0]?.error || "errore sconosciuto"}` }
      );
    } catch (e) {
      setEsito({ ok: false, testo: (e as Error).message });
    }
    setInvio(false);
  };

  return (
    <div>
      <h3 className="text-sm font-bold text-neutral-900">Sitemap</h3>
      <p className="mt-1 text-[12px] leading-snug text-neutral-500">
        L&apos;elenco delle pagine del sito che Google usa per trovarle tutte.
      </p>
      {dati.sitemap === null ? (
        <p className="mt-3 text-[12px] text-neutral-400">Stato della sitemap non disponibile.</p>
      ) : dati.sitemap.length === 0 ? (
        <p className="mt-3 text-[12px] text-amber-700">Nessuna sitemap inviata a Google.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {dati.sitemap.map((s) => (
            <li key={s.percorso} className="border border-black/[0.07] bg-[#f4f4f5] px-3 py-2 text-[12px]">
              <p className="truncate font-medium text-neutral-800" title={s.percorso}>
                {s.percorso.replace(baseSito(dati.proprieta), "") || s.percorso}
              </p>
              <p className="mt-0.5 text-neutral-500">
                {s.pagine ? `${num(s.pagine)} pagine, ` : ""}letta da Google il {dataOra(s.lettaDaGoogle)}
                {s.inAttesa && ", in attesa di lettura"}
              </p>
              {(s.errori > 0 || s.avvisi > 0) && (
                <p className="mt-0.5 font-semibold text-red-600">
                  {s.errori > 0 && `${s.errori} errori`}
                  {s.errori > 0 && s.avvisi > 0 && ", "}
                  {s.avvisi > 0 && `${s.avvisi} avvisi`}: aprila in Search Console per i dettagli
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      <Btn variant="outline" size="sm" className="mt-3" onClick={invia} disabled={invio}>
        {invio ? "Invio…" : "Invia di nuovo la sitemap"}
      </Btn>
      {esito && <Esito ok={esito.ok}>{esito.testo}</Esito>}
    </div>
  );
}

function ControllaPagina({ base }: { base: string }) {
  const [indirizzo, setIndirizzo] = useState("/");
  const [lavoro, setLavoro] = useState<"" | "controllo" | "richiesta">("");
  const [risposta, setRisposta] = useState<Ispezione | null>(null);
  const [richiesta, setRichiesta] = useState<{ ok: boolean; testo: string } | null>(null);

  const url = () => {
    const v = indirizzo.trim();
    if (v.startsWith("http")) return v;
    return `${base}${v.startsWith("/") ? "" : "/"}${v}`;
  };

  const controlla = async () => {
    setLavoro("controllo");
    setRisposta(null);
    setRichiesta(null);
    try {
      const r = await fetch(`/api/gsc/inspect?url=${encodeURIComponent(url())}`);
      setRisposta(await r.json());
    } catch (e) {
      setRisposta({ error: (e as Error).message });
    }
    setLavoro("");
  };

  const chiedi = async () => {
    setLavoro("richiesta");
    setRichiesta(null);
    try {
      const r = await fetch(`/api/gsc/ping-indexing?url=${encodeURIComponent(url())}`);
      const d = await r.json();
      setRichiesta(
        d.ok
          ? { ok: true, testo: "Richiesta inviata: Google ripassa sulla pagina nei prossimi giorni." }
          : { ok: false, testo: `Richiesta non accettata: ${d.error}` }
      );
    } catch (e) {
      setRichiesta({ ok: false, testo: (e as Error).message });
    }
    setLavoro("");
  };

  const st = risposta?.indexStatusResult;
  return (
    <div>
      <h3 className="text-sm font-bold text-neutral-900">Una pagina è su Google?</h3>
      <p className="mt-1 text-[12px] leading-snug text-neutral-500">
        Scrivi l&apos;indirizzo o solo la parte dopo il dominio, per esempio /koeln/ehrenfeld.
      </p>
      <input
        type="text"
        value={indirizzo}
        onChange={(e) => setIndirizzo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && controlla()}
        className="mt-3 w-full border border-black/15 bg-white px-3 py-2 text-[13px] text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
        placeholder="/koeln/ehrenfeld"
        aria-label="Indirizzo della pagina"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        <Btn variant="ink" size="sm" onClick={controlla} disabled={!!lavoro || !indirizzo.trim()}>
          {lavoro === "controllo" ? "Controllo…" : "Controlla"}
        </Btn>
        <Btn variant="outline" size="sm" onClick={chiedi} disabled={!!lavoro || !indirizzo.trim()}>
          {lavoro === "richiesta" ? "Invio…" : "Chiedi a Google di ripassare"}
        </Btn>
      </div>

      {risposta &&
        (risposta.error ? (
          <Esito ok={false}>Controllo non riuscito: {risposta.error}</Esito>
        ) : (
          <Esito ok={st?.verdict === "PASS"}>
            <span className="font-semibold">
              {st?.verdict === "PASS" ? "Sì, la pagina è su Google." : "No, la pagina non è ancora su Google."}
            </span>{" "}
            {st?.coverageState && <>Stato secondo Google: {st.coverageState}. </>}
            Ultima visita di Google: {dataOra(st?.lastCrawlTime)}.
            {risposta.inspectionResultLink && (
              <a
                href={risposta.inspectionResultLink}
                target="_blank"
                rel="noopener"
                className="ml-1 inline-flex items-center gap-0.5 font-semibold underline"
              >
                Dettagli <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </Esito>
        ))}
      {richiesta && <Esito ok={richiesta.ok}>{richiesta.testo}</Esito>}
    </div>
  );
}

function PiuPagine({ base }: { base: string }) {
  const [testo, setTesto] = useState(PAGINE_CHIAVE);
  const [invio, setInvio] = useState(false);
  const [esito, setEsito] = useState<{ ok: boolean | null; testo: string } | null>(null);
  const righe = testo
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  const invia = async () => {
    const urls = righe.map((u) => (u.startsWith("http") ? u : `${base}${u.startsWith("/") ? "" : "/"}${u}`));
    if (urls.length > 100) {
      setEsito({ ok: false, testo: `Sono ${urls.length} indirizzi: al massimo 100 per volta.` });
      return;
    }
    setInvio(true);
    setEsito(null);
    try {
      const r = await fetch("/api/gsc/ping-indexing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });
      const d = await r.json();
      if (d.error) setEsito({ ok: false, testo: d.error });
      else
        setEsito({
          ok: d.failed === 0 ? true : d.succeeded === 0 ? false : null,
          testo:
            d.failed === 0
              ? `Fatto: ${d.succeeded} pagine segnalate a Google.`
              : `${d.succeeded} segnalate, ${d.failed} rifiutate (spesso è la quota del giorno finita).`,
        });
    } catch (e) {
      setEsito({ ok: false, testo: (e as Error).message });
    }
    setInvio(false);
  };

  return (
    <div>
      <h3 className="text-sm font-bold text-neutral-900">Far ripassare più pagine insieme</h3>
      <p className="mt-1 text-[12px] leading-snug text-neutral-500">
        Un indirizzo per riga. Google accetta circa 200 richieste al giorno, condivise con altri siti: usalo solo per
        pagine cambiate davvero, non per tutte le pagine di quartiere.
      </p>
      <textarea
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
        rows={6}
        className="mt-3 w-full resize-y border border-black/15 bg-white px-3 py-2 font-mono text-[12px] text-neutral-900 outline-none focus:border-neutral-900"
        aria-label="Indirizzi da far ripassare"
      />
      <div className="mt-2 flex items-center gap-3">
        <Btn variant="outline" size="sm" onClick={invia} disabled={invio || righe.length === 0}>
          {invio ? "Invio…" : `Segnala ${righe.length} pagine`}
        </Btn>
      </div>
      {esito && <Esito ok={esito.ok}>{esito.testo}</Esito>}
    </div>
  );
}

export default function Strumenti({ dati, aperto = false }: { dati: DatiSeo; aperto?: boolean }) {
  const base = baseSito(dati.proprieta);
  return (
    <details open={aperto} className="group border border-black/10 bg-white">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 sm:px-5 [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-bold text-neutral-900">Strumenti</span>
        <span className="hidden text-[12px] text-neutral-400 sm:inline">
          sitemap, controllo di una pagina, richieste a Google di ripassare
        </span>
        <ChevronDown className="ml-auto h-4 w-4 text-neutral-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid gap-6 border-t border-black/[0.07] p-4 sm:p-5 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-black/[0.07] lg:p-0 lg:[&>*]:p-5">
        <Sitemap dati={dati} />
        <ControllaPagina base={base} />
        <PiuPagine base={base} />
      </div>
      <p className="border-t border-black/[0.07] px-4 py-2.5 text-[11px] text-neutral-400 sm:px-5">
        Proprietà di Search Console: {dati.proprieta}
        <a
          href={`https://search.google.com/search-console?resource_id=${encodeURIComponent(dati.proprieta)}`}
          target="_blank"
          rel="noopener"
          className="ml-2 inline-flex items-center gap-0.5 font-semibold text-neutral-600 hover:text-neutral-900"
        >
          Apri Search Console <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </details>
  );
}
