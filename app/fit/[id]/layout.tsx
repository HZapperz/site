import type { Metadata } from 'next'

/**
 * Never indexed. This page shows someone their own answers back, and the URL is
 * an unauthenticated capability. Three independent controls cover it: this
 * metadata, the X-Robots-Tag header in next.config.js, and the /fit/ entry in
 * PRIVATE_PREFIXES which puts it behind a robots.txt disallow.
 */
export const metadata: Metadata = {
  title: 'Your recommendation',
  robots: { index: false, follow: false },
}

export default function FitResultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
