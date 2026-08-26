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
    a: "Seven to ten business days from the moment I have access. Long enough to pull real data rather than skim dashboards, short enough that the answer still applies when you get it.",
  },
  {
    q: 'Do you sign an NDA?',
    a: 'Yes, happily. Send yours or I can send mine — either way.',
  },
  {
    q: 'What does it cost?',
    a: "$5,000, flat. If you start a Build within thirty days, the whole $5,000 is credited against it, so the diagnosis costs nothing when it leads somewhere. If it doesn't, you keep the written plan and can hand it to anyone.",
  },
]
