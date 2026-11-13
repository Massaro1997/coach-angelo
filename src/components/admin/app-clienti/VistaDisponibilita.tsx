"use client";

// Linguetta Disponibilita': le fasce della settimana in cui i clienti possono
// prenotare un'ora 1:1, e i giorni chiusi (ferie). Le fasce si cambiano qui in
// bozza e «Salva gli orari» le sostituisce tutte in una volta (PUT): cosi'
// mezza modifica non arriva mai ai clienti. Le chiusure invece si salvano
// subito, una per una.

import { useEffect, useState, type FormEvent } from "react";
import { CalendarOff, Check, Clock, Copy, Plus, Power, PowerOff, X } from "lucide-react";
import { Card, cx } from "../ui";
import type { DataISO } from "@/lib/app-coaching/tipi";
import type { Chiusura, PrenotazioneAdmin, SlotAdmin } from "@/lib/app-coaching/tipi-v2";
import { aggiungiGiorni, dataValida, giorniTra } from "@/lib/app-coaching/date";
import { api, Avviso, BtnIcona, CAMPO, CAMPO_PICCOLO, Campo, Errore, dataLunga, testoErrore } from "./comune";
import { API, GIORNI_CORTI, GIORNI_LUNGHI, RE_ORA, attiva, minuti, ora, oraPulita } from "./dati-v2";

/** Una fascia in bozza: `k` e' solo la chiave per React (l'id lo rifa' il server al salvataggio). */
type Fascia = Omit<SlotAdmin, "id"> & { k: string };

const daSlot = (s: SlotAdmin): Fascia => ({
  k: s.id,
  giorno: s.giorno,
  inizio: s.inizio,
  fine: s.fine,
  luogo: s.luogo,
  attivo: s.attivo,
});

const ordina = (f: Fascia[]) =>
  [...f].sort((a, b) => a.giorno - b.giorno || a.inizio.localeCompare(b.inizio) || a.fine.localeCompare(b.fine));

/** Impronta per sapere se ci sono modifiche non salvate. */
const firma = (f: Fascia[]) =>
  JSON.stringify(ordina(f).map((x) => [x.giorno, x.inizio, x.fine, x.luogo?.trim() || "", x.attivo]));

const accavallate = (a: { inizio: string; fine: string }, b: { inizio: string; fine: string }) =>
  minuti(a.inizio) < minuti(b.fine) && minuti(b.inizio) < minuti(a.fine);

const fasce = (n: number) => (n === 1 ? "1 fascia" : `${n} fasce`);

/** Da X a Y in pezzi da `durata` minuti (0 = una fascia sola); l'avanzo finale si scarta. */
function spezza(dalle: string, alle: string, durata: number): [string, string][] {
  if (!RE_ORA.test(dalle) || !RE_ORA.test(alle)) return [];
  const a = minuti(dalle);
  const b = minuti(alle);
  if (b <= a) return [];
  if (!durata) return [[dalle, alle]];
  const out: [string, string][] = [];
  for (let t = a; t + durata <= b; t += durata) out.push([ora(t), ora(t + durata)]);
  return out;
}

