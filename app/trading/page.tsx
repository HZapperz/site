'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Package,
  Globe,
  ShieldCheck,
  Award,
  FileText,
  Truck,
  CheckCircle,
  ArrowRight,
  MapPin,
  Leaf,
  Star,
  Building2,
  ClipboardCheck,
} from 'lucide-react'

// ============================================
// COLOR CONSTANTS
// ============================================
const colors = {
  bgDark: '#0A0A0B',
  bgLight: '#F8FAFC',
  surfaceDark: '#1E293B',
  surfaceLight: '#FFFFFF',
  primary: '#0D9488',
  primaryLight: '#14B8A6',
  primaryDark: '#0F766E',
  cta: '#F97316',
  ctaHover: '#FB923C',
  textLight: '#F8FAFC',
  textLightSecondary: '#94A3B8',
  textDark: '#0F172A',
  textDarkSecondary: '#475569',
  textMuted: '#64748B',
  success: '#10B981',
  error: '#EF4444',
  borderDark: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(0, 0, 0, 0.1)',
  borderAccent: 'rgba(13, 148, 136, 0.3)',
}

// ============================================
// DATA
// ============================================
const products = [
  {
    name: 'Himalayan Pink Salt',
    emoji: '🧂',
    variants: ['Fine Ground', 'Coarse Ground', 'Grinder Refill'],
    origin: 'Pakistan (Khewra Mine)',
    description:
      'Sourced from the ancient Khewra Salt Mine in Pakistan — one of the largest and oldest salt mines in the world. Our Himalayan Pink Salt carries a natural mineral profile and is available in fine, coarse, and grinder formats for retail and foodservice.',
    certifications: ['FDA-Registered Supplier', 'Halal Certified', 'Lab Tested — Heavy Metals Panel'],
    color: '#F97316',
  },
  {
    name: 'Moringa Powder',
    emoji: '🌿',
    variants: ['225g Pouches', 'Bulk Wholesale'],
    origin: 'Pakistan',
    description:
      'Organic Moringa oleifera leaf powder — a nutrient-dense superfood supplement with broad retail and health-food market appeal. Processed and packaged to supplement-grade standards with full lab documentation.',
    certifications: ['Organic Sourced', 'Lab Tested — Salmonella, Heavy Metals, Mycotoxins', 'Halal Certified'],
    color: '#10B981',
  },
  {
    name: 'Premium Mangoes',
    emoji: '🥭',
    variants: ['Seasonal Import', 'Wholesale Crates'],
    origin: 'South Asia',
    description:
      'Premium tropical mangoes imported seasonally from South Asia. Sourced from certified farms and imported in compliance with FDA fresh produce requirements, including prior notice filing and FSVP documentation.',
    certifications: ['FDA-Compliant Import', 'Lab Tested — Pesticide Residue', 'Phytosanitary Certified'],
    color: '#EAB308',
  },
]

const credentials = [
  {
    title: 'FDA Facility Registration Certificate',
    detail: 'Supplier Reg #12120176528 — AMH Trading, Lahore, Pakistan',
    icon: FileText,
  },
  {
    title: 'Halal Certification',
    detail: 'Covers Himalayan Pink Salt and Moringa Powder product lines',
    icon: Award,
  },
  {
    title: 'Pest Management Certificate',
    detail: 'Facility pest management compliance for food-grade storage',
    icon: ShieldCheck,
  },
  {
    title: 'Punjab Food Authority Lab Test Certificates',
    detail: 'Heavy metals panel, microbial testing, and contaminant screening',
    icon: ClipboardCheck,
  },
  {
    title: 'FSVP Documentation',
    detail: 'Foreign Supplier Verification Program compliance records',
    icon: Globe,
  },
  {
    title: 'DUNS Business Certificate',
    detail: 'Registered business entity with verified DUNS number',
    icon: Building2,
  },
  {
    title: 'Pakistan Tax Registration (NTN)',
    detail: 'National Tax Number — verified Pakistani supplier registration',
    icon: FileText,
  },
]

