'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  X,
  Zap,
  Wrench,
  Handshake,
  Bot,
  Eye,
  Target,
} from 'lucide-react'
import Nav from './_components/Nav'
import Footer from './_components/Footer'
import Placeholder from './_components/Placeholder'
import Guarantee from './_components/Guarantee'
import StickyCTA from './_components/StickyCTA'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }

// ── Scroll-in animation hook ──────────────────────────────────────
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

// ── Section label ───────────────────────────────────────────────
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
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_340px] lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Left: copy */}
          <div>
            {/* The 3 numerals */}
            <div
              className="animate-fade-in-up mb-10 pb-10 flex flex-wrap gap-x-10 gap-y-6"
              style={{ borderBottom: '1px solid rgba(12,12,12,0.1)' }}
            >
              {[
                { v: '$1,500', l: 'flat fee' },
                { v: '7 DAYS', l: 'kickoff to live' },
                { v: '$0', l: 'if I miss the deadline' },
              ].map(n => (
                <div key={n.v}>
                  <p
                    className="font-bold leading-none"
                    style={{
                      ...MONO,
                      fontSize: 'clamp(36px, 4.5vw, 56px)',
                      color: '#0C0C0C',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {n.v}
                  </p>
                  <p className="text-xs mt-2" style={{ ...MONO, color: '#7A756D' }}>
                    {n.l}
                  </p>
                </div>
              ))}
            </div>

            {/* Eyebrow */}
            <p
              className="animate-fade-in-up delay-100 text-xs uppercase mb-6"
              style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A', opacity: 0 }}
            >
              AI-Native Revenue Engineering
            </p>

            {/* Headline */}
            <h1
              className="animate-fade-in-up delay-200 font-bold leading-[1.02] mb-8"
              style={{
                ...DISPLAY,
                fontSize: 'clamp(42px, 6.5vw, 82px)',
                color: '#0C0C0C',
                letterSpacing: '-0.025em',
                opacity: 0,
              }}
            >
              Ship a high-converting
              <br />
              landing page in a week.
              <br />
              <span style={{ color: '#E8903A' }}>Or pay nothing.</span>
            </h1>

            {/* Mechanism line — serif italic for voice */}
            <p
              className="animate-fade-in-up delay-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              style={{ ...SERIF, color: '#3A3632', fontStyle: 'italic', opacity: 0 }}
            >
              I use Claude to write the code at 10× speed. I personally QA every line. That&apos;s
              why $1,500 is the real price — not $15,000.
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-3 mb-4"
              style={{ opacity: 0 }}
            >
              <Link
                href="/sprint"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded transition-colors"
                style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A3632')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0C0C0C')}
              >
                Reserve a Sprint slot <ArrowRight size={15} />
              </Link>
              <Link
                href="#royalpawz"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm rounded transition-colors"
                style={{
                  border: '1px solid rgba(12,12,12,0.15)',
                  color: '#3A3632',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#E8903A'
                  e.currentTarget.style.color = '#0C0C0C'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(12,12,12,0.15)'
                  e.currentTarget.style.color = '#3A3632'
                }}
              >
                See the Royal Pawz teardown →
              </Link>
            </div>

            <p
              className="animate-fade-in-up delay-500 text-xs"
              style={{ ...MONO, color: '#7A756D', opacity: 0 }}
            >
              Flat fee. No retainer. 3 Sprint slots open this month.
            </p>
          </div>

          {/* Right: founder photo */}
          <div className="animate-fade-in-up delay-300" style={{ opacity: 0 }}>
            <Placeholder
              kind="FOUNDER PHOTO"
              label="Hamza at work"
              aspect="4/5"
              mode="cream"
            />
            <p className="text-xs mt-3" style={{ ...MONO, color: '#7A756D' }}>
              Hamza Zulquernain · Founder
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Proof strip ─────────────────────────────────────────────────
function ProofStrip() {
  const items = [
    'Royal Pawz: $200 → $10K MRR in 4 months',
    '334% conversion lift (90 days)',
    'Founding engineer at DietAI — 7-figure exit',
    '1,500+ hours shipping alongside Claude',
  ]

  return (
    <section
      className="py-5 px-6"
      style={{
        backgroundColor: '#0C0C0C',
        color: '#F5EFE0',
        borderTop: '1px solid rgba(12,12,12,0.1)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-2">
        {items.map((it, i) => (
          <span
            key={it}
            className="text-xs md:text-[13px]"
            style={{ ...MONO, color: i === 0 ? '#E8903A' : '#A09A8E' }}
          >
            {it}
          </span>
        ))}
      </div>
    </section>
  )
}

// ── Mechanism video + unpacked ───────────────────────────────────
function Mechanism() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Mechanism</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Watch me build a landing page in 90 seconds.
          </h2>
          <p
            className="text-lg max-w-2xl mb-12 leading-relaxed"
            style={{ color: '#3A3632' }}
          >
            This is the entire reason the economics work. Claude writes the code at a pace no
            human can match. I QA every line before it ships. You get the speed of AI and the
            judgment of a senior engineer — for a fraction of agency prices.
          </p>
        </Reveal>

        {/* Loom placeholder */}
        <Reveal delay={120}>
          <Placeholder
            kind="FOUNDER LOOM"
            label="60–90s mechanism explainer — Hamza on camera + IDE visible"
            aspect="16/9"
            mode="cream"
          />
        </Reveal>

        {/* 3-block unpack */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {[
            {
              icon: Bot,
              title: 'Claude writes it',
              desc: 'I use Claude (Anthropic\'s best-in-class model) to generate production code at roughly 10× human speed. A landing page section that would take a day takes an hour.',
              stat: '10× faster',
            },
            {
              icon: Eye,
              title: 'I QA every line',
              desc: 'Claude is fast but not infallible. I read every component, catch every edge case, test every breakpoint. You get speed without the AI-slop tax.',
              stat: '1,500+ hrs shipping with Claude',
            },
            {
              icon: Target,
              title: 'Tight scope, no drift',
              desc: 'One page. Seven days. $1,500. No open-ended discovery phase, no scope creep, no retainer. The constraint is the feature — it\'s what makes the price work.',
              stat: 'Fixed fee, fixed deadline',
            },
          ].map((m, i) => {
            const Icon = m.icon
            return (
              <Reveal key={m.title} delay={100 + i * 80}>
                <div
                  className="p-7 h-full rounded"
                  style={{
                    backgroundColor: '#EEE7D3',
                    border: '1px solid rgba(12,12,12,0.08)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: 'rgba(232,144,58,0.15)',
                      border: '1px solid rgba(232,144,58,0.3)',
                    }}
                  >
                    <Icon size={18} color="#E8903A" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                    {m.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#3A3632' }}>
                    {m.desc}
                  </p>
                  <p className="text-xs pt-4" style={{ ...MONO, color: '#E8903A', borderTop: '1px solid rgba(12,12,12,0.08)' }}>
                    {m.stat}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Royal Pawz teardown ──────────────────────────────────────────
function RoyalPawz() {
  return (
    <section id="royalpawz" className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Proof — Royal Pawz USA</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            $200 MRR to $10K MRR.
            <br />
            <span style={{ color: '#E8903A' }}>In 4 months. Not 4 years.</span>
          </h2>
          <p
            className="text-lg max-w-2xl mb-12 leading-relaxed"
            style={{ color: '#3A3632' }}
          >
            A mobile dog grooming company in Houston. I came on as equity partner, rebuilt the
            entire revenue stack, ran weekly A/B tests. Here are the actual numbers.
          </p>
        </Reveal>

        {/* Metrics grid */}
        <Reveal delay={100}>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-10 rounded overflow-hidden"
            style={{ border: '1px solid rgba(12,12,12,0.12)' }}
          >
            {[
              { v: '50×', l: 'MRR growth', s: 'in 4 months' },
              { v: '334%', l: 'conversion lift', s: '90-day window' },
              { v: '30.8%', l: 'booking conversion', s: 'A/B tested' },
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
                    fontSize: 'clamp(36px, 4vw, 48px)',
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

        {/* Dashboard + creative placeholders */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <Reveal delay={150}>
            <Placeholder
              kind="STRIPE DASHBOARD"
              label="Royal Pawz MRR chart — $200 → $10K with timestamps"
              aspect="4/3"
              mode="cream"
            />
          </Reveal>
          <Reveal delay={200}>
            <Placeholder
              kind="BEFORE / AFTER"
              label="Winning landing page A/B variant"
              aspect="4/3"
              mode="cream"
            />
          </Reveal>
        </div>

        <Reveal delay={250}>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E8903A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#0C0C0C')}
          >
            Read the full case study + receipts
            <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ── Offer ladder ─────────────────────────────────────────────────
const TIERS = [
  {
    icon: Zap,
    tag: 'Tier 1 · Start here',
    name: 'Landing Page Sprint',
    price: '$1,500',
    time: '7 days',
    slots: '3 slots open',
    pitch: 'One high-intent page, rebuilt from scratch. Ship-on-time guarantee.',
    cta: 'See the Sprint',
    href: '/sprint',
    featured: true,
  },
  {
    icon: Wrench,
    tag: 'Tier 2',
    name: 'Revenue System Build',
    price: '$5K–$25K',
    time: '2–6 wks',
    slots: 'Scoped on intake',
    pitch: 'Full-funnel engineering — landing + CRM + automations + analytics.',
    cta: 'See the scope',
    href: '/build',
    featured: false,
  },
  {
    icon: Handshake,
    tag: 'Tier 3',
    name: 'Equity Partnership',
    price: 'Cash + equity',
    time: '6–24 mo',
    slots: '3–4 slots · by application',
    pitch: 'Long-term revenue engineering for businesses I believe in.',
    cta: 'See how it works',
    href: '/partnerships',
    featured: false,
  },
]

function Ladder() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Ladder</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Start small. Scale only when the numbers justify it.
          </h2>
          <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{ color: '#3A3632' }}>
            Most engagements begin with a Sprint. If the lift is real and we work well together,
            we move up the ladder — only as far as the business needs.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {TIERS.map((t, i) => {
            const Icon = t.icon
            return (
              <Reveal key={t.href} delay={100 + i * 80}>
                <Link
                  href={t.href}
                  className="group flex flex-col p-7 rounded h-full transition-all duration-200"
                  style={{
                    backgroundColor: t.featured ? '#0C0C0C' : '#EEE7D3',
                    border: t.featured ? '1px solid #0C0C0C' : '1px solid rgba(12,12,12,0.08)',
                    color: t.featured ? '#F5EFE0' : '#0C0C0C',
                  }}
                  onMouseEnter={e => {
                    if (!t.featured) {
                      e.currentTarget.style.borderColor = 'rgba(232,144,58,0.5)'
                      e.currentTarget.style.backgroundColor = '#E8E0CA'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!t.featured) {
                      e.currentTarget.style.borderColor = 'rgba(12,12,12,0.08)'
                      e.currentTarget.style.backgroundColor = '#EEE7D3'
                    }
                  }}
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: t.featured
                        ? 'rgba(232,144,58,0.2)'
                        : 'rgba(232,144,58,0.15)',
                      border: '1px solid rgba(232,144,58,0.3)',
                    }}
                  >
                    <Icon size={18} color="#E8903A" />
                  </div>

                  <p
                    className="text-xs uppercase mb-3"
                    style={{
                      ...MONO,
                      letterSpacing: '0.15em',
                      color: t.featured ? '#E8903A' : '#7A756D',
                    }}
                  >
                    {t.tag}
                  </p>

                  <h3 className="text-xl font-bold mb-4" style={{ ...DISPLAY }}>
                    {t.name}
                  </h3>

                  <div
                    className="pb-4 mb-4 flex flex-col gap-1"
                    style={{
                      borderBottom: t.featured
                        ? '1px solid rgba(245,239,224,0.12)'
                        : '1px solid rgba(12,12,12,0.08)',
                    }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span
                        className="text-2xl font-bold"
                        style={{ ...MONO, letterSpacing: '-0.02em' }}
                      >
                        {t.price}
                      </span>
                      <span
                        className="text-xs"
                        style={{ ...MONO, color: t.featured ? '#A09A8E' : '#7A756D' }}
                      >
                        {t.time}
                      </span>
                    </div>
                    <p
                      className="text-[11px] uppercase"
                      style={{
                        ...MONO,
                        letterSpacing: '0.15em',
                        color: t.featured ? '#4ADE80' : '#4a8d5f',
                      }}
                    >
                      {t.slots}
                    </p>
                  </div>

                  <p
                    className="text-sm mb-6 flex-1 leading-relaxed"
                    style={{ color: t.featured ? '#A09A8E' : '#3A3632' }}
                  >
                    {t.pitch}
                  </p>

                  <div
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: '#E8903A' }}
                  >
                    {t.cta}
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Self-qualify ─────────────────────────────────────────────────
const YES_ITEMS = [
  'You have real traffic (paid or organic) and want more of it to convert',
  'You\'ve been quoted 8+ weeks and $10K+ by an agency for a landing page',
  'You can hand off analytics, brand assets, and a decision-maker in 48 hours',
  'You want a fixed fee, fixed deadline, and a builder who actually builds',
]

const NO_ITEMS = [
  'You\'re pre-revenue and still looking for product-market fit',
  'You need a 30-page site with CMS, blog, and user portal',
  'You want unlimited revisions and endless strategy calls',
  'You\'re shopping on price alone without caring about outcome',
]

function Qualify() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Is This For You?</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            I turn away 80% of inquiries.
            <br />
            <span style={{ color: '#7A756D' }}>Here&apos;s why you might be one of them.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{ color: '#3A3632' }}>
            Honest disqualification upfront saves both of us time. If you&apos;re not a fit, I&apos;ll
            tell you within 15 minutes and point you to what to do instead.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          <Reveal delay={100}>
            <div
              className="p-7 h-full rounded"
              style={{
                backgroundColor: '#F5EFE0',
                borderLeft: '3px solid #4ADE80',
                border: '1px solid rgba(12,12,12,0.08)',
                borderLeftWidth: '3px',
                borderLeftColor: '#4a8d5f',
              }}
            >
              <p
                className="text-xs uppercase mb-5"
                style={{ ...MONO, letterSpacing: '0.2em', color: '#4a8d5f' }}
              >
                You&apos;re a fit if —
              </p>
              <ul className="flex flex-col gap-4">
                {YES_ITEMS.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'rgba(74,141,95,0.12)',
                        border: '1px solid rgba(74,141,95,0.35)',
                      }}
                    >
                      <Check size={10} color="#4a8d5f" />
                    </div>
                    <span className="text-[15px] leading-relaxed" style={{ color: '#3A3632' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div
              className="p-7 h-full rounded"
              style={{
                backgroundColor: '#F5EFE0',
                border: '1px solid rgba(12,12,12,0.08)',
                borderLeftWidth: '3px',
                borderLeftColor: '#C14444',
              }}
            >
              <p
                className="text-xs uppercase mb-5"
                style={{ ...MONO, letterSpacing: '0.2em', color: '#C14444' }}
              >
                Not a fit if —
              </p>
              <ul className="flex flex-col gap-4">
                {NO_ITEMS.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'rgba(193,68,68,0.1)',
                        border: '1px solid rgba(193,68,68,0.3)',
                      }}
                    >
                      <X size={10} color="#C14444" />
                    </div>
                    <span className="text-[15px] leading-relaxed" style={{ color: '#3A3632' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Founder block ────────────────────────────────────────────────
function Founder() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Operator</SectionLabel>
        </Reveal>

        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] gap-12">
          <Reveal>
            <Placeholder kind="FOUNDER PORTRAIT" label="Hamza, close portrait" aspect="4/5" mode="cream" />
          </Reveal>

          <Reveal delay={120}>
            <h2
              className="font-bold mb-8 leading-tight"
              style={{
                ...DISPLAY,
                fontSize: 'clamp(28px, 4vw, 42px)',
                color: '#0C0C0C',
                letterSpacing: '-0.02em',
              }}
            >
              I was the engineer who actually shipped it.
            </h2>

            <div className="flex flex-col gap-5 text-[16px] leading-relaxed" style={{ color: '#3A3632' }}>
              <p>
                I was the founding engineer at{' '}
                <span style={{ color: '#0C0C0C', fontWeight: 600 }}>DietAI</span> — built the
                product, the funnel, and the growth systems that carried it to a{' '}
                <span style={{ color: '#0C0C0C', fontWeight: 600 }}>7-figure exit</span>. I saw
                what a revenue system looks like from inside: built, shipped, measured, sold.
              </p>
              <p>
                Since then I&apos;ve spent{' '}
                <span style={{ color: '#0C0C0C', fontWeight: 600 }}>1,500+ hours shipping alongside Claude</span>.
                I don&apos;t sell strategy decks — I know what happens when execution fails. I&apos;ve been the
                guy watching agencies deliver reports while the business bleeds.
              </p>
              <p style={{ ...SERIF, fontStyle: 'italic', color: '#0C0C0C', fontSize: '18px' }}>
                &ldquo;When you work with me, the person who diagnosed your problem is the same
                person building the solution. That&apos;s the point.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Guarantee block wrapper ──────────────────────────────────────
function GuaranteeSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <Guarantee mode="cream" />
        </Reveal>
      </div>
    </section>
  )
}

// ── Free teardown reciprocity ────────────────────────────────────
function Teardown() {
  const [url, setUrl] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <p
            className="text-xs uppercase mb-6"
            style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}
          >
            Not Ready to Book? — Free
          </p>
          <h2
            className="font-bold mb-6 leading-tight"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Send me your homepage URL.
            <br />
            <span style={{ color: '#E8903A' }}>I&apos;ll Loom you a 5-min teardown.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: '#3A3632' }}>
            No pitch, no form funnel, no automation. Just me, watching your page, telling you
            what I&apos;d change first. A sample of how I actually work.
          </p>
        </Reveal>

        <Reveal delay={100}>
          {!sent ? (
            <form
              onSubmit={e => {
                e.preventDefault()
                if (!url) return
                const mailto = `mailto:hamzazulquernain1@gmail.com?subject=${encodeURIComponent('Free teardown request')}&body=${encodeURIComponent(`Hey Hamza,\n\nMy homepage: ${url}\n\nWhat I'd most like your eyes on:\n`)}`
                window.location.href = mailto
                setSent(true)
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                required
                placeholder="https://yourbusiness.com"
                className="flex-1 px-4 py-3 text-sm rounded outline-none"
                style={{
                  ...MONO,
                  backgroundColor: '#EEE7D3',
                  border: '1px solid rgba(12,12,12,0.15)',
                  color: '#0C0C0C',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#E8903A')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(12,12,12,0.15)')}
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold rounded transition-colors whitespace-nowrap"
                style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A3632')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0C0C0C')}
              >
                Send for teardown →
              </button>
            </form>
          ) : (
            <p
              className="text-sm p-4 rounded inline-block"
              style={{
                ...MONO,
                color: '#4a8d5f',
                backgroundColor: 'rgba(74,141,95,0.08)',
                border: '1px solid rgba(74,141,95,0.25)',
              }}
            >
              Email composed. Hit send in your mail app — I&apos;ll Loom you back within 48 hours.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}

// ── Final CTA ────────────────────────────────────────────────────
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
            Reserve your Sprint slot.
          </h2>
          <p
            className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ color: '#A09A8E' }}
          >
            $1,500 flat. Seven days. Pay nothing if I miss the deadline. 3 slots open this month.
          </p>

          <Link
            href="/sprint"
            className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            See the Sprint
            <ArrowRight size={17} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main style={{ backgroundColor: '#F5EFE0', color: '#0C0C0C' }}>
      <Nav mode="cream" />
      <Hero />
      <ProofStrip />
      <Mechanism />
      <RoyalPawz />
      <Ladder />
      <Qualify />
      <Founder />
      <GuaranteeSection />
      <Teardown />
      <FinalCTA />
      <Footer mode="cream" />
      <StickyCTA href="/sprint" label="Reserve a Sprint" />
    </main>
  )
}
