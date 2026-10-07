"use client";

import { useId, useState } from "react";
import { Card, Badge, cx } from "./ui";
import { SIMBOLI, ROSSO, ROSSO_CHIARO, ROSSO_SCURO, type SimboloId } from "./marchio-simboli";
import { SCRITTE, SPAZIO, type ScrittaId, type NomeId } from "./marchio-scritte";

// Fase 1 della scaletta: simbolo AM e nome dell'azienda.
//
// Paletti dati da Calogero il 03/10/2026:
// - simbolo: quello di oggi, piu' curvo e piu' tech. Scelta la bozza Tech.
// - colore: si resta sul rosso.
// - nome: un nome d'azienda unico, stile FitElite (sua proposta). Bocciati
//   prima: descrizioni ("AM Personal Training"), giochi di parole con AM
//   ("AM ZIEL"), nomi inventati ("KRAFTARO"). Niente riga sotto al nome.

const NERO = "#121214";

type Nome = {
  id: NomeId;
  /** le due meta' del nome: la seconda va in rosso, cosi' si legge al volo */
  a: string;
  b: string;
  perche: string;
  limite: string;
  /** domini e ricerca web */
  controlli: string;
  /** registro marchi, da TMview (DPMA, EUIPO e uffici nazionali) */
  marchi: string;
  esito: "verde" | "giallo" | "rosso";
  etichetta?: string;
};

const NOMI: Nome[] = [
  {
    id: "fitprimo",
    a: "FIT",
    b: "PRIMO",
    perche:
      "La tua seconda proposta. Primo è italiano come Angelo e in tedesco si capisce lo stesso: ricorda prima, che vuol dire ottimo. Corto, da azienda.",
    limite: "Il dominio è libero, ma il marchio ha un vicino troppo vicino. Vedi sotto.",
    controlli:
      "fitprimo.de libero, confermato dal registro DENIC. Liberi anche .eu e .it. fitprimo.com e .net registrati.",
    marchi:
      "Rischio alto. FITPRIME è marchio europeo registrato dal 2020 (EUIPO 018204868, Checkmoov Srl) anche per servizi fitness, classe 41: vale in Germania, e FITPRIMO cambia solo l'ultima lettera. In più, il 30/07/2026 un'azienda giapponese ha depositato FitPrimo in Giappone per personal training.",
    esito: "rosso",
    etichetta: "Scelto da te, da rivedere",
  },
  {
    id: "fitelite",
    a: "FIT",
    b: "ELITE",
    perche:
      "La tua prima proposta. Due parole che capisce chiunque, in tedesco come in inglese, e dice subito il livello: non la palestra di massa.",
    limite:
      "Fit ed Elite sono parole comuni: come marchio si protegge poco. E il dominio .de va comprato da chi lo tiene in vendita.",
    controlli:
      "In Germania nessuna azienda trovata con questo nome. fitelite.de è in vendita su Sedo, fitelite.com è registrato. Liberi fit-elite.de e fitelite-koeln.de.",
    marchi:
      "Nessun marchio FITELITE in Germania né all'EUIPO. Esiste FITÉLITE in Italia (UIBM, classe 41), che vale solo in Italia. Gli altri sono in Cina, USA e Giappone, per abbigliamento e attrezzi. Quello americano per personal training è scaduto.",
    esito: "giallo",
    etichetta: "La tua prima idea",
  },
  {
    id: "fitelan",
    a: "FIT",
    b: "ELAN",
    perche: "Elan in tedesco è lo slancio, la carica. Suona quasi come FitElite.",
    limite: "Parla di energia, non di livello alto.",
    controlli: "fitelan.de e fitelan.com liberi.",
    marchi: "Nessun marchio FITELAN in nessun registro. Il più pulito dei tre.",
    esito: "verde",
  },
];

const nomeIntero = (n: Nome) => n.a + n.b;

/* --------------------------------------------------------------- simbolo */

function Simbolo({
  id,
  h,
  tinta = "rosso",
}: {
  id: SimboloId;
  h: number;
  tinta?: "rosso" | "bianco";
}) {
  const gid = useId();
  const s = SIMBOLI[id];
  return (
    <svg
      viewBox={`0 0 ${s.w} 100`}
      width={(h * s.w) / 100}
      height={h}
      className="shrink-0"
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={s.w} y2="100">
          <stop offset="0" stopColor={ROSSO_CHIARO} />
          <stop offset="1" stopColor={ROSSO_SCURO} />
        </linearGradient>
      </defs>
      <path d={s.d} fill={tinta === "bianco" ? "#fff" : `url(#${gid})`} />
    </svg>
  );
}

