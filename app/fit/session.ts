'use client'

import type { Answers } from './content'

const ID_KEY = 'zapp_fit_lead'
const ANSWERS_KEY = 'zapp_fit_answers'
const STARTED_KEY = 'zapp_fit_started'

/**
 * crypto.randomUUID() is undefined outside a secure context — which includes
 * every time the site is opened at http://192.168.x.x to test on a phone.
 * Without this fallback the funnel silently stops persisting on exactly the
 * device most worth testing on.
 */
function uuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

/** Every storage call is guarded: Safari private mode throws on write. */
function read(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}
function write(key: string, value: string): void {
  try { localStorage.setItem(key, value) } catch { /* storage unavailable */ }
}

export function getLeadId(): string {
  const cur = read(ID_KEY)
  if (cur && /^[0-9a-f-]{36}$/i.test(cur)) return cur
  const id = uuid()
  write(ID_KEY, id)
  return id
}

export function loadAnswers(): Answers {
  const raw = read(ANSWERS_KEY)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as Answers) : {}
  } catch { return {} }
}

export function saveAnswers(a: Answers): void {
  write(ANSWERS_KEY, JSON.stringify(a))
}

/** Stamped once per session, sent with the gate as a bot time-gate. */
export function getStartedAt(): number {
  const cur = read(STARTED_KEY)
  const n = cur ? Number(cur) : NaN
  if (Number.isFinite(n) && n > 0) return n
  const now = Date.now()
  write(STARTED_KEY, String(now))
  return now
}

/** Called after a successful gate so a second visit starts clean. */
export function clearSession(): void {
  for (const k of [ID_KEY, ANSWERS_KEY, STARTED_KEY]) {
    try { localStorage.removeItem(k) } catch { /* ignore */ }
  }
}

export type Attribution = {
  utm_source?: string; utm_medium?: string; utm_campaign?: string
  utm_content?: string; utm_term?: string
  referrer?: string; entry?: 'hero' | 'band' | 'nav' | 'direct'
}

export function readAttribution(params: URLSearchParams): Attribution {
  const out: Attribution = {}
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const) {
    const v = params.get(k)
    if (v) out[k] = v.slice(0, 120)
  }
  const entry = params.get('entry')
  if (entry === 'hero' || entry === 'band' || entry === 'nav') out.entry = entry
  else out.entry = 'direct'
  if (typeof document !== 'undefined' && document.referrer) {
    try {
      if (new URL(document.referrer).host !== location.host) {
        out.referrer = document.referrer.slice(0, 500)
      }
    } catch { /* malformed referrer */ }
  }
  return out
}
