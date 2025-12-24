import { allTools } from '@/data/tools'
import { ToolGrid } from '@/components/tools/ToolGrid'

export default function Home() {

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Free Online Converter Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Convert documents, images, media, time, encoding, units, and more instantly. All tools work in your browser, no sign-up required.
        </p>
      </section>

      {/* All Tools Section */}
      <section id="tools" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Free Converter Tools</h2>
        <ToolGrid tools={allTools} />
      </section>

      {/* Why Trust Us Section */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Use Our Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">100% Free</h3>
            <p className="text-muted-foreground">
              All tools are completely free with no hidden fees or subscriptions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
            <p className="text-muted-foreground">
              Everything runs in your browser. Your data never leaves your device.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">No Sign-Up</h3>
            <p className="text-muted-foreground">
              Start using tools immediately without creating an account.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
