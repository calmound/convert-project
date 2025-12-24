'use client'

import { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Download, Upload, X } from 'lucide-react'

const OUTPUT_FORMATS = [
  { value: 'image/png', label: 'PNG' },
  { value: 'image/jpeg', label: 'JPG' },
  { value: 'image/webp', label: 'WebP' },
]

export function ImageConverterTool() {
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFormat, setOutputFormat] = useState('image/png')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [quality, setQuality] = useState('92')
  const [error, setError] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setInputFile(file)
    setOutputBlob(null)
    setError('')
  }

  const handleConvert = async () => {
    if (!inputFile) return
    setError('')

    try {
      setIsConverting(true)
      const img = new Image()
      const url = URL.createObjectURL(inputFile)

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          URL.revokeObjectURL(url)
          resolve()
        }
        img.onerror = () => {
          URL.revokeObjectURL(url)
          reject(new Error('Failed to load image'))
        }
        img.src = url
      })

      const targetWidth = width ? parseInt(width, 10) : img.width
      const targetHeight = height ? parseInt(height, 10) : img.height

      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas not supported')

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      const qualityValue = Math.min(Math.max(parseInt(quality, 10) / 100, 0.1), 1)

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((data) => resolve(data), outputFormat, qualityValue)
      )

      if (!blob) throw new Error('Failed to convert image')
      setOutputBlob(blob)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed')
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!outputBlob || !inputFile) return
    const extension = outputFormat.split('/')[1] || 'png'
    const filename = inputFile.name.replace(/\.[^/.]+$/, `.${extension}`)

    const url = URL.createObjectURL(outputBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setInputFile(null)
    setOutputBlob(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Format Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Upload Image</label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.svg"
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>{inputFile ? inputFile.name : 'Click to upload or drag & drop'}</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Output Format</Label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OUTPUT_FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Width (px)</Label>
            <Input value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Auto" />
          </div>
          <div className="space-y-2">
            <Label>Height (px)</Label>
            <Input value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Auto" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Quality (JPG/WebP)</Label>
          <Input value={quality} onChange={(e) => setQuality(e.target.value)} placeholder="92" />
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleConvert} disabled={!inputFile || isConverting}>
            {isConverting ? 'Converting...' : 'Convert'}
          </Button>
          <Button variant="outline" onClick={handleDownload} disabled={!outputBlob}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="ghost" onClick={handleClear} disabled={!inputFile}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
