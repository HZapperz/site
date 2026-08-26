import type { Metadata } from 'next'
import JsonLd from '../_components/JsonLd'
import { service, faqPage } from '../_lib/schema'
import { FAQS } from './content'

const TITLE = 'Revenue System Build — Funnel + Software'
const DESCRIPTION =
  'One operator rebuilds your funnel and the software behind it as a single system, in weeks rather than the 12+ an agency plus a dev shop takes. About an hour a week of your time. You own the code, docs and dashboards at the end — no lock-in.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/build' },
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: '/build' },
}

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          service('/build', {
            termsOfService:
              'The client owns the code, documentation and dashboards at the end of the engagement, with no ongoing lock-in.',
          }),
          faqPage('/build', FAQS),
        ]}
      />
      {children}
    </>
  )
}
