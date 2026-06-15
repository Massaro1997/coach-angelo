import type { Metadata } from "next";

const siteUrl = "https://www.angelocoach.com";

export const metadata: Metadata = {
  title: "Cookie Policy | Coach Angelo",
  description: "Informativa sui cookie utilizzati da angelocoach.com.",
  alternates: { canonical: `${siteUrl}/cookie` },
};

export default function CookieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
