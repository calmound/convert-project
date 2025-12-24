import { type Tool } from '@/types/tool'
import { ToolCard } from './ToolCard'

interface ToolGridProps {
  tools: Tool[]
}

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No tools found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  )
}