/** Tessera quadrata: favicon, profilo Google, social. */
function Tessera({ id, lato }: { id: SimboloId; lato: number }) {
  const s = SIMBOLI[id];
  return (
    <span
      className="flex shrink-0 items-center justify-center"
      style={{
        width: lato,
        height: lato,
        borderRadius: lato * 0.225,
        background: `linear-gradient(135deg, ${ROSSO_CHIARO}, ${ROSSO_SCURO})`,
      }}
    >
      <Simbolo id={id} h={(lato * 0.62 * 100) / s.w} tinta="bianco" />
    </span>
  );
}

/** Simbolo e nome su una riga sola, senza niente sotto. La scritta e' gia' in
 *  tracciati (marchio-scritte.ts): quello che si vede qui e' il logo vero,
 *  non un carattere del browser. */
function Logo({
  nome,
  scritta,
  simbolo,
  scuro,
  h = 46,
}: {
  nome: Nome;
  scritta: ScrittaId;
  simbolo: SimboloId;
  scuro?: boolean;
  h?: number;
}) {
  const gid = useId();
  const s = SIMBOLI[simbolo];
  const t = SCRITTE[scritta][nome.id];
  const x0 = s.w + SPAZIO;
  const W = x0 + t.w;
  return (
    <svg
      viewBox={`0 0 ${W} 100`}
      width={(h * W) / 100}
      height={h}
      className="shrink-0"
      role="img"
      aria-label={nomeIntero(nome)}
    >
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={s.w} y2="100">
          <stop offset="0" stopColor={ROSSO_CHIARO} />
          <stop offset="1" stopColor={ROSSO_SCURO} />
        </linearGradient>
      </defs>
      <path d={s.d} fill={`url(#${gid})`} />
      <g transform={`translate(${x0} 0)`} fillRule="evenodd">
        <path d={t.a} fill={scuro ? "#fff" : NERO} />
        <path d={t.b} fill={scuro ? ROSSO_CHIARO : ROSSO} />
      </g>
    </svg>
  );
}

const STILI: { id: ScrittaId; nome: string; testo: string; etichetta?: string }[] = [
  {
    id: "kanitTondoSospesaBold",
    nome: "Tondo sospeso, Kanit Bold",
    testo:
      "Angoli arrotondati, barretta della F staccata dall'asta, gamba della R staccata dall'occhiello. Scelta da te il 03/10: \"questo è perfetto\".",
    etichetta: "Scelta",
  },
  {
    id: "kanitTondoSospesaExtra",
    nome: "Un passo più grassa",
    testo: "La stessa in Kanit ExtraBold, per confronto.",
  },
  {
    id: "kanitTondoSospesa",
    nome: "Due passi più grassa",
    testo: "La stessa in Kanit Black, per confronto.",
  },
];

const MOVIMENTI: { id: SimboloId; nome: string; testo: string; etichetta?: string }[] = [
  {
    id: "techDodici",
    nome: "Più pendenza",
    testo:
      "Il simbolo pende di 12 gradi invece di 9, cioè esattamente come la scritta: le linee diventano parallele e tutto il logo corre nella stessa direzione.",
    etichetta: "Scelta",
  },
  {
    id: "techScia",
    nome: "Scia",
    testo:
      "Stessa pendenza, più tre lineette sfalsate a sinistra della A: la scia di chi parte. Il movimento si vede subito.",
  },
  {
    id: "techTraversa",
    nome: "Scia bassa",
    testo:
      "Due lineette all'altezza della barretta sospesa, come se uscisse dalla gamba. Più discreta della Scia.",
  },
  {
    id: "techQuindici",
    nome: "Molta pendenza",
    testo: "Il simbolo pende di 15 gradi, più della scritta. Più slancio, meno ordine.",
  },
  {
    id: "tech",
    nome: "Com'era",
    testo: "Il simbolo scelto il 03/10, a 9 gradi. Per confronto.",
  },
];

/** In piccolo la scia sporca: tessera e favicon usano il simbolo senza lineette. */
const senzaScia = (id: SimboloId): SimboloId =>
  id === "techScia" || id === "techTraversa" ? "techDodici" : id;

/* ------------------------------------------------------------------ vista */

