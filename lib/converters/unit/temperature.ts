export interface TemperatureUnit {
  id: string
  name: string
  symbol: string
}

export const TEMPERATURE_UNITS: TemperatureUnit[] = [
  { id: 'c', name: 'Celsius', symbol: '°C' },
  { id: 'f', name: 'Fahrenheit', symbol: '°F' },
  { id: 'k', name: 'Kelvin', symbol: 'K' },
  { id: 'r', name: 'Rankine', symbol: '°R' },
]

export function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) return value

  // 先转换为摄氏度
  let celsius: number
  switch (fromUnit) {
    case 'c':
      celsius = value
      break
    case 'f':
      celsius = (value - 32) * 5 / 9
      break
    case 'k':
      celsius = value - 273.15
      break
    case 'r':
      celsius = (value - 491.67) * 5 / 9
      break
    default:
      throw new Error('Invalid from unit')
  }

  // 再从摄氏度转换为目标单位
  switch (toUnit) {
    case 'c':
      return celsius
    case 'f':
      return celsius * 9 / 5 + 32
    case 'k':
      return celsius + 273.15
    case 'r':
      return (celsius + 273.15) * 9 / 5
    default:
      throw new Error('Invalid to unit')
  }
}
