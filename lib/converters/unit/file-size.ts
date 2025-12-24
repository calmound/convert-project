export interface FileSizeUnit {
  id: string
  name: string
  symbol: string
  toBytes: number // 转换为字节的乘数
  isBinary?: boolean // 是否是二进制单位（1024）
}

export const FILE_SIZE_UNITS: FileSizeUnit[] = [
  { id: 'b', name: 'Bit', symbol: 'b', toBytes: 0.125 },
  { id: 'B', name: 'Byte', symbol: 'B', toBytes: 1 },
  { id: 'KB', name: 'Kilobyte', symbol: 'KB', toBytes: 1000 },
  { id: 'MB', name: 'Megabyte', symbol: 'MB', toBytes: 1000 ** 2 },
  { id: 'GB', name: 'Gigabyte', symbol: 'GB', toBytes: 1000 ** 3 },
  { id: 'TB', name: 'Terabyte', symbol: 'TB', toBytes: 1000 ** 4 },
  { id: 'PB', name: 'Petabyte', symbol: 'PB', toBytes: 1000 ** 5 },
  { id: 'KiB', name: 'Kibibyte', symbol: 'KiB', toBytes: 1024, isBinary: true },
  { id: 'MiB', name: 'Mebibyte', symbol: 'MiB', toBytes: 1024 ** 2, isBinary: true },
  { id: 'GiB', name: 'Gibibyte', symbol: 'GiB', toBytes: 1024 ** 3, isBinary: true },
  { id: 'TiB', name: 'Tebibyte', symbol: 'TiB', toBytes: 1024 ** 4, isBinary: true },
  { id: 'PiB', name: 'Pebibyte', symbol: 'PiB', toBytes: 1024 ** 5, isBinary: true },
]

export function convertFileSize(value: number, fromUnit: string, toUnit: string): number {
  const from = FILE_SIZE_UNITS.find(u => u.id === fromUnit)
  const to = FILE_SIZE_UNITS.find(u => u.id === toUnit)

  if (!from || !to) {
    throw new Error('Invalid unit')
  }

  const bytes = value * from.toBytes
  return bytes / to.toBytes
}