export default function MarchioView() {
  const [nomeId, setNomeId] = useState<NomeId>(NOMI[0].id);
  const [scrittaId, setScrittaId] = useState<ScrittaId>(STILI[0].id);
  const [simboloId, setSimboloId] = useState<SimboloId>(MOVIMENTI[0].id);
  const nome = NOMI.find((n) => n.id === nomeId) || NOMI[0];
  const intero = nomeIntero(nome);

  return (
    <div className="space-y-4">
      <Card
        title="Il logo"
        subtitle={"Simbolo e scritta in tracciati, con il nome " + intero}
        action={<Badge tone="green">Simbolo scelto</Badge>}
      >
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
          <div className="flex min-h-[150px] items-center justify-center overflow-x-auto border border-black/10 bg-white px-6 py-8">
            <Logo nome={nome} scritta={scrittaId} simbolo={simboloId} />
          </div>
          <div
            className="flex min-h-[150px] items-center justify-center overflow-x-auto px-6 py-8"
            style={{ background: NERO }}
          >
            <Logo nome={nome} scritta={scrittaId} simbolo={simboloId} scuro />
          </div>
          <div className="flex min-h-[150px] items-center justify-center gap-4 border border-black/10 bg-[#f4f4f5] px-6 py-4">
            <Tessera id={senzaScia(simboloId)} lato={88} />
            <Tessera id={senzaScia(simboloId)} lato={32} />
            <Simbolo id={senzaScia(simboloId)} h={18} />
          </div>
        </div>
      </Card>

      <Card
        title="Il simbolo: più movimento"
        subtitle="Scelta il 03/10: Più pendenza. Le altre restano qui per confronto"
        bodyClassName=""
      >
        <div className="grid gap-px bg-black/[0.07] sm:grid-cols-2 xl:grid-cols-3">
          {MOVIMENTI.map((mv) => {
            const on = mv.id === simboloId;
            return (
              <button
                key={mv.id}
                onClick={() => setSimboloId(mv.id)}
                className={cx(
                  "relative flex flex-col justify-start px-4 py-4 text-left transition-colors sm:px-5",
                  on ? "bg-red-50" : "bg-white hover:bg-neutral-50"
                )}
              >
                <span className={cx("absolute inset-y-0 left-0 w-1", on ? "bg-gold" : "bg-transparent")} />
                <span className="flex items-center gap-2">
                  <span className="text-sm font-bold text-neutral-900">{mv.nome}</span>
                  {mv.etichetta && <Badge tone="brand">{mv.etichetta}</Badge>}
                </span>
                <span className="mt-3 block overflow-x-auto">
                  <Logo nome={nome} scritta={scrittaId} simbolo={mv.id} h={34} />
                </span>
                <span className="mt-3 block text-xs leading-relaxed text-neutral-600">{mv.testo}</span>
              </button>
            );
          })}
          <div className="hidden bg-white sm:block" />
        </div>
        <p className="border-t border-black/[0.07] px-4 py-3 text-xs leading-relaxed text-neutral-500 sm:px-5">
          <span className="font-bold text-neutral-700">In piccolo: </span>
          nella tessera e nel favicon la scia non c&apos;è. A 32 pixel tre lineette diventano una
          macchia, quindi lì resta il simbolo pulito.
        </p>
      </Card>

      <Card
        title="La scritta"
        subtitle="Kanit ritoccato: angoli tondi e tagli sospesi. Scelta la versione in Kanit Bold"
        bodyClassName=""
      >
        <div className="grid gap-px bg-black/[0.07] sm:grid-cols-2">
          {STILI.map((st) => {
            const on = st.id === scrittaId;
            return (
              <button
                key={st.id}
                onClick={() => setScrittaId(st.id)}
                className={cx(
                  "relative flex flex-col justify-start px-4 py-4 text-left transition-colors sm:px-5",
                  on ? "bg-red-50" : "bg-white hover:bg-neutral-50"
                )}
              >
                <span className={cx("absolute inset-y-0 left-0 w-1", on ? "bg-gold" : "bg-transparent")} />
                <span className="flex items-center gap-2">
                  <span className="text-sm font-bold text-neutral-900">{st.nome}</span>
                  {st.etichetta && <Badge tone="brand">{st.etichetta}</Badge>}
                </span>
                <span className="mt-3 block overflow-x-auto">
                  <Logo nome={nome} scritta={st.id} simbolo={simboloId} h={34} />
                </span>
                <span className="mt-3 block text-xs leading-relaxed text-neutral-600">{st.testo}</span>
              </button>
            );
          })}
          <div className="hidden bg-white sm:block" />
        </div>
      </Card>

      <Card
        title="Il nome dell'azienda"
        subtitle="FITPRIMO scelto il 03/10, ma il controllo marchi ha trovato un ostacolo. Clic su un nome e il logo cambia scritta"
        bodyClassName=""
      >
        <div className="grid gap-px bg-black/[0.07] sm:grid-cols-2">
          {NOMI.map((n) => {
            const on = n.id === nomeId;
            return (
              <button
                key={n.id}
                onClick={() => setNomeId(n.id)}
                className={cx(
                  "relative flex flex-col justify-start px-4 py-4 text-left transition-colors sm:px-5",
                  on ? "bg-red-50" : "bg-white hover:bg-neutral-50"
                )}
              >
                <span className={cx("absolute inset-y-0 left-0 w-1", on ? "bg-gold" : "bg-transparent")} />
                <span className="flex items-center gap-2">
                  <span className="text-base font-black tracking-tight text-neutral-900">
                    {nomeIntero(n)}
                  </span>
                  {n.etichetta && <Badge tone="brand">{n.etichetta}</Badge>}
                </span>
                <span className="mt-2 block text-xs leading-relaxed text-neutral-600">{n.perche}</span>
                <span className="mt-1.5 block text-xs leading-relaxed text-neutral-400">
                  Limite: {n.limite}
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-neutral-500">
                  <span className="font-bold">Domini: </span>
                  {n.controlli}
                </span>
                <span
                  className={cx(
                    "mt-1.5 block text-xs leading-relaxed",
                    n.esito === "verde" ? "text-green-700" : n.esito === "rosso" ? "text-red-700" : "text-amber-700"
                  )}
                >
                  <span className="font-bold">Marchi: </span>
                  {n.marchi}
                </span>
              </button>
            );
          })}
          <div className="hidden bg-white sm:block" />
        </div>
        <div className="space-y-1.5 border-t border-black/[0.07] px-4 py-3 text-xs leading-relaxed text-neutral-500 sm:px-5">
          <p>
            <span className="font-bold text-neutral-700">Come leggere i controlli: </span>
            marchi cercati il 03/10/2026 su TMview, che riunisce DPMA, EUIPO e gli uffici nazionali.
            Verde: niente di simile. Giallo: qualcosa di vicino, da valutare. Rosso: un marchio
            quasi uguale, valido in Germania, per gli stessi servizi. TMview non è un registro
            ufficiale e il giudizio di somiglianza è mio: prima di stampare serve il parere di un
            avvocato di marchi.
          </p>
          <p>
            <span className="font-bold text-neutral-700">E la SEO: </span>
            la ricerca Personal Training Köln la portano le pagine, i titoli e la categoria su
            Google, non il nome. Per esteso, su Google e nell&apos;Impressum, si scrive {intero}{" "}
            Personal Training.
          </p>
          <p>
            <span className="font-bold text-neutral-700">Dominio: </span>
            il sito resta su angelocoach.com, che ha oltre mille pagine già su Google. Il dominio
            del nome nuovo si compra per proteggerlo e si fa puntare lì.
          </p>
        </div>
      </Card>

      <Card title="Cosa abbiamo già scartato">
        <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-neutral-600">
          <li>Lettere a blocchi viola e blu sullo stile Trainex: troppo diverse dal simbolo di oggi.</li>
          <li>AM Personal Training e simili: sono descrizioni, non il nome di un&apos;azienda.</li>
          <li>
            AM ZIEL, AM WERK, AM LIMIT: il gioco di parole con le iniziali suona da slogan. AM PULS
            esiste già a Paderborn e Bielefeld.
          </li>
          <li>La riga Personal Training Köln sotto al nome: tolta dal logo.</li>
          <li>KRAFTARO, GRINTARO, MAGLIORO: nomi inventati, non piaciuti.</li>
          <li>EliteFit, FitPrime, PrimeFit, FitPeak, EliteCore: stesso stile, ma .de e .com già presi.</li>
          <li>FormElite, FitVantage, FitPrestige: più deboli, tolti dalla lista.</li>
          <li>FitPrimus: comincia come FITPRIME, stesso problema di FITPRIMO.</li>
          <li>La scritta in Archivo e quelle disegnate a mano (Misura, Manubrio): scelto il Kanit.</li>
        </ul>
      </Card>
    </div>
  );
}
