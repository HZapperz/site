'use client'

import { useEffect } from 'react'

/**
 * Applies `dark-page` class to <body> on mount so global styles
 * (scrollbar, selection) switch to dark theming. Remove on unmount
 * so navigating back to cream pages reverts.
 */
export default function DarkPageBodyClass() {
  useEffect(() => {
    document.body.classList.add('dark-page')
    return () => {
      document.body.classList.remove('dark-page')
    }
  }, [])
  return null
}
