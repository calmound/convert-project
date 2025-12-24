'use client'

import { useState } from 'react'
import { ComprehensiveToolPanel, FeaturePanel } from '../ComprehensiveToolPanel'
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
import { LENGTH_UNITS, convertLength } from '@/lib/converters/unit/length'
import { WEIGHT_UNITS, convertWeight } from '@/lib/converters/unit/weight'
import { AREA_UNITS, convertArea } from '@/lib/converters/unit/area'
import { VOLUME_UNITS, convertVolume } from '@/lib/converters/unit/volume'
import { SPEED_UNITS, convertSpeed } from '@/lib/converters/unit/speed'
import { PRESSURE_UNITS, convertPressure } from '@/lib/converters/unit/pressure'
import { ENERGY_UNITS, convertEnergy } from '@/lib/converters/unit/energy'
import { TEMPERATURE_UNITS, convertTemperature } from '@/lib/converters/unit/temperature'
import { FILE_SIZE_UNITS, convertFileSize } from '@/lib/converters/unit/file-size'

const features = [
  { id: 'length', name: 'Length', description: 'Convert between length units' },
  { id: 'weight', name: 'Weight', description: 'Convert between weight units' },
  { id: 'area', name: 'Area', description: 'Convert between area units' },
  { id: 'volume', name: 'Volume', description: 'Convert between volume units' },
  { id: 'speed', name: 'Speed', description: 'Convert between speed units' },
  { id: 'pressure', name: 'Pressure', description: 'Convert between pressure units' },
  { id: 'energy', name: 'Energy', description: 'Convert between energy units' },
  { id: 'temperature', name: 'Temperature', description: 'Convert between temperature units' },
  { id: 'filesize', name: 'File Size', description: 'Convert between file size units' },
]

export function UnitConverterTool() {
  return (
    <ComprehensiveToolPanel
      title="Unit Converter"
      description="Convert between different units of measurement"
      features={features}
      defaultFeature="length"
    >
      <FeaturePanel featureId="length">
        <LengthConverter />
      </FeaturePanel>
      <FeaturePanel featureId="weight">
        <WeightConverter />
      </FeaturePanel>
      <FeaturePanel featureId="area">
        <AreaConverter />
      </FeaturePanel>
      <FeaturePanel featureId="volume">
        <VolumeConverter />
      </FeaturePanel>
      <FeaturePanel featureId="speed">
        <SpeedConverter />
      </FeaturePanel>
      <FeaturePanel featureId="pressure">
        <PressureConverter />
      </FeaturePanel>
      <FeaturePanel featureId="energy">
        <EnergyConverter />
      </FeaturePanel>
      <FeaturePanel featureId="temperature">
        <TemperatureConverter />
      </FeaturePanel>
      <FeaturePanel featureId="filesize">
        <FileSizeConverter />
      </FeaturePanel>
    </ComprehensiveToolPanel>
  )
}

// Length Converter Component
function LengthConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('km')
  const [toUnit, setToUnit] = useState('mile')
  const [toValue, setToValue] = useState('')

  const handleConvert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue('')
      return
    }
    const result = convertLength(value, fromUnit, toUnit)
    setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
  }

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) {
        const result = convertLength(num, fromUnit, toUnit)
        setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
      }
    } else {
      setToValue('')
    }
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-4">
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
                {LENGTH_UNITS.map((unit) => (
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
              {LENGTH_UNITS.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-medium mb-2">Popular Conversions</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('km'); setToUnit('mile'); setFromValue('1'); }}>
            Kilometers to Miles
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('m'); setToUnit('foot'); setFromValue('1'); }}>
            Meters to Feet
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('cm'); setToUnit('inch'); setFromValue('1'); }}>
            Centimeters to Inches
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('mile'); setToUnit('km'); setFromValue('1'); }}>
            Miles to Kilometers
          </Button>
        </div>
      </div>
    </div>
  )
}

