'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  X,
  Stethoscope,
  Wrench,
  TrendingUp,
  Sparkles,
  Compass,
  Layers,
  Handshake,
  Rocket,
} from 'lucide-react'
import Nav from './_components/Nav'
import Footer from './_components/Footer'
import Placeholder from './_components/Placeholder'
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
      <div className="max-w-5xl mx-auto">
        <p
          className="animate-fade-in-up text-xs uppercase mb-8"
          style={{ ...MONO, letterSpacing: '0.22em', color: '#E8903A' }}
        >
          Zapp Studios — Growth + Software for SMBs
        </p>

        <h1
          className="animate-fade-in-up delay-100 font-bold leading-[1.03] mb-8"
          style={{
            ...DISPLAY,
            fontSize: 'clamp(44px, 7vw, 86px)',
            color: '#0C0C0C',
            letterSpacing: '-0.03em',
            opacity: 0,
          }}
        >
          Growth marketing and software,
          <br />
          <span style={{ color: '#E8903A' }}>built as one system.</span>
        </h1>

        <p
          className="animate-fade-in-up delay-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          style={{ ...SERIF, color: '#3A3632', fontStyle: 'italic', opacity: 0 }}
        >
          Most SMBs bolt a marketing agency onto a dev shop — and lose months in the
          translation. I&apos;m one operator who does both, so your funnel, your product, and
          your revenue move together.
        </p>

        <div
          className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-3 mb-5"
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
            href="#royalpawz"
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
            See the Royal Pawz teardown →
          </Link>
        </div>

        <p
          className="animate-fade-in-up delay-400 text-xs"
          style={{ ...MONO, color: '#7A756D', opacity: 0 }}
        >
          A working call, not a pitch — 15 minutes.
        </p>
      </div>
    </section>
  )
}

