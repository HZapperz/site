import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

const WORK = [
  {
    tag: 'E-COMMERCE',
    client: 'Royal Pawz USA',
    headline: 'Full revenue system for a pet services brand',
    description:
      'Built the complete revenue infrastructure from scratch: booking system, CRM, automated marketing flows, and growth strategy.',
    href: '/rev-eng/royalpawzusa',
    year: '2025',
  },
  {
    tag: 'E-COMMERCE / DTC',
    client: "Owen's Modded Seiko",
    headline: 'Revenue playbook for a modded watch brand',
    description:
      'Comprehensive revenue engineering playbook including financial modeling, customer acquisition strategy, and growth roadmap.',
    href: '/rev-eng/owen',
    year: '2025',
  },
]

export default function Work() {
  return (
    <main style={{ backgroundColor: '#0C0C0C', minHeight: '100vh', color: '#F5EFE0' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Back link */}
        <div className="pt-10 pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: '#6B6560' }}
          >
            <ArrowLeft size={13} />
            <span style={MONO}>Zapp Studios</span>
          </Link>
        </div>

        {/* Header */}
        <div className="pt-16 pb-20">
          <div className="flex items-center gap-3 mb-8">
            <span
              style={{ backgroundColor: '#E8903A', width: '16px', height: '1px', display: 'inline-block' }}
            />
            <p style={{ ...MONO, letterSpacing: '0.2em', color: '#6B6560', fontSize: '11px' }}>
              RECENT WORK
            </p>
          </div>
          <h1
            className="font-bold leading-tight mb-6"
            style={{ ...DISPLAY, fontSize: 'clamp(40px, 6vw, 64px)', color: '#F5EFE0' }}
          >
            Systems that shipped.
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: '#A09A8E' }}>
            Every engagement is a revenue system, not a project. Here's what we've built.
          </p>
        </div>

        {/* Work list */}
        <div className="flex flex-col gap-5 pb-24">
          {WORK.map(item => (
            <Link
              key={item.client}
              href={item.href}
              className="block p-10 rounded transition-all group"
              style={{
                backgroundColor: '#1C1C1C',
                borderTop: '2px solid #E8903A',
                borderLeft: '1px solid rgba(245,239,224,0.06)',
                borderRight: '1px solid rgba(245,239,224,0.06)',
                borderBottom: '1px solid rgba(245,239,224,0.06)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-xs uppercase"
                  style={{ ...MONO, letterSpacing: '0.15em', color: '#6B6560' }}
                >
                  {item.tag}
                </span>
                <span style={{ ...MONO, fontSize: '11px', color: '#6B6560' }}>{item.year}</span>
              </div>
              <h2
                className="font-bold mb-3 transition-colors"
                style={{ ...DISPLAY, fontSize: 'clamp(22px, 3vw, 30px)', color: '#F5EFE0' }}
              >
                {item.client}
              </h2>
              <p className="text-lg mb-4 leading-relaxed" style={{ color: '#A09A8E' }}>
                {item.headline}
              </p>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#6B6560' }}>
                {item.description}
              </p>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#6B6560' }}>
                <span>Read the playbook</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className="pt-16 pb-24 text-center"
          style={{ borderTop: '1px solid rgba(245,239,224,0.06)' }}
        >
          <h2
            className="font-bold mb-4"
            style={{ ...DISPLAY, fontSize: 'clamp(26px, 3.5vw, 36px)', color: '#F5EFE0' }}
          >
            Want to be next?
          </h2>
          <p className="mb-8 max-w-sm mx-auto leading-relaxed" style={{ color: '#A09A8E' }}>
            Book a free strategy call and let's see if your business is a fit.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded transition-colors"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
          >
            Book a Free Call <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  )
}
