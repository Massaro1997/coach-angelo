"use client";

// Editor di un giorno: allenamento (Angelo), alimentazione (Natalie), nota per
// il cliente, risposta del cliente in sola lettura e strumenti di copia.
// Su schermo largo e' un pannello a destra del calendario, sul telefono copre
// tutta la pagina. Il modulo vive nel genitore (SchedaCliente), che cosi' sa
// se ci sono modifiche non salvate prima di cambiare giorno o cliente.

import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CircleCheck,
  CopyPlus,
  Dumbbell,
  ListPlus,
  MessageSquare,
  Moon,
  Plus,
  Save,
  StickyNote,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import { cx } from "../ui";
import type { DataISO, Giornata } from "@/lib/app-coaching/tipi";
import { api, BASE, BtnIcona, CAMPO, CAMPO_PICCOLO, Campo, Conferma, Errore, dataLunga, momento, testoErrore } from "./comune";
import {
  PASTI_STANDARD,
  nuovaVoce,
  nuovoEsercizio,
  nuovoPasto,
  pianoVuoto,
  pulisci,
  sommaKcal,
  valida,
  type FormEsercizio,
  type FormPasto,
  type FormVoce,
  type Modulo,
} from "./piano";
import StrumentiCopia from "./StrumentiCopia";

// Esercizi suggeriti nel campo nome: si puo' sempre scrivere altro.
const ESERCIZI = [
  "Kniebeuge",
  "Frontkniebeuge",
  "Goblet Squat",
  "Kreuzheben",
  "Rumänisches Kreuzheben",
  "Bankdrücken",
  "Schrägbankdrücken",
  "Kurzhantel-Bankdrücken",
  "Schulterdrücken",
  "Kurzhantel-Schulterdrücken",
  "Seitheben",
  "Klimmzüge",
  "Latzug",
  "Rudern vorgebeugt",
  "Kurzhantelrudern",
  "Kabelrudern",
  "Face Pulls",
  "Butterfly",
  "Kabelzug-Crossover",
  "Liegestütze",
  "Dips",
  "Bizepscurls",
  "Hammercurls",
  "Trizepsdrücken am Kabel",
  "French Press",
  "Ausfallschritte",
  "Bulgarische Split-Kniebeuge",
  "Step-ups",
  "Hip Thrust",
  "Glute Bridge",
  "Beinpresse",
  "Beinstrecker",
  "Beinbeuger",
  "Wadenheben",
  "Plank",
  "Seitstütz",
  "Crunches",
  "Hängendes Beinheben",
  "Russian Twist",
  "Mountain Climbers",
  "Burpees",
  "Kettlebell Swings",
  "Seilspringen",
  "Laufband",
  "Rudergerät",
  "Fahrrad-Ergometer",
];

const PASTI = ["Frühstück", "Snack", "Mittagessen", "Pre-Workout", "Post-Workout", "Abendessen", "Spätmahlzeit"];

function sposta<T>(lista: T[], i: number, passo: number): T[] {
  const j = i + passo;
  if (j < 0 || j >= lista.length) return lista;
  const c = lista.slice();
  [c[i], c[j]] = [c[j], c[i]];
  return c;
}

