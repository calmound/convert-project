export interface ConversionResult {
  success: boolean
  output: string
  error?: string
}

export interface ConversionError {
  message: string
  code?: string
  details?: string
}

export type ConverterFunction = (input: string) => ConversionResult
