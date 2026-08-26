import type { Metadata } from 'next'
import { requireAdmin } from '../_lib/auth/dal'

/**
 * Nothing under /admin is ever indexed. `next.config.js` already sends an
 * X-Robots-Tag for the other private prefixes; this covers the rendered pages.
 */
export const metadata: Metadata = {
  title: 'CRM · Zapp Studios',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

/**
 * Shell guard — defence in depth ONLY. It stops the chrome rendering for a
 * stranger, but it does not stop the page: page segments render in parallel
 * with their layout, so a page's data fetching is already in flight while this
 * is still deciding. Every page under /admin calls requireAdmin() itself, and
 * removing this line must not change who can see data.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return <>{children}</>
}
