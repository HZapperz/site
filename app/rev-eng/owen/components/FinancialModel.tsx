"use client"

import { useState, useMemo } from "react"

/* ─── Scenario presets ─── */
type Scenario = {
  name: string; ws: number; wp: number; wc: number; wcp: number;
  ap: number; app: number; ad: number; sw: number;
  wCogs?: number; aCogs?: number; stress?: boolean;
}

const scenarios: Scenario[] = [
  { name: "Pessimistic", ws: 10, wp: 279, wc: 2, wcp: 499, ap: 20, app: 40, ad: 500, sw: 50 },
  { name: "Current State", ws: 20, wp: 299, wc: 0, wcp: 549, ap: 0, app: 50, ad: 0, sw: 0 },
  { name: "Month 3", ws: 15, wp: 299, wc: 5, wcp: 549, ap: 50, app: 50, ad: 1000, sw: 50 },
  { name: "Month 6", ws: 15, wp: 299, wc: 10, wcp: 549, ap: 150, app: 55, ad: 2000, sw: 100 },
  { name: "C8 Target", ws: 20, wp: 299, wc: 10, wcp: 599, ap: 200, app: 60, ad: 3000, sw: 100 },
  { name: "Archery Flops", ws: 20, wp: 299, wc: 5, wcp: 549, ap: 0, app: 0, ad: 1000, sw: 50, stress: true },
  { name: "Ad Burn", ws: 15, wp: 299, wc: 5, wcp: 549, ap: 50, app: 50, ad: 3000, sw: 100, stress: true },
  { name: "Supply Squeeze", ws: 12, wp: 299, wc: 3, wcp: 549, ap: 50, app: 50, ad: 1000, sw: 50, wCogs: 48, stress: true },
]

/* ─── Unit economics assumption modes ─── */
type EconMode = "conservative" | "realistic" | "aggressive"

const econAssumptions: Record<EconMode, { label: string; watchConv: number; archeryCac: number; roas: number }> = {
  conservative: { label: "Conservative", watchConv: 1.5, archeryCac: 15, roas: 2 },
  realistic:    { label: "Realistic",    watchConv: 2.5, archeryCac: 8,  roas: 3.5 },
  aggressive:   { label: "Aggressive",   watchConv: 3.5, archeryCac: 5,  roas: 5 },
}

