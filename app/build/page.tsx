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
import StickyCTA from '../_components/StickyCTA'

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

function SectionLabel({ children, mode = 'cream' }: { children: React.ReactNode; mode?: 'cream' | 'dark' }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span style={{ backgroundColor: '#E8903A' }} className="inline-block w-4 h-px" />
      <p
        className="text-xs uppercase"
        style={{ ...MONO, letterSpacing: '0.22em', color: mode === 'dark' ? '#6B6560' : '#7A756D' }}
      >
        {children}
      </p>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="pt-36 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p
          className="animate-fade-in-up text-xs uppercase mb-8"
          style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}
        >
          The Core Engagement
        </p>

        <h1
          className="animate-fade-in-up delay-100 font-bold leading-[1.02] mb-8 max-w-4xl"
          style={{
            ...DISPLAY,
            fontSize: 'clamp(42px, 6.5vw, 82px)',
            color: '#0C0C0C',
            letterSpacing: '-0.025em',
            opacity: 0,
          }}
        >
          Your funnel and your software,
          <br />
          <span style={{ color: '#E8903A' }}>rebuilt as one system.</span>
        </h1>

        <p
          className="animate-fade-in-up delay-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          style={{ ...SERIF, color: '#3A3632', fontStyle: 'italic', opacity: 0 }}
        >
          The Revenue System Build is the core engagement &mdash; I diagnose where revenue leaks,
          build the software that fixes it, and run the growth that compounds it. One operator,
          start to finish.
        </p>

        <div
          className="animate-fade-in-up delay-300 flex flex-wrap gap-x-12 gap-y-4 mb-10 pb-10"
          style={{ borderBottom: '1px solid rgba(12,12,12,0.1)', opacity: 0 }}
        >
          {[
            { v: 'Diagnosis-led' },
            { v: 'Working software in weeks' },
            { v: 'Built and run as one system' },
          ].map(n => (
            <p
              key={n.v}
              className="text-sm font-semibold"
              style={{ ...MONO, color: '#0C0C0C', letterSpacing: '0.04em' }}
            >
              {n.v}
            </p>
          ))}
        </div>

        <div
          className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-3 mb-6"
          style={{ opacity: 0 }}
        >
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold rounded transition-colors"
            style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3A3632')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0C0C0C')}
          >
            Book a call <ArrowRight size={15} />
          </Link>
          <Link
            href="/diagnostic"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm rounded transition-colors"
            style={{ border: '1px solid rgba(12,12,12,0.15)', color: '#3A3632' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#E8903A'
              e.currentTarget.style.color = '#0C0C0C'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(12,12,12,0.15)'
              e.currentTarget.style.color = '#3A3632'
            }}
          >
            Start with a diagnostic &rarr;
          </Link>
        </div>

        <p
          className="animate-fade-in-up delay-500 text-xs"
          style={{ ...MONO, color: '#7A756D', opacity: 0 }}
        >
          A handful of Builds at a time, so the work stays hands-on.
        </p>
      </div>
    </section>
  )
}

