'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowRightLeft } from 'lucide-react'
import { convertNumberBase, toTwosComplement } from '@/lib/converters/number/base-converter'

const baseOptions = [
  { value: '2', label: 'Binary (Base 2)' },
  { value: '8', label: 'Octal (Base 8)' },
  { value: '10', label: 'Decimal (Base 10)' },
  { value: '16', label: 'Hex (Base 16)' },
]

const bitWidthOptions = ['8', '16', '32', '64']

export function NumberBaseConverterTool() {
  const [fromValue, setFromValue] = useState('1010')
  const [fromBase, setFromBase] = useState('2')
  const [toBase, setToBase] = useState('10')
  const [bitWidth, setBitWidth] = useState('')

  const result = useMemo(() => {
    return convertNumberBase(fromValue, parseInt(fromBase, 10), parseInt(toBase, 10))
  }, [fromValue, fromBase, toBase])

  const twosComplement = useMemo(() => {
    if (!bitWidth || !result.success || toBase !== '2') return ''
    const parsed = convertNumberBase(fromValue, parseInt(fromBase, 10), 10)
    if (!parsed.success) return ''

    try {
      const value = BigInt(parsed.output)
      return toTwosComplement(value, parseInt(bitWidth, 10))
    } catch {
      return ''
    }
  }, [bitWidth, fromValue, fromBase, result.success, toBase])

  const handleSwap = () => {
    setFromBase(toBase)
    setToBase(fromBase)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Number Base Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>From</Label>
            <div className="flex gap-2">
              <Input
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Enter number"
                className="flex-1"
              />
              <Select value={fromBase} onValueChange={setFromBase}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {baseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-end justify-center md:justify-start">
            <Button variant="outline" size="icon" onClick={handleSwap}>
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>To</Label>
          <div className="flex gap-2">
            <Input
              value={result.success ? result.output : ''}
              readOnly
              placeholder="Result"
              className="flex-1 bg-muted"
            />
            <Select value={toBase} onValueChange={setToBase}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {baseOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {!result.success && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {result.error}
          </div>
        )}

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center gap-3">
            <Label className="min-w-[140px]">Bit Width (optional)</Label>
            <Select value={bitWidth} onValueChange={setBitWidth}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="No bit width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No bit width</SelectItem>
                {bitWidthOptions.map((width) => (
                  <SelectItem key={width} value={width}>
                    {width}-bit
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {twosComplement && (
            <div className="text-sm text-muted-foreground">
              Two&apos;s complement ({bitWidth}-bit): <span className="font-medium text-foreground">{twosComplement}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