export default function EditorGiorno({
  clienteId,
  data,
  modulo,
  onModulo,
  giornata,
  sporco,
  avviso,
  onSalvato,
  onEliminato,
  onChiudi,
  onCopiato,
}: {
  clienteId: string;
  data: DataISO;
  modulo: Modulo;
  onModulo: (f: (m: Modulo) => Modulo) => void;
  giornata: Giornata | null;
  sporco: boolean;
  /** Conferma "modifiche non salvate" chiesta dal genitore. */
  avviso?: ReactNode;
  onSalvato: (g: Giornata) => void;
  onEliminato: () => void;
  onChiudi: () => void;
  onCopiato: () => void;
}) {
  const [salvando, setSalvando] = useState(false);
  const [errori, setErrori] = useState<string[]>([]);
  const [chiediElimina, setChiediElimina] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  // la riga appena aggiunta prende il fuoco (autoFocus vale solo al montaggio)
  const [fuoco, setFuoco] = useState<string | null>(null);

  // Sul telefono l'editor copre la pagina: blocco lo scorrimento sotto.
  useEffect(() => {
    if (!window.matchMedia("(max-width: 1279px)").matches) return;
    const prima = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prima;
    };
  }, []);

  const m = modulo;
  const set = (patch: Partial<Modulo>) => onModulo((x) => ({ ...x, ...patch }));

  /* ------------------------------------------------------- esercizi */
  const setEs = (id: string, patch: Partial<FormEsercizio>) =>
    onModulo((x) => ({ ...x, esercizi: x.esercizi.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));
  const aggiungiEsercizio = () => {
    const e = nuovoEsercizio();
    onModulo((x) => ({ ...x, esercizi: [...x.esercizi, e] }));
    setFuoco(e.id);
  };

  /* ----------------------------------------------------------- pasti */
  const setPasto = (id: string, patch: Partial<FormPasto>) =>
    onModulo((x) => ({ ...x, pasti: x.pasti.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  const setVoce = (pid: string, vid: string, patch: Partial<FormVoce>) =>
    onModulo((x) => ({
      ...x,
      pasti: x.pasti.map((p) =>
        p.id === pid ? { ...p, voci: p.voci.map((v) => (v.id === vid ? { ...v, ...patch } : v)) } : p
      ),
    }));
  /** Voce nuova subito dopo `dopo` (o in fondo): Invio in una voce ne apre un'altra. */
  const aggiungiVoce = (pid: string, dopo?: string) => {
    const v = nuovaVoce();
    onModulo((x) => ({
      ...x,
      pasti: x.pasti.map((p) => {
        if (p.id !== pid) return p;
        const i = dopo ? p.voci.findIndex((y) => y.id === dopo) : -1;
        const voci = p.voci.slice();
        voci.splice(i >= 0 ? i + 1 : voci.length, 0, v);
        return { ...p, voci };
      }),
    }));
    setFuoco(v.id);
  };
  const aggiungiPasto = () => {
    const p = nuovoPasto();
    onModulo((x) => ({ ...x, pasti: [...x.pasti, p] }));
    setFuoco(p.id);
  };
  /** Frühstück, Mittagessen, Snack, Abendessen: aggiunge solo quelli che mancano. */
  const pastiStandard = () =>
    onModulo((x) => {
      const nomi = new Set(x.pasti.map((p) => p.nome.trim().toLowerCase()));
      const nuovi = PASTI_STANDARD.filter(([n]) => !nomi.has(n.toLowerCase())).map(([n, o]) => nuovoPasto(n, o));
      const pasti = [...x.pasti, ...nuovi];
      // se hanno tutti l'orario, in ordine di orario (lo Snack non finisce dopo la cena)
      if (pasti.every((p) => p.orario)) pasti.sort((a, b) => a.orario.localeCompare(b.orario));
      return { ...x, pasti };
    });

  /* ----------------------------------------------------- salva/elimina */
  async function salva() {
    const err = valida(m);
    if (err.length) return setErrori(err);
    const piano = pulisci(m);
    if (pianoVuoto(piano))
      return setErrori(["Il giorno è vuoto: scrivi qualcosa, segnalo come riposo, oppure usa «Elimina giorno» in fondo."]);
    setErrori([]);
    setSalvando(true);
    try {
      const r = await api<{ giornata: Giornata }>(`${BASE}/${clienteId}/giornate/${data}`, { method: "PUT", body: piano });
      onSalvato(r.giornata);
    } catch (e) {
      setErrori([testoErrore(e)]);
    } finally {
      setSalvando(false);
    }
  }

  async function elimina() {
    setEliminando(true);
    setErrori([]);
    try {
      await api(`${BASE}/${clienteId}/giornate/${data}`, { method: "DELETE" });
      setChiediElimina(false);
      onEliminato();
    } catch (e) {
      setErrori([testoErrore(e)]);
    } finally {
      setEliminando(false);
    }
  }

  const stato = salvando
    ? { testo: "Salvo…", punto: "bg-crm-spento" }
    : sporco
      ? { testo: "Modifiche non salvate", punto: "bg-[#ffb800]" }
      : giornata
        ? { testo: `Salvato · ${momento(giornata.aggiornatoAt)}`, punto: "bg-crm-verde" }
        : { testo: "Giorno vuoto", punto: "bg-[#cccccc]" };

  const kcalPasti = sommaKcal(m);
  const eserciziScritti = m.esercizi.filter((e) => e.nome.trim()).length;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-crm-fondo xl:sticky xl:bottom-auto xl:left-auto xl:right-auto xl:top-[68px] xl:z-auto xl:h-[calc(100dvh-92px)] xl:overflow-hidden xl:rounded-[20px] xl:shadow-crm-pop">
      {/* --------------------------------------------------------- testata */}
      <header className="flex shrink-0 items-center gap-2 border-b border-crm-filo bg-white px-2 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-3 xl:py-2.5 xl:pl-3 xl:pr-4">
        <button
          type="button"
          onClick={onChiudi}
          aria-label="Chiudi il giorno"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-crm-tenue transition-colors hover:bg-black/[0.05] hover:text-crm-ink xl:h-8 xl:w-8"
        >
          <ArrowLeft className="h-5 w-5 xl:hidden" />
          <X className="hidden h-4 w-4 xl:block" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-[650] capitalize leading-5 tracking-[-0.01em] text-crm-ink">{dataLunga(data)}</p>
          <p className="flex items-center gap-1.5 text-[12px] leading-4 text-crm-tenue">
            <span className={cx("h-2 w-2 shrink-0 rounded-full", stato.punto)} />
            <span className="truncate">{stato.testo}</span>
          </p>
        </div>
        <button type="button" onClick={salva} disabled={salvando || !sporco} className="crm-btn-primario shrink-0 max-sm:min-h-9 max-sm:px-4">
          <Save className="h-3.5 w-3.5" /> {salvando ? "Salvo…" : "Salva"}
        </button>
      </header>

      {(avviso || errori.length > 0) && (
        <div className="shrink-0 space-y-2 border-b border-crm-filo bg-white p-3">
          {avviso}
          {errori.length > 0 && <Errore testo={errori.join("\n")} />}
        </div>
      )}

      <div className="crm-pannello flex-1 overflow-y-auto overscroll-contain">
        <datalist id="app-esercizi">
          {ESERCIZI.map((e) => (
            <option key={e} value={e} />
          ))}
        </datalist>
        <datalist id="app-pasti">
          {PASTI.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>

        <div className="space-y-3 p-3 sm:p-4">
          <fieldset disabled={salvando || eliminando} className="min-w-0 space-y-3">
            {/* ------------------------------------------------------ riposo */}
            <div className="crm-card flex items-center gap-3 px-4 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crm-fondo-2 text-crm-tenue">
                <Moon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-[650] leading-5 text-crm-ink">Giorno di riposo</p>
                <p className="text-[12px] leading-4 text-crm-tenue">Il cliente vede «Riposo». L&apos;alimentazione resta.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={m.riposo}
                aria-label="Giorno di riposo"
                onClick={() => set({ riposo: !m.riposo })}
                className={cx(
                  "relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crm-blu",
                  m.riposo ? "bg-crm-ink" : "bg-[#e3e3e3] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
                )}
              >
                <span
                  className={cx(
                    "absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-all",
                    m.riposo ? "left-[calc(100%-25px)]" : "left-[3px]"
                  )}
                />
              </button>
            </div>

            {/* ------------------------------------------------- allenamento */}
            <Sezione icona={<Dumbbell className="h-4 w-4" />} titolo="Allenamento">
              {m.riposo ? (
                <p className="text-[13px] leading-5 text-crm-tenue">
                  Giorno di riposo: niente allenamento.
                  {eserciziScritti > 0 &&
                    ` ${eserciziScritti === 1 ? "L'esercizio scritto viene tolto" : `Gli ${eserciziScritti} esercizi scritti vengono tolti`} quando salvi (togli la spunta per tenerli).`}
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-2">
                    <Campo etichetta="Titolo">
                      <input value={m.titolo} onChange={(e) => set({ titolo: e.target.value })} className={CAMPO} placeholder="Oberkörper A" />
                    </Campo>
                    <Campo etichetta="Durata">
                      <input value={m.durata} onChange={(e) => set({ durata: e.target.value })} className={CAMPO} placeholder="60 min" />
                    </Campo>
                  </div>

                  {m.esercizi.map((e, i) => (
                    <RigaEsercizio
                      key={e.id}
                      e={e}
                      n={i + 1}
                      primo={i === 0}
                      ultimo={i === m.esercizi.length - 1}
                      fuoco={fuoco === e.id}
                      onCambia={(patch) => setEs(e.id, patch)}
                      onSposta={(passo) => onModulo((x) => ({ ...x, esercizi: sposta(x.esercizi, i, passo) }))}
                      onTogli={() => onModulo((x) => ({ ...x, esercizi: x.esercizi.filter((y) => y.id !== e.id) }))}
                    />
                  ))}

                  <button type="button" onClick={aggiungiEsercizio} className="crm-btn max-sm:min-h-9">
                    <Plus className="h-3.5 w-3.5" /> Aggiungi esercizio
                  </button>

                  <Campo etichetta="Note sull'allenamento">
                    <textarea
                      value={m.noteAllenamento}
                      onChange={(e) => set({ noteAllenamento: e.target.value })}
                      className={CAMPO}
                      rows={2}
                      placeholder="z. B. 10 min Aufwärmen auf dem Laufband"
                    />
                  </Campo>
                </div>
              )}
            </Sezione>

            {/* ------------------------------------------------ alimentazione */}
            <Sezione icona={<Utensils className="h-4 w-4" />} titolo="Alimentazione">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  <Campo etichetta="Kcal">
                    <input value={m.kcal} onChange={(e) => set({ kcal: e.target.value })} className={CAMPO} inputMode="numeric" placeholder="2000" />
                  </Campo>
                  <Campo etichetta="Proteine (g)">
                    <input value={m.proteine} onChange={(e) => set({ proteine: e.target.value })} className={CAMPO} inputMode="numeric" placeholder="140" />
                  </Campo>
                  <Campo etichetta="Carboidr. (g)">
                    <input value={m.carboidrati} onChange={(e) => set({ carboidrati: e.target.value })} className={CAMPO} inputMode="numeric" placeholder="220" />
                  </Campo>
                  <Campo etichetta="Grassi (g)">
                    <input value={m.grassi} onChange={(e) => set({ grassi: e.target.value })} className={CAMPO} inputMode="numeric" placeholder="60" />
                  </Campo>
                  <Campo etichetta="Acqua" className="col-span-2 sm:col-span-1">
                    <input value={m.acqua} onChange={(e) => set({ acqua: e.target.value })} className={CAMPO} placeholder="3 l" />
                  </Campo>
                </div>

                {kcalPasti > 0 && (
                  <p className="text-[12px] leading-4 text-crm-tenue">
                    Somma dei pasti:{" "}
                    <span className="font-[650] tabular-nums text-crm-ink">{kcalPasti.toLocaleString("it-IT")} kcal</span>
                    {Number(m.kcal) > 0 && ` su ${Number(m.kcal).toLocaleString("it-IT")} dell'obiettivo`}
                  </p>
                )}

                {m.pasti.map((p, i) => (
                  <RigaPasto
                    key={p.id}
                    p={p}
                    primo={i === 0}
                    ultimo={i === m.pasti.length - 1}
                    fuoco={fuoco}
                    onCambia={(patch) => setPasto(p.id, patch)}
                    onVoce={(vid, patch) => setVoce(p.id, vid, patch)}
                    onAggiungiVoce={(dopo) => aggiungiVoce(p.id, dopo)}
                    onTogliVoce={(vid) => setPasto(p.id, { voci: p.voci.filter((v) => v.id !== vid) })}
                    onSposta={(passo) => onModulo((x) => ({ ...x, pasti: sposta(x.pasti, i, passo) }))}
                    onTogli={() => onModulo((x) => ({ ...x, pasti: x.pasti.filter((y) => y.id !== p.id) }))}
                  />
                ))}

                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={aggiungiPasto} className="crm-btn max-sm:min-h-9">
                    <Plus className="h-3.5 w-3.5" /> Aggiungi pasto
                  </button>
                  <button type="button" onClick={pastiStandard} className="crm-btn-piatto max-sm:min-h-9">
                    <ListPlus className="h-3.5 w-3.5" /> Pasti standard
                  </button>
                </div>

                <Campo etichetta="Note sull'alimentazione">
                  <textarea
                    value={m.noteAlimentazione}
                    onChange={(e) => set({ noteAlimentazione: e.target.value })}
                    className={CAMPO}
                    rows={2}
                    placeholder="z. B. Gemüse nach Belieben, kein Zucker im Kaffee"
                  />
                </Campo>
              </div>
            </Sezione>

            {/* ----------------------------------------------------- nota */}
            <Sezione icona={<StickyNote className="h-4 w-4" />} titolo="Nota del coach per il cliente">
              <Campo etichetta="La legge in cima al giorno, nell'app">
                <textarea
                  value={m.notaCoach}
                  onChange={(e) => set({ notaCoach: e.target.value })}
                  className={CAMPO}
                  rows={3}
                  placeholder="z. B. Heute locker bleiben und viel trinken!"
                />
              </Campo>
            </Sezione>
          </fieldset>

          {/* ------------------------------------------- risposta del cliente */}
          <Sezione icona={<MessageSquare className="h-4 w-4" />} titolo="Risposta del cliente">
            <Risposta g={giornata} />
          </Sezione>

          {/* ------------------------------------------------- copia e ripeti */}
          <Sezione icona={<CopyPlus className="h-4 w-4" />} titolo="Copia e ripeti">
            <StrumentiCopia
              clienteId={clienteId}
              data={data}
              esisteGiorno={!!giornata}
              sporco={sporco}
              onCopiato={onCopiato}
            />
          </Sezione>

          {/* ------------------------------------------------------ elimina */}
          {giornata && (
            <div className="pb-[max(1rem,env(safe-area-inset-bottom))]">
              {chiediElimina ? (
                <Conferma
                  pericolo
                  testo={
                    <>
                      Elimino il piano di <b className="capitalize">{dataLunga(data)}</b>? Il cliente non lo vede più e la sua risposta
                      di quel giorno sparisce.
                    </>
                  }
                  conferma="Elimina il giorno"
                  occupato={eliminando}
                  onConferma={elimina}
                  onAnnulla={() => setChiediElimina(false)}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setChiediElimina(true)}
                  className="crm-btn-piatto text-crm-rosso hover:bg-[#fff1f1] max-sm:min-h-9"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Elimina giorno
                </button>
              )}
            </div>
          )}
          {!giornata && <div className="pb-[max(0.25rem,env(safe-area-inset-bottom))]" />}
        </div>
      </div>
    </div>
  );
}

/* ================================================================ pezzi */

function Sezione({ icona, titolo, children }: { icona: ReactNode; titolo: string; children: ReactNode }) {
  return (
    <section className="crm-card p-4">
      <h3 className="mb-3 flex items-center gap-2 text-[13px] font-[650] leading-5 text-crm-ink">
        <span className="text-crm-spento">{icona}</span>
        {titolo}
      </h3>
      {children}
    </section>
  );
}

/** Il nome di esercizio o pasto nella testatina della riga: campo "piatto" che si accende al tocco. */
const NOME_RIGA =
  "min-w-0 flex-1 rounded-lg bg-transparent px-2 py-1.5 text-base font-[550] text-crm-ink outline-none transition-shadow placeholder:font-normal placeholder:text-crm-spento hover:bg-white/70 focus:bg-white focus:shadow-crm-campo sm:text-[13px]";

/** Etichetta dei campi piccoli dentro le righe. */
const ETICHETTA_RIGA = "mb-1 block text-[12px] font-[550] leading-4 text-crm-tenue";

function RigaEsercizio({
  e,
  n,
  primo,
  ultimo,
  fuoco,
  onCambia,
  onSposta,
  onTogli,
}: {
  e: FormEsercizio;
  n: number;
  primo: boolean;
  ultimo: boolean;
  fuoco: boolean;
  onCambia: (patch: Partial<FormEsercizio>) => void;
  onSposta: (passo: number) => void;
  onTogli: () => void;
}) {
  const piccolo = (k: "serie" | "ripetizioni" | "carico" | "pausa", etichetta: string, segnaposto: string) => (
    <label className="block min-w-0">
      <span className={ETICHETTA_RIGA}>{etichetta}</span>
      <input value={e[k]} onChange={(ev) => onCambia({ [k]: ev.target.value })} className={CAMPO_PICCOLO} placeholder={segnaposto} />
    </label>
  );
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-crm-anello">
      <div className="flex items-center gap-1 border-b border-crm-filo bg-crm-fondo py-1 pl-2 pr-1">
        <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-black/[0.06] px-1 text-[11px] font-[650] tabular-nums text-crm-tenue">
          {n}
        </span>
        <input
          value={e.nome}
          onChange={(ev) => onCambia({ nome: ev.target.value })}
          list="app-esercizi"
          autoFocus={fuoco}
          placeholder="Esercizio, es. Kniebeuge"
          aria-label={`Nome dell'esercizio ${n}`}
          className={NOME_RIGA}
        />
        <BtnIcona titolo="Sposta su" onClick={() => onSposta(-1)} disabled={primo}>
          <ArrowUp className="h-3.5 w-3.5" />
        </BtnIcona>
        <BtnIcona titolo="Sposta giù" onClick={() => onSposta(1)} disabled={ultimo}>
          <ArrowDown className="h-3.5 w-3.5" />
        </BtnIcona>
        <BtnIcona titolo="Togli esercizio" onClick={onTogli} pericolo>
          <Trash2 className="h-3.5 w-3.5" />
        </BtnIcona>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
        {piccolo("serie", "Serie", "4")}
        {piccolo("ripetizioni", "Ripetizioni", "8-10")}
        {piccolo("carico", "Carico", "60 kg")}
        {piccolo("pausa", "Pausa", "90 s")}
      </div>
      <div className="grid gap-2 px-3 pb-3 sm:grid-cols-2">
        <label className="block min-w-0">
          <span className={ETICHETTA_RIGA}>Note</span>
          <input value={e.note} onChange={(ev) => onCambia({ note: ev.target.value })} className={CAMPO_PICCOLO} placeholder="z. B. langsam runter, 3 s" />
        </label>
        <label className="block min-w-0">
          <span className={ETICHETTA_RIGA}>Link video</span>
          <input
            value={e.video}
            onChange={(ev) => onCambia({ video: ev.target.value })}
            className={CAMPO_PICCOLO}
            type="url"
            inputMode="url"
            placeholder="https://youtube.com/…"
          />
        </label>
      </div>
    </div>
  );
}

function RigaPasto({
  p,
  primo,
  ultimo,
  fuoco,
  onCambia,
  onVoce,
  onAggiungiVoce,
  onTogliVoce,
  onSposta,
  onTogli,
}: {
  p: FormPasto;
  primo: boolean;
  ultimo: boolean;
  fuoco: string | null;
  onCambia: (patch: Partial<FormPasto>) => void;
  onVoce: (vid: string, patch: Partial<FormVoce>) => void;
  onAggiungiVoce: (dopo?: string) => void;
  onTogliVoce: (vid: string) => void;
  onSposta: (passo: number) => void;
  onTogli: () => void;
}) {
  // Invio in una voce = voce nuova sotto (si scrive la lista di fila).
  const invio = (vid: string) => (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter" && !ev.nativeEvent.isComposing) {
      ev.preventDefault();
      onAggiungiVoce(vid);
    }
  };
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-crm-anello">
      <div className="flex items-center gap-1 border-b border-crm-filo bg-crm-fondo py-1 pl-1 pr-1">
        <input
          value={p.nome}
          onChange={(ev) => onCambia({ nome: ev.target.value })}
          list="app-pasti"
          autoFocus={fuoco === p.id}
          placeholder="Pasto, es. Frühstück"
          aria-label="Nome del pasto"
          className={NOME_RIGA}
        />
        <input
          type="time"
          value={p.orario}
          onChange={(ev) => onCambia({ orario: ev.target.value })}
          aria-label="Orario del pasto"
          className="crm-campo w-[96px] shrink-0 px-2 tabular-nums"
        />
        <BtnIcona titolo="Sposta su" onClick={() => onSposta(-1)} disabled={primo}>
          <ArrowUp className="h-3.5 w-3.5" />
        </BtnIcona>
        <BtnIcona titolo="Sposta giù" onClick={() => onSposta(1)} disabled={ultimo}>
          <ArrowDown className="h-3.5 w-3.5" />
        </BtnIcona>
        <BtnIcona titolo="Togli pasto" onClick={onTogli} pericolo>
          <Trash2 className="h-3.5 w-3.5" />
        </BtnIcona>
      </div>

      <div className="space-y-1.5 p-3">
        {p.voci.map((v) => (
          <div key={v.id} className="flex items-center gap-1.5">
            <input
              value={v.testo}
              onChange={(ev) => onVoce(v.id, { testo: ev.target.value })}
              onKeyDown={invio(v.id)}
              autoFocus={fuoco === v.id}
              placeholder="Alimento, es. Haferflocken"
              aria-label="Alimento"
              className={`${CAMPO_PICCOLO} min-w-0 flex-1`}
            />
            <div className="w-20 shrink-0 sm:w-24">
              <input
                value={v.quantita}
                onChange={(ev) => onVoce(v.id, { quantita: ev.target.value })}
                onKeyDown={invio(v.id)}
                placeholder="80 g"
                aria-label="Quantità"
                className={CAMPO_PICCOLO}
              />
            </div>
            <BtnIcona titolo="Togli voce" onClick={() => onTogliVoce(v.id)} pericolo>
              <X className="h-3.5 w-3.5" />
            </BtnIcona>
          </div>
        ))}
        <button type="button" onClick={() => onAggiungiVoce()} className="crm-btn-piatto -ml-2 text-crm-tenue hover:text-crm-ink">
          <Plus className="h-3.5 w-3.5" /> Voce
        </button>
      </div>

      <div className="grid grid-cols-[90px_minmax(0,1fr)] gap-2 px-3 pb-3">
        <label className="block min-w-0">
          <span className={ETICHETTA_RIGA}>Kcal</span>
          <input value={p.kcal} onChange={(ev) => onCambia({ kcal: ev.target.value })} className={CAMPO_PICCOLO} inputMode="numeric" placeholder="450" />
        </label>
        <label className="block min-w-0">
          <span className={ETICHETTA_RIGA}>Note</span>
          <input value={p.note} onChange={(ev) => onCambia({ note: ev.target.value })} className={CAMPO_PICCOLO} placeholder="z. B. oder 2 Scheiben Vollkornbrot" />
        </label>
      </div>
    </div>
  );
}

