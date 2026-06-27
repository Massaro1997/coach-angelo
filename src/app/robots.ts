import { MetadataRoute } from 'next'

const siteUrl = "https://www.angelocoach.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/checkout', '/contratti'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
