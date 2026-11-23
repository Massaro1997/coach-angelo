import { MetadataRoute } from 'next'
import { sitemapPaths } from '@/lib/sitemap-paths'

const siteUrl = "https://www.fitprimo.de"

// Date di modifica solo dove sono vere: vedi src/lib/sitemap-paths.ts (23/11/2026).
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths().map(({ path, ...resto }) => ({ url: `${siteUrl}${path}`, ...resto }))
}
