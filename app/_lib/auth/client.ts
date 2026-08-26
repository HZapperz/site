'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './env'

let client: SupabaseClient | null = null

/**
 * Browser Supabase client. Used by the sign-in page and nothing else — the
 * CRM itself renders server-side and reads through the DAL.
 *
 * `auth.experimental.passkey` opts into Supabase's passkey API
 * (`signInWithPasskey`, `registerPasskey`, `auth.passkey.*`). It is off by
 * default and every passkey method throws a descriptive error without it.
 * The flag is Experimental in Supabase's own labelling: Google OAuth is the
 * durable path, and dropping this line is all it takes to fall back to it.
 *
 * Constructed lazily for the same reason `db()` is: reaching for env at
 * module scope fails `next build` on a machine without it set.
 */
export function authBrowser(): SupabaseClient {
  if (client) return client
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error(
      'Sign-in is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.',
    )
  }
  client = createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { experimental: { passkey: true } },
  })
  return client
}
