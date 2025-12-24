'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ConverterPanel } from '../ConverterPanel'
import { toChineseLowercase, toChineseUppercase } from '@/lib/converters/text/chinese-number'

export function ChineseNumberConverterTool() {
  const [mode, setMode] = useState<'lower' | 'upper'>('lower')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={mode === 'lower' ? 'default' : 'outline'}
          onClick={() => setMode('lower')}
        >
          小写数字
        </Button>
        <Button
          variant={mode === 'upper' ? 'default' : 'outline'}
          onClick={() => setMode('upper')}
        >
          大写数字
        </Button>
      </div>

      <ConverterPanel
        title={mode === 'lower' ? '中文数字小写' : '中文数字大写'}
        inputLabel="数字"
        outputLabel={mode === 'lower' ? '小写中文' : '大写中文'}
        convert={mode === 'lower' ? toChineseLowercase : toChineseUppercase}
        inputPlaceholder="输入数字，例如 12345.67"
        outputPlaceholder="转换结果将显示在这里"
      />
    </div>
  )
}
