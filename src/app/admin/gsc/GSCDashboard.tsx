"use client";

import { useCallback, useEffect, useState } from "react";
import SeoVista from "@/components/admin/seo/SeoVista";
import { Caricamento, Errore } from "@/components/admin/seo/Stati";
import type { DatiSeo, ErroreSeo } from "@/components/admin/seo/tipi";

// Scheda SEO del gestionale (/admin#seo).
// I dati arrivano da /admin/gsc/dati: ultimi 28 giorni contro i 28 prima,
// andamento giornaliero, ricerche, pagine e sitemap in una sola chiamata.
// Gli strumenti in fondo (sitemap, controllo URL, richiesta di ripasso)
// usano ancora le API /api/gsc/* di sempre.

type Risposta = { dati: DatiSeo } | { errore: ErroreSeo; proprieta: string | null };

async function chiedi(): Promise<Risposta> {
  let r: Response;
  try {
    r = await fetch("/admin/gsc/dati", { cache: "no-store" });
  } catch (e) {
    return { errore: { tipo: "rete", dettaglio: (e as Error).message }, proprieta: null };
  }
  if (r.status === 401) return { errore: { tipo: "sessione", dettaglio: "" }, proprieta: null };
  const j = await r.json().catch(() => null);
  if (r.ok && j && !j.errore) return { dati: j as DatiSeo };
  return {
    errore: j?.errore ?? { tipo: "altro", dettaglio: `Risposta ${r.status}` },
    proprieta: j?.proprieta ?? null,
  };
}

export default function GSCDashboard() {
  const [risposta, setRisposta] = useState<Risposta | null>(null);
  const [giro, setGiro] = useState(0);
  const [aggiorno, setAggiorno] = useState(false);

  useEffect(() => {
    let vivo = true;
    chiedi().then((r) => {
      if (!vivo) return;
      // Se un aggiornamento fallisce ma i numeri c'erano gia', si tiene quelli
      // solo per errori passeggeri; per token e permessi si mostra l'errore.
      setRisposta((prec) =>
        "errore" in r && prec && "dati" in prec && (r.errore.tipo === "rete" || r.errore.tipo === "quota")
          ? prec
          : r
      );
      setAggiorno(false);
    });
    return () => {
      vivo = false;
    };
  }, [giro]);

  const aggiorna = useCallback(() => {
    setAggiorno(true);
    setGiro((g) => g + 1);
  }, []);

  if (!risposta) return <Caricamento />;

  if ("errore" in risposta) {
    return (
      <Errore errore={risposta.errore} proprieta={risposta.proprieta} riprova={aggiorna} riprovo={aggiorno} />
    );
  }

  return <SeoVista dati={risposta.dati} aggiorna={aggiorna} aggiorno={aggiorno} />;
}
