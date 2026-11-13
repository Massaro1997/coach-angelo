"use client";

// /app/profil: dettaglio aperto dal tondo in testata (AppShell, "‹" torna
// alla sezione di prima). Chi sei e da quando, l'obiettivo che ha scritto il
// coach, email e telefono (si cambiano in un foglio, PATCH /api/app/io), la
// lingua dell'app, il pacchetto in breve con il link allo Shop, l'app sul
// telefono, le guide e la chat col coach, Datenschutz e Impressum, uscire
// (con conferma: senza codice non si rientra). Nome e obiettivo li cambia il
// coach, non il cliente.
//
// Grafica dal 13/11: icone 3D del marchio sulle righe che portano da qualche
// parte (pacchetto, app, guide, coach). Email e telefono restano senza icona:
// sono dati da correggere, nel catalogo non c'e' una busta, e la stessa icona
// del telefono su due righe confonderebbe.

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { IoLogOutOutline, IoOpenOutline } from "react-icons/io5";
import type { Lingua } from "@/lib/app-coaching/tipi";
import type { ProfiloCompleto, RiassuntoAbbonamento } from "@/lib/app-coaching/tipi-v2";
import { oggiISO } from "@/lib/app-coaching/date";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { aggiornaProfilo, cambiaLingua, esci, useArchivio } from "./archivio";
import { useStandalone } from "./dispositivo";
import { formatta, formattaIstante, primoNome, useTesti } from "./comuni";
import { Icona3D, Lista, Pillola, Riga, Scheda, Segmenti, Sezione, Tasto, euro, useLingua } from "./kit";
import { segnaAvanti } from "./navigazione";
import AppShell from "./shell/AppShell";
import Foglio from "./Foglio";
import { FoglioInstalla } from "./Installa";

type Campo = "email" | "telefono";

// stringhe nuove di questa schermata (testi.ts lo toccano altri in parallelo)
const TXT = {
  de: {
    appAiuto: "App und Hilfe",
    guide: "Guides",
    guideSotto: "Training, Ernährung, Erholung",
    scriviCoach: "Im Chat schreiben",
  },
  it: {
    appAiuto: "App e aiuto",
    guide: "Guide",
    guideSotto: "Allenamento, alimentazione, recupero",
    scriviCoach: "Scrivi in chat",
  },
};

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RE_TELEFONO = /^\+?[\d\s/().-]{6,}$/;

/** Email o telefono, in un foglio: il campo resta sopra la tastiera (Guscio). */
function FoglioCampo({ campo, valore, onChiudi }: { campo: Campo; valore: string | null; onChiudi: () => void }) {
  const t = useTesti();
  const [testo, setTesto] = useState(valore ?? "");
  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  const email = campo === "email";
  const titolo = email ? t.email : t.telefono;

  async function salva(e: FormEvent) {
    e.preventDefault();
    if (invio) return;
    const pulito = testo.trim();
    if (pulito && !(email ? RE_EMAIL : RE_TELEFONO).test(pulito)) {
      setErrore(email ? t.emailNonValida : t.telefonoNonValido);
      return;
    }
    setInvio(true);
    setErrore(null);
    // vuoto = toglierlo
    const esito = await aggiornaProfilo(email ? { email: pulito || null } : { telefono: pulito || null });
    setInvio(false);
    if (esito.ok) onChiudi();
    else setErrore(esito.errore ?? t.erroreGenerico);
  }

  return (
    <Foglio titolo={titolo} onChiudi={onChiudi}>
      <form onSubmit={salva} noValidate>
        <label htmlFor={`campo-${campo}`} className="sr-only">
          {titolo}
        </label>
        <input
          id={`campo-${campo}`}
          type={email ? "email" : "tel"}
          inputMode={email ? "email" : "tel"}
          autoComplete={email ? "email" : "tel"}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="done"
          maxLength={email ? 200 : 40}
          value={testo}
          onChange={(e) => {
            setTesto(e.target.value);
            setErrore(null);
          }}
          aria-invalid={errore ? true : undefined}
          aria-describedby={errore ? `errore-${campo}` : undefined}
          // 17 px: sotto i 16 Safari ingrandisce la pagina al tocco
          className="h-14 w-full rounded-2xl bg-white px-4 text-[17px] text-neutral-900 outline-none ring-1 ring-black/10 transition-shadow focus:ring-2 focus:ring-neutral-900"
        />
        <div className="min-h-7 pt-1.5" aria-live="polite">
          {errore && (
            <p id={`errore-${campo}`} role="alert" className="text-[15px] text-[#7f1d1d]">
              {errore}
            </p>
          )}
        </div>
        <Tasto type="submit" pieno disabled={invio || testo.trim() === (valore ?? "").trim()}>
          {invio ? t.salvando : t.salva}
        </Tasto>
      </form>
    </Foglio>
  );
}

