import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Founder Launchpad — Zapp Studios",
  description: "From idea to first revenue. Validation, MVP builds, and go-to-market strategy for aspiring founders.",
}

export default function FoundersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
