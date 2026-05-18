import Link from 'next/link'
import { Linkedin, Mail } from 'lucide-react'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

export type FooterMode = 'cream' | 'dark'

export default function Footer({ mode = 'cream' }: { mode?: FooterMode }) {
  const isCream = mode === 'cream'

  const bg = isCream ? '#F5EFE0' : '#0C0C0C'
  const border = isCream ? 'rgba(12,12,12,0.08)' : 'rgba(245,239,224,0.06)'
  const dividerBorder = isCream ? 'rgba(12,12,12,0.05)' : 'rgba(245,239,224,0.04)'
  const primaryText = isCream ? '#0C0C0C' : '#F5EFE0'
  const mutedText = isCream ? '#7A756D' : '#6B6560'
  const hoverText = isCream ? '#0C0C0C' : '#F5EFE0'

  return (
    <footer
      className="py-12 px-6"
      style={{
        backgroundColor: bg,
        borderTop: `1px solid ${border}`,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Primary row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand + tagline */}
          <div>
            <span style={{ ...DISPLAY, color: primaryText, fontWeight: 700, fontSize: '18px' }}>
              Zapp Studios
            </span>
            <p className="text-xs mt-2 max-w-xs leading-relaxed" style={{ color: mutedText }}>
              Growth marketing and software, built as one system — by Hamza Zulquernain in
              Houston, TX.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            <div className="flex flex-col gap-2">
              <p
                className="text-[10px] uppercase mb-2"
                style={{ ...MONO, letterSpacing: '0.2em', color: mutedText }}
              >
                Offer
              </p>
              {[
                { href: '/diagnostic', label: 'Revenue Diagnostic' },
                { href: '/build', label: 'Revenue System Build' },
                { href: '/partnerships', label: 'Equity Partnership' },
                { href: '/startups', label: 'Startup Consulting' },
              ].map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs transition-colors"
                  style={{ color: mutedText }}
                  onMouseEnter={e => (e.currentTarget.style.color = hoverText)}
                  onMouseLeave={e => (e.currentTarget.style.color = mutedText)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="text-[10px] uppercase mb-2"
                style={{ ...MONO, letterSpacing: '0.2em', color: mutedText }}
              >
                Company
              </p>
              {[
                { href: '/rev-eng/royalpawzusa', label: 'Royal Pawz case study' },
                { href: '/book', label: 'Book a call' },
              ].map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs transition-colors"
                  style={{ color: mutedText }}
                  onMouseEnter={e => (e.currentTarget.style.color = hoverText)}
                  onMouseLeave={e => (e.currentTarget.style.color = mutedText)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderTop: `1px solid ${dividerBorder}` }}
        >
          <span style={{ ...MONO, color: mutedText, fontSize: '11px' }}>
            © 2026 Zapp Studios · Hamza Zulquernain
          </span>

          <div className="flex items-center gap-5">
            <Link
              href="https://linkedin.com/in/hamza-zulquernain"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: mutedText }}
              onMouseEnter={e => (e.currentTarget.style.color = hoverText)}
              onMouseLeave={e => (e.currentTarget.style.color = mutedText)}
            >
              <Linkedin size={16} />
            </Link>
            <Link
              href="mailto:hamzazulquernain1@gmail.com"
              aria-label="Email"
              style={{ color: mutedText }}
              onMouseEnter={e => (e.currentTarget.style.color = hoverText)}
              onMouseLeave={e => (e.currentTarget.style.color = mutedText)}
            >
              <Mail size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