/** Il pacchetto in una riga o due; i dettagli e le rate stanno nello Shop. */
function Pacchetto({ ab }: { ab: RiassuntoAbbonamento | null | undefined }) {
  const t = useTesti();
  if (!ab) {
    return (
      <Lista>
        <Riga icona3d="borsa" titolo={t.nessunContratto} destra={t.vaiAlloShop} href="/app/shop" />
      </Lista>
    );
  }
  const giorno = (iso: string) => formatta(oggiISO(new Date(iso)), t, { day: "numeric", month: "long", year: "numeric" });
  const durata = ab.aTempoIndeterminato ? t.senzaScadenza : ab.fine ? t.finoAl(giorno(ab.fine)) : null;
  const prezzo = ab.periodicita === "mensile" && ab.importoMese != null ? t.alMese(euro(ab.importoMese)) : null;
  const rata = ab.prossimaRata;
  const tono = ab.stato === "attivo" ? "ok" : ab.stato === "concluso" ? "neutro" : "attesa";
  return (
    <Lista>
      <Riga
        icona3d="contratto"
        titolo={ab.titolo}
        sotto={[prezzo, durata].filter(Boolean).join(" · ") || ab.numero}
        destra={<Pillola tono={tono}>{t.statoAbbonamento[ab.stato]}</Pillola>}
        href="/app/shop"
      />
      {rata && rata.stato !== "pagato" && rata.stato !== "annullato" && rata.scadenza && (
        <Riga
          icona3d="carta"
          titolo={t.prossimaRata(euro(rata.importo), formattaIstante(rata.scadenza, t, { day: "numeric", month: "long" }))}
          href="/app/shop"
        />
      )}
    </Lista>
  );
}

/**
 * Testata al centro, come la pagina dell'account di un telefono: l'iniziale
 * grande (lo stesso tondo nero della testata dell'app, in grande), il nome e
 * da quando. Senza nome (non dovrebbe succedere) l'icona 3D del profilo.
 */
function Intestazione({ profilo }: { profilo: ProfiloCompleto }) {
  const t = useTesti();
  const iniziale = primoNome(profilo.nome).charAt(0).toUpperCase();
  const dal = profilo.clienteDal ? formattaIstante(profilo.clienteDal, t, { month: "long", year: "numeric" }) : "";
  return (
    <Scheda className="flex flex-col items-center px-5 pb-6 pt-7 text-center">
      {iniziale ? (
        <span
          aria-hidden
          className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-neutral-900 text-[38px] font-bold text-white"
        >
          {iniziale}
        </span>
      ) : (
        <Icona3D nome="profilo" dimensione={88} />
      )}
      <p className="mt-4 max-w-full break-words text-[22px] font-bold leading-tight">{profilo.nome}</p>
      {dal && <p className="mt-1 text-[15px] text-neutral-500">{t.clienteDal(dal)}</p>}
    </Scheda>
  );
}

/** Pagine del sito (Datenschutz, Impressum): fuori dall'app, in una scheda a parte. */
function RigaEsterna({ href, titolo }: { href: string; titolo: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="flex min-h-[56px] items-center gap-3 px-4 py-2.5 transition-colors active:bg-neutral-50"
    >
      <span className="min-w-0 flex-1 truncate text-[15px] font-semibold">{titolo}</span>
      {/* freccia in diagonale: si esce dall'app, l'app resta dov'era */}
      <IoOpenOutline className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
    </a>
  );
}

