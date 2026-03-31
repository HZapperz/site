"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Brain, Sparkles, Lightbulb, Wrench, Zap, CheckCircle, Check } from "lucide-react"

/* ─── DESIGN TOKENS ─── */
const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }

/* ─── DATA ─── */
const topics = [
  {
    icon: Brain,
    title: "Claude for Business",
    desc: "Not \"how to write a prompt\" — how to use Claude as a thinking partner, code reviewer, strategist, and force multiplier across your entire operation.",
  },
  {
    icon: Wrench,
    title: "Automation Workflows",
    desc: "Build real automation: AI-powered customer support, lead qualification, content generation, data analysis pipelines. Stuff that saves hours per week.",
  },
  {
    icon: Zap,
    title: "AI-First Operations",
    desc: "How to restructure your workflows around AI from the ground up. Not bolting AI onto broken processes — rebuilding the process with AI at the center.",
  },
  {
    icon: Sparkles,
    title: "Hands-On Projects",
    desc: "Every session includes a real project you walk away with. Not theory slides — actual tools and workflows you can use Monday morning.",
  },
]

const formatStats = [
  { value: "Monthly", label: "Live sessions", sub: "Recurring deep-dives" },
  { value: "Hands-On", label: "Build real projects", sub: "Ship something every session" },
  { value: "Small", label: "Intimate group size", sub: "Real face time, real Q&A" },
]

const whoItsFor = [
  "Business owners who know AI matters but haven't figured out how to use it yet",
  "Operators who want to automate repetitive work without hiring more people",
  "Founders who want to ship faster by building with AI instead of around it",
  "Anyone tired of surface-level \"AI for beginners\" content that doesn't go anywhere",
]

/* ─── REUSABLE PRIMITIVES ─── */

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
      className="h-[2px] w-full my-2"
      style={{
        background:
          "linear-gradient(to right, transparent, #4ADE8033 30%, #4ADE8055 50%, #4ADE8033 70%, transparent)",
      }}
    />
  )
}

function AlertBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#4ADE80]/[0.05] border-l-4 border-l-[#4ADE80] rounded-r-xl p-5 my-6">
      <div className="flex gap-3">
        <Check size={20} className="text-[#4ADE80] flex-shrink-0 mt-0.5" />
        <p className="text-[15px] text-[#A09A8E] leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

/* ─── PAGE ─── */

export default function LearnPage() {
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
          <span className="text-xl font-bold tracking-tight text-[#F5EFE0]">Zapp Studios</span>
        </Link>
        <div className="w-[72px]" />
      </nav>

      <div className="max-w-4xl mx-auto px-6">

        {/* ─── HERO ─── */}
        <section className="py-20 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/20 mb-6"
          >
            <Brain size={14} className="text-[#4ADE80]" />
            <span className="text-[10px] font-semibold tracking-widest text-[#4ADE80]">LEARN AI</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            style={DISPLAY}
          >
            AI isn&apos;t coming.<br />
            <span className="text-[#4ADE80]">It&apos;s here. Learn to use it.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
            className="text-lg text-[#A09A8E] leading-relaxed max-w-2xl mx-auto"
          >
            Practical, hands-on AI sessions taught by someone who builds with AI every day. Not theory — real tools, real
            workflows, real results you can apply immediately.
          </motion.p>
        </section>

        <SectionDivider />

        {/* ─── WHAT YOU'LL LEARN ─── */}
        <section className="py-16">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-10" style={DISPLAY}>
              What You&apos;ll Learn
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((t, i) => {
              const Icon = t.icon
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[#141414] rounded-xl border border-white/[0.06] p-6 cursor-default
                             transition-colors duration-200
                             hover:border-[#4ADE80]/30 hover:shadow-[0_0_24px_rgba(74,222,128,0.07)]"
                >
                  {/* Icon container — larger with glow */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5
                               bg-[#4ADE80]/10 border border-[#4ADE80]/20
                               shadow-[0_0_16px_rgba(74,222,128,0.12)]
                               group-hover:bg-[#4ADE80]/15 group-hover:shadow-[0_0_24px_rgba(74,222,128,0.2)]
                               transition-all duration-200"
                  >
                    <Icon size={20} className="text-[#4ADE80]" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{t.title}</h3>
                  <p className="text-[14px] text-[#A09A8E] leading-relaxed">{t.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        <SectionDivider />

        {/* ─── FORMAT ─── */}
        <section className="py-16">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8" style={DISPLAY}>
              Format
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {formatStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div
                  className="bg-[#141414] rounded-xl border border-white/[0.06] border-t-2 border-t-[#4ADE80]
                             p-5 sm:p-6 flex flex-col gap-1"
                >
                  <div className="text-[10px] text-[#6B6560] uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#4ADE80]" style={DISPLAY}>
                    {stat.value}
                  </div>
                  <div className="text-[12px] text-[#6B6560] mt-1">{stat.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ─── ALERT BOX ─── */}
        <FadeIn>
          <AlertBox>
            Every session is project-based. You walk in with a question, you walk out with a working solution.
          </AlertBox>
        </FadeIn>

        <SectionDivider />

        {/* ─── WHO IT'S FOR ─── */}
        <section className="py-16">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8" style={DISPLAY}>
              Who This Is For
            </h2>
          </FadeIn>

          <div className="space-y-3">
            {whoItsFor.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className="group flex items-start gap-4 p-4 sm:p-5 bg-[#141414] rounded-xl
                           border border-white/[0.06] border-l-[3px] border-l-[#4ADE80]/60
                           hover:border-l-[#4ADE80] hover:bg-[#141414]/80
                           transition-all duration-200 cursor-default"
              >
                <CheckCircle
                  size={18}
                  className="text-[#4ADE80] flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-[15px] text-[#A09A8E] group-hover:text-[#F5EFE0] transition-colors leading-relaxed">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ─── CTA ─── */}
        <section className="py-20 text-center">
          {/* Gradient background layer */}
          <FadeIn>
            <div
              className="relative rounded-2xl overflow-hidden px-6 sm:px-10 py-12"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(74,222,128,0.08) 0%, transparent 70%), #141414",
                border: "1px solid rgba(74,222,128,0.12)",
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={DISPLAY}>
                Next session coming soon.
              </h2>
              <p className="text-[#A09A8E] mb-8 max-w-lg mx-auto">
                Drop your email and I&apos;ll let you know when the next class opens up. No spam, just one email when
                it&apos;s time.
              </p>

              {/* Input + Button */}
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 bg-[#0C0C0C] border border-white/[0.08] rounded-xl px-4 py-3 text-sm
                             text-white placeholder:text-[#6B6560]
                             focus:outline-none focus:border-[#4ADE80]/40 focus:ring-2 focus:ring-[#4ADE80]/20
                             transition-all duration-200"
                />
                <button
                  className="text-sm font-semibold text-[#0C0C0C] bg-[#4ADE80] px-6 py-3 rounded-xl
                             flex-shrink-0 transition-all duration-200
                             hover:bg-[#4ADE80]/90 hover:shadow-[0_0_20px_rgba(74,222,128,0.35)]
                             active:scale-[0.97]"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </FadeIn>
        </section>

      </div>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.04] py-8 px-6 text-center">
        <div className="text-[13px] text-[#6B6560]">Hamza Zulquernain · Zapp Studios · Houston, TX</div>
      </footer>

    </main>
  )
}
