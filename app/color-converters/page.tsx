import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Color Converters - HEX RGB HSL Tools',
  description: 'Convert between HEX, RGB, HSL, and other color formats with free online tools.',
}

export default function ColorConvertersPage() {
  const tools = getToolsByCategory('color')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Color Converters</h1>
        <p className="text-lg text-muted-foreground">
          Convert color values between popular formats and compare palettes instantly.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