/* ─── Helpers ─── */
function fmt(n: number) {
  if (Math.abs(n) >= 1000) return (n < 0 ? "-" : "") + "$" + Math.abs(Math.round(n)).toLocaleString()
  return (n < 0 ? "-" : "") + "$" + Math.abs(Math.round(n))
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`
}

/* ─── Sub-components ─── */
function Slider({ label, value, set, min, max, step, unit, desc }: {
  label: string; value: number; set: (v: number) => void;
  min: number; max: number; step: number; unit: string; desc?: string
}) {
  const display = unit === "$" ? fmt(value) : `${value}${unit}`
  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm text-[#999]">{label}</span>
        <span className="text-base font-medium text-white">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => set(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[#222] accent-[#7c5cfc]"
      />
      {desc && <div className="text-xs text-[#555] mt-1">{desc}</div>}
    </div>
  )
}

function Metric({ label, value, sub, color }: {
  label: string; value: string; sub?: string; color?: string
}) {
  return (
    <div className="bg-[#141420] rounded-xl p-4 sm:p-5 flex-1 min-w-[120px] sm:min-w-[140px]">
      <div className="text-xs text-[#666] mb-1 tracking-wider uppercase">{label}</div>
      <div className="text-xl sm:text-2xl font-semibold" style={{ color: color || "#fff" }}>{value}</div>
      {sub && <div className="text-xs text-[#555] mt-1">{sub}</div>}
    </div>
  )
}

function Row({ label, value, bold, accent, border }: {
  label: string; value: string; bold?: boolean; accent?: boolean; border?: boolean
}) {
  return (
    <div className={`flex justify-between py-2.5 text-[15px] ${border ? "border-t border-[#333]" : ""}`}>
      <span className={bold ? "font-semibold text-white" : "text-[#999]"}>{label}</span>
      <span className={`${accent ? "text-[#7c5cfc] font-semibold" : bold ? "text-white font-semibold" : "text-[#bbb]"}`}>{value}</span>
    </div>
  )
}

/* ─── Scenario net profit helper ─── */
function scenarioNet(s: Scenario) {
  const wr = s.ws * s.wp + s.wc * s.wcp
  const wCogsRate = s.wCogs != null ? s.wCogs / 100 : 0.38
  const wg = wr * (1 - wCogsRate)
  const ar = s.ap * s.app
  const aCogsRate = s.aCogs != null ? s.aCogs / 100 : 0.05
  const ag = ar * (1 - aCogsRate)
  return Math.round(wg + ag - s.ad - s.sw)
}

/* ─── Main component ─── */
export default function FinancialModel() {
  const [watchStock, setWatchStock] = useState(15)
  const [watchStockPrice, setWatchStockPrice] = useState(299)
  const [watchCustom, setWatchCustom] = useState(5)
  const [watchCustomPrice, setWatchCustomPrice] = useState(549)
  const [watchCogs, setWatchCogs] = useState(38)
  const [archeryParts, setArcheryParts] = useState(50)
  const [archeryPrice, setArcheryPrice] = useState(50)
  const [archeryCogs, setArcheryCogs] = useState(5)
  const [adSpend, setAdSpend] = useState(1000)
  const [software, setSoftware] = useState(50)
  const [econMode, setEconMode] = useState<EconMode>("realistic")
  const [includeStripe, setIncludeStripe] = useState(false)

  const econ = econAssumptions[econMode]

  // Watch calculations
  const watchStockRev = watchStock * watchStockPrice
  const watchCustomRev = watchCustom * watchCustomPrice
  const watchRev = watchStockRev + watchCustomRev
  const watchCogsTotal = watchRev * (watchCogs / 100)
  const watchGross = watchRev - watchCogsTotal
  const watchGrossMargin = watchRev > 0 ? watchGross / watchRev : 0

  // Archery calculations
  const archeryRev = archeryParts * archeryPrice
  const archeryCogsTotal = archeryRev * (archeryCogs / 100)
  const archeryGross = archeryRev - archeryCogsTotal
  const archeryGrossMargin = archeryRev > 0 ? archeryGross / archeryRev : 0

  // Combined
  const totalRev = watchRev + archeryRev
  const totalGross = watchGross + archeryGross
  const totalGrossMargin = totalRev > 0 ? totalGross / totalRev : 0
  const totalUnits = watchStock + watchCustom + archeryParts
  const stripeFees = includeStripe ? (totalRev * 0.029 + totalUnits * 0.30) : 0
  const totalExpenses = adSpend + software + stripeFees
  const net = totalGross - totalExpenses
  const annualNet = net * 12
  const c8Progress = Math.min(100, Math.round((annualNet / 68000) * 100))
  const c8Color = c8Progress >= 100 ? "#4ade80" : c8Progress >= 60 ? "#facc15" : "#f87171"

  // ─── Unit Economics (mode-dependent) ─── //
  const unitEcon = useMemo(() => {
    // Ad spend drives customer acquisition
    // Watch: conversion rate from site visitors to purchase
    // Assume CPM ~$9.20 avg (Varos Watches median), so ad spend / 9.20 * 1000 = impressions
    // Impressions * CTR (~1.67% Varos median) = clicks, clicks * conv% = customers
    const cpm = 9.2
    const ctr = 0.0167
    const impressions = adSpend > 0 ? (adSpend / cpm) * 1000 : 0
    const clicks = impressions * ctr
    const watchConvRate = econ.watchConv / 100
    const estimatedWatchCustomers = clicks > 0 ? Math.round(clicks * watchConvRate) : watchStock + watchCustom
    const estimatedArcheryCustomers = adSpend > 0 ? Math.round(adSpend / econ.archeryCac) : archeryParts

    const totalEstCustomers = estimatedWatchCustomers + estimatedArcheryCustomers
    const cac = totalEstCustomers > 0 ? adSpend / totalEstCustomers : 0

    // Break-even ROAS = 1 / gross margin
    const breakEvenRoas = totalGrossMargin > 0 ? 1 / totalGrossMargin : Infinity

    // LTV: split by business (watches = lower repeat, archery = higher repeat)
    const watchUnits = watchStock + watchCustom
    const avgWatchPrice = watchUnits > 0 ? (watchStock * watchStockPrice + watchCustom * watchCustomPrice) / watchUnits : 0
    const watchLtv = avgWatchPrice * 1.2

    const avgArcheryPrice = archeryParts > 0 ? archeryRev / archeryParts : 0
    const archeryLtv = avgArcheryPrice * 2.0

    const watchRevShare = totalRev > 0 ? (watchStock * watchStockPrice + watchCustom * watchCustomPrice) / totalRev : 0
    const archeryRevShare = totalRev > 0 ? archeryRev / totalRev : 0
    const blendedLtv = (watchLtv * watchRevShare) + (archeryLtv * archeryRevShare)

    // LTV:CAC
    const ltvCacRatio = cac > 0 ? blendedLtv / cac : Infinity

    // Actual ROAS
    const actualRoas = adSpend > 0 ? totalRev / adSpend : 0

    return {
      cac: Math.round(cac * 100) / 100,
      breakEvenRoas: Math.round(breakEvenRoas * 100) / 100,
      watchLtv: Math.round(watchLtv),
      archeryLtv: Math.round(archeryLtv),
      blendedLtv: Math.round(blendedLtv),
      ltvCacRatio: Math.round(ltvCacRatio * 10) / 10,
      actualRoas: Math.round(actualRoas * 10) / 10,
      estimatedWatchCustomers,
      estimatedArcheryCustomers,
      totalEstCustomers,
    }
  }, [watchStock, watchCustom, archeryParts, watchStockPrice, watchCustomPrice, archeryPrice, adSpend, totalRev, totalGross, totalGrossMargin, econ])

  // ─── 6-month cash flow projection ─── //
  const cashFlow = useMemo(() => {
    // Current state: assume current slider values are "now"
    // We ramp linearly from ~50% of current volume to full slider values over 6 months
    const months: { month: number; rev: number; cogs: number; adCost: number; swCost: number; netCash: number; cumulative: number }[] = []
    let cumulative = 0
    for (let m = 1; m <= 6; m++) {
      const ramp = m / 6
      const mWatchStock = Math.round(watchStock * (0.5 + 0.5 * ramp))
      const mWatchCustom = Math.round(watchCustom * ramp)
      const mArchery = Math.round(archeryParts * ramp)
      const mAd = Math.round(adSpend * (0.5 + 0.5 * ramp))
      const mSw = software

      const mWatchRev = mWatchStock * watchStockPrice + mWatchCustom * watchCustomPrice
      const mArcheryRev = mArchery * archeryPrice
      const mRev = mWatchRev + mArcheryRev
      const mWatchCogs = mWatchRev * (watchCogs / 100)
      const mArcheryCogs = mArcheryRev * (archeryCogs / 100)
      const mCogs = mWatchCogs + mArcheryCogs
      const mNet = mRev - mCogs - mAd - mSw
      cumulative += mNet

      months.push({
        month: m,
        rev: Math.round(mRev),
        cogs: Math.round(mCogs),
        adCost: mAd,
        swCost: mSw,
        netCash: Math.round(mNet),
        cumulative: Math.round(cumulative),
      })
    }
    return months
  }, [watchStock, watchCustom, archeryParts, watchStockPrice, watchCustomPrice, archeryPrice, watchCogs, archeryCogs, adSpend, software])

  const hasNegativeCumulative = cashFlow.some(m => m.cumulative < 0)

  // ─── Break-even detection for scenario table ─── //
  const scenarioBreakEven = useMemo(() => {
    return scenarios.map(s => {
      const sNet = scenarioNet(s)
      return sNet > 0
    })
  }, [])

  const firstBreakEvenIdx = scenarioBreakEven.findIndex(v => v)

  const applyScenario = (s: Scenario) => {
    setWatchStock(s.ws); setWatchStockPrice(s.wp); setWatchCustom(s.wc)
    setWatchCustomPrice(s.wcp); setArcheryParts(s.ap); setArcheryPrice(s.app)
    setAdSpend(s.ad); setSoftware(s.sw)
    if (s.wCogs != null) setWatchCogs(s.wCogs)
    if (s.aCogs != null) setArcheryCogs(s.aCogs)
  }

  return (
    <div className="space-y-6">
      {/* Scenario presets */}
      <div className="flex flex-wrap gap-2">
        {scenarios.filter(s => !s.stress).map((s, i) => (
          <button key={i} onClick={() => applyScenario(s)}
            className="px-4 py-2 rounded-full border border-[#333] bg-[#141420] text-[#ccc] text-xs cursor-pointer hover:border-[#7c5cfc] hover:text-white transition-all">
            {s.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 -mt-4">
        <span className="text-[10px] text-[#f87171] font-semibold tracking-widest self-center mr-1">STRESS TESTS</span>
        {scenarios.filter(s => s.stress).map((s, i) => (
          <button key={i} onClick={() => applyScenario(s)}
            className="px-4 py-2 rounded-full border border-[#f87171]/30 bg-[#f87171]/5 text-[#f87171] text-xs cursor-pointer hover:border-[#f87171] hover:text-white transition-all">
            {s.name}
          </button>
        ))}
      </div>

      {/* Scenario mode toggle */}
      <div className="bg-[#141420] rounded-xl p-5 border border-white/[0.06]">
        <div className="text-xs font-semibold text-[#7c5cfc] mb-3 tracking-widest">UNIT ECONOMICS MODE</div>
        <div className="flex gap-2">
          {(Object.keys(econAssumptions) as EconMode[]).map(mode => {
            const a = econAssumptions[mode]
            const active = econMode === mode
            return (
              <button
                key={mode}
                onClick={() => setEconMode(mode)}
                className={`flex-1 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                  active
                    ? "border-[#7c5cfc] bg-[#7c5cfc]/10 text-white"
                    : "border-[#333] bg-transparent text-[#666] hover:border-[#555] hover:text-[#999]"
                }`}
              >
                <div>{a.label}</div>
                <div className="text-[10px] mt-1 opacity-60">
                  {a.watchConv}% conv &middot; ${a.archeryCac} CAC &middot; {a.roas}x ROAS
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Inputs */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-[#7c5cfc] mb-4 tracking-widest">WATCH BUSINESS</div>
          <Slider label="Stock watches/month" value={watchStock} set={setWatchStock} min={0} max={40} step={1} unit="/mo" />
          <Slider label="Stock price" value={watchStockPrice} set={setWatchStockPrice} min={199} max={499} step={10} unit="$" />
          <Slider label="Custom watches/month" value={watchCustom} set={setWatchCustom} min={0} max={20} step={1} unit="/mo" />
          <Slider label="Custom price" value={watchCustomPrice} set={setWatchCustomPrice} min={399} max={999} step={25} unit="$" />
          <Slider label="Watch COGS %" value={watchCogs} set={setWatchCogs} min={25} max={50} step={1} unit="%" desc="Parts cost as % of sale price" />

          <div className="text-xs font-semibold text-[#4ade80] mb-4 mt-8 tracking-widest">ARCHERY BUSINESS</div>
          <Slider label="Parts sold/month" value={archeryParts} set={setArcheryParts} min={0} max={500} step={10} unit="/mo" />
          <Slider label="Avg price per part" value={archeryPrice} set={setArcheryPrice} min={20} max={150} step={5} unit="$" />
          <Slider label="Archery COGS %" value={archeryCogs} set={setArcheryCogs} min={1} max={15} step={1} unit="%" desc="Material, electricity, packaging, ~5% fail rate" />

          <div className="text-xs font-semibold text-[#888] mb-4 mt-8 tracking-widest">SHARED EXPENSES</div>
          <Slider label="Monthly ad spend" value={adSpend} set={setAdSpend} min={0} max={10000} step={250} unit="$" />
          <Slider label="Software & hosting" value={software} set={setSoftware} min={0} max={500} step={10} unit="$" />
          <div className="flex items-center gap-3 mt-4 mb-2">
            <button
              onClick={() => setIncludeStripe(!includeStripe)}
              className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${includeStripe ? "bg-[#7c5cfc]" : "bg-[#333]"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${includeStripe ? "left-[22px]" : "left-0.5"}`} />
            </button>
            <span className="text-sm text-[#999]">Include Stripe fees (2.9% + $0.30/tx)</span>
            {includeStripe && totalRev > 0 && <span className="text-xs text-[#f87171]">-{fmt(Math.round(stripeFees))}/mo</span>}
          </div>
        </div>

        {/* Outputs */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2.5 mb-4">
            <Metric label="Watch Revenue" value={fmt(watchRev)} sub={`${watchStock + watchCustom} watches`} />
            <Metric label="Archery Revenue" value={fmt(archeryRev)} sub={`${archeryParts} parts`} color={archeryParts > 0 ? "#4ade80" : "#fff"} />
          </div>
          <div className="flex flex-wrap gap-2.5 mb-4">
            <Metric label="Combined Revenue" value={fmt(totalRev)} />
            <Metric label="Net Profit" value={fmt(net)} color={net >= 0 ? "#4ade80" : "#f87171"} sub={`${totalRev > 0 ? Math.round((net / totalRev) * 100) : 0}% net margin`} />
          </div>
          <div className="flex flex-wrap gap-2.5 mb-6">
            <Metric label="Annual Net" value={fmt(annualNet)} color={annualNet >= 0 ? "#4ade80" : "#f87171"} />
          </div>

          {/* C8 Progress Bar */}
          <div className="bg-[#141420] rounded-xl p-5 mb-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs font-semibold text-[#7c5cfc] tracking-widest">C8 PROGRESS</span>
              <span className="text-lg font-bold" style={{ color: c8Color }}>{c8Progress}%</span>
            </div>
            <div className="h-3 bg-[#222] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c8Progress}%`, backgroundColor: c8Color }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#555]">
              <span>$0</span>
              <span>$68,000 / year</span>
            </div>
            <div className="mt-3 text-sm text-[#888]">
              {c8Progress >= 100 ? (
                <span className="text-[#4ade80] font-medium">Owen&apos;s getting the C8. {annualNet > 100000 ? "And then some." : ""}</span>
              ) : c8Progress >= 60 ? (
                <span className="text-[#facc15]">On track — scale archery volume or raise custom watch prices to close the gap.</span>
              ) : (
                <span className="text-[#f87171]">Below target. Need more volume or higher pricing to hit C8 this year.</span>
              )}
            </div>
          </div>

          {/* P&L Breakdown */}
          <div className="bg-[#141420] rounded-xl p-5">
            <div className="text-xs font-semibold text-[#7c5cfc] mb-3 tracking-widest">P&L BREAKDOWN</div>
            <Row label={`Watch stock (${watchStock} x ${fmt(watchStockPrice)})`} value={fmt(watchStockRev)} />
            <Row label={`Watch custom (${watchCustom} x ${fmt(watchCustomPrice)})`} value={fmt(watchCustomRev)} />
            <Row label={`Watch COGS (${watchCogs}%)`} value={`-${fmt(watchCogsTotal)}`} />
            <Row label="Watch gross profit" value={fmt(watchGross)} bold border />
            <Row label={`Archery (${archeryParts} x ${fmt(archeryPrice)})`} value={fmt(archeryRev)} />
            <Row label={`Archery COGS (${archeryCogs}%)`} value={archeryCogsTotal > 0 ? `-${fmt(archeryCogsTotal)}` : "$0"} />
            <Row label="Archery gross profit" value={fmt(archeryGross)} bold border />
            <Row label="Combined gross" value={fmt(totalGross)} bold border />
            <Row label="Ad spend" value={adSpend > 0 ? `-${fmt(adSpend)}` : "$0"} />
            <Row label="Software" value={software > 0 ? `-${fmt(software)}` : "$0"} />
            {includeStripe && <Row label={`Stripe fees (2.9% + $0.30 x ${totalUnits})`} value={stripeFees > 0 ? `-${fmt(Math.round(stripeFees))}` : "$0"} />}
            <Row label="Net monthly profit" value={fmt(net)} bold accent border />
          </div>
        </div>
      </div>

      {/* CAC & Unit Economics */}
      <div className="bg-[#141420] rounded-xl p-5 border border-white/[0.06]">
        <div className="text-xs font-semibold text-[#7c5cfc] mb-4 tracking-widest">
          CAC & UNIT ECONOMICS
          <span className="ml-2 text-[#555] font-normal normal-case tracking-normal">({econAssumptions[econMode].label} mode)</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* CAC */}
          <div className="bg-[#0d0d18] rounded-lg p-4">
            <div className="text-[10px] text-[#666] tracking-wider uppercase mb-1">Customer Acq. Cost</div>
            <div className="text-xl font-semibold text-white">
              {adSpend > 0 && unitEcon.totalEstCustomers > 0 ? fmt(unitEcon.cac) : "—"}
            </div>
            <div className="text-[10px] text-[#555] mt-1">
              {adSpend > 0 ? `${fmt(adSpend)} spend / ~${unitEcon.totalEstCustomers} customers` : "No ad spend"}
            </div>
          </div>

          {/* Break-even ROAS */}
          <div className="bg-[#0d0d18] rounded-lg p-4">
            <div className="text-[10px] text-[#666] tracking-wider uppercase mb-1">Break-even ROAS</div>
            <div className="text-xl font-semibold text-white">
              {totalGrossMargin > 0 ? `${unitEcon.breakEvenRoas}x` : "—"}
            </div>
            <div className="text-[10px] text-[#555] mt-1">
              1 / {pct(totalGrossMargin)} gross margin
            </div>
          </div>

          {/* LTV */}
          <div className="bg-[#0d0d18] rounded-lg p-4">
            <div className="text-[10px] text-[#666] tracking-wider uppercase mb-1">Est. Lifetime Value</div>
            <div className="text-xl font-semibold text-white">
              {(watchStock + watchCustom + archeryParts) > 0 ? fmt(unitEcon.blendedLtv) : "—"}
            </div>
            <div className="text-[10px] text-[#555] mt-1">
              {(watchStock + watchCustom) > 0 && <>Watch: {fmt(unitEcon.watchLtv)} (1.2x) </>}
              {(watchStock + watchCustom) > 0 && archeryParts > 0 && <>&middot; </>}
              {archeryParts > 0 && <>Archery: {fmt(unitEcon.archeryLtv)} (2.0x)</>}
            </div>
            <div className="text-[10px] text-[#f87171]/60 mt-1">Assumed — validate after 90 days</div>
          </div>

          {/* LTV:CAC */}
          <div className="bg-[#0d0d18] rounded-lg p-4">
            <div className="text-[10px] text-[#666] tracking-wider uppercase mb-1">LTV : CAC</div>
            <div className="text-xl font-semibold" style={{
              color: adSpend === 0 || unitEcon.cac === 0
                ? "#fff"
                : unitEcon.ltvCacRatio >= 3
                  ? "#4ade80"
                  : unitEcon.ltvCacRatio >= 2
                    ? "#facc15"
                    : "#f87171"
            }}>
              {adSpend > 0 && unitEcon.cac > 0
                ? `${unitEcon.ltvCacRatio}x`
                : "—"}
            </div>
            <div className="text-[10px] mt-1" style={{
              color: adSpend === 0 || unitEcon.cac === 0
                ? "#555"
                : unitEcon.ltvCacRatio >= 3
                  ? "#4ade80"
                  : unitEcon.ltvCacRatio >= 2
                    ? "#facc15"
                    : "#f87171"
            }}>
              {adSpend === 0 || unitEcon.cac === 0
                ? "No ad spend"
                : unitEcon.ltvCacRatio >= 3
                  ? "Healthy"
                  : unitEcon.ltvCacRatio >= 2
                    ? "Needs improvement"
                    : "Unsustainable"}
            </div>
          </div>
        </div>

        {/* Actual vs break-even ROAS bar */}
        {adSpend > 0 && (
          <div className="mt-4 pt-4 border-t border-[#1a1a2e]">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-xs text-[#666]">Actual ROAS vs break-even</span>
              <span className="text-sm font-medium" style={{
                color: unitEcon.actualRoas >= unitEcon.breakEvenRoas ? "#4ade80" : "#f87171"
              }}>
                {unitEcon.actualRoas}x actual / {unitEcon.breakEvenRoas}x break-even
              </span>
            </div>
            <div className="h-2 bg-[#222] rounded-full overflow-hidden relative">
              {/* Break-even marker */}
              <div
                className="absolute top-0 h-full w-0.5 bg-[#facc15] z-10"
                style={{ left: `${Math.min(100, (unitEcon.breakEvenRoas / (econ.roas * 2)) * 100)}%` }}
              />
              {/* Actual ROAS fill */}
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (unitEcon.actualRoas / (econ.roas * 2)) * 100)}%`,
                  backgroundColor: unitEcon.actualRoas >= unitEcon.breakEvenRoas ? "#4ade80" : "#f87171",
                }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-[#555]">
              <span>0x</span>
              <span>{econ.roas * 2}x</span>
            </div>
          </div>
        )}
      </div>

      {/* Cash Flow Timeline */}
      <div className="bg-[#141420] rounded-xl p-5 border border-white/[0.06] overflow-hidden">
        <div className="flex justify-between items-baseline mb-4">
          <div className="text-xs font-semibold text-[#7c5cfc] tracking-widest">6-MONTH CASH FLOW PROJECTION</div>
          {hasNegativeCumulative && (
            <span className="text-xs text-[#f87171] font-medium flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#f87171] animate-pulse" />
              Negative cash months detected
            </span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["Month", "Revenue", "COGS", "Ad Spend", "Software", "Net Cash", "Cumulative"].map((h, i) => (
                  <th key={i} className={`${i === 0 ? "text-left" : "text-right"} py-2.5 px-3 border-b border-[#333] text-[10px] tracking-wider text-[#666]`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cashFlow.map((m) => (
                <tr key={m.month} className="border-b border-[#1a1a2e]">
                  <td className="py-2.5 px-3 text-[#999]">M{m.month}</td>
                  <td className="py-2.5 px-3 text-right text-[#bbb]">{fmt(m.rev)}</td>
                  <td className="py-2.5 px-3 text-right text-[#999]">-{fmt(m.cogs)}</td>
                  <td className="py-2.5 px-3 text-right text-[#999]">-{fmt(m.adCost)}</td>
                  <td className="py-2.5 px-3 text-right text-[#999]">-{fmt(m.swCost)}</td>
                  <td className="py-2.5 px-3 text-right font-medium" style={{ color: m.netCash >= 0 ? "#4ade80" : "#f87171" }}>
                    {fmt(m.netCash)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold" style={{ color: m.cumulative >= 0 ? "#4ade80" : "#f87171" }}>
                    {fmt(m.cumulative)}
                    {m.cumulative < 0 && <span className="ml-1 text-[10px] text-[#f87171]">!</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-[#555]">
          Projection assumes linear ramp from 50% current volume to full slider values over 6 months. Software cost stays flat.
        </div>
      </div>

      {/* Scenario Comparison (with break-even indicator) */}
      <div className="bg-[#141420] rounded-xl p-5 border border-white/[0.06] overflow-hidden">
        <div className="text-xs font-semibold text-[#7c5cfc] mb-4 tracking-widest">SCENARIO COMPARISON</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["", ...scenarios.map(s => s.name)].map((h, i) => (
                  <th key={i} className={`${i === 0 ? "text-left" : "text-right"} py-2.5 px-3 border-b border-[#333] text-xs tracking-wider ${i === 0 ? "text-[#666]" : i > 0 && scenarios[i - 1]?.stress ? "text-[#f87171] font-semibold" : "text-white font-semibold"}`}>
                    <span>{h}</span>
                    {i > 0 && i - 1 === firstBreakEvenIdx && scenarioBreakEven[i - 1] && (
                      <span className="ml-1.5 text-[10px] text-[#4ade80] font-normal tracking-normal">BREAK-EVEN</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { l: "Watch rev", v: scenarios.map(s => fmt(s.ws * s.wp + s.wc * s.wcp)) },
                { l: "Archery rev", v: scenarios.map(s => fmt(s.ap * s.app)) },
                { l: "Combined rev", v: scenarios.map(s => fmt(s.ws * s.wp + s.wc * s.wcp + s.ap * s.app)) },
                { l: "Ad spend", v: scenarios.map(s => fmt(s.ad)) },
                { l: "Net profit", v: scenarios.map(s => fmt(scenarioNet(s))), bold: true },
                { l: "Annual net", v: scenarios.map(s => fmt(scenarioNet(s) * 12)), accent: true },
              ].map((row, ri) => (
                <tr key={ri} className="border-b border-[#1a1a2e]">
                  <td className="py-2.5 px-3 text-[#666]">{row.l}</td>
                  {row.v.map((v, vi) => {
                    // Highlight the first break-even column
                    const isBreakEvenCol = vi === firstBreakEvenIdx && scenarioBreakEven[vi]
                    return (
                      <td
                        key={vi}
                        className={`py-2.5 px-3 text-right ${
                          row.accent
                            ? "text-[#7c5cfc] font-semibold"
                            : row.bold
                              ? "text-white font-semibold"
                              : "text-[#999]"
                        } ${isBreakEvenCol ? "bg-[#4ade80]/[0.04]" : ""}`}
                      >
                        {v}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Assumptions */}
      <div className="bg-[#141420] rounded-xl p-5 border border-white/[0.06]">
        <div className="text-xs font-semibold text-[#7c5cfc] mb-4 tracking-widest">KEY ASSUMPTIONS</div>

        <div className="space-y-4 text-sm">
          {/* Watch COGS breakdown */}
          <div>
            <div className="text-white font-medium mb-2">Watch COGS Breakdown (per unit)</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
              {[
                { part: "Movement", range: "$35–50" },
                { part: "Case", range: "$25–40" },
                { part: "Dial", range: "$10–20" },
                { part: "Hands", range: "$8–15" },
                { part: "Crystal", range: "$12–25" },
                { part: "Bezel insert", range: "$10–20" },
                { part: "Strap / bracelet", range: "$8–15" },
                { part: "Gaskets, stems, misc", range: "~$5" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-[#666]">{item.part}</span>
                  <span className="text-[#999] ml-2">{item.range}</span>
                </div>
              ))}
            </div>
            <div className="text-xs text-[#555] mt-2">Total per watch: ~$113–190 depending on spec (38% COGS at $299 = $114, at $549 = $209)</div>
          </div>

          {/* Archery COGS breakdown */}
          <div className="pt-3 border-t border-[#1a1a2e]">
            <div className="text-white font-medium mb-2">Archery COGS Breakdown (per unit)</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
              {[
                { part: "Material (filament)", range: "$0.50–1.00" },
                { part: "Electricity", range: "~$0.30/hr" },
                { part: "Packaging", range: "$1–2" },
                { part: "Failed print rate", range: "~5%" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-[#666]">{item.part}</span>
                  <span className="text-[#999] ml-2">{item.range}</span>
                </div>
              ))}
            </div>
            <div className="text-xs text-[#555] mt-2">Default 5% COGS accounts for all material + overhead. At $50 avg price = $2.50 per unit.</div>
          </div>

          {/* Ad benchmarks */}
          <div className="pt-3 border-t border-[#1a1a2e]">
            <div className="text-white font-medium mb-2">Ad Performance Benchmarks (DTC Watch Brands)</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
              {[
                { metric: "CPM (cost per 1k impressions)", range: "$9.20 median (Varos Watches, Apr 2025)" },
                { metric: "CPC (cost per click)", range: "$0.64 median (Varos Watches, Apr 2025)" },
                { metric: "CTR (click-through rate)", range: "1.67% median (Varos Watches, Feb 2025)" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-[#666]">{item.metric}</span>
                  <span className="text-[#999] ml-2">{item.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other assumptions */}
          <div className="pt-3 border-t border-[#1a1a2e]">
            <div className="text-white font-medium mb-2">Other Assumptions</div>
            <ul className="space-y-1.5 text-[13px] text-[#666]">
              <li className="flex items-start gap-2">
                <span className="text-[#555] mt-0.5">&#8226;</span>
                <span>Shipping costs not included — passed to customer at checkout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#555] mt-0.5">&#8226;</span>
                <span>No labor cost for Owen&apos;s time is included in COGS or expenses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#555] mt-0.5">&#8226;</span>
                <span>Watch LTV uses 1.2x repeat factor (high AOV, lower repeat). Archery LTV uses 2.0x (consumable accessories, higher repeat). Blended LTV is weighted by revenue share. Validate after 90 days of real data.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#555] mt-0.5">&#8226;</span>
                <span>Watch and archery ad budgets are combined — in practice may be split across separate campaigns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#555] mt-0.5">&#8226;</span>
                <span>Stripe processing fees (~2.9% + $0.30) not deducted — would reduce net by ~3% of revenue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#555] mt-0.5">&#8226;</span>
                <span>Cash flow projection assumes linear ramp; real growth is typically more stepwise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#555] mt-0.5">&#8226;</span>
                <span>LLC/insurance costs (~$2,600–$8,300/year) not included — see Operations section for full business setup costs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
