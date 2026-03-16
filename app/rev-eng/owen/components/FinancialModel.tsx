"use client"

import { useState } from "react"

const scenarios = [
  { name: "Current State", w: 1.5, p: 400, ad: 0, sw: 0, lb: 0 },
  { name: "Phase 1: Automation", w: 5, p: 425, ad: 0, sw: 100, lb: 0 },
  { name: "Phase 2: Ads Live", w: 6, p: 450, ad: 2000, sw: 150, lb: 2000 },
  { name: "Phase 3: Full Scale", w: 8, p: 500, ad: 4000, sw: 200, lb: 5000 },
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
      {desc && <div className="text-[10px] text-[#555] mt-1">{desc}</div>}
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
  const [watches, setWatches] = useState(5)
  const [asp, setAsp] = useState(450)
  const [cogs, setCogs] = useState(38)
  const [days, setDays] = useState(22)
  const [adSpend, setAdSpend] = useState(2000)
  const [software, setSoftware] = useState(150)
  const [labor, setLabor] = useState(0)

  const monthly = watches * days
  const revenue = monthly * asp
  const cogsTotal = revenue * (cogs / 100)
  const gross = revenue - cogsTotal
  const grossMargin = revenue > 0 ? (gross / revenue) * 100 : 0
  const totalExpenses = adSpend + software + labor
  const net = gross - totalExpenses
  const netMargin = revenue > 0 ? (net / revenue) * 100 : 0
  const annualNet = net * 12
  const adROAS = adSpend > 0 ? revenue / adSpend : 0
  const cac = adSpend > 0 && monthly > 0 ? adSpend / (monthly * 0.3) : 0

  return (
    <div className="space-y-6">
      {/* Scenario presets */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              setWatches(s.w); setAsp(s.p); setAdSpend(s.ad); setSoftware(s.sw); setLabor(s.lb)
            }}
            className="px-4 py-2 rounded-full border border-[#333] bg-[#141420] text-[#ccc] text-xs cursor-pointer hover:border-[#7c5cfc] hover:text-white transition-all"
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Inputs */}
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-[#7c5cfc] mb-4 tracking-widest">REVENUE INPUTS</div>
          <Slider label="Watches per day" value={watches} set={setWatches} min={1} max={10} step={0.5} unit="/day" />
          <Slider label="Avg selling price" value={asp} set={setAsp} min={250} max={1000} step={25} unit="$" />
          <Slider label="Working days/month" value={days} set={setDays} min={15} max={26} step={1} unit=" days" />
          <Slider label="COGS %" value={cogs} set={setCogs} min={25} max={50} step={1} unit="%" desc="Parts cost as % of sale price" />

          <div className="text-[11px] font-semibold text-[#7c5cfc] mb-4 mt-8 tracking-widest">EXPENSE INPUTS</div>
          <Slider label="Monthly ad spend" value={adSpend} set={setAdSpend} min={0} max={10000} step={250} unit="$" />
          <Slider label="Software & tools" value={software} set={setSoftware} min={0} max={500} step={10} unit="$" />
          <Slider label="Labor (assistant/tech)" value={labor} set={setLabor} min={0} max={8000} step={500} unit="$" />
        </div>

        {/* Outputs */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2.5 mb-4">
            <Metric label="Monthly Revenue" value={fmt(revenue)} />
            <Metric label="Watches/Month" value={String(monthly)} />
          </div>
          <div className="flex flex-wrap gap-2.5 mb-4">
            <Metric label="Gross Margin" value={`${Math.round(grossMargin)}%`} sub={`${fmt(gross)} gross profit`} />
            <Metric label="Net Profit" value={fmt(net)} color={net >= 0 ? "#4ade80" : "#f87171"} sub={`${Math.round(netMargin)}% net margin`} />
          </div>
          <div className="flex flex-wrap gap-2.5 mb-6">
            <Metric label="Annual Net Profit" value={fmt(annualNet)} color={annualNet >= 0 ? "#4ade80" : "#f87171"} />
            {adSpend > 0 && <Metric label="Ad ROAS" value={`${adROAS.toFixed(1)}x`} sub={`${fmt(Math.round(cac))} est. CAC`} />}
          </div>

          {/* P&L Breakdown */}
          <div className="bg-[#141420] rounded-xl p-5">
            <div className="text-[11px] font-semibold text-[#7c5cfc] mb-3 tracking-widest">P&L BREAKDOWN</div>
            <Row label={`Revenue (${monthly} watches x ${fmt(asp)})`} value={fmt(revenue)} bold />
            <Row label={`COGS (${cogs}%)`} value={`-${fmt(cogsTotal)}`} />
            <Row label="Gross profit" value={fmt(gross)} bold border />
            <Row label="Ad spend" value={adSpend > 0 ? `-${fmt(adSpend)}` : "$0"} />
            <Row label="Software & tools" value={software > 0 ? `-${fmt(software)}` : "$0"} />
            <Row label="Labor" value={labor > 0 ? `-${fmt(labor)}` : "$0"} />
            <Row label="Total expenses" value={`-${fmt(totalExpenses)}`} border />
            <Row label="Net monthly profit" value={fmt(net)} bold accent border />

            <div className="mt-4 p-3 bg-[#1a1a2e] rounded-lg text-xs leading-relaxed">
              {net > 5000 && watches >= 6 && (
                <span className="text-[#4ade80]">
                  At this rate, Owen hits {fmt(annualNet)} annual profit.{" "}
                  {annualNet > 300000 ? "C8 territory." : annualNet > 150000 ? "Serious money — C8 is within reach." : "Solid growth trajectory."}
                </span>
              )}
              {net > 0 && net <= 5000 && (
                <span className="text-[#facc15]">Profitable but thin. Consider raising ASP or cutting costs before scaling ads.</span>
              )}
              {net <= 0 && (
                <span className="text-[#f87171]">Negative at these inputs. Reduce expenses or increase volume/price before spending on ads.</span>
              )}
              {adSpend > 0 && adROAS < 3 && (
                <span className="block mt-1 text-[#facc15]">ROAS below 3x — ad spend may not be sustainable. Target 3-5x before scaling.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Comparison Table */}
      <div className="bg-[#141420] rounded-xl p-5 overflow-hidden">
        <div className="text-[11px] font-semibold text-[#7c5cfc] mb-4 tracking-widest">SCENARIO COMPARISON</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["", "Current", "Phase 1", "Phase 2", "Phase 3"].map((h, i) => (
                  <th key={i} className={`${i === 0 ? "text-left" : "text-right"} py-2.5 px-3 border-b border-[#333] text-[10px] tracking-wider ${i === 0 ? "text-[#666]" : "text-white font-semibold"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { l: "Watches/day", v: ["1.5", "5", "6", "8"] },
                { l: "ASP", v: ["$400", "$425", "$450", "$500"] },
                { l: "Monthly revenue", v: scenarios.map(s => fmt(s.w * 22 * s.p)) },
                { l: "COGS (38%)", v: scenarios.map(s => fmt(Math.round(s.w * 22 * s.p * 0.38))) },
                { l: "Ad spend", v: scenarios.map(s => fmt(s.ad)) },
                { l: "Software", v: scenarios.map(s => fmt(s.sw)) },
                { l: "Labor", v: scenarios.map(s => fmt(s.lb)) },
                { l: "Net profit", v: scenarios.map(s => { const r = s.w * 22 * s.p; const g = r * 0.62; return fmt(Math.round(g - s.ad - s.sw - s.lb)); }), bold: true },
                { l: "Annual net", v: scenarios.map(s => { const r = s.w * 22 * s.p; const g = r * 0.62; return fmt(Math.round((g - s.ad - s.sw - s.lb) * 12)); }), accent: true },
              ].map((row, ri) => (
                <tr key={ri} className="border-b border-[#1a1a2e]">
                  <td className="py-2.5 px-3 text-[#666]">{row.l}</td>
                  {row.v.map((v, vi) => (
                    <td key={vi} className={`py-2.5 px-3 text-right ${row.accent ? "text-[#7c5cfc] font-semibold" : row.bold ? "text-white font-semibold" : "text-[#999]"}`}>
                      {v}
                    </td>
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
