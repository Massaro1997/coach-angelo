"use client";

// Chi c'e' dentro l'app, deciso in un posto solo (nel layout): finche' non si
// sa, il simbolo come all'avvio di un'app; senza sessione la schermata del
// codice, su qualsiasi route si sia entrati; con la sessione la route.
// Cosi' nessuna pagina deve controllare l'accesso da se' (niente pagine che
// lampeggiano o rimandano qua e la') e sul server esce sempre lo stesso html,
// il simbolo: date e dati si disegnano solo nel browser (niente errori di
// idratazione). Fuori dal controllo solo /app/entra/<token>, che e' l'accesso.

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { caricaHome, caricaProfilo, useArchivio } from "./archivio";
import { precaricaGiorni } from "./dispositivo";
import { Caricamento, Centrato, Errore, useTesti } from "./comuni";
import Ingresso from "./Ingresso";
import BarraSezioni from "./shell/BarraSezioni";

export default function Sessione({ children }: { children: ReactNode }) {
  const t = useTesti();
  const a = useArchivio();
  const percorso = usePathname() ?? "";
  const libera = percorso.startsWith("/app/entra/");
  const dentro = a.profilo.tipo === "ok";
  const homePronta = a.home.tipo === "ok";

  useEffect(() => {
    if (!libera) void caricaProfilo();
  }, [libera]);

  // la home serve a tutte le sezioni (pallino dei messaggi): una volta all'ingresso
  useEffect(() => {
    if (dentro && !libera) void caricaHome();
  }, [dentro, libera]);

  // con la rete, sezioni e giorni vicini si salvano per la palestra senza campo
  useEffect(() => {
    if (dentro && homePronta && !a.offline && a.oggi) precaricaGiorni(a.oggi);
  }, [dentro, homePronta, a.offline, a.oggi]);

  if (libera) return <>{children}</>;
  if (a.profilo.tipo === "attesa") return <Caricamento />;
  if (a.profilo.tipo === "anonimo") return <Ingresso />;
  if (a.profilo.tipo === "errore") {
    return (
      <Centrato schermoIntero>
        <Errore testo={t.nienteRete} onRiprova={() => void caricaProfilo()} />
      </Centrato>
    );
  }
  // la barra delle sezioni qui e non in ogni schermata: si disegna una volta
  // e resta ferma passando da una schermata all'altra (vedi BarraSezioni)
  return (
    <>
      {children}
      <BarraSezioni />
    </>
  );
}
