"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight, Rocket, Target, Wrench, BarChart3,
  Check, X, Info,
} from "lucide-react"

/* ─── DESIGN TOKENS ─── */
const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }

/* ─── REUSABLE COMPONENTS ─── */

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionDivider() {
  return (
    <div
      className="w-full h-[2px] my-0"
      style={{
        background:
          "linear-gradient(to right, transparent, #60A5FA33, #60A5FA55, #60A5FA33, transparent)",
      }}
    />
  )
}

function AlertBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/5 border-l-4 border-l-blue-400 rounded-r-lg p-5 my-6">
      <div className="flex gap-3">
        <Info size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-[15px]">
          {title && (
            <div className="font-semibold text-white mb-1.5 text-base">{title}</div>
          )}
          <div className="text-[#c8c4bf] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

/* ─── DATA ─── */

const steps = [
  {
    step: "01",
    label: "Diagnose",
    desc: "We tear apart your idea — market, competition, unit economics. If it doesn't work on paper, we find out now, not after you've spent $50K.",
    icon: Target,
  },
  {
    step: "02",
    label: "Validate",
    desc: "Build the smallest possible version that proves demand. Landing page, waitlist, MVP — whatever gets real signal from real people fastest.",
    icon: BarChart3,
  },
  {
    step: "03",
    label: "Build",
    desc: "Full-stack product engineering. Not a Squarespace site — a real platform with the infrastructure to scale. We own the code, you own the business.",
    icon: Wrench,
  },
  {
    step: "04",
    label: "Launch",
    desc: "Go-to-market strategy, funnel optimization, and the growth systems to acquire your first customers. The playbook, not just the product.",
    icon: Rocket,
  },
]

const caseStudyBadges = [
  "Full financial model",
  "Customer funnel analysis",
  "Phased launch roadmap",
]

const qualifiers = [
  { yes: true, text: "You have a specific idea, not just \"I want to start a business\"" },
  { yes: true, text: "You're willing to invest time and money to test it properly" },
  { yes: true, text: "You want a technical co-founder, not a consultant" },
  { yes: true, text: "You're okay hearing \"this won't work\" if the data says so" },
  { yes: false, text: "You want a logo and a Wix site" },
  { yes: false, text: "You need someone to come up with the idea for you" },
  { yes: false, text: "You're looking for a $500 MVP from Fiverr" },
]

