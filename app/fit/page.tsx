import { Suspense } from 'react'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import FitClient from './FitClient'

/**
 * The onboarding funnel.
 *
 * FitClient reads `?s=` through useSearchParams, which fails the build unless
 * it sits inside a Suspense boundary. app/book/page.tsx is the same pattern.
 */
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
