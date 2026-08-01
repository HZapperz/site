'use client'

import { useEffect } from 'react'
import { STOPS } from './stops'

/**
 * ArrowLeft/ArrowRight, PageUp/PageDown + Space/Shift+Space (presenter
 * clickers), Home/End, digit jumps. Clamped — no wraparound. Keys are ignored
 * while an input is focused (the YOURS stop); Escape blurs back to nav mode.
 */
export function useStopNavigation({
  goTo,
  enabled,
}: {
  goTo: (compute: (prev: number) => number) => void
  enabled: boolean
}) {
  useEffect(() => {
    if (!enabled) return
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null
      const typing =
        !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
      if (typing) {
        if (e.key === 'Escape') el.blur()
        return
      }
      if (e.repeat) return

      const next = e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)
      const prev = e.key === 'ArrowLeft' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)
      if (next) goTo((i) => i + 1)
      else if (prev) goTo((i) => i - 1)
      else if (e.key === 'Home') goTo(() => 0)
      else if (e.key === 'End') goTo(() => STOPS.length - 1)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, enabled])
}