function Risposta({ g }: { g: Giornata | null }) {
  if (!g || (!g.fatto && !g.fatica && !g.feedback))
    return <p className="text-[13px] leading-5 text-crm-tenue">Il cliente non ha ancora risposto per questo giorno.</p>;
  return (
    <div className="space-y-3 text-[13px] leading-5">
      {g.fatto ? (
        <p>
          <span className="crm-badge crm-badge-ok">
            <CircleCheck className="h-3.5 w-3.5" /> Fatto{g.fattoAt ? `, segnato il ${momento(g.fattoAt)}` : ""}
          </span>
        </p>
      ) : (
        <p className="text-crm-tenue">Non segnato come fatto.</p>
      )}
      {g.fatica != null && (
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-[550] text-crm-tenue">Fatica</span>
          <span className="flex gap-1" aria-hidden>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={cx("h-2 w-5 rounded-full", n <= (g.fatica ?? 0) ? "bg-crm-ink" : "bg-black/10")} />
            ))}
          </span>
          <span className="text-[12px] font-[650] tabular-nums text-crm-ink">{g.fatica}/5</span>
        </div>
      )}
      {g.feedback && (
        <blockquote className="whitespace-pre-line rounded-xl bg-[#eef5ff] px-3 py-2.5 text-[13px] leading-5 text-crm-ink shadow-[inset_3px_0_0_#005bd3]">
          {g.feedback}
        </blockquote>
      )}
    </div>
  );
}
