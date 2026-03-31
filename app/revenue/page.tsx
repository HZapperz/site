'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowDown,
  TrendingUp,
  BarChart2,
  Target,
  FlaskConical,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Users,
  Activity,
  Eye,
  Lightbulb,
  Monitor,
  CreditCard,
  Mail,
  Linkedin,
  CheckCircle2,
} from 'lucide-react'

// ─── Scroll animation hook ─────────────────────────────────────────
function useInView(threshold = 0.15) {
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
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/90 backdrop-blur-xl border-b border-[var(--color-border-subtle)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between overflow-visible">
        <Link href="/" className="flex items-center group">
          <Image src="/logo.png" alt="Zapp Studios" width={280} height={80} className="object-contain h-20 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
          <a href="#how-it-works" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">The Method</a>
          <a href="#audit" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">The Audit</a>
          <a href="#pricing" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Pricing</a>
          <Link href="/book" className="px-4 py-2 bg-[var(--color-success)] hover:bg-[#16a34a] text-white text-sm font-medium rounded-lg transition-colors">
            Book a Call
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-[var(--color-text-secondary)]" aria-label="Toggle menu">
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-[var(--color-border-subtle)]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-base text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Home</Link>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-base text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">The Method</a>
            <a href="#audit" onClick={() => setMobileOpen(false)} className="text-base text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">The Audit</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="text-base text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Pricing</a>
            <Link href="/book" className="px-4 py-3 bg-[var(--color-success)] text-white text-base font-medium rounded-lg text-center">Book a Call</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(var(--color-text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--color-success)] opacity-[0.05] rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20 text-center">
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-[var(--color-success)]/25 bg-[var(--color-success)]/8">
          <TrendingUp className="w-4 h-4 text-[var(--color-success)]" />
          <span className="text-sm font-medium text-[var(--color-success)]">For businesses with existing products</span>
        </div>

        <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6" style={{ opacity: 0 }}>
          More revenue.{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#86EFAC] bg-clip-text text-transparent">
            Same traffic.
          </span>
        </h1>

        <p className="animate-fade-in-up delay-200 max-w-2xl mx-auto text-xl md:text-2xl text-[var(--color-text-secondary)] mb-10 leading-relaxed" style={{ opacity: 0 }}>
          You have a product. People visit. Most don&apos;t pay.
          We find out why - and we fix it.
        </p>

        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center" style={{ opacity: 0 }}>
          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-success)] hover:bg-[#16a34a] text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-[var(--color-success)]/20 hover:shadow-[var(--color-success)]/30"
          >
            Get Your Audit - $500
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] text-[var(--color-text-primary)] text-lg font-semibold rounded-xl border border-[var(--color-border-default)] transition-all"
          >
            See How It Works
          </a>
        </div>

        <div className="animate-fade-in-up delay-500 mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto" style={{ opacity: 0 }}>
          {[
            { value: '5x', label: 'ROAS achieved' },
            { value: '$500', label: 'Intro audit price' },
            { value: '1 Week', label: 'Audit turnaround' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-success)]">{stat.value}</div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
      </div>
    </section>
  )
}

