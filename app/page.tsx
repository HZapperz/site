'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Code,
  Rocket,
  Zap,
  ArrowRight,
  Search,
  CheckCircle,
  Handshake,
  TrendingUp,
  Clock,
  Target,
  Bot,
  DollarSign,
  Smartphone,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Utensils,
  Briefcase,
} from 'lucide-react'

// ============================================
// COLOR CONSTANTS
// ============================================
const colors = {
  // Backgrounds
  bgDark: '#0A0A0B',
  bgLight: '#F8FAFC',
  surfaceDark: '#1E293B',
  surfaceLight: '#FFFFFF',

  // Brand - Teal
  primary: '#0D9488',
  primaryLight: '#14B8A6',
  primaryDark: '#0F766E',

  // CTA - Orange
  cta: '#F97316',
  ctaHover: '#FB923C',

  // Text
  textLight: '#F8FAFC',
  textLightSecondary: '#94A3B8',
  textDark: '#0F172A',
  textDarkSecondary: '#475569',
  textMuted: '#64748B',

  // Status
  success: '#10B981',
  error: '#EF4444',

  // Borders
  borderDark: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(0, 0, 0, 0.1)',
  borderAccent: 'rgba(13, 148, 136, 0.3)',
}

// ============================================
// DATA
// ============================================
const services = [
  {
    title: 'Discovery Session',
    price: 'Free',
    description: '30-minute honest assessment of your idea',
    features: ['Market evaluation', 'Technical feasibility', 'Pivot recommendations'],
    cta: 'Book a Call',
    featured: false,
  },
  {
    title: 'Validation Sprint',
    price: '$500-5,000',
    description: 'Deep market validation before building',
    features: ['20+ customer interviews', 'Competitor analysis', 'Go/no-go recommendation'],
    cta: 'Start Validation',
    featured: false,
  },
  {
    title: 'Venture Partnership',
    price: '20-50% Equity',
    description: 'Full partnership from validation to MVP and beyond',
    features: ['End-to-end development', 'Ongoing technical guidance', 'Success tied together'],
    cta: 'Become Partners',
    featured: true,
  },
  {
    title: 'Build Track',
    price: '2-5% Equity',
    description: 'For validated ideas or funded startups',
    features: ['4-12 week sprints', 'Launch-ready product', 'Technical mentorship'],
    cta: 'Start Building',
    featured: false,
  },
]

const processSteps = [
  { icon: Search, title: 'Discovery', description: 'We give you an honest assessment of your idea' },
  { icon: CheckCircle, title: 'Validation', description: '3-week sprint to validate market fit' },
  { icon: Handshake, title: 'Partnership', description: 'Custom deal structure that works for both' },
  { icon: Zap, title: 'Build', description: '2-12 weeks to MVP using AI-native development' },
  { icon: TrendingUp, title: 'Scale', description: 'Ongoing support as you grow' },
]

const launchedProjects = [
  { title: 'Royal Pawz', subtitle: 'Pet Grooming Platform', icon: ShoppingBag, tags: ['Next.js', 'React Native', 'PostgreSQL', 'Stripe', 'Golang'], status: 'Generating Revenue', url: 'https://royalpawzusa.com' },
]

const inDevelopmentProjects = [
  { title: 'B2B SaaS', subtitle: 'Onboarding Platform', icon: Briefcase, tags: ['React Native', 'Python', 'Golang'] },
  { title: 'AI Supply Chain', subtitle: 'Consulting Tool', icon: BarChart3, tags: ['Python', 'AI/ML'] },
  { title: 'Dawn Patrol', subtitle: 'Golf App', icon: Smartphone, tags: ['React Native', 'Firebase', 'Golang'] },
  { title: 'ECS-ChatBot', subtitle: 'University Assistant', icon: MessageSquare, tags: ['LangChain', 'Pinecone', 'Python', 'OpenAI'] },
]

