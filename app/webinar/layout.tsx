import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Funnel Plain — Zapp Studios',
  robots: { index: false, follow: false },
}

export default function WebinarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
