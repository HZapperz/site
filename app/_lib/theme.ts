/**
 * Type and colour constants shared across the site.
 *
 * These exact objects were copy-pasted into roughly fifteen page files. The
 * funnel imports them from here instead. Existing pages keep their local
 * copies for now — adopting this module site-wide is a separate change, so
 * that a funnel diff stays a funnel diff.
 *
 * Values mirror the `@theme` block in app/globals.css. That block is the
 * design source of truth; this file exists only because the codebase styles
 * with inline `style={{}}` rather than Tailwind colour classes.
 */

export const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }
export const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
export const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }

/** Cream surface. The default page ground. */
export const CREAM = '#F5EFE0'
export const CREAM_CARD = '#FDFAF2'
export const CREAM_SOFT = '#EEE7D3'

/** Ink. Text on cream, and the dark page ground. */
export const INK = '#0C0C0C'
export const INK_SOFT = '#3A3632'
export const INK_MUTED = '#7A756D'
export const INK_FAINT = '#B5AFA3'

/** Amber is reserved for calls to action. It is not a decorative colour. */
export const AMBER = '#E8903A'
export const AMBER_LIGHT = '#F0A855'
export const AMBER_DARK = '#C97020'

/** Hairline rules — the editorial device the cream pages are built on. */
export const HAIR = '1px solid rgba(12,12,12,0.14)'
export const HAIR_SOFT = '1px solid rgba(12,12,12,0.09)'
