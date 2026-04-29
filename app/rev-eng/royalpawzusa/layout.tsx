import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Royal Pawz USA × Zapp Studios | Revenue Engineering Case Study',
  description: 'How systematic funnel optimization turned a 43% bounce rate into a 30.8% booking conversion in five months. A/B tested, data-backed, and honestly reported.',
  openGraph: {
    title: 'Royal Pawz USA × Zapp Studios | Revenue Engineering Case Study',
    description: 'From 43% bounce to 30% conversion in five months. Four phases of data-driven funnel optimization with A/B tested results.',
    type: 'website',
  },
}

export default function RoyalPawzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
