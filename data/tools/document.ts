import { type Tool } from '@/types/tool'

export const documentTools: Tool[] = [
  {
    slug: 'pdf-converter',
    title: 'PDF Converter Suite',
    category: 'document',
    description: 'Convert documents and images to PDF with multiple conversion modes and batch support.',
    keywords: ['pdf converter', 'pdf to word', 'pdf to jpg', 'word to pdf', 'image to pdf'],

    component: 'pdf-converter',
    tags: ['popular', 'file-conversion'],
    inputType: 'document or image',
    outputType: 'PDF file',

    examples: [
      {
        input: 'notes.txt',
        output: 'notes.pdf',
        description: 'Convert text to PDF',
      },
      {
        input: 'slides.html',
        output: 'slides.pdf',
        description: 'Convert HTML to PDF',
      },
    ],

    faq: [
      {
        question: 'What conversions are included?',
        answer: 'This suite focuses on converting text, HTML, Markdown, and images into PDF. More output formats are planned.',
      },
      {
        question: 'Do files leave my device?',
        answer: 'No. All conversions run locally in your browser.',
      },
      {
        question: 'Can I combine multiple files?',
        answer: 'You can combine multiple images into a PDF. Document batching depends on the input type.',
      },
    ],

    related: ['image-to-pdf', 'markdown-to-pdf', 'html-to-pdf', 'txt-to-pdf'],

    priority: 9,
    createdAt: '2025-01-05',
    lastUpdatedAt: '2025-01-05',
  },
  {
    slug: 'excel-to-csv',
    title: 'Excel to CSV Converter',
    category: 'document',
    description: 'Convert Excel spreadsheets (XLSX, XLS) to CSV format. Upload your Excel file and download it as a comma-separated values file.',
    keywords: ['excel', 'csv', 'xlsx', 'xls', 'spreadsheet', 'convert'],

    component: 'excel-to-csv',
    tags: ['popular', 'file-conversion'],
    inputType: 'Excel file',
    outputType: 'CSV file',

    examples: [
      {
        input: 'data.xlsx',
        output: 'data.csv',
        description: 'Convert Excel workbook to CSV',
      },
      {
        input: 'spreadsheet.xls',
        output: 'spreadsheet.csv',
        description: 'Convert legacy Excel format to CSV',
      },
    ],

    faq: [
      {
        question: 'What Excel formats are supported?',
        answer: 'This tool supports both modern Excel formats (.xlsx) and legacy Excel formats (.xls). The first worksheet in your workbook will be converted to CSV.',
      },
      {
        question: 'What happens to multiple sheets?',
        answer: 'Only the first worksheet in your Excel file will be converted to CSV. CSV format does not support multiple sheets.',
      },
      {
        question: 'Are formulas preserved?',
        answer: 'No, formulas are converted to their calculated values in the CSV output. CSV is a plain text format and does not support formulas.',
      },
    ],

    related: ['csv-to-excel'],

    priority: 9,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
  {
    slug: 'csv-to-excel',
    title: 'CSV to Excel Converter',
    category: 'document',
    description: 'Convert CSV files to Excel format (XLSX). Upload your CSV file and download it as an Excel spreadsheet.',
    keywords: ['csv', 'excel', 'xlsx', 'spreadsheet', 'convert'],

    component: 'csv-to-excel',
    tags: ['popular', 'file-conversion'],
    inputType: 'CSV file',
    outputType: 'Excel file',

    examples: [
      {
        input: 'data.csv',
        output: 'data.xlsx',
        description: 'Convert CSV to Excel workbook',
      },
      {
        input: 'contacts.csv',
        output: 'contacts.xlsx',
        description: 'Import CSV data into Excel',
      },
    ],

    faq: [
      {
        question: 'How is the CSV parsed?',
        answer: 'The tool automatically detects the delimiter (comma, semicolon, tab) and properly parses your CSV file into Excel rows and columns.',
      },
      {
        question: 'Can I edit the Excel file after conversion?',
        answer: 'Yes! The converted Excel file is a standard .xlsx file that can be opened and edited in Microsoft Excel, Google Sheets, or any compatible spreadsheet application.',
      },
      {
        question: 'Are special characters preserved?',
        answer: 'Yes, all Unicode characters and special symbols in your CSV file will be preserved in the Excel output.',
      },
    ],

    related: ['excel-to-csv'],

    priority: 9,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
  {
    slug: 'txt-to-pdf',
    title: 'Text to PDF Converter',
    category: 'document',
    description: 'Convert plain text files to PDF format. Upload your TXT file and download it as a formatted PDF document.',
    keywords: ['txt', 'pdf', 'text', 'document', 'convert'],

    component: 'txt-to-pdf',
    tags: ['file-conversion'],
    inputType: 'Text file',
    outputType: 'PDF file',

    examples: [
      {
        input: 'notes.txt',
        output: 'notes.pdf',
        description: 'Convert text notes to PDF',
      },
      {
        input: 'document.txt',
        output: 'document.pdf',
        description: 'Create PDF from plain text',
      },
    ],

    faq: [
      {
        question: 'How is the text formatted in the PDF?',
        answer: 'The text is converted to PDF with a clean, readable layout using Helvetica font at 12pt size. Line breaks and spacing from the original text file are preserved.',
      },
      {
        question: 'What is the page size?',
        answer: 'The PDF is created in standard A4 size with appropriate margins for easy reading and printing.',
      },
      {
        question: 'Can I convert large text files?',
        answer: 'Yes, the tool automatically handles pagination. Long text files will be split across multiple PDF pages.',
      },
    ],

    related: ['markdown-to-pdf', 'html-to-pdf'],

    priority: 7,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
  {
    slug: 'markdown-to-pdf',
    title: 'Markdown to PDF Converter',
    category: 'document',
    description: 'Convert Markdown files to PDF format. Upload your .md file and download it as a formatted PDF document with proper heading styles.',
    keywords: ['markdown', 'pdf', 'md', 'document', 'convert'],

    component: 'markdown-to-pdf',
    tags: ['file-conversion'],
    inputType: 'Markdown file',
    outputType: 'PDF file',

    examples: [
      {
        input: 'README.md',
        output: 'README.pdf',
        description: 'Convert README to PDF',
      },
      {
        input: 'documentation.md',
        output: 'documentation.pdf',
        description: 'Create PDF from markdown docs',
      },
    ],

    faq: [
      {
        question: 'Are markdown headings formatted?',
        answer: 'Yes, headings are rendered in bold with larger font size and extra spacing. The tool recognizes # heading syntax and formats them appropriately.',
      },
      {
        question: 'What markdown features are supported?',
        answer: 'The tool supports standard markdown syntax including headings, paragraphs, lists, code blocks, and links. Complex formatting may be simplified in the PDF output.',
      },
      {
        question: 'Are images included in the PDF?',
        answer: 'Image references in markdown are not currently rendered in the PDF. The tool focuses on converting text content.',
      },
    ],

    related: ['markdown-to-html', 'txt-to-pdf'],

    priority: 8,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
  {
    slug: 'markdown-to-html',
    title: 'Markdown to HTML Converter',
    category: 'document',
    description: 'Convert Markdown files to HTML format. Upload your .md file and download it as a styled HTML document ready for web publishing.',
    keywords: ['markdown', 'html', 'md', 'web', 'convert'],

    component: 'markdown-to-html',
    tags: ['popular', 'file-conversion'],
    inputType: 'Markdown file',
    outputType: 'HTML file',

    examples: [
      {
        input: 'README.md',
        output: 'README.html',
        description: 'Convert README to HTML',
      },
      {
        input: 'blog-post.md',
        output: 'blog-post.html',
        description: 'Convert markdown blog post to HTML',
      },
    ],

    faq: [
      {
        question: 'Does the HTML include styling?',
        answer: 'Yes! The generated HTML includes embedded CSS styles that make it look clean and professional, similar to GitHub\'s markdown rendering. It\'s ready to be viewed in any browser.',
      },
      {
        question: 'What markdown syntax is supported?',
        answer: 'The tool supports GitHub Flavored Markdown (GFM) including headings, lists, code blocks, tables, links, images, blockquotes, and more.',
      },
      {
        question: 'Can I use the HTML on my website?',
        answer: 'Yes! The generated HTML is standards-compliant and can be embedded in any website. You can customize the styling by editing the CSS in the <style> section.',
      },
    ],

    related: ['markdown-to-pdf', 'html-to-pdf'],

    priority: 8,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
  {
    slug: 'html-to-pdf',
    title: 'HTML to PDF Converter',
    category: 'document',
    description: 'Convert HTML files to PDF format. Upload your HTML file and download it as a PDF document.',
    keywords: ['html', 'pdf', 'web', 'document', 'convert'],

    component: 'html-to-pdf',
    tags: ['file-conversion'],
    inputType: 'HTML file',
    outputType: 'PDF file',

    examples: [
      {
        input: 'webpage.html',
        output: 'webpage.pdf',
        description: 'Convert HTML page to PDF',
      },
      {
        input: 'document.html',
        output: 'document.pdf',
        description: 'Create PDF from HTML document',
      },
    ],

    faq: [
      {
        question: 'How is HTML converted to PDF?',
        answer: 'The tool extracts the text content from your HTML file, removing tags and scripts, and converts it to a clean PDF document. Complex layouts may be simplified.',
      },
      {
        question: 'Are styles and formatting preserved?',
        answer: 'The conversion focuses on extracting text content. CSS styles and complex layouts are not preserved. For best results, use simple HTML files.',
      },
      {
        question: 'What about images and media?',
        answer: 'Images and multimedia content are not currently included in the PDF. The tool focuses on converting text content.',
      },
    ],

    related: ['markdown-to-pdf', 'txt-to-pdf'],

    priority: 7,
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
]
