'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import StickyCTA from '../_components/StickyCTA'
import DarkPageBodyClass from '../_components/DarkPageBodyClass'
import RevenueChart from '../_components/RevenueChart'
import PortraitSlot from '../_components/PortraitSlot'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

const PANEL: React.CSSProperties = {
  backgroundColor: '#141414',
  border: '1px solid rgba(245,239,224,0.12)',
  borderRadius: 8,
}

const BOOK_HREF = '/book?type=founder'

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

// ── Kicker ───────────────────────────────────────────────────────
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase mb-4" style={{ ...MONO, letterSpacing: '0.22em', color: '#E8903A' }}>
      {children}
    </p>
  )
}

// ── Count-up metric ──────────────────────────────────────────────
function useCountUp(target: number, decimals = 0, duration = 1100) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [text, setText] = useState(() => target.toFixed(decimals))
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    let raf = 0
    const ob = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        ob.disconnect()
        let t0: number | null = null
        const tick = (ts: number) => {
          if (t0 === null) t0 = ts
          const p = Math.min((ts - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setText((target * eased).toFixed(decimals))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    ob.observe(el)
    return () => {
      ob.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, decimals, duration])
  return { ref, text }
}

function Metric({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  staticValue,
  sub,
  borders = '',
}: {
  value?: number
  decimals?: number
  prefix?: string
  suffix?: string
  staticValue?: string
  sub: string
  borders?: string
}) {
  const { ref, text } = useCountUp(value ?? 0, decimals)
  return (
    <div className={`py-7 px-4 text-center border-[rgba(245,239,224,0.08)] ${borders}`}>
      <p
        ref={ref}
        className="font-bold leading-none mb-2"
        style={{
          ...MONO,
          fontSize: 'clamp(26px, 3.4vw, 38px)',
          color: '#F5EFE0',
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {staticValue ?? `${prefix}${text}${suffix}`}
      </p>
      <p className="text-[10.5px] uppercase" style={{ ...MONO, letterSpacing: '0.14em', color: '#6B6560' }}>
        {sub}
      </p>
    </div>
  )
}

// ── Console card (hero proof object) ─────────────────────────────
// Every log line is backed by real engagement data:
//  - DietAI: founding engineer → 7-figure exit (site-wide canonical claim)
//  - booking flow: A/B test 2, 7.1% → 30.8%, n=54 (published case study)
//  - revenue engine: index 1.0× → 12.0× by June '26 (Part II production data)
//  - the two `run` lines are the anonymized in-flight engagements (Platr /
//    Disposable Depot) — names stay private until those clients approve.
const LOG_LINES: { left: string; right: string; state: 'done' | 'run' }[] = [
  { left: 'DietAI — founding engineer · MVP → exit', right: '7-figure exit', state: 'done' },
  { left: 'Royal Pawz booking flow v2 shipped', right: 'conv 7.1% → 30.8%', state: 'done' },
  { left: 'Royal Pawz revenue engine rebuilt', right: '12× by month 6', state: 'done' },
  { left: 'meal-prep brand — site + ads live', right: 'sw in build', state: 'run' },
  { left: 'e-comm retailer — site shipped', right: 'sw in build', state: 'run' },
]

function ConsoleCard() {
  return (
    <div className="overflow-hidden" style={{ ...PANEL, boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ backgroundColor: '#191919', borderBottom: '1px solid rgba(245,239,224,0.08)' }}
      >
        <span className="text-[10px] uppercase" style={{ ...MONO, letterSpacing: '0.16em', color: '#6B6560' }}>
          zapp · shipped work
        </span>
        <span className="text-[10px] uppercase" style={{ ...MONO, letterSpacing: '0.16em', color: '#E8903A' }}>
          ● live
        </span>
      </div>
      <div className="px-4 py-4 text-xs" style={{ ...MONO, lineHeight: 1.9, color: '#A09A8E' }}>
        <p style={{ color: '#F5EFE0' }}>$ zapp log --track founders</p>
        {LOG_LINES.map(l => (
          <p key={l.left} className="flex justify-between gap-x-4 flex-wrap">
            <span>
              <span style={{ color: l.state === 'done' ? '#E8903A' : '#6B6560' }}>
                {l.state === 'done' ? '✓' : '▸'}
              </span>{' '}
              {l.left}
            </span>
            <span style={{ color: l.state === 'done' ? '#F5EFE0' : '#6B6560' }}>{l.right}</span>
          </p>
        ))}
        <p>
          ▸ build slots: <span style={{ color: '#F5EFE0' }}>closed</span> · founder calls:{' '}
          <span style={{ color: '#E8903A' }}>open</span>{' '}
          <span
            aria-hidden="true"
            className="animate-cursor-blink inline-block align-[-2px]"
            style={{ width: 7, height: 13, backgroundColor: '#E8903A' }}
          />
        </p>
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
            className="animate-fade-in-up inline-flex items-center gap-2.5 text-[10.5px] uppercase mb-7 px-3.5 py-2 rounded-full"
            style={{
              ...MONO,
              letterSpacing: '0.16em',
              color: '#A09A8E',
              border: '1px solid rgba(245,239,224,0.14)',
            }}
          >
            <span
              className="inline-block w-[7px] h-[7px] rounded-full"
              style={{ backgroundColor: '#E8903A', boxShadow: '0 0 8px rgba(232,144,58,0.8)' }}
            />
            Build slots — closed · Founder channel — open
          </p>

          <h1
            className="animate-fade-in-up delay-100 font-bold leading-[1.06] mb-6"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 4.8vw, 54px)',
              color: '#F5EFE0',
              letterSpacing: '-0.025em',
              opacity: 0,
            }}
          >
            I&apos;m not taking new projects.
            <br />
            <span style={{ color: '#E8903A' }}>I&apos;ll still take your call.</span>
          </h1>

          <p
            className="animate-fade-in-up delay-200 text-base md:text-lg max-w-xl mb-8 leading-relaxed"
            style={{ color: '#A09A8E', opacity: 0 }}
          >
            I&apos;m heads-down with my current partners, so new founder builds are paused. But I
            like founders and I like ideas — bring what you&apos;re building and I&apos;ll be
            your sounding board. Free, and there&apos;s no pitch waiting at the end. I have
            nothing to sell you right now.
          </p>

          <div className="animate-fade-in-up delay-300" style={{ opacity: 0 }}>
            <Link
              href={BOOK_HREF}
              className="inline-flex items-center gap-2 px-7 py-4 text-sm font-bold rounded transition-colors"
              style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
            >
              Book a free founder call →
            </Link>
            <p className="text-xs mt-4" style={{ ...MONO, color: '#6B6560' }}>
              30 minutes · you talk, I push back · you keep the notes
            </p>
          </div>
        </div>

        <div className="animate-fade-in-up delay-300" style={{ opacity: 0 }}>
          <ConsoleCard />
        </div>
      </div>
    </section>
  )
}

