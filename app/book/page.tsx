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

const CALENDLY = 'https://calendly.com/hamzazulquernain1/zapp-studios-consulting'
const CALENDLY_THEME = 'hide_gdpr_banner=1&background_color=f5efe0&text_color=0c0c0c&primary_color=e8903a'

/**
 * Copy per arrival point. The funnel already asked them everything, so a lead
 * arriving from /fit is told that rather than being asked to repeat themselves.
 */
const INTROS: Record<string, { eyebrow: string; heading: string; body: string }> = {
  diagnostic: {
    eyebrow: 'Book a 15-min intake',
    heading: 'Let\u2019s scope the diagnostic.',
    body: '15 minutes on what you have got and where you think it is leaking. I will tell you what the diagnostic would cover and what it would cost before you commit to anything.',
  },
  build: {
    eyebrow: 'Book a 15-min intake',
    heading: 'Let\u2019s scope the build.',
    body: '15 minutes on the system you have now. Every build starts with a diagnostic, so this call is about whether that is worth doing \u2014 not a pitch for the bigger number.',
  },
  rescue: {
    eyebrow: 'Book a rescue call',
    heading: 'Let\u2019s look at what broke.',
    body: '15 minutes on what you built, what it was built with, and what stopped working. If a fixed-price audit is the right next step I will say so, and if it is not I will say that too.',
  },
  fit: {
    eyebrow: 'Book your call',
    heading: 'I have read your answers.',
    body: 'We start from what you already told me rather than from the beginning. 15 minutes, on your numbers. A working call, not a pitch \u2014 you keep the notes either way.',
  },
}

function HeaderCopy({ founder, intro }: { founder: boolean; intro?: string }) {
  const custom = intro ? INTROS[intro] : undefined
  if (custom && !founder) {
    return (
      <div className="text-center mb-12 animate-fade-in-up">
        <p className="text-xs uppercase mb-6" style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}>
          {custom.eyebrow}
        </p>
        <h1
          className="font-bold mb-6 leading-tight"
          style={{ ...DISPLAY, fontSize: 'clamp(40px, 5vw, 64px)', color: '#0C0C0C', letterSpacing: '-0.025em' }}
        >
          {custom.heading}
        </h1>
        <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ ...SERIF, color: '#3A3632', fontStyle: 'italic' }}>
          {custom.body}
        </p>
      </div>
    )
  }
  return <DefaultHeaderCopy founder={founder} />
}

function DefaultHeaderCopy({ founder }: { founder: boolean }) {
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
  const offer = params.get('offer')
  return (
    <HeaderCopy
      founder={params.get('type') === 'founder'}
      intro={params.get('lead') ? 'fit' : offer ?? undefined}
    />
  )
}

/**
 * The widget URL carries the lead id as utm_content, which is how a booking
 * gets joined back to its row in the leads table. Deliberately NOT name or
 * email: those would sit in the URL, in the referrer header and in every
 * analytics row. Calendly asks for them on the next screen anyway.
 */
function BookingWidget() {
  const params = useSearchParams()
  const lead = params.get('lead')
  const offer = params.get('offer')
  const extra = [
    lead && /^[0-9a-f-]{36}$/i.test(lead) ? `utm_content=${encodeURIComponent(lead)}` : '',
    offer ? `utm_campaign=${encodeURIComponent(offer.slice(0, 40))}` : '',
  ].filter(Boolean).join('&')

  return (
    <div
      className="calendly-inline-widget"
      data-url={`${CALENDLY}?${CALENDLY_THEME}${extra ? `&${extra}` : ''}`}
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
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
        <Suspense fallback={<DefaultHeaderCopy founder={false} />}>
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
          <Suspense
            fallback={
              <div
                className="calendly-inline-widget"
                data-url={`${CALENDLY}?${CALENDLY_THEME}`}
                style={{ minWidth: '320px', height: '700px' }}
              />
            }
          >
            <BookingWidget />
          </Suspense>
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
            href={CALENDLY}
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
