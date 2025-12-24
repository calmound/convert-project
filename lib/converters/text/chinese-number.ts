import { type ConversionResult } from '@/types/converter'

type NumeralSet = {
  digits: string[]
  units: string[]
  groupUnits: string[]
  omitTenOne: boolean
}

const LOWER_SET: NumeralSet = {
  digits: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
  units: ['', '十', '百', '千'],
  groupUnits: ['', '万', '亿'],
  omitTenOne: true,
}

const UPPER_SET: NumeralSet = {
  digits: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
  units: ['', '拾', '佰', '仟'],
  groupUnits: ['', '万', '亿'],
  omitTenOne: false,
}

function convertFourDigits(value: string, set: NumeralSet): string {
  let result = ''
  const digits = value.padStart(4, '0').split('').map((d) => parseInt(d, 10))

  for (let i = 0; i < digits.length; i += 1) {
    const num = digits[i]
    const unitIndex = digits.length - i - 1

    if (num === 0) {
      if (!result.endsWith(set.digits[0]) && result !== '') {
        result += set.digits[0]
      }
    } else {
      const digitText = set.digits[num]
      result += digitText + set.units[unitIndex]
    }
  }

  return result.replace(/零+$/g, '')
}

function convertIntegerPart(value: string, set: NumeralSet): string {
  if (value === '0') return set.digits[0]

  const groups: string[] = []
  for (let i = value.length; i > 0; i -= 4) {
    groups.unshift(value.substring(Math.max(0, i - 4), i))
  }

  let result = ''
  groups.forEach((group, index) => {
    const groupText = convertFourDigits(group, set)
    if (!groupText) {
      if (!result.endsWith(set.digits[0]) && result !== '') {
        result += set.digits[0]
      }
      return
    }

    result += groupText + set.groupUnits[groups.length - index - 1]
  })

  result = result.replace(/零+/g, set.digits[0]).replace(/零+$/g, '')

  if (set.omitTenOne && result.startsWith(set.digits[1] + set.units[1])) {
    result = result.replace(set.digits[1] + set.units[1], set.units[1])
  }

  return result
}

function normalizeInput(input: string): { sign: string; integer: string; decimal: string } | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  const sign = trimmed.startsWith('-') ? '负' : ''
  const sanitized = trimmed.replace(/[,+\s]/g, '').replace(/^[-+]/, '')
  if (!/^(\d+)(\.\d+)?$/.test(sanitized)) return null

  const [integer, decimal = ''] = sanitized.split('.')
  return { sign, integer: integer.replace(/^0+(?=\d)/, ''), decimal }
}

function convertChineseNumber(input: string, set: NumeralSet): ConversionResult {
  try {
    if (!input || input.trim() === '') {
      return { success: true, output: '' }
    }

    const parsed = normalizeInput(input)
    if (!parsed) {
      return { success: false, output: '', error: 'Please enter a valid number' }
    }

    const integerText = convertIntegerPart(parsed.integer || '0', set)
    if (!parsed.decimal) {
      return { success: true, output: `${parsed.sign}${integerText}` }
    }

    const decimalText = parsed.decimal
      .split('')
      .map((digit) => set.digits[parseInt(digit, 10)])
      .join('')

    return { success: true, output: `${parsed.sign}${integerText}点${decimalText}` }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to convert Chinese numerals' }
  }
}

export function toChineseLowercase(input: string): ConversionResult {
  return convertChineseNumber(input, LOWER_SET)
}

export function toChineseUppercase(input: string): ConversionResult {
  return convertChineseNumber(input, UPPER_SET)
}
