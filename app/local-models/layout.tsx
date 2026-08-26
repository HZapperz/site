import type { Metadata } from 'next'

/** Internal proposals and landing-page experiments — never indexed. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function LocalModelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
