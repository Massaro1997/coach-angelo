import { bezirke } from '@/lib/bezirk-content'
import { allPosts } from '@/lib/blog-posts'
import { stadtteile } from '@/lib/koeln-stadtteile'
import { intents, allStadtteilIntentParams } from '@/lib/stadtteil-intent'
import { fitnessFaqs } from '@/lib/fitness-faq'
import { umlandOrte } from '@/lib/umland'

/**
 * Tutti i percorsi del sito, con la data di modifica solo dove e' vera.
 *
 * 23/11/2026: prima ogni pagina aveva lastModified = ora del build, quindi a
 * ogni deploy 847 indirizzi risultavano "cambiati oggi". Google smette di
 * fidarsi di un lastmod cosi' e lo ignora per tutto il sito. Adesso la data
 * c'e' solo sugli articoli (updated, se riscritti, altrimenti date); le altre
 * pagine non la dichiarano.
 *
 * La stessa lista serve anche a /sitemap-angelocoach.xml (indirizzi vecchi).
 */
export function sitemapPaths(): { path: string; lastModified?: Date; changeFrequency: 'weekly' | 'monthly'; priority: number }[] {
  return [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/chi-sono', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/servizi', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/contatti', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/personal-trainer-koeln', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/fitness-faq', changeFrequency: 'weekly', priority: 0.7 },
    // 9 Bezirk
    ...bezirke.map((b) => ({ path: `/personal-trainer-koeln/${b.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
    // 8 category-intent
    ...intents.map((it) => ({ path: `/leistungen/${it.key}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
    // 86 Stadtteil-Hubs
    ...stadtteile.map((st) => ({ path: `/koeln/${st.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
    // 688 Stadtteil × Intent
    ...allStadtteilIntentParams().map((p) => ({ path: `/koeln/${p.stadtteil}/${p.intent}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
    // Comuni del Kölner Umland (Zone confermate, PIANO_PRODUZIONE.md)
    ...umlandOrte.map((o) => ({ path: `/personal-trainer-${o.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
    // FAQ fitness
    ...fitnessFaqs.map((f) => ({ path: `/fitness-faq/${f.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
    // Blog: data vera dell'ultima riscrittura, altrimenti della pubblicazione
    ...allPosts.map((p) => ({ path: `/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
