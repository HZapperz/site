'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Zap,
  Code2,
  Brain,
  Rocket,
  Phone,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Linkedin,
  Mail,
  Sparkles,
  Target,
  Lightbulb,
} from 'lucide-react'

// ─── Scroll animation hook ────────────────────────────────────────
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
          <Image src="/logo.jpg" alt="Zapp Studios" width={280} height={80} className="object-contain h-20 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            Services
          </a>
          <a href="#work" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            Our Work
          </a>
          <a href="#how-it-works" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            How It Works
          </a>
          <a href="#faq" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            FAQ
          </a>
          <a href="#ai-class" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            AI Class
          </a>
          <Link
            href="/book"
            className="px-4 py-2 bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white text-sm font-medium rounded-lg transition-colors"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[var(--color-text-secondary)]"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-bg)]/95 backdrop-blur-xl border-b border-[var(--color-border-subtle)]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a href="#services" onClick={() => setMobileOpen(false)} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Services</a>
            <a href="#work" onClick={() => setMobileOpen(false)} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Our Work</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">How It Works</a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">FAQ</a>
            <a href="#ai-class" onClick={() => setMobileOpen(false)} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">AI Class</a>
            <Link href="/book" className="px-4 py-2 bg-[var(--color-orange)] text-white text-sm font-medium rounded-lg text-center">Book a Call</Link>
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
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(var(--color-text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--color-orange)] opacity-[0.04] rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Status pill */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span className="text-xs font-medium text-[var(--color-text-secondary)]">Taking on new projects</span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6" style={{ opacity: 0 }}>
          We build your tech.{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#60A5FA] via-[#7DD3FC] to-[#93C5FD] bg-clip-text text-transparent">
            You grow your business.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up delay-200 max-w-2xl mx-auto text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 leading-relaxed" style={{ opacity: 0 }}>
          Zapp Studios is a technical partner for founders and businesses.
          We build MVPs, integrate AI, and ship products in weeks — for a fraction of the traditional cost.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center" style={{ opacity: 0 }}>
          <Link
            href="/book"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[var(--color-orange)]/20 hover:shadow-[var(--color-orange)]/30"
          >
            Book a Free Strategy Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] text-[var(--color-text-primary)] font-semibold rounded-xl border border-[var(--color-border-default)] transition-all"
          >
            See How It Works
          </a>
        </div>

        {/* Trust stats */}
        <div className="animate-fade-in-up delay-500 mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto" style={{ opacity: 0 }}>
          {[
            { value: '7-Fig', label: 'Exit delivered' },
            { value: '2-12w', label: 'Idea to product' },
            { value: '2-10%', label: 'Equity, not $150K' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">{stat.value}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
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
      icon: DollarSign,
      title: 'Agencies charge $75K–$150K upfront',
      description: 'Most founders and businesses can\'t justify six figures before seeing a single result.',
    },
    {
      icon: Clock,
      title: 'Traditional dev takes 6–12 months',
      description: 'By the time your product launches, the market has already moved on.',
    },
    {
      icon: Users,
      title: 'Freelancers disappear mid-project',
      description: 'No accountability, no ownership. You\'re left managing someone else\'s spaghetti code.',
    },
  ]

  return (
    <section className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-orange)] mb-3 tracking-wider uppercase">The problem</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Building tech shouldn&apos;t drain your bank account
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 100}>
              <div className="h-full p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-orange-glow)] flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-[var(--color-orange)]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{p.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ──────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: Rocket,
      title: 'MVP Development',
      audience: 'For founders',
      description:
        'You have an idea but no technical team. We validate your concept, design it, and build a launch-ready MVP in 2–12 weeks. Instead of paying $100K+ upfront, we take a small equity stake (2–10%) so our success is tied to yours.',
      features: ['Full-stack development', 'Product design & UX', 'Launch-ready in weeks', 'Equity-aligned incentives'],
    },
    {
      icon: Brain,
      title: 'AI Integration',
      audience: 'For businesses',
      description:
        'You know AI can transform your business, but don\'t know where to start. We embed AI directly into your operations — automating workflows, cutting costs, and creating competitive advantages that compound over time.',
      features: ['Workflow automation', 'Custom AI tools', 'Cost reduction analysis', 'Staff training & handoff'],
    },
    {
      icon: Code2,
      title: 'Technical Partnership',
      audience: 'For both',
      description:
        'Not just a vendor — a partner. We stay involved after launch to iterate, scale, and grow with you. Our equity model means we\'re invested in your long-term success, not just shipping and moving on.',
      features: ['Ongoing technical guidance', 'Scaling & optimization', 'Strategic product advice', 'Dedicated team'],
    },
  ]

  return (
    <section id="services" className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-orange)] mb-3 tracking-wider uppercase">What we do</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Two paths, one goal: your success
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Whether you&apos;re a founder with an idea or a business ready for AI, we meet you where you are.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 100}>
              <div className="h-full p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-accent)] transition-all group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-orange-glow)] flex items-center justify-center group-hover:bg-[var(--color-orange)]/20 transition-colors">
                    <s.icon className="w-5 h-5 text-[var(--color-orange)]" />
                  </div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">{s.audience}</span>
                </div>
                <h3 className="text-xl font-bold mt-4 mb-3">{s.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-orange)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300} className="text-center mt-10">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-orange)] hover:text-[var(--color-orange-light)] transition-colors"
          >
            Not sure which path is right? Let&apos;s talk
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── How It Works ──────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Free Strategy Call',
      description:
        'We hop on a 30-minute call to understand your idea or business needs. We\'ll be honest — if we don\'t think it\'ll work, we\'ll tell you. We turn away 80% of projects because we\'d rather save you time than take your money.',
      icon: Phone,
    },
    {
      num: '02',
      title: 'Scope & Structure',
      description:
        'If it\'s a fit, we map out exactly what gets built, the timeline, and the equity/cost structure. Everything is transparent — no surprise invoices, no scope creep. You know what you\'re getting before we write a single line of code.',
      icon: Target,
    },
    {
      num: '03',
      title: 'We Build, You Watch',
      description:
        'Our team ships fast. Weekly demos, constant communication, and a working product that evolves in front of your eyes. MVP in 2–12 weeks depending on complexity.',
      icon: Code2,
    },
    {
      num: '04',
      title: 'Launch & Grow',
      description:
        'We don\'t disappear after launch. Our equity stake means we\'re invested in your success long-term. We help you iterate, scale, and grow — because when you win, we win.',
      icon: TrendingUp,
    },
  ]

  return (
    <section id="how-it-works" className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-orange)] mb-3 tracking-wider uppercase">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            From call to product in four steps
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            No 47-page proposals. No months of &quot;discovery.&quot; Just a clear path from idea to shipped product.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 100}>
              <div className="relative p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] transition-colors h-full">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <span className="text-3xl font-extrabold text-[var(--color-orange)]/20 font-mono">{step.num}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-4 h-4 text-[var(--color-orange)]" />
                      <h3 className="text-lg font-bold">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Case Studies ──────────────────────────────────────────────────
