'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Gauge,
  Wrench,
  TrendingUp,
} from 'lucide-react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import Guarantee from '../_components/Guarantee'
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
      <div className="max-w-6xl mx-auto">
        <p
          className="animate-fade-in-up text-xs uppercase mb-6"
          style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}
        >
          Tier 2 · Revenue System Build
        </p>

        <div
          className="animate-fade-in-up delay-100 mb-10 pb-10 flex flex-wrap gap-x-12 gap-y-6"
          style={{ borderBottom: '1px solid rgba(12,12,12,0.1)', opacity: 0 }}
        >
          {[
            { v: '$5K–$25K', l: 'scoped on intake' },
            { v: '2–6 WKS', l: 'ship to live' },
            { v: 'Full stack', l: 'funnel to CRM to analytics' },
          ].map(n => (
            <div key={n.v}>
              <p
                className="font-bold leading-none"
                style={{
                  ...MONO,
                  fontSize: 'clamp(32px, 4vw, 52px)',
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
          A Sprint fixes one page.
          <br />
          <span style={{ color: '#E8903A' }}>This fixes the whole system.</span>
        </h1>

        <p
          className="animate-fade-in-up delay-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          style={{ ...SERIF, color: '#3A3632', fontStyle: 'italic', opacity: 0 }}
        >
          Landing pages, funnels, CRM, automations, analytics — the whole revenue stack, designed,
          built, and wired together. Using the same AI-native mechanism that makes the Sprint
          economics work, applied end-to-end.
        </p>

        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-3" style={{ opacity: 0 }}>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded transition-colors"
            style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A3632')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0C0C0C')}
          >
            Book a diagnostic call <ArrowRight size={15} />
          </Link>
          <Link
            href="/sprint"
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
            Not sure? Start with a Sprint →
          </Link>
        </div>

        <p
          className="animate-fade-in-up delay-500 text-xs mt-5"
          style={{ ...MONO, color: '#7A756D', opacity: 0 }}
        >
          2 Build slots open this quarter · Scope returned within 48 hours
        </p>
      </div>
    </section>
  )
}

// ── Vs. agency comparison ────────────────────────────────────────
const COMPARISON = [
  {
    lever: 'Who does the work',
    agency: 'Junior account managers route your brief to 3 subcontractors',
    zapp: 'Hamza, directly. Diagnosis, copy, code, QA — all one person.',
  },
  {
    lever: 'Timeline to live',
    agency: '12–16 weeks (discovery → design → dev → QA → revisions)',
    zapp: '2–6 weeks, working software shipping incrementally',
  },
  {
    lever: 'What you pay',
    agency: '$30K–$120K for the equivalent scope',
    zapp: '$5K–$25K scoped to your real constraint',
  },
  {
    lever: 'Accountability',
    agency: 'Monthly performance review, quarterly retainer renegotiation',
    zapp: 'Real-time. You\'re in the build channel. No hiding behind reports.',
  },
  {
    lever: 'After the engagement',
    agency: '"Good luck" — they own the code, you pay to touch it',
    zapp: 'Clean handoff. Full codebase. Documentation. You own everything.',
  },
  {
    lever: 'Incentive alignment',
    agency: 'Paid whether it works or not',
    zapp: 'Equity option available. I win when you win.',
  },
]

function Comparison() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Why Not an Agency</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Same output.
            <br />
            <span style={{ color: '#7A756D' }}>Fraction of the overhead.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            Agencies charge $30K–$120K for systems work because they have a team of five to pay.
            I have Claude and a decade of shipping experience. The math is different.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="rounded overflow-hidden"
            style={{
              backgroundColor: '#F5EFE0',
              border: '1px solid rgba(12,12,12,0.12)',
            }}
          >
            <div
              className="grid grid-cols-[1fr_1.2fr_1.2fr] md:grid-cols-[1.2fr_1.5fr_1.5fr]"
              style={{ borderBottom: '1px solid rgba(12,12,12,0.12)' }}
            >
              <div className="p-4 md:p-5">
                <p
                  className="text-[10px] uppercase"
                  style={{ ...MONO, letterSpacing: '0.2em', color: '#7A756D' }}
                >
                  Lever
                </p>
              </div>
              <div className="p-4 md:p-5" style={{ borderLeft: '1px solid rgba(12,12,12,0.08)' }}>
                <p
                  className="text-[10px] uppercase"
                  style={{ ...MONO, letterSpacing: '0.18em', color: '#7A756D' }}
                >
                  Agency
                </p>
              </div>
              <div
                className="p-4 md:p-5"
                style={{
                  borderLeft: '1px solid rgba(232,144,58,0.35)',
                  backgroundColor: 'rgba(232,144,58,0.08)',
                }}
              >
                <p
                  className="text-[10px] uppercase"
                  style={{ ...MONO, letterSpacing: '0.18em', color: '#C97020' }}
                >
                  Zapp Build
                </p>
              </div>
            </div>

            {COMPARISON.map((row, i) => (
              <div
                key={row.lever}
                className="grid grid-cols-[1fr_1.2fr_1.2fr] md:grid-cols-[1.2fr_1.5fr_1.5fr]"
                style={{
                  borderBottom: i < COMPARISON.length - 1 ? '1px solid rgba(12,12,12,0.06)' : undefined,
                }}
              >
                <div className="p-4 md:p-5">
                  <p
                    className="text-sm font-semibold"
                    style={{ ...DISPLAY, color: '#0C0C0C' }}
                  >
                    {row.lever}
                  </p>
                </div>
                <div
                  className="p-4 md:p-5 text-sm leading-relaxed"
                  style={{
                    borderLeft: '1px solid rgba(12,12,12,0.06)',
                    color: '#7A756D',
                  }}
                >
                  {row.agency}
                </div>
                <div
                  className="p-4 md:p-5 text-sm leading-relaxed"
                  style={{
                    borderLeft: '1px solid rgba(232,144,58,0.25)',
                    backgroundColor: 'rgba(232,144,58,0.05)',
                    color: '#0C0C0C',
                  }}
                >
                  {row.zapp}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── What gets built ──────────────────────────────────────────────
const SYSTEMS = [
  {
    title: 'Landing + funnel',
    items: [
      'High-converting pages across your site',
      'Lead capture flows (forms, chatbots, quizzes)',
      'Onboarding sequences',
      'Checkout/booking optimization',
    ],
  },
  {
    title: 'CRM + automations',
    items: [
      'CRM setup or migration (HubSpot, GoHighLevel, Airtable, custom)',
      'Lead scoring and routing',
      'Email/SMS sequences triggered on behavior',
      'Handoff automations (sales → ops → fulfillment)',
    ],
  },
  {
    title: 'Analytics + experiments',
    items: [
      'Funnel tracking (GA4, Mixpanel, Amplitude, PostHog)',
      'Conversion event instrumentation',
      'A/B test infrastructure',
      'Dashboards for the metrics that matter',
    ],
  },
  {
    title: 'Growth loops',
    items: [
      'Referral mechanics',
      'Retention and winback flows',
      'Upsell/cross-sell touchpoints',
      'Content or SEO systems where they fit',
    ],
  },
]

function What() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>What Actually Gets Built</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Four systems.
            <br />
            Wired together.
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            Scope is always tailored — we build what&apos;s actually broken, not what looks
            impressive. But a typical Revenue System Build covers some or all of:
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.title} delay={100 + i * 60}>
              <div
                className="p-7 h-full rounded"
                style={{
                  backgroundColor: '#EEE7D3',
                  border: '1px solid rgba(12,12,12,0.08)',
                  borderLeftWidth: '3px',
                  borderLeftColor: '#E8903A',
                }}
              >
                <h3 className="text-lg font-semibold mb-5" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                  {s.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {s.items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <div
                        className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: '#E8903A' }}
                      />
                      <span className="text-sm leading-relaxed" style={{ color: '#3A3632' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── The method ───────────────────────────────────────────────────
const METHOD = [
  {
    icon: Gauge,
    num: '01',
    label: 'DIAGNOSE',
    title: 'Find the real constraint',
    desc: 'Every build starts with a paid diagnostic. I audit your funnel end-to-end. The data tells us whether the constraint is messaging, product, distribution, or all three. For Royal Pawz, diagnostic revealed 43.6% bounce rate — not ad spend — as the real bottleneck.',
  },
  {
    icon: Wrench,
    num: '02',
    label: 'BUILD',
    title: 'Ship the system that fixes it',
    desc: 'Working software, live and tested, in 2–6 weeks. Not a plan for you to execute. Using AI-native development — Claude writes, I QA — so the timeline is real, not aspirational.',
  },
  {
    icon: TrendingUp,
    num: '03',
    label: 'SCALE',
    title: 'Optimize and compound',
    desc: 'Once the system runs, we A/B test what works and add compounding growth channels. The goal isn\'t a one-time fix. It\'s infrastructure that gets better over time.',
  },
]

function Method() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Method</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Revenue isn&apos;t magic.
            <br />
            <span style={{ color: '#7A756D' }}>It&apos;s infrastructure.</span>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3 mt-12">
          {METHOD.map((m, i) => {
            const Icon = m.icon
            return (
              <Reveal key={m.num} delay={100 + i * 80}>
                <div
                  className="p-7 md:p-8 rounded flex flex-col md:flex-row md:items-start gap-5 md:gap-8"
                  style={{
                    backgroundColor: '#F5EFE0',
                    border: '1px solid rgba(12,12,12,0.08)',
                    borderLeftWidth: '3px',
                    borderLeftColor: '#E8903A',
                  }}
                >
                  <div className="flex items-center gap-3 md:w-56 shrink-0">
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
                        {m.num}
                      </span>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          ...MONO,
                          color: '#0C0C0C',
                          letterSpacing: '0.12em',
                        }}
                      >
                        {m.label}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                      {m.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: '#3A3632' }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Qualify ──────────────────────────────────────────────────────
const YES = [
  'You have $10K+/month in real revenue and want to systematize it',
  'Your best leads fall through cracks because your tools don\'t talk to each other',
  'You\'ve been burned by an agency and are skeptical about hiring another',
  'You can commit to ~1 hour/week of collaboration during the build',
]
const NO = [
  'You\'re pre-revenue or still testing product-market fit — start with a Sprint',
  'You want someone to rubber-stamp decisions you\'ve already made',
  'You need something shipped in under a week — that\'s a Sprint',
  'You\'re shopping on price alone without caring about outcomes',
]

function Qualify() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
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
            I cap at 2 active Builds.
            <br />
            <span style={{ color: '#7A756D' }}>Honest disqualification upfront saves us both.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4 mt-12">
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

// ── Pricing honesty ──────────────────────────────────────────────
function Pricing() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Honest Pricing</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            $5K–$25K.
            <br />
            <span style={{ color: '#7A756D' }}>Every engagement scoped in writing.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            Every Build is scoped precisely on the diagnostic call. Three rough bands for
            orientation — the exact number lands before you commit to anything.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { price: '$5K–$8K', name: 'Focused fix', desc: 'Single-system build after a diagnostic. E.g., rebuild the landing + checkout.' },
            { price: '$10K–$18K', name: 'Full-funnel', desc: 'End-to-end revenue engineering across landing, CRM, automations, analytics.' },
            { price: '$20K+', name: 'Infrastructure', desc: 'Full stack + ongoing optimization retainer. Best for teams scaling aggressively.' },
          ].map((tier, i) => (
            <Reveal key={tier.name} delay={100 + i * 80}>
              <div
                className="p-7 h-full rounded"
                style={{
                  backgroundColor: '#F5EFE0',
                  border: '1px solid rgba(12,12,12,0.08)',
                }}
              >
                <p
                  className="font-bold leading-none mb-3"
                  style={{
                    ...MONO,
                    fontSize: 'clamp(26px, 3vw, 36px)',
                    color: '#0C0C0C',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {tier.price}
                </p>
                <p className="text-sm font-semibold mb-3" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                  {tier.name}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#3A3632' }}>
                  {tier.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mt-10 text-sm" style={{ ...MONO, color: '#7A756D' }}>
            Equity-aligned option available when it fits — reduced cash, I take a stake. We scope
            that on the call if it makes sense.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── FAQ ──────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Why not just hire a freelance developer?',
    a: "A freelancer builds what you tell them to build. I diagnose what's actually broken in your funnel, design the fix, then build it. The build is 20% of the value. The other 80% is knowing what to build and why.",
  },
  {
    q: 'What tools/stack do you work in?',
    a: "Whatever fits. Next.js/React, plain HTML, Webflow, Framer, WordPress, GoHighLevel, HubSpot, Airtable, n8n, custom Node/Python APIs. I'll recommend a stack on the diagnostic — usually the simplest thing that actually works.",
  },
  {
    q: 'How is the timeline actually 2–6 weeks?',
    a: "Because Claude writes code at 10× human speed and I've productized the diagnosis + delivery loop. Agencies take 12+ weeks because they need design approvals between 5 people. It's not magic — it's fewer hands.",
  },
  {
    q: 'What\'s the time commitment on my end?',
    a: "About 1 hour/week. A weekly sync, timely answers to my questions, and access to the tools I need. I handle build, testing, iteration.",
  },
  {
    q: 'What happens after the engagement ends?',
    a: "You own everything — code, documentation, system handoff, Loom walkthrough. No licensing, no lock-in. If you want ongoing optimization, we renegotiate as a retainer. Otherwise clean exit.",
  },
  {
    q: 'What if the system doesn\'t hit the targets?',
    a: "If the Build doesn't hit the performance targets we set at scoping, I keep optimizing at no additional cost until it does. I can offer this because the diagnostic filters out projects where I can't see a clear path.",
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionLabel>Straight Answers</SectionLabel>
          <h2
            className="font-bold mb-16 leading-tight"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Questions I get on every diagnostic.
          </h2>
        </Reveal>

        <div className="flex flex-col gap-2">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                className="rounded overflow-hidden"
                style={{
                  backgroundColor: '#EEE7D3',
                  border: '1px solid rgba(12,12,12,0.08)',
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E8E0CA')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#EEE7D3')}
                >
                  <span className="text-base font-semibold pr-4" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                    {f.q}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: '#E8903A',
                      transform: open === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-6">
                    <p className="text-base leading-relaxed" style={{ color: '#3A3632' }}>
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

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
            Let&apos;s scope it.
          </h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: '#A09A8E' }}>
            30-min diagnostic. I audit the funnel, pinpoint the constraint, send scope + exact
            number in writing within 48 hours. No commitment either way.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a diagnostic <ArrowRight size={17} />
          </Link>
          <p className="mt-4 text-xs" style={{ ...MONO, color: '#6B6560' }}>
            2 Build slots open this quarter
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default function BuildPage() {
  return (
    <main style={{ backgroundColor: '#F5EFE0', color: '#0C0C0C' }}>
      <Nav mode="cream" />
      <Hero />
      <Comparison />
      <What />
      <Method />
      <Qualify />
      <Pricing />
      <GuaranteeSection />
      <FAQ />
      <FinalCTA />
      <Footer mode="cream" />
      <StickyCTA href="/book" label="Book a diagnostic" />
    </main>
  )
}
