export interface LengthUnit {
  id: string
  name: string
  symbol: string
  toMeters: number // 转换为米的乘数
}

export const LENGTH_UNITS: LengthUnit[] = [
  { id: 'mm', name: 'Millimeter', symbol: 'mm', toMeters: 0.001 },
  { id: 'cm', name: 'Centimeter', symbol: 'cm', toMeters: 0.01 },
  { id: 'm', name: 'Meter', symbol: 'm', toMeters: 1 },
  { id: 'km', name: 'Kilometer', symbol: 'km', toMeters: 1000 },
  { id: 'inch', name: 'Inch', symbol: 'in', toMeters: 0.0254 },
  { id: 'foot', name: 'Foot', symbol: 'ft', toMeters: 0.3048 },
  { id: 'yard', name: 'Yard', symbol: 'yd', toMeters: 0.9144 },
  { id: 'mile', name: 'Mile', symbol: 'mi', toMeters: 1609.344 },
]

export function convertLength(value: number, fromUnit: string, toUnit: string): number {
  const from = LENGTH_UNITS.find(u => u.id === fromUnit)
  const to = LENGTH_UNITS.find(u => u.id === toUnit)

  if (!from || !to) {
    throw new Error('Invalid unit')
  }

  // 先转换为米，再转换为目标单位
  const meters = value * from.toMeters
  return meters / to.toMeters
}
