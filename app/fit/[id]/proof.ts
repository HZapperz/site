import type { OfferKey } from '../offers'

/**
 * The read, and the closest proven thing, per routed offer.
 *
 * DOLLARS APPEAR ONLY IN THIS FILE. Public pages state the Royal Pawz result
 * as an index and as percentages; the raw spend and revenue are shown only
 * here, on a page nobody reaches without giving their contact details.
 * Do not copy these strings onto a public page.
 *
 * Everything else must match the published case study: 12x monthly revenue by
 * month six (peak 13.6x), 16 -> 136 grooms, 13% -> 52% repeat revenue share,
 * 7.1% -> 30.8% booking conversion (+331%, n=54).
 */

export type Proof = {
  read: string
  client: string
  sector: string
  chart: boolean
  rows: { label: string; value: string }[]
  note: string
}

/**
 * Royal Pawz paid media, since opening.
 *
 * PENDING: confirmed by Hamza as Royal Pawz but not yet reconciled against the
 * case study, whose last recorded figure is $5,405 through 22 Apr 2026. Pin the
 * exact end date before this ships, and update the case study to match so the
 * two do not contradict each other.
 */
const RP_SPEND = '$15,000'
const RP_REVENUE = '$120,000'
const RP_WINDOW = 'Since opening, Dec 2025 to date'

const ROYAL_PAWZ_ROWS = [
  { label: 'Ad spend, since opening', value: RP_SPEND },
  { label: 'Revenue attributed, same window', value: RP_REVENUE },
  { label: 'Booking conversion, A/B tested from 7.1%', value: '30.8%' },
  { label: "Repeat customers' share of revenue, by June", value: '52%' },
]

export const PROOF_FOR: Record<OfferKey, Proof> = {
  diagnostic: {
    read:
      'You can feel the money leaking but not point at the hole. That is the most common place to be, ' +
      'and it is the one where guessing is most expensive — every fix you buy without finding the ' +
      'constraint first is a fix to something that was not broken. Royal Pawz looked like an ad ' +
      'problem. It was an auth wall two screens into the booking flow. Nobody would have found that ' +
      'by buying more traffic.',
    client: 'ROYAL PAWZ USA',
    sector: 'Mobile grooming · Houston',
    chart: true,
    rows: ROYAL_PAWZ_ROWS,
    note: `${RP_WINDOW}. Revenue plotted as a multiple of the December baseline. Still running.`,
  },

  build: {
    read:
      'You can name the constraint, which puts you ahead of most. The trap now is fixing it in one ' +
      'place — a better landing page in front of the same broken booking flow, or new software behind ' +
      'a funnel nobody reaches. The funnel and the system underneath it are one object, and they move ' +
      'when they are rebuilt as one.',
    client: 'ROYAL PAWZ USA',
    sector: 'Mobile grooming · Houston',
    chart: true,
    rows: ROYAL_PAWZ_ROWS,
    note: `${RP_WINDOW}. Revenue plotted as a multiple of the December baseline. Still running.`,
  },

  partnership: {
    read:
      'At your revenue the question stops being whether the work is worth doing and starts being who ' +
      'carries the risk of it. A vendor bills you whether or not the number moves. A partner does not. ' +
      'Royal Pawz is the first of these, and the reason the numbers below are worth anything is that ' +
      'my own outcome was tied to them.',
    client: 'ROYAL PAWZ USA',
    sector: 'Equity partner since Nov 2025',
    chart: true,
    rows: ROYAL_PAWZ_ROWS,
    note: `${RP_WINDOW}. Four partnership slots exist and they are not all open. The two-week paid pilot comes first either way.`,
  },

  rescue: {
    read:
      'Something got built fast, it worked for a while, and now it does not. That is not a failure of ' +
      'judgement — it is what these tools do at the edge of what they can hold. The useful thing is ' +
      'knowing which of the usual failures you have before deciding whether to repair or rebuild, ' +
      'because those two answers differ by an order of magnitude in cost.',
    client: 'WHAT THESE AUDITS FIND',
    sector: 'Lovable · Bolt · Replit · v0 · Bubble',
    chart: false,
    rows: [
      { label: 'Row-level security left off entirely', value: 'Common' },
      { label: 'Auth enforced in the front end only', value: 'Common' },
      { label: 'API secrets shipped in the client bundle', value: 'Common' },
      { label: 'Payment webhooks that double-charge on retry', value: 'Seen' },
      { label: 'Typical market range for rescue work', value: '$1k – $10k' },
      { label: 'Typical market range for a full rebuild', value: '$25k – $50k' },
    ],
    note:
      'The audit is a fixed price and the written verdict stands on its own. If someone quotes you a ' +
      'rebuild before reading the code, get a second opinion.',
  },

  founder: {
    read:
      'You are early enough that the expensive mistakes are still cheap to avoid, and most of what an ' +
      'agency would sell you right now would be premature. What is actually useful at this stage is ' +
      'someone telling you which parts not to build yet.',
    client: 'WHERE THIS COMES FROM',
    sector: 'Founding engineer · operator',
    chart: false,
    rows: [
      { label: 'DietAI, founding engineer', value: '7-figure exit' },
      { label: 'Royal Pawz, equity partner', value: '12× in six months' },
      { label: 'Systems in build right now', value: 'Two' },
      { label: 'Cost of this conversation', value: 'Nothing' },
    ],
    note:
      'My build calendar is closed to new founder projects, so there is nothing for me to sell you on ' +
      'this call. That is rather the point of it.',
  },
}
