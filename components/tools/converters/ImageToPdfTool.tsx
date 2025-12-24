'use client'

import { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Download, Upload, X } from 'lucide-react'
import { imagesToPdf } from '@/lib/converters/document/image-pdf'

export function ImageToPdfTool() {
  const [files, setFiles] = useState<File[]>([])
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [error, setError] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || [])
    if (!selected.length) return

    setFiles(selected)
    setError('')
    setOutputBlob(null)
  }

  const handleConvert = async () => {
    if (!files.length) return

    try {
      setIsConverting(true)
      const result = await imagesToPdf(files, pageSize)
      setOutputBlob(result.blob)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed')
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!outputBlob) return

    const url = URL.createObjectURL(outputBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'images.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setFiles([])
    setOutputBlob(null)
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image to PDF</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Upload Images</label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="image-pdf-upload"
            />
            <label
              htmlFor="image-pdf-upload"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>{files.length ? `${files.length} images selected` : 'Click to upload or drag & drop'}</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Page Size</Label>
          <Select value={pageSize} onValueChange={(value) => setPageSize(value as 'a4' | 'letter')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">A4</SelectItem>
              <SelectItem value="letter">Letter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleConvert} disabled={!files.length || isConverting}>
            {isConverting ? 'Building PDF...' : 'Build PDF'}
          </Button>
          <Button variant="outline" onClick={handleDownload} disabled={!outputBlob}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="ghost" onClick={handleClear} disabled={!files.length}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
