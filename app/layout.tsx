import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zapp Studios  -  We Build Your Tech',
  description: 'Zapp Studios builds MVPs for startups and integrates AI into businesses. Low upfront cost, aligned incentives. Your technical partner from idea to product.',
  openGraph: {
    title: 'Zapp Studios  -  We Build Your Tech',
    description: 'Zapp Studios builds MVPs for startups and integrates AI into businesses. Low upfront cost, aligned incentives.',
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
