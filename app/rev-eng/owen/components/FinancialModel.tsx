"use client"

import { useState, useMemo } from "react"
import { AlertTriangle } from "lucide-react"

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
        <span className="text-sm text-[#b0aca7]">{label}</span>
        <span className="text-base font-medium text-white">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => set(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[#242220] accent-[#5b8def]"
      />
      {desc && <div className="text-xs text-[#6b6762] mt-1">{desc}</div>}
    </div>
  )
}

function Metric({ label, value, sub, color }: {
  label: string; value: string; sub?: string; color?: string
}) {
  return (
    <div className="bg-[#161625] rounded-xl p-4 sm:p-5 flex-1 min-w-[120px] sm:min-w-[140px]">
      <div className="text-xs text-[#8a8580] mb-1 tracking-wider uppercase">{label}</div>
      <div className="text-xl sm:text-2xl font-semibold" style={{ color: color || "#fff" }}>{value}</div>
      {sub && <div className="text-xs text-[#6b6762] mt-1">{sub}</div>}
    </div>
  )
}

function Row({ label, value, bold, accent, border }: {
  label: string; value: string; bold?: boolean; accent?: boolean; border?: boolean
}) {
  return (
    <div className={`flex justify-between py-2.5 text-[15px] ${border ? "border-t border-[#302d2a]" : ""}`}>
      <span className={bold ? "font-semibold text-white" : "text-[#b0aca7]"}>{label}</span>
      <span className={`${accent ? "text-[#5b8def] font-semibold" : bold ? "text-white font-semibold" : "text-[#c0bcb7]"}`}>{value}</span>
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
  return Math.round(wg + ag - s.ad - s.sw - 250)
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
  const [insurance, setInsurance] = useState(250)
  const [taxRate, setTaxRate] = useState(25)
  const [includeStripe, setIncludeStripe] = useState(true)

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
  const totalExpenses = adSpend + software + stripeFees + insurance
  const net = totalGross - totalExpenses
  const annualNet = net * 12
  const taxAmount = net > 0 ? net * (taxRate / 100) : 0
  const takeHome = net - taxAmount
  const annualTakeHome = takeHome * 12
  const c8Progress = Math.min(100, Math.round((annualTakeHome / 68000) * 100))
  const c8Color = c8Progress >= 100 ? "#34d399" : c8Progress >= 60 ? "#facc15" : "#fb7185"

  // ─── Unit Economics (mode-dependent) ─── //
  const unitEcon = useMemo(() => {
    const cpm = 9.2
    const ctr = 0.0167
    const impressions = adSpend > 0 ? (adSpend / cpm) * 1000 : 0
    const clicks = impressions * ctr
    const watchConvRate = econ.watchConv / 100
    const estimatedWatchCustomers = clicks > 0 ? Math.round(clicks * watchConvRate) : watchStock + watchCustom
    const estimatedArcheryCustomers = adSpend > 0 ? Math.round(adSpend / econ.archeryCac) : archeryParts

    const totalEstCustomers = estimatedWatchCustomers + estimatedArcheryCustomers
    const cac = totalEstCustomers > 0 ? adSpend / totalEstCustomers : 0

    const breakEvenRoas = totalGrossMargin > 0 ? 1 / totalGrossMargin : Infinity

    const watchUnits = watchStock + watchCustom
    const avgWatchPrice = watchUnits > 0 ? (watchStock * watchStockPrice + watchCustom * watchCustomPrice) / watchUnits : 0
    const watchLtv = avgWatchPrice * 1.2

    const avgArcheryPrice = archeryParts > 0 ? archeryRev / archeryParts : 0
    const archeryLtv = avgArcheryPrice * 2.0

    const watchRevShare = totalRev > 0 ? (watchStock * watchStockPrice + watchCustom * watchCustomPrice) / totalRev : 0
    const archeryRevShare = totalRev > 0 ? archeryRev / totalRev : 0
    const blendedLtv = (watchLtv * watchRevShare) + (archeryLtv * archeryRevShare)

    const ltvCacRatio = cac > 0 ? blendedLtv / cac : Infinity

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

  // ─── 12-month cash flow projection ─── //
  const cashFlow = useMemo(() => {
    const months: { month: number; rev: number; cogs: number; adCost: number; swCost: number; insCost: number; netCash: number; cumulative: number }[] = []
    let cumulative = 0
    for (let m = 1; m <= 12; m++) {
      // Months 1-6: ramp from 50% to 100%. Months 7-12: hold at 100% + 5%/month growth (caps at 1.3x)
      const ramp = m <= 6 ? (0.5 + 0.5 * (m / 6)) : Math.min(1.3, 1.0 + (m - 6) * 0.05)
      const mWatchStock = Math.round(watchStock * ramp)
      const mWatchCustom = Math.round(watchCustom * ramp)
      const mArchery = Math.round(archeryParts * ramp)
      const mAd = Math.round(adSpend * (m <= 6 ? (0.5 + 0.5 * (m / 6)) : 1.0))
      const mSw = software

      const mWatchRev = mWatchStock * watchStockPrice + mWatchCustom * watchCustomPrice
      const mArcheryRev = mArchery * archeryPrice
      const mRev = mWatchRev + mArcheryRev
      const mWatchCogs = mWatchRev * (watchCogs / 100)
      const mArcheryCogs = mArcheryRev * (archeryCogs / 100)
      const mCogs = mWatchCogs + mArcheryCogs
      const mStripeFees = includeStripe ? (mRev * 0.029 + (mWatchStock + mWatchCustom + mArchery) * 0.30) : 0
      const mIns = insurance
      const mNet = mRev - mCogs - mAd - mSw - mStripeFees - mIns
      cumulative += mNet

      months.push({
        month: m,
        rev: Math.round(mRev),
        cogs: Math.round(mCogs),
        adCost: mAd,
        swCost: mSw,
        insCost: mIns,
        netCash: Math.round(mNet),
        cumulative: Math.round(cumulative),
      })
    }
    return months
  }, [watchStock, watchCustom, archeryParts, watchStockPrice, watchCustomPrice, archeryPrice, watchCogs, archeryCogs, adSpend, software, insurance, includeStripe])

  const hasNegativeCumulative = cashFlow.some(m => m.cumulative < 0)
  const breakEvenMonth = cashFlow.find(m => m.cumulative >= 0 && m.month > 1)?.month
  const maxNegativeCumulative = Math.min(0, ...cashFlow.map(m => m.cumulative))

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
            className="px-4 py-2 rounded-full border border-[#302d2a] bg-[#161625] text-[#c4c0bc] text-xs cursor-pointer hover:border-[#5b8def] hover:text-white transition-all">
            {s.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 -mt-4">
        <span className="text-[10px] text-[#fb7185] font-semibold tracking-widest self-center mr-1">STRESS TESTS</span>
        {scenarios.filter(s => s.stress).map((s, i) => (
          <button key={i} onClick={() => applyScenario(s)}
            className="px-4 py-2 rounded-full border border-[#fb7185]/30 bg-[#fb7185]/5 text-[#fb7185] text-xs cursor-pointer hover:border-[#fb7185] hover:text-white transition-all">
            {s.name}
          </button>
        ))}
      </div>

      {/* Scenario mode toggle */}
      <div className="bg-[#161625] rounded-xl p-5 border border-white/[0.08]">
        <div className="text-xs font-semibold text-[#5b8def] mb-3 tracking-widest">UNIT ECONOMICS MODE</div>
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
                    ? "border-[#5b8def] bg-[#5b8def]/10 text-white"
                    : "border-[#302d2a] bg-transparent text-[#8a8580] hover:border-[#6b6762] hover:text-[#b0aca7]"
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
          <div className="text-xs font-semibold text-[#5b8def] mb-4 tracking-widest">WATCH BUSINESS</div>
          <Slider label="Stock watches/month" value={watchStock} set={setWatchStock} min={0} max={40} step={1} unit="/mo" />
          <Slider label="Stock price" value={watchStockPrice} set={setWatchStockPrice} min={199} max={499} step={10} unit="$" />
          <Slider label="Custom watches/month" value={watchCustom} set={setWatchCustom} min={0} max={20} step={1} unit="/mo" />
          <Slider label="Custom price" value={watchCustomPrice} set={setWatchCustomPrice} min={399} max={999} step={25} unit="$" />
          <Slider label="Watch COGS %" value={watchCogs} set={setWatchCogs} min={25} max={50} step={1} unit="%" desc="Parts cost as % of sale price" />

          <div className="text-xs font-semibold text-[#34d399] mb-4 mt-8 tracking-widest">ARCHERY BUSINESS</div>
          <Slider label="Parts sold/month" value={archeryParts} set={setArcheryParts} min={0} max={500} step={10} unit="/mo" />
          <Slider label="Avg price per part" value={archeryPrice} set={setArcheryPrice} min={20} max={150} step={5} unit="$" />
          <Slider label="Archery COGS %" value={archeryCogs} set={setArcheryCogs} min={1} max={15} step={1} unit="%" desc="Material, electricity, packaging, ~5% fail rate" />

          <div className="text-xs font-semibold text-[#948f8a] mb-4 mt-8 tracking-widest">SHARED EXPENSES</div>
          <Slider label="Monthly ad spend" value={adSpend} set={setAdSpend} min={0} max={10000} step={250} unit="$" />
          <Slider label="Software & hosting" value={software} set={setSoftware} min={0} max={500} step={10} unit="$" />
          <Slider label="Monthly insurance (amortized)" value={insurance} set={setInsurance} min={0} max={700} step={25} unit="$" desc="Product liability + general — $2,500-$8,000/year" />
          <Slider label="Estimated tax rate" value={taxRate} set={setTaxRate} min={0} max={40} step={5} unit="%" desc="Federal + state on net profit" />
          <div className="flex items-center gap-3 mt-4 mb-2">
            <button
              onClick={() => setIncludeStripe(!includeStripe)}
              className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${includeStripe ? "bg-[#5b8def]" : "bg-[#302d2a]"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${includeStripe ? "left-[22px]" : "left-0.5"}`} />
            </button>
            <span className="text-sm text-[#b0aca7]">Include Stripe fees (2.9% + $0.30/tx)</span>
            {includeStripe && totalRev > 0 && <span className="text-xs text-[#fb7185]">-{fmt(Math.round(stripeFees))}/mo</span>}
          </div>
        </div>

        {/* Outputs */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2.5 mb-4">
            <Metric label="Watch Revenue" value={fmt(watchRev)} sub={`${watchStock + watchCustom} watches`} />
            <Metric label="Archery Revenue" value={fmt(archeryRev)} sub={`${archeryParts} parts`} color={archeryParts > 0 ? "#34d399" : "#fff"} />
          </div>
          <div className="flex flex-wrap gap-2.5 mb-4">
            <Metric label="Combined Revenue" value={fmt(totalRev)} />
            <Metric label="Net Profit" value={fmt(net)} color={net >= 0 ? "#34d399" : "#fb7185"} sub={`${totalRev > 0 ? Math.round((net / totalRev) * 100) : 0}% net margin`} />
          </div>
          <div className="flex flex-wrap gap-2.5 mb-4">
            <Metric label="Annual Net" value={fmt(annualNet)} color={annualNet >= 0 ? "#34d399" : "#fb7185"} />
          </div>
          <div className="flex flex-wrap gap-2.5 mb-6">
            <Metric label="Tax Estimate" value={fmt(taxAmount * 12)} sub={`${taxRate}% effective rate`} color={taxAmount > 0 ? "#fb7185" : "#fff"} />
            <Metric label="Real Take-Home" value={fmt(annualTakeHome)} color={annualTakeHome >= 68000 ? "#34d399" : annualTakeHome >= 40000 ? "#facc15" : "#fb7185"} sub="annual, after tax + insurance" />
          </div>

          {/* C8 Progress Bar */}
          <div className="bg-[#161625] rounded-xl p-5 mb-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs font-semibold text-[#5b8def] tracking-widest">C8 PROGRESS</span>
              <span className="text-lg font-bold" style={{ color: c8Color }}>{c8Progress}%</span>
            </div>
            <div className="h-3 bg-[#242220] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c8Progress}%`, backgroundColor: c8Color }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#6b6762]">
              <span>$0</span>
              <span>$68,000 / year</span>
            </div>
            <div className="mt-3 text-sm text-[#948f8a]">
              {c8Progress >= 100 ? (
                <span className="text-[#34d399] font-medium">Owen&apos;s getting the C8. {annualTakeHome > 100000 ? "And then some." : ""}</span>
              ) : c8Progress >= 60 ? (
                <span className="text-[#facc15]">On track — scale archery volume or raise custom watch prices to close the gap.</span>
              ) : (
                <span className="text-[#fb7185]">Below target. Need more volume or higher pricing to hit C8 this year.</span>
              )}
            </div>
          </div>

          {/* P&L Breakdown */}
          <div className="bg-[#161625] rounded-xl p-5">
            <div className="text-xs font-semibold text-[#5b8def] mb-3 tracking-widest">P&L BREAKDOWN</div>
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
            <Row label={`Insurance (amortized)`} value={insurance > 0 ? `-${fmt(insurance)}` : "$0"} />
            <Row label={`Est. tax (${taxRate}%)`} value={taxAmount > 0 ? `-${fmt(taxAmount)}` : "$0"} />
            <Row label="Net monthly profit" value={fmt(net)} bold accent border />
            <Row label="Take-home (post-tax)" value={fmt(takeHome)} bold accent border />
          </div>
        </div>
      </div>

      {/* CAC & Unit Economics */}
      <div className="bg-[#161625] rounded-xl p-5 border border-white/[0.08]">
        <div className="text-xs font-semibold text-[#5b8def] mb-4 tracking-widest">
          CAC & UNIT ECONOMICS
          <span className="ml-2 text-[#6b6762] font-normal normal-case tracking-normal">({econAssumptions[econMode].label} mode)</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* CAC */}
          <div className="bg-[#0e0e1a] rounded-lg p-4">
            <div className="text-[10px] text-[#8a8580] tracking-wider uppercase mb-1">Customer Acq. Cost</div>
            <div className="text-xl font-semibold text-white">
              {adSpend > 0 && unitEcon.totalEstCustomers > 0 ? fmt(unitEcon.cac) : "—"}
            </div>
            <div className="text-[10px] text-[#6b6762] mt-1">
              {adSpend > 0 ? `${fmt(adSpend)} spend / ~${unitEcon.totalEstCustomers} customers` : "No ad spend"}
            </div>
          </div>

          {/* Break-even ROAS */}
          <div className="bg-[#0e0e1a] rounded-lg p-4">
            <div className="text-[10px] text-[#8a8580] tracking-wider uppercase mb-1">Break-even ROAS</div>
            <div className="text-xl font-semibold text-white">
              {totalGrossMargin > 0 ? `${unitEcon.breakEvenRoas}x` : "—"}
            </div>
            <div className="text-[10px] text-[#6b6762] mt-1">
              1 / {pct(totalGrossMargin)} gross margin
            </div>
          </div>

          {/* LTV */}
          <div className="bg-[#0e0e1a] rounded-lg p-4">
            <div className="text-[10px] text-[#8a8580] tracking-wider uppercase mb-1">Est. Lifetime Value</div>
            <div className="text-xl font-semibold text-white">
              {(watchStock + watchCustom + archeryParts) > 0 ? fmt(unitEcon.blendedLtv) : "—"}
            </div>
            <div className="text-[10px] text-[#6b6762] mt-1">
              {(watchStock + watchCustom) > 0 && <>Watch: {fmt(unitEcon.watchLtv)} (1.2x) </>}
              {(watchStock + watchCustom) > 0 && archeryParts > 0 && <>&middot; </>}
              {archeryParts > 0 && <>Archery: {fmt(unitEcon.archeryLtv)} (2.0x)</>}
            </div>
            <div className="text-[10px] text-[#fb7185]/60 mt-1">Assumed — validate after 90 days</div>
          </div>

          {/* LTV:CAC */}
          <div className="bg-[#0e0e1a] rounded-lg p-4">
            <div className="text-[10px] text-[#8a8580] tracking-wider uppercase mb-1">LTV : CAC</div>
            <div className="text-xl font-semibold" style={{
              color: adSpend === 0 || unitEcon.cac === 0
                ? "#fff"
                : unitEcon.ltvCacRatio >= 3
                  ? "#34d399"
                  : unitEcon.ltvCacRatio >= 2
                    ? "#facc15"
                    : "#fb7185"
            }}>
              {adSpend > 0 && unitEcon.cac > 0
                ? `${unitEcon.ltvCacRatio}x`
                : "—"}
            </div>
            <div className="text-[10px] mt-1" style={{
              color: adSpend === 0 || unitEcon.cac === 0
                ? "#6b6762"
                : unitEcon.ltvCacRatio >= 3
                  ? "#34d399"
                  : unitEcon.ltvCacRatio >= 2
                    ? "#facc15"
                    : "#fb7185"
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
          <div className="mt-4 pt-4 border-t border-[#1c1c2e]">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-xs text-[#8a8580]">Actual ROAS vs break-even</span>
              <span className="text-sm font-medium" style={{
                color: unitEcon.actualRoas >= unitEcon.breakEvenRoas ? "#34d399" : "#fb7185"
              }}>
                {unitEcon.actualRoas}x actual / {unitEcon.breakEvenRoas}x break-even
              </span>
            </div>
            <div className="h-2 bg-[#242220] rounded-full overflow-hidden relative">
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
                  backgroundColor: unitEcon.actualRoas >= unitEcon.breakEvenRoas ? "#34d399" : "#fb7185",
                }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-[#6b6762]">
              <span>0x</span>
              <span>{econ.roas * 2}x</span>
            </div>
          </div>
        )}
      </div>

      {/* Cash Flow Timeline */}
      <div className="bg-[#161625] rounded-xl p-5 border border-white/[0.08] overflow-hidden">
        <div className="flex justify-between items-baseline mb-4">
          <div className="text-xs font-semibold text-[#5b8def] tracking-widest">12-MONTH CASH FLOW PROJECTION</div>
          {hasNegativeCumulative && (
            <span className="text-xs text-[#fb7185] font-medium flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#fb7185] animate-pulse" />
              Negative cash months detected
            </span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["Month", "Revenue", "COGS", "Ad Spend", "Software", "Insurance", "Net Cash", "Cumulative"].map((h, i) => (
                  <th key={i} className={`${i === 0 ? "text-left" : "text-right"} py-2.5 px-3 border-b border-[#302d2a] text-[10px] tracking-wider text-[#8a8580]`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cashFlow.map((m) => {
                const isBreakEven = breakEvenMonth === m.month
                const isPhase2Start = m.month === 7
                return (
                  <tr key={m.month} className={`border-b border-[#1c1c2e] ${isBreakEven ? "bg-[#34d399]/[0.04]" : ""} ${isPhase2Start ? "border-t-2 border-t-[#5b8def]/30" : ""}`}>
                    <td className="py-2.5 px-3 text-[#b0aca7]">
                      M{m.month}
                      {isBreakEven && <span className="ml-1.5 text-[10px] text-[#34d399] font-semibold">BREAK-EVEN</span>}
                    </td>
                    <td className="py-2.5 px-3 text-right text-[#c0bcb7]">{fmt(m.rev)}</td>
                    <td className="py-2.5 px-3 text-right text-[#b0aca7]">-{fmt(m.cogs)}</td>
                    <td className="py-2.5 px-3 text-right text-[#b0aca7]">-{fmt(m.adCost)}</td>
                    <td className="py-2.5 px-3 text-right text-[#b0aca7]">-{fmt(m.swCost)}</td>
                    <td className="py-2.5 px-3 text-right text-[#b0aca7]">-{fmt(m.insCost)}</td>
                    <td className="py-2.5 px-3 text-right font-medium" style={{ color: m.netCash >= 0 ? "#34d399" : "#fb7185" }}>
                      {fmt(m.netCash)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold" style={{ color: m.cumulative >= 0 ? "#34d399" : "#fb7185" }}>
                      {fmt(m.cumulative)}
                      {m.cumulative < 0 && <span className="ml-1 text-[10px] text-[#fb7185]">!</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-[#6b6762]">
          Months 1-6: linear ramp from 50% to full slider values. Months 7-12: full volume + 5%/month growth. Ad spend caps at full slider value from Month 7.{includeStripe && " Stripe fees included."}
        </div>

        {/* Cash Reserve Needed callout */}
        {maxNegativeCumulative < 0 && (
          <div className="mt-4 flex items-start gap-3 p-4 rounded-lg bg-[#fb7185]/5 border-l-4 border-l-[#fb7185]">
            <AlertTriangle size={18} className="text-[#fb7185] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white mb-1">Cash Reserve Needed: {fmt(Math.abs(maxNegativeCumulative))}</div>
              <div className="text-xs text-[#b0aca7]">Owen needs at least this much in savings before starting to cover expenses during the ramp-up period. This is the deepest the cumulative cash dips before turning positive{breakEvenMonth ? ` in Month ${breakEvenMonth}` : ""}.</div>
            </div>
          </div>
        )}
      </div>

      {/* Scenario Comparison (with break-even indicator) */}
      <div className="bg-[#161625] rounded-xl p-5 border border-white/[0.08] overflow-hidden">
        <div className="text-xs font-semibold text-[#5b8def] mb-4 tracking-widest">SCENARIO COMPARISON</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["", ...scenarios.map(s => s.name)].map((h, i) => (
                  <th key={i} className={`${i === 0 ? "text-left" : "text-right"} py-2.5 px-3 border-b border-[#302d2a] text-xs tracking-wider ${i === 0 ? "text-[#8a8580]" : i > 0 && scenarios[i - 1]?.stress ? "text-[#fb7185] font-semibold" : "text-white font-semibold"}`}>
                    <span>{h}</span>
                    {i > 0 && i - 1 === firstBreakEvenIdx && scenarioBreakEven[i - 1] && (
                      <span className="ml-1.5 text-[10px] text-[#34d399] font-normal tracking-normal">BREAK-EVEN</span>
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
                <tr key={ri} className="border-b border-[#1c1c2e]">
                  <td className="py-2.5 px-3 text-[#8a8580]">{row.l}</td>
                  {row.v.map((v, vi) => {
                    const isBreakEvenCol = vi === firstBreakEvenIdx && scenarioBreakEven[vi]
                    return (
                      <td
                        key={vi}
                        className={`py-2.5 px-3 text-right ${
                          row.accent
                            ? "text-[#5b8def] font-semibold"
                            : row.bold
                              ? "text-white font-semibold"
                              : "text-[#b0aca7]"
                        } ${isBreakEvenCol ? "bg-[#34d399]/[0.04]" : ""}`}
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
      <div className="bg-[#161625] rounded-xl p-5 border border-white/[0.08]">
        <div className="text-xs font-semibold text-[#5b8def] mb-4 tracking-widest">KEY ASSUMPTIONS</div>

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
                  <span className="text-[#8a8580]">{item.part}</span>
                  <span className="text-[#b0aca7] ml-2">{item.range}</span>
                </div>
              ))}
            </div>
            <div className="text-xs text-[#6b6762] mt-2">Total per watch: ~$113–190 depending on spec (38% COGS at $299 = $114, at $549 = $209)</div>
          </div>

          {/* Archery COGS breakdown */}
          <div className="pt-3 border-t border-[#1c1c2e]">
            <div className="text-white font-medium mb-2">Archery COGS Breakdown (per unit)</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
              {[
                { part: "Material (filament)", range: "$0.50–1.00" },
                { part: "Electricity", range: "~$0.30/hr" },
                { part: "Packaging", range: "$1–2" },
                { part: "Failed print rate", range: "~5%" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-[#8a8580]">{item.part}</span>
                  <span className="text-[#b0aca7] ml-2">{item.range}</span>
                </div>
              ))}
            </div>
            <div className="text-xs text-[#6b6762] mt-2">Default 5% COGS accounts for all material + overhead. At $50 avg price = $2.50 per unit.</div>
          </div>

          {/* Ad benchmarks */}
          <div className="pt-3 border-t border-[#1c1c2e]">
            <div className="text-white font-medium mb-2">Ad Performance Benchmarks (DTC Watch Brands)</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
              {[
                { metric: "CPM (cost per 1k impressions)", range: "$9.20 median (Varos Watches, Apr 2025)" },
                { metric: "CPC (cost per click)", range: "$0.64 median (Varos Watches, Apr 2025)" },
                { metric: "CTR (click-through rate)", range: "1.67% median (Varos Watches, Feb 2025)" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-[#8a8580]">{item.metric}</span>
                  <span className="text-[#b0aca7] ml-2">{item.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other assumptions */}
          <div className="pt-3 border-t border-[#1c1c2e]">
            <div className="text-white font-medium mb-2">Other Assumptions</div>
            <ul className="space-y-1.5 text-[13px] text-[#8a8580]">
              <li className="flex items-start gap-2">
                <span className="text-[#6b6762] mt-0.5">&#8226;</span>
                <span>Shipping costs not included — passed to customer at checkout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6b6762] mt-0.5">&#8226;</span>
                <span>No labor cost for Owen&apos;s time is included in COGS or expenses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6b6762] mt-0.5">&#8226;</span>
                <span>Watch LTV uses 1.2x repeat factor (high AOV, lower repeat). Archery LTV uses 2.0x (consumable accessories, higher repeat). Blended LTV is weighted by revenue share. Validate after 90 days of real data.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6b6762] mt-0.5">&#8226;</span>
                <span>Watch and archery ad budgets are combined — in practice may be split across separate campaigns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6b6762] mt-0.5">&#8226;</span>
                <span>Stripe processing fees (2.9% + $0.30/tx) are included by default — toggle off above to see pre-fee numbers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6b6762] mt-0.5">&#8226;</span>
                <span>Cash flow projection assumes linear ramp months 1-6, then 5% monthly growth; real growth is typically more stepwise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6b6762] mt-0.5">&#8226;</span>
                <span>LLC/insurance costs (~$2,600–$8,300/year) not included — see Operations section for full business setup costs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6b6762] mt-0.5">&#8226;</span>
                <span>Insurance and taxes are now included in the model. Insurance is amortized monthly from the annual premium. Tax rate is an estimate — consult a CPA for actual quarterly payments.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
