import type { Metadata } from "next";

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Informativa sulla privacy e trattamento dei dati personali di fitprimo.de.",
  alternates: { canonical: `${siteUrl}/privacy` },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
