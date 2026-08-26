/**
 * The five things a completed funnel can route to, and the rule that picks one.
 *
 * Every offer here already exists as a page on the site. The funnel does not
 * invent new products — it decides which existing door someone walks through.
 */

import type { Answers, Constraint } from './content'

export type OfferKey = 'founder' | 'rescue' | 'partnership' | 'build' | 'diagnostic'

/** Builders whose output routes to Rescue rather than a rebuild. */
const AI_BUILDERS = new Set(['lovable', 'bolt', 'replit', 'v0', 'cursor', 'bubble', 'base44'])

const BIGGER_REVENUE = new Set(['50-250k', '250k-plus'])
const BUILD_CONSTRAINTS = new Set<Constraint>(['duct-tape', 'traffic', 'broken'])

/**
 * First match wins. The rules overlap on purpose — the order IS the
 * specification, so read this top to bottom.
 *
 *   1. Pre-revenue and idea-stage go to the free founder call. The build
 *      calendar is closed for founder projects, so they must not be sold to.
 *   2. An app built with an AI tool that has since broken is Rescue, whatever
 *      the revenue. It is the only offer with published prices.
 *   3. Real revenue plus an appetite for equity is the partnership pilot.
 *   4. A traffic, ops or broken-build problem is a Build.
 *   5. Everything else — "they don't buy", "I can't tell which lever" — is a
 *      Diagnostic. Not knowing where the leak is IS the diagnostic's product.
 */
export function resolveOffer(a: Answers): OfferKey {
  if (a.business === 'idea' || a.revenue === 'pre') return 'founder'
  if (a.constraint === 'broken' && a.followup && AI_BUILDERS.has(a.followup)) return 'rescue'
  if (a.revenue && BIGGER_REVENUE.has(a.revenue) && a.appetite === 'equity') return 'partnership'
  if (a.constraint && BUILD_CONSTRAINTS.has(a.constraint)) return 'build'
  return 'diagnostic'
}

export type Offer = {
  key: OfferKey
  name: string
  href: string
  bookHref: string
  /** One line, in their language, for why this is the one. */
  line: string
  deliverables: string[]
  timeline: string
  /**
   * Shown only after the contact gate. Null falls back to "Scoped on the
   * call", which is the site-wide posture everywhere except Rescue.
   * Hamza owes real bands for diagnostic, build and partnership.
   */
  priceBand: string | null
}

export const OFFERS: Record<OfferKey, Offer> = {
  founder: {
    key: 'founder', name: 'A founder call', href: '/startups', bookHref: '/book?type=founder',
    line: 'You are early enough that the useful thing is a straight second opinion, not an engagement.',
    deliverables: [
      'Thirty minutes on positioning, scope and what to build first',
      'A straight answer on what I would not bother building',
      'Introductions where I actually know someone',
    ],
    timeline: 'Thirty minutes, whenever suits',
    priceBand: 'Free. My build calendar is closed to new founder projects, so there is nothing to sell you.',
  },

  rescue: {
    key: 'rescue', name: 'Vibe-Code Rescue', href: '/rescue', bookHref: '/book?offer=rescue',
    line: 'Something built fast with an AI tool has stopped holding. That is a known shape of problem with a known fix.',
    deliverables: [
      'A read of what is actually in the codebase',
      'The security holes ranked by what could bite first',
      'A written call on repair versus rebuild, with the reasoning',
      'The dangerous things fixed, if you want them fixed',
    ],
    timeline: 'Audit in five business days',
    priceBand: 'Audit $1,500 · Audit and fix $4,500 · Full rebuild from $8,000',
  },

  partnership: {
    key: 'partnership', name: 'Equity Partnership', href: '/partnerships', bookHref: '/book?offer=partnership',
    line: 'You have real revenue and you would rather have a partner carrying risk than a vendor sending invoices.',
    deliverables: [
      'A two-week paid pilot first, which is the real filter',
      'Reduced cash in exchange for 1 to 10 percent, negotiated on the diagnostic',
      'A six to twenty-four month term, renegotiated each cycle',
      'Four slots exist. I am not able to run more than that well.',
    ],
    timeline: 'Two-week pilot, then a decision both ways',
    priceBand:
      '$7,500 for the pilot, credited in full against the first three months if we continue. The equity is negotiated after it, not before.',
  },

  build: {
    key: 'build', name: 'Revenue System Build', href: '/build', bookHref: '/book?offer=build',
    line: 'The funnel and the software underneath it need to be rebuilt as one thing, not patched separately.',
    deliverables: [
      'A diagnostic first — every Build starts there',
      'The funnel and the software rebuilt together',
      'CRM, automations and the analytics to see whether it worked',
      'You own the code, the docs and the dashboards. No lock-in.',
    ],
    timeline: 'Weeks, and about an hour a week of your time',
    priceBand:
      'From $18,000. Most land between $18,000 and $45,000 — scoped after the diagnostic, once the work is actually known.',
  },

  diagnostic: {
    key: 'diagnostic', name: 'Revenue Diagnostic', href: '/diagnostic', bookHref: '/book?offer=diagnostic',
    line: 'You can feel the leak but not locate it. Finding it is the whole job, and it is worth doing before anyone builds anything.',
    deliverables: [
      'The funnel, the software, the data, the offer and the unit economics, each gone through',
      'Where revenue is leaking, in writing, with the evidence',
      'A recorded walkthrough you can hand to your team',
      'The plan stands on its own whether or not I build it',
    ],
    timeline: 'Seven to ten business days',
    priceBand:
      '$5,000. Credited in full against a Build started within thirty days, so if we go ahead it costs nothing.',
  },
}

/** The second door offered alongside the primary one. */
export const ALTERNATE: Record<OfferKey, OfferKey | null> = {
  founder: null,
  rescue: 'build',
  partnership: 'build',
  build: 'diagnostic',
  diagnostic: 'build',
}
