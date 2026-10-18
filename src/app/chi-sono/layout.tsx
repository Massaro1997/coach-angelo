import type { Metadata } from "next";

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  title: "Chi Sono",
  description:
    "Angelo Magliarisi, Personal Trainer a Colonia e atleta WABBA International. Storia, metodo e approccio all'allenamento personalizzato.",
  alternates: { canonical: `${siteUrl}/chi-sono` },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/chi-sono`,
    title: "Chi Sono | FitPrimo",
    description: "Angelo Magliarisi, Personal Trainer a Colonia e atleta WABBA International.",
    images: ["/opengraph-image"],
  },
};

export default function ChiSonoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
