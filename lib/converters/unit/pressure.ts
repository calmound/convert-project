export interface PressureUnit {
  id: string
  name: string
  symbol: string
  toPascals: number
}

export const PRESSURE_UNITS: PressureUnit[] = [
  { id: 'pa', name: 'Pascal', symbol: 'Pa', toPascals: 1 },
  { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', toPascals: 1000 },
  { id: 'mpa', name: 'Megapascal', symbol: 'MPa', toPascals: 1_000_000 },
  { id: 'bar', name: 'Bar', symbol: 'bar', toPascals: 100000 },
  { id: 'atm', name: 'Atmosphere', symbol: 'atm', toPascals: 101325 },
  { id: 'psi', name: 'Pounds per Square Inch', symbol: 'psi', toPascals: 6894.757293168 },
]

export function convertPressure(value: number, fromUnit: string, toUnit: string): number {
  const from = PRESSURE_UNITS.find((u) => u.id === fromUnit)
  const to = PRESSURE_UNITS.find((u) => u.id === toUnit)

  if (!from || !to) {
    throw new Error('Invalid unit')
  }

  const pascals = value * from.toPascals
  return pascals / to.toPascals
}
