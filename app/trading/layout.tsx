import type { Metadata } from 'next'
import JsonLd from '../_components/JsonLd'
import { SITE_URL, ORG_ID } from '../_lib/schema'

const TITLE = 'Zulq Trading — Pink Salt + Moringa Importer'
const DESCRIPTION =
  'US-based importer of premium food commodities: Himalayan Pink Salt, Moringa Powder and tropical produce, sourced from verified overseas suppliers with full FDA and compliance documentation on file. FDA-registered, lab certified, Halal certified, FSVP compliant.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/trading' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: '/trading' },
}

export default function TradingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${SITE_URL}/trading#organization`,
          name: 'Zulq Trading International Imports',
          description: DESCRIPTION,
          url: `${SITE_URL}/trading`,
          parentOrganization: { '@id': ORG_ID },
          // Certifications as factual entities — each is stated on the page.
          // These are the trust signals an assistant can cite when justifying a
          // supplier recommendation.
          hasCredential: [
            'FDA-Registered Supplier',
            'Lab Certified',
            'Halal Certified',
            'FSVP Compliant',
          ].map((name) => ({
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'certification',
            name,
          })),
          makesOffer: [
            'Himalayan Pink Salt',
            'Moringa Powder',
            'Tropical produce',
          ].map((name) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Product', name },
          })),
        }}
      />
      {children}
    </>
  )
}
