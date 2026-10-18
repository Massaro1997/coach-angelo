import type { Metadata } from "next";

const siteUrl = "https://www.fitprimo.de";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Informativa sui cookie utilizzati da fitprimo.de.",
  alternates: { canonical: `${siteUrl}/cookie` },
};

export default function CookieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
