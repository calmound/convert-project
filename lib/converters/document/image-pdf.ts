import { PDFDocument } from 'pdf-lib'

const PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
}

export async function imagesToPdf(files: File[], pageSize: 'a4' | 'letter'): Promise<{ blob: Blob; filename: string }> {
  const pdfDoc = await PDFDocument.create()
  const { width, height } = PAGE_SIZES[pageSize]

  for (const file of files) {
    const bytes = await file.arrayBuffer()
    const isPng = file.type === 'image/png'
    const embedded = isPng ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes)

    const page = pdfDoc.addPage([width, height])
    const scale = Math.min(width / embedded.width, height / embedded.height)
    const imageWidth = embedded.width * scale
    const imageHeight = embedded.height * scale

    page.drawImage(embedded, {
      x: (width - imageWidth) / 2,
      y: (height - imageHeight) / 2,
      width: imageWidth,
      height: imageHeight,
    })
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  return {
    blob,
    filename: 'images.pdf',
  }
}
