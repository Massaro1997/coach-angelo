"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import CookieBanner from "@/components/CookieBanner";
import AttributionTracker from "@/components/AttributionTracker";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Trasformazioni from "@/components/Trasformazioni";
import ChiamataAngelo from "@/components/ChiamataAngelo";
import WhatsAppPill from "@/components/WhatsAppPill";
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
    // App clienti (PWA): schermo intero, niente sito attorno
    pathname === "/app" ||
    pathname?.startsWith("/app/") ||
    false;

  if (isPrintPage || isAppPage) {
    return <>{children}</>;
  }

  // Trasformazioni e chiamata in fondo a ogni pagina: vedi chiusura-pagina.ts.
  // Le recensioni (Recensioni.tsx) non si mostrano piu' dal 06/11/2026: erano i
  // testi d'esempio del primo commit (clienti a Francoforte, Stoccarda,
  // Duesseldorf), non recensioni vere e verificabili. Pubblicarle e' pratica
  // ingannevole (§ 5 UWG). Il componente resta: si rimette qui quando ci sono
  // recensioni vere, con un profilo pubblico (Google) da collegare.
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
          {chiusura?.chiamata && <ChiamataAngelo />}
        </main>
        <Footer />
        <WhatsAppPill />
        <CartSidebar />
        <CookieBanner />
      </CartProvider>
    </LanguageProvider>
  );
}
