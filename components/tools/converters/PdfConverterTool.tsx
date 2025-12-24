'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TxtToPdfTool } from './TxtToPdfTool'
import { MarkdownToPdfTool } from './MarkdownToPdfTool'
import { HtmlToPdfTool } from './HtmlToPdfTool'
import { ImageToPdfTool } from './ImageToPdfTool'

export function PdfConverterTool() {
  return (
    <Tabs defaultValue="text">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="text">Text</TabsTrigger>
        <TabsTrigger value="markdown">Markdown</TabsTrigger>
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="image">Images</TabsTrigger>
      </TabsList>

      <TabsContent value="text" className="mt-6">
        <TxtToPdfTool />
      </TabsContent>
      <TabsContent value="markdown" className="mt-6">
        <MarkdownToPdfTool />
      </TabsContent>
      <TabsContent value="html" className="mt-6">
        <HtmlToPdfTool />
      </TabsContent>
      <TabsContent value="image" className="mt-6">
        <ImageToPdfTool />
      </TabsContent>
    </Tabs>
  )
}
