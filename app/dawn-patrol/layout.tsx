import type { Metadata } from 'next'
import JsonLd from '../_components/JsonLd'
import { SITE_URL, ORG_ID } from '../_lib/schema'

const TITLE = 'Dawn Patrol — Golf Scoring App for iOS'
const DESCRIPTION =
  'Score any format, run a league, and settle debates with automatic net scoring. Built for golfers who care about the game just not enough to do math on the course. Free to download on iOS 16+, with premium unlocking all formats.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/dawn-patrol' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: '/dawn-patrol' },
}

export default function DawnPatrolLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          '@id': `${SITE_URL}/dawn-patrol#app`,
          name: 'Dawn Patrol',
          applicationCategory: 'SportsApplication',
          operatingSystem: 'iOS 16.0 or later',
          description: DESCRIPTION,
          url: `${SITE_URL}/dawn-patrol`,
          publisher: { '@id': ORG_ID },
          featureList: [
            'Automatic net scoring',
            'Multiple scoring formats including skins',
            'League management',
          ],
          // Free download with a paid tier — stated exactly as the page states it.
          // No rating or review count is asserted: none is shown on the page.
          offers: {
            '@type': 'Offer',
            price: 0,
            priceCurrency: 'USD',
            description: 'Free to download. Premium unlocks all formats.',
          },
        }}
      />
      {children}
    </>
  )
}
