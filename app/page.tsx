'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Nav from './_components/Nav'
import Footer from './_components/Footer'
import StickyCTA from './_components/StickyCTA'
import RevenueChart from './_components/RevenueChart'
import PortraitSlot from './_components/PortraitSlot'

const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

const HAIR = '1px solid rgba(12,12,12,0.14)'
const HAIR_SOFT = '1px solid rgba(12,12,12,0.09)'

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

// ── Section number device ─────────────────────────────────────────
function SectionNo({ no, title }: { no: string; title: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase" style={{ ...MONO, letterSpacing: '0.2em', color: '#7A756D' }}>
        Section {no}
      </p>
      <p className="text-sm font-semibold mt-1" style={{ color: '#0C0C0C', letterSpacing: '0.02em' }}>
        {title}
      </p>
    </div>
  )
}

// ── Ledger card (hero proof object) ──────────────────────────────
function LedgerCard() {
  const rows = [
    { label: 'Grooms per month — baseline → May peak', value: '16 → 136' },
    { label: "Repeat customers' share of revenue, by June", value: '52%' },
    { label: 'Booking conversion — A/B tested (from 7.1%)', value: '30.8%' },
  ]
  return (
    <div
      className="rounded p-6 md:p-7"
      style={{
        backgroundColor: '#FDFAF2',
        border: HAIR,
        boxShadow: '0 1px 0 rgba(12,12,12,0.06), 0 14px 34px rgba(12,12,12,0.07)',
      }}
    >
      <div className="flex justify-between items-baseline pb-3 mb-4" style={{ borderBottom: HAIR }}>
        <p className="text-xs font-bold" style={{ ...MONO, letterSpacing: '0.06em', color: '#0C0C0C' }}>
          ROYAL PAWZ USA
        </p>
        <p className="text-[10px] uppercase" style={{ ...MONO, letterSpacing: '0.14em', color: '#7A756D' }}>
          Mobile grooming · Houston
        </p>
      </div>

      <RevenueChart variant="cream" />

      <div className="mt-2">
        {rows.map(r => (
          <div
            key={r.label}
            className="flex justify-between items-baseline gap-4 py-2"
            style={{ borderTop: HAIR_SOFT }}
          >
            <span className="text-[13px]" style={{ color: '#3A3632' }}>
              {r.label}
            </span>
            <span
              className="text-[15px] font-bold"
              style={{ ...MONO, color: '#0C0C0C', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-between items-baseline gap-2 pt-3" style={{ borderTop: HAIR_SOFT }}>
        <p className="text-[10px] uppercase" style={{ ...MONO, letterSpacing: '0.1em', color: '#7A756D' }}>
          Dec &rsquo;25 – Jun &rsquo;26 · indexed to Dec = 1.0× · still running
        </p>
        <Link
          href="/rev-eng/royalpawzusa"
          className="text-xs font-semibold transition-colors"
          style={{ color: '#0C0C0C', textDecoration: 'underline', textDecorationColor: 'rgba(12,12,12,0.3)', textUnderlineOffset: '3px' }}
        >
          Full case study →
        </Link>
      </div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="pt-32 md:pt-36 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
        <div>
          <p
            className="animate-fade-in-up text-xs uppercase mb-7"
            style={{ ...MONO, letterSpacing: '0.22em', color: '#7A756D' }}
          >
            Zapp Studios · Growth + Software · Houston
          </p>

          <h1
            className="animate-fade-in-up delay-100 leading-[1.05] mb-6"
            style={{
              ...SERIF,
              fontWeight: 500,
              fontSize: 'clamp(38px, 4.8vw, 58px)',
              color: '#0C0C0C',
              letterSpacing: '-0.015em',
              opacity: 0,
            }}
          >
            One operator.
            <br />
            One revenue system.
          </h1>

          <p
            className="animate-fade-in-up delay-200 text-base md:text-lg max-w-md mb-8 leading-relaxed"
            style={{ color: '#3A3632', opacity: 0 }}
          >
            I diagnose the funnel, build the software, and run the growth for established
            SMBs — as one continuous system, so the number that finally moves is revenue.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-x-5 gap-y-3" style={{ opacity: 0 }}>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold rounded transition-colors"
              style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
            >
              Book a 15-minute call →
            </Link>
            <Link
              href="/rev-eng/royalpawzusa"
              className="text-sm transition-colors"
              style={{
                color: '#3A3632',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(12,12,12,0.25)',
                textUnderlineOffset: '3px',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0C0C0C')}
              onMouseLeave={e => (e.currentTarget.style.color = '#3A3632')}
            >
              Read the Royal Pawz case
            </Link>
          </div>

          <p className="animate-fade-in-up delay-400 text-xs mt-5" style={{ ...MONO, color: '#7A756D', opacity: 0 }}>
            A working call, not a pitch. You keep the notes.
          </p>
        </div>

        <div className="animate-fade-in-up delay-300" style={{ opacity: 0 }}>
          <LedgerCard />
        </div>
      </div>
    </section>
  )
}

// ── Section 01 — why growth stalls ───────────────────────────────
function ArgumentWhy() {
  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto py-14 md:py-16" style={{ borderTop: HAIR }}>
        <Reveal>
          <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10">
            <SectionNo no="01" title="Why growth stalls" />
            <div className="md:columns-2 gap-9 text-[15px] leading-relaxed" style={{ color: '#3A3632' }}>
              <p className="drop-cap mb-4">
                Your marketing problem is usually a software problem. A growth agency will
                sharpen your ads and your copy — then it hits a wall. The real fix needs a
                faster page, a new booking flow, a change to the product itself. That&apos;s
                outside their scope, so <span style={{ color: '#0C0C0C', fontWeight: 600 }}>the leak stays</span>.
              </p>
              <p>
                A dev shop has the opposite blindness: it ships whatever&apos;s on the ticket,
                with no view of CAC, conversion, or retention — and the roadmap quietly drifts
                away from the numbers. Either way, you become the integration layer, briefing
                both sides and waiting while they translate each other.{' '}
                <span style={{ color: '#0C0C0C', fontWeight: 600 }}>Months pass. The number doesn&apos;t move.</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Section 02 — the loop ────────────────────────────────────────
const LOOP_STEPS = [
  {
    no: 'I.',
    title: 'Diagnose',
    desc: "Find the real constraint. The data decides — not what's easy to bill for.",
  },
  {
    no: 'II.',
    title: 'Build',
    desc: 'Ship the software that fixes it — pages, booking flows, CRM, automations. In weeks.',
  },
  {
    no: 'III.',
    title: 'Grow',
    desc: 'Run it and compound it. A/B tests, retention flows, new channels — measured weekly.',
  },
  {
    no: 'IV.',
    title: 'Innovate',
    desc: 'Wire in AI and automation so the wins keep running without new headcount.',
  },
]

function ArgumentHow() {
  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto py-14 md:py-16" style={{ borderTop: HAIR }}>
        <Reveal>
          <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10">
            <SectionNo no="02" title="One operator, one loop" />
            <div>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-8" style={{ color: '#3A3632' }}>
                I run the diagnosis, the build, and the growth as one continuous loop. When the
                data says the bottleneck is the checkout,{' '}
                <span style={{ color: '#0C0C0C', fontWeight: 600 }}>
                  I rebuild the checkout
                </span>{' '}
                — not a ticket, not a handoff, not next quarter.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2">
                {LOOP_STEPS.map((s, i) => (
                  <div
                    key={s.no}
                    className={`py-4 sm:py-0 ${i > 0 ? 'border-t sm:border-t-0 border-[rgba(12,12,12,0.09)]' : ''}`}
                  >
                    <p className="text-[11px] mb-2" style={{ ...MONO, color: '#7A756D', letterSpacing: '0.16em' }}>
                      {s.no}
                    </p>
                    <p className="text-base font-semibold mb-1.5" style={{ ...SERIF, color: '#0C0C0C' }}>
                      {s.title}
                    </p>
                    <p className="text-[13px] leading-relaxed" style={{ color: '#3A3632' }}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Pull quote — real client words ───────────────────────────────
function PullQuote() {
  return (
    <section className="py-16 md:py-20 px-6 text-center" style={{ backgroundColor: '#EFE8D6' }}>
      <div className="max-w-3xl mx-auto">
        <Reveal>
          {/* Verbatim quote from the published case study (app/rev-eng/royalpawzusa). */}
          <blockquote
            className="leading-snug mb-7"
            style={{
              ...SERIF,
              fontWeight: 500,
              fontSize: 'clamp(20px, 2.8vw, 27px)',
              color: '#0C0C0C',
              letterSpacing: '-0.01em',
            }}
          >
            &ldquo;Working with Zapp Studios completely transformed our business. The booking
            system they built and the way they optimized our funnel - we went from barely
            getting customers online to having a system that just works.&rdquo;
          </blockquote>
          <div className="inline-block pt-4" style={{ borderTop: HAIR }}>
            <p className="text-sm font-semibold" style={{ color: '#0C0C0C' }}>
              Owner, Royal Pawz USA — Houston · Mobile dog grooming
            </p>
            <p className="text-xs mt-1" style={{ ...MONO, color: '#7A756D' }}>
              12× monthly revenue by month six · equity partnership
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Section 03 — the current book ────────────────────────────────
// Client names for the two in-flight engagements are withheld on purpose
// (their portals are private); swap in real names only with their sign-off.
const BOOK = [
  {
    client: 'Royal Pawz USA',
    kind: 'Mobile grooming · Houston',
    status: 'Equity partnership — growth + software, run as one system',
    since: '2025 →',
    href: '/rev-eng/royalpawzusa',
    linkLabel: 'Case study',
  },
  {
    client: 'A meal-prep brand',
    kind: 'Name private while in build',
    status: 'Website redesign shipped · ads live · custom software in build',
    since: '2026 →',
  },
  {
    client: 'An e-commerce supplies retailer',
    kind: 'Name private while in build',
    status: 'Website shipped · custom software in build',
    since: '2026 →',
  },
]

function CurrentBook() {
  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto py-14 md:py-16" style={{ borderTop: HAIR }}>
        <Reveal>
          <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10">
            <SectionNo no="03" title="The current book" />
            <div>
              <p className="text-[15px] leading-relaxed max-w-2xl mb-8" style={{ color: '#3A3632' }}>
                Everything on my desk right now — three revenue systems, run in parallel, one
                operator. Capacity is the constraint, by design.
              </p>
              <div style={{ borderTop: HAIR }}>
                {BOOK.map(b => (
                  <div
                    key={b.client}
                    className="grid md:grid-cols-[240px_1fr_auto] gap-1 md:gap-6 py-4 items-baseline"
                    style={{ borderBottom: HAIR_SOFT }}
                  >
                    <div>
                      <p className="text-base" style={{ ...SERIF, fontWeight: 600, color: '#0C0C0C' }}>
                        {b.client}
                      </p>
                      <p className="text-[10px] uppercase mt-0.5" style={{ ...MONO, letterSpacing: '0.08em', color: '#7A756D' }}>
                        {b.kind}
                      </p>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: '#3A3632' }}>
                      {b.status}
                      {b.href && (
                        <>
                          {' · '}
                          <Link
                            href={b.href}
                            style={{
                              color: '#0C0C0C',
                              fontWeight: 600,
                              textDecoration: 'underline',
                              textDecorationColor: 'rgba(12,12,12,0.3)',
                              textUnderlineOffset: '3px',
                            }}
                          >
                            {b.linkLabel} →
                          </Link>
                        </>
                      )}
                    </p>
                    <p className="text-xs" style={{ ...MONO, color: '#7A756D', fontVariantNumeric: 'tabular-nums' }}>
                      {b.since}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] mt-4" style={{ ...MONO, color: '#7A756D' }}>
                Names stay private while engagements are underway — shared once clients choose to be public.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Section 04 — ways to work together ───────────────────────────
const TIERS = [
  {
    no: 'I.',
    name: 'Revenue Diagnostic',
    forWho: 'Growth is leaking — not sure where',
    pitch:
      'A paid, deep audit of your funnel and product. You leave with a prioritized plan you can act on — with me or without me.',
    cta: 'How the diagnostic works',
    href: '/diagnostic',
  },
  {
    no: 'II.',
    name: 'Revenue System Build',
    forWho: 'The system needs rebuilding, not patching',
    pitch:
      'The core engagement. Funnel, software, and growth — designed, built, and run as one system, shipped in weeks.',
    cta: 'See the Build',
    href: '/build',
  },
  {
    no: 'III.',
    name: 'Equity Partnership',
    forWho: 'You want a partner with skin in the game',
    pitch:
      'Reduced cash, shared equity, a long horizon. Reserved for a few businesses I believe I can compound.',
    cta: 'How partnerships work',
    href: '/partnerships',
  },
]

function Ladder() {
  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto py-14 md:py-16" style={{ borderTop: HAIR }}>
        <Reveal>
          <div className="mb-10">
            <SectionNo no="04" title="Ways to work together" />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3" style={{ borderTop: HAIR }}>
          {TIERS.map((t, i) => (
            <Reveal
              key={t.href}
              delay={80 + i * 80}
              className={`${i > 0 ? 'border-t md:border-t-0 md:pl-7' : ''} ${
                i < TIERS.length - 1 ? 'md:border-r' : ''
              } border-[rgba(12,12,12,0.09)]`}
            >
              <div className="h-full py-6 md:py-7 md:pr-7">
                <p className="text-[11px] mb-3" style={{ ...MONO, color: '#7A756D', letterSpacing: '0.16em' }}>
                  {t.no}
                </p>
                <h3 className="text-xl mb-2" style={{ ...SERIF, fontWeight: 600, color: '#0C0C0C' }}>
                  {t.name}
                </h3>
                <p
                  className="text-[11px] uppercase mb-4"
                  style={{ ...MONO, letterSpacing: '0.05em', color: '#7A756D' }}
                >
                  {t.forWho}
                </p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#3A3632' }}>
                  {t.pitch}
                </p>
                <Link
                  href={t.href}
                  className="text-[13px] font-semibold transition-colors"
                  style={{
                    color: '#0C0C0C',
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(12,12,12,0.3)',
                    textUnderlineOffset: '3px',
                  }}
                >
                  {t.cta} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Founders band ────────────────────────────────────────────────
function StartupsBand() {
  return (
    <section className="px-6">
      <div
        className="max-w-6xl mx-auto py-10 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8"
        style={{ borderTop: HAIR }}
      >
        <Reveal className="flex-1">
          <p className="text-[15px] leading-relaxed max-w-2xl" style={{ color: '#3A3632' }}>
            <span style={{ ...SERIF, fontWeight: 600, color: '#0C0C0C' }}>Building something new?</span>{' '}
            My founder build calendar is closed right now — but the door for a conversation
            isn&apos;t. I keep a free line open for founders who want a sounding board.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <Link
            href="/startups"
            className="text-sm font-semibold whitespace-nowrap transition-colors"
            style={{
              color: '#0C0C0C',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(12,12,12,0.3)',
              textUnderlineOffset: '3px',
            }}
          >
            Founder calls, free →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ── The operator ─────────────────────────────────────────────────
function Operator() {
  return (
    <section className="px-6">
      <div className="max-w-6xl mx-auto py-14 md:py-16" style={{ borderTop: HAIR }}>
        <Reveal>
          <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10">
            <SectionNo no="05" title="The operator" />
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <PortraitSlot size={88} mode="cream" />
              <div>
                <h3 className="text-2xl mb-1" style={{ ...SERIF, fontWeight: 600, color: '#0C0C0C' }}>
                  Hamza Zulquernain
                </h3>
                <p className="text-xs mb-5" style={{ ...MONO, color: '#7A756D' }}>
                  Founder, Zapp Studios
                </p>
                <div className="flex flex-col gap-1.5 mb-5">
                  <p className="text-[13px]" style={{ color: '#3A3632' }}>
                    <span style={{ color: '#0C0C0C', fontWeight: 600 }}>Founding engineer, DietAI</span> — built
                    the product, the funnel, and the growth systems through a 7-figure exit.
                  </p>
                  <p className="text-[13px]" style={{ color: '#3A3632' }}>
                    <span style={{ color: '#0C0C0C', fontWeight: 600 }}>Equity partner, Royal Pawz USA</span> — 12×
                    monthly revenue in six months, documented end to end and still compounding.
                  </p>
                  <p className="text-[13px]" style={{ color: '#3A3632' }}>
                    <span style={{ color: '#0C0C0C', fontWeight: 600 }}>Two systems in build</span> — a meal-prep
                    brand and an e-commerce retailer, both website-first, software underway.
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed max-w-xl" style={{ ...SERIF, color: '#0C0C0C' }}>
                  &ldquo;Most teams split the people who decide what to do from the people who
                  do it. That seam is where revenue leaks. I close it — the person who
                  diagnoses your system is the person who builds it.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Final CTA ────────────────────────────────────────────────────
const CALL_STEPS = [
  { n: '01', title: '15 minutes, on your numbers', desc: 'where the funnel leaks' },
  { n: '02', title: 'Written scope in days', desc: 'no deck, no retainer pitch' },
  { n: '03', title: 'You decide', desc: 'the notes are yours either way' },
]

function FinalCTA() {
  return (
    <section className="py-24 md:py-28 px-6" style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2
            className="mb-6 leading-tight"
            style={{
              ...SERIF,
              fontWeight: 500,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.015em',
            }}
          >
            Let&rsquo;s find your real constraint.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: '#A09A8E' }}>
            Fifteen minutes on where revenue is leaking and whether I&rsquo;m the right person
            to fix it. If I&rsquo;m not, I&rsquo;ll tell you — and point you to who is.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a call →
          </Link>

          <div className="flex flex-col sm:flex-row justify-center items-start sm:items-stretch w-fit mx-auto gap-4 sm:gap-0 mt-12">
            {CALL_STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`flex items-center gap-3 px-6 text-left ${
                  i > 0 ? 'sm:border-l border-[rgba(245,239,224,0.14)]' : ''
                }`}
              >
                <span className="text-[11px]" style={{ ...MONO, color: '#E8903A' }}>
                  {s.n}
                </span>
                <span className="text-xs leading-snug" style={{ color: '#A09A8E' }}>
                  <span className="block font-semibold text-[12.5px]" style={{ color: '#F5EFE0' }}>
                    {s.title}
                  </span>
                  {s.desc}
                </span>
              </div>
            ))}
          </div>
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
      <ArgumentWhy />
      <ArgumentHow />
      <PullQuote />
      <CurrentBook />
      <Ladder />
      <StartupsBand />
      <Operator />
      <FinalCTA />
      <Footer mode="cream" />
      <StickyCTA href="/book" label="Book a call" />
    </main>
  )
}
