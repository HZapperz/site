import type { NextRequest } from 'next/server'
import { updateSession } from './app/_lib/auth/middleware'

/**
 * Next 14 convention: `middleware.ts` at the repo root, exporting `middleware`.
 * (Next 16 renamed this file to `proxy.ts`. That convention does not exist on
 * 14.2.35 — platr-os is the better architectural reference for everything else
 * here, but its filename is not portable backwards.)
 */
export function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  /**
   * Scoped to the authenticated surface only, and this is deliberate.
   *
   * platr-os matches everything-but-static because the entire app is the
   * dashboard. Here the CRM is one subtree of a live marketing site whose
   * pages are statically generated and CDN-cached. Running middleware across
   * all of them would add an invocation to every marketing request and — worse
   * — @supabase/ssr attaches `Cache-Control: private, no-store` to any response
   * that carries a refreshed session cookie, which would quietly de-cache
   * pages that have no session to refresh in the first place.
   *
   * Nothing is lost by narrowing: middleware is not the authorization boundary
   * (see _lib/auth/middleware.ts). A new protected subtree gets added to this
   * list AND guards itself via the DAL; the DAL alone is already sufficient.
   *
   * Explicitly untouched, and it must stay that way: every public marketing
   * route, and the four legacy password gates — /api/dispo/*, /api/platr/*,
   * /api/houston-zips/* and /investors — which carry their own HMAC cookie
   * sessions and know nothing about Supabase.
   *
   * `:path*` is zero-or-more, so this matches bare `/admin` as well as
   * everything under it. Static assets are excluded by construction (and by a
   * second check inside updateSession, for anything served out of public/).
   */
  matcher: ['/admin/:path*'],
}
