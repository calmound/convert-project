import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export const metadata: Metadata = {
  title: 'Image Converters - Format & Optimization Tools',
  description: 'Convert image formats like JPG, PNG, WebP, and HEIC with free online tools.',
  alternates: {
    canonical: `${baseUrl}/image-converters`,
  },
  openGraph: {
    title: 'Image Converters - Format & Optimization Tools',
    description: 'Convert image formats like JPG, PNG, WebP, and HEIC with free online tools.',
    url: `${baseUrl}/image-converters`,
    siteName: 'Converter Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Image Converters - Format & Optimization Tools',
    description: 'Convert image formats like JPG, PNG, WebP, and HEIC with free online tools.',
  },
}

export default function ImageConvertersPage() {
  const tools = getToolsByCategory('image')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Image Converters</h1>
        <p className="text-lg text-muted-foreground">
          Convert and optimize image formats for web, print, and sharing.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
