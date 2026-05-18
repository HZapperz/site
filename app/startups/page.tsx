'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Rocket,
  Compass,
  Wrench,
  Users,
  TrendingUp,
  Presentation,
  Lightbulb,
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
          style={{ ...MONO, letterSpacing: '0.22em', color: '#E8903A' }}
        >
          Startup Consulting
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
          From idea to traction —{' '}
          <span style={{ color: '#E8903A' }}>with someone who&apos;s done it.</span>
        </h1>

        <p
          className="animate-fade-in-up delay-200 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          style={{ ...SERIF, color: '#A09A8E', fontStyle: 'italic', opacity: 0 }}
        >
          I work with founders at the earliest stages — shaping the idea, building the first
          version, and getting it in front of real users. Strategy and engineering from one person
          who&apos;s taken a product from zero to a 7-figure exit.
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
            Book a free intro call <ArrowRight size={16} />
          </Link>
        </div>

        <p
          className="animate-fade-in-up delay-400 text-xs mt-5"
          style={{ ...MONO, color: '#6B6560', opacity: 0 }}
        >
          Free intro call — we talk through your idea, no pitch.
        </p>
      </div>
    </section>
  )
}

// ── Who this is for ──────────────────────────────────────────────
const FOR_CARDS = [
  {
    icon: Lightbulb,
    title: 'You have an idea, not a product yet',
    desc: 'You need help shaping it and building the first version — something real you can put in front of people, not a slide deck.',
  },
  {
    icon: Compass,
    title: 'You have an early product, no traction',
    desc: 'You need help finding the wedge and getting in front of real users. Something has to change — the positioning, the channel, or both.',
  },
  {
    icon: Users,
    title: 'You can build or sell — not both',
    desc: 'You need the other half until you can hire it. A founder who can ship but can&apos;t sell, or sell but can&apos;t ship, is stuck.',
  },
]

function WhoThisIsFor() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Who This Is For</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Idea, prototype, or early product — any of those.
          </h2>
          <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{ color: '#A09A8E' }}>
            The work looks different depending on where you are. But the starting point is the
            same: you&apos;re too early for a full team and you need someone who can do more than
            one thing.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {FOR_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <Reveal key={card.title} delay={100 + i * 80}>
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

// ── What I do ────────────────────────────────────────────────────
const WHAT_I_DO = [
  {
    icon: Compass,
    title: 'Strategy & positioning',
    desc: 'Pressure-test the idea, find the wedge, shape the business model and the roadmap. Figure out who you&apos;re actually for and why they&apos;d choose you.',
  },
  {
    icon: Wrench,
    title: 'Build the MVP',
    desc: 'Design and ship the first real version of the product — software you can put in front of users, not a prototype that dies in a folder.',
  },
  {
    icon: TrendingUp,
    title: 'Fractional CTO / growth lead',
    desc: 'Act as your part-time technical or growth leadership while you&apos;re still too early for a full-time hire. Own the roadmap, the stack, or the channel.',
  },
  {
    icon: Presentation,
    title: 'Fundraising & go-to-market',
    desc: 'The narrative, the deck, investor prep, the launch, the first-customer push — get ready to raise, or to sell. Both require the same thing: a clear story and a working product.',
  },
]

function WhatIDo() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>What I Do</SectionLabel>
          <h2
            className="font-bold mb-6 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Two hires in one person.
          </h2>
          <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{ color: '#A09A8E' }}>
            Most early founders need someone who can think through strategy and then actually build
            the thing. That&apos;s usually two hires — and they can&apos;t afford either one yet.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHAT_I_DO.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={100 + i * 70}>
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
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#A09A8E' }}>
                    {item.desc}
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

