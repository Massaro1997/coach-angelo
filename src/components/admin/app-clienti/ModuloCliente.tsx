"use client";

// Modulo dati del cliente dell'app: lo stesso per "Nuovo cliente" e "Modifica".

import { useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import { Btn, cx } from "../ui";
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
    <form onSubmit={invia} className="space-y-3">
      <fieldset disabled={salvando} className="grid gap-3 sm:grid-cols-2">
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
          <div className="flex border border-black/15 bg-white">
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
                  "flex-1 px-3 py-2 text-[13px] font-semibold",
                  d.lingua === k ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-black/5"
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
        <Btn type="submit" variant="brand" disabled={salvando}>
          <Check className="h-3.5 w-3.5" /> {salvando ? "Salvo…" : etichettaSalva}
        </Btn>
        <Btn variant="ghost" onClick={onAnnulla} disabled={salvando}>
          <X className="h-3.5 w-3.5" /> Annulla
        </Btn>
      </div>
    </form>
  );
}
