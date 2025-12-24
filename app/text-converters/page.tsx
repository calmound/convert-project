import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Converters - Free Online Text Tools',
  description: 'Convert and transform text between different formats and cases. Uppercase to lowercase, title case, sentence case and more.',
}

export default function TextConvertersPage() {
  const tools = getToolsByCategory('text')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Text Converters</h1>
        <p className="text-lg text-muted-foreground">
          Convert and transform text between different formats and cases.
          All tools work instantly in your browser.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
