"use client";

import { useId, useState } from "react";
import { Kanit } from "next/font/google";
import { Card, Badge } from "./ui";
import { SIMBOLI, ROSSO, ROSSO_CHIARO, ROSSO_SCURO } from "./marchio-simboli";
import { SCRITTE, SPAZIO } from "./marchio-scritte";

// Brand sheet (fase 2 della scaletta): il marchio scelto il 03/10/2026 su una
// pagina sola. Logo, colori, caratteri, regole e il marchio in uso.
// I file veri stanno in brand/logo/fitprimo, le foto d'esempio in
// public/brand/fitprimo (generate da scripts/genera-mockup-brand.mjs).

const kanit = Kanit({ weight: ["700"], style: ["italic"], subsets: ["latin"], display: "swap" });

const NERO = "#121214";
const GRIGIO = "#f4f4f5";
const S = SIMBOLI.techDodici;
const T = SCRITTE.kanitTondoSospesaBold.fitprimo;

type Variante = "colore" | "scuro" | "bianco" | "nero";

function Logo({ v, h }: { v: Variante; h: number }) {
  const gid = useId();
  const x0 = S.w + SPAZIO;
  const W = x0 + T.w;
  const simbolo = v === "bianco" ? "#fff" : v === "nero" ? NERO : `url(#${gid})`;
  const a = v === "colore" || v === "nero" ? NERO : "#fff";
  const b = v === "colore" ? ROSSO : v === "scuro" ? ROSSO_CHIARO : v === "bianco" ? "#fff" : NERO;
  return (
    <svg viewBox={`0 0 ${W} 100`} width={(h * W) / 100} height={h} role="img" aria-label="FITPRIMO">
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={S.w} y2="100">
          <stop offset="0" stopColor={ROSSO_CHIARO} />
          <stop offset="1" stopColor={ROSSO_SCURO} />
        </linearGradient>
      </defs>
      <path d={S.d} fill={simbolo} />
      <g transform={`translate(${x0} 0)`} fillRule="evenodd">
        <path d={T.a} fill={a} />
        <path d={T.b} fill={b} />
      </g>
    </svg>
  );
}

function Simbolo({ h, bianco }: { h: number; bianco?: boolean }) {
  const gid = useId();
  return (
    <svg viewBox={`0 0 ${S.w} 100`} width={(h * S.w) / 100} height={h} aria-hidden>
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={S.w} y2="100">
          <stop offset="0" stopColor={ROSSO_CHIARO} />
          <stop offset="1" stopColor={ROSSO_SCURO} />
        </linearGradient>
      </defs>
      <path d={S.d} fill={bianco ? "#fff" : `url(#${gid})`} />
    </svg>
  );
}

function Tessera({ lato }: { lato: number }) {
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
      <Simbolo h={(lato * 0.62 * 100) / S.w} bianco />
    </span>
  );
}

const VERSIONI: { v: Variante; fondo: string; nome: string; uso: string; chiaro?: boolean }[] = [
  { v: "colore", fondo: "#ffffff", nome: "Colore", uso: "La versione principale. Su bianco e su fondi chiari.", chiaro: true },
  { v: "scuro", fondo: NERO, nome: "Su scuro", uso: "Sito, palestra, abbigliamento nero." },
  { v: "bianco", fondo: ROSSO, nome: "Bianco", uso: "Su rosso e sopra le foto." },
  { v: "nero", fondo: GRIGIO, nome: "Nero", uso: "Stampa a un colore, timbri, fatture.", chiaro: true },
];

