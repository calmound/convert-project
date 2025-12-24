import { type ConversionResult } from '@/types/converter'

export function toUpperCase(input: string): ConversionResult {
  try {
    if (!input) {
      return {
        success: true,
        output: '',
      }
    }

    return {
      success: true,
      output: input.toUpperCase(),
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: 'Failed to convert to uppercase',
    }
  }
}

export function toLowerCase(input: string): ConversionResult {
  try {
    if (!input) {
      return {
        success: true,
        output: '',
      }
    }

    return {
      success: true,
      output: input.toLowerCase(),
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: 'Failed to convert to lowercase',
    }
  }
}

export function toTitleCase(input: string): ConversionResult {
  try {
    if (!input) {
      return {
        success: true,
        output: '',
      }
    }

    const words = input.toLowerCase().split(' ')
    const titleCased = words.map(word => {
      if (word.length === 0) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })

    return {
      success: true,
      output: titleCased.join(' '),
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: 'Failed to convert to title case',
    }
  }
}

export function toSentenceCase(input: string): ConversionResult {
  try {
    if (!input) {
      return {
        success: true,
        output: '',
      }
    }

    const sentences = input.toLowerCase().split('. ')
    const sentenceCased = sentences.map(sentence => {
      if (sentence.length === 0) return sentence
      return sentence.charAt(0).toUpperCase() + sentence.slice(1)
    })

    return {
      success: true,
      output: sentenceCased.join('. '),
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: 'Failed to convert to sentence case',
    }
  }
}

function splitWords(input: string): string[] {
  const normalized = input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!normalized) return []

  return normalized.split(' ').map((word) => word.toLowerCase())
}

export function toCamelCase(input: string): ConversionResult {
  try {
    const words = splitWords(input)
    if (words.length === 0) {
      return { success: true, output: '' }
    }

    const [first, ...rest] = words
    const result = first + rest.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')

    return { success: true, output: result }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to convert to camelCase' }
  }
}

export function toPascalCase(input: string): ConversionResult {
  try {
    const words = splitWords(input)
    if (words.length === 0) {
      return { success: true, output: '' }
    }

    const result = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')

    return { success: true, output: result }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to convert to PascalCase' }
  }
}

export function toSnakeCase(input: string): ConversionResult {
  try {
    const words = splitWords(input)
    return { success: true, output: words.join('_') }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to convert to snake_case' }
  }
}

export function toKebabCase(input: string): ConversionResult {
  try {
    const words = splitWords(input)
    return { success: true, output: words.join('-') }
  } catch (error) {
    return { success: false, output: '', error: 'Failed to convert to kebab-case' }
  }
}
