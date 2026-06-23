# Pitch-page build spec — Zapp Studios × West Houston home-service leads

You are writing ONE self-contained `proposal.html` for ONE prospect. It is a private, send-ready DRAFT sales proposal Hamza will refine. Match the quality and structure of Zapp's existing `app/rev-eng/genni` proposal. Output must be a single complete HTML file (doctype → closing html), no external assets except the Google Fonts link below.

## Assembly
1. `<head>`: charset, viewport, a `<title>` like `"<Company> × Zapp Studios · Growth Proposal"`, a one-line `<meta name="description">`, and this fonts link:
   `<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400;1,8..60,500&family=Inter:wght@400;450;500;600;700&display=swap" rel="stylesheet">`
2. Inside `<style>`, inline the ENTIRE contents of `_template/pitch.css` (read it) verbatim. Then set the per-company accent by overriding the three `--accent*` vars in a second small `:root{}` after it (palette below).
3. Body order: `<div class="glow"></div>` · `<div id="progress"></div>` · `<nav>` · `<main>` with the sections below · `<footer>`.
4. End with a tiny vanilla `<script>` that (a) grows `#progress` with scroll, (b) adds `.solid` to `nav` after 40px scroll. ~12 lines, no libraries.

## Section spine (use these exact `id`s; eyebrow numbers 01..09)
- `#hero` — eyebrow "Growth Proposal · <Date>". `<h1>` with one phrase wrapped in `<em>` (accent). `.sub` = the core insight in one sentence. `.cta-row`: primary `.cta` → `/book` ("Book a 15-minute working call"), ghost `.cta` → `#plan` ("See the plan"). `.hero-meta` blocks: Prepared for / Prepared by (Hamza, Zapp Studios) / Date / their live Google rating.
- `#audit` (sand) — "Where you are today". Honest teardown of their CURRENT funnel using the dossier's LIVE facts. Include a 3-up `.stats` trio of their real numbers (e.g. Google rating/▢ reviews; booking = form-only; SMS follow-up = none). Then a `.leak` callout naming the single biggest conversion leak (the hook).
- `#gaps` — "What it's costing you". 2–4 `.card`s, each a specific gap (no instant booking, no after-hours capture, no SMS follow-up, invisible on paid search). Quantify with grounded math where possible.
- `#opportunity` (sand) — "The demand is already there". Use their reviews/rating as proof of demand, and the affluent West-Houston geo (Memorial / Briar Forest / Energy Corridor — NOT Westchase/Royal Oaks). Show simple ROI math: current booked jobs → what a Royal-Pawz-style conversion lift is worth in THEIR monthly dollars (use realistic vertical ticket sizes; label assumptions).
- `#proof` — "This isn't theory". The Royal Pawz case study (numbers in the block below) as a `.stats` trio + 2–3 sentences. One operator built the funnel + booking app + Twilio SMS and moved the numbers.
- `#plan` (sand) — "The plan". A `.compare` (Current vs With Zapp), then 3–4 `.phase` cards (e.g. 01 Diagnose, 02 Build the booking funnel, 03 Turn on paid + SMS, 04 Measure & compound) with rough "weeks" timing.
- `#why` — "Why one operator". The Zapp thesis: the seam between marketing and engineering is where revenue leaks; the person who diagnoses it builds it; shipped in weeks, not quarters. 3–4 `.card`s. Mention founder cred (DietAI founding engineer, 7-figure exit) once, plainly.
- `#pricing` (tint) — two `.tier`s: "Revenue Diagnostic" (entry: paid audit → prioritized written plan you keep with or without me) and a featured "Revenue System Build" (funnel + booking app + Twilio SMS + analytics, built & run by one operator). **Dollar amounts are placeholders** — render every price as `<span class="ph">$[set]</span>` with a small `.note` "Final scope after the call". Do NOT invent specific prices.
- `#close` — restate the one-line opportunity, primary `.cta` → `/book`, signed "— Hamza · Zapp Studios". 
- `#sources` — `.sources` ol of the dossier's sources + a one-line `.disclaimer`: figures are point-in-time (Google reviews as of 2026-06-07), draft for discussion, independent verification encouraged.

## Royal Pawz proof (use verbatim, these are the real numbers)
- Booking conversion **7% → 30.8%** (≈ 4× / +334%)
- Revenue **~$200 → ~$10K MRR** (≈ 50× in ~4 months)
- **ROAS 2× → 5×**, **LTV:CAC ≈ 7.8×** ($195 LTV / $25 blended CPA)
- What was built: client booking app + groomer ops app + admin dashboard + **AI/Twilio SMS** (confirmations, reminders, rebooking) + session recording & A/B testing — one operator, shipped in weeks.

## Zapp offer & voice
- Offer: **Revenue Diagnostic** (paid audit, the entry point) → **Revenue System Build** (Google Ads → optimized landing page → frictionless online booking → Twilio SMS follow-up + CRM + analytics/A-B testing), all designed, built, and run by **one operator**. (Equity Partnership exists but don't pitch it here.)
- Core thesis: "Your marketing problem is usually a software problem. You don't have a marketing problem and a separate engineering problem — you have one revenue system, and it breaks at the seam between the two." The person who diagnoses it is the person who builds it.
- Voice (match the Zapp site + memory): confident and calm, data-driven, founder-to-founder, first-person "I", ownership language ("I diagnose, I build, I run"). Short declaratives. **No hype, no gimmicks, no exclamation marks, no emoji.** Be honest and specific — cite their real, live numbers. Never overclaim; this lands because it's precise, not loud.

## Hard rules
- Use ONLY facts from the company's dossier (`dossiers/<slug>.md`), especially the "⚡ LIVE-VERIFIED" block — that is ground truth. Do not invent review counts, prices, owner names, or claims. If a fact is "unknown", don't assert it.
- Lead with the company's specific, verified gap (the hook). Make the page feel researched and bespoke, not templated.
- Mobile-responsive (the CSS handles it; don't add fixed widths).
- The page must be a complete, valid, self-contained HTML document.

## Per-company accent (override --accent / --accent-deep / --accent-tint)
- mama-bear-pest → `--accent:#C8842E; --accent-deep:#9E6418; --accent-tint:#F4E8D4;`  (honey amber)
- ij-pressure-washing → `--accent:#2E8FA8; --accent-deep:#1E6B80; --accent-tint:#DAEEF2;`  (water teal)
- tex-mex-junk-removal → `--accent:#B5532E; --accent-deep:#8C3D1E; --accent-tint:#F3E1D5;`  (terracotta rust)
- all-brands-ac → `--accent:#2F6FB0; --accent-deep:#1E5288; --accent-tint:#DEEAF5;`  (cool blue)
- high-energy-detailing → `--accent:#6A4AA6; --accent-deep:#4E3580; --accent-tint:#E8E2F2;`  (electric violet)
- rmp-plumbing → `--accent:#3D6B8E; --accent-deep:#2A4D69; --accent-tint:#DEE8F0;`  (steel blue)
- emerald-lawn-care → `--accent:#3E7D4F; --accent-deep:#2C5C39; --accent-tint:#E0EDE2;`  (emerald green)
- bellas-neat-maid → `--accent:#9C4878; --accent-deep:#7A3459; --accent-tint:#F0E2EA;`  (plum/rose)
- southern-roots-fencing → `--accent:#8A6A3A; --accent-deep:#6B5028; --accent-tint:#EFE6D2;`  (timber brown)
- katy-brothers-pressure-washing → `--accent:#2E8C7E; --accent-deep:#1F6A5E; --accent-tint:#DAEFEA;`  (deep aqua)
