import type { Metadata } from "next";

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von fitprimo.de: Anbieter, Anschrift und Kontakt nach § 5 DDG.",
  alternates: { canonical: `${siteUrl}/impressum` },
};

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
