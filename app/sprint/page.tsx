'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Bot,
  Eye,
} from 'lucide-react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import Placeholder from '../_components/Placeholder'
import Guarantee from '../_components/Guarantee'
import StickyCTA from '../_components/StickyCTA'
import DarkPageBodyClass from '../_components/DarkPageBodyClass'

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
    <section className="pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <p
          className="animate-fade-in-up text-xs uppercase mb-8"
          style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}
        >
          Tier 1 · Landing Page Sprint
        </p>

        {/* The 3 numerals */}
        <div
          className="animate-fade-in-up delay-100 mb-10 pb-10 flex flex-wrap gap-x-12 gap-y-6"
          style={{ borderBottom: '1px solid rgba(245,239,224,0.1)', opacity: 0 }}
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
                  fontSize: 'clamp(40px, 5.5vw, 68px)',
                  color: '#F5EFE0',
                  letterSpacing: '-0.02em',
                }}
              >
                {n.v}
              </p>
              <p className="text-xs mt-2" style={{ ...MONO, color: '#6B6560' }}>
                {n.l}
              </p>
            </div>
          ))}
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up delay-200 font-bold leading-[1.02] mb-8 max-w-4xl"
          style={{
            ...DISPLAY,
            fontSize: 'clamp(44px, 7vw, 88px)',
            color: '#F5EFE0',
            letterSpacing: '-0.025em',
            opacity: 0,
          }}
        >
          Your landing page,
          <br />
          rebuilt in a week.
          <br />
          <span style={{ color: '#E8903A' }}>Or pay nothing.</span>
        </h1>

        {/* Mechanism — serif italic */}
        <p
          className="animate-fade-in-up delay-300 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          style={{ ...SERIF, color: '#A09A8E', fontStyle: 'italic', opacity: 0 }}
        >
          I use Claude to write the code at 10× speed. I personally QA every line. That&apos;s
          why an agency charges $15,000 and takes 8 weeks — and I charge $1,500 and ship in 7 days.
        </p>

        {/* Single primary CTA (proposal said single — no split intent on sprint page) */}
        <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-3 items-start" style={{ opacity: 0 }}>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded transition-colors"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a 15-min intake <ArrowRight size={16} />
          </Link>
        </div>

        <p
          className="animate-fade-in-up delay-500 text-xs mt-5"
          style={{ ...MONO, color: '#6B6560', opacity: 0 }}
        >
          Scope returned within 24 hours · 3 Sprint slots open this month
        </p>
      </div>
    </section>
  )
}

// ── Why $1,500 not $15,000 — Value Equation ──────────────────────
const VALUE_ROWS = [
  {
    lever: 'Dream Outcome',
    agency: 'A new landing page',
    zapp: 'A high-converting landing page, measured against your funnel',
  },
  {
    lever: 'Perceived Likelihood',
    agency: '6-month retainer pitch, no guarantee',
    zapp: 'Money back if I miss the deadline. Royal Pawz 334% lift as proof.',
  },
  {
    lever: 'Time to Value',
    agency: '8 weeks (discovery → design → dev → QA → revisions)',
    zapp: '7 days, start to live URL',
  },
  {
    lever: 'Effort from You',
    agency: 'Weekly syncs, stakeholder approvals, PM email chains',
    zapp: 'Intake call + brand assets + one round of feedback',
  },
  {
    lever: 'What you pay',
    agency: '$15,000 (industry range $10K–$25K)',
    zapp: '$1,500 flat',
  },
]

