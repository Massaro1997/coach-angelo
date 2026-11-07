import { Metadata } from "next";
import { getUmlandOrt } from "@/lib/umland";
import UmlandSeite from "@/components/UmlandSeite";

const ort = getUmlandOrt("bruehl")!;
const siteUrl = "https://www.fitprimo.de";
const url = `${siteUrl}/personal-trainer-bruehl`;

export const metadata: Metadata = {
  title: ort.metaTitle,
  description: ort.metaDescription,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url,
    title: `${ort.h1Prefix} ${ort.name} | FitPrimo`,
    description: ort.metaDescription,
    images: ["/opengraph-image"],
  },
};

export default function PersonalTrainerBruehl() {
  return <UmlandSeite ort={ort} />;
}
