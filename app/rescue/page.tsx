import type { Metadata } from 'next'
import RescueClient from './RescueClient'
import { FAQS, TIERS, BUILDERS, AUDIT_PRICE, AUDIT_DAYS } from './content'

const TITLE = 'Vibe-Code Rescue — Fix Your Broken Lovable or Bolt App'
const DESCRIPTION =
  'Your AI-built app stopped working. I run a fixed-fee 5-day audit of AI-generated codebases — security, database, payments, what breaks first — and hand you a written report with honest costs. You keep the report whether or not you hire me. Houston, TX.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.zappstudios.us/rescue' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website' },
}

// AEO/GEO: assistants increasingly hand founders a shortlist before they visit a
// site at all, so the facts have to be machine-readable and identical to the UI.
// Everything here is derived from ./content.ts — the same module the page renders.
function structuredData() {
  const provider = {
    '@type': 'ProfessionalService',
    '@id': 'https://www.zappstudios.us/#organization',
    name: 'Zapp Studios',
    description:
      'One-operator software studio in Houston, Texas. Diagnoses, builds and runs revenue systems, and rescues applications built with AI code generators.',
    url: 'https://www.zappstudios.us',
    founder: { '@type': 'Person', name: 'Hamza Zulquernain' },
    areaServed: [
      { '@type': 'City', name: 'Houston' },
      { '@type': 'State', name: 'Texas' },
      { '@type': 'Country', name: 'United States' },
    ],
    address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://www.zappstudios.us/rescue#service',
      name: 'Vibe-Code Rescue',
      serviceType: 'Software code audit and remediation for AI-generated applications',
      description: DESCRIPTION,
      provider,
      audience: {
        '@type': 'Audience',
        audienceType: 'First-time non-technical founders with an application built using an AI code generator',
      },
      // Named as entities so an assistant can match "fix my Lovable app" to this page.
      about: BUILDERS.map((b) => ({ '@type': 'Thing', name: b })),
      offers: TIERS.map((t) => {
        const amount = Number(t.price.replace(/[^0-9]/g, ''))
        // "from $12,000" is a floor, not a fixed price. Marking it up as fixed
        // would be a more precise claim than the page actually makes.
        const isFrom = /from/i.test(t.price)
        return {
          '@type': 'Offer',
          name: t.name,
          description: t.forWho,
          priceCurrency: 'USD',
          ...(isFrom ? {} : { price: amount }),
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            ...(isFrom ? { minPrice: amount } : { price: amount }),
            valueAddedTaxIncluded: false,
          },
          availability: 'https://schema.org/InStock',
          url: 'https://www.zappstudios.us/rescue',
        }
      }),
      termsOfService: 'Code is delivered to a client-owned GitHub repository with IP assigned to the client in writing.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://www.zappstudios.us/rescue#faq',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': 'https://www.zappstudios.us/rescue#process',
      name: `How the ${AUDIT_DAYS}-day rescue audit works`,
      totalTime: `P${AUDIT_DAYS}D`,
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: AUDIT_PRICE },
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Share access', text: 'You give read access to the repository or builder project and spend ten minutes explaining what the app is meant to do.' },
        { '@type': 'HowToStep', position: 2, name: 'Review', text: 'The codebase is reviewed for security misconfiguration, data model problems, payment handling and stability under real traffic.' },
        { '@type': 'HowToStep', position: 3, name: 'Report', text: 'You receive a written report in plain language with findings ranked by severity and a prioritised fix list with honest cost and time estimates.' },
        { '@type': 'HowToStep', position: 4, name: 'Decide', text: 'You keep the report and decide what to do. You can hire Zapp Studios for the fixes, take it to another developer, or act on it yourself.' },
      ],
    },
  ]
}

export default function RescuePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
      <RescueClient />
    </>
  )
}