// ── Comparison table ─────────────────────────────────────────────
const COMPARISON = [
  {
    lever: 'Who owns the outcome',
    agency: 'Split — each side blames the other’s scope',
    zapp: 'One operator owns funnel, software, and growth',
  },
  {
    lever: 'Growth and engineering',
    agency: 'Separate teams, separate roadmaps',
    zapp: 'Same person — the roadmap follows the funnel data',
  },
  {
    lever: 'Timeline',
    agency: '12–16 weeks across two vendors and a translation layer',
    zapp: 'Weeks — working software shipping incrementally',
  },
  {
    lever: 'Your role',
    agency: 'You brief both sides and translate between them',
    zapp: 'You give access and decisions; I run the build',
  },
  {
    lever: 'After the engagement',
    agency: 'They keep the code; you pay to touch it',
    zapp: 'You own everything — code, docs, dashboards',
  },
  {
    lever: 'Incentive',
    agency: 'Paid whether the number moves or not',
    zapp: 'Equity-aligned option when it fits — I win when you win',
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
            Two vendors, or one operator.
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            Most SMBs hire a growth agency and a dev shop, then spend months as the translation
            layer between them. There&apos;s a cleaner way.
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
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_1.2fr_1.2fr] md:grid-cols-[1.2fr_1.5fr_1.5fr]"
              style={{ borderBottom: '1px solid rgba(12,12,12,0.12)' }}
            >
              <div className="p-4 md:p-5">
                <p
                  className="text-[10px] uppercase"
                  style={{ ...MONO, letterSpacing: '0.2em', color: '#7A756D' }}
                >
                  &nbsp;
                </p>
              </div>
              <div className="p-4 md:p-5" style={{ borderLeft: '1px solid rgba(12,12,12,0.08)' }}>
                <p
                  className="text-[10px] uppercase"
                  style={{ ...MONO, letterSpacing: '0.18em', color: '#7A756D' }}
                >
                  Agency + dev shop
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
                  Zapp Studios
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
                  <p className="text-sm font-semibold" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                    {row.lever}
                  </p>
                </div>
                <div
                  className="p-4 md:p-5 text-sm leading-relaxed"
                  style={{ borderLeft: '1px solid rgba(12,12,12,0.06)', color: '#7A756D' }}
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
            Four systems. Wired together.
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            Scope is always tailored &mdash; we build what&apos;s actually broken, not what looks
            impressive. A typical Build covers some or all of:
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
    desc: 'Every Build starts with a diagnostic. I audit the funnel end to end and let the data say whether the constraint is messaging, product, or distribution. For Royal Pawz, the diagnostic revealed a 43.6% bounce rate — not ad spend — as the real bottleneck.',
  },
  {
    icon: Wrench,
    num: '02',
    label: 'BUILD',
    title: 'Ship the system that fixes it',
    desc: 'Working software, live and tested, in weeks — not a plan for someone else to execute. One operator moves from diagnosis to deployed code without a translation layer in between.',
  },
  {
    icon: TrendingUp,
    num: '03',
    label: 'SCALE',
    title: 'Optimize and compound',
    desc: 'Once the system runs, A/B tests and compounding channels follow the data. The goal isn’t a one-time fix — it’s infrastructure that gets better over time.',
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
                        style={{ ...MONO, color: '#0C0C0C', letterSpacing: '0.12em' }}
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

// ── Is this for you ──────────────────────────────────────────────
const YES_ITEMS = [
  'You have real, recurring revenue and want to systematize it',
  'Your best leads fall through the cracks because your tools don’t talk to each other',
  'You want one accountable operator, not an agency plus a dev shop',
  'You can commit about an hour a week of collaboration during the build',
]
const NO_ITEMS = [
  'You’re pre-revenue or still finding product–market fit — startup consulting may fit better',
  'You want someone to rubber-stamp decisions you’ve already made',
  'You need something shipped in days — start with a diagnostic',
  'You’re choosing on lowest price alone',
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
            Straight about fit.
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
                A fit if &mdash;
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
                Not yet if &mdash;
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
              <div
                className="mt-6 pt-5"
                style={{ borderTop: '1px solid rgba(12,12,12,0.08)' }}
              >
                <Link
                  href="/startups"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: '#C97020' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#0C0C0C')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#C97020')}
                >
                  Earlier stage? See startup consulting
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── How engagements are scoped ────────────────────────────────────
const SHAPES = [
  {
    name: 'Focused fix',
    desc: 'A single-system build after a diagnostic. We identify the tightest constraint and build exactly what fixes it — nothing more.',
  },
  {
    name: 'Full-funnel',
    desc: 'End-to-end across landing, CRM, automations, and analytics. The whole revenue stack, wired together and measured as one system.',
  },
  {
    name: 'Infrastructure',
    desc: 'Full stack plus ongoing optimization. The system ships, then keeps improving — A/B tests, new channels, compounding layers over time.',
  },
]

function Pricing() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>How Pricing Works</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Every Build is scoped in writing.
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            Every Build is scoped precisely after the diagnostic. Scope follows the constraint
            &mdash; we build what&apos;s broken, nothing you don&apos;t need. An equity-aligned
            option is available when it fits.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {SHAPES.map((shape, i) => (
            <Reveal key={shape.name} delay={100 + i * 80}>
              <div
                className="p-7 h-full rounded"
                style={{
                  backgroundColor: '#F5EFE0',
                  border: '1px solid rgba(12,12,12,0.08)',
                }}
              >
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ ...MONO, color: '#E8903A', letterSpacing: '0.04em' }}
                >
                  {shape.name}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#3A3632' }}>
                  {shape.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mt-10 text-sm" style={{ ...MONO, color: '#7A756D' }}>
            Exact scope and pricing are sent in writing after the diagnostic call &mdash; before
            you commit to anything.
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
    a: "A freelancer builds what you tell them to build. I diagnose what’s actually broken in the funnel, design the fix, then build it. The build is the smaller half of the value — knowing what to build and why is the rest.",
  },
  {
    q: 'What tools and stack do you work in?',
    a: 'Whatever fits. Next.js/React, plain HTML, Webflow, Framer, WordPress, GoHighLevel, HubSpot, Airtable, n8n, custom Node/Python. I recommend the simplest thing that actually works.',
  },
  {
    q: 'How is the timeline only a few weeks?',
    a: 'One operator, no translation layer between an agency and a dev shop, and a productized diagnosis-to-delivery loop. Agencies take 12+ weeks because briefs route through five people. The work doesn’t.',
  },
  {
    q: "What’s the time commitment on my end?",
    a: 'About an hour a week — a sync, timely answers to questions, and tool access. I handle the build and iteration.',
  },
  {
    q: 'What happens after the engagement?',
    a: 'You own everything — code, docs, dashboards, and a full walkthrough. No lock-in. If you want ongoing optimization, we can structure that separately.',
  },
  {
    q: "What if it doesn’t hit the targets?",
    a: "If the Build doesn’t hit the performance targets we set at scoping, I keep optimizing at no extra cost until it does. The diagnostic filters out projects where I can’t see a clear path.",
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
            Questions I get on every call.
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
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
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

// ── Final CTA ─────────────────────────────────────────────────────
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
            A call, not a pitch &mdash; I&apos;ll learn the business, and if a Build makes sense
            I&apos;ll send scope in writing.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a call
            <ArrowRight size={17} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────
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
      <FAQ />
      <FinalCTA />
      <Footer mode="cream" />
      <StickyCTA href="/book" label="Book a call" />
    </main>
  )
}
