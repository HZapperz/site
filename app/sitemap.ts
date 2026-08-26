import type { MetadataRoute } from 'next'
import { SITE_URL } from './_lib/schema'
import { PUBLIC_ROUTES } from './_lib/routes'

/**
 * Public routes only. Freshness is a named reasoning-phase signal for AI
 * search, so lastModified is emitted per build rather than hardcoded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return PUBLIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