// ============================================
// COMPONENT
// ============================================
export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main>
      {/* Navigation - Dark */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 24px',
        backgroundColor: 'rgba(10, 10, 11, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.borderDark}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ fontSize: '24px', fontWeight: 800, color: colors.textLight, letterSpacing: '-0.5px' }}>
            ZAPP STUDIOS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="#contact" style={{ color: colors.textLightSecondary, fontSize: '14px', display: 'none' }}>
              Contact
            </a>
            <Link href="/book" style={{
              padding: '10px 20px',
              backgroundColor: colors.cta,
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}>
              Start Venture
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dark */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        backgroundColor: colors.bgDark,
      }}>
        {/* Background gradient orbs - Teal */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, rgba(13, 148, 136, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(20, 184, 166, 0.1), transparent)
          `,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 24px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'rgba(13, 148, 136, 0.15)',
            border: `1px solid ${colors.borderAccent}`,
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
            color: colors.primaryLight,
            letterSpacing: '1px',
            marginBottom: '24px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.primary }} />
            TECHNICAL VENTURE PARTNERS
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            color: colors.textLight,
          }}>
            Turning Ideas Into<br />
            <span className="gradient-text">Technical Realities</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: colors.textLightSecondary,
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            We&apos;re technical co-founders who combine development expertise with business strategy.
            From idea validation to funded MVP in weeks, not months.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}>
            <Link href="/book" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              backgroundColor: colors.cta,
              color: '#fff',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '16px',
              transition: 'all 0.2s ease',
            }}>
              Submit Your Venture <ArrowRight size={18} />
            </Link>
            <a href="#services" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              backgroundColor: 'transparent',
              color: colors.textLight,
              border: `1px solid ${colors.borderAccent}`,
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '16px',
              transition: 'all 0.2s ease',
            }}>
              View Process
            </a>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {[
              { icon: Code, text: 'Honest Validation First' },
              { icon: Rocket, text: '2-12 Weeks to MVP' },
              { icon: Zap, text: 'Flexible Deal Structures' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.textLightSecondary, fontSize: '14px' }}>
                <stat.icon size={18} style={{ color: colors.primary }} />
                <span>{stat.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section - Light */}
      <section style={{ padding: '100px 24px', backgroundColor: colors.bgLight, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: `radial-gradient(circle at 80% 20%, rgba(13, 148, 136, 0.08) 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
              WHY WE TELL HARD TRUTHS
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              color: colors.textDark,
              marginBottom: '20px',
              maxWidth: '700px',
              margin: '0 auto 20px',
            }}>
              Most agencies say yes to everything.
              <br />
              <span style={{ color: colors.primary }}>We don&apos;t.</span>
            </h2>
          </div>

          {/* Big quote block */}
          <div style={{
            backgroundColor: colors.bgDark,
            borderRadius: '24px',
            padding: 'clamp(40px, 6vw, 80px)',
            marginBottom: '48px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Quote decoration */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '30px',
              fontSize: '180px',
              fontWeight: 900,
              color: 'rgba(13, 148, 136, 0.1)',
              lineHeight: 1,
              fontFamily: 'Georgia, serif',
              pointerEvents: 'none',
            }}>
              &ldquo;
            </div>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
              <p style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 600,
                color: colors.textLight,
                lineHeight: 1.4,
                marginBottom: '32px',
              }}>
                We&apos;d rather lose a project than watch you waste money on something that won&apos;t work.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Target size={24} style={{ color: '#fff' }} />
                </div>
                <div>
                  <p style={{ color: colors.textLight, fontWeight: 600, fontSize: '16px' }}>Our Core Principle</p>
                  <p style={{ color: colors.textLightSecondary, fontSize: '14px' }}>Honesty over revenue, every time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}>
            {[
              { number: '40%', label: 'of ideas we validate', sublabel: 'don\'t move forward' },
              { number: '2-12', label: 'weeks to MVP', sublabel: 'not months' },
              { number: '100%', label: 'aligned incentives', sublabel: 'equity partnerships' },
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: colors.surfaceLight,
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center',
                border: `1px solid ${colors.borderLight}`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.cta})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '8px',
                }}>
                  {stat.number}
                </div>
                <p style={{ color: colors.textDark, fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                  {stat.label}
                </p>
                <p style={{ color: colors.textMuted, fontSize: '14px' }}>
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>

          {/* What to expect - horizontal cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {[
              { icon: Search, title: 'Honest Assessment', desc: 'Real feedback on your idea' },
              { icon: CheckCircle, title: 'Validate First', desc: 'Before writing code' },
              { icon: Zap, title: 'Ship Fast', desc: 'AI-native development' },
              { icon: Handshake, title: 'Win Together', desc: 'Our success = your success' },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: colors.surfaceLight,
                borderRadius: '12px',
                padding: '24px',
                border: `1px solid ${colors.borderLight}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                transition: 'all 0.2s ease',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(13, 148, 136, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <item.icon size={20} style={{ color: colors.primary }} />
                </div>
                <div>
                  <p style={{ color: colors.textDark, fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                    {item.title}
                  </p>
                  <p style={{ color: colors.textMuted, fontSize: '14px' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed Comparison Section - Dark */}
      <section style={{ padding: '100px 24px', backgroundColor: colors.bgDark }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
            AI-NATIVE DEVELOPMENT
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: colors.textLight,
            marginBottom: '16px',
            lineHeight: 1.2,
            maxWidth: '800px',
          }}>
            You No Longer Wait <span style={{ textDecoration: 'line-through', color: colors.textMuted }}>6-12 Months</span> for Complex Software
          </h2>
          <p style={{ fontSize: '18px', color: colors.textLightSecondary, marginBottom: '48px', maxWidth: '600px' }}>
            My team is AI-native. We think and build differently. Everyone at my company leverages AI to work at 10x speed.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {/* Traditional - Red themed */}
            <div style={{
              backgroundColor: colors.surfaceDark,
              border: `1px solid rgba(239, 68, 68, 0.3)`,
              borderRadius: '16px',
              padding: '32px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Clock size={24} style={{ color: colors.error }} />
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: colors.textLight }}>Traditional Agency</h3>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ height: '8px', backgroundColor: colors.bgDark, borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: colors.error }} />
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, color: colors.textLightSecondary }}>
                <li style={{ marginBottom: '8px' }}>6-12 months timeline</li>
                <li style={{ marginBottom: '8px' }}>$75K-$150K budget</li>
                <li style={{ marginBottom: '8px' }}>Waterfall process</li>
                <li>Hourly billing</li>
              </ul>
            </div>

            {/* Our Approach - Teal themed */}
            <div style={{
              backgroundColor: colors.surfaceDark,
              border: `1px solid rgba(13, 148, 136, 0.5)`,
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 0 30px rgba(13, 148, 136, 0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Zap size={24} style={{ color: colors.primary }} />
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: colors.textLight }}>My Approach</h3>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ height: '8px', backgroundColor: colors.bgDark, borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '25%', height: '100%', background: `linear-gradient(90deg, ${colors.primary}, ${colors.cta})` }} />
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, color: colors.textLightSecondary }}>
                <li style={{ marginBottom: '8px' }}>2-12 weeks timeline</li>
                <li style={{ marginBottom: '8px' }}>$5K-$50K budget</li>
                <li style={{ marginBottom: '8px' }}>AI-native development</li>
                <li>Equity partnership</li>
              </ul>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px',
            marginTop: '48px',
          }}>
            {[
              { value: '2 weeks', label: 'Simple POC' },
              { value: '3 months', label: 'Revenue MVP' },
              { value: '10x', label: 'Faster with AI' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: colors.primary, marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ color: colors.textLightSecondary, fontSize: '14px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{
            backgroundColor: 'rgba(13, 148, 136, 0.1)',
            border: `1px solid ${colors.borderAccent}`,
            borderRadius: '16px',
            padding: '32px',
            marginTop: '48px',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: colors.textLight, marginBottom: '12px' }}>
              The Difference?
            </h3>
            <p style={{ color: colors.textLightSecondary, maxWidth: '600px', margin: '0 auto' }}>
              Aligned incentives. When I take equity, your success becomes my success.
              I&apos;m not trying to maximize billable hours — I&apos;m trying to maximize your outcome.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - Light */}
      <section id="services" style={{ padding: '100px 24px', backgroundColor: colors.bgLight }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
            PARTNERSHIP OPTIONS
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: colors.textDark,
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            Every Founder Starts Somewhere.
          </h2>
          <p style={{ fontSize: '18px', color: colors.textDarkSecondary, marginBottom: '48px', maxWidth: '600px' }}>
            Pricing depends on where you are in your journey...
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}>
            {services.map((service, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: colors.surfaceLight,
                  border: service.featured ? `2px solid ${colors.primary}` : `1px solid ${colors.borderLight}`,
                  borderRadius: '16px',
                  padding: '32px',
                  position: 'relative',
                  boxShadow: service.featured ? `0 0 40px rgba(13, 148, 136, 0.2)` : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              >
                {service.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 16px',
                    backgroundColor: colors.primary,
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#fff',
                  }}>
                    RECOMMENDED
                  </div>
                )}
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: colors.textDark, marginBottom: '8px' }}>
                  {service.title}
                </h3>
                <div style={{ fontSize: '28px', fontWeight: 800, color: colors.primary, marginBottom: '12px' }}>
                  {service.price}
                </div>
                <p style={{ color: colors.textDarkSecondary, fontSize: '14px', marginBottom: '20px' }}>
                  {service.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                  {service.features.map((feature, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textDarkSecondary, fontSize: '14px', marginBottom: '8px' }}>
                      <CheckCircle size={14} style={{ color: colors.success }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: service.featured ? colors.cta : 'transparent',
                    border: service.featured ? 'none' : `1px solid ${colors.primary}`,
                    borderRadius: '8px',
                    color: service.featured ? '#fff' : colors.primary,
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Dark */}
      <section style={{ padding: '100px 24px', backgroundColor: colors.bgDark, position: 'relative', overflow: 'hidden' }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: `radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
              HOW IT WORKS
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: colors.textLight,
              marginBottom: '20px',
            }}>
              From idea to launch in<br />
              <span style={{ color: colors.primary }}>5 clear steps</span>
            </h2>
            <p style={{ color: colors.textLightSecondary, fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
              Validation before code. Partnership over transactions.
            </p>
          </div>

          {/* Process Steps - Card Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '60px',
          }}>
            {[
              { icon: Search, title: 'Discovery', desc: 'Honest assessment of your idea', duration: '1 call', color: colors.primary },
              { icon: CheckCircle, title: 'Validation', desc: 'Sprint to validate market fit', duration: '2-3 weeks', color: '#10B981' },
              { icon: Handshake, title: 'Partnership', desc: 'Deal structure that works', duration: '1 week', color: '#3B82F6' },
              { icon: Zap, title: 'Build', desc: 'AI-native development', duration: '2-12 weeks', color: colors.cta },
              { icon: TrendingUp, title: 'Scale', desc: 'Ongoing growth support', duration: 'Ongoing', color: '#8B5CF6' },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} style={{
                  backgroundColor: colors.surfaceDark,
                  borderRadius: '20px',
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${colors.borderDark}`,
                  transition: 'all 0.3s ease',
                }}>
                  {/* Step number */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '10px',
                    fontSize: '100px',
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.03)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}>
                    {i + 1}
                  </div>

                  {/* Icon with colored background */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)`,
                    border: `1px solid ${step.color}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <Icon size={26} style={{ color: step.color }} />
                  </div>

                  {/* Step indicator */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    backgroundColor: `${step.color}15`,
                    borderRadius: '20px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: step.color }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: step.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Step {i + 1}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: colors.textLight,
                    marginBottom: '10px',
                  }}>
                    {step.title}
                  </h3>

                  <p style={{
                    color: colors.textLightSecondary,
                    fontSize: '15px',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}>
                    {step.desc}
                  </p>

                  {/* Duration badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: colors.bgDark,
                    borderRadius: '8px',
                    border: `1px solid ${colors.borderDark}`,
                  }}>
                    <Clock size={14} style={{ color: colors.textMuted }} />
                    <span style={{ fontSize: '13px', color: colors.textMuted, fontWeight: 500 }}>
                      {step.duration}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progress bar */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto 60px',
            padding: '0 20px',
          }}>
            <div style={{
              height: '4px',
              backgroundColor: colors.surfaceDark,
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                background: `linear-gradient(90deg, ${colors.primary}, #10B981, #3B82F6, ${colors.cta}, #8B5CF6)`,
                borderRadius: '2px',
              }} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '12px',
            }}>
              <span style={{ fontSize: '12px', color: colors.textMuted }}>Start</span>
              <span style={{ fontSize: '12px', color: colors.textMuted }}>2-12 weeks total</span>
              <span style={{ fontSize: '12px', color: colors.textMuted }}>Launch</span>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            textAlign: 'center',
            backgroundColor: colors.surfaceDark,
            borderRadius: '24px',
            padding: '48px 32px',
            border: `1px solid ${colors.borderDark}`,
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: colors.textLight,
              marginBottom: '12px',
            }}>
              Ready to start your journey?
            </h3>
            <p style={{ color: colors.textLightSecondary, marginBottom: '28px', fontSize: '16px' }}>
              Book a free discovery call — we&apos;ll give you an honest assessment.
            </p>
            <Link href="/book" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              backgroundColor: colors.cta,
              color: '#fff',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '16px',
              boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
            }}>
              Book a Free Call <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section - Light */}
      <section style={{ padding: '100px 24px', backgroundColor: colors.bgLight }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
            CURRENT VENTURES
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: colors.textDark,
            marginBottom: '16px',
          }}>
            Projects we&apos;re building right now
          </h2>
          <p style={{ fontSize: '18px', color: colors.textDarkSecondary, marginBottom: '48px', maxWidth: '600px' }}>
            From validation to launch — here&apos;s what we&apos;re working on with our partners.
          </p>

          {/* MVP Launched Section */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                padding: '6px 12px',
                backgroundColor: colors.success,
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                MVP Launched
              </div>
              <div style={{ height: '1px', flex: 1, backgroundColor: colors.borderLight }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}>
              {launchedProjects.map((project, i) => {
                const Icon = project.icon
                return (
                  <a
                    key={i}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: colors.surfaceLight,
                      border: `2px solid ${colors.success}`,
                      borderRadius: '16px',
                      padding: '32px',
                      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
                      position: 'relative',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    {/* Revenue badge */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '4px 10px',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      border: `1px solid ${colors.success}`,
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: colors.success,
                    }}>
                      {project.status}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: `linear-gradient(135deg, ${colors.success}, #34D399)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon size={28} style={{ color: '#fff' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: colors.textDark }}>{project.title}</h3>
                        <p style={{ fontSize: '14px', color: colors.textDarkSecondary }}>{project.subtitle}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {project.tags.map((tag, j) => (
                        <span key={j} style={{
                          padding: '4px 10px',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: colors.textDarkSecondary,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Visit link */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: colors.success,
                      fontSize: '14px',
                      fontWeight: 600,
                    }}>
                      Visit Site <ArrowRight size={16} />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* In Development Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                padding: '6px 12px',
                backgroundColor: colors.cta,
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                In Development
              </div>
              <div style={{ height: '1px', flex: 1, backgroundColor: colors.borderLight }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}>
              {inDevelopmentProjects.map((project, i) => {
                const Icon = project.icon
                return (
                  <div key={i} style={{
                    backgroundColor: colors.surfaceLight,
                    border: `1px solid ${colors.borderLight}`,
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon size={22} style={{ color: colors.cta }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.textDark }}>{project.title}</h3>
                        <p style={{ fontSize: '13px', color: colors.textDarkSecondary }}>{project.subtitle}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {project.tags.map((tag, j) => (
                        <span key={j} style={{
                          padding: '3px 8px',
                          backgroundColor: 'rgba(249, 115, 22, 0.08)',
                          borderRadius: '4px',
                          fontSize: '11px',
                          color: colors.textMuted,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Dark */}
      <section style={{ padding: '100px 24px', backgroundColor: colors.bgDark }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 700,
                color: colors.textLight,
                marginBottom: '16px',
              }}>
                How We Work
              </h2>
              <p style={{ color: colors.textLightSecondary, fontSize: '18px', marginBottom: '24px' }}>
                Technical expertise meets business strategy.
              </p>
              <p style={{ color: colors.textLightSecondary, lineHeight: 1.8, marginBottom: '32px' }}>
                We don&apos;t just write code — we help you figure out what&apos;s worth building.
                That means honest conversations, market validation, and strategic thinking before a single line of code.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  { icon: Handshake, text: 'Partnership structures that align incentives' },
                  { icon: Target, text: 'Validation before development' },
                  { icon: Bot, text: 'AI-powered development for speed' },
                  { icon: DollarSign, text: 'Flexible deals that work for you' },
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', color: colors.textLightSecondary }}>
                    <item.icon size={20} style={{ color: colors.primary }} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              backgroundColor: colors.surfaceDark,
              borderRadius: '16px',
              padding: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${colors.borderDark}`,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: colors.primary, marginBottom: '8px' }}>ZAPP</div>
                <div style={{ color: colors.textLightSecondary, fontSize: '14px' }}>STUDIOS</div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginTop: '64px',
          }}>
            {[
              { value: '2-12 Weeks', label: 'to MVP' },
              { value: 'Honest', label: 'Validation First' },
              { value: 'Flexible', label: 'Deal Structures' },
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: colors.surfaceDark,
                border: `1px solid ${colors.borderDark}`,
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: colors.primary, marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ color: colors.textLightSecondary, fontSize: '14px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Teal Gradient */}
      <section id="contact" style={{
        padding: '100px 24px',
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 50%, ${colors.primaryLight} 100%)`,
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
          }}>
            Let&apos;s Talk About Your Idea
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', marginBottom: '40px' }}>
            We&apos;ll give you an honest assessment and figure out if we&apos;re a good fit to work together.
          </p>
          <Link href="/book" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 32px',
            backgroundColor: colors.cta,
            color: '#fff',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '18px',
            boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
          }}>
            Book a Free Call
          </Link>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginTop: '24px' }}>
            We&apos;ll respond within 24 hours
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginTop: '12px' }}>
            Or email us at{' '}
            <a href="mailto:hamzazulquernain1@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>
              hamzazulquernain1@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* Footer - Dark */}
      <footer style={{
        borderTop: `1px solid ${colors.borderDark}`,
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: colors.bgDark,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: colors.textLight, marginBottom: '8px' }}>
            ZAPP STUDIOS
          </div>
          <p style={{ color: colors.textLightSecondary, marginBottom: '24px' }}>
            Turning Ideas Into Technical Realities
          </p>
          <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '8px' }}>
            &copy; {new Date().getFullYear()} Zapp Studios. All Rights Reserved.
          </p>
          <p style={{ color: colors.textMuted, fontSize: '14px' }}>
            Honest partnerships. Real results.
          </p>
        </div>
      </footer>
    </main>
  )
}
