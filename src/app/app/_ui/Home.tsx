"use client";

// /app: senza sessione la schermata del codice, con sessione una schermata
// sola senza scorrere: testata, saluto su una riga, card "Heute" compatta e
// il calendario del mese che prende tutto lo spazio che resta.

import { useEffect } from "react";
import type { ProfiloCliente } from "@/lib/app-coaching/tipi";
import { meseDi } from "@/lib/app-coaching/date";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { caricaMese, caricaProfilo, useArchivio } from "./archivio";
import { precaricaGiorni } from "./dispositivo";
import {
  AvvisoOffline,
  Caricamento,
  Centrato,
  Errore,
  FONDO_SICURO,
  LATI,
  Testata,
  useTesti,
} from "./comuni";
import { dimenticaCalendario } from "./navigazione";
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

  // di nuovo sul calendario: il prossimo giorno aperto riparte da qui
  useEffect(() => {
    dimenticaCalendario();
  }, []);

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
        destra={<Menu obiettivo={obiettivo} />}
      />
      {a.offline && <AvvisoOffline />}
      <main className={`mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col gap-3 pt-3 ${LATI} ${FONDO_SICURO}`}>
        <div className="shrink-0">
          {/* pr/py: il corsivo e gli accenti sulle maiuscole non si tagliano */}
          <h1 className="fp-titolo truncate py-0.5 pr-1 text-[28px]">{t.ciao(nome)}</h1>
          {/* una riga sola (per intero sta nel menu); sugli schermi bassi via */}
          {obiettivo && (
            <p className="mt-1 truncate text-[15px] text-neutral-600 [@media(max-height:640px)]:hidden">
              {t.obiettivo(obiettivo)}
            </p>
          )}
        </div>

        {/* se il mese non arriva l'errore lo mostra il calendario */}
        {statoOggi?.tipo !== "errore" && (
          <CardOggi
            oggi={a.oggi}
            giornata={a.oggi && statoOggi?.tipo === "ok" ? statoOggi.giornate[a.oggi] : undefined}
            pronta={statoOggi?.tipo === "ok"}
          />
        )}

        {mese && <Calendario mese={mese} stato={a.mesi[mese]} oggi={a.oggi} />}
      </main>
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
      <Centrato schermoIntero>
        <Errore testo={t.nienteRete} onRiprova={() => void caricaProfilo()} />
      </Centrato>
    );
  }
  return <Bacheca profilo={profilo.profilo} />;
}