// ── How it works ─────────────────────────────────────────────────
const ENGAGEMENT_SHAPES = [
  {
    label: 'A focused project',
    desc: 'A defined scope — build the MVP, reposition the product, nail the pitch. Clear start and end.',
  },
  {
    label: 'Ongoing advisory',
    desc: 'Regular conversations as you build. A sounding board that&apos;s been through it and can give you a straight answer.',
  },
  {
    label: 'Hands-on building',
    desc: 'I&apos;m in it with you — designing, shipping, measuring. An operator embedded in the early team.',
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
            Starts with a free call.
            <br />
            <span style={{ color: '#A09A8E' }}>Scoped to your stage.</span>
          </h2>
          <p className="text-lg max-w-2xl mb-6 leading-relaxed" style={{ color: '#A09A8E' }}>
            It starts with a free intro call — we talk through the idea and whether I can actually
            help. From there I scope to what you need: a focused project, ongoing advisory, or
            hands-on building.
          </p>
          <p className="text-lg max-w-2xl mb-16 leading-relaxed" style={{ color: '#A09A8E' }}>
            The commercial side flexes — a retainer, hourly, or equity, or a blend — sized to
            where the company is. We figure that out together once we know what the work looks like.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {ENGAGEMENT_SHAPES.map((shape, i) => (
            <Reveal key={shape.label} delay={100 + i * 80}>
              <div
                className="p-7 h-full rounded"
                style={{
                  backgroundColor: '#1C1C1C',
                  border: '1px solid rgba(245,239,224,0.06)',
                  borderTopWidth: '3px',
                  borderTopColor: 'rgba(232,144,58,0.5)',
                }}
              >
                <p
                  className="text-xs uppercase mb-4"
                  style={{ ...MONO, letterSpacing: '0.18em', color: '#E8903A' }}
                >
                  {shape.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#A09A8E' }}>
                  {shape.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360}>
          <p
            className="text-sm mt-8"
            style={{ ...MONO, color: '#6B6560' }}
          >
            Every engagement is scoped after the call — once we both know what the work is.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Why me ───────────────────────────────────────────────────────
function WhyMe() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#0C0C0C' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>The Operator</SectionLabel>
          <h2
            className="font-bold mb-10 leading-tight max-w-3xl"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            I&apos;ve been the founding engineer — and the growth operator.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Reveal delay={80}>
            <div className="flex flex-col gap-5 text-[16px] leading-relaxed" style={{ color: '#A09A8E' }}>
              <p>
                At{' '}
                <span style={{ color: '#F5EFE0', fontWeight: 600 }}>DietAI</span>, I was the
                founding engineer. I built the product, the funnel, and the growth systems that
                carried it to a{' '}
                <span style={{ color: '#F5EFE0', fontWeight: 600 }}>7-figure exit</span>. Not just
                the code — the whole machine, from acquisition to retention to the eventual sale.
              </p>
              <p>
                With{' '}
                <span style={{ color: '#F5EFE0', fontWeight: 600 }}>Royal Pawz USA</span>, I came
                on as equity partner and took it from{' '}
                <span style={{ color: '#F5EFE0', fontWeight: 600 }}>$200 to $10K MRR</span> in
                four months — rebuilding the booking system, the ad infrastructure, and the
                conversion funnel. A 334% lift in conversion, A/B tested.
              </p>
              <p>
                The point: for a founder, that&apos;s two hires — the person who builds the
                product and the person who grows it — in one person, at a stage when you can&apos;t
                afford either.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div
              className="p-8 rounded"
              style={{
                backgroundColor: '#141414',
                border: '1px solid rgba(232,144,58,0.2)',
              }}
            >
              <div
                className="w-10 h-10 rounded flex items-center justify-center mb-6"
                style={{
                  backgroundColor: 'rgba(232,144,58,0.12)',
                  border: '1px solid rgba(232,144,58,0.3)',
                }}
              >
                <Rocket size={18} color="#E8903A" />
              </div>
              <p
                className="text-lg leading-relaxed"
                style={{ ...SERIF, color: '#F5EFE0', fontStyle: 'italic' }}
              >
                &ldquo;The gap that kills most early startups isn&apos;t the idea or the market —
                it&apos;s the distance between deciding what to build and actually building it.
                I close that gap.&rdquo;
              </p>
              <p className="text-xs mt-6" style={{ ...MONO, color: '#6B6560' }}>
                Hamza Zulquernain · Founder, Zapp Studios
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-0 rounded overflow-hidden"
            style={{ border: '1px solid rgba(245,239,224,0.08)' }}
          >
            {[
              { v: '7-fig', l: 'exit', s: 'DietAI' },
              { v: '50×', l: 'MRR growth', s: 'Royal Pawz · 4 months' },
              { v: '334%', l: 'conversion lift', s: 'A/B tested' },
              { v: '$10K', l: 'MRR', s: 'from $200 at start' },
            ].map((m, i) => (
              <div
                key={m.l}
                className="p-6"
                style={{
                  backgroundColor: '#1C1C1C',
                  borderRight: i < 3 ? '1px solid rgba(245,239,224,0.06)' : undefined,
                }}
              >
                <p
                  className="font-bold leading-none mb-2"
                  style={{
                    ...MONO,
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    color: '#F5EFE0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {m.v}
                </p>
                <p className="text-sm font-semibold" style={{ ...DISPLAY, color: '#A09A8E' }}>
                  {m.l}
                </p>
                <p className="text-xs mt-0.5" style={{ ...MONO, color: '#6B6560' }}>
                  {m.s}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── FAQ ──────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Do I need to have a fully formed idea before reaching out?',
    a: "No. If you have a direction — a problem you want to solve, a space you want to play in — that&apos;s enough to start. Part of what the intro call is for is figuring out how developed the idea is and what the first real step looks like.",
  },
  {
    q: 'Can you build the actual product, not just advise on it?',
    a: "Yes — hands-on building is one of the three engagement shapes. If you need an MVP shipped, that&apos;s something I can scope and do. It won&apos;t be a wireframe handed to someone else.",
  },
  {
    q: 'How does pricing work?',
    a: "It starts with a free intro call. From there I scope the engagement to what you actually need — a focused project, ongoing advisory, or embedded building. The commercial model flexes: retainer, hourly, or equity, or a blend — sized to what the work is and where the company is.",
  },
  {
    q: 'What if I need a CTO but can&apos;t afford one full-time?',
    a: "That&apos;s exactly the fractional model. You get the technical leadership — architecture decisions, stack choices, team oversight, roadmap — without the full-time hire. Most early companies shouldn&apos;t make that hire until the model is proven anyway.",
  },
  {
    q: 'Do you take equity?',
    a: "Sometimes, as part of a blended structure. If the company is at a stage where cash is tight but the opportunity is real, equity can make more sense for both sides. We figure that out together.",
  },
  {
    q: 'How is this different from a startup accelerator or advisor?',
    a: "Most advisors give you an hour a month and a deck full of frameworks. I do the actual work — the positioning, the code, the go-to-market. The difference between advice and output.",
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#141414' }}>
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionLabel>Common Questions</SectionLabel>
          <h2
            className="font-bold mb-16 leading-tight"
            style={{
              ...DISPLAY,
              fontSize: 'clamp(34px, 5vw, 56px)',
              color: '#F5EFE0',
              letterSpacing: '-0.02em',
            }}
          >
            Straight answers.
          </h2>
        </Reveal>

        <div className="flex flex-col gap-2">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 40}>
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
            Tell me what you&apos;re building.
          </h2>
          <p
            className="text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ color: '#A09A8E' }}
          >
            A free intro call — no pitch, no deck. We talk through the idea and whether I&apos;m
            the right person to help. If I&apos;m not, I&apos;ll say so.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-10 py-5 font-bold rounded transition-colors text-base"
            style={{ backgroundColor: '#E8903A', color: '#0C0C0C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
          >
            Book a free intro call
            <ArrowRight size={17} />
          </Link>

          <p className="mt-5 text-xs" style={{ ...MONO, color: '#6B6560' }}>
            Free intro call — we talk through your idea, no pitch.
          </p>
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
      <WhoThisIsFor />
      <WhatIDo />
      <HowItWorks />
      <WhyMe />
      <FAQ />
      <FinalCTA />
      <Footer mode="dark" />
      <StickyCTA href="/book" label="Book a free intro call" />
    </main>
  )
}
