'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type ToolFeature } from '@/types/tool'

interface ComprehensiveToolPanelProps {
  title: string
  description?: string
  features: ToolFeature[]
  defaultFeature: string
  children: React.ReactNode
  onFeatureChange?: (featureId: string) => void
}

export function ComprehensiveToolPanel({
  title,
  description,
  features,
  defaultFeature,
  children,
  onFeatureChange,
}: ComprehensiveToolPanelProps) {
  const [activeFeature, setActiveFeature] = useState(defaultFeature)

  useEffect(() => {
    // Check URL query parameter for feature
    const params = new URLSearchParams(window.location.search)
    const typeParam = params.get('type')

    if (typeParam && features.some(f => f.id === typeParam)) {
      setActiveFeature(typeParam)
    }
  }, [features])

  const handleFeatureChange = (featureId: string) => {
    setActiveFeature(featureId)

    // Update URL without reload
    const url = new URL(window.location.href)
    url.searchParams.set('type', featureId)
    window.history.pushState({}, '', url.toString())

    onFeatureChange?.(featureId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeFeature} onValueChange={handleFeatureChange}>
          <TabsList className="flex w-full flex-wrap gap-2">
            {features.map((feature) => (
              <TabsTrigger key={feature.id} value={feature.id}>
                {feature.icon && <span className="mr-2">{feature.icon}</span>}
                {feature.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {children}
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface FeaturePanelProps {
  featureId: string
  children: React.ReactNode
}

export function FeaturePanel({ featureId, children }: FeaturePanelProps) {
  return (
    <TabsContent value={featureId} className="mt-6">
      {children}
    </TabsContent>
  )
}
