'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, type RGB, type HSL } from '@/lib/converters/color/color-converter'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function ColorConverterTool() {
  const [hex, setHex] = useState('#3498DB')
  const [rgb, setRgb] = useState<RGB>({ r: 52, g: 152, b: 219 })
  const [hsl, setHsl] = useState<HSL>({ h: 204, s: 70, l: 53 })

  const updateFromHex = (value: string) => {
    setHex(value)
    const parsed = hexToRgb(value)
    if (parsed) {
      setRgb(parsed)
      setHsl(rgbToHsl(parsed))
    }
  }

  const updateFromRgb = (value: RGB) => {
    const safe = {
      r: clamp(value.r, 0, 255),
      g: clamp(value.g, 0, 255),
      b: clamp(value.b, 0, 255),
    }
    setRgb(safe)
    setHex(rgbToHex(safe))
    setHsl(rgbToHsl(safe))
  }

  const updateFromHsl = (value: HSL) => {
    const safe = {
      h: clamp(value.h, 0, 360),
      s: clamp(value.s, 0, 100),
      l: clamp(value.l, 0, 100),
    }
    setHsl(safe)
    const rgbValue = hslToRgb(safe)
    setRgb(rgbValue)
    setHex(rgbToHex(rgbValue))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label>HEX</Label>
              <Input value={hex} onChange={(e) => updateFromHex(e.target.value)} placeholder="#RRGGBB" />
            </div>

            <div className="space-y-2">
              <Label>RGB</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  value={rgb.r}
                  onChange={(e) => updateFromRgb({ ...rgb, r: Number(e.target.value) })}
                  placeholder="R"
                />
                <Input
                  type="number"
                  value={rgb.g}
                  onChange={(e) => updateFromRgb({ ...rgb, g: Number(e.target.value) })}
                  placeholder="G"
                />
                <Input
                  type="number"
                  value={rgb.b}
                  onChange={(e) => updateFromRgb({ ...rgb, b: Number(e.target.value) })}
                  placeholder="B"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>HSL</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  value={hsl.h}
                  onChange={(e) => updateFromHsl({ ...hsl, h: Number(e.target.value) })}
                  placeholder="H"
                />
                <Input
                  type="number"
                  value={hsl.s}
                  onChange={(e) => updateFromHsl({ ...hsl, s: Number(e.target.value) })}
                  placeholder="S"
                />
                <Input
                  type="number"
                  value={hsl.l}
                  onChange={(e) => updateFromHsl({ ...hsl, l: Number(e.target.value) })}
                  placeholder="L"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-52">
            <Label className="block mb-2">Preview</Label>
            <div className="h-40 w-full rounded-lg border" style={{ backgroundColor: hex }} />
            <div className="mt-3 text-sm text-muted-foreground">
              <div>HEX: <span className="text-foreground font-medium">{hex.toUpperCase()}</span></div>
              <div>RGB: <span className="text-foreground font-medium">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</span></div>
              <div>HSL: <span className="text-foreground font-medium">{`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}</span></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
