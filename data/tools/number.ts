import { type Tool } from '@/types/tool'

export const numberTools: Tool[] = [
  {
    slug: 'roman-numeral-converter',
    title: 'Roman Numeral Converter',
    category: 'number',
    description: 'Convert between Roman numerals and numbers. Transform I, V, X, L, C, D, M to decimal numbers or vice versa.',
    keywords: ['roman', 'numerals', 'numbers', 'convert', 'ancient', 'latin'],

    component: 'roman-numeral',
    tags: ['popular', 'education'],
    inputType: 'number/roman',
    outputType: 'roman/number',

    examples: [
      {
        input: '2025',
        output: 'MMXXV',
        description: 'Convert number to Roman numerals',
      },
      {
        input: 'XIV',
        output: '14',
        description: 'Convert Roman numerals to number',
      },
      {
        input: 'MCMXCIV',
        output: '1994',
        description: 'Convert complex Roman numerals',
      },
    ],

    faq: [
      {
        question: 'How do Roman numerals work?',
        answer: 'Roman numerals use letters to represent values: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. When a smaller value appears before a larger one, it\'s subtracted (IV=4). When it appears after, it\'s added (VI=6).',
      },
      {
        question: 'What is the range of numbers I can convert?',
        answer: 'This converter supports numbers from 1 to 3999. Romans didn\'t have a standard way to represent larger numbers or zero in their classical system.',
      },
      {
        question: 'Can I convert lowercase roman numerals?',
        answer: 'Yes! The converter accepts both uppercase (XIV) and lowercase (xiv) Roman numerals and will process them correctly.',
      },
    ],

    related: [],

    priority: 8,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
  {
    slug: 'number-base-converter',
    title: 'Number Base Converter',
    category: 'number',
    description: 'Convert between binary, octal, decimal, and hexadecimal numbers with optional bit width control.',
    keywords: ['binary to decimal', 'decimal to hex', 'hex to binary', 'base converter', 'number base'],

    component: 'number-base-converter',
    tags: ['popular', 'developer'],
    inputType: 'number in any base',
    outputType: 'converted number',

    examples: [
      {
        input: '101010 (base 2)',
        output: '42 (base 10)',
        description: 'Convert binary to decimal',
      },
      {
        input: '255 (base 10)',
        output: 'FF (base 16)',
        description: 'Convert decimal to hex',
      },
    ],

    faq: [
      {
        question: 'Which bases are supported?',
        answer: 'This tool supports binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16).',
      },
      {
        question: 'Can I enter large numbers?',
        answer: 'Yes. The converter uses BigInt where possible to avoid precision loss for larger values.',
      },
      {
        question: 'Does it support negative values?',
        answer: 'Yes. Negative values are supported for all bases. Two\'s complement is shown when bit width is specified.',
      },
    ],

    related: [],

    priority: 8,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
]
