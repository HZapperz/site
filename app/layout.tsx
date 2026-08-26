import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import JsonLd from './_components/JsonLd'
import { SITE_URL, WEBSITE_ID, ORG_ID, organization, founder } from './_lib/schema'
import './globals.css'

const TITLE = 'Zapp Studios — Growth Marketing + Software for SMBs'
const DESCRIPTION =
  "I help established SMBs scale revenue by building growth marketing and software as one system — one operator who diagnoses the funnel, builds the software, and runs the growth. Plus startup consulting for founders. Founder-operated by Hamza Zulquernain."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — Zapp Studios',
  },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description:
      'Growth marketing and software, built as one system. One operator who diagnoses the funnel, builds the software, and runs the growth — so your revenue compounds.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Zapp Studios',
    locale: 'en_US',
  },
}

/** Site-wide entity graph — the identity every page-level node references by @id. */
const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    founder,
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: 'Zapp Studios',
      description: DESCRIPTION,
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-US',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={siteGraph} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