// ─── Problem ───────────────────────────────────────────────────────
function Problem() {
  const problems = [
    {
      icon: BarChart2,
      title: "You're flying blind",
      description: "No data means no direction. If you can't see where users are dropping off, you can't fix it. Every day without tracking is revenue you'll never get back.",
    },
    {
      icon: Users,
      title: 'Users sign up and disappear',
      description: "Most businesses lose 70-90% of users before they ever reach their 'aha moment.' The onboarding gap is where revenue dies - and most founders never even measure it.",
    },
    {
      icon: Target,
      title: 'More ads, same results',
      description: "Pouring budget into a leaky funnel just accelerates your losses. Until the conversion problem is fixed, scaling ad spend makes things worse - not better.",
    },
  ]

  return (
    <section className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-success)] mb-3 tracking-wider uppercase">The real problem</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Most businesses chase more traffic.<br className="hidden md:block" />
            The smarter move is converting what you have.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {problems.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 100}>
              <div className="h-full p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-success)]/10 flex items-center justify-center mb-5">
                  <p.icon className="w-6 h-6 text-[var(--color-success)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">{p.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* The math */}
        <AnimatedSection delay={300}>
          <div className="relative p-8 md:p-10 rounded-2xl border border-[var(--color-success)]/20 bg-[var(--color-bg-card)] overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[var(--color-success)] opacity-[0.04] rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-mono font-medium text-[var(--color-success)] mb-8 tracking-wider uppercase">The math is simple</p>

              {/* Before / After boxes - always side by side */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 text-center px-4 py-5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                  <p className="text-sm text-[var(--color-text-muted)] mb-2">Before</p>
                  <p className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">$10K</p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-2">1% conversion</p>
                </div>
                <div className="flex flex-col items-center gap-1 shrink-0 text-[var(--color-text-muted)]">
                  <ArrowRight className="w-5 h-5 hidden sm:block" />
                  <ArrowDown className="w-5 h-5 sm:hidden" />
                  <p className="text-xs font-mono text-center">5x</p>
                </div>
                <div className="flex-1 text-center px-4 py-5 rounded-xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/25">
                  <p className="text-sm text-[var(--color-success)] mb-2">After</p>
                  <p className="text-3xl md:text-4xl font-bold text-[var(--color-success)]">$50K</p>
                  <p className="text-sm text-[var(--color-success)]/70 mt-2">5% conversion</p>
                </div>
              </div>

              {/* Delta */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-6 border-t border-[var(--color-border-subtle)]">
                <p className="text-4xl md:text-5xl font-extrabold text-[var(--color-success)]">+$40,000</p>
                <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  in revenue you would have previously never seen - from the <em>same</em> 100,000 visitors.
                </p>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mt-4">
                Buying more traffic is expensive. Improving conversion is leverage. That&apos;s what Revenue Engineering does.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── The Method ────────────────────────────────────────────────────
function TheMethod() {
  const steps = [
    {
      num: '01',
      icon: Eye,
      title: 'Observe',
      description: "We start with your data - analytics, heatmaps, session recordings, funnels. If tracking isn't set up, we add it first.",
    },
    {
      num: '02',
      icon: Lightbulb,
      title: 'Hypothesize',
      description: "Based on what the data shows, we form hypotheses about what's causing friction. Psychology-backed reasoning, not gut feelings.",
    },
    {
      num: '03',
      icon: FlaskConical,
      title: 'Test',
      description: "We design specific, measurable changes - A/B tests, UI modifications, copy, flow restructuring. One variable at a time so we know exactly what moved the needle.",
    },
    {
      num: '04',
      icon: BarChart2,
      title: 'Measure',
      description: "We track outcomes against baselines. If something didn't move the number, we learn from it and iterate - not abandon ship.",
    },
    {
      num: '05',
      icon: TrendingUp,
      title: 'Scale',
      description: "What works gets doubled down on. What doesn't gets cut. This is a continuous loop - not a one-time report you file away and forget.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-success)] mb-3 tracking-wider uppercase">The approach</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            The scientific method,<br className="hidden md:block" /> applied to your revenue
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            No guesswork. No opinions without data. We follow the same process researchers use to test hypotheses - because that&apos;s the only way to know what&apos;s actually working.
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 80}>
              <div className="flex gap-5 md:gap-8 items-start p-6 md:p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-success)]/20 transition-all group">
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--color-success)]/10 flex items-center justify-center group-hover:bg-[var(--color-success)]/20 transition-colors">
                    <step.icon className="w-7 h-7 text-[var(--color-success)]" />
                  </div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">{step.num}</span>
                </div>
                <div className="pt-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── What We Audit ─────────────────────────────────────────────────
function WhatWeAudit() {
  const areas = [
    {
      icon: Monitor,
      title: 'Landing Page & First Impression',
      items: ['Hero messaging & value clarity', 'CTA placement and copy', 'Social proof & trust signals', 'Page load speed & mobile UX', 'Ad-to-landing page message match'],
    },
    {
      icon: Users,
      title: 'Onboarding Flow',
      items: ['Steps to first value (time-to-value)', 'Friction and drop-off identification', 'Activation trigger mapping', 'Email sequence & timing', 'Aha moment optimization'],
    },
    {
      icon: DollarSign,
      title: 'Paywall & Pricing',
      items: ['Pricing psychology & anchoring', 'Plan structure & tier design', 'Free trial vs. freemium fit', 'Upgrade flow friction', 'Objection handling in UI'],
    },
    {
      icon: CreditCard,
      title: 'Checkout & Conversion',
      items: ['Payment flow UX', 'Form field reduction', 'Trust signals at checkout', 'Abandonment triggers', 'Post-purchase experience'],
    },
    {
      icon: Target,
      title: 'Marketing & Ad Strategy',
      items: ['Ad channel fit analysis', 'Google Ads structure & bidding', 'Audience targeting review', 'ROAS & attribution analysis', 'Custom strategy per channel'],
    },
    {
      icon: BarChart2,
      title: 'Analytics & Tracking',
      items: ['Funnel tracking setup', 'Event & goal configuration', 'Heatmap & session recording', 'Cohort & retention analysis', 'Dashboard setup (if missing)'],
    },
  ]

  return (
    <section id="audit" className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-success)] mb-3 tracking-wider uppercase">What&apos;s covered</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Every touchpoint. No guessing.
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            The audit covers everything a potential paying customer interacts with - from the first ad impression to the moment they pull out their credit card.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <AnimatedSection key={area.title} delay={i * 70}>
              <div className="h-full p-7 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-success)]/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-success)]/10 flex items-center justify-center mb-5">
                  <area.icon className="w-6 h-6 text-[var(--color-success)]" />
                </div>
                <h3 className="text-lg font-bold mb-4">{area.title}</h3>
                <ul className="space-y-3">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base text-[var(--color-text-secondary)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Proof ─────────────────────────────────────────────────────────
function Proof() {
  return (
    <section className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-success)] mb-3 tracking-wider uppercase">Proof it works</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Not theory. Real results.
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative p-8 md:p-12 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-success)]/20 overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-[var(--color-success)] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" />
            <div className="relative flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              {/* Stats */}
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-extrabold text-[var(--color-success)]">2x</div>
                  <div className="text-sm text-[var(--color-text-muted)] mt-2">ROAS at launch</div>
                </div>
                <ArrowRight className="w-6 h-6 text-[var(--color-text-muted)]" />
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-extrabold text-[var(--color-success)]">5x</div>
                  <div className="text-sm text-[var(--color-text-muted)] mt-2">ROAS in 3 months</div>
                </div>
              </div>

              {/* Story */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Royal Pawz USA</h3>
                <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  Came on as an equity partner and did exactly what Revenue Engineering is: audited the full onboarding flow, identified the friction points, recommended changes, and executed on them. Now running weekly A/B tests - and the numbers keep climbing.
                </p>
                <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  2x ROAS at launch. 5x ROAS three months later. Not a lucky campaign - the result of a repeatable process applied consistently.
                </p>
                <div className="mt-6 inline-flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                  <TrendingUp className="w-5 h-5 text-[var(--color-success)] shrink-0" />
                  <p className="text-base text-[var(--color-text-muted)]">
                    Want the full breakdown?{' '}
                    <Link href="/book" className="text-[var(--color-success)] hover:underline font-medium">
                      Book a call and I&apos;ll walk you through it.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── Who It's For ──────────────────────────────────────────────────
function WhoItsFor() {
  const fits = [
    { icon: DollarSign, text: 'You have at least $1 of real revenue, or 50+ genuine user signups' },
    { icon: Users, text: 'You have an actual product - SaaS, mobile app, e-commerce, service business, anything' },
    { icon: Target, text: "You feel like you should be converting more but can't pinpoint exactly why" },
    { icon: BarChart2, text: "You're spending on ads but not seeing a clear return on that spend" },
    { icon: Activity, text: "You're willing to share real data - analytics dashboards, ad accounts, funnels" },
  ]

  const notFits = [
    "You don't have a product yet (see our MVP Development service)",
    "You're not willing to share data or grant access",
    'You want guaranteed results without the testing process',
  ]

  return (
    <section className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-success)] mb-3 tracking-wider uppercase">Who it&apos;s for</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Industry-agnostic. Results-focused.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-success)]/20 h-full">
              <h3 className="text-sm font-bold mb-8 text-[var(--color-success)] uppercase tracking-wider font-mono">Good fit</h3>
              <ul className="space-y-5">
                {fits.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-success)]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-[var(--color-success)]" />
                    </div>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed pt-1.5">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] h-full flex flex-col">
              <h3 className="text-sm font-bold mb-8 text-[var(--color-text-muted)] uppercase tracking-wider font-mono">Not the right fit</h3>
              <ul className="space-y-5 flex-1">
                {notFits.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)]/40 shrink-0 mt-2.5" />
                    <p className="text-base text-[var(--color-text-muted)] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Pre-product?{' '}
                  <Link href="/" className="text-[var(--color-orange)] hover:underline font-medium">
                    Our MVP Development service
                  </Link>{' '}
                  is probably the better fit.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ───────────────────────────────────────────────────────
