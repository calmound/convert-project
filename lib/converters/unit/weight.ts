export interface WeightUnit {
  id: string
  name: string
  symbol: string
  toKilograms: number // 转换为千克的乘数
}

export const WEIGHT_UNITS: WeightUnit[] = [
  { id: 'mg', name: 'Milligram', symbol: 'mg', toKilograms: 0.000001 },
  { id: 'g', name: 'Gram', symbol: 'g', toKilograms: 0.001 },
  { id: 'kg', name: 'Kilogram', symbol: 'kg', toKilograms: 1 },
  { id: 'ton', name: 'Metric Ton', symbol: 't', toKilograms: 1000 },
  { id: 'oz', name: 'Ounce', symbol: 'oz', toKilograms: 0.0283495 },
  { id: 'lb', name: 'Pound', symbol: 'lb', toKilograms: 0.453592 },
  { id: 'stone', name: 'Stone', symbol: 'st', toKilograms: 6.35029 },
]

export function convertWeight(value: number, fromUnit: string, toUnit: string): number {
  const from = WEIGHT_UNITS.find(u => u.id === fromUnit)
  const to = WEIGHT_UNITS.find(u => u.id === toUnit)

  if (!from || !to) {
    throw new Error('Invalid unit')
  }

  const kilograms = value * from.toKilograms
  return kilograms / to.toKilograms
}
