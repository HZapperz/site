"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Rocket, Brain } from "lucide-react"

/* ─── REUSABLE COMPONENTS ─── */

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── DATA ─── */

const audiences = [
  {
    icon: TrendingUp,
    headline: "I run a service business and want to scale",
    description:
      "You have customers and revenue. You need systems - booking funnels, retention automation, data-driven optimization. We build the machine.",
    cta: "Growth Engineering",
    href: "/growth",
    accent: "#E8903A",
    accentRgb: "232,144,58",
  },
  {
    icon: Rocket,
    headline: "I have an idea and want to build it",
    description:
      "You need validation, an MVP, and a go-to-market plan. We take ideas from napkin to first revenue.",
    cta: "Founder Launchpad",
    href: "/founders",
    accent: "#60A5FA",
    accentRgb: "96,165,250",
  },
  {
    icon: Brain,
    headline: "I want to learn how to use AI in my business",
    description:
      "Hands-on training with Claude, automation workflows, and AI-first thinking. No fluff, real use cases.",
    cta: "Learn AI",
    href: "/learn",
    accent: "#4ADE80",
    accentRgb: "74,222,128",
  },
]


/* ─── MAIN PAGE ─── */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5EFE0] flex flex-col">

      {/* ─── HEADER ─── */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-[#F5EFE0]">Zapp Studios</span>
        </div>
        <div className="text-[11px] text-[#6B6560] tracking-wider uppercase font-medium">
          Houston, TX
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-16">
        <div className="max-w-4xl w-full text-center">

          {/* Intro */}
          <FadeIn delay={0.05}>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              We build systems that
              <br />
              <span
                className="text-[#E8903A]"
                style={{ textShadow: "0 0 32px rgba(232,144,58,0.35)" }}
              >
                make businesses work.
              </span>
            </h1>
            <p className="text-[13px] text-[#6B6560] tracking-widest uppercase font-medium mb-6">
              Founded by Hamza Zulquernain
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-lg text-[#A09A8E] leading-relaxed max-w-2xl mx-auto mb-8">
              Full-stack engineering meets growth strategy. We don&apos;t give advice - we build the
              product, wire the funnel, run the experiments, and hand you a business that runs on
              data instead of guesswork.
            </p>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {[
                { text: "Royal Pawz: $0 → 5 figures in 4 months", accent: "#E8903A", accentRgb: "232,144,58" },
                { text: "Part of a 7-figure exit - DietAI", accent: "#60A5FA", accentRgb: "96,165,250" },
                { text: "1,500+ hours building with AI", accent: "#4ADE80", accentRgb: "74,222,128" },
              ].map((s) => (
                <span
                  key={s.text}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium"
                  style={{
                    color: s.accent,
                    background: `rgba(${s.accentRgb}, 0.08)`,
                    border: `1px solid rgba(${s.accentRgb}, 0.2)`,
                  }}
                >
                  {s.text}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* ─── AUDIENCE ROUTER ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {audiences.map((a, i) => {
              const Icon = a.icon
              return (
                <FadeIn key={a.href} delay={0.25 + i * 0.1}>
                  <Link
                    href={a.href}
                    className="group relative flex flex-col bg-[#141414] rounded-2xl border border-white/[0.06] p-6 sm:p-8 text-left h-full transition-all duration-300"
                    style={
                      {
                        "--card-accent": a.accent,
                        "--card-accent-rgb": a.accentRgb,
                      } as React.CSSProperties
                    }
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.borderColor = `rgba(${a.accentRgb}, 0.25)`
                      el.style.background = "#1A1A1A"
                      el.style.boxShadow = `0 0 32px rgba(${a.accentRgb}, 0.08), 0 8px 32px rgba(0,0,0,0.4)`
                      el.style.transform = "scale(1.02)"
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.borderColor = "rgba(255,255,255,0.06)"
                      el.style.background = "#141414"
                      el.style.boxShadow = "none"
                      el.style.transform = "scale(1)"
                    }}
                  >
                    {/* Icon container */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                      style={{
                        background: `rgba(${a.accentRgb}, 0.1)`,
                        border: `1px solid rgba(${a.accentRgb}, 0.25)`,
                        boxShadow: `0 0 16px rgba(${a.accentRgb}, 0.12)`,
                      }}
                    >
                      <Icon size={20} style={{ color: a.accent }} />
                    </div>

                    <h2 className="text-[17px] font-semibold text-white mb-3 leading-snug">
                      {a.headline}
                    </h2>
                    <p className="text-[14px] text-[#A09A8E] leading-relaxed mb-6 flex-1">
                      {a.description}
                    </p>

                    <div
                      className="flex items-center gap-2 text-[14px] font-semibold mt-auto"
                      style={{ color: a.accent }}
                    >
                      {a.cta}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-6 text-center">
        {/* Gradient top border */}
        <div
          className="h-[1px] w-full max-w-6xl mx-auto mb-8"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(232,144,58,0.15) 30%, rgba(232,144,58,0.25) 50%, rgba(232,144,58,0.15) 70%, transparent)",
          }}
        />
        <div className="text-[13px] text-[#6B6560]">
          Hamza Zulquernain · Zapp Studios · Houston, TX
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://www.linkedin.com/in/hamza-zulquernain/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-[#A09A8E] hover:text-[#E8903A] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hamzazulquernain1@gmail.com"
            className="text-[12px] text-[#A09A8E] hover:text-[#E8903A] transition-colors"
          >
            Email
          </a>
        </div>
      </footer>
    </main>
  )
}
