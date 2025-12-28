import { jsPDF } from 'jspdf'
import { marked } from 'marked'

export async function markdownToPdf(file: File): Promise<{ blob: Blob; filename: string }> {
  const text = await file.text()

  // Configure marked options
  marked.setOptions({
    gfm: true,
    breaks: true,
  })

  // Parse markdown to HTML
  const htmlContent = await marked.parse(text)

  // Create a temporary div to render HTML
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'fixed'
  tempDiv.style.top = '0'
  tempDiv.style.left = '0'
  tempDiv.style.width = '210mm' // A4 width
  tempDiv.style.padding = '20mm'
  tempDiv.style.fontFamily = 'Arial, sans-serif'
  tempDiv.style.fontSize = '12pt'
  tempDiv.style.lineHeight = '1.6'
  tempDiv.style.color = '#000'
  tempDiv.style.backgroundColor = '#fff'
  tempDiv.style.opacity = '0'
  tempDiv.style.pointerEvents = 'none'
  tempDiv.style.zIndex = '-1'
  tempDiv.innerHTML = htmlContent
  document.body.appendChild(tempDiv)

  // Create PDF
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  // Return a promise that resolves when PDF is ready
  return new Promise((resolve, reject) => {
    doc.html(tempDiv, {
      callback: (doc) => {
        try {
          // Remove temporary div
          document.body.removeChild(tempDiv)

          // Convert PDF to blob
          const pdfBlob = doc.output('blob')
          const filename = file.name.replace(/\.md$/i, '.pdf')

          resolve({ blob: pdfBlob, filename })
        } catch (error) {
          // Cleanup on error
          if (document.body.contains(tempDiv)) {
            document.body.removeChild(tempDiv)
          }
          reject(error)
        }
      },
      x: 0,
      y: 0,
      width: 210, // A4 width in mm
      windowWidth: 794, // Approximately 210mm in pixels at 96 DPI
    })
  })
}