// ── Proof strip ─────────────────────────────────────────────────
function ProofStrip() {
  const items = [
    'Royal Pawz — $200 to $10K MRR in 4 months',
    '334% conversion lift, A/B tested',
    'Founding engineer at DietAI — 7-figure exit',
    'One operator: growth + engineering',
  ]
  return (
    <section className="py-5 px-6" style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}>
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

// ── The gap ──────────────────────────────────────────────────────
function Gap() {
  const cards = [
    {
      title: "What the agency can't reach",
      desc: "A growth agency will sharpen your ads and your copy. Then it hits a wall — the real fix needs a faster page, a new booking flow, a change to the product itself. That's outside their scope. So the leak stays.",
    },
    {
      title: "What the dev shop can't see",
      desc: "A dev shop ships whatever's on the ticket. But it has no view of CAC, conversion, or retention — so it builds features that don't move revenue, and the roadmap quietly drifts away from the numbers.",
    },
  ]
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Why Growth Stalls</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Your marketing problem is usually a software problem.
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            You don&apos;t have a marketing problem and a separate engineering problem. You have
            one revenue system — and it breaks at the seam between the two.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={100 + i * 90}>
              <div
                className="p-7 h-full rounded"
                style={{
                  backgroundColor: '#F5EFE0',
                  border: '1px solid rgba(12,12,12,0.08)',
                }}
              >
                <h3 className="text-lg font-semibold mb-3" style={{ ...DISPLAY, color: '#0C0C0C' }}>
                  {c.title}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: '#3A3632' }}>
                  {c.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={250}>
          <p
            className="text-lg leading-relaxed mt-8 max-w-3xl"
            style={{ ...SERIF, color: '#0C0C0C', fontStyle: 'italic' }}
          >
            Either way, you become the integration layer — briefing both sides, translating
            between them, waiting. Months pass. The number doesn&apos;t move.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── The approach ─────────────────────────────────────────────────
const APPROACH = [
  {
    icon: Stethoscope,
    title: 'Diagnose',
    desc: "Find the real constraint. I audit the funnel end to end and let the data say whether it's the messaging, the product, or the distribution — so we fix what's actually broken, not what's easy to bill for.",
  },
  {
    icon: Wrench,
    title: 'Build',
    desc: 'Ship the software that fixes it. Landing pages, apps, checkout flows, CRM, automations, analytics — real working software in weeks, not a slide deck for someone else to execute.',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    desc: 'Run it and compound it. A/B tests, retention flows, new channels. The system keeps improving while it runs — because the person measuring it is the person who can change it.',
  },
  {
    icon: Sparkles,
    title: 'Innovate',
    desc: "Build in the leverage. AI and automation wired into the parts of your business that should run themselves — so your team's hours go to the work that actually grows the company.",
  },
]

function Approach() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>How I Work</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            One operator. The whole revenue system.
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            I diagnose the funnel, build the software, and run the growth as one continuous loop.
            When the data says the bottleneck is the checkout, I rebuild the checkout — not a
            ticket, not a handoff, not next quarter.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {APPROACH.map((m, i) => {
            const Icon = m.icon
            return (
              <Reveal key={m.title} delay={100 + i * 70}>
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
                  <p className="text-sm leading-relaxed" style={{ color: '#3A3632' }}>
                    {m.desc}
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

// ── Royal Pawz proof ─────────────────────────────────────────────
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
            <span style={{ color: '#E8903A' }}>In four months.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#3A3632' }}>
            A mobile dog-grooming company in Houston. I joined as equity partner and rebuilt the
            whole revenue system — the booking app, the CRM, the ad infrastructure, and the weekly
            A/B testing loop. Growth and engineering were never two workstreams. They were one.
          </p>
        </Reveal>

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
                    fontSize: 'clamp(34px, 4vw, 48px)',
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

        <Reveal delay={200}>
          <Link
            href="/rev-eng/royalpawzusa"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E8903A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#0C0C0C')}
          >
            Read the full case study
            <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ── The ladder ───────────────────────────────────────────────────
const TIERS = [
  {
    icon: Compass,
    name: 'Revenue Diagnostic',
    forWho: 'You know growth is leaking — not where.',
    pitch: 'A paid, deep audit of your funnel and product. You leave with a prioritized plan you can act on — with me or without me.',
    cta: 'How the diagnostic works',
    href: '/diagnostic',
    featured: false,
  },
  {
    icon: Layers,
    name: 'Revenue System Build',
    forWho: 'The system needs rebuilding, not patching.',
    pitch: 'The core engagement. Funnel, software, and growth — designed, built, and run as one system, shipped in weeks.',
    cta: 'See the Build',
    href: '/build',
    featured: true,
  },
  {
    icon: Handshake,
    name: 'Equity Partnership',
    forWho: 'You want a partner with skin in the game.',
    pitch: 'Reduced cash, shared equity, a long horizon. Reserved for a few businesses I believe I can compound.',
    cta: 'How partnerships work',
    href: '/partnerships',
    featured: false,
  },
]

function Ladder() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#F5EFE0' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Ways to Work Together</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#0C0C0C',
              letterSpacing: '-0.02em',
            }}
          >
            Start with a diagnosis. Scale only when the numbers justify it.
          </h2>
          <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{ color: '#3A3632' }}>
            Most engagements start small — a clear-eyed look at where revenue is leaking. We go
            deeper only when the data says it&apos;s worth it.
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
                      backgroundColor: t.featured ? 'rgba(232,144,58,0.2)' : 'rgba(232,144,58,0.15)',
                      border: '1px solid rgba(232,144,58,0.3)',
                    }}
                  >
                    <Icon size={18} color="#E8903A" />
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ ...DISPLAY }}>
                    {t.name}
                  </h3>

                  <p
                    className="text-xs uppercase mb-4 pb-4"
                    style={{
                      ...MONO,
                      letterSpacing: '0.04em',
                      color: t.featured ? '#E8903A' : '#C97020',
                      borderBottom: t.featured
                        ? '1px solid rgba(245,239,224,0.12)'
                        : '1px solid rgba(12,12,12,0.08)',
                    }}
                  >
                    {t.forWho}
                  </p>

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

