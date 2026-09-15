"use client";

import { useState } from "react";
import AdminGate from "@/components/AdminGate";
import { Shell, type Vista } from "@/components/admin/Shell";
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
  const [vista, setVista] = useState<Vista>("conversioni");
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
    </Shell>
  );
}
