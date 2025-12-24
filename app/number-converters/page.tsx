import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export const metadata: Metadata = {
  title: 'Number Converters - Free Online Number Tools',
  description: 'Convert between number systems and formats. Roman numerals, binary, decimal, hexadecimal and more.',
  alternates: {
    canonical: `${baseUrl}/number-converters`,
  },
  openGraph: {
    title: 'Number Converters - Free Online Number Tools',
    description: 'Convert between number systems and formats. Roman numerals, binary, decimal, hexadecimal and more.',
    url: `${baseUrl}/number-converters`,
    siteName: 'Converter Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Number Converters - Free Online Number Tools',
    description: 'Convert between number systems and formats. Roman numerals, binary, decimal, hexadecimal and more.',
  },
}

export default function NumberConvertersPage() {
  const tools = getToolsByCategory('number')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Number Converters</h1>
        <p className="text-muted-foreground">
          Convert between different number systems and formats.
          Roman numerals, binary, decimal, and more.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
