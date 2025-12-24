import Link from 'next/link'
import { getToolsByCategory } from '@/data/tools'
import { CATEGORIES } from '@/data/schema'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between gap-6">
          <Link href="/" className="text-2xl font-bold">
            Converter Tools
          </Link>
          <div className="hidden lg:flex items-center gap-4 text-sm font-medium">
            {CATEGORIES.map((category) => (
              <div key={category.slug} className="relative group">
                <button className="hover:text-primary">
                  {category.name.replace(/\s*Converters?\s*/i, '')}
                </button>
                <div className="absolute left-0 top-full pt-4 hidden group-hover:block z-50">
                  <div className="w-[280px] rounded-lg border bg-background p-3 shadow-lg">
                    <div className="space-y-1 text-sm">
                      {getToolsByCategory(category.slug).map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          className="block rounded-md px-2 py-1 hover:bg-muted"
                        >
                          {tool.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
