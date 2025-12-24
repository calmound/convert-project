import { type ConversionResult } from '@/types/converter'

// 求最大公约数（GCD）
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

// 简化分数
function simplifyFraction(numerator: number, denominator: number): { num: number; den: number } {
  const divisor = gcd(Math.abs(numerator), Math.abs(denominator))
  return {
    num: numerator / divisor,
    den: denominator / divisor,
  }
}

export function decimalToFraction(input: string): ConversionResult {
  try {
    if (!input || input.trim() === '') {
      return {
        success: true,
        output: '',
      }
    }

    const decimal = parseFloat(input)

    if (isNaN(decimal)) {
      return {
        success: false,
        output: '',
        error: 'Please enter a valid decimal number',
      }
    }

    // 处理整数
    if (Number.isInteger(decimal)) {
      return {
        success: true,
        output: `${decimal}/1`,
      }
    }

    // 计算小数位数
    const decimalStr = decimal.toString()
    const decimalPlaces = decimalStr.split('.')[1]?.length || 0

    // 转换为分数
    const denominator = Math.pow(10, decimalPlaces)
    const numerator = Math.round(decimal * denominator)

    // 简化分数
    const simplified = simplifyFraction(numerator, denominator)

    return {
      success: true,
      output: `${simplified.num}/${simplified.den}`,
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: 'Failed to convert decimal to fraction',
    }
  }
}

export function fractionToDecimal(input: string): ConversionResult {
  try {
    if (!input || input.trim() === '') {
      return {
        success: true,
        output: '',
      }
    }

    // 解析分数格式 "numerator/denominator"
    const parts = input.trim().split('/')

    if (parts.length !== 2) {
      return {
        success: false,
        output: '',
        error: 'Please enter a fraction in the format: numerator/denominator (e.g., 3/4)',
      }
    }

    const numerator = parseFloat(parts[0])
    const denominator = parseFloat(parts[1])

    if (isNaN(numerator) || isNaN(denominator)) {
      return {
        success: false,
        output: '',
        error: 'Please enter valid numbers for numerator and denominator',
      }
    }

    if (denominator === 0) {
      return {
        success: false,
        output: '',
        error: 'Denominator cannot be zero',
      }
    }

    const decimal = numerator / denominator

    // 限制小数位数避免无限小数
    const result = Math.round(decimal * 1000000) / 1000000

    return {
      success: true,
      output: result.toString(),
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: 'Failed to convert fraction to decimal',
    }
  }
}

export function decimalToPercentage(input: string): ConversionResult {
  try {
    if (!input || input.trim() === '') {
      return { success: true, output: '' }
    }

    const decimal = parseFloat(input)
    if (isNaN(decimal)) {
      return { success: false, output: '', error: 'Please enter a valid decimal number' }
    }

    const percentage = decimal * 100
    return { success: true, output: `${percentage.toFixed(2).replace(/\.?0+$/, '')}%` }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to convert decimal to percentage' }
  }
}

export function percentageToDecimal(input: string): ConversionResult {
  try {
    if (!input || input.trim() === '') {
      return { success: true, output: '' }
    }

    const cleaned = input.replace('%', '').trim()
    const value = parseFloat(cleaned)
    if (isNaN(value)) {
      return { success: false, output: '', error: 'Please enter a valid percentage' }
    }

    const decimal = value / 100
    return { success: true, output: decimal.toString() }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to convert percentage to decimal' }
  }
}

export function fractionToPercentage(input: string): ConversionResult {
  const decimalResult = fractionToDecimal(input)
  if (!decimalResult.success) return decimalResult

  return decimalToPercentage(decimalResult.output)
}

export function percentageToFraction(input: string): ConversionResult {
  const decimalResult = percentageToDecimal(input)
  if (!decimalResult.success) return decimalResult

  return decimalToFraction(decimalResult.output)
}
