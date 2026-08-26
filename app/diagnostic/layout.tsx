import type { Metadata } from 'next'
import JsonLd from '../_components/JsonLd'
import { service, faqPage } from '../_lib/schema'
import { FAQS } from './content'

const TITLE = 'Revenue Diagnostic — Find Your Revenue Leaks'
const DESCRIPTION =
  'A paid, written diagnosis of exactly where revenue leaks across your funnel and your software. Read-only access to analytics, ad accounts and the booking or checkout flow. Takes days, not weeks. The plan stands on its own whether or not you hire me to build anything.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/diagnostic' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: '/diagnostic' },
}

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          service('/diagnostic', {
            // Price is scoped on the call, so no price is asserted here.
            // Marking up a number the page does not state would be a claim the
            // business has not made.
            termsOfService:
              'Read-only access is sufficient. An NDA is available on request. Pricing is scoped on the call before any commitment.',
          }),
          faqPage('/diagnostic', FAQS),
        ]}
      />
      {children}
    </>
  )
}
