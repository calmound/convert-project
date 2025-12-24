'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConverterPanel } from '../ConverterPanel'
import { toUpperCase, toLowerCase, toTitleCase, toSentenceCase, toCamelCase, toPascalCase, toSnakeCase, toKebabCase } from '@/lib/converters/text/case-converter'

export function CaseConverterTool() {
  const [mode, setMode] = useState<'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab'>('lower')

  const converters = {
    upper: toUpperCase,
    lower: toLowerCase,
    title: toTitleCase,
    sentence: toSentenceCase,
    camel: toCamelCase,
    pascal: toPascalCase,
    snake: toSnakeCase,
    kebab: toKebabCase,
  }

  const labels = {
    upper: 'Uppercase',
    lower: 'Lowercase',
    title: 'Title Case',
    sentence: 'Sentence Case',
    camel: 'camelCase',
    pascal: 'PascalCase',
    snake: 'snake_case',
    kebab: 'kebab-case',
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={mode === 'lower' ? 'default' : 'outline'}
          onClick={() => setMode('lower')}
        >
          to lowercase
        </Button>
        <Button
          variant={mode === 'upper' ? 'default' : 'outline'}
          onClick={() => setMode('upper')}
        >
          TO UPPERCASE
        </Button>
        <Button
          variant={mode === 'title' ? 'default' : 'outline'}
          onClick={() => setMode('title')}
        >
          To Title Case
        </Button>
        <Button
          variant={mode === 'sentence' ? 'default' : 'outline'}
          onClick={() => setMode('sentence')}
        >
          To sentence case
        </Button>
        <Button
          variant={mode === 'camel' ? 'default' : 'outline'}
          onClick={() => setMode('camel')}
        >
          to camelCase
        </Button>
        <Button
          variant={mode === 'pascal' ? 'default' : 'outline'}
          onClick={() => setMode('pascal')}
        >
          To PascalCase
        </Button>
        <Button
          variant={mode === 'snake' ? 'default' : 'outline'}
          onClick={() => setMode('snake')}
        >
          to snake_case
        </Button>
        <Button
          variant={mode === 'kebab' ? 'default' : 'outline'}
          onClick={() => setMode('kebab')}
        >
          to kebab-case
        </Button>
      </div>

      <ConverterPanel
        title={`Convert to ${labels[mode]}`}
        inputLabel="Input Text"
        outputLabel={labels[mode]}
        convert={converters[mode]}
        inputPlaceholder="Enter your text here..."
        outputPlaceholder={`Your ${labels[mode].toLowerCase()} text will appear here...`}
      />
    </div>
  )
}
