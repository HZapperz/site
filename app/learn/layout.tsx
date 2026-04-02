import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learn AI - Zapp Studios",
  description: "Hands-on AI training for business owners. Claude, automation workflows, and AI-first operations.",
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
