import { Suspense } from 'react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import FitClient from './FitClient'

/**
 * The onboarding funnel.
 *
 * FitClient reads `?s=` through useSearchParams, which fails the build unless
 * it sits inside a Suspense boundary. app/book/page.tsx is the same pattern.
 *
 * force-dynamic is load-bearing, not a default. A statically prerendered page
 * containing useSearchParams renders its whole Suspense subtree on the client
 * only, so the build shipped the empty fallback and crawlers got a page with a
 * nav, a footer and no funnel. The content genuinely varies by `?s=`, so
 * rendering per request is also the honest description of this route.
 * `next dev` renders everything dynamically, which is why this only showed up
 * in production.
 */
export const dynamic = 'force-dynamic'
export default function FitPage() {
  return (
    <main style={{ backgroundColor: '#F5EFE0', minHeight: '100vh' }}>
      <Nav mode="cream" />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <FitClient />
      </Suspense>
      <Footer mode="cream" />
    </main>
  )
}
