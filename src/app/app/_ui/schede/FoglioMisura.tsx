"use client";

// I due fogli delle misure: "Neue Messung" (modulo) e il dettaglio di una
// misura, da dove la si elimina. La conferma dell'eliminazione sta dentro lo
// stesso foglio: niente finestre sopra le finestre. Scorre solo il foglio
// (Foglio.tsx), qui dentro nessuna zona che scorre in piu'.

import { useState, type FormEvent } from "react";
import { IoTrashOutline } from "react-icons/io5";
import type { Misura, NuovaMisura } from "@/lib/app-coaching/tipi-v2";
import { dataValida, oggiISO } from "@/lib/app-coaching/date";
import Foglio from "../Foglio";
import { Icona3D, Tasto, useLingua } from "../kit";
import { chiama, testoErrore } from "./api";
import { giornoLungo, leggiNumero, numero } from "./formati";
import { CAMPI_MISURA, CIRCONFERENZE, LIMITI, unitaDi, type CampoMisura } from "./misure";
import { useT } from "./testi-schede";

/** campi alti 56 px: si toccano bene col pollice, l'unita' sta a destra dentro il campo */
const CAMPO = "flex h-14 items-center gap-2 rounded-2xl bg-neutral-100 px-4";
const ETICHETTA = "mb-1.5 block text-[15px] font-semibold text-neutral-700";
const A_FUOCO = "focus-within:ring-2 focus-within:ring-[var(--app-colore,#e30613)]";
const IN_ERRORE = "ring-2 ring-[#dc2626]";

function CampoNumero({
  etichetta,
  unita,
  valore,
  segnaposto,
  errore,
  onCambia,
}: {
  etichetta: string;
  unita: string;
  valore: string;
  segnaposto: string;
  errore: string | undefined;
  onCambia: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className={ETICHETTA}>{etichetta}</span>
      <span className={`${CAMPO} ${errore ? IN_ERRORE : A_FUOCO}`}>
        {/* 20px: il numero si legge da lontano; sotto i 16 iPhone ingrandirebbe la pagina al tocco */}
        <input
          inputMode="decimal"
          enterKeyHint="next"
          autoComplete="off"
          value={valore}
          placeholder={segnaposto}
          onChange={(e) => onCambia(e.target.value)}
          aria-invalid={errore ? true : undefined}
          className="min-w-0 flex-1 bg-transparent text-[20px] font-semibold tabular-nums outline-none placeholder:font-normal placeholder:text-neutral-400"
        />
        <span className="shrink-0 text-[16px] font-medium text-neutral-500">{unita}</span>
      </span>
      {errore && <span className="mt-1 block text-[13px] text-[#b91c1c]">{errore}</span>}
    </label>
  );
}

/* ------------------------------------------------------------ nuova misura */

export function FoglioNuovaMisura({
  ultimi,
  onChiudi,
  onSalvata,
}: {
  /** ultimo valore di ogni campo: fa da segnaposto grigio */
  ultimi: Partial<Record<CampoMisura, number>>;
  onChiudi: () => void;
  onSalvata: (m: Misura) => void;
}) {
  const t = useT();
  const lingua = useLingua();
  // il foglio si apre solo nel browser, dopo un tocco: la data del telefono va bene
  const [oggi] = useState(() => oggiISO());
  const [data, setData] = useState(oggi);
  const [valori, setValori] = useState<Partial<Record<CampoMisura, string>>>({});
  const [nota, setNota] = useState("");
  const [errori, setErrori] = useState<Partial<Record<CampoMisura, string>>>({});
  const [errore, setErrore] = useState<string | null>(null);
  const [invio, setInvio] = useState(false);

  function cambia(c: CampoMisura, v: string) {
    setValori((s) => ({ ...s, [c]: v }));
    if (errori[c]) setErrori((s) => ({ ...s, [c]: undefined }));
    setErrore(null);
  }

  async function salva(e: FormEvent) {
    e.preventDefault();
    if (invio) return;
    const letti = {} as Record<CampoMisura, number | null>;
    const sbagliati: Partial<Record<CampoMisura, string>> = {};
    for (const c of CAMPI_MISURA) {
      const v = leggiNumero(valori[c] ?? "");
      const [min, max] = LIMITI[c];
      if (v !== null && (Number.isNaN(v) || v < min || v > max)) sbagliati[c] = t.erroreNumero;
      letti[c] = v !== null && !Number.isNaN(v) ? v : null;
    }
    setErrori(sbagliati);
    if (Object.keys(sbagliati).length) return;
    if (CAMPI_MISURA.every((c) => letti[c] === null)) return setErrore(t.erroreVuoto);
    if (!dataValida(data) || data > oggi) return setErrore(t.erroreData);

    setInvio(true);
    setErrore(null);
    const corpo: NuovaMisura = { data, ...letti, nota: nota.trim() || null };
    const r = await chiama<{ misura: Misura }>("/api/app/misure", { metodo: "POST", corpo });
    setInvio(false);
    if (r.ok) onSalvata(r.dati.misura);
    else setErrore(testoErrore(r, t));
  }

  const campo = (c: CampoMisura) => (
    <CampoNumero
      key={c}
      etichetta={t.campi[c]}
      unita={unitaDi(c)}
      valore={valori[c] ?? ""}
      segnaposto={ultimi[c] != null ? numero(ultimi[c], lingua) : ""}
      errore={errori[c]}
      onCambia={(v) => cambia(c, v)}
    />
  );

  return (
    <Foglio titolo={t.nuovaMisura} onChiudi={onChiudi}>
      <form onSubmit={salva} noValidate className="space-y-4">
        <p className="text-[15px] leading-snug text-neutral-500">{t.suggerimento}</p>

        <label className="block">
          <span className={ETICHETTA}>{t.data}</span>
          <span className={`${CAMPO} ${A_FUOCO}`}>
            <input
              type="date"
              value={data}
              max={oggi}
              onChange={(e) => {
                setData(e.target.value);
                setErrore(null);
              }}
              className="min-w-0 flex-1 appearance-none bg-transparent text-left text-[17px] font-semibold outline-none"
            />
          </span>
        </label>

        <div className="grid grid-cols-2 gap-3">
          {campo("peso")}
          {campo("grasso")}
        </div>

        <div className="pt-1">
          <p className="mb-2 text-[17px] font-bold">{t.umfaengeCm}</p>
          <div className="grid grid-cols-2 gap-3">{CIRCONFERENZE.map(campo)}</div>
        </div>

        <label className="block">
          <span className={ETICHETTA}>{t.nota}</span>
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            rows={2}
            maxLength={500}
            placeholder={t.notaSegnaposto}
            className="block w-full resize-none rounded-2xl bg-neutral-100 px-4 py-3.5 text-[17px] outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[var(--app-colore,#e30613)]"
          />
        </label>

        {errore && (
          <p role="alert" className="text-[15px] font-semibold text-[#b91c1c]">
            {errore}
          </p>
        )}

        <Tasto type="submit" pieno disabled={invio}>
          {invio ? t.salvando : t.salva}
        </Tasto>
      </form>
    </Foglio>
  );
}

