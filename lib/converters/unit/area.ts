export interface AreaUnit {
  id: string
  name: string
  symbol: string
  toSquareMeters: number
}

export const AREA_UNITS: AreaUnit[] = [
  { id: 'mm2', name: 'Square Millimeter', symbol: 'mm^2', toSquareMeters: 1e-6 },
  { id: 'cm2', name: 'Square Centimeter', symbol: 'cm^2', toSquareMeters: 1e-4 },
  { id: 'm2', name: 'Square Meter', symbol: 'm^2', toSquareMeters: 1 },
  { id: 'km2', name: 'Square Kilometer', symbol: 'km^2', toSquareMeters: 1e6 },
  { id: 'in2', name: 'Square Inch', symbol: 'in^2', toSquareMeters: 0.00064516 },
  { id: 'ft2', name: 'Square Foot', symbol: 'ft^2', toSquareMeters: 0.09290304 },
  { id: 'yd2', name: 'Square Yard', symbol: 'yd^2', toSquareMeters: 0.83612736 },
  { id: 'acre', name: 'Acre', symbol: 'acre', toSquareMeters: 4046.8564224 },
  { id: 'hectare', name: 'Hectare', symbol: 'ha', toSquareMeters: 10000 },
]

export function convertArea(value: number, fromUnit: string, toUnit: string): number {
  const from = AREA_UNITS.find((u) => u.id === fromUnit)
  const to = AREA_UNITS.find((u) => u.id === toUnit)

  if (!from || !to) {
    throw new Error('Invalid unit')
  }

  const squareMeters = value * from.toSquareMeters
  return squareMeters / to.toSquareMeters
}