// ── Startup consulting — parallel track ──────────────────────────
function StartupConsulting() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div
            className="p-9 md:p-12 rounded"
            style={{
              backgroundColor: '#141414',
              border: '1px solid rgba(232,144,58,0.25)',
            }}
          >
            <div
              className="w-11 h-11 rounded flex items-center justify-center mb-6"
              style={{
                backgroundColor: 'rgba(232,144,58,0.15)',
                border: '1px solid rgba(232,144,58,0.3)',
              }}
            >
              <Rocket size={20} color="#E8903A" />
            </div>
            <p
              className="text-xs uppercase mb-4"
              style={{ ...MONO, letterSpacing: '0.22em', color: '#E8903A' }}
            >
              Earlier Stage?
            </p>
            <h2
              className="font-bold mb-5 leading-tight"
              style={{
                ...DISPLAY,
                fontSize: 'clamp(28px, 4vw, 44px)',
                color: '#F5EFE0',
                letterSpacing: '-0.02em',
              }}
            >
              Building something new? I work with founders too.
            </h2>
            <p className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: '#A09A8E' }}>
              From raw idea to first real traction — positioning and strategy, building the MVP,
              acting as your fractional CTO or growth lead, and getting you ready to launch or
              raise. It starts with a free intro call, then we scope to what you actually need.
            </p>
            <Link
              href="/startups"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded transition-colors"
              style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
            >
              See startup consulting <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Founder ──────────────────────────────────────────────────────
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
            <p className="text-xs mt-3" style={{ ...MONO, color: '#7A756D' }}>
              Hamza Zulquernain · Founder, Zapp Studios
            </p>
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
              The person who diagnoses it is the person who builds it.
            </h2>

            <div className="flex flex-col gap-5 text-[16px] leading-relaxed" style={{ color: '#3A3632' }}>
              <p>
                I&apos;m Hamza. I was the founding engineer at{' '}
                <span style={{ color: '#0C0C0C', fontWeight: 600 }}>DietAI</span>, where I built
                the product, the funnel, and the growth systems that carried it to a{' '}
                <span style={{ color: '#0C0C0C', fontWeight: 600 }}>7-figure exit</span>. I&apos;ve
                seen a revenue system from the inside — built, measured, and sold.
              </p>
              <p>
                Everything since has run the same way: one operator who owns both the diagnosis
                and the build, so the strategy and the execution never drift apart. No briefs lost
                in translation. No roadmap that ignores the funnel.
              </p>
              <p style={{ ...SERIF, fontStyle: 'italic', color: '#0C0C0C', fontSize: '18px' }}>
                &ldquo;Most teams split the people who decide what to do from the people who do it.
                That seam is where revenue leaks. I close it.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Fit check ────────────────────────────────────────────────────
const YES_ITEMS = [
  'You have real revenue and want to compound it — not just patch one leak',
  'Your growth keeps stalling on something only an engineer can fix',
  'You want one accountable operator, not an agency and a dev shop',
  'You can give a decision-maker and real access to your data',
]
const NO_ITEMS = [
  "You're pre-revenue or still finding product–market fit — startup consulting may fit better",
  'You want a strategy deck and recommendations, not someone who ships the fix',
  'You want daily meetings and status calls — I stay in the build',
  "You're choosing on lowest price alone",
]

function FitCheck() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#EEE7D3' }}>
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
            Straight about fit — both directions.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          <Reveal delay={100}>
            <div
              className="p-7 h-full rounded"
              style={{
                backgroundColor: '#F5EFE0',
                border: '1px solid rgba(12,12,12,0.08)',
                borderLeftWidth: '3px',
                borderLeftColor: '#4a8d5f',
              }}
            >
              <p
                className="text-xs uppercase mb-5"
                style={{ ...MONO, letterSpacing: '0.2em', color: '#4a8d5f' }}
              >
                A fit if —
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
                Not yet if —
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
            Let&apos;s find your real constraint.
          </h2>
          <p
            className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ color: '#A09A8E' }}
          >
            A call, not a pitch. Fifteen minutes on where revenue is leaking and whether I&apos;m
            the right person to fix it. If I&apos;m not, I&apos;ll tell you — and point you to who
            is.
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

// ── Page ─────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main style={{ backgroundColor: '#F5EFE0', color: '#0C0C0C' }}>
      <Nav mode="cream" />
      <Hero />
      <ProofStrip />
      <Gap />
      <Approach />
      <RoyalPawz />
      <Ladder />
      <StartupConsulting />
      <Founder />
      <FitCheck />
      <FinalCTA />
      <Footer mode="cream" />
      <StickyCTA href="/book" label="Book a call" />
    </main>
  )
}
