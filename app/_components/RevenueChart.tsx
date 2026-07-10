const MONO = "'JetBrains Mono', monospace"

/**
 * Royal Pawz monthly revenue index — the one shared data source for the
 * homepage ledger and the startups dashboard. Mirrors the production-data
 * series in the Part II case study (zapp/royal-pawz/royal-pawz-case-study-part2.html),
 * which reconciles with the published Part I methodology: net service revenue
 * indexed to the December 2025 baseline; dollar figures deliberately not
 * shown on marketing pages. July 2026 (partial month) is excluded — plotting
 * it would read as a decline. Update alongside the case study or the
 * homepage contradicts it.
 */
export const REVENUE_INDEX = [
  { m: "Dec '25", v: 1.0 },
  { m: 'Jan', v: 1.9 },
  { m: 'Feb', v: 4.0 },
  { m: 'Mar', v: 7.7 },
  { m: 'Apr', v: 8.5 }, // full month (Part I showed 7.9 through Apr 22)
  { m: 'May', v: 13.6 }, // peak
  { m: 'Jun', v: 12.0 },
]

const Y_MAX = 14
const PEAK_INDEX = 5 // May

export type RevenueChartVariant = 'cream' | 'dark'

export default function RevenueChart({
  variant,
  className = '',
}: {
  variant: RevenueChartVariant
  className?: string
}) {
  const isCream = variant === 'cream'
  const grid = isCream ? 'rgba(12,12,12,0.09)' : 'rgba(245,239,224,0.07)'
  const axis = isCream ? '#7A756D' : '#6B6560'
  const line = isCream ? '#0C0C0C' : '#E8903A'
  const annotation = isCream ? '#0C0C0C' : '#F5EFE0'
  const endDotStroke = isCream ? '#0C0C0C' : '#141414'

  // Plot area: x 44→320, y 20 (Y_MAX) → 140 (0)
  const points = REVENUE_INDEX.map((d, i) => ({
    x: 44 + (i * (320 - 44)) / (REVENUE_INDEX.length - 1),
    y: 140 - (d.v / Y_MAX) * 120,
  }))
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L${points[points.length - 1].x} 140 L${points[0].x} 140 Z`
  const first = points[0]
  const peak = points[PEAK_INDEX]
  const last = points[points.length - 1]
  const yAt = (v: number) => 140 - (v / Y_MAX) * 120

  const label = REVENUE_INDEX.map(d => `${d.m}: ${d.v.toFixed(1)}×`).join(', ')

  return (
    <svg
      viewBox="0 0 340 170"
      className={className}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label={`Royal Pawz monthly revenue, indexed to December 2025 baseline: ${label}. Engagement still running; July excluded as a partial month.`}
    >
      <g stroke={grid} strokeWidth="1">
        <line x1="44" y1={yAt(12)} x2="320" y2={yAt(12)} />
        <line x1="44" y1={yAt(6)} x2="320" y2={yAt(6)} />
        <line x1="44" y1="140" x2="320" y2="140" />
      </g>
      <g fontFamily={MONO} fontSize="9" fill={axis}>
        <text x="38" y={yAt(12) + 3} textAnchor="end">12×</text>
        <text x="38" y={yAt(6) + 3} textAnchor="end">6×</text>
        <text x="38" y="143" textAnchor="end">0</text>
        <text x="44" y="158">Dec &rsquo;25</text>
        <text x="320" y="158" textAnchor="end">Jun &rsquo;26</text>
      </g>
      {!isCream && <path d={areaPath} fill="rgba(232,144,58,0.13)" stroke="none" />}
      <path
        d={linePath}
        fill="none"
        stroke={line}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={first.x} cy={first.y} r="3" fill={line} />
      <circle cx={peak.x} cy={peak.y} r="3" fill={line} />
      <circle cx={last.x} cy={last.y} r="5" fill="#E8903A" stroke={endDotStroke} strokeWidth="1.5" />
      <g fontFamily={MONO} fontSize="10" fontWeight="700" fill={annotation}>
        <text x={first.x + 12} y={first.y - 5}>1.0×</text>
        <text x={peak.x} y={peak.y - 9} textAnchor="middle">peak 13.6×</text>
        <text x={last.x} y={last.y + 21} textAnchor="end">12.0×</text>
      </g>
    </svg>
  )
}
