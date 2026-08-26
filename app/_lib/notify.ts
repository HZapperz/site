import 'server-only'
import { Resend } from 'resend'
import { STEPS, FOLLOWUPS, type Answers, type Constraint } from '../fit/content'
import { OFFERS, type OfferKey } from '../fit/offers'

/** Turn stored values back into the words the person actually saw. */
export function describeAnswers(a: Answers): { question: string; answer: string }[] {
  const out: { question: string; answer: string }[] = []
  for (const step of Object.values(STEPS)) {
    if (step.kind !== 'question') continue
    for (const field of step.fields) {
      const value = a[field.name]
      if (!value) continue

      if (field.name === 'followup') {
        const c = a.constraint as Constraint | undefined
        const spec = c ? FOLLOWUPS[c] : undefined
        const label = spec?.options.find((o) => o.value === value)?.label
        if (spec && label) out.push({ question: spec.question, answer: label })
        continue
      }

      const label = field.options.find((o) => o.value === value)?.label
      if (!label) continue
      const question = step.fields.length > 1 && field.label ? field.label : step.question
      out.push({ question, answer: label })
    }
  }
  return out
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export type LeadNotice = {
  leadId: string
  offer: OfferKey
  name: string
  email: string
  company?: string | null
  website?: string | null
  phone?: string | null
  answers: Answers
}

/**
 * Notify on a completed gate. Formatted to be read once before a call, so the
 * routed offer and their own words come first and the metadata comes last.
 */
export async function notifyLead(lead: LeadNotice): Promise<void> {
  const key = process.env.RESEND_API_KEY
  const to = process.env.LEAD_NOTIFY_TO
  const from = process.env.LEAD_NOTIFY_FROM
  if (!key || !to || !from) return

  const rows = describeAnswers(lead.answers)
  const offer = OFFERS[lead.offer]

  const contact = [
    ['Email', lead.email],
    ['Business', lead.company],
    ['Website', lead.website],
    ['Phone', lead.phone],
  ].filter(([, v]) => Boolean(v)) as [string, string][]

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;color:#0C0C0C">
  <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#7A756D;margin:0 0 6px">
    Routed to ${esc(offer.name)}
  </p>
  <h2 style="font-size:20px;margin:0 0 18px">${esc(lead.name)}</h2>
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    ${contact.map(([k, v]) => `
      <tr>
        <td style="padding:6px 12px 6px 0;color:#7A756D;white-space:nowrap;vertical-align:top">${esc(k)}</td>
        <td style="padding:6px 0"><strong>${esc(v)}</strong></td>
      </tr>`).join('')}
  </table>
  <hr style="border:0;border-top:1px solid rgba(12,12,12,.14);margin:20px 0">
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    ${rows.map((r) => `
      <tr>
        <td style="padding:8px 12px 8px 0;color:#7A756D;vertical-align:top;width:52%">${esc(r.question)}</td>
        <td style="padding:8px 0"><strong>${esc(r.answer)}</strong></td>
      </tr>`).join('')}
  </table>
  <hr style="border:0;border-top:1px solid rgba(12,12,12,.14);margin:20px 0">
  <p style="font-size:12px;color:#7A756D;margin:0">
    Lead ${esc(lead.leadId)}
  </p>
</div>`.trim()

  const text = [
    `Routed to: ${offer.name}`,
    '',
    lead.name,
    ...contact.map(([k, v]) => `${k}: ${v}`),
    '',
    ...rows.map((r) => `${r.question}\n  ${r.answer}`),
    '',
    `Lead ${lead.leadId}`,
  ].join('\n')

  await new Resend(key).emails.send({
    from,
    to: [to],
    replyTo: lead.email,
    subject: `${lead.name}${lead.company ? ` · ${lead.company}` : ''} — ${offer.name}`,
    html,
    text,
  })
}
