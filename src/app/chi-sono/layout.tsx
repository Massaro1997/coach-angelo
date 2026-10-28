import type { Metadata } from "next";

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  title: "Angelo Magliarisi: Personal Trainer in Köln",
  description:
    "Angelo Magliarisi (Coach Angelo) ist Personal Trainer in Köln und WABBA-Athlet. FitPrimo ist sein Training, mit Ernährungsberaterin Natalie im Team.",
  alternates: { canonical: `${siteUrl}/chi-sono` },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/chi-sono`,
    title: "Angelo Magliarisi: Personal Trainer in Köln | FitPrimo",
    description: "Personal Trainer in Köln und Wettkampfathlet im WABBA International Verband.",
    images: ["/opengraph-image"],
  },
};

export default function ChiSonoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
