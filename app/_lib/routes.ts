/**
 * Route inventory for robots.ts and sitemap.ts.
 *
 * PRIVATE holds per-client proposals, internal documents and admin screens.
 * These are reachable by URL but must not be indexed or surfaced in an AI
 * answer — they name specific clients and quote specific pricing.
 */

export const PUBLIC_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  // The primary conversion path. Ranks above the individual offer pages
  // because it is now how someone decides which of them they need.
  { path: '/fit', priority: 0.95, changeFrequency: 'monthly' as const },
  { path: '/build', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/diagnostic', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/partnerships', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/startups', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/book', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/rescue', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/rev-eng/royalpawzusa', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/rev-eng/mobile-vehicle-detailing', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/learn', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/dawn-patrol', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/trading', priority: 0.5, changeFrequency: 'monthly' as const },
]

/**
 * The only two /rev-eng/ pages meant for the public. Everything else under that
 * path is a named-client proposal — many are served by route.ts handlers, where
 * Next.js `metadata` does not apply, so robots.txt and X-Robots-Tag are the
 * only controls that reach them.
 */
export const PUBLIC_REV_ENG = [
  '/rev-eng/royalpawzusa',
  '/rev-eng/mobile-vehicle-detailing',
]

/** Prefix match. Kept out of the sitemap and served `noindex`. */
export const PRIVATE_PREFIXES = [
  '/api/',
  '/fit/',          // /fit itself is public; only the per-lead results are not
  '/rev-eng/',      // allowlisted back open for PUBLIC_REV_ENG below
  '/local-models',
  '/houston-zips',
  '/apartment-locator',
  '/_tmp',
  '/admin',         // the CRM. Auth-gated, but a crawler should not even try
  '/login',
  '/auth/',         // OAuth callback
]
