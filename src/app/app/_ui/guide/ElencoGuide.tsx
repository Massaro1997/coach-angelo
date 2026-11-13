"use client";

// /app/guide: tutte le guide in una griglia a due colonne di card con foto
// (CardGuida). Dettaglio della Home (la barra accende "Home", "‹" torna li'
// o un passo indietro vero). Le guide sono 8: griglia completa, righe alte
// uguali. Niente testo sopra la griglia: le foto e i titoli bastano.

import { useLingua } from "../kit";
import AppShell from "../shell/AppShell";
import CardGuida from "./CardGuida";
import { GUIDE } from "./dati";

const TXT = {
  de: { titolo: "Guides" },
  it: { titolo: "Guide" },
};

export default function ElencoGuide() {
  const lingua = useLingua();
  return (
    <AppShell tab="home" titolo={TXT[lingua].titolo} indietro="/app">
      <ul className="grid grid-cols-2 gap-3 pt-2">
        {GUIDE.map((g, i) => (
          <li key={g.slug} className="flex">
            {/* le prime tre righe si vedono subito anche su un telefono piccolo */}
            <CardGuida guida={g} priorita={i < 6} />
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
