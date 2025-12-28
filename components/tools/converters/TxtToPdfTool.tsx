'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Download, X, FileIcon, FileText } from 'lucide-react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export function TxtToPdfTool() {
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [textContent, setTextContent] = useState<string>('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState<string>('')
  const [error, setError] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setInputFile(file)
    setError('')
    setOutputBlob(null)
    setOutputFilename('')

    try {
      const text = await file.text()
      setTextContent(text)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read file')
    }
  }

  const handleConvertToPdf = async () => {
    if (!previewRef.current || !inputFile) return

    try {
      setIsConverting(true)
      setError('')

      const element = previewRef.current

      // Temporarily remove max height to capture full content
      const originalMaxHeight = element.style.maxHeight
      const originalOverflow = element.style.overflow
      element.style.maxHeight = 'none'
      element.style.overflow = 'visible'

      // Use html2canvas to capture the content (supports Chinese characters)
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      // Restore original styles
      element.style.maxHeight = originalMaxHeight
      element.style.overflow = originalOverflow

      // Create PDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 190 // A4 width minus margins (210mm - 20mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const pageHeight = 277 // A4 height minus margins (297mm - 20mm)

      let heightLeft = imgHeight
      let position = 10 // Top margin

      // Add first page
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10
        doc.addPage()
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Convert PDF to blob
      const pdfBlob = doc.output('blob')
      const filename = inputFile.name.replace(/\.txt$/i, '.pdf')

      setOutputBlob(pdfBlob)
      setOutputFilename(filename)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed')
      setOutputBlob(null)
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!outputBlob || !outputFilename) return

    const url = URL.createObjectURL(outputBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = outputFilename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setInputFile(null)
    setTextContent('')
    setOutputBlob(null)
    setOutputFilename('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Convert Text to PDF</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload Section */}
        <div>
          <label className="text-sm font-medium mb-2 block">Upload Text File (.txt)</label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>
                {inputFile ? inputFile.name : 'Click to upload or drag & drop'}
              </span>
            </label>
          </div>
          {inputFile && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <FileIcon className="h-4 w-4" />
              <span>{inputFile.name}</span>
              <span>({(inputFile.size / 1024).toFixed(2)} KB)</span>
            </div>
          )}
        </div>

        {/* Preview Section */}
        {textContent && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Preview</label>
              <Button
                variant="default"
                size="sm"
                onClick={handleConvertToPdf}
                disabled={isConverting}
              >
                <FileText className="h-4 w-4 mr-2" />
                {isConverting ? 'Converting...' : 'Convert to PDF'}
              </Button>
            </div>
            <div
              ref={previewRef}
              className="p-8 bg-white border rounded-lg overflow-auto max-h-[600px] text-preview"
            >
              <pre style={{
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#24292f',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                margin: 0,
              }}>
                {textContent}
              </pre>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Download Section */}
        {outputBlob && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Download PDF File</label>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <FileIcon className="h-5 w-5" />
                <span className="font-medium">{outputFilename}</span>
                <span className="text-sm text-muted-foreground">
                  ({(outputBlob.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Clear Button (when no output) */}
        {inputFile && !outputBlob && !isConverting && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
