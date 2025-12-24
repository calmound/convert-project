import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Encoding Tools - Base64, URL, Unicode',
  description: 'Encode and decode text with Base64, URL encoding, and Unicode conversion tools.',
}

export default function EncodingToolsPage() {
  const tools = getToolsByCategory('encoding')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Encoding Tools</h1>
        <p className="text-lg text-muted-foreground">
          Encode and decode text data with quick, reliable browser-based tools.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
