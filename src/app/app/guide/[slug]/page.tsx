import { GUIDE } from "../../_ui/guide/dati";
import LetturaGuida from "../../_ui/guide/LetturaGuida";

// L'html dipende solo dallo slug (testi nel pacchetto, lingua dal browser):
// le guide si generano alla build. Uno slug che non c'e' si disegna lo stesso
// (dynamicParams resta acceso) e mostra "guida non trovata" dentro l'app,
// invece del 404 del sito.
export function generateStaticParams() {
  return GUIDE.map((g) => ({ slug: g.slug }));
}

export default async function PaginaGuida({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LetturaGuida slug={slug} />;
}
