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
import { Btn, cx } from "../ui";
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
    ? { testo: "Salvo…", punto: "bg-neutral-400" }
    : sporco
      ? { testo: "Modifiche non salvate", punto: "bg-amber-500" }
      : giornata
        ? { testo: `Salvato · ${momento(giornata.aggiornatoAt)}`, punto: "bg-green-600" }
        : { testo: "Giorno vuoto", punto: "bg-neutral-300" };

  const kcalPasti = sommaKcal(m);
  const eserciziScritti = m.esercizi.filter((e) => e.nome.trim()).length;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#f4f4f5] xl:sticky xl:bottom-auto xl:left-auto xl:right-auto xl:top-[68px] xl:z-auto xl:h-[calc(100dvh-92px)] xl:border xl:border-black/10">
      {/* --------------------------------------------------------- testata */}
      <header className="flex items-center gap-2 border-b border-black/10 bg-white px-2 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-3 xl:pt-2">
        <button
          type="button"
          onClick={onChiudi}
          aria-label="Chiudi il giorno"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-neutral-600 hover:bg-black/5"
        >
          <ArrowLeft className="h-5 w-5 xl:hidden" />
          <X className="hidden h-4 w-4 xl:block" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold capitalize text-neutral-900">{dataLunga(data)}</p>
          <p className="flex items-center gap-1.5 text-[11px] text-neutral-500">
            <span className={cx("h-1.5 w-1.5 shrink-0 rounded-full", stato.punto)} />
            <span className="truncate">{stato.testo}</span>
          </p>
        </div>
        <Btn variant="brand" onClick={salva} disabled={salvando || !sporco} className="shrink-0">
          <Save className="h-3.5 w-3.5" /> {salvando ? "Salvo…" : "Salva"}
        </Btn>
      </header>

      {(avviso || errori.length > 0) && (
        <div className="space-y-2 border-b border-black/10 bg-white p-3">
          {avviso}
          {errori.length > 0 && <Errore testo={errori.join("\n")} />}
        </div>
      )}

      <div className="flex-1 overflow-y-auto overscroll-contain">
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

        <fieldset disabled={salvando || eliminando} className="min-w-0">
          {/* ------------------------------------------------------ riposo */}
          <div className="flex items-center gap-3 border-b border-black/[0.07] bg-white px-4 py-3">
            <Moon className="h-4 w-4 shrink-0 text-neutral-400" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-neutral-900">Giorno di riposo</p>
              <p className="text-[11px] leading-snug text-neutral-500">Il cliente vede «Riposo». L&apos;alimentazione resta.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={m.riposo}
              aria-label="Giorno di riposo"
              onClick={() => set({ riposo: !m.riposo })}
              className={cx(
                "relative h-7 w-12 shrink-0 border transition-colors",
                m.riposo ? "border-neutral-900 bg-neutral-900" : "border-black/20 bg-[#e4e4e7]"
              )}
            >
              <span
                className={cx(
                  "absolute top-0.5 h-[22px] w-[22px] bg-white shadow-sm transition-all",
                  m.riposo ? "left-[calc(100%-24px)]" : "left-0.5"
                )}
              />
            </button>
          </div>

          {/* ------------------------------------------------- allenamento */}
          <Sezione icona={<Dumbbell className="h-4 w-4" />} titolo="Allenamento">
            {m.riposo ? (
              <p className="text-[12px] text-neutral-500">
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

                <Btn size="sm" variant="outline" onClick={aggiungiEsercizio}>
                  <Plus className="h-3 w-3" /> Aggiungi esercizio
                </Btn>

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
                <p className="text-[11px] text-neutral-500">
                  Somma dei pasti:{" "}
                  <span className="font-semibold tabular-nums text-neutral-800">{kcalPasti.toLocaleString("it-IT")} kcal</span>
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
                <Btn size="sm" variant="outline" onClick={aggiungiPasto}>
                  <Plus className="h-3 w-3" /> Aggiungi pasto
                </Btn>
                <Btn size="sm" variant="ghost" onClick={pastiStandard}>
                  <ListPlus className="h-3 w-3" /> Pasti standard
                </Btn>
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
          <div className="px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
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
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" /> Elimina giorno
              </button>
            )}
          </div>
        )}
        {!giornata && <div className="pb-[max(1rem,env(safe-area-inset-bottom))]" />}
      </div>
    </div>
  );
}

/* ================================================================ pezzi */

