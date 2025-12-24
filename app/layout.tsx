import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/Header"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Converter Tools - Free Online Converters",
  description: "Free online converter tools for documents, images, media, time, encoding, units, and numbers. Convert formats instantly in your browser.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Converter Tools - Free Online Converters",
    description: "Free online converter tools for documents, images, media, time, encoding, units, and numbers. Convert formats instantly in your browser.",
    url: siteUrl,
    siteName: "Converter Tools",
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Converter Tools - Free Online Converters",
    description: "Free online converter tools for documents, images, media, time, encoding, units, and numbers. Convert formats instantly in your browser.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
