'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import Placeholder from '../_components/Placeholder'
import StickyCTA from '../_components/StickyCTA'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true)
          ob.disconnect()
        }
      },
      { threshold },
    )
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [threshold])
  return { ref, v }
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, v } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span style={{ backgroundColor: '#E8903A' }} className="inline-block w-4 h-px" />
      <p
        className="text-xs uppercase"
        style={{ ...MONO, letterSpacing: '0.22em', color: '#7A756D' }}
      >
        {children}
      </p>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <p
          className="animate-fade-in-up text-xs uppercase mb-6"
          style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}
        >
          Receipts — Not Testimonials
        </p>
        <h1
          className="animate-fade-in-up delay-100 font-bold leading-[1.02] mb-8"
          style={{
            ...DISPLAY,
            fontSize: 'clamp(44px, 7vw, 88px)',
            color: '#0C0C0C',
            letterSpacing: '-0.025em',
            opacity: 0,
          }}
        >
          Systems that shipped.
          <br />
          <span style={{ color: '#E8903A' }}>Numbers that hold up.</span>
        </h1>
        <p
          className="animate-fade-in-up delay-200 text-lg md:text-xl max-w-2xl leading-relaxed"
          style={{ ...SERIF, color: '#3A3632', fontStyle: 'italic', opacity: 0 }}
        >
          Every engagement here is a real engagement with real dashboards behind it. No generic
          quote cards, no &ldquo;trusted by&rdquo; strips with fake logos. The proof is the work.
        </p>
      </div>
    </section>
  )
}

