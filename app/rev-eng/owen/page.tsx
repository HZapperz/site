"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap, Search, BarChart3, Bot, ShoppingCart, Users,
  Megaphone, Settings, Calculator, Cpu, Map, Menu, X,
  AlertTriangle, Info, ChevronDown, ArrowRight, Check,
  Clock, Target, DollarSign, Star, TrendingUp, Package,
  ExternalLink
} from "lucide-react"
import FinancialModel from "./components/FinancialModel"
import CustomerFunnel from "./components/CustomerFunnel"

/* ─── NAV SECTIONS ─── */
const navSections = [
  { id: "executive", title: "Executive Summary", icon: Zap },
  { id: "market", title: "Market Research", icon: Search },
  { id: "audit", title: "Current State", icon: BarChart3 },
  { id: "automation", title: "Automation", icon: Bot },
  { id: "funnel", title: "Sales Funnel", icon: ShoppingCart },
  { id: "journey", title: "Customer Journey", icon: Users },
  { id: "ads", title: "Ads & Content", icon: Megaphone },
  { id: "scaling", title: "Scaling Ops", icon: Settings },
  { id: "financial", title: "Financial Model", icon: Calculator },
  { id: "tech", title: "Tech Stack", icon: Cpu },
  { id: "roadmap", title: "Roadmap", icon: Map },
]

/* ─── AD BRIEFS ─── */
const adBriefs = [
  {
    name: "The Build That Started It All",
    priority: "red" as const,
    priorityLabel: "Produce First",
    hook: "I build $350 custom watches that people mistake for $5,000 Rolexes...",
    body: "15-30 sec UGC-style video showing Owen's build process. Phone-shot, natural lighting, authentic workshop. Focus on the satisfying moments: crystal pressing, bezel snap, crown screw.",
    cta: "Shop Custom Watches",
    format: "Vertical Video (9:16)",
  },
  {
    name: "Before vs After Transformation",
    priority: "red" as const,
    priorityLabel: "Produce First",
    hook: "Stock $200 Seiko → Custom $450 masterpiece in 60 seconds",
    body: "Side-by-side or transition reveal. Start with stock SKX007, quick cuts of the mod process, end with the finished custom build. Dramatic music beat on the reveal.",
    cta: "Build Your Own",
    format: "Vertical Video (9:16)",
  },
  {
    name: "What 50+ Customers Are Saying",
    priority: "amber" as const,
    priorityLabel: "High Priority",
    hook: "Over 50 five-star reviews and 700 watches delivered...",
    body: "Carousel of Facebook review screenshots with product photos. Each slide: review text + the watch they bought. End with CTA to browse the collection.",
    cta: "See The Collection",
    format: "Carousel (5-8 cards)",
  },
  {
    name: "Pick Your Style",
    priority: "amber" as const,
    priorityLabel: "High Priority",
    hook: "Which custom Seiko mod are you?",
    body: "Carousel showcasing 5-8 different build styles — Diver, Datejust, Nautilus, GMT, Dress. Each card: beauty shot + style name + starting price. Interactive feel.",
    cta: "Design Yours",
    format: "Carousel (5-8 cards)",
  },
  {
    name: "Rolex Quality, Seiko Price",
    priority: "amber" as const,
    priorityLabel: "High Priority",
    hook: "My $400 Seiko mod vs an $8,000 Datejust. Spot the difference.",
    body: "Controversy hook — side-by-side comparison of a Datejust-style mod next to the real thing. Clean photography, let the quality speak. Comments section drives engagement.",
    cta: "See The Build",
    format: "Image or Video",
  },
  {
    name: "ASMR Build Session",
    priority: "blue" as const,
    priorityLabel: "Test",
    hook: "[Sound on] 47 parts. One custom watch.",
    body: "Close-up ASMR-style build video. Emphasized sounds: crystal press click, bezel snap, crown wind, caseback screw. Minimal text overlays. Meditative, satisfying content.",
    cta: "Order Yours",
    format: "Vertical Video (15-60 sec)",
  },
  {
    name: "Design Your Dream Watch",
    priority: "blue" as const,
    priorityLabel: "Test",
    hook: "Message us 'BUILD' to design your custom Seiko mod",
    body: "Click-to-Messenger ad. Shows the configurator concept — choose your case, dial, hands, bezel. CTA opens a ManyChat conversation that qualifies the lead and collects preferences.",
    cta: "Send Message",
    format: "Image + CTA Button",
  },
  {
    name: "60 Seconds, 47 Parts",
    priority: "blue" as const,
    priorityLabel: "Test",
    hook: "Watch an entire custom Seiko come together in 60 seconds",
    body: "Full time-lapse build from empty case to finished watch. Speed ramp on key moments. End with wrist shot and price reveal. Text overlay: \"Starting at $350.\"",
    cta: "Shop Now",
    format: "Vertical Video (60 sec)",
  },
  {
    name: "Still Thinking?",
    priority: "gray" as const,
    priorityLabel: "Retargeting",
    hook: "Your custom watch is still waiting...",
    body: "Dynamic product ad targeting cart abandoners (0-7 days). Shows the exact product they viewed. Urgency: \"Custom builds take 7-14 days — order now to get yours sooner.\"",
    cta: "Complete Your Order",
    format: "Dynamic Product Ad",
  },
  {
    name: "Back by Popular Demand",
    priority: "gray" as const,
    priorityLabel: "Retargeting",
    hook: "700+ watches built. Yours could be next.",
    body: "Retargeting page viewers (7-30 days) who didn't purchase. Social proof focus: review count, total builds, repeat customers. Soft incentive optional.",
    cta: "Browse Builds",
    format: "Image + Social Proof",
  },
]

const priorityColors = {
  red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  gray: { bg: "bg-white/5", text: "text-[#888]", border: "border-white/10" },
}

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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[15px] text-[#ccc] leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DataTable({ headers, rows, accent = false }: { headers: string[]; rows: string[][]; accent?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/[0.06] -mx-1">
      <table className="w-full text-[15px] border-collapse min-w-[500px]">
        <thead>
          <tr className={accent ? "bg-[#7c5cfc]/10" : "bg-[#1a1a2e]"}>
            {headers.map((h, i) => (
              <th key={i} className="text-left py-3 px-4 text-xs tracking-wider uppercase text-[#7c5cfc] font-semibold border-b border-[#333] whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[#1a1a2e] hover:bg-white/[0.02] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`py-3.5 px-4 ${ci === 0 ? "text-white font-medium" : "text-[#999]"}`}>
                  {parseBold(cell)}
                </td>
              ))}
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
    <div className="bg-[#141420] rounded-xl p-4 sm:p-5 border border-white/[0.06] flex-1 min-w-[120px] sm:min-w-[150px]">
      <div className="text-[11px] text-[#666] uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-xl sm:text-2xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-[11px] text-[#555] mt-1">{sub}</div>}
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-3">
      <span className="text-[#7c5cfc] mt-1 flex-shrink-0">&#8226;</span>
      <span className="text-[15px] leading-relaxed">{children}</span>
    </div>
  )
}

