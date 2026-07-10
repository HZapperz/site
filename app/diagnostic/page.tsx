'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ChevronDown,
  SearchCode,
  Gauge,
  BarChart3,
  Tag,
  Calculator,
} from 'lucide-react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import StickyCTA from '../_components/StickyCTA'
import DarkPageBodyClass from '../_components/DarkPageBodyClass'

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span style={{ backgroundColor: '#E8903A' }} className="inline-block w-4 h-px" />
      <p
        className="text-xs uppercase"
        style={{ ...MONO, letterSpacing: '0.22em', color: '#6B6560' }}
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
          Revenue Diagnostic
        </p>

        <h1
          className="animate-fade-in-up delay-100 font-bold leading-[1.03] mb-8 max-w-4xl"
          style={{
            ...DISPLAY,
            fontSize: 'clamp(44px, 7vw, 86px)',
            color: '#F5EFE0',
            letterSpacing: '-0.03em',
            opacity: 0,
          }}
        >
          Find out exactly where your revenue is leaking.
        </h1>

        <p
          className="animate-fade-in-up delay-200 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          style={{ ...SERIF, color: '#A09A8E', fontStyle: 'italic', opacity: 0 }}
        >
          Before anyone rebuilds anything, you need to know what&apos;s actually broken. The
          Revenue Diagnostic is a paid, end-to-end audit of your funnel and your software &mdash;
          you leave with a prioritized plan you can act on, whether or not we work together after.
        </p>

        <div
          className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-3 items-start"
          style={{ opacity: 0 }}
        >
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded transition-colors"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a call <ArrowRight size={16} />
          </Link>
        </div>

        <p
          className="animate-fade-in-up delay-400 text-xs mt-5"
          style={{ ...MONO, color: '#6B6560', opacity: 0 }}
        >
          A 15-minute call to see if the diagnostic is the right first step.
        </p>
      </div>
    </section>
  )
}

// ── Why Start Here ───────────────────────────────────────────────
function WhyStartHere() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Why Start Here</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Most SMBs fix the wrong thing first.
          </h2>
          <p className="text-lg max-w-2xl mb-6 leading-relaxed" style={{ color: '#A09A8E' }}>
            When growth stalls, the instinct is to spend &mdash; more ad budget, another tool, a
            redesign. But the constraint is usually somewhere specific: a slow page, a broken
            booking flow, an offer that doesn&apos;t land, retention nobody measures.
          </p>
          <p className="text-lg max-w-2xl mb-6 leading-relaxed" style={{ color: '#A09A8E' }}>
            The diagnostic replaces the guess with data, so the first dollar you spend fixing
            things goes to the thing that&apos;s actually costing you.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="mt-10 p-7 rounded"
            style={{
              backgroundColor: 'rgba(232,144,58,0.06)',
              border: '1px solid rgba(232,144,58,0.2)',
            }}
          >
            <p
              className="text-xs uppercase mb-4"
              style={{ ...MONO, letterSpacing: '0.2em', color: '#E8903A' }}
            >
              Royal Pawz USA &mdash; Houston
            </p>
            <p className="text-base leading-relaxed" style={{ ...SERIF, color: '#F5EFE0', fontStyle: 'italic' }}>
              &ldquo;The diagnostic on that engagement found that 68.3% of signups never
              completed a booking &mdash; the auth wall, not ad spend, was the real bottleneck.
              Removing it before touching the budget is what made the 12&times; revenue growth
              possible.&rdquo;
            </p>
            <p className="text-xs mt-4" style={{ ...MONO, color: '#6B6560' }}>
              12&times; monthly revenue in 6 months &middot; +331% conversion lift (7.1% &rarr; 30.8%, A/B tested) &middot; Hamza joined as equity partner
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── What I Look At ───────────────────────────────────────────────
const AUDIT_CARDS = [
  {
    icon: BarChart3,
    title: 'The funnel',
    desc: 'Traffic through to repeat. Where visitors come from, where they drop, what they do on the page, how many book or buy, how many come back.',
  },
  {
    icon: Gauge,
    title: 'The software',
    desc: "What's slow, broken, or held together with tape. Page speed, the booking or checkout flow, the things that should work but quietly don't.",
  },
  {
    icon: SearchCode,
    title: 'The data',
    desc: "Whether anything is even measured. Tracking, events, attribution — if the analytics aren't reliable, every decision downstream is a guess.",
  },
  {
    icon: Tag,
    title: 'The offer & positioning',
    desc: 'Whether the thing being sold actually lands with the visitor. Copy, hierarchy, trust signals, and whether the value is clear above the fold.',
  },
  {
    icon: Calculator,
    title: 'The unit economics',
    desc: 'CAC, LTV, ROAS. Whether the math works at scale — and where the ceiling is if it stays the way it is.',
  },
]

