export type Category = 'text' | 'math' | 'number' | 'document' | 'unit' | 'color' | 'time' | 'encoding' | 'image' | 'media'

export type ToolMode = 'simple' | 'comprehensive'

export interface ToolExample {
  input: string
  output: string
  description: string
}

export interface ToolFAQ {
  question: string
  answer: string
}

export interface ToolFeature {
  id: string
  name: string
  description: string
  icon?: string
}

export interface Tool {
  // 基础字段
  slug: string
  title: string
  category: Category
  subcategory?: string
  description: string
  keywords: string[]

  // 模式字段
  mode?: ToolMode // 默认为 'simple'
  features?: ToolFeature[] // 仅用于 comprehensive 模式
  defaultFeature?: string // 仅用于 comprehensive 模式

  // 功能字段
  component: string
  tags: string[]
  inputType: string
  outputType: string

  // 内容字段
  faq: ToolFAQ[]
  examples: ToolExample[]
  related: string[]

  // 元数据
  priority: number
  createdAt: string
  lastUpdatedAt: string
}

export interface CategoryInfo {
  slug: string
  name: string
  description: string
  icon?: string
}