export default function Profilo() {
  const t = useTesti();
  const a = useArchivio();
  const router = useRouter();
  const standalone = useStandalone();
  const tx = TXT[useLingua()];
  const [campo, setCampo] = useState<Campo | null>(null);
  const [istruzioni, setIstruzioni] = useState(false);
  const [conferma, setConferma] = useState(false);
  const [uscita, setUscita] = useState(false);
  const [erroreLingua, setErroreLingua] = useState(false);

  // dopo Sessione il profilo c'e' sempre
  if (a.profilo.tipo !== "ok") return null;
  const p = a.profilo.profilo;
  const obiettivo = p.obiettivo?.trim();
  const abbonamento = a.home.tipo === "ok" ? a.home.dati.abbonamento : undefined;

  async function lingua(l: Lingua) {
    setErroreLingua(false);
    if (!(await cambiaLingua(l))) setErroreLingua(true);
  }

  async function confermaUscita() {
    setUscita(true);
    await esci();
    // rientrando si parte dalla home, non dal profilo di prima
    router.replace("/app");
  }

  return (
    <AppShell tab="profil" indietro="/app" titolo={t.titoloProfil}>
      <div className="pt-2">
        <Intestazione profilo={p} />
      </div>

      {obiettivo && (
        <Sezione titolo={t.obiettivoTitolo}>
          <Scheda>
            <div className="flex items-start gap-3">
              <Icona3D nome="bersaglio" dimensione={44} />
              <p className="min-w-0 flex-1 self-center whitespace-pre-line break-words text-[16px] leading-relaxed">
                {obiettivo}
              </p>
            </div>
          </Scheda>
        </Sezione>
      )}

      <Sezione titolo={t.contatti}>
        <Lista>
          <Riga
            titolo={t.email}
            sotto={p.email || t.nonIndicato}
            onClick={() => setCampo("email")}
          />
          <Riga
            titolo={t.telefono}
            sotto={p.telefono || t.nonIndicato}
            onClick={() => setCampo("telefono")}
          />
        </Lista>
      </Sezione>

      <Sezione titolo={t.lingua}>
        <Segmenti<Lingua>
          etichetta={t.lingua}
          attiva={p.lingua}
          onCambia={(l) => void lingua(l)}
          voci={[
            // ognuna nella sua lingua: chi non capisce l'altra trova la sua
            { id: "de", etichetta: "Deutsch" },
            { id: "it", etichetta: "Italiano" },
          ]}
        />
        {erroreLingua && (
          <p role="alert" className="mt-2 px-1 text-[15px] text-[#7f1d1d]">
            {t.erroreLingua}
          </p>
        )}
      </Sezione>

      {/* finche' la home non e' arrivata niente riga: meglio che un "nessun pacchetto" sbagliato */}
      {abbonamento !== undefined && (
        <Sezione titolo={t.contratto}>
          <Pacchetto ab={abbonamento} />
        </Sezione>
      )}

      <Sezione titolo={tx.appAiuto}>
        <Lista>
          {standalone ? (
            <Riga icona3d="telefono" titolo={t.appInstallata} />
          ) : (
            <Riga icona3d="telefono" titolo={t.installaTitolo} onClick={() => setIstruzioni(true)} />
          )}
          <Riga icona3d="libro" titolo={tx.guide} sotto={tx.guideSotto} href="/app/guide" onClick={segnaAvanti} />
          {/* il Coach e' una sezione della barra: niente passo avanti */}
          <Riga icona3d="chat" titolo={t.domanda(MARCHIO.coach)} sotto={tx.scriviCoach} href="/app/coach" />
        </Lista>
      </Sezione>

      <Sezione titolo={t.legale}>
        <Lista>
          <RigaEsterna href="/privacy" titolo={t.privacy} />
          <RigaEsterna href="/impressum" titolo={t.impressum} />
        </Lista>
      </Sezione>

      <div className="mt-8">
        <Tasto variante="secondario" pieno icona={<IoLogOutOutline aria-hidden />} onClick={() => setConferma(true)}>
          {t.esci}
        </Tasto>
      </div>

      {campo && (
        <FoglioCampo
          key={campo}
          campo={campo}
          valore={campo === "email" ? p.email : p.telefono}
          onChiudi={() => setCampo(null)}
        />
      )}

      {istruzioni && <FoglioInstalla onChiudi={() => setIstruzioni(false)} />}

      {conferma && (
        <Foglio titolo={t.esciConferma} onChiudi={() => setConferma(false)}>
          <p className="text-[16px] leading-snug text-neutral-600">{t.esciTesto}</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Tasto variante="secondario" onClick={() => setConferma(false)}>
              {t.annulla}
            </Tasto>
            <Tasto onClick={() => void confermaUscita()} disabled={uscita}>
              {t.esciSi}
            </Tasto>
          </div>
        </Foglio>
      )}
    </AppShell>
  );
}
