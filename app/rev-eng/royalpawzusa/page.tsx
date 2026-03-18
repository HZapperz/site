"use client"

import { useState, useEffect, Fragment } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap, Target, Calculator, TrendingUp, Map, Layers, Compass,
  Menu, X, AlertTriangle, Info, ChevronDown, ArrowRight, Check,
  DollarSign, BarChart3, BookOpen, Quote
} from "lucide-react"

/* ─── NAV SECTIONS ─── */
const navSections = [
  { id: "story", title: "The Story", icon: BookOpen },
  { id: "built", title: "What We Built", icon: Layers },
  { id: "phase1", title: "Phase 1: The Wall", icon: AlertTriangle },
  { id: "phase2", title: "Phase 2: Kill Auth", icon: Zap },
  { id: "phase3", title: "Phase 3: Intro Screen", icon: Target },
  { id: "phase4", title: "Phase 4: Early Info", icon: TrendingUp },
  { id: "evidence", title: "The Evidence", icon: BarChart3 },
  { id: "experiments", title: "The Experiments", icon: Target },
  { id: "economics", title: "The Honest Math", icon: DollarSign },
  { id: "market", title: "Market Context", icon: Map },
  { id: "takeaways", title: "What We Learned", icon: Check },
  { id: "next", title: "What's Next", icon: Compass },
]

/* ─── REUSABLE COMPONENTS ─── */

function SectionHeader({ icon: Icon, label, title }: { icon: React.ElementType; label: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className="text-[#7c5cfc]" />
        <span className="text-xs font-semibold text-[#7c5cfc] tracking-widest uppercase">{label}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{title}</h2>
    </div>
  )
}

