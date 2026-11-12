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
    <div className="inline-flex gap-0.5 rounded-[10px] bg-white p-0.5 shadow-crm-anello">
      {(["de", "it"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLingua(l)}
          aria-pressed={lingua === l}
          data-attiva={lingua === l}
          className="crm-linguetta px-2.5 py-0.5 text-[12px] transition-colors"
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
              <p className="mt-1.5 text-[12px] text-crm-tenue">{a.nota}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {BROCHURE.file(lingua).map((f, i) => (
            <Scarica key={f.href} file={f} primario={i === 0} />
          ))}
        </div>

        <p className="mb-2 mt-6 text-[13px] font-[550] text-crm-testo">
          L&apos;ordine dei pannelli, come li legge chi la apre
        </p>
        <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {BROCHURE.imbuto.map((p, i) => (
            <li key={p.dove} className="flex gap-3 rounded-xl bg-crm-fondo p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#303030] text-[12px] font-[550] text-white">
                {i + 1}
              </span>
              <span className="min-w-0 text-[12px] leading-snug">
                <span className="block font-[650] text-crm-ink">
                  {p.dove} <span className="font-normal text-crm-spento">· {p.fase}</span>
                </span>
                <span className="mt-0.5 block text-crm-testo">{p.cosa}</span>
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
            <article key={o.key} className="flex flex-col rounded-xl bg-white p-3.5 shadow-crm-anello">
              <h3 className="text-[13px] font-[650] text-crm-ink">{o.nome}</h3>
              <dl className="mt-2 space-y-1.5 text-[12px] leading-snug">
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
            <div key={l.src} className="overflow-hidden rounded-xl bg-white shadow-crm-anello">
              <div
                className={cx(
                  "flex h-24 items-center justify-center border-b border-crm-filo p-4",
                  FONDO_LOGO[l.fondo]
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.nome} className="max-h-full max-w-full" />
              </div>
              <div className="flex items-center gap-2 p-2 pl-3">
                <p className="min-w-0 flex-1 truncate text-[12px] font-[550] text-crm-ink">
                  {l.nome}
                </p>
                <a
                  href={l.src}
                  download
                  aria-label={`Scarica ${l.nome}`}
                  className="shrink-0 rounded-lg p-1 text-crm-tenue transition-colors hover:bg-black/5 hover:text-crm-ink"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-2 mt-6 text-[13px] font-[550] text-crm-testo">
          Colori
        </p>
        <div className="flex flex-wrap gap-2">
          {COLORI.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => copiaColore(c.hex)}
              className="group flex items-center gap-3 rounded-xl bg-white py-2 pl-2 pr-3.5 text-left shadow-crm-anello transition-colors hover:bg-crm-fondo"
            >
              <span
                className="h-9 w-9 shrink-0 rounded-lg shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
                style={{ background: c.hex }}
              />
              <span>
                <span className="block text-[12px] font-[650] text-crm-ink">
                  {c.nome}{" "}
                  <span className="font-mono font-normal text-crm-tenue">
                    {copiato === c.hex ? "copiato" : c.hex}
                  </span>
                </span>
                <span className="block text-[12px] text-crm-spento">{c.stampa}</span>
              </span>
              <Copy className="ml-1 h-3.5 w-3.5 text-crm-spento transition-colors group-hover:text-crm-ink" />
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
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-crm-ink shadow-crm-pop transition-colors hover:bg-crm-fondo"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom.src}
            alt={zoom.titolo}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-xl bg-white shadow-crm-pop"
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
      className="group relative block w-full overflow-hidden rounded-xl bg-crm-fondo text-left shadow-crm-anello"
      style={{ aspectRatio: ratio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={titolo}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span className="crm-badge crm-badge-scuro absolute bottom-2 left-2">
        {etichetta}
      </span>
      <span className="absolute right-2 top-2 rounded-lg bg-white/90 p-1 text-crm-ink opacity-0 shadow-crm-anello transition-opacity group-hover:opacity-100">
        <Maximize2 className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

function Scarica({ file, primario = false }: { file: FileScaricabile; primario?: boolean }) {
  return (
    <a href={file.href} download className={primario ? "crm-btn-primario" : "crm-btn"}>
      <Download className="h-3.5 w-3.5" />
      {file.label}
    </a>
  );
}

function Riga({ termine, valore }: { termine: string; valore: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-12 shrink-0 text-crm-tenue">{termine}</dt>
      <dd className="text-crm-testo">{valore}</dd>
    </div>
  );
}
