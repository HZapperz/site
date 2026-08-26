import 'server-only'
import { createHash } from 'crypto'

/**
 * In-process sliding window.
 *
 * On Fluid Compute an instance serves many concurrent requests and stays warm,
 * so this catches the realistic case — one script hammering one endpoint — at
 * zero infrastructure. It cannot see across instances; the durable per-IP cap
 * in the complete route closes that gap where it actually matters.
 */
const HITS = new Map<string, number[]>()
const MAX_KEYS = 5000

export function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const cutoff = now - windowMs
  const hits = (HITS.get(key) ?? []).filter((t) => t > cutoff)

  if (hits.length >= limit) {
    HITS.set(key, hits)
    return false
  }

  hits.push(now)
  HITS.set(key, hits)

  // An uncapped Map in a long-lived instance is a slow leak. Evict oldest-first
  // once the key count runs away.
  if (HITS.size > MAX_KEYS) {
    // Array.from rather than iterating HITS.keys() directly: tsconfig sets no
    // target, so it defaults to ES5 and a bare Map iterator will not compile.
    const excess = HITS.size - MAX_KEYS
    const stale = Array.from(HITS.keys()).slice(0, excess)
    for (let i = 0; i < stale.length; i++) HITS.delete(stale[i])
  }
  return true
}

/**
 * Hash of the client IP. The raw address is never stored — this is only ever
 * used as a rate-limit key and an abuse counter.
 */
export function hashIp(headers: Headers): string {
  const ip =
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  const salt = process.env.IP_HASH_SALT ?? 'zapp-fit-default-salt'
  return createHash('sha256').update(ip + salt).digest('hex').slice(0, 32)
}
