import type { Metadata } from "next";
import PreventivoPubblico from "./PreventivoPubblico";

export const metadata: Metadata = {
  title: "Angebot",
  robots: { index: false, follow: false },
};

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <PreventivoPubblico token={token} />;
}