function NumberedStep({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#7c5cfc]/20 flex items-center justify-center text-[#7c5cfc] text-sm font-bold">
        {n}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold text-base mb-1">{title}</div>
        <div className="text-[#999] text-[15px] leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function PricingCard({ tier, price, volume, features, highlighted = false }: {
  tier: string; price: string; volume: string; features: string[]; highlighted?: boolean
}) {
  return (
    <div className={`rounded-xl p-5 sm:p-6 border flex-1 basis-full sm:basis-0 sm:min-w-[220px] ${highlighted ? "bg-[#7c5cfc]/10 border-[#7c5cfc]/30" : "bg-[#141420] border-white/[0.06]"}`}>
      {highlighted && <div className="text-[11px] font-semibold text-[#7c5cfc] tracking-widest mb-2">RECOMMENDED</div>}
      <div className="text-xl font-bold text-white mb-1">{tier}</div>
      <div className="text-[#7c5cfc] font-semibold text-lg mb-1">{price}</div>
      <div className="text-xs text-[#666] mb-4">{volume}</div>
      <div className="space-y-2.5">
        {features.map((f, i) => (
          <div key={i} className="flex gap-2 text-sm text-[#999]">
            <Check size={14} className="text-[#4ade80] flex-shrink-0 mt-0.5" />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function parseBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── MAIN PAGE ─── */

export default function OwenPlaybook() {
  const [activeSection, setActiveSection] = useState("executive")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )

    navSections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

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
          <div className="text-sm font-semibold text-white">Modded Seiko</div>
          <div className="text-[10px] text-[#555] mt-0.5">Revenue Engineering Playbook</div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {navSections.map(s => {
            const Icon = s.icon
            const isActive = activeSection === s.id
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left text-[13px] transition-all cursor-pointer ${
                  isActive
                    ? "text-white font-semibold bg-[#7c5cfc]/10 border-l-[3px] border-l-[#7c5cfc]"
                    : "text-[#666] hover:text-[#999] border-l-[3px] border-l-transparent hover:bg-white/[0.02]"
                }`}
              >
                <Icon size={14} className={isActive ? "text-[#7c5cfc]" : ""} />
                {s.title}
              </button>
            )
          })}
        </nav>

        <div className="p-5 border-t border-white/[0.06]">
          <div className="text-[10px] text-[#444] leading-relaxed">
            Prepared by Hamza<br />
            zappstudios.us<br />
            March 2026
          </div>
        </div>
      </aside>

      {/* ─── MOBILE NAV ─── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 h-14 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06]">
          <div>
            <span className="text-[9px] font-bold tracking-[2px] text-[#7c5cfc]">ZAPP STUDIOS</span>
            <span className="text-sm font-semibold text-white ml-2">Modded Seiko</span>
          </div>
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="text-[#888] p-2 cursor-pointer">
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-[#0f0f15] border-b border-white/[0.06]"
            >
              <nav className="py-2 max-h-[60vh] overflow-y-auto">
                {navSections.map(s => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm cursor-pointer ${
                        activeSection === s.id ? "text-white font-semibold" : "text-[#666]"
                      }`}
                    >
                      <Icon size={14} className={activeSection === s.id ? "text-[#7c5cfc]" : ""} />
                      {s.title}
                    </button>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main ref={mainRef} className="flex-1 min-w-0">

        {/* ═══ HERO ═══ */}
        <section className="relative px-6 sm:px-10 lg:px-16 pt-24 lg:pt-16 pb-12 border-b border-white/[0.06]">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7c5cfc]/10 border border-[#7c5cfc]/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc] animate-pulse" />
                <span className="text-[10px] font-semibold tracking-widest text-[#7c5cfc]">REVENUE ENGINEERING PLAYBOOK</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                MODDED SEIKO<br />
                <span className="text-[#7c5cfc]">&times;</span> ZAPP STUDIOS
              </h1>
              <p className="text-lg sm:text-xl text-[#888] leading-relaxed max-w-xl mb-6">
                The operational playbook for scaling a custom Seiko watch business from 1-2 builds/day to 7-8 — through automation, demand generation, and strategic pricing.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[#555]">
                <span>Prepared by Hamza</span>
                <span className="text-[#333]">|</span>
                <span>zappstudios.us</span>
                <span className="text-[#333]">|</span>
                <span>March 2026</span>
              </div>
            </motion.div>

            {/* Key metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              <MetricCard label="Current" value="1-2/day" sub="watches built" />
              <MetricCard label="Target" value="7-8/day" sub="with systems" color="text-[#7c5cfc]" />
              <MetricCard label="Revenue Target" value="$80-100K" sub="monthly at scale" color="text-[#4ade80]" />
            </motion.div>
          </div>
        </section>


        {/* ═══ SECTION 1: EXECUTIVE SUMMARY ═══ */}
        <section id="executive" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Zap} label="Section 1" title="Executive Summary" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="The Opportunity">
                <p className="mb-3">Owen can build <strong className="text-white">8 custom Seiko watches per day</strong>. He&apos;s currently building 1-2. The difference isn&apos;t skill or capacity — it&apos;s that he&apos;s spending 70% of his day responding to DMs, quoting prices, tracking orders, posting content, and managing listings instead of doing what he&apos;s best at: building watches.</p>
                <p>The strategy isn&apos;t &quot;help Owen make more watches.&quot; It&apos;s <strong className="text-white">free Owen to ONLY make watches while we create so much demand that he can raise prices</strong>. Supply constraint becomes a feature, not a bug.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="The Three-Phase Strategy">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#7c5cfc]/5 border border-[#7c5cfc]/10">
                    <div className="text-xs font-semibold text-[#7c5cfc] tracking-widest mb-1.5">PHASE 1 — FREE OWEN&apos;S HANDS</div>
                    <p>Hamza joins as revenue engineering partner handling all marketing, customer service, and business operations. An AI-powered automation system (ManyChat + Make.com + Google Sheets) handles 80% of repetitive customer inquiries. Owen&apos;s only job becomes building watches. <strong className="text-white">Immediate impact: production jumps from 1-2 to 6-8 watches/day.</strong></p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#7c5cfc]/5 border border-[#7c5cfc]/10">
                    <div className="text-xs font-semibold text-[#7c5cfc] tracking-widest mb-1.5">PHASE 2 — FLOOD THE PIPELINE WITH DEMAND</div>
                    <p>A Shopify store with a visual watch configurator captures buyers 24/7. Paid ads on Meta, TikTok, and Google drive targeted traffic. Organic content builds brand awareness. Owen&apos;s 50+ Facebook reviews become cross-platform social proof. <strong className="text-white">Result: demand significantly exceeds Owen&apos;s daily build capacity.</strong></p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#7c5cfc]/5 border border-[#7c5cfc]/10">
                    <div className="text-xs font-semibold text-[#7c5cfc] tracking-widest mb-1.5">PHASE 3 — RAISE PRICES BECAUSE YOU CAN</div>
                    <p>When you have a waitlist, you&apos;re underpriced. Shift from a flat $300-$500 range to a tiered model: Collection ($350-$425), Premium ($500-$700), and Bespoke ($750-$1,200). <strong className="text-white">The brand evolves from &quot;guy who mods Seikos on Facebook&quot; to a premium microbrand with a reputation, a waitlist, and pricing power.</strong></p>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="The Math at Scale">
                <div className="flex flex-wrap gap-3 mb-4">
                  <MetricCard label="Monthly Revenue" value="$66-88K" sub="6-8 watches/day x ~$500 ASP x 22 days" color="text-[#4ade80]" />
                  <MetricCard label="Gross Profit" value="$40-57K" sub="60-65% margins after parts" color="text-[#4ade80]" />
                </div>
                <p>Even conservatively at 5 watches/day with a $450 ASP, that&apos;s <strong className="text-white">$49,500/month</strong>. The C8 comes from margin expansion AND volume, not just volume alone.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="The Deal Structure">
                <p className="mb-3">Zapp Studios provides all revenue engineering services — strategy, automation setup, ad management, content direction, and ongoing optimization — at <strong className="text-white">zero cost</strong> to Owen. Owen is the founding case study for Zapp Studios&apos; revenue engineering service.</p>
                <div className="p-4 rounded-lg bg-[#1a1a2e] mt-3">
                  <div className="text-xs font-semibold text-white mb-2">Owen covers direct hard costs only:</div>
                  <Bullet>Ad spend: $1,500-$3,000/month (when ready to launch paid)</Bullet>
                  <Bullet>Software subscriptions: ~$55-$150/month</Bullet>
                  <Bullet>API credits for AI tools: ~$5-$10/month</Bullet>
                </div>
                <p className="mt-3 text-xs text-[#666]">Hamza&apos;s time, expertise, and systems are completely free. If external development is needed, Owen covers infrastructure costs (hosting, API usage) but not development time.</p>
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ SECTION 2: MARKET RESEARCH ═══ */}
        <section id="market" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Search} label="Section 2" title="Market Research & Competitive Landscape" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="The Seiko Mod Market in 2026">
                <p className="mb-3">The custom Seiko modding market has exploded since 2020. <strong className="text-white">#SeikoMods has 850K+ Instagram posts</strong>. r/SeikoMods has grown past 400K members. The broader watch market reached $75.8 billion in 2024, projected to hit $116.7B by 2034. Seiko Group&apos;s own sales climbed 11.7% to ~$1.22B in FY2024-2025.</p>
                <p>The COVID hobby boom of 2020-2022 brought a wave of new modders and buyers. The barrier to entry is extremely low — AliExpress parts + Instagram = instant &quot;business.&quot; But the barrier to building a reputable, quality operation remains high. <strong className="text-white">That&apos;s Owen&apos;s moat.</strong></p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Competitor Pricing Tiers">
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-[#666] w-28 flex-shrink-0">$75-$150</span>
                    <div><strong className="text-white">Budget:</strong> AliExpress sellers, clone movements, high failure rates. Not real competition.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-[#666] w-28 flex-shrink-0">$200-$350</span>
                    <div><strong className="text-white">Mid-range:</strong> SKYRIM Wrist, Nomods, WatchBrick. Established ops with proper e-commerce.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-[#7c5cfc] w-28 flex-shrink-0">$400-$700</span>
                    <div><strong className="text-[#7c5cfc]">Premium (Owen&apos;s tier):</strong> Lucius Atelier, Circa Watch Labs. Differentiation through craftsmanship.</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-[#666] w-28 flex-shrink-0">$700-$1,500+</span>
                    <div><strong className="text-white">Ultra-premium:</strong> Fully custom one-of-one builds. Undone Watches is the gold standard.</div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Key Competitors to Study">
                <DataTable
                  headers={["Builder", "Price Range", "Channels", "Differentiator"]}
                  rows={[
                    ["SKYRIM Wrist", "$249-$449", "Shopify, IG, SEO blog", "Largest catalog (447+), strong content"],
                    ["Circa Watch Labs", "$400-$700+", "Shopify w/ configurator", "Online watch builder tool"],
                    ["Nomods", "$250-$500", "Shopify, Instagram", "Clean branding, educational content"],
                    ["WatchModMaker", "Free tool / $300-$600", "Custom website", "Community visualization tool"],
                    ["Lucius Atelier", "$400-$800+", "Shopify, Instagram", "Premium parts supplier AND builder"],
                    ["Undone Watches", "$350-$800+", "Proprietary configurator", "Gold-standard configurator"],
                    ["Crystal Times", "Parts + builds", "Shopify", "Major supplier + business guides"],
                  ]}
                />
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Trending Styles & Market Shifts">
                <p className="mb-3"><strong className="text-white">Hot right now:</strong> Rolex Datejust builds, Patek Nautilus &quot;Seikonaut&quot; mods, AP Royal Oak &quot;Seikoak&quot; builds, GMT builds (NH34 movement), VK meca-quartz chronographs.</p>
                <p className="mb-3"><strong className="text-white">Case size shift:</strong> 42mm+ is increasingly dated. 38-40mm is the new standard. 36mm women&apos;s/unisex builds are an almost completely untapped market.</p>
                <p><strong className="text-white">Design direction:</strong> Clean, sterile (unbranded) dials now outperform copycat logos. This aligns perfectly with the post-Seiko-IP-notice landscape.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <AlertBox type="warning" title="Seiko's October 2025 IP Notice">
                <p className="mb-2">Seiko Corporation issued an official notice warning against &quot;MOD watches assembled with fake or unauthorized components,&quot; targeting sellers using counterfeit parts and Seiko logos. Most legal experts concluded that modifying genuine Seiko parts remains legal under first-sale doctrine.</p>
                <p><strong className="text-white">Strategic implication:</strong> Evolve toward selling under the &quot;Modded Seiko&quot; brand identity with &quot;powered by Seiko NH35 movement&quot; language rather than positioning as a Seiko product. This also positions the brand more professionally for the premium tiers.</p>
              </AlertBox>
            </FadeIn>
          </div>
        </section>


        {/* ═══ SECTION 3: CURRENT STATE AUDIT ═══ */}
        <section id="audit" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={BarChart3} label="Section 3" title="Current State Audit" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#141420] rounded-xl border border-emerald-500/10 p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={18} className="text-[#4ade80]" />
                    <span className="text-base font-semibold text-[#4ade80]">What&apos;s Working</span>
                  </div>
                  <div className="space-y-3 text-[#ccc]">
                    <Bullet><strong className="text-white">Product quality</strong> — Consistently positive reviews, repeat customers, word-of-mouth</Bullet>
                    <Bullet><strong className="text-white">Organic reputation</strong> — 50+ Facebook reviews and 700 lifetime sales</Bullet>
                    <Bullet><strong className="text-white">Production capability</strong> — Can build 8 watches/day when focused solely on assembly</Bullet>
                    <Bullet><strong className="text-white">Market position</strong> — $300-$500 captures premium-accessible segment at 60-65% margins</Bullet>
                    <Bullet><strong className="text-white">Early mover advantage</strong> — 3 years of supplier relationships and build efficiency</Bullet>
                  </div>
                </div>
                <div className="bg-[#141420] rounded-xl border border-red-500/10 p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={18} className="text-[#f87171]" />
                    <span className="text-base font-semibold text-[#f87171]">What&apos;s Bottlenecking</span>
                  </div>
                  <div className="space-y-3 text-[#ccc]">
                    <Bullet><strong className="text-white">Solo operator</strong> — Every minute on non-build tasks = a watch not built</Bullet>
                    <Bullet><strong className="text-white">No website</strong> — 100% of sales via Facebook Marketplace DMs</Bullet>
                    <Bullet><strong className="text-white">No automation</strong> — Every customer interaction is manual</Bullet>
                    <Bullet><strong className="text-white">No email/phone list</strong> — 700 past customers are uncaptured</Bullet>
                    <Bullet><strong className="text-white">Single-channel</strong> — Facebook Marketplace is rented land</Bullet>
                    <Bullet><strong className="text-white">Declining volume</strong> — From 50/day peak to 20-30/month</Bullet>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <Card title="Revenue at Current State">
                <p className="mb-3">At 20-30 watches/month x $400 average:</p>
                <div className="flex flex-wrap gap-3 mb-3">
                  <MetricCard label="Monthly Revenue" value="$8-12K" />
                  <MetricCard label="COGS (35-40%)" value="$2.8-4.8K" />
                  <MetricCard label="Gross Profit" value="$5.2-7.2K" color="text-[#4ade80]" />
                </div>
                <p>No marketing spend, minimal software costs. This is a profitable side hustle. <strong className="text-white">The playbook turns it into a real business.</strong></p>
              </Card>
            </FadeIn>

            <FadeIn>
              <AlertBox type="info" title="Social Media Audit Pending">
                Need access to Owen&apos;s Facebook Insights and Instagram Analytics to fill in real data. Recommended: Owen screenshots his analytics or shares screen on the next call. This will update the audience demographics, engagement rates, and top-performing content sections.
              </AlertBox>
            </FadeIn>
          </div>
        </section>


        {/* ═══ SECTION 4: AUTOMATION SYSTEM ═══ */}
        <section id="automation" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Bot} label="Section 4" title="The Automation System" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="The Core Problem">
                <p className="mb-4">Owen&apos;s four biggest time sinks are all automatable:</p>
                <NumberedStep n={1} title="Responding to DMs/messages">80% are the same 5 questions</NumberedStep>
                <NumberedStep n={2} title="Order tracking & follow-ups">Manual status updates for every order</NumberedStep>
                <NumberedStep n={3} title="Quoting/pricing inquiries">Repeating the same info with minor variations</NumberedStep>
                <NumberedStep n={4} title="Posting content & managing listings">Falls to the bottom of the priority list</NumberedStep>
                <p className="mt-2">Automating these recovers an estimated <strong className="text-white">15-20 hours per month</strong> — equivalent to 40-50 additional watches at Owen&apos;s build rate.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <AlertBox type="warning" title="Critical: Facebook Marketplace Limitation">
                <p className="mb-2"><strong className="text-white">ManyChat cannot automate personal Facebook Marketplace messages.</strong> Meta&apos;s Messenger API only grants automation access to Business Page conversations, not personal profile threads.</p>
                <p className="mb-2"><strong className="text-white">The fix:</strong> List all products on Marketplace through a connected Facebook Business Page. Inquiries from Page-listed items route through the Page&apos;s Messenger inbox, which ManyChat can fully automate.</p>
                <p className="font-semibold text-amber-400">This is step zero. Everything else depends on it.</p>
              </AlertBox>
            </FadeIn>

            <FadeIn>
              <Card title="ManyChat FAQ Bot — $44/month">
                <p className="mb-4">ManyChat Pro ($15/mo for 500 contacts) + AI add-on ($29/mo). Handles 5 core inquiry types:</p>
                <div className="space-y-3">
                  {[
                    { q: "Pricing", a: "Visual pricing menu: Collection ($350-$425), Premium ($500-$700), Bespoke ($750+) with Quick Reply buttons to Shopify" },
                    { q: "Shipping", a: "\"Custom builds take 7-14 days. Standard shipping included. Express available.\"" },
                    { q: "Customization", a: "Gallery carousel of options + direct link to the watch configurator" },
                    { q: "Warranty/Returns", a: "Policy summary + link to full terms" },
                    { q: "Order Status", a: "Collects order number, looks up via Sheets integration or escalates to human" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                      <span className="text-sm font-mono text-[#7c5cfc] sm:w-32 flex-shrink-0">{item.q}</span>
                      <span className="text-[#999] text-[15px] leading-relaxed">{item.a}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-lg bg-[#1a1a2e] text-sm text-[#888] leading-relaxed">
                  <strong className="text-white">AI Replies</strong> trains on your website and product info (250K chars). Responds contextually to any question. Multi-language auto-detection for international buyers. <strong className="text-white">AI Step</strong> runs goal-oriented conversations: &quot;Qualify this lead — collect email, style preference, budget, timeline.&quot; <strong className="text-white">Live Chat Handoff</strong> routes complex questions to Owen/Hamza with push notifications.
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="The 6-Stage Automated Order Pipeline">
                <p className="mb-4 text-sm text-[#666]">ManyChat + Make.com ($9/mo) + Google Sheets (free)</p>
                <div className="space-y-0">
                  {[
                    { stage: "Inquiry", desc: "Customer messages. ManyChat qualifies (style, budget, timeline), captures email/phone." },
                    { stage: "Quote", desc: "Collection builds get auto-pricing. Premium/Bespoke hits Google Sheets for custom quote." },
                    { stage: "Payment", desc: "Shopify checkout link sent. Payment triggers Make.com → logs order in Sheets → sends confirmation DM." },
                    { stage: "Production", desc: "Owen updates status in Sheets (Parts Ordered → Build In Progress → QC → Shipped). Each change auto-sends customer DM/email." },
                    { stage: "Delivery", desc: "Auto shipping notification with tracking number." },
                    { stage: "Review", desc: "3 days post-delivery: \"How's the new watch? A review helps us reach more enthusiasts → [link]\"" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 relative">
                      {/* Timeline line */}
                      {i < 5 && <div className="absolute left-[15px] top-8 w-px h-[calc(100%-8px)] bg-[#222]" />}
                      {/* Dot */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7c5cfc]/20 flex items-center justify-center text-[#7c5cfc] text-xs font-bold z-10 mt-0.5">
                        {i + 1}
                      </div>
                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="text-white font-semibold text-sm">{item.stage}</div>
                        <div className="text-[#999] text-sm mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Full Automation Stack">
                <DataTable
                  headers={["Tool", "Monthly Cost", "Purpose"]}
                  rows={[
                    ["ManyChat Pro + AI", "~$44", "DM automation, FAQ bot, AI replies, lead qualification"],
                    ["Make.com Core", "$9", "Connects ManyChat → Sheets → email triggers"],
                    ["Google Sheets", "$0", "Lightweight CRM and order tracker"],
                    ["Buffer or Canva Pro", "$6-$13", "Content scheduling (IG + FB)"],
                    ["**TOTAL**", "**$59-$66/mo**", ""],
                  ]}
                />
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ SECTION 5: SALES FUNNEL ═══ */}
        <section id="funnel" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={ShoppingCart} label="Section 5" title="The Sales Funnel" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="Why Owen Needs Shopify — $39/month">
                <p className="mb-3">Every established Seiko mod shop runs Shopify. Owen is the exception. A store provides:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "24/7 sales — browsers buy at 2 AM instead of waiting for DM reply",
                    "Abandoned cart recovery — auto-emails for $300-$500 items",
                    "Instagram Shopping — tag products in posts with direct checkout",
                    "Meta Pixel — track visitors, build retargeting audiences",
                    "Email capture — pop-ups, checkout, configurator all collect emails",
                    "Professional credibility — polished store vs \"DM me for pricing\"",
                    "Analytics — know where buyers come from and where they drop off",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2.5 text-[15px]">
                      <Check size={16} className="text-[#4ade80] flex-shrink-0 mt-0.5" />
                      <span className="text-[#ccc] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title={'The Watch Configurator — "Design Your Own"'}>
                <p className="mb-3">This is the centerpiece. Every successful Seiko mod configurator uses <strong className="text-white">2D layered image-swap, not 3D</strong>. Components are flat layers (dial → hands → crystal → bezel), making photography cheaper and more effective.</p>
                <p className="mb-4"><strong className="text-white">Recommended: Kickflip</strong> — $0/month + 1.95% per sale. No-code drag-and-drop editor on Shopify. Dynamic pricing adjusts totals as customers select options.</p>
                <div className="space-y-0 mb-4">
                  <NumberedStep n={1} title="Week 1 ($0)">Typeform with component photos to validate demand. Process orders manually.</NumberedStep>
                  <NumberedStep n={2} title="Weeks 2-3 ($200-$500)">Shopify + Kickflip. Photograph all components on transparent backgrounds. Build configurators per style.</NumberedStep>
                  <NumberedStep n={3} title="Month 2+">Expand styles, add conditional logic for compatibility, optimize based on feedback.</NumberedStep>
                </div>
                <p className="text-xs text-[#666]">The configurator transforms passive browsers into engaged buyers who&apos;ve already emotionally committed to &quot;their&quot; watch before they pay.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Configurator Tool Comparison">
                <DataTable
                  headers={["Tool", "Monthly Cost", "Setup Cost", "Best For"]}
                  rows={[
                    ["Kickflip ★", "$0 + 1.95%/sale", "$0-$500 (photos)", "Best value for small builders"],
                    ["Zakeke", "$30-$105/mo + fees", "$500-$2K (3D)", "Shops wanting 3D/AR"],
                    ["Product Personalizer", "$15/mo", "$0", "Simple dropdowns only"],
                    ["Threekit", "$1K-$5K+/mo", "$5K-$20K+", "Enterprise — overkill"],
                    ["Typeform (MVP)", "$0-$35/mo", "$0", "Demand validation before investing"],
                  ]}
                  accent
                />
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Leveraging 50+ Facebook Reviews">
                <p className="mb-3">Owen&apos;s reviews are his most underutilized asset. They need to appear everywhere:</p>
                <div className="space-y-3">
                  <Bullet><strong className="text-white">Shopify store:</strong> Install Reputon (~$10-$15/mo) to auto-sync Facebook reviews. Place near &quot;Add to Cart&quot; and on homepage. Enable schema markup for Google star ratings.</Bullet>
                  <Bullet><strong className="text-white">Ad creative:</strong> Review screenshots consistently outperform generic product ads on Meta.</Bullet>
                  <Bullet><strong className="text-white">Email sequences:</strong> Include &quot;What our customers say&quot; in every email with 2-3 excerpts.</Bullet>
                  <Bullet><strong className="text-white">Instagram:</strong> Create a &quot;Reviews&quot; Story Highlight. Post testimonials as feed content.</Bullet>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-[#1a1a2e] text-xs text-[#888]">
                  <strong className="text-white">Zero-cost approach:</strong> Screenshot best reviews → add as images on product pages, Stories, emails, ads. Works perfectly.
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Email & SMS Flows — Klaviyo (Free for 500 contacts)">
                <p className="mb-4"><strong className="text-white">Immediate action:</strong> Import all available customer emails into Klaviyo. Automated flows generate <strong className="text-white">30x more revenue per recipient</strong> than standard campaigns. Email marketing returns <strong className="text-white">$36-$42 for every $1 spent</strong> for DTC brands.</p>

                <div className="space-y-3">
                  {[
                    { name: "Welcome Series", detail: "Email 1 (instant): brand story + configurator link. Email 2 (Day 2): \"How Owen builds your watch.\" Email 3 (Day 5): reviews + limited availability. Avg revenue: $2.65/recipient." },
                    { name: "Abandoned Cart", detail: "1hr: \"Still thinking?\" 24hr: social proof + reviews. 72hr: urgency + lead time reminder. Avg revenue: $3.65/recipient." },
                    { name: "Post-Purchase", detail: "Day 0: confirmation. Day 3: build-in-progress photo. Day 7: shipping. Day 14: review request. Day 30: referral ask." },
                    { name: "New Drop Announcement", detail: "Email + SMS blast for limited edition releases. Drives urgency and waitlist signups." },
                    { name: "Win-Back", detail: "90-day inactive customers get a re-engagement sequence with new builds and incentive." },
                  ].map((flow, i) => (
                    <div key={i} className="p-4 rounded-lg bg-[#1a1a2e] border border-white/[0.04]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-bold text-[#7c5cfc]">{i + 1}.</span>
                        <span className="text-base font-semibold text-white">{flow.name}</span>
                      </div>
                      <p className="text-sm text-[#999] leading-relaxed">{flow.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ SECTION 6: CUSTOMER JOURNEY FUNNEL ═══ */}
        <section id="journey" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Users} label="Section 6" title="The Customer Journey Funnel" /></FadeIn>
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-base text-[#888] mb-8 leading-relaxed">How 10,000 monthly impressions convert into 12 sales and $5,400 in revenue — before paid ads enter the picture. Click each stage to expand.</p>
              <CustomerFunnel />
            </div>
          </FadeIn>
        </section>


        {/* ═══ SECTION 7: ADS & CONTENT STRATEGY ═══ */}
        <section id="ads" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Megaphone} label="Section 7" title="Paid Ads & Organic Content Strategy" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="Paid Ads: Start on Meta at $1,500-$3,000/month">
                <p className="mb-3"><strong className="text-white">Meta (Facebook/Instagram) gets 70-80% of initial ad spend.</strong> Starting budget: $50-$100/day.</p>
                <p className="mb-3"><strong className="text-white">Best creative formats:</strong></p>
                <NumberedStep n={1} title="UGC-style video (15-30 sec)">Phone-shot build process. 4x higher engagement than polished brand content.</NumberedStep>
                <NumberedStep n={2} title="Carousel ads">Showcasing different builds. 30-50% lower CPC than single images.</NumberedStep>
                <NumberedStep n={3} title="Testimonial/review ads">Customer unboxing reactions + review screenshots.</NumberedStep>

                <p className="mb-3 mt-4"><strong className="text-white">Targeting:</strong> Layer watch interests (Seiko, Orient, Casio, Hamilton, horology) + lifestyle (whiskey, leather goods, EDC) + behavioral (engaged shoppers). After 50+ conversions, Lookalike Audiences from the 700-customer email list become the primary scaling lever.</p>

                <div className="flex flex-wrap gap-3 mt-4">
                  <MetricCard label="Target CPM" value="$9-$14" />
                  <MetricCard label="Target CPC" value="$0.70-$1.50" />
                  <MetricCard label="Target CTR" value="2.0-2.8%" />
                  <MetricCard label="Target ROAS" value="3-5x" />
                </div>

                <div className="mt-3 text-xs text-[#666]">Initial CAC: $75-$150, optimizing to $60-$100. Q4 (Nov-Dec) inflates CAC by 30-40%. Q1 is cheapest.</div>
              </Card>
            </FadeIn>

            <FadeIn>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card title="TikTok — 15% of Budget" defaultOpen={false}>
                  <p className="mb-2">$300-$500/month focused on <strong className="text-white">Spark Ads</strong> — promote existing organic posts as paid ads. 142% higher engagement and 43% higher conversion than standard in-feed ads.</p>
                  <p className="mt-2"><strong className="text-white">Content that goes viral:</strong> Compressed build videos, ASMR assembly, before/after transformations, controversy hooks. Hook in first 1-2 seconds with the finished watch, then rewind.</p>
                </Card>
                <Card title="Google Shopping — 10% of Budget" defaultOpen={false}>
                  <p>Captures high-intent search traffic for &quot;custom Seiko watch,&quot; &quot;Seiko mod for sale.&quot; Custom products qualify for Shopping ads by setting identifier_exists to FALSE. Lower volume than Meta but highest purchase intent of any channel.</p>
                </Card>
              </div>
            </FadeIn>

            <FadeIn>
              <Card title="Organic Content Strategy">
                <p className="mb-3"><strong className="text-white">Posting cadence:</strong> 4-5 Instagram feed posts/week, daily Stories, 5-7 TikToks/week.</p>
                <div className="space-y-2.5 mb-4">
                  {[
                    { pillar: "Build Process", pct: "40%", desc: "Time-lapse assembly, ASMR close-ups, \"what goes into a $400 watch\"" },
                    { pillar: "Finished Reveals", pct: "20%", desc: "Beauty shots, wrist rolls, lume photography" },
                    { pillar: "Behind the Scenes", pct: "15%", desc: "Workbench life, sourcing, problem-solving" },
                    { pillar: "Education", pct: "15%", desc: "Movement comparisons, crystal types, water resistance testing" },
                    { pillar: "Social Proof", pct: "10%", desc: "Customer wrist shots, testimonials, \"your mod, your story\"" },
                  ].map((p, i) => (
                    <div key={i} className="flex items-start sm:items-center gap-3">
                      <span className="text-sm font-mono text-[#7c5cfc] w-10 flex-shrink-0 pt-2.5 sm:pt-0">{p.pct}</span>
                      <div className="flex-1 bg-[#1a1a2e] rounded-lg p-3">
                        <span className="text-white text-[15px] font-medium">{p.pillar}</span>
                        <span className="text-[#666] text-sm ml-0 sm:ml-2 block sm:inline mt-0.5 sm:mt-0">{p.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#666]"><strong className="text-white">Reddit (underutilized):</strong> r/SeikoMods (400K) — share builds as a contributor. r/WatchExchange (119K) — list builds for sale. Need 30+ days age + positive karma.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="The Organic-to-Paid Flywheel">
                <div className="flex flex-wrap items-center gap-2 text-sm mb-5">
                  {["Post organic", "ID top performers", "Boost as ads", "Capture emails", "Build Lookalikes", "Run CTA ads", "ManyChat automates", "Shopify closes", "Review → social proof"].map((step, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-[#1a1a2e] text-[#ccc] border border-white/[0.06]">{step}</span>
                      {i < 8 && <ArrowRight size={12} className="text-[#333] hidden sm:block" />}
                    </span>
                  ))}
                </div>
                <p className="text-[15px] text-[#999] leading-relaxed"><strong className="text-white">Click-to-Messenger ads</strong> capture name and email from every respondent automatically while starting a conversation ManyChat can handle. A <strong className="text-white">Facebook Group</strong> (&quot;Seiko Mod Collectors&quot;) builds community that feeds organic discovery — group posts appear in members&apos; feeds without competing in the ad auction.</p>
              </Card>
            </FadeIn>

            {/* Ad Briefs */}
            <FadeIn>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-white mb-1">10 Ad Creative Briefs</h3>
                <p className="text-xs text-[#666] mb-6">Prioritized by production order. Red = produce first (just Owen&apos;s phone + workbench). Gray = retargeting (needs pixel data).</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {adBriefs.map((ad, i) => {
                    const pc = priorityColors[ad.priority]
                    return (
                      <div key={i} className="bg-[#141420] rounded-xl border border-white/[0.06] p-5 sm:p-6 hover:border-white/[0.1] transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider ${pc.bg} ${pc.text} ${pc.border} border`}>
                            {ad.priorityLabel.toUpperCase()}
                          </span>
                          <span className="text-xs text-[#444]">Ad {i + 1}</span>
                        </div>
                        <h4 className="text-white font-semibold text-base mb-2">{ad.name}</h4>
                        <p className="text-[#7c5cfc] text-sm italic mb-2">&quot;{ad.hook}&quot;</p>
                        <p className="text-[#999] text-sm leading-relaxed mb-4">{ad.body}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#555] bg-[#1a1a2e] px-2.5 py-1 rounded">{ad.format}</span>
                          <span className="text-xs text-[#7c5cfc] font-medium">{ad.cta} →</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <AlertBox type="warning" title="Technical Prerequisites (Before Spending $1 on Ads)">
                <div className="space-y-2 mt-2">
                  {[
                    "Install Meta Pixel + Conversions API on Shopify (43% of users run ad blockers — CAPI captures what pixels miss)",
                    "Install TikTok Pixel on Shopify",
                    "Install Google Tag on Shopify",
                    "Let pixels collect 1-2 weeks of data before launching retargeting",
                    "Build three retargeting tiers: Hot (0-7 day cart abandoners), Warm (7-30 day viewers), Cool (30-90 day visitors)",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Check size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </AlertBox>
            </FadeIn>
          </div>
        </section>


        {/* ═══ SECTION 8: SCALING OPERATIONS ═══ */}
        <section id="scaling" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Settings} label="Section 8" title="Scaling Operations" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="Batch Production Workflow">
                <p className="mb-4">An experienced builder completes a Seiko mod in 45-75 minutes. At 8/day serial, that&apos;s 8-10 hours. <strong className="text-white">Batch production cuts this to 7-8 hours</strong> by eliminating tool swapping and decision fatigue.</p>
                <div className="space-y-2 mb-4">
                  {[
                    { time: "1 hr", task: "Morning prep & staging", desc: "All 8 builds laid out" },
                    { time: "1.5 hr", task: "Movement & dial installation", desc: "Batch all 8" },
                    { time: "1.5-2 hr", task: "Hand setting", desc: "Most skilled step" },
                    { time: "1 hr", task: "Case assembly", desc: "Crystal, bezel — all 8" },
                    { time: "1 hr", task: "Final assembly", desc: "Stems, crowns, casebacks" },
                    { time: "1 hr", task: "QC, strap, photography", desc: "Final checks" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a2e]">
                      <Clock size={16} className="text-[#7c5cfc] flex-shrink-0" />
                      <span className="text-sm font-mono text-[#7c5cfc] w-16 flex-shrink-0">{item.time}</span>
                      <span className="text-[15px] text-white font-medium">{item.task}</span>
                      <span className="text-sm text-[#666] ml-auto hidden sm:block">{item.desc}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#888] leading-relaxed"><strong className="text-white">Key enabler: design standardization.</strong> 5 Signature designs (60% of volume), 5 rotating Seasonal designs (25%), and Bespoke custom orders (15%). Signature builds use identical case/crystal/bezel combos — only dials and hands vary.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Three-Tier Pricing Model">
                <p className="mb-4">Move from a flat $300-$500 range to three explicit tiers:</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <PricingCard
                    tier="Collection"
                    price="$350-$425"
                    volume="60% of volume"
                    features={[
                      "Highest batchability",
                      "Signature designs with curated options",
                      "Volume driver and entry point",
                      "Same-day or next-day build",
                    ]}
                  />
                  <PricingCard
                    tier="Premium"
                    price="$500-$700"
                    volume="25% of volume"
                    highlighted
                    features={[
                      "GMT builds, skeleton dials",
                      "Premium finishing",
                      "Exotic configurations",
                      "Higher margin, moderate customization",
                    ]}
                  />
                  <PricingCard
                    tier="Bespoke"
                    price="$750-$1,200"
                    volume="15% of volume"
                    features={[
                      "Fully custom one-of-one builds",
                      "Founder-built only",
                      "Waitlist model",
                      "Brand prestige play",
                    ]}
                  />
                </div>
                <p className="text-sm text-[#888] leading-relaxed"><strong className="text-white">Demand-driven pricing:</strong> 2-3 week waitlist justifies 15-20% price increase. 4+ weeks justifies 25-30%. Always maintain slightly more demand than capacity — that&apos;s where pricing power lives.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Hiring Timeline">
                <div className="space-y-4">
                  <div className="p-4 sm:p-5 rounded-lg border border-white/[0.06] bg-[#1a1a2e]/50">
                    <div className="text-sm font-semibold text-[#7c5cfc] mb-1.5">At $15K-$25K/month (3-4 watches/day)</div>
                    <p className="text-[15px] text-[#ccc] leading-relaxed">Hire <strong className="text-white">part-time assistant</strong> at $15-20/hr for packaging, shipping, customer service, and inventory logging.</p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-lg border border-white/[0.06] bg-[#1a1a2e]/50">
                    <div className="text-sm font-semibold text-[#7c5cfc] mb-1.5">At $25K-$40K/month (5-6 watches/day)</div>
                    <p className="text-[15px] text-[#ccc] leading-relaxed">Upgrade to <strong className="text-white">full-time assembly assistant</strong>. Train on standard builds — start with crystal pressing and bezel assembly. Owen retains hand installation and all QC. Budget 4-6 weeks and ~$500-$1,000 in practice parts.</p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-lg border border-[#7c5cfc]/20 bg-[#7c5cfc]/5">
                    <div className="text-sm font-semibold text-[#7c5cfc] mb-1.5">At Full Scale — $60K+/month (7-8 watches/day)</div>
                    <p className="text-[15px] text-[#ccc] mb-2">Three-person team:</p>
                    <Bullet><strong className="text-white">Owen:</strong> Premium/Bespoke builds, QC, product development</Bullet>
                    <Bullet><strong className="text-white">Assembly tech:</strong> 4-5 Signature watches/day independently</Bullet>
                    <Bullet><strong className="text-white">Part-time admin:</strong> Shipping, CS overflow, social media execution</Bullet>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Limited Drops & Waitlist Model" defaultOpen={false}>
                <p className="mb-3"><strong className="text-white">Helm Watches maintains a 27-month, 3,397-person waitlist</strong> for their $375 Miyako model with minimal marketing. The waitlist IS the marketing.</p>
                <p className="mb-3"><strong className="text-white">The playbook:</strong> Monthly drops of 10-15 themed watches (&quot;Arctic Diver,&quot; &quot;Midnight GMT&quot;) at premium pricing ($450-$600), announced 2 weeks in advance via email and SMS, with a signup form collecting demand signals.</p>
                <p className="text-sm text-[#888] leading-relaxed">At 12% waitlist-to-purchase conversion, a waitlist of 200 people yields 24 sales per drop. Numbered limited editions create collector value and secondary market premiums.</p>
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ SECTION 9: FINANCIAL MODEL ═══ */}
        <section id="financial" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Calculator} label="Section 9" title="Financial Model" /></FadeIn>
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-base text-[#888] mb-8 leading-relaxed">Drag the sliders to model different scenarios. Tap a preset to jump to a phase. All calculations update in real time.</p>
              <FinancialModel />
            </div>
          </FadeIn>
        </section>


        {/* ═══ SECTION 10: TECH STACK ═══ */}
        <section id="tech" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Cpu} label="Section 10" title="Tech Stack & Costs" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="Budget-Lite Stack (~$98/month + 1.95%/sale)">
                <DataTable
                  headers={["Tool", "Cost", "Purpose"]}
                  rows={[
                    ["Shopify Basic", "$39/mo", "E-commerce store"],
                    ["Kickflip", "$0 + 1.95%/sale", "Watch configurator"],
                    ["ManyChat Pro + AI", "~$44/mo", "DM/Messenger automation"],
                    ["Make.com Core", "$9/mo", "Workflow automation"],
                    ["Google Sheets", "$0", "CRM + order tracking"],
                    ["Klaviyo", "$0 (<500 contacts)", "Email/SMS marketing"],
                    ["Elfsight", "$0 (200 views)", "Facebook review widget"],
                    ["Buffer", "$6/mo", "Content scheduling"],
                    ["Canva Free", "$0", "Design"],
                    ["**TOTAL**", "**~$98/mo**", "**+ 1.95% per configurator sale**"],
                  ]}
                  accent
                />
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Full Automation Stack (~$195/month)">
                <DataTable
                  headers={["Tool", "Cost", "Purpose"]}
                  rows={[
                    ["Shopify Basic", "$39/mo", "E-commerce store"],
                    ["Kickflip", "$0 + 1.95%/sale", "Watch configurator"],
                    ["ManyChat Pro + AI", "~$44/mo", "DM/Messenger automation"],
                    ["Make.com Core", "$9/mo", "Workflow automation"],
                    ["Google Sheets", "$0", "CRM + order tracking"],
                    ["Klaviyo Email", "$20-$30/mo", "Email/SMS automation (500+ contacts)"],
                    ["Reputon", "~$15/mo", "Facebook reviews on Shopify"],
                    ["Canva Pro", "$13/mo", "Design + scheduling"],
                    ["Craftybase", "$49/mo", "Inventory/BOM management"],
                    ["**TOTAL**", "**~$189-$199/mo**", ""],
                  ]}
                />
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Future Additions (When Revenue Justifies)" defaultOpen={false}>
                <DataTable
                  headers={["Tool", "Cost", "When to Add"]}
                  rows={[
                    ["GoHighLevel", "$97/mo", "Replace Sheets CRM + add SMS at $25K+/mo revenue"],
                    ["Shopify Plan Upgrade", "$105/mo", "For advanced reporting at scale"],
                    ["Triple Whale / Northbeam", "$100+/mo", "Ad attribution at $5K+/mo ad spend"],
                    ["Claude API (custom agent)", "~$5-$10/mo", "Advanced AI quoting/CS agent"],
                  ]}
                />
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ SECTION 11: PHASED ROADMAP ═══ */}
        <section id="roadmap" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Map} label="Section 11" title="Phased Roadmap" /></FadeIn>
          <div className="max-w-3xl space-y-6">

            {[
              {
                phase: "1",
                months: "Months 1-2",
                title: "Foundation",
                investment: "~$2,000-$3,000",
                output: "4-6 watches/day, $25,000-$40,000/month",
                owenRole: "Build watches. Send Hamza raw photos/videos.",
                color: "#7c5cfc",
                actions: [
                  "Create Facebook Business Page, re-list all Marketplace items through it",
                  "Set up Shopify Basic ($39/mo) with Meta Pixel",
                  "Install Kickflip configurator — photograph all components",
                  "Set up ManyChat Pro + AI ($44/mo) for DM automation",
                  "Connect Make.com ($9/mo) to Google Sheets order tracker",
                  "Import all available customer emails into Klaviyo (free)",
                  "Build Welcome + Abandoned Cart email flows",
                  "Begin filming TikTok/Reels content daily",
                  "Implement batch production workflow",
                  "Design 5 Signature builds for standardized production",
                ],
              },
              {
                phase: "2",
                months: "Months 3-4",
                title: "First Hire + Ads Launch",
                investment: "~$2,000-$3,000/mo (ads + assistant + software)",
                output: "5-7 watches/day, $40,000-$60,000/month",
                owenRole: "Build watches, train assistant on basic tasks.",
                color: "#818cf8",
                actions: [
                  "Hire part-time assistant for packaging, shipping, CS overflow",
                  "Launch Meta ads at $1,500-$2,000/month (10-15 creative assets)",
                  "Begin TikTok Spark Ads on best-performing organic content",
                  "Launch first 10-piece limited drop at premium pricing",
                  "Write SOPs for all assembly steps",
                  "Place first volume parts order (100 movements, 50 cases)",
                  "Start training assistant on basic assembly tasks",
                ],
              },
              {
                phase: "3",
                months: "Months 5-8",
                title: "Scale",
                investment: "~$5,000-$8,000/mo (labor + ads + inventory)",
                output: "6-8 watches/day, $60,000-$90,000/month",
                owenRole: "Premium builds, QC, product vision.",
                color: "#a78bfa",
                actions: [
                  "Promote assistant to full-time or hire dedicated assembly tech",
                  "Set up second workstation with duplicate tools (~$600-$1,300)",
                  "Owen shifts to Premium/Bespoke builds + QC + product development",
                  "Launch curated mod kits on Shopify",
                  "Reach YouTube monetization threshold",
                  "Establish monthly limited drop cadence",
                  "Begin micro-influencer seeding (2-3 watches/month to reviewers)",
                  "Scale Meta ads to $3,000-$5,000/month as ROAS proves out",
                ],
              },
              {
                phase: "4",
                months: "Months 9-12",
                title: "Optimization",
                investment: "Revenue self-sustaining",
                output: "Sustained 7-8 watches/day, $80,000-$100,000/month",
                owenRole: "Creative director + master builder. Everything else is systemized.",
                color: "#4ade80",
                actions: [
                  "Negotiate direct supplier relationships for volume pricing",
                  "Launch Bespoke tier with online configurator",
                  "Invest in pressure tester ($200-$500) as quality differentiator",
                  "Explore co-branded limited editions with watch influencers",
                  "Evaluate custom dial production for proprietary designs",
                  "Consider wholesale/B2B channel to watch retailers",
                  "Explore expansion to other watch platforms (Casio \"Casioak\" mods)",
                ],
              },
            ].map((phase, i) => (
              <FadeIn key={i}>
                <div className="relative">
                  {/* Phase card */}
                  <div className="bg-[#141420] rounded-xl border border-white/[0.06] overflow-hidden">
                    {/* Header */}
                    <div className="p-5 sm:p-6 border-b border-white/[0.06]" style={{ borderLeftWidth: 4, borderLeftColor: phase.color }}>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-bold tracking-widest" style={{ color: phase.color }}>PHASE {phase.phase}</span>
                        <span className="text-sm text-[#555]">{phase.months}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm">
                        <div>
                          <span className="text-[#666]">Investment: </span>
                          <span className="text-white font-medium">{phase.investment}</span>
                        </div>
                        <div>
                          <span className="text-[#666]">Expected: </span>
                          <span className="font-medium" style={{ color: phase.color }}>{phase.output}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 sm:p-6">
                      <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        {phase.actions.map((action, j) => (
                          <div key={j} className="flex gap-2.5 text-sm text-[#999]">
                            <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: phase.color }} />
                            <span className="leading-relaxed">{action}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-lg bg-[#1a1a2e] text-sm">
                        <span className="text-[#666]">Owen&apos;s role: </span>
                        <span className="text-white font-medium">{phase.owenRole}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>


        {/* ═══ FOOTER ═══ */}
        <footer className="px-6 sm:px-10 lg:px-16 py-16 text-center">
          <div className="text-[10px] font-bold tracking-[3px] text-[#7c5cfc] mb-2">ZAPP STUDIOS</div>
          <div className="text-sm text-[#555] mb-1">Revenue Engineering</div>
          <div className="text-xs text-[#333] mb-6">zappstudios.us</div>
          <div className="text-xs text-[#333] max-w-md mx-auto leading-relaxed">
            This playbook is a living document. Updated as we execute and learn.
          </div>
          <button
            onClick={() => window.print()}
            className="mt-6 px-4 py-2 rounded-lg border border-white/[0.06] text-xs text-[#555] hover:text-white hover:border-white/[0.1] transition-colors cursor-pointer print:hidden"
          >
            Print / Save as PDF
          </button>
        </footer>

      </main>

      {/* Print styles injected via global stylesheet */}
    </div>
  )
}
