import { redirect } from "next/navigation";
import { dataValida } from "@/lib/app-coaching/date";
import Giorno from "../../_ui/Giorno";

// L'html dipende solo dalla data (il piano arriva dopo, dall'API): si genera
// alla prima visita e poi resta in cache, anche per il service worker.
export function generateStaticParams() {
  return [];
}

export default async function PaginaGiorno({ params }: { params: Promise<{ data: string }> }) {
  const { data } = await params;
  if (!dataValida(data)) redirect("/app");
  return <Giorno data={data} />;
}