export default function VistaDisponibilita({
  prenotazioni,
  oggi,
  onApriPrenotazioni,
}: {
  /** per avvisare se un giorno chiuso ha gia' delle ore prenotate */
  prenotazioni: PrenotazioneAdmin[];
  oggi: DataISO;
  onApriPrenotazioni: () => void;
}) {
  const [salvate, setSalvate] = useState<Fascia[]>([]);
  const [bozza, setBozza] = useState<Fascia[]>([]);
  const [chiusure, setChiusure] = useState<Chiusura[]>([]);
  const [pronto, setPronto] = useState(false);
  const [errore, setErrore] = useState("");
  const [versione, setVersione] = useState(0);
  const [salvando, setSalvando] = useState(false);
  const [erroreSalva, setErroreSalva] = useState("");
  const [esito, setEsito] = useState("");
  const [strumento, setStrumento] = useState<"aggiungi" | "copia" | null>(null);
  const [giorniScelti, setGiorniScelti] = useState<number[]>([]);
  const [copiaDa, setCopiaDa] = useState(0);

  const sporco = firma(bozza) !== firma(salvate);

  useEffect(() => {
    let vivo = true;
    api<{ slot: SlotAdmin[]; chiusure: Chiusura[] }>(API.disponibilita)
      .then((j) => {
        if (!vivo) return;
        const f = (j.slot ?? []).map(daSlot);
        setSalvate(f);
        setBozza(f);
        setChiusure(j.chiusure ?? []);
        setErrore("");
      })
      .catch((e) => vivo && setErrore(testoErrore(e)))
      .finally(() => vivo && setPronto(true));
    return () => {
      vivo = false;
    };
  }, [versione]);

  // chiudere la scheda del browser con orari non salvati: avviso nativo
  useEffect(() => {
    if (!sporco) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [sporco]);

  function modifica(f: (x: Fascia[]) => Fascia[]) {
    setBozza(f);
    setEsito("");
    setErroreSalva("");
  }

  async function salva() {
    setSalvando(true);
    setErroreSalva("");
    try {
      const slot = ordina(bozza).map(({ giorno, inizio, fine, luogo, attivo }) => ({
        giorno,
        inizio,
        fine,
        luogo: luogo?.trim() || null,
        attivo,
      }));
      const r = await api<{ slot: SlotAdmin[] }>(API.disponibilita, { method: "PUT", body: { slot } });
      const f = (r.slot ?? []).map(daSlot);
      setSalvate(f);
      setBozza(f);
      setEsito("Orari salvati: da adesso i clienti vedono questi.");
    } catch (e) {
      setErroreSalva(testoErrore(e));
    } finally {
      setSalvando(false);
    }
  }

  function apri(s: "aggiungi" | "copia", giorno?: number) {
    setStrumento(s);
    // i giorni scelti sono in comune tra i due strumenti: si riparte da capo
    if (s === "aggiungi") return setGiorniScelti(giorno === undefined ? [] : [giorno]);
    setGiorniScelti([]);
    // senza giorno indicato si parte dal primo che ha delle ore
    setCopiaDa(giorno ?? (bozza.some((f) => f.giorno === copiaDa) ? copiaDa : (ordina(bozza)[0]?.giorno ?? 0)));
  }

  if (!pronto) return <p className="py-10 text-[13px] text-crm-tenue">Carico gli orari…</p>;
  // senza gli orari salvati non si modifica niente: Salva li sostituirebbe tutti
  if (errore) return <Errore testo={errore} onRiprova={() => setVersione((v) => v + 1)} />;

  const attive = bozza.filter((f) => f.attivo).length;

  return (
    <div className="space-y-4">
      {/* -------------------------------------------------- settimana */}
      <section className="crm-card">
        <header className="flex flex-wrap items-start gap-3 px-4 pt-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-[13px] font-[650] leading-5 text-crm-ink">Orari della settimana</h2>
            <p className="text-[13px] leading-5 text-crm-tenue">
              I clienti vedono solo queste ore, da 12 ore dopo fino a 4 settimane avanti, tolte quelle già prenotate e i giorni
              chiusi.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => apri("aggiungi")} className="crm-btn-primario max-sm:min-h-9">
              <Plus className="h-3.5 w-3.5" /> Aggiungi ore
            </button>
            <button type="button" onClick={() => apri("copia")} disabled={!bozza.length} className="crm-btn max-sm:min-h-9">
              <Copy className="h-3.5 w-3.5" /> Copia un giorno
            </button>
          </div>
        </header>

        <div className="space-y-3 px-4 pb-4 pt-3">
          {esito && <Avviso>{esito}</Avviso>}
          {strumento === "aggiungi" && (
            <AggiungiOre
              bozza={bozza}
              giorni={giorniScelti}
              onGiorni={setGiorniScelti}
              onAggiungi={(nuove) => modifica((x) => [...x, ...nuove])}
              onChiudi={() => setStrumento(null)}
            />
          )}
          {strumento === "copia" && (
            <CopiaGiorno
              bozza={bozza}
              da={copiaDa}
              onDa={setCopiaDa}
              verso={giorniScelti}
              onVerso={setGiorniScelti}
              onCopia={(da, verso) => {
                modifica((x) => [
                  ...x.filter((f) => !verso.includes(f.giorno)),
                  ...verso.flatMap((g) =>
                    x.filter((f) => f.giorno === da).map((f) => ({ ...f, giorno: g, k: crypto.randomUUID() }))
                  ),
                ]);
                setGiorniScelti([]);
                setStrumento(null);
              }}
              onChiudi={() => setStrumento(null)}
            />
          )}
        </div>

        {/* un giorno per riga: si legge bene sia da telefono sia da computer */}
        <ul className="border-t border-crm-filo">
          {GIORNI_LUNGHI.map((nome, g) => {
            const delGiorno = ordina(bozza.filter((f) => f.giorno === g));
            const accese = delGiorno.filter((f) => f.attivo).length;
            return (
              <li
                key={g}
                className="grid gap-x-4 gap-y-2 border-b border-crm-filo px-4 py-3 last:border-b-0 sm:grid-cols-[130px_minmax(0,1fr)]"
              >
                <div className="flex items-center gap-1 sm:flex-col sm:items-start sm:gap-0.5">
                  <p className="text-[13px] font-[650] leading-5 text-crm-ink">{nome}</p>
                  <p className="text-[12px] leading-4 text-crm-tenue max-sm:ml-1.5">
                    {delGiorno.length ? `${accese === 1 ? "1 ora" : `${accese} ore`}${accese < delGiorno.length ? ` + ${delGiorno.length - accese} spente` : ""}` : "chiuso"}
                  </p>
                  <div className="flex gap-0.5 max-sm:ml-auto sm:-ml-2 sm:mt-1">
                    <BtnIcona titolo={`Aggiungi ore di ${nome.toLowerCase()}`} onClick={() => apri("aggiungi", g)}>
                      <Plus className="h-4 w-4" />
                    </BtnIcona>
                    <BtnIcona
                      titolo={`Copia ${nome.toLowerCase()} su altri giorni`}
                      onClick={() => apri("copia", g)}
                      disabled={!delGiorno.length}
                    >
                      <Copy className="h-4 w-4" />
                    </BtnIcona>
                  </div>
                </div>
                {delGiorno.length === 0 ? (
                  <p className="self-center text-[13px] text-crm-spento">Nessuna ora: quel giorno i clienti non possono prenotare.</p>
                ) : (
                  <ul className="flex flex-wrap content-start gap-1.5">
                    {delGiorno.map((f) => (
                      <li
                        key={f.k}
                        className={cx(
                          "flex min-w-[148px] items-center gap-1 rounded-xl py-1 pl-2.5 pr-0.5",
                          f.attivo
                            ? "bg-white shadow-crm-anello"
                            : "bg-crm-fondo text-crm-spento outline-1 -outline-offset-1 outline-dashed outline-[#c4c4c4]"
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <p className={cx("text-[13px] font-[650] tabular-nums leading-5", f.attivo ? "text-crm-ink" : "text-crm-spento line-through")}>
                            {f.inizio}–{f.fine}
                          </p>
                          {(f.luogo || !f.attivo) && (
                            <p className="max-w-[160px] truncate text-[11px] leading-4 text-crm-tenue" title={f.luogo ?? undefined}>
                              {[!f.attivo ? "spenta" : null, f.luogo].filter(Boolean).join(" · ")}
                            </p>
                          )}
                        </div>
                        <BtnIcona
                          titolo={f.attivo ? `Spegni ${f.inizio}–${f.fine}` : `Riaccendi ${f.inizio}–${f.fine}`}
                          onClick={() => modifica((x) => x.map((y) => (y.k === f.k ? { ...y, attivo: !y.attivo } : y)))}
                        >
                          {f.attivo ? <PowerOff className="h-3.5 w-3.5" /> : <Power className="h-3.5 w-3.5" />}
                        </BtnIcona>
                        <BtnIcona titolo={`Togli ${f.inizio}–${f.fine}`} pericolo onClick={() => modifica((x) => x.filter((y) => y.k !== f.k))}>
                          <X className="h-3.5 w-3.5" />
                        </BtnIcona>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <p className="border-t border-crm-filo bg-crm-fondo px-4 py-2.5 text-[12px] leading-4 text-crm-tenue">
          {attive === 1 ? "1 ora" : `${attive} ore`} a settimana aperte alle prenotazioni. Spegnere o togliere una fascia non annulla le
          ore già prenotate: quelle si annullano da Prenotazioni.
        </p>
      </section>

      {/* barra di salvataggio: resta in fondo allo schermo finche' ci sono modifiche */}
      {(sporco || erroreSalva) && (
        <div className="sticky bottom-3 z-10 space-y-2 rounded-2xl bg-white p-3 shadow-crm-pop">
          {erroreSalva && <Errore testo={erroreSalva} />}
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-auto text-[13px] font-[550] text-crm-ink">Orari modificati, non ancora salvati</p>
            <button
              type="button"
              onClick={() => modifica(() => salvate)}
              disabled={salvando}
              className="crm-btn-piatto disabled:opacity-50 max-sm:min-h-9"
            >
              Annulla modifiche
            </button>
            <button type="button" onClick={salva} disabled={salvando || !sporco} className="crm-btn-primario max-sm:min-h-9">
              <Check className="h-3.5 w-3.5" /> {salvando ? "Salvo…" : "Salva gli orari"}
            </button>
          </div>
        </div>
      )}

      <GiorniChiusi
        chiusure={chiusure}
        onChiusure={setChiusure}
        prenotazioni={prenotazioni}
        oggi={oggi}
        onApriPrenotazioni={onApriPrenotazioni}
      />
    </div>
  );
}

/* ------------------------------------------------------- scelta giorni */

function SceltaGiorni({
  scelti,
  onScelti,
  escluso,
}: {
  scelti: number[];
  onScelti: (g: number[]) => void;
  escluso?: number;
}) {
  const tutti = [0, 1, 2, 3, 4, 5, 6].filter((g) => g !== escluso);
  const metti = (gg: number[]) => onScelti([...new Set(gg)].filter((g) => g !== escluso).sort());
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tutti.map((g) => {
        const on = scelti.includes(g);
        return (
          <button
            key={g}
            type="button"
            aria-pressed={on}
            onClick={() => metti(on ? scelti.filter((x) => x !== g) : [...scelti, g])}
            className={cx(
              "min-h-8 min-w-11 rounded-[10px] px-2 text-[13px] font-[550] transition-colors max-sm:min-h-9",
              on ? "bg-[#303030] text-white" : "bg-white text-crm-testo shadow-crm-anello hover:bg-crm-fondo"
            )}
          >
            {GIORNI_CORTI[g]}
          </button>
        );
      })}
      <span className="mx-1 h-5 w-px bg-crm-filo" aria-hidden="true" />
      <button type="button" onClick={() => metti([0, 1, 2, 3, 4])} className="crm-btn-piatto max-sm:min-h-9">
        Lun–Ven
      </button>
      <button type="button" onClick={() => metti(tutti)} className="crm-btn-piatto max-sm:min-h-9">
        Tutti
      </button>
      {scelti.length > 0 && (
        <button type="button" onClick={() => onScelti([])} className="crm-btn-piatto text-crm-tenue max-sm:min-h-9">
          Nessuno
        </button>
      )}
    </div>
  );
}

/* --------------------------------------------------------- aggiungi ore */

const DURATE: [number, string][] = [
  [60, "ore da 60 minuti"],
  [45, "ore da 45 minuti"],
  [90, "ore da 90 minuti"],
  [30, "mezz'ore"],
  [0, "una fascia unica"],
];

function AggiungiOre({
  bozza,
  giorni,
  onGiorni,
  onAggiungi,
  onChiudi,
}: {
  bozza: Fascia[];
  giorni: number[];
  onGiorni: (g: number[]) => void;
  onAggiungi: (nuove: Fascia[]) => void;
  onChiudi: () => void;
}) {
  const [dalle, setDalle] = useState("07:00");
  const [alle, setAlle] = useState("12:00");
  const [durata, setDurata] = useState(60);
  const [luogo, setLuogo] = useState("");
  const [fatto, setFatto] = useState("");

  const pezzi = spezza(dalle, alle, durata);
  // per ogni giorno scelto, i pezzi che non pestano fasce gia' presenti
  const piano = giorni.map((g) => {
    const gia = bozza.filter((f) => f.giorno === g);
    const liberi = pezzi.filter(([i, f]) => !gia.some((x) => accavallate(x, { inizio: i, fine: f })));
    return { g, liberi, saltati: pezzi.length - liberi.length };
  });
  const totale = piano.reduce((s, p) => s + p.liberi.length, 0);
  const saltati = piano.reduce((s, p) => s + p.saltati, 0);
  const luoghi = [...new Set(bozza.map((f) => f.luogo?.trim()).filter((l): l is string => !!l))].sort();

  let problema = "";
  if (!RE_ORA.test(dalle) || !RE_ORA.test(alle)) problema = "Scrivi le due ore.";
  else if (minuti(alle) <= minuti(dalle)) problema = "«Alle» deve venire dopo «Dalle».";
  else if (!pezzi.length) problema = "Tra le due ore non ci sta neanche un'ora intera di quella durata.";

  function aggiungi(e: FormEvent) {
    e.preventDefault();
    if (problema || !totale) return;
    const l = luogo.trim() || null;
    onAggiungi(
      piano.flatMap(({ g, liberi }) =>
        liberi.map(([inizio, fine]) => ({ k: crypto.randomUUID(), giorno: g, inizio, fine, luogo: l, attivo: true }))
      )
    );
    setFatto(
      `Aggiunte ${fasce(totale)}${saltati ? `, saltate ${saltati} che si accavallavano con quelle che c'erano` : ""}. Ricordati di salvare.`
    );
    onGiorni([]);
  }

  const anteprima = pezzi.length > 5 ? [...pezzi.slice(0, 3), null, pezzi[pezzi.length - 1]] : pezzi;

  return (
    <form onSubmit={aggiungi} className="space-y-3 rounded-2xl bg-crm-fondo p-3 sm:p-4">
      <div className="flex items-start gap-2">
        <p className="flex-1 text-[13px] font-[650] leading-5 text-crm-ink">
          <Clock className="mr-1.5 inline h-3.5 w-3.5 align-[-2px] text-crm-spento" />
          Aggiungi ore
        </p>
        <BtnIcona titolo="Chiudi" onClick={onChiudi}>
          <X className="h-4 w-4" />
        </BtnIcona>
      </div>
      <div>
        <span className="crm-etichetta">Giorni</span>
        <SceltaGiorni scelti={giorni} onScelti={onGiorni} />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Campo etichetta="Dalle">
          <input type="time" step={900} value={dalle} onChange={(e) => setDalle(oraPulita(e.target.value))} className={CAMPO} />
        </Campo>
        <Campo etichetta="Alle">
          <input type="time" step={900} value={alle} onChange={(e) => setAlle(oraPulita(e.target.value))} className={CAMPO} />
        </Campo>
        <Campo etichetta="Dividi in" className="col-span-2 sm:col-span-1">
          <select value={durata} onChange={(e) => setDurata(Number(e.target.value))} className={CAMPO}>
            {DURATE.map(([m, l]) => (
              <option key={m} value={m}>
                {l}
              </option>
            ))}
          </select>
        </Campo>
        <Campo etichetta="Luogo" className="col-span-2 sm:col-span-1">
          <input
            value={luogo}
            onChange={(e) => setLuogo(e.target.value)}
            className={CAMPO}
            list="luoghi-fasce"
            placeholder="Facoltativo"
            autoComplete="off"
          />
          <datalist id="luoghi-fasce">
            {luoghi.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>
        </Campo>
      </div>

      {problema ? (
        <p className="text-[12px] leading-4 text-crm-rosso">{problema}</p>
      ) : (
        <p className="text-[12px] leading-4 text-crm-tenue">
          {anteprima.map((p) => (p ? `${p[0]}–${p[1]}` : "…")).join(", ")}
          {durata ? ` (${pezzi.length === 1 ? "1 ora" : `${pezzi.length} ore`} per giorno)` : ""}
          {giorni.length ? ` su ${giorni.map((g) => GIORNI_CORTI[g]).join(", ")}` : " · scegli i giorni"}
          {saltati ? `. ${saltati} si accavallano con fasce che ci sono già: le salto.` : ""}
        </p>
      )}
      {fatto && <Avviso>{fatto}</Avviso>}

      <button type="submit" disabled={!!problema || !totale} className="crm-btn-primario max-sm:min-h-9">
        <Plus className="h-3.5 w-3.5" /> {totale ? `Aggiungi ${fasce(totale)}` : "Aggiungi"}
      </button>
    </form>
  );
}

/* -------------------------------------------------------- copia un giorno */

function CopiaGiorno({
  bozza,
  da,
  onDa,
  verso,
  onVerso,
  onCopia,
  onChiudi,
}: {
  bozza: Fascia[];
  da: number;
  onDa: (g: number) => void;
  verso: number[];
  onVerso: (g: number[]) => void;
  onCopia: (da: number, verso: number[]) => void;
  onChiudi: () => void;
}) {
  const n = bozza.filter((f) => f.giorno === da).length;
  const pieni = verso.filter((g) => bozza.some((f) => f.giorno === g));
  return (
    <div className="space-y-3 rounded-2xl bg-crm-fondo p-3 sm:p-4">
      <div className="flex items-start gap-2">
        <p className="flex-1 text-[13px] font-[650] leading-5 text-crm-ink">
          <Copy className="mr-1.5 inline h-3.5 w-3.5 align-[-2px] text-crm-spento" />
          Copia un giorno su altri giorni
        </p>
        <BtnIcona titolo="Chiudi" onClick={onChiudi}>
          <X className="h-4 w-4" />
        </BtnIcona>
      </div>
      <Campo etichetta="Copia le ore di" className="max-w-xs">
        <select
          value={da}
          onChange={(e) => {
            onDa(Number(e.target.value));
            onVerso(verso.filter((g) => g !== Number(e.target.value)));
          }}
          className={CAMPO}
        >
          {GIORNI_LUNGHI.map((nome, g) => (
            <option key={g} value={g}>
              {nome} ({fasce(bozza.filter((f) => f.giorno === g).length)})
            </option>
          ))}
        </select>
      </Campo>
      <div>
        <span className="crm-etichetta">Su</span>
        <SceltaGiorni scelti={verso} onScelti={onVerso} escluso={da} />
      </div>
      {pieni.length > 0 && (
        <p className="text-[12px] leading-4 text-crm-attesa-ink">
          {pieni.map((g) => GIORNI_LUNGHI[g]).join(", ")} {pieni.length === 1 ? "ha" : "hanno"} già delle ore: vengono sostituite.
        </p>
      )}
      <button type="button" disabled={!n || !verso.length} onClick={() => onCopia(da, verso)} className="crm-btn-primario max-sm:min-h-9">
        <Copy className="h-3.5 w-3.5" />{" "}
        {verso.length ? `Copia su ${verso.length === 1 ? "1 giorno" : `${verso.length} giorni`}` : "Copia"}
      </button>
      {!n && <p className="text-[12px] leading-4 text-crm-tenue">{GIORNI_LUNGHI[da]} non ha ore da copiare.</p>}
    </div>
  );
}

/* ---------------------------------------------------------- giorni chiusi */

const MAX_GIORNI_CHIUSI = 62;

function GiorniChiusi({
  chiusure,
  onChiusure,
  prenotazioni,
  oggi,
  onApriPrenotazioni,
}: {
  chiusure: Chiusura[];
  onChiusure: (f: (c: Chiusura[]) => Chiusura[]) => void;
  prenotazioni: PrenotazioneAdmin[];
  oggi: DataISO;
  onApriPrenotazioni: () => void;
}) {
  const [dal, setDal] = useState("");
  const [al, setAl] = useState("");
  const [nota, setNota] = useState("");
  const [lavoro, setLavoro] = useState("");
  const [errore, setErrore] = useState("");
  const [esito, setEsito] = useState("");
  const [togliendo, setTogliendo] = useState<string | null>(null);

  // le passate non servono piu' a niente: si vedono solo da oggi in avanti
  const prossime = chiusure.filter((c) => c.data >= oggi).sort((a, b) => a.data.localeCompare(b.data));
  const occupate = (d: DataISO) => prenotazioni.filter((p) => p.data === d && attiva(p)).length;

  async function aggiungi(e: FormEvent) {
    e.preventDefault();
    if (!dataValida(dal)) return setErrore("Scegli il giorno.");
    const fine = al && dataValida(al) ? al : dal;
    if (fine < dal) return setErrore("«Al» deve venire dopo «Dal».");
    const n = giorniTra(dal, fine) + 1;
    if (n > MAX_GIORNI_CHIUSI) return setErrore(`Al massimo ${MAX_GIORNI_CHIUSI} giorni alla volta.`);
    const gia = new Set(chiusure.map((c) => c.data));
    const giorni = Array.from({ length: n }, (_, i) => aggiungiGiorni(dal, i)).filter((d) => !gia.has(d));
    setErrore("");
    setEsito("");
    if (!giorni.length) return setEsito(n === 1 ? "Quel giorno è già chiuso." : "Quei giorni sono già tutti chiusi.");
    let fatti = 0;
    try {
      // uno alla volta: le ferie sono pochi giorni, niente raffiche al server
      for (const d of giorni) {
        setLavoro(giorni.length > 1 ? `Chiudo ${fatti + 1} di ${giorni.length}…` : "Salvo…");
        const r = await api<{ chiusura: Chiusura }>(API.chiusure, {
          method: "POST",
          body: nota.trim() ? { data: d, nota: nota.trim() } : { data: d },
        });
        onChiusure((x) => [...x.filter((c) => c.data !== r.chiusura.data), r.chiusura]);
        fatti++;
      }
      setEsito(giorni.length === 1 ? "Giorno chiuso." : `${giorni.length} giorni chiusi.`);
      setDal("");
      setAl("");
      setNota("");
    } catch (err) {
      setErrore(fatti ? `${testoErrore(err)}\nPrima dell'errore ne ho chiusi ${fatti}.` : testoErrore(err));
    } finally {
      setLavoro("");
    }
  }

  async function togli(c: Chiusura) {
    setTogliendo(c.id);
    setErrore("");
    setEsito("");
    try {
      await api(`${API.chiusure}/${c.id}`, { method: "DELETE" });
      onChiusure((x) => x.filter((y) => y.id !== c.id));
    } catch (err) {
      setErrore(testoErrore(err));
    } finally {
      setTogliendo(null);
    }
  }

  return (
    <Card title="Giorni chiusi" subtitle="Ferie, malattia, festivi: quel giorno i clienti non vedono ore libere. Si salvano subito.">
      <form onSubmit={aggiungi} className="grid gap-3 sm:grid-cols-[repeat(2,minmax(0,170px))_minmax(0,1fr)_auto] sm:items-end">
        <Campo etichetta="Dal">
          <input type="date" value={dal} min={oggi} onChange={(e) => setDal(e.target.value)} className={CAMPO_PICCOLO} required />
        </Campo>
        <Campo etichetta="Al (se più giorni)">
          <input type="date" value={al} min={dal || oggi} onChange={(e) => setAl(e.target.value)} className={CAMPO_PICCOLO} />
        </Campo>
        <Campo etichetta="Nota">
          <input
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            className={CAMPO_PICCOLO}
            placeholder="Ferie, corso, festivo…"
            autoComplete="off"
          />
        </Campo>
        <button type="submit" disabled={!!lavoro || !dal} className="crm-btn-primario min-h-[30px] max-sm:min-h-9">
          <CalendarOff className="h-3.5 w-3.5" /> {lavoro || "Chiudi"}
        </button>
      </form>

      {(errore || esito) && (
        <div className="mt-3">{errore ? <Errore testo={errore} /> : <Avviso>{esito}</Avviso>}</div>
      )}

      {prossime.length === 0 ? (
        <p className="mt-4 text-[13px] text-crm-tenue">Nessun giorno chiuso in programma.</p>
      ) : (
        <ul className="mt-4 border-t border-crm-filo">
          {prossime.map((c) => {
            const n = occupate(c.data);
            return (
              <li key={c.id} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-crm-filo py-2.5 last:border-b-0">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-[550] capitalize leading-5 text-crm-ink">{dataLunga(c.data)}</p>
                  {c.nota && <p className="truncate text-[12px] leading-4 text-crm-tenue">{c.nota}</p>}
                </div>
                {n > 0 && (
                  <button
                    type="button"
                    onClick={onApriPrenotazioni}
                    className="crm-badge crm-badge-attesa hover:brightness-95"
                    title="Quel giorno ci sono ore già prenotate: annullale da Prenotazioni se serve"
                  >
                    {n === 1 ? "1 ora prenotata" : `${n} ore prenotate`}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => togli(c)}
                  disabled={togliendo === c.id}
                  className="crm-btn-piatto text-crm-tenue hover:text-crm-rosso disabled:opacity-50 max-sm:min-h-9"
                >
                  <X className="h-3.5 w-3.5" /> {togliendo === c.id ? "Riapro…" : "Riapri"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
