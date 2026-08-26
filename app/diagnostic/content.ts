/**
 * Shared between the rendered page and the FAQPage JSON-LD in layout.tsx.
 * Structured data must never drift from what a visitor can read on the page.
 */
export const FAQS = [
  {
    q: 'Is this just a sales call in disguise?',
    a: "No. It's paid, it's deep, and the written plan stands on its own whether or not you hire me for anything after. The diagnostic is the work — not a pitch for the work.",
  },
  {
    q: "What if you find I don't need a Build?",
    a: "Then I'll tell you that, and what to do instead. If the constraint is something you can fix yourself, or something that doesn't need a full system rebuild, I'll say so. Straight answers in both directions.",
  },
  {
    q: 'What access do you need?',
    a: "Analytics, ad accounts, and a look at the product or booking flow. Read access is fine across the board — I'm not touching anything, just pulling the real data.",
  },
  {
    q: 'How long does it take?',
    a: "Days, not weeks. The exact timeline is scoped on the call depending on the size of the funnel and the complexity of the software.",
  },
  {
    q: 'Do you sign an NDA?',
    a: 'Yes, happily. Send yours or I can send mine — either way.',
  },
  {
    q: 'What does it cost?',
    a: "Scoped on the call. It depends on the size and complexity of the funnel — a single-product DTC site is different from a multi-location service business with a custom booking system. The number lands before you commit. No surprises.",
  },
]