// ── Metrics band ─────────────────────────────────────────────────
function MetricsBand() {
  return (
    <section
      style={{
        backgroundColor: '#101010',
        borderTop: '1px solid rgba(245,239,224,0.08)',
        borderBottom: '1px solid rgba(245,239,224,0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Metric staticValue="7-fig" sub="exit · DietAI" borders="border-b lg:border-b-0 sm:border-r" />
        <Metric value={12} suffix="×" sub="monthly revenue · month 6" borders="border-b lg:border-b-0 lg:border-r" />
        <Metric value={331} prefix="+" suffix="%" sub="conversion lift · A/B tested" borders="border-b sm:border-b-0 sm:border-r" />
        <Metric value={52} suffix="%" sub="repeat revenue share · June" />
      </div>
    </section>
  )
}

// ── Who the line is for ──────────────────────────────────────────
const FOR_PANELS = [
  {
    tag: '01 · IDEA',
    title: 'Napkin-stage',
    desc: "You want someone who's shipped to poke the premise before you spend a year on it. Pressure-testing an idea is the fastest favor anyone can do you.",
  },
  {
    tag: '02 · EARLY PRODUCT',
    title: 'Users, maybe revenue',
    desc: 'You have three possible next moves and the runway for one. You want a read on which one compounds — from someone with no stake in the answer.',
  },
  {
    tag: '03 · STUCK',
    title: 'A decision you keep circling',
    desc: "Technical co-founder or agency? Raise or bootstrap? Rebuild or patch? Bring the fork in the road and we'll walk both branches.",
  },
]

function WhoThisIsFor() {
  return (
    <section className="py-20 md:py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Kicker>The open channel</Kicker>
          <h2
            className="font-bold mb-4 leading-tight max-w-2xl"
            style={{ ...DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5EFE0', letterSpacing: '-0.02em' }}
          >
            Bring it at any stage.
          </h2>
          <p className="text-base max-w-2xl mb-10 leading-relaxed" style={{ color: '#A09A8E' }}>
            The earlier the conversation, the cheaper the course-correction. If you have a deck
            or a prototype, bring it. If you have neither, bring the problem.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {FOR_PANELS.map((c, i) => (
            <Reveal key={c.tag} delay={80 + i * 80}>
              <div className="p-6 h-full" style={PANEL}>
                <p className="text-[10px] mb-4" style={{ ...MONO, letterSpacing: '0.18em', color: '#E8903A' }}>
                  {c.tag}
                </p>
                <h3 className="text-lg font-semibold mb-2.5" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#A09A8E' }}>
                  {c.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── What the call covers ─────────────────────────────────────────
const TOPICS = [
  {
    tag: 'TOPIC 01 · POSITIONING',
    title: 'Who pays, and why you',
    desc: 'The who-pays sanity check most decks skip. If that answer is fuzzy, everything downstream is fuzzy too.',
  },
  {
    tag: 'TOPIC 02 · MVP SCOPE',
    title: 'What to cut',
    desc: 'The version-one knife: what ships in weeks, what waits, and what never needed building at all.',
  },
  {
    tag: 'TOPIC 03 · FUNNEL & GTM',
    title: 'The first hundred users',
    desc: 'Where they actually come from, and the two or three numbers worth measuring from day one.',
  },
  {
    tag: 'TOPIC 04 · THE RAISE',
    title: 'Your story, stress-tested',
    desc: 'What investors will poke at, and how to make the numbers carry the narrative instead of adjectives.',
  },
]

function SoundingBoard() {
  return (
    <section className="py-20 md:py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Kicker>The call</Kicker>
          <h2
            className="font-bold mb-4 leading-tight max-w-2xl"
            style={{ ...DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5EFE0', letterSpacing: '-0.02em' }}
          >
            Bring the idea. I&apos;ll push on it.
          </h2>
          <p className="text-base max-w-2xl mb-10 leading-relaxed" style={{ color: '#A09A8E' }}>
            Thirty minutes, working through whichever of these matters most right now — the way
            I&apos;d work through them on my own products.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {TOPICS.map((t, i) => (
            <Reveal key={t.tag} delay={80 + i * 70}>
              <div className="p-6 h-full" style={{ ...PANEL, backgroundColor: '#0F0F0F' }}>
                <p className="text-[10px] mb-4" style={{ ...MONO, letterSpacing: '0.18em', color: '#E8903A' }}>
                  {t.tag}
                </p>
                <h3 className="text-base font-semibold mb-2.5" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                  {t.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: '#A09A8E' }}>
                  {t.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="text-[13px] max-w-2xl leading-relaxed" style={{ ...MONO, color: '#6B6560' }}>
            To be clear: this isn&apos;t an intake for paid work — the build calendar is closed.
            If something&apos;s ever a genuine fit down the road, we&apos;ll both know it without
            a funnel nudging us.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── The system loop ──────────────────────────────────────────────
const LOOP_NODES = [
  {
    tag: '01 · DIAGNOSE',
    title: 'Find the constraint',
    desc: 'What actually blocks the next stage — premise, product, or distribution.',
  },
  {
    tag: '02 · BUILD',
    title: 'Ship the fix',
    desc: 'The smallest working software that tests the answer for real.',
  },
  {
    tag: '03 · GROW',
    title: 'Run the tests',
    desc: 'Channels, A/Bs, retention — measured weekly, kept or killed.',
  },
  {
    tag: '04 · COMPOUND',
    title: 'Automate the wins',
    desc: 'Wire in the leverage so the gains keep running unattended.',
  },
]

function SystemLoop() {
  return (
    <section className="py-20 md:py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Kicker>The system</Kicker>
          <h2
            className="font-bold mb-4 leading-tight max-w-2xl"
            style={{ ...DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5EFE0', letterSpacing: '-0.02em' }}
          >
            Four stages. One loop. No handoffs.
          </h2>
          <p className="text-base max-w-2xl mb-10 leading-relaxed" style={{ color: '#A09A8E' }}>
            This is the loop I ran at DietAI and Royal Pawz — and the one I&apos;ll run your
            idea through on the call.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-col lg:flex-row items-stretch gap-2.5">
            {LOOP_NODES.map((n, i) => (
              <div key={n.tag} className="contents">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="self-center rotate-90 lg:rotate-0 shrink-0"
                    style={{ color: '#6B6560', fontSize: 16 }}
                  >
                    →
                  </span>
                )}
                <div className="flex-1 p-5" style={PANEL}>
                  <p className="text-[10px] mb-2.5" style={{ ...MONO, letterSpacing: '0.18em', color: '#E8903A' }}>
                    {n.tag}
                  </p>
                  <p className="text-sm font-semibold mb-1.5" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                    {n.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: '#A09A8E' }}>
                    {n.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="mt-5 pt-3 text-center text-[10.5px] uppercase"
            style={{
              ...MONO,
              letterSpacing: '0.16em',
              color: '#E8903A',
              borderTop: '1px dashed rgba(232,144,58,0.4)',
            }}
          >
            ↻ findings feed the next diagnosis — the loop compounds
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Case dashboard ───────────────────────────────────────────────
const DASH_ROWS = [
  { label: 'Equity partner · Houston', value: '2025→' },
  { label: 'Booking conversion', value: '30.8%' },
  { label: 'Conversion lift (A/B, n=54)', value: '+331%' },
  { label: 'Repeat revenue share (Jun)', value: '52%' },
]

function CaseDashboard() {
  return (
    <section className="py-20 md:py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Kicker>Receipts</Kicker>
          <h2
            className="font-bold mb-4 leading-tight max-w-2xl"
            style={{ ...DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5EFE0', letterSpacing: '-0.02em' }}
          >
            Why my read is worth thirty minutes.
          </h2>
          <p className="text-base max-w-2xl mb-10 leading-relaxed" style={{ color: '#A09A8E' }}>
            Because I&apos;ve run that loop end to end on a real company — and published the data.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div
            className="grid lg:grid-cols-[1.15fr_0.85fr] gap-7 p-6 md:p-7"
            style={{ ...PANEL, backgroundColor: '#0F0F0F' }}
          >
            <div>
              <div className="flex justify-between items-baseline mb-3 flex-wrap gap-2">
                <p className="text-xs font-bold" style={{ ...MONO, letterSpacing: '0.04em', color: '#F5EFE0' }}>
                  ROYAL PAWZ USA — REVENUE INDEX
                </p>
                <p className="text-[10px] uppercase" style={{ ...MONO, letterSpacing: '0.14em', color: '#6B6560' }}>
                  months 0–6 · ongoing
                </p>
              </div>
              <RevenueChart variant="dark" />
              <p className="text-[10px] mt-2" style={{ ...MONO, color: '#6B6560' }}>
                indexed to Dec &rsquo;25 = 1.0× · still running · dollar figures undisclosed by design
              </p>
            </div>
            <div className="lg:border-l lg:pl-7 border-[rgba(245,239,224,0.1)] flex flex-col justify-center gap-3.5">
              {DASH_ROWS.map(r => (
                <div
                  key={r.label}
                  className="flex justify-between items-baseline pb-2.5"
                  style={{ borderBottom: '1px solid rgba(245,239,224,0.07)' }}
                >
                  <span className="text-[13px]" style={{ ...MONO, color: '#A09A8E' }}>
                    {r.label}
                  </span>
                  <span
                    className="text-base font-bold"
                    style={{ ...MONO, color: '#F5EFE0', fontVariantNumeric: 'tabular-nums' }}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
              <Link
                href="/rev-eng/royalpawzusa"
                className="text-[13px] font-semibold transition-colors"
                style={{ color: '#E8903A' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0A855')}
                onMouseLeave={e => (e.currentTarget.style.color = '#E8903A')}
              >
                Open the full teardown →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── FAQ ──────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Are you taking on new startup projects?',
    a: "No — my build calendar is closed while I'm heads-down with current partners. That's exactly why this page exists: the calls are conversation, not intake. If that changes, this page will say so.",
  },
  {
    q: 'What do I actually get from a free call?',
    a: "A sharper version of your own thinking. I'll push on positioning, scope, and go-to-market the way I would on my own products, and I'll be straight about what I'd cut. You keep the notes.",
  },
  {
    q: "Why free? What's the catch?",
    a: "There isn't one. I like founders, I like ideas, and good conversations compound — some of the best things I've worked on started as someone bouncing an idea off me. Call it networking that doesn't feel like networking.",
  },
  {
    q: 'Is my idea too early?',
    a: 'No. Napkin-stage is welcome — the earlier the conversation, the cheaper the course-correction. If you have a deck or a prototype, bring it; if you have neither, bring the problem.',
  },
  {
    q: 'Will you build my MVP or join as CTO?',
    a: "Not right now, and I won't string you along about it. If you need hands on a keyboard today, I'll say so on the call and point you to people I'd actually trust with it.",
  },
  {
    q: 'Will you keep what I share confidential?',
    a: "Yes. I'm not collecting ideas — I have more of my own than I have hours. For a first call, discretion is the default; if a deeper conversation ever needs an NDA, just ask.",
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="py-20 md:py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <Kicker>Straight answers</Kicker>
          <h2
            className="font-bold mb-10 leading-tight"
            style={{ ...DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5EFE0', letterSpacing: '-0.02em' }}
          >
            Before you book.
          </h2>
        </Reveal>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={60 + i * 40}>
                <div style={PANEL}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                  >
                    <span className="text-[15px] font-semibold" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                      {f.q}
                    </span>
                    <ChevronDown
                      size={16}
                      color="#6B6560"
                      className="shrink-0 transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  {isOpen && (
                    <p
                      id={`faq-panel-${i}`}
                      className="px-5 pb-5 text-sm leading-relaxed"
                      style={{ color: '#A09A8E' }}
                    >
                      {f.a}
                    </p>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      className="py-24 md:py-28 px-6 text-center"
      style={{
        borderTop: '1px solid rgba(245,239,224,0.08)',
        background:
          'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(232,144,58,0.08), transparent), #0C0C0C',
      }}
    >
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2
            className="font-bold mb-5 leading-tight"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              color: '#F5EFE0',
              letterSpacing: '-0.025em',
            }}
          >
            Tell me what you&apos;re building.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: '#A09A8E' }}>
            The line is open even while the calendar is closed. Thirty minutes, your idea,
            straight answers — and if I&apos;m not useful, you&apos;ll know within ten.
          </p>
          <Link
            href={BOOK_HREF}
            className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a free founder call →
          </Link>

          <div
            className="inline-flex items-center gap-3 mt-10 py-2 pl-2 pr-5 rounded-full"
            style={{ border: '1px solid rgba(245,239,224,0.12)' }}
          >
            <PortraitSlot size={36} mode="dark" />
            <span className="text-left text-[11px] leading-snug" style={{ color: '#6B6560' }}>
              <span className="block text-xs font-semibold" style={{ color: '#F5EFE0' }}>
                You&apos;ll talk to Hamza — the operator, not a rep.
              </span>
              Founding engineer, DietAI (7-figure exit) · Equity partner, Royal Pawz
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────
export default function StartupsPage() {
  return (
    <main style={{ backgroundColor: '#0C0C0C', color: '#F5EFE0' }}>
      <DarkPageBodyClass />
      <Nav mode="dark" />
      <Hero />
      <MetricsBand />
      <WhoThisIsFor />
      <SoundingBoard />
      <SystemLoop />
      <CaseDashboard />
      <FAQ />
      <FinalCTA />
      <Footer mode="dark" />
      <StickyCTA href={BOOK_HREF} label="Book a free founder call" />
    </main>
  )
}
