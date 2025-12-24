'use client'

import { FileConverterPanel } from '../FileConverterPanel'
import { markdownToHtml } from '@/lib/converters/document/markdown-html'

export function MarkdownToHtmlTool() {
  return (
    <FileConverterPanel
      title="Convert Markdown to HTML"
      acceptedFileTypes=".md,.markdown"
      convert={markdownToHtml}
      inputLabel="Upload Markdown File (.md)"
      outputLabel="Download HTML File"
    />
  )
}
