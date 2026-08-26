import type { Metadata } from 'next'
import JsonLd from '../_components/JsonLd'
import { SITE_URL, ORG_ID, organization } from '../_lib/schema'

/**
 * No SERVICE_CATALOG entry and no service() call here on purpose: /fit is the
 * intake for the four offers, not a fifth offer. service() throws on an
 * unregistered slug, so calling it would fail the build. /rescue sets the same
 * precedent — public route, own structured data, absent from the catalog.
 */
export const metadata: Metadata = {
  title: 'Find the right starting point',
  description:
    'Six questions about your business, then the honest recommendation — a diagnostic, a rebuild, a rescue, a partnership, or a straight second opinion. No pitch.',
  alternates: { canonical: '/fit' },
  openGraph: {
    title: 'Find the right starting point — Zapp Studios',
    description:
      'Six questions about your business, then the honest recommendation. No pitch.',
    url: `${SITE_URL}/fit`,
    type: 'website',
  },
}

export default function FitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${SITE_URL}/fit#webpage`,
          url: `${SITE_URL}/fit`,
          name: 'Find the right starting point',
          description:
            'A six-question intake that routes to a revenue diagnostic, a system build, a vibe-code rescue, an equity partnership, or a free founder call.',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': ORG_ID },
          provider: { '@id': ORG_ID },
          areaServed: organization.areaServed,
        }}
      />
      {children}
    </>
  )
}
