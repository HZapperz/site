import type { Metadata } from 'next'
import JsonLd from '../_components/JsonLd'
import { service } from '../_lib/schema'

const TITLE = 'Equity Partnership — Build and Bet Together'
const DESCRIPTION =
  'A build-and-operate partnership for founders and owners who would rather align on outcome than pay a project fee. I build the funnel and the software, run the growth, and take equity in the result.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/partnerships' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: '/partnerships' },
}

export default function PartnershipsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={service('/partnerships')} />
      {children}
    </>
  )
}
