import 'server-only'

import { cache } from 'react'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { authServer } from './server'
import { authConfigured } from './env'

export type AdminRole = 'owner' | 'staff'

export type AdminUser = {
  /** Supabase auth user id (the JWT `sub`). */
  id: string
  /** Always lower-cased — `crm_admins.email` is stored lower-cased too. */
  email: string
  role: AdminRole
}

/**
 * The Data Access Layer. THIS is the trust boundary.
 *
 * middleware.ts refreshes the session cookie and turns anonymous visitors away
 * from /admin, and that is all it does. It is a convenience, not a control:
 * middleware can be skipped (a matcher gap, a route added under a different
 * prefix, an internal fetch) and it has no idea who is on the allow-list.
 * Everything below runs inside the render of the thing being protected, so
 * there is no gap to slip through.
 *
 * The three read guards are `cache()`-wrapped, so a page, its layout and any
 * server action in the same request share one identity check and one round
 * trip. See apiRequireAdmin() for why it is the exception.
 */

/**
 * The signed-in Supabase user, or null.
 *
 * Uses getClaims(), which verifies the access token's signature against the
 * project's published JWKS — locally, with no network round-trip, on a project
 * using asymmetric signing keys. getSession() is the one to never use here: it
 * decodes the cookie and trusts it.
 *
 * Fails CLOSED on anything unexpected. For an authorization check, "I could
 * not tell" and "no" have to be the same answer.
 */
export const verifySession = cache(async (): Promise<{ id: string; email: string } | null> => {
  if (!authConfigured()) return null

  try {
    const sb = authServer()
    const { data, error } = await sb.auth.getClaims()
    if (error || !data) return null

    const { sub, email } = data.claims
    if (typeof sub !== 'string' || typeof email !== 'string' || !email) return null
    return { id: sub, email: email.toLowerCase() }
  } catch {
    return null
  }
})

/**
 * Non-redirecting admin check. Returns the admin, or null when the caller is
 * signed out, absent from `crm_admins`, or disabled.
 *
 * The lookup deliberately runs AS THE USER through the publishable-key client,
 * not through the service role. `crm_admins` has RLS on with exactly one
 * policy — `select … using (email = lower(auth.jwt() ->> 'email'))` — so a
 * signed-in stranger's query returns an empty result rather than somebody
 * else's row. The database enforces the answer; this function only reads it.
 * The service role would work too, and would also mean a bug in this one file
 * could expose the whole allow-list.
 */
export const verifyAdmin = cache(async (): Promise<AdminUser | null> => {
  const user = await verifySession()
  if (!user) return null

  try {
    const sb = authServer()
    const { data, error } = await sb
      .from('crm_admins')
      .select('email, role, disabled_at')
      .eq('email', user.email)
      .maybeSingle()

    if (error || !data || data.disabled_at) return null

    return {
      id: user.id,
      email: user.email,
      role: data.role === 'staff' ? 'staff' : 'owner',
    }
  } catch {
    return null
  }
})

/**
 * Page / layout / server-action guard. Returns the admin, or redirects.
 *
 * EVERY page under /admin must call this itself. A guard on the layout alone
 * is not enough: in the App Router a page segment renders in PARALLEL with its
 * layout, so the page's data fetching is already in flight while the layout is
 * still deciding whether to redirect. The layout guard is defence in depth for
 * the shell; the page guard is the one that matters.
 */
export const requireAdmin = cache(async (): Promise<AdminUser> => {
  const admin = await verifyAdmin()
  if (!admin) {
    const user = await verifySession()
    // Signed in but not on the list is a different message from signed out —
    // and it means a real auth.users row exists that probably should not.
    redirect(user ? '/login?reason=unauthorized' : '/login')
  }
  return admin
})

/**
 * Route Handler guard. Returns the admin, or a 401 JSON response to return
 * verbatim:
 *
 *   const gate = await apiRequireAdmin()
 *   if (!gate.ok) return gate.response
 *   // …gate.admin is safe to use
 *
 * Route handlers answer fetch() calls, so a 302 to an HTML sign-in page is the
 * wrong answer; they also sit outside the middleware matcher entirely, which
 * makes this their only check.
 *
 * Not cache()-wrapped, unlike its three neighbours, and on purpose: a Response
 * body is a single-use stream, so handing the same object to two callers in
 * one request would produce a silent empty body. The expensive half — the JWT
 * verification and the allow-list query — is cached, inside verifyAdmin().
 */
export async function apiRequireAdmin(): Promise<
  { ok: true; admin: AdminUser } | { ok: false; response: NextResponse }
> {
  const admin = await verifyAdmin()
  if (admin) return { ok: true, admin }

  return {
    ok: false,
    response: NextResponse.json(
      { error: 'unauthorized' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    ),
  }
}