const COLORI: { nome: string; hex: string; uso: string; chiaro?: boolean }[] = [
  { nome: "Rosso", hex: ROSSO, uso: "Il colore del marchio: bottoni, titoli in evidenza, la seconda metà del nome." },
  { nome: "Rosso chiaro", hex: ROSSO_CHIARO, uso: "Inizio della sfumatura del simbolo. Il rosso sui fondi scuri." },
  { nome: "Rosso scuro", hex: ROSSO_SCURO, uso: "Fine della sfumatura. Bottoni premuti." },
  { nome: "Nero", hex: NERO, uso: "Fondi scuri e testi. Mai il nero puro." },
  { nome: "Grigio chiaro", hex: GRIGIO, uso: "Fondi di sezione, schede.", chiaro: true },
  { nome: "Bianco", hex: "#ffffff", uso: "Fondo principale e testi sullo scuro.", chiaro: true },
];

const FOTO: { file: string; titolo: string; testo: string; largo?: boolean }[] = [
  { file: "maglietta", titolo: "Maglietta dei trainer", testo: "Logo su scuro, grande sulla schiena." },
  { file: "borraccia", titolo: "Borraccia", testo: "Logo su scuro, in verticale leggibile." },
  { file: "parete", titolo: "Parete in palestra", testo: "Insegna a rilievo retroilluminata.", largo: true },
  { file: "insegna", titolo: "Insegna esterna", testo: "Pannello nero, simbolo rosso.", largo: true },
  { file: "reception", titolo: "Reception", testo: "Versione a colori su bianco.", largo: true },
  { file: "bigliettini", titolo: "Bigliettini da visita", testo: "Fronte bianco con il logo, retro rosso.", largo: true },
];

