import { MetadataRoute } from 'next'

const siteUrl = "https://www.angelocoach.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // /admin, /checkout, /contratti: NO disallow qui — hanno noindex nei layout.
        // Se robots li blocca, Google non legge il noindex e può indicizzare l'URL nudo.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