function TheAudit() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Audit</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Funnel and software, end to end.
          </h2>
          <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{ color: '#A09A8E' }}>
            Five things I look at on every diagnostic. Together they tell you exactly where the
            leak is and what fixing it would actually take.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AUDIT_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <Reveal key={card.title} delay={100 + i * 70}>
                <div
                  className="p-7 h-full rounded"
                  style={{
                    backgroundColor: '#1C1C1C',
                    border: '1px solid rgba(245,239,224,0.06)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: 'rgba(232,144,58,0.12)',
                      border: '1px solid rgba(232,144,58,0.3)',
                    }}
                  >
                    <Icon size={18} color="#E8903A" />
                  </div>
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ ...DISPLAY, color: '#F5EFE0' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#A09A8E' }}>
                    {card.desc}
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

// ── How It Works ────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    title: 'Kickoff',
    desc: 'A short intake to understand the business and the goal. You give me access to analytics, ad accounts, and the product. Read access is fine.',
  },
  {
    num: '02',
    title: 'The audit',
    desc: 'I go through the funnel and the software end to end and pull the real data. No assumptions, no gut instinct — everything traced back to what the numbers actually say.',
  },
  {
    num: '03',
    title: 'The readout',
    desc: 'A written, prioritized plan delivered to you, plus a call to walk through it. What the constraint is, what to fix first, and what each fix roughly takes.',
  },
]

function HowItWorks() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>How It Works</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Three steps. No guesswork.
          </h2>
        </Reveal>

        <div className="flex flex-col gap-4 mt-12">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={100 + i * 80}>
              <div
                className="p-7 md:p-8 rounded grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 items-start"
                style={{
                  backgroundColor: '#1C1C1C',
                  border: '1px solid rgba(245,239,224,0.06)',
                  borderLeftWidth: '3px',
                  borderLeftColor: '#E8903A',
                }}
              >
                <span
                  className="text-4xl font-bold leading-none"
                  style={{ ...MONO, color: 'rgba(232,144,58,0.3)', letterSpacing: '-0.02em' }}
                >
                  {step.num}
                </span>
                <div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ ...DISPLAY, color: '#F5EFE0' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#A09A8E' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── What You Leave With ──────────────────────────────────────────
const DELIVERABLES = [
  'The single real constraint, named — not a list of things that could maybe help',
  'A prioritized list of what to fix and in what order',
  'A rough effort estimate for each fix, so you can weigh what to do yourself vs. what to hire for',
  'An honest verdict on whether a full Revenue System Build is even worth it',
  'A recorded walkthrough you can share with your team',
]

