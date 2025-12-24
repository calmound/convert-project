import { allTools } from '@/data/tools'
import { ToolGrid } from './ToolGrid'

interface RelatedToolsProps {
  relatedSlugs: string[]
}

export function RelatedTools({ relatedSlugs }: RelatedToolsProps) {
  if (relatedSlugs.length === 0) {
    return null
  }

  const relatedTools = allTools.filter((tool) => relatedSlugs.includes(tool.slug))

  if (relatedTools.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <ToolGrid tools={relatedTools} />
    </div>
  )
}
