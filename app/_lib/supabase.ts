import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Service-role client for the /fit funnel. Server-only, and deliberately NOT
 * named with a NEXT_PUBLIC_ prefix: this key bypasses RLS completely, so a
 * public name would be an invitation to import it somewhere a browser bundle
 * can reach.
 *
 * This comment used to say a browser client did not exist and never should.
 * One does now — app/_lib/auth/client.ts, for CRM sign-in — and the
 * distinction the old wording was reaching for is exactly why that is fine.
 * That client is built from the PUBLISHABLE key, which carries no authority of
 * its own: it acts as whoever is signed in, and RLS decides the rest. This one
 * answers to nobody and is trusted absolutely. They are not interchangeable,
 * and swapping one for the other to "fix" a permissions error would hand the
 * whole database to the browser.
 *
 * Constructed lazily. Throwing at module scope would fail `next build` on any
 * machine without the env set, because route collection imports this file.
 */
let client: SupabaseClient | null = null

export function db(): SupabaseClient {
  if (client) return client
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { 'x-application-name': 'zapp-site' } },
  })
  return client
}

/** Whether lead storage is wired. Lets routes degrade instead of 500-ing. */
export function dbConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}
