export interface SpeedUnit {
  id: string
  name: string
  symbol: string
  toMetersPerSecond: number
}

export const SPEED_UNITS: SpeedUnit[] = [
  { id: 'mps', name: 'Meters per Second', symbol: 'm/s', toMetersPerSecond: 1 },
  { id: 'kph', name: 'Kilometers per Hour', symbol: 'km/h', toMetersPerSecond: 0.2777777778 },
  { id: 'mph', name: 'Miles per Hour', symbol: 'mph', toMetersPerSecond: 0.44704 },
  { id: 'knot', name: 'Knot', symbol: 'kn', toMetersPerSecond: 0.514444 },
  { id: 'fps', name: 'Feet per Second', symbol: 'ft/s', toMetersPerSecond: 0.3048 },
]

export function convertSpeed(value: number, fromUnit: string, toUnit: string): number {
  const from = SPEED_UNITS.find((u) => u.id === fromUnit)
  const to = SPEED_UNITS.find((u) => u.id === toUnit)

  if (!from || !to) {
    throw new Error('Invalid unit')
  }

  const metersPerSecond = value * from.toMetersPerSecond
  return metersPerSecond / to.toMetersPerSecond
}
