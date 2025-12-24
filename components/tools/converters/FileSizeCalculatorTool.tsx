'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FILE_SIZE_UNITS, convertFileSize } from '@/lib/converters/unit/file-size'

const SPEED_UNITS = [
  { id: 'Kbps', label: 'Kbps', toBitsPerSecond: 1000 },
  { id: 'Mbps', label: 'Mbps', toBitsPerSecond: 1000 * 1000 },
  { id: 'Gbps', label: 'Gbps', toBitsPerSecond: 1000 * 1000 * 1000 },
  { id: 'KBps', label: 'KB/s', toBitsPerSecond: 8 * 1000 },
  { id: 'MBps', label: 'MB/s', toBitsPerSecond: 8 * 1000 * 1000 },
  { id: 'GBps', label: 'GB/s', toBitsPerSecond: 8 * 1000 * 1000 * 1000 },
]

function formatDuration(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0) return '0s'
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const parts = []
  if (days) parts.push(`${days}d`)
  if (hours) parts.push(`${hours}h`)
  if (minutes) parts.push(`${minutes}m`)
  if (secs || parts.length === 0) parts.push(`${secs}s`)

  return parts.join(' ')
}

export function FileSizeCalculatorTool() {
  const [sizeValue, setSizeValue] = useState('1')
  const [sizeUnit, setSizeUnit] = useState('GB')
  const [outputUnit, setOutputUnit] = useState('MB')
  const [speedValue, setSpeedValue] = useState('100')
  const [speedUnit, setSpeedUnit] = useState('Mbps')

  const conversion = useMemo(() => {
    const value = parseFloat(sizeValue)
    if (isNaN(value)) return ''
    const result = convertFileSize(value, sizeUnit, outputUnit)
    return result.toFixed(6).replace(/\.?0+$/, '')
  }, [sizeValue, sizeUnit, outputUnit])

  const estimatedTime = useMemo(() => {
    const value = parseFloat(sizeValue)
    const speed = parseFloat(speedValue)
    if (isNaN(value) || isNaN(speed) || speed <= 0) return ''

    const sizeInBits = convertFileSize(value, sizeUnit, 'b')
    const unit = SPEED_UNITS.find((item) => item.id === speedUnit)
    if (!unit) return ''

    const seconds = sizeInBits / unit.toBitsPerSecond
    return formatDuration(seconds)
  }, [sizeValue, sizeUnit, speedUnit, speedValue])

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Size & Download Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>File Size</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
              placeholder="Enter size"
              className="flex-1"
            />
            <Select value={sizeUnit} onValueChange={setSizeUnit}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FILE_SIZE_UNITS.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={outputUnit} onValueChange={setOutputUnit}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FILE_SIZE_UNITS.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    to {unit.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            Converted size: <span className="font-medium text-foreground">{conversion || '-'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Network Speed</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={speedValue}
              onChange={(e) => setSpeedValue(e.target.value)}
              placeholder="Enter speed"
              className="flex-1"
            />
            <Select value={speedUnit} onValueChange={setSpeedUnit}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SPEED_UNITS.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="text-sm text-muted-foreground">Estimated transfer time</p>
          <p className="text-2xl font-semibold">{estimatedTime || '-'}</p>
        </div>
      </CardContent>
    </Card>
  )
}
