import type { Metadata } from "next";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Privacy | Coach Angelo",
  description: "Informativa sulla privacy e trattamento dei dati personali di angelocoach.com.",
  alternates: { canonical: `${siteUrl}/privacy` },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
