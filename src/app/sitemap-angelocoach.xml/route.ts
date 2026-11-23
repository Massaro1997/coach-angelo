import { sitemapPaths } from '@/lib/sitemap-paths'

// 23/11/2026: sitemap degli indirizzi VECCHI su www.angelocoach.com.
// Va inviata nella proprieta' angelocoach.com di Search Console: Google
// riscansiona gli indirizzi vecchi, trova il 301 verso www.fitprimo.de e
// completa il passaggio di dominio. Esiste solo sul dominio vecchio (eccezione
// al redirect in next.config.ts); su fitprimo.de risponde 404.
// Da togliere quando Search Console non mostra piu' pagine angelocoach.com
// nei risultati (passaggio finito).

export const dynamic = 'force-dynamic'

const VECCHIO = 'https://www.angelocoach.com'

export function GET(req: Request) {
  const host = (req.headers.get('host') ?? '').toLowerCase()
  if (!/^(www\.)?angelocoach\.com$/.test(host)) {
    return new Response('Not found', { status: 404 })
  }
  const righe = sitemapPaths()
    .map(({ path }) => `  <url><loc>${VECCHIO}${path || '/'}</loc></url>`)
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${righe}\n</urlset>\n`
  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
