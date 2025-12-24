import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export const metadata: Metadata = {
  title: 'Unit Converters - Measurement Conversion Tools',
  description: 'Convert between length, weight, temperature, file size, and more units with free online tools.',
  alternates: {
    canonical: `${baseUrl}/unit-converters`,
  },
  openGraph: {
    title: 'Unit Converters - Measurement Conversion Tools',
    description: 'Convert between length, weight, temperature, file size, and more units with free online tools.',
    url: `${baseUrl}/unit-converters`,
    siteName: 'Converter Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Unit Converters - Measurement Conversion Tools',
    description: 'Convert between length, weight, temperature, file size, and more units with free online tools.',
  },
}

export default function UnitConvertersPage() {
  const tools = getToolsByCategory('unit')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Unit Converters</h1>
        <p className="text-lg text-muted-foreground">
          Convert between different units of measurement for science, engineering, and everyday use.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