const importSteps = [
  {
    step: '01',
    title: 'Source',
    description:
      'Products are sourced from AMH Trading (FDA Reg #12120176528) in Lahore, Pakistan — a verified, FDA-registered supplier with full facility documentation.',
    icon: MapPin,
    color: colors.primaryLight,
  },
  {
    step: '02',
    title: 'Certify',
    description:
      'Each shipment is accompanied by lab test certificates, Halal certification, phytosanitary documentation, and FDA prior notice filing prior to departure.',
    icon: ShieldCheck,
    color: colors.cta,
  },
  {
    step: '03',
    title: 'Deliver',
    description:
      'Goods arrive via ocean freight, proceed through US Customs clearance with FSVP documentation on file, and are distributed to wholesale and retail partners.',
    icon: Truck,
    color: colors.success,
  },
]

// ============================================
// COMPONENT
// ============================================
export default function TradingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main style={{ backgroundColor: colors.bgDark, minHeight: '100vh' }}>

      {/* ── Navigation ── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 24px',
        backgroundColor: 'rgba(10, 10, 11, 0.92)',
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
          <Link href="/" style={{ fontSize: '20px', fontWeight: 800, color: colors.textLight, letterSpacing: '-0.5px', textDecoration: 'none' }}>
            ZAPP STUDIOS
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <Link href="/" style={{ color: colors.textLightSecondary, fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Home
            </Link>
            <Link href="/about" style={{ color: colors.textLightSecondary, fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              About
            </Link>
            <span style={{
              color: colors.primaryLight,
              fontSize: '14px',
              fontWeight: 600,
              borderBottom: `2px solid ${colors.primaryLight}`,
              paddingBottom: '2px',
            }}>
              Trading
            </span>
            <Link href="/book" style={{
              padding: '10px 20px',
              backgroundColor: colors.cta,
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
            }}>
              Book a Call
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        backgroundColor: colors.bgDark,
      }}>
        {/* Background gradients */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 50% at 15% 25%, rgba(13, 148, 136, 0.14), transparent),
            radial-gradient(ellipse 55% 40% at 85% 75%, rgba(249, 115, 22, 0.08), transparent)
          `,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
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
          {/* Label badge */}
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
            A ZAPP STUDIOS VENTURE
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 60px)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '24px',
            color: colors.textLight,
          }}>
            Zulq Trading<br />
            <span className="gradient-text">International Imports</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: colors.textLightSecondary,
            maxWidth: '680px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            US-based importer of premium food commodities. Himalayan Pink Salt, Moringa Powder,
            and tropical produce — sourced from verified overseas suppliers with full FDA and
            compliance documentation on file.
          </p>

          {/* Trust badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px',
          }}>
            {[
              'FDA-Registered Supplier',
              'Lab Certified',
              'Halal Certified',
              'FSVP Compliant',
            ].map((badge, i) => (
              <div key={i} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: `1px solid rgba(16, 185, 129, 0.3)`,
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                color: colors.success,
              }}>
                <CheckCircle size={14} />
                {badge}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#products" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              backgroundColor: colors.cta,
              color: '#fff',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '16px',
              textDecoration: 'none',
            }}>
              View Products <ArrowRight size={18} />
            </a>
            <a href="#credentials" style={{
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
              textDecoration: 'none',
            }}>
              Compliance Docs
            </a>
          </div>
        </div>
      </section>

      {/* ── About / Company ── */}
      <section style={{ padding: '100px 24px', backgroundColor: colors.bgLight }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
            ABOUT ZULQ TRADING
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: colors.textDark,
                marginBottom: '20px',
                lineHeight: 1.2,
              }}>
                A Registered Import Operation Built on Compliance
              </h2>
              <p style={{ color: colors.textDarkSecondary, fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
                Zulq Trading is a US-based import venture operating under Zapp Studios, LLC. We
                specialize in the importation of premium food commodities from verified overseas
                suppliers — with every shipment backed by lab certifications, FDA registrations,
                and FSVP documentation.
              </p>
              <p style={{ color: colors.textDarkSecondary, fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
                Our primary overseas partner is <strong style={{ color: colors.textDark }}>AMH Trading, Lahore, Pakistan</strong> —
                an FDA-registered food facility (Registration #12120176528) with a documented
                compliance track record. All imports are processed through licensed customs
                brokers with prior FDA notice filings on record.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Registered US business entity (Zapp Studios, LLC)',
                  'FDA-registered overseas supplier on file',
                  'Full FSVP compliance documentation',
                  'Lab-certified products across all SKUs',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <CheckCircle size={18} style={{ color: colors.success, flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: colors.textDarkSecondary, fontSize: '15px' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              backgroundColor: colors.bgDark,
              borderRadius: '20px',
              padding: '48px 40px',
              border: `1px solid ${colors.borderDark}`,
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(13, 148, 136, 0.15)',
                border: `1px solid ${colors.borderAccent}`,
                borderRadius: '20px',
                marginBottom: '32px',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.primary }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: colors.primaryLight, letterSpacing: '0.5px' }}>
                  ZAPP STUDIOS VENTURE
                </span>
              </div>

              <div style={{ fontSize: '32px', fontWeight: 800, color: colors.textLight, marginBottom: '4px' }}>
                ZULQ TRADING
              </div>
              <div style={{ color: colors.textLightSecondary, fontSize: '14px', marginBottom: '32px' }}>
                International Food Commodities
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[
                  { label: 'Entity', value: 'Zapp Studios, LLC' },
                  { label: 'Supplier', value: 'AMH Trading, PK' },
                  { label: 'FDA Reg #', value: '12120176528' },
                  { label: 'Products', value: '3 Commodity Lines' },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: colors.textLight }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" style={{ padding: '100px 24px', backgroundColor: colors.bgDark }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
            IMPORT COMMODITIES
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: colors.textLight,
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            Three Premium Product Lines
          </h2>
          <p style={{ fontSize: '18px', color: colors.textLightSecondary, marginBottom: '60px', maxWidth: '600px' }}>
            Each commodity is sourced from verified suppliers, tested by accredited laboratories,
            and imported with full compliance documentation.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {products.map((product, i) => (
              <div key={i} style={{
                backgroundColor: colors.surfaceDark,
                borderRadius: '20px',
                padding: '36px',
                border: `1px solid ${colors.borderDark}`,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Subtle color glow */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '200px',
                  height: '200px',
                  background: `radial-gradient(circle, ${product.color}12 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                <div style={{ fontSize: '48px', marginBottom: '20px', lineHeight: 1 }}>
                  {product.emoji}
                </div>

                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: colors.textLight,
                  marginBottom: '8px',
                }}>
                  {product.name}
                </h3>

                {/* Origin badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  backgroundColor: `${product.color}18`,
                  border: `1px solid ${product.color}40`,
                  borderRadius: '20px',
                  marginBottom: '16px',
                }}>
                  <MapPin size={12} style={{ color: product.color }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: product.color }}>
                    {product.origin}
                  </span>
                </div>

                <p style={{ color: colors.textLightSecondary, fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                  {product.description}
                </p>

                {/* Variants */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {product.variants.map((v, j) => (
                    <span key={j} style={{
                      padding: '4px 10px',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: colors.textLightSecondary,
                      border: `1px solid ${colors.borderDark}`,
                    }}>
                      {v}
                    </span>
                  ))}
                </div>

                {/* Certifications */}
                <div style={{ borderTop: `1px solid ${colors.borderDark}`, paddingTop: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                    Certifications & Testing
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {product.certifications.map((cert, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle size={13} style={{ color: colors.success, flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', color: colors.textLightSecondary }}>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials & Compliance ── */}
      <section id="credentials" style={{ padding: '100px 24px', backgroundColor: colors.bgLight }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
            COMPLIANCE & DOCUMENTATION
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: colors.textDark,
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            Full Documentation on File
          </h2>
          <p style={{ fontSize: '18px', color: colors.textDarkSecondary, marginBottom: '60px', maxWidth: '600px' }}>
            Every credential and certificate required for compliant US food importation is
            maintained on file and available upon request.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {credentials.map((cred, i) => {
              const Icon = cred.icon
              return (
                <div key={i} style={{
                  backgroundColor: colors.surfaceLight,
                  border: `1px solid ${colors.borderLight}`,
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(13, 148, 136, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} style={{ color: colors.primary }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      marginBottom: '6px',
                      flexWrap: 'wrap',
                    }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: colors.textDark }}>
                        {cred.title}
                      </h3>
                      <span style={{
                        padding: '2px 8px',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: `1px solid rgba(16, 185, 129, 0.3)`,
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: colors.success,
                        whiteSpace: 'nowrap',
                      }}>
                        ON FILE
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: colors.textMuted, lineHeight: 1.5 }}>
                      {cred.detail}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer note */}
          <div style={{
            backgroundColor: colors.bgDark,
            borderRadius: '16px',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <ShieldCheck size={24} style={{ color: colors.primaryLight, flexShrink: 0 }} />
            <div>
              <p style={{ color: colors.textLight, fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                Full compliance documentation available upon request.
              </p>
              <p style={{ color: colors.textLightSecondary, fontSize: '14px' }}>
                Certificates, lab reports, and regulatory filings are maintained on file and can be
                provided to banks, buyers, and regulatory partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Import Operations ── */}
      <section style={{ padding: '100px 24px', backgroundColor: colors.bgDark }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
              HOW WE OPERATE
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              color: colors.textLight,
              marginBottom: '16px',
            }}>
              Source. Certify. Deliver.
            </h2>
            <p style={{ color: colors.textLightSecondary, fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
              A straightforward, documented import process from supplier to US market.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '60px',
          }}>
            {importSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} style={{
                  backgroundColor: colors.surfaceDark,
                  borderRadius: '20px',
                  padding: '36px 32px',
                  border: `1px solid ${colors.borderDark}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Large step number watermark */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '10px',
                    fontSize: '120px',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.025)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}>
                    {step.step}
                  </div>

                  {/* Icon */}
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

                  {/* Step badge */}
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
                      Step {step.step}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colors.textLight, marginBottom: '12px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: colors.textLightSecondary, fontSize: '15px', lineHeight: 1.7 }}>
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Process detail bar */}
          <div style={{
            backgroundColor: colors.surfaceDark,
            border: `1px solid ${colors.borderDark}`,
            borderRadius: '16px',
            padding: '28px 32px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
              Import Process Details
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}>
              {[
                { label: 'Transport', value: 'Ocean Freight (FCL/LCL)' },
                { label: 'Entry', value: 'US Customs — Licensed Broker' },
                { label: 'Prior Notice', value: 'FDA Prior Notice Filing' },
                { label: 'Verification', value: 'FSVP Documentation On File' },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: colors.textLightSecondary }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact / Inquiries ── */}
      <section style={{
        padding: '100px 24px',
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 50%, ${colors.primaryLight} 100%)`,
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '1px',
            marginBottom: '24px',
          }}>
            <Package size={14} />
            WHOLESALE &amp; PARTNERSHIP INQUIRIES
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
          }}>
            Interested in Working Together?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '18px', marginBottom: '40px', lineHeight: 1.7 }}>
            For wholesale pricing, retail distribution partnerships, or compliance inquiries,
            reach out directly. We&apos;re happy to provide documentation, samples, or pricing on any
            of our product lines.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            <Link href="/book" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              backgroundColor: colors.cta,
              color: '#fff',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '16px',
              boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
              textDecoration: 'none',
            }}>
              Schedule a Call <ArrowRight size={18} />
            </Link>
          </div>

          <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '15px' }}>
            Or email us at{' '}
            <a href="mailto:hamzazulquernain1@gmail.com" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 600 }}>
              hamzazulquernain1@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: `1px solid ${colors.borderDark}`,
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: colors.bgDark,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '24px', fontWeight: 800, color: colors.textLight, marginBottom: '4px' }}>
            ZULQ TRADING
          </div>
          <div style={{ color: colors.textLightSecondary, fontSize: '13px', marginBottom: '16px' }}>
            A Zapp Studios Venture · International Food Commodities
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: colors.textMuted, fontSize: '14px', textDecoration: 'none' }}>Home</Link>
            <Link href="/about" style={{ color: colors.textMuted, fontSize: '14px', textDecoration: 'none' }}>About</Link>
            <Link href="/book" style={{ color: colors.textMuted, fontSize: '14px', textDecoration: 'none' }}>Book a Call</Link>
          </div>
          <p style={{ color: colors.textMuted, fontSize: '13px' }}>
            &copy; {new Date().getFullYear()} Zapp Studios, LLC. All Rights Reserved.
          </p>
        </div>
      </footer>

    </main>
  )
}
