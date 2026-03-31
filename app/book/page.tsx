'use client'

import Link from 'next/link'
import Script from 'next/script'
import { ArrowLeft, Mail, Calendar } from 'lucide-react'

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-[#F5EFE0]">Zapp Studios</span>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
            Book a free 30-minute strategy call. We&apos;ll be honest about whether we&apos;re the right fit.
          </p>
        </div>

        {/* Calendly embed */}
        <div className="animate-fade-in-up delay-200 rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]" style={{ opacity: 0 }}>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/hamzazulquernain1/zapp-studios-consulting?hide_gdpr_banner=1&background_color=1a1b23&text_color=f1f0ee&primary_color=60a5fa"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>

        {/* Alt contact */}
        <div className="animate-fade-in-up delay-300 mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]" style={{ opacity: 0 }}>
          <span>Or reach out directly:</span>
          <a
            href="mailto:hamzazulquernain1@gmail.com"
            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-orange)] transition-colors"
          >
            <Mail className="w-4 h-4" />
            hamzazulquernain1@gmail.com
          </a>
        </div>

        {/* Mobile fallback */}
        <div className="mt-6 text-center sm:hidden">
          <a
            href="https://calendly.com/hamzazulquernain1/zapp-studios-consulting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white font-medium rounded-xl transition-colors text-sm"
          >
            <Calendar className="w-4 h-4" />
            Open Calendar
          </a>
        </div>
      </div>
    </main>
  )
}
