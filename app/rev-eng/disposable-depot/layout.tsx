import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disposable Depot × Zapp Studios | Website Rebuild Proposal',
  description: 'Custom website rebuild proposal for Disposable Depot.',
  robots: { index: false, follow: false },
}

export default function DisposableDepotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
