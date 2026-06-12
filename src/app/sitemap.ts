import { MetadataRoute } from 'next'
import { bezirke } from '@/lib/bezirk-content'
import { blogPosts } from '@/lib/blog-posts'
import { stadtteile } from '@/lib/koeln-stadtteile'
import { intents, allStadtteilIntentParams } from '@/lib/stadtteil-intent'
import { fitnessFaqs } from '@/lib/fitness-faq'

const siteUrl = "https://www.angelocoach.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/chi-sono`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/servizi`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/testimonianze`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/contatti`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/personal-trainer-koeln`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/fitness-faq`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]

  // FAQ fitness (contenuto scritto, Q&A reali)
  const faqPages: MetadataRoute.Sitemap = fitnessFaqs.map((f) => ({
    url: `${siteUrl}/fitness-faq/${f.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // 9 Bezirk
  const bezirkPages: MetadataRoute.Sitemap = bezirke.map((b) => ({
    url: `${siteUrl}/personal-trainer-koeln/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 8 category-intent
  const categoryPages: MetadataRoute.Sitemap = intents.map((it) => ({
    url: `${siteUrl}/leistungen/${it.key}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 86 Stadtteil-Hubs
  const stadtteilHubs: MetadataRoute.Sitemap = stadtteile.map((st) => ({
    url: `${siteUrl}/koeln/${st.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // 688 Stadtteil × Intent (solo PASS — tutte le coppie passano forge)
  const spokePages: MetadataRoute.Sitemap = allStadtteilIntentParams().map((p) => ({
    url: `${siteUrl}/koeln/${p.stadtteil}/${p.intent}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Blog
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...core,
    ...bezirkPages,
    ...categoryPages,
    ...stadtteilHubs,
    ...spokePages,
    ...faqPages,
    ...blogPages,
  ]
}
