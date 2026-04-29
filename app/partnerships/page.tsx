'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  X,
  Target,
  Wrench,
  BarChart3,
  Rocket,
  Handshake,
} from 'lucide-react'
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

// ── Slot indicator ───────────────────────────────────────────────
function SlotIndicator({ filled, total }: { filled: number; total: number }) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{
              backgroundColor: i < filled ? '#0C0C0C' : 'transparent',
              border: '1px solid #0C0C0C',
            }}
          />
        ))}
      </div>
      <span className="text-xs" style={{ ...MONO, color: '#3A3632' }}>
        {filled} / {total} slots filled
      </span>
    </div>
  )
}

function Hero() {
  return (
    <section className="pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <p
          className="animate-fade-in-up text-xs uppercase mb-6"
          style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}
        >
          Tier 3 · Equity Partnership
        </p>

        <div className="animate-fade-in-up delay-100 mb-10" style={{ opacity: 0 }}>
          <SlotIndicator filled={3} total={4} />
        </div>

        <h1
          className="animate-fade-in-up delay-200 font-bold leading-[1.02] mb-8 max-w-4xl"
          style={{
            ...DISPLAY,
            fontSize: 'clamp(42px, 6.5vw, 82px)',
            color: '#0C0C0C',
            letterSpacing: '-0.025em',
            opacity: 0,
          }}
        >
          I&apos;ll build it with you.
          <br />
          <span style={{ color: '#E8903A' }}>And bet on it with you.</span>
        </h1>

        <p
          className="animate-fade-in-up delay-300 text-lg md:text-xl max-w-2xl mb-6 leading-relaxed"
          style={{ ...SERIF, color: '#3A3632', fontStyle: 'italic', opacity: 0 }}
        >
          For businesses I genuinely believe in, I come on as a long-term revenue partner.
          Reduced cash + equity, 6–24 month engagements, full end-to-end revenue engineering.
        </p>

        <p
          className="animate-fade-in-up delay-350 text-base max-w-xl mb-10 leading-relaxed"
          style={{ color: '#7A756D', opacity: 0 }}
        >
          I cap this at 4 active slots. The filter isn&apos;t stage or size — it&apos;s whether I
          can see a clear path to compounding the number.
        </p>

        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-3" style={{ opacity: 0 }}>
          <Link
            href="#apply"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded transition-colors"
            style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A3632')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0C0C0C')}
          >
            Apply for the open slot <ArrowRight size={15} />
          </Link>
          <Link
            href="/build"
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
            Not ready? See Tier 2 Build →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Phases ───────────────────────────────────────────────────────
const PHASES = [
  {
    num: '01',
    icon: Target,
    label: 'DIAGNOSE & ALIGN',
    desc: 'Two-week paid pilot. I go deep on your business — unit economics, funnel, team, stack. We decide together whether the equity structure makes sense before either of us commits to more.',
  },
  {
    num: '02',
    icon: Wrench,
    label: 'BUILD THE SYSTEM',
    desc: 'Full-stack revenue engineering. Landing, funnel, CRM, product, automations, analytics — whatever the diagnostic says is the constraint. Shipped fast using AI-native development.',
  },
  {
    num: '03',
    icon: BarChart3,
    label: 'SCALE WHAT WORKS',
    desc: 'Weekly A/B tests, funnel optimization, new channels, new offers. I stay in the weeds while you stay out of them.',
  },
  {
    num: '04',
    icon: Rocket,
    label: 'COMPOUND',
    desc: 'The system outlives any single engagement. Playbooks, dashboards, documentation — so whether I stay or step back, the infrastructure keeps paying out.',
  },
]

function Phases() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>How a Partnership Works</SectionLabel>
          <h2
            className="font-bold mb-12 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Four phases.
            <br />
            <span style={{ color: '#7A756D' }}>Diagnostic first, always.</span>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {PHASES.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.num} delay={100 + i * 80}>
                <div
                  className="p-7 md:p-8 rounded flex flex-col md:flex-row md:items-start gap-5 md:gap-8"
                  style={{
                    backgroundColor: '#F5EFE0',
                    border: '1px solid rgba(12,12,12,0.08)',
                    borderLeftWidth: '3px',
                    borderLeftColor: '#E8903A',
                  }}
                >
                  <div className="flex items-center gap-3 md:w-60 shrink-0">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(232,144,58,0.15)',
                        border: '1px solid rgba(232,144,58,0.3)',
                      }}
                    >
                      <Icon size={16} color="#E8903A" />
                    </div>
                    <div>
                      <span style={{ ...MONO, color: '#E8903A' }} className="text-xs font-bold">
                        {p.num}
                      </span>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          ...MONO,
                          color: '#0C0C0C',
                          letterSpacing: '0.12em',
                        }}
                      >
                        {p.label}
                      </p>
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#3A3632' }}>
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={500}>
          <div
            className="mt-8 p-6 rounded"
            style={{
              backgroundColor: 'rgba(232,144,58,0.08)',
              border: '1px solid rgba(232,144,58,0.25)',
            }}
          >
            <p className="text-[15px] leading-relaxed" style={{ color: '#3A3632' }}>
              <span style={{ color: '#0C0C0C', fontWeight: 600 }}>
                The 2-week pilot is the real filter.
              </span>{' '}
              If I don&apos;t see a clear path to multiplying your number, I&apos;ll tell you — and
              we part as friends. No pressure to continue, no equity locked in, no retainer trap.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Commercial structure ─────────────────────────────────────────
