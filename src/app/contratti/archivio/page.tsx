"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DocItem {
  id: string;
  type: string;
  clientName: string;
  serviceType: string | null;
  rechnungNr: string | null;
  total: number;
  contractData: Record<string, unknown> | null;
  rechnungData: Record<string, unknown> | null;
  createdAt: string;
}

export default function ArchivioPage() {
  const router = useRouter();
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "contract" | "rechnung">("all");
  const [query, setQuery] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/documents")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDocs(data);
        else setError("Errore nel caricamento");
      })
      .catch(() => setError("Errore di connessione"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const reopen = (d: DocItem) => {
    sessionStorage.setItem("contrattiReopen", JSON.stringify({
      type: d.type,
      contractData: d.contractData,
      rechnungData: d.rechnungData,
    }));
    router.push("/contratti");
  };

  const remove = async (id: string) => {
    if (!confirm("Eliminare questo documento dall'archivio?")) return;
    await fetch(`/api/documents/${id}`, { method: "DELETE" });
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const filtered = docs.filter((d) => {
    if (filter !== "all" && d.type !== filter) return false;
    if (query && !d.clientName.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-900 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/contratti" className="text-white/50 hover:text-white flex items-center gap-2 mb-6 transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Documenti
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">
            Archivio{" "}
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">Documenti</span>
          </h1>
          <p className="text-white/60 text-center">Tutti i contratti e le Rechnung generate</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            {([["all", "Tutti"], ["contract", "Contratti"], ["rechnung", "Rechnung"]] as const).map(([k, label]) => (
              <button key={k} type="button" onClick={() => setFilter(k)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === k
                    ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white"
                    : "bg-neutral-800 text-white/60 hover:text-white border border-neutral-700"
                }`}>
                {label}
              </button>
            ))}
          </div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cerca cliente..." aria-label="Cerca cliente"
            className="flex-1 px-4 py-2 rounded-full bg-neutral-800 border border-neutral-700 text-white placeholder:text-white/30 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all" />
        </div>

        {loading && <p className="text-white/50 text-center py-12">Caricamento...</p>}
        {error && <p className="text-red-400 text-center py-12">{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 text-white/40">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            <p>Nessun documento {filter !== "all" ? "di questo tipo" : ""} ancora.</p>
          </div>
        )}

        <div className="space-y-3">
          {filtered.map((d) => (
            <div key={d.id} className="bg-neutral-800 border border-neutral-700 rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-neutral-600 transition-all">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${d.type === "contract" ? "bg-fuchsia-500/20" : "bg-pink-500/20"}`}>
                  {d.type === "contract" ? (
                    <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  ) : (
                    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{d.clientName || "—"}</p>
                  <p className="text-white/40 text-sm truncate">
                    {d.type === "contract" ? `Vertrag + Rechnung · ${d.serviceType || ""}` : `Rechnung ${d.rechnungNr || ""}`}
                    {" · "}{fmtDate(d.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-white font-bold hidden sm:block">€{d.total.toFixed(2)}</span>
                <button type="button" onClick={() => reopen(d)}
                  className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all">
                  Apri
                </button>
                <button type="button" aria-label="Elimina" onClick={() => remove(d.id)} className="text-white/30 hover:text-red-400 p-2 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
