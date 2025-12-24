import { type Tool } from '@/types/tool'

export const encodingTools: Tool[] = [
  {
    slug: 'encoding-decoding',
    title: 'Encoding & Decoding Tool',
    category: 'encoding',
    description: 'Encode and decode Base64, URL, and Unicode text safely in your browser.',
    keywords: [
      'base64 decode',
      'base64 encode',
      'url encode',
      'url decode',
      'unicode converter',
      'text encoding',
    ],

    component: 'encoding-decoding',
    tags: ['popular', 'developer'],
    inputType: 'text',
    outputType: 'encoded or decoded text',

    examples: [
      {
        input: 'hello world',
        output: 'aGVsbG8gd29ybGQ=',
        description: 'Base64 encode plain text',
      },
      {
        input: 'hello%20world',
        output: 'hello world',
        description: 'URL decode encoded text',
      },
    ],

    faq: [
      {
        question: 'What is Base64 used for?',
        answer: 'Base64 is used to safely transmit binary data as text, such as embedding images or credentials in API payloads.',
      },
      {
        question: 'Is my data sent to a server?',
        answer: 'No. All conversions happen locally in your browser for privacy and speed.',
      },
      {
        question: 'Can I decode Unicode escape sequences?',
        answer: 'Yes. The Unicode tool converts between plain text and Unicode escape sequences like \\u4e2d.',
      },
    ],

    related: ['time-timestamp-converter'],

    priority: 8,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
]
