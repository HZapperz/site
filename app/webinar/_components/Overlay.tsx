'use client'

import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PANELS, YoursPanel, type Placement } from './content'
import { STOPS } from './stops'
import { AMBER, CREAM_DIM, INK_FAINT, INK_MUTED, MONO } from './theme'

const PLACEMENT: Record<Placement, CSSProperties> = {
  right: { alignItems: 'center', justifyContent: 'flex-end', padding: '0 3.2vw' },
  left: { alignItems: 'center', justifyContent: 'flex-start', padding: '0 3.2vw' },
  bottom: { alignItems: 'flex-end', justifyContent: 'center', padding: '0 4vw 7vh' },
  center: { alignItems: 'center', justifyContent: 'center', padding: '0 4vw' },
}

const CARD: CSSProperties = {
  background: 'rgba(250, 246, 236, 0.93)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: `1px solid ${CREAM_DIM}`,
  borderRadius: 14,
  padding: '28px 32px',
  boxShadow: '0 18px 52px rgba(12, 12, 12, 0.10)',
}

export default function Overlay({
  stopIndex,
  phase,
  yoursLabels,
  onYoursChange,
  reducedMotion,
}: {
  stopIndex: number
  phase: 'idle' | 'moving'
  yoursLabels: [string, string, string, string]
  onYoursChange: (next: [string, string, string, string]) => void
  reducedMotion: boolean
}) {
  const stop = STOPS[stopIndex]
  const isYours = stop.panel === 'yours'
  const def = stop.panel && stop.panel !== 'yours' ? PANELS[stop.panel] : null
  const placement: Placement = isYours ? 'left' : def?.placement ?? 'right'
  const show = phase === 'idle' && (def !== null || isYours)

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <AnimatePresence mode="wait" initial={false}>
        {show && (
          <motion.div
            key={stop.id}
            style={{ position: 'absolute', inset: 0, display: 'flex', pointerEvents: 'none', ...PLACEMENT[placement] }}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: 'easeOut' }}
          >
            <div
              style={{
                ...CARD,
                maxWidth: def?.wide ? 800 : 560,
                width: def?.wide ? undefined : 'min(34vw, 560px)',
                minWidth: 400,
                pointerEvents: isYours ? 'auto' : 'none',
              }}
            >
              {isYours ? <YoursPanel labels={yoursLabels} onChange={onYoursChange} /> : def?.node}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* progress rail */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '2.1vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {STOPS.map((s, i) => (
          <span
            key={s.id}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              background: i === stopIndex ? AMBER : i < stopIndex ? INK_FAINT : CREAM_DIM,
            }}
          />
        ))}
        <span style={{ ...MONO, fontSize: 11, color: INK_MUTED, marginLeft: 10 }}>
          {String(stopIndex + 1).padStart(2, '0')} / {STOPS.length}
        </span>
      </div>
    </div>
  )
}
