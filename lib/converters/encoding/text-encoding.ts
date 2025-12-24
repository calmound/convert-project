import { type ConversionResult } from '@/types/converter'

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function base64Encode(input: string): ConversionResult {
  try {
    if (!input) return { success: true, output: '' }
    const bytes = new TextEncoder().encode(input)
    return { success: true, output: bytesToBase64(bytes) }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to encode Base64' }
  }
}

export function base64Decode(input: string): ConversionResult {
  try {
    if (!input) return { success: true, output: '' }
    const bytes = base64ToBytes(input.trim())
    const text = new TextDecoder().decode(bytes)
    return { success: true, output: text }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to decode Base64' }
  }
}

export function urlEncode(input: string): ConversionResult {
  try {
    if (!input) return { success: true, output: '' }
    return { success: true, output: encodeURIComponent(input) }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to encode URL' }
  }
}

export function urlDecode(input: string): ConversionResult {
  try {
    if (!input) return { success: true, output: '' }
    return { success: true, output: decodeURIComponent(input) }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to decode URL' }
  }
}

export function unicodeEncode(input: string): ConversionResult {
  try {
    if (!input) return { success: true, output: '' }
    const output = Array.from(input)
      .map((char) => `\\u${char.codePointAt(0)?.toString(16).padStart(4, '0')}`)
      .join('')
    return { success: true, output }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to encode Unicode' }
  }
}

export function unicodeDecode(input: string): ConversionResult {
  try {
    if (!input) return { success: true, output: '' }
    const output = input.replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    return { success: true, output }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to decode Unicode' }
  }
}
