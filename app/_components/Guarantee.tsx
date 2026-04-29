import { Shield } from 'lucide-react'
import Placeholder from './Placeholder'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }

export type GuaranteeMode = 'cream' | 'dark'

export default function Guarantee({ mode = 'cream' }: { mode?: GuaranteeMode }) {
  const isCream = mode === 'cream'

  const bg = isCream ? '#EEE7D3' : '#141414'
  const border = isCream ? 'rgba(232,144,58,0.35)' : 'rgba(232,144,58,0.35)'
  const textPrimary = isCream ? '#0C0C0C' : '#F5EFE0'
  const textSecondary = isCream ? '#3A3632' : '#A09A8E'
  const textMuted = isCream ? '#7A756D' : '#6B6560'

  return (
    <div
      className="p-8 md:p-10 rounded relative overflow-hidden"
      style={{
        backgroundColor: bg,
        border: `2px solid ${border}`,
      }}
    >
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
        style={{
          backgroundColor: 'rgba(232,144,58,0.1)',
          border: '1px solid rgba(232,144,58,0.3)',
        }}
      >
        <Shield size={12} color="#E8903A" />
        <span
          className="text-[10px] font-semibold"
          style={{ ...MONO, letterSpacing: '0.18em', color: '#E8903A' }}
        >
          THE SHIP-ON-TIME GUARANTEE
        </span>
      </div>

      {/* The promise */}
      <p
        className="text-2xl md:text-3xl leading-snug mb-6 max-w-2xl"
        style={{ ...SERIF, color: textPrimary, fontWeight: 500, fontStyle: 'italic' }}
      >
        &ldquo;If I miss the 7-day deadline, you pay $0. No retainer, no
        &lsquo;project management fees,&rsquo; no excuses. I only get paid if I deliver.&rdquo;
      </p>

      {/* Signature row */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div style={{ width: '220px' }}>
            <Placeholder
              kind="SIGNATURE"
              label="hamza-signature.svg"
              height="56px"
              mode={mode}
            />
          </div>
          <p
            className="text-xs mt-3"
            style={{ ...MONO, color: textSecondary, letterSpacing: '0.05em' }}
          >
            Hamza Zulquernain · Founder, Zapp Studios
          </p>
        </div>

        <div className="text-right">
          <p
            className="text-[10px] uppercase mb-1"
            style={{ ...MONO, letterSpacing: '0.18em', color: textMuted }}
          >
            Backed by
          </p>
          <p className="text-sm font-semibold" style={{ ...DISPLAY, color: textPrimary }}>
            Fixed scope · Fixed fee · Fixed deadline
          </p>
        </div>
      </div>
    </div>
  )
}
