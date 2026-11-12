"use client";

// /app/entra/<token>: il link che il coach manda su WhatsApp. Si entra col
// token e si va al calendario; se il link non vale piu', si rimanda al codice.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MARCHIO } from "@/lib/app-coaching/marchio";
import { accedi, type EsitoAccesso } from "./archivio";
import { useTesti } from "./comuni";

export default function Entra({ token }: { token: string }) {
  const t = useTesti();
  const router = useRouter();
  const [esito, setEsito] = useState<EsitoAccesso | null>(null);
  const [tentativo, setTentativo] = useState(0);

  useEffect(() => {
    let vivo = true;
    void accedi({ token }).then((e) => {
      if (!vivo) return;
      if (e === "ok") router.replace("/app");
      else setEsito(e);
    });
    return () => {
      vivo = false;
    };
  }, [token, router, tentativo]);

  const fallito = esito !== null && esito !== "ok";
  const senzaRete = esito === "rete";

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center pb-[calc(2.5rem_+_env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pt-[calc(2.5rem_+_env(safe-area-inset-top))]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MARCHIO.logo} alt={MARCHIO.nome} className="h-8 w-auto self-start" />

      {!fallito ? (
        <p className="mt-10 text-xl" role="status">
          {t.entrando}
        </p>
      ) : (
        <div className="mt-10" role="alert">
          <p className="text-xl">{senzaRete ? t.nienteRete : t.linkNonValido}</p>
          {senzaRete ? (
            <button
              type="button"
              onClick={() => {
                setEsito(null);
                setTentativo((n) => n + 1);
              }}
              className="mt-6 h-14 w-full rounded-2xl bg-[var(--app-colore)] text-lg font-semibold text-white active:opacity-85"
            >
              {t.riprova}
            </button>
          ) : (
            <Link
              href="/app"
              replace
              className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-[var(--app-colore)] text-lg font-semibold text-white active:opacity-85"
            >
              {t.vaiCodice}
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
