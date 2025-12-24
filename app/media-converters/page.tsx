import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export const metadata: Metadata = {
  title: 'Media Converters - Video & Audio Tools',
  description: 'Convert video and audio formats like MP4, MP3, GIF with free online tools.',
  alternates: {
    canonical: `${baseUrl}/media-converters`,
  },
  openGraph: {
    title: 'Media Converters - Video & Audio Tools',
    description: 'Convert video and audio formats like MP4, MP3, GIF with free online tools.',
    url: `${baseUrl}/media-converters`,
    siteName: 'Converter Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Media Converters - Video & Audio Tools',
    description: 'Convert video and audio formats like MP4, MP3, GIF with free online tools.',
  },
}

export default function MediaConvertersPage() {
  const tools = getToolsByCategory('media')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Media Converters</h1>
        <p className="text-lg text-muted-foreground">
          Convert video and audio formats for playback, sharing, and editing.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
