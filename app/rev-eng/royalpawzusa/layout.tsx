import type { Metadata } from 'next'
import JsonLd from '../../_components/JsonLd'
import { SITE_URL, ORG_ID, FOUNDER_ID } from '../../_lib/schema'

export const metadata: Metadata = {
  title: { absolute: 'Royal Pawz USA × Zapp Studios | Revenue Engineering Case Study' },
  description: 'How systematic funnel optimization turned a 43% bounce rate into a 30.8% booking conversion in five months. A/B tested, data-backed, and honestly reported.',
  openGraph: {
    title: 'Royal Pawz USA × Zapp Studios | Revenue Engineering Case Study',
    description: 'From 43% bounce to 30% conversion in five months. Four phases of data-driven funnel optimization with A/B tested results.',
    type: 'website',
  },
  alternates: { canonical: '/rev-eng/royalpawzusa' },
}

// The only public case study on the site, and the strongest trust signal an
// assistant can cite. Every figure below is already stated on the page.
const caseStudy = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${SITE_URL}/rev-eng/royalpawzusa#article`,
  headline: 'Royal Pawz USA: from a 43% bounce rate to 30.8% booking conversion in five months',
  description:
    'A four-phase, A/B tested funnel optimization engagement, reported with the losing tests included.',
  author: { '@id': FOUNDER_ID },
  publisher: { '@id': ORG_ID },
  about: { '@type': 'Organization', name: 'Royal Pawz USA' },
  mentions: [
    { '@type': 'Thing', name: 'Conversion rate optimization' },
    { '@type': 'Thing', name: 'A/B testing' },
    { '@type': 'Thing', name: 'Booking funnel optimization' },
  ],
  url: `${SITE_URL}/rev-eng/royalpawzusa`,
}

export default function RoyalPawzLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={caseStudy} />
      {children}
    </>
  )
}
