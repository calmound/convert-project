import { type ConversionResult } from '@/types/converter'

const BASES = [2, 8, 10, 16] as const

function parseBigInt(input: string, base: number): bigint {
  const trimmed = input.trim().toLowerCase()
  if (!trimmed) {
    throw new Error('Empty input')
  }

  const sign = trimmed.startsWith('-') ? -1n : 1n
  const unsigned = trimmed.replace(/^[-+]/, '')

  if (!unsigned) {
    throw new Error('Invalid number')
  }

  switch (base) {
    case 2:
      if (!/^[01]+$/.test(unsigned)) throw new Error('Invalid binary number')
      return sign * BigInt(`0b${unsigned}`)
    case 8:
      if (!/^[0-7]+$/.test(unsigned)) throw new Error('Invalid octal number')
      return sign * BigInt(`0o${unsigned}`)
    case 10:
      if (!/^\d+$/.test(unsigned)) throw new Error('Invalid decimal number')
      return sign * BigInt(unsigned)
    case 16:
      if (!/^[0-9a-f]+$/.test(unsigned)) throw new Error('Invalid hexadecimal number')
      return sign * BigInt(`0x${unsigned}`)
    default:
      throw new Error('Unsupported base')
  }
}

function formatBigInt(value: bigint, base: number): string {
  if (base === 10) return value.toString(10)
  return value.toString(base).toUpperCase()
}

export function convertNumberBase(input: string, fromBase: number, toBase: number): ConversionResult {
  try {
    if (!input || input.trim() === '') {
      return { success: true, output: '' }
    }

    if (!BASES.includes(fromBase) || !BASES.includes(toBase)) {
      return { success: false, output: '', error: 'Unsupported base' }
    }

    const value = parseBigInt(input, fromBase)
    return { success: true, output: formatBigInt(value, toBase) }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'Failed to convert number base',
    }
  }
}

export function toTwosComplement(value: bigint, bitWidth: number): string {
  const maxBits = BigInt(bitWidth)
  if (bitWidth <= 0) return ''

  const mask = (1n << maxBits) - 1n
  const twos = (value & mask)
  return twos.toString(2).padStart(bitWidth, '0')
}
