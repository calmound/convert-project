import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getToolBySlug, allTools } from '@/data/tools'
import { CATEGORIES } from '@/data/schema'
import type { Category } from '@/types/tool'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FAQAccordion } from '@/components/tools/FAQAccordion'
import { RelatedTools } from '@/components/tools/RelatedTools'
import { CaseConverterTool } from '@/components/tools/converters/CaseConverterTool'
import { RomanNumeralTool } from '@/components/tools/converters/RomanNumeralTool'
import { CsvToExcelTool } from '@/components/tools/converters/CsvToExcelTool'
import { ExcelToCsvTool } from '@/components/tools/converters/ExcelToCsvTool'
import { TxtToPdfTool } from '@/components/tools/converters/TxtToPdfTool'
import { MarkdownToHtmlTool } from '@/components/tools/converters/MarkdownToHtmlTool'
import { MarkdownToPdfTool } from '@/components/tools/converters/MarkdownToPdfTool'
import { HtmlToPdfTool } from '@/components/tools/converters/HtmlToPdfTool'
import { UnitConverterTool } from '@/components/tools/converters/UnitConverterTool'
import { TemperatureConverterTool } from '@/components/tools/converters/TemperatureConverterTool'
import { FractionDecimalPercentageTool } from '@/components/tools/converters/FractionDecimalPercentageTool'
import { NumberBaseConverterTool } from '@/components/tools/converters/NumberBaseConverterTool'
import { FileSizeCalculatorTool } from '@/components/tools/converters/FileSizeCalculatorTool'
import { TimeTimestampConverterTool } from '@/components/tools/converters/TimeTimestampConverterTool'
import { EncodingDecodingTool } from '@/components/tools/converters/EncodingDecodingTool'
import { ColorConverterTool } from '@/components/tools/converters/ColorConverterTool'
import { ImageConverterTool } from '@/components/tools/converters/ImageConverterTool'
import { ImageToPdfTool } from '@/components/tools/converters/ImageToPdfTool'
import { MediaConverterTool } from '@/components/tools/converters/MediaConverterTool'
import { PdfConverterTool } from '@/components/tools/converters/PdfConverterTool'
import { ChineseNumberConverterTool } from '@/components/tools/converters/ChineseNumberConverterTool'
import { Separator } from '@/components/ui/separator'
import { Calendar } from 'lucide-react'

interface ToolPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return allTools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  return {
    title: `${tool.title} - Converter Tools`,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: `${baseUrl}/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.title} - Converter Tools`,
      description: tool.description,
      url: `${baseUrl}/tools/${tool.slug}`,
      siteName: 'Converter Tools',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${tool.title} - Converter Tools`,
      description: tool.description,
    },
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

  if (!tool) {
    notFound()
  }

  // Map tool component to actual component
  const ToolComponent = getToolComponent(tool.component)

  const categoryRoute = getCategoryRoute(tool.category)
  const categoryName = getCategoryName(tool.category)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${baseUrl}/tools/${tool.slug}`,
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb
        items={[
          {
            label: categoryName,
            href: categoryRoute,
          },
          { label: tool.title },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-4">{tool.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {new Date(tool.lastUpdatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">{tool.description}</p>
      </div>

      <ToolComponent />

      <Separator className="my-12" />

      <section className="my-12">
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <p className="text-muted-foreground">
          Simply enter your {tool.inputType} in the input field above, and the converter will automatically transform it to {tool.outputType}.
          You can copy the result with one click or clear both fields to start over.
        </p>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold mb-4">Examples</h2>
        <div className="space-y-4">
          {tool.examples.map((example, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">{example.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Input:</span>
                  <code className="ml-2 bg-background px-2 py-1 rounded">{example.input}</code>
                </div>
                <div>
                  <span className="text-muted-foreground">Output:</span>
                  <code className="ml-2 bg-background px-2 py-1 rounded">{example.output}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQAccordion faqs={tool.faq} />

      <RelatedTools relatedSlugs={tool.related} />
    </div>
  )
}

function getCategoryRoute(category: Category) {
  const routes: Record<Category, string> = {
    text: '/text-converters',
    math: '/math-converters',
    number: '/number-converters',
    document: '/document-converters',
    unit: '/unit-converters',
    image: '/image-converters',
    media: '/media-converters',
    color: '/color-converters',
    time: '/time-converters',
    encoding: '/encoding-tools',
  }

  return routes[category]
}

function getCategoryName(category: Category) {
  return CATEGORIES.find((item) => item.slug === category)?.name ?? 'Converters'
}

function getToolComponent(componentName: string) {
  const components: Record<string, React.ComponentType> = {
    'text-case-converter': CaseConverterTool,
    'fraction-decimal-percentage': FractionDecimalPercentageTool,
    'roman-numeral': RomanNumeralTool,
    'csv-to-excel': CsvToExcelTool,
    'excel-to-csv': ExcelToCsvTool,
    'txt-to-pdf': TxtToPdfTool,
    'markdown-to-html': MarkdownToHtmlTool,
    'markdown-to-pdf': MarkdownToPdfTool,
    'html-to-pdf': HtmlToPdfTool,
    'unit-converter': UnitConverterTool,
    'temperature-converter': TemperatureConverterTool,
    'number-base-converter': NumberBaseConverterTool,
    'file-size-calculator': FileSizeCalculatorTool,
    'time-timestamp-converter': TimeTimestampConverterTool,
    'encoding-decoding': EncodingDecodingTool,
    'color-converter': ColorConverterTool,
    'image-converter': ImageConverterTool,
    'image-to-pdf': ImageToPdfTool,
    'media-converter': MediaConverterTool,
    'pdf-converter': PdfConverterTool,
    'chinese-number-converter': ChineseNumberConverterTool,
  }

  return components[componentName] || CaseConverterTool
}
