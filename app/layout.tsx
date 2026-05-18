import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zapp Studios — Growth Marketing + Software for SMBs',
  description: "I help established SMBs scale revenue by building growth marketing and software as one system — one operator who diagnoses the funnel, builds the software, and runs the growth. Plus startup consulting for founders. Founder-operated by Hamza Zulquernain.",
  openGraph: {
    title: 'Zapp Studios — Growth Marketing + Software for SMBs',
    description: 'Growth marketing and software, built as one system. One operator who diagnoses the funnel, builds the software, and runs the growth — so your revenue compounds.',
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
