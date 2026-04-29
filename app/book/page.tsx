'use client'

import Script from 'next/script'
import Link from 'next/link'
import { Mail, Calendar } from 'lucide-react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }

export default function BookPage() {
  return (
    <main style={{ backgroundColor: '#F5EFE0', color: '#0C0C0C' }} className="min-h-screen">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <Nav mode="cream" />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <p
            className="text-xs uppercase mb-6"
            style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}
          >
            Book a 15-min intake
          </p>
          <h1
            className="font-bold mb-6 leading-tight"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: '#0C0C0C',
              letterSpacing: '-0.025em',
            }}
          >
            Let&apos;s see if we&apos;re a fit.
          </h1>
          <p
            className="text-lg max-w-xl mx-auto leading-relaxed"
            style={{ ...SERIF, color: '#3A3632', fontStyle: 'italic' }}
          >
            15 minutes. I&apos;ll ask about your business. If it&apos;s a Sprint we&apos;ll scope
            it right there. If it&apos;s a Build I&apos;ll send written scope within 24 hours.
            Not a pitch call.
          </p>
        </div>

        {/* Calendly */}
        <div
          className="animate-fade-in-up delay-200 rounded overflow-hidden"
          style={{
            opacity: 0,
            backgroundColor: '#EEE7D3',
            border: '1px solid rgba(12,12,12,0.08)',
          }}
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/hamzazulquernain1/zapp-studios-consulting?hide_gdpr_banner=1&background_color=f5efe0&text_color=0c0c0c&primary_color=e8903a"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>

        {/* Alt contact */}
        <div
          className="animate-fade-in-up delay-300 mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm"
          style={{ opacity: 0, color: '#7A756D' }}
        >
          <span>Or reach out directly:</span>
          <a
            href="mailto:hamzazulquernain1@gmail.com"
            className="inline-flex items-center gap-2 transition-colors"
            style={{ color: '#3A3632' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E8903A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#3A3632')}
          >
            <Mail className="w-4 h-4" />
            hamzazulquernain1@gmail.com
          </a>
        </div>

        {/* Mobile fallback */}
        <div className="mt-6 text-center sm:hidden">
          <a
            href="https://calendly.com/hamzazulquernain1/zapp-studios-consulting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded transition-colors text-sm"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
          >
            <Calendar className="w-4 h-4" />
            Open Calendar
          </a>
        </div>
      </div>

      <Footer mode="cream" />
    </main>
  )
}
