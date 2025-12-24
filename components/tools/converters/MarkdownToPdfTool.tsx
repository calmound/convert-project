'use client'

import { FileConverterPanel } from '../FileConverterPanel'
import { markdownToPdf } from '@/lib/converters/document/markdown-pdf'

export function MarkdownToPdfTool() {
  return (
    <FileConverterPanel
      title="Convert Markdown to PDF"
      acceptedFileTypes=".md,.markdown"
      convert={markdownToPdf}
      inputLabel="Upload Markdown File (.md)"
      outputLabel="Download PDF File"
    />
  )
}
