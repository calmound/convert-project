import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export const metadata: Metadata = {
  title: 'Document Converters - Free Online Document Format Conversion',
  description: 'Convert between different document and file formats. Excel to CSV, CSV to Excel, Markdown to HTML/PDF, and more.',
  alternates: {
    canonical: `${baseUrl}/document-converters`,
  },
  openGraph: {
    title: 'Document Converters - Free Online Document Format Conversion',
    description: 'Convert between different document and file formats. Excel to CSV, CSV to Excel, Markdown to HTML/PDF, and more.',
    url: `${baseUrl}/document-converters`,
    siteName: 'Converter Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Document Converters - Free Online Document Format Conversion',
    description: 'Convert between different document and file formats. Excel to CSV, CSV to Excel, Markdown to HTML/PDF, and more.',
  },
}

export default function DocumentConvertersPage() {
  const tools = getToolsByCategory('document')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Document Converters</h1>
        <p className="text-lg text-muted-foreground">
          Convert between different document and file formats. All conversions happen in your browser - your files never leave your device.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
