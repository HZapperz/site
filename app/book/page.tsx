'use client'

import Link from 'next/link'
import Script from 'next/script'
import { ArrowLeft, Mail, Calendar } from 'lucide-react'

const colors = {
  bgDark: '#0A0A0B',
  surfaceDark: '#1E293B',
  primary: '#0D9488',
  primaryLight: '#14B8A6',
  cta: '#F97316',
  textLight: '#F8FAFC',
  textLightSecondary: '#94A3B8',
  textMuted: '#64748B',
  borderDark: 'rgba(255, 255, 255, 0.1)',
  borderAccent: 'rgba(13, 148, 136, 0.3)',
}

export default function BookPage() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: colors.bgDark,
      padding: '24px',
    }}>
      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      {/* Navigation */}
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto 48px',
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
          transition: 'color 0.2s',
        }}>
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        <div style={{ fontSize: '24px', fontWeight: 800, color: colors.textLight }}>
          ZAPP STUDIOS
        </div>
      </nav>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 800,
          color: colors.textLight,
          marginBottom: '16px',
        }}>
          Let&apos;s Talk
        </h1>
        <p style={{
          color: colors.textLightSecondary,
          fontSize: '18px',
          marginBottom: '48px',
          maxWidth: '600px',
          margin: '0 auto 48px',
        }}>
          We&apos;ll give you an honest assessment of your idea and figure out if we&apos;re a good fit to work together.
        </p>

        {/* Contact Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}>
          {/* Email Option */}
          <a
            href="mailto:hamzazulquernain1@gmail.com"
            style={{
              backgroundColor: colors.surfaceDark,
              border: `1px solid ${colors.borderDark}`,
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'rgba(13, 148, 136, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Mail size={28} style={{ color: colors.primary }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: colors.textLight, marginBottom: '8px' }}>
              Send Us an Email
            </h3>
            <p style={{ color: colors.textLightSecondary, fontSize: '14px' }}>
              hamzazulquernain1@gmail.com
            </p>
          </a>

          {/* Calendar Option */}
          <div style={{
            backgroundColor: colors.surfaceDark,
            border: `1px solid ${colors.borderAccent}`,
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 0 30px rgba(13, 148, 136, 0.1)',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'rgba(13, 148, 136, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Calendar size={28} style={{ color: colors.primary }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: colors.textLight, marginBottom: '8px' }}>
              Book a Call
            </h3>
            <p style={{ color: colors.textLightSecondary, fontSize: '14px' }}>
              30-minute discovery call
            </p>
          </div>
        </div>

        {/* Calendly Widget */}
        <div style={{
          backgroundColor: colors.surfaceDark,
          borderRadius: '16px',
          padding: '24px',
          border: `1px solid ${colors.borderDark}`,
        }}>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/hamzazulquernain1/zapp-studios-consulting?hide_gdpr_banner=1&background_color=1e293b&text_color=f8fafc&primary_color=0d9488"
            style={{
              minWidth: '320px',
              height: '700px',
            }}
          />

          {/* Mobile fallback */}
          <div style={{ marginTop: '24px' }}>
            <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '12px' }}>
              Having trouble viewing the calendar?
            </p>
            <a
              href="https://calendly.com/hamzazulquernain1/zapp-studios-consulting"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: colors.cta,
                color: '#fff',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              Open Calendly
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        maxWidth: '1200px',
        margin: '80px auto 0',
        textAlign: 'center',
        paddingTop: '32px',
        borderTop: `1px solid ${colors.borderDark}`,
      }}>
        <p style={{ color: colors.textMuted, fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} Zapp Studios. All Rights Reserved.
        </p>
      </footer>
    </main>
  )
}
