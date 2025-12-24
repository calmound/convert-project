'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConverterPanel } from '../ConverterPanel'
import {
  decimalToFraction,
  fractionToDecimal,
  decimalToPercentage,
  percentageToDecimal,
  fractionToPercentage,
  percentageToFraction,
} from '@/lib/converters/math/fraction-converter'

type Mode = 'decimal-to-fraction' | 'fraction-to-decimal' | 'decimal-to-percentage' | 'percentage-to-decimal' | 'fraction-to-percentage' | 'percentage-to-fraction'

const modes: Array<{
  id: Mode
  label: string
  inputLabel: string
  outputLabel: string
  placeholder: string
  convert: (input: string) => { success: boolean; output: string; error?: string }
}> = [
  {
    id: 'decimal-to-fraction',
    label: 'Decimal to Fraction',
    inputLabel: 'Decimal',
    outputLabel: 'Fraction',
    placeholder: 'Enter decimal (e.g., 0.75)',
    convert: decimalToFraction,
  },
  {
    id: 'fraction-to-decimal',
    label: 'Fraction to Decimal',
    inputLabel: 'Fraction',
    outputLabel: 'Decimal',
    placeholder: 'Enter fraction (e.g., 3/4)',
    convert: fractionToDecimal,
  },
  {
    id: 'decimal-to-percentage',
    label: 'Decimal to Percentage',
    inputLabel: 'Decimal',
    outputLabel: 'Percentage',
    placeholder: 'Enter decimal (e.g., 0.25)',
    convert: decimalToPercentage,
  },
  {
    id: 'percentage-to-decimal',
    label: 'Percentage to Decimal',
    inputLabel: 'Percentage',
    outputLabel: 'Decimal',
    placeholder: 'Enter percentage (e.g., 75%)',
    convert: percentageToDecimal,
  },
  {
    id: 'fraction-to-percentage',
    label: 'Fraction to Percentage',
    inputLabel: 'Fraction',
    outputLabel: 'Percentage',
    placeholder: 'Enter fraction (e.g., 1/8)',
    convert: fractionToPercentage,
  },
  {
    id: 'percentage-to-fraction',
    label: 'Percentage to Fraction',
    inputLabel: 'Percentage',
    outputLabel: 'Fraction',
    placeholder: 'Enter percentage (e.g., 12.5%)',
    convert: percentageToFraction,
  },
]

export function FractionDecimalPercentageTool() {
  const [mode, setMode] = useState<Mode>('decimal-to-fraction')
  const selected = modes.find((item) => item.id === mode) || modes[0]

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {modes.map((item) => (
          <Button
            key={item.id}
            variant={mode === item.id ? 'default' : 'outline'}
            onClick={() => setMode(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <ConverterPanel
        title={selected.label}
        inputLabel={selected.inputLabel}
        outputLabel={selected.outputLabel}
        convert={selected.convert}
        inputPlaceholder={selected.placeholder}
        outputPlaceholder={`Your ${selected.outputLabel.toLowerCase()} will appear here...`}
      />
    </div>
  )
}
