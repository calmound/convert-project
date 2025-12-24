import { getToolsByCategory } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Time Converters - Timestamp & Date Tools',
  description: 'Convert between timestamps, dates, timezones, and time formats with free online tools.',
}

export default function TimeConvertersPage() {
  const tools = getToolsByCategory('time')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Time Converters</h1>
        <p className="text-lg text-muted-foreground">
          Convert timestamps, dates, and time formats with instant results.
        </p>
      </div>

      <ToolGrid tools={tools} />
    </div>
  )
}
