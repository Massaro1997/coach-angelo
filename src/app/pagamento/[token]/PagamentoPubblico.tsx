"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { COACH } from "@/lib/preventivo-testi";

interface Dati {
  descrizione: string;
  clienteNome: string;
  importo: number;
  valuta: string;
  tipo: string;
  rataNumero: number | null;
  rateTotali: number | null;
  scadenza: string | null;
  stato: string;
  pagatoAt: string | null;
  documento: string | null;
  lingua: string;
  preventivoToken: string | null;
}

const eur = (n: number) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

const T = {
  de: {
    zahlung: "Zahlung",
    rata: "Rate",
    von: "von",
    faellig: "Fällig am",
    paga: "Jetzt bezahlen",
    attesa: "Einen Moment…",
    pagato: "Bezahlt am",
    grazie: "Danke, die Zahlung ist eingegangen.",
    annullato: "Zahlung abgebrochen. Du kannst es erneut versuchen.",
    bonifico: "Oder per Überweisung",
    torna: "Zum Angebot",
    nonAttivo: "Kartenzahlung ist noch nicht aktiv. Bitte per Überweisung zahlen.",
    pagaMese: "Ersten Monat bezahlen",
    abbo: (n: number | null) =>
      n
        ? `Heute zahlst du den ersten Monat. Die weiteren ${n - 1} Monate werden automatisch abgebucht, danach endet das Paket von selbst.`
        : "Heute zahlst du den ersten Monat. Danach wird der Betrag jeden Monat automatisch abgebucht.",
    automatico: "Dieser Monat wird automatisch abgebucht. Du musst nichts tun.",
    conferma: "Zahlung wird bestätigt…",
  },
  it: {
    zahlung: "Pagamento",
    rata: "Rata",
    von: "di",
    faellig: "Scade il",
    paga: "Paga ora",
    attesa: "Un attimo…",
    pagato: "Pagato il",
    grazie: "Grazie, il pagamento è arrivato.",
    annullato: "Pagamento annullato. Puoi riprovare.",
    bonifico: "Oppure con bonifico",
    torna: "Torna al preventivo",
    nonAttivo: "Il pagamento con carta non è ancora attivo. Usa il bonifico.",
    pagaMese: "Paga il primo mese",
    abbo: (n: number | null) =>
      n
        ? `Oggi paghi il primo mese. Gli altri ${n - 1} mesi vengono addebitati in automatico, poi il pacchetto finisce da solo.`
        : "Oggi paghi il primo mese. Poi l'importo viene addebitato in automatico ogni mese.",
    automatico: "Questo mese viene addebitato in automatico. Non devi fare niente.",
    conferma: "Stiamo confermando il pagamento…",
  },
};

