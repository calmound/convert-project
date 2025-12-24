import { type ConversionResult } from '@/types/converter'

const BASES = [2, 8, 10, 16]

function parseNumber(input: string, base: number): number {
  const trimmed = input.trim().toLowerCase()
  if (!trimmed) {
    throw new Error('Empty input')
  }

  const unsigned = trimmed.replace(/^[-+]/, '')
  if (!unsigned) {
    throw new Error('Invalid number')
  }

  const isNegative = trimmed.startsWith('-')

  switch (base) {
    case 2:
      if (!/^[01]+$/.test(unsigned)) throw new Error('Invalid binary number')
      break
    case 8:
      if (!/^[0-7]+$/.test(unsigned)) throw new Error('Invalid octal number')
      break
    case 10:
      if (!/^\d+$/.test(unsigned)) throw new Error('Invalid decimal number')
      break
    case 16:
      if (!/^[0-9a-f]+$/.test(unsigned)) throw new Error('Invalid hexadecimal number')
      break
    default:
      throw new Error('Unsupported base')
  }

  const parsed = parseInt(unsigned, base)
  if (Number.isNaN(parsed)) {
    throw new Error('Invalid number')
  }

  return isNegative ? -parsed : parsed
}

function formatNumber(value: number, base: number): string {
  if (base === 10) return value.toString(10)
  return Math.abs(value).toString(base).toUpperCase()
}

export function convertNumberBase(input: string, fromBase: number, toBase: number): ConversionResult {
  try {
    if (!input || input.trim() === '') {
      return { success: true, output: '' }
    }

    if (!BASES.includes(fromBase) || !BASES.includes(toBase)) {
      return { success: false, output: '', error: 'Unsupported base' }
    }

    const value = parseNumber(input, fromBase)
    const formatted = formatNumber(value, toBase)
    return { success: true, output: value < 0 ? `-${formatted}` : formatted }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'Failed to convert number base',
    }
  }
}

export function toTwosComplement(value: number, bitWidth: number): string {
  if (bitWidth <= 0 || bitWidth > 32) return ''
  const max = 2 ** bitWidth
  const normalized = ((value % max) + max) % max
  return Math.floor(normalized).toString(2).padStart(bitWidth, '0')
}
