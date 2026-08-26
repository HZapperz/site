'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ChevronDown, ShieldAlert, Database, KeyRound, CreditCard, Layers, Copy } from 'lucide-react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import StickyCTA from '../_components/StickyCTA'
import DarkPageBodyClass from '../_components/DarkPageBodyClass'
import { SYMPTOMS, FAILURES, DELIVERABLES, TIERS, FAQS, BUILDERS, AUDIT_DAYS } from './content'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }

const ACCENT = '#E8903A'
const CREAM = '#F5EFE0'
const MUTED = '#A09A8E'
const DIM = '#6B6560'

const FAILURE_ICONS = [Database, ShieldAlert, KeyRound, CreditCard, Layers, Copy]

// ── Scroll-in animation ───────────────────────────────────────────
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

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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
      <span style={{ backgroundColor: ACCENT }} className="inline-block w-4 h-px" />
      <p className="text-xs uppercase" style={{ ...MONO, letterSpacing: '0.22em', color: DIM }}>
        {children}
      </p>
    </div>
  )
}

function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-bold mb-6 leading-tight max-w-3xl ${className}`}
      style={{ ...DISPLAY, fontSize: 'clamp(34px, 5vw, 56px)', color: CREAM, letterSpacing: '-0.02em' }}
    >
      {children}
    </h2>
  )
}

// ── Hero ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="pt-36 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="animate-fade-in-up text-xs uppercase mb-8" style={{ ...MONO, letterSpacing: '0.25em', color: ACCENT }}>
          Vibe-Code Rescue
        </p>

        <h1
          className="animate-fade-in-up delay-100 font-bold leading-[1.03] mb-8 max-w-4xl"
          style={{ ...DISPLAY, fontSize: 'clamp(44px, 7vw, 86px)', color: CREAM, letterSpacing: '-0.03em', opacity: 0 }}
        >
          Your app worked. Until it didn&apos;t.
        </h1>

        <p
          className="animate-fade-in-up delay-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          style={{ ...SERIF, color: MUTED, fontStyle: 'italic', opacity: 0 }}
        >
          You built something real with an AI builder, and it got you further than anyone expected.
          Then it stopped getting closer. I audit AI-generated codebases and tell you exactly
          what&apos;s wrong, what it costs to fix, and whether it really needs the rewrite someone
          told you it needs.
        </p>

        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-3 items-start" style={{ opacity: 0 }}>
          <Link
            href="/book?offer=rescue"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded transition-colors"
            style={{ backgroundColor: ACCENT, color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = ACCENT)}
          >
            Book a call <ArrowRight size={16} />
          </Link>
          <a
            href="#audit"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded transition-colors"
            style={{ border: `1px solid rgba(245,239,224,0.2)`, color: CREAM }}
          >
            See what you get
          </a>
        </div>

        <p className="animate-fade-in-up delay-500 text-xs mt-6" style={{ ...MONO, color: '#6B6560', opacity: 0 }}>
          Not sure this is the one?{' '}
          <Link href="/fit" style={{ color: '#A09A8E', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Answer six questions and I&rsquo;ll tell you &rarr;
          </Link>
        </p>

        <p className="animate-fade-in-up delay-400 text-xs mt-6" style={{ ...MONO, color: DIM, opacity: 0 }}>
          {BUILDERS.join(' · ')}
        </p>
      </div>
    </section>
  )
}

// ── Symptoms ──────────────────────────────────────────────────────
function Symptoms() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Does this sound familiar</SectionLabel>
          <H2>You&apos;re not imagining it, and you&apos;re not alone.</H2>
          <p className="text-lg max-w-2xl mb-10 leading-relaxed" style={{ color: MUTED }}>
            A quarter of Y Combinator&apos;s Winter 2025 batch had codebases that were roughly 95%
            AI-generated. The wall you hit is the most-discussed problem in every builder community
            there is. It has a shape, and the shape is predictable.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 mt-10">
          {SYMPTOMS.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="flex items-start gap-3 py-3" style={{ borderTop: '1px solid rgba(245,239,224,0.08)' }}>
                <span className="mt-1.5 shrink-0" style={{ color: ACCENT }}>
                  <Check size={15} />
                </span>
                <p className="text-base leading-relaxed" style={{ color: CREAM }}>{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── What actually breaks ──────────────────────────────────────────
function Failures() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>What actually breaks</SectionLabel>
          <H2>The same six things, almost every time.</H2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: MUTED }}>
            AI builders share the same underlying models and the same default configurations, so
            they fail in the same places. Here is what I find, in roughly the order I find it.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {FAILURES.map((f, i) => {
            const Icon = FAILURE_ICONS[i % FAILURE_ICONS.length]
            return (
              <Reveal key={f.title} delay={i * 70}>
                <div
                  className="p-7 rounded h-full"
                  style={{ backgroundColor: '#141414', border: '1px solid rgba(245,239,224,0.08)' }}
                >
                  <span style={{ color: ACCENT }}><Icon size={20} /></span>
                  <h3 className="font-semibold mt-4 mb-3 text-lg" style={{ ...DISPLAY, color: CREAM }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{f.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── The audit ─────────────────────────────────────────────────────
function Audit() {
  return (
    <section id="audit" className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The rescue audit</SectionLabel>
          <H2>{AUDIT_DAYS} days. A written answer. Yours either way.</H2>
          <p className="text-lg max-w-2xl mb-10 leading-relaxed" style={{ color: MUTED }}>
            You give me read access to the repository and ten minutes explaining what the app is
            meant to do. You get back a report written for someone who doesn&apos;t code.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            {DELIVERABLES.map((d, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex items-start gap-3 py-3.5" style={{ borderBottom: '1px solid rgba(245,239,224,0.08)' }}>
                  <span className="mt-1 shrink-0" style={{ color: ACCENT }}><Check size={15} /></span>
                  <p className="text-base leading-relaxed" style={{ color: CREAM }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div
              className="p-7 rounded"
              style={{ backgroundColor: 'rgba(232,144,58,0.06)', border: '1px solid rgba(232,144,58,0.2)' }}
            >
              <p className="text-xs uppercase mb-4" style={{ ...MONO, letterSpacing: '0.2em', color: ACCENT }}>
                The part that matters
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ ...SERIF, color: CREAM, fontStyle: 'italic' }}>
                You keep the report whether or not you hire me to do the fixes.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                Plenty of people take it to their own developer, and that is a completely fine
                outcome. It saves them a week of discovery and it means you are choosing your next
                step with real information instead of a sales pitch. The most common thing founders
                tell me they were afraid of is spending money and having nothing to show for it.
                This is the version where that can&apos;t happen.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────
function Pricing() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>What it costs</SectionLabel>
          <H2>Fixed fees, published.</H2>
          <p className="text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: MUTED }}>
            Rescue work sits between $1,000 and $10,000 across the market, and full rebuilds run
            $25,000 to $50,000. Anyone quoting you a rebuild before reading the code is guessing.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <div
                className="p-7 rounded h-full flex flex-col"
                style={{
                  backgroundColor: t.featured ? 'rgba(232,144,58,0.06)' : '#141414',
                  border: t.featured ? '1px solid rgba(232,144,58,0.3)' : '1px solid rgba(245,239,224,0.08)',
                }}
              >
                <p className="text-xs uppercase mb-3" style={{ ...MONO, letterSpacing: '0.2em', color: ACCENT }}>
                  {t.name}
                </p>
                <p className="font-bold mb-1" style={{ ...DISPLAY, fontSize: '34px', color: CREAM, letterSpacing: '-0.02em' }}>
                  {t.price}
                </p>
                <p className="text-xs mb-5" style={{ ...MONO, color: DIM }}>{t.timing}</p>
                <p className="text-sm mb-6 leading-relaxed" style={{ ...SERIF, color: MUTED, fontStyle: 'italic' }}>
                  {t.forWho}
                </p>
                <div className="mt-auto">
                  {t.includes.map((inc, j) => (
                    <div key={j} className="flex items-start gap-2.5 py-2">
                      <span className="mt-1 shrink-0" style={{ color: ACCENT }}><Check size={13} /></span>
                      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{inc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="text-sm mt-8 max-w-2xl leading-relaxed" style={{ color: DIM }}>
            The audit fee is credited against the fix or build if you decide to go ahead. Scope is
            confirmed on a call before anything is invoiced.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Ownership ─────────────────────────────────────────────────────
function Ownership() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Ownership</SectionLabel>
          <H2>You own all of it. In writing.</H2>
          <div className="max-w-2xl">
            <p className="text-lg mb-6 leading-relaxed" style={{ color: MUTED }}>
              Code goes into a GitHub repository in your name. IP is assigned to you in the
              contract. If we stop working together you keep the repository, the report, the
              infrastructure and the accounts, and you can hand all of it to any other developer
              without asking me.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
              This is worth asking every agency you talk to, not just me. Not owning your own code
              is one of the more common ways first-time founders get stuck, and it is much easier
              to settle before the work starts than after.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Who ───────────────────────────────────────────────────────────
function Who() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Who you&apos;d be working with</SectionLabel>
          <H2>One operator, and you talk to him.</H2>
          <div className="max-w-2xl">
            <p className="text-lg mb-6 leading-relaxed" style={{ color: MUTED }}>
              I&apos;m Hamza. I was a founding engineer at DietAI through a seven-figure exit, and I
              run Zapp Studios out of Houston. There is no account manager and no offshore team —
              the person who reads your code is the person who writes the report and the person who
              does the fixes.
            </p>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: MUTED }}>
              Most of my work is building and running production software end to end: funnels,
              booking systems, payments, SMS automation, the operational apps behind them. One
              recent client went from roughly $200 to about $10K in monthly revenue in four months
              on a system I built and still run.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
              I&apos;ll be straight with you about the one thing you should weigh: rescue work is a
              newer line for me than growth engineering, so I&apos;m pricing the audit to be an easy
              decision and letting the report speak for itself. If you want references for the
              build work, I&apos;ll give you them on the call.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────
function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <SectionLabel>Questions</SectionLabel>
          <H2>Straight answers.</H2>
        </Reveal>

        <div className="mt-10">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <div style={{ borderTop: '1px solid rgba(245,239,224,0.1)' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left py-5"
                  aria-expanded={open === i}
                >
                  <span className="text-base md:text-lg font-medium leading-snug" style={{ ...DISPLAY, color: CREAM }}>
                    {f.q}
                  </span>
                  <span
                    className="shrink-0 mt-1 transition-transform"
                    style={{ color: ACCENT, transform: open === i ? 'rotate(180deg)' : 'none' }}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>
                {/* Rendered always, collapsed with CSS rather than unmounted, so the
                    answer text reaches AI crawlers and matches the FAQPage schema
                    in page.tsx. Still user-expandable. */}
                <div
                  style={{
                    maxHeight: open === i ? '40rem' : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}
                  aria-hidden={open !== i}
                >
                  <p className="text-base leading-relaxed pb-6 pr-8" style={{ color: MUTED }}>
                    {f.a}
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

// ── Close ─────────────────────────────────────────────────────────
function Close() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <H2 className="max-w-2xl">Find out what you&apos;re actually dealing with.</H2>
          <p className="text-lg max-w-xl mb-10 leading-relaxed" style={{ color: MUTED }}>
            A 15-minute call, no charge. Bring the app and whatever you&apos;ve been told about it.
            If the audit isn&apos;t the right next step I&apos;ll say so.
          </p>
          <Link
            href="/book?offer=rescue"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded transition-colors"
            style={{ backgroundColor: ACCENT, color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = ACCENT)}
          >
            Book a call <ArrowRight size={16} />
          </Link>
          <p className="text-xs mt-6" style={{ ...MONO, color: DIM }}>
            Hamza Zulquernain &middot; Zapp Studios &middot; Houston, TX
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default function RescueClient() {
  return (
    <main style={{ backgroundColor: '#0C0C0C', minHeight: '100vh' }}>
      <DarkPageBodyClass />
      <Nav />
      <Hero />
      <Symptoms />
      <Failures />
      <Audit />
      <Pricing />
      <Ownership />
      <Who />
      <Faq />
      <Close />
      <Footer />
      <StickyCTA label="Book a call" />
    </main>
  )
}
