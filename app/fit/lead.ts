import { z } from 'zod'
import { FIELD_ORDER, STEPS, FOLLOWUPS, type Answers, type Constraint } from './content'

/**
 * Validation shared by the client and both route handlers.
 *
 * Note on zod v4: z.record(z.enum([...]), v) builds a COMPLETE record — every
 * key required — which would reject every partial draft. The shape is built
 * explicitly instead so that every field stays optional.
 */
const answersShape = Object.fromEntries(
  FIELD_ORDER.map((f) => [f, z.string().max(64).optional()]),
) as Record<string, z.ZodOptional<z.ZodString>>

export const answersSchema = z.object(answersShape).strict()

export const attributionSchema = z.object({
  utm_source: z.string().max(120).optional(),
  utm_medium: z.string().max(120).optional(),
  utm_campaign: z.string().max(120).optional(),
  utm_content: z.string().max(120).optional(),
  utm_term: z.string().max(120).optional(),
  referrer: z.string().max(500).optional(),
  entry: z.enum(['hero', 'band', 'direct', 'nav']).optional(),
}).strict()

const uuid = z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)

/** Autosave: fires on every answer, carries the whole document each time. */
export const draftSchema = z.object({
  leadId: uuid,
  answers: answersSchema,
  attribution: attributionSchema.optional(),
}).strict()

/** The contact gate. */
export const gateSchema = z.object({
  leadId: uuid,
  answers: answersSchema,
  attribution: attributionSchema.optional(),
  startedAt: z.number().int().positive(),
  name: z.string().trim().min(1, 'Tell me what to call you').max(120),
  email: z.email('That does not look like an email address').max(200),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  website: z.string().trim().max(300).optional().or(z.literal('')),
  phone: z.string().trim().max(60).optional().or(z.literal('')),
  /** Honeypot. Must arrive empty. */
  company_url: z.string().max(200).optional(),
}).strict()

export type DraftPayload = z.infer<typeof draftSchema>
export type GatePayload = z.infer<typeof gateSchema>

/**
 * Reject values that were never offered. Without this the answers column
 * becomes a free-text field that anyone can post anything into.
 */
export function answersAreOffered(a: Answers): boolean {
  for (const [field, value] of Object.entries(a)) {
    if (value === undefined) continue
    if (field === 'followup') {
      const c = a.constraint as Constraint | undefined
      if (!c || !FOLLOWUPS[c]) return false
      if (!FOLLOWUPS[c].options.some((o) => o.value === value)) return false
      continue
    }
    const step = Object.values(STEPS).find(
      (s) => s.kind === 'question' && s.fields.some((f) => f.name === field),
    )
    if (!step || step.kind !== 'question') return false
    const fieldDef = step.fields.find((f) => f.name === field)
    if (!fieldDef?.options.some((o) => o.value === value)) return false
  }
  return true
}
