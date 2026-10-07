"use client";

import { useEffect, useState } from "react";
import { Copy, Download, Maximize2, X } from "lucide-react";
import {
  BIGLIETTO,
  BROCHURE,
  COLORI,
  LOGHI,
  OGGETTI,
  type FileScaricabile,
  type Lingua,
  type LogoMerch,
} from "@/lib/merchandising";
import { Card, cx } from "./ui";

// Merchandising (fase 3 della scaletta): la brochure a tre ante e il
// biglietto da visita, piu' i file di partenza per magliette e il resto.
// Stessa impostazione della sezione Merchandising dell'admin DirezioneX:
// l'elenco vive in lib/merchandising.ts, i file in public/brand, i sorgenti
// in brand/stampa. Nessun database dietro.

type Zoom = { titolo: string; src: string };

const FONDO_LOGO: Record<LogoMerch["fondo"], string> = {
  chiaro: "bg-white",
  scuro: "bg-[#121214]",
  rosso: "bg-[#e30613]",
};

export default function MerchandisingView() {
  const [lingua, setLingua] = useState<Lingua>("de");
  const [zoom, setZoom] = useState<Zoom | null>(null);
  const [copiato, setCopiato] = useState("");

  useEffect(() => {
    if (!zoom) return;
    const chiudi = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", chiudi);
    return () => window.removeEventListener("keydown", chiudi);
  }, [zoom]);

  const copiaColore = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiato(hex);
    setTimeout(() => setCopiato(""), 1500);
  };

  const lingue = (
    <div className="inline-flex border border-black/15 bg-white p-0.5">
      {(["de", "it"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLingua(l)}
          aria-pressed={lingua === l}
          className={cx(
            "px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors",
            lingua === l ? "bg-neutral-900 text-white" : "text-neutral-500 hover:text-neutral-900"
          )}
        >
          {l === "de" ? "Tedesco" : "Italiano"}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <Card
        title="Brochure a tre ante"
        subtitle="A4 orizzontale, piega a portafoglio. Dall'aggancio ai prezzi"
        action={lingue}
      >
        <div className="grid gap-3 lg:grid-cols-2">
          {BROCHURE.anteprime(lingua).map((a) => (
            <div key={a.src}>
              <Anteprima
                titolo={`Brochure, ${a.titolo.toLowerCase()}`}
                etichetta={a.titolo}
                src={a.src}
                ratio={BROCHURE.ratio}
                onZoom={setZoom}
              />
              <p className="mt-1.5 text-[11px] text-neutral-500">{a.nota}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {BROCHURE.file(lingua).map((f, i) => (
            <Scarica key={f.href} file={f} primario={i === 0} />
          ))}
        </div>

        <p className="mb-2 mt-6 text-[11px] font-bold uppercase tracking-wide text-neutral-400">
          L&apos;ordine dei pannelli, come li legge chi la apre
        </p>
        <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {BROCHURE.imbuto.map((p, i) => (
            <li key={p.dove} className="flex gap-3 border border-black/10 p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-neutral-900 text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span className="min-w-0 text-[11px] leading-snug">
                <span className="block font-bold text-neutral-900">
                  {p.dove} <span className="font-normal text-neutral-400">· {p.fase}</span>
                </span>
                <span className="mt-0.5 block text-neutral-600">{p.cosa}</span>
              </span>
            </li>
          ))}
        </ol>
      </Card>

      <Card title="Biglietto da visita" subtitle="85 x 55 mm, fronte e retro" action={lingue}>
        <div className="grid gap-3 sm:grid-cols-2">
          {BIGLIETTO.facce(lingua).map((f) => (
            <Anteprima
              key={f.src}
              titolo={`Biglietto, ${f.titolo.toLowerCase()}`}
              etichetta={f.titolo}
              src={f.src}
              ratio={BIGLIETTO.ratio}
              onZoom={setZoom}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {BIGLIETTO.file(lingua).map((f, i) => (
            <Scarica key={f.href} file={f} primario={i === 0} />
          ))}
        </div>
      </Card>

      <Card title="Template merchandising" subtitle="Come si stampa e quale file mandare al fornitore">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {OGGETTI.map((o) => (
            <article key={o.key} className="flex flex-col border border-black/10 p-3.5">
              <h3 className="text-sm font-bold tracking-tight text-neutral-900">{o.nome}</h3>
              <dl className="mt-2 space-y-1.5 text-[11px] leading-snug">
                <Riga termine="Stampa" valore={o.tecnica} />
                <Riga termine="Logo" valore={o.logo} />
                <Riga termine="Colore" valore={o.supporto} />
              </dl>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {o.file.map((f) => (
                  <Scarica key={f.href} file={f} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </Card>

      <Card title="Loghi e colori" subtitle="I file di partenza per tutto il resto">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LOGHI.map((l) => (
            <div key={l.src} className="border border-black/10">
              <div
                className={cx(
                  "flex h-24 items-center justify-center border-b border-black/10 p-4",
                  FONDO_LOGO[l.fondo]
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.nome} className="max-h-full max-w-full" />
              </div>
              <div className="flex items-center gap-2 p-2">
                <p className="min-w-0 flex-1 truncate text-[11px] font-semibold text-neutral-900">
                  {l.nome}
                </p>
                <a
                  href={l.src}
                  download
                  aria-label={`Scarica ${l.nome}`}
                  className="shrink-0 text-neutral-400 transition-colors hover:text-gold"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-2 mt-6 text-[11px] font-bold uppercase tracking-wide text-neutral-400">
          Colori
        </p>
        <div className="flex flex-wrap gap-2">
          {COLORI.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => copiaColore(c.hex)}
              className="group flex items-center gap-3 border border-black/10 py-2 pl-2 pr-3.5 text-left transition-colors hover:border-gold"
            >
              <span className="h-9 w-9 shrink-0" style={{ background: c.hex }} />
              <span>
                <span className="block text-xs font-bold text-neutral-900">
                  {c.nome}{" "}
                  <span className="font-mono font-normal text-neutral-500">
                    {copiato === c.hex ? "copiato" : c.hex}
                  </span>
                </span>
                <span className="block text-[11px] text-neutral-400">{c.stampa}</span>
              </span>
              <Copy className="ml-1 h-3.5 w-3.5 text-neutral-300 transition-colors group-hover:text-gold" />
            </button>
          ))}
        </div>
      </Card>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.titolo}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setZoom(null)}
        >
          <button
            type="button"
            onClick={() => setZoom(null)}
            aria-label="Chiudi"
            className="absolute right-4 top-4 bg-white p-2 text-neutral-900"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom.src}
            alt={zoom.titolo}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full bg-white shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

function Anteprima({
  titolo,
  etichetta,
  src,
  ratio,
  onZoom,
}: {
  titolo: string;
  etichetta: string;
  src: string;
  ratio: string;
  onZoom: (z: Zoom) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onZoom({ titolo, src })}
      className="group relative block w-full overflow-hidden border border-black/10 bg-neutral-100 text-left"
      style={{ aspectRatio: ratio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={titolo}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span className="absolute bottom-0 left-0 bg-neutral-900/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
        {etichetta}
      </span>
      <span className="absolute right-2 top-2 bg-white/90 p-1 text-neutral-900 opacity-0 transition-opacity group-hover:opacity-100">
        <Maximize2 className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

function Scarica({ file, primario = false }: { file: FileScaricabile; primario?: boolean }) {
  return (
    <a
      href={file.href}
      download
      className={cx(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold transition-all active:scale-95",
        primario
          ? "bg-neutral-900 text-white hover:bg-neutral-800"
          : "border border-black/15 bg-white text-neutral-900 hover:border-gold hover:text-gold"
      )}
    >
      <Download className="h-3.5 w-3.5" />
      {file.label}
    </a>
  );
}

function Riga({ termine, valore }: { termine: string; valore: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-12 shrink-0 text-neutral-400">{termine}</dt>
      <dd className="text-neutral-700">{valore}</dd>
    </div>
  );
}
