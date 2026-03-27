import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zapp Studios — Business Engineering, Founder-Operated',
  description: "I diagnose the bottlenecks in your business, design the right solutions, and build the systems that enable you to scale. Founder-operated. Hamza Zulquernain.",
  openGraph: {
    title: 'Zapp Studios — Business Engineering, Founder-Operated',
    description: 'Business engineering for companies that are serious about scaling.',
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
      <body>{children}</body>
    </html>
  )
}
