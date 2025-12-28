'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Download, X, FileIcon, FileText } from 'lucide-react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export function HtmlToPdfTool() {
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState<string>('')
  const [error, setError] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setInputFile(file)
    setError('')
    setOutputBlob(null)
    setOutputFilename('')

    try {
      const text = await file.text()

      // Sanitize HTML for security (remove all scripts and event handlers)
      const cleanHtml = text
        // Remove script tags
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove inline event handlers (onclick, onload, etc.)
        .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '')
        // Remove javascript: URLs
        .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
        .replace(/src\s*=\s*["']javascript:[^"']*["']/gi, '')

      setHtmlContent(cleanHtml)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read file')
    }
  }

  const handleConvertToPdf = async () => {
    if (!iframeRef.current || !inputFile) return

    try {
      setIsConverting(true)
      setError('')

      // Wait for iframe to fully load
      await new Promise<void>((resolve) => {
        if (iframeRef.current?.contentDocument?.readyState === 'complete') {
          resolve()
        } else {
          iframeRef.current?.addEventListener('load', () => resolve(), { once: true })
        }
      })

      const iframeDoc = iframeRef.current.contentDocument
      if (!iframeDoc || !iframeDoc.body) {
        throw new Error('Failed to access iframe content')
      }

      const element = iframeDoc.body

      // Use html2canvas to capture the content (supports Chinese characters)
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: iframeDoc.documentElement.scrollWidth,
        windowHeight: iframeDoc.documentElement.scrollHeight,
      })

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
      const filename = inputFile.name.replace(/\.html?$/i, '.pdf')

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
    setHtmlContent('')
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
        <CardTitle>Convert HTML to PDF</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Security Notice */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
          ℹ️ <strong>Note:</strong> JavaScript is disabled for security. Only static HTML content will be rendered.
        </div>

        {/* File Upload Section */}
        <div>
          <label className="text-sm font-medium mb-2 block">Upload HTML File (.html)</label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,.htm"
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
        {htmlContent && (
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
            <iframe
              ref={iframeRef}
              srcDoc={htmlContent}
              className="w-full bg-white border rounded-lg"
              style={{
                height: '600px',
                maxHeight: '600px',
              }}
              title="HTML Preview"
              sandbox="allow-same-origin"
            />
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
