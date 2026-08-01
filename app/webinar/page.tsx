'use client'

import dynamic from 'next/dynamic'

const Experience = dynamic(() => import('./_components/Experience'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#F5EFE0',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          letterSpacing: 3,
          color: '#7A756D',
        }}
      >
        LOADING THE PLAIN
      </span>
    </div>
  ),
})

export default function WebinarPage() {
  return <Experience />
}
