"use client";

import { useState } from "react";
import AdminGate from "@/components/AdminGate";
import { Shell, VISTE, type Vista } from "@/components/admin/Shell";
import ScalettaView from "@/components/admin/ScalettaView";
import MarchioView from "@/components/admin/MarchioView";
import BrandSheetView from "@/components/admin/BrandSheetView";
import MerchandisingView from "@/components/admin/MerchandisingView";
import Conversioni, { type DatiConversioni } from "@/components/admin/Conversioni";
import LeadView from "@/components/admin/LeadView";
import PreventiviView from "@/components/admin/PreventiviView";
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

  return (
    <Shell vista={vista} setVista={setVista} conteggi={conteggi}>
      {/* Conversioni resta montata: cambiare scheda non ricarica i dati. */}
      <div className={vista === "conversioni" ? "" : "hidden"}>
        <Conversioni
          onDati={(d: DatiConversioni) =>
            setConteggi({ lead: d.lead.daLeggere, ordini: d.ordini.totale })
          }
        />
      </div>
      {vista === "lead" && <LeadView />}
      {vista === "preventivi" && <PreventiviView />}
      {vista === "ordini" && <OrdiniView />}
      {vista === "seo" && <GSCDashboard />}
      {vista === "scaletta" && <ScalettaView onMarchio={() => setVista("marchio")} />}
      {vista === "marchio" && <MarchioView />}
      {vista === "brand" && <BrandSheetView />}
      {vista === "merchandising" && <MerchandisingView />}
    </Shell>
  );
}
