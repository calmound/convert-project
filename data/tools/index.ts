import { type Tool } from '@/types/tool'
import { textTools } from './text'
import { mathTools } from './math'
import { numberTools } from './number'
import { documentTools } from './document'
import { unitTools } from './unit'
import { timeTools } from './time'
import { encodingTools } from './encoding'
import { colorTools } from './color'
import { imageTools } from './image'
import { mediaTools } from './media'

// 合并所有工具
export const allTools: Tool[] = [
  ...textTools,
  ...mathTools,
  ...numberTools,
  ...documentTools,
  ...unitTools,
  ...timeTools,
  ...encodingTools,
  ...colorTools,
  ...imageTools,
  ...mediaTools,
]

// 根据 slug 获取工具
export function getToolBySlug(slug: string): Tool | undefined {
  return allTools.find((tool) => tool.slug === slug)
}

// 根据分类获取工具
export function getToolsByCategory(category: string): Tool[] {
  return allTools.filter((tool) => tool.category === category)
}

// 获取推荐工具（按优先级排序）
export function getFeaturedTools(limit: number = 6): Tool[] {
  return allTools
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit)
}

// 获取最新工具
export function getLatestTools(limit: number = 6): Tool[] {
  return allTools
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}
