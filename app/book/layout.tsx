import type { Metadata } from 'next'

/**
 * Rendered per request, and this must live in the layout: page.tsx is a client
 * component, where route segment config is silently ignored.
 *
 * Everything that matters on /book varies by query param — the header copy
 * (`?type=founder`, `?offer=`) and the Calendly data-url (`?lead=`). Statically
 * prerendered, the useSearchParams subtree renders client-side only, so the
 * server shipped default copy and a Calendly URL with no lead id. Calendly's
 * widget.js reads data-url when it scans the DOM, so that race could drop the
 * lead id and quietly break the booking-to-lead join.
 */
export const dynamic = 'force-dynamic'
import JsonLd from '../_components/JsonLd'
import { SITE_URL, ORG_ID, CONTACT_EMAIL } from '../_lib/schema'

const TITLE = 'Book a 15-Minute Intake Call'
const DESCRIPTION =
  "A 15-minute intake call. I ask about your business and where revenue is leaking, and if there's a clear path forward I send written scope within a couple of days. Not a pitch call."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/book' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: '/book' },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': `${SITE_URL}/book#contact`,
          url: `${SITE_URL}/book`,
          name: TITLE,
          description: DESCRIPTION,
          about: { '@id': ORG_ID },
          mainEntity: {
            '@type': 'ProfessionalService',
            '@id': ORG_ID,
            email: CONTACT_EMAIL,
            potentialAction: {
              '@type': 'ReserveAction',
              name: 'Book a 15-minute intake call',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/book`,
                actionPlatform: [
                  'http://schema.org/DesktopWebPlatform',
                  'http://schema.org/MobileWebPlatform',
                ],
              },
              result: { '@type': 'Reservation', name: '15-minute intake call' },
            },
          },
        }}
      />
      {children}
    </>
  )
}