// ── Flagship case — Royal Pawz ──────────────────────────────────
function RoyalPawzCase() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionLabel>Flagship Engagement — Royal Pawz USA</SectionLabel>
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <h2
              className="font-bold leading-tight max-w-3xl"
              style={{
                ...DISPLAY,
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                color: '#0C0C0C',
                letterSpacing: '-0.02em',
              }}
            >
              A mobile dog grooming business from <br />
              $200 MRR to $10K MRR in 4 months.
            </h2>
            <span style={{ ...MONO, fontSize: '13px', color: '#7A756D' }}>2025 — ongoing</span>
          </div>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            I came on as equity partner, diagnosed the funnel, rebuilt the entire revenue stack
            from scratch, and run weekly A/B tests alongside the operator. Here&apos;s what
            actually happened — with receipts.
          </p>
        </Reveal>

        {/* Metrics */}
        <Reveal delay={100}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-10 rounded overflow-hidden"
            style={{ border: '1px solid rgba(12,12,12,0.12)' }}
          >
            {[
              { v: '50×', l: 'MRR growth', s: 'in 4 months' },
              { v: '334%', l: 'conversion lift', s: '90-day window' },
              { v: '30.8%', l: 'booking conversion', s: 'vs 1.8% baseline' },
              { v: '5×', l: 'ROAS', s: 'from 2× at launch' },
            ].map((m, i) => (
              <div
                key={m.l}
                className="p-6 md:p-8"
                style={{
                  backgroundColor: '#F5EFE0',
                  borderRight: i < 3 ? '1px solid rgba(12,12,12,0.12)' : undefined,
                  borderBottom: i < 2 ? '1px solid rgba(12,12,12,0.12)' : undefined,
                }}
              >
                <p
                  className="font-bold leading-none mb-2"
                  style={{
                    ...MONO,
                    fontSize: 'clamp(32px, 3.5vw, 44px)',
                    color: '#0C0C0C',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {m.v}
                </p>
                <p className="text-sm font-semibold" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                  {m.l}
                </p>
                <p className="text-xs mt-0.5" style={{ ...MONO, color: '#7A756D' }}>
                  {m.s}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Receipts */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <Reveal delay={150}>
            <div>
              <p className="text-xs uppercase mb-3" style={{ ...MONO, letterSpacing: '0.2em', color: '#7A756D' }}>
                Stripe dashboard
              </p>
              <Placeholder
                kind="RECEIPT"
                label="MRR chart from Stripe — $200 → $10K"
                aspect="4/3"
                mode="cream"
              />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div>
              <p className="text-xs uppercase mb-3" style={{ ...MONO, letterSpacing: '0.2em', color: '#7A756D' }}>
                Winning landing page A/B
              </p>
              <Placeholder
                kind="RECEIPT"
                label="Before / after landing page variants"
                aspect="4/3"
                mode="cream"
              />
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div>
              <p className="text-xs uppercase mb-3" style={{ ...MONO, letterSpacing: '0.2em', color: '#7A756D' }}>
                Meta Ads Manager
              </p>
              <Placeholder
                kind="RECEIPT"
                label="ROAS over time — 2× → 5×"
                aspect="4/3"
                mode="cream"
              />
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div>
              <p className="text-xs uppercase mb-3" style={{ ...MONO, letterSpacing: '0.2em', color: '#7A756D' }}>
                GA4 funnel
              </p>
              <Placeholder
                kind="RECEIPT"
                label="Booking funnel — 1.8% → 30.8% conversion"
                aspect="4/3"
                mode="cream"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={350}>
          <Link
            href="/rev-eng/royalpawzusa"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded transition-colors"
            style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A3632')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0C0C0C')}
          >
            Read the full case study <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ── Other case studies ──────────────────────────────────────────
const OTHER = [
  {
    tag: 'E-COMMERCE · PRE-LAUNCH',
    client: "Owen's Modded Seiko",
    headline: 'Revenue playbook for a watch modding brand',
    desc: 'Full financial model, customer acquisition strategy, phased launch roadmap. From hobby to business plan.',
    href: '/rev-eng/owen',
    year: '2025',
  },
  {
    tag: 'LOCAL SERVICE · PROPOSAL',
    client: 'Mobile Vehicle Detailing',
    headline: 'Revenue system proposal',
    desc: 'Booking infrastructure, route optimization, membership economics.',
    href: '/rev-eng/mobile-vehicle-detailing',
    year: '2026',
  },
  {
    tag: 'E-COMMERCE · PROPOSAL',
    client: 'Disposable Depot',
    headline: 'Revenue system proposal',
    desc: 'Shopify funnel rebuild, wholesale channel, retention flows.',
    href: '/rev-eng/disposable-depot',
    year: '2026',
  },
  {
    tag: 'FOOD · PROPOSAL',
    client: 'Platr Meals',
    headline: 'Revenue system proposal',
    desc: 'Subscription checkout, onboarding, retention automations.',
    href: '/rev-eng/platr-meals',
    year: '2026',
  },
]

function OtherWork() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionLabel>Playbooks &amp; Proposals</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(30px, 4vw, 44px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Reverse-engineered revenue for other businesses.
          </h2>
          <p className="text-base max-w-2xl mb-10 leading-relaxed" style={{ color: '#3A3632' }}>
            These are scoped proposals and playbooks — diagnostic work, strategy, and
            build-ready specs for businesses who&apos;ve either moved forward with me or used the
            playbook themselves.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          {OTHER.map((w, i) => (
            <Reveal key={w.client} delay={100 + i * 60}>
              <Link
                href={w.href}
                className="group block p-7 rounded h-full transition-all"
                style={{
                  backgroundColor: '#EEE7D3',
                  border: '1px solid rgba(12,12,12,0.08)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(232,144,58,0.4)'
                  e.currentTarget.style.backgroundColor = '#E8E0CA'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(12,12,12,0.08)'
                  e.currentTarget.style.backgroundColor = '#EEE7D3'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-[10px] uppercase"
                    style={{ ...MONO, letterSpacing: '0.18em', color: '#7A756D' }}
                  >
                    {w.tag}
                  </span>
                  <span style={{ ...MONO, fontSize: '11px', color: '#7A756D' }}>{w.year}</span>
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                  {w.client}
                </h3>
                <p className="text-sm mb-3 leading-relaxed" style={{ color: '#3A3632' }}>
                  {w.headline}
                </p>
                <p className="text-xs mb-5 leading-relaxed" style={{ color: '#7A756D' }}>
                  {w.desc}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: '#E8903A' }}>
                  Read the playbook
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ─────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2
            className="font-bold mb-8 leading-tight"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(40px, 6vw, 76px)',
              color: '#F5EFE0',
              letterSpacing: '-0.025em',
            }}
          >
            Want to be next?
          </h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: '#A09A8E' }}>
            Start with a Sprint. If the lift is real, we move up the ladder from there.
          </p>

          <Link
            href="/sprint"
            className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            See the Sprint <ArrowRight size={17} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default function Work() {
  return (
    <main style={{ backgroundColor: '#F5EFE0', color: '#0C0C0C' }}>
      <Nav mode="cream" />
      <Hero />
      <RoyalPawzCase />
      <OtherWork />
      <FinalCTA />
      <Footer mode="cream" />
      <StickyCTA href="/sprint" label="Reserve a Sprint" />
    </main>
  )
}
