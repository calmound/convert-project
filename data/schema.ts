import { type Tool, type CategoryInfo } from '@/types/tool'

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'text',
    name: 'Text Converters',
    description: 'Convert and transform text between different formats and cases',
  },
  {
    slug: 'math',
    name: 'Math Converters',
    description: 'Convert between different mathematical formats and notations',
  },
  {
    slug: 'number',
    name: 'Number Converters',
    description: 'Convert between number systems and formats',
  },
  {
    slug: 'document',
    name: 'Document Converters',
    description: 'Convert between different document and file formats',
  },
  {
    slug: 'image',
    name: 'Image Converters',
    description: 'Convert and optimize image formats for web and print',
  },
  {
    slug: 'media',
    name: 'Media Converters',
    description: 'Convert video and audio formats for playback and sharing',
  },
  {
    slug: 'unit',
    name: 'Unit Converters',
    description: 'Convert between different units of measurement',
  },
  {
    slug: 'color',
    name: 'Color Converters',
    description: 'Convert between different color formats',
  },
  {
    slug: 'time',
    name: 'Time Converters',
    description: 'Convert between different time formats and timezones',
  },
  {
    slug: 'encoding',
    name: 'Encoding Tools',
    description: 'Encode and decode text in various formats',
  },
]

// Helper function to validate tool data
export function validateTool(tool: Tool): boolean {
  const validCategories = ['text', 'math', 'number', 'document', 'unit', 'color', 'time', 'encoding', 'image', 'media']
  return (
    tool.slug.length > 0 &&
    tool.title.length > 0 &&
    validCategories.includes(tool.category)
  )
}
