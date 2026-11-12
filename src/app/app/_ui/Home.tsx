"use client";

// /app: senza sessione la schermata del codice, con sessione saluto, card
// "Heute" e calendario del mese.

import { useEffect } from "react";
import type { ProfiloCliente } from "@/lib/app-coaching/tipi";
import { meseDi } from "@/lib/app-coaching/date";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { caricaMese, caricaProfilo, useArchivio } from "./archivio";
import { precaricaGiorni } from "./dispositivo";
import { AvvisoOffline, Caricamento, Corpo, Errore, Testata, useTesti } from "./comuni";
import Calendario from "./Calendario";
import CardOggi from "./CardOggi";
import Ingresso from "./Ingresso";
import Menu from "./Menu";

function Bacheca({ profilo }: { profilo: ProfiloCliente }) {
  const t = useTesti();
  const a = useArchivio();
  const meseOggi = a.oggi ? meseDi(a.oggi) : null;
  const mese = a.meseVisto ?? meseOggi;
  const statoOggi = meseOggi ? a.mesi[meseOggi] : undefined;

  // il mese del calendario (anche quando si sfoglia)
  useEffect(() => {
    if (mese) void caricaMese(mese);
  }, [mese]);

  // il mese di oggi serve alla card "Heute" anche se si guarda un altro mese
  useEffect(() => {
    if (meseOggi) void caricaMese(meseOggi);
  }, [meseOggi]);

  // con la rete, i giorni vicini si salvano per la palestra senza campo
  useEffect(() => {
    if (a.oggi && statoOggi?.tipo === "ok" && !a.offline) precaricaGiorni(a.oggi);
  }, [a.oggi, statoOggi?.tipo, a.offline]);

  const obiettivo = profilo.obiettivo?.trim();
  // si saluta col nome, non con nome e cognome
  const nome = profilo.nome.trim().split(/\s+/)[0] || profilo.nome;

  return (
    <>
      <Testata
        sinistra={
          // eslint-disable-next-line @next/next/no-img-element
          <img src={MARCHIO.logo} alt={MARCHIO.nome} className="h-6 w-auto" />
        }
        destra={<Menu />}
      />
      {a.offline && <AvvisoOffline />}
      <Corpo>
        <h1 className="fp-titolo text-[32px]">{t.ciao(nome)}</h1>
        {obiettivo && <p className="mt-2 text-lg text-neutral-600">{t.obiettivo(obiettivo)}</p>}

        {/* se il mese non arriva l'errore lo mostra il calendario */}
        {statoOggi?.tipo !== "errore" && (
          <div className="mt-6">
            <CardOggi
              oggi={a.oggi}
              giornata={a.oggi && statoOggi?.tipo === "ok" ? statoOggi.giornate[a.oggi] : undefined}
              pronta={statoOggi?.tipo === "ok"}
            />
          </div>
        )}

        {mese && (
          <div className="mt-4">
            <Calendario mese={mese} stato={a.mesi[mese]} oggi={a.oggi} />
          </div>
        )}
      </Corpo>
    </>
  );
}

export default function Home() {
  const t = useTesti();
  const { profilo } = useArchivio();

  useEffect(() => {
    void caricaProfilo();
  }, []);

  if (profilo.tipo === "attesa") return <Caricamento />;
  if (profilo.tipo === "anonimo") return <Ingresso />;
  if (profilo.tipo === "errore") {
    return (
      <Corpo>
        <div className="pt-[env(safe-area-inset-top)]">
          <Errore testo={t.nienteRete} onRiprova={() => void caricaProfilo()} />
        </div>
      </Corpo>
    );
  }
  return <Bacheca profilo={profilo.profilo} />;
}
