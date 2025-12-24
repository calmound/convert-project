import { type Tool } from '@/types/tool'

export const timeTools: Tool[] = [
  {
    slug: 'time-timestamp-converter',
    title: 'Time & Timestamp Converter',
    category: 'time',
    description: 'Convert between Unix timestamps and human-readable dates with timezone support and precision control.',
    keywords: [
      'timestamp converter',
      'unix time',
      'epoch converter',
      'date to timestamp',
      'timestamp to date',
      'milliseconds to date',
    ],

    component: 'time-timestamp-converter',
    tags: ['popular', 'developer'],
    inputType: 'timestamp or date',
    outputType: 'date or timestamp',

    examples: [
      {
        input: '1704067200',
        output: '2024-01-01 00:00:00 (UTC)',
        description: 'Convert Unix seconds to date',
      },
      {
        input: '2024-01-01 00:00:00',
        output: '1704067200',
        description: 'Convert date to Unix seconds',
      },
    ],

    faq: [
      {
        question: 'What is a Unix timestamp?',
        answer: 'A Unix timestamp is the number of seconds (or milliseconds) since 1970-01-01 00:00:00 UTC. It is commonly used in programming and logs.',
      },
      {
        question: 'Does this tool support milliseconds?',
        answer: 'Yes. You can switch between seconds, milliseconds, and nanoseconds to match your data source.',
      },
      {
        question: 'What timezone is used?',
        answer: 'You can choose UTC or your local timezone. This helps align timestamps with your system or server.',
      },
    ],

    related: ['encoding-decoding'],

    priority: 9,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
]
