'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Download, X, FileIcon } from 'lucide-react'

interface FileConverterPanelProps {
  title?: string
  acceptedFileTypes: string
  convert: (file: File) => Promise<{ blob: Blob; filename: string }>
  inputLabel?: string
  outputLabel?: string
}

export function FileConverterPanel({
  title = 'File Converter',
  acceptedFileTypes,
  convert,
  inputLabel = 'Upload File',
  outputLabel = 'Download Converted File',
}: FileConverterPanelProps) {
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState<string>('')
  const [error, setError] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setInputFile(file)
    setError('')
    setOutputBlob(null)
    setOutputFilename('')

    // Auto-convert on file selection
    try {
      setIsConverting(true)
      const result = await convert(file)
      setOutputBlob(result.blob)
      setOutputFilename(result.filename)
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
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload Section */}
        <div>
          <label className="text-sm font-medium mb-2 block">{inputLabel}</label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedFileTypes}
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

        {/* Error Message */}
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Converting Status */}
        {isConverting && (
          <div className="text-sm text-primary bg-primary/10 p-3 rounded-md">
            Converting...
          </div>
        )}

        {/* Download Section */}
        {outputBlob && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">{outputLabel}</label>
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
