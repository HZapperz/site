import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, authConfigured } from './env'

/** Paths that require *somebody* to be signed in. Not an authorization list. */
const PROTECTED_PREFIXES = ['/admin']

/** Static files that can slip through a path-prefix matcher (public/ assets). */
const STATIC_FILE = /\.(?:svg|png|jpe?g|gif|webp|avif|ico|css|js|map|txt|xml|json|pdf|woff2?|ttf)$/i

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

/**
 * Refreshes the Supabase session cookie and bounces signed-out visitors off
 * /admin before a page renders.
 *
 * What this is NOT: authorization. It answers one question — "is anyone
 * signed in?" — and nothing else. Whether that person is on the `crm_admins`
 * allow-list is decided server-side by requireAdmin() in _lib/auth/dal.ts,
 * which is where the trust boundary sits. Middleware can be bypassed; the DAL
 * guards cannot. (This is the exact bug in royal-pawz, whose /admin gate is a
 * client-side layout check with /admin absent from the middleware matcher.)
 *
 * Fails OPEN on Supabase being unreachable. A thrown middleware 500s every
 * route it matches, including /login, which would lock Hamza out of his own
 * CRM over a transient Supabase blip. Treating "unknown" as "let it through"
 * costs nothing, because requireAdmin() still runs on the page itself and
 * denies anyone it cannot verify.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  // Belt and braces on top of the matcher: never touch a static asset.
  if (STATIC_FILE.test(pathname)) return NextResponse.next()

  // Unconfigured deploy. Don't reach for a client that cannot be built —
  // the DAL will fail closed and redirect to /login on its own.
  if (!authConfigured()) return NextResponse.next({ request })

  let response = NextResponse.next({ request })

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value)
        response = NextResponse.next({ request })
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
        // Supabase hands back the no-store headers that must accompany a
        // Set-Cookie carrying a session token, so a CDN can never hand one
        // person's token to somebody else.
        for (const [key, value] of Object.entries(headers)) {
          response.headers.set(key, value)
        }
      },
    },
  })

  // Must run. This is what refreshes an expired access token and writes the
  // rotated cookie onto `response`. Do not reorder anything above it.
  //
  // getClaims() rather than getUser(): it verifies the JWT locally against the
  // project's published JWKS, so an ordinary page load costs no round-trip to
  // Supabase. getSession() would be the unsafe one — it trusts the cookie.
  let signedIn = false
  try {
    const { data } = await supabase.auth.getClaims()
    signedIn = Boolean(data?.claims?.sub)
  } catch {
    return response
  }

  if (!signedIn && isProtected(pathname)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname + request.nextUrl.search)
    // Someone who was carrying a session cookie and is now nobody was signed
    // out mid-visit — expired token, or the account was revoked. A blank
    // sign-in form with no explanation reads as "the app broke".
    const hadSession = request.cookies.getAll().some((c) => c.name.startsWith('sb-'))
    if (hadSession) loginUrl.searchParams.set('reason', 'signed-out')
    return NextResponse.redirect(loginUrl)
  }

  return response
}
