import { NextResponse, type NextRequest } from 'next/server'
import { authServer } from '../../_lib/auth/server'
import { authConfigured } from '../../_lib/auth/env'
import { safeInternalPath } from '../../_lib/auth/redirect'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * OAuth / PKCE landing point. Google redirects here with `?code=…`; this
 * exchanges it for a session and writes the cookies, then sends the visitor on.
 *
 * Note this is NOT the URL that goes in the Google Cloud Console. Google's
 * "Authorized redirect URI" is Supabase's own callback,
 * https://ghgwsvgxlcxghppzjkrb.supabase.co/auth/v1/callback — Supabase
 * completes the handshake with Google and only then forwards here. Putting
 * this app's URL in Google is the single most common way to get stuck on
 * redirect_uri_mismatch.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const oauthErrorCode = url.searchParams.get('error')
  const oauthErrorDesc = url.searchParams.get('error_description')

  // Where a newly signed-in visitor lands. Attacker-controllable, and by the
  // time we redirect the session cookies are already written — so it is
  // validated as an internal path rather than trusted.
  const next = safeInternalPath(url.searchParams.get('next'), '/admin')

  /**
   * Vercel terminates TLS at the edge, so `request.url` can carry the internal
   * host rather than www.zappstudios.us. Redirecting to the wrong host would
   * strand the session: @supabase/ssr cookies are host-only by default, so an
   * apex/www drift silently signs you back out.
   */
  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocal = process.env.NODE_ENV === 'development'
  // Scheme is forced to https everywhere except a loopback host, so a spoofed
  // `x-forwarded-proto: http` cannot downgrade a real redirect. Vercel
  // overwrites these headers at the edge anyway; `next start` locally does not,
  // which is the only case the loopback exception exists for.
  const proto =
    request.headers.get('x-forwarded-proto') === 'http' &&
    /^(localhost|127\.0\.0\.1|\[::1\])(:|$)/.test(forwardedHost ?? '')
      ? 'http'
      : 'https'
  const base = !isLocal && forwardedHost ? `${proto}://${forwardedHost}` : url.origin

  const fail = (reason: string) =>
    NextResponse.redirect(`${base}/login?reason=${encodeURIComponent(reason)}`)

  if (oauthErrorCode || oauthErrorDesc) {
    // Two different failures arrive on the same query string. Clicking Cancel
    // on Google's consent screen comes back as access_denied. A rejection from
    // the Before-User-Created hook — the "you are not hamza@zappstudios.us"
    // case — comes back as server_error carrying the hook's own message, and
    // is the one worth naming plainly, because no account was created.
    return fail(oauthErrorCode === 'access_denied' ? 'oauth-denied' : 'not-allowed')
  }
  if (!authConfigured()) return fail('not-configured')
  if (!code) return fail('missing-code')

  try {
    const sb = authServer()
    const { error } = await sb.auth.exchangeCodeForSession(code)
    // A rejection from the Before-User-Created hook surfaces here: Google said
    // yes, Supabase refused to create the user, so no session exists.
    if (error) return fail('not-allowed')
  } catch {
    return fail('exchange-failed')
  }

  return NextResponse.redirect(`${base}${next}`)
}
