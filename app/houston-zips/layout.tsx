import type { Metadata } from 'next'

/** Internal tooling, including an admin screen — never indexed. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function HoustonZipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
