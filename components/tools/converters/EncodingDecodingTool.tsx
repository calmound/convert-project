'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConverterPanel } from '../ConverterPanel'
import {
  base64Decode,
  base64Encode,
  urlDecode,
  urlEncode,
  unicodeDecode,
  unicodeEncode,
} from '@/lib/converters/encoding/text-encoding'

export function EncodingDecodingTool() {
  return (
    <Tabs defaultValue="base64">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="base64">Base64</TabsTrigger>
        <TabsTrigger value="url">URL</TabsTrigger>
        <TabsTrigger value="unicode">Unicode</TabsTrigger>
      </TabsList>

      <TabsContent value="base64" className="mt-6 space-y-4">
        <ConverterPanel
          title="Base64 Encode"
          inputLabel="Plain Text"
          outputLabel="Base64"
          convert={base64Encode}
          inputPlaceholder="Enter text to encode..."
          outputPlaceholder="Base64 output..."
        />
        <ConverterPanel
          title="Base64 Decode"
          inputLabel="Base64"
          outputLabel="Plain Text"
          convert={base64Decode}
          inputPlaceholder="Paste Base64 here..."
          outputPlaceholder="Decoded text..."
        />
      </TabsContent>

      <TabsContent value="url" className="mt-6 space-y-4">
        <ConverterPanel
          title="URL Encode"
          inputLabel="Text"
          outputLabel="Encoded"
          convert={urlEncode}
          inputPlaceholder="Enter URL or text..."
          outputPlaceholder="Encoded output..."
        />
        <ConverterPanel
          title="URL Decode"
          inputLabel="Encoded URL"
          outputLabel="Decoded"
          convert={urlDecode}
          inputPlaceholder="Paste encoded URL..."
          outputPlaceholder="Decoded output..."
        />
      </TabsContent>

      <TabsContent value="unicode" className="mt-6 space-y-4">
        <ConverterPanel
          title="Unicode Encode"
          inputLabel="Text"
          outputLabel="Unicode"
          convert={unicodeEncode}
          inputPlaceholder="Enter text..."
          outputPlaceholder="Unicode output..."
        />
        <ConverterPanel
          title="Unicode Decode"
          inputLabel="Unicode"
          outputLabel="Text"
          convert={unicodeDecode}
          inputPlaceholder="Paste unicode escapes..."
          outputPlaceholder="Decoded text..."
        />
      </TabsContent>
    </Tabs>
  )
}
