'use client'

import { FileConverterPanel } from '../FileConverterPanel'
import { excelToCsv } from '@/lib/converters/document/csv-excel'

export function ExcelToCsvTool() {
  return (
    <FileConverterPanel
      title="Convert Excel to CSV"
      acceptedFileTypes=".xlsx,.xls"
      convert={excelToCsv}
      inputLabel="Upload Excel File (.xlsx, .xls)"
      outputLabel="Download CSV File"
    />
  )
}
