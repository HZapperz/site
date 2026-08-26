// Browsers strip tabs and newlines out of a URL before resolving it, so a
// value carrying them can pass a naive prefix check and still resolve off-site.
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/

/**
 * Validates a redirect target that arrived on a query string — `?next=` on
 * /login and on /auth/callback. Both are attacker-controllable: a crafted link
 * to the real zappstudios.us sign-in page is enough, and the callback performs
 * its redirect *after* the session cookies have been written.
 *
 * Only a single-slash internal path survives. Backslashes are the sharp edge:
 * a browser normalises "/\evil.com" to "//evil.com" and leaves the site.
 */
export function safeInternalPath(raw: string | null | undefined, fallback = '/admin'): string {
  if (typeof raw !== 'string' || raw === '') return fallback
  if (CONTROL_CHARS.test(raw)) return fallback
  if (raw.includes('\\')) return fallback
  if (!raw.startsWith('/') || raw.startsWith('//')) return fallback
  if (raw.includes('..')) return fallback
  // Belt and braces: resolving against a throwaway origin must not move off it.
  try {
    if (new URL(raw, 'https://zapp.invalid').origin !== 'https://zapp.invalid') return fallback
  } catch {
    return fallback
  }
  return raw
}
