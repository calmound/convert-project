'use client'

import { FileConverterPanel } from '../FileConverterPanel'
import { csvToExcel } from '@/lib/converters/document/csv-excel'

export function CsvToExcelTool() {
  return (
    <FileConverterPanel
      title="Convert CSV to Excel"
      acceptedFileTypes=".csv"
      convert={csvToExcel}
      inputLabel="Upload CSV File (.csv)"
      outputLabel="Download Excel File"
    />
  )
}