function WhatYouLeaveWith() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Deliverable</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            A plan you can act on &mdash; with me or without me.
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#A09A8E' }}>
            The deliverable stands on its own. It is not a sales document. Whether or not we work
            together on anything else, you walk away knowing exactly what to do and why.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="p-8 rounded"
            style={{
              backgroundColor: '#1C1C1C',
              border: '1px solid rgba(245,239,224,0.06)',
            }}
          >
            <ul className="flex flex-col gap-5">
              {DELIVERABLES.map(item => (
                <li key={item} className="flex items-start gap-4">
                  <div
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'rgba(232,144,58,0.12)',
                      border: '1px solid rgba(232,144,58,0.3)',
                    }}
                  >
                    <Check size={10} color="#E8903A" />
                  </div>
                  <span className="text-[15px] leading-relaxed" style={{ color: '#A09A8E' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Diagnostic → Build ───────────────────────────────────────────
function WhatComesNext() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>What Comes Next</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            The front door, not a funnel.
          </h2>
          <div className="flex flex-col gap-5 text-lg max-w-2xl leading-relaxed" style={{ color: '#A09A8E' }}>
            <p>
              The diagnostic is how every engagement starts. If a Revenue System Build makes
              sense &mdash; if the numbers say there&apos;s a real system to rebuild and the effort
              is worth it &mdash; the diagnostic work folds straight into it. No starting over, no
              repeated discovery.
            </p>
            <p>
              If a Build isn&apos;t the right move, I&apos;ll tell you that too, and what to do
              instead. There&apos;s no pressure either way. The plan you receive is yours to act
              on however you see fit.
            </p>
            <p style={{ color: '#6B6560' }}>
              Pricing is scoped on the call and depends on the size and complexity of the funnel.
              The number lands before you commit &mdash; no surprises.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10">
            <Link
              href="/build"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: '#E8903A' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0A855')}
              onMouseLeave={e => (e.currentTarget.style.color = '#E8903A')}
            >
              See the Revenue System Build <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── FAQ ──────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Is this just a sales call in disguise?',
    a: "No. It's paid, it's deep, and the written plan stands on its own whether or not you hire me for anything after. The diagnostic is the work — not a pitch for the work.",
  },
  {
    q: "What if you find I don't need a Build?",
    a: "Then I'll tell you that, and what to do instead. If the constraint is something you can fix yourself, or something that doesn't need a full system rebuild, I'll say so. Straight answers in both directions.",
  },
  {
    q: 'What access do you need?',
    a: "Analytics, ad accounts, and a look at the product or booking flow. Read access is fine across the board — I'm not touching anything, just pulling the real data.",
  },
  {
    q: 'How long does it take?',
    a: "Days, not weeks. The exact timeline is scoped on the call depending on the size of the funnel and the complexity of the software.",
  },
  {
    q: 'Do you sign an NDA?',
    a: 'Yes, happily. Send yours or I can send mine — either way.',
  },
  {
    q: 'What does it cost?',
    a: "Scoped on the call. It depends on the size and complexity of the funnel — a single-product DTC site is different from a multi-location service business with a custom booking system. The number lands before you commit. No surprises.",
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionLabel>Straight Answers</SectionLabel>
          <h2
            className="font-bold mb-16 leading-tight"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Questions I get every time.
          </h2>
        </Reveal>

        <div className="flex flex-col gap-2">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                className="rounded overflow-hidden"
                style={{
                  backgroundColor: '#1C1C1C',
                  border: '1px solid rgba(245,239,224,0.06)',
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                  onMouseEnter={e =>
                    (e.currentTarget.style.backgroundColor = 'rgba(245,239,224,0.02)')
                  }
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span
                    className="text-base font-semibold pr-4"
                    style={{ ...DISPLAY, color: '#F5EFE0' }}
                  >
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
                    <p className="text-base leading-relaxed" style={{ color: '#A09A8E' }}>
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

// ── Final CTA ────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: '#141414' }}>
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
            Start with the diagnosis.
          </h2>
          <p
            className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ color: '#A09A8E' }}
          >
            A 15-minute call to see if the diagnostic is the right first step. If it&apos;s not,
            I&apos;ll say so.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a call <ArrowRight size={17} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────
export default function DiagnosticPage() {
  return (
    <main style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}>
      <DarkPageBodyClass />
      <Nav mode="dark" />
      <Hero />
      <WhyStartHere />
      <TheAudit />
      <HowItWorks />
      <WhatYouLeaveWith />
      <WhatComesNext />
      <FAQ />
      <FinalCTA />
      <Footer mode="dark" />
      <StickyCTA href="/book" label="Book a call" />
    </main>
  )
}
