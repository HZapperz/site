import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modded Seiko × Zapp Studios | Revenue Engineering Playbook',
  description: 'Revenue engineering playbook for Modded Seiko. Strategy, automation, and scaling plan prepared by Hamza at Zapp Studios.',
  openGraph: {
    title: 'Modded Seiko × Zapp Studios | Revenue Engineering Playbook',
    description: 'Revenue engineering playbook for Modded Seiko — from 1-2 watches/day to 7-8 with automation, paid ads, and operational scaling.',
    type: 'website',
  },
}

export default function OwenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
