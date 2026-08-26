import type { Metadata } from 'next'
import JsonLd from '../_components/JsonLd'
import { service, faqPage } from '../_lib/schema'
import { FAQS } from './content'

const TITLE = 'Startup Consulting — Free Founder Call'
const DESCRIPTION =
  "My build calendar is closed, so this is not project intake. It is a free call on positioning, scope and go-to-market — napkin-stage welcome. You keep the notes. If you need hands on a keyboard today I will say so and point you elsewhere."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/startups' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: '/startups' },
}

export default function StartupsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          service('/startups', {
            // The page is explicit that new build projects are not being taken.
            // The free call is the only thing actually on offer.
            offers: {
              '@type': 'Offer',
              name: 'Founder call',
              price: 0,
              priceCurrency: 'USD',
              description:
                'A free call on positioning, scope and go-to-market. Not intake for new build projects — the build calendar is currently closed.',
            },
          }),
          faqPage('/startups', FAQS),
        ]}
      />
      {children}
    </>
  )
}
