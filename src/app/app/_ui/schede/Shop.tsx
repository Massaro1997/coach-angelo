"use client";

// Scheda Shop (app v2), tre blocchi in fila nella zona che scorre di AppShell:
//   1. "Dein Abo": card con foto, prossima rata, periodo, rate, contratto, rinnovo
//   2. "1:1-Stunden": card con foto, ore in tessere, prenotazione, "Meine Termine"
//   3. "Offene Zahlungen" ed "Extra-Stunden": pagamenti aperti, pacchetti in griglia
// Prezzi e importi arrivano tutti dall'API (/api/app/shop): qui nessuna cifra.
// La prima foto della schermata si carica subito (`priorita`): e' quella
// dell'abbonamento, o quella delle ore 1:1 per chi non ha un abbonamento.

import { useCallback } from "react";
import type { Shop as DatiShop } from "@/lib/app-coaching/tipi-v2";
import { Caricamento, ErroreBox } from "../kit";
import { useApi, useRitorno } from "./api";
import { SezioneAbo } from "./ShopAbo";
import { SezioneOre, type Termini } from "./ShopOre";
import { SezioneExtra } from "./ShopPacchetti";
import { useT } from "./testi-schede";

export default function Shop() {
  const t = useT();
  const shop = useApi<DatiShop>("/api/app/shop", t);
  const termini = useApi<Termini>("/api/app/prenotazioni", t);
  const { ricarica: ricaricaShop } = shop;
  const { ricarica: ricaricaTermini } = termini;

  const aggiorna = useCallback(() => {
    ricaricaShop();
    ricaricaTermini();
  }, [ricaricaShop, ricaricaTermini]);

  // tornati dalla cassa con "indietro": rata pagata, ore comprate, va riletto tutto
  useRitorno(aggiorna);

  if (shop.stato.tipo === "attesa") return <Caricamento />;
  if (shop.stato.tipo === "errore") return <ErroreBox testo={shop.stato.testo} riprova={shop.riprova} />;

  const s = shop.stato.dati;
  const pacchetti = s.pacchetti ?? [];

  return (
    <>
      <SezioneAbo abbonamento={s.abbonamento} pacchetti={pacchetti.filter((p) => p.tipo === "nuovo-contratto")} />
      <SezioneOre
        ore={s.ore}
        termini={termini.stato}
        riprovaTermini={termini.riprova}
        onCambio={aggiorna}
        priorita={!s.abbonamento}
      />
      <SezioneExtra pacchetti={pacchetti.filter((p) => p.tipo === "ore-extra")} sospesi={s.acquistiInSospeso ?? []} />
    </>
  );
}
