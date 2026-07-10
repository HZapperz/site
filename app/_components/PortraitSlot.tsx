'use client'

import { useEffect, useState } from 'react'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }

export type PortraitSlotMode = 'cream' | 'dark'

/**
 * Portrait with a graceful fallback: renders an initials monogram until a
 * real photo exists at `src`. Drop `public/founder-portrait.jpg` into the
 * repo and the photo appears everywhere this is used — no code change.
 * The <img> only mounts after a successful probe, so a broken-image glyph
 * is impossible and server/client first paint always match (monogram).
 */
export default function PortraitSlot({
  size = 88,
  mode = 'cream',
  initials = 'HZ',
  alt = 'Hamza Zulquernain',
  src = '/founder-portrait.jpg',
}: {
  size?: number
  mode?: PortraitSlotMode
  initials?: string
  alt?: string
  src?: string
}) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let alive = true
    const probe = new window.Image()
    probe.onload = () => {
      if (alive) setLoaded(true)
    }
    probe.src = src
    return () => {
      alive = false
    }
  }, [src])

  const isCream = mode === 'cream'

  return (
    <div
      role="img"
      aria-label={alt}
      className="rounded-full flex items-center justify-center shrink-0 relative overflow-hidden"
      style={{
        width: size,
        height: size,
        backgroundColor: isCream ? 'rgba(12,12,12,0.06)' : 'rgba(245,239,224,0.08)',
        border: isCream ? '1px solid rgba(12,12,12,0.15)' : '1px solid rgba(245,239,224,0.2)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          ...DISPLAY,
          fontWeight: 600,
          fontSize: Math.round(size * 0.3),
          letterSpacing: '0.04em',
          color: isCream ? '#7A756D' : '#6B6560',
        }}
      >
        {initials}
      </span>
      {loaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="animate-fade-in absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  )
}
