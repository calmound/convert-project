'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Copy, X } from 'lucide-react'
import { type ConversionResult } from '@/types/converter'

interface ConverterPanelProps {
  title?: string
  inputLabel?: string
  outputLabel?: string
  convert: (input: string) => ConversionResult
  inputPlaceholder?: string
  outputPlaceholder?: string
}

export function ConverterPanel({
  title = 'Converter',
  inputLabel = 'Input',
  outputLabel = 'Output',
  convert,
  inputPlaceholder = 'Enter text here...',
  outputPlaceholder = 'Result will appear here...',
}: ConverterPanelProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (value: string) => {
    setInput(value)
    setError('')

    if (!value) {
      setOutput('')
      return
    }

    const result = convert(value)

    if (result.success) {
      setOutput(result.output)
    } else {
      setError(result.error || 'Conversion failed')
      setOutput('')
    }
  }

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">{inputLabel}</label>
          <Textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={inputPlaceholder}
            rows={6}
            className="resize-none"
          />
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">{outputLabel}</label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!output}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={!input && !output}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder={outputPlaceholder}
            rows={6}
            className="resize-none bg-muted"
          />
        </div>
      </CardContent>
    </Card>
  )
}
