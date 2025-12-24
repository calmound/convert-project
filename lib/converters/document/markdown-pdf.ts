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
  tempDiv.style.position = 'absolute'
  tempDiv.style.left = '-9999px'
  tempDiv.style.width = '210mm' // A4 width
  tempDiv.style.padding = '20mm'
  tempDiv.style.fontFamily = 'Arial, sans-serif'
  tempDiv.style.fontSize = '12pt'
  tempDiv.style.lineHeight = '1.6'
  tempDiv.style.color = '#000'
  tempDiv.innerHTML = `
    <style>
      h1, h2, h3, h4, h5, h6 {
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      h1 { font-size: 24pt; }
      h2 { font-size: 20pt; }
      h3 { font-size: 16pt; }
      p { margin: 10px 0; }
      code {
        background-color: #f5f5f5;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: monospace;
      }
      pre {
        background-color: #f5f5f5;
        padding: 10px;
        border-radius: 5px;
        overflow-x: auto;
      }
      pre code {
        background-color: transparent;
        padding: 0;
      }
    </style>
    ${htmlContent}
  `
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
    const filename = file.name.replace(/\.md$/i, '.pdf')

    return { blob: pdfBlob, filename }
  } catch (error) {
    // Cleanup on error
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv)
    }
    throw error
  }
}
