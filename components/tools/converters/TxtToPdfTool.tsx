'use client'

import { FileConverterPanel } from '../FileConverterPanel'
import { txtToPdf } from '@/lib/converters/document/txt-pdf'

export function TxtToPdfTool() {
  return (
    <FileConverterPanel
      title="Convert Text to PDF"
      acceptedFileTypes=".txt"
      convert={txtToPdf}
      inputLabel="Upload Text File (.txt)"
      outputLabel="Download PDF File"
    />
  )
}
