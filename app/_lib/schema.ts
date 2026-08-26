/**
 * Single source of truth for site-wide structured data.
 *
 * AEO/GEO rule: every value here must also be visible to a human somewhere on
 * the site. Nothing in this file may be aspirational — no invented ratings,
 * awards, review counts, employee numbers or founding dates. If a fact is not
 * on the page, it does not belong in the markup.
 */

export const SITE_URL = 'https://www.zappstudios.us'

export const ORG_ID = `${SITE_URL}/#organization`
export const FOUNDER_ID = `${SITE_URL}/#hamza`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Verified in app/_components/Footer.tsx and marketing/x/account-audit.md. */
export const SAME_AS = [
  'https://linkedin.com/in/hamza-zulquernain',
  'https://x.com/zappstudios',
]

export const CONTACT_EMAIL = 'hamzazulquernain1@gmail.com'

export const founder = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Hamza Zulquernain',
  jobTitle: 'Founder and operator',
  worksFor: { '@id': ORG_ID },
  sameAs: SAME_AS,
} as const

/**
 * ProfessionalService rather than Organization: it carries areaServed and
 * address, which is what lets an assistant answer "growth marketing in Houston".
 */
export const organization = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Zapp Studios',
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description:
    'One-operator studio in Houston, Texas that builds growth marketing and software as a single revenue system for established small and mid-sized businesses — diagnosing the funnel, building the software, and running the growth.',
  founder,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Houston' },
    { '@type': 'State', name: 'Texas' },
    { '@type': 'Country', name: 'United States' },
  ],
  knowsAbout: [
    'Conversion rate optimization',
    'Growth marketing',
    'Custom software development',
    'Marketing funnel diagnostics',
    'Marketing automation',
    'Next.js and React development',
  ],
  sameAs: SAME_AS,
} as const

/** The four offers named in the site footer, in footer order. */
export const SERVICE_CATALOG = [
  {
    slug: '/diagnostic',
    name: 'Revenue Diagnostic',
    serviceType: 'Marketing funnel and software diagnostic',
    description:
      'A paid, written diagnosis of where revenue is leaking across the funnel and the product. Uses read-only access to analytics, ad accounts and the booking or checkout flow. The written plan stands on its own whether or not any build follows.',
  },
  {
    slug: '/build',
    name: 'Revenue System Build',
    serviceType: 'Growth marketing and custom software build',
    description:
      'Rebuilds the funnel and the software behind it as one system, run by a single operator rather than an agency plus a dev shop. Delivered in weeks. The client owns the code, docs and dashboards at the end, with no lock-in.',
  },
  {
    slug: '/partnerships',
    name: 'Equity Partnership',
    serviceType: 'Equity-based growth and product partnership',
    description:
      'A build-and-operate partnership where compensation is tied to the outcome rather than billed as a project fee.',
  },
  {
    slug: '/startups',
    name: 'Startup Consulting',
    serviceType: 'Founder advisory call',
    description:
      'A free call for founders on positioning, scope and go-to-market. Not currently an intake for new build projects — the build calendar is closed.',
  },
] as const

type Faq = { q: string; a: string }

/** FAQPage is only valid when the same Q&A is rendered on the page. */
export function faqPage(path: string, faqs: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function service(slug: string, extra: Record<string, unknown> = {}) {
  const s = SERVICE_CATALOG.find((x) => x.slug === slug)
  if (!s) throw new Error(`No service registered for ${slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${slug}#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    provider: { '@id': ORG_ID },
    areaServed: organization.areaServed,
    url: `${SITE_URL}${slug}`,
    ...extra,
  }
}
