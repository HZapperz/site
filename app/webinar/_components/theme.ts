// Brand tokens mirrored from app/globals.css — the 3D world and the DOM overlay
// both read from here so the show stays "the website, come alive".
import type { CSSProperties } from 'react'

export const CREAM = '#F5EFE0'
export const CREAM_SOFT = '#EEE7D3'
export const CREAM_DIM = '#E2D9BD'
export const INK = '#0C0C0C'
export const INK_SOFT = '#3A3632'
export const INK_MUTED = '#7A756D'
export const INK_FAINT = '#B5AFA3'
export const AMBER = '#E8903A'
export const AMBER_LT = '#F0A855'
export const AMBER_DK = '#C97020'
export const AMBER_PALE = '#F5CD96'
export const GLOW = '#F3E4CC'

export const RAMP = [AMBER_PALE, AMBER_LT, AMBER, AMBER_DK] as const

export const DISPLAY: CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
export const BODY: CSSProperties = { fontFamily: "'Inter', sans-serif" }
export const MONO: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
export const SERIF: CSSProperties = { fontFamily: "'Fraunces', serif" }

// Static-instance binaries for troika (in-world text). No CDN fallback allowed.
export const FONT_DISPLAY_URL = '/fonts/SpaceGrotesk-Bold.ttf'
export const FONT_MONO_URL = '/fonts/JetBrainsMono-Bold.ttf'

export const STAGE_NAMES = ['MARKETING', 'ONBOARDING', 'FULFILLMENT', 'RETENTION'] as const
