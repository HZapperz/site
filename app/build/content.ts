/**
 * Shared between the rendered page and the FAQPage JSON-LD in layout.tsx.
 * Structured data must never drift from what a visitor can read on the page.
 */
export const FAQS = [
  {
    q: 'Why not just hire a freelance developer?',
    a: "A freelancer builds what you tell them to build. I diagnose what’s actually broken in the funnel, design the fix, then build it. The build is the smaller half of the value — knowing what to build and why is the rest.",
  },
  {
    q: 'What tools and stack do you work in?',
    a: 'Whatever fits. Next.js/React, plain HTML, Webflow, Framer, WordPress, GoHighLevel, HubSpot, Airtable, n8n, custom Node/Python. I recommend the simplest thing that actually works.',
  },
  {
    q: 'How is the timeline only a few weeks?',
    a: 'One operator, no translation layer between an agency and a dev shop, and a productized diagnosis-to-delivery loop. Agencies take 12+ weeks because briefs route through five people. The work doesn’t.',
  },
  {
    q: "What’s the time commitment on my end?",
    a: 'About an hour a week — a sync, timely answers to questions, and tool access. I handle the build and iteration.',
  },
  {
    q: 'What happens after the engagement?',
    a: 'You own everything — code, docs, dashboards, and a full walkthrough. No lock-in. If you want ongoing optimization, we can structure that separately.',
  },
  {
    q: "What if it doesn’t hit the targets?",
    a: "If the Build doesn’t hit the performance targets we set at scoping, I keep optimizing at no extra cost until it does. The diagnostic filters out projects where I can’t see a clear path.",
  },
]
