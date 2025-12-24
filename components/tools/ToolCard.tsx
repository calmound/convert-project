import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Tool } from '@/types/tool'

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="h-full hover:border-primary transition-colors">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-lg">{tool.title}</CardTitle>
            {tool.tags.includes('popular') && (
              <Badge variant="secondary" className="shrink-0">
                Popular
              </Badge>
            )}
          </div>
          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
