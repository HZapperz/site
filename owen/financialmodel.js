import { useState } from "react";

const FM = () => {
  const [watches, setWatches] = useState(5);
  const [asp, setAsp] = useState(450);
  const [cogs, setCogs] = useState(38);
  const [days, setDays] = useState(22);
  const [adSpend, setAdSpend] = useState(2000);
  const [software, setSoftware] = useState(150);
  const [labor, setLabor] = useState(0);

  const monthly = watches * days;
  const revenue = monthly * asp;
  const cogsTotal = revenue * (cogs / 100);
  const gross = revenue - cogsTotal;
  const grossMargin = revenue > 0 ? ((gross / revenue) * 100) : 0;
  const totalExpenses = adSpend + software + labor;
  const net = gross - totalExpenses;
  const netMargin = revenue > 0 ? ((net / revenue) * 100) : 0;
  const annualNet = net * 12;
  const adROAS = adSpend > 0 ? (revenue / adSpend) : 0;
  const cac = adSpend > 0 && monthly > 0 ? (adSpend / (monthly * 0.3)) : 0;

  const fmt = (n) => {
    if (Math.abs(n) >= 1000) return (n < 0 ? "-" : "") + "$" + Math.abs(Math.round(n)).toLocaleString();
    return (n < 0 ? "-" : "") + "$" + Math.abs(Math.round(n));
  };

  const Slider = ({ label, value, set, min, max, step, unit, desc }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: "#aaa" }}>{label}</span>
        <span style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>
          {unit === "$" ? fmt(value) : value}{unit === "%" ? "%" : ""}{unit === " days" ? " days" : ""}{unit === "/day" ? "/day" : ""}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => set(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#7c5cfc", height: 6, cursor: "pointer" }} />
      {desc && <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{desc}</div>}
    </div>
  );

  const Metric = ({ label, value, sub, color }) => (
    <div style={{ background: "#141420", borderRadius: 10, padding: "14px 16px", flex: 1, minWidth: 130 }}>
      <div style={{ fontSize: 11, color: "#888", marginBottom: 4, letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: color || "#fff" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{sub}</div>}
    </div>
  );

  const Row = ({ label, value, bold, accent, border }) => (
    <div style={{
      display: "flex", justifyContent: "space-between", padding: "8px 0",
      borderTop: border ? "1px solid #333" : "none",
      fontWeight: bold ? 600 : 400, color: accent ? "#7c5cfc" : bold ? "#fff" : "#bbb", fontSize: 14
    }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );

  const scenarios = [
    { name: "Current state", w: 1.5, p: 400, ad: 0, sw: 0, lb: 0 },
    { name: "Phase 1: Automation", w: 5, p: 425, ad: 0, sw: 100, lb: 0 },
    { name: "Phase 2: Ads live", w: 6, p: 450, ad: 2000, sw: 150, lb: 2000 },
    { name: "Phase 3: Full scale", w: 8, p: 500, ad: 4000, sw: 200, lb: 5000 },
  ];

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", background: "#0a0a0a", color: "#e0e0e0", padding: "24px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#7c5cfc", marginBottom: 4 }}>ZAPP STUDIOS × MODDED SEIKO</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Financial model</h1>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 28 }}>Drag the sliders to model different scenarios. Tap a preset to jump to a phase.</p>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {scenarios.map((s, i) => (
            <button key={i} onClick={() => { setWatches(s.w); setAsp(s.p); setAdSpend(s.ad); setSoftware(s.sw); setLabor(s.lb); }}
              style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid #333", background: "#141420", color: "#ccc", fontSize: 12, cursor: "pointer" }}>
              {s.name}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#7c5cfc", marginBottom: 12, letterSpacing: 1 }}>REVENUE INPUTS</div>
            <Slider label="Watches per day" value={watches} set={setWatches} min={1} max={10} step={0.5} unit="/day" />
            <Slider label="Avg selling price" value={asp} set={setAsp} min={250} max={1000} step={25} unit="$" />
            <Slider label="Working days/month" value={days} set={setDays} min={15} max={26} step={1} unit=" days" />
            <Slider label="COGS %" value={cogs} set={setCogs} min={25} max={50} step={1} unit="%" desc="Parts cost as % of sale price" />

            <div style={{ fontSize: 12, fontWeight: 600, color: "#7c5cfc", marginBottom: 12, marginTop: 24, letterSpacing: 1 }}>EXPENSE INPUTS</div>
            <Slider label="Monthly ad spend" value={adSpend} set={setAdSpend} min={0} max={10000} step={250} unit="$" />
            <Slider label="Software & tools" value={software} set={setSoftware} min={0} max={500} step={10} unit="$" />
            <Slider label="Labor (assistant/tech)" value={labor} set={setLabor} min={0} max={8000} step={500} unit="$" />
          </div>

          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
              <Metric label="MONTHLY REVENUE" value={fmt(revenue)} />
              <Metric label="WATCHES/MONTH" value={monthly} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
              <Metric label="GROSS MARGIN" value={`${Math.round(grossMargin)}%`} sub={fmt(gross) + " gross profit"} />
              <Metric label="NET PROFIT" value={fmt(net)} color={net >= 0 ? "#4ade80" : "#f87171"} sub={`${Math.round(netMargin)}% net margin`} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
              <Metric label="ANNUAL NET PROFIT" value={fmt(annualNet)} color={annualNet >= 0 ? "#4ade80" : "#f87171"} />
              {adSpend > 0 && <Metric label="AD ROAS" value={`${adROAS.toFixed(1)}x`} sub={`${fmt(Math.round(cac))} est. CAC`} />}
            </div>

            <div style={{ background: "#141420", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#7c5cfc", marginBottom: 8, letterSpacing: 1 }}>P&L BREAKDOWN</div>
              <Row label={`Revenue (${monthly} watches × ${fmt(asp)})`} value={fmt(revenue)} bold />
              <Row label={`COGS (${cogs}%)`} value={`-${fmt(cogsTotal)}`} />
              <Row label="Gross profit" value={fmt(gross)} bold border />
              <Row label="Ad spend" value={adSpend > 0 ? `-${fmt(adSpend)}` : "$0"} />
              <Row label="Software & tools" value={software > 0 ? `-${fmt(software)}` : "$0"} />
              <Row label="Labor" value={labor > 0 ? `-${fmt(labor)}` : "$0"} />
              <Row label="Total expenses" value={`-${fmt(totalExpenses)}`} border />
              <Row label="Net monthly profit" value={fmt(net)} bold accent border />

              <div style={{ marginTop: 16, padding: 12, background: "#1a1a2e", borderRadius: 8, fontSize: 12, color: "#aaa", lineHeight: 1.6 }}>
                {net > 5000 && watches >= 6 && <span style={{ color: "#4ade80" }}>At this rate, Owen hits {fmt(annualNet)} annual profit. {annualNet > 300000 ? "C8 territory." : annualNet > 150000 ? "Serious money — C8 is within reach." : "Solid growth trajectory."}</span>}
                {net > 0 && net <= 5000 && <span style={{ color: "#facc15" }}>Profitable but thin. Consider raising ASP or cutting costs before scaling ads.</span>}
                {net <= 0 && <span style={{ color: "#f87171" }}>Negative at these inputs. Reduce expenses or increase volume/price before spending on ads.</span>}
                {adSpend > 0 && adROAS < 3 && <span style={{ display: "block", marginTop: 4, color: "#facc15" }}>ROAS below 3x — ad spend may not be sustainable. Target 3–5x before scaling.</span>}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, background: "#141420", borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#7c5cfc", marginBottom: 12, letterSpacing: 1 }}>SCENARIO COMPARISON</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>{["", "Current", "Phase 1", "Phase 2", "Phase 3"].map((h, i) => (
                  <th key={i} style={{ textAlign: i === 0 ? "left" : "right", padding: "8px 10px", borderBottom: "1px solid #333", color: i === 0 ? "#888" : "#fff", fontWeight: i === 0 ? 400 : 600, fontSize: 11, letterSpacing: 0.5 }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>{[
                { l: "Watches/day", v: [1.5, 5, 6, 8] },
                { l: "ASP", v: ["$400", "$425", "$450", "$500"] },
                { l: "Monthly revenue", v: scenarios.map(s => fmt(s.w * 22 * s.p)) },
                { l: "COGS (38%)", v: scenarios.map(s => fmt(Math.round(s.w * 22 * s.p * 0.38))) },
                { l: "Ad spend", v: scenarios.map(s => fmt(s.ad)) },
                { l: "Software", v: scenarios.map(s => fmt(s.sw)) },
                { l: "Labor", v: scenarios.map(s => fmt(s.lb)) },
                { l: "Net profit", v: scenarios.map(s => { let r = s.w * 22 * s.p; let g = r * 0.62; return fmt(Math.round(g - s.ad - s.sw - s.lb)); }), bold: true },
                { l: "Annual net", v: scenarios.map(s => { let r = s.w * 22 * s.p; let g = r * 0.62; return fmt(Math.round((g - s.ad - s.sw - s.lb) * 12)); }), accent: true },
              ].map((row, ri) => (
                <tr key={ri} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "8px 10px", color: "#888" }}>{row.l}</td>
                  {row.v.map((v, vi) => (
                    <td key={vi} style={{ padding: "8px 10px", textAlign: "right", fontWeight: row.bold ? 600 : 400, color: row.accent ? "#7c5cfc" : row.bold ? "#fff" : "#bbb" }}>{v}</td>
                  ))}
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 10, color: "#444" }}>Zapp Studios × Modded Seiko — Revenue Engineering Model — March 2026</div>
      </div>
    </div>
  );
};

export default FM;