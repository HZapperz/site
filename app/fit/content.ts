/**
 * The funnel, as data.
 *
 * Every screen — questions, trust interstitials and the contact gate — is
 * declared here. Step 4 changes shape based on the step 3 answer, so the
 * sequence is resolved by nextStep() rather than being a fixed array.
 * Adding, reordering or rewording a question is an edit to this file only.
 *
 * Copy rules this file is held to: no hype, no scarcity, no guarantees, no
 * exclamation marks. Dollar figures never appear before the gate.
 */

export type BusinessType = 'local-service' | 'ecommerce' | 'restaurant' | 'software' | 'idea'
export type Revenue = 'pre' | 'under-10k' | '10-50k' | '50-250k' | '250k-plus'
export type Constraint = 'traffic' | 'conversion' | 'duct-tape' | 'broken' | 'unsure'
export type Timeline = 'this-month' | 'next-quarter' | 'exploring'
export type Appetite = 'cash' | 'equity' | 'unsure'

export type StepId =
  | 'business' | 'revenue' | 'proof' | 'constraint' | 'followup'
  | 'argument' | 'timeline' | 'operator' | 'gate'

export type Answers = Partial<{
  business: BusinessType
  revenue: Revenue
  constraint: Constraint
  followup: string
  timeline: Timeline
  appetite: Appetite
}>

export type Option = { value: string; label: string; hint?: string }
export type Field = { name: keyof Answers; label?: string; options: Option[] }

export type Step =
  | { kind: 'question'; id: StepId; eyebrow: string; question: string; help?: string; fields: Field[] }
  | { kind: 'interstitial'; id: StepId; eyebrow: string; title: string; body: string; cta: string }
  | { kind: 'gate'; id: 'gate'; eyebrow: string; title: string; help: string; microcopy: string }

// ── 1 · Segment ────────────────────────────────────────────────────
// Rendered inline in the homepage hero as well as inside the wizard.
export const BUSINESS_OPTIONS: Option[] = [
  { value: 'local-service', label: 'Local service business', hint: 'Home services, grooming, detailing, med spa, trades' },
  { value: 'ecommerce', label: 'E-commerce or product brand', hint: 'You ship something' },
  { value: 'restaurant', label: 'Restaurant, food, or hospitality', hint: 'Covers, catering, retail food' },
  { value: 'software', label: 'Software or an app', hint: 'You already have a product' },
  { value: 'idea', label: 'Just an idea so far', hint: 'Nothing built yet' },
]

const REVENUE_OPTIONS: Option[] = [
  { value: 'pre', label: 'Pre-revenue' },
  { value: 'under-10k', label: 'Under $10k a month' },
  { value: '10-50k', label: '$10k to $50k a month' },
  { value: '50-250k', label: '$50k to $250k a month' },
  { value: '250k-plus', label: 'Above $250k a month' },
]

const CONSTRAINT_OPTIONS: Option[] = [
  { value: 'traffic', label: 'Not enough people find us' },
  { value: 'conversion', label: 'They find us, but they do not buy' },
  { value: 'duct-tape', label: 'We are busy, but it is held together with duct tape' },
  { value: 'broken', label: 'The site or app we have is broken or embarrassing' },
  { value: 'unsure', label: 'We are growing and I cannot tell which lever to pull next' },
]

