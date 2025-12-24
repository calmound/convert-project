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
import { formatDate, parseLocalDateTime, parseUTCDateTime, timestampToDate, dateToTimestamp, type TimestampUnit } from '@/lib/converters/time/timestamp'

export function TimeTimestampConverterTool() {
  const [timestamp, setTimestamp] = useState('1704067200')
  const [timestampUnit, setTimestampUnit] = useState<TimestampUnit>('s')
  const [dateValue, setDateValue] = useState('2024-01-01T00:00')
  const [timezone, setTimezone] = useState<'local' | 'utc'>('utc')

  const dateFromTimestamp = useMemo(() => {
    const value = parseFloat(timestamp)
    if (Number.isNaN(value)) return ''
    const date = timestampToDate(value, timestampUnit)
    return `${formatDate(date, timezone === 'utc')} (${timezone.toUpperCase()})`
  }, [timestamp, timestampUnit, timezone])

  const timestampFromDate = useMemo(() => {
    const parsed = timezone === 'utc' ? parseUTCDateTime(dateValue) : parseLocalDateTime(dateValue)
    if (!parsed) return ''
    return dateToTimestamp(parsed, timestampUnit).toString()
  }, [dateValue, timestampUnit, timezone])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time & Timestamp Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Timestamp</Label>
            <Input
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="Enter timestamp"
            />
          </div>
          <div className="space-y-2">
            <Label>Timestamp Unit</Label>
            <Select value={timestampUnit} onValueChange={(value) => setTimestampUnit(value as TimestampUnit)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s">Seconds</SelectItem>
                <SelectItem value="ms">Milliseconds</SelectItem>
                <SelectItem value="ns">Nanoseconds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="text-sm text-muted-foreground">Converted date</p>
          <p className="text-lg font-semibold">{dateFromTimestamp || '-'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date & Time</Label>
            <Input
              type="datetime-local"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select value={timezone} onValueChange={(value) => setTimezone(value as 'local' | 'utc')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="local">Local</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="text-sm text-muted-foreground">Converted timestamp</p>
          <p className="text-lg font-semibold">{timestampFromDate || '-'}</p>
        </div>
      </CardContent>
    </Card>
  )
}
