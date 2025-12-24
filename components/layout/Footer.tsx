import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Converter Tools</h3>
            <p className="text-sm text-muted-foreground">
              Free online converter tools for text, math, and numbers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/text-converters" className="text-muted-foreground hover:text-foreground">
                  Text Converters
                </Link>
              </li>
              <li>
                <Link href="/math-converters" className="text-muted-foreground hover:text-foreground">
                  Math Converters
                </Link>
              </li>
              <li>
                <Link href="/number-converters" className="text-muted-foreground hover:text-foreground">
                  Number Converters
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-foreground">
                  All Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Converter Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
