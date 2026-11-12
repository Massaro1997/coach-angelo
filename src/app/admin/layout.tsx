import { Metadata, Viewport } from "next";
import localFont from "next/font/local";

// Inter variabile solo nel gestionale: la grafica Polaris usa i pesi
// 450/550/650. In locale come gli altri font: next/font/google su Vercel
// rompe la build (vedi src/app/layout.tsx).
const inter = localFont({
  src: "../fonts/inter-latin.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// barra del telefono nera come la cornice del gestionale
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // la variabile --font-inter vale per tutto cio' che sta sotto (.crm-admin la usa)
  return <div className={inter.variable}>{children}</div>;
}
