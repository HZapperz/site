import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platr Meals × Zapp Studios | Engagement Proposal',
  description: 'Conversion optimization and custom platform proposal for Platr Meals.',
  robots: { index: false, follow: false },
}

export default function PlatrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
