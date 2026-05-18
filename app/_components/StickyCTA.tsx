'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function StickyCTA({ href = '/book', label = 'Book a call' }: { href?: string; label?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past hero (~ 70% of first viewport)
      setVisible(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed bottom-6 right-6 z-40 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-full shadow-xl transition-colors"
        style={{
          backgroundColor: '#E8903A',
          color: '#0C0C0C',
          boxShadow: '0 12px 32px rgba(232,144,58,0.3), 0 4px 12px rgba(0,0,0,0.15)',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0A855')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8903A')}
      >
        {label}
        <ArrowRight size={14} />
      </Link>
    </div>
  )
}
