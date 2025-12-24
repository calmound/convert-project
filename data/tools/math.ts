import { type Tool } from '@/types/tool'

export const mathTools: Tool[] = [
  {
    slug: 'fraction-decimal-percentage',
    title: 'Fraction, Decimal & Percentage Converter',
    category: 'math',
    description: 'Convert between fractions, decimals, and percentages with simplified results and clear steps.',
    keywords: [
      'decimal to fraction',
      'fraction to decimal',
      'percent to decimal',
      'fraction to percent',
      'percentage converter',
      'math converter',
    ],

    component: 'fraction-decimal-percentage',
    tags: ['popular', 'math'],
    inputType: 'fraction/decimal/percentage',
    outputType: 'converted value',

    examples: [
      {
        input: '0.5',
        output: '1/2',
        description: 'Convert decimal to fraction',
      },
      {
        input: '75%',
        output: '0.75',
        description: 'Convert percent to decimal',
      },
      {
        input: '1/4',
        output: '0.25',
        description: 'Convert fraction to decimal',
      },
    ],

    faq: [
      {
        question: 'How do I convert a decimal to a fraction?',
        answer: 'Enter your decimal number (like 0.75) and the tool converts it to a simplified fraction (3/4). It finds the greatest common divisor to reduce the fraction.',
      },
      {
        question: 'Can I convert fractions to percentages?',
        answer: 'Yes. A fraction like 3/4 becomes 75%. The tool also shows the decimal (0.75) for reference.',
      },
      {
        question: 'Does it handle repeating decimals?',
        answer: 'The tool approximates repeating decimals by using the digits you provide. For exact values, enter a fraction directly.',
      },
    ],

    related: [],

    priority: 9,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
]
