import { jsPDF } from 'jspdf'

export async function htmlToPdf(file: File): Promise<{ blob: Blob; filename: string }> {
  const html = await file.text()

  // Create a temporary div to render HTML
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.left = '-9999px'
  tempDiv.style.width = '210mm' // A4 width
  tempDiv.style.padding = '20mm'
  tempDiv.style.fontFamily = 'Arial, sans-serif'
  tempDiv.style.fontSize = '12pt'
  tempDiv.style.lineHeight = '1.6'
  tempDiv.style.color = '#000'

  // Set the HTML content
  // Remove script tags for security
  const cleanHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  tempDiv.innerHTML = cleanHtml

  document.body.appendChild(tempDiv)

  // Create PDF
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  try {
    // Use html method to render HTML to PDF (supports Chinese characters)
    await doc.html(tempDiv, {
      callback: () => {
        // Cleanup will happen after this
      },
      x: 0,
      y: 0,
      width: 210, // A4 width in mm
      windowWidth: 794, // Approximately 210mm in pixels at 96 DPI
    })

    // Remove temporary div
    document.body.removeChild(tempDiv)

    // Convert PDF to blob
    const pdfBlob = doc.output('blob')
    const filename = file.name.replace(/\.html?$/i, '.pdf')

    return { blob: pdfBlob, filename }
  } catch (error) {
    // Cleanup on error
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv)
    }
    throw error
  }
}