// ── 4 · The conditional follow-up ──────────────────────────────────
// One per step-3 answer. This is the question that decides the offer.
export const FOLLOWUPS: Record<Constraint, { question: string; help?: string; options: Option[] }> = {
  traffic: {
    question: 'What are you spending on ads right now?',
    help: 'Whatever the real number is. Zero is a common and perfectly good answer.',
    options: [
      { value: 'none', label: 'Nothing yet' },
      { value: 'under-1k', label: 'Under $1k a month' },
      { value: '1-5k', label: '$1k to $5k a month' },
      { value: '5-20k', label: '$5k to $20k a month' },
      { value: '20k-plus', label: 'Above $20k a month' },
    ],
  },
  conversion: {
    question: 'Where do people actually buy?',
    help: 'The step where money changes hands is usually where the leak is.',
    options: [
      { value: 'site', label: 'On the website' },
      { value: 'phone', label: 'Over the phone' },
      { value: 'in-person', label: 'In person' },
      { value: 'mix', label: 'A mix of all three' },
    ],
  },
  'duct-tape': {
    question: 'What eats the most hours?',
    options: [
      { value: 'scheduling', label: 'Scheduling and booking' },
      { value: 'quoting', label: 'Quoting and estimates' },
      { value: 'invoicing', label: 'Invoicing and payments' },
      { value: 'inventory', label: 'Inventory or stock' },
      { value: 'followup', label: 'Chasing customers for follow-up' },
      { value: 'reporting', label: 'Pulling numbers together' },
    ],
  },
  broken: {
    question: 'What was it built with?',
    help: 'No wrong answer here. It changes what the fix looks like, not whether it is fixable.',
    options: [
      { value: 'lovable', label: 'Lovable' },
      { value: 'bolt', label: 'Bolt.new' },
      { value: 'replit', label: 'Replit' },
      { value: 'v0', label: 'v0' },
      { value: 'cursor', label: 'Cursor or Claude Code' },
      { value: 'bubble', label: 'Bubble' },
      { value: 'base44', label: 'Base44' },
      { value: 'wordpress', label: 'WordPress' },
      { value: 'agency', label: 'An agency' },
      { value: 'freelancer', label: 'A freelancer' },
      { value: 'in-house', label: 'In-house' },
    ],
  },
  unsure: {
    question: 'What changed in the last ninety days?',
    options: [
      { value: 'started-ads', label: 'We started spending on ads' },
      { value: 'hired', label: 'We hired' },
      { value: 'launched', label: 'We launched something new' },
      { value: 'flat', label: 'Revenue flattened' },
      { value: 'dropped', label: 'Revenue dropped' },
      { value: 'nothing', label: 'Nothing obvious' },
    ],
  },
}

export const STEPS: Record<StepId, Step> = {
  business: {
    kind: 'question', id: 'business', eyebrow: 'First question',
    question: 'What kind of business are you running?',
    fields: [{ name: 'business', options: BUSINESS_OPTIONS }],
  },

  revenue: {
    kind: 'question', id: 'revenue', eyebrow: 'Question two',
    question: 'Roughly where is monthly revenue right now?',
    help: 'A range is fine. This decides what is worth recommending, not what anything costs.',
    fields: [{ name: 'revenue', options: REVENUE_OPTIONS }],
  },

  proof: {
    kind: 'interstitial', id: 'proof', eyebrow: 'Before the next question',
    title: 'What this looks like when it works',
    body: 'Royal Pawz USA is a mobile dog grooming business in Houston. They answered these same questions in December. The chart is their monthly revenue since, indexed to that month. Nothing about their market changed — the booking flow did.',
    cta: 'Continue',
  },

  constraint: {
    kind: 'question', id: 'constraint', eyebrow: 'Question three',
    question: 'What is actually in the way right now?',
    help: 'Pick the one that stings most.',
    fields: [{ name: 'constraint', options: CONSTRAINT_OPTIONS }],
  },

  // Question and options are swapped in at render time from FOLLOWUPS.
  followup: {
    kind: 'question', id: 'followup', eyebrow: 'Question four',
    question: '', fields: [{ name: 'followup', options: [] }],
  },

  argument: {
    kind: 'interstitial', id: 'argument', eyebrow: 'Why I ask all that',
    title: 'A marketing problem is usually a software problem',
    body: 'An agency will buy you more traffic and hit a wall, because the leak is downstream of the ad. A dev shop will ship you tickets without ever seeing what a customer costs. Months pass between the two of them and the number does not move. I do both halves, so the diagnosis and the fix are the same conversation.',
    cta: 'Continue',
  },

  timeline: {
    kind: 'question', id: 'timeline', eyebrow: 'Last two',
    question: 'When do you want this moving, and how do you want to work?',
    fields: [
      {
        name: 'timeline', label: 'Timing',
        options: [
          { value: 'this-month', label: 'This month' },
          { value: 'next-quarter', label: 'Next quarter' },
          { value: 'exploring', label: 'Just exploring for now' },
        ],
      },
      {
        name: 'appetite', label: 'Arrangement',
        options: [
          { value: 'cash', label: 'Straight fee' },
          { value: 'equity', label: 'Open to trading equity for a lower rate' },
          { value: 'unsure', label: 'Not sure yet' },
        ],
      },
    ],
  },

  operator: {
    kind: 'interstitial', id: 'operator', eyebrow: 'Who you would be working with',
    title: 'Hamza Zulquernain',
    body: 'Founding engineer at DietAI through a seven-figure exit. Equity partner in Royal Pawz since November. Two more systems in build right now. There is no account manager here — the person who diagnoses the funnel is the person who writes the code.',
    cta: 'Continue',
  },

  gate: {
    kind: 'gate', id: 'gate', eyebrow: 'Last step',
    title: 'Where should I send this?',
    help: 'I will put together what I would actually do in your case and send it over.',
    microcopy: 'No list, no sequence, no drip. This goes to me.',
  },
}

