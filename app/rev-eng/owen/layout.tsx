import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Modded Seiko × Zapp Studios | Revenue Engineering Playbook' },
  description: 'Revenue engineering playbook for Modded Seiko. Strategy, automation, and scaling plan prepared by Hamza at Zapp Studios.',
  openGraph: {
    title: 'Modded Seiko × Zapp Studios | Revenue Engineering Playbook',
    description: 'Revenue engineering playbook for Modded Seiko - from 1-2 watches/day to 7-8 with automation, paid ads, and operational scaling.',
    type: 'website',
  },
  // Named-client playbook with real revenue figures — not for indexing
  // or AI retrieval.
  robots: { index: false, follow: false },
}

export default function OwenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