function Pricing() {
  const deliverables = [
    'Full written audit report with annotated screenshots',
    'UI modification suggestions and mockups',
    'Marketing and ad strategy review',
    'Analytics & tracking setup (if missing)',
    'Priority fix list - quick wins first',
    'Option to have us implement it for you',
  ]

  return (
    <section id="pricing" className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-success)] mb-3 tracking-wider uppercase">The offer</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Simple pricing. Serious results.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Audit card */}
          <AnimatedSection>
            <div className="h-full relative p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-success)]/30 overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1.5 bg-[var(--color-success)] rounded-bl-xl rounded-tr-2xl">
                <span className="text-xs font-bold text-white tracking-wide">LIMITED INTRO OFFER</span>
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[var(--color-success)] opacity-[0.05] rounded-full blur-[60px] pointer-events-none" />

              <div className="relative">
                <p className="text-xs font-mono text-[var(--color-success)] mb-5 tracking-wider uppercase">Revenue Audit</p>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-6xl font-extrabold text-[var(--color-text-primary)]">$500</span>
                  <span className="text-base text-[var(--color-text-muted)] mb-3 line-through">$5,000</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-8">One-time. No retainer. No commitment.</p>

                <ul className="space-y-4 mb-8">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base text-[var(--color-text-secondary)]">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book"
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-success)] hover:bg-[#16a34a] text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-[var(--color-success)]/20"
                >
                  Book Your Audit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Long-term partnership card */}
          <AnimatedSection delay={100}>
            <div className="h-full p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] transition-all flex flex-col">
              <p className="text-xs font-mono text-[var(--color-text-muted)] mb-5 tracking-wider uppercase">Long-Term Partner</p>
              <span className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-2">Equity-first</span>
              <p className="text-sm text-[var(--color-text-muted)] mb-8">Or a cash arrangement if equity isn&apos;t on the table.</p>

              <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-5 flex-1">
                If the audit reveals significant upside and we&apos;re a good fit, I&apos;d love to come on as a long-term revenue partner. Ongoing optimization, implementation, ad management, and growth strategy - with real skin in the game.
              </p>

              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-8">
                The $500 audit is step one. If it makes sense to continue, we&apos;ll structure something that works for both of us.
              </p>

              <Link
                href="/book"
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-bg-card-hover)] hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] text-lg font-semibold rounded-xl border border-[var(--color-border-default)] transition-all"
              >
                Let&apos;s Talk
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What do I need to provide for the audit?',
      a: "Access to your analytics (Google Analytics, Mixpanel, Amplitude, or whatever you use), any ad accounts you're running, and a walkthrough of your product. If you don't have tracking set up, we'll add it first - getting tracking in place is part of the service.",
    },
    {
      q: 'How long does the audit take?',
      a: "Once we have all the necessary data and access, the audit itself takes up to one week. Gathering data can sometimes take longer depending on your setup - we'll be upfront about the timeline from day one.",
    },
    {
      q: 'What does the deliverable actually look like?',
      a: "A detailed written report with annotated screenshots of your product and landing pages, specific UI modification suggestions, a marketing strategy review, and a priority-ranked recommendation list (quick wins first). Clear enough that you could implement it yourself - or we can do it together.",
    },
    {
      q: 'Can you implement the changes after the audit?',
      a: "Yes. Changes to your ad portal (Google Ads, Meta) will be detailed enough in the report that you can do them yourself. If the changes require codebase work, I can handle that too. We'll figure out the right arrangement depending on scope and what makes sense for both parties.",
    },
    {
      q: 'Why is the audit only $500 when it normally costs $5,000?',
      a: "Honestly - I'm looking for businesses I can partner with long-term. The $500 audit is how I find them. If the audit reveals real upside and we're a good fit, I'd love to continue as an equity partner. But the audit is genuinely valuable on its own regardless of what comes next.",
    },
    {
      q: 'What industries do you work with?',
      a: "All of them. Revenue engineering principles apply whether you're a SaaS product, e-commerce brand, mobile app, local service business, or anything in between. The specific tactics differ, but the process - data, hypothesis, test, measure - is universal.",
    },
    {
      q: "What if I don't see results after implementing the recommendations?",
      a: "Every recommendation will be grounded in real data from your actual users - not generic best practices copy-pasted from a blog post. That said, testing takes iteration. The first change isn't always the winner. The commitment is to the process, not a single swing.",
    },
  ]

  return (
    <section id="faq" className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-success)] mb-3 tracking-wider uppercase">FAQ</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Common questions</h2>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 40}>
              <div className="rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-base md:text-lg">{faq.q}</span>
                  {openIndex === i ? (
                    <ChevronUp className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" />
                  )}
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6">
                    <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ─────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <AnimatedSection>
          <div className="relative p-10 md:p-16 rounded-3xl bg-[var(--color-bg-card)] border border-[var(--color-success)]/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-success)]/[0.06] via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-success)] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" />

            <div className="relative">
              <p className="text-sm font-mono font-medium text-[var(--color-success)] mb-4 tracking-wider uppercase">Ready to grow?</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
                Stop guessing.<br />Start engineering.
              </h2>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
                Book a free strategy call. We&apos;ll talk about your product, what you&apos;re seeing in the data, and whether a Revenue Engineering engagement makes sense.
              </p>
              <Link
                href="/book"
                className="group inline-flex items-center gap-2 px-10 py-4 bg-[var(--color-success)] hover:bg-[#16a34a] text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-[var(--color-success)]/20 hover:shadow-[var(--color-success)]/30"
              >
                Book a Free Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="text-sm text-[var(--color-text-muted)] mt-5">No commitment. No sales pitch. Just an honest conversation.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
          <Link href="/" className="text-base text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
            &larr; Back to Zapp Studios
          </Link>
          <span className="text-[var(--color-border-default)] hidden md:block">·</span>
          <p className="text-base text-[var(--color-text-muted)]">Revenue Engineering by Zapp Studios</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://linkedin.com/in/hamza-zulquernain"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:hamzazulquernain1@gmail.com"
            className="p-2.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function RevenuePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <TheMethod />
      <WhatWeAudit />
      <Proof />
      <WhoItsFor />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
