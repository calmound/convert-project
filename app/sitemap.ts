import { MetadataRoute } from 'next'
import { allTools } from '@/data/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

  // Static pages
  const staticPages = [
    '',
    '/text-converters',
    '/math-converters',
    '/number-converters',
    '/document-converters',
    '/unit-converters',
    '/image-converters',
    '/media-converters',
    '/color-converters',
    '/time-converters',
    '/encoding-tools',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Tool pages
  const toolPages = allTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.lastUpdatedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...toolPages]
}
