import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Service-role client. Server-only, and deliberately NOT named with a
 * NEXT_PUBLIC_ prefix — a public name would suggest a browser client exists.
 * There is none, and there should never be one: the service role bypasses RLS.
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
