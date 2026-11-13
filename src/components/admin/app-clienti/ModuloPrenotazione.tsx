"use client";

// Nuova prenotazione fatta dal coach (il cliente ha chiamato o scritto su
// WhatsApp): cliente, giorno, ora, luogo. Non passa dagli orari di
// Disponibilita': il coach puo' mettere un'ora anche fuori dalle sue fasce.

import { useEffect, useState, type FormEvent } from "react";
import { CalendarPlus, X } from "lucide-react";
import { cx } from "../ui";
import type { ClienteApp, DataISO } from "@/lib/app-coaching/tipi";
import type { PrenotazioneAdmin } from "@/lib/app-coaching/tipi-v2";
import { dataValida } from "@/lib/app-coaching/date";
import { api, BASE, CAMPO, Campo, Errore, dataLunga, testoErrore } from "./comune";
import { API, RE_ORA, attiva, minuti, ora, oraPulita } from "./dati-v2";

type Dati = {
  clienteId: string;
  data: DataISO;
  inizio: string;
  fine: string;
  luogo: string;
  tipo: "inclusa" | "extra";
};

export default function ModuloPrenotazione({
  oggi,
  esistenti,
  onCreata,
  onAnnulla,
}: {
  oggi: DataISO;
  /** per avvisare se a quell'ora il coach e' gia' occupato, e per suggerire i luoghi */
  esistenti: PrenotazioneAdmin[];
  onCreata: (p: PrenotazioneAdmin) => void;
  onAnnulla: () => void;
}) {
  const [clienti, setClienti] = useState<ClienteApp[] | null>(null);
  const [erroreClienti, setErroreClienti] = useState("");
  const [versione, setVersione] = useState(0);
  const [d, setD] = useState<Dati>({ clienteId: "", data: oggi, inizio: "", fine: "", luogo: "", tipo: "inclusa" });
  // la fine segue l'inizio (+1 ora) finche' il coach non la tocca
  const [fineToccata, setFineToccata] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    let vivo = true;
    api<{ clienti: ClienteApp[] }>(BASE)
      .then((j) => {
        if (!vivo) return;
        setClienti((j.clienti ?? []).filter((c) => c.attivo).sort((a, b) => a.nome.localeCompare(b.nome, "de")));
        setErroreClienti("");
      })
      .catch((e) => vivo && setErroreClienti(testoErrore(e)));
    return () => {
      vivo = false;
    };
  }, [versione]);

  const cambia = <K extends keyof Dati>(k: K, v: Dati[K]) => setD((x) => ({ ...x, [k]: v }));

  function cambiaInizio(v: string) {
    const i = oraPulita(v);
    setD((x) => ({ ...x, inizio: i, fine: !fineToccata && RE_ORA.test(i) ? ora(minuti(i) + 60) : x.fine }));
  }

  const luoghi = [...new Set(esistenti.map((p) => p.luogo?.trim()).filter((l): l is string => !!l))].sort();
  const oreOk = RE_ORA.test(d.inizio) && RE_ORA.test(d.fine) && minuti(d.fine) > minuti(d.inizio);
  // altre ore attive che si accavallano: il server rifiuta solo lo stesso inizio
  const accavallate = oreOk
    ? esistenti.filter(
        (p) =>
          p.data === d.data &&
          attiva(p) &&
          minuti(p.inizio) < minuti(d.fine) &&
          minuti(d.inizio) < minuti(p.fine)
      )
    : [];

  async function invia(e: FormEvent) {
    e.preventDefault();
    const cliente = clienti?.find((c) => c.id === d.clienteId);
    if (!cliente) return setErrore("Scegli il cliente.");
    if (!dataValida(d.data)) return setErrore("Scegli il giorno.");
    if (!RE_ORA.test(d.inizio)) return setErrore("Scrivi l'ora di inizio, per esempio 07:00.");
    if (!oreOk) return setErrore("La fine deve venire dopo l'inizio.");
    setSalvando(true);
    setErrore("");
    try {
      const body: Record<string, string> = { clienteId: d.clienteId, data: d.data, inizio: d.inizio, fine: d.fine, tipo: d.tipo };
      if (d.luogo.trim()) body.luogo = d.luogo.trim();
      const r = await api<{ prenotazione: PrenotazioneAdmin }>(API.prenotazioni, { method: "POST", body });
      // se la risposta non porta il nome del cliente, lo metto io: serve all'agenda
      onCreata({ ...r.prenotazione, clienteId: r.prenotazione.clienteId || cliente.id, clienteNome: r.prenotazione.clienteNome || cliente.nome });
    } catch (err) {
      setErrore(testoErrore(err));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={invia} className="space-y-4">
      {erroreClienti && <Errore testo={erroreClienti} onRiprova={() => setVersione((v) => v + 1)} />}
      <fieldset disabled={salvando} className="grid gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        <Campo etichetta="Cliente *" className="sm:col-span-2">
          <select value={d.clienteId} onChange={(e) => cambia("clienteId", e.target.value)} className={CAMPO} required>
            <option value="">{clienti === null ? "Carico i clienti…" : "Scegli il cliente"}</option>
            {(clienti ?? []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </Campo>
        <Campo etichetta="Giorno *" className="sm:col-span-2" nota={d.data < oggi ? "È un giorno passato." : undefined}>
          <input type="date" value={d.data} onChange={(e) => cambia("data", e.target.value)} className={CAMPO} required />
        </Campo>
        <Campo etichetta="Inizio *">
          <input type="time" step={900} value={d.inizio} onChange={(e) => cambiaInizio(e.target.value)} className={CAMPO} required />
        </Campo>
        <Campo etichetta="Fine *">
          <input
            type="time"
            step={900}
            value={d.fine}
            onChange={(e) => {
              setFineToccata(true);
              cambia("fine", oraPulita(e.target.value));
            }}
            className={CAMPO}
            required
          />
        </Campo>
        <Campo etichetta="Luogo" className="sm:col-span-2" nota="Facoltativo: lo vede il cliente nell'app.">
          <input
            value={d.luogo}
            onChange={(e) => cambia("luogo", e.target.value)}
            className={CAMPO}
            list="luoghi-prenotazione"
            placeholder="Studio, parco, a casa del cliente…"
            autoComplete="off"
          />
          <datalist id="luoghi-prenotazione">
            {luoghi.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>
        </Campo>
        <Campo
          etichetta="Tipo"
          className="sm:col-span-2"
          nota={d.tipo === "inclusa" ? "Conta tra le ore incluse del suo pacchetto." : "Ora in più, fuori dal pacchetto."}
        >
          <div className="flex gap-0.5 rounded-xl bg-crm-fondo-2 p-0.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
            {(
              [
                ["inclusa", "Inclusa nel pacchetto"],
                ["extra", "Ora extra"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                type="button"
                onClick={() => cambia("tipo", k)}
                aria-pressed={d.tipo === k}
                className={cx(
                  "min-h-[30px] flex-1 rounded-[10px] px-3 py-1 text-[13px] font-[550] transition-colors max-sm:min-h-9",
                  d.tipo === k ? "bg-white text-crm-ink shadow-crm-anello" : "text-crm-tenue hover:bg-black/[0.04] hover:text-crm-ink"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </Campo>
      </fieldset>

      {accavallate.length > 0 && (
        <p className="rounded-xl bg-[#fff7d1] px-3 py-2 text-[13px] leading-5 text-crm-attesa-ink shadow-[inset_0_0_0_1px_rgba(178,132,0,0.2)]">
          <span className="capitalize">{dataLunga(d.data)}</span> a quell&apos;ora hai già{" "}
          {accavallate.map((p) => `${p.clienteNome} (${p.inizio}–${p.fine})`).join(", ")}.
        </p>
      )}
      {errore && <Errore testo={errore} />}
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={salvando || clienti === null} className="crm-btn-primario max-sm:min-h-9">
          <CalendarPlus className="h-3.5 w-3.5" /> {salvando ? "Creo…" : "Crea prenotazione"}
        </button>
        <button type="button" onClick={onAnnulla} disabled={salvando} className="crm-btn-piatto disabled:opacity-50 max-sm:min-h-9">
          <X className="h-3.5 w-3.5" /> Annulla
        </button>
      </div>
    </form>
  );
}
