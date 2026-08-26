import type { Metadata } from 'next'

const TITLE = 'Revenue Engineering for Mobile Detailing'
const DESCRIPTION =
  'A custom booking platform for mobile detailing businesses that turns ad clicks into booked jobs, with A/B tested funnels, session recording and conversion optimization no off-the-shelf SaaS tool offers. Houston, TX.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/rev-eng/mobile-vehicle-detailing' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
