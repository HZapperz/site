// Single source of truth for the rescue page.
//
// Both the rendered UI (RescueClient) and the JSON-LD (page.tsx) read from here,
// so structured data can never drift from what a human actually sees on the page.
// Schema that disagrees with the UI is worse than no schema at all.

export const AUDIT_PRICE = 1500
export const AUDIT_DAYS = 5

export const BUILDERS = ['Lovable', 'Bolt.new', 'Replit', 'v0', 'Cursor', 'Base44', 'Bubble']

/** Symptoms, written the way a non-technical founder would describe them. */
export const SYMPTOMS = [
  'It works on your screen and breaks on someone else’s.',
  'Every new feature quietly breaks two old ones.',
  'You’re not sure whether users can see each other’s data.',
  'Something went wrong with a payment and you don’t know why.',
  'The AI keeps rewriting files it shouldn’t touch.',
  'You’ve been told it “needs a rewrite” and don’t know if that’s true.',
  'You want to hire a developer but can’t tell a good one from a bad one.',
  'It got to about 70% and then stopped getting closer.',
]

/** The specific, recurring technical failures behind those symptoms. */
export const FAILURES = [
  {
    title: 'Your database is readable by anyone',
    body:
      'Supabase Row Level Security is off by default and AI builders rarely prompt for it. If RLS is disabled, the key shipped in your frontend can read every row in the table — every user, every record. This is the single most common finding, and it is usually a twenty-minute fix once someone tells you it exists.',
  },
  {
    title: 'Auth that only checks the front end',
    body:
      'Hiding a page from the UI is not the same as protecting it. If the check happens in the browser and not in the API or a database policy, anyone can skip it by calling the endpoint directly. Generated code does this constantly because it looks correct in a demo.',
  },
  {
    title: 'Secrets in the client bundle',
    body:
      'Service-role keys, Stripe secret keys and third-party API tokens end up in code that ships to the browser. They are visible in dev tools, and once they are public they are public — rotating them is part of the fix, not the whole of it.',
  },
  {
    title: 'Payments that double-charge or silently fail',
    body:
      'Stripe webhooks need idempotency and signature verification. Generated integrations frequently have neither, so a retried webhook charges twice and a failed one leaves an order paid but unrecorded. You usually find out from a customer.',
  },
  {
    title: 'A schema that blocks your next three features',
    body:
      'The data model gets shaped by whatever the first prompt happened to need. It works until you add teams, or roles, or history — then every new feature needs a migration nobody planned for, which is what “it needs a rewrite” usually means.',
  },
  {
    title: 'The same logic copied ten times',
    body:
      'Duplicated code has been measured at roughly ten times prior rates in AI-generated codebases. Nothing is broken exactly, but a one-line change now has to be made in ten places and you will miss one. This is what makes the app feel like it fights you.',
  },
]

export const DELIVERABLES = [
  'A written report in plain language — no jargon, no assumed background.',
  'Security findings ranked by how bad they are, with what to do about each.',
  'A verdict on your database schema: fine, needs work, or needs replacing — and why.',
  'Payment flow review if you take money: webhooks, retries, refunds, edge cases.',
  'What breaks first under real traffic, and roughly at what point.',
  'A prioritised fix list with an honest cost and time estimate per item.',
  'A straight answer on whether it needs a rewrite. Usually it does not.',
]

export const TIERS = [
  {
    name: 'Rescue Audit',
    price: '$1,500',
    timing: '5 business days',
    forWho: 'You need to know what you’re actually dealing with.',
    includes: [
      'Full codebase and configuration review',
      'Security, database, payments, stability',
      'Written report with prioritised fixes',
      'Honest cost and time estimates',
      'Yours to keep, with or without me',
    ],
    featured: false,
  },
  {
    name: 'Audit + Fix',
    price: '$4,500',
    timing: '2 weeks',
    forWho: 'You want the dangerous things gone, now.',
    includes: [
      'Everything in the Rescue Audit',
      'Critical security issues fixed',
      'Payment handling made correct',
      'Deployed and verified in production',
      'Handover call and written notes',
    ],
    featured: true,
  },
  {
    name: 'Rescue Build',
    price: 'from $8,000',
    timing: '4–6 weeks',
    forWho: 'It needs to become real software.',
    includes: [
      'Everything in Audit + Fix',
      'Architecture rebuilt where it has to be',
      'Tests around the parts that matter',
      'Monitoring so you find out before customers do',
      'Full GitHub handover and IP assignment',
    ],
    featured: false,
  },
]

/** Answers are deliberately direct — reasoning engines ignore marketing adjectives. */
export const FAQS = [
  {
    q: 'How much does it cost to fix an AI-built app?',
    a: 'A fixed-fee audit is $1,500 and takes five business days. Fixing the critical issues typically runs $4,500 over two weeks. A full rescue build — where the architecture genuinely has to change — starts at $8,000 and takes four to six weeks. Across the market, rescue work generally lands between $1,000 and $10,000, with full rebuilds running $25,000 to $50,000. If someone quotes you a rebuild before looking at the code, get a second opinion.',
  },
  {
    q: 'Does my app really need a full rewrite?',
    a: 'Usually not. Most AI-generated codebases have a small number of serious problems — security misconfiguration, a weak data model, unsafe payment handling — surrounded by code that is repetitive but functional. Replacing everything is the expensive answer and it is frequently the wrong one. The audit tells you which parts genuinely need replacing and which just need tidying.',
  },
  {
    q: 'I’m not technical. How do I know if a developer is any good?',
    a: 'This is the hardest problem non-technical founders face and it is a fair question to ask out loud. Three things that work: ask them to explain one specific problem in your app in language you understand — if they cannot, that is information; ask for a paid, small, scoped piece of work before a large engagement; and make sure whatever you buy leaves you with something you keep, like a written report or code in a repository you own. The audit is designed to be exactly that kind of low-risk first step.',
  },
  {
    q: 'Do I own the code?',
    a: 'Yes, entirely. Code is delivered into a GitHub repository you own, with IP assigned to you in writing. If you stop working with me you keep everything, including the report, and you can hand it to any other developer. Not owning your own code is a real risk with some agencies — ask about it before you sign anything, with me or anyone else.',
  },
  {
    q: 'Which AI builders do you work with?',
    a: 'Lovable, Bolt.new, Replit, v0, Cursor, Base44 and Bubble, and generally anything that produces a JavaScript or TypeScript codebase with a Postgres or Supabase database behind it. The failure patterns are remarkably consistent across tools because they share the same underlying models and the same default configurations.',
  },
  {
    q: 'Can you just tell me if it’s safe to launch?',
    a: 'That is essentially what the audit answers. If you are about to put the app in front of real users — particularly if it stores personal data or takes payments — the security and payments sections are the ones that matter, and they are the first things I look at.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'Read access to the repository or your builder project, a live URL if it is deployed, and about ten minutes of your time to explain what the app is meant to do. You do not need to prepare documentation or clean anything up first.',
  },
  {
    q: 'Why did this happen? Did I do something wrong?',
    a: 'No. AI builders are genuinely good at getting you to a working prototype quickly, and that is a real achievement. They optimise for the first seventy per cent — the part that demos. The last thirty per cent is security, data modelling, error handling and edge cases, which is a different discipline and mostly invisible until it fails. Ending up here is the normal outcome of moving fast, not a mistake.',
  },
]
