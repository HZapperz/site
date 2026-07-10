'use client'

import { Suspense } from 'react'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'
import { Mail, Calendar } from 'lucide-react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }

function HeaderCopy({ founder }: { founder: boolean }) {
  return (
    <div className="text-center mb-12 animate-fade-in-up">
      <p
        className="text-xs uppercase mb-6"
        style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}
      >
        {founder ? 'Book a free founder call' : 'Book a 15-min intake'}
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
        {founder ? <>Bring the idea.</> : <>Let&apos;s see if we&apos;re a fit.</>}
      </h1>
      <p
        className="text-lg max-w-xl mx-auto leading-relaxed"
        style={{ ...SERIF, color: '#3A3632', fontStyle: 'italic' }}
      >
        {founder ? (
          <>
            Thirty minutes on what you&apos;re building. I&apos;ll push on positioning, scope,
            and go-to-market — a sounding board, not a sales call. There&apos;s nothing to
            pitch: my build calendar is closed.
          </>
        ) : (
          <>
            15 minutes. I&apos;ll ask about your business and where revenue is leaking. If
            there&apos;s a clear path forward, I&apos;ll send written scope within a couple of
            days. Not a pitch call.
          </>
        )}
      </p>
    </div>
  )
}

function BookHeader() {
  const params = useSearchParams()
  return <HeaderCopy founder={params.get('type') === 'founder'} />
}

export default function BookPage() {
  return (
    <main style={{ backgroundColor: '#F5EFE0', color: '#0C0C0C' }} className="min-h-screen">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <Nav mode="cream" />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header — copy adapts when arriving from /startups (?type=founder) */}
        <Suspense fallback={<HeaderCopy founder={false} />}>
          <BookHeader />
        </Suspense>

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
