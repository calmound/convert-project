import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Math Converters - Free Online Math Tools',
  description: 'Convert between different mathematical formats and notations. Decimals to fractions, percentages and more.',
}

export default function MathConvertersPage() {
  const tools = getToolsByCategory('math')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Math Converters</h1>
        <p className="text-lg text-muted-foreground">
          Convert between different mathematical formats and notations.
          All conversions are instant and accurate.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
