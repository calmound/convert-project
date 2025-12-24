'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConverterPanel } from '../ConverterPanel'
import { decimalToFraction, fractionToDecimal } from '@/lib/converters/math/fraction-converter'

export function FractionConverterTool() {
  const [mode, setMode] = useState<'toFraction' | 'toDecimal'>('toFraction')

  const converter = mode === 'toFraction' ? decimalToFraction : fractionToDecimal
  const inputPlaceholder = mode === 'toFraction' ? 'Enter decimal (e.g., 0.75)' : 'Enter fraction (e.g., 3/4)'
  const outputLabel = mode === 'toFraction' ? 'Fraction' : 'Decimal'

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={mode === 'toFraction' ? 'default' : 'outline'}
          onClick={() => setMode('toFraction')}
        >
          Decimal to Fraction
        </Button>
        <Button
          variant={mode === 'toDecimal' ? 'default' : 'outline'}
          onClick={() => setMode('toDecimal')}
        >
          Fraction to Decimal
        </Button>
      </div>

      <ConverterPanel
        title={mode === 'toFraction' ? 'Decimal to Fraction' : 'Fraction to Decimal'}
        inputLabel={mode === 'toFraction' ? 'Decimal' : 'Fraction'}
        outputLabel={outputLabel}
        convert={converter}
        inputPlaceholder={inputPlaceholder}
        outputPlaceholder={`Your ${outputLabel.toLowerCase()} will appear here...`}
      />
    </div>
  )
}
