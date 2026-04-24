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
        <Icon size={16} className="text-[#60A5FA]" />
        <span className="text-xs font-semibold text-[#60A5FA] tracking-widest uppercase">{label}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{title}</h2>
    </div>
  )
}

function Card({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`bg-[#1E293B] rounded-xl border overflow-hidden mb-4 transition-all duration-200 ${open ? "border-l-2 border-l-[#60A5FA] border-t-white/[0.06] border-r-white/[0.06] border-b-white/[0.06]" : "border border-white/[0.06]"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-white/[0.02] transition-colors cursor-pointer">
        <span className="text-white font-semibold text-base sm:text-lg text-left">{title}</span>
        <ChevronDown size={18} className={`text-[#60A5FA] transition-transform flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[16px] text-[#CBD5E1] leading-relaxed">{children}</div>
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
          <tr className="bg-[#334155]">
            {headers.map((h, i) => (
              <th key={i} className="text-left py-3 px-4 text-[12px] tracking-wider uppercase text-[#60A5FA] font-semibold border-b border-[#334155] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={`border-b border-[#1E293B] hover:bg-white/[0.03] transition-colors ${ri % 2 === 0 ? "bg-[#1E293B]/40" : "bg-transparent"}`}>
              {row.map((cell, ci) => {
                const text = typeof cell === "string" ? cell : cell.text
                const color = typeof cell === "string" ? (ci === 0 ? "text-white font-medium" : "text-[#94A3B8]") : (cell.color || "text-[#94A3B8]")
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
          <div className="text-[#CBD5E1] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, sub, color = "text-white" }: { label: string; value: string; sub?: string; color?: string }) {
  // Derive a border color from the text color class for the top accent
  const borderColor = color.includes("#60A5FA") ? "border-t-[#60A5FA]"
    : color.includes("#f97316") ? "border-t-orange-400"
    : color.includes("#34D399") ? "border-t-emerald-400"
    : color.includes("amber") ? "border-t-amber-400"
    : color.includes("red") ? "border-t-red-400"
    : color.includes("cyan") ? "border-t-cyan-400"
    : color.includes("emerald") ? "border-t-emerald-400"
    : "border-t-white/20"
  return (
    <div className={`bg-[#1E293B] rounded-xl p-4 sm:p-5 border border-white/[0.06] border-t-2 ${borderColor} flex-1 min-w-[120px] sm:min-w-[140px]`}>
      <div className="text-[11px] text-[#64748B] uppercase tracking-widest mb-1.5">{label}</div>
      <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${color}`}>{value}</div>
      {sub && <div className="text-[11px] text-[#64748B] mt-1.5 leading-snug">{sub}</div>}
    </div>
  )
}

function SectionDivider() {
  return (
    <div className="h-[2px] w-full" style={{ background: "linear-gradient(to right, transparent, #60A5FA33 30%, #60A5FA55 50%, #60A5FA33 70%, transparent)" }} />
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
  CPA: "Cost Per Acquisition - how much it costs to acquire one new customer",
  LTV: "Lifetime Value - total revenue a customer generates over their entire relationship",
  CAC: "Customer Acquisition Cost - total cost to acquire a new customer (same as CPA)",
  ROAS: "Return On Ad Spend - revenue generated per dollar spent on advertising",
  AOV: "Average Order Value - average revenue per booking/transaction",
  CPC: "Cost Per Click - how much each ad click costs",
  CPL: "Cost Per Lead - how much it costs to generate one lead",
  WOM: "Word of Mouth - customers acquired through referrals, not paid ads",
  CTR: "Click-Through Rate - percentage of people who click an ad after seeing it",
}

function Term({ children }: { children: string }) {
  const def = acronyms[children]
  if (!def) return <span className="font-semibold text-white">{children}</span>
  return (
    <span className="relative group/term inline-block">
      <span className="font-semibold text-white border-b border-dotted border-white/30 cursor-help">{children}</span>
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-[#334155] border border-white/10 text-[13px] text-[#CBD5E1] leading-snug w-64 opacity-0 group-hover/term:opacity-100 transition-opacity duration-150 z-50 shadow-xl text-center font-normal">
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
    highlight: "bg-[#60A5FA]/10 border-[#60A5FA]/20 text-[#60A5FA]",
    normal: "bg-white/[0.04] border-white/[0.08] text-white",
  }
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 p-4 bg-[#0F172A] rounded-lg my-4">
      {steps.map((step, i) => (
        <Fragment key={i}>
          {i > 0 && <ArrowRight size={12} className="text-[#475569] flex-shrink-0 rotate-90 sm:rotate-0 self-center" />}
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
          <div className="text-[11px] text-[#64748B] uppercase tracking-wider mt-1">{m.label}</div>
        </div>
      ))}
    </div>
  )
}

function FunnelBar({ label, count, total, variant = "winner" }: { label: string; count: number; total: number; variant?: "winner" | "control" }) {
  const pct = Math.round((count / total) * 100)
  const color = variant === "winner" ? "#34D399" : "#64748B"
  return (
    <div className="flex items-center gap-3 mb-1.5">
      <span className="text-[12px] text-[#64748B] w-16 text-right flex-shrink-0 font-mono">{label}</span>
      <div className="flex-1 h-5 bg-white/[0.03] rounded overflow-hidden">
        <div className="h-full rounded flex items-center px-2" style={{ width: `${pct}%`, background: `${color}25`, borderRight: `2px solid ${color}` }}>
          {pct > 25 && <span className="text-[11px] font-mono" style={{ color }}>{count}</span>}
        </div>
      </div>
      {pct <= 25 && <span className="text-[11px] font-mono text-[#64748B] w-6">{count}</span>}
    </div>
  )
}

function Observation({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/[0.04] border-l-[3px] border-l-blue-400 rounded-r-lg p-4 my-5 text-[15px] text-[#94A3B8] leading-relaxed italic">
      {children}
    </div>
  )
}

/* ─── DAILY CONVERSION TREND ─── */
// [sessions, bookings] per day: Dec 26 '25 → Apr 23 '26 (119 days)
const dailyRaw: [number, number][] = [
  [8,0],[24,0],[70,1],[59,0],[28,0],[10,0],[24,0],[35,3],[25,0],[24,0],
  [27,3],[88,0],[27,1],[81,0],[112,0],[81,0],[31,0],[28,0],[88,1],[58,3],
  [138,2],[208,2],[56,1],[45,0],[39,3],[45,0],[51,1],[33,4],[21,2],[31,0],
  [20,0],[31,1],[33,0],[51,3],[45,2],[40,1],[43,1],[32,1],[24,2],[43,1],
  [53,2],[48,3],[39,1],[42,3],[42,2],[51,5],[44,3],[46,3],[57,4],[44,0],
  [45,1],[31,1],[221,1],[19,1],[41,3],[54,5],[31,1],[43,2],[41,3],[36,3],
  [43,6],[66,3],[63,2],[66,1],[89,2],[64,1],[63,3],[74,3],[80,1],[185,2],
  [59,3],[28,2],[61,4],[101,6],[70,6],[53,2],[58,3],[63,6],[74,1],[46,6],
  [43,3],[49,4],[67,4],[61,2],[64,3],[75,3],[59,1],[31,6],[39,1],[85,2],
  [66,2],[133,10],[112,6],[33,5],[44,15],[36,3],[26,9],[50,9],[44,5],[25,4],
  [24,2],[25,4],[17,4],[20,3],[19,2],[22,3],[10,3],[17,2],[24,5],[17,3],
  [18,8],[17,4],[22,4],[20,3],[16,5],[16,2],[9,2],[21,3],[18,7],
]
const dailyRates = dailyRaw.map(([s, b]) => s > 0 ? (b / s) * 100 : 0)
const dailyMa7 = dailyRates.map((_, i) => i < 6 ? null : dailyRates.slice(i - 6, i + 1).reduce((a, b) => a + b, 0) / 7)
const dailySess = dailyRaw.map(([s]) => s)

function ConversionTrend() {
  const N = dailyRaw.length
  const W = 960, ML = 38, MR = 8, MT = 14, cH = 185, sH = 50, gap = 14
  const H = MT + cH + gap + sH + 18
  const bW = (W - ML - MR) / N, MAX_R = 36, MAX_S = 230

  const px = (i: number) => ML + (i + 0.5) * bW
  const ry = (v: number) => MT + cH * (1 - Math.min(v, MAX_R) / MAX_R)
  const sBase = MT + cH + gap + sH
  const sy = (v: number) => sBase - (Math.min(v, MAX_S) / MAX_S) * sH

  const maPts = dailyMa7.reduce<string[]>((a, v, i) => { if (v !== null) a.push(`${px(i)},${ry(v)}`); return a }, [])
  const sPts = dailySess.map((s, i) => `${px(i)},${sy(s)}`)

  return (
    <div className="overflow-x-auto -mx-1">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[640px]">
        {/* Y grid */}
        {[0, 10, 20, 30].map(p => (
          <g key={p}>
            <line x1={ML} x2={W - MR} y1={ry(p)} y2={ry(p)} stroke="white" strokeOpacity={0.05} />
            <text x={ML - 4} y={ry(p) + 3} textAnchor="end" fill="#64748B" fontSize={9} fontFamily="ui-monospace, monospace">{p}%</text>
          </g>
        ))}
        {/* Phase markers */}
        {[
          { i: 24, l: "Phase 2", c: "#22D3EE" },
          { i: 73, l: "A/B Tests", c: "#60A5FA" },
          { i: 82, l: "Winner Live", c: "#34D399" },
        ].map(p => (
          <g key={p.i}>
            <line x1={px(p.i)} x2={px(p.i)} y1={MT} y2={sBase} stroke={p.c} strokeOpacity={0.2} strokeDasharray="4 3" />
            <text x={px(p.i) + 3} y={MT + 9} fill={p.c} fontSize={8} fontWeight={600} fontFamily="ui-monospace, monospace">{p.l}</text>
          </g>
        ))}
        {/* Daily conv bars */}
        {dailyRates.map((r, i) => {
          const h = (Math.min(r, MAX_R) / MAX_R) * cH
          return h > 1 ? <rect key={i} x={ML + i * bW + bW * 0.1} width={bW * 0.8} y={ry(r)} height={h} fill="#60A5FA" fillOpacity={0.2} rx={0.5} /> : null
        })}
        {/* MA area fill */}
        {maPts.length > 1 && (
          <path d={`M${maPts[0].split(",")[0]},${MT + cH} L${maPts.join(" L")} L${maPts[maPts.length - 1].split(",")[0]},${MT + cH} Z`} fill="#34D399" fillOpacity={0.04} />
        )}
        {/* MA line */}
        <path d={`M${maPts.join(" L")}`} fill="none" stroke="#34D399" strokeWidth={2} strokeLinejoin="round" />
        {/* Session volume */}
        <path d={`M${px(0)},${sBase} L${sPts.join(" L")} L${px(N - 1)},${sBase} Z`} fill="#60A5FA" fillOpacity={0.08} />
        <path d={`M${sPts.join(" L")}`} fill="none" stroke="#60A5FA" strokeWidth={1} strokeOpacity={0.3} />
        {/* Session Y labels */}
        <text x={ML - 4} y={sy(MAX_S) + 3} textAnchor="end" fill="#64748B" fontSize={8} fontFamily="ui-monospace, monospace">{MAX_S}</text>
        <text x={ML - 4} y={sBase + 3} textAnchor="end" fill="#64748B" fontSize={8} fontFamily="ui-monospace, monospace">0</text>
        {/* X month labels */}
        {[{ i: 6, l: "Jan" }, { i: 37, l: "Feb" }, { i: 65, l: "Mar" }, { i: 96, l: "Apr" }].map(m => (
          <text key={m.i} x={px(m.i)} y={sBase + 13} textAnchor="middle" fill="#64748B" fontSize={9} fontFamily="ui-monospace, monospace">{m.l}</text>
        ))}
        {/* Legend */}
        <rect x={W - 155} y={MT} width={8} height={8} fill="#60A5FA" fillOpacity={0.3} rx={1} />
        <text x={W - 143} y={MT + 8} fill="#94A3B8" fontSize={9}>Daily rate</text>
        <line x1={W - 155} x2={W - 147} y1={MT + 19} y2={MT + 19} stroke="#34D399" strokeWidth={2} />
        <text x={W - 143} y={MT + 22} fill="#94A3B8" fontSize={9}>7-day avg</text>
        <rect x={W - 155} y={MT + 31} width={8} height={8} fill="#60A5FA" fillOpacity={0.12} rx={1} />
        <text x={W - 143} y={MT + 39} fill="#94A3B8" fontSize={9}>Sessions/day</text>
      </svg>
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
    <div className="flex min-h-screen bg-[#0F172A] text-[#E2E8F0]">

      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-[#1E293B] border-r border-white/[0.06] sticky top-0 h-screen flex-shrink-0">
        <div className="p-5 border-b border-white/[0.06]">
          <span className="text-xl font-bold tracking-tight text-[#F5EFE0] mb-2">Zapp Studios</span>
          <div className="text-sm font-semibold text-white">Royal Pawz USA</div>
          <div className="text-[10px] text-[#64748B] mt-0.5">Growth Case Study</div>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {navSections.map(s => {
            const Icon = s.icon; const isActive = activeSection === s.id
            return (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left text-[13px] transition-all cursor-pointer ${isActive ? "text-white font-semibold bg-[#60A5FA]/10 border-l-[3px] border-l-[#60A5FA]" : "text-[#64748B] hover:text-[#94A3B8] border-l-[3px] border-l-transparent hover:bg-white/[0.02]"}`}>
                <Icon size={14} className={isActive ? "text-[#60A5FA]" : ""} />{s.title}
              </button>
            )
          })}
        </nav>
        <div className="p-5 border-t border-white/[0.06]">
          <div className="text-[10px] text-[#475569] leading-relaxed">Prepared by Hamza<br />zappstudios.us<br />April 2026</div>
        </div>
      </aside>

      {/* ─── MOBILE NAV ─── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 h-14 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-[#F5EFE0]">Zapp Studios</span>
            <span className="text-sm font-semibold text-white">Royal Pawz USA</span>
          </div>
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="text-[#94A3B8] p-2 cursor-pointer">
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden bg-[#1E293B] border-b border-white/[0.06]">
              <nav className="py-2 max-h-[60vh] overflow-y-auto">
                {navSections.map(s => {
                  const Icon = s.icon
                  const isActive = activeSection === s.id
                  return (
                    <button key={s.id} onClick={() => scrollTo(s.id)} className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm cursor-pointer transition-colors ${isActive ? "text-white font-semibold bg-[#60A5FA]/[0.06]" : "text-[#64748B] hover:text-[#94A3B8]"}`}>
                      <Icon size={14} className={isActive ? "text-[#60A5FA]" : ""} />
                      <span className="flex-1 text-left">{s.title}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] flex-shrink-0" />}
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
        <section className="relative px-5 sm:px-10 lg:px-16 pt-24 lg:pt-16 pb-12">
          <div className="max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
                <span className="text-[10px] font-semibold tracking-widest text-[#60A5FA]">REVENUE ENGINEERING CASE STUDY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Half Left. Now 1 in 3<br />Book and Pay.
              </h1>
              <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-3xl mb-6">
                We launched Royal Pawz in late November with a booking funnel that hemorrhaged visitors. Five months and two controlled A/B tests later, 1 in 3 visitors who enter the booking flow complete a paid appointment - and monthly revenue grew 8x. This is that story.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                <span>Prepared by Hamza</span>
                <span className="text-[#475569]">|</span>
                <span>zappstudios.us/revenue</span>
                <span className="text-[#475569]">|</span>
                <span>April 2026</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap gap-3 mt-10">
              <MetricCard label="Booking Flow Conv." value="30.8%" sub="A/B test winner (n=26)" color="text-[#60A5FA]" />
              <MetricCard label="Revenue Growth" value="8x" sub="Month 1 → Month 5" color="text-[#f97316]" />
              <MetricCard label="LTV : CPA Ratio" value="7.8x" sub="$195 avg LTV / $25 blended CPA" color="text-[#34D399]" />
              <MetricCard label="Repeat Rate" value="29%" sub="Jannet cohort, 5 months" color="text-[#60A5FA]" />
            </motion.div>
          </div>
        </section>
        <SectionDivider />

        {/* ═══ THE STORY ═══ */}
        <section id="story" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={BookOpen} label="Introduction" title="The Story" /></FadeIn>
          <FadeIn>
            <p className="text-[#94A3B8] text-[17px] leading-relaxed max-w-4xl mb-8">
              Royal Pawz is a mobile dog grooming company in Houston. We built their full-stack platform - client booking app, groomer operations app, admin dashboard, AI-powered SMS service - and launched it in late November 2025. What happened next is a case study in why building the product is only half the job. The other half is engineering the growth.
            </p>
            <div className="flex flex-wrap gap-1 mb-8">
              {["Observe", "Hypothesize", "Test", "Measure", "Scale"].map((step, i) => (
                <Fragment key={step}>
                  {i > 0 && <ArrowRight size={14} className="text-[#475569] self-center mx-1" />}
                  <div className="bg-[#60A5FA]/[0.06] border border-[#60A5FA]/15 rounded-lg px-4 py-2 text-center">
                    <div className="text-[10px] text-[#60A5FA] font-mono">0{i + 1}</div>
                    <div className="text-[13px] font-semibold text-white">{step}</div>
                  </div>
                </Fragment>
              ))}
            </div>
            {/* Mini timeline */}
            <div className="flex rounded-lg overflow-hidden border border-white/[0.06] text-[12px] font-mono text-[#64748B]">
              <div className="flex-[3] px-3 py-2 text-center bg-red-500/[0.04] border-r border-white/[0.06]">
                Nov 25 – Jan 18<br /><span className="font-sans font-semibold text-[#94A3B8]">Launch</span>
              </div>
              <div className="flex-[6] px-3 py-2 text-center bg-cyan-400/[0.04] border-r border-white/[0.06]">
                Jan 19 – Mar 8<br /><span className="font-sans font-semibold text-cyan-400">The Rebuild</span>
              </div>
              <div className="flex-[1] px-3 py-2 text-center bg-[#60A5FA]/[0.04] border-r border-white/[0.06]">
                Mar 9–14<br /><span className="font-sans font-semibold text-[#60A5FA]">Test 1</span>
              </div>
              <div className="flex-[1] px-3 py-2 text-center bg-emerald-500/[0.04]">
                Mar 14–18<br /><span className="font-sans font-semibold text-emerald-400">Test 2</span>
              </div>
            </div>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ WHAT WE BUILT ═══ */}
        <section id="built" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Layers} label="The Platform" title="What We Built" /></FadeIn>
          <FadeIn>
            <p className="text-[#94A3B8] text-[17px] leading-relaxed max-w-4xl mb-8">
              Before optimizing the funnel, we built the entire platform from scratch. Royal Pawz isn&apos;t running on Squarespace with a Calendly embed - it&apos;s a fully custom system designed to give us total control over every step of the customer experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Client Booking App", desc: "Multi-step booking flow with ZIP-based service area validation, real-time groomer availability, pet profiles, service customization, and integrated Stripe payments. Fully responsive - 80%+ of traffic is mobile.", color: "text-[#60A5FA]" },
                { title: "Groomer Operations App", desc: "Mobile-first dashboard for groomers to manage their daily schedule, view upcoming appointments with pet details and special instructions, navigate to addresses, and update job status in real-time.", color: "text-emerald-400" },
                { title: "Admin Dashboard", desc: "Complete business control panel - customer management, booking oversight, earnings reporting, groomer scheduling, service/pricing configuration, and real-time analytics across the entire platform.", color: "text-cyan-400" },
                { title: "AI-Powered SMS Service", desc: "Automated appointment confirmations, reminders, and follow-ups via SMS. Conversational AI handles rebooking requests and common questions. Abandoned cart recovery reaches users who dropped off before completing a booking.", color: "text-amber-400" },
                { title: "Session Recording & Analytics", desc: "Custom rrweb integration recording every user session across the platform. Rage click detection, funnel drop-off tracking, and heatmap data - the system that made every optimization in this case study possible.", color: "text-red-400" },
                { title: "A/B Testing Framework", desc: "Built-in split testing infrastructure with event-level tracking, variant assignment, and conversion attribution. Each experiment in this case study ran through this system with randomized traffic splits.", color: "text-[#60A5FA]" },
              ].map((item, i) => (
                <div key={i} className="bg-[#1E293B] rounded-xl p-5 sm:p-6 border border-white/[0.06]">
                  <div className={`text-base font-semibold ${item.color} mb-2`}>{item.title}</div>
                  <p className="text-[15px] text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <AlertBox type="info" title="Why Custom Matters">
              <p>Every optimization in this case study was possible because we own the entire stack. When we identified the auth wall problem, we didn&apos;t submit a support ticket - we redesigned the flow and shipped it the same week. When we needed A/B testing, we didn&apos;t pay for a plugin - we built it into the platform. When we needed session recordings, we integrated rrweb directly. <strong className="text-white">Full-stack ownership means zero waiting, zero dependencies, and changes deployed daily if needed.</strong></p>
            </AlertBox>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ PHASE 1 ═══ */}
        <section id="phase1" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={AlertTriangle} label="Phase 1" title="We Launched Into a Wall" /></FadeIn>
          <FadeIn>
            <p className="text-[12px] font-mono text-[#64748B] mb-6">Nov 25, 2025 – Jan 18, 2026 (tracking from Dec 26)</p>
            <Card title="What Happened" defaultOpen>
              <p className="mb-4">Royal Pawz went live in late November. The app worked, the groomers were ready, the Google Ads were running. November saw 13 signups, 5 bookings. Small numbers, but it was working. By December that grew to 49 signups. By January, 77. <strong className="text-white">Growth was working. Conversion was the bottleneck.</strong></p>
              <p className="mb-4">For the first month we were flying blind - no session tracking, no funnel analytics. On December 26th, we installed rrweb session recording across the entire platform. The data hit immediately, and it wasn&apos;t pretty.</p>
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
                Session recordings told the story: users landed on a sign-up form with zero context. No services listed, no pricing visible, no photos of the vans. Some tried scrolling - nothing below the fold. Some clicked the logo hoping for a homepage. <strong className="text-white">Most just closed the tab.</strong>
              </Observation>
              <p className="mb-4">The numbers were brutal. <strong className="text-white">61.4% of visitors dropped at the sign-up page alone</strong> - of 665 sessions that reached /auth/sign-up, only 257 made it through. Users were averaging <strong className="text-white">14.7 rage clicks</strong> on the sign-up form, a frustration signal 3x higher than any other page. And 80.6% of our traffic was mobile, where the experience was worst - mobile users rage-clicked 5x more than desktop.</p>
              <p className="mb-4">Google Ads - our biggest traffic source at 391 sessions - was converting at <strong className="text-white">just 2.8%</strong> to even reaching signup. The landing page had accidentally hidden the &quot;Book Now&quot; button on mobile behind a hamburger menu, and loaded <strong className="text-white">9.8MB of unoptimized images</strong> - a 16-second load on 4G.</p>
              <p>Even users who made it past signup weren&apos;t safe. Of 338 total signups across this period, <strong className="text-white">231 never booked - a 68.3% drop-off rate.</strong> The booking flow itself had a 31.7% drop at the address step and 16.1% at payment. But the biggest problem was upstream. The auth wall was killing us before users ever saw what Royal Pawz offered.</p>
            </Card>
            <ResultBox variant="negative" metrics={[
              { value: "61.4%", label: "Signup Page Drop", color: "text-red-400" },
              { value: "14.7", label: "Avg Rage Clicks", color: "text-red-400" },
              { value: "2.8%", label: "Google Ads Conv.", color: "text-red-400" },
              { value: "68.3%", label: "Never Booked", color: "text-red-400" },
            ]} />
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ PHASE 2 ═══ */}
        <section id="phase2" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Zap} label="Phase 2" title="Kill the Auth Wall" /></FadeIn>
          <FadeIn>
            <p className="text-[12px] font-mono text-[#64748B] mb-6">Jan 19 – Mar 8, 2026</p>
            <Card title="What We Changed" defaultOpen>
              <p className="mb-4">The diagnosis from Phase 1 pointed to one root cause: <strong className="text-white">the auth wall had to go.</strong> Users shouldn&apos;t need to create an account, verify an email, and complete onboarding before they can even see what Royal Pawz offers. The entire entry point needed to change.</p>
              <p className="mb-4">On January 19th, we replaced <strong className="text-white">/auth/sign-up</strong> with a new <strong className="text-white">/book</strong> flow. No account required. Google Ads now sent users directly into the booking experience - enter your ZIP code, add your pets, pick a service, choose a time. Account creation moved to the very end, right before payment, after users had already built their appointment.</p>
              <p className="mb-4">Phase 2 involved two major changes working together:</p>
              <div className="space-y-3 mb-4">
                <div className="flex gap-3 p-3 bg-white/[0.02] rounded-lg">
                  <span className="text-[#60A5FA] font-bold text-lg flex-shrink-0">1</span>
                  <div><strong className="text-white">Google Ads landing page fix.</strong> We changed the ad destination from the old homepage to <span className="font-mono text-[#60A5FA]">/landing</span> - a purpose-built page with clear CTAs, optimized images, and a visible &quot;Book Now&quot; button on mobile. <strong className="text-white">This immediately improved engagement - users clicked through to the booking flow instead of bouncing.</strong></div>
                </div>
                <div className="flex gap-3 p-3 bg-white/[0.02] rounded-lg">
                  <span className="text-[#60A5FA] font-bold text-lg flex-shrink-0">2</span>
                  <div><strong className="text-white">The /book flow rebuild.</strong> Removed the auth wall entirely. Users go from landing page → booking flow → account creation (at the end). This is the structural change that made the funnel actually convert.</div>
                </div>
              </div>
              <AlertBox type="info" title="Attribution Note">
                <p>Multiple variables changed during Phase 2 - we can&apos;t cleanly isolate the landing page fix from the /book migration. The bounce rate improvement is likely driven primarily by the landing page fix, while the conversion improvement comes from the /book flow. <strong className="text-white">The clean, single-variable attribution comes in Phases 3 and 4</strong> where we ran controlled A/B tests.</p>
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
                The difference was immediate. Session recordings showed users engaging with the booking flow within seconds of landing - entering their ZIP, browsing services, adding their dog. <strong className="text-white">No more rage clicks. No more confused scrolling. They were booking - not bouncing.</strong>
              </Observation>
              <p className="mb-4">The impact was immediate. <strong className="text-white">Revenue nearly 4x&apos;d in a single month.</strong> New customer acquisition more than doubled. The auth wall had been the single biggest obstacle between Royal Pawz and its customers.</p>
              <p>But the /book flow was brand new, and we knew there was room to optimize within it. <strong className="text-white">The funnel was working - now it was time to tune it.</strong></p>
            </Card>
            <p className="text-[13px] text-[#64748B] mt-2 mb-2 italic">Note: two changes shipped simultaneously - the landing page fix and the /book flow rebuild. The revenue jump reflects both, not either alone. Clean single-variable results come in Phases 3 and 4.</p>
            <ResultBox variant="improved" metrics={[
              { value: "~4x", label: "Revenue Growth", color: "text-cyan-400" },
              { value: "2x", label: "New Customers", color: "text-cyan-400" },
              { value: "1,454", label: "Feb Sessions" },
            ]} />
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ PHASE 3 ═══ */}
        <section id="phase3" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Target} label="Phase 3" title="The Counter-Intuitive Bet" /></FadeIn>
          <FadeIn>
            <p className="text-[12px] font-mono text-[#64748B] mb-6">Mar 9 – 14, 2026 · A/B Test · 43 sessions</p>
            <Card title="The Hypothesis" defaultOpen>
              <p className="mb-4">By early March, Phase 2 had been running for seven weeks. Bounce was consistently low. But we had a new observation: most drop-offs in the booking flow happened at the very first step - <strong className="text-white">the ZIP code entry</strong>.</p>
              <p className="mb-4">Session recordings told the story: users clicked &quot;Book Now&quot; and immediately hit a form field asking for their ZIP code. No transition, no context about what they were signing up for. They hadn&apos;t mentally committed to booking - they were still deciding. Asking for personal info at that moment felt like a cold ask, and most just left.</p>
              <p className="mb-4">We had a hypothesis that went against every conversion playbook: <em className="text-white">what if we added a step?</em> A simple <strong className="text-white">intro screen</strong> - &quot;Here&apos;s how booking works: enter your ZIP, add your pets, pick a time&quot; - before the ZIP code field. The logic: if someone reads how the process works and clicks &quot;Let&apos;s go,&quot; they&apos;ve already decided to engage. The ZIP code field stops feeling like a barrier and starts feeling like step one of something they chose.</p>
              <div className="mt-4">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">✓ Variant A - Intro Screen (Winner)</div>
                <FlowSteps steps={[
                  { label: "Intro Screen", type: "highlight" },
                  { label: "ZIP Code" },
                  { label: "Add Pets" },
                  { label: "Contact Info" },
                  { label: "Book" },
                ]} />
                <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-1 mt-2">Variant B - Direct ZIP (Control)</div>
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
                Despite adding friction, the intro screen <strong className="text-white">doubled the conversion rate</strong>. Users who read the intro and chose to continue were self-selecting for intent. The extra step acted as a commitment micro-filter - those who clicked through were telling us &quot;yes, I actually want to book.&quot;
              </Observation>
              <p className="mb-4">43 sessions. 5 days. A strong directional signal. We shipped the intro screen as default and turned our attention to the next opportunity.</p>
              <AlertBox type="warning" title="On Sample Size">
                <p>At n=43 (21 vs 22), this result is directionally strong but below traditional statistical significance thresholds. We shipped based on the quantitative signal combined with qualitative evidence from session recordings - users in the intro variant showed markedly more purposeful behavior.</p>
              </AlertBox>
            </Card>
            <ResultBox variant="positive" metrics={[
              { value: "19.0%", label: "Winner Conv.", color: "text-emerald-400" },
              { value: "9.1%", label: "Control Conv.", color: "text-[#64748B]" },
              { value: "+109%", label: "Lift", color: "text-emerald-400" },
              { value: "43", label: "Sessions" },
            ]} />
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ PHASE 4 ═══ */}
        <section id="phase4" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={TrendingUp} label="Phase 4" title="Ask Early, Convert Often" /></FadeIn>
          <FadeIn>
            <p className="text-[12px] font-mono text-[#64748B] mb-6">Mar 14 – 18, 2026 · A/B Test · 54 sessions</p>
            <Card title="The Hypothesis" defaultOpen>
              <p className="mb-4">Fresh off the intro screen win, we dug into the remaining drop-off data. A pattern emerged: users were adding pets, customizing services, choosing times - investing 5–10 minutes of effort - then <strong className="text-white">abandoning at the contact info step.</strong></p>
              <p className="mb-4">They&apos;d done all the work. They just wouldn&apos;t give us their name.</p>
              <p className="mb-4">The insight: once someone types in their real name and email, they&apos;ve made a micro-commitment. Psychologically, they&apos;re now &quot;in&quot; - abandoning the booking feels like walking out of a restaurant after they&apos;ve taken your order. The remaining steps feel like finishing something, not deciding whether to start. We tested moving the contact info step from <strong className="text-white">late</strong> in the funnel (after scheduling) to <strong className="text-white">early</strong> (right after adding pets, before customization).</p>
              <div>
                <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-1">Variant A - Info Late (Control)</div>
                <FlowSteps steps={[
                  { label: "ZIP" },
                  { label: "Pets" },
                  { label: "Customize" },
                  { label: "Schedule" },
                  { label: "Contact Info", type: "friction" },
                  { label: "Checkout" },
                ]} />
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1 mt-2">✓ Variant B - Info Early (Winner)</div>
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
                Users who provided contact info early didn&apos;t just convert more - <strong className="text-white">they spent more.</strong> AOV jumped 21.6%. Once committed, users were more likely to add premium services and add-ons. The customization step became about enhancing their appointment, not deciding whether to have one. And early account creation meant we could follow up on abandoned carts via SMS.
              </Observation>
              <p className="mb-4">54 sessions. 4 days. <strong className="text-white">331% conversion lift and 21.6% higher <Term>AOV</Term>.</strong> The winning variant went live as the default. In four months, we&apos;d gone from a broken auth wall to a controlled test showing nearly 1 in 3 visitors who enter the booking flow completing a paid appointment.</p>
              <AlertBox type="warning" title="On Sample Size">
                <p>At n=54 (26 vs 28), this is a larger signal than Test 1 but still below traditional statistical significance for a 4-day window. The magnitude of the lift (331%) and the dual improvement (conversion + AOV) give us high confidence in the direction.</p>
              </AlertBox>
            </Card>
            <ResultBox variant="positive" metrics={[
              { value: "30.8%", label: "Winner Conv.", color: "text-emerald-400" },
              { value: "7.1%", label: "Control Conv.", color: "text-[#64748B]" },
              { value: "+331%", label: "Conv. Lift", color: "text-emerald-400" },
              { value: "+21.6%", label: "AOV Lift", color: "text-emerald-400" },
              { value: "54", label: "Sessions" },
            ]} />
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ THE EVIDENCE ═══ */}
        <section id="evidence" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={BarChart3} label="Data" title="The Bigger Picture" /></FadeIn>
          <FadeIn>
            <p className="text-[#94A3B8] text-[17px] leading-relaxed mb-6">Six months of performance across all four phases - growth indexed against month one as baseline.</p>
            <Card title="Monthly Performance" defaultOpen>
              <DataTable
                headers={["Month", "Sessions", "Revenue Index", "Repeat Share", "Ad Spend"]}
                rows={[
                  [{ text: "Dec '25", color: "text-white font-semibold" }, "199", "1.0x (baseline)", "13%", "$402"],
                  [{ text: "Jan '26", color: "text-white font-semibold" }, "1,659", "1.9x", "34%", "$735"],
                  [{ text: "Feb '26", color: "text-white font-semibold" }, "1,454", { text: "4.0x", color: "text-emerald-400 font-semibold" }, "16%", "$886"],
                  [{ text: "Mar '26", color: "text-white font-semibold" }, "2,076", { text: "7.7x", color: "text-emerald-400 font-semibold" }, { text: "40%", color: "text-emerald-400" }, "$1,788"],
                  [{ text: "Apr '26*", color: "text-white font-semibold" }, "497*", { text: "7.9x*", color: "text-emerald-400 font-semibold" }, { text: "35%*", color: "text-emerald-400" }, "$1,594*"],
                ]}
              />
              <p className="text-[13px] text-[#64748B] mt-3">Revenue Index = net service revenue relative to December baseline. Repeat Share = % of monthly revenue from returning customers. Sessions from rrweb recording (non-bot). Ad spend from Google Ads (actual monthly spend from Ads dashboard). *April is partial through Apr 22 - sessions are partial; revenue includes forward-scheduled bookings.</p>
            </Card>
            <Card title="Daily Conversion Trend" defaultOpen>
              <p className="mb-4">Day-by-day site-wide conversion rate (all sessions → completed bookings) with 7-day moving average. Session volume shown below.</p>
              <ConversionTrend />
              <p className="text-[13px] text-[#64748B] mt-3">Top chart: daily booking conversion rate (bars) with 7-day moving average (line). Bottom: daily session volume. The 30.8% A/B test rate measured booking-flow entrants specifically; the site-wide rate shown here includes all sessions (landing page, return visits, admin, etc.).</p>
              <AlertBox type="info" title="Conversion Up, Volume Down">
                <p>The 7-day average conversion rate climbed from ~3% during the auth-wall era to ~20% in April — the funnel is performing better than it ever has. But daily session volume dropped from 50–190/day in March to ~10–50/day in April. <strong className="text-white">Fewer total bookings despite a better funnel — this is a traffic problem, not a conversion problem.</strong></p>
              </AlertBox>
            </Card>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ THE EXPERIMENTS ═══ */}
        <section id="experiments" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Target} label="A/B Tests" title="The Experiments, In Detail" /></FadeIn>
          <FadeIn>
            <p className="text-[#94A3B8] text-[17px] leading-relaxed mb-6">Randomized traffic, tracked events, single-variable tests - the cleanest numbers in this report.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card title="Test 1: Intro Screen vs Direct ZIP" defaultOpen>
                <p className="text-[13px] font-mono text-[#64748B] mb-4">Mar 9–14 · 43 sessions</p>
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">✓ Variant A - Intro Screen · 19.0%</div>
                  <FunnelBar label="Entered" count={21} total={21} variant="winner" />
                  <FunnelBar label="Intro" count={16} total={21} variant="winner" />
                  <FunnelBar label="ZIP" count={12} total={21} variant="winner" />
                  <FunnelBar label="Pets" count={12} total={21} variant="winner" />
                  <FunnelBar label="Contact" count={7} total={21} variant="winner" />
                  <FunnelBar label="Booked" count={4} total={21} variant="winner" />
                </div>
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-2">Variant B - Direct ZIP · 9.1%</div>
                  <FunnelBar label="Entered" count={22} total={22} variant="control" />
                  <FunnelBar label="ZIP" count={20} total={22} variant="control" />
                  <FunnelBar label="Pets" count={20} total={22} variant="control" />
                  <FunnelBar label="Contact" count={4} total={22} variant="control" />
                  <FunnelBar label="Booked" count={2} total={22} variant="control" />
                </div>
                <div className="bg-emerald-500/[0.06] border border-emerald-500/15 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-emerald-400">+109%</div>
                  <div className="text-[11px] text-[#94A3B8]">conversion lift</div>
                </div>
              </Card>

              <Card title="Test 2: Info Step Placement" defaultOpen>
                <p className="text-[13px] font-mono text-[#64748B] mb-4">Mar 14–18 · 54 sessions</p>
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">✓ Variant B - Info Early · 30.8%</div>
                  <FunnelBar label="Entered" count={26} total={26} variant="winner" />
                  <FunnelBar label="Info" count={14} total={26} variant="winner" />
                  <FunnelBar label="Checkout" count={10} total={26} variant="winner" />
                  <FunnelBar label="Booked" count={8} total={26} variant="winner" />
                </div>
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-2">Variant A - Info Late · 7.1%</div>
                  <FunnelBar label="Entered" count={28} total={28} variant="control" />
                  <FunnelBar label="Info" count={3} total={28} variant="control" />
                  <FunnelBar label="Checkout" count={3} total={28} variant="control" />
                  <FunnelBar label="Booked" count={2} total={28} variant="control" />
                </div>
                <div className="bg-emerald-500/[0.06] border border-emerald-500/15 rounded-lg p-4 flex gap-6 justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-emerald-400">+331%</div>
                    <div className="text-[11px] text-[#94A3B8]">conversion lift</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-emerald-400">+21.6%</div>
                    <div className="text-[11px] text-[#94A3B8]">AOV lift</div>
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ THE HONEST MATH ═══ */}
        <section id="economics" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={DollarSign} label="Unit Economics" title="The Honest Math" /></FadeIn>
          <FadeIn>
            <p className="text-[#94A3B8] text-[17px] leading-relaxed mb-6">Separating what the funnel creates from what retention compounds - because the only numbers worth sharing are the ones pulled straight from the database.</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <MetricCard label="LTV : CPA" value="7.8x" sub="$195 avg LTV / $25 blended CPA" color="text-[#34D399]" />
              <MetricCard label="Repeat Rate" value="25.7%" sub="57 of 222 clients rebooked" color="text-[#60A5FA]" />
              <MetricCard label="Repeat Avg Bookings" value="2.93" sub="Among clients who return" color="text-[#60A5FA]" />
              <MetricCard label="Repeat Rev Share" value="35%" sub="Of April revenue from repeats" color="text-amber-400" />
            </div>

            <Card title="Acquisition Cost Trend" defaultOpen>
              <p className="mb-4"><Term>CPA</Term> is a trailing indicator of funnel quality. Estimated by dividing actual Google Ads spend by all-source first-time bookings each month.</p>
              <DataTable
                headers={["Month", "Ad Spend", "Clicks", "CPC", "New Clients", "Est. CPA"]}
                rows={[
                  [{ text: "Dec '25", color: "text-white font-semibold" }, "$402", "407", "$0.99", "14", { text: "$28.73", color: "text-red-400" }],
                  [{ text: "Jan '26", color: "text-white font-semibold" }, "$735", "1,157", "$0.64", "21", { text: "$35.00", color: "text-red-400" }],
                  [{ text: "Feb '26", color: "text-white font-semibold" }, "$886", "863", "$1.03", "44", { text: "$20.13", color: "text-emerald-400" }],
                  [{ text: "Mar '26", color: "text-white font-semibold" }, "$1,788", "1,550", "$1.15", "60", { text: "$29.79", color: "text-cyan-400" }],
                  [{ text: "Apr '26*", color: "text-white font-semibold" }, "$1,594*", "—", "—", "77", { text: "$20.70", color: "text-emerald-400" }],
                ]}
              />
              <AlertBox type="warning" title="March CPA Spike + April Campaign Changes">
                <p className="mb-2">March&apos;s higher CPA (~$30) was inflated by a mid-month Google Ads campaign restructure that temporarily disrupted delivery. On March 28, conversion goals were updated to prioritize &quot;Purchases (Website)&quot; and 29 broad match keywords were removed.</p>
                <p>In April, the daily budget was reduced from $83 → $58.74 (Apr 5) → $50 (Apr 11), and the Focused Zip Codes campaign was paused (Apr 10). Spend became more targeted and CPA improved to $20.70.</p>
              </AlertBox>
              <p className="text-[13px] text-[#64748B] mt-3">Estimated CPA divides total Google Ads spend by all-source first bookings - the real Google-only CPA is higher since roughly half of new customers come from direct/word-of-mouth (free acquisition).</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <MetricCard label="Total Ad Spend" value="$5,405" sub="Dec '25 – Apr 22 '26" color="text-[#64748B]" />
                <MetricCard label="Blended CPA" value="$25.02" sub="$5,405 / 216 new clients" color="text-emerald-400" />
                <MetricCard label="Best Month" value="$20.13" sub="February 2026" color="text-[#60A5FA]" />
              </div>
            </Card>

            <Card title="Customer Acquisition Mix" defaultOpen>
              <p className="mb-4">Not all new customers come from ads. The split between paid and organic acquisition shifted as the platform matured.</p>
              <DataTable
                headers={["Month", "Google Ads (est.)", "Direct / WOM", "Ad Spend (actual)"]}
                rows={[
                  [{ text: "Dec '25", color: "text-white font-semibold" }, "-", "100%", "$402"],
                  [{ text: "Jan '26", color: "text-white font-semibold" }, "~38%", "~62%", "$735"],
                  [{ text: "Feb '26", color: "text-white font-semibold" }, { text: "~50%", color: "text-emerald-400" }, "~50%", "$886"],
                  [{ text: "Mar '26", color: "text-white font-semibold" }, { text: "~51%", color: "text-emerald-400" }, "~49%", "$1,788"],
                  [{ text: "Apr '26*", color: "text-white font-semibold" }, "~50%", "~50%", "$1,594*"],
                ]}
              />
              <p className="text-[13px] text-[#64748B] mt-3">Channel attribution estimated from UTM and session referrer data. Direct/WOM customers cost $0 to acquire. The funnel optimization benefits all traffic sources equally - roughly half of new customers arrive organically. *April spend through Apr 15.</p>
            </Card>

            <Card title="Customer Cohort Retention" defaultOpen>
              <p className="mb-4"><Term>LTV</Term> is a function of how often customers come back. Here&apos;s how each monthly cohort is retaining - the percentage of customers who rebook in subsequent months.</p>
              <DataTable
                headers={["Cohort", "M2 Retention", "M3 Active", "M4 Active", "Status"]}
                rows={[
                  [{ text: "Dec '25", color: "text-white font-semibold" }, { text: "50.0%", color: "text-emerald-400" }, { text: "35.7%", color: "text-emerald-400" }, { text: "50.0%", color: "text-emerald-400" }, { text: "Mature benchmark", color: "text-emerald-400" }],
                  [{ text: "Jan '26", color: "text-white font-semibold" }, { text: "14.3%", color: "text-emerald-400" }, { text: "47.6%", color: "text-emerald-400" }, { text: "28.6%", color: "text-emerald-400" }, { text: "Maturing", color: "text-emerald-400" }],
                  [{ text: "Feb '26", color: "text-white font-semibold" }, { text: "43.2%", color: "text-emerald-400" }, { text: "25.0%", color: "text-emerald-400" }, "-", { text: "Strong signal", color: "text-emerald-400" }],
                  [{ text: "Mar '26", color: "text-white font-semibold" }, { text: "16.7%", color: "text-emerald-400" }, "-", "-", { text: "Maturing", color: "text-emerald-400" }],
                  [{ text: "Apr '26", color: "text-white font-semibold" }, { text: "1.3%", color: "text-[#64748B]" }, "-", "-", "Too early"],
                ]}
              />
              <p className="text-[13px] text-[#64748B] mt-3">M2 Retention = % of cohort that booked again in month 2. December is the standout at <strong className="text-white">50% retention</strong> - still generating bookings in month 5+. January cohort matured with <strong className="text-white">47.6% active in M3</strong> and 28.6% still active in M4.</p>
              <AlertBox type="info" title="The 4–9 Week Rebooking Window">
                <p className="mb-2">Dog grooming follows a <strong className="text-white">4–9 week rebooking cycle</strong>. Clients who haven&apos;t rebooked within 9 weeks of their last appointment are &quot;at risk.&quot; Here&apos;s where the full client base stands today:</p>
                <div className="space-y-1.5 mt-3 text-[15px]">
                  <div className="flex gap-2"><span className="text-emerald-400 font-semibold flex-shrink-0">59% recent →</span> <span>131 clients booked within the last 4 weeks. Active and healthy.</span></div>
                  <div className="flex gap-2"><span className="text-amber-400 font-semibold flex-shrink-0">29% due soon →</span> <span>65 clients are 4–9 weeks out - entering their rebooking window now. SMS reminders and rebooking prompts target this group.</span></div>
                  <div className="flex gap-2"><span className="text-red-400 font-semibold flex-shrink-0">12% at risk →</span> <span>26 clients are 9+ weeks past their last booking. These are the only clients we consider at risk of churning.</span></div>
                </div>
                <p className="mt-3"><strong className="text-white">Only 12% of all clients are truly at risk.</strong> The raw repeat rate is diluted by rapid growth - 137 new clients joined in March and April alone, and most haven&apos;t entered their rebooking window yet. The mature cohorts (Dec–Feb) show strong return behavior.</p>
              </AlertBox>
            </Card>

            <Card title="Groomer-Level Retention" defaultOpen>
              <p className="mb-4">Retention varies by groomer. Jannet has been with Royal Pawz since launch; Kris joined in March; Nelcy and Natalia joined in April. Most of Kris&apos;s, Nelcy&apos;s, and Natalia&apos;s clients haven&apos;t entered the 4–9 week rebooking window yet.</p>
              <DataTable
                headers={["Groomer", "Clients", "Repeat Rate", "Avg Bookings", "Since"]}
                rows={[
                  [{ text: "Jannet", color: "text-white font-semibold" }, "147", { text: "28.6%", color: "text-emerald-400 font-semibold" }, "1.54", "Nov '25"],
                  [{ text: "Kris", color: "text-white font-semibold" }, "49", "8.2%", "1.08", "Mar '26"],
                  [{ text: "Nelcy", color: "text-white font-semibold" }, "13", "-", "1.00", "Apr '26"],
                  [{ text: "Natalia", color: "text-white font-semibold" }, "9", "-", "1.00", "Apr '26"],
                ]}
              />
              <p className="text-[13px] text-[#64748B] mt-3">Jannet&apos;s 28.6% is the mature benchmark - down from 36% as ~14 new clients joined her book in April who haven&apos;t entered the rebooking window yet. Kris&apos;s 8.2% reflects his start date, not service quality. We expect his rate to climb as clients enter their rebooking window in May–June.</p>
            </Card>

            <AlertBox type="info" title="How to Read These Numbers">
              <p className="mb-2"><strong className="text-white">The funnel optimization directly impacts new customer acquisition</strong> - conversion rate and <Term>AOV</Term> are under its control. The A/B test results (30.8% booking flow conversion, +21% AOV lift) are clean, controlled experiments that prove this.</p>
              <p className="mb-2"><strong className="text-white">Repeat bookings is a separate value driver.</strong> 35% of April revenue came from returning customers (40% in March). Overall, 57 of 222 clients (25.7%) have rebooked. Jannet&apos;s mature cohort shows 29% - the rest haven&apos;t had time. Retention is supported by AI-powered SMS reminders, automated rebooking prompts, and the groomer ops app.</p>
              <p><strong className="text-white">Not all new customers come from ads.</strong> Roughly half come through direct/word-of-mouth. The funnel benefits all traffic equally - but ad spend only deserves credit for the customers it brought in.</p>
            </AlertBox>

            {/* Economics flywheel */}
            <div className="mt-8">
              <div className="text-[12px] font-semibold text-[#64748B] uppercase tracking-wider mb-3 text-center">The Compounding Engine</div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 bg-[#1E293B] border border-blue-400/15 rounded-xl p-6 text-center w-full">
                  <div className="text-[12px] text-blue-400 uppercase tracking-wider font-semibold mb-2">First Booking Return</div>
                  <div className="text-4xl font-bold font-mono text-blue-400">5x</div>
                  <div className="text-[13px] text-[#64748B] mt-1">$126 avg first-booking / $25 CPA</div>
                </div>
                <ArrowRight size={24} className="text-[#475569] rotate-90 sm:rotate-0 flex-shrink-0" />
                <div className="flex-1 bg-[#1E293B] border border-emerald-500/15 rounded-xl p-6 text-center w-full">
                  <div className="text-[12px] text-emerald-400 uppercase tracking-wider font-semibold mb-2">Current LTV : CPA</div>
                  <div className="text-4xl font-bold font-mono text-emerald-400">8x</div>
                  <div className="text-[13px] text-[#64748B] mt-1">$195 avg LTV / $25 CPA (5 months)</div>
                </div>
                <ArrowRight size={24} className="text-[#475569] rotate-90 sm:rotate-0 flex-shrink-0" />
                <div className="flex-1 bg-[#1E293B] border border-amber-400/15 rounded-xl p-6 text-center w-full">
                  <div className="text-[12px] text-amber-400 uppercase tracking-wider font-semibold mb-2">Projected Annual</div>
                  <div className="text-4xl font-bold font-mono text-amber-400">30x+</div>
                  <div className="text-[13px] text-[#64748B] mt-1">retained customer, 6–8 wk cycle</div>
                </div>
              </div>
              <p className="text-center text-[#94A3B8] text-[14px] mt-3">The first month of revenue alone pays back acquisition cost 5x. Current LTV at 5 months is 8x CPA - and most customers haven&apos;t had time to rebook yet. The Dec cohort (50% retention, still active in month 5+) shows what happens when cohorts mature into their full rebooking cycle.</p>
            </div>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ MARKET CONTEXT ═══ */}
        <section id="market" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Map} label="Context" title="Where This Sits in the Market" /></FadeIn>
          <FadeIn>
            <p className="text-[#94A3B8] text-[17px] leading-relaxed max-w-4xl mb-8">
              These numbers don&apos;t exist in a vacuum. Here&apos;s how Royal Pawz compares to the Houston mobile grooming market and industry benchmarks.
            </p>
            <Card title="Houston Mobile Grooming Landscape" defaultOpen>
              <p className="mb-4">Houston has <strong className="text-white">952,400 dog-owning households</strong> - 37% of the metro&apos;s 2.6 million households, ranking 4th among all U.S. metros for dog ownership. It&apos;s a massive market, and Houston&apos;s sprawling geography (665 sq mi) makes mobile grooming especially attractive.</p>
              <DataTable
                headers={["Competitor", "Online Booking", "Pricing Range", "Booking Flow", "Notes"]}
                rows={[
                  [{ text: "Royal Pawz USA", color: "text-[#60A5FA] font-semibold" }, { text: "Full custom app", color: "text-emerald-400" }, "$75–$150+", { text: "4-step, no auth", color: "text-emerald-400" }, "A/B tested, ~20% site-wide"],
                  [{ text: "Kontota", color: "text-white font-semibold" }, "MoeGo platform", "$50–$225", "Book via MoeGo", "Franchise, 5.0★ / 3,700+ reviews"],
                  [{ text: "Groomit", color: "text-white font-semibold" }, "App + website", "$80–$319", "National platform", "Tech platform, 4.8★ / 44K+ reviews"],
                  [{ text: "Furry Land", color: "text-white font-semibold" }, "MoeGo + phone", "$165+ (XL)", "Book via MoeGo", "100+ locations, franchise"],
                  [{ text: "Aussie Pet Mobile", color: "text-white font-semibold" }, "Phone/online", "Not listed", "Call/text/book", "National franchise, some closed"],
                  [{ text: "Heather's Mobile", color: "text-white font-semibold" }, "Member booking", "Member pricing", "Book via portal", "Boutique, cage-free"],
                ]}
              />
              <p className="text-[13px] text-[#64748B] mt-3">Pricing varies by dog size. Houston standard full groom ranges: small dogs $75–$110, medium $90–$130, large $110–$160+. Most competitors use third-party booking platforms (MoeGo) or phone/form - Royal Pawz is one of the only Houston mobile groomers with a fully custom booking flow optimized through A/B testing.</p>
            </Card>
            <Card title="Industry Benchmarks vs Royal Pawz" defaultOpen>
              <p className="mb-4">How our metrics stack up against published industry averages:</p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Booking Conversion Rate</div>
                    <div className="text-[15px] text-[#94A3B8]">Animals &amp; Pets Google Ads avg: 13.07% (WordStream). Home services: 7.33% (LocaliQ, 3,211 campaigns). General website avg: 2–5%.</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold font-mono text-emerald-400">~20%</div>
                    <div className="text-[12px] text-emerald-400">site-wide, Apr 7d avg</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Revenue per Session</div>
                    <div className="text-[15px] text-[#94A3B8]">Local service businesses avg: $1–$3/session. Most Google Ads traffic converts at 2–5%.</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold font-mono text-emerald-400">2x+</div>
                    <div className="text-[12px] text-emerald-400">above local service avg</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Google Ads <Term>CPC</Term></div>
                    <div className="text-[15px] text-[#94A3B8]">Pet grooming keywords: $1.50–$3.50 CPC. Overall Google avg: $4.51 (Backlinko). Home services avg: $7.85 (LocaliQ). Pet industry cost per lead: $31.82.</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold font-mono text-emerald-400">~$20</div>
                    <div className="text-[12px] text-emerald-400">Est. per 1st booking</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Repeat Rate</div>
                    <div className="text-[15px] text-[#94A3B8]">Local service businesses avg: 20–25% return rate within 6 months.</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold font-mono text-emerald-400">29%</div>
                    <div className="text-[12px] text-emerald-400">Jannet cohort, 5 months</div>
                  </div>
                </div>
              </div>
              <p className="text-[13px] text-[#64748B] mt-4">Sources: WordStream Conversion Rate Benchmarks, LocaliQ Home Services Search Ad Benchmarks (2025, 3,211 campaigns), IRP Commerce Revenue per Session Benchmarks, Backlinko Google Ads Cost Report (2026), Axios Houston / U.S. Census (dog ownership).</p>
            </Card>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ TAKEAWAYS ═══ */}
        <section id="takeaways" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Check} label="Summary" title="What We Learned" /></FadeIn>
          <FadeIn>
            <div className="space-y-3">
              {[
                { icon: "$", color: "bg-emerald-500/10 text-emerald-400", text: "8x LTV-to-CPA. Each new customer generates ~8x their acquisition cost in lifetime value so far ($195 avg LTV vs $25 blended CPA) - and that number is still climbing as cohorts mature. Since roughly half of new customers come from word-of-mouth (free), the true ad-only ROI is even higher." },
                { icon: "A", color: "bg-[#60A5FA]/10 text-[#60A5FA]", text: "A/B testing produced a 331% conversion lift. The second test took booking-flow conversion from 7.1% to 30.8% (n=26). Site-wide conversion climbed from ~3% to ~20% over the same period. These are the cleanest numbers in the report." },
                { icon: "↑", color: "bg-cyan-400/10 text-cyan-400", text: "8x revenue growth in 5 months. Driven by the combination of funnel optimization (more new customers converting) and retention (35–40% of monthly revenue from repeat bookings)." },
                { icon: "♻", color: "bg-amber-400/10 text-amber-400", text: "25.7% of all clients have rebooked (57 of 222). Jannet's mature cohort shows 29% - most clients are too new to have entered the 4–9 week rebooking window. Built on service quality, AI-powered SMS reminders, and automated rebooking." },
                { icon: "⚡", color: "bg-emerald-500/10 text-emerald-400", text: "Counter-intuitive wins. Adding more steps (intro screen) increased conversion. Asking for info earlier increased both conversion and AOV. Testing beat assumptions every time." },
                { icon: "∞", color: "bg-[#60A5FA]/10 text-[#60A5FA]", text: "Organic growth compounds. Roughly half of new customers come from direct/word-of-mouth - zero acquisition cost. The funnel optimization benefits these free customers equally, and repeat bookings create a revenue floor that grows every month." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-[#1E293B] border border-white/[0.06] rounded-xl">
                  <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>{item.icon}</div>
                  <p className="text-[16px] text-[#CBD5E1] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ WHAT'S NEXT ═══ */}
        <section id="next" className="px-5 sm:px-10 lg:px-16 py-16 scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Compass} label="Forward" title="What&apos;s Next" /></FadeIn>
          <FadeIn>
            <p className="text-[#94A3B8] text-[17px] leading-relaxed max-w-4xl mb-8">
              The funnel is in a strong state. Rather than chase marginal gains with more split tests, we&apos;re shifting to a monitoring phase - letting data accumulate and watching for new patterns before making changes.
            </p>
            <div className="space-y-4">
              <div className="bg-[#1E293B] rounded-xl p-6 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[12px] font-semibold text-emerald-400 uppercase tracking-wider">Active Now</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Monitoring & Data Collection</h3>
                <p className="text-[16px] text-[#94A3B8] leading-relaxed">Continuing to gather session data, conversion metrics, and CPA trends across the optimized funnel. The A/B test results are directionally strong but need more volume to reach full statistical confidence. We expect 2–4 weeks of monitoring before the next round of changes.</p>
              </div>
              <div className="bg-[#1E293B] rounded-xl p-6 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                  <span className="text-[12px] font-semibold text-[#60A5FA] uppercase tracking-wider">Queued</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Next Analysis Pass</h3>
                <p className="text-[16px] text-[#94A3B8] leading-relaxed">Once we have 200+ sessions on the current funnel, we&apos;ll do a deep-dive into the new drop-off points. Where are users leaving now? Is there another counter-intuitive optimization hiding in the data? The session recording infrastructure captures everything - we just need volume.</p>
              </div>
              <div className="bg-[#1E293B] rounded-xl p-6 border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-[12px] font-semibold text-cyan-400 uppercase tracking-wider">Advantage</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">The Custom Platform Edge</h3>
                <p className="text-[16px] text-[#94A3B8] leading-relaxed">Because we built the entire stack, we have access to data that wouldn&apos;t be possible with off-the-shelf tools - full session recordings, custom event tracking, real-time funnel analytics, and the ability to ship changes daily. No waiting for 1-week turnaround times. No paying for expensive plugins. We identify a problem, build the fix, push the code, and measure the result - often within 24 hours.</p>
              </div>
            </div>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ TESTIMONIAL ═══ */}
        <section className="px-5 sm:px-10 lg:px-16 py-16">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <Quote size={32} className="text-[#60A5FA]/30 mx-auto mb-6" />
              <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6 italic">
                &ldquo;Working with Zapp Studios completely transformed our business. The booking system they built and the way they optimized our funnel - we went from barely getting customers online to having a system that just works.&rdquo;
              </blockquote>
              <div className="text-[15px] text-[#94A3B8]">- Royal Pawz USA, Houston TX</div>
              <div className="text-[12px] text-[#64748B] mt-1">Mobile Dog Grooming</div>
            </div>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ GLOSSARY ═══ */}
        <section className="px-5 sm:px-10 lg:px-16 py-12">
          <FadeIn>
            <Card title="Glossary - Terms Used in This Report" defaultOpen={false}>
              <p className="mb-4 text-[#94A3B8]">Hover over dotted-underlined terms throughout the report for quick definitions. Full glossary below.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {Object.entries(acronyms).map(([term, def]) => (
                  <div key={term} className="flex gap-3">
                    <span className="text-[#60A5FA] font-bold font-mono w-12 flex-shrink-0 text-right">{term}</span>
                    <span className="text-[15px] text-[#94A3B8]">{def}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </section>


        <SectionDivider />
        {/* ═══ METHODOLOGY ═══ */}
        <section className="px-5 sm:px-10 lg:px-16 py-12">
          <FadeIn>
            <Card title="Methodology & Data Sources" defaultOpen={false}>
              <div className="space-y-3 text-[15px] text-[#94A3B8]">
                <p><strong className="text-white">Data sources:</strong> Supabase (recording_sessions, bookings, ab_test_events, users tables), Google Ads daily budget history.</p>
                <p><strong className="text-white">Revenue:</strong> Growth indices are based on net service revenue (service price minus discounts, excluding tips and tax). Specific revenue figures are not disclosed - all revenue is shown as multiples relative to the December baseline.</p>
                <p><strong className="text-white">Ad spend:</strong> Actual monthly spend from Google Ads dashboard. Budget changed from $50/day → $83/day (Mar 24) → $58.74/day (Apr 5) → $50/day (Apr 11). Total spend Dec–Apr 22: $5,405.</p>
                <p><strong className="text-white">Customer attribution:</strong> New vs repeat split based on first-booking detection per client_id using scheduled_date. Source attribution via session referrer and UTM tracking - not all sessions are attributable, so channel numbers are estimates.</p>
                <p><strong className="text-white">A/B testing:</strong> Randomized variant assignment at session start, tracked via custom ab_test_events table. Single-variable tests with concurrent control and treatment groups. Results verified directly against Supabase event data.</p>
                <p><strong className="text-white">Sessions &amp; bounce:</strong> From rrweb recording_sessions (bot-filtered). Sessions = unique recording sessions per visitor. Bounce is not reported in this version - conversion rate and revenue per session are more meaningful metrics for this business.</p>
                <p><strong className="text-white">LTV calculation:</strong> Avg LTV = $195.02 across 195 paying clients. Blended CPA = $5,405 total ad spend / 216 new clients (all sources) = $25.02. LTV:CPA = 7.8x. LTV is still maturing - early cohorts show increasing value over time.</p>
                <p><strong className="text-white">Timeline:</strong> Platform launched ~November 25, 2025. Session tracking installed December 26, 2025. Report period: Nov 2025 – Apr 22, 2026.</p>
              </div>
            </Card>
          </FadeIn>
        </section>


        {/* ═══ FOOTER ═══ */}
        <footer className="px-5 sm:px-10 lg:px-16 py-12 text-center">
          <div className="text-base text-white font-semibold mb-1">Zapp Studios</div>
          <div className="text-[14px] text-[#94A3B8] mb-1">Growth Engineering</div>
          <a href="https://www.zappstudios.us/revenue" className="text-[14px] text-[#60A5FA] hover:underline">zappstudios.us/revenue</a>
          <div className="text-[13px] text-[#64748B] mt-6 max-w-2xl mx-auto leading-relaxed">
            Prepared by Hamza, Founder · Zapp Studios · April 2026
          </div>
        </footer>

      </main>
    </div>
  )
}
