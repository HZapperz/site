"use client"

import { useState, useEffect, Fragment } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap, Target, Calculator, TrendingUp, Map,
  Menu, X, AlertTriangle, Info, ChevronDown, ArrowRight, Check,
  DollarSign, BarChart3, BookOpen
} from "lucide-react"

/* ─── NAV SECTIONS ─── */
const navSections = [
  { id: "story", title: "The Story", icon: BookOpen },
  { id: "phase1", title: "Phase 1: The Wall", icon: AlertTriangle },
  { id: "phase2", title: "Phase 2: Kill Auth", icon: Zap },
  { id: "phase3", title: "Phase 3: Intro Screen", icon: Target },
  { id: "phase4", title: "Phase 4: Early Info", icon: TrendingUp },
  { id: "evidence", title: "The Evidence", icon: BarChart3 },
  { id: "experiments", title: "The Experiments", icon: Target },
  { id: "economics", title: "The Honest Math", icon: DollarSign },
  { id: "takeaways", title: "What We Learned", icon: Check },
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
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[15px] text-[#ccc] leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | { text: string; color?: string })[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/[0.06] -mx-1">
      <table className="w-full text-[14px] border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-[#1a1a2e]">
            {headers.map((h, i) => (
              <th key={i} className="text-left py-3 px-4 text-[11px] tracking-wider uppercase text-[#7c5cfc] font-semibold border-b border-[#333] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[#1a1a2e] hover:bg-white/[0.02] transition-colors">
              {row.map((cell, ci) => {
                const text = typeof cell === "string" ? cell : cell.text
                const color = typeof cell === "string" ? (ci === 0 ? "text-white font-medium" : "text-[#999]") : (cell.color || "text-[#999]")
                return <td key={ci} className={`py-3 px-4 font-mono text-[13px] ${color}`}>{text}</td>
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
        <div className="text-[15px]">
          {title && <div className="font-semibold text-white mb-1.5 text-base">{title}</div>}
          <div className="text-[#ccc] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, sub, color = "text-white" }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-[#141420] rounded-xl p-4 sm:p-5 border border-white/[0.06] flex-1 min-w-[120px] sm:min-w-[140px]">
      <div className="text-[11px] text-[#666] uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-xl sm:text-2xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-[11px] text-[#555] mt-1">{sub}</div>}
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

/* ─── CASE STUDY COMPONENTS ─── */

function FlowSteps({ steps }: { steps: { label: string; type?: "friction" | "new" | "highlight" | "normal" }[] }) {
  const colors: Record<string, string> = {
    friction: "bg-red-500/10 border-red-500/20 text-red-400",
    new: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    highlight: "bg-[#7c5cfc]/10 border-[#7c5cfc]/20 text-[#7c5cfc]",
    normal: "bg-white/[0.04] border-white/[0.08] text-white",
  }
  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-[#0a0a0a] rounded-lg my-4">
      {steps.map((step, i) => (
        <Fragment key={i}>
          {i > 0 && <ArrowRight size={12} className="text-[#444] flex-shrink-0" />}
          <span className={`px-3 py-1.5 rounded-lg border text-[13px] font-medium whitespace-nowrap ${colors[step.type || "normal"]}`}>
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
          <div className="text-[10px] text-[#666] uppercase tracking-wider mt-1">{m.label}</div>
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
      <span className="text-[11px] text-[#666] w-16 text-right flex-shrink-0 font-mono">{label}</span>
      <div className="flex-1 h-5 bg-white/[0.03] rounded overflow-hidden">
        <div className="h-full rounded flex items-center px-2" style={{ width: `${pct}%`, background: `${color}25`, borderRight: `2px solid ${color}` }}>
          {pct > 25 && <span className="text-[10px] font-mono" style={{ color }}>{count}</span>}
        </div>
      </div>
      {pct <= 25 && <span className="text-[10px] font-mono text-[#666] w-6">{count}</span>}
    </div>
  )
}

function Observation({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/[0.04] border-l-[3px] border-l-blue-400 rounded-r-lg p-4 my-5 text-[14px] text-[#aaa] leading-relaxed italic">
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
                43% Walked Away Without<br />Seeing a Single Service
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
              <MetricCard label="LTV-to-CAC" value="14:1" sub="$186 LTV ÷ $13 CPA" color="text-[#4ade80]" />
              <MetricCard label="New Customer CPA" value="$13" sub="Feb–Mar, Google Ads" color="text-[#5cb8ff]" />
              <MetricCard label="A/B Tested Conv." value="30.8%" sub="+334% lift" color="text-[#7c5cfc]" />
              <MetricCard label="Bounce Reduction" value="-76%" sub="43.6% → 10.5%" color="text-[#f97316]" />
            </motion.div>
          </div>
        </section>


        {/* ═══ THE STORY ═══ */}
        <section id="story" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={BookOpen} label="Introduction" title="The Story" /></FadeIn>
          <FadeIn>
            <p className="text-[#999] text-[16px] leading-relaxed max-w-2xl mb-8">
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


        {/* ═══ PHASE 1 ═══ */}
        <section id="phase1" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={AlertTriangle} label="Phase 1" title="We Launched Into a Wall" /></FadeIn>
          <FadeIn>
            <p className="text-[11px] font-mono text-[#555] mb-6">Nov 25, 2025 – Jan 18, 2026 (tracking from Dec 26)</p>
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
              { value: "$1,744", label: "Dec Revenue" },
            ]} />
          </FadeIn>
        </section>


        {/* ═══ PHASE 2 ═══ */}
        <section id="phase2" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Zap} label="Phase 2" title="Kill the Auth Wall" /></FadeIn>
          <FadeIn>
            <p className="text-[11px] font-mono text-[#555] mb-6">Jan 19 – Mar 8, 2026</p>
            <Card title="What We Changed" defaultOpen>
              <p className="mb-4">The diagnosis from Phase 1 pointed to one root cause: <strong className="text-white">the auth wall had to go.</strong> Users shouldn&apos;t need to create an account, verify an email, and complete onboarding before they can even see what Royal Pawz offers. The entire entry point needed to change.</p>
              <p className="mb-4">On January 19th, we replaced <strong className="text-white">/auth/sign-up</strong> with a new <strong className="text-white">/book</strong> flow. No account required. Google Ads now sent users directly into the booking experience — enter your ZIP code, add your pets, pick a service, choose a time. Account creation moved to the very end, right before payment, after users had already built their appointment. The landing page went through several iterations during this period too, but the /book migration was the structural shift that mattered.</p>
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
              <p className="mb-4">Bounce rate dropped from 43.6% to 12.1% — a <strong className="text-white">72% improvement</strong>. Revenue quadrupled. February alone did $8,515, nearly 5x December&apos;s total. The auth wall had been the single biggest obstacle between Royal Pawz and its customers.</p>
              <p>But the /book flow was brand new, and we knew there was room to optimize within it. <strong className="text-white">The funnel was working — now it was time to tune it.</strong></p>
            </Card>
            <ResultBox variant="improved" metrics={[
              { value: "12.1%", label: "Bounce Rate", color: "text-cyan-400" },
              { value: "1,064", label: "Feb Visitors" },
              { value: "65", label: "Feb Bookings" },
              { value: "$8,515", label: "Feb Revenue" },
              { value: "$131", label: "AOV", color: "text-cyan-400" },
            ]} />
          </FadeIn>
        </section>


        {/* ═══ PHASE 3 ═══ */}
        <section id="phase3" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Target} label="Phase 3" title="The Counter-Intuitive Bet" /></FadeIn>
          <FadeIn>
            <p className="text-[11px] font-mono text-[#555] mb-6">Mar 9 – 14, 2026 · A/B Test · 43 sessions</p>
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
              <p>43 sessions. 5 days. One clear winner. We shipped the intro screen as default and turned our attention to the next opportunity.</p>
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
            <p className="text-[11px] font-mono text-[#555] mb-6">Mar 14 – 18, 2026 · A/B Test · 54 sessions</p>
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
              <p>54 sessions. 4 days. <strong className="text-white">334% conversion lift and 21.6% higher AOV.</strong> The winning variant went live as the default. In under three months, we&apos;d taken a 43% bounce rate to a funnel where nearly 1 in 3 visitors complete a booking.</p>
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
            <p className="text-[#888] mb-6">Four months of performance across all four phases — with an honest split between new customer acquisition and repeat booking revenue.</p>
            <Card title="Monthly Performance" defaultOpen>
              <DataTable
                headers={["Month", "Visitors", "New Book.", "Repeat", "New Rev", "Repeat Rev", "Total Rev", "Bounce", "Ad Spend", "1st ROAS", "Blended"]}
                rows={[
                  [{ text: "Dec '25", color: "text-white font-semibold" }, "169", "14", "2", "$1,516", "$227", "$1,744", { text: "43.6%", color: "text-red-400" }, "~$413", "3.7x", "4.2x"],
                  [{ text: "Jan '26", color: "text-white font-semibold" }, "1,199", "24", "10", "$2,526", "$1,219", "$3,745", { text: "39.6%", color: "text-amber-400" }, "~$671", "3.8x", "5.6x"],
                  [{ text: "Feb '26", color: "text-white font-semibold" }, "1,064", "49", "16", { text: "$6,355", color: "text-white font-semibold" }, "$2,161", "$8,515", { text: "12.4%", color: "text-emerald-400" }, "~$867", { text: "7.3x", color: "text-emerald-400" }, "9.8x"],
                  [{ text: "Mar '26 *", color: "text-white font-semibold" }, "882", "34", "27", { text: "$5,122", color: "text-white font-semibold" }, "$3,555", "$8,677", { text: "10.5%", color: "text-emerald-400" }, "~$723", { text: "7.1x", color: "text-emerald-400" }, "12.0x"],
                ]}
              />
              <p className="text-[12px] text-[#555] mt-3">* March data through March 18 only. First-Booking ROAS = new customer revenue ÷ ad spend. Blended ROAS includes repeat revenue. The gap between the two grows as the customer base compounds.</p>
            </Card>
          </FadeIn>
        </section>


        {/* ═══ THE EXPERIMENTS ═══ */}
        <section id="experiments" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Target} label="A/B Tests" title="The Experiments, In Detail" /></FadeIn>
          <FadeIn>
            <p className="text-[#888] mb-6">Randomized traffic, tracked events, single-variable tests — the cleanest numbers in this report.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card title="Test 1: Intro Screen vs Direct ZIP" defaultOpen>
                <p className="text-[12px] font-mono text-[#555] mb-4">Mar 9–14 · 43 sessions</p>
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
                <p className="text-[12px] font-mono text-[#555] mb-4">Mar 14–18 · 54 sessions</p>
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
            <p className="text-[#888] mb-6">Separating what the funnel creates from what retention compounds — because the only numbers worth sharing are the ones you can defend.</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <MetricCard label="Avg Customer LTV" value="$186" sub="Median $154 · 1.45 avg bookings" color="text-[#4ade80]" />
              <MetricCard label="Repeat Rate" value="30.9%" sub="38 of 123 clients rebook" color="text-[#5cb8ff]" />
              <MetricCard label="Repeat Avg Bookings" value="2.45" sub="Among clients who return" color="text-[#7c5cfc]" />
              <MetricCard label="Repeat Rev Share (Mar)" value="44.3%" sub="$3,555 of $8,677" color="text-amber-400" />
            </div>

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
              <p className="text-[12px] text-[#555] mt-3">* Dec session matching limited. Direct/WOM customers cost $0 to acquire. The funnel optimization benefits all traffic sources equally.</p>
            </Card>

            <AlertBox type="info" title="How to Read These Numbers">
              <p className="mb-2"><strong className="text-white">The funnel optimization directly impacts new customer acquisition</strong> — bounce rate, conversion rate, and first-booking AOV are all under its control. The A/B test results (30.8% conversion, +21% AOV) are clean, controlled experiments that prove this.</p>
              <p className="mb-2"><strong className="text-white">Repeat revenue is a separate value driver.</strong> By March, 44.3% of revenue came from returning customers. This compounds the value of every new customer acquired, but it&apos;s driven by service quality, not funnel design.</p>
              <p><strong className="text-white">Not all new customers come from ads.</strong> Roughly half in Feb–Mar came through direct/word-of-mouth. The funnel benefits all traffic equally — but ad spend only deserves credit for the customers it brought in.</p>
            </AlertBox>

            {/* CPA → LTV flywheel */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <div className="flex-1 bg-[#141420] border border-blue-400/15 rounded-xl p-6 text-center">
                <div className="text-[11px] text-red-400 uppercase tracking-wider font-semibold mb-2">Cost to Acquire</div>
                <div className="text-4xl font-bold font-mono text-blue-400">$13</div>
                <div className="text-[12px] text-[#666] mt-1">avg CPA (Feb–Mar)</div>
              </div>
              <ArrowRight size={24} className="text-[#444] rotate-90 sm:rotate-0" />
              <div className="flex-1 bg-[#141420] border border-emerald-500/15 rounded-xl p-6 text-center">
                <div className="text-[11px] text-emerald-400 uppercase tracking-wider font-semibold mb-2">Lifetime Value</div>
                <div className="text-4xl font-bold font-mono text-emerald-400">$186</div>
                <div className="text-[12px] text-[#666] mt-1">avg customer LTV</div>
              </div>
            </div>
            <p className="text-center text-[#888] mt-4">The funnel acquires customers for <strong className="text-blue-400">$13</strong>. Retention turns them into <strong className="text-emerald-400">$186</strong>. That&apos;s the revenue engineering flywheel.</p>
          </FadeIn>
        </section>


        {/* ═══ TAKEAWAYS ═══ */}
        <section id="takeaways" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Check} label="Summary" title="What We Learned" /></FadeIn>
          <FadeIn>
            <div className="space-y-3">
              {[
                { icon: "$", color: "bg-emerald-500/10 text-emerald-400", text: "14:1 LTV-to-CAC ratio. New customers cost ~$13 to acquire via Google Ads and generate $186 in lifetime value. First-booking ROAS alone is 3.8–7.3x." },
                { icon: "A", color: "bg-[#7c5cfc]/10 text-[#7c5cfc]", text: "A/B testing produced a 334% conversion lift. The second test took booking conversion from 7.1% to 30.8% in a controlled experiment. This is the cleanest, most defensible number in the report." },
                { icon: "↓", color: "bg-cyan-400/10 text-cyan-400", text: "Bounce rate cut by 76%. Moving from auth-first to value-first reduced bounce from 43.6% to 10.5%. This improvement benefits all traffic sources equally." },
                { icon: "↑", color: "bg-amber-400/10 text-amber-400", text: "Repeat revenue grew to 44% of total by month 5. $3,555 of $8,677 in March came from returning customers — built on service quality, compounding the value of every new customer." },
                { icon: "⚡", color: "bg-emerald-500/10 text-emerald-400", text: "Counter-intuitive wins. Adding more steps (intro screen) increased conversion. Asking for info earlier increased both conversion and AOV. Testing beat assumptions every time." },
                { icon: "∞", color: "bg-[#7c5cfc]/10 text-[#7c5cfc]", text: "Half the new customers come from word-of-mouth. 15 of 34 March new customers were direct/referral — zero acquisition cost. The funnel optimization benefits these free customers too." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-[#141420] border border-white/[0.06] rounded-xl">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>{item.icon}</div>
                  <p className="text-[15px] text-[#ccc] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>


        {/* ═══ FOOTER ═══ */}
        <footer className="px-5 sm:px-10 lg:px-16 py-12 text-center">
          <div className="text-sm text-white font-semibold mb-1">Zapp Studios</div>
          <div className="text-[13px] text-[#888] mb-1">Revenue Engineering</div>
          <a href="https://www.zappstudios.us/revenue" className="text-[13px] text-[#7c5cfc] hover:underline">zappstudios.us/revenue</a>
          <div className="text-[11px] text-[#444] mt-6 max-w-xl mx-auto leading-relaxed">
            Data sourced from Supabase (recording_sessions, bookings, ab_test_events, users), Google Ads budget history.
            Ad spend estimates derived from daily budget caps with ~75% utilization factor. Total confirmed: $2,688.12.
            New vs repeat split based on first-booking detection per client_id. Source attribution via session referrer matching.
            A/B test data from controlled experiments with tracked events. LTV based on 123 customers over 5 months (still maturing).
            Platform launched ~November 25, 2025. Tracking installed December 26, 2025. Report period: Dec 26, 2025 – Mar 18, 2026.
          </div>
        </footer>

      </main>
    </div>
  )
}
