import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Growth Engineering — Zapp Studios",
  description: "We build full-stack growth systems for service businesses. Custom booking funnels, retention automation, and data-driven optimization.",
}

export default function GrowthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