const TERMS = [
  { label: 'Cash', value: 'Reduced', sub: 'Lower upfront in exchange for equity' },
  { label: 'Equity', value: '1–10%', sub: 'Negotiated on diagnostic — depends on stage' },
  { label: 'Term', value: '6–24 mo', sub: 'Renegotiated each cycle' },
  { label: 'Slots', value: '4 max', sub: 'Capped to protect output quality' },
]

function Structure() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Commercial Structure</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Reduced cash.
            <br />
            <span style={{ color: '#E8903A' }}>Real skin in the game.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            Exact terms negotiated per engagement. The numbers below are typical, not universal —
            we land on specifics during the diagnostic.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TERMS.map((t, i) => (
            <Reveal key={t.label} delay={100 + i * 60}>
              <div
                className="p-6 rounded h-full"
                style={{
                  backgroundColor: '#EEE7D3',
                  border: '1px solid rgba(12,12,12,0.08)',
                  borderTopWidth: '2px',
                  borderTopColor: '#E8903A',
                }}
              >
                <p
                  className="text-[10px] uppercase mb-3"
                  style={{ ...MONO, letterSpacing: '0.18em', color: '#7A756D' }}
                >
                  {t.label}
                </p>
                <p
                  className="font-bold leading-none mb-2"
                  style={{
                    ...MONO,
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    color: '#0C0C0C',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {t.value}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: '#7A756D' }}>
                  {t.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Case — Royal Pawz as flagship ───────────────────────────────
function FlagshipCase() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Current Flagship Partnership</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Royal Pawz USA.
            <br />
            <span style={{ color: '#7A756D' }}>What a partnership actually looks like.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            Came on as equity partner in 2025. Rebuilt the entire revenue stack from scratch.
            Still ongoing.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <Link
            href="/rev-eng/royalpawzusa"
            className="block p-8 md:p-10 rounded transition-all group"
            style={{
              backgroundColor: '#F5EFE0',
              border: '1px solid rgba(12,12,12,0.08)',
              borderTop: '2px solid #E8903A',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#EFE7D3'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#F5EFE0'
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
              {[
                { v: '$200→$10K', l: 'MRR growth' },
                { v: '50×', l: 'in 4 months' },
                { v: '334%', l: 'conversion lift' },
                { v: '5×', l: 'ROAS' },
              ].map(m => (
                <div key={m.l}>
                  <p
                    className="font-bold leading-none mb-1"
                    style={{
                      ...MONO,
                      fontSize: 'clamp(22px, 2.5vw, 32px)',
                      color: '#0C0C0C',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {m.v}
                  </p>
                  <p className="text-xs" style={{ ...MONO, color: '#7A756D' }}>
                    {m.l}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[15px] leading-relaxed mb-5 max-w-2xl" style={{ color: '#3A3632' }}>
              Mobile dog grooming company in Houston. I rebuilt the entire booking app, CRM, ad
              infrastructure, and A/B test framework. The system now runs without me.
            </p>

            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#E8903A' }}>
              Read the full teardown
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ── Qualify ──────────────────────────────────────────────────────
const YES = [
  'You have real revenue or validated demand — not just an idea',
  'You want a builder-partner with skin in the game, not a vendor on retainer',
  'You\'re okay giving up a small slice of equity for multiplicative upside',
  'You\'re honest about where the business really is, good and bad',
]
const NO = [
  'You\'re pre-product and just need validation — start with a Sprint',
  'You want to keep 100% of equity and hire on retainer — start with a Build',
  'You\'re looking for a co-founder to start something from zero',
  'You want daily strategy calls and endless meetings — I stay in the weeds',
]

function Qualify() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Is This For You?</SectionLabel>
          <h2
            className="font-bold mb-12 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            I say no more than I say yes.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          <Reveal delay={100}>
            <div
              className="p-7 h-full rounded"
              style={{
                backgroundColor: '#EEE7D3',
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
                {YES.map(item => (
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
                backgroundColor: '#EEE7D3',
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
                {NO.map(item => (
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

// ── Application form ─────────────────────────────────────────────
function Application() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    url: '',
    revenue: '',
    constraint: '',
  })

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Name: ${form.name}
Company: ${form.company}
URL: ${form.url}
Monthly revenue: ${form.revenue}

Biggest constraint right now:
${form.constraint}`

    const mailto = `mailto:hamzazulquernain1@gmail.com?subject=${encodeURIComponent('Equity Partnership Application')}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    ...MONO,
    backgroundColor: '#EEE7D3',
    border: '1px solid rgba(12,12,12,0.15)',
    color: '#0C0C0C',
    padding: '12px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
  }

  return (
    <section id="apply" className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              backgroundColor: 'rgba(232,144,58,0.1)',
              border: '1px solid rgba(232,144,58,0.3)',
            }}
          >
            <Handshake size={12} color="#E8903A" />
            <span
              className="text-[10px] font-semibold"
              style={{ ...MONO, letterSpacing: '0.18em', color: '#E8903A' }}
            >
              APPLY FOR THE OPEN SLOT
            </span>
          </div>

          <h2
            className="font-bold mb-6 leading-tight"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Tell me about the business.
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: '#3A3632' }}>
            Five fields. I reply personally within 72 hours. If it looks like a fit, we schedule
            the 2-week paid diagnostic. If not, I&apos;ll tell you what I&apos;d focus on instead.
          </p>
        </Reveal>

        {!submitted ? (
          <Reveal delay={100}>
            <form onSubmit={handle} className="flex flex-col gap-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-2" style={{ ...MONO, color: '#7A756D', letterSpacing: '0.1em' }}>
                    YOUR NAME
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = '#E8903A')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(12,12,12,0.15)')}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ ...MONO, color: '#7A756D', letterSpacing: '0.1em' }}>
                    COMPANY
                  </label>
                  <input
                    required
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = '#E8903A')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(12,12,12,0.15)')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-2" style={{ ...MONO, color: '#7A756D', letterSpacing: '0.1em' }}>
                  WEBSITE URL
                </label>
                <input
                  required
                  type="url"
                  placeholder="https://"
                  value={form.url}
                  onChange={e => setForm({ ...form, url: e.target.value })}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E8903A')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(12,12,12,0.15)')}
                />
              </div>

              <div>
                <label className="block text-xs mb-2" style={{ ...MONO, color: '#7A756D', letterSpacing: '0.1em' }}>
                  APPROX. MONTHLY REVENUE
                </label>
                <input
                  required
                  placeholder="$10K / $100K / $500K — ballpark is fine"
                  value={form.revenue}
                  onChange={e => setForm({ ...form, revenue: e.target.value })}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E8903A')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(12,12,12,0.15)')}
                />
              </div>

              <div>
                <label className="block text-xs mb-2" style={{ ...MONO, color: '#7A756D', letterSpacing: '0.1em' }}>
                  BIGGEST CONSTRAINT RIGHT NOW
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Three sentences max. What's blocking the number?"
                  value={form.constraint}
                  onChange={e => setForm({ ...form, constraint: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', fontFamily: "'Inter', sans-serif" }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E8903A')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(12,12,12,0.15)')}
                />
              </div>

              <button
                type="submit"
                className="self-start inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded transition-colors"
                style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A3632')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0C0C0C')}
              >
                Submit application <ArrowRight size={16} />
              </button>

              <p className="text-xs" style={{ ...MONO, color: '#7A756D' }}>
                Reply within 72 hours · Not every applicant gets a diagnostic · That&apos;s the point
              </p>
            </form>
          </Reveal>
        ) : (
          <Reveal>
            <div
              className="p-8 rounded"
              style={{
                backgroundColor: '#F5EFE0',
                border: '1px solid rgba(74,141,95,0.3)',
                borderLeftWidth: '3px',
                borderLeftColor: '#4a8d5f',
              }}
            >
              <p className="text-base font-semibold mb-2" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                Email composed.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#3A3632' }}>
                Hit send in your mail app — I&apos;ll reply personally within 72 hours. If
                it&apos;s a fit, we book the diagnostic from there.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default function PartnershipsPage() {
  return (
    <main style={{ backgroundColor: '#F5EFE0', color: '#0C0C0C' }}>
      <Nav mode="cream" />
      <Hero />
      <Phases />
      <Structure />
      <FlagshipCase />
      <Qualify />
      <Application />
      <Footer mode="cream" />
      <StickyCTA href="#apply" label="Apply for a slot" />
    </main>
  )
}