function ValueEquation() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Why $1,500 and not $15,000</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            This isn&apos;t a discount.
            <br />
            <span style={{ color: '#A09A8E' }}>It&apos;s different economics.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#A09A8E' }}>
            Agencies charge what they do because they need a designer, a copywriter, a developer,
            a PM, and an account manager. I&apos;m one person with AI leverage. Same output.
            Fraction of the overhead.
          </p>
        </Reveal>

        {/* Comparison table */}
        <Reveal delay={100}>
          <div
            className="rounded overflow-hidden"
            style={{ border: '1px solid rgba(245,239,224,0.08)' }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-[1fr_1.2fr_1.2fr] md:grid-cols-[1.2fr_1.5fr_1.5fr]"
              style={{ backgroundColor: '#1C1C1C' }}
            >
              <div className="p-4 md:p-5">
                <p
                  className="text-[10px] uppercase"
                  style={{ ...MONO, letterSpacing: '0.2em', color: '#6B6560' }}
                >
                  Lever
                </p>
              </div>
              <div className="p-4 md:p-5" style={{ borderLeft: '1px solid rgba(245,239,224,0.08)' }}>
                <p
                  className="text-[10px] uppercase"
                  style={{ ...MONO, letterSpacing: '0.18em', color: '#6B6560' }}
                >
                  Agency
                </p>
              </div>
              <div
                className="p-4 md:p-5"
                style={{
                  borderLeft: '1px solid rgba(232,144,58,0.25)',
                  backgroundColor: 'rgba(232,144,58,0.06)',
                }}
              >
                <p
                  className="text-[10px] uppercase"
                  style={{ ...MONO, letterSpacing: '0.18em', color: '#E8903A' }}
                >
                  Zapp Sprint
                </p>
              </div>
            </div>

            {VALUE_ROWS.map((row, i) => (
              <div
                key={row.lever}
                className="grid grid-cols-[1fr_1.2fr_1.2fr] md:grid-cols-[1.2fr_1.5fr_1.5fr]"
                style={{
                  borderTop: '1px solid rgba(245,239,224,0.06)',
                  backgroundColor: i === VALUE_ROWS.length - 1 ? '#1C1C1C' : 'transparent',
                }}
              >
                <div className="p-4 md:p-5">
                  <p
                    className="text-sm font-semibold"
                    style={{ ...DISPLAY, color: '#F5EFE0' }}
                  >
                    {row.lever}
                  </p>
                </div>
                <div
                  className="p-4 md:p-5 text-sm leading-relaxed"
                  style={{
                    borderLeft: '1px solid rgba(245,239,224,0.06)',
                    color: '#A09A8E',
                  }}
                >
                  {row.agency}
                </div>
                <div
                  className="p-4 md:p-5 text-sm leading-relaxed"
                  style={{
                    borderLeft: '1px solid rgba(232,144,58,0.15)',
                    backgroundColor: 'rgba(232,144,58,0.04)',
                    color: '#F5EFE0',
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

// ── 7-day timeline with daily screenshots ────────────────────────
const TIMELINE = [
  {
    day: 'Day 0',
    title: 'Kickoff call',
    desc: "30 minutes. We pick the one page to rebuild — usually the highest-intent lander. I get analytics access, brand assets, a short intake.",
  },
  {
    day: 'Days 1–2',
    title: 'Diagnosis + strategy',
    desc: "I pull your data, identify what's killing conversion (copy, hierarchy, CTA, hero, trust signals, speed), draft new positioning. You approve direction before a line of code.",
  },
  {
    day: 'Days 3–5',
    title: 'Build',
    desc: 'Full rebuild. Copy, design, code, responsive, accessible, fast. I use Claude to generate and iterate. I QA every line. You see live previews daily.',
  },
  {
    day: 'Day 6',
    title: 'QA + revision',
    desc: 'One round of revisions, cross-browser + mobile testing, performance pass (target: <2s load), conversion tracking wired up.',
  },
  {
    day: 'Day 7',
    title: 'Ship',
    desc: 'Page goes live on your domain. You get the full codebase, deploy config, Loom walkthrough. 14-day follow-up with conversion data.',
  },
]

function Timeline() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The 7-Day Sprint</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Kickoff Monday.
            <br />
            <span style={{ color: '#A09A8E' }}>Live the following Monday.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{ color: '#A09A8E' }}>
            Tight, repeatable process. No scope creep, no discovery phase, no surprise invoices.
          </p>
        </Reveal>

        <div className="flex flex-col gap-3">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.day} delay={100 + i * 60}>
              <div
                className="p-7 md:p-8 rounded grid grid-cols-1 md:grid-cols-[140px_1fr_200px] gap-6 items-start"
                style={{
                  backgroundColor: '#1C1C1C',
                  borderLeft: '3px solid #E8903A',
                  border: '1px solid rgba(245,239,224,0.04)',
                  borderLeftWidth: '3px',
                  borderLeftColor: '#E8903A',
                }}
              >
                <span
                  className="text-sm font-bold uppercase"
                  style={{ ...MONO, color: '#E8903A', letterSpacing: '0.12em' }}
                >
                  {t.day}
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                    {t.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#A09A8E' }}>
                    {t.desc}
                  </p>
                </div>
                <Placeholder
                  kind={`DAY ${i + 1}`}
                  label="Screenshot"
                  aspect="4/3"
                  mode="dark"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Claude + Hamza workflow ──────────────────────────────────────
function Workflow() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Workflow</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Claude writes. I review.
            <br />
            <span style={{ color: '#A09A8E' }}>This is what you&apos;re paying for.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: '#A09A8E' }}>
            The cheap move is to ship whatever Claude generates. That&apos;s how you get AI-slop
            sites with broken edge cases and weird copy. The paid move — what you&apos;re hiring me
            for — is knowing what to ask for, what to reject, and how to QA the output.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <Reveal delay={100}>
            <div
              className="p-6 rounded h-full"
              style={{
                backgroundColor: '#1C1C1C',
                border: '1px solid rgba(245,239,224,0.06)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(232,144,58,0.15)',
                    border: '1px solid rgba(232,144,58,0.3)',
                  }}
                >
                  <Bot size={16} color="#E8903A" />
                </div>
                <p className="text-sm font-semibold" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                  Claude&apos;s output
                </p>
              </div>
              <Placeholder
                kind="IDE SCREENSHOT"
                label="Claude generating a hero section"
                aspect="4/3"
                mode="dark"
              />
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div
              className="p-6 rounded h-full"
              style={{
                backgroundColor: '#1C1C1C',
                border: '1px solid rgba(245,239,224,0.06)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(232,144,58,0.15)',
                    border: '1px solid rgba(232,144,58,0.3)',
                  }}
                >
                  <Eye size={16} color="#E8903A" />
                </div>
                <p className="text-sm font-semibold" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                  My QA pass
                </p>
              </div>
              <Placeholder
                kind="ANNOTATED REVIEW"
                label="Hamza catching edge cases, rewriting copy, rejecting patterns"
                aspect="4/3"
                mode="dark"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <div
            className="p-6 rounded"
            style={{
              backgroundColor: 'rgba(232,144,58,0.06)',
              border: '1px solid rgba(232,144,58,0.25)',
            }}
          >
            <p className="text-base leading-relaxed" style={{ ...SERIF, color: '#F5EFE0', fontStyle: 'italic' }}>
              &ldquo;I&apos;ve shipped 1,500+ hours alongside Claude. The trick isn&apos;t the AI —
              it&apos;s knowing what to ask for, what to reject, and how to QA the output.
              You&apos;re paying for that judgment, not the keystrokes.&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── What you get ─────────────────────────────────────────────────
const DELIVERABLES = [
  'Full page rebuild — hero, sections, CTA, footer — designed and written from scratch',
  'Copy grounded in your data, not agency templates',
  'Responsive, accessible, <2s load time',
  'Conversion tracking wired (GA4, Meta Pixel, whatever you use)',
  'A/B test variant stub, ready for measurement week 1',
  'Full codebase (Next.js, plain HTML, Webflow — whatever fits your stack)',
  'Loom walkthrough of what I changed and why',
  '14-day follow-up with conversion data + one round of tweaks',
]

function Deliverables() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>What $1,500 Buys You</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Production-ready. No half-done handoff.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="p-8 rounded"
            style={{
              backgroundColor: '#1C1C1C',
              border: '1px solid rgba(245,239,224,0.06)',
            }}
          >
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {DELIVERABLES.map(item => (
                <li key={item} className="flex items-start gap-3">
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

// ── FAQ ──────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'What if my page isn\'t on Next.js / React?',
    a: "I'll rebuild in whatever stack makes sense — Next.js, plain HTML, Webflow, Framer, WordPress/Elementor. Tell me what you're using on the intake call.",
  },
  {
    q: 'What if you miss the 7-day deadline?',
    a: "You pay nothing. The flat fee is contingent on me shipping on time. I cap active Sprints so the timeline is real — if my calendar is full, I'll tell you the next open slot.",
  },
  {
    q: "Can I use this for a brand-new page that doesn't exist yet?",
    a: "Yes — if you know who it's for and what you're selling. If you need help figuring that out first, book a call and we'll scope a Tier 2 engagement instead.",
  },
  {
    q: 'How is this different from a freelancer on Upwork?',
    a: "A cheap freelancer builds what you tell them to. I diagnose what's broken in your funnel and build the fix. Code is table stakes — strategy moves the number.",
  },
  {
    q: 'Do I own the code?',
    a: 'Yes. Full source, deployed to your infrastructure, yours to modify. No lock-in, no hosting fee to me, no licensing.',
  },
  {
    q: 'Will Claude-generated code be any good?',
    a: "I've been shipping production code with Claude for over a year across real client engagements. The trick isn't the AI — it's knowing what to ask, what to reject, and how to QA. You're paying for that judgment.",
  },
  {
    q: 'Can I pay in two installments?',
    a: '$750 at kickoff, $750 at launch. Standard terms for both of us.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
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
            Questions I get on every intake call.
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
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(245,239,224,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span className="text-base font-semibold pr-4" style={{ ...DISPLAY, color: '#F5EFE0' }}>
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

function GuaranteeSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <Guarantee mode="dark" />
        </Reveal>
      </div>
    </section>
  )
}

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
            Reserve your slot.
          </h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: '#A09A8E' }}>
            15-min intake. Scope back within 24 hours. If it&apos;s not a fit, I&apos;ll say so and
            point you to what to do instead.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a 15-min intake <ArrowRight size={17} />
          </Link>
          <p className="mt-4 text-xs" style={{ ...MONO, color: '#6B6560' }}>
            $1,500 flat · 7 days · pay nothing if I miss the deadline
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default function SprintPage() {
  return (
    <main style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}>
      <DarkPageBodyClass />
      <Nav mode="dark" />
      <Hero />
      <ValueEquation />
      <Timeline />
      <Workflow />
      <Deliverables />
      <GuaranteeSection />
      <FAQ />
      <FinalCTA />
      <Footer mode="dark" />
      <StickyCTA href="/book" label="Book a 15-min intake" />
    </main>
  )
}
