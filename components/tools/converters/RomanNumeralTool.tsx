'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConverterPanel } from '../ConverterPanel'
import { numberToRoman, romanToNumber } from '@/lib/converters/number/roman-numeral'

export function RomanNumeralTool() {
  const [mode, setMode] = useState<'toRoman' | 'toNumber'>('toRoman')

  const converter = mode === 'toRoman' ? numberToRoman : romanToNumber
  const inputPlaceholder = mode === 'toRoman' ? 'Enter number (1-3999)' : 'Enter Roman numerals (e.g., XIV)'
  const outputLabel = mode === 'toRoman' ? 'Roman Numerals' : 'Number'

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={mode === 'toRoman' ? 'default' : 'outline'}
          onClick={() => setMode('toRoman')}
        >
          Number to Roman
        </Button>
        <Button
          variant={mode === 'toNumber' ? 'default' : 'outline'}
          onClick={() => setMode('toNumber')}
        >
          Roman to Number
        </Button>
      </div>

      <ConverterPanel
        title={mode === 'toRoman' ? 'Number to Roman Numerals' : 'Roman Numerals to Number'}
        inputLabel={mode === 'toRoman' ? 'Number' : 'Roman Numerals'}
        outputLabel={outputLabel}
        convert={converter}
        inputPlaceholder={inputPlaceholder}
        outputPlaceholder={`Your ${outputLabel.toLowerCase()} will appear here...`}
      />
    </div>
  )
}
