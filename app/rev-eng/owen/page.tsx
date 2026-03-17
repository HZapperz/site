"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap, Watch, Target, Code2, Calculator, TrendingUp, Map,
  Menu, X, AlertTriangle, Info, ChevronDown, ArrowRight, Check,
  Clock, DollarSign, ShoppingCart, Users, Megaphone, Package,
  Printer, Shield, BarChart3
} from "lucide-react"
import FinancialModel from "./components/FinancialModel"
import CustomerFunnel from "./components/CustomerFunnel"

/* ─── NAV SECTIONS ─── */
const navSections = [
  { id: "summary", title: "The New Strategy", icon: Zap },
  { id: "watches", title: "Watch Business", icon: Watch },
  { id: "archery", title: "Archery Business", icon: Target },
  { id: "platform", title: "What We're Building", icon: Code2 },
  { id: "financial", title: "Financial Model", icon: Calculator },
  { id: "growth", title: "Growth Playbook", icon: TrendingUp },
  { id: "operations", title: "Operations", icon: Package },
  { id: "roadmap", title: "Roadmap", icon: Map },
  { id: "risks", title: "Risks & Kill Switches", icon: Shield },
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

function DataTable({ headers, rows, accent = false }: { headers: string[]; rows: string[][]; accent?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/[0.06] -mx-1">
      <table className="w-full text-[15px] border-collapse min-w-[500px]">
        <thead>
          <tr className={accent ? "bg-[#7c5cfc]/10" : "bg-[#1a1a2e]"}>
            {headers.map((h, i) => (
              <th key={i} className="text-left py-3 px-4 text-xs tracking-wider uppercase text-[#7c5cfc] font-semibold border-b border-[#333] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[#1a1a2e] hover:bg-white/[0.02] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`py-3.5 px-4 ${ci === 0 ? "text-white font-medium" : "text-[#999]"}`}>{parseBold(cell)}</td>
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
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#7c5cfc]/20 flex items-center justify-center text-[#7c5cfc] text-sm font-bold">{n}</div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold text-base mb-1">{title}</div>
        <div className="text-[#999] text-[15px] leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function parseBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    return <span key={i}>{part}</span>
  })
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  )
}

function SourceTag({ source }: { source: string }) {
  return <sup className="text-[10px] text-[#7c5cfc]/60 ml-0.5">[{source}]</sup>
}

/* ─── MAIN PAGE ─── */

export default function OwenPlaybook() {
  const [activeSection, setActiveSection] = useState("summary")
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
          <div className="text-sm font-semibold text-white">[Owen&apos;s Brand]</div>
          <div className="text-[10px] text-[#555] mt-0.5">Revenue Engineering Playbook</div>
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
            <span className="text-sm font-semibold text-white ml-2">[Owen&apos;s Brand]</span>
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
                <span className="text-[10px] font-semibold tracking-widest text-[#7c5cfc]">REVENUE ENGINEERING PLAYBOOK — V2</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                [OWEN&apos;S BRAND]<br />
                <span className="text-[#7c5cfc]">&times;</span> ZAPP STUDIOS
              </h1>
              <p className="text-lg sm:text-xl text-[#888] leading-relaxed max-w-xl mb-6">
                Two businesses, one strategy. Custom watches for steady income, 3D-printed archery parts for explosive growth. Updated after our March 16 call.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[#555]">
                <span>Prepared by Hamza</span>
                <span className="text-[#333]">|</span>
                <span>zappstudios.us</span>
                <span className="text-[#333]">|</span>
                <span>March 2026</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap gap-3 mt-10">
              <MetricCard label="Watch Business" value="$7-10K" sub="monthly revenue" />
              <MetricCard label="Archery Business" value="$2.5-12K" sub="monthly revenue" color="text-[#4ade80]" />
              <MetricCard label="Goal" value="C8" sub="by end of 2026" color="text-[#7c5cfc]" />
            </motion.div>
          </div>
        </section>


        {/* ═══ THE NEW STRATEGY ═══ */}
        <section id="summary" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Zap} label="Section 1" title="The New Strategy" /></FadeIn>
          <div className="max-w-3xl space-y-4">
            <FadeIn>
              <Card title="What Changed">
                <p className="mb-3">After the March 16 call, we&apos;re pivoting from the original &quot;scale Seiko mods to 8/day&quot; plan. The reality:</p>
                <Bullet><strong className="text-white">Sourcing custom parts is a time bottleneck</strong> that doesn&apos;t scale well — Owen&apos;s expertise is the moat but also the ceiling.</Bullet>
                <Bullet><strong className="text-white">The brand needs to move away from &quot;Seiko&quot;</strong> in the name given the IP landscape.</Bullet>
                <Bullet><strong className="text-white">Owen has a second business opportunity</strong> — 3D-printed archery parts — with dramatically better margins and scalability.</Bullet>
                <p className="mt-3">The new strategy: <strong className="text-white">watches become stable base income, archery becomes the growth engine.</strong> Two separate brands, two separate sites, one unified revenue strategy.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Two Businesses, One Goal">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-5 rounded-xl bg-[#7c5cfc]/5 border border-[#7c5cfc]/10">
                    <Watch size={20} className="text-[#7c5cfc] mb-2" />
                    <div className="text-base font-bold text-white mb-1">Custom Watches</div>
                    <div className="text-sm text-[#999]">Established brand with 700+ sales and 50+ reviews. Simplified to stock watches ($299) + custom builds ($549+). <strong className="text-white">Steady, reliable income.</strong></div>
                  </div>
                  <div className="p-5 rounded-xl bg-[#4ade80]/5 border border-[#4ade80]/10">
                    <Target size={20} className="text-[#4ade80] mb-2" />
                    <div className="text-base font-bold text-white mb-1">3D-Printed Archery Parts</div>
                    <div className="text-sm text-[#999]">First real commercial player. Material cost &lt;$1, selling $30-$100. Owen designs, clicks print, ships. <strong className="text-white">The high-growth, high-margin play.</strong></div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="The C8 Math">
                <p className="mb-3">A C8 Corvette runs ~$68,000. Owen needs that in annual net profit. Here&apos;s what that looks like across both businesses:</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <MetricCard label="Watches" value="~$4,300" sub="monthly gross profit" />
                  <MetricCard label="Archery" value="~$4,900" sub="monthly gross profit" color="text-[#4ade80]" />
                  <MetricCard label="Combined" value="~$9,200" sub="minus ads & software" color="text-[#7c5cfc]" />
                </div>
                <div className="mt-4 p-4 rounded-lg bg-[#1a1a2e] text-sm text-[#999] leading-relaxed">
                  <div className="text-xs font-semibold text-[#7c5cfc] mb-2 tracking-widest">ASSUMPTIONS BEHIND THESE NUMBERS</div>
                  <div className="space-y-1.5">
                    <div className="flex gap-2"><span className="text-[#666]">Watches:</span> <span>15 stock at $299 + 10 custom at $549 = <strong className="text-white">$9,475/mo</strong> watch revenue</span></div>
                    <div className="flex gap-2"><span className="text-[#666]">Archery:</span> <span>100 parts at $55 avg = <strong className="text-white">$5,500/mo</strong> archery revenue (Month 6 target)</span></div>
                    <div className="flex gap-2"><span className="text-[#666]">Watch COGS:</span> <span>38% ($3,600) — movement, case, dial, hands, crystal, bezel, strap</span></div>
                    <div className="flex gap-2"><span className="text-[#666]">Archery COGS:</span> <span>~5% ($275) — material, electricity, packaging, ~5% failed print rate</span></div>
                    <div className="flex gap-2"><span className="text-[#666]">Expenses:</span> <span>$2,000 ads + $100 software = <strong className="text-white">$2,100/mo</strong></span></div>
                  </div>
                </div>
                <p className="mt-3">At combined projections, Owen clears <strong className="text-white">$90-110K/year</strong> before ad spend. Even conservatively after $2-3K/month in ads and software, the C8 is well within reach by end of 2026. These are Month 6 targets — the financial model below lets Owen stress-test every variable.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Deal Structure">
                <p>Same as before. Zapp Studios provides all revenue engineering — strategy, site development, ad management, automation — at <strong className="text-white">zero cost</strong>. Owen is the founding case study. Owen covers direct hard costs only: Claude API credits (~$5-10/mo for AI features), ad spend (when ready), and domain/hosting (minimal on Vercel).</p>
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ WATCH BUSINESS ═══ */}
        <section id="watches" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Watch} label="Section 2" title="The Watch Business" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="The Simplified Model">
                <p className="mb-4">Move from the old &quot;everything is $299 including custom&quot; to a clean two-tier system:</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-5 rounded-xl bg-[#141420] border border-white/[0.06]">
                    <div className="text-xl font-bold text-white mb-1">Stock Collection</div>
                    <div className="text-[#7c5cfc] font-semibold text-lg mb-1">$299</div>
                    <div className="text-xs text-[#666] mb-3">5-10 popular designs kept in inventory</div>
                    <div className="space-y-2">
                      {["Owen's best-selling designs", "Ships same/next day", "Ready-made — no wait", "Volume driver and entry point"].map((f, i) => (
                        <div key={i} className="flex gap-2 text-sm text-[#999]"><Check size={14} className="text-[#4ade80] flex-shrink-0 mt-0.5" /><span>{f}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 rounded-xl bg-[#7c5cfc]/10 border border-[#7c5cfc]/30">
                    <div className="text-[11px] font-semibold text-[#7c5cfc] tracking-widest mb-2">PREMIUM</div>
                    <div className="text-xl font-bold text-white mb-1">Custom Builds</div>
                    <div className="text-[#7c5cfc] font-semibold text-lg mb-1">$549+</div>
                    <div className="text-xs text-[#666] mb-3">Customer designs via configurator</div>
                    <div className="space-y-2">
                      {["~100 component options (dials, straps, bezels, etc.)", "Visual configurator on the site", "7-14 day build time", "Owen's craftsmanship + customer's vision"].map((f, i) => (
                        <div key={i} className="flex gap-2 text-sm text-[#999]"><Check size={14} className="text-[#4ade80] flex-shrink-0 mt-0.5" /><span>{f}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
                <AlertBox type="info" title="Why $549 for custom, not $299">
                  Owen&apos;s been undercharging. Custom builds require sourcing specific parts, design consultation, and Owen&apos;s personal expertise. With 700+ builds and 50+ five-star reviews, he has the brand authority to charge premium. The $250 gap between stock and custom is justified by the customization, wait time, and craftsmanship involved.
                </AlertBox>
                <AlertBox type="info" title="Pricing Validation — Before Launching at $549">
                  Before committing to the $549 custom price: (1) List 3 custom builds at $549 on Facebook Marketplace alongside the usual $299 stock listings. (2) If 2+ sell within 2 weeks, the price is confirmed — the market accepts it. (3) If 0 sell at $549, test stepping stones at $449 and $499. Owen&apos;s 700+ reviews provide the social proof to justify premium pricing — but let the market confirm it before building the whole site around that number.
                </AlertBox>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Where Owen Sits in the Market">
                <p className="mb-4">The global watch market hit <strong className="text-white">$66.4 billion in 2024</strong><SourceTag source="Grand View Research 2024" />, projected to reach $93.1B by 2030. Seiko Group sales climbed <strong className="text-white">11.7% to ~¥175.9B ($1.15B USD)</strong><SourceTag source="Seiko FY2024 IR" /> in FY2024-25. The modding subculture is massive: <strong className="text-white">185K+ Instagram posts tagged #SeikoMod and #SeikoMods</strong><SourceTag source="Inflact, 2026" />, <strong className="text-white">60K+ r/SeikoMods members</strong><SourceTag source="Valet. 2024 est." /> — and the market is stratified by quality tier. Owen&apos;s pricing has been leaving money on the table:</p>
                <DataTable
                  headers={["Competitor", "Price Range", "Volume Indicator", "Key Differentiator"]}
                  accent
                  rows={[
                    ["AliExpress budget sellers", "$75–$150", "High volume, high returns", "Clone movements, poor QC — the race to the bottom"],
                    ["**SKYRIM Wrist**", "$285–$375", "205 products, 700+ reviews", "Shopify store, step-by-step configurator, NH35 + sapphire crystal, free US shipping"],
                    ["**Owen (current)**", "**$299 flat**", "~20/mo via FB Marketplace", "**700+ builds, 50+ reviews — but underpriced and single-channel**"],
                    ["**WatchModCustom / Nomods**", "$350–$500", "Shopify + Instagram", "Configurator, proper e-commerce, multiple payment options"],
                    ["**Circa Watch Labs**", "$400–$600", "Shopify configurator", "Datejust/Nautilus styles, Swiss lume, custom logo upload"],
                    ["**Lucius Atelier / Premium tier**", "$400–$700+", "Parts supplier + builds", "Superior finishing, exotic configs, established brand"],
                    ["**Moddys Watches**", "$349–$420", "224K Instagram, 860 Trustpilot reviews", "Spain-based, online configurator, 2-year warranty, free worldwide shipping"],
                    ["**Owen (proposed)**", "**$299 stock / $549+ custom**", "20-30/mo target", "**Configurator, own site, 700-customer base, premium positioning**"],
                  ]}
                />
                <AlertBox type="info" title="Seiko IP Notice — October 2025">
                  Seiko issued a formal notice warning against &quot;MOD watches assembled with fake or unauthorized components.&quot; This did <strong className="text-white">not</strong> kill the market — it <strong className="text-white">accelerated</strong> the shift toward personally branded dials and microbrand identity. Quality operators who rebrand benefit; race-to-the-bottom sellers using counterfeit logos get squeezed. Owen&apos;s rebrand is proactive, not reactive.
                </AlertBox>
                <AlertBox type="success" title="The Gap Owen Exploits">
                  Owen has the <strong className="text-white">track record</strong> of a premium builder (700+ builds, 50+ five-star reviews) but the <strong className="text-white">pricing</strong> of a mid-range seller. The rebrand + custom site + tiered pricing moves him into the $400-$600 bracket where his reputation already belongs — without needing to change his product quality at all.
                </AlertBox>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Research Artifacts" defaultOpen={false}>
                <p className="mb-4 text-sm text-[#888]">Sourced reference data supporting the competitive analysis above. All data verified March 2026.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "SKYRIM Wrist — 205 Products, $285-$375", desc: "skyrimwrist.com — Shopify store, step-by-step configurator, 700+ reviews at 4.78/5" },
                    { label: "Circa Watch Labs — 12 Configurator Tools", desc: "circawatchlabs.com — 215 products, $250-$365, 69 Trustpilot reviews" },
                    { label: "Moddys Watches — 224K Instagram Followers", desc: "moddys-watches.com — 860 Trustpilot reviews, $349-$420, largest social following in the space" },
                    { label: "Lucius Atelier — 4,341 Reviews at 4.9/5", desc: "luciusatelier.com — Parts ecosystem, ISO 9001 certified, Swiss Super-LumiNova licensed" },
                  ].map((item, i) => (
                    <div key={i} className="aspect-video rounded-lg border-2 border-dashed border-white/[0.08] bg-[#0d0d18] flex flex-col items-center justify-center p-4 text-center">
                      <div className="text-xs font-semibold text-[#7c5cfc] mb-1">{item.label}</div>
                      <div className="text-[10px] text-[#555]">{item.desc}</div>
                      <div className="text-[10px] text-[#7c5cfc] mt-2">Verified March 2026</div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Rebrand: Moving Away from &quot;Seiko&quot;">
                <p className="mb-3">The brand name needs to drop &quot;Seiko&quot; — both for IP safety and to position as a premium microbrand rather than a modifier of someone else&apos;s product.</p>
                <Bullet><strong className="text-white">Product language:</strong> &quot;Powered by Seiko NH35 movement&quot; — this is accurate, legal, and actually sounds more premium than &quot;Seiko mod.&quot;</Bullet>
                <Bullet><strong className="text-white">Brand positioning:</strong> A custom watch studio, not a modification shop. Owen makes watches — he just happens to use Seiko movements because they&apos;re the best at this price point.</Bullet>
                <Bullet><strong className="text-white">Name TBD:</strong> We&apos;ll work with Owen on this. The site will use [Owen&apos;s Brand] as placeholder throughout.</Bullet>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="The Watch Configurator">
                <p className="mb-3">The centerpiece of the custom tier. Owen has ~100 component options across his manufacturers. Customers pick their combination, see a preview, and submit the order.</p>
                <NumberedStep n={1} title="MVP: Option Selectors + Reference Photos">Dropdown/swatch selectors for each component (case, dial, hands, bezel, crystal, strap) with high-quality reference photos. Price updates dynamically. Fast to build, accurate.</NumberedStep>
                <NumberedStep n={2} title="V2: Layered Image Compositing">2D image-swap where each component is a transparent PNG layer. Customer sees a composite preview update in real time as they select options. This is how Undone Watches and Circa Watch Labs do it.</NumberedStep>
                <NumberedStep n={3} title="Possible V3: AI-Generated Previews">Use image generation to create lifestyle previews of the configured watch — wrist shots, different lighting. Experimental but could be a differentiator. Not needed for launch.</NumberedStep>
                <p className="text-sm text-[#888] mt-2">For launch, V1 is more than enough. Owen&apos;s existing customers buy based on trust and portfolio — the configurator just makes the process easier and captures the order automatically instead of going through DMs.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Current State">
                <div className="flex flex-wrap gap-3 mb-3">
                  <MetricCard label="Volume" value="~20/mo" sub="watches sold" />
                  <MetricCard label="Price" value="$299" sub="even for custom (too low)" />
                  <MetricCard label="Channel" value="FB Only" sub="Marketplace DMs" />
                </div>
                <p className="mb-4">700+ lifetime sales, 50+ Facebook reviews, 3 years of established reputation. The foundation is solid — <strong className="text-white">the problem is pricing, channel, and process, not product quality.</strong></p>
                <div className="text-xs font-semibold text-[#f87171] mb-3 tracking-widest">DIAGNOSIS: THREE FIXABLE PROBLEMS</div>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[#1a1a2e] border-l-4 border-l-[#f87171]">
                    <div className="text-white font-semibold text-sm mb-1">1. Flat pricing = leaving $250/watch on the table</div>
                    <div className="text-[#999] text-sm">Custom builds requiring part sourcing, design consultation, and 3+ hours of work sell for the same $299 as pre-built stock. At 5 custom builds/month, that&apos;s <strong className="text-white">$1,250/month in lost revenue</strong> just from underpricing.</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1a1a2e] border-l-4 border-l-[#f87171]">
                    <div className="text-white font-semibold text-sm mb-1">2. Single-channel dependency on Facebook Marketplace</div>
                    <div className="text-[#999] text-sm">100% of sales come through FB Marketplace DMs. No website, no email list, no owned channel. If Facebook changes Marketplace rules or Owen&apos;s account gets flagged, revenue goes to zero overnight.</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1a1a2e] border-l-4 border-l-[#f87171]">
                    <div className="text-white font-semibold text-sm mb-1">3. Manual everything = Owen is the bottleneck</div>
                    <div className="text-[#999] text-sm">Every inquiry, quote, order, and follow-up runs through Owen&apos;s personal messages. He tracks orders in Excel (and admits he forgets to update it). No automation, no CRM, no automated review collection. Owen spends ~15-20 hours/month on admin that software can handle.</div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ ARCHERY BUSINESS ═══ */}
        <section id="archery" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Target} label="Section 3" title="The Archery Opportunity" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="Why This Is the Real Play">
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  <div className="p-4 rounded-xl bg-[#4ade80]/5 border border-[#4ade80]/10 text-center">
                    <div className="text-2xl font-bold text-[#4ade80]">&lt;$1</div>
                    <div className="text-xs text-[#666] mt-1">material cost per part</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#4ade80]/5 border border-[#4ade80]/10 text-center">
                    <div className="text-2xl font-bold text-[#4ade80]">$30-100</div>
                    <div className="text-xs text-[#666] mt-1">selling price per part</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#4ade80]/5 border border-[#4ade80]/10 text-center">
                    <div className="text-2xl font-bold text-[#4ade80]">97-99%</div>
                    <div className="text-xs text-[#666] mt-1">gross margin</div>
                  </div>
                </div>
                <p className="mb-3">Compare that to watches at 60-65% margins with expensive parts and manual assembly. Archery parts are: <strong className="text-white">design once, print infinitely, ship easily.</strong></p>
                <div className="text-xs font-semibold text-[#4ade80] mb-3 mt-4 tracking-widest">MARKET SIZING</div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <MetricCard label="TAM" value="$607.6M" sub="US archery equipment market (2024)" color="text-[#4ade80]" />
                  <MetricCard label="SAM" value="~$150-500M" sub="aftermarket accessories (est.)" color="text-[#4ade80]" />
                  <MetricCard label="SOM" value="$21K+ proven" sub="Etsy sales of 3D-printed archery parts alone" color="text-[#4ade80]" />
                  <MetricCard label="Owen Y1" value="$60-150K" sub="target revenue" color="text-white" />
                </div>
                <p className="text-sm text-[#888] mb-4">Owen needs to capture less than 0.01% of the total archery equipment market — or roughly 1% of the 3D-printable accessories niche — to hit his Year 1 target. The market is large enough that this business can scale well beyond the C8 goal.</p>
                <Bullet><strong className="text-white">Market positioning:</strong> 5+ small commercial sellers exist (Genesis 3D Printing, BowBuddyOfficial, Berry Tech Products) but none use engineering-grade materials like carbon fiber PETG or NylonX. Top Etsy sellers use PLA or basic ASA. Owen&apos;s material capability is the differentiator, not being first.</Bullet>
                <Bullet><strong className="text-white">Scalability:</strong> No sourcing bottleneck. No manual assembly expertise required per unit. Owen designs the parts, the printer makes them. Adding a second printer doubles capacity.</Bullet>
                <Bullet><strong className="text-white">Material capability:</strong> Owen can print carbon fiber and engineering-grade materials — this isn&apos;t PLA hobby printing.</Bullet>
                <Bullet><strong className="text-white">Built-in network:</strong> Owen&apos;s dad has connections in the archery community. That&apos;s the seed audience.</Bullet>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Demand Validation — The Market Exists, Now Validate Owen's Products">
                <p className="mb-4">The market for 3D-printed archery parts is proven — 21,000+ Etsy sales, 5+ commercial sellers, and specific ArcheryTalk threads requesting exactly these products. The question isn&apos;t whether people buy 3D-printed archery parts. It&apos;s whether they&apos;ll buy <strong className="text-white">Owen&apos;s specific products at his price points with his materials.</strong> Here&apos;s the evidence and the plan to validate his positioning.</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <MetricCard label="r/archery" value="180K+" sub="members" color="text-[#4ade80]" />
                  <MetricCard label="ArcheryTalk" value="1M+" sub="registered users — largest archery forum" color="text-[#4ade80]" />
                  <MetricCard label="Aftermarket Accessories" value="$2.1B" sub="US archery equipment market (2024)" color="text-[#4ade80]" />
                </div>

                <DataTable
                  headers={["Signal", "Source", "What It Tells Us"]}
                  rows={[
                    ["\"Anyone know where to get custom arrow rests?\"", "ArcheryTalk — 10+ specific threads", "Explicit demand for model-specific parts (Mathews limb legs, Axcel sight accessories, custom grips)"],
                    ["Top archery accessories on Amazon", "Amazon Best Sellers + Reviews", "Arrow rests $30-$80, stabilizers $40-$100. 15+ negative reviews cite breakage, poor fit, cheap plastic — problems 3D printing solves"],
                    ["7+ Etsy sellers, 21,000+ combined sales", "Etsy search (verified)", "BowBuddyOfficial: 3,176 sales. kingscreationsusa: 18,300 sales, 4,700 reviews. Market is active and growing."],
                    ["3D printing subreddits + archery crossover", "r/functionalprint, r/archery", "DIY archers printing their own parts — proves concept, not commercial quality"],
                    ["5+ commercial operations active", "Genesis 3D Printing, E3D Concepts, Morr Innovations, Archery Print, + Etsy sellers", "Proven business model — but no brand uses engineering-grade materials (carbon fiber, NylonX). Quality gap is Owen's opening."],
                  ]}
                />

                <div className="text-xs font-semibold text-[#4ade80] mb-3 mt-6 tracking-widest">VALIDATION SPRINT — BEFORE BUILDING THE SITE</div>
                <NumberedStep n={1} title="Community Posts (Day 1-3)">Owen posts prototype photos in 3 archery communities (ArcheryTalk, r/archery, one Facebook Group). Frame as &quot;I&apos;m designing these in carbon fiber — would you use one?&quot; Measure: comments, DMs, and &quot;where can I buy?&quot; signals. <strong className="text-white">Target: 20+ positive reactions.</strong></NumberedStep>
                <NumberedStep n={2} title="$50 Test Ad (Day 4-7)">Run a $50 Meta ad to archery interests showing a 15-second print time-lapse + finished part. Link to a simple landing page with an email signup (&quot;Get notified when we launch&quot;). <strong className="text-white">Target: 50+ email signups at &lt;$1 each.</strong></NumberedStep>
                <NumberedStep n={3} title="Interest Form (Day 1-7)">Google Form linked from all posts and the ad: &quot;What archery parts would you buy? What do you pay now? What material matters?&quot; <strong className="text-white">Target: 30+ responses to validate SKU priorities.</strong></NumberedStep>
                <NumberedStep n={4} title="Free Samples (Day 8-14)">Ship 10 free parts to community members who expressed interest. Ask for honest feedback, photos in use, and permission to use their review. <strong className="text-white">Target: 5+ usable testimonials before launch.</strong></NumberedStep>

                <AlertBox type="success" title="Proceed Criteria">
                  If the validation sprint produces <strong className="text-white">50+ email signups AND 5+ positive field reviews</strong> in 2 weeks, demand is confirmed — build the site. If not, adjust the product catalog based on survey feedback before investing in a full e-commerce build. The sprint costs $50 in ads + ~$30 in free samples. Cheapest market research Owen will ever do.
                </AlertBox>

                <div className="mt-5 bg-[#0d0d18] rounded-xl border border-[#4ade80]/20 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse" />
                    <span className="text-xs font-semibold text-[#facc15] tracking-widest">VALIDATION RESULTS — SPRINT IN PROGRESS</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-[#666] uppercase tracking-wider mb-1">Community Post Reactions</div>
                      <div className="text-lg font-semibold text-[#555]">--</div>
                      <div className="text-[10px] text-[#444]">Target: 20+ positive reactions</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#666] uppercase tracking-wider mb-1">Ad Email Signups</div>
                      <div className="text-lg font-semibold text-[#555]">--</div>
                      <div className="text-[10px] text-[#444]">Target: 50+ at &lt;$1 each</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#666] uppercase tracking-wider mb-1">Survey Responses</div>
                      <div className="text-lg font-semibold text-[#555]">--</div>
                      <div className="text-[10px] text-[#444]">Target: 30+ responses</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#666] uppercase tracking-wider mb-1">Field Reviews (Free Samples)</div>
                      <div className="text-lg font-semibold text-[#555]">--</div>
                      <div className="text-[10px] text-[#444]">Target: 5+ usable testimonials</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.04] text-xs text-[#555]">
                    Results will be filled in as the validation sprint runs. The structure above maps 1:1 to the sprint steps. Once complete, we update this with real numbers and make the go/no-go call.
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Research Artifacts" defaultOpen={false}>
                <p className="mb-4 text-sm text-[#888]">Sourced reference data supporting the competitive analysis above. All data verified March 2026.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "ArcheryTalk — 10+ Demand Threads (URLs Verified)", desc: "Limb legs, sight accessories, custom grips — explicit 'I would pay for this' quotes across 2022-2025" },
                    { label: "Etsy — 7+ Sellers, 21,000+ Combined Sales", desc: "BowBuddyOfficial (3,176 sales), kingscreationsusa (18,300 sales, 4,700 reviews), TrustyArrowLLC (5.0★)" },
                    { label: "Amazon — 15 Negative Reviews Citing Breakage & Poor Fit", desc: "Arrow rests snapping on first shot, quivers shattering in cold, 'universal' parts fitting no actual bow" },
                    { label: "Printables.com — 2,200 Downloads for Mathews Limb Legs", desc: "600+ archery models across maker platforms. Top downloads: limb legs, fletching jigs, arrow holders" },
                  ].map((item, i) => (
                    <div key={i} className="aspect-video rounded-lg border-2 border-dashed border-white/[0.08] bg-[#0d0d18] flex flex-col items-center justify-center p-4 text-center">
                      <div className="text-xs font-semibold text-[#4ade80] mb-1">{item.label}</div>
                      <div className="text-[10px] text-[#555]">{item.desc}</div>
                      <div className="text-[10px] text-[#7c5cfc] mt-2">Verified March 2026</div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="The Business Model">
                <p className="mb-4">Simple product catalog site. No configurator needed — just list the parts, take orders, print and ship.</p>
                <NumberedStep n={1} title="Product Catalog">Clean e-commerce site with product photos, specs, pricing. Categories by part type. Search and filter.</NumberedStep>
                <NumberedStep n={2} title="Order Flow">Customer browses → adds to cart → Stripe checkout → order hits the admin portal → Owen prints → ships. The whole pipeline is automated except the printing.</NumberedStep>
                <NumberedStep n={3} title="Expansion">As Owen identifies what sells, he designs new parts. Each new SKU costs him design time only — no inventory risk, no parts to source. Print on demand.</NumberedStep>
                <p className="text-sm text-[#888] mt-2">This is the opposite of the watch business. Watches require Owen&apos;s hands for every unit. Archery parts require Owen&apos;s brain for the design, then the printer does the rest.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Realistic Unit Economics">
                <p className="mb-4">The headline margins are real, but let&apos;s be honest about <em>fully loaded</em> costs — not just material:</p>
                <DataTable
                  headers={["Cost Component", "Per Unit", "Notes"]}
                  rows={[
                    ["Filament (material)", "$0.30–$1.00", "Carbon fiber/PETG per part depending on size"],
                    ["Electricity", "~$0.30/hr", "Printers draw 200-400W; a complex part may print 2-4 hours"],
                    ["Failed print rate (~5%)", "$0.10–$0.50", "Amortized across successful prints"],
                    ["Packaging + labels", "$1.50–$2.00", "Poly mailer, padding, branded sticker"],
                    ["Printer wear/maintenance", "$0.20–$0.50", "Nozzles, belts, bed surfaces amortized over ~2,000 prints"],
                    ["**Fully loaded COGS**", "**$2.50–$4.50**", "**Per part — still <10% of sell price**"],
                  ]}
                />
                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-[#4ade80]/5 border border-[#4ade80]/10 text-center">
                    <div className="text-2xl font-bold text-[#4ade80]">90-95%</div>
                    <div className="text-xs text-[#666] mt-1">realistic gross margin</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#4ade80]/5 border border-[#4ade80]/10 text-center">
                    <div className="text-2xl font-bold text-[#4ade80]">$20</div>
                    <div className="text-xs text-[#666] mt-1">max profitable CAC at $50 ASP</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#4ade80]/5 border border-[#4ade80]/10 text-center">
                    <div className="text-2xl font-bold text-[#4ade80]">6-12/day</div>
                    <div className="text-xs text-[#666] mt-1">capacity per printer (varies by part size)</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#888]"><strong className="text-white">Shipping:</strong> Passed to customer ($4-8 USPS First Class for small parts, $8-15 Priority for larger). Not included in COGS. Owen should offer free shipping over $75 to increase AOV.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Competitive Landscape">
                <p className="mb-4">The US archery equipment market is valued at ~$607.6M<SourceTag source="Grand View Research 2024" />, with aftermarket accessories a meaningful subset. The 3D-printing angle is no longer early — here&apos;s what exists:</p>
                <DataTable
                  headers={["Competitor Type", "Examples", "Price Range", "Owen's Advantage"]}
                  rows={[
                    ["Traditional manufacturers", "Trophy Ridge, QAD, Spot-Hogg", "$30–$200+", "Injection-molded plastic/metal — can't do one-off custom designs"],
                    ["Amazon generic sellers", "No-name brands, 50-500 reviews", "$15–$60", "Mass-produced, no customization, slow iteration"],
                    ["Etsy/hobby 3D printers", "7+ active sellers, 21,000+ combined sales", "$10–$93", "Mostly PLA/ASA, some PETG. No carbon fiber. BowBuddyOfficial (3,176 sales) and kingscreationsusa (18,300 sales) lead. Owen differentiates on material quality."],
                    ["DIY/Thingiverse", "Free STL files", "$0 (own printer)", "Requires buyer to own a printer + know how to print"],
                    ["**Owen (proposed)**", "**First commercial operation**", "**$30–$100**", "**Carbon fiber + engineering-grade materials, designed by an archer, professional finish**"],
                  ]}
                />
                <AlertBox type="info" title="First Mover Isn't Enough — Speed Matters">
                  The 3D-printed archery parts space is already active — 5+ sellers, 21,000+ Etsy sales. Owen&apos;s window isn&apos;t being first, it&apos;s being best: engineering-grade materials, professional brand, and a real e-commerce site vs. Etsy listings.
                  <br /><br />
                  Owen&apos;s advantage: carbon fiber and NylonX materials that existing sellers don&apos;t use, a branded site (not just Etsy), and a systematic content + ads strategy. The existing sellers prove the market — Owen needs to prove the premium positioning.
                </AlertBox>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="First 10 SKUs — The Launch Catalog">
                <p className="mb-4">Start focused. These are the highest-demand archery accessories where 3D printing has a clear advantage over traditional manufacturing:</p>
                <DataTable
                  headers={["SKU", "Product", "Est. Price", "Print Time", "Priority"]}
                  rows={[
                    ["SKU-001", "Mathews limb legs / bow stand", "$24–$35", "~1.5 hrs", "**Launch — #1 selling 3D-printed archery product on Etsy (4,700+ reviews)**"],
                    ["SKU-002", "Hoyt limb legs / bow stand", "$24–$35", "~1.5 hrs", "**Launch — Mathews offers stock legs, Hoyt doesn\u2019t = massive gap**"],
                    ["SKU-003", "Headrest bow hanger (vehicle mount)", "$16–$24", "~2 hrs", "**Launch — BowBuddyOfficial sold 6,500+ units of this exact product**"],
                    ["SKU-004", "Scope housing / aiming ring (target archery)", "$33–$55", "~1 hr", "**Launch — Berry Tech Products proven niche on eBay**"],
                    ["SKU-005", "Stabilizer holster / release holder", "$16–$25", "~1 hr", "Launch — 3DHuntingSolutions has 271 reviews in this category"],
                    ["SKU-006", "Bow wall mount (multi-color options)", "$23–$31", "~2 hrs", "Launch — kingscreationsusa bestseller, 20+ color options"],
                    ["SKU-007", "Single-arrow quiver (target/3D shoots)", "$15–$25", "~45 min", "Month 2 — TrustyArrowLLC has 387 sales, 5.0\u2605 rating"],
                    ["SKU-008", "Peep sight housing (custom sizes)", "$11–$20", "~30 min", "Month 2 — Specialty Archery charges $11-$38 for injection-molded versions"],
                    ["SKU-009", "Cable slide / string stop bracket", "$10–$15", "~30 min", "Month 2 — small, fast to print, high-margin accessory"],
                    ["SKU-010", "Custom bow grip (per-model fit)", "$35–$60", "~3 hrs", "Month 3 — requires bow-specific measurements, premium pricing justified"],
                  ]}
                />
                <p className="mt-3 text-sm text-[#888]">SKUs 1-6 should be live at launch. Every product here has proven demand — existing sellers have validated the category with thousands of sales. Owen&apos;s edge: carbon fiber PETG and NylonX materials where competitors use PLA/ASA, model-specific fits, and a branded site vs. Etsy listings. Photograph each part on the actual bow model it fits.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Go-to-Market">
                <Bullet><strong className="text-white">Seed audience:</strong> Owen&apos;s dad&apos;s archery network. Word of mouth from people who&apos;ve seen the prototype. Target: 10-20 initial orders from warm contacts.</Bullet>
                <Bullet><strong className="text-white">Online communities:</strong> Reddit archery subs (r/archery 180K+, r/bowhunting), ArcheryTalk forums (largest archery forum), archery Facebook BST groups (Traditional Archery Society 80K+ members, Archery Equipment Buy Sale And Trade 30K+ members). Note: Facebook Marketplace auto-removes archery listings — use groups and direct site links instead. <strong className="text-white">Share the product, get honest feedback, iterate.</strong> Do NOT sell — contribute first, link to site in profile.</Bullet>
                <Bullet><strong className="text-white">Content:</strong> Short-form video of the printing process (satisfying time-lapses), side-by-side performance tests vs. traditional parts, durability demos (drop tests, flex tests). Archery YouTube is underserved and has a dedicated audience.</Bullet>
                <Bullet><strong className="text-white">Paid ads:</strong> Once 10-20 organic sales confirm demand, launch Meta ads at $500-$1,000/month targeting archery interests.</Bullet>
                <Bullet><strong className="text-white">Etsy as a launch channel:</strong> List on Etsy alongside the custom site. The top 3D-printed archery seller on Etsy has 18,300 sales. Use Etsy for discovery, the branded site for retention and repeat purchases. Etsy fees are ~6.5% + $0.20/listing — worth it for the built-in traffic.</Bullet>
                <Bullet><strong className="text-white">Pro shop pathway:</strong> Lancaster Archery Supply — the largest US online archery retailer (82K+ products) — already carries 3D-printed accessories from SRP 3D Customs, RamRods Archery, and Gillo. The ATA Show (January, annually) is where Lancaster discovers new brands. Target: have a proven catalog and social presence before ATA Show 2027.</Bullet>
                <p className="mt-3"><strong className="text-white">Break-even CAC at $50 ASP with 90% margin = $45.</strong> That means Owen can spend up to $45 to acquire a customer and still profit. In practice, aim for $8-$15 CAC — at those numbers, $500/month in ads should generate 33-62 new customers.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <AlertBox type="warning" title="Safety & Liability — Take This Seriously">
                Archery equipment can cause serious injury if it fails. Owen must: (1) print with appropriate engineering-grade materials (no PLA for load-bearing parts), (2) test every design under stress beyond normal use conditions, (3) include clear disclaimers on the site and in packaging (&quot;Use at your own risk, inspect before each use&quot;), (4) consider product liability insurance ($2,500-$8,000/year through a specialty sporting goods broker like Veracity Insurance Solutions), and (5) never make performance claims he hasn&apos;t personally verified. This isn&apos;t optional — one failure and the brand is dead.
              </AlertBox>
            </FadeIn>

            <FadeIn>
              <AlertBox type="info" title="Brand Name Needed">
                The archery business needs its own brand identity — name, domain, and visual style. This is separate from the watch brand. We&apos;ll brainstorm with Owen. Should feel technical, precision-oriented, and premium — not hobby-grade.
              </AlertBox>
            </FadeIn>
          </div>
        </section>


        {/* ═══ WHAT WE'RE BUILDING ═══ */}
        <section id="platform" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Code2} label="Section 4" title="What We&apos;re Building" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="Why Custom Sites, Not Shopify">
                <p className="mb-4">Owen mentioned Shopify. Here&apos;s the honest comparison:</p>
                <DataTable
                  headers={["", "Shopify", "Custom (Next.js + Supabase)"]}
                  accent
                  rows={[
                    ["Monthly platform fee", "$39/mo", "$0"],
                    ["Payment processing", "2.9% + $0.30 (Shopify Payments)", "2.9% + $0.30 (Stripe) — same rate"],
                    ["Third-party payment fee", "+2% if not using Shopify Payments", "$0 — use any processor"],
                    ["Watch configurator", "$30-$105/mo plugin", "**Built-in, custom to Owen's needs**"],
                    ["Email marketing", "$20-$45/mo plugin", "**Built-in or free tier tools**"],
                    ["Admin dashboard", "Limited to Shopify admin", "**Custom portal — orders, inventory, analytics**"],
                    ["A/B testing", "$50+/mo plugin", "**Built-in**"],
                    ["Session recording", "$30+/mo plugin", "**Built-in (rrweb)**"],
                    ["Custom features", "Limited by plugin ecosystem", "**Anything Owen wants**"],
                    ["Can Owen modify it?", "Liquid templates (limited)", "**Yes — Claude Code can adjust anything**"],
                    ["Vendor lock-in", "Yes — migrating off Shopify is painful", "**No — Owen owns everything**"],
                    ["Est. monthly cost", "$120-$300/mo in plugins alone", "**~$0-$20/mo (Vercel free tier + Supabase free tier)**"],
                  ]}
                />
                <p className="mt-4 text-sm text-[#888]"><strong className="text-white">Bottom line:</strong> Shopify&apos;s value is &quot;easy setup without a developer.&quot; Owen has a developer building for free. Custom wins on cost, flexibility, and long-term ownership.</p>
                <AlertBox type="warning" title="Tradeoff: Custom Requires Developer Access">
                  The custom approach requires ongoing developer access for changes beyond basic content updates. If Zapp Studios&apos; engagement ends, Owen would need a developer for modifications (~$50-100/hr). Shopify&apos;s advantage is self-serve editing. <strong className="text-white">Mitigation:</strong> Owen owns all code, domains, and accounts. The sites run on Vercel/Supabase free tiers independently. For basic modifications, Owen can use Claude Code directly — it can read, understand, and modify the codebase without a human developer.
                </AlertBox>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="The Tech Stack (Both Sites)">
                <DataTable
                  headers={["Layer", "Technology", "Cost"]}
                  rows={[
                    ["Frontend", "Next.js 14 (React)", "$0"],
                    ["Database + Auth", "Supabase (Postgres + Auth)", "$0 (free tier)"],
                    ["Payments", "Stripe", "2.9% + $0.30 per tx"],
                    ["Hosting", "Vercel", "$0 (free tier)"],
                    ["Session Recording", "rrweb", "$0 (open source)"],
                    ["Email", "Resend", "$0 (100 emails/day free)"],
                    ["Analytics", "Built-in + Vercel Analytics", "$0"],
                    ["AI Features (optional)", "Claude API", "~$5-10/mo"],
                    ["**Total infrastructure**", "", "**~$0-$20/mo + Stripe fees**"],
                  ]}
                />
                <p className="mt-3 text-sm text-[#888]">This is the same stack powering Royal Pawz (another Zapp Studios project) — a full-featured platform with admin portal, A/B testing, session recording, order management, and Stripe integration. Proven architecture.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="What Each Site Includes">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-[#141420] border border-white/[0.06]">
                    <Watch size={18} className="text-[#7c5cfc] mb-2" />
                    <div className="text-base font-bold text-white mb-3">Watch Site</div>
                    <div className="space-y-2.5">
                      {[
                        "Product catalog (stock collection)",
                        "Watch configurator (custom builds)",
                        "Customer accounts + order history",
                        "Stripe checkout",
                        "Admin portal: orders, inventory, build tracking",
                        "Facebook Messenger integration",
                        "Review/testimonial display",
                        "A/B testing + session recording",
                      ].map((f, i) => (
                        <div key={i} className="flex gap-2 text-sm text-[#999]"><Check size={14} className="text-[#7c5cfc] flex-shrink-0 mt-0.5" /><span>{f}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 rounded-xl bg-[#141420] border border-white/[0.06]">
                    <Target size={18} className="text-[#4ade80] mb-2" />
                    <div className="text-base font-bold text-white mb-3">Archery Site</div>
                    <div className="space-y-2.5">
                      {[
                        "Product catalog with categories",
                        "Search + filter by part type",
                        "Cart + Stripe checkout",
                        "Customer accounts",
                        "Admin portal: orders, fulfillment tracking",
                        "Product reviews",
                        "A/B testing + session recording",
                        "Simpler build — can be live in days",
                      ].map((f, i) => (
                        <div key={i} className="flex gap-2 text-sm text-[#999]"><Check size={14} className="text-[#4ade80] flex-shrink-0 mt-0.5" /><span>{f}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Replacing the Excel Spreadsheet">
                <p className="mb-3">Owen currently tracks orders manually in Excel and admits he forgets to update it half the time. The admin portal fixes this:</p>
                <Bullet><strong className="text-white">Automatic order logging:</strong> Every Stripe payment creates an order record. No manual entry.</Bullet>
                <Bullet><strong className="text-white">Status tracking:</strong> Owen updates build status (Queued → In Progress → QC → Shipped) from his phone. Customer gets notified automatically.</Bullet>
                <Bullet><strong className="text-white">Customer history:</strong> Every customer has a profile with order history, saved builds, and contact info. No more lost data.</Bullet>
                <Bullet><strong className="text-white">Revenue dashboard:</strong> Real-time view of monthly revenue, orders, and inventory across both businesses.</Bullet>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Facebook Messenger Integration">
                <p className="mb-3">Owen&apos;s existing customers find him on Facebook Marketplace. We don&apos;t want to kill that channel — we want to funnel it into the new system.</p>

                <AlertBox type="warning" title="Critical Limitation: ManyChat Can't Automate Personal Marketplace Messages">
                  ManyChat (and every competitor — Chatfuel, Tidio, Respond.io) <strong className="text-white">cannot automate messages on personal Facebook profiles</strong>. Meta&apos;s Messenger API only grants automation access to Business Page conversations. This is confirmed by ManyChat&apos;s own team. The workaround is structural:
                </AlertBox>

                <NumberedStep n={1} title="List through a Business Page, not personal profile">Marketplace listings created through a connected Facebook Business Page route inquiries through the Page&apos;s Messenger inbox — which ManyChat <em>can</em> automate. This is the single most important operational change.</NumberedStep>
                <NumberedStep n={2} title="Auto-qualify and route to site">ManyChat responds in &lt;60 seconds, asks 2-3 qualifying questions (style, budget, timeline), captures email/phone, then sends a direct link to the relevant product page. The critical moment: <strong className="text-white">capture email before sending the link</strong> — &quot;I&apos;ll send you detailed specs and build photos — what&apos;s the best email?&quot;</NumberedStep>
                <NumberedStep n={3} title="Sync to admin portal">ManyChat feeds lead data into the admin portal via webhook. Every inquiry is logged with customer name, watch interest, and pipeline stage. No more lost conversations.</NumberedStep>
                <NumberedStep n={4} title="Automated follow-ups">If a lead doesn&apos;t buy within 24 hours, automated email sequence fires (see Growth Playbook). After 24 hours, Facebook&apos;s messaging rules prevent promotional messages — so the email capture in step 2 is essential.</NumberedStep>

                <div className="mt-4 p-4 rounded-lg bg-[#1a1a2e] text-sm">
                  <div className="text-xs font-semibold text-[#7c5cfc] mb-2 tracking-widest">MANYCHAT COST BREAKDOWN</div>
                  <div className="space-y-1.5 text-[#999]">
                    <div className="flex justify-between"><span>ManyChat Pro (up to 500 contacts)</span><span className="text-white font-medium">$15/mo</span></div>
                    <div className="flex justify-between"><span>AI add-on (auto-responds to any question using site context)</span><span className="text-white font-medium">$29/mo</span></div>
                    <div className="flex justify-between border-t border-[#333] pt-1.5"><span className="text-white font-medium">Total</span><span className="text-white font-medium">$44/mo</span></div>
                  </div>
                  <p className="mt-2 text-[#666]">Less than the profit from one watch sale. The AI add-on trains on Owen&apos;s site content and answers pricing, customization, shipping, and warranty questions automatically — handling the 5 most common inquiry types without Owen touching his phone.</p>
                </div>

                <p className="text-sm text-[#888] mt-4">Over time, the site becomes the primary sales channel and Facebook becomes the marketing/discovery channel. But we don&apos;t force the transition — we let it happen naturally as the site proves itself.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Setup Guides — Step by Step" defaultOpen={false}>
                <p className="mb-4">Reference guides for setting up every tool in the stack. Hamza handles the technical integration — these checklists ensure nothing gets missed.</p>

                <div className="text-xs font-semibold text-[#7c5cfc] mb-3 mt-2 tracking-widest">1. MANYCHAT SETUP</div>
                <NumberedStep n={1} title="Create Facebook Business Page">If Owen doesn&apos;t have one, create it now. This is the prerequisite for all Messenger automation. Name it after the watch brand (TBD).</NumberedStep>
                <NumberedStep n={2} title="Sign up for ManyChat Pro ($15/mo)">Connect the Business Page. ManyChat needs Page admin access to read and respond to messages.</NumberedStep>
                <NumberedStep n={3} title="Enable AI Add-on ($29/mo)">Train ManyChat AI on the watch site URL once it&apos;s live. It auto-answers pricing, customization, shipping, and warranty questions — the 5 most common inquiry types.</NumberedStep>
                <NumberedStep n={4} title="Build the Qualification Flow">Copy the script from the Growth Playbook section below into ManyChat&apos;s flow builder. Set up Quick Reply buttons, custom fields for email capture, and the webhook trigger.</NumberedStep>
                <NumberedStep n={5} title="Test with a Friend">Have someone message the Business Page and go through the full flow. Verify: auto-response fires in &lt;60 seconds, email is captured, webhook hits the admin portal.</NumberedStep>
                <NumberedStep n={6} title="Switch Marketplace Listings">Re-list items through the Business Page instead of Owen&apos;s personal profile. This is the critical operational change that enables automation.</NumberedStep>

                <div className="text-xs font-semibold text-[#7c5cfc] mb-3 mt-6 tracking-widest">2. META PIXEL + CONVERSIONS API</div>
                <NumberedStep n={1} title="Create Meta Events Manager">Go to business.facebook.com → Events Manager → Connect Data Sources → Web. Create a new Pixel.</NumberedStep>
                <NumberedStep n={2} title="Install Pixel Base Code">Hamza adds the Pixel snippet to the site&apos;s &lt;head&gt; tag. This fires on every page load and starts collecting visitor data.</NumberedStep>
                <NumberedStep n={3} title="Set Up Conversions API (CAPI)">Server-side event tracking that catches what the browser Pixel misses (43% of users run ad blockers<SourceTag source="PageFair 2024" />). Hamza configures this through the Next.js API routes.</NumberedStep>
                <NumberedStep n={4} title="Configure Standard Events">ViewContent (product page view), AddToCart, InitiateCheckout, Purchase. Each event passes value and currency for ROAS tracking.</NumberedStep>
                <NumberedStep n={5} title="Verify in Events Manager">Use Meta&apos;s Event Testing tool to confirm all events are firing correctly. Check both Pixel and CAPI events show as matched.</NumberedStep>

                <div className="text-xs font-semibold text-[#7c5cfc] mb-3 mt-6 tracking-widest">3. STRIPE INTEGRATION</div>
                <NumberedStep n={1} title="Create Stripe Account">stripe.com → Sign up. Complete identity verification (takes 1-2 business days). Funds deposit to Owen&apos;s business bank account.</NumberedStep>
                <NumberedStep n={2} title="Connect to Site">Hamza integrates Stripe Checkout via API. Products and prices are managed in the admin portal, not in Stripe&apos;s dashboard.</NumberedStep>
                <NumberedStep n={3} title="Set Up Webhooks">Stripe sends a webhook to the site on every successful payment. This auto-creates the order in the admin portal — no manual entry.</NumberedStep>
                <NumberedStep n={4} title="Test Purchase">Run a $1 test transaction with Stripe&apos;s test mode. Verify: payment succeeds, webhook fires, order appears in admin, confirmation email sends.</NumberedStep>

                <div className="text-xs font-semibold text-[#7c5cfc] mb-3 mt-6 tracking-widest">4. RESEND EMAIL SETUP</div>
                <NumberedStep n={1} title="Create Resend Account">resend.com → Free tier covers 100 emails/day (more than enough for months). No credit card required.</NumberedStep>
                <NumberedStep n={2} title="Verify Sending Domain">Add DNS records (SPF, DKIM) to the domain registrar. This ensures emails don&apos;t land in spam. Takes ~10 minutes + up to 48 hours for DNS propagation.</NumberedStep>
                <NumberedStep n={3} title="Build Email Templates">Hamza creates the Welcome, Abandoned Cart, and Post-Purchase templates using the copy from the Growth section below.</NumberedStep>
                <NumberedStep n={4} title="Connect Triggers">Welcome: fires on new account creation. Abandoned Cart: fires 1 hour after cart abandonment. Post-Purchase: fires 14 days after order marked &quot;delivered.&quot;</NumberedStep>
                <NumberedStep n={5} title="Test All Flows">Owen signs up with a personal email and goes through each trigger scenario. Verify subject lines, formatting, and links all work.</NumberedStep>

                <div className="text-xs font-semibold text-[#7c5cfc] mb-3 mt-6 tracking-widest">5. MAKE.COM WEBHOOK AUTOMATION</div>
                <NumberedStep n={1} title="Create Make.com Account">Free tier includes 1,000 operations/month. Upgrade to Core ($9/mo) if volume exceeds that.</NumberedStep>
                <NumberedStep n={2} title="Scenario: Stripe → Google Sheets">Every Stripe payment auto-logs to a Google Sheet as a backup order record. Columns: date, customer name, email, product, amount, status.</NumberedStep>
                <NumberedStep n={3} title="Scenario: ManyChat → CRM">ManyChat lead capture webhook sends name, email, watch interest, and pipeline stage to the admin portal or Google Sheets.</NumberedStep>
                <NumberedStep n={4} title="Scenario: Status Change → Email">When Owen updates order status in the admin portal, Make.com triggers a customer notification email via Resend.</NumberedStep>

                <DataTable
                  headers={["Tool", "Monthly Cost", "What It Does", "Setup Time"]}
                  rows={[
                    ["ManyChat Pro + AI", "$44/mo", "Auto-responds to Messenger inquiries, qualifies leads, captures email", "~2 hours"],
                    ["Meta Pixel + CAPI", "$0", "Tracks site visitors for ad targeting and conversion measurement", "~1 hour (Hamza)"],
                    ["Stripe", "2.9% + $0.30/tx", "Processes payments, creates orders via webhook", "~1 hour (Hamza)"],
                    ["Resend", "$0 (free tier)", "Sends automated email flows (welcome, cart, post-purchase)", "~2 hours"],
                    ["Make.com", "$0–$9/mo", "Connects tools via webhooks — Stripe→Sheets, ManyChat→CRM", "~2 hours"],
                    ["**Total**", "**$44–$53/mo + Stripe fees**", "**Full automation stack**", "**~8 hours total setup**"],
                  ]}
                />
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ FINANCIAL MODEL ═══ */}
        <section id="financial" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Calculator} label="Section 5" title="Financial Model" /></FadeIn>
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-base text-[#888] mb-8 leading-relaxed">Both businesses in one model. Drag the sliders, tap a scenario preset. The C8 progress bar shows how close Owen is to the annual net profit needed.</p>
              <FinancialModel />

              <div className="mt-8 bg-[#141420] rounded-xl border border-white/[0.06] p-5 sm:p-6">
                <div className="text-xs font-semibold text-[#7c5cfc] mb-4 tracking-widest">KEY ASSUMPTIONS IN THIS MODEL</div>
                <div className="grid sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-white font-semibold mb-2">Watch COGS Breakdown (38% default)</div>
                    <div className="space-y-1.5 text-[#999]">
                      <div className="flex justify-between"><span>NH35 movement (genuine)</span><span className="text-[#bbb]">$35–$50</span></div>
                      <div className="flex justify-between"><span>Case</span><span className="text-[#bbb]">$25–$40</span></div>
                      <div className="flex justify-between"><span>Dial</span><span className="text-[#bbb]">$10–$20</span></div>
                      <div className="flex justify-between"><span>Hands</span><span className="text-[#bbb]">$8–$15</span></div>
                      <div className="flex justify-between"><span>Crystal (sapphire)</span><span className="text-[#bbb]">$12–$25</span></div>
                      <div className="flex justify-between"><span>Bezel insert</span><span className="text-[#bbb]">$10–$20</span></div>
                      <div className="flex justify-between"><span>Strap/bracelet</span><span className="text-[#bbb]">$8–$15</span></div>
                      <div className="flex justify-between"><span>Gaskets, stems, crown</span><span className="text-[#bbb]">$5–$8</span></div>
                      <div className="flex justify-between border-t border-[#333] pt-1.5 mt-1.5"><span className="text-white font-medium">Total parts cost</span><span className="text-white font-medium">$113–$193</span></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-2">What&apos;s NOT in the Model</div>
                    <div className="space-y-1.5 text-[#999]">
                      <Bullet>Owen&apos;s labor time is not costed (he&apos;s the owner, not an employee)</Bullet>
                      <Bullet>Shipping costs passed to customer (not in COGS)</Bullet>
                      <Bullet>Stripe fees (2.9% + $0.30/tx) — reduce net by ~3%</Bullet>
                      <Bullet>No hiring costs included (Phase 4+ consideration)</Bullet>
                      <Bullet>Archery COGS at 5% includes material + electricity + packaging + ~5% failed print rate</Bullet>
                    </div>
                    <div className="mt-4 text-white font-semibold mb-2">Ad Performance Benchmarks (DTC Watches)</div>
                    <div className="space-y-1.5 text-[#999]">
                      <div className="flex justify-between"><span>CPM (cost per 1,000 impressions)</span><span className="text-[#bbb]">$9.20 median (Varos Watches, Apr 2025)</span></div>
                      <div className="flex justify-between"><span>CPC (cost per click)</span><span className="text-[#bbb]">$0.64 median (Varos Watches, Apr 2025)</span></div>
                      <div className="flex justify-between"><span>CTR (click-through rate)</span><span className="text-[#bbb]">1.67% median (Varos Watches, Feb 2025)</span></div>
                      <div className="flex justify-between"><span>Target ROAS</span><span className="text-[#bbb]">3.34x median (Varos); 5x = top quartile</span></div>
                      <div className="flex justify-between"><span>Target CAC (watches)</span><span className="text-[#bbb]">$100–$175 paid CAC</span></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#222] text-xs text-[#555]">
                  Sources: Varos Watches vertical benchmarks (median CPM $9.20, CTR 1.67%, CPC $0.64, ROAS 3.34x)<SourceTag source="Varos Watches, Feb-Apr 2025" />. DTC watch brand benchmarks (Original Grain allocates 95% of ad budget to Meta at ~$360 ASP<SourceTag source="DTC Case Study" />). Q4 inflates CAC by 30-40% due to holiday competition. Q1 is the cheapest advertising quarter.
                </div>
              </div>
            </div>
          </FadeIn>
        </section>


        {/* ═══ GROWTH PLAYBOOK ═══ */}
        <section id="growth" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={TrendingUp} label="Section 6" title="Growth Playbook — Ads, Content & Email" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="The Customer Journey: From Discovery to Review">
                <p className="mb-4">This is the full pipeline across both businesses. Every step is measurable and optimizable — the funnel below shows how 10,000 impressions convert to paying customers through six automated stages.</p>
                <CustomerFunnel />
                <div className="mt-4 p-4 rounded-lg bg-[#1a1a2e] text-xs text-[#666] leading-relaxed">
                  <strong className="text-[#999]">Conversion rate sources:</strong> E-commerce visitor-to-purchase rate: 0.9-3.0% depending on category (Dynamic Yield/Mastercard XP², 2024-2025). Luxury & Jewelry: 0.9% (Dynamic Yield). Chat inquiry rate: 2-4% of visitors (LiveChat 2024, Tidio 2026). Cart abandonment for luxury: 80-83% (Dynamic Yield). Abandoned cart email recovery: 3.33% per recipient, 10-15% of carts overall (Klaviyo, 143K+ flows). Review request response: 5-15% (Fera.ai, 2M+ requests; Jewelry specifically: 18%). The funnel numbers above are illustrative targets — validate with real data after 30 days of traffic.
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Watch Business: Ads & Content">
                <p className="mb-3"><strong className="text-white">Budget: $500-$1,500/month on Meta</strong> once the site is live and Pixel is collecting data.</p>
                <Bullet><strong className="text-white">Best performing creative:</strong> UGC build process videos (15-30 sec), before/after transformations, customer review compilations. Phone-shot content outperforms polished studio content 4x<SourceTag source="Meta Creative Best Practices" />.</Bullet>
                <Bullet><strong className="text-white">Targeting:</strong> Watch interests (Seiko, Orient, Casio, horology) + lifestyle (whiskey, leather, EDC) + engaged shoppers. After 50+ conversions, build Lookalike Audiences from the 700-customer base.</Bullet>
                <Bullet><strong className="text-white">Organic:</strong> 4-5 Instagram posts/week, daily Stories, TikTok build videos. Content pillars: build process (40%), finished reveals (20%), BTS (15%), education (15%), social proof (10%).</Bullet>
                <Bullet><strong className="text-white">Facebook reviews:</strong> Owen&apos;s 50+ reviews need to be everywhere — on the site, in ads, in emails. They&apos;re his most underutilized asset.</Bullet>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="First-Week Ad Spend Plan: $500 Budget">
                <p className="mb-4">When ads go live, don&apos;t spray and pray. Here&apos;s the exact allocation for the first $500:</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <MetricCard label="Prospecting" value="$300" sub="60% — cold audiences" color="text-[#7c5cfc]" />
                  <MetricCard label="Retargeting" value="$100" sub="20% — site visitors" />
                  <MetricCard label="Social Proof" value="$100" sub="20% — testimonial ads" color="text-[#4ade80]" />
                </div>
                <DataTable
                  headers={["Campaign", "Daily Budget", "Audience", "Creative", "Objective"]}
                  rows={[
                    ["**Prospecting**", "$~43/day", "Watch: Seiko, horology, EDC interests", "Build process UGC video (Brief #01)", "Purchases (Advantage+ Shopping)"],
                    ["**Retargeting**", "$~14/day", "Site visitors (7-day), cart abandoners", "Configurator demo (Brief #04)", "Purchases"],
                    ["**Social Proof**", "$~14/day", "Broad + engaged shoppers", "Review compilation (Brief #03)", "Purchases"],
                  ]}
                />
                <div className="mt-4">
                  <div className="text-xs font-semibold text-white mb-3">Prospecting Ad Set Breakdown</div>
                  <div className="grid sm:grid-cols-3 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-[#1a1a2e] text-sm">
                      <div className="text-[#7c5cfc] font-semibold mb-1">Ad Set A — $15/day</div>
                      <div className="text-[#999]">Watch interests (Seiko, Orient, mechanical watches, horology)</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#1a1a2e] text-sm">
                      <div className="text-[#7c5cfc] font-semibold mb-1">Ad Set B — $15/day</div>
                      <div className="text-[#999]">Lifestyle interests (EDC, whiskey, leather, men&apos;s fashion)</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#1a1a2e] text-sm">
                      <div className="text-[#7c5cfc] font-semibold mb-1">Ad Set C — $13/day</div>
                      <div className="text-[#999]">Archery interests (if archery site is live — bowhunting, target archery)</div>
                    </div>
                  </div>
                </div>
                <AlertBox type="warning" title="Kill Rules — Non-Negotiable">
                  <div className="space-y-2">
                    <Bullet><strong className="text-white">CTR &lt; 0.8% after $30 spent</strong> on any creative → kill that creative, swap in a new one</Bullet>
                    <Bullet><strong className="text-white">CPM &gt; $18</strong> → audience is too narrow, broaden targeting</Bullet>
                    <Bullet><strong className="text-white">ROAS &lt; 1.5x after 7 full days</strong> on any campaign → pause and diagnose (creative fatigue? landing page? wrong audience?)</Bullet>
                    <Bullet><strong className="text-white">No purchases after $150 spend</strong> → pause everything, review landing page with session recordings</Bullet>
                    <Bullet><strong className="text-white">After Day 5:</strong> reallocate budget from losing ad sets to winners. Double down on what works.</Bullet>
                  </div>
                </AlertBox>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="ManyChat Qualification Flow — The Actual Script" defaultOpen={false}>
                <p className="mb-4">This is the conversation that fires when someone messages the Business Page about a watch. Copy-paste into ManyChat:</p>
                <div className="space-y-3">
                  {[
                    { sender: "BOT", msg: "Hey! 👋 Thanks for reaching out about our watches. I can help you find the right one. Are you looking for:", type: "Quick Replies: \"Ready-to-ship watch ($299)\" | \"Custom build ($549+)\" | \"Just browsing\"" },
                    { sender: "USER", msg: "[Selects option]", type: "" },
                    { sender: "BOT (if Stock)", msg: "Great choice! Here are our most popular ready-to-ship designs: [Gallery of 5-6 stock watches with prices]. Any of these catch your eye? Or I can show you the full collection on our site.", type: "Quick Replies: \"Show me the full collection\" | \"Tell me more about [specific watch]\" | \"Actually, I want something custom\"" },
                    { sender: "BOT (if Custom)", msg: "Love it — custom builds are where it gets fun. To help Owen design your perfect watch, I have a couple quick questions:", type: "" },
                    { sender: "BOT", msg: "What style are you drawn to?", type: "Quick Replies: \"Diver / Submariner\" | \"Dress / Datejust\" | \"Sport / Nautilus\" | \"Not sure yet\"" },
                    { sender: "BOT", msg: "And what's your budget range?", type: "Quick Replies: \"$549-$649\" | \"$650-$799\" | \"$800+ (full bespoke)\"" },
                    { sender: "BOT", msg: "Perfect. Last thing — what's the best email to send you build options and a detailed quote? Owen will personally follow up within 24 hours.", type: "Free text input → saves to custom field \"Email\"" },
                    { sender: "BOT (after email capture)", msg: "You're all set! ✅ Owen will reach out soon with design options. In the meantime, try our watch configurator to start designing: [link to configurator]. Talk soon!", type: "Triggers: Webhook to admin portal, adds to email list, starts New Lead email sequence" },
                  ].map((step, i) => (
                    <div key={i} className={`p-4 rounded-lg ${step.sender.startsWith("BOT") ? "bg-[#7c5cfc]/5 border-l-4 border-l-[#7c5cfc]" : "bg-[#1a1a2e] border-l-4 border-l-[#666]"}`}>
                      <div className="text-xs font-semibold tracking-wider mb-1.5" style={{ color: step.sender.startsWith("BOT") ? "#7c5cfc" : "#666" }}>{step.sender}</div>
                      <div className="text-sm text-[#ccc] leading-relaxed">{step.msg}</div>
                      {step.type && <div className="mt-2 text-xs text-[#888] italic">{step.type}</div>}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-[#888]">The entire flow takes &lt;2 minutes. Key metrics to track: completion rate (target: 60%+), email capture rate (target: 70% of those who start), and time-to-first-response (&lt;60 seconds via automation).</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Archery Business: Ads & Content">
                <p className="mb-3"><strong className="text-white">Start organic, scale paid once product-market fit is confirmed.</strong></p>
                <Bullet><strong className="text-white">Seed launch:</strong> Owen&apos;s dad&apos;s network + archery community posts (Reddit, ArcheryTalk, Facebook Groups). Share the product, get honest feedback, iterate.</Bullet>
                <Bullet><strong className="text-white">Content that works for archery:</strong> Printing process videos (satisfying to watch), side-by-side performance tests vs traditional parts, durability demos, customer field-test footage.</Bullet>
                <Bullet><strong className="text-white">Paid ads:</strong> Once 10-20 organic sales confirm demand, launch Meta ads at $500-$1,000/month targeting archery interests. At 97%+ margins, almost any CAC under $20 is wildly profitable for a $50+ avg order.</Bullet>
                <Bullet><strong className="text-white">YouTube:</strong> Archery YouTube is big. A channel showing the design/print process and field testing builds authority fast. Long-form content creates trust that short-form can&apos;t. Key targets: NUSensei (~160K subs, has already covered 3D-printed archery gear), Nock On Archery (John Dudley, ~211K subs), Average Jack Archery (~66K subs). Send free products for honest review — one positive video from these channels is worth months of paid ads.</Bullet>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="5 Archery Ad Creative Briefs">
                <p className="mb-4">Same production-first approach as watches. Owen can film briefs 1-3 with his phone and printer:</p>
                <div className="space-y-4">
                  {[
                    {
                      num: "01", title: "The Print Process (Time-Lapse)", type: "15-30 sec Reel/TikTok", priority: "HIGH — Film this week",
                      hook: "\"Watch a $45 arrow rest come to life in 60 seconds\"",
                      visual: "Phone on tripod pointing at the 3D printer bed. Time-lapse of the full print — from first layer to finished part. Show Owen pulling it off the bed, trimming support material, and test-fitting on a bow.",
                      cta: "\"Shop the full catalog\" — link to archery site",
                      why: "Manufacturing process content is inherently satisfying and gets shared. 3D printing time-lapses perform exceptionally well on TikTok (millions of views on #3Dprinting)."
                    },
                    {
                      num: "02", title: "Strength Test: Carbon Fiber vs PLA", type: "15-20 sec Reel/TikTok", priority: "HIGH — Film this week",
                      hook: "\"This is why material matters\"",
                      visual: "Side-by-side: standard PLA-printed part vs Owen's carbon fiber part. Apply stress — flex test, drop test, or clamp test. PLA snaps, carbon fiber holds. Dramatic, visual, shareable.",
                      cta: "\"Built for performance\" — link to product page",
                      why: "Comparison content drives comments and debate. The visual of one part snapping and the other holding is immediately convincing — no explanation needed."
                    },
                    {
                      num: "03", title: "Field Test — Real Shots, Real Parts", type: "20-30 sec Video", priority: "HIGH — Film at range",
                      hook: "\"3D-printed arrow rest. 50 yards. Does it hold up?\"",
                      visual: "Owen (or his dad) at the archery range. Mount the 3D-printed part, shoot multiple arrows, show grouping. Close-up of the part after 50+ shots — no wear, no failure.",
                      cta: "\"Tested in the field\" — link to shop",
                      why: "Archers are practical. They need to see the part working under real conditions. Field-test content builds trust that product photos can't."
                    },
                    {
                      num: "04", title: "DIY vs. Pro: Home Printer vs. Owen's", type: "15 sec Carousel/Reel", priority: "MEDIUM — After first sales",
                      hook: "\"Free STL file vs. a $40 professional part\"",
                      visual: "Left: a rough PLA print from a Thingiverse file (layer lines, stringing, poor fit). Right: Owen's carbon fiber part (smooth finish, precise tolerance, perfect fit). Side-by-side on a bow.",
                      cta: "\"Skip the headache\" — link to shop",
                      why: "Targets DIY archers who've tried and failed to print their own parts. Shows the quality gap is worth the price."
                    },
                    {
                      num: "05", title: "\"The $1 Part That Replaces a $60 Factory Part\"", type: "20 sec Reel/TikTok", priority: "MEDIUM — Controversial hook",
                      hook: "\"Trophy Ridge charges $60. I make the same thing for $1 in material.\"",
                      visual: "Show the factory part with retail price tag. Show Owen's part printing. Compare side-by-side on a bow. Same performance, fraction of the price.",
                      cta: "\"Performance doesn't need a markup\" — link to shop",
                      why: "Controversial hooks drive massive engagement. The value proposition is undeniable — and every comment arguing about it shows the ad to more people."
                    },
                  ].map((brief, i) => (
                    <div key={i} className="bg-[#1a1a2e] rounded-xl border border-white/[0.04] p-5">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-[#4ade80] tracking-wider">AD {brief.num}</span>
                        <span className="text-sm font-semibold text-white">{brief.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4ade80]/10 text-[#4ade80]">{brief.type}</span>
                      </div>
                      <div className="text-[10px] font-semibold tracking-widest text-[#4ade80] mb-3">{brief.priority}</div>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-[#666]">Hook: </span><span className="text-white italic">{brief.hook}</span></div>
                        <div><span className="text-[#666]">Visual: </span><span className="text-[#999]">{brief.visual}</span></div>
                        <div><span className="text-[#666]">CTA: </span><span className="text-[#999]">{brief.cta}</span></div>
                        <div><span className="text-[#666]">Why this works: </span><span className="text-[#888] italic">{brief.why}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Week 1-4 Content Calendar (Archery)" defaultOpen={false}>
                <p className="mb-4">Separate content track for the archery brand. Owen batches archery content alongside watch content — one extra hour on filming day covers the week:</p>
                <DataTable
                  headers={["Day", "Platform", "Content", "Pillar"]}
                  rows={[
                    ["**Week 1**", "", "", ""],
                    ["Mon", "IG Reel + TikTok", "Time-lapse: arrow rest printing start to finish (30 sec)", "Printing Process (35%)"],
                    ["Tue", "IG Carousel", "\"5 archery accessories you can 3D print\" — product shots with specs", "Education (20%)"],
                    ["Wed", "IG Story", "\"What material should I print this in?\" — poll: Carbon Fiber vs PETG", "Education"],
                    ["Thu", "IG Reel + TikTok", "Field test: 3D-printed stabilizer at the range, 30 shots, close-up after", "Field Tests (25%)"],
                    ["Fri", "Reddit + ArcheryTalk", "Post field test results with photos, ask for feedback. Link in profile.", "Community (10%)"],
                    ["**Week 2**", "", "", ""],
                    ["Mon", "IG Reel + TikTok", "Carbon fiber vs PLA strength test — snap comparison", "Field Tests"],
                    ["Tue", "IG Story", "Print farm tour — show the printer setup, filament spools, parts drying", "Behind the Scenes (10%)"],
                    ["Wed", "IG Carousel", "\"Why carbon fiber matters for archery parts\" — 3 slides with close-ups", "Education"],
                    ["Thu", "IG Reel + TikTok", "Satisfying ASMR: removing supports from a fresh print + sanding smooth", "Printing Process"],
                    ["Fri", "IG Feed", "Customer field photo repost (if available) or hero product shot with specs", "Community"],
                    ["**Week 3**", "", "", ""],
                    ["Mon", "IG Reel + TikTok", "\"$60 factory part vs my $40 print — same performance\" (controversial hook)", "Field Tests"],
                    ["Tue", "IG Story", "\"Which new part should I design next?\" — 2-option poll", "Community"],
                    ["Wed", "Reddit + ArcheryTalk", "Share design process: \"How I designed a custom quiver mount — feedback welcome\"", "Education"],
                    ["Thu", "IG Reel + TikTok", "Full print-to-package process: print → QC → package → label → ship", "Printing Process"],
                    ["Fri", "IG Feed + Story", "\"This week's orders\" — gallery of 4-5 printed parts ready to ship", "Behind the Scenes"],
                    ["**Week 4**", "", "", ""],
                    ["Mon", "IG Reel + TikTok", "Owen shooting with his own 3D-printed setup — all parts labeled on screen", "Field Tests"],
                    ["Tue", "IG Story", "Day-in-the-life: printing in the morning, testing at the range in the afternoon", "Behind the Scenes"],
                    ["Wed", "IG Carousel", "\"PLA vs PETG vs Carbon Fiber — which material for which part?\"", "Education"],
                    ["Thu", "IG Reel", "New SKU reveal: show the CAD design → first print → fit test on a bow", "Printing Process"],
                    ["Fri", "IG Feed", "\"Month 1 recap: X parts printed, X shipped, first reviews\" + CTA", "Community"],
                  ]}
                />
                <p className="mt-3 text-sm text-[#888]"><strong className="text-white">Realistic time commitment:</strong> 2-3 additional hours/week for archery content — print time-lapses run overnight but editing and posting add up. Reddit/ArcheryTalk posts are text + photos (15 minutes each). <strong className="text-white">Total across both brands: ~7-8 hours/week on content.</strong> This is factored into the Time Budget in the Operations section.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Archery Email Sequences" defaultOpen={false}>
                <p className="mb-4">Three automated email flows for archery customers. Same Resend infrastructure as watches — just different templates:</p>
                <div className="space-y-5">
                  <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-[#4ade80]">1.</span>
                      <span className="text-base font-semibold text-white">Welcome Email (triggers on first purchase)</span>
                    </div>
                    <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                      <div className="text-[#4ade80] mb-1">Subject: Your order is printing — here&apos;s what to expect</div>
                      <div className="text-[#888] mt-3">
                        Hey {`{first_name}`},<br /><br />
                        Thanks for the order. I&apos;m Owen — I design and print every part myself using engineering-grade materials (carbon fiber, PETG, not the cheap PLA you see on Etsy).<br /><br />
                        Your {`{product_name}`} is printing now and will ship within 3-5 business days. You&apos;ll get a tracking email when it does.<br /><br />
                        <strong className="text-white">A few things:</strong><br />
                        → Inspect the part before first use — check for any print defects<br />
                        → If anything doesn&apos;t look right, reply to this email and I&apos;ll make it right<br />
                        → I test every design at the range myself before listing it<br /><br />
                        Questions? Just reply — it comes straight to me.<br /><br />
                        — Owen
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-[#4ade80]">2.</span>
                      <span className="text-base font-semibold text-white">Review Request (Day 14 after delivery)</span>
                    </div>
                    <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                      <div className="text-[#4ade80] mb-1">Subject: How&apos;s the {`{product_name}`} holding up?</div>
                      <div className="text-[#888] mt-3">
                        Hey {`{first_name}`},<br /><br />
                        You&apos;ve had your {`{product_name}`} for about two weeks now. Have you had a chance to test it?<br /><br />
                        I&apos;d really appreciate a quick review — it helps other archers decide if these parts are worth it.<br /><br />
                        → Leave a review here (takes 30 seconds)<br /><br />
                        Bonus: if you snapped any photos at the range with the part in action, I&apos;d love to feature them on the site and social media (with credit, obviously).<br /><br />
                        Thanks for the support.<br /><br />
                        — Owen
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-[#4ade80]">3.</span>
                      <span className="text-base font-semibold text-white">New Product Drop (manual trigger)</span>
                    </div>
                    <p className="text-sm text-[#999]">Blast to archery email list when new parts launch. Subject: &quot;New drop: {`{product_name}`} — now available.&quot; Body: hero photo, 2-sentence description, price, materials used, direct buy link. Include &quot;Designed by Owen, printed in carbon fiber, tested at the range.&quot; Keep it short — drops are about excitement, not education.</p>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Archery Audience Targeting (Meta Ads)">
                <p className="mb-4">When archery ads go live (after validation sprint confirms demand), here&apos;s the targeting strategy:</p>
                <Bullet><strong className="text-white">Interest targeting (start here):</strong> Archery, bowhunting, compound bow, target archery, 3D archery, crossbow hunting. Layer with &quot;engaged shoppers&quot; behavior.</Bullet>
                <Bullet><strong className="text-white">Lifestyle expansion:</strong> Outdoor recreation, hunting, camping, tactical gear. These audiences overlap heavily with archery buyers.</Bullet>
                <Bullet><strong className="text-white">Community-based:</strong> People who follow ArcheryTalk, Lancaster Archery Supply, Bear Archery, Hoyt, Mathews on Facebook.</Bullet>
                <Bullet><strong className="text-white">Lookalike audiences:</strong> After 50 archery customers, build a 1% Lookalike from the customer email list. This becomes the primary scaling lever.</Bullet>
                <Bullet><strong className="text-white">Retargeting tiers:</strong> Hot (0-7 day cart abandoners), warm (7-30 day product viewers), cool (30-90 day site visitors). Different creative for each tier.</Bullet>
                <p className="mt-3 text-sm text-[#888]"><strong className="text-white">Budget:</strong> Start at $500/month when organic validates demand. At 90%+ margins with $50 ASP, a CAC under $20 is wildly profitable. Scale to $1,000-$2,000/month on winners.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="5 Ad Creative Briefs — Ready to Produce">
                <p className="mb-4">Ranked by ease of production. Owen can film briefs 1-3 with his phone this week:</p>
                <div className="space-y-4">
                  {[
                    {
                      num: "01", title: "The Build Process (UGC Video)", type: "15-30 sec Reel/TikTok", priority: "HIGH — Film this week",
                      hook: "\"Most people don't know what goes into a $500 custom watch\"",
                      visual: "Phone on tripod, overhead shot of Owen's workbench. Time-lapse of a complete build: movement installation → dial → hands → case assembly → final wrist shot.",
                      cta: "\"Design yours at [site]\" — link to configurator",
                      why: "UGC-style phone content outperforms polished studio content 4x on Meta. This is the #1 performing format for watch brands."
                    },
                    {
                      num: "02", title: "Before/After Transformation", type: "15 sec Reel/TikTok", priority: "HIGH — Film this week",
                      hook: "\"$80 Seiko → $500 custom watch in 60 minutes\"",
                      visual: "Hold up a bare Seiko SKX case. Cut to finished watch. Simple, dramatic, satisfying.",
                      cta: "\"See what's possible\" — link to gallery",
                      why: "Transformation content drives the highest comment engagement, which fuels the algorithm. \"Drip or skip?\" hooks get 3-5x normal comments."
                    },
                    {
                      num: "03", title: "Social Proof Compilation", type: "20 sec Carousel or Video", priority: "HIGH — Can make from existing reviews",
                      hook: "\"700+ watches built. 50+ five-star reviews. Here's what they say:\"",
                      visual: "Screenshots of actual Facebook reviews, customer wrist shots, star ratings. No production needed — just compile existing assets.",
                      cta: "\"Join 700+ happy customers\" — link to shop",
                      why: "Testimonial ads convert 30-50% better than product-only ads (Nielsen). Owen has 50+ reviews sitting unused."
                    },
                    {
                      num: "04", title: "The Configurator Demo", type: "20-30 sec Screen Recording", priority: "MEDIUM — After site launch",
                      hook: "\"Design your own watch in 60 seconds\"",
                      visual: "Screen recording of the watch configurator in action. Select case → dial → hands → bezel → crystal → strap. Price updates live. \"Your watch, your way.\"",
                      cta: "\"Try the configurator\" — direct link",
                      why: "Interactive product experiences have 2x higher conversion. Showing the configurator as an ad drives high-intent clicks."
                    },
                    {
                      num: "05", title: "Click-to-Messenger Ad", type: "Static Image + CTA", priority: "MEDIUM — After ManyChat is live",
                      hook: "\"Want a custom watch? Message us and we'll help you design it\"",
                      visual: "Hero shot of a finished watch. CTA button opens Messenger → ManyChat qualification flow fires automatically.",
                      cta: "\"Send Message\" button (Meta Click-to-Messenger format)",
                      why: "This ties directly into the ManyChat automation. Lead is qualified, email captured, and routed to configurator — all without Owen lifting a finger."
                    },
                  ].map((brief, i) => (
                    <div key={i} className="bg-[#1a1a2e] rounded-xl border border-white/[0.04] p-5">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-[#7c5cfc] tracking-wider">AD {brief.num}</span>
                        <span className="text-sm font-semibold text-white">{brief.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7c5cfc]/10 text-[#7c5cfc]">{brief.type}</span>
                      </div>
                      <div className="text-[10px] font-semibold tracking-widest text-[#4ade80] mb-3">{brief.priority}</div>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-[#666]">Hook: </span><span className="text-white italic">{brief.hook}</span></div>
                        <div><span className="text-[#666]">Visual: </span><span className="text-[#999]">{brief.visual}</span></div>
                        <div><span className="text-[#666]">CTA: </span><span className="text-[#999]">{brief.cta}</span></div>
                        <div><span className="text-[#666]">Why this works: </span><span className="text-[#888] italic">{brief.why}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Week 1-4 Content Calendar (Watches)">
                <p className="mb-4">Specific daily posts for the first month. Owen films in batches — 2 hours on Sunday produces a week of content:</p>
                <DataTable
                  headers={["Day", "Platform", "Content", "Pillar"]}
                  rows={[
                    ["**Week 1**", "", "", ""],
                    ["Mon", "IG Reel + TikTok", "Build process time-lapse: SKX diver mod start to finish (30 sec)", "Build Process (40%)"],
                    ["Tue", "IG Carousel", "\"5 most popular builds this month\" — 5 slides with close-up shots", "Finished Reveals (20%)"],
                    ["Wed", "IG Story + TikTok", "\"What movement should I put in this?\" — poll between NH35 and NH36", "Education (15%)"],
                    ["Thu", "IG Reel", "ASMR hand-setting close-up with satisfying click sounds (15 sec)", "Build Process (40%)"],
                    ["Fri", "IG Feed + Story", "Customer wrist shot repost + review quote overlay", "Social Proof (10%)"],
                    ["**Week 2**", "", "", ""],
                    ["Mon", "IG Reel + TikTok", "Before/after transformation: \"$80 → $500\" (15 sec)", "Build Process"],
                    ["Tue", "IG Story", "Workbench tour — show tools, parts bins, current builds in progress", "Behind the Scenes (15%)"],
                    ["Wed", "IG Carousel + TikTok", "\"Sapphire vs mineral crystal — here's why it matters\" with macro shots", "Education"],
                    ["Thu", "IG Reel", "Component unboxing — new dials and bezels arrived", "Behind the Scenes"],
                    ["Fri", "IG Feed", "Finished watch hero shot with specs in caption. \"DM to order or visit [site]\"", "Finished Reveals"],
                    ["**Week 3**", "", "", ""],
                    ["Mon", "IG Reel + TikTok", "\"Rolex Submariner vs my $350 build — spot the difference\" (controversial hook)", "Build Process"],
                    ["Tue", "IG Story", "\"Pick the dial for tomorrow's build\" — 2-option poll", "Education"],
                    ["Wed", "IG Carousel", "Customer review compilation — 3 reviews with wrist shots", "Social Proof"],
                    ["Thu", "IG Reel + TikTok", "Real-time bezel press + crystal installation (satisfying)", "Build Process"],
                    ["Fri", "IG Feed + Story", "\"This week's completed builds\" — gallery of 3-4 watches", "Finished Reveals"],
                    ["**Week 4**", "", "", ""],
                    ["Mon", "IG Reel + TikTok", "\"How I design a custom watch from scratch\" — configurator walkthrough", "Build Process"],
                    ["Tue", "IG Story", "Day-in-the-life Story: morning routine → builds → shipping → done", "Behind the Scenes"],
                    ["Wed", "IG Carousel", "\"NH35 vs NH36 vs VK63 — which movement is right for you?\"", "Education"],
                    ["Thu", "IG Reel", "Lume shot photography — dark room, UV charge, slow reveal", "Finished Reveals"],
                    ["Fri", "IG Feed", "\"Monthly recap: X watches built, X shipped, X reviews\" + CTA", "Social Proof"],
                  ]}
                />
                <p className="mt-3 text-sm text-[#888]"><strong className="text-white">Realistic time commitment:</strong> 4-5 hours/week total for watch content — filming (2 hrs on Sunday), editing and captioning (1.5 hrs), and scheduling (30 min). Buffer ($12/mo) handles scheduling. Daily Stories are quick phone snaps during the workday and don&apos;t count toward this total.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Email Flows — Actual Copy, Ready to Send">
                <p className="mb-4">These run on Resend (free for 100 emails/day) or Klaviyo (free up to 500 contacts). Copy is written — just plug it in:</p>

                <div className="space-y-5">
                  <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-[#7c5cfc]">1.</span>
                      <span className="text-base font-semibold text-white">Welcome Email (triggers on signup)</span>
                    </div>
                    <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                      <div className="text-[#7c5cfc] mb-1">Subject: Welcome to [Brand] — here&apos;s what we build</div>
                      <div className="text-[#888] mt-3">
                        Hey {`{first_name}`},<br /><br />
                        Welcome. I&apos;m Owen — I&apos;ve built over 700 custom watches by hand, one at a time, from my workshop.<br /><br />
                        Every watch starts with a genuine Seiko NH35 automatic movement and gets built to your exact specs — dial, hands, bezel, crystal, strap. Your design, my craftsmanship.<br /><br />
                        <strong className="text-white">Here&apos;s what to check out:</strong><br />
                        → Browse the ready-to-ship collection ($299)<br />
                        → Design your own with the configurator ($549+)<br />
                        → Read what 50+ customers have to say<br /><br />
                        Questions? Just reply to this email — it comes straight to me.<br /><br />
                        — Owen
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-[#7c5cfc]">2.</span>
                      <span className="text-base font-semibold text-white">Abandoned Cart — 1 Hour (triggers on cart abandonment)</span>
                    </div>
                    <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                      <div className="text-[#7c5cfc] mb-1">Subject: Your watch is still waiting</div>
                      <div className="text-[#888] mt-3">
                        Hey {`{first_name}`},<br /><br />
                        You were designing something great — looks like you didn&apos;t finish checking out.<br /><br />
                        Your build: {`{product_name}`}<br />
                        Your total: {`{cart_total}`}<br /><br />
                        → Complete your order here<br /><br />
                        Every watch is hand-assembled and takes 7-14 days. The sooner you order, the sooner it&apos;s on your wrist.<br /><br />
                        — Owen
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-[#666]">Follow-up at 24hr adds social proof: &quot;700+ watches built, 50+ five-star reviews.&quot; Final at 72hr adds soft urgency: &quot;Parts for this build are limited — just checking if you still want me to hold them.&quot;</div>
                  </div>

                  <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-[#7c5cfc]">3.</span>
                      <span className="text-base font-semibold text-white">Post-Purchase Review Request (Day 14 after delivery)</span>
                    </div>
                    <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                      <div className="text-[#7c5cfc] mb-1">Subject: How&apos;s the watch? (quick favor)</div>
                      <div className="text-[#888] mt-3">
                        Hey {`{first_name}`},<br /><br />
                        You&apos;ve had your {`{product_name}`} for about two weeks now. How&apos;s it wearing?<br /><br />
                        I&apos;d really appreciate a quick review — it helps other people find my work and decide if a custom build is right for them.<br /><br />
                        → Leave a review here (takes 30 seconds)<br /><br />
                        Bonus: snap a wrist shot and tag @[brand] on Instagram — I&apos;ll repost the best ones every week.<br /><br />
                        Thanks for the support.<br /><br />
                        — Owen
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-[#666]">Day 30 follow-up: referral ask. &quot;Know someone who&apos;d love a custom watch? Send them our way and I&apos;ll give you $25 off your next build.&quot;</div>
                  </div>

                  <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-[#7c5cfc]">4.</span>
                      <span className="text-base font-semibold text-white">New Product Drop (manual trigger)</span>
                    </div>
                    <p className="text-sm text-[#999]">Email + SMS blast when new watch designs or archery parts launch. Subject line formula: &quot;New drop: [Product Name] — [quantity] available&quot;. Body: hero photo, 2-sentence description, price, direct buy link. Keep it short — drops are about urgency, not education.</p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-[#7c5cfc]/5 border border-[#7c5cfc]/10">
                  <div className="text-xs font-semibold text-[#7c5cfc] mb-2">EMAIL ROI BENCHMARK</div>
                  <p className="text-sm text-[#999]">Email marketing returns <strong className="text-white">$36-$42 for every $1 spent</strong><SourceTag source="Litmus 2024" /> for DTC brands. Automated flows generate <strong className="text-white">30x more revenue per recipient</strong><SourceTag source="Klaviyo 2024 Benchmark" /> than standard campaigns. With Owen&apos;s 700 existing customers, even a basic welcome + abandoned cart flow could generate $500-$2,000/month in recovered revenue.</p>
                </div>
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ OPERATIONS & FULFILLMENT ═══ */}
        <section id="operations" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Package} label="Section 7" title="Operations & Fulfillment" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="Fulfillment Workflow">
                <p className="mb-4">Two different pipelines for two different products. Both are automated from payment to notification — Owen&apos;s only manual steps are making the product and handing it to USPS.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-[#141420] border border-white/[0.06]">
                    <Watch size={18} className="text-[#7c5cfc] mb-2" />
                    <div className="text-base font-bold text-white mb-3">Watch Fulfillment</div>
                    <div className="space-y-2.5">
                      {[
                        "Order received (Stripe → admin portal)",
                        "Auto-confirmation email to customer",
                        "Queue build (assign to next slot)",
                        "Source/stage parts from inventory",
                        "Assembly (45-75 min per watch)",
                        "QC check (see checklist below)",
                        "Photograph (2-3 shots for customer + portfolio)",
                        "Package (box, warranty card, care guide)",
                        "Print label (Pirate Ship → USPS Priority)",
                        "Upload tracking → auto-email to customer",
                      ].map((f, i) => (
                        <div key={i} className="flex gap-2 text-sm text-[#999]"><span className="text-[#7c5cfc] flex-shrink-0">{i + 1}.</span><span>{f}</span></div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-[#555]">Total time per order: ~60-90 min (assembly) + 15 min (QC, photo, pack, ship)</div>
                  </div>
                  <div className="p-5 rounded-xl bg-[#141420] border border-white/[0.06]">
                    <Printer size={18} className="text-[#4ade80] mb-2" />
                    <div className="text-base font-bold text-white mb-3">Archery Fulfillment</div>
                    <div className="space-y-2.5">
                      {[
                        "Order received (Stripe → admin portal)",
                        "Auto-confirmation email to customer",
                        "Queue print job",
                        "Print (1-4 hours depending on part)",
                        "Remove supports, trim, sand if needed",
                        "QC inspection (see checklist below)",
                        "Package (poly mailer, padding, sticker)",
                        "Print label (Pirate Ship → USPS First Class)",
                        "Upload tracking → auto-email to customer",
                      ].map((f, i) => (
                        <div key={i} className="flex gap-2 text-sm text-[#999]"><span className="text-[#4ade80] flex-shrink-0">{i + 1}.</span><span>{f}</span></div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-[#555]">Total time per order: 1-4 hrs (print, mostly unattended) + 10 min (QC, pack, ship)</div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Returns & Refund Policy">
                <p className="mb-4">Clear policies set expectations and prevent disputes. Put this on the site footer and in the checkout flow:</p>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[#1a1a2e] border-l-4 border-l-[#7c5cfc]">
                    <div className="text-white font-semibold text-sm mb-1">Stock Watches — 30-Day Returns</div>
                    <div className="text-[#999] text-sm">Unused, unworn stock watches can be returned within 30 days for a full refund. Customer pays return shipping. Watch must be in original condition with all packaging.</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1a1a2e] border-l-4 border-l-[#facc15]">
                    <div className="text-white font-semibold text-sm mb-1">Custom Watches — No Returns (Defects Covered)</div>
                    <div className="text-[#999] text-sm">Custom builds are made to order and are non-returnable. Manufacturing defects (movement failure, misaligned components, water ingress within warranty) are covered for 6 months — Owen repairs or replaces free of charge.</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1a1a2e] border-l-4 border-l-[#4ade80]">
                    <div className="text-white font-semibold text-sm mb-1">Archery Parts — 14-Day Satisfaction Guarantee</div>
                    <div className="text-[#999] text-sm">If the part doesn&apos;t fit or doesn&apos;t meet expectations, return it within 14 days for a full refund or replacement. Defective parts are replaced immediately at no cost — just email a photo of the defect.</div>
                  </div>
                </div>
                <AlertBox type="info">
                  Clear language on the product page: &quot;Custom watches are made to your specifications and cannot be returned. Stock watches have a 30-day return window. All watches carry a 6-month warranty against manufacturing defects.&quot;
                </AlertBox>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Customer Service Response Templates" defaultOpen={false}>
                <p className="mb-4">Copy-paste responses for the 5 most common inquiries. Owen customizes the brackets and sends — 30 seconds per reply instead of 5 minutes:</p>
                <div className="space-y-4">
                  <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                    <div className="text-[#7c5cfc] mb-1">Order Status Inquiry</div>
                    <div className="text-[#888]">Hey {`{name}`} — your order is currently {`{status}`}. {`{if building: \"I'm working on it now and expect to ship by {date}.\"}`} {`{if shipped: \"Tracking: {tracking_link}. Should arrive by {date}.\"}`} Let me know if you need anything else!</div>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                    <div className="text-[#7c5cfc] mb-1">Custom Watch Quote</div>
                    <div className="text-[#888]">Hey {`{name}`} — thanks for reaching out about a custom build! Based on what you described, I&apos;d recommend {`{case + dial + movement combo}`}. That would run {`{price}`} with a {`{timeline}`} build time. You can see similar builds in my portfolio at {`{site_link}`}, or try the configurator to play with options. Want me to put together a detailed quote?</div>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                    <div className="text-[#7c5cfc] mb-1">Shipping Delay</div>
                    <div className="text-[#888]">Hey {`{name}`} — heads up, your order is running a few days behind schedule. {`{reason: parts delay / printer queue / QC redo}`}. New estimated ship date: {`{date}`}. I want to make sure everything is perfect before it goes out. Sorry for the wait — I&apos;ll send tracking as soon as it ships.</div>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                    <div className="text-[#7c5cfc] mb-1">Return / Exchange</div>
                    <div className="text-[#888]">Hey {`{name}`} — sorry to hear that. {`{if defect: \"That shouldn't have passed QC — I'll send a replacement right away. No need to return the original.\"}`} {`{if return: \"No problem. Ship it back to [address] and I'll issue a full refund within 5 business days of receiving it.\"}`} Let me know how you&apos;d like to proceed.</div>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-lg p-4 text-sm font-mono leading-relaxed">
                    <div className="text-[#7c5cfc] mb-1">Post-Delivery Check-In</div>
                    <div className="text-[#888]">Hey {`{name}`} — just checking in. How&apos;s the {`{product}`} working out? If you have a sec, a quick review would really help out — {`{review_link}`}. And if you snap any photos, tag me on Instagram @{`{handle}`}. Thanks again for the support!</div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Customer Service SLA & Payment Disputes">
                <div className="text-xs font-semibold text-[#7c5cfc] mb-3 tracking-widest">RESPONSE TIME TARGETS</div>
                <DataTable
                  headers={["Channel", "Target Response Time", "Notes"]}
                  rows={[
                    ["Email / site contact form", "Within 24 hours (weekday)", "Auto-acknowledge immediately, Owen follows up"],
                    ["Facebook Messenger", "<60 seconds (ManyChat)", "Automated first response, Owen follows up within 24 hrs"],
                    ["Weekend inquiries", "Within 48 hours", "Set expectations in auto-reply: \"Back on Monday\""],
                    ["Urgent (defect/safety)", "Same day", "Prioritize over everything — ship replacement immediately"],
                  ]}
                />

                <div className="text-xs font-semibold text-[#f87171] mb-3 mt-6 tracking-widest">DEFECT & REPLACEMENT POLICY</div>
                <Bullet><strong className="text-white">Ship the replacement immediately</strong> — don&apos;t wait for the return. At $2-4 archery COGS or ~$115-190 watch parts cost, a replacement is always cheaper than a negative review or chargeback.</Bullet>
                <Bullet><strong className="text-white">Don&apos;t argue with customers.</strong> If they say it&apos;s defective, it&apos;s defective. Replace it. The customer lifetime value far exceeds the cost of one replacement part.</Bullet>

                <div className="text-xs font-semibold text-[#facc15] mb-3 mt-6 tracking-widest">STRIPE CHARGEBACK PROCESS</div>
                <NumberedStep n={1} title="Respond Within 7 Days">Stripe emails Owen when a chargeback is filed. Owen has 7 days to submit evidence. Do not ignore this — ignored chargebacks are auto-lost.</NumberedStep>
                <NumberedStep n={2} title="Submit Evidence">Upload: order confirmation email, shipping tracking showing delivery, any customer communication, product photos. Stripe provides a submission form.</NumberedStep>
                <NumberedStep n={3} title="Prevention Is Better">Most chargebacks come from: (a) customer doesn&apos;t recognize the charge — use a clear statement descriptor in Stripe, (b) product never arrived — always use tracking, (c) product was defective — handle defect reports fast before they escalate.</NumberedStep>

                <div className="text-xs font-semibold text-[#7c5cfc] mb-3 mt-6 tracking-widest">MONTHLY CS METRICS TO TRACK</div>
                <DataTable
                  headers={["Metric", "Target", "Action if Missed"]}
                  rows={[
                    ["Avg response time", "<24 hours", "Set up more auto-replies or dedicate time block"],
                    ["Chargeback rate", "<0.5%", "Review statement descriptor, add tracking to all orders"],
                    ["Review score", "4.5+ stars", "Contact unhappy customers directly, offer resolution"],
                    ["Defect/return rate", "<3%", "Audit QC process, identify root cause"],
                  ]}
                />
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Shipping Setup Checklist">
                <Bullet><strong className="text-white">Pirate Ship (free):</strong> Connects to USPS and UPS at commercial rates. Saves 20-40% vs retail postage. Print labels from any computer — no special hardware needed to start.</Bullet>
                <Bullet><strong className="text-white">USPS First Class (archery):</strong> $4-$8 for packages under 1 lb. Most archery parts qualify. 3-5 business day delivery.</Bullet>
                <Bullet><strong className="text-white">USPS Priority (watches):</strong> $8-$15 for small flat rate boxes. 1-3 business day delivery. Includes $100 insurance — add extra coverage for watches over $300 (~$2-3 per package).</Bullet>
                <Bullet><strong className="text-white">Label printer (optional):</strong> Rollo or MUNBYN (~$150-$200). Not needed at low volume — print labels on regular paper. Buy when doing 5+ shipments/day.</Bullet>
                <Bullet><strong className="text-white">Packaging supplies:</strong> Poly mailers for archery ($0.15-$0.30 each in bulk). Small branded boxes for watches ($1.50-$3.00 each). Branded stickers ($50 for 500). Tissue paper + thank-you card inserts.</Bullet>
                <Bullet><strong className="text-white">Free shipping threshold:</strong> Offer free shipping on archery orders over $75 to increase average order value. Watches always charge actual shipping (customer expects it for a $300+ item).</Bullet>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Inventory Management">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-[#141420] border border-white/[0.06]">
                    <Watch size={16} className="text-[#7c5cfc] mb-2" />
                    <div className="text-sm font-bold text-white mb-2">Watch Parts</div>
                    <div className="space-y-1.5 text-sm text-[#999]">
                      <div>Maintain 2-3 weeks buffer on core components</div>
                      <div>NH35 movements: order in batches of 10-25 ($35-50 each)</div>
                      <div>Standardize on 2-3 case types to reduce SKU complexity</div>
                      <div>Reorder when stock drops below 5 units of any component</div>
                      <div>Track in admin portal — auto-deduct on order creation</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#141420] border border-white/[0.06]">
                    <Printer size={16} className="text-[#4ade80] mb-2" />
                    <div className="text-sm font-bold text-white mb-2">Archery Parts</div>
                    <div className="space-y-1.5 text-sm text-[#999]">
                      <div>Pre-print 20-30 units of top 5 SKUs as buffer stock</div>
                      <div>Total buffer inventory cost: ~$50-$100</div>
                      <div>Filament: keep 2 spare spools minimum ($20-$35 each)</div>
                      <div>Restock when buffer drops below 5 units per SKU</div>
                      <div>Track in admin portal — print-on-demand for non-buffer SKUs</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#888]">The admin portal shows real-time inventory counts for both businesses. When an order is placed, stock auto-deducts. When it drops below the minimum, Owen gets an email alert. No more Excel spreadsheet.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Owen's Time Budget">
                <p className="mb-4">A realistic breakdown of Owen&apos;s weekly time commitment as both businesses scale. These numbers come from the fulfillment workflows and content calendars above.</p>
                <DataTable
                  headers={["Activity", "Hours/Week (Month 3)", "Hours/Week (Month 6)"]}
                  rows={[
                    ["Watch assembly (15-20 watches)", "15-20", "15-20"],
                    ["Archery printing + QC (50-150 parts)", "5-8", "10-15"],
                    ["Content filming + editing (both brands)", "5", "7-8"],
                    ["Packaging + shipping", "4-5", "6-8"],
                    ["Customer messages + CS", "3-4", "4-5"],
                    ["Admin, ordering, inventory", "2-3", "2-3"],
                    ["**Total**", "**34-45**", "**44-59**"],
                  ]}
                />
                <AlertBox type="warning" title="Month 6 Warning: Approaching 60-Hour Weeks">
                  At Month 6 volumes, Owen is at 44-59 hours/week with no buffer for unexpected issues. This is the trigger point for hiring a part-time assistant ($15-20/hr, 15-20 hrs/week) to handle packaging, shipping, and basic customer messages. The Phase 4 roadmap flags this at the $15K/month revenue mark. Until then, the priority is automation — every hour saved through software is an hour Owen keeps for building and designing.
                </AlertBox>
                <p className="mt-3 text-sm text-[#888]">These estimates assume current automation (admin portal, auto-emails, order tracking). Without automation, add 10-15 hours/week of manual admin. The systems we&apos;re building aren&apos;t nice-to-have — they&apos;re the difference between a sustainable business and burnout.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="QC Checklists">
                <p className="mb-4">Every product gets inspected before shipping. These checklists are built into the admin portal as a required step before marking an order as &quot;Ready to Ship.&quot;</p>
                <div className="text-xs font-semibold text-[#7c5cfc] mb-3 tracking-widest">WATCH QC — EVERY UNIT</div>
                <DataTable
                  headers={["Check", "Method", "Pass Criteria"]}
                  rows={[
                    ["Crown operation", "Manual test", "Smooth winding, secure screw-down (if applicable)"],
                    ["Time accuracy", "24-hour wear test", "Within +/- 20 seconds per day"],
                    ["Water resistance", "Pressure tester (Phase 3+)", "Hold at 5 ATM for 30 seconds, no moisture"],
                    ["Lume application", "UV charge + dark room", "Even glow, no gaps or smudges"],
                    ["Dial alignment", "Visual inspection with loupe", "Indices align with chapter ring, no dust under crystal"],
                    ["Bezel action", "Rotation test", "120-click unidirectional, smooth, no play"],
                    ["Caseback seal", "Visual + hand pressure", "Flush, gasket visible, no gaps"],
                    ["Strap/bracelet", "Clasp test", "Secure closure, no scratches, correct size"],
                  ]}
                />
                <div className="text-xs font-semibold text-[#4ade80] mb-3 mt-6 tracking-widest">ARCHERY QC — EVERY UNIT</div>
                <DataTable
                  headers={["Check", "Method", "Pass Criteria"]}
                  rows={[
                    ["Layer adhesion", "Visual + flex test", "No delamination, no visible layer separation"],
                    ["Dimensional accuracy", "Calipers", "Within 0.2mm of design spec"],
                    ["Fit test", "Mount on test equipment", "Secure mount, no wobble, correct alignment"],
                    ["Stress test", "Apply 2x expected load", "No cracking, no deformation, springs back"],
                    ["Surface finish", "Visual inspection", "No stringing, no blobs, clean edges, smooth contact surfaces"],
                    ["Threading (if applicable)", "Thread fastener", "Smooth engagement, no cross-threading"],
                  ]}
                />
                <p className="mt-3 text-sm text-[#888]">If any check fails, the part is rejected. Watches get reworked. Archery parts get reprinted — at $2-4 COGS, it&apos;s cheaper to reprint than to risk a negative review.</p>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Business Setup: Legal, Tax & Entity">
                <p className="mb-4">Not glamorous, but essential. Owen needs to do these <strong className="text-white">before taking the first archery order</strong> — or at minimum, before running paid ads:</p>
                <NumberedStep n={1} title="Form an LLC (~$50-$200)">File in Owen&apos;s state. Protects personal assets from business liability. If a 3D-printed part fails and someone sues, they sue the LLC, not Owen personally. Takes 15 minutes online.</NumberedStep>
                <NumberedStep n={2} title="Get an EIN (free)">IRS.gov, takes 5 minutes. Needed for the business bank account and tax filing. It&apos;s a business Social Security number.</NumberedStep>
                <NumberedStep n={3} title="Open a Business Bank Account">Keep business money separate from personal. Chase, Mercury, or Relay all offer free business checking. All Stripe payouts go here.</NumberedStep>
                <NumberedStep n={4} title="Register for Sales Tax">Register in Owen&apos;s state. Collect sales tax on in-state orders. For out-of-state: most states require collection after $100K in sales or 200 transactions (economic nexus). Use TaxJar ($19/mo) once volume justifies it, or manually file quarterly.</NumberedStep>
                <NumberedStep n={5} title="Product Liability Insurance (~$2,500-$8,000/year)">Essential for archery parts, good practice for watches. Covers legal defense and damages if a product causes injury. Standard carriers (Thimble, Next Insurance) start at $500-$1,000/year but may not cover sporting goods adequately. For archery specifically, use specialty brokers: Veracity Insurance Solutions (covers both 3D printing and sporting goods) or Sadler Sports &amp; Recreation Insurance. Budget $2,500-$8,000/year. This is non-negotiable for archery.</NumberedStep>
                <NumberedStep n={6} title="Register Domains">One for each brand. Buy through Namecheap or Cloudflare ($10-$15/year each). Point DNS to Vercel.</NumberedStep>
                <NumberedStep n={7} title="Business Email">Google Workspace ($6/mo) or Zoho Mail (free tier). owen@[watchbrand].com and owen@[archerybrand].com. Professional emails build trust.</NumberedStep>

                <DataTable
                  headers={["Item", "Cost", "Frequency"]}
                  rows={[
                    ["LLC formation", "$50–$200", "One-time"],
                    ["EIN", "$0", "One-time"],
                    ["Business bank account", "$0", "Ongoing (free)"],
                    ["Product liability insurance", "$2,500–$8,000", "Annual"],
                    ["Domains (x2)", "$20–$30", "Annual"],
                    ["Business email", "$0–$72", "Annual"],
                    ["**Total setup**", "**$2,570–$8,300**", "**Year 1 total**"],
                  ]}
                />
                <AlertBox type="warning" title="This Is the Cost of Being a Legitimate, Insured Business">
                  Total annual cost: ~$2,570-$8,300, with insurance being the largest line item. That&apos;s 5-15 custom watch sales per year — significant but non-negotiable. Product liability insurance is what protects Owen personally if a 3D-printed archery part fails. The LLC + insurance combination is the foundation everything else builds on.
                </AlertBox>
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ ROADMAP ═══ */}
        <section id="roadmap" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Map} label="Section 8" title="Phased Roadmap" /></FadeIn>
          <div className="max-w-3xl space-y-6">

            {/* ─── PHASE 1 DETAILED BREAKDOWN ─── */}
            <FadeIn>
              <div className="bg-[#141420] rounded-xl border border-white/[0.06] overflow-hidden mb-6">
                <div className="p-5 sm:p-6 border-b border-white/[0.06]" style={{ borderLeftWidth: 4, borderLeftColor: "#4ade80" }}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#4ade80]">PHASE 1</span>
                    <span className="text-sm text-[#555]">March 17-30, 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Archery Site Live</h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div><span className="text-[#666]">Investment: </span><span className="text-white font-medium">~$0-$20 (hosting/domain)</span></div>
                    <div><span className="text-[#666]">Expected: </span><span className="font-medium text-[#4ade80]">Archery site accepting orders</span></div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="text-xs font-semibold text-[#4ade80] mb-4 tracking-widest">DAY-BY-DAY EXECUTION PLAN</div>
                  <div className="space-y-3">
                    {[
                      { day: "Day 1-2", hamza: "Scaffold archery site: Next.js project, Supabase DB schema (products, orders, customers), Stripe integration, Vercel deployment.", owen: "Finalize first 5 SKUs. Start photographing parts — white background, multiple angles, one \"in use\" shot each. Write 2-3 sentence descriptions per part.", dep: "" },
                      { day: "Day 3-4", hamza: "Build product catalog pages with search/filter. Build cart + Stripe checkout flow. Set up admin portal (order list, status updates, fulfillment tracking).", owen: "Deliver all 5 product photos + descriptions to Hamza. Register domain. Set up business email.", dep: "Owen's photos needed by end of Day 4" },
                      { day: "Day 5-6", hamza: "Integrate product data. Build order confirmation emails (Resend). Add review/testimonial display. QA and bug fixes across devices.", owen: "Test checkout flow with a real $1 test purchase. Review all product pages for accuracy. Prep 10-20 units of each SKU.", dep: "Site ready for Owen to test by Day 5" },
                      { day: "Day 7", hamza: "Deploy to production. Set up Vercel Analytics. Connect domain. Final QA pass.", owen: "Send site link to 5-10 people in dad's archery network for soft launch feedback.", dep: "Both review together before going live" },
                      { day: "Day 8-10", hamza: "Fix any issues from soft launch feedback. Add Meta Pixel. Set up Google Analytics. Build basic SEO (meta tags, product schema).", owen: "Post in 2-3 archery communities (Reddit, ArcheryTalk, Facebook Group). Share product, ask for honest feedback. NOT a sales pitch — genuine community engagement.", dep: "" },
                      { day: "Day 11-14", hamza: "Iterate based on first-week data. Start watch site planning/wireframes. Set up order notification system (email to Owen when order comes in).", owen: "Fulfill first orders. Document the print → package → ship process (take photos for future content). Collect first reviews.", dep: "First real orders expected this week" },
                    ].map((row, i) => (
                      <div key={i} className="bg-[#1a1a2e] rounded-lg p-4 border border-white/[0.04]">
                        <div className="text-sm font-bold text-[#4ade80] mb-2">{row.day}</div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <div className="text-[10px] font-semibold text-[#7c5cfc] tracking-widest mb-1">HAMZA</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.hamza}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-[#facc15] tracking-widest mb-1">OWEN</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.owen}</div>
                          </div>
                        </div>
                        {row.dep && <div className="mt-2 text-xs text-[#f87171]"><strong>Dependency:</strong> {row.dep}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ─── PHASE 2 DETAILED BREAKDOWN ─── */}
            <FadeIn>
              <div className="bg-[#141420] rounded-xl border border-white/[0.06] overflow-hidden mb-6">
                <div className="p-5 sm:p-6 border-b border-white/[0.06]" style={{ borderLeftWidth: 4, borderLeftColor: "#7c5cfc" }}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#7c5cfc]">PHASE 2</span>
                    <span className="text-sm text-[#555]">March 31 – April 27, 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Watch Site + ManyChat Setup</h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div><span className="text-[#666]">Investment: </span><span className="text-white font-medium">~$0-$20/mo + domain + $44/mo ManyChat</span></div>
                    <div><span className="text-[#666]">Expected: </span><span className="font-medium text-[#7c5cfc]">Watch site live with configurator + automated Messenger</span></div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="text-xs font-semibold text-[#7c5cfc] mb-4 tracking-widest">WEEK-BY-WEEK EXECUTION PLAN</div>
                  <div className="space-y-3">
                    {[
                      { week: "Week 3", hamza: "Scaffold watch site: product catalog pages, stock collection with hero images and pricing. Set up Supabase schema for watch products, customer accounts, orders.", owen: "Photograph ALL component inventory — every dial, case, bezel, crystal, strap. White background, multiple angles. This is the configurator's raw material.", dep: "Owen's photos needed by end of Week 3 — this blocks the configurator" },
                      { week: "Week 4", hamza: "Build watch configurator MVP: option selectors for each component (case, dial, hands, bezel, crystal, strap) with reference photos. Price updates dynamically. Stripe checkout integration.", owen: "Identify 5-10 best-selling designs for the stock collection. Write product descriptions. Provide parts list + pricing for each stock watch and all configurator options.", dep: "Parts list needed by mid-week to finalize configurator pricing" },
                      { week: "Week 5", hamza: "Set up ManyChat Pro + AI ($44/mo). Build qualification flow using the script from Growth section. Configure webhook to admin portal. Install Meta Pixel + Conversions API on watch site.", owen: "Create Facebook Business Page for the watch brand. Switch Marketplace listings from personal profile to Business Page. Test ManyChat flow with a friend's account.", dep: "Business Page must be created before ManyChat can connect" },
                      { week: "Week 6", hamza: "Build Resend email flows (Welcome, Abandoned Cart, Post-Purchase) using the copy from Growth section. Import Facebook reviews as site testimonials. Full QA pass across devices.", owen: "Screenshot and export all 50+ Facebook reviews. Test checkout flow with a real $1 purchase. Review every product page for accuracy. Share site with 5-10 existing customers for feedback.", dep: "Both review site together before public launch" },
                    ].map((row, i) => (
                      <div key={i} className="bg-[#1a1a2e] rounded-lg p-4 border border-white/[0.04]">
                        <div className="text-sm font-bold text-[#7c5cfc] mb-2">{row.week}</div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <div className="text-[10px] font-semibold text-[#7c5cfc] tracking-widest mb-1">HAMZA</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.hamza}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-[#facc15] tracking-widest mb-1">OWEN</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.owen}</div>
                          </div>
                        </div>
                        {row.dep && <div className="mt-2 text-xs text-[#f87171]"><strong>Dependency:</strong> {row.dep}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ─── PHASE 3 DETAILED BREAKDOWN ─── */}
            <FadeIn>
              <div className="bg-[#141420] rounded-xl border border-white/[0.06] overflow-hidden mb-6">
                <div className="p-5 sm:p-6 border-b border-white/[0.06]" style={{ borderLeftWidth: 4, borderLeftColor: "#818cf8" }}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#818cf8]">PHASE 3</span>
                    <span className="text-sm text-[#555]">May – July 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Launch Ads & Scale</h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div><span className="text-[#666]">Investment: </span><span className="text-white font-medium">$1,000-$2,500/mo (ads + software)</span></div>
                    <div><span className="text-[#666]">Expected: </span><span className="font-medium text-[#818cf8]">Paid traffic driving consistent orders to both sites</span></div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="text-xs font-semibold text-[#818cf8] mb-4 tracking-widest">FIRST 30 DAYS OF ADS — EXECUTION PLAN</div>
                  <NumberedStep n={1} title="Days 1-3: Infrastructure">Install Meta Pixel + Conversions API (if not done in Phase 2). Set up Events Manager. Create ad account. Upload customer email list (700 watch customers) for Lookalike audiences. Configure standard events: ViewContent, AddToCart, InitiateCheckout, Purchase.</NumberedStep>
                  <NumberedStep n={2} title="Days 4-7: Launch Test Campaigns">Create 3 initial campaigns per the First-Week Ad Spend Plan above. $500 total first week. 3 creatives per ad set. Start with UGC build video, testimonial compilation, and configurator demo. <strong className="text-white">Do NOT touch anything for the first 48 hours</strong> — let the algorithm learn.</NumberedStep>
                  <NumberedStep n={3} title="Days 8-14: Learning Phase">Monitor daily: CTR, CPM, CPC, ROAS. Kill any individual creative with CTR &lt; 0.8% after $30 spend. Kill any ad set with zero purchases after $75 spend. The algorithm needs ~50 events to exit learning phase — be patient.</NumberedStep>
                  <NumberedStep n={4} title="Days 15-21: Scale Winners">Increase daily budget by 20% on any ad set with ROAS &gt; 2.5x. Pause underperformers. Create 1% Lookalike audience from the customer email list — this becomes the primary scaling audience. Launch archery ads if validation sprint was successful.</NumberedStep>
                  <NumberedStep n={5} title="Days 22-30: Retargeting + Assessment">Launch retargeting campaigns: cart abandoners (7-day window), product page viewers (14-day window). First month assessment: total spend, total revenue, blended ROAS, CAC by channel. If blended ROAS &gt; 2x, increase Month 2 budget by 50%. If &lt; 1.5x, diagnose before scaling.</NumberedStep>

                  <div className="p-4 rounded-lg bg-[#1a1a2e] text-sm mt-4">
                    <span className="text-[#666]">Owen&apos;s role: </span>
                    <span className="text-white font-medium">Film 3 new ad creatives per week (phone, 15-30 seconds each). Fulfill all orders. Report any customer feedback that could improve targeting or creative.</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ─── PHASE 4A: CONSOLIDATE & OPTIMIZE ─── */}
            <FadeIn>
              <div className="bg-[#141420] rounded-xl border border-white/[0.06] overflow-hidden mb-6">
                <div className="p-5 sm:p-6 border-b border-white/[0.06]" style={{ borderLeftWidth: 4, borderLeftColor: "#4ade80" }}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#4ade80]">PHASE 4A</span>
                    <span className="text-sm text-[#555]">August – September 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Consolidate & Optimize</h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div><span className="text-[#666]">Investment: </span><span className="text-white font-medium">Revenue-funded — optimize existing spend</span></div>
                    <div><span className="text-[#666]">Expected: </span><span className="font-medium text-[#4ade80]">$8-10K/month combined net profit</span></div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="space-y-3">
                    {[
                      { period: "Month 5", hamza: "Deep-dive analytics review: which products sell best, which ads convert, which email flows drive revenue. A/B test landing pages. Optimize site speed. Build Lookalike audiences from the now 100+ customer list.", owen: "Audit time budget — is he under 50 hrs/week? Review which archery SKUs sell vs. collect dust. Retire slow movers, double down on winners. Film 3 new ad creatives based on top-performing formats." },
                      { period: "Month 6", hamza: "Implement findings from Month 5 analytics. Upgrade watch configurator if conversion data supports it. Build referral program infrastructure ($25 credit per referral). Set up affiliate/creator tracking.", owen: "Consider second 3D printer if archery demand justifies it ($300-$800). Test 2-3 new archery SKUs based on customer feedback. Start YouTube channel (even 1 video/week builds long-term organic traffic)." },
                    ].map((row, i) => (
                      <div key={i} className="bg-[#1a1a2e] rounded-lg p-4 border border-white/[0.04]">
                        <div className="text-sm font-bold text-[#4ade80] mb-2">{row.period}</div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <div className="text-[10px] font-semibold text-[#7c5cfc] tracking-widest mb-1">HAMZA</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.hamza}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-[#facc15] tracking-widest mb-1">OWEN</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.owen}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ─── PHASE 4B: SCALE & DIVERSIFY ─── */}
            <FadeIn>
              <div className="bg-[#141420] rounded-xl border border-white/[0.06] overflow-hidden mb-6">
                <div className="p-5 sm:p-6 border-b border-white/[0.06]" style={{ borderLeftWidth: 4, borderLeftColor: "#818cf8" }}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#818cf8]">PHASE 4B</span>
                    <span className="text-sm text-[#555]">October – December 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Scale & Diversify</h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div><span className="text-[#666]">Investment: </span><span className="text-white font-medium">Scale ad spend from profits + potential assistant hire</span></div>
                    <div><span className="text-[#666]">Expected: </span><span className="font-medium text-[#818cf8]">$12-18K/month combined net profit</span></div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-sm text-[#999] mb-4">Phase 4B is milestone-driven. Each action unlocks at a specific revenue level:</p>
                  <DataTable
                    headers={["Revenue Trigger", "Action", "Investment", "Expected Impact"]}
                    accent
                    rows={[
                      ["**$8K/mo combined**", "Buy second 3D printer. Launch referral program for watch customers ($25 credit per referral).", "$300-$800 (printer)", "Double archery capacity, 10-15% new watch customers from referrals"],
                      ["**$12K/mo combined**", "Upgrade watch configurator to V2 (layered image compositing). Start YouTube channel for both brands.", "Dev time only", "Higher watch conversion rate, long-term organic traffic from YouTube"],
                      ["**$15K/mo combined**", "Hire part-time assistant for packaging, shipping, and CS ($15-$20/hr, 15-20 hrs/week). Expand archery catalog to 20+ SKUs.", "$1,200-$1,600/mo", "Free Owen's time for builds and design, test broader archery market"],
                    ]}
                  />
                  <div className="space-y-3 mt-4">
                    {[
                      { period: "Months 7-9", hamza: "Scale winning ad campaigns (increase budget 20%/week on ROAS > 3x). Explore Google Shopping ads for archery (high-intent buyer traffic). Build wholesale inquiry form for pro shops. Validate LTV assumptions with real data.", owen: "Onboard part-time assistant (if $15K trigger hit). Delegate packaging, shipping, and basic CS. Owen focuses on: watch builds, archery design, and content creation. Expand archery catalog based on sales data — target 20+ SKUs." },
                    ].map((row, i) => (
                      <div key={i} className="bg-[#1a1a2e] rounded-lg p-4 border border-white/[0.04]">
                        <div className="text-sm font-bold text-[#818cf8] mb-2">{row.period}</div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <div className="text-[10px] font-semibold text-[#7c5cfc] tracking-widest mb-1">HAMZA</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.hamza}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-[#facc15] tracking-widest mb-1">OWEN</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.owen}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ─── PHASE 4C: C8 ASSESSMENT & FINAL PUSH ─── */}
            <FadeIn>
              <div className="bg-[#141420] rounded-xl border border-white/[0.06] overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-white/[0.06]" style={{ borderLeftWidth: 4, borderLeftColor: "#facc15" }}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#facc15]">PHASE 4C</span>
                    <span className="text-sm text-[#555]">January – March 2027</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">C8 Assessment & Final Push</h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <div><span className="text-[#666]">Target: </span><span className="text-white font-medium">$68K+ annual net profit locked in</span></div>
                    <div><span className="text-[#666]">Expected: </span><span className="font-medium text-[#facc15]">C8 territory — $20K+/month combined net</span></div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <DataTable
                    headers={["Revenue Trigger", "Action", "Investment", "Expected Impact"]}
                    accent
                    rows={[
                      ["**$20K/mo combined**", "Explore Amazon FBA for archery parts (wider distribution). Investigate wholesale/B2B for archery (pro shops, range suppliers).", "Amazon fees + FBA prep", "New sales channels without additional marketing spend"],
                      ["**$25K+/mo combined**", "Brand deals and influencer seeding (send watches/parts to creators). Consider international shipping. Owen buys the C8.", "Product cost only", "Brand awareness, new markets, C8 in the garage"],
                    ]}
                  />
                  <div className="space-y-3 mt-4">
                    {[
                      { period: "Months 10-12", hamza: "Full business review: LTV validation (do the 1.2x/2.0x assumptions hold?), CAC trends, channel profitability. Build 2027 scaling plan. Consider V3 features (AI previews, international shipping support).", owen: "Focus on what's working. If C8 is within reach, push volume on the highest-margin products. If not, diagnose the gap — is it volume, pricing, or CAC? Plan for Year 2: multiple printers, assistant team, expanded catalog." },
                    ].map((row, i) => (
                      <div key={i} className="bg-[#1a1a2e] rounded-lg p-4 border border-white/[0.04]">
                        <div className="text-sm font-bold text-[#facc15] mb-2">{row.period}</div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <div className="text-[10px] font-semibold text-[#7c5cfc] tracking-widest mb-1">HAMZA</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.hamza}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-[#facc15] tracking-widest mb-1">OWEN</div>
                            <div className="text-sm text-[#999] leading-relaxed">{row.owen}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-lg bg-[#1a1a2e] text-sm mt-4">
                    <span className="text-[#666]">Owen&apos;s role: </span>
                    <span className="text-white font-medium">Design new archery parts based on sales data. Build custom watches. Focus on the craft. The systems handle everything else.</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>


        {/* ═══ RISKS & KILL SWITCHES ═══ */}
        <section id="risks" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Shield} label="Section 9" title="Risks & Kill Switches" /></FadeIn>
          <div className="max-w-3xl space-y-4">
            <FadeIn>
              <Card title="What Could Go Wrong — And What We Do About It">
                <p className="mb-4">Every plan has failure modes. Here&apos;s what we&apos;ve identified and the specific response for each:</p>
                <div className="space-y-4">
                  {[
                    {
                      risk: "Archery Demand Doesn't Materialize",
                      probability: "Medium",
                      probColor: "#facc15",
                      impact: "High",
                      impactColor: "#f87171",
                      trigger: "Fewer than 20 archery orders in the first 60 days after site launch, despite community posting and the $50 test ad.",
                      response: "This is why the validation sprint exists BEFORE building the site. If the sprint fails (fewer than 50 email signups or fewer than 3 positive reviews), pivot the archery product catalog based on survey feedback before investing further. If the site launches and demand is weak: (1) survey the first buyers on what they actually want, (2) test different price points, (3) expand to adjacent niches (fishing, camping, tactical). Worst case: pause archery, double down on watches — the archery site cost nearly nothing to build.",
                      status: "Validation sprint designed to catch this early"
                    },
                    {
                      risk: "Seiko IP Escalation",
                      probability: "Medium",
                      probColor: "#facc15",
                      impact: "High",
                      impactColor: "#f87171",
                      trigger: "Seiko (or their lawyers) sends a cease-and-desist to Owen's current brand or social accounts.",
                      response: "This is why we're rebranding NOW, before scaling. The new brand uses \"Powered by Seiko NH35 movement\" language — which is factual and legal (like saying \"Intel Inside\"). No Seiko logos, no Seiko in the brand name. If a C&D arrives for the old brand, we've already moved. Legal consultation cost: $500-$1,000 for a one-time IP review.",
                      status: "Actively mitigating — rebrand is Phase 2"
                    },
                    {
                      risk: "Ad Spend Doesn't Convert",
                      probability: "Medium",
                      probColor: "#facc15",
                      impact: "Medium",
                      impactColor: "#facc15",
                      trigger: "ROAS drops below 2x for 2+ consecutive weeks after the initial learning period (first 2 weeks).",
                      response: "KILL SWITCH: Pause all ad spend immediately. Diagnose: creative fatigue? (swap creatives), audience wrong? (test new targeting), landing page issue? (check session recordings, A/B test). Do NOT keep spending hoping it improves. Fallback: Owen's organic Facebook Marketplace channel still works — ads are additive, not a replacement.",
                      status: "Kill switch defined — monitor weekly"
                    },
                    {
                      risk: "Cash Flow Crunch",
                      probability: "Low-Medium",
                      probColor: "#facc15",
                      impact: "High",
                      impactColor: "#f87171",
                      trigger: "Owen spending $1-3K/month on ads + $44/mo ManyChat + $100/mo software before new revenue catches up. Watch parts require upfront purchase.",
                      response: "Phase ads in slowly: start at $500/month (not $2,000). Only increase when ROAS is proven positive. Keep 2 months of ad spend as cash reserve before starting. The archery business is nearly zero upfront cost (filament only) — launch it first to generate cash flow before scaling watch ads.",
                      status: "Addressed by phased roadmap"
                    },
                    {
                      risk: "Owen Burns Out Running Two Businesses",
                      probability: "Medium",
                      probColor: "#facc15",
                      impact: "High",
                      impactColor: "#f87171",
                      trigger: "Owen is building watches, printing archery parts, filming content, answering messages, and shipping orders. 70+ hour weeks.",
                      response: "This is why automation is Phase 1, not Phase 4. ManyChat handles inquiries. The site handles orders. Email flows handle follow-ups. Admin portal handles tracking. Owen's role narrows to: build watches, print parts, ship orders, film 2 hours of content on Sundays. If it's still too much, prioritize the higher-margin business (archery) and slow-roll watches.",
                      status: "Automation-first approach mitigates this"
                    },
                    {
                      risk: "3D Printer Failure / Downtime",
                      probability: "Medium",
                      probColor: "#facc15",
                      impact: "Medium",
                      impactColor: "#facc15",
                      trigger: "Printer breaks down, needs parts, or produces a run of failed prints. Archery orders can't be fulfilled for days/weeks.",
                      response: "Keep 1-2 weeks of popular SKUs pre-printed as buffer stock. At $2-4 COGS per part, holding 50 units = $100-$200 in inventory. If demand justifies it (Phase 4), buy a second printer ($300-$800) — doubles capacity and eliminates single-point-of-failure. Set order page to show \"ships in 5-7 days\" not \"ships tomorrow\" to build in buffer.",
                      status: "Buffer stock strategy in Phase 1"
                    },
                    {
                      risk: "Facebook Marketplace Policy Change",
                      probability: "Low",
                      probColor: "#4ade80",
                      impact: "High",
                      impactColor: "#f87171",
                      trigger: "Facebook restricts reselling, bans Owen's account, or changes Marketplace algorithm to deprioritize his listings.",
                      response: "This is exactly why we're building owned channels (website, email list). The site + email list can't be taken away. Every Marketplace customer should be captured into the email list ASAP. Target: 300+ email subscribers by Month 3 — enough to sustain revenue independent of Facebook.",
                      status: "Owned channel strategy mitigates this"
                    },
                    {
                      risk: "Quality Issues at Volume (Watches)",
                      probability: "Low",
                      probColor: "#4ade80",
                      impact: "High",
                      impactColor: "#f87171",
                      trigger: "Rushing to fill more orders leads to QC failures — misaligned dials, gasket leaks, movement issues. Negative reviews start appearing.",
                      response: "Never sacrifice QC for volume. Owen does final QC on every watch, even when an assistant handles assembly. Invest in a pressure tester ($200-$500) by Phase 3 — it's a quality differentiator most modders skip. If reviews dip below 4.5 stars, pause volume growth and fix root cause.",
                      status: "QC checkpoint in every phase"
                    },
                    {
                      risk: "Archery Product Safety Incident",
                      probability: "Low",
                      probColor: "#4ade80",
                      impact: "Critical",
                      impactColor: "#f87171",
                      trigger: "A 3D-printed archery part fails in use, causing injury or equipment damage.",
                      response: "Prevent: use only engineering-grade materials for load-bearing parts, stress-test every design beyond normal conditions, include \"inspect before use\" disclaimers. Insure: product liability insurance ($2,500-$8,000/year through a specialty sporting goods broker like Veracity Insurance Solutions). Respond: if an incident occurs, immediately pull the affected SKU, contact the customer, offer full refund + replacement, and redesign the part. No amount of revenue is worth a safety failure.",
                      status: "Insurance + testing protocol in Phase 1"
                    },
                    {
                      risk: "Zapp Studios Engagement Changes",
                      probability: "Low",
                      probColor: "#4ade80",
                      impact: "Medium",
                      impactColor: "#facc15",
                      trigger: "Hamza's availability changes, Zapp Studios pivots, or the zero-cost development model ends.",
                      response: "Owen retains full ownership of all code, domains, and accounts. The sites run on Vercel/Supabase free tiers — they'll keep working without developer intervention. For changes, Owen can use Claude Code directly or hire a freelance Next.js developer (~$50-100/hr). The admin portal and automation (ManyChat, Stripe webhooks, email flows) continue running independently in Owen's own accounts.",
                      status: "Ownership structure ensures continuity"
                    },
                  ].map((risk, i) => (
                    <div key={i} className="bg-[#1a1a2e] rounded-xl p-5 border border-white/[0.04]">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-base font-bold text-white">{risk.risk}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ color: risk.probColor, borderColor: risk.probColor + "40" }}>Probability: {risk.probability}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ color: risk.impactColor, borderColor: risk.impactColor + "40" }}>Impact: {risk.impact}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-[#666]">Trigger: </span><span className="text-[#999]">{risk.trigger}</span></div>
                        <div><span className="text-[#666]">Response: </span><span className="text-[#ccc]">{risk.response}</span></div>
                        <div className="pt-1"><span className="text-xs text-[#4ade80]">{risk.status}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Monthly Health Check — The Dashboard We'll Watch" defaultOpen={false}>
                <p className="mb-4">Every month, Hamza and Owen review these metrics together. If any metric is in the red zone for 2+ months, we trigger the kill switch or pivot.</p>
                <DataTable
                  headers={["Metric", "Green (On Track)", "Yellow (Watch)", "Red (Act Now)"]}
                  accent
                  rows={[
                    ["Watch revenue", ">$7,000/mo", "$5,000-$7,000/mo", "<$5,000/mo"],
                    ["Archery revenue", "Growing 20%+ MoM", "Flat", "Declining"],
                    ["Ad ROAS (when running)", ">3x", "2-3x", "<2x → pause ads"],
                    ["Customer acquisition cost", "<$100 (watches)", "$100-$150", ">$150 → fix targeting"],
                    ["Email list size", "Growing 50+/mo", "Growing <50/mo", "Flat or declining"],
                    ["Review score", "4.5+ stars", "4.0-4.5", "<4.0 → pause growth, fix QC"],
                    ["Owen weekly hours", "<50 hrs/week", "50-60 hrs", ">60 hrs → automate more or slow down"],
                    ["Cash reserve", ">2 months expenses", "1-2 months", "<1 month → cut ad spend"],
                  ]}
                />
              </Card>
            </FadeIn>
          </div>
        </section>


        {/* ═══ FOOTER ═══ */}
        <footer className="px-5 sm:px-10 lg:px-16 py-16 text-center">
          <div className="text-[10px] font-bold tracking-[3px] text-[#7c5cfc] mb-2">ZAPP STUDIOS</div>
          <div className="text-sm text-[#555] mb-1">Revenue Engineering</div>
          <div className="text-xs text-[#333] mb-6">zappstudios.us</div>
          <div className="text-xs text-[#333] max-w-md mx-auto leading-relaxed">
            This playbook is a living document. Updated after every call as we execute and learn.
          </div>
          <button onClick={() => window.print()} className="mt-6 px-4 py-2 rounded-lg border border-white/[0.06] text-xs text-[#555] hover:text-white hover:border-white/[0.1] transition-colors cursor-pointer print:hidden">
            Print / Save as PDF
          </button>
        </footer>

      </main>

      {/* Print styles injected via global stylesheet */}
    </div>
  )
}
