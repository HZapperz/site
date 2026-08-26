import type { Metadata } from 'next'

/** The door to the internal CRM. Never indexed, never followed. */
export const metadata: Metadata = {
  title: 'Sign in · Zapp Studios',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