// Weight Converter Component (similar structure)
function WeightConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('kg')
  const [toUnit, setToUnit] = useState('lb')
  const [toValue, setToValue] = useState('')

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) {
        const result = convertWeight(num, fromUnit, toUnit)
        setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
      }
    } else {
      setToValue('')
    }
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-4">
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
                {WEIGHT_UNITS.map((unit) => (
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
              {WEIGHT_UNITS.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-medium mb-2">Popular Conversions</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('kg'); setToUnit('lb'); setFromValue('1'); }}>
            Kilograms to Pounds
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('g'); setToUnit('oz'); setFromValue('1'); }}>
            Grams to Ounces
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('lb'); setToUnit('kg'); setFromValue('1'); }}>
            Pounds to Kilograms
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('ton'); setToUnit('kg'); setFromValue('1'); }}>
            Tons to Kilograms
          </Button>
        </div>
      </div>
    </div>
  )
}

function AreaConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('m2')
  const [toUnit, setToUnit] = useState('ft2')
  const [toValue, setToValue] = useState('')

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) {
        const result = convertArea(num, fromUnit, toUnit)
        setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
      }
    } else {
      setToValue('')
    }
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-4">
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
                {AREA_UNITS.map((unit) => (
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
              {AREA_UNITS.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function VolumeConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('l')
  const [toUnit, setToUnit] = useState('gal')
  const [toValue, setToValue] = useState('')

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) {
        const result = convertVolume(num, fromUnit, toUnit)
        setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
      }
    } else {
      setToValue('')
    }
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-4">
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
                {VOLUME_UNITS.map((unit) => (
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
              {VOLUME_UNITS.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function SpeedConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('kph')
  const [toUnit, setToUnit] = useState('mph')
  const [toValue, setToValue] = useState('')

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) {
        const result = convertSpeed(num, fromUnit, toUnit)
        setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
      }
    } else {
      setToValue('')
    }
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-4">
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
                {SPEED_UNITS.map((unit) => (
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
              {SPEED_UNITS.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function PressureConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('bar')
  const [toUnit, setToUnit] = useState('psi')
  const [toValue, setToValue] = useState('')

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) {
        const result = convertPressure(num, fromUnit, toUnit)
        setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
      }
    } else {
      setToValue('')
    }
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-4">
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
                {PRESSURE_UNITS.map((unit) => (
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
              {PRESSURE_UNITS.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function EnergyConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('kwh')
  const [toUnit, setToUnit] = useState('kj')
  const [toValue, setToValue] = useState('')

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) {
        const result = convertEnergy(num, fromUnit, toUnit)
        setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
      }
    } else {
      setToValue('')
    }
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-4">
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
                {ENERGY_UNITS.map((unit) => (
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
              {ENERGY_UNITS.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

// Temperature Converter Component
function TemperatureConverter() {
  const [fromValue, setFromValue] = useState('0')
  const [fromUnit, setFromUnit] = useState('c')
  const [toUnit, setToUnit] = useState('f')
  const [toValue, setToValue] = useState('')

  const handleFromValueChange = (value: string) => {
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
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-4">
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
        <h3 className="font-medium mb-2">Common Temperatures</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>• Water freezing: 0°C = 32°F = 273.15K</p>
          <p>• Room temperature: 20°C = 68°F = 293.15K</p>
          <p>• Body temperature: 37°C = 98.6°F = 310.15K</p>
          <p>• Water boiling: 100°C = 212°F = 373.15K</p>
        </div>
      </div>
    </div>
  )
}

// File Size Converter Component
function FileSizeConverter() {
  const [fromValue, setFromValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('GB')
  const [toUnit, setToUnit] = useState('MB')
  const [toValue, setToValue] = useState('')

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) {
        const result = convertFileSize(num, fromUnit, toUnit)
        setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
      }
    } else {
      setToValue('')
    }
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-4">
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
                {FILE_SIZE_UNITS.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.symbol} {unit.isBinary && '(Binary)'}
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
              {FILE_SIZE_UNITS.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.symbol} {unit.isBinary && '(Binary)'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-medium mb-2">Popular Conversions</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('GB'); setToUnit('MB'); setFromValue('1'); }}>
            GB to MB
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('MB'); setToUnit('KB'); setFromValue('1'); }}>
            MB to KB
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('TB'); setToUnit('GB'); setFromValue('1'); }}>
            TB to GB
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setFromUnit('GiB'); setToUnit('GB'); setFromValue('1'); }}>
            GiB to GB
          </Button>
        </div>
      </div>
    </div>
  )
}