export default function PagamentoPubblico({ token }: { token: string }) {
  const params = useSearchParams();
  const esito = params.get("esito");

  const [d, setD] = useState<Dati | null>(null);
  const [errore, setErrore] = useState("");
  const [invio, setInvio] = useState(false);

  useEffect(() => {
    fetch(`/api/pagamento/${token}`)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "Errore");
        return j;
      })
      .then(setD)
      .catch((e) => setErrore(e.message));
  }, [token, esito]);

  // Tornato dalla cassa: la conferma puo' arrivare qualche secondo dopo.
  // Si ricontrolla per un minuto, poi basta ricaricare.
  const inAttesa = esito === "ok" && d != null && d.stato !== "pagato";
  useEffect(() => {
    if (!inAttesa) return;
    let giri = 0;
    const id = setInterval(() => {
      if (++giri > 15) return clearInterval(id);
      fetch(`/api/pagamento/${token}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => j && setD(j))
        .catch(() => {});
    }, 4000);
    return () => clearInterval(id);
  }, [inAttesa, token]);

  async function paga() {
    setInvio(true);
    setErrore("");
    try {
      const res = await fetch(`/api/pagamento/${token}`, { method: "POST" });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Errore");
      window.location.href = j.url;
    } catch (e) {
      setErrore((e as Error).message);
      setInvio(false);
    }
  }

  if (errore && !d) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f4f5] px-4">
        <p className="text-sm text-neutral-500">{errore}</p>
      </main>
    );
  }
  if (!d) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f4f5]">
        <p className="text-sm text-neutral-400">…</p>
      </main>
    );
  }

  const t = T[d.lingua === "it" ? "it" : "de"];
  const loc = d.lingua === "it" ? "it-IT" : "de-DE";
  const pagato = d.stato === "pagato";
  const abbonamento = d.tipo === "abbonamento";
  // mesi dopo il primo: li addebita Stripe, dal link non si pagano
  const automatico = abbonamento && (d.rataNumero ?? 1) > 1;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f4f5] px-4 py-10">
      <div className="w-full max-w-md space-y-4">
        <section className="border border-black/10 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-2.5 border-b border-black/10 pb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/fitprimo/fitprimo-simbolo-colore.svg" alt="" className="h-6 w-auto object-contain" />
            <div>
              <p className="text-sm font-bold leading-none text-neutral-900">{COACH.marchio}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                {t.zahlung}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm text-neutral-700">{d.descrizione}</p>
          {d.rataNumero && d.rateTotali && (
            <p className="mt-0.5 text-xs text-neutral-400">
              {t.rata} {d.rataNumero} {t.von} {d.rateTotali}
            </p>
          )}

          <p className="mt-4 text-4xl font-bold tabular-nums text-neutral-900">
            {eur(d.importo)}
          </p>

          {d.scadenza && !pagato && (
            <p className="mt-1 text-xs text-neutral-400">
              {t.faellig} {new Date(d.scadenza).toLocaleDateString(loc)}
            </p>
          )}

          {pagato ? (
            <div className="mt-5 border border-green-600/30 bg-green-50 p-4 text-center">
              <p className="text-sm font-bold text-green-800">{t.grazie}</p>
              {d.pagatoAt && (
                <p className="mt-0.5 text-xs text-green-700">
                  {t.pagato} {new Date(d.pagatoAt).toLocaleDateString(loc)}
                </p>
              )}
            </div>
          ) : automatico ? (
            <p className="mt-5 border border-black/10 bg-neutral-50 p-4 text-center text-sm text-neutral-600">
              {t.automatico}
            </p>
          ) : esito === "ok" ? (
            // il webhook puo' arrivare qualche secondo dopo il ritorno da Stripe
            <p className="mt-5 border border-green-600/30 bg-green-50 p-4 text-center text-sm text-green-800">
              {t.conferma}
            </p>
          ) : (
            <>
              {abbonamento && (
                <p className="mt-4 text-xs leading-relaxed text-neutral-500">{t.abbo(d.rateTotali)}</p>
              )}
              {esito === "annullato" && (
                <p className="mt-4 border border-amber-500/40 bg-amber-50 p-3 text-xs text-amber-800">
                  {t.annullato}
                </p>
              )}
              {errore && <p className="mt-4 text-sm text-red-500">{errore}</p>}
              <button
                onClick={paga}
                disabled={invio}
                className="mt-5 w-full bg-neutral-900 py-3.5 text-sm font-bold text-white disabled:opacity-50"
              >
                {invio ? t.attesa : abbonamento ? t.pagaMese : t.paga}
              </button>

              {/* l'abbonamento vuole la carta: col bonifico i mesi dopo non partirebbero */}
              {!abbonamento && <div className="mt-6 border-t border-black/10 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  {t.bonifico}
                </p>
                <dl className="mt-2 space-y-0.5 text-xs text-neutral-600">
                  <div className="flex justify-between gap-3">
                    <dt className="text-neutral-400">IBAN</dt>
                    <dd className="font-mono">{COACH.bankIban}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-neutral-400">BIC</dt>
                    <dd className="font-mono">{COACH.bankBic}</dd>
                  </div>
                  {d.documento && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-neutral-400">Referenz</dt>
                      <dd className="font-semibold">{d.documento}</dd>
                    </div>
                  )}
                </dl>
              </div>}
            </>
          )}
        </section>

        {d.preventivoToken && (
          <p className="text-center">
            <a
              href={`/preventivo/${d.preventivoToken}`}
              className="text-xs text-neutral-400 underline hover:text-neutral-700"
            >
              {t.torna}
            </a>
          </p>
        )}
      </div>
    </main>
  );
}
