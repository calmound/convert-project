export interface EnergyUnit {
  id: string
  name: string
  symbol: string
  toJoules: number
}

export const ENERGY_UNITS: EnergyUnit[] = [
  { id: 'j', name: 'Joule', symbol: 'J', toJoules: 1 },
  { id: 'kj', name: 'Kilojoule', symbol: 'kJ', toJoules: 1000 },
  { id: 'mj', name: 'Megajoule', symbol: 'MJ', toJoules: 1_000_000 },
  { id: 'wh', name: 'Watt-hour', symbol: 'Wh', toJoules: 3600 },
  { id: 'kwh', name: 'Kilowatt-hour', symbol: 'kWh', toJoules: 3_600_000 },
  { id: 'cal', name: 'Calorie', symbol: 'cal', toJoules: 4.184 },
  { id: 'kcal', name: 'Kilocalorie', symbol: 'kcal', toJoules: 4184 },
  { id: 'btu', name: 'British Thermal Unit', symbol: 'BTU', toJoules: 1055.05585 },
]

export function convertEnergy(value: number, fromUnit: string, toUnit: string): number {
  const from = ENERGY_UNITS.find((u) => u.id === fromUnit)
  const to = ENERGY_UNITS.find((u) => u.id === toUnit)

  if (!from || !to) {
    throw new Error('Invalid unit')
  }

  const joules = value * from.toJoules
  return joules / to.toJoules
}
