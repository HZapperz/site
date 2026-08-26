'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { MONO, SERIF, AMBER, AMBER_LIGHT, INK, INK_SOFT, INK_MUTED, CREAM_CARD, HAIR, HAIR_SOFT } from '../_lib/theme'

/**
 * The funnel's interface parts. The site has no component library — pages style
 * with Tailwind for layout and inline `style` for colour and type — so these
 * follow that same convention rather than introducing a second system.
 */

export function Button({
  children, onClick, disabled, variant = 'primary', type = 'button', full,
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'ghost'
  type?: 'button' | 'submit'
  full?: boolean
}) {
  const [hover, setHover] = useState(false)
  const primary = variant === 'primary'
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold rounded transition-colors ${full ? 'w-full' : ''}`}
      style={{
        backgroundColor: primary ? (disabled ? 'rgba(12,12,12,0.12)' : hover ? AMBER_LIGHT : AMBER) : 'transparent',
        color: primary ? (disabled ? INK_MUTED : INK) : hover ? INK : INK_SOFT,
        border: primary ? 'none' : HAIR,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  )
}

/** The big tappable answer tile. */
export function ChoiceCard({
  label, hint, selected, onSelect,
}: {
  label: string
  hint?: string
  selected: boolean
  onSelect: () => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full text-left rounded px-5 py-4 transition-all flex items-start justify-between gap-4"
      style={{
        backgroundColor: selected ? 'rgba(232,144,58,0.10)' : CREAM_CARD,
        border: selected ? `1px solid ${AMBER}` : hover ? '1px solid rgba(12,12,12,0.30)' : HAIR,
        transform: hover && !selected ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: selected ? 'none' : hover ? '0 4px 14px rgba(12,12,12,0.07)' : 'none',
        cursor: 'pointer',
      }}
    >
      <span>
        <span className="block text-[15px] font-medium leading-snug" style={{ color: INK }}>
          {label}
        </span>
        {hint && (
          <span className="block text-[13px] mt-1 leading-snug" style={{ color: INK_MUTED }}>
            {hint}
          </span>
        )}
      </span>
      <span
        className="shrink-0 mt-0.5 rounded-full flex items-center justify-center"
        style={{
          width: 20, height: 20,
          border: selected ? `1px solid ${AMBER}` : '1px solid rgba(12,12,12,0.22)',
          backgroundColor: selected ? AMBER : 'transparent',
        }}
      >
        {selected && <Check size={13} strokeWidth={3} color={INK} />}
      </span>
    </button>
  )
}

/** Thin segmented rail. The denominator shifts as answers shorten the path. */
export function ProgressRail({ total, index }: { total: number; index: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-[3px] rounded-full transition-all duration-500"
          style={{
            width: i === index ? 26 : 14,
            backgroundColor: i < index ? 'rgba(12,12,12,0.34)' : i === index ? AMBER : 'rgba(12,12,12,0.13)',
          }}
        />
      ))}
    </div>
  )
}

export function TextField({
  name, label, value, onChange, type = 'text', placeholder, required, autoComplete, error,
}: {
  name: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  autoComplete?: string
  error?: string
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase mb-2" style={{ ...MONO, letterSpacing: '0.16em', color: INK_MUTED }}>
        {label}
        {!required && <span style={{ textTransform: 'none', letterSpacing: 0 }}> · optional</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded px-4 py-3 outline-none transition-colors"
        style={{
          // 16px floor: below it, iOS Safari zooms the viewport on focus and
          // there is no CSS fix. Do not shrink this to match the tile text.
          fontSize: 16,
          backgroundColor: CREAM_CARD,
          border: error ? '1px solid #EF4444' : HAIR,
          color: INK,
        }}
        onFocus={(e) => { if (!error) e.currentTarget.style.border = `1px solid ${AMBER}` }}
        onBlur={(e) => { if (!error) e.currentTarget.style.border = HAIR }}
      />
      {error && <span className="block text-[12px] mt-1.5" style={{ color: '#EF4444' }}>{error}</span>}
    </label>
  )
}

/** Shared frame: eyebrow, progress, heading, body slot. */
export function StepShell({
  eyebrow, title, help, total, index, children, footer,
}: {
  eyebrow: string
  title: string
  help?: string
  total: number
  index: number
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 w-full">
      <div className="flex items-center gap-4 mb-8">
        <ProgressRail total={total} index={index} />
        <span className="text-[11px] uppercase" style={{ ...MONO, letterSpacing: '0.16em', color: INK_MUTED }}>
          {eyebrow}
        </span>
      </div>

      <h1
        className="leading-[1.15] mb-3"
        style={{ ...SERIF, fontWeight: 500, fontSize: 'clamp(27px, 3.6vw, 38px)', color: INK, letterSpacing: '-0.015em' }}
      >
        {title}
      </h1>

      {help && (
        <p className="text-[15px] mb-8 leading-relaxed" style={{ color: INK_SOFT }}>
          {help}
        </p>
      )}
      {!help && <div className="mb-8" />}

      {children}

      {footer && <div className="mt-8 pt-6" style={{ borderTop: HAIR_SOFT }}>{footer}</div>}
    </div>
  )
}
