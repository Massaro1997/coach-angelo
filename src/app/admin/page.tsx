"use client";

import { useCallback, useEffect, useState } from "react";
import AdminGate from "@/components/AdminGate";
import { Shell, VISTE, type Vista } from "@/components/admin/Shell";
import ClientiView from "@/components/admin/ClientiView";
import AppClientiView from "@/components/admin/AppClientiView";
import CommissioniView from "@/components/admin/CommissioniView";
import MerchandisingView from "@/components/admin/MerchandisingView";
import Conversioni, { type DatiConversioni } from "@/components/admin/Conversioni";
import LeadView from "@/components/admin/LeadView";
import PreventiviView, { type BozzaContratto } from "@/components/admin/PreventiviView";
import OrdiniView from "@/components/admin/OrdiniView";
import GSCDashboard from "./gsc/GSCDashboard";

export default function AdminPage() {
  return (
    <AdminGate>
      <Gestionale />
    </AdminGate>
  );
}

function Gestionale() {
  // Gestionale si monta solo nel browser, dopo il controllo di AdminGate:
  // leggere l'ancora qui non crea differenze con il rendering lato server.
  const [vista, setVistaStato] = useState<Vista>(() => {
    const h = window.location.hash.slice(1) as Vista;
    return VISTE.includes(h) ? h : "conversioni";
  });
  const setVista = (v: Vista) => {
    setVistaStato(v);
    history.replaceState(null, "", `#${v}`);
  };
  // I conteggi del menu arrivano dalla vista Conversioni, che li carica
  // comunque: cosi' il badge "da leggere" c'e' senza una seconda chiamata.
  const [conteggi, setConteggi] = useState<Partial<Record<Vista, number>>>({});
  // Messaggi dei clienti dell'app non ancora letti, sulla voce «App clienti»:
  // all'avvio e ogni 60 s (non a linguetta del browser nascosta). Dentro la
  // scheda App clienti il numero si aggiorna da solo appena si legge.
  const nonLettiApp = useCallback((n: number) => setConteggi((c) => ({ ...c, app: n })), []);
  useEffect(() => {
    let vivo = true;
    const carica = () => {
      if (document.hidden) return;
      fetch("/api/admin/app-messaggi", { cache: "no-store" })
        .then((r) => (r.ok ? (r.json() as Promise<{ nonLettiTotale?: number }>) : null))
        .then((j) => {
          if (vivo && typeof j?.nonLettiTotale === "number") nonLettiApp(j.nonLettiTotale);
        })
        .catch(() => {}); // il badge e' un di piu': se la rotta non risponde, niente numero
    };
    carica();
    const giro = setInterval(carica, 60_000);
    const torna = () => {
      if (!document.hidden) carica();
    };
    document.addEventListener("visibilitychange", torna);
    return () => {
      vivo = false;
      clearInterval(giro);
      document.removeEventListener("visibilitychange", torna);
    };
  }, [nonLettiApp]);
  // "Crea contratto" su un lead: porta i suoi dati nel modulo della scheda Contratti
  const [bozza, setBozza] = useState<BozzaContratto | null>(null);

  return (
    <Shell vista={vista} setVista={setVista} conteggi={conteggi}>
      {/* Conversioni resta montata: cambiare scheda non ricarica i dati. */}
      <div className={vista === "conversioni" ? "" : "hidden"}>
        <Conversioni
          onDati={(d: DatiConversioni) =>
            // unito, non sostituito: il conteggio dell'app arriva da un'altra parte
            setConteggi((c) => ({ ...c, lead: d.lead.daLeggere, ordini: d.ordini.totale }))
          }
        />
      </div>
      {vista === "clienti" && <ClientiView />}
      {vista === "app" && <AppClientiView onNonLetti={nonLettiApp} />}
      {vista === "commissioni" && <CommissioniView />}
      {vista === "lead" && (
        <LeadView
          onCreaContratto={(b) => {
            setBozza(b);
            setVista("preventivi");
            window.scrollTo({ top: 0 });
          }}
        />
      )}
      {vista === "preventivi" && <PreventiviView bozza={bozza} onBozzaUsata={() => setBozza(null)} />}
      {vista === "ordini" && <OrdiniView />}
      {vista === "seo" && <GSCDashboard />}
      {vista === "merchandising" && <MerchandisingView />}
    </Shell>
  );
}
