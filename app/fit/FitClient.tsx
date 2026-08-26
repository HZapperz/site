'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { track } from '@vercel/analytics'
import RevenueChart from '../_components/RevenueChart'
import PortraitSlot from '../_components/PortraitSlot'
import { MONO, SERIF, INK, INK_SOFT, INK_MUTED, CREAM_CARD, HAIR, HAIR_SOFT, AMBER } from '../_lib/theme'
import { Button, ChoiceCard, StepShell, TextField } from './_ui'
import { STEPS, FOLLOWUPS, type Answers, type Constraint, type Field, type StepId } from './content'
import { useWizard } from './useWizard'
import { clearSession } from './session'

/** The loop shown on the argument interstitial, same four steps as the homepage. */
const LOOP = [
  { no: 'I', name: 'Diagnose', line: 'Find the real constraint before touching anything' },
  { no: 'II', name: 'Build', line: 'Rebuild the funnel and the software as one system' },
  { no: 'III', name: 'Grow', line: 'Run the traffic against a system that converts' },
  { no: 'IV', name: 'Innovate', line: 'Compound what works into the business itself' },
]

const NOT_A_FIT = [
  'You are choosing on lowest price alone',
  'You want a logo, a brochure site, or a one-off landing page',
  'You need someone to take orders rather than push back',
]

export default function FitClient() {
  const w = useWizard()
  const router = useRouter()
  const reduce = useReducedMotion()
  const index = w.path.indexOf(w.step)

  const transition = reduce
    ? { duration: 0.15 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }

  return (
    <div className="min-h-[60vh] flex items-start pt-28 md:pt-32 pb-24">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={w.step}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -8 }}
          transition={transition}
          className="w-full"
          // mode="wait" collapses the frame between steps; a floor keeps a tall
          // step followed by a short one from jumping the scroll position.
          style={{ minHeight: 380 }}
        >
          <Screen w={w} index={index} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

type W = ReturnType<typeof useWizard>

