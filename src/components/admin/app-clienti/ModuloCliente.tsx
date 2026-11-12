"use client";

// Modulo dati del cliente dell'app: lo stesso per "Nuovo cliente" e "Modifica".

import { useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import { cx } from "../ui";
import type { ClienteApp, Lingua } from "@/lib/app-coaching/tipi";
import { CAMPO, Campo, Errore, testoErrore } from "./comune";

export type DatiCliente = {
  nome: string;
  email: string;
  telefono: string;
  lingua: Lingua;
  obiettivo: string;
  note: string;
};

export function datiDa(c?: ClienteApp | null): DatiCliente {
  return {
    nome: c?.nome ?? "",
    email: c?.email ?? "",
    telefono: c?.telefono ?? "",
    lingua: c?.lingua ?? "de",
    obiettivo: c?.obiettivo ?? "",
    note: c?.note ?? "",
  };
}

export default function ModuloCliente({
  iniziale,
  etichettaSalva,
  onSalva,
  onAnnulla,
}: {
  iniziale?: ClienteApp | null;
  etichettaSalva: string;
  /** Lancia un errore se il server rifiuta: il modulo lo mostra e resta aperto. */
  onSalva: (d: DatiCliente) => Promise<void>;
  onAnnulla: () => void;
}) {
  const [d, setD] = useState<DatiCliente>(() => datiDa(iniziale));
  const [salvando, setSalvando] = useState(false);
  const [errore, setErrore] = useState("");

  const cambia = <K extends keyof DatiCliente>(k: K, v: DatiCliente[K]) => setD((x) => ({ ...x, [k]: v }));

  async function invia(e: FormEvent) {
    e.preventDefault();
    if (!d.nome.trim()) return setErrore("Scrivi almeno il nome del cliente.");
    if (d.email.trim() && !/^\S+@\S+\.\S+$/.test(d.email.trim())) return setErrore("L'email non sembra giusta.");
    setSalvando(true);
    setErrore("");
    try {
      await onSalva({
        ...d,
        nome: d.nome.trim(),
        email: d.email.trim(),
        telefono: d.telefono.trim(),
        obiettivo: d.obiettivo.trim(),
        note: d.note.trim(),
      });
    } catch (err) {
      setErrore(testoErrore(err));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={invia} className="space-y-4">
      <fieldset disabled={salvando} className="grid gap-x-3 gap-y-4 sm:grid-cols-2">
        <Campo etichetta="Nome e cognome *">
          <input
            value={d.nome}
            onChange={(e) => cambia("nome", e.target.value)}
            className={CAMPO}
            autoComplete="off"
            placeholder="Lisa Müller"
            required
          />
        </Campo>
        <Campo etichetta="Lingua dell'app e dei messaggi">
          <div className="flex gap-0.5 rounded-xl bg-crm-fondo-2 p-0.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
            {(
              [
                ["de", "Tedesco"],
                ["it", "Italiano"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                type="button"
                onClick={() => cambia("lingua", k)}
                aria-pressed={d.lingua === k}
                className={cx(
                  "min-h-[30px] flex-1 rounded-[10px] px-3 py-1 text-[13px] font-[550] transition-colors max-sm:min-h-9",
                  d.lingua === k ? "bg-white text-crm-ink shadow-crm-anello" : "text-crm-tenue hover:bg-black/[0.04] hover:text-crm-ink"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </Campo>
        <Campo etichetta="Telefono" nota="Serve per mandare l'accesso su WhatsApp. 0176… va bene: il 49 lo metto io.">
          <input
            value={d.telefono}
            onChange={(e) => cambia("telefono", e.target.value)}
            className={CAMPO}
            type="tel"
            inputMode="tel"
            autoComplete="off"
            placeholder="0176 1234567"
          />
        </Campo>
        <Campo etichetta="Email">
          <input
            value={d.email}
            onChange={(e) => cambia("email", e.target.value)}
            className={CAMPO}
            type="email"
            inputMode="email"
            autoComplete="off"
            placeholder="lisa@example.de"
          />
        </Campo>
        <Campo etichetta="Obiettivo" nota="Lo vede anche il cliente nell'app." className="sm:col-span-2">
          <input
            value={d.obiettivo}
            onChange={(e) => cambia("obiettivo", e.target.value)}
            className={CAMPO}
            placeholder="z. B. 6 kg abnehmen bis März"
          />
        </Campo>
        <Campo etichetta="Note interne" nota="Solo per te e Natalie: il cliente non le vede." className="sm:col-span-2">
          <textarea
            value={d.note}
            onChange={(e) => cambia("note", e.target.value)}
            className={CAMPO}
            rows={3}
            placeholder="Infortuni, intolleranze, orari, cosa preferisce…"
          />
        </Campo>
      </fieldset>
      {errore && <Errore testo={errore} />}
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={salvando} className="crm-btn-primario max-sm:min-h-9">
          <Check className="h-3.5 w-3.5" /> {salvando ? "Salvo…" : etichettaSalva}
        </button>
        <button type="button" onClick={onAnnulla} disabled={salvando} className="crm-btn-piatto disabled:opacity-50 max-sm:min-h-9">
          <X className="h-3.5 w-3.5" /> Annulla
        </button>
      </div>
    </form>
  );
}
