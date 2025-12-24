'use client'

import { FileConverterPanel } from '../FileConverterPanel'
import { htmlToPdf } from '@/lib/converters/document/html-pdf'

export function HtmlToPdfTool() {
  return (
    <FileConverterPanel
      title="Convert HTML to PDF"
      acceptedFileTypes=".html,.htm"
      convert={htmlToPdf}
      inputLabel="Upload HTML File (.html)"
      outputLabel="Download PDF File"
    />
  )
}
