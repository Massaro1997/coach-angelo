"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cx } from "../ui";
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
        "mt-3 rounded-xl px-3 py-2 text-[13px] leading-5",
        ok === null
          ? "bg-crm-fondo text-crm-testo"
          : ok
            ? "bg-crm-ok/50 text-crm-ok-ink"
            : "bg-crm-errore text-crm-errore-ink"
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
      <h3 className="text-[13px] font-[650] leading-5 text-crm-ink">Sitemap</h3>
      <p className="text-[13px] leading-5 text-crm-tenue">
        L&apos;elenco delle pagine del sito che Google usa per trovarle tutte.
      </p>
      {dati.sitemap === null ? (
        <p className="mt-3 text-[12px] text-crm-spento">Stato della sitemap non disponibile.</p>
      ) : dati.sitemap.length === 0 ? (
        <p className="mt-3">
          <span className="crm-badge crm-badge-attesa">Nessuna sitemap inviata a Google.</span>
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {dati.sitemap.map((s) => (
            <li key={s.percorso} className="rounded-xl bg-crm-fondo px-3 py-2 text-[12px] leading-4">
              <p className="truncate text-[13px] font-[550] leading-5 text-crm-ink" title={s.percorso}>
                {s.percorso.replace(baseSito(dati.proprieta), "") || s.percorso}
              </p>
              <p className="mt-0.5 text-crm-tenue">
                {s.pagine ? `${num(s.pagine)} pagine, ` : ""}letta da Google il {dataOra(s.lettaDaGoogle)}
                {s.inAttesa && ", in attesa di lettura"}
              </p>
              {(s.errori > 0 || s.avvisi > 0) && (
                <p className="mt-0.5 font-[550] text-crm-rosso">
                  {s.errori > 0 && `${s.errori} errori`}
                  {s.errori > 0 && s.avvisi > 0 && ", "}
                  {s.avvisi > 0 && `${s.avvisi} avvisi`}: aprila in Search Console per i dettagli
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      <button type="button" className="crm-btn mt-3" onClick={invia} disabled={invio}>
        {invio ? "Invio…" : "Invia di nuovo la sitemap"}
      </button>
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
      <h3 className="text-[13px] font-[650] leading-5 text-crm-ink">Una pagina è su Google?</h3>
      <p className="text-[13px] leading-5 text-crm-tenue">
        Scrivi l&apos;indirizzo o solo la parte dopo il dominio, per esempio /koeln/ehrenfeld.
      </p>
      <input
        type="text"
        value={indirizzo}
        onChange={(e) => setIndirizzo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && controlla()}
        className="crm-campo mt-3"
        placeholder="/koeln/ehrenfeld"
        aria-label="Indirizzo della pagina"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" className="crm-btn-primario" onClick={controlla} disabled={!!lavoro || !indirizzo.trim()}>
          {lavoro === "controllo" ? "Controllo…" : "Controlla"}
        </button>
        <button type="button" className="crm-btn" onClick={chiedi} disabled={!!lavoro || !indirizzo.trim()}>
          {lavoro === "richiesta" ? "Invio…" : "Chiedi a Google di ripassare"}
        </button>
      </div>

      {risposta &&
        (risposta.error ? (
          <Esito ok={false}>Controllo non riuscito: {risposta.error}</Esito>
        ) : (
          <Esito ok={st?.verdict === "PASS"}>
            <span className="font-[650]">
              {st?.verdict === "PASS" ? "Sì, la pagina è su Google." : "No, la pagina non è ancora su Google."}
            </span>{" "}
            {st?.coverageState && <>Stato secondo Google: {st.coverageState}. </>}
            Ultima visita di Google: {dataOra(st?.lastCrawlTime)}.
            {risposta.inspectionResultLink && (
              <a
                href={risposta.inspectionResultLink}
                target="_blank"
                rel="noopener"
                className="ml-1 inline-flex items-center gap-0.5 font-[550] underline underline-offset-2"
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
      <h3 className="text-[13px] font-[650] leading-5 text-crm-ink">Far ripassare più pagine insieme</h3>
      <p className="text-[13px] leading-5 text-crm-tenue">
        Un indirizzo per riga. Google accetta circa 200 richieste al giorno, condivise con altri siti: usalo solo per
        pagine cambiate davvero, non per tutte le pagine di quartiere.
      </p>
      <textarea
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
        rows={6}
        className="crm-campo mt-3 resize-y font-mono sm:text-[12px]"
        aria-label="Indirizzi da far ripassare"
      />
      <div className="mt-2 flex items-center gap-3">
        <button type="button" className="crm-btn" onClick={invia} disabled={invio || righe.length === 0}>
          {invio ? "Invio…" : `Segnala ${righe.length} pagine`}
        </button>
      </div>
      {esito && <Esito ok={esito.ok}>{esito.testo}</Esito>}
    </div>
  );
}

export default function Strumenti({ dati, aperto = false }: { dati: DatiSeo; aperto?: boolean }) {
  const base = baseSito(dati.proprieta);
  return (
    <details open={aperto} className="crm-card group">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 transition-colors hover:bg-crm-fondo [&::-webkit-details-marker]:hidden">
        <span className="text-[13px] font-[650] text-crm-ink">Strumenti</span>
        <span className="hidden truncate text-[13px] text-crm-tenue sm:inline">
          sitemap, controllo di una pagina, richieste a Google di ripassare
        </span>
        <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-crm-spento transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid gap-6 border-t border-crm-filo p-4 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-crm-filo lg:p-0 lg:[&>*]:p-4">
        <Sitemap dati={dati} />
        <ControllaPagina base={base} />
        <PiuPagine base={base} />
      </div>
      <p className="break-words bg-crm-fondo px-4 py-3 text-[12px] leading-4 text-crm-tenue">
        Proprietà di Search Console: {dati.proprieta}
        <a
          href={`https://search.google.com/search-console?resource_id=${encodeURIComponent(dati.proprieta)}`}
          target="_blank"
          rel="noopener"
          className="ml-2 inline-flex items-center gap-0.5 font-[550] text-crm-testo hover:text-crm-ink hover:underline"
        >
          Apri Search Console <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </details>
  );
}
