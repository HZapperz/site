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

/* ─── NAV SECTIONS ─── */
const navSections = [
  { id: "summary", title: "The New Strategy", icon: Zap },
  { id: "watches", title: "Watch Business", icon: Watch },
  { id: "archery", title: "Archery Business", icon: Target },
  { id: "platform", title: "What We're Building", icon: Code2 },
  { id: "financial", title: "Financial Model", icon: Calculator },
  { id: "growth", title: "Growth Playbook", icon: TrendingUp },
  { id: "roadmap", title: "Roadmap", icon: Map },
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
                <p>At combined projections, Owen clears <strong className="text-white">$90-110K/year</strong> before ad spend. Even conservatively after $2-3K/month in ads and software, the C8 is well within reach by end of 2026.</p>
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
                <p>700+ lifetime sales, 50+ Facebook reviews, 3 years of established reputation. The foundation is solid — <strong className="text-white">the problem is pricing, channel, and process, not product quality.</strong></p>
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
                <Bullet><strong className="text-white">First mover:</strong> Only 1-2 hobbyists selling 3D-printed archery parts. Owen would be the first real commercial operation.</Bullet>
                <Bullet><strong className="text-white">Scalability:</strong> No sourcing bottleneck. No manual assembly expertise required per unit. Owen designs the parts, the printer makes them. Adding a second printer doubles capacity.</Bullet>
                <Bullet><strong className="text-white">Material capability:</strong> Owen can print carbon fiber and engineering-grade materials — this isn&apos;t PLA hobby printing.</Bullet>
                <Bullet><strong className="text-white">Built-in network:</strong> Owen&apos;s dad has connections in the archery community. That&apos;s the seed audience.</Bullet>
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
              <Card title="Go-to-Market">
                <Bullet><strong className="text-white">Seed audience:</strong> Owen&apos;s dad&apos;s archery network. Word of mouth from people who&apos;ve seen the prototype.</Bullet>
                <Bullet><strong className="text-white">Online communities:</strong> Reddit archery subs, ArcheryTalk forums, Facebook Groups. Share the product, get feedback, build reputation.</Bullet>
                <Bullet><strong className="text-white">Content:</strong> Short-form video of the printing process, before/after performance tests, comparison with traditional parts.</Bullet>
                <Bullet><strong className="text-white">Paid ads:</strong> Once organic proves the product-market fit, scale with Meta ads targeting archery interests. The margins mean almost any reasonable CAC is profitable.</Bullet>
                <p className="mt-3"><strong className="text-white">Key advantage:</strong> At 97%+ margins, Owen can spend aggressively on customer acquisition and still be wildly profitable. A $30 part that costs $0.50 to make can absorb a $10 CAC and still return 65% net margin.</p>
              </Card>
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
              <Card title="Facebook Messenger Integration" defaultOpen={false}>
                <p className="mb-3">Owen&apos;s existing customers find him on Facebook Marketplace. We don&apos;t want to kill that channel — we want to funnel it into the new system.</p>
                <NumberedStep n={1} title="Keep the Facebook presence">Owen continues listing on Marketplace and engaging on his Page. This is his discovery channel.</NumberedStep>
                <NumberedStep n={2} title="Route inquiries to the site">Auto-responses direct buyers to the site for browsing, configuring, and purchasing. &quot;Check out our full collection and build your own at [site].&quot;</NumberedStep>
                <NumberedStep n={3} title="Sync conversations">ManyChat (or a custom integration) syncs Messenger conversations to the admin portal so nothing falls through the cracks.</NumberedStep>
                <p className="text-sm text-[#888] mt-2">Over time, the site becomes the primary sales channel and Facebook becomes the marketing/discovery channel. But we don&apos;t force the transition — we let it happen naturally as the site proves itself.</p>
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
            </div>
          </FadeIn>
        </section>


        {/* ═══ GROWTH PLAYBOOK ═══ */}
        <section id="growth" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={TrendingUp} label="Section 6" title="Growth Playbook" /></FadeIn>
          <div className="max-w-3xl space-y-4">

            <FadeIn>
              <Card title="Watch Business: Ads & Content">
                <p className="mb-3"><strong className="text-white">Budget: $500-$1,500/month on Meta</strong> once the site is live and Pixel is collecting data.</p>
                <Bullet><strong className="text-white">Best performing creative:</strong> UGC build process videos (15-30 sec), before/after transformations, customer review compilations. Phone-shot content outperforms polished studio content 4x.</Bullet>
                <Bullet><strong className="text-white">Targeting:</strong> Watch interests (Seiko, Orient, Casio, horology) + lifestyle (whiskey, leather, EDC) + engaged shoppers. After 50+ conversions, build Lookalike Audiences from the 700-customer base.</Bullet>
                <Bullet><strong className="text-white">Organic:</strong> 4-5 Instagram posts/week, daily Stories, TikTok build videos. Content pillars: build process (40%), finished reveals (20%), BTS (15%), education (15%), social proof (10%).</Bullet>
                <Bullet><strong className="text-white">Facebook reviews:</strong> Owen&apos;s 50+ reviews need to be everywhere — on the site, in ads, in emails. They&apos;re his most underutilized asset.</Bullet>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Archery Business: Ads & Content">
                <p className="mb-3"><strong className="text-white">Start organic, scale paid once product-market fit is confirmed.</strong></p>
                <Bullet><strong className="text-white">Seed launch:</strong> Owen&apos;s dad&apos;s network + archery community posts (Reddit, ArcheryTalk, Facebook Groups). Share the product, get honest feedback, iterate.</Bullet>
                <Bullet><strong className="text-white">Content that works for archery:</strong> Printing process videos (satisfying to watch), side-by-side performance tests vs traditional parts, durability demos, customer field-test footage.</Bullet>
                <Bullet><strong className="text-white">Paid ads:</strong> Once 10-20 organic sales confirm demand, launch Meta ads at $500-$1,000/month targeting archery interests. At 97%+ margins, almost any CAC under $20 is wildly profitable for a $50+ avg order.</Bullet>
                <Bullet><strong className="text-white">YouTube:</strong> Archery YouTube is big. A channel showing the design/print process and field testing builds authority fast. Long-form content creates trust that short-form can&apos;t.</Bullet>
              </Card>
            </FadeIn>

            <FadeIn>
              <Card title="Email & Retention (Both Businesses)">
                <p className="mb-3">Simple Klaviyo or Resend-based flows for both sites:</p>
                <div className="space-y-3">
                  {[
                    { name: "Welcome Series", detail: "Brand story + product showcase + social proof. Runs on signup." },
                    { name: "Abandoned Cart", detail: "Reminder at 1hr, social proof at 24hr, urgency at 72hr." },
                    { name: "Post-Purchase", detail: "Build updates (watches), shipping notification, review request at day 14." },
                    { name: "New Product Drop", detail: "Email + SMS blast when new watch designs or archery parts launch." },
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


        {/* ═══ ROADMAP ═══ */}
        <section id="roadmap" className="px-5 sm:px-10 lg:px-16 py-16 border-b border-white/[0.04] scroll-mt-16 lg:scroll-mt-0">
          <FadeIn><SectionHeader icon={Map} label="Section 7" title="Phased Roadmap" /></FadeIn>
          <div className="max-w-3xl space-y-6">

            {[
              {
                phase: "1", months: "Weeks 1-2", title: "Archery Site Live",
                investment: "~$0-$20 (hosting/domain)", output: "Archery site accepting orders",
                owenRole: "Photograph products, write descriptions, prep inventory.",
                color: "#4ade80",
                actions: [
                  "Build archery product catalog site (Next.js + Supabase + Stripe)",
                  "Admin portal for order management",
                  "Product photos and descriptions from Owen",
                  "Stripe checkout integration",
                  "Domain registration + Vercel deployment",
                  "Seed launch via Owen's dad's archery network",
                  "Post in archery communities for initial feedback",
                ],
              },
              {
                phase: "2", months: "Weeks 3-6", title: "Watch Site Development",
                investment: "~$0-$20/mo + domain", output: "Watch site with stock catalog + configurator MVP",
                owenRole: "Photograph all components, identify stock designs, provide parts list for configurator.",
                color: "#7c5cfc",
                actions: [
                  "Build watch site with stock collection catalog",
                  "Build watch configurator (V1: option selectors + reference photos)",
                  "Customer accounts with order history + saved builds",
                  "Admin portal: orders, inventory, build status tracking",
                  "Import Facebook reviews as testimonials",
                  "Meta Pixel installation for future ad targeting",
                  "Facebook Messenger → site routing setup",
                  "Work with Owen on brand name",
                ],
              },
              {
                phase: "3", months: "Months 2-4", title: "Launch Ads & Scale",
                investment: "$1,000-$2,500/mo (ads)", output: "Paid traffic to both sites, growing revenue",
                owenRole: "Film content (builds, prints, tests). Fulfill orders. Enjoy more free time.",
                color: "#818cf8",
                actions: [
                  "Launch Meta ads for watches ($500-$1,500/mo)",
                  "Launch Meta ads for archery ($500-$1,000/mo) once organic validates",
                  "Build email flows (Welcome, Abandoned Cart, Post-Purchase)",
                  "A/B test landing pages and checkout flow",
                  "Iterate watch configurator based on customer feedback",
                  "Expand archery catalog based on demand signals",
                  "Start TikTok/Instagram content for both brands",
                ],
              },
              {
                phase: "4", months: "Months 5-12", title: "Optimize & C8",
                investment: "Revenue-funded", output: "Combined $8-15K+/month net profit",
                owenRole: "Design new archery parts. Build custom watches. Cash C8 check.",
                color: "#4ade80",
                actions: [
                  "Scale ad spend on winning creatives",
                  "Upgrade watch configurator to V2 (layered image compositing)",
                  "Expand archery product line based on sales data",
                  "Consider second 3D printer if archery demand justifies",
                  "Build YouTube presence for both brands",
                  "Implement referral program for watch customers",
                  "Explore wholesale/B2B for archery parts",
                  "Hit C8 net profit target",
                ],
              },
            ].map((phase, i) => (
              <FadeIn key={i}>
                <div className="bg-[#141420] rounded-xl border border-white/[0.06] overflow-hidden">
                  <div className="p-5 sm:p-6 border-b border-white/[0.06]" style={{ borderLeftWidth: 4, borderLeftColor: phase.color }}>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-bold tracking-widest" style={{ color: phase.color }}>PHASE {phase.phase}</span>
                      <span className="text-sm text-[#555]">{phase.months}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <div><span className="text-[#666]">Investment: </span><span className="text-white font-medium">{phase.investment}</span></div>
                      <div><span className="text-[#666]">Expected: </span><span className="font-medium" style={{ color: phase.color }}>{phase.output}</span></div>
                    </div>
                  </div>
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
              </FadeIn>
            ))}
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
