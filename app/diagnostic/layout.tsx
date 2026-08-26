import type { Metadata } from 'next'
import JsonLd from '../_components/JsonLd'
import { service, faqPage } from '../_lib/schema'
import { FAQS } from './content'

const TITLE = 'Revenue Diagnostic — Find Your Revenue Leaks'
const DESCRIPTION =
  'A paid, written diagnosis of exactly where revenue leaks across your funnel and your software. $5,000 flat, credited in full against a Build started within thirty days. Read-only access to analytics, ad accounts and the booking or checkout flow. Seven to ten business days. The plan stands on its own whether or not you hire me to build anything.'

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
            // The page now states a flat price, so it can be asserted here.
            // This must stay in step with the "What does it cost?" answer in
            // content.ts — if that number changes, this one changes with it.
            offers: {
              '@type': 'Offer',
              name: 'Revenue Diagnostic',
              priceCurrency: 'USD',
              price: 5000,
              priceSpecification: {
                '@type': 'PriceSpecification',
                priceCurrency: 'USD',
                price: 5000,
                valueAddedTaxIncluded: false,
              },
              availability: 'https://schema.org/InStock',
              url: 'https://www.zappstudios.us/diagnostic',
            },
            termsOfService:
              'Read-only access is sufficient. An NDA is available on request. $5,000 flat, credited in full against a Build started within thirty days.',
          }),
          faqPage('/diagnostic', FAQS),
        ]}
      />
      {children}
    </>
  )
}
