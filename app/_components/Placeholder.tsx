const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }

export type PlaceholderMode = 'cream' | 'dark'

/**
 * Elegant placeholder for assets Hamza still needs to produce.
 * Renders a dashed box with a label so the layout reads correctly
 * and he can see exactly what's missing.
 */
export default function Placeholder({
  kind,
  label,
  aspect = '16/9',
  mode = 'cream',
  height,
}: {
  kind: string
  label: string
  aspect?: string
  mode?: PlaceholderMode
  height?: string
}) {
  const isCream = mode === 'cream'

  const bg = isCream ? 'rgba(12,12,12,0.04)' : 'rgba(245,239,224,0.04)'
  const border = isCream ? 'rgba(12,12,12,0.2)' : 'rgba(245,239,224,0.2)'
  const kindColor = '#E8903A'
  const labelColor = isCream ? '#3A3632' : '#A09A8E'
  const hintColor = isCream ? '#7A756D' : '#6B6560'

  return (
    <div
      className="w-full rounded flex items-center justify-center"
      style={{
        backgroundColor: bg,
        border: `1px dashed ${border}`,
        aspectRatio: height ? undefined : aspect,
        height: height,
        minHeight: '160px',
      }}
    >
      <div className="text-center px-6 py-8">
        <p
          className="text-[10px] uppercase mb-3"
          style={{ ...MONO, letterSpacing: '0.22em', color: kindColor }}
        >
          {kind}
        </p>
        <p
          className="text-base font-semibold mb-1"
          style={{ ...DISPLAY, color: labelColor }}
        >
          {label}
        </p>
        <p className="text-xs" style={{ ...MONO, color: hintColor }}>
          Awaiting asset
        </p>
      </div>
    </div>
  )
}
