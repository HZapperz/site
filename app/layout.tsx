import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zapp Studios - Turning Ideas Into Technical Realities',
  description: 'We\'re technical co-founders who combine development expertise with business strategy. From idea validation to funded MVP in weeks, not months.',
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
