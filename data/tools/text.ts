import { type Tool } from '@/types/tool'

export const textTools: Tool[] = [
  {
    slug: 'text-case-converter',
    title: 'Text Case & String Converter',
    category: 'text',
    description: 'Convert text between uppercase, lowercase, title case, and naming styles like camel, snake, and kebab.',
    keywords: [
      'uppercase to lowercase',
      'camel case to snake case',
      'kebab case converter',
      'text case converter',
      'string converter',
    ],

    component: 'text-case-converter',
    tags: ['popular', 'developer'],
    inputType: 'text',
    outputType: 'text',

    examples: [
      {
        input: 'HELLO WORLD',
        output: 'hello world',
        description: 'Convert uppercase to lowercase',
      },
      {
        input: 'hello_world_example',
        output: 'helloWorldExample',
        description: 'Convert snake_case to camelCase',
      },
      {
        input: 'Convert Text Fast',
        output: 'convert-text-fast',
        description: 'Convert to kebab-case',
      },
    ],

    faq: [
      {
        question: 'Which text styles are supported?',
        answer: 'The tool supports uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, and kebab-case.',
      },
      {
        question: 'Does it keep punctuation and numbers?',
        answer: 'Yes. The converter preserves punctuation and numbers, only adjusting letter case and separators for naming styles.',
      },
      {
        question: 'Can I convert multiple lines at once?',
        answer: 'Yes. Paste multiple lines and the converter will transform the full input instantly.',
      },
    ],

    related: [],

    priority: 10,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
  {
    slug: 'chinese-number-converter',
    title: 'Chinese Number Converter',
    category: 'text',
    description: 'Convert Arabic numbers into Chinese lowercase and uppercase numerals for invoices and documents.',
    keywords: [
      'chinese number converter',
      'number to chinese',
      'chinese uppercase numerals',
      'chinese lowercase numerals',
      'rmb uppercase',
    ],

    component: 'chinese-number-converter',
    tags: ['popular', 'localization'],
    inputType: 'number',
    outputType: 'Chinese numerals',

    examples: [
      {
        input: '12345',
        output: '一万二千三百四十五',
        description: 'Convert number to Chinese lowercase',
      },
      {
        input: '1002003',
        output: '壹佰万贰仟零叁',
        description: 'Convert number to Chinese uppercase',
      },
    ],

    faq: [
      {
        question: 'What is the difference between lowercase and uppercase Chinese numbers?',
        answer: 'Lowercase numerals are used in daily writing, while uppercase numerals are used in finance to prevent tampering (e.g., 壹贰叁).',
      },
      {
        question: 'Can it convert decimals?',
        answer: 'Yes. The decimal part is converted digit by digit after the dot.',
      },
      {
        question: 'Does it support negative numbers?',
        answer: 'Yes. Negative values are prefixed with 负.',
      },
    ],

    related: ['text-case-converter'],

    priority: 7,
    createdAt: '2025-01-06',
    lastUpdatedAt: '2025-01-06',
  },
]
