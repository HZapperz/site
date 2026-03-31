'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Lightbulb, Brain, Sparkles, ArrowRight } from 'lucide-react'

export default function ClassesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
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
          <Image src="/logo.png" alt="Zapp Studios" width={200} height={56} className="object-contain h-14 w-auto" />
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[var(--color-border-accent)] bg-[var(--color-orange-glow)]">
            <Lightbulb className="w-3.5 h-3.5 text-[var(--color-orange)]" />
            <span className="text-xs font-medium text-[var(--color-orange)]">Coming Soon</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Monthly AI Class
          </h1>

          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-12 max-w-xl mx-auto">
            Practical, hands-on AI sessions taught by someone who builds with AI every day.
            Learn to leverage AI in your business, your products, and your workflow.
          </p>
        </div>

        {/* Preview cards */}
        <div className="animate-fade-in-up delay-200 grid sm:grid-cols-3 gap-4 mb-12" style={{ opacity: 0 }}>
          {[
            { icon: Brain, label: 'Hands-on learning', desc: 'Not theory  -  real tools, real workflows' },
            { icon: Sparkles, label: 'AI-native approach', desc: 'From someone who ships with AI daily' },
            { icon: Lightbulb, label: 'Business-focused', desc: 'Apply AI to real problems immediately' },
          ].map((item) => (
            <div key={item.label} className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] text-center">
              <div className="w-10 h-10 mx-auto rounded-xl bg-[var(--color-orange-glow)] flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-[var(--color-orange)]" />
              </div>
              <div className="text-sm font-semibold mb-1">{item.label}</div>
              <div className="text-xs text-[var(--color-text-muted)]">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up delay-300 text-center" style={{ opacity: 0 }}>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            We&apos;re finalizing the curriculum and schedule. Drop your email to be the first to know.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeCckl4XvgHeIAwdkL-dAKLwbRZNz-D1IBbKDV9zCT1tHQSkA/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[var(--color-orange)]/20 text-sm"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </main>
  )
}
