import Home from "./_ui/Home";

// L'html e' uguale per tutti (statico): chi e' il cliente lo dice /api/app/io
// dal browser, cosi' la pagina in cache del service worker va bene offline.
export default function PaginaApp() {
  return <Home />;
}
