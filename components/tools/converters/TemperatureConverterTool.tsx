'use client'

import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowRightLeft } from 'lucide-react'
import { TEMPERATURE_UNITS, convertTemperature } from '@/lib/converters/unit/temperature'

export function TemperatureConverterTool() {
  const [fromValue, setFromValue] = useState('0')
  const [fromUnit, setFromUnit] = useState('c')
  const [toUnit, setToUnit] = useState('f')
  const [toValue, setToValue] = useState('')

  const handleFromValueChange = useCallback((value: string) => {
    setFromValue(value)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) {
        const result = convertTemperature(num, fromUnit, toUnit)
        setToValue(result.toFixed(2).replace(/\.?0+$/, ''))
      }
    } else {
      setToValue('')
    }
  }, [fromUnit, toUnit])

  useEffect(() => {
    handleFromValueChange(fromValue)
  }, [fromValue, fromUnit, toUnit, handleFromValueChange])

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>From</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="Enter value"
                className="flex-1"
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEMPERATURE_UNITS.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} ({unit.symbol})
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
              type="number"
              value={toValue}
              readOnly
              placeholder="Result"
              className="flex-1 bg-muted"
            />
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPERATURE_UNITS.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">Common Temperature References</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Water freezes: 0°C = 32°F = 273.15K</p>
            <p>Room temperature: 20°C = 68°F = 293.15K</p>
            <p>Body temperature: 37°C = 98.6°F = 310.15K</p>
            <p>Water boils: 100°C = 212°F = 373.15K</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
