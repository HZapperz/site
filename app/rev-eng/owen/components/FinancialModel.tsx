"use client"

import { useState } from "react"

const scenarios = [
  { name: "Current State", ws: 20, wp: 299, wc: 0, wcp: 549, ap: 0, app: 50, ad: 0, sw: 0 },
  { name: "Month 3", ws: 15, wp: 299, wc: 5, wcp: 549, ap: 50, app: 50, ad: 1000, sw: 50 },
  { name: "Month 6", ws: 15, wp: 299, wc: 10, wcp: 549, ap: 150, app: 55, ad: 2000, sw: 100 },
  { name: "C8 Target", ws: 20, wp: 299, wc: 10, wcp: 599, ap: 200, app: 60, ad: 3000, sw: 100 },
]

function fmt(n: number) {
  if (Math.abs(n) >= 1000) return (n < 0 ? "-" : "") + "$" + Math.abs(Math.round(n)).toLocaleString()
  return (n < 0 ? "-" : "") + "$" + Math.abs(Math.round(n))
}

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

export default function FinancialModel() {
  const [watchStock, setWatchStock] = useState(15)
  const [watchStockPrice, setWatchStockPrice] = useState(299)
  const [watchCustom, setWatchCustom] = useState(5)
  const [watchCustomPrice, setWatchCustomPrice] = useState(549)
  const [watchCogs, setWatchCogs] = useState(38)
  const [archeryParts, setArcheryParts] = useState(50)
  const [archeryPrice, setArcheryPrice] = useState(50)
  const [archeryCogs, setArcheryCogs] = useState(2)
  const [adSpend, setAdSpend] = useState(1000)
  const [software, setSoftware] = useState(50)

  // Watch calculations
  const watchStockRev = watchStock * watchStockPrice
  const watchCustomRev = watchCustom * watchCustomPrice
  const watchRev = watchStockRev + watchCustomRev
  const watchCogsTotal = watchRev * (watchCogs / 100)
  const watchGross = watchRev - watchCogsTotal

  // Archery calculations
  const archeryRev = archeryParts * archeryPrice
  const archeryCogsTotal = archeryRev * (archeryCogs / 100)
  const archeryGross = archeryRev - archeryCogsTotal

  // Combined
  const totalRev = watchRev + archeryRev
  const totalGross = watchGross + archeryGross
  const totalExpenses = adSpend + software
  const net = totalGross - totalExpenses
  const annualNet = net * 12
  const c8Progress = Math.min(100, Math.round((annualNet / 68000) * 100))
  const c8Color = c8Progress >= 100 ? "#4ade80" : c8Progress >= 60 ? "#facc15" : "#f87171"

  const applyScenario = (s: typeof scenarios[0]) => {
    setWatchStock(s.ws); setWatchStockPrice(s.wp); setWatchCustom(s.wc)
    setWatchCustomPrice(s.wcp); setArcheryParts(s.ap); setArcheryPrice(s.app)
    setAdSpend(s.ad); setSoftware(s.sw)
  }

  return (
    <div className="space-y-6">
      {/* Scenario presets */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map((s, i) => (
          <button key={i} onClick={() => applyScenario(s)}
            className="px-4 py-2 rounded-full border border-[#333] bg-[#141420] text-[#ccc] text-xs cursor-pointer hover:border-[#7c5cfc] hover:text-white transition-all">
            {s.name}
          </button>
        ))}
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
          <Slider label="Archery COGS %" value={archeryCogs} set={setArcheryCogs} min={1} max={10} step={1} unit="%" desc="Material cost (printing)" />

          <div className="text-xs font-semibold text-[#888] mb-4 mt-8 tracking-widest">SHARED EXPENSES</div>
          <Slider label="Monthly ad spend" value={adSpend} set={setAdSpend} min={0} max={10000} step={250} unit="$" />
          <Slider label="Software & hosting" value={software} set={setSoftware} min={0} max={500} step={10} unit="$" />
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
            <Row label="Net monthly profit" value={fmt(net)} bold accent border />
          </div>
        </div>
      </div>

      {/* Scenario Comparison */}
      <div className="bg-[#141420] rounded-xl p-5 overflow-hidden">
        <div className="text-xs font-semibold text-[#7c5cfc] mb-4 tracking-widest">SCENARIO COMPARISON</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["", "Current", "Month 3", "Month 6", "C8 Target"].map((h, i) => (
                  <th key={i} className={`${i === 0 ? "text-left" : "text-right"} py-2.5 px-3 border-b border-[#333] text-xs tracking-wider ${i === 0 ? "text-[#666]" : "text-white font-semibold"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { l: "Watch rev", v: scenarios.map(s => fmt(s.ws * s.wp + s.wc * s.wcp)) },
                { l: "Archery rev", v: scenarios.map(s => fmt(s.ap * s.app)) },
                { l: "Combined rev", v: scenarios.map(s => fmt(s.ws * s.wp + s.wc * s.wcp + s.ap * s.app)) },
                { l: "Ad spend", v: scenarios.map(s => fmt(s.ad)) },
                { l: "Net profit", v: scenarios.map(s => {
                  const wr = s.ws * s.wp + s.wc * s.wcp; const wg = wr * 0.62
                  const ar = s.ap * s.app; const ag = ar * 0.98
                  return fmt(Math.round(wg + ag - s.ad - s.sw))
                }), bold: true },
                { l: "Annual net", v: scenarios.map(s => {
                  const wr = s.ws * s.wp + s.wc * s.wcp; const wg = wr * 0.62
                  const ar = s.ap * s.app; const ag = ar * 0.98
                  return fmt(Math.round((wg + ag - s.ad - s.sw) * 12))
                }), accent: true },
              ].map((row, ri) => (
                <tr key={ri} className="border-b border-[#1a1a2e]">
                  <td className="py-2.5 px-3 text-[#666]">{row.l}</td>
                  {row.v.map((v, vi) => (
                    <td key={vi} className={`py-2.5 px-3 text-right ${row.accent ? "text-[#7c5cfc] font-semibold" : row.bold ? "text-white font-semibold" : "text-[#999]"}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