function CaseStudies() {
  const projects = [
    {
      name: 'DietAI',
      tagline: 'AI-powered nutrition tracking',
      description:
        'Consulted early on product strategy and architecture, then joined as a full-stack web and mobile developer to ship the final product before acquisition. Participated in a 7-figure exit — gaining firsthand experience in the ins and outs of scaling a consumer startup to 50K+ users.',
      stats: [
        { label: 'Users', value: '50K+' },
        { label: 'Rating', value: '4.8\u2605' },
        { label: 'Exit', value: '7 Figures' },
        { label: 'Role', value: 'Full-stack' },
      ],
      tech: ['Swift', 'React Native', 'Python', 'AI/ML', 'Firebase'],
      status: '7-Figure Exit',
      statusColor: 'text-[var(--color-orange)]',
    },
    {
      name: 'Royal Pawz USA',
      tagline: 'AI-powered pet grooming platform',
      description:
        'Leveraged AI across the entire business: built the client-facing web app, the admin dashboard to run operations, and used AI for marketing and workflow automation. Now a revenue-generating business growing rapidly month over month.',
      stats: [
        { label: 'Status', value: 'Revenue' },
        { label: 'Growth', value: 'MoM \u2191' },
        { label: 'AI Use', value: 'Full-stack' },
        { label: 'Apps', value: '3 built' },
      ],
      tech: ['Next.js', 'React Native', 'PostgreSQL', 'Stripe', 'Golang'],
      status: 'Live & Growing',
      statusColor: 'text-[var(--color-success)]',
      url: 'https://royalpawzusa.com',
    },
    {
      name: 'B2B SaaS Platform',
      tagline: 'Enterprise solution \u00B7 Under NDA',
      description:
        'Built a fully functional proof-of-concept over 3 months for an enterprise B2B SaaS product. The business team is now raising funding to build the full platform. Enterprise SaaS is a different beast — months of security audits, compliance requirements, and infrastructure that consumer apps never touch. That\'s why it requires real funding and a partner who understands the difference.',
      stats: [
        { label: 'Timeline', value: '3 months' },
        { label: 'Stage', value: 'POC done' },
        { label: 'Next', value: 'Raising' },
        { label: 'Type', value: 'Enterprise' },
      ],
      tech: ['React', 'Python', 'Golang', 'PostgreSQL', 'Security Audits'],
      status: 'Under NDA',
      statusColor: 'text-[var(--color-text-muted)]',
    },
  ]

  return (
    <section id="work" className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-orange)] mb-3 tracking-wider uppercase">Our work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Real products, real results
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            We don&apos;t show mockups. These are live products with real users and real revenue.
          </p>
        </AnimatedSection>

        {/* Top row: two cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.slice(0, 2).map((project, i) => (
            <AnimatedSection key={project.name} delay={i * 150}>
              <div className="h-full p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{project.tagline}</p>
                  </div>
                  <span className={`text-xs font-mono font-semibold ${project.statusColor} px-3 py-1 rounded-full bg-[var(--color-bg-elevated)] shrink-0 ml-3`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="grid grid-cols-4 gap-3 mb-6">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-lg bg-[var(--color-bg-elevated)]">
                      <div className="text-sm font-bold">{stat.value}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
                      {t}
                    </span>
                  ))}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-xs text-[var(--color-orange)] hover:text-[var(--color-orange-light)]"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom row: third card centered */}
        <div className="max-w-2xl mx-auto mt-6">
          {projects.slice(2).map((project, i) => (
            <AnimatedSection key={project.name} delay={300}>
              <div className="h-full p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{project.tagline}</p>
                  </div>
                  <span className={`text-xs font-mono font-semibold ${project.statusColor} px-3 py-1 rounded-full bg-[var(--color-bg-elevated)] shrink-0 ml-3`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="grid grid-cols-4 gap-3 mb-6">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-lg bg-[var(--color-bg-elevated)]">
                      <div className="text-sm font-bold">{stat.value}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing Model ─────────────────────────────────────────────────
function PricingModel() {
  return (
    <section className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-orange)] mb-3 tracking-wider uppercase">Our model</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            We only win when you win
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Instead of charging six figures upfront, we take a small equity stake. This aligns our incentives completely — we&apos;re not just building your product, we&apos;re investing in it.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Traditional */}
              <div className="p-8 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]">
                <div className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Traditional Agency</div>
                <div className="space-y-4">
                  {[
                    '$75K–$150K upfront',
                    '6–12 months to launch',
                    'Bill by the hour — slow = more $$$',
                    'Gone after handoff',
                    'Zero skin in the game',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                      <span className="text-red-400 mt-0.5 shrink-0">{'\u2715'}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Zapp */}
              <div className="p-8 rounded-2xl border border-[var(--color-border-accent)] bg-[var(--color-bg-card)] relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-[var(--color-orange)] text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-lg">
                  Our Model
                </div>
                <div className="text-xs font-mono text-[var(--color-orange)] uppercase tracking-wider mb-4">Zapp Studios</div>
                <div className="space-y-4">
                  {[
                    'Low upfront cost + 2–10% equity',
                    '2–12 weeks to launch',
                    'Fast shipping = aligned incentives',
                    'Long-term partnership',
                    '100% skin in the game',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                      <span className="text-[var(--color-success)] mt-0.5 shrink-0">{'\u2713'}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Explanation */}
            <AnimatedSection delay={200}>
              <div className="p-6 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-center">
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  <span className="font-semibold text-[var(--color-text-primary)]">How it works:</span>{' '}
                  We charge a reduced hourly rate plus 2–10% equity. The more equity you offer, the lower the upfront cost.
                  This means our incentives are 100% aligned — we build fast, we build well, and we stick around to help you grow.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── AI Class Teaser ───────────────────────────────────────────────
function ClassTeaser() {
  return (
    <section id="ai-class" className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="relative p-10 md:p-14 rounded-2xl bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-orange)] opacity-[0.03] rounded-full blur-[80px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-[var(--color-border-accent)] bg-[var(--color-orange-glow)]">
                <Lightbulb className="w-3.5 h-3.5 text-[var(--color-orange)]" />
                <span className="text-xs font-medium text-[var(--color-orange)]">Coming Soon</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Monthly AI Class
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto mb-8">
                Learn how to leverage AI in your business and products. Practical, hands-on sessions taught by someone who actually builds with AI every day. Details coming soon.
              </p>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeCckl4XvgHeIAwdkL-dAKLwbRZNz-D1IBbKDV9zCT1tHQSkA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] text-[var(--color-text-primary)] font-medium rounded-xl border border-[var(--color-border-default)] transition-all text-sm"
              >
                Join the Waitlist
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What does "equity partnership" actually mean?',
      a: 'Instead of charging you $100K+ upfront, we take a small ownership stake (2–10%) in your company or product. This means we invest our time and expertise at a reduced cost, and we only see a real return if your business succeeds. It aligns our goals completely — we want you to win as much as you do.',
    },
    {
      q: 'Why do you turn away 80% of projects?',
      a: 'Because we\'d rather be honest than take your money. If we don\'t believe your idea has strong market potential, or if the timing isn\'t right, we\'ll tell you. We\'ll even give you feedback on what would need to change. Our reputation is built on results, not volume.',
    },
    {
      q: 'How fast can you actually ship an MVP?',
      a: 'Most MVPs launch in 2–12 weeks depending on complexity. A simple web app might be 2–4 weeks. A mobile app with AI features might be 8–12 weeks. We\'ll give you an honest timeline on our first call — and we stick to it.',
    },
    {
      q: 'What technologies do you work with?',
      a: 'We\'re full-stack and AI-native. Our core stack includes React, Next.js, React Native, Python, Golang, and various AI/ML frameworks. But we pick the right tool for the job — not the trendiest one.',
    },
    {
      q: 'What if my idea needs changes after launch?',
      a: 'That\'s expected and encouraged. Because we\'re equity partners, we stay involved post-launch. We help you iterate based on real user feedback, optimize performance, and scale as you grow. We\'re not a build-and-run shop.',
    },
    {
      q: 'I\'m a business, not a startup. Can you still help?',
      a: 'Absolutely. We work with established businesses to integrate AI into existing operations — automating workflows, building internal tools, reducing costs, and creating competitive advantages. The equity model can be adapted or we can discuss project-based pricing for businesses.',
    },
  ]

  return (
    <section id="faq" className="py-24 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-mono font-medium text-[var(--color-orange)] mb-3 tracking-wider uppercase">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Questions we get asked
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 50}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-default)] transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-sm">{faq.q}</span>
                  {openIndex === i ? (
                    <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
                  )}
                </div>
                {openIndex === i && (
                  <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed pr-8">
                    {faq.a}
                  </p>
                )}
              </button>
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
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-[var(--color-orange)]/10 to-transparent border border-[var(--color-border-accent)] text-center overflow-hidden">
            <div className="absolute inset-0 bg-[var(--color-bg-card)] -z-10" />

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to build?
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto mb-8">
              Book a free 30-minute strategy call. We&apos;ll be honest about whether we can help — and if we can&apos;t, we&apos;ll point you in the right direction.
            </p>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[var(--color-orange)]/20 hover:shadow-[var(--color-orange)]/30 text-lg"
            >
              Book a Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-xs text-[var(--color-text-muted)] mt-4">
              No commitment. No sales pitch. Just an honest conversation.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Image src="/logo.jpg" alt="Zapp Studios" width={160} height={44} className="object-contain h-11 w-auto" />
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/hamza-zulquernain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:hamzazulquernain1@gmail.com"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Zapp Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Services />
      <HowItWorks />
      <CaseStudies />
      <PricingModel />
      <ClassTeaser />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
