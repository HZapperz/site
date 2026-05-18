'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }

export type NavMode = 'cream' | 'dark'

const LINKS = [
  { href: '/build', label: 'Build' },
  { href: '/partnerships', label: 'Partnerships' },
  { href: '/startups', label: 'Startups' },
]

export default function Nav({ mode = 'cream' }: { mode?: NavMode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isCream = mode === 'cream'

  const bg = scrolled
    ? isCream
      ? 'rgba(245, 239, 224, 0.92)'
      : 'rgba(12, 12, 12, 0.92)'
    : 'transparent'

  const borderColor = scrolled
    ? isCream
      ? 'rgba(12, 12, 12, 0.08)'
      : 'rgba(245, 239, 224, 0.06)'
    : 'transparent'

  const logoColor = isCream ? '#0C0C0C' : '#F5EFE0'
  const linkColor = isCream ? '#3A3632' : '#A09A8E'
  const linkHoverColor = isCream ? '#0C0C0C' : '#F5EFE0'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: bg,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" style={{ ...DISPLAY, color: logoColor }} className="text-lg font-bold">
          Zapp Studios
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm transition-colors"
              style={{ color: linkColor }}
              onMouseEnter={e => (e.currentTarget.style.color = linkHoverColor)}
              onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="text-sm font-semibold px-4 py-2 rounded transition-colors"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a call →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden transition-colors"
          style={{ color: linkColor }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{
            backgroundColor: isCream ? '#EEE7D3' : '#141414',
            borderBottom: isCream
              ? '1px solid rgba(12,12,12,0.08)'
              : '1px solid rgba(245,239,224,0.1)',
          }}
        >
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm"
              style={{ color: linkColor }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold px-4 py-2 rounded text-center"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
          >
            Book a call →
          </Link>
        </div>
      )}
    </nav>
  )
}