function Screen({ w, index }: { w: W; index: number }) {
  const constraintAnswer = w.answers.constraint as Constraint | undefined
  // The follow-up borrows its question from the constraint answer. Landing on
  // it directly (a shared or edited URL) leaves nothing to borrow, so fall back
  // to the question that supplies it rather than rendering an empty heading.
  const stepId: StepId = w.step === 'followup' && !constraintAnswer ? 'constraint' : w.step
  const step = STEPS[stepId]
  const total = w.path.length

  if (step.kind === 'gate') return <Gate w={w} index={index} total={total} />

  if (step.kind === 'interstitial') {
    return (
      <StepShell
        eyebrow={step.eyebrow}
        title={step.title}
        total={total}
        index={index}
        footer={<Button onClick={w.advance}>{step.cta} &rarr;</Button>}
      >
        <p className="text-[15px] leading-relaxed mb-7" style={{ color: INK_SOFT }}>
          {step.body}
        </p>
        {stepId === 'proof' && <ProofPanel />}
        {stepId === 'argument' && <LoopPanel />}
        {stepId === 'operator' && <OperatorPanel />}
      </StepShell>
    )
  }

  // One screen definition covers five questions.
  const followup = stepId === 'followup' && constraintAnswer ? FOLLOWUPS[constraintAnswer] : null
  const question = followup?.question ?? step.question
  const help = followup?.help ?? step.help
  const fields: Field[] = followup
    ? [{ name: 'followup', options: followup.options }]
    : step.fields

  return (
    <StepShell eyebrow={step.eyebrow} title={question} help={help} total={total} index={index}>
      <div className="space-y-6">
        {fields.map((field) => (
          <div key={String(field.name)}>
            {fields.length > 1 && field.label && (
              <p className="text-[11px] uppercase mb-3" style={{ ...MONO, letterSpacing: '0.16em', color: INK_MUTED }}>
                {field.label}
              </p>
            )}
            <div role="radiogroup" aria-label={field.label ?? question} className="grid gap-2">
              {field.options.map((o) => (
                <ChoiceCard
                  key={o.value}
                  label={o.label}
                  hint={o.hint}
                  selected={w.answers[field.name] === o.value}
                  // Multi-field screens must not advance on the first tap.
                  onSelect={() => w.answer(field.name, o.value, fields.length === 1)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {fields.length > 1 && (
        <div className="mt-8">
          <Button
            onClick={w.advance}
            disabled={!fields.every((f) => Boolean(w.answers[f.name]))}
          >
            Continue &rarr;
          </Button>
        </div>
      )}
    </StepShell>
  )
}

function ProofPanel() {
  const rows = [
    { label: 'Grooms per month, baseline to May peak', value: '16 → 136' },
    { label: "Repeat customers' share of revenue, by June", value: '52%' },
    { label: 'Booking conversion, A/B tested from 7.1%', value: '30.8%' },
  ]
  return (
    <div className="rounded p-5 md:p-6" style={{ backgroundColor: CREAM_CARD, border: HAIR }}>
      <div className="flex justify-between items-baseline pb-3 mb-4" style={{ borderBottom: HAIR }}>
        <p className="text-xs font-bold" style={{ ...MONO, letterSpacing: '0.06em', color: INK }}>ROYAL PAWZ USA</p>
        <p className="text-[10px] uppercase" style={{ ...MONO, letterSpacing: '0.14em', color: INK_MUTED }}>
          Mobile grooming &middot; Houston
        </p>
      </div>
      <RevenueChart variant="cream" />
      <div className="mt-2">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between items-baseline gap-4 py-2" style={{ borderTop: HAIR_SOFT }}>
            <span className="text-[13px]" style={{ color: INK_SOFT }}>{r.label}</span>
            <span className="text-[15px] font-bold" style={{ ...MONO, color: INK, fontVariantNumeric: 'tabular-nums' }}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[10px] uppercase pt-3" style={{ ...MONO, letterSpacing: '0.1em', color: INK_MUTED, borderTop: HAIR_SOFT }}>
        Dec &rsquo;25 &ndash; Jun &rsquo;26 &middot; indexed to Dec = 1.0&times; &middot; still running
      </p>
    </div>
  )
}

function LoopPanel() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {LOOP.map((s) => (
        <div key={s.no} className="rounded p-4" style={{ backgroundColor: CREAM_CARD, border: HAIR }}>
          <p className="text-[10px] mb-1.5" style={{ ...MONO, letterSpacing: '0.18em', color: AMBER }}>{s.no}</p>
          <p className="text-[15px] font-semibold mb-1" style={{ color: INK }}>{s.name}</p>
          <p className="text-[13px] leading-snug" style={{ color: INK_MUTED }}>{s.line}</p>
        </div>
      ))}
    </div>
  )
}

function OperatorPanel() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <PortraitSlot size={72} mode="cream" initials="HZ" alt="Hamza Zulquernain" />
        <div>
          <p className="text-[15px] font-semibold" style={{ color: INK }}>Hamza Zulquernain</p>
          <p className="text-[13px]" style={{ color: INK_MUTED }}>Zapp Studios &middot; Houston</p>
        </div>
      </div>
      <div className="rounded p-5" style={{ backgroundColor: CREAM_CARD, border: HAIR }}>
        <p className="text-[11px] uppercase mb-3" style={{ ...MONO, letterSpacing: '0.16em', color: INK_MUTED }}>
          Not a fit if
        </p>
        <ul className="space-y-2">
          {NOT_A_FIT.map((l) => (
            <li key={l} className="text-[14px] leading-snug pl-4 relative" style={{ color: INK_SOFT }}>
              <span className="absolute left-0" style={{ color: INK_MUTED }}>&ndash;</span>
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Gate({ w, index, total }: { w: W; index: number; total: number }) {
  const step = STEPS.gate
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', company: '', website: '', phone: '', company_url: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<string | null>(null)

  if (step.kind !== 'gate') return null
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setBusy(true); setError(null); setFieldError(null)
    try {
      const res = await fetch('/api/lead/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: w.leadId(),
          answers: w.answers,
          attribution: w.attribution(),
          startedAt: w.startedAt(),
          ...form,
        }),
      })
      const data = await res.json().catch(() => null)

      if (!res.ok) {
        setFieldError(typeof data?.field === 'string' ? data.field : null)
        setError(data?.message ?? 'That did not go through. Try again in a moment.')
        track('fit_gate_error', { reason: data?.error ?? 'unknown' })
        setBusy(false)
        return
      }

      track('fit_complete', { offer: w.offer })
      clearSession()
      router.push(data?.fitUrl ?? `/fit/${w.leadId()}`)
    } catch {
      setError('That did not go through. Check your connection, or email me directly.')
      setBusy(false)
    }
  }

  return (
    <StepShell eyebrow={step.eyebrow} title={step.title} help={step.help} total={total} index={index}>
      <form onSubmit={submit} className="space-y-4">
        <TextField
          name="name" label="First name" value={form.name} onChange={set('name')}
          required autoComplete="given-name" error={fieldError === 'name' ? 'Tell me what to call you' : undefined}
        />
        <TextField
          name="email" label="Email" type="email" value={form.email} onChange={set('email')}
          required autoComplete="email" error={fieldError === 'email' ? 'That does not look right' : undefined}
        />
        <TextField name="company" label="Business name" value={form.company} onChange={set('company')} autoComplete="organization" />
        <TextField
          name="website" label="Website" value={form.website} onChange={set('website')}
          placeholder="so I can look before we talk" autoComplete="url"
        />
        <TextField name="phone" label="Phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />

        {/* Honeypot. Never shown, never focusable, must arrive empty. */}
        <div style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
          <label htmlFor="company_url">Do not fill this in</label>
          <input
            id="company_url" name="company_url" type="text" tabIndex={-1} autoComplete="off"
            value={form.company_url} onChange={(e) => set('company_url')(e.target.value)}
          />
        </div>

        {error && (
          <div className="rounded px-4 py-3 text-[14px]" style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#0C0C0C' }}>
            {error}{' '}
            <a href="mailto:hamzazulquernain1@gmail.com" style={{ textDecoration: 'underline' }}>
              hamzazulquernain1@gmail.com
            </a>
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" disabled={busy} full>
            {busy ? 'Sending…' : 'Show me what you would do →'}
          </Button>
        </div>

        <p className="text-xs text-center pt-1" style={{ ...MONO, color: INK_MUTED }}>
          {step.microcopy}
        </p>
      </form>
    </StepShell>
  )
}
