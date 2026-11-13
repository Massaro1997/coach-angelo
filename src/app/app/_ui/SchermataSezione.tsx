"use client";

// Il guscio delle sezioni scritte a parte (_ui/schede: Fortschritt, Shop,
// Coach): la route mette AppShell col titolo nella lingua del cliente e la
// scheda dentro. La scheda puo' usare useScroller e PiedeFisso.
// Aprendo Coach il server segna letti i messaggi (GET /api/app/messaggi): il
// pallino sulla barra si spegne subito, anche se la home arriva dopo (con un
// conto fatto prima che la chat li segnasse letti).

import { useEffect, type ReactNode } from "react";
import { azzeraNonLetti, useArchivio } from "./archivio";
import { useTesti } from "./comuni";
import AppShell from "./shell/AppShell";

export type TabScheda = "fortschritt" | "shop" | "coach";

export default function SchermataSezione({ tab, children }: { tab: TabScheda; children: ReactNode }) {
  const t = useTesti();
  const homePronta = useArchivio().home.tipo === "ok";

  useEffect(() => {
    if (tab === "coach") azzeraNonLetti();
  }, [tab, homePronta]);

  const titolo = { fortschritt: t.titoloFortschritt, shop: t.titoloShop, coach: t.titoloCoach }[tab];
  return (
    <AppShell tab={tab} titolo={titolo}>
      {children}
    </AppShell>
  );
}
