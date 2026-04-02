'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X, Check, ChevronDown, Shield } from 'lucide-react'
import { Linkedin, Mail } from 'lucide-react'

// ─── Fonts ───────────────────────────────────────────────────────
const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

// ─── Scroll animation hook ────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

// ─── Section Label ───────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span
        style={{ backgroundColor: '#E8903A' }}
        className="inline-block w-4 h-px"
      />
      <p
        style={{ ...MONO, letterSpacing: '0.2em', color: '#6B6560' }}
        className="text-sm uppercase"
      >
        {children}
      </p>
    </div>
  )
}

// ─── Inline CTA Block ────────────────────────────────────────────
function InlineCTA({ text, subtext }: { text?: string; subtext?: string }) {
  return (
    <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(245,239,224,0.06)' }}>
      <Link
        href="/book"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded transition-colors"
        style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
      >
        {text || 'Get Your Free Revenue Diagnostic'} <ArrowRight size={15} />
      </Link>
      {subtext && (
        <p className="mt-3 text-xs" style={{ ...MONO, color: '#6B6560' }}>
          {subtext}
        </p>
      )}
    </div>
  )
}

// ─── Newsletter Form ────────────────────────────────────────────
// TODO: Connect to Beehiiv, ConvertKit, or Buttondown: replace the console.log with your newsletter API endpoint
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    console.log('Newsletter signup:', email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-xs" style={{ ...MONO, color: '#4ADE80' }}>
        You&apos;re in. First teardown drops this week.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <p className="text-xs" style={{ ...MONO, color: '#6B6560' }}>
        Not ready for a call?
      </p>
      <div className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="px-3 py-1.5 text-xs rounded outline-none transition-colors"
          style={{
            ...MONO,
            backgroundColor: 'transparent',
            border: '1px solid rgba(245,239,224,0.1)',
            color: '#F5EFE0',
            width: '180px',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(232,144,58,0.35)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(245,239,224,0.1)')}
        />
        <button
          type="submit"
          className="px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap"
          style={{
            ...MONO,
            backgroundColor: 'rgba(232,144,58,0.1)',
            border: '1px solid rgba(232,144,58,0.25)',
            color: '#E8903A',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(232,144,58,0.2)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(232,144,58,0.1)')}
        >
          Get the weekly teardown →
        </button>
      </div>
    </form>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(12,12,12,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,239,224,0.06)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" style={{ ...DISPLAY, color: '#F5EFE0' }} className="text-lg font-bold">
          Zapp Studios
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/work"
            className="text-sm transition-colors"
            style={{ color: '#A09A8E' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5EFE0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#A09A8E')}
          >
            Work
          </Link>
          <Link
            href="/book"
            className="text-sm font-semibold px-4 py-2 rounded transition-colors"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Free Diagnostic →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden transition-colors"
          style={{ color: '#A09A8E' }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{
            backgroundColor: '#141414',
            borderBottom: '1px solid rgba(245,239,224,0.1)',
          }}
        >
          <Link
            href="/work"
            onClick={() => setMenuOpen(false)}
            className="text-sm"
            style={{ color: '#A09A8E' }}
          >
            Work
          </Link>
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold px-4 py-2 rounded text-center"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
          >
            Free Diagnostic →
          </Link>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center pt-16"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-24 flex-1 flex flex-col justify-center">
        {/* Eyebrow */}
        <p
          className="animate-fade-in text-xs uppercase mb-4"
          style={{ ...MONO, letterSpacing: '0.25em', color: '#E8903A' }}
        >
          Business Engineering | Founder-Operated
        </p>

        {/* H1 */}
        <h1
          className="animate-fade-in delay-100 font-bold leading-[1.04] mb-4"
          style={{
            ...DISPLAY,
            fontSize: 'clamp(40px, 7vw, 84px)',
            color: '#F5EFE0',
          }}
        >
          Zapp Studios
        </h1>

        {/* Name */}
        <p
          className="animate-fade-in delay-150 text-lg md:text-xl mb-8"
          style={{ color: '#A09A8E' }}
        >
          Founded and operated by{' '}
          <span style={{ color: '#F5EFE0', fontWeight: 500 }}>Hamza Zulquernain</span>
        </p>

        {/* Value prop subtitle */}
        <p
          className="animate-fade-in delay-200 text-xl md:text-2xl max-w-3xl mb-10 leading-relaxed"
          style={{ ...DISPLAY, color: '#F5EFE0', fontWeight: 500 }}
        >
          I diagnose the bottlenecks in your business, design the right solutions, and build the systems that enable you to 10x your revenue.
        </p>

        {/* Supporting line */}
        <p
          className="animate-fade-in delay-250 text-base md:text-lg max-w-2xl mb-10 leading-relaxed"
          style={{ color: '#A09A8E' }}
        >
          You work with me directly. No junior handoffs. No slide decks. No disappearing acts.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in delay-300 flex flex-col sm:flex-row gap-4 mb-3">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded transition-colors"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Get Your Free Revenue Diagnostic <ArrowRight size={15} />
          </Link>
          <Link
            href="#results"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm rounded transition-colors"
            style={{
              border: '1px solid rgba(245,239,224,0.1)',
              color: '#A09A8E',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#F5EFE0'
              e.currentTarget.style.borderColor = 'rgba(232,144,58,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#A09A8E'
              e.currentTarget.style.borderColor = 'rgba(245,239,224,0.1)'
            }}
          >
            See the proof →
          </Link>
        </div>

        {/* Click trigger */}
        <p
          className="animate-fade-in delay-300 text-xs mb-16"
          style={{ ...MONO, color: '#6B6560' }}
        >
          30 min. No pitch. Just an honest look at what's costing you growth.
        </p>

        {/* Proof bar: real metrics */}
        <div
          className="animate-fade-in delay-400 pt-8 flex flex-wrap gap-x-8 gap-y-4"
          style={{ borderTop: '1px solid rgba(232,144,58,0.25)' }}
        >
          <div>
            <p className="text-2xl font-bold" style={{ ...DISPLAY, color: '#F5EFE0' }}>334%</p>
            <p className="text-xs" style={{ ...MONO, color: '#6B6560' }}>conversion lift</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ ...DISPLAY, color: '#F5EFE0' }}>7-fig</p>
            <p className="text-xs" style={{ ...MONO, color: '#6B6560' }}>exit at DietAI</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ ...DISPLAY, color: '#F5EFE0' }}>80%</p>
            <p className="text-xs" style={{ ...MONO, color: '#6B6560' }}>of inquiries turned away</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ ...DISPLAY, color: '#F5EFE0' }}>2–12 wk</p>
            <p className="text-xs" style={{ ...MONO, color: '#6B6560' }}>to ship</p>
          </div>
        </div>

        {/* Project bar */}
        <div className="animate-fade-in delay-500 mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase" style={{ ...MONO, letterSpacing: '0.15em', color: '#6B6560' }}>
            Featured work
          </span>
          {['Royal Pawz USA', 'DietAI (7-fig exit)'].map(name => (
            <span
              key={name}
              className="px-3 py-1 text-xs rounded-full"
              style={{ ...MONO, border: '1px solid rgba(245,239,224,0.1)', color: '#A09A8E' }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Problem ──────────────────────────────────────────────────────
const PROBLEMS = [
  {
    num: '01',
    title: "You can't predict next month's revenue",
    desc: "You're working 60-hour weeks and some months are great, some are terrifying. That pit in your stomach on the 28th of every month? That's not a marketing problem. It's a systems problem. There's no infrastructure underneath your revenue, just effort, referrals, and hope.",
  },
  {
    num: '02',
    title: "Leads are falling through the cracks, and you're the duct tape holding it together.",
    desc: "You've got a CRM, an email tool, maybe an ad account. They're all islands. Leads fall through the cracks, follow-ups get missed, and you're manually stitching together what should run on its own.",
  },
  {
    num: '03',
    title: "You've paid for advice. Nothing got built.",
    desc: "An agency charged you $5K/month and handed you a report you couldn't act on. A consultant delivered a 47-page deck and disappeared. You're not anti-help, you're done paying for promises without execution.",
  },
]

function Problem() {
  return (
    <section className="py-24" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionLabel>The Problem</SectionLabel>
          <p
            className="text-4xl md:text-6xl font-semibold mb-16 max-w-3xl leading-tight"
            style={{ ...DISPLAY, color: '#F5EFE0' }}
          >
            Most businesses don't have a marketing problem.{' '}
            <span style={{ color: '#A09A8E' }}>They have a systems problem.</span>
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <AnimatedSection key={p.num} delay={i * 90}>
              <div
                className="p-8 rounded h-full transition-colors"
                style={{
                  backgroundColor: '#1C1C1C',
                  border: '1px solid rgba(245,239,224,0.06)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(232,144,58,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,239,224,0.06)')}
              >
                <span
                  className="text-sm font-semibold mb-4 block"
                  style={{ ...MONO, color: '#E8903A' }}
                >
                  {p.num}
                </span>
                <h3
                  className="text-xl font-semibold mb-3 leading-snug"
                  style={{ ...DISPLAY, color: '#F5EFE0' }}
                >
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#A09A8E' }}>
                  {p.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={280}>
          <p
            className="text-lg mt-12 mb-2 leading-relaxed"
            style={{ color: '#F5EFE0', fontWeight: 500 }}
          >
            You didn't fail. The model failed you.
          </p>
          <p className="text-base mb-0 leading-relaxed" style={{ color: '#A09A8E' }}>
            Business owners who work this hard deserve systems that actually work.
          </p>
          <InlineCTA
            text="Sound familiar? Let's find the real constraint"
            subtext="Not a sales call. A working session where we diagnose what's actually costing you growth."
          />
        </AnimatedSection>

        {/* Lower-commitment entry point */}
        <AnimatedSection delay={360}>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── Results / Social Proof ──────────────────────────────────────
function Results() {
  return (
    <section id="results" className="py-24" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionLabel>Results</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight"
            style={{ ...DISPLAY, fontSize: 'clamp(38px, 5.5vw, 64px)', color: '#F5EFE0' }}
          >
            Here's what it looks like when it works.
          </h2>
          <p className="text-xl max-w-2xl mb-16 leading-relaxed" style={{ color: '#A09A8E' }}>
            Real numbers from a real engagement. Not projections. Measured outcomes.
          </p>
        </AnimatedSection>

        {/* Royal Pawz: Featured case study with real metrics */}
        <AnimatedSection>
          <Link
            href="/rev-eng/royalpawzusa"
            className="block p-8 md:p-10 rounded transition-all group mb-5"
            style={{
              backgroundColor: '#1C1C1C',
              borderTop: '2px solid #E8903A',
              borderLeft: '1px solid rgba(245,239,224,0.06)',
              borderRight: '1px solid rgba(245,239,224,0.06)',
              borderBottom: '1px solid rgba(245,239,224,0.06)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderLeftColor = 'rgba(232,144,58,0.2)'
              e.currentTarget.style.borderRightColor = 'rgba(232,144,58,0.2)'
              e.currentTarget.style.borderBottomColor = 'rgba(232,144,58,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderLeftColor = 'rgba(245,239,224,0.06)'
              e.currentTarget.style.borderRightColor = 'rgba(245,239,224,0.06)'
              e.currentTarget.style.borderBottomColor = 'rgba(245,239,224,0.06)'
            }}
          >
            <span
              className="text-sm uppercase mb-6 block"
              style={{ ...MONO, letterSpacing: '0.15em', color: '#6B6560' }}
            >
              Local Service Business | Royal Pawz USA
            </span>

            <h3
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ ...DISPLAY, color: '#F5EFE0' }}
            >
              $200 MRR to $10K MRR in 4 months. Built from scratch.
            </h3>
            <p className="text-base mb-8 leading-relaxed max-w-2xl" style={{ color: '#A09A8E' }}>
              A mobile dog grooming company in Houston with zero digital systems. I built the entire revenue infrastructure from the ground up: booking app, CRM, automated marketing flows, and A/B tested conversion funnels. The system now runs independently and scales without major intervention.
            </p>

            {/* Real metrics from the case study */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { value: '$10K', label: 'Monthly revenue', sub: 'from $200 MRR' },
                { value: '50x', label: 'MRR growth', sub: 'in 4 months' },
                { value: '30.8%', label: 'Conversion rate', sub: 'A/B tested' },
                { value: 'Self-running', label: 'System status', sub: 'scales on its own' },
              ].map(m => (
                <div
                  key={m.label}
                  className="p-4 rounded"
                  style={{ backgroundColor: 'rgba(232,144,58,0.06)', border: '1px solid rgba(232,144,58,0.15)' }}
                >
                  <p className="text-xl md:text-2xl font-bold" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                    {m.value}
                  </p>
                  <p className="text-xs mt-1" style={{ ...MONO, color: '#A09A8E' }}>{m.label}</p>
                  <p className="text-xs" style={{ ...MONO, color: '#6B6560' }}>{m.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm" style={{ color: '#E8903A' }}>
              <span>Read the full case study</span>
              <ArrowRight size={13} />
            </div>
          </Link>
        </AnimatedSection>

        {/* TODO: Add client testimonials here once available. Ideal format:
            "Before/after quote with specific metrics", Client Name, Business Name
            Place one "I was in your shoes" testimonial here.
            Distribute additional testimonials near the Methodology and FooterCTA sections */}

        <AnimatedSection delay={100}>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: '#6B6560' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E8903A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B6560')}
            >
              See all work <ArrowRight size={13} />
            </Link>
          </div>
          <InlineCTA
            text="Want results like these?"
            subtext="30 min. We'll look at your funnel together and find the constraint."
          />
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── The Business Engineering System (Consolidated Methodology) ────
const PILLARS = [
  {
    num: '01',
    label: 'DIAGNOSE',
    headline: 'Find the real constraint',
    desc: "I look at every step of how you get and keep customers, not just where you think the problem is. The data tells us whether it's your product, your messaging, or your distribution that's leaking revenue. For Royal Pawz, the diagnostic revealed a 43.6% bounce rate was the real constraint, not their ad spend.",
  },
  {
    num: '02',
    label: 'BUILD',
    headline: 'Ship the system that fixes it',
    desc: "I build the systems that fix the constraint: designed, built, and live in 2-12 weeks. Not a plan for you to execute. Working infrastructure, tested and running before I hand it over.",
  },
  {
    num: '03',
    label: 'SCALE',
    headline: 'Optimize and compound what works',
    desc: "Once the system is running, we optimize what works and add compounding growth channels. The goal isn't a one-time fix. It's infrastructure that grows with your business.",
  },
]

const COMPARISON = [
  { dimension: 'Who does the work', agency: 'Junior account managers', me: 'Hamza, directly' },
  { dimension: 'What you get', agency: 'Strategy deck + monthly report', me: 'Working systems, live and tested' },
  { dimension: 'Timeline', agency: '3-6 month retainer (to start)', me: '2-12 weeks to ship' },
  { dimension: 'Accountability', agency: 'Monthly performance review', me: "Real-time, you're in the loop" },
  { dimension: 'After the engagement', agency: '"Good luck"', me: 'Clean handoff or ongoing optimization' },
  { dimension: 'Incentive alignment', agency: 'Paid whether it works or not', me: 'Equity-aligned: I win when you win' },
]

function Methodology() {
  return (
    <section className="py-24" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionLabel>The Business Engineering System</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight"
            style={{ ...DISPLAY, fontSize: 'clamp(38px, 5.5vw, 64px)', color: '#F5EFE0' }}
          >
            Revenue isn't magic.
            <br />
            It's infrastructure.
          </h2>
          <p className="text-xl max-w-2xl mb-16 leading-relaxed" style={{ color: '#A09A8E' }}>
            I diagnose the constraint, build the system to fix it, and stay until it compounds. Not three separate engagements.{' '}
            <span style={{ color: '#F5EFE0', fontWeight: 500 }}>one continuous system.</span>
          </p>
        </AnimatedSection>

        {/* 3-step process */}
        <div className="flex flex-col gap-3 mb-16">
          {PILLARS.map((p, i) => (
            <AnimatedSection key={p.num} delay={i * 80}>
              <div
                className="p-8 rounded flex flex-col md:flex-row md:items-start gap-4"
                style={{
                  backgroundColor: '#1C1C1C',
                  borderLeft: '3px solid #E8903A',
                  borderTop: '1px solid rgba(245,239,224,0.04)',
                  borderRight: '1px solid rgba(245,239,224,0.04)',
                  borderBottom: '1px solid rgba(245,239,224,0.04)',
                }}
              >
                <div className="flex items-center gap-3 md:w-48 shrink-0">
                  <span style={{ ...MONO, color: '#E8903A' }} className="text-sm font-bold">
                    {p.num}
                  </span>
                  <span
                    className="text-sm font-semibold uppercase"
                    style={{ ...MONO, letterSpacing: '0.12em', color: '#F5EFE0' }}
                  >
                    {p.label}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                    {p.headline}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#A09A8E' }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Comparison table */}
        <AnimatedSection delay={260}>
          <div className="mb-12">
            <h3
              className="text-xl font-bold mb-6"
              style={{ ...DISPLAY, color: '#F5EFE0' }}
            >
              This isn't the agency model.
            </h3>
            <div className="overflow-x-auto rounded" style={{ border: '1px solid rgba(245,239,224,0.06)' }}>
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr style={{ backgroundColor: '#1C1C1C' }}>
                    <th className="text-left py-3 px-5" style={{ ...MONO, color: '#6B6560', letterSpacing: '0.1em', fontSize: '11px' }}></th>
                    <th className="text-left py-3 px-5" style={{ ...MONO, color: '#6B6560', letterSpacing: '0.1em', fontSize: '11px' }}>TRADITIONAL AGENCY</th>
                    <th className="text-left py-3 px-5" style={{ ...MONO, color: '#E8903A', letterSpacing: '0.1em', fontSize: '11px' }}>WORKING WITH ME</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderTop: '1px solid rgba(245,239,224,0.04)',
                        backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(245,239,224,0.02)',
                      }}
                    >
                      <td className="py-3 px-5 font-medium" style={{ color: '#F5EFE0', fontSize: '13px' }}>
                        {row.dimension}
                      </td>
                      <td className="py-3 px-5" style={{ color: '#6B6560', fontSize: '13px' }}>
                        {row.agency}
                      </td>
                      <td className="py-3 px-5" style={{ color: '#A09A8E', fontSize: '13px' }}>
                        {row.me}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={340}>
          <InlineCTA subtext="30 min. We'll look at your funnel together and find the constraint." />
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── About / Operator ────────────────────────────────────────────
function About() {
  return (
    <section className="py-24" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionLabel>The Operator</SectionLabel>
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            {/* TODO: Replace with <Image src="/hamza.jpg" width={192} height={192} alt="Hamza Zulquernain" className="rounded-full" /> once headshot is added to /public */}
            <div className="shrink-0">
              <div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: '#1C1C1C',
                  border: '2px solid rgba(232,144,58,0.3)',
                }}
              >
                <span className="text-3xl font-bold" style={{ ...DISPLAY, color: '#E8903A' }}>HZ</span>
              </div>
            </div>

            <div>
              <h2
                className="font-bold mb-6 leading-tight"
                style={{ ...DISPLAY, fontSize: 'clamp(32px, 4.5vw, 48px)', color: '#F5EFE0' }}
              >
                I've built it, broken it, and figured out what actually works.
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: '#A09A8E' }}>
                <p>
                  I'm Hamza. Before starting Zapp Studios, I was a founding engineer at DietAI, where I built the growth systems that led to a{' '}
                  <span style={{ color: '#F5EFE0', fontWeight: 500 }}>7-figure exit</span>. I saw what predictable revenue infrastructure looks like from the inside: build it, market it, scale it, sell it.
                </p>
                <p>
                  Before that, I co-founded a startup that failed. I learned how to sell, how to attract customers, how to monetize, and exactly who not to build with. Every failure was tuition.
                </p>
                <p>
                  I don't sell strategy decks because I know what happens when execution fails. I've been on the other side of the table.{' '}
                  <span style={{ color: '#F5EFE0', fontWeight: 500 }}>watching agencies deliver reports while the business bleeds</span>. I started Zapp Studios because I was tired of seeing good businesses get bad help.
                </p>
                <p>
                  I&apos;ve worked with e-commerce brands, DTC companies, and service businesses across every growth stage, from first-revenue to half a million a month. Every engagement teaches me something new about where revenue actually breaks.{' '}
                  <span style={{ color: '#F5EFE0', fontWeight: 500 }}>That library of pattern recognition is what I bring to your diagnostic.</span>
                </p>
                <p>
                  &quot;Can one person really do all this?&quot; Yes, because I&apos;m not doing it alone. I use AI as a force multiplier and have a vetted network of specialists I bring in when a project needs it. But the thinking, the strategy, and the accountability?{' '}
                  <span style={{ color: '#F5EFE0', fontWeight: 500 }}>That&apos;s always me.</span> You&apos;ll never get handed off to someone you&apos;ve never met.
                </p>
                <p style={{ color: '#F5EFE0' }}>
                  When you work with me, the person who diagnosed your problem is the same person building the solution. That&apos;s the point.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <InlineCTA subtext="30 min. You'll talk directly with me, the person who'll do the work." />
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── Self-Qualify ─────────────────────────────────────────────────
const YES_ITEMS = [
  'You have real revenue ($10K+/month) and want to make it predictable',
  "You're ready to systematize what's working and automate what shouldn't need your attention",
  'You can commit to at least 30 days and ~1 hour/week of your time',
  "You want a partner who'll tell you the truth, not what you want to hear",
]

const NO_ITEMS = [
  "You're pre-revenue and still finding product-market fit (I can point you to resources that'll help)",
  'You need something shipped in under a week',
  "You want someone to rubber-stamp decisions you've already made",
  'Price is your only filter, not results',
]

function SelfQualify() {
  return (
    <section id="qualify" className="py-24" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionLabel>Is This For You?</SectionLabel>
          <h2
            className="font-bold mb-4 leading-tight"
            style={{ ...DISPLAY, fontSize: 'clamp(38px, 5.5vw, 64px)', color: '#F5EFE0' }}
          >
            I work best with businesses that already have traction.
          </h2>
          <p className="text-lg max-w-xl mb-16 leading-relaxed" style={{ color: '#A09A8E' }}>
            I work best with e-commerce, DTC, and service businesses doing $10K-$500K/month who need systems, not more advice. I turn away 80% of projects, not to seem exclusive, but because I won't take money on things that won't work.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Yes */}
          <AnimatedSection>
            <div
              className="p-8 rounded h-full"
              style={{
                backgroundColor: '#1C1C1C',
                border: '1px solid rgba(245,239,224,0.06)',
              }}
            >
              <h3
                className="text-base font-semibold mb-6"
                style={{ ...DISPLAY, color: '#F5EFE0' }}
              >
                This is for you if:
              </h3>
              <ul className="flex flex-col gap-4">
                {YES_ITEMS.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'rgba(74,222,128,0.1)',
                        border: '1px solid rgba(74,222,128,0.25)',
                      }}
                    >
                      <Check size={10} color="#4ADE80" />
                    </div>
                    <span className="text-base leading-relaxed" style={{ color: '#A09A8E' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* No */}
          <AnimatedSection delay={100}>
            <div
              className="p-8 rounded h-full"
              style={{
                backgroundColor: '#1C1C1C',
                border: '1px solid rgba(245,239,224,0.06)',
              }}
            >
              <h3
                className="text-base font-semibold mb-6"
                style={{ ...DISPLAY, color: '#F5EFE0' }}
              >
                This isn't for you if:
              </h3>
              <ul className="flex flex-col gap-4">
                {NO_ITEMS.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold leading-none"
                      style={{
                        backgroundColor: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#EF4444',
                        paddingBottom: '1px',
                      }}
                    >
                      ×
                    </div>
                    <span className="text-base leading-relaxed" style={{ color: '#A09A8E' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* Honest callout */}
        <AnimatedSection delay={200}>
          <div
            className="p-8 rounded"
            style={{
              border: '1px solid rgba(232,144,58,0.3)',
              backgroundColor: 'rgba(232,144,58,0.04)',
            }}
          >
            <p className="mb-6 leading-relaxed" style={{ color: '#A09A8E' }}>
              Not sure if you qualify?{' '}
              <span style={{ color: '#F5EFE0', fontWeight: 500 }}>Book the call anyway.</span>{' '}
              If it's not the right fit, I'll tell you honestly, and point you toward what to do first.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded transition-colors"
              style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
            >
              Get Your Free Revenue Diagnostic <ArrowRight size={15} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── Investment ──────────────────────────────────────────────────
const ANCHORS = [
  { label: 'A senior marketing hire', cost: '$120K-$180K/yr + benefits + ramp time' },
  { label: 'A mid-tier agency retainer', cost: '$5K-$15K/mo with junior execution' },
  { label: 'The cost of inaction', cost: 'Every month without a system, your best leads go cold' },
]

function Investment() {
  return (
    <section className="py-24" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionLabel>Investment</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight"
            style={{ ...DISPLAY, fontSize: 'clamp(38px, 5.5vw, 64px)', color: '#F5EFE0' }}
          >
            Honest pricing context.
          </h2>
          <p className="text-xl max-w-2xl mb-16 leading-relaxed" style={{ color: '#A09A8E' }}>
            Every engagement is scoped to your specific constraints. Here's the honest context so you can decide before we talk.
          </p>
        </AnimatedSection>

        {/* What it replaces */}
        <AnimatedSection>
          <h3 className="text-lg font-semibold mb-5" style={{ ...DISPLAY, color: '#F5EFE0' }}>
            What it replaces
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {ANCHORS.map(a => (
              <div
                key={a.label}
                className="p-6 rounded"
                style={{
                  backgroundColor: '#1C1C1C',
                  border: '1px solid rgba(245,239,224,0.06)',
                }}
              >
                <p className="text-sm font-semibold mb-2" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                  {a.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#A09A8E' }}>
                  {a.cost}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ROI context */}
        <AnimatedSection>
          <div
            className="p-6 rounded mb-12"
            style={{ backgroundColor: 'rgba(232,144,58,0.04)', border: '1px solid rgba(232,144,58,0.15)' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#A09A8E' }}>
              <span style={{ color: '#F5EFE0', fontWeight: 500 }}>For context:</span> Royal Pawz invested in a full business engineering engagement and saw a 334% conversion lift within 90 days. The system paid for itself before the engagement ended.
            </p>
          </div>
        </AnimatedSection>

        {/* Two models */}
        <AnimatedSection delay={100}>
          <h3 className="text-lg font-semibold mb-5" style={{ ...DISPLAY, color: '#F5EFE0' }}>
            Two models. Both aligned.
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div
              className="p-6 rounded"
              style={{
                backgroundColor: '#1C1C1C',
                border: '1px solid rgba(232,144,58,0.2)',
              }}
            >
              <p className="text-base font-semibold mb-2" style={{ ...DISPLAY, color: '#E8903A' }}>
                Equity-aligned
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#A09A8E' }}>
                Lower upfront investment + I take a stake in the outcome. I only profit when you do. Best for businesses ready to scale aggressively.
              </p>
            </div>
            <div
              className="p-6 rounded"
              style={{
                backgroundColor: '#1C1C1C',
                border: '1px solid rgba(245,239,224,0.06)',
              }}
            >
              <p className="text-base font-semibold mb-2" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                Fixed-scope
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#A09A8E' }}>
                Clear deliverables, clear timeline, clear number. You know the investment before we start. No surprises.
              </p>
            </div>
          </div>
          <p className="text-xs mt-6 mb-4 leading-relaxed" style={{ ...MONO, color: '#6B6560' }}>
            Typical ranges: $5K-$8K for a focused diagnostic + single-system build. $10K-$18K for full-funnel engineering. $20K+ for end-to-end revenue infrastructure with ongoing optimization.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#6B6560' }}>
            We'll scope everything precisely on the diagnostic call: a straight answer, not a ballpark runaround.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <InlineCTA subtext="30 min. You'll know exactly what it costs before you commit to anything." />
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How is this different from the agency I tried before?',
    a: "You'll work directly with me, the same person who diagnoses the problem builds the solution. No junior handoffs, no revolving door of account managers. And with equity-aligned engagements, I only win when you win. I can't hide behind a monthly retainer if nothing's working.",
  },
  {
    q: "What if I don't see results?",
    a: "If the diagnostic shows your business isn't ready, I'll tell you before we start, and point you to what to fix first. If we do start and systems aren't hitting the targets we agreed on, I continue optimizing at no additional cost until they do. I turn away 80% of projects specifically so I can stand behind the results on the ones I take.",
  },
  {
    q: 'How long until I see results?',
    a: 'Most systems ship in 2-12 weeks. You\'ll see measurable progress within the first 30 days: real systems running, not a "phase 1 discovery report." Royal Pawz saw a 334% conversion lift within 3 months of launch.',
  },
  {
    q: "What's the time commitment on my end?",
    a: "A 30-minute weekly sync and timely answers to my questions. That's it. I handle the build, the testing, the iteration. You keep running your business.",
  },
  {
    q: 'How do I know this will work for my specific business?',
    a: "That's exactly what the diagnostic is for. In 30 minutes, I'll look at your specific funnel, your specific numbers, and tell you honestly whether I can help, and what the expected impact looks like. If it's not a fit, I'll tell you. I turn away 80% of projects for a reason.",
  },
  {
    q: 'What does it cost?',
    a: "Most engagements fall in the $5K-$25K range depending on scope and complexity. I offer equity-aligned engagements (lower upfront, I only profit when you do) and fixed-scope cash projects (clear deliverables, clear number). We'll scope everything precisely on the diagnostic call: no ballpark runarounds.",
  },
  {
    q: 'What happens after the engagement?',
    a: "You own everything. Clean documentation, full system handoff, and infrastructure that runs without me. If you want ongoing optimization, we can continue. But you're never locked in.",
  },
  {
    q: 'What happens if you take on too many clients?',
    a: "I cap active engagements at 3-4 at a time, that's non-negotiable. It's why I turn away 80% of projects. If my calendar is full when you reach out, I'll tell you upfront and give you a realistic timeline. I'd rather lose the deal than deliver diluted work.",
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionLabel>Common Questions</SectionLabel>
          <h2
            className="font-bold mb-16 leading-tight"
            style={{ ...DISPLAY, fontSize: 'clamp(38px, 5.5vw, 64px)', color: '#F5EFE0' }}
          >
            Straight answers.
          </h2>
        </AnimatedSection>

        <div className="flex flex-col gap-2 max-w-3xl">
          {FAQS.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 60}>
              <div
                className="rounded overflow-hidden"
                style={{
                  backgroundColor: '#1C1C1C',
                  border: '1px solid rgba(245,239,224,0.06)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors cursor-pointer"
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(245,239,224,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span className="text-base font-semibold pr-4" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: '#E8903A',
                      transform: openIndex === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6">
                    <p className="text-base leading-relaxed" style={{ color: '#A09A8E' }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={380}>
          <div className="mt-8 max-w-3xl">
            <p className="text-sm" style={{ ...MONO, color: '#6B6560' }}>
              Still have questions?{' '}
              <Link
                href="/book"
                className="transition-colors"
                style={{ color: '#E8903A' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0A855')}
                onMouseLeave={e => (e.currentTarget.style.color = '#E8903A')}
              >
                Ask on the diagnostic call →
              </Link>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── Footer CTA + Guarantee ──────────────────────────────────────
function FooterCTA() {
  return (
    <section className="py-24" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <AnimatedSection>
          {/* Dual guarantee badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.2)',
              }}
            >
              <Shield size={14} color="#4ADE80" />
              <span className="text-xs font-semibold" style={{ ...MONO, color: '#4ADE80' }}>
                THE HONEST DIAGNOSTIC GUARANTEE
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.2)',
              }}
            >
              <Shield size={14} color="#4ADE80" />
              <span className="text-xs font-semibold" style={{ ...MONO, color: '#4ADE80' }}>
                THE BUILD-IT-RIGHT GUARANTEE
              </span>
            </div>
          </div>

          <h2
            className="font-bold mb-6 leading-tight"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(38px, 6vw, 68px)',
              color: '#F5EFE0',
            }}
          >
            Let's look at your revenue system.
          </h2>
          <p
            className="text-lg max-w-xl mx-auto mb-4 leading-relaxed"
            style={{ color: '#A09A8E' }}
          >
            30-minute diagnostic call. Not a pitch: a working session. We'll look at your funnel together, find the real constraint, and you'll leave with at least one actionable insight you can implement immediately.
          </p>

          {/* Guarantee details */}
          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-4 mb-10 text-left">
            <div
              className="p-5 rounded"
              style={{
                backgroundColor: 'rgba(74,222,128,0.04)',
                border: '1px solid rgba(74,222,128,0.12)',
              }}
            >
              <p className="text-sm font-semibold mb-2" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                The Diagnostic
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#A09A8E' }}>
                If the call doesn't give you at least one actionable insight worth implementing immediately, I'll tell you honestly, and point you toward what to do first. No pitch, no pressure.
              </p>
            </div>
            <div
              className="p-5 rounded"
              style={{
                backgroundColor: 'rgba(74,222,128,0.04)',
                border: '1px solid rgba(74,222,128,0.12)',
              }}
            >
              <p className="text-sm font-semibold mb-2" style={{ ...DISPLAY, color: '#F5EFE0' }}>
                The Engagement
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#A09A8E' }}>
                If the systems I build don&apos;t hit the performance targets we set during scoping, I continue optimizing at no additional cost until they do. Miss a deadline or let communication slip? Same deal: I credit the time and make it right. I can offer this because the diagnostic filters out projects where I&apos;m not confident in the outcome.
              </p>
            </div>
          </div>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Get Your Free Revenue Diagnostic <ArrowRight size={17} />
          </Link>
          <p className="mt-4 text-xs" style={{ ...MONO, color: '#6B6560' }}>
            No commitment. No sales pitch. Just an honest conversation.
          </p>
          <p className="mt-6 text-xs" style={{ ...MONO, color: '#6B6560' }}>
            Or email me directly:{' '}
            <Link
              href="mailto:hamzazulquernain1@gmail.com"
              className="transition-colors"
              style={{ color: '#E8903A' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0A855')}
              onMouseLeave={e => (e.currentTarget.style.color = '#E8903A')}
            >
              hamzazulquernain1@gmail.com
            </Link>
          </p>

          {/* TODO: Add a "here's what I got" testimonial above this CTA once available */}
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-8"
      style={{
        backgroundColor: '#0C0C0C',
        borderTop: '1px solid rgba(245,239,224,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span style={{ ...DISPLAY, color: '#F5EFE0', fontWeight: 700, fontSize: '15px' }}>
          Zapp Studios
        </span>
        <span style={{ ...MONO, color: '#6B6560', fontSize: '11px' }}>
          © 2026 Zapp Studios
        </span>
        <div className="flex items-center gap-5">
          <Link
            href="https://linkedin.com/in/hamza-zulquernain"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: '#6B6560' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5EFE0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B6560')}
          >
            <Linkedin size={17} />
          </Link>
          <Link
            href="mailto:hamzazulquernain1@gmail.com"
            aria-label="Email"
            style={{ color: '#6B6560' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5EFE0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B6560')}
          >
            <Mail size={17} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Results />
      <Methodology />
      <About />
      <SelfQualify />
      <Investment />
      <FAQ />
      <FooterCTA />
      <Footer />
    </main>
  )
}