/**
 * The sequence. Two short-circuits send founders and pre-revenue businesses
 * down a three-screen path instead of nine — the build calendar is closed for
 * founder projects, so walking them through a services qualification would be
 * dishonest.
 */
export function nextStep(current: StepId, a: Answers): StepId | null {
  switch (current) {
    case 'business': return a.business === 'idea' ? 'operator' : 'revenue'
    case 'revenue': return a.revenue === 'pre' ? 'operator' : 'proof'
    case 'proof': return 'constraint'
    case 'constraint': return 'followup'
    case 'followup': return 'argument'
    case 'argument': return 'timeline'
    case 'timeline': return 'operator'
    case 'operator': return 'gate'
    case 'gate': return null
  }
}

/** The full path given what is answered so far — the progress rail's denominator. */
export function pathFor(a: Answers): StepId[] {
  const out: StepId[] = []
  const seen = new Set<StepId>()
  let cur: StepId | null = 'business'
  while (cur && !seen.has(cur)) {
    seen.add(cur)
    out.push(cur)
    cur = nextStep(cur, a)
  }
  return out
}

/** Which fields a screen needs filled before it can advance. */
export function isStepComplete(id: StepId, a: Answers): boolean {
  const step = STEPS[id]
  if (step.kind !== 'question') return true
  return step.fields.every((f) => Boolean(a[f.name]))
}

/**
 * Bump when a question is reworded, reordered or has its option values changed.
 * Stored against each lead, so a lead captured under an older wording can still
 * be read back against the questions it was actually asked.
 */
export const GRAPH_VERSION = 1

/** Answer order. Used to decide what a changed answer invalidates. */
export const FIELD_ORDER: (keyof Answers)[] = [
  'business', 'revenue', 'constraint', 'followup', 'timeline', 'appetite',
]

/**
 * Clear every answer downstream of the one being changed.
 *
 * Without this, going back to question three and switching "the app is broken"
 * to "not enough people find us" leaves the old follow-up answer in place — an
 * answer to a question that was never asked — and resolveOffer then routes on
 * it. That misroutes the lead silently, which is the worst way to be wrong.
 */
export function pruneAfter(a: Answers, changed: keyof Answers): Answers {
  const cut = FIELD_ORDER.indexOf(changed)
  if (cut === -1) return { ...a }
  const out: Answers = {}
  for (let i = 0; i < cut; i++) {
    const f = FIELD_ORDER[i]
    if (a[f] !== undefined) (out as Record<string, unknown>)[f] = a[f]
  }
  return out
}

/**
 * The furthest screen the answers legitimately reach. A bookmarked or edited
 * `?s=gate` must not drop someone into the gate with nothing answered.
 */
export function furthestReachable(a: Answers): StepId {
  let cur: StepId = 'business'
  const seen = new Set<StepId>()
  while (!seen.has(cur)) {
    seen.add(cur)
    if (!isStepComplete(cur, a)) return cur
    const to = nextStep(cur, a)
    if (!to) return cur
    cur = to
  }
  return cur
}

export function isStepId(s: string | null | undefined): s is StepId {
  return Boolean(s && s in STEPS)
}
