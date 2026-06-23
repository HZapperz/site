# Collateral build spec — Zapp Studios print kit

You are building ONE print-ready HTML artifact. It must be a single self-contained `.html` document (doctype → `</html>`) that prints at true size from Safari (Cmd-P → Save as PDF).

## Universal assembly (every file)
1. `<head>`: charset, viewport, a `<title>`, and this fonts link:
   `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500;0,9..144,500&display=swap" rel="stylesheet">`
2. Inside `<style>`: inline the ENTIRE contents of `_template/print.css` verbatim, THEN add this file's own `@page { size: …; margin: 0 }` rule (size given per-artifact below) plus any tiny artifact-specific tweaks.
3. Pull ALL copy from `_template/messaging.md` — use the quoted lines VERBATIM. No pricing anywhere. Voice: confident, calm, first-person "I", no hype, no emoji, no exclamation marks.
4. QR: read `_template/../assets/qr-book.svg` (path `data/zapp-collateral/assets/qr-book.svg`). Take just the `<svg …>…</svg>` element (drop the `<?xml?>` line and the comment) and inline it inside a `<div class="qr">…</div>` wherever a `.qrblock` appears. Caption: **"Scan to book a 15-minute call"**.
5. Use the shared components from print.css (`.page`, `.eyebrow`, `.stats/.stat`, `.ladder/.rung`, `.steps/.step`, `.fit`, `.obj`, `.qrblock`, `.wordmark`, `.card`, `.trifold/.panel`). Keep it on-brand: cream bg, ink text, amber accents, Space Grotesk display, JetBrains Mono eyebrows, Fraunces italic for the one pull-quote.

## Wordmark
`<span class="wordmark"><span class="z">Z</span>Zapp Studios</span>` — the amber "Z" tile + the name. On dark backgrounds use `.card.dark` / `.panel.cover` (handles the color flip).

---

## ARTIFACT BRIEFS

### business-card.html  — `@page { size: 3.75in 2.25in; margin: 0 }`
A 3.5"×2" card with 0.125" bleed (so the face box is 3.75"×2.25"). Build TWO `.card` faces; in print each is its own page (add `.card{page-break-after:always}` and `.card:last-child{page-break-after:auto}`). On screen, wrap both in a centered flex `.cardsheet` (screen-only) so they show side by side on the desk. Put a small `.screen-only` caption above noting "3.5×2 in · 0.125 in bleed · trim is the inner edge".
- FRONT (`.card`, cream): `.safe` → wordmark (amber Z tile) top-left; centered/lower the tagline *"Growth marketing & software, built as one system."* (Fraunces italic, ink); a thin amber rule; small mono kicker "HOUSTON, TX".
- BACK (`.card.dark`, ink bg / cream text): `.safe` with a two-column-ish layout → left: `[ Rep Name ]` (Space Grotesk, cream, prominent), `[ Title ]` (mono, amber), then `[ (xxx) xxx-xxxx ]`, `hamzazulquernain1@gmail.com`, `linkedin.com/in/hamza-zulquernain`, `[ zappstudios.com ]`. Right/bottom: a `.qrblock` (the QR sits in a cream tile so it scans on the dark card) with caption "Scan to book". Bracketed `[ … ]` placeholders must be visually obvious (use the amber color or a dotted underline) so Hamza can find-replace.

### pamphlet-trifold-{homeservices|generic}.html  — `@page { size: 11in 8.5in; margin: 0 }`
US-Letter LANDSCAPE, TWO `.page.landscape` sheets (Outside, then Inside). Each sheet contains one `.trifold` with three `.panel`s. Add `class="guides"` on `<body>` so the faint fold lines + panel labels show on screen (they're hidden in print). Put a tiny `.screen-only .kicker` label at the top-left of each panel naming its role.
Panel map (left-roll fold; note for the shop that panels are labeled so columns can be reordered to their template):
- OUTSIDE sheet L→R: **[A: BACK COVER]** contact + `.qrblock` + a one-line CTA · **[B: INNER FLAP]** a teaser headline + the 3 proof stats · **[C: FRONT COVER]** (`.panel.cover`, dark) wordmark + the tagline + "Scan to book" mini-QR.
- INSIDE sheet L→R: **[D]** the core thesis ("Your marketing problem is usually a software problem" + the one-system framing) · **[E]** how it works — the 4-step approach Diagnose→Build→Grow→Innovate (use `.steps`) · **[F]** the offer ladder (`.ladder`, feature the Build) + a compact "a fit if" list + CTA.
- GENERIC version: use the site's verbatim copy (one operator builds your revenue system; all-SMB framing).
- HOMESERVICES version: same panel structure, but lead the cover + thesis with the home-services framing from messaging.md ("You earned the reviews. Your booking flow is leaking them."), make the proof panel emphasize Royal Pawz as a local-service win, and phrase step/ladder copy around booking + ads + SMS for home-service businesses. Still use the real proof numbers verbatim.

### pamphlet-flyer-{homeservices|generic}.html  — `@page { size: 8.5in 11in; margin: 0 }`
US-Letter PORTRAIT, TWO `.page.portrait` sheets (Front, Back).
- FRONT: big eyebrow + a `.lead` headline (tagline for generic / the home-services hook for tailored), the one-liner, then the 3-up `.stats` with the Royal Pawz numbers, and a `.qrblock` CTA near the bottom.
- BACK: "How it works" (`.steps` Diagnose→Build→Grow→Innovate), the offer ladder (`.ladder`), the "a fit if / not yet if" `.fit` two-column, and a closing CTA band with the pull-quote + `.qrblock`.
- Tailored vs generic differences: same as the tri-fold (home-services hook/proof framing vs verbatim site message).

### sales-cheatsheet.html  — `@page { size: 8.5in 11in; margin: 0 }`
INTERNAL one-pager (1–2 `.page.portrait`). Plain, dense, scannable — this is for the rep, NOT a customer. No placeholders. Sections:
- Header: "Sales Cheat-Sheet — how to explain Zapp in 10 seconds and 2 minutes".
- **10-second pitch** (one tight paragraph) and **2-minute pitch** (4–5 bullet beats).
- **The thesis in plain words** (the marketing-problem-is-a-software-problem framing).
- **Offer ladder** (`.ladder`) with a one-line "point them here when…" note per rung (Diagnostic when they don't know where it's leaking; Build when the system needs rebuilding; Partnership when they want skin-in-the-game).
- **Qualifying questions** (derive 4–6 from the "a fit if / not yet if" lists — e.g. "Do you have real revenue you want to compound?", "Where does growth keep stalling — and is it something only an engineer can fix?", "Who's the decision-maker, and can we get into your data?").
- **Objection → response** table (`.obj`): rows for "I already have a marketing guy", "That sounds expensive", "We get enough word-of-mouth", "We tried an agency before", "I don't have time for a project". Responses in Zapp's voice, grounded in the one-operator + diagnostic-first stance.
- **Proof stats to quote** (the Royal Pawz numbers) + the diagnostic insight line.
- **Home-services angle** block: the campaign reframe + the concrete gaps these businesses have (form instead of booking, no after-hours capture, manual text-back quoting, no SMS follow-up, invisible on paid search).
- Footer: book link + email.

## Output
Write the file to `data/zapp-collateral/<filename>`. Return a short structured summary (file, bytes, sections built, any notes). Final message = the structured object only.
