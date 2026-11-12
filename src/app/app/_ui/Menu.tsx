"use client";

// Menu piccolo in alto a destra: l'obiettivo del cliente per intero (in home
// sta su una riga sola), installare l'app (se si e' nel browser) e uscire.
// L'uscita chiede conferma: senza codice a portata non si rientra.

import { useCallback, useEffect, useState } from "react";
import { LogOut, Menu as IconaMenu, Smartphone } from "lucide-react";
import { esci } from "./archivio";
import { useStandalone } from "./dispositivo";
import { useTesti } from "./comuni";
import { FoglioInstalla } from "./Installa";

const VOCE =
  "flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-[17px] active:bg-neutral-100";

export default function Menu({ obiettivo }: { obiettivo?: string | null }) {
  const t = useTesti();
  const standalone = useStandalone();
  const [aperto, setAperto] = useState(false);
  const [conferma, setConferma] = useState(false);
  const [istruzioni, setIstruzioni] = useState(false);
  const [uscita, setUscita] = useState(false);

  const chiudi = useCallback(() => {
    setAperto(false);
    setConferma(false);
  }, []);
  const chiudiIstruzioni = useCallback(() => setIstruzioni(false), []);

  useEffect(() => {
    if (!aperto) return;
    const tasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") chiudi();
    };
    document.addEventListener("keydown", tasto);
    return () => document.removeEventListener("keydown", tasto);
  }, [aperto, chiudi]);

  async function confermaUscita() {
    setUscita(true);
    await esci();
    // la home passa da sola alla schermata del codice
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => (aperto ? chiudi() : setAperto(true))}
        aria-label={t.menu}
        aria-expanded={aperto}
        aria-haspopup="menu"
        className="-mr-2 grid size-11 place-items-center rounded-full text-neutral-700 active:bg-neutral-100"
      >
        <IconaMenu className="size-6" aria-hidden />
      </button>

      {aperto && (
        <>
          <button
            type="button"
            aria-label={t.chiudi}
            tabIndex={-1}
            onClick={chiudi}
            className="fixed inset-0 z-30 cursor-default"
          />
          <div className="absolute right-0 top-12 z-40 max-h-[70dvh] w-72 max-w-[calc(100vw-2rem)] overflow-y-auto overscroll-y-contain rounded-2xl bg-white p-2 shadow-lg ring-1 ring-black/10">
            {!conferma ? (
              <>
                {obiettivo && (
                  <p className="mb-1 border-b border-black/[0.06] px-3 pb-2.5 pt-1.5 text-[15px] leading-snug text-neutral-600">
                    {t.obiettivo(obiettivo)}
                  </p>
                )}
                <div role="menu" aria-label={t.menu}>
                  {!standalone && (
                    <button
                      type="button"
                      role="menuitem"
                      className={VOCE}
                      onClick={() => {
                        chiudi();
                        setIstruzioni(true);
                      }}
                    >
                      <Smartphone className="size-5 text-neutral-500" aria-hidden />
                      {t.installaTitolo}
                    </button>
                  )}
                  <button type="button" role="menuitem" className={VOCE} onClick={() => setConferma(true)}>
                    <LogOut className="size-5 text-neutral-500" aria-hidden />
                    {t.esci}
                  </button>
                </div>
              </>
            ) : (
              <div className="p-2" role="alertdialog" aria-label={t.esciConferma}>
                <p className="text-[17px] font-semibold">{t.esciConferma}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={chiudi}
                    className="h-11 flex-1 rounded-xl bg-neutral-100 font-semibold active:bg-neutral-200"
                  >
                    {t.annulla}
                  </button>
                  <button
                    type="button"
                    onClick={() => void confermaUscita()}
                    disabled={uscita}
                    className="h-11 flex-1 rounded-xl bg-[var(--app-colore)] font-semibold text-white disabled:opacity-60"
                  >
                    {t.esciSi}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {istruzioni && <FoglioInstalla onChiudi={chiudiIstruzioni} />}
    </div>
  );
}
