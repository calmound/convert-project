import { type ConversionResult } from '@/types/converter'

const ROMAN_MAP: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

const ROMAN_VALUES: { [key: string]: number } = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000,
}

export function numberToRoman(input: string): ConversionResult {
  try {
    if (!input || input.trim() === '') {
      return {
        success: true,
        output: '',
      }
    }

    const num = parseInt(input)

    if (isNaN(num)) {
      return {
        success: false,
        output: '',
        error: 'Please enter a valid number',
      }
    }

    if (num < 1 || num > 3999) {
      return {
        success: false,
        output: '',
        error: 'Number must be between 1 and 3999',
      }
    }

    let result = ''
    let remaining = num

    for (const [value, numeral] of ROMAN_MAP) {
      while (remaining >= value) {
        result += numeral
        remaining -= value
      }
    }

    return {
      success: true,
      output: result,
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: 'Failed to convert number to Roman numerals',
    }
  }
}

export function romanToNumber(input: string): ConversionResult {
  try {
    if (!input || input.trim() === '') {
      return {
        success: true,
        output: '',
      }
    }

    const roman = input.trim().toUpperCase()

    // 验证输入只包含有效的罗马数字字符
    const validPattern = /^[IVXLCDM]+$/
    if (!validPattern.test(roman)) {
      return {
        success: false,
        output: '',
        error: 'Please enter valid Roman numerals (I, V, X, L, C, D, M)',
      }
    }

    let result = 0
    let prevValue = 0

    // 从右到左遍历
    for (let i = roman.length - 1; i >= 0; i--) {
      const currentValue = ROMAN_VALUES[roman[i]]

      if (!currentValue) {
        return {
          success: false,
          output: '',
          error: 'Invalid Roman numeral character',
        }
      }

      // 如果当前值小于前一个值，则减去（如 IV = 4）
      // 否则加上（如 VI = 6）
      if (currentValue < prevValue) {
        result -= currentValue
      } else {
        result += currentValue
      }

      prevValue = currentValue
    }

    return {
      success: true,
      output: result.toString(),
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: 'Failed to convert Roman numerals to number',
    }
  }
}