/* ---------------------------------------------------------- dettaglio */

export function FoglioDettaglioMisura({
  misura,
  onChiudi,
  onEliminata,
}: {
  misura: Misura;
  onChiudi: () => void;
  onEliminata: (id: string) => void;
}) {
  const t = useT();
  const lingua = useLingua();
  const [conferma, setConferma] = useState(false);
  const [invio, setInvio] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);

  async function elimina() {
    setInvio(true);
    setErrore(null);
    const r = await chiama<{ ok: boolean }>(`/api/app/misure/${encodeURIComponent(misura.id)}`, { metodo: "DELETE" });
    setInvio(false);
    if (r.ok || r.stato === 404) onEliminata(misura.id); // 404: gia' sparita, va tolta anche qui
    else setErrore(testoErrore(r, t));
  }

  // il peso in grande con la bilancia, il resto (grasso e circonferenze) in righe
  const altri = CAMPI_MISURA.filter((c) => c !== "peso" && misura[c] != null);

  return (
    <Foglio titolo={giornoLungo(misura.data, lingua)} onChiudi={onChiudi}>
      {misura.peso != null && (
        <div className="flex items-center gap-3 rounded-2xl bg-neutral-100 p-4">
          <Icona3D nome="bilancia" dimensione={48} />
          <div className="min-w-0">
            <p className="text-[14px] text-neutral-500">{t.campi.peso}</p>
            <p className="text-[28px] font-bold leading-tight tabular-nums">
              {numero(misura.peso, lingua)} <span className="text-[17px] font-semibold text-neutral-500">kg</span>
            </p>
          </div>
        </div>
      )}
      {altri.length > 0 && (
        <dl className={`divide-y divide-black/[0.06] ${misura.peso != null ? "mt-2" : ""}`}>
          {altri.map((c) => (
            <div key={c} className="flex min-h-[52px] items-center justify-between gap-3 py-2 text-[17px]">
              <dt className="text-neutral-600">{t.campi[c]}</dt>
              <dd className="font-semibold tabular-nums">
                {numero(misura[c] as number, lingua)} {unitaDi(c)}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {misura.nota && <p className="mt-3 whitespace-pre-wrap rounded-2xl bg-neutral-100 p-4 text-[15px] leading-snug">{misura.nota}</p>}

      {conferma ? (
        <div className="mt-5 rounded-2xl bg-[#fff1f0] p-4">
          <p className="text-[15px] leading-snug">{t.confermaElimina}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Tasto variante="secondario" onClick={() => setConferma(false)} disabled={invio}>
              {t.annulla}
            </Tasto>
            <Tasto onClick={elimina} disabled={invio}>
              {invio ? t.eliminando : t.siElimina}
            </Tasto>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <Tasto variante="testo" icona={<IoTrashOutline aria-hidden />} onClick={() => setConferma(true)}>
            {t.eliminaMisura}
          </Tasto>
        </div>
      )}
      {errore && (
        <p role="alert" className="mt-3 text-[15px] font-semibold text-[#b91c1c]">
          {errore}
        </p>
      )}
    </Foglio>
  );
}
