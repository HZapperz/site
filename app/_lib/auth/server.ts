import 'server-only'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './env'

/**
 * Request-scoped Supabase client for Server Components, Server Actions and
 * Route Handlers. Reads the session out of the request cookies and writes a
 * rotated one back when the access token is refreshed.
 *
 * Uses the PUBLISHABLE key, not the service role, on purpose: every query
 * made through this client runs *as the signed-in user*, so RLS applies. The
 * `crm_admins` allow-list check in the DAL depends on exactly that — a
 * signed-in stranger sees zero rows rather than somebody else's.
 *
 * Never share one of these across requests. Next 14's `cookies()` is
 * synchronous (it became async in 15), which is why there is no `await` here.
 */
export function authServer(): SupabaseClient {
  const cookieStore = cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // Server Components cannot mutate cookies. That is fine and
          // expected: middleware.ts already refreshed the session before the
          // render started, so the rotated token is on the response either way.
        }
      },
    },
  })
}
