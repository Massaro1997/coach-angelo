"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import CookieBanner from "@/components/CookieBanner";
import AttributionTracker from "@/components/AttributionTracker";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Recensioni from "@/components/Recensioni";
import Trasformazioni from "@/components/Trasformazioni";
import ChiamataAngelo from "@/components/ChiamataAngelo";
import { chiusuraPagina, temaChiaro } from "@/lib/chiusura-pagina";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pagine senza Header/Footer/Cart/Cookie (per stampa)
  const isPrintPage = pathname === "/bewerbung" || pathname === "/lebenslauf";

  // Il gestionale e' una web app a schermo intero: niente navbar del sito,
  // niente footer, niente carrello ne' banner cookie. Ha la sua shell.
  // Stessa cosa per preventivo e pagamento: sono documenti che il cliente
  // apre da un link, non pagine da navigare.
  const isAppPage =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/preventivo/") ||
    pathname?.startsWith("/pagamento/") ||
    false;

  if (isPrintPage || isAppPage) {
    return <>{children}</>;
  }

  // Trasformazioni, recensioni e chiamata in fondo a ogni pagina: vedi
  // chiusura-pagina.ts.
  const chiusura = chiusuraPagina(pathname);
  // Dal 04/10 tutte le pagine del sito sono nel tema chiaro: la classe .fp sta
  // qui, una volta sola. Le pagine scritte con i token (bg-background,
  // text-ink...) diventano chiare senza toccarle.
  const chiaro = temaChiaro(pathname);

  return (
    <LanguageProvider>
      <CartProvider>
        <AttributionTracker />
        <Header />
        <main className={chiaro ? "fp" : undefined}>
          {children}
          {chiusura?.trasformazioni && <Trasformazioni fondo="grigio" />}
          {chiusura && <Recensioni />}
          {chiusura?.chiamata && <ChiamataAngelo />}
        </main>
        <Footer />
        <CartSidebar />
        <CookieBanner />
      </CartProvider>
    </LanguageProvider>
  );
}
