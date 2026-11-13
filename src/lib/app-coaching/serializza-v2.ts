// App v2: dalle righe Prisma alle forme di tipi-v2.ts. Stessa regola di
// serializza.ts: verso il cliente si costruisce campo per campo, mai uno
// spread della riga (AppCliente.note e' solo del coach).

import type { AppCliente, AppMessaggio, AppMisura } from "@prisma/client";
import { toProfilo } from "./serializza";
import type { Lingua } from "./tipi";
import type { Messaggio, Misura, ProfiloCompleto } from "./tipi-v2";

/** La lingua del cliente, per i testi e gli errori delle rotte. */
export function linguaDi(c: Pick<AppCliente, "lingua">): Lingua {
  return c.lingua === "it" ? "it" : "de";
}

/** Superset del profilo v1: l'app v1 legge solo nome, lingua e obiettivo. */
export function toProfiloCompleto(r: AppCliente): ProfiloCompleto {
  return {
    ...toProfilo(r), // toProfilo sceglie gia' i campi uno per uno
    email: r.email,
    telefono: r.telefono,
    clienteDal: r.createdAt.toISOString(),
  };
}

export function toMisura(r: AppMisura): Misura {
  return {
    id: r.id,
    data: r.data,
    peso: r.peso,
    vita: r.vita,
    fianchi: r.fianchi,
    petto: r.petto,
    braccio: r.braccio,
    coscia: r.coscia,
    grasso: r.grasso,
    nota: r.nota,
  };
}

/**
 * `letto` dipende da chi guarda: lettoAt lo scrive chi riceve il messaggio.
 * - cliente: i messaggi del coach sono letti se lui li ha aperti, i suoi sempre;
 * - coach: i messaggi del cliente sono letti se il coach li ha aperti, i suoi sempre.
 */
export function toMessaggio(r: AppMessaggio, per: "cliente" | "coach"): Messaggio {
  const scrittoDaChiGuarda = per === "coach" ? r.daCoach : !r.daCoach;
  return {
    id: r.id,
    daCoach: r.daCoach,
    testo: r.testo,
    createdAt: r.createdAt.toISOString(),
    letto: scrittoDaChiGuarda || r.lettoAt !== null,
  };
}