/* ─── PAGE ─── */

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5EFE0]">

      {/* ─── NAV ─── */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#A09A8E] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <Link href="/" className="flex items-center">
          <Image src="/logo.jpg" alt="Zapp Studios" width={140} height={40} className="rounded" />
        </Link>
        <Link
          href="/book"
          className="text-sm font-semibold text-[#0C0C0C] bg-[#60A5FA] hover:bg-[#60A5FA]/90 px-4 py-2 rounded-lg transition-colors"
        >
          Book a Call
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6">

        {/* ─── HERO ─── */}
        <section className="py-20 text-center">
          {/* Badge fades in first */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 mb-6"
          >
            <Rocket size={14} className="text-[#60A5FA]" />
            <span className="text-[10px] font-semibold tracking-widest text-[#60A5FA]">
              FOUNDER LAUNCHPAD
            </span>
          </motion.div>

          {/* H1 fades in second */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            style={DISPLAY}
          >
            You have an idea.<br />
            <span className="text-[#60A5FA]">Let&apos;s find out if it works.</span>
          </motion.h1>

          {/* Paragraph fades in last */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.26 }}
            className="text-lg text-[#A09A8E] leading-relaxed max-w-2xl mx-auto"
          >
            Most founders build first and validate later. We flip that. Rigorous validation,
            then a full-stack build with the growth systems baked in from day one. If the idea
            doesn&apos;t survive the data, we kill it early and save you months.
          </motion.p>
        </section>

        <SectionDivider />

        {/* ─── PROCESS ─── */}
        <section className="py-16">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-10" style={DISPLAY}>How It Works</h2>
          </FadeIn>

          {/* Timeline layout */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div
              className="absolute left-[19px] top-6 bottom-6 w-[2px] hidden sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, #60A5FA44, #60A5FA22, #60A5FA44)",
              }}
            />

            <div className="space-y-4">
              {steps.map((p, i) => {
                const Icon = p.icon
                return (
                  <FadeIn key={p.step} delay={i * 0.1}>
                    <div className="flex gap-5 sm:gap-6">
                      {/* Step number circle — prominent, accent background */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[11px] font-bold text-[#60A5FA] border border-[#60A5FA]/30 relative z-10"
                          style={{ background: "rgba(96,165,250,0.12)" }}
                        >
                          {p.step}
                        </div>
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-[#141414] rounded-xl border border-white/[0.06] hover:border-[#60A5FA]/20 transition-all duration-300 p-5 sm:p-6 mb-0">
                        <div className="flex items-center gap-3 mb-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center">
                            <Icon size={14} className="text-[#60A5FA]" />
                          </div>
                          <div className="text-base font-semibold text-white" style={DISPLAY}>
                            {p.label}
                          </div>
                        </div>
                        <p className="text-[14px] text-[#A09A8E] leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>

          {/* AlertBox below process */}
          <FadeIn delay={0.1}>
            <AlertBox title="Validation-first, always.">
              Every engagement starts with validation. If the data says your idea won&apos;t
              work, we&apos;ll tell you — and save you months.
            </AlertBox>
          </FadeIn>
        </section>

        <SectionDivider />

        {/* ─── CASE STUDY ─── */}
        <section className="py-16">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-6" style={DISPLAY}>From Idea to Full Playbook</h2>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Link
              href="/rev-eng/owen"
              className="group block bg-[#141414] rounded-xl border border-white/[0.06] p-6 sm:p-8 hover:border-[#60A5FA]/25 transition-all duration-300"
              style={{
                boxShadow: "0 0 0 0 rgba(96,165,250,0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 32px rgba(96,165,250,0.07)"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(96,165,250,0)"
              }}
            >
              <div className="text-[11px] text-[#60A5FA] font-semibold uppercase tracking-wider mb-2">
                Case Study
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={DISPLAY}>
                Owen&apos;s Modded Seiko
              </h3>
              <p className="text-[15px] text-[#A09A8E] leading-relaxed mb-4">
                A watch modding hobby turned into a full business plan — complete with financial
                models, customer funnel analysis, competitive positioning, and a phased launch
                roadmap. The playbook covers everything from unit economics to operational scaling.
              </p>

              {/* Pill badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                {caseStudyBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#60A5FA] bg-[#60A5FA]/10 border border-[#60A5FA]/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[14px] font-semibold text-[#60A5FA]">
                Read the full playbook
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          </FadeIn>
        </section>

        <SectionDivider />

        {/* ─── QUALIFIERS ─── */}
        <section className="py-16">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8" style={DISPLAY}>Is This for You?</h2>
          </FadeIn>

          <div className="space-y-2.5">
            {qualifiers.map((q, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div
                  className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                    q.yes
                      ? "bg-emerald-500/[0.03] border-emerald-500/[0.12] border-l-2 border-l-emerald-500/40"
                      : "bg-red-500/[0.03] border-red-500/[0.12] border-l-2 border-l-red-500/40"
                  }`}
                >
                  {q.yes ? (
                    <Check size={17} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X size={17} className="text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-[15px] text-[#A09A8E]">{q.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ─── CTA ─── */}
        <section className="py-20 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={DISPLAY}>
              Ready to validate?
            </h2>
            <p className="text-[#A09A8E] mb-10 max-w-lg mx-auto">
              Book a 30-minute diagnostic. We&apos;ll go through your idea, poke holes in it, and
              tell you honestly whether it&apos;s worth building.
            </p>

            {/* Button with glow */}
            <div className="relative inline-flex flex-col items-center gap-3">
              <div
                className="absolute inset-0 rounded-xl blur-xl opacity-30 pointer-events-none"
                style={{ background: "#60A5FA", transform: "scale(0.9) translateY(4px)" }}
              />
              <Link
                href="/book"
                className="relative inline-flex items-center gap-2 text-base font-semibold text-[#0C0C0C] bg-[#60A5FA] hover:bg-[#60A5FA]/90 px-8 py-3.5 rounded-xl transition-colors"
              >
                Book a Diagnostic
                <ArrowRight size={16} />
              </Link>
              {/* Trust indicator */}
              <span className="text-[12px] text-[#6B6560] tracking-wide">
                Free · 30 min · No commitment
              </span>
            </div>
          </FadeIn>
        </section>

      </div>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.04] py-8 px-6 text-center">
        <div className="text-[13px] text-[#6B6560]">
          Hamza Zulquernain · Zapp Studios · Houston, TX
        </div>
      </footer>

    </main>
  )
}
