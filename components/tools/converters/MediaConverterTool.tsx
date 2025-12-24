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
import { Upload, X } from 'lucide-react'

const CONVERSION_OPTIONS = [
  { id: 'mp4-mp3', label: 'MP4 to MP3' },
  { id: 'gif-mp4', label: 'GIF to MP4' },
  { id: 'mp4-gif', label: 'MP4 to GIF' },
]

export function MediaConverterTool() {
  const [file, setFile] = useState<File | null>(null)
  const [mode, setMode] = useState('mp4-mp3')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0]
    if (!selected) return
    setFile(selected)
  }

  const handleClear = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Upload Media File</label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*,audio/*,image/gif"
              onChange={handleFileSelect}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>{file ? file.name : 'Click to upload or drag & drop'}</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Conversion Type</Label>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CONVERSION_OPTIONS.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Browser-based media conversion</p>
          <p>
            This tool is designed for client-side conversions. Some formats require advanced codecs that are not
            available in all browsers. If conversion is unsupported, the tool will be enabled in a future update.
          </p>
        </div>

        <div className="flex gap-2">
          <Button disabled>Convert</Button>
          <Button variant="ghost" onClick={handleClear} disabled={!file}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
