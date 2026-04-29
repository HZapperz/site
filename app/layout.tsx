import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zapp Studios — AI-Native Revenue Engineering',
  description: "High-converting landing pages and revenue systems, shipped in days not months. $1,500 Landing Page Sprints, full Revenue System Builds, and equity partnerships. Founder-operated by Hamza Zulquernain.",
  openGraph: {
    title: 'Zapp Studios — AI-Native Revenue Engineering',
    description: 'Ship high-converting sites and revenue systems in days, not months. Because Claude writes the code and Hamza QAs it.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  )
}
