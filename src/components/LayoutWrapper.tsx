"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import CookieBanner from "@/components/CookieBanner";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pagine senza Header/Footer/Cart/Cookie (per stampa)
  const isPrintPage = pathname === "/bewerbung" || pathname === "/lebenslauf" || pathname === "/contratti";

  if (isPrintPage) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <CartProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartSidebar />
        <CookieBanner />
      </CartProvider>
    </LanguageProvider>
  );
}