function Foto({ f }: { f: (typeof FOTO)[number] }) {
  const [manca, setManca] = useState(false);
  if (manca) return null;
  return (
    <figure className={f.largo ? "sm:col-span-2" : ""}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/brand/fitprimo/${f.file}.jpg`}
        alt={f.titolo}
        loading="lazy"
        onError={() => setManca(true)}
        className="block w-full border border-black/10 bg-neutral-200"
      />
      <figcaption className="mt-1.5 text-xs leading-relaxed text-neutral-500">
        <span className="font-bold text-neutral-800">{f.titolo}. </span>
        {f.testo}
      </figcaption>
    </figure>
  );
}

export default function BrandSheetView() {
  return (
    <div className="space-y-4">
      <Card
        title="FITPRIMO, brand sheet"
        subtitle="Il marchio scelto il 03/10/2026, su una pagina sola"
        action={<Badge tone="amber">Nome da confermare</Badge>}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {VERSIONI.map((x) => (
            <div key={x.v}>
              <div
                className={
                  "flex min-h-[132px] items-center justify-center overflow-x-auto px-6 py-8" +
                  (x.chiaro ? " border border-black/10" : "")
                }
                style={{ background: x.fondo }}
              >
                <Logo v={x.v} h={44} />
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                <span className="font-bold text-neutral-800">{x.nome}. </span>
                {x.uso}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-black/[0.07] pt-4">
          <Simbolo h={64} />
          <Tessera lato={72} />
          <Tessera lato={32} />
          <p className="min-w-[220px] flex-1 text-xs leading-relaxed text-neutral-500">
            <span className="font-bold text-neutral-800">Simbolo e tessera. </span>
            Il simbolo AM da solo dove il nome non ci sta. La tessera è l&apos;icona: favicon,
            profilo Google, social. Sotto i 24 pixel di altezza si usa sempre la tessera, non il
            logo intero.
          </p>
        </div>
      </Card>

      <Card title="Colori" subtitle="Rosso, nero, bianco. Nient'altro">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {COLORI.map((c) => (
            <div key={c.hex}>
              <div
                className={"h-20" + (c.chiaro ? " border border-black/10" : "")}
                style={{ background: c.hex }}
              />
              <p className="mt-1.5 text-xs font-bold text-neutral-900">{c.nome}</p>
              <p className="font-mono text-[11px] uppercase text-neutral-500">{c.hex}</p>
              <p className="mt-1 text-[11px] leading-snug text-neutral-500">{c.uso}</p>
            </div>
          ))}
        </div>
        <div
          className="mt-4 h-10"
          style={{ background: `linear-gradient(135deg, ${ROSSO_CHIARO}, ${ROSSO_SCURO})` }}
        />
        <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
          <span className="font-bold text-neutral-800">La sfumatura. </span>
          Dal rosso chiaro al rosso scuro, in diagonale. Solo sul simbolo e sulla tessera, mai sui
          testi.
        </p>
      </Card>

      <Card title="Caratteri" subtitle="Uno per farsi sentire, uno per farsi leggere">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Titoli: Kanit Bold Italic
            </p>
            <p
              className={kanit.className + " mt-2 text-4xl uppercase leading-none"}
              style={{ color: NERO }}
            >
              Stärker <span style={{ color: ROSSO }}>werden</span>
            </p>
            <p className={kanit.className + " mt-2 text-lg uppercase"} style={{ color: NERO }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
            </p>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              Lo stesso carattere della scritta del logo. Maiuscolo, corsivo, per titoli corti. Nel
              logo ha in più gli angoli tondi e i tagli sospesi: quelli restano solo del logo.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Testi: Archivo
            </p>
            <p className="mt-2 text-lg font-semibold leading-snug text-neutral-900">
              Personal Training in Köln, mit einem Plan, der zu dir passt.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Il carattere che il sito usa già. Per paragrafi, menu, moduli e numeri. Regolare per
              leggere, semigrassetto per sottolineare.
            </p>
          </div>
        </div>
      </Card>

      <Card title="Regole d'uso">
        <div className="grid gap-4 text-xs leading-relaxed text-neutral-600 sm:grid-cols-2">
          <div>
            <p className="mb-1 font-bold text-neutral-900">Sì</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Attorno al logo, uno spazio libero largo quanto la A del simbolo.</li>
              <li>Su foto: solo la versione bianca, e sopra una zona scura e tranquilla.</li>
              <li>Simbolo sempre a sinistra del nome, alla distanza dei file.</li>
              <li>Sui capi neri la versione su scuro, sui capi bianchi quella a colori.</li>
            </ul>
          </div>
          <div>
            <p className="mb-1 font-bold text-neutral-900">No</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Cambiare i colori, o mettere la sfumatura sulla scritta.</li>
              <li>Allungare, schiacciare o raddrizzare il logo.</li>
              <li>Riscrivere il nome con un altro carattere.</li>
              <li>Aggiungere righe sotto al nome dentro il logo.</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card
        title="Il marchio in uso"
        subtitle="Foto d'esempio generate con il logo vero come riferimento"
        action={<Badge tone="outline">Esempi</Badge>}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {FOTO.map((f) => (
            <Foto key={f.file} f={f} />
          ))}
        </div>
        <p className="mt-4 border-l-2 border-amber-500 pl-2 text-xs leading-relaxed text-neutral-700">
          <span className="font-bold">Attenzione: </span>
          sono esempi per vedere come sta il marchio, non foto vere. Non vanno sul sito né su Google
          come foto dello studio: un&apos;insegna o una reception che non esistono sarebbero
          pubblicità ingannevole. Per stampare maglie, insegne e bigliettini si usano i file del
          logo, non queste immagini.
        </p>
      </Card>

      <Card title="I file">
        <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-neutral-600">
          <li>
            <span className="font-mono">brand/logo/fitprimo</span>: logo a colori, su scuro, bianco,
            nero e rosso; simbolo da solo; tessera; icone da 32, 180 e 192 pixel. Ognuno in SVG
            (per la stampa) e in PNG.
          </li>
          <li>
            <span className="font-mono">brand/mockup/fitprimo</span>: le foto d&apos;esempio in
            alta risoluzione.
          </li>
          <li>Cambiare nome è un comando solo: scritta e simbolo restano gli stessi.</li>
        </ul>
      </Card>
    </div>
  );
}
