"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import CookieBanner from "@/components/CookieBanner";
import AttributionTracker from "@/components/AttributionTracker";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";

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

  return (
    <LanguageProvider>
      <CartProvider>
        <AttributionTracker />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartSidebar />
        <CookieBanner />
      </CartProvider>
    </LanguageProvider>
  );
}
