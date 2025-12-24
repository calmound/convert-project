import { type Tool } from '@/types/tool'

export const colorTools: Tool[] = [
  {
    slug: 'color-converter',
    title: 'Color Converter - HEX RGB HSL',
    category: 'color',
    description: 'Convert colors between HEX, RGB, and HSL formats with live preview and copy-ready values.',
    keywords: [
      'hex to rgb',
      'rgb to hex',
      'hsl to hex',
      'color converter',
      'color picker',
    ],

    component: 'color-converter',
    tags: ['designer', 'popular'],
    inputType: 'color value',
    outputType: 'converted formats',

    examples: [
      {
        input: '#ff6b6b',
        output: 'rgb(255, 107, 107)',
        description: 'Convert HEX to RGB',
      },
      {
        input: 'rgb(52, 152, 219)',
        output: '#3498db',
        description: 'Convert RGB to HEX',
      },
    ],

    faq: [
      {
        question: 'Which color formats are supported?',
        answer: 'The converter supports HEX, RGB, and HSL. Enter any one and the others update automatically.',
      },
      {
        question: 'Can I preview the color?',
        answer: 'Yes. The tool shows a live preview so you can verify the color visually.',
      },
      {
        question: 'Are alpha values supported?',
        answer: 'This version focuses on solid colors. You can still keep alpha in mind by adjusting output formats manually.',
      },
    ],

    related: [],

    priority: 7,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
]