function Sezione({ icona, titolo, children }: { icona: ReactNode; titolo: string; children: ReactNode }) {
  return (
    <section className="border-b border-black/[0.07] bg-white px-4 py-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-900">
        <span className="text-neutral-400">{icona}</span>
        {titolo}
      </h3>
      {children}
    </section>
  );
}

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
      <span className="mb-0.5 block text-[10px] font-semibold text-neutral-500">{etichetta}</span>
      <input value={e[k]} onChange={(ev) => onCambia({ [k]: ev.target.value })} className={CAMPO_PICCOLO} placeholder={segnaposto} />
    </label>
  );
  return (
    <div className="border border-black/10 bg-white">
      <div className="flex items-center gap-1 border-b border-black/[0.06] bg-[#fafafa] py-1 pl-2 pr-1">
        <span className="w-5 shrink-0 text-center text-[11px] font-bold tabular-nums text-neutral-400">{n}</span>
        <input
          value={e.nome}
          onChange={(ev) => onCambia({ nome: ev.target.value })}
          list="app-esercizi"
          autoFocus={fuoco}
          placeholder="Esercizio, es. Kniebeuge"
          aria-label={`Nome dell'esercizio ${n}`}
          className="min-w-0 flex-1 border border-transparent bg-transparent px-1.5 py-1.5 text-base font-semibold text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white sm:text-sm"
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
      <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-4">
        {piccolo("serie", "Serie", "4")}
        {piccolo("ripetizioni", "Ripetizioni", "8-10")}
        {piccolo("carico", "Carico", "60 kg")}
        {piccolo("pausa", "Pausa", "90 s")}
      </div>
      <div className="grid gap-2 px-2 pb-2 sm:grid-cols-2">
        <label className="block min-w-0">
          <span className="mb-0.5 block text-[10px] font-semibold text-neutral-500">Note</span>
          <input value={e.note} onChange={(ev) => onCambia({ note: ev.target.value })} className={CAMPO_PICCOLO} placeholder="z. B. langsam runter, 3 s" />
        </label>
        <label className="block min-w-0">
          <span className="mb-0.5 block text-[10px] font-semibold text-neutral-500">Link video</span>
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
    <div className="border border-black/10 bg-white">
      <div className="flex items-center gap-1 border-b border-black/[0.06] bg-[#fafafa] py-1 pl-1 pr-1">
        <input
          value={p.nome}
          onChange={(ev) => onCambia({ nome: ev.target.value })}
          list="app-pasti"
          autoFocus={fuoco === p.id}
          placeholder="Pasto, es. Frühstück"
          aria-label="Nome del pasto"
          className="min-w-0 flex-1 border border-transparent bg-transparent px-1.5 py-1.5 text-base font-semibold text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white sm:text-sm"
        />
        <input
          type="time"
          value={p.orario}
          onChange={(ev) => onCambia({ orario: ev.target.value })}
          aria-label="Orario del pasto"
          className="w-[92px] shrink-0 border border-black/10 bg-white px-1.5 py-1 text-base tabular-nums text-neutral-900 outline-none focus:border-neutral-900 sm:text-[13px]"
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

      <div className="space-y-1.5 p-2">
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
        <button
          type="button"
          onClick={() => onAggiungiVoce()}
          className="inline-flex items-center gap-1 py-1 text-[12px] font-semibold text-neutral-500 hover:text-neutral-900"
        >
          <Plus className="h-3 w-3" /> Voce
        </button>
      </div>

      <div className="grid grid-cols-[90px_minmax(0,1fr)] gap-2 px-2 pb-2">
        <label className="block min-w-0">
          <span className="mb-0.5 block text-[10px] font-semibold text-neutral-500">Kcal</span>
          <input value={p.kcal} onChange={(ev) => onCambia({ kcal: ev.target.value })} className={CAMPO_PICCOLO} inputMode="numeric" placeholder="450" />
        </label>
        <label className="block min-w-0">
          <span className="mb-0.5 block text-[10px] font-semibold text-neutral-500">Note</span>
          <input value={p.note} onChange={(ev) => onCambia({ note: ev.target.value })} className={CAMPO_PICCOLO} placeholder="z. B. oder 2 Scheiben Vollkornbrot" />
        </label>
      </div>
    </div>
  );
}

function Risposta({ g }: { g: Giornata | null }) {
  if (!g || (!g.fatto && !g.fatica && !g.feedback))
    return <p className="text-[12px] text-neutral-400">Il cliente non ha ancora risposto per questo giorno.</p>;
  return (
    <div className="space-y-2.5 text-sm">
      {g.fatto ? (
        <p className="flex items-center gap-1.5 font-semibold text-green-700">
          <CircleCheck className="h-4 w-4" /> Fatto{g.fattoAt ? `, segnato il ${momento(g.fattoAt)}` : ""}
        </p>
      ) : (
        <p className="text-neutral-500">Non segnato come fatto.</p>
      )}
      {g.fatica != null && (
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-neutral-500">Fatica</span>
          <span className="flex gap-0.5" aria-hidden>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={cx("h-3 w-5", n <= (g.fatica ?? 0) ? "bg-gold" : "bg-black/10")} />
            ))}
          </span>
          <span className="text-[12px] font-bold tabular-nums text-neutral-900">{g.fatica}/5</span>
        </div>
      )}
      {g.feedback && (
        <blockquote className="whitespace-pre-line border-l-2 border-blue-600 bg-blue-50/60 px-3 py-2 text-[13px] leading-relaxed text-neutral-800">
          {g.feedback}
        </blockquote>
      )}
    </div>
  );
}