function Card({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-[#141420] rounded-xl border border-white/[0.06] overflow-hidden mb-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-white/[0.02] transition-colors cursor-pointer">
        <span className="text-white font-semibold text-base sm:text-lg text-left">{title}</span>
        <ChevronDown size={18} className={`text-[#7c5cfc] transition-transform flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[16px] text-[#ccc] leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | { text: string; color?: string })[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/[0.06] -mx-1">
      <table className="w-full text-[15px] border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-[#1a1a2e]">
            {headers.map((h, i) => (
              <th key={i} className="text-left py-3 px-4 text-[12px] tracking-wider uppercase text-[#7c5cfc] font-semibold border-b border-[#333] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[#1a1a2e] hover:bg-white/[0.02] transition-colors">
              {row.map((cell, ci) => {
                const text = typeof cell === "string" ? cell : cell.text
                const color = typeof cell === "string" ? (ci === 0 ? "text-white font-medium" : "text-[#999]") : (cell.color || "text-[#999]")
                return <td key={ci} className={`py-3 px-4 font-mono text-[14px] ${color}`}>{text}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AlertBox({ type, title, children }: { type: "warning" | "info" | "success"; title?: string; children: React.ReactNode }) {
  const styles = {
    warning: { border: "border-l-amber-500", bg: "bg-amber-500/5", icon: AlertTriangle, iconColor: "text-amber-400" },
    info: { border: "border-l-blue-400", bg: "bg-blue-500/5", icon: Info, iconColor: "text-blue-400" },
    success: { border: "border-l-emerald-500", bg: "bg-emerald-500/5", icon: Check, iconColor: "text-emerald-400" },
  }
  const s = styles[type]
  const Icon = s.icon
  return (
    <div className={`${s.bg} ${s.border} border-l-4 rounded-r-lg p-5 my-5`}>
      <div className="flex gap-3">
        <Icon size={20} className={`${s.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="text-[16px]">
          {title && <div className="font-semibold text-white mb-1.5 text-lg">{title}</div>}
          <div className="text-[#ccc] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, sub, color = "text-white" }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-[#141420] rounded-xl p-4 sm:p-5 border border-white/[0.06] flex-1 min-w-[120px] sm:min-w-[140px]">
      <div className="text-[12px] text-[#666] uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-xl sm:text-2xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-[12px] text-[#555] mt-1">{sub}</div>}
    </div>
  )
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  )
}

/* ─── ACRONYM DEFINITIONS ─── */
const acronyms: Record<string, string> = {
  CPA: "Cost Per Acquisition — how much it costs to acquire one new customer",
  LTV: "Lifetime Value — total revenue a customer generates over their entire relationship",
  CAC: "Customer Acquisition Cost — total cost to acquire a new customer (same as CPA)",
  ROAS: "Return On Ad Spend — revenue generated per dollar spent on advertising",
  AOV: "Average Order Value — average revenue per booking/transaction",
  CPC: "Cost Per Click — how much each ad click costs",
  CPL: "Cost Per Lead — how much it costs to generate one lead",
  WOM: "Word of Mouth — customers acquired through referrals, not paid ads",
  CTR: "Click-Through Rate — percentage of people who click an ad after seeing it",
}

function Term({ children }: { children: string }) {
  const def = acronyms[children]
  if (!def) return <span className="font-semibold text-white">{children}</span>
  return (
    <span className="relative group/term inline-block">
      <span className="font-semibold text-white border-b border-dotted border-white/30 cursor-help">{children}</span>
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-[#1a1a2e] border border-white/10 text-[13px] text-[#ccc] leading-snug w-64 opacity-0 group-hover/term:opacity-100 transition-opacity duration-150 z-50 shadow-xl text-center font-normal">
        {def}
      </span>
    </span>
  )
}

/* ─── CASE STUDY COMPONENTS ─── */

function FlowSteps({ steps }: { steps: { label: string; type?: "friction" | "new" | "highlight" | "normal" }[] }) {
  const colors: Record<string, string> = {
    friction: "bg-red-500/10 border-red-500/20 text-red-400",
    new: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    highlight: "bg-[#7c5cfc]/10 border-[#7c5cfc]/20 text-[#7c5cfc]",
    normal: "bg-white/[0.04] border-white/[0.08] text-white",
  }
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 p-4 bg-[#0a0a0a] rounded-lg my-4">
      {steps.map((step, i) => (
        <Fragment key={i}>
          {i > 0 && <ArrowRight size={12} className="text-[#444] flex-shrink-0 rotate-90 sm:rotate-0 self-center" />}
          <span className={`px-3 py-1.5 rounded-lg border text-[14px] font-medium whitespace-nowrap w-full sm:w-auto text-center sm:text-left ${colors[step.type || "normal"]}`}>
            {step.label}
          </span>
        </Fragment>
      ))}
    </div>
  )
}

function ResultBox({ metrics, variant = "negative" }: { metrics: { value: string; label: string; color?: string }[]; variant?: "negative" | "positive" | "improved" }) {
  const border = variant === "negative" ? "border-red-500/15" : variant === "positive" ? "border-emerald-500/15" : "border-cyan-400/15"
  const bg = variant === "negative" ? "bg-red-500/[0.03]" : variant === "positive" ? "bg-emerald-500/[0.03]" : "bg-cyan-400/[0.03]"
  return (
    <div className={`flex flex-wrap gap-6 p-5 rounded-xl border ${border} ${bg} mt-6`}>
      {metrics.map((m, i) => (
        <div key={i} className="text-center min-w-[80px]">
          <div className={`font-mono text-xl sm:text-2xl font-bold ${m.color || "text-white"}`}>{m.value}</div>
          <div className="text-[11px] text-[#666] uppercase tracking-wider mt-1">{m.label}</div>
        </div>
      ))}
    </div>
  )
}

function FunnelBar({ label, count, total, variant = "winner" }: { label: string; count: number; total: number; variant?: "winner" | "control" }) {
  const pct = Math.round((count / total) * 100)
  const color = variant === "winner" ? "#4ade80" : "#666"
  return (
    <div className="flex items-center gap-3 mb-1.5">
      <span className="text-[12px] text-[#666] w-16 text-right flex-shrink-0 font-mono">{label}</span>
      <div className="flex-1 h-5 bg-white/[0.03] rounded overflow-hidden">
        <div className="h-full rounded flex items-center px-2" style={{ width: `${pct}%`, background: `${color}25`, borderRight: `2px solid ${color}` }}>
          {pct > 25 && <span className="text-[11px] font-mono" style={{ color }}>{count}</span>}
        </div>
      </div>
      {pct <= 25 && <span className="text-[11px] font-mono text-[#666] w-6">{count}</span>}
    </div>
  )
}

function Observation({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/[0.04] border-l-[3px] border-l-blue-400 rounded-r-lg p-4 my-5 text-[15px] text-[#aaa] leading-relaxed italic">
      {children}
    </div>
  )
}

/* ─── MAIN PAGE ─── */

export default function RoyalPawzCaseStudy() {
  const [activeSection, setActiveSection] = useState("story")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { for (const entry of entries) { if (entry.isIntersecting) setActiveSection(entry.target.id) } },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )
    navSections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setMobileNavOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-[#e0e0e0]">

      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-[#0f0f15] border-r border-white/[0.06] sticky top-0 h-screen flex-shrink-0">
        <div className="p-5 border-b border-white/[0.06]">
          <div className="text-[10px] font-bold tracking-[3px] text-[#7c5cfc] mb-1">ZAPP STUDIOS</div>
          <div className="text-sm font-semibold text-white">Royal Pawz USA</div>
          <div className="text-[10px] text-[#555] mt-0.5">Revenue Engineering Case Study</div>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {navSections.map(s => {
            const Icon = s.icon; const isActive = activeSection === s.id
            return (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left text-[13px] transition-all cursor-pointer ${isActive ? "text-white font-semibold bg-[#7c5cfc]/10 border-l-[3px] border-l-[#7c5cfc]" : "text-[#666] hover:text-[#999] border-l-[3px] border-l-transparent hover:bg-white/[0.02]"}`}>
                <Icon size={14} className={isActive ? "text-[#7c5cfc]" : ""} />{s.title}
              </button>
            )
          })}
        </nav>
        <div className="p-5 border-t border-white/[0.06]">
          <div className="text-[10px] text-[#444] leading-relaxed">Prepared by Hamza<br />zappstudios.us<br />March 2026</div>
        </div>
      </aside>

      {/* ─── MOBILE NAV ─── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 h-14 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06]">
          <div>
            <span className="text-[9px] font-bold tracking-[2px] text-[#7c5cfc]">ZAPP STUDIOS</span>
            <span className="text-sm font-semibold text-white ml-2">Royal Pawz USA</span>
          </div>
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="text-[#888] p-2 cursor-pointer">
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden bg-[#0f0f15] border-b border-white/[0.06]">
              <nav className="py-2 max-h-[60vh] overflow-y-auto">
                {navSections.map(s => {
                  const Icon = s.icon
                  return (
                    <button key={s.id} onClick={() => scrollTo(s.id)} className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm cursor-pointer ${activeSection === s.id ? "text-white font-semibold" : "text-[#666]"}`}>
                      <Icon size={14} className={activeSection === s.id ? "text-[#7c5cfc]" : ""} />{s.title}
                    </button>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 min-w-0">

        {/* ═══ HERO ═══ */}
        <section className="relative px-5 sm:px-10 lg:px-16 pt-24 lg:pt-16 pb-12 border-b border-white/[0.06]">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7c5cfc]/10 border border-[#7c5cfc]/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc] animate-pulse" />
                <span className="text-[10px] font-semibold tracking-widest text-[#7c5cfc]">REVENUE ENGINEERING CASE STUDY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Half Left. Now 1 in 3<br />Book and Pay.
              </h1>
              <p className="text-lg sm:text-xl text-[#888] leading-relaxed max-w-xl mb-6">
                We launched Royal Pawz in late November with a booking funnel that hemorrhaged visitors. In under three months and four iterations, 1 in 3 visitors book an appointment. This is that story.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[#555]">
                <span>Prepared by Hamza</span>
                <span className="text-[#333]">|</span>
                <span>zappstudios.us/revenue</span>
                <span className="text-[#333]">|</span>
                <span>March 2026</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap gap-3 mt-10">
              <MetricCard label="A/B Tested Conv." value="30.8%" sub="+334% lift (controlled)" color="text-[#7c5cfc]" />
              <MetricCard label="Bounce Reduction" value="-76%" sub="43.6% → 10.5%" color="text-[#f97316]" />
              <MetricCard label="Customer LTV" value="$154" sub="Net service rev, 123 customers" color="text-[#4ade80]" />
              <MetricCard label="Est. CPA / New Customer" value="~$20" sub="Post-landing page (all sources)" color="text-[#5cb8ff]" />
            </motion.div>
          </div>
        </section>


        {/* ═══ THE STORY ═══ */}
        <section id="story" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={BookOpen} label="Introduction" title="The Story" /></FadeIn>
          <FadeIn>
            <p className="text-[#999] text-[17px] leading-relaxed max-w-2xl mb-8">
              Royal Pawz is a mobile dog grooming company in Houston. We built their full-stack platform — client booking app, groomer operations app, admin dashboard, AI-powered SMS service — and launched it in late November 2025. What happened next is a case study in why building the product is only half the job. The other half is engineering the revenue.
            </p>
            <div className="flex flex-wrap gap-1 mb-8">
              {["Observe", "Hypothesize", "Test", "Measure", "Scale"].map((step, i) => (
                <Fragment key={step}>
                  {i > 0 && <ArrowRight size={14} className="text-[#444] self-center mx-1" />}
                  <div className="bg-[#7c5cfc]/[0.06] border border-[#7c5cfc]/15 rounded-lg px-4 py-2 text-center">
                    <div className="text-[10px] text-[#7c5cfc] font-mono">0{i + 1}</div>
                    <div className="text-[13px] font-semibold text-white">{step}</div>
                  </div>
                </Fragment>
              ))}
            </div>
            {/* Mini timeline */}
            <div className="flex rounded-lg overflow-hidden border border-white/[0.06] text-[12px] font-mono text-[#666]">
              <div className="flex-[3] px-3 py-2 text-center bg-red-500/[0.04] border-r border-white/[0.06]">
                Nov 25 – Jan 18<br /><span className="font-sans font-semibold text-[#999]">Launch</span>
              </div>
              <div className="flex-[6] px-3 py-2 text-center bg-cyan-400/[0.04] border-r border-white/[0.06]">
                Jan 19 – Mar 8<br /><span className="font-sans font-semibold text-cyan-400">The Rebuild</span>
              </div>
              <div className="flex-[1] px-3 py-2 text-center bg-[#7c5cfc]/[0.04] border-r border-white/[0.06]">
                Mar 9–14<br /><span className="font-sans font-semibold text-[#7c5cfc]">Test 1</span>
              </div>
              <div className="flex-[1] px-3 py-2 text-center bg-emerald-500/[0.04]">
                Mar 14–18<br /><span className="font-sans font-semibold text-emerald-400">Test 2</span>
              </div>
            </div>
          </FadeIn>
        </section>


        {/* ═══ WHAT WE BUILT ═══ */}
        <section id="built" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Layers} label="The Platform" title="What We Built" /></FadeIn>
          <FadeIn>
            <p className="text-[#888] text-[17px] leading-relaxed max-w-2xl mb-8">
              Before optimizing the funnel, we built the entire platform from scratch. Royal Pawz isn&apos;t running on Squarespace with a Calendly embed — it&apos;s a fully custom system designed to give us total control over every step of the customer experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Client Booking App", desc: "Multi-step booking flow with ZIP-based service area validation, real-time groomer availability, pet profiles, service customization, and integrated Stripe payments. Fully responsive — 80%+ of traffic is mobile.", color: "text-[#7c5cfc]" },
                { title: "Groomer Operations App", desc: "Mobile-first dashboard for groomers to manage their daily schedule, view upcoming appointments with pet details and special instructions, navigate to addresses, and update job status in real-time.", color: "text-emerald-400" },
                { title: "Admin Dashboard", desc: "Complete business control panel — customer management, booking oversight, revenue reporting, groomer scheduling, service/pricing configuration, and real-time analytics across the entire platform.", color: "text-cyan-400" },
                { title: "AI-Powered SMS Service", desc: "Automated appointment confirmations, reminders, and follow-ups via SMS. Conversational AI handles rebooking requests and common questions. Abandoned cart recovery reaches users who dropped off before completing a booking.", color: "text-amber-400" },
                { title: "Session Recording & Analytics", desc: "Custom rrweb integration recording every user session across the platform. Rage click detection, funnel drop-off tracking, and heatmap data — the system that made every optimization in this case study possible.", color: "text-red-400" },
                { title: "A/B Testing Framework", desc: "Built-in split testing infrastructure with event-level tracking, variant assignment, and conversion attribution. Each experiment in this case study ran through this system with randomized traffic splits.", color: "text-[#7c5cfc]" },
              ].map((item, i) => (
                <div key={i} className="bg-[#141420] rounded-xl p-5 sm:p-6 border border-white/[0.06]">
                  <div className={`text-base font-semibold ${item.color} mb-2`}>{item.title}</div>
                  <p className="text-[15px] text-[#999] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <AlertBox type="info" title="Why Custom Matters">
              <p>Every optimization in this case study was possible because we own the entire stack. When we identified the auth wall problem, we didn&apos;t submit a support ticket — we redesigned the flow and shipped it the same week. When we needed A/B testing, we didn&apos;t pay for a plugin — we built it into the platform. When we needed session recordings, we integrated rrweb directly. <strong className="text-white">Full-stack ownership means zero waiting, zero dependencies, and changes deployed daily if needed.</strong></p>
            </AlertBox>
          </FadeIn>
        </section>


        {/* ═══ PHASE 1 ═══ */}
        <section id="phase1" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={AlertTriangle} label="Phase 1" title="We Launched Into a Wall" /></FadeIn>
          <FadeIn>
            <p className="text-[12px] font-mono text-[#555] mb-6">Nov 25, 2025 – Jan 18, 2026 (tracking from Dec 26)</p>
            <Card title="What Happened" defaultOpen>
              <p className="mb-4">Royal Pawz went live in late November. The app worked, the groomers were ready, the Google Ads were running. November saw 13 signups, 5 bookings. Small numbers, but it was working. By December that grew to 50 signups. By January, 78. <strong className="text-white">Growth was working. Conversion was the bottleneck.</strong></p>
              <p className="mb-4">For the first month we were flying blind — no session tracking, no funnel analytics. On December 26th, we installed rrweb session recording across the entire platform. The data hit immediately, and it wasn&apos;t pretty.</p>
              <p>The flow was straightforward: a Google ad sends you to <strong className="text-white">/auth/sign-up</strong>. Create an account. Verify your email. Complete onboarding. Then you can explore services and book.</p>
              <FlowSteps steps={[
                { label: "Google Ad" },
                { label: "Sign Up", type: "friction" },
                { label: "Verify Email", type: "friction" },
                { label: "Onboarding", type: "friction" },
                { label: "Find Services" },
                { label: "Book" },
              ]} />
            </Card>
            <Card title="What the Data Showed" defaultOpen>
              <Observation>
                Session recordings told the story: users landed on a sign-up form with zero context. No services listed, no pricing visible, no photos of the vans. Some tried scrolling — nothing below the fold. Some clicked the logo hoping for a homepage. <strong className="text-white">Most just closed the tab.</strong>
              </Observation>
              <p className="mb-4">The numbers were brutal. <strong className="text-white">61.4% of visitors dropped at the sign-up page alone</strong> — of 665 sessions that reached /auth/sign-up, only 257 made it through. Users were averaging <strong className="text-white">14.7 rage clicks</strong> on the sign-up form, a frustration signal 3x higher than any other page. And 80.6% of our traffic was mobile, where the experience was worst — mobile users rage-clicked 5x more than desktop.</p>
              <p className="mb-4">Google Ads — our biggest traffic source at 391 sessions — was converting at <strong className="text-white">just 2.8%</strong> to even reaching signup. The landing page had accidentally hidden the &quot;Book Now&quot; button on mobile behind a hamburger menu, and loaded <strong className="text-white">9.8MB of unoptimized images</strong> — a 16-second load on 4G.</p>
              <p>Even users who made it past signup weren&apos;t safe. Of 338 total signups across this period, <strong className="text-white">231 never booked — a 68.3% drop-off rate.</strong> The booking flow itself had a 31.7% drop at the address step and 16.1% at payment. But the biggest problem was upstream. The auth wall was killing us before users ever saw what Royal Pawz offered.</p>
            </Card>
            <ResultBox variant="negative" metrics={[
              { value: "61.4%", label: "Signup Page Drop", color: "text-red-400" },
              { value: "14.7", label: "Avg Rage Clicks", color: "text-red-400" },
              { value: "2.8%", label: "Google Ads Conv.", color: "text-red-400" },
              { value: "68.3%", label: "Never Booked", color: "text-red-400" },
              { value: "$1,382", label: "Dec Net Rev" },
            ]} />
          </FadeIn>
        </section>


        {/* ═══ PHASE 2 ═══ */}
        <section id="phase2" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Zap} label="Phase 2" title="Kill the Auth Wall" /></FadeIn>
          <FadeIn>
            <p className="text-[12px] font-mono text-[#555] mb-6">Jan 19 – Mar 8, 2026</p>
            <Card title="What We Changed" defaultOpen>
              <p className="mb-4">The diagnosis from Phase 1 pointed to one root cause: <strong className="text-white">the auth wall had to go.</strong> Users shouldn&apos;t need to create an account, verify an email, and complete onboarding before they can even see what Royal Pawz offers. The entire entry point needed to change.</p>
              <p className="mb-4">On January 19th, we replaced <strong className="text-white">/auth/sign-up</strong> with a new <strong className="text-white">/book</strong> flow. No account required. Google Ads now sent users directly into the booking experience — enter your ZIP code, add your pets, pick a service, choose a time. Account creation moved to the very end, right before payment, after users had already built their appointment.</p>
              <p className="mb-4">Phase 2 involved two major changes working together:</p>
              <div className="space-y-3 mb-4">
                <div className="flex gap-3 p-3 bg-white/[0.02] rounded-lg">
                  <span className="text-[#7c5cfc] font-bold text-lg flex-shrink-0">1</span>
                  <div><strong className="text-white">Google Ads landing page fix.</strong> We changed the ad destination from the old homepage to <span className="font-mono text-[#7c5cfc]">/landing</span> — a purpose-built page with clear CTAs, optimized images, and a visible &quot;Book Now&quot; button on mobile. <strong className="text-white">This alone dropped bounce from 50%+ to ~10%.</strong></div>
                </div>
                <div className="flex gap-3 p-3 bg-white/[0.02] rounded-lg">
                  <span className="text-[#7c5cfc] font-bold text-lg flex-shrink-0">2</span>
                  <div><strong className="text-white">The /book flow rebuild.</strong> Removed the auth wall entirely. Users go from landing page → booking flow → account creation (at the end). This is the structural change that made the funnel actually convert.</div>
                </div>
              </div>
              <AlertBox type="info" title="Attribution Note">
                <p>Multiple variables changed during Phase 2 — we can&apos;t cleanly isolate the landing page fix from the /book migration. The bounce rate improvement is likely driven primarily by the landing page fix, while the conversion improvement comes from the /book flow. <strong className="text-white">The clean, single-variable attribution comes in Phases 3 and 4</strong> where we ran controlled A/B tests.</p>
              </AlertBox>
              <FlowSteps steps={[
                { label: "Google Ad" },
                { label: "/book", type: "new" },
                { label: "ZIP Code" },
                { label: "Add Pets" },
                { label: "Select Service" },
                { label: "Customize" },
                { label: "Pick Time" },
                { label: "Create Account" },
                { label: "Pay" },
              ]} />
            </Card>
            <Card title="What Happened" defaultOpen>
              <Observation>
                The difference was immediate. Session recordings showed users engaging with the booking flow within seconds of landing — entering their ZIP, browsing services, adding their dog. <strong className="text-white">No more rage clicks. No more confused scrolling. They were booking — not bouncing.</strong>
              </Observation>
              <p className="mb-4">Bounce rate dropped from 43.6% to 12.1% — a <strong className="text-white">72% improvement</strong>. Net service revenue jumped to $6,849 in February — nearly 5x December&apos;s $1,382. The auth wall had been the single biggest obstacle between Royal Pawz and its customers.</p>
              <p>But the /book flow was brand new, and we knew there was room to optimize within it. <strong className="text-white">The funnel was working — now it was time to tune it.</strong></p>
            </Card>
            <ResultBox variant="improved" metrics={[
              { value: "12.1%", label: "Bounce Rate", color: "text-cyan-400" },
              { value: "1,064", label: "Feb Visitors" },
              { value: "64", label: "Feb Bookings" },
              { value: "$6,849", label: "Feb Net Rev" },
              { value: "$131", label: "AOV", color: "text-cyan-400" },
            ]} />
          </FadeIn>
        </section>


        {/* ═══ PHASE 3 ═══ */}
        <section id="phase3" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Target} label="Phase 3" title="The Counter-Intuitive Bet" /></FadeIn>
          <FadeIn>
            <p className="text-[12px] font-mono text-[#555] mb-6">Mar 9 – 14, 2026 · A/B Test · 43 sessions</p>
            <Card title="The Hypothesis" defaultOpen>
              <p className="mb-4">By early March, Phase 2 had been running for seven weeks. Bounce was consistently low. But we had a new observation: most drop-offs in the booking flow happened at the very first step — <strong className="text-white">the ZIP code entry</strong>.</p>
              <p className="mb-4">Users clicked &quot;Book Now&quot; and immediately hit a form field. No transition, no context. We had a hypothesis that went against every conversion playbook: <em className="text-white">what if we added a step?</em></p>
              <p>A simple <strong className="text-white">intro screen</strong> — &quot;Here&apos;s how booking works: enter your ZIP, add your pets, pick a time&quot; — before the ZIP code field.</p>
              <div className="mt-4">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">✓ Variant A — Intro Screen (Winner)</div>
                <FlowSteps steps={[
                  { label: "Intro Screen", type: "highlight" },
                  { label: "ZIP Code" },
                  { label: "Add Pets" },
                  { label: "Contact Info" },
                  { label: "Book" },
                ]} />
                <div className="text-[11px] font-semibold text-[#666] uppercase tracking-wider mb-1 mt-2">Variant B — Direct ZIP (Control)</div>
                <FlowSteps steps={[
                  { label: "ZIP Code" },
                  { label: "Add Pets" },
                  { label: "Contact Info" },
                  { label: "Book" },
                ]} />
              </div>
            </Card>
            <Card title="The Result" defaultOpen>
              <Observation>
                Despite adding friction, the intro screen <strong className="text-white">doubled the conversion rate</strong>. Users who read the intro and chose to continue were self-selecting for intent. The extra step acted as a commitment micro-filter — those who clicked through were telling us &quot;yes, I actually want to book.&quot;
              </Observation>
              <p className="mb-4">43 sessions. 5 days. A strong directional signal. We shipped the intro screen as default and turned our attention to the next opportunity.</p>
              <AlertBox type="warning" title="On Sample Size">
                <p>At n=43 (21 vs 22), this result is directionally strong but below traditional statistical significance thresholds. We shipped based on the quantitative signal combined with qualitative evidence from session recordings — users in the intro variant showed markedly more purposeful behavior. <strong className="text-white">We continue to monitor this metric post-deployment.</strong></p>
              </AlertBox>
            </Card>
            <ResultBox variant="positive" metrics={[
              { value: "19.0%", label: "Winner Conv.", color: "text-emerald-400" },
              { value: "9.1%", label: "Control Conv.", color: "text-[#666]" },
              { value: "+109%", label: "Lift", color: "text-emerald-400" },
              { value: "43", label: "Sessions" },
            ]} />
          </FadeIn>
        </section>


        {/* ═══ PHASE 4 ═══ */}
        <section id="phase4" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={TrendingUp} label="Phase 4" title="Ask Early, Convert Often" /></FadeIn>
          <FadeIn>
            <p className="text-[12px] font-mono text-[#555] mb-6">Mar 14 – 18, 2026 · A/B Test · 54 sessions</p>
            <Card title="The Hypothesis" defaultOpen>
              <p className="mb-4">Fresh off the intro screen win, we dug into the remaining drop-off data. A pattern emerged: users were adding pets, customizing services, choosing times — investing 5–10 minutes of effort — then <strong className="text-white">abandoning at the contact info step.</strong></p>
              <p className="mb-4">They&apos;d done all the work. They just wouldn&apos;t give us their name.</p>
              <p className="mb-4">The insight came from behavioral psychology. Once someone invests their identity — their real name, their email — they create a psychological anchor. We tested moving the contact info step from <strong className="text-white">late</strong> in the funnel (after scheduling) to <strong className="text-white">early</strong> (right after adding pets, before customization).</p>
              <div>
                <div className="text-[11px] font-semibold text-[#666] uppercase tracking-wider mb-1">Variant A — Info Late (Control)</div>
                <FlowSteps steps={[
                  { label: "ZIP" },
                  { label: "Pets" },
                  { label: "Customize" },
                  { label: "Schedule" },
                  { label: "Contact Info", type: "friction" },
                  { label: "Checkout" },
                ]} />
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1 mt-2">✓ Variant B — Info Early (Winner)</div>
                <FlowSteps steps={[
                  { label: "ZIP" },
                  { label: "Pets" },
                  { label: "Contact Info", type: "new" },
                  { label: "Customize" },
                  { label: "Schedule" },
                  { label: "Checkout" },
                ]} />
              </div>
            </Card>
            <Card title="The Result" defaultOpen>
              <Observation>
                Users who provided contact info early didn&apos;t just convert more — <strong className="text-white">they spent more.</strong> AOV jumped from $130 to $158. Once committed, users were more likely to add premium services and add-ons. The customization step became about enhancing their appointment, not deciding whether to have one. And early account creation meant we could follow up on abandoned carts via SMS.
              </Observation>
              <p className="mb-4">54 sessions. 4 days. <strong className="text-white">334% conversion lift and 21.6% higher <Term>AOV</Term>.</strong> The winning variant went live as the default. In under three months, we&apos;d taken a 43% bounce rate to a funnel where nearly 1 in 3 visitors complete a booking.</p>
              <AlertBox type="warning" title="On Sample Size">
                <p>At n=54 (26 vs 28), this is a larger signal than Test 1 but still below traditional statistical significance for a 4-day window. The magnitude of the lift (334%) and the dual improvement (conversion + AOV) give us high confidence in the direction. <strong className="text-white">Ongoing monitoring continues to validate these numbers as traffic accumulates.</strong></p>
              </AlertBox>
            </Card>
            <ResultBox variant="positive" metrics={[
              { value: "30.8%", label: "Winner Conv.", color: "text-emerald-400" },
              { value: "7.1%", label: "Control Conv.", color: "text-[#666]" },
              { value: "+334%", label: "Conv. Lift", color: "text-emerald-400" },
              { value: "+21.6%", label: "AOV Lift", color: "text-emerald-400" },
              { value: "54", label: "Sessions" },
            ]} />
          </FadeIn>
        </section>


        {/* ═══ THE EVIDENCE ═══ */}
        <section id="evidence" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={BarChart3} label="Data" title="The Bigger Picture" /></FadeIn>
          <FadeIn>
            <p className="text-[#888] text-[17px] leading-relaxed mb-6">Four months of performance across all four phases — with an honest split between new customer acquisition and repeat booking revenue.</p>
            <Card title="Monthly Performance" defaultOpen>
              <DataTable
                headers={["Month", "Visitors", "New Book.", "Repeat", "New Rev", "Repeat Rev", "Net Rev", "Bounce", "Ad Spend"]}
                rows={[
                  [{ text: "Dec '25", color: "text-white font-semibold" }, "169", "16", "0", "$1,382", "—", "$1,382", { text: "43.6%", color: "text-red-400" }, "$451"],
                  [{ text: "Jan '26", color: "text-white font-semibold" }, "1,199", "25", "9", "$2,205", "$855", "$3,060", { text: "39.6%", color: "text-amber-400" }, "$856"],
                  [{ text: "Feb '26", color: "text-white font-semibold" }, "1,064", "51", "13", { text: "$5,610", color: "text-white font-semibold" }, "$1,239", { text: "$6,849", color: "text-emerald-400 font-semibold" }, { text: "12.4%", color: "text-emerald-400" }, "$896"],
                  [{ text: "Mar '26 *", color: "text-white font-semibold" }, "882", "37", "25", { text: "$4,791", color: "text-white font-semibold" }, "$2,696", { text: "$7,486", color: "text-emerald-400 font-semibold" }, { text: "10.5%", color: "text-emerald-400" }, "$704"],
                ]}
              />
              <p className="text-[13px] text-[#555] mt-3">* March data through March 18 only. Revenue is <strong className="text-white">net service revenue</strong> — excludes tips (go to groomers) and sales tax. Ad spend from Google Ads weekly data (clicks × <Term>CPC</Term>).</p>
            </Card>
          </FadeIn>
        </section>


        {/* ═══ THE EXPERIMENTS ═══ */}
        <section id="experiments" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Target} label="A/B Tests" title="The Experiments, In Detail" /></FadeIn>
          <FadeIn>
            <p className="text-[#888] text-[17px] leading-relaxed mb-6">Randomized traffic, tracked events, single-variable tests — the cleanest numbers in this report.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card title="Test 1: Intro Screen vs Direct ZIP" defaultOpen>
                <p className="text-[13px] font-mono text-[#555] mb-4">Mar 9–14 · 43 sessions</p>
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">✓ Variant A — Intro Screen · 19.0%</div>
                  <FunnelBar label="Entered" count={21} total={21} variant="winner" />
                  <FunnelBar label="Intro" count={16} total={21} variant="winner" />
                  <FunnelBar label="ZIP" count={12} total={21} variant="winner" />
                  <FunnelBar label="Pets" count={12} total={21} variant="winner" />
                  <FunnelBar label="Contact" count={7} total={21} variant="winner" />
                  <FunnelBar label="Booked" count={4} total={21} variant="winner" />
                </div>
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-[#666] uppercase tracking-wider mb-2">Variant B — Direct ZIP · 9.1%</div>
                  <FunnelBar label="Entered" count={22} total={22} variant="control" />
                  <FunnelBar label="ZIP" count={20} total={22} variant="control" />
                  <FunnelBar label="Pets" count={20} total={22} variant="control" />
                  <FunnelBar label="Contact" count={4} total={22} variant="control" />
                  <FunnelBar label="Booked" count={2} total={22} variant="control" />
                </div>
                <div className="bg-emerald-500/[0.06] border border-emerald-500/15 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-emerald-400">+109%</div>
                  <div className="text-[11px] text-[#888]">conversion lift</div>
                </div>
              </Card>

              <Card title="Test 2: Info Step Placement" defaultOpen>
                <p className="text-[13px] font-mono text-[#555] mb-4">Mar 14–18 · 54 sessions</p>
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">✓ Variant B — Info Early · 30.8%</div>
                  <FunnelBar label="Entered" count={26} total={26} variant="winner" />
                  <FunnelBar label="Info" count={14} total={26} variant="winner" />
                  <FunnelBar label="Checkout" count={10} total={26} variant="winner" />
                  <FunnelBar label="Booked" count={8} total={26} variant="winner" />
                </div>
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-[#666] uppercase tracking-wider mb-2">Variant A — Info Late · 7.1%</div>
                  <FunnelBar label="Entered" count={28} total={28} variant="control" />
                  <FunnelBar label="Info" count={3} total={28} variant="control" />
                  <FunnelBar label="Checkout" count={3} total={28} variant="control" />
                  <FunnelBar label="Booked" count={2} total={28} variant="control" />
                </div>
                <div className="bg-emerald-500/[0.06] border border-emerald-500/15 rounded-lg p-4 flex gap-6 justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-emerald-400">+334%</div>
                    <div className="text-[11px] text-[#888]">conversion lift</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-emerald-400">+21.6%</div>
                    <div className="text-[11px] text-[#888]">AOV lift ($130 → $158)</div>
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>
        </section>


        {/* ═══ THE HONEST MATH ═══ */}
        <section id="economics" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={DollarSign} label="Unit Economics" title="The Honest Math" /></FadeIn>
          <FadeIn>
            <p className="text-[#888] text-[17px] leading-relaxed mb-6">Separating what the funnel creates from what retention compounds — because the only numbers worth sharing are the ones you can defend.</p>
            <AlertBox type="info" title="Revenue = Net Service Revenue">
              <p>All revenue figures in this report are <strong className="text-white">net service revenue</strong> — the actual money the business earns for grooming services. Tips (which go to groomers) and sales tax (which goes to the state) are excluded. This gives a more honest picture of business performance than gross booking totals.</p>
            </AlertBox>
            <div className="flex flex-wrap gap-3 mb-6">
              <MetricCard label="Avg Customer LTV" value="$154" sub="Median $121 · net service rev" color="text-[#4ade80]" />
              <MetricCard label="Repeat Rate" value="30.9%" sub="38 of 123 clients rebook" color="text-[#5cb8ff]" />
              <MetricCard label="Repeat Avg Bookings" value="2.45" sub="Among clients who return" color="text-[#7c5cfc]" />
              <MetricCard label="Repeat Rev Share (Mar)" value="36.0%" sub="$2,696 of $7,486 net" color="text-amber-400" />
            </div>

            <Card title="Google Ads CPA — Week by Week" defaultOpen>
              <p className="mb-4"><Term>CPA</Term> isn&apos;t a static number — it&apos;s a trailing indicator of funnel quality. Here&apos;s the week-by-week breakdown straight from Google Ads, showing exactly when each change hit.</p>
              <AlertBox type="info" title="First-Time Bookings Only">
                <p>This section focuses exclusively on <strong className="text-white">new customer acquisition</strong> — the cost to get a brand-new customer&apos;s first booking. Repeat bookings are excluded. Signup and booking counts come from Supabase (all traffic sources). Since not all bookings come from Google Ads, the estimated CPA is a ceiling — the real Google-only CPA is likely lower.</p>
              </AlertBox>
              <div className="mb-4">
                <div className="text-[12px] font-semibold text-red-400 uppercase tracking-wider mb-2">Phase 1 — Auth Wall Live (Dec 1 – Jan 18)</div>
                <DataTable
                  headers={["Week", "Ad Spend", "Signups", "1st Bookings", "Signup → Book", "Est. CPA / 1st Book"]}
                  rows={[
                    ["Dec 1 – 7", "$23", "5", "1", "20%", "$23.03"],
                    ["Dec 8 – 14", "$95", "9", "2", "22%", "$47.60"],
                    ["Dec 15 – 21", "$128", "19", "7", "37%", "$18.28"],
                    ["Dec 22 – 28", "$119", "17", "3", "18%", "$39.79"],
                    ["Dec 29 – Jan 4", "$86", "5", "2", "40%", "$42.78"],
                    ["Jan 5 – 11", "$114", "4", "4", "100%", "$28.55"],
                    ["Jan 12 – 18", "$191", "9", "6", "67%", "$31.79"],
                  ]}
                />
                <p className="text-[13px] text-[#555] mt-2">68 signups → 25 first-time bookings (36.8% conversion). $756 total ad spend. <strong className="text-white">~$30.24 avg estimated CPA per new customer.</strong> Google Ads conversion tracking was misconfigured — reported only 4 &quot;conversions&quot; vs 68 actual signups.</p>
              </div>
              <div className="mb-4">
                <div className="text-[12px] font-semibold text-cyan-400 uppercase tracking-wider mb-2">Phase 2 — Landing Page Live · ~Jan 19</div>
                <p className="text-[14px] text-[#888] mb-3">~Jan 19: Google Ads destination changed to <span className="font-mono text-[#7c5cfc]">/landing</span>. Google was still tracking signups as the conversion event (not bookings). Booking counts below are actual first-time bookings from Supabase.</p>
                <DataTable
                  headers={["Week", "Ad Spend", "Signups", "1st Bookings", "Signup → Book", "Est. CPA / 1st Book"]}
                  rows={[
                    [{ text: "Jan 19 – 25 ★", color: "text-cyan-400 font-semibold" }, "$176", "26", "6", "23%", { text: "$29.26", color: "text-cyan-400" }],
                    ["Jan 26 – Feb 1", "$165", "35", "7", "20%", { text: "$23.59", color: "text-cyan-400" }],
                    ["Feb 2 – 8", "$186", "35", "13", "37%", { text: "$14.30", color: "text-emerald-400" }],
                    ["Feb 9 – 15", "$267", "41", "12", "29%", { text: "$22.27", color: "text-cyan-400" }],
                    ["Feb 16 – 22", "$171", "32", "12", "38%", { text: "$14.25", color: "text-emerald-400" }],
                    ["Feb 23 – Mar 1", "$271", "61", "11", "18%", { text: "$24.68", color: "text-cyan-400" }],
                  ]}
                />
                <p className="text-[13px] text-[#555] mt-2">230 signups → 61 first-time bookings (26.5% conversion). $1,237 total ad spend. <strong className="text-white">~$20.27 avg estimated CPA per new customer</strong> — 33% improvement over Phase 1.</p>
              </div>
              <div className="mb-4">
                <div className="text-[12px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">Phase 3–4 — Public /book Flow + Booking Conversion Tracking (Mar 6+)</div>
                <p className="text-[14px] text-[#888] mb-3">Mar 6: Google Ads conversion event switched to completed bookings. Mar 9: the public <span className="font-mono text-[#7c5cfc]">/book</span> flow launched — <strong className="text-white">no signup required.</strong> Users book as guests; account creation happens silently in the background. There is no separate &quot;signup&quot; step.</p>
                <DataTable
                  headers={["Week", "Ad Spend", "1st Bookings", "Est. CPA / 1st Booking"]}
                  rows={[
                    ["Mar 2 – 8", "$214", "12", { text: "$17.87", color: "text-emerald-400" }],
                    [{ text: "Mar 9 – 15 ★", color: "text-emerald-400 font-semibold" }, "$350", "16", { text: "$21.89", color: "text-emerald-400" }],
                    [{ text: "Mar 16 – 18", color: "text-white font-semibold" }, "$139", "7", { text: "$19.88", color: "text-emerald-400" }],
                  ]}
                />
                <p className="text-[13px] text-[#555] mt-2">35 first-time bookings. $704 total ad spend. <strong className="text-white">~$20.10 avg estimated CPA per new customer.</strong> No separate signup step — the /book flow handles account creation silently during checkout.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <MetricCard label="Phase 1 CPA" value="~$30" sub="Per 1st booking (Dec–Jan 18)" color="text-red-400" />
                <MetricCard label="Phase 2+ CPA" value="~$20" sub="Per 1st booking (Jan 19+)" color="text-emerald-400" />
                <MetricCard label="Best Week" value="$14.25" sub="Feb 16 — 12 new customers" color="text-[#7c5cfc]" />
                <MetricCard label="Signup → 1st Book" value="31.2%" sub="121 of 388 signups booked" color="text-[#4ade80]" />
              </div>
              <p className="text-[13px] text-[#555] mt-3">All booking counts are <strong className="text-white">first-time bookings only</strong> from Supabase (all traffic sources). Estimated CPA divides total Google Ads spend by all-source first bookings — the real Google-only CPA is lower since ~50% of new customers come from direct/word-of-mouth. The landing page change (~Jan 19) cut estimated CPA by 33%.</p>
            </Card>

            <Card title="Customer Acquisition by Channel" defaultOpen>
              <DataTable
                headers={["Month", "New Customers", "Google Ads", "Direct / WOM", "Other", "Google CPA", "Google 1st ROAS"]}
                rows={[
                  [{ text: "Dec '25", color: "text-white font-semibold" }, "14", "0 *", "14", "0", "—", "—"],
                  [{ text: "Jan '26", color: "text-white font-semibold" }, "24", "8 (33%)", "16", "0", "$83.88", "~1.3x"],
                  [{ text: "Feb '26", color: "text-white font-semibold" }, "49", { text: "30 (61%)", color: "text-emerald-400" }, "14", "5", { text: "$28.90", color: "text-emerald-400" }, { text: "~4.5x", color: "text-emerald-400" }],
                  [{ text: "Mar '26", color: "text-white font-semibold" }, "34", { text: "18 (53%)", color: "text-emerald-400" }, "15", "1", { text: "$40.17", color: "text-emerald-400" }, { text: "~3.8x", color: "text-emerald-400" }],
                ]}
              />
              <p className="text-[13px] text-[#555] mt-3">* Dec session matching limited. Direct/WOM customers cost $0 to acquire. The funnel optimization benefits all traffic sources equally.</p>
            </Card>

            <Card title="Business Economics" defaultOpen>
              <p className="mb-4">Revenue tells half the story. Here&apos;s how the business actually works.</p>
              <div className="space-y-3">
                <div className="flex gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="text-emerald-400 font-bold text-lg flex-shrink-0 w-24 text-right font-mono">$6,000</div>
                  <div><strong className="text-white">Monthly breakeven.</strong> Below $6K in monthly revenue, the business is covering fixed costs (insurance, van maintenance, supplies, software). Above $6K, margin kicks in.</div>
                </div>
                <div className="flex gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="text-[#7c5cfc] font-bold text-lg flex-shrink-0 w-24 text-right font-mono">45%</div>
                  <div><strong className="text-white">Margin above breakeven.</strong> Every dollar of net revenue past $6K, 45 cents is available for reinvestment. February ($6,849) and March ($7,486) are both above breakeven — that surplus goes back into growth.</div>
                </div>
                <div className="flex gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="text-cyan-400 font-bold text-lg flex-shrink-0 w-24 text-right font-mono">100%</div>
                  <div><strong className="text-white">Reinvestment rate.</strong> Currently all margin is being reinvested into the business — more ad spend, service expansion, equipment. The focus is growth, not extraction.</div>
                </div>
              </div>
            </Card>

            <Card title="Customer Cohort Retention" defaultOpen>
              <p className="mb-4"><Term>LTV</Term> is a function of how often customers come back. Here&apos;s how each monthly cohort is developing over time — averaged across all customers in the cohort, including those who haven&apos;t returned yet.</p>
              <DataTable
                headers={["Cohort", "Customers", "Month 1", "Month 2", "Month 3", "Month 4", "Avg LTV", "M2 Retention"]}
                rows={[
                  [{ text: "Nov '25", color: "text-white font-semibold" }, "2", "$106", "—", "—", "—", "$106", "—"],
                  [{ text: "Dec '25", color: "text-white font-semibold" }, "14", "$152", "$94", "$58", "$7", { text: "$311", color: "text-emerald-400 font-semibold" }, { text: "50.0%", color: "text-emerald-400" }],
                  [{ text: "Jan '26", color: "text-white font-semibold" }, "24", "$127", "$38", "$11", "—", "$176", { text: "29.2%", color: "text-emerald-400" }],
                  [{ text: "Feb '26", color: "text-white font-semibold" }, "48", "$156", "$22", "—", "—", "$178", "12.5%"],
                  [{ text: "Mar '26 *", color: "text-white font-semibold" }, "35", "$159", "—", "—", "—", "$159", "—"],
                ]}
              />
              <p className="text-[13px] text-[#555] mt-3">* March cohort still in first month. Values shown are average revenue per customer per month (non-rebookers count as $0). M2 Retention = % of cohort that booked again in month 2. December cohort is the standout at <strong className="text-white">$311 avg LTV</strong> with 50% rebooking — and still growing.</p>
              <AlertBox type="info" title="Why Recent Cohorts Look Low">
                <p className="mb-2">Dog grooming is a <strong className="text-white">6–8 week repeat cycle</strong> — most pet owners rebook every 1.5–2 months, not every 30 days. That means the rebooking window for recent cohorts hasn&apos;t opened yet:</p>
                <div className="space-y-1.5 mt-3 text-[15px]">
                  <div className="flex gap-2"><span className="text-emerald-400 font-semibold flex-shrink-0">Dec cohort →</span> <span>Had 3+ months to rebook. 50% retention, $311 LTV. This is the mature benchmark.</span></div>
                  <div className="flex gap-2"><span className="text-amber-400 font-semibold flex-shrink-0">Jan cohort →</span> <span>Had 2 months. 29% already rebooked, LTV still climbing.</span></div>
                  <div className="flex gap-2"><span className="text-[#7c5cfc] font-semibold flex-shrink-0">Feb cohort →</span> <span>First rebookings expected late March–April (6–8 weeks out). 12.5% have already returned — the rest are likely still within their normal grooming cycle.</span></div>
                  <div className="flex gap-2"><span className="text-cyan-400 font-semibold flex-shrink-0">Mar cohort →</span> <span>Won&apos;t start rebooking until May. Too early to measure retention.</span></div>
                </div>
                <p className="mt-3"><strong className="text-white">The December cohort is the leading indicator</strong> — $311 in just 3.5 months, and still growing. A customer who rebooks every 6–8 weeks at ~$120 net per visit generates <strong className="text-white">$840–$1,040+ in annual LTV.</strong> The current $154 average is heavily deflated by recent cohorts who simply haven&apos;t had time to rebook yet. As these cohorts mature, we expect the platform-wide average to climb significantly — the Dec cohort is already on pace for <strong className="text-white">$1,000+ annualized.</strong></p>
              </AlertBox>
            </Card>

            <AlertBox type="info" title="How to Read These Numbers">
              <p className="mb-2"><strong className="text-white">The funnel optimization directly impacts new customer acquisition</strong> — bounce rate, conversion rate, and first-booking <Term>AOV</Term> are all under its control. The A/B test results (30.8% conversion, +21% AOV) are clean, controlled experiments that prove this.</p>
              <p className="mb-2"><strong className="text-white">Repeat revenue is a separate value driver.</strong> By March, 36% of net revenue came from returning customers. This compounds the value of every new customer acquired, but it&apos;s driven by service quality, not funnel design.</p>
              <p><strong className="text-white">Not all new customers come from ads.</strong> Roughly half in Feb–Mar came through direct/word-of-mouth. The funnel benefits all traffic equally — but ad spend only deserves credit for the customers it brought in.</p>
            </AlertBox>

            {/* Two flywheel visualizations */}
            <div className="space-y-6 mt-8">
              {/* Flywheel 1: CPA vs First Booking */}
              <div>
                <div className="text-[12px] font-semibold text-[#555] uppercase tracking-wider mb-3 text-center">First Booking Economics</div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 bg-[#141420] border border-blue-400/15 rounded-xl p-6 text-center w-full">
                    <div className="text-[12px] text-blue-400 uppercase tracking-wider font-semibold mb-2">Cost to Acquire</div>
                    <div className="text-4xl font-bold font-mono text-blue-400">~$20</div>
                    <div className="text-[13px] text-[#666] mt-1">est. CPA per new customer</div>
                  </div>
                  <ArrowRight size={24} className="text-[#444] rotate-90 sm:rotate-0 flex-shrink-0" />
                  <div className="flex-1 bg-[#141420] border border-emerald-500/15 rounded-xl p-6 text-center w-full">
                    <div className="text-[12px] text-emerald-400 uppercase tracking-wider font-semibold mb-2">First Booking Value</div>
                    <div className="text-4xl font-bold font-mono text-emerald-400">~$120</div>
                    <div className="text-[13px] text-[#666] mt-1">avg net rev, 1st booking</div>
                  </div>
                  <ArrowRight size={24} className="text-[#444] rotate-90 sm:rotate-0 flex-shrink-0" />
                  <div className="flex-1 bg-[#141420] border border-[#7c5cfc]/15 rounded-xl p-6 text-center w-full">
                    <div className="text-[12px] text-[#7c5cfc] uppercase tracking-wider font-semibold mb-2">First-Booking Return</div>
                    <div className="text-4xl font-bold font-mono text-[#7c5cfc]">6x</div>
                    <div className="text-[13px] text-[#666] mt-1">revenue vs acquisition cost</div>
                  </div>
                </div>
                <p className="text-center text-[#777] text-[14px] mt-3">The first booking alone pays back acquisition cost 6x over. Everything after is profit.</p>
              </div>

              {/* Flywheel 2: CPA vs LTV */}
              <div>
                <div className="text-[12px] font-semibold text-[#555] uppercase tracking-wider mb-3 text-center">Lifetime Economics</div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 bg-[#141420] border border-blue-400/15 rounded-xl p-6 text-center w-full">
                    <div className="text-[12px] text-blue-400 uppercase tracking-wider font-semibold mb-2">Cost to Acquire</div>
                    <div className="text-4xl font-bold font-mono text-blue-400">~$20</div>
                    <div className="text-[13px] text-[#666] mt-1">est. CPA per new customer</div>
                  </div>
                  <ArrowRight size={24} className="text-[#444] rotate-90 sm:rotate-0 flex-shrink-0" />
                  <div className="flex-1 bg-[#141420] border border-emerald-500/15 rounded-xl p-6 text-center w-full">
                    <div className="text-[12px] text-emerald-400 uppercase tracking-wider font-semibold mb-2">Current Avg LTV</div>
                    <div className="text-4xl font-bold font-mono text-emerald-400">$154</div>
                    <div className="text-[13px] text-[#666] mt-1">net service rev (5 months)</div>
                  </div>
                  <ArrowRight size={24} className="text-[#444] rotate-90 sm:rotate-0 flex-shrink-0" />
                  <div className="flex-1 bg-[#141420] border border-amber-400/15 rounded-xl p-6 text-center w-full">
                    <div className="text-[12px] text-amber-400 uppercase tracking-wider font-semibold mb-2">Projected Annual LTV</div>
                    <div className="text-4xl font-bold font-mono text-amber-400">$1,000+</div>
                    <div className="text-[13px] text-[#666] mt-1">retained customer, 6–8 wk cycle</div>
                  </div>
                  <ArrowRight size={24} className="text-[#444] rotate-90 sm:rotate-0 flex-shrink-0" />
                  <div className="flex-1 bg-[#141420] border border-[#7c5cfc]/15 rounded-xl p-6 text-center w-full">
                    <div className="text-[12px] text-[#7c5cfc] uppercase tracking-wider font-semibold mb-2">LTV-to-CAC</div>
                    <div className="text-4xl font-bold font-mono text-[#7c5cfc]">50x+</div>
                    <div className="text-[13px] text-[#666] mt-1">projected annual return</div>
                  </div>
                </div>
                <p className="text-center text-[#777] text-[14px] mt-3">Current LTV ($154) is based on only 5 months of data — most customers haven&apos;t had time to rebook yet. A retained customer rebooking every 6–8 weeks generates <strong className="text-white">$1,000+ annually</strong> in net service revenue. The Dec cohort ($311 in 3.5 months) is already on this trajectory.</p>
              </div>
            </div>
          </FadeIn>
        </section>


        {/* ═══ MARKET CONTEXT ═══ */}
        <section id="market" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Map} label="Context" title="Where This Sits in the Market" /></FadeIn>
          <FadeIn>
            <p className="text-[#888] text-[17px] leading-relaxed max-w-2xl mb-8">
              These numbers don&apos;t exist in a vacuum. Here&apos;s how Royal Pawz compares to the Houston mobile grooming market and industry benchmarks.
            </p>
            <Card title="Houston Mobile Grooming Landscape" defaultOpen>
              <p className="mb-4">Houston has <strong className="text-white">952,400 dog-owning households</strong> — 37% of the metro&apos;s 2.6 million households, ranking 4th among all U.S. metros for dog ownership. It&apos;s a massive market, and Houston&apos;s sprawling geography (665 sq mi) makes mobile grooming especially attractive.</p>
              <DataTable
                headers={["Competitor", "Online Booking", "Pricing Range", "Booking Flow", "Notes"]}
                rows={[
                  [{ text: "Royal Pawz USA", color: "text-[#7c5cfc] font-semibold" }, { text: "Full custom app", color: "text-emerald-400" }, "$75–$150+", { text: "4-step, no auth", color: "text-emerald-400" }, "A/B tested, 30.8% conv"],
                  [{ text: "Kontota", color: "text-white font-semibold" }, "MoeGo platform", "$50–$225", "Book via MoeGo", "Franchise, 5.0★ / 3,700+ reviews"],
                  [{ text: "Groomit", color: "text-white font-semibold" }, "App + website", "$80–$319", "National platform", "Tech platform, 4.8★ / 44K+ reviews"],
                  [{ text: "Furry Land", color: "text-white font-semibold" }, "MoeGo + phone", "$165+ (XL)", "Book via MoeGo", "100+ locations, franchise"],
                  [{ text: "Aussie Pet Mobile", color: "text-white font-semibold" }, "Phone/online", "Not listed", "Call/text/book", "National franchise, some closed"],
                  [{ text: "Heather's Mobile", color: "text-white font-semibold" }, "Member booking", "Member pricing", "Book via portal", "Boutique, cage-free"],
                ]}
              />
              <p className="text-[13px] text-[#555] mt-3">Pricing varies by dog size. Houston standard full groom ranges: small dogs $75–$110, medium $90–$130, large $110–$160+. Most competitors use third-party booking platforms (MoeGo) or phone/form — Royal Pawz is one of the only Houston mobile groomers with a fully custom booking flow optimized through A/B testing.</p>
            </Card>
            <Card title="Industry Benchmarks vs Royal Pawz" defaultOpen>
              <p className="mb-4">How our metrics stack up against published industry averages:</p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Booking Conversion Rate</div>
                    <div className="text-[15px] text-[#888]">Animals &amp; Pets Google Ads avg: 13.07% (WordStream). Home services: 7.33% (LocaliQ, 3,211 campaigns). General website avg: 2–5%.</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold font-mono text-emerald-400">30.8%</div>
                    <div className="text-[12px] text-emerald-400">2.4x pet industry avg</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Bounce Rate</div>
                    <div className="text-[15px] text-[#888]">Service site avg: 30–55% (Contentsquare). Mobile traffic: 40–60%. Median landing page: 60.1% (Unbounce).</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold font-mono text-emerald-400">10.5%</div>
                    <div className="text-[12px] text-emerald-400">3–6x better</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Google Ads <Term>CPC</Term></div>
                    <div className="text-[15px] text-[#888]">Pet grooming keywords: $1.50–$3.50 CPC. Overall Google avg: $4.51 (Backlinko). Home services avg: $7.85 (LocaliQ). Pet industry cost per lead: $31.82.</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold font-mono text-emerald-400">~$20</div>
                    <div className="text-[12px] text-emerald-400">Est. per 1st booking</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Repeat Rate</div>
                    <div className="text-[15px] text-[#888]">Local service businesses avg: 20–25% return rate within 6 months.</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold font-mono text-emerald-400">30.9%</div>
                    <div className="text-[12px] text-emerald-400">Above avg at 5 months</div>
                  </div>
                </div>
              </div>
              <p className="text-[13px] text-[#555] mt-4">Sources: WordStream Conversion Rate Benchmarks, LocaliQ Home Services Search Ad Benchmarks (2025, 3,211 campaigns), Unbounce Conversion Benchmark Report, Backlinko Google Ads Cost Report (2026), Contentsquare Digital Experience Benchmarks, Axios Houston / U.S. Census (dog ownership).</p>
            </Card>
          </FadeIn>
        </section>


        {/* ═══ TAKEAWAYS ═══ */}
        <section id="takeaways" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Check} label="Summary" title="What We Learned" /></FadeIn>
          <FadeIn>
            <div className="space-y-3">
              {[
                { icon: "$", color: "bg-emerald-500/10 text-emerald-400", text: "7.7x LTV-to-CPA. New customers cost an estimated ~$20 to acquire their first booking and generate $154 in net lifetime value. Best week hit $14.25 per new customer. Since ~50% of new customers come from word-of-mouth (free), the true blended CPA is even lower." },
                { icon: "A", color: "bg-[#7c5cfc]/10 text-[#7c5cfc]", text: "A/B testing produced a 334% conversion lift. The second test took booking conversion from 7.1% to 30.8% in a controlled experiment. This is the cleanest, most defensible number in the report." },
                { icon: "↓", color: "bg-cyan-400/10 text-cyan-400", text: "Bounce rate cut by 76%. Fixing the Google Ads landing page and moving from auth-first to value-first reduced bounce from 43.6% to 10.5%. This improvement benefits all traffic sources equally." },
                { icon: "↑", color: "bg-amber-400/10 text-amber-400", text: "Repeat revenue grew to 36% of total by month 5. $2,696 of $7,486 net revenue in March came from returning customers — built on service quality, compounding the value of every new customer." },
                { icon: "⚡", color: "bg-emerald-500/10 text-emerald-400", text: "Counter-intuitive wins. Adding more steps (intro screen) increased conversion. Asking for info earlier increased both conversion and AOV. Testing beat assumptions every time." },
                { icon: "∞", color: "bg-[#7c5cfc]/10 text-[#7c5cfc]", text: "Half the new customers come from word-of-mouth. 15 of 34 March new customers were direct/referral — zero acquisition cost. The funnel optimization benefits these free customers too." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-[#141420] border border-white/[0.06] rounded-xl">
                  <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>{item.icon}</div>
                  <p className="text-[16px] text-[#ccc] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>


        {/* ═══ WHAT'S NEXT ═══ */}
        <section id="next" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Compass} label="Forward" title="What&apos;s Next" /></FadeIn>
          <FadeIn>
            <p className="text-[#888] text-[17px] leading-relaxed max-w-2xl mb-8">
              The funnel is in a strong state. Rather than chase marginal gains with more split tests, we&apos;re shifting to a monitoring phase — letting data accumulate and watching for new patterns before making changes.
            </p>
            <div className="space-y-4">
              <div className="bg-[#141420] rounded-xl p-6 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[12px] font-semibold text-emerald-400 uppercase tracking-wider">Active Now</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Monitoring & Data Collection</h3>
                <p className="text-[16px] text-[#999] leading-relaxed">Continuing to gather session data, conversion metrics, and CPA trends across the optimized funnel. The A/B test results are directionally strong but need more volume to reach full statistical confidence. We expect 2–4 weeks of monitoring before the next round of changes.</p>
              </div>
              <div className="bg-[#141420] rounded-xl p-6 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#7c5cfc]" />
                  <span className="text-[12px] font-semibold text-[#7c5cfc] uppercase tracking-wider">Queued</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Next Analysis Pass</h3>
                <p className="text-[16px] text-[#999] leading-relaxed">Once we have 200+ sessions on the current funnel, we&apos;ll do a deep-dive into the new drop-off points. Where are users leaving now? Is there another counter-intuitive optimization hiding in the data? The session recording infrastructure captures everything — we just need volume.</p>
              </div>
              <div className="bg-[#141420] rounded-xl p-6 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-[12px] font-semibold text-cyan-400 uppercase tracking-wider">Advantage</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">The Custom Platform Edge</h3>
                <p className="text-[16px] text-[#999] leading-relaxed">Because we built the entire stack, we have access to data that wouldn&apos;t be possible with off-the-shelf tools — full session recordings, custom event tracking, real-time funnel analytics, and the ability to ship changes daily. No waiting for 1-week turnaround times. No paying for expensive plugins. We identify a problem, build the fix, push the code, and measure the result — often within 24 hours.</p>
              </div>
            </div>
          </FadeIn>
        </section>


        {/* ═══ TESTIMONIAL ═══ */}
        <section className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04]">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <Quote size={32} className="text-[#7c5cfc]/30 mx-auto mb-6" />
              <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6 italic">
                &ldquo;Working with Zapp Studios completely transformed our business. The booking system they built and the way they optimized our funnel — we went from barely getting customers online to having a system that just works.&rdquo;
              </blockquote>
              <div className="text-[15px] text-[#888]">— Royal Pawz USA, Houston TX</div>
              <div className="text-[12px] text-[#555] mt-1">Mobile Dog Grooming</div>
            </div>
          </FadeIn>
        </section>


        {/* ═══ GLOSSARY ═══ */}
        <section className="px-5 sm:px-10 lg:px-16 py-12 border-b border-white/[0.04]">
          <FadeIn>
            <Card title="Glossary — Terms Used in This Report" defaultOpen={false}>
              <p className="mb-4 text-[#888]">Hover over dotted-underlined terms throughout the report for quick definitions. Full glossary below.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {Object.entries(acronyms).map(([term, def]) => (
                  <div key={term} className="flex gap-3">
                    <span className="text-[#7c5cfc] font-bold font-mono w-12 flex-shrink-0 text-right">{term}</span>
                    <span className="text-[15px] text-[#999]">{def}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </section>


        {/* ═══ METHODOLOGY ═══ */}
        <section className="px-5 sm:px-10 lg:px-16 py-12 border-b border-white/[0.04]">
          <FadeIn>
            <Card title="Methodology & Data Sources" defaultOpen={false}>
              <div className="space-y-3 text-[15px] text-[#999]">
                <p><strong className="text-white">Data sources:</strong> Supabase (recording_sessions, bookings, ab_test_events, users tables), Google Ads budget history and conversion tracking.</p>
                <p><strong className="text-white">Ad spend estimates:</strong> Derived from daily budget caps with ~75% utilization factor. Total confirmed spend: $2,688.12 across the reporting period.</p>
                <p><strong className="text-white">Customer attribution:</strong> New vs repeat split based on first-booking detection per client_id. Source attribution via session referrer matching (utm_source for Google Ads, direct for organic/WOM).</p>
                <p><strong className="text-white">A/B testing:</strong> Randomized variant assignment at session start, tracked via custom ab_test_events table. Single-variable tests with concurrent control and treatment groups.</p>
                <p><strong className="text-white">LTV calculation:</strong> Net service revenue (excluding tips and sales tax) per customer, based on 123 customers over 5 months. LTV is still maturing — early cohorts show increasing value over time, so current figures likely understate true lifetime value.</p>
                <p><strong className="text-white">Timeline:</strong> Platform launched ~November 25, 2025. Session tracking installed December 26, 2025. Report period: Dec 26, 2025 – Mar 18, 2026.</p>
              </div>
            </Card>
          </FadeIn>
        </section>


        {/* ═══ FOOTER ═══ */}
        <footer className="px-5 sm:px-10 lg:px-16 py-12 text-center">
          <div className="text-base text-white font-semibold mb-1">Zapp Studios</div>
          <div className="text-[14px] text-[#888] mb-1">Revenue Engineering</div>
          <a href="https://www.zappstudios.us/revenue" className="text-[14px] text-[#7c5cfc] hover:underline">zappstudios.us/revenue</a>
          <div className="text-[13px] text-[#555] mt-6 max-w-xl mx-auto leading-relaxed">
            Prepared by Hamza, Founder · Zapp Studios · March 2026
          </div>
        </footer>

      </main>
    </div>
  )
}
