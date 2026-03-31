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

function SectionDivider() {
  return (
    <div
      className="h-[2px] w-full max-w-6xl mx-auto"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(232,144,58,0.2) 30%, rgba(232,144,58,0.4) 50%, rgba(232,144,58,0.2) 70%, transparent)",
      }}
    />
  )
}

/* ─── DATA ─── */

const audiences = [
  {
    icon: TrendingUp,
    headline: "I run a service business and want to scale",
    description:
      "You have customers and revenue. You need systems — booking funnels, retention automation, data-driven optimization. We build the machine.",
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

const proofPoints = [
  {
    label: "Royal Pawz",
    stat: "33%",
    sub: "booking conversion rate",
    detail: "8x revenue growth",
    accent: "#E8903A",
    accentRgb: "232,144,58",
  },
  {
    label: "DietAI",
    stat: "7-fig",
    sub: "exit achieved",
    detail: "full product build",
    accent: "#60A5FA",
    accentRgb: "96,165,250",
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

          {/* Video placeholder */}
          <FadeIn delay={0.05}>
            <div
              className="relative w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden bg-[#141414] border border-[#E8903A]/20 mb-12"
              style={{ animation: "pulse-glow 3.5s ease-in-out infinite" }}
            >
              {/* Inner gradient overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 60%, rgba(232,144,58,0.05) 0%, transparent 70%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(232,144,58,0.12)",
                    border: "1px solid rgba(232,144,58,0.35)",
                    boxShadow: "0 0 24px rgba(232,144,58,0.15)",
                  }}
                >
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[#E8903A] border-b-[10px] border-b-transparent ml-1" />
                </div>
                <span className="text-[13px] text-[#6B6560]">Video coming soon</span>
              </div>
            </div>
          </FadeIn>

          {/* Intro */}
          <FadeIn delay={0.15}>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              I&apos;m Hamza Zulquernain.
              <br />
              <span
                className="text-[#E8903A]"
                style={{ textShadow: "0 0 32px rgba(232,144,58,0.35)" }}
              >
                I build systems that make businesses work.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-lg text-[#A09A8E] leading-relaxed max-w-2xl mx-auto mb-16">
              Full-stack engineering meets growth strategy. I don&apos;t give advice — I build the
              product, wire the funnel, run the experiments, and hand you a business that runs on
              data instead of guesswork.
            </p>
          </FadeIn>

          {/* ─── AUDIENCE ROUTER ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {audiences.map((a, i) => {
              const Icon = a.icon
              return (
                <FadeIn key={a.href} delay={0.35 + i * 0.1}>
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

      {/* ─── SECTION DIVIDER ─── */}
      <div className="px-6">
        <SectionDivider />
      </div>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="py-12 px-6">
        <FadeIn delay={0}>
          <p className="text-center text-[11px] text-[#6B6560] tracking-[3px] uppercase font-medium mb-8">
            Client Results
          </p>
        </FadeIn>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {proofPoints.map((p, i) => (
            <FadeIn key={p.label} delay={0.1 + i * 0.08}>
              <div
                className="bg-[#141414] rounded-xl border border-white/[0.06] p-5 border-t-2 transition-all duration-200 hover:bg-[#1A1A1A]"
                style={{ borderTopColor: p.accent }}
              >
                <div
                  className="text-[11px] font-semibold uppercase tracking-widest mb-2"
                  style={{ color: p.accent }}
                >
                  {p.label}
                </div>
                <div className="text-2xl font-bold text-white tracking-tight mb-1">
                  {p.stat}
                </div>
                <div className="text-[12px] text-[#A09A8E]">{p.sub}</div>
                <div
                  className="text-[11px] mt-2 font-medium"
                  style={{ color: `rgba(${p.accentRgb}, 0.7)` }}
                >
                  {p.detail}
                </div>
              </div>
            </FadeIn>
          ))}
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
            href="mailto:hamza@zappstudios.us"
            className="text-[12px] text-[#A09A8E] hover:text-[#E8903A] transition-colors"
          >
            Email
          </a>
        </div>
      </footer>
    </main>
  )
}
