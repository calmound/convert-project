import * as XLSX from 'xlsx'

export async function csvToExcel(file: File): Promise<{ blob: Blob; filename: string }> {
  const text = await file.text()

  // Parse CSV
  const workbook = XLSX.read(text, { type: 'string' })

  // Convert to Excel
  const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' })
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const filename = file.name.replace(/\.csv$/i, '.xlsx')

  return { blob, filename }
}

export async function excelToCsv(file: File): Promise<{ blob: Blob; filename: string }> {
  const arrayBuffer = await file.arrayBuffer()

  // Read Excel file
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })

  // Get first worksheet
  const worksheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[worksheetName]

  // Convert to CSV
  const csv = XLSX.utils.sheet_to_csv(worksheet)

  const blob = new Blob([csv], { type: 'text/csv' })
  const filename = file.name.replace(/\.(xlsx?|xls)$/i, '.csv')

  return { blob, filename }
}
