import { type Tool } from '@/types/tool'

export const imageTools: Tool[] = [
  {
    slug: 'image-converter',
    title: 'Image Format Converter & Optimizer',
    category: 'image',
    description: 'Convert JPG, PNG, WebP, and SVG images with optional resizing and compression controls.',
    keywords: [
      'jpg to png',
      'png to jpg',
      'webp to jpg',
      'svg to png',
      'image converter',
    ],

    component: 'image-converter',
    tags: ['popular', 'file-conversion'],
    inputType: 'image file',
    outputType: 'converted image',

    examples: [
      {
        input: 'photo.webp',
        output: 'photo.jpg',
        description: 'Convert WebP to JPG',
      },
      {
        input: 'logo.svg',
        output: 'logo.png',
        description: 'Convert SVG to PNG',
      },
    ],

    faq: [
      {
        question: 'Which image formats are supported?',
        answer: 'The converter supports JPG, PNG, WebP, and SVG. Some formats like HEIC require native browser support.',
      },
      {
        question: 'Can I resize images?',
        answer: 'Yes. You can adjust width and height to scale images before converting.',
      },
      {
        question: 'Is the conversion private?',
        answer: 'All conversions run locally in your browser. No files are uploaded to a server.',
      },
    ],

    related: ['image-to-pdf'],

    priority: 8,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
  {
    slug: 'image-to-pdf',
    title: 'Image to PDF Builder',
    category: 'image',
    description: 'Combine multiple images into a single PDF file. Reorder pages and choose page size.',
    keywords: [
      'image to pdf',
      'jpg to pdf',
      'png to pdf',
      'merge images pdf',
    ],

    component: 'image-to-pdf',
    tags: ['file-conversion'],
    inputType: 'images',
    outputType: 'PDF file',

    examples: [
      {
        input: 'scan-1.jpg, scan-2.jpg',
        output: 'scans.pdf',
        description: 'Merge multiple images into a PDF',
      },
    ],

    faq: [
      {
        question: 'Can I combine multiple images?',
        answer: 'Yes. Upload multiple images, reorder them, and export as a single PDF.',
      },
      {
        question: 'What page size is used?',
        answer: 'You can choose between A4 and Letter sizes. Images are centered and scaled to fit.',
      },
      {
        question: 'Are my files uploaded?',
        answer: 'No. All processing happens locally in your browser.',
      },
    ],

    related: ['image-converter', 'pdf-converter'],

    priority: 7,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
]
