/**
 * The browser-safe half of the Supabase configuration.
 *
 * Deliberately separate from `app/_lib/supabase.ts`, which holds the
 * SERVICE-ROLE client for the /fit funnel. That key bypasses RLS and must
 * never reach a browser bundle. These two values are the opposite: the
 * publishable (anon) key is designed to be shipped to the client, and is
 * useless on its own — every table it can reach is either deny-all or
 * governed by an RLS policy that scopes rows to the signed-in user.
 *
 * Both accesses below are written as literal `process.env.NEXT_PUBLIC_*`
 * expressions on purpose: that is the only form Next.js inlines into the
 * client bundle at build time.
 *
 * Key naming: Supabase's current keys are `sb_publishable_…`; the legacy
 * name is the JWT-shaped `anon` key. Both are accepted by the same project
 * simultaneously, so either env var works and the newer name wins.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  ''

/**
 * Whether sign-in is wired at all. Every entry point checks this and fails
 * CLOSED (no session, no admin) rather than throwing — an unconfigured
 * deploy must bounce people to /login, not 500 the whole site.
 */
export function authConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)
}
