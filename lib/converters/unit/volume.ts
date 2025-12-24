export interface VolumeUnit {
  id: string
  name: string
  symbol: string
  toCubicMeters: number
}

export const VOLUME_UNITS: VolumeUnit[] = [
  { id: 'ml', name: 'Milliliter', symbol: 'mL', toCubicMeters: 1e-6 },
  { id: 'l', name: 'Liter', symbol: 'L', toCubicMeters: 0.001 },
  { id: 'm3', name: 'Cubic Meter', symbol: 'm^3', toCubicMeters: 1 },
  { id: 'cm3', name: 'Cubic Centimeter', symbol: 'cm^3', toCubicMeters: 1e-6 },
  { id: 'in3', name: 'Cubic Inch', symbol: 'in^3', toCubicMeters: 1.6387064e-5 },
  { id: 'ft3', name: 'Cubic Foot', symbol: 'ft^3', toCubicMeters: 0.028316846592 },
  { id: 'gal', name: 'Gallon (US)', symbol: 'gal', toCubicMeters: 0.003785411784 },
  { id: 'qt', name: 'Quart (US)', symbol: 'qt', toCubicMeters: 0.000946352946 },
  { id: 'pt', name: 'Pint (US)', symbol: 'pt', toCubicMeters: 0.000473176473 },
]

export function convertVolume(value: number, fromUnit: string, toUnit: string): number {
  const from = VOLUME_UNITS.find((u) => u.id === fromUnit)
  const to = VOLUME_UNITS.find((u) => u.id === toUnit)

  if (!from || !to) {
    throw new Error('Invalid unit')
  }

  const cubicMeters = value * from.toCubicMeters
  return cubicMeters / to.toCubicMeters
}
