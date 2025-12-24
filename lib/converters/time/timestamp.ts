export type TimestampUnit = 's' | 'ms' | 'ns'

export function timestampToDate(value: number, unit: TimestampUnit): Date {
  switch (unit) {
    case 's':
      return new Date(value * 1000)
    case 'ms':
      return new Date(value)
    case 'ns':
      return new Date(value / 1_000_000)
    default:
      return new Date(value)
  }
}

export function dateToTimestamp(date: Date, unit: TimestampUnit): number {
  const ms = date.getTime()
  switch (unit) {
    case 's':
      return Math.floor(ms / 1000)
    case 'ms':
      return ms
    case 'ns':
      return ms * 1_000_000
    default:
      return ms
  }
}

export function formatDate(date: Date, useUTC: boolean): string {
  const pad = (value: number) => value.toString().padStart(2, '0')

  const year = useUTC ? date.getUTCFullYear() : date.getFullYear()
  const month = useUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1
  const day = useUTC ? date.getUTCDate() : date.getDate()
  const hours = useUTC ? date.getUTCHours() : date.getHours()
  const minutes = useUTC ? date.getUTCMinutes() : date.getMinutes()
  const seconds = useUTC ? date.getUTCSeconds() : date.getSeconds()

  return `${year}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export function parseLocalDateTime(value: string): Date | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date
}

export function parseUTCDateTime(value: string): Date | null {
  if (!value) return null
  const [datePart, timePart] = value.split('T')
  if (!datePart || !timePart) return null

  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute] = timePart.split(':').map(Number)
  if (!year || !month || !day) return null

  const utc = Date.UTC(year, month - 1, day, hour || 0, minute || 0, 0)
  return new Date(utc)
}
