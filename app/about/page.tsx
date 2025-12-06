'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Utensils, Trophy, Code, Rocket } from 'lucide-react'

const colors = {
  bgDark: '#0A0A0B',
  bgLight: '#F8FAFC',
  surfaceDark: '#1E293B',
  surfaceLight: '#FFFFFF',
  primary: '#0D9488',
  primaryLight: '#14B8A6',
  cta: '#F97316',
  textLight: '#F8FAFC',
  textLightSecondary: '#94A3B8',
  textDark: '#0F172A',
  textDarkSecondary: '#475569',
  textMuted: '#64748B',
  borderDark: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(0, 0, 0, 0.1)',
  borderAccent: 'rgba(13, 148, 136, 0.3)',
  success: '#10B981',
}

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: colors.bgDark, minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: colors.textLightSecondary,
          fontSize: '14px',
        }}>
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        <div style={{ fontSize: '24px', fontWeight: 800, color: colors.textLight }}>
          ZAPP STUDIOS
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '60px 24px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
            ABOUT ME
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 800,
            color: colors.textLight,
            marginBottom: '24px',
            lineHeight: 1.1,
          }}>
            Building products that<br />
            <span className="gradient-text">people actually use</span>
          </h1>
          <p style={{
            fontSize: '18px',
            color: colors.textLightSecondary,
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Technical co-founder, full-stack developer, and startup enthusiast with a track record of shipping products that generate real revenue.
          </p>
        </div>
      </section>

      {/* Past Success - DietAI */}
      <section style={{ padding: '100px 24px', backgroundColor: colors.bgLight }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', color: colors.primary, marginBottom: '16px' }}>
            TRACK RECORD
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: colors.textDark,
            marginBottom: '48px',
          }}>
            Before Zapp Studios
          </h2>

          {/* DietAI Card */}
          <div style={{
            backgroundColor: colors.surfaceLight,
            borderRadius: '24px',
            padding: 'clamp(32px, 5vw, 64px)',
            border: `1px solid ${colors.borderLight}`,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: `1px solid ${colors.success}`,
                borderRadius: '20px',
                marginBottom: '24px',
              }}>
                <Trophy size={14} style={{ color: colors.success }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: colors.success }}>7-Figure Exit</span>
              </div>

              <h3 style={{
                fontSize: '32px',
                fontWeight: 800,
                color: colors.textDark,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Utensils size={28} style={{ color: '#fff' }} />
                </div>
                DietAI
              </h3>

              <p style={{
                fontSize: '16px',
                color: colors.textDarkSecondary,
                lineHeight: 1.8,
                marginBottom: '24px',
              }}>
                AI-powered nutrition tracking app that helped users achieve their health goals through personalized meal planning and real-time feedback. Built from scratch and scaled to a successful exit.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Swift', 'React Native', 'Python', 'AI/ML', 'Firebase'].map((tag, i) => (
                  <span key={i} style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(13, 148, 136, 0.1)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: colors.textDarkSecondary,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              backgroundColor: colors.bgDark,
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
              }}>
                {[
                  { value: '7-Fig', label: 'Exit Value' },
                  { value: '50K+', label: 'Users' },
                  { value: '4.8', label: 'App Rating' },
                  { value: '18mo', label: 'To Exit' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: colors.primary,
                      marginBottom: '4px',
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '13px', color: colors.textLightSecondary }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More content placeholder */}
      <section style={{ padding: '100px 24px', backgroundColor: colors.bgDark }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: colors.surfaceDark,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
          }}>
            <Code size={36} style={{ color: colors.primary }} />
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: colors.textLight,
            marginBottom: '16px',
          }}>
            More coming soon...
          </h2>
          <p style={{
            fontSize: '16px',
            color: colors.textLightSecondary,
            marginBottom: '40px',
          }}>
            Full story, background, skills, and experience details are on the way.
          </p>

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
          }}>
            Let&apos;s Talk <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${colors.borderDark}`,
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: colors.bgDark,
      }}>
        <p style={{ color: colors.textMuted, fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} Zapp Studios. All Rights Reserved.
        </p>
      </footer>
    </main>
  )
}
