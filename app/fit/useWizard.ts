'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { track } from '@vercel/analytics'
import {
  STEPS, nextStep, pathFor, pruneAfter, furthestReachable, isStepId,
  type Answers, type StepId,
} from './content'
import { resolveOffer } from './offers'
import {
  getLeadId, loadAnswers, saveAnswers, getStartedAt, readAttribution, type Attribution,
} from './session'

const DEBOUNCE_MS = 600

/**
 * The wizard state machine.
 *
 * The current step lives in `?s=` rather than in component state, so the
 * browser back button works for free — and back from the first question
 * correctly leaves the site instead of trapping the visitor. Answers do NOT
 * go in the URL: six query params would leak them into referrer headers and
 * every analytics row. They live in localStorage and Postgres.
 */
export function useWizard() {
  const router = useRouter()
  const params = useSearchParams()

  const [answers, setAnswers] = useState<Answers>({})
  const [hydrated, setHydrated] = useState(false)
  const leadId = useRef<string>('')
  const startedAt = useRef<number>(0)
  const attribution = useRef<Attribution>({})
  const fired = useRef<Set<string>>(new Set())

  const urlStep = params.get('s')
  const step: StepId = isStepId(urlStep) ? urlStep : 'business'

  // localStorage must not be touched in a useState initializer — /fit is
  // prerendered and that throws during the build.
  useEffect(() => {
    leadId.current = getLeadId()
    startedAt.current = getStartedAt()
    attribution.current = readAttribution(new URLSearchParams(window.location.search))

    const stored = loadAnswers()
    const seed = params.get('business')
    const merged: Answers =
      seed && STEPS.business.kind === 'question' &&
      STEPS.business.fields[0].options.some((o) => o.value === seed)
        ? { ...stored, business: seed as Answers['business'] }
        : stored

    setAnswers(merged)
    setHydrated(true)
    // Intentionally once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Clamp a forged or bookmarked ?s= back to what the answers actually reach.
  // Must run only after hydration, or every visitor bounces to question one.
  useEffect(() => {
    if (!hydrated) return
    const path = pathFor(answers)
    const max = furthestReachable(answers)
    if (path.indexOf(step) > path.indexOf(max)) {
      router.replace(`/fit?s=${max}`, { scroll: false })
    }
  }, [hydrated, step, answers, router])

  useEffect(() => {
    if (hydrated) saveAnswers(answers)
  }, [answers, hydrated])

  // Autosave. Never awaited, never surfaced — the user advances regardless.
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const latest = useRef<Answers>({})
  latest.current = answers

  const flush = useCallback((body: Answers, immediate = false) => {
    if (!leadId.current || !Object.keys(body).length) return
    const send = () => {
      void fetch('/api/lead', {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: leadId.current, answers: body, attribution: attribution.current }),
      }).catch(() => { /* the next answer carries the whole document again */ })
    }
    clearTimeout(timer.current)
    if (immediate) send()
    else timer.current = setTimeout(send, DEBOUNCE_MS)
  }, [])

  useEffect(() => {
    if (hydrated) flush(answers)
    return () => clearTimeout(timer.current)
  }, [answers, hydrated, flush])

  // Catch the close/background case, where a debounced write would be lost.
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState !== 'hidden' || !leadId.current) return
      if (!Object.keys(latest.current).length) return
      try {
        navigator.sendBeacon(
          '/api/lead',
          new Blob(
            [JSON.stringify({ leadId: leadId.current, answers: latest.current, attribution: attribution.current })],
            { type: 'application/json' },
          ),
        )
      } catch { /* beacon unavailable */ }
    }
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', onHide)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', onHide)
    }
  }, [])

  /** Fire once per mount — reactStrictMode double-invokes effects in dev. */
  const once = useCallback((key: string, fn: () => void) => {
    if (fired.current.has(key)) return
    fired.current.add(key)
    fn()
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const path = pathFor(answers)
    once(`step:${step}`, () =>
      track('fit_step', { step, index: path.indexOf(step), total: path.length }),
    )
  }, [hydrated, step, answers, once])

  const go = useCallback((to: StepId | null) => {
    if (to) router.push(`/fit?s=${to}`, { scroll: false })
  }, [router])

  /** Record an answer, discard anything it invalidates, advance. */
  const answer = useCallback((field: keyof Answers, value: string, advanceNow = true) => {
    setAnswers((cur) => {
      const next = { ...pruneAfter(cur, field), [field]: value } as Answers
      track('fit_answer', { step, field: String(field), value })
      if (advanceNow) {
        const to = nextStep(step, next)
        setTimeout(() => go(to), 0)
      }
      return next
    })
  }, [step, go])

  const advance = useCallback(() => go(nextStep(step, answers)), [step, answers, go])

  return {
    step, answers, hydrated,
    leadId: () => leadId.current,
    startedAt: () => startedAt.current,
    attribution: () => attribution.current,
    offer: resolveOffer(answers),
    path: pathFor(answers),
    answer, advance,
    flushNow: () => flush(latest.current, true),
  }
}
