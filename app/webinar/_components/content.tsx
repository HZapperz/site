'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import {
  AMBER,
  AMBER_DK,
  AMBER_LT,
  BODY,
  CREAM,
  CREAM_DIM,
  DISPLAY,
  GLOW,
  INK,
  INK_MUTED,
  INK_SOFT,
  MONO,
  SERIF,
  STAGE_NAMES,
} from './theme'
import type { PanelId } from './stops'

export type Placement = 'left' | 'right' | 'bottom' | 'center'

export interface PanelDef {
  placement: Placement
  wide?: boolean
  node: ReactNode
}

/* ── primitives ──────────────────────────────────────────────────── */

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <span style={{ width: 12, height: 12, background: AMBER, flex: 'none' }} />
      <span style={{ ...MONO, fontSize: 12.5, fontWeight: 700, color: AMBER_DK, letterSpacing: 2.2 }}>
        {children}
      </span>
    </div>
  )
}

function H({ children, size = 32 }: { children: ReactNode; size?: number }) {
  return (
    <h2
      style={{
        ...DISPLAY,
        fontSize: size,
        fontWeight: 700,
        color: INK,
        lineHeight: 1.06,
        margin: '0 0 14px',
        textWrap: 'balance' as CSSProperties['textWrap'],
      }}
    >
      {children}
    </h2>
  )
}

export function Em({ children }: { children: ReactNode }) {
  return <span style={{ color: AMBER_DK }}>{children}</span>
}

function Sub({ children, size = 18 }: { children: ReactNode; size?: number }) {
  return (
    <p style={{ ...BODY, fontSize: size, color: INK_SOFT, lineHeight: 1.45, margin: '0 0 6px' }}>
      {children}
    </p>
  )
}

function Rows({ items }: { items: [ReactNode, ReactNode][] }) {
  return (
    <div style={{ marginTop: 6 }}>
      {items.map(([label, body], i) => (
        <div key={i} style={{ borderTop: `1px solid ${CREAM_DIM}`, padding: '10px 0' }}>
          <div style={{ ...DISPLAY, fontSize: 16.5, fontWeight: 700, color: INK, marginBottom: 3 }}>
            {label}
          </div>
          <div style={{ ...BODY, fontSize: 15.5, color: INK_SOFT, lineHeight: 1.4 }}>{body}</div>
        </div>
      ))}
      <div style={{ borderTop: `1px solid ${CREAM_DIM}` }} />
    </div>
  )
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        ...MONO,
        display: 'inline-block',
        background: GLOW,
        borderRadius: 999,
        padding: '7px 14px',
        fontSize: 13,
        fontWeight: 700,
        color: AMBER_DK,
        marginTop: 12,
        marginRight: 8,
      }}
    >
      {children}
    </span>
  )
}

function Foot({ children }: { children: ReactNode }) {
  return (
    <p style={{ ...SERIF, fontStyle: 'italic', fontSize: 14.5, color: INK_MUTED, margin: '14px 0 0' }}>
      {children}
    </p>
  )
}

function ChatBar({ children, verb = 'TYPE IN THE CHAT:' }: { children: ReactNode; verb?: string }) {
  // No nowrap/ellipsis — the hook line must never truncate, whatever the width.
  return (
    <div
      style={{
        background: INK,
        borderRadius: 10,
        padding: '13px 18px',
        marginTop: 14,
        lineHeight: 1.5,
      }}
    >
      <span style={{ ...MONO, fontSize: 13.5, fontWeight: 700, color: AMBER_LT }}>
        ▸ {verb}{'  '}
      </span>
      <span style={{ ...MONO, fontSize: 13.5, color: CREAM }}>{children}</span>
    </div>
  )
}

/** Live wall clock for the lobby hold screen. Mount-gated so SSR HTML never
 *  carries a server-side time (hydration-safe). */
function LobbyClock() {
  const [now, setNow] = useState<string | null>(null)
  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{ color: AMBER_DK, fontWeight: 700 }}>{now ?? '·   ·'}</span>
  )
}

function MonoLine({ children, color = INK_MUTED, size = 13.5, bold = false }: { children: ReactNode; color?: string; size?: number; bold?: boolean }) {
  return (
    <div style={{ ...MONO, fontSize: size, fontWeight: bold ? 700 : 400, color, margin: '4px 0' }}>
      {children}
    </div>
  )
}

/** Headshot for the bio card. Drop a real photo at site/public/webinar/hamza.jpg —
 *  until it exists this falls back to a monogram tile, so the card never shows
 *  a broken-image icon on show night. */
function BioPhoto() {
  const [broken, setBroken] = useState(false)
  return (
    <div
      style={{
        width: 104,
        height: 104,
        borderRadius: 14,
        overflow: 'hidden',
        flex: 'none',
        background: GLOW,
        border: `1px solid ${CREAM_DIM}`,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {broken ? (
        <span style={{ ...DISPLAY, fontSize: 34, fontWeight: 700, color: AMBER_DK }}>HZ</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/webinar/hamza.jpg"
          alt="Hamza Zulquernain"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setBroken(true)}
        />
      )}
    </div>
  )
}

/* ── the sixteen panels ──────────────────────────────────────────── */

export const PANELS: Record<Exclude<PanelId, 'yours'>, PanelDef> = {
  lobby: {
    placement: 'center',
    wide: true,
    node: (
      <>
        <MonoLine size={15} bold color={INK_SOFT}>
          <LobbyClock />
          &nbsp;&nbsp;·&nbsp;&nbsp;WE START AT 7:10
        </MonoLine>
        <MonoLine color={INK_MUTED} size={13.5}>
          GRAB A COFFEE, SAY HI IN THE CHAT — MICS OPEN, ASK ME ANYTHING
        </MonoLine>
        <ChatBar verb="WHILE WE WAIT:">
          your business + what you sell — one of you gets built live tonight
        </ChatBar>
      </>
    ),
  },

  title: {
    placement: 'bottom',
    wide: true,
    node: (
      <MonoLine color={INK_MUTED} size={13.5}>
        TUESDAY, AUGUST 4 · 7:00 PM CT&nbsp;&nbsp;·&nbsp;&nbsp;HAMZA ZULQUERNAIN · ZAPP STUDIOS
      </MonoLine>
    ),
  },

  expect: {
    placement: 'center',
    wide: true,
    node: (
      <>
        <Kicker>THE NEXT 20 MINUTES</Kicker>
        <H size={34}>
          Here&apos;s the <Em>plan</Em>.
        </H>
        <Rows
          items={[
            ['1 · Who I am · ~2 min', 'Coder → revenue engineer. The 30-second version, then we move.'],
            [
              '2 · The idea · ~5 min',
              'What Zapp Studios is — and the one picture every business fits inside.',
            ],
            [
              '3 · Royal Pawz USA · ~10 min',
              'A real Houston business, front to back — every number real and public.',
            ],
            [
              '4 · Then — live',
              "We map one of YOUR funnels on screen. That's why the chat asked what you sell.",
            ],
          ]}
        />
        <Foot>
          Recording + playbook hit your inbox tomorrow · drop questions in the chat anytime.
        </Foot>
      </>
    ),
  },

  bio: {
    placement: 'right',
    wide: true,
    node: (
      <>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <BioPhoto />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Kicker>WHO&apos;S TALKING · 30 SECONDS, THEN IT&apos;S ABOUT YOU</Kicker>
            <H>
              I build businesses with AI — <Em>mine, and other people&apos;s.</Em>
            </H>
          </div>
        </div>
        <Rows
          items={[
            ['Coder first', 'UT Dallas, computer science. Building software before ChatGPT existed.'],
            ['Then ChatGPT dropped', 'It solved the hardest interview problem I could find — in two prompts. All in that week.'],
            ['DietAI', 'Watched it get built and sold to private equity, up close — summer 2025. That was the proof.'],
            ['Royal Pawz USA', 'Family grooming business. I built the software, ran the ads. Van #1 full in 5 months.'],
            ['mango2usa', 'My own venture. Store built in 4 weeks — first shipment sold out in 4 days.'],
          ]}
        />
        <Foot>I call what I do revenue engineering.</Foot>
      </>
    ),
  },

  studio: {
    placement: 'bottom',
    wide: true,
    node: (
      <>
        <Kicker>ZAPP STUDIOS — A VENTURE STUDIO, HOUSTON</Kicker>
        <H size={30}>
          We build and run local businesses. <Em>With AI.</Em>
        </H>
        <Sub>
          Not an agency watching from the sidelines — we operate what we build. Three funnels on
          the plain tonight: <b style={{ color: INK }}>Royal Pawz</b> — the one I run.{' '}
          <b style={{ color: INK }}>mango2usa</b> — the one I own.{' '}
          <b style={{ color: INK }}>YOURS</b> — the one we map live before we&apos;re done.
        </Sub>
        <Foot>Cash or equity — we only win when the business does.</Foot>
      </>
    ),
  },

  thesis: {
    placement: 'left',
    node: (
      <>
        <Kicker>THE ONE IDEA TONIGHT</Kicker>
        <H size={40}>
          Every business is a <Em>funnel</Em>.
        </H>
        <Sub>
          People see you. Some pay you. You do the work. Some come back. That&apos;s the whole
          machine — a groomer, a restaurant, a roofer, a law office. Yours too.
        </Sub>
        <Foot>Wide at the top, narrow at the bottom — nobody keeps everyone.</Foot>
      </>
    ),
  },

  textbook: {
    placement: 'left',
    node: (
      <>
        <Kicker>THE TEXTBOOK FUNNEL</Kicker>
        <H size={28}>
          Four stages. <Em>Every business has them.</Em>
        </H>
        <Rows
          items={[
            ['1 · MARKETING — they see you', 'Ads, Google, word of mouth. People find out you exist.'],
            ['2 · ONBOARDING — they pay you', 'The website, the booking page, the checkout.'],
            ['3 · FULFILLMENT — you do the work', 'The groom, the meal, the roof. The job itself.'],
            ['4 · RETENTION — they come back', 'Reviews, rebooking, repeat orders. The loop.'],
          ]}
        />
        <MonoLine color={INK_MUTED} size={14}>
          THE TEXTBOOK&nbsp;&nbsp;1,000,000 → <b>1%</b> → 10,000 → <b>1%</b> → 100 buy
        </MonoLine>
        <Foot>Every business leaks between stages. The game is finding where.</Foot>
      </>
    ),
  },

  'royal-numbers': {
    placement: 'left',
    node: (
      <>
        <Kicker>CASE Nº1 · ROYAL PAWZ USA — JUNE</Kicker>
        <H size={30}>
          Same shape. <Em>Real numbers.</Em>
        </H>
        <div style={{ margin: '10px 0 4px' }}>
          <MonoLine size={16} bold color={INK}>MARKETING&nbsp;&nbsp;·&nbsp;&nbsp;12,500 saw us</MonoLine>
          <MonoLine size={13.5} color={AMBER_DK}>&nbsp;&nbsp;↓&nbsp;&nbsp;5.7%</MonoLine>
          <MonoLine size={16} bold color={INK}>ONBOARDING&nbsp;&nbsp;·&nbsp;&nbsp;707 came inside</MonoLine>
          <MonoLine size={13.5} color={AMBER_DK}>&nbsp;&nbsp;↓&nbsp;&nbsp;8.5%</MonoLine>
          <MonoLine size={16} bold color={AMBER_DK}>BOOKED&nbsp;&nbsp;·&nbsp;&nbsp;60 first grooms</MonoLine>
        </div>
        <Chip>textbook says 1% &amp; 1% — this ran 5.7% &amp; 8.5%</Chip>
        <Foot>
          First-time customers only · each % is the share of the step before it · not one made-up
          number.
        </Foot>
      </>
    ),
  },

  inside: {
    placement: 'right',
    node: (
      <>
        <Kicker>HOW WE FIND THE LEAKS</Kicker>
        <H size={28}>
          We watched people hit a wall. <Em>So we deleted it.</Em>
        </H>
        <Rows
          items={[
            ['1 · RECORD', 'Every visit recorded — every click, every scroll. Replayable like game film.'],
            [
              '2 · SPOT',
              <>
                <b style={{ color: AMBER_DK }}>61.4%</b> quit at sign-up — you couldn&apos;t even see
                prices without making an account. <b style={{ color: AMBER_DK }}>14.7 rage clicks</b>{' '}
                per visitor.
              </>,
            ],
            [
              '3 · FIX',
              <>
                We deleted the wall — account moved to the very end.{' '}
                <b style={{ color: AMBER_DK }}>Revenue nearly 4×&apos;d</b> in a month.
              </>,
            ],
            [
              '4 · TEST',
              <>
                Two controlled A/B tests later: <b style={{ color: AMBER_DK }}>7.1% → 30.8%</b> of
                booking starts finish and pay — 1 in 3.
              </>,
            ],
          ]}
        />
        <Chip>site-wide: 3 in 100 visitors booked → 20 in 100</Chip>
        <Foot>All public — zappstudios.us/rev-eng/royalpawzusa</Foot>
      </>
    ),
  },

  'stage-marketing': {
    placement: 'right',
    node: (
      <>
        <Kicker>STAGE 1 · {STAGE_NAMES[0]} — THEY SEE YOU</Kicker>
        <H>
          Attention is a thing you can <Em>buy</Em> now.
        </H>
        <Rows
          items={[
            ['Nobody buys on sight #1', 'People see you 2–3 times before they ever click. Plan for it.'],
            ['Ads = buying work', 'Google puts you in front of people already searching for what you sell — at a price you know.'],
            ['AI writes and watches', 'AI drafts the ads, tests the pictures and words, and tells you which dollar actually worked.'],
          ]}
        />
        <Chip>ROYAL PAWZ — ads + one good page filled van #1 in 5 months</Chip>
        <Foot>This week: one ad, one page, one thing for the visitor to do.</Foot>
      </>
    ),
  },

  'stage-onboarding': {
    placement: 'right',
    node: (
      <>
        <Kicker>STAGE 2 · {STAGE_NAMES[1]} — THEY PAY YOU</Kicker>
        <H>
          Catch people while they&apos;re <Em>excited</Em>.
        </H>
        <Rows
          items={[
            ['Pretty pages sell', 'Looking good is the #1 thing that moves buying. An ugly page costs you real money every day.'],
            ['Ask for less', 'Every extra question loses people. Name, number, card — done.'],
            ['Card on file, up front', "Take payment info while they're excited — not three days later."],
          ]}
        />
        <Chip>asking early won the A/B test: +331% completed bookings</Chip>
        <Foot>This week: count the steps from &ldquo;I want this&rdquo; to &ldquo;paid.&rdquo; Cut half.</Foot>
      </>
    ),
  },

  'stage-fulfillment': {
    placement: 'right',
    node: (
      <>
        <Kicker>STAGE 3 · {STAGE_NAMES[2]} — YOU DO THE JOB</Kicker>
        <H>
          Run the whole day from <Em>one screen</Em>.
        </H>
        <Rows
          items={[
            ['Pen & paper is a tax', "Every sticky note and text thread is time you're not selling or serving."],
            ['One dashboard', 'Calendar, customers, payments, margins — one login, not seven apps.'],
            ['Custom was rich-people stuff', 'This software cost $100,000 a few years ago. With AI, I build it in weeks.'],
          ]}
        />
        <Chip>ROYAL PAWZ — 57 first grooms in June · 6 groomers</Chip>
        <Chip>MANGO2USA — empty folder → real orders in 4 weeks</Chip>
      </>
    ),
  },

  human: {
    placement: 'bottom',
    node: (
      <p style={{ ...SERIF, fontStyle: 'italic', fontSize: 19, color: INK_SOFT, margin: 0 }}>
        I sell what works, not what demos well.
      </p>
    ),
  },

  'stage-retention': {
    placement: 'right',
    node: (
      <>
        <Kicker>STAGE 4 · {STAGE_NAMES[3]} — THEY COME BACK</Kicker>
        <H>
          The second sale is the <Em>cheap</Em> one.
        </H>
        <Rows
          items={[
            ['End on a good note', "Ask “how was it?” the same day. Fix it fast when it wasn't great."],
            ['Ask for the review', 'Happy customer + one tap = Google review. Reviews feed Stage 1 — the funnel is a loop.'],
            ['Nudge before they forget', 'Rebooking reminders, win-backs, abandoned-cart saves — emails that send themselves.'],
          ]}
        />
        <Chip>~2,000 automatic emails since June — zero typing</Chip>
        <Foot>52% of June revenue came from customers who came back.</Foot>
      </>
    ),
  },

  qa: {
    placement: 'center',
    wide: true,
    node: (
      <>
        <Kicker>CHECKPOINT</Kicker>
        <H size={38}>
          That&apos;s the machine. Questions before we build one <Em>live</Em>?
        </H>
        <Sub>Drop them in the chat — I&apos;ll take three minutes. Then I need one volunteer.</Sub>
        <ChatBar>questions — or type ME to volunteer</ChatBar>
      </>
    ),
  },

  mango: {
    placement: 'right',
    node: (
      <>
        <Kicker>CASE Nº2 · MANGO2USA — SAME PLAYBOOK</Kicker>
        <H>
          Sold out in <Em>4 days</Em>.
        </H>
        <Rows
          items={[
            [
              'The bet',
              'A business I just launched myself — import the Pakistani mangoes Houston actually misses, sell direct.',
            ],
            ['4 weeks', 'Empty folder → store, payments, delivery routing. Built with AI.'],
            [
              '4 days',
              'First shipment gone within 4 days of arriving — pure word-of-mouth + Meta ads. I drove the deliveries myself.',
            ],
          ]}
        />
        <Foot>Same funnel, different business. The machine doesn&apos;t care what you sell.</Foot>
      </>
    ),
  },

  offer: {
    placement: 'center',
    wide: true,
    node: (
      <>
        <Kicker>IF YOU WANT THIS IN YOUR BUSINESS</Kicker>
        <H size={34}>
          <Em>Free AI Opportunity Audit</Em> — 20 minutes.
        </H>
        <Rows
          items={[
            ['You talk, I listen', "Walk me through the business — what's manual, what's annoying, what's stuck."],
            ['You get a map', 'The exact stages where AI pays you back first, in plain English.'],
            ['No homework', "If we fit — cash or equity, your call. If we don't, you keep the map anyway."],
          ]}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
          <div style={{ background: INK, borderRadius: 10, padding: '14px 20px', flex: 1 }}>
            <span style={{ ...MONO, fontSize: 14, fontWeight: 700, color: AMBER_LT }}>BOOK →&nbsp;&nbsp;</span>
            <span style={{ ...MONO, fontSize: 14, color: CREAM }}>[ booking link goes here ]&nbsp;&nbsp;·&nbsp;&nbsp;8 AUGUST SLOTS</span>
          </div>
          <div
            style={{
              width: 86,
              height: 86,
              flex: 'none',
              border: `1.5px dashed ${AMBER}`,
              borderRadius: 8,
              display: 'grid',
              placeItems: 'center',
              ...MONO,
              fontSize: 12,
              fontWeight: 700,
              color: AMBER_DK,
            }}
          >
            QR
          </div>
        </div>
        <Foot>A dedicated Zapp person on every account — and I personally oversee all of it.</Foot>
      </>
    ),
  },

  close: {
    placement: 'center',
    wide: true,
    node: (
      <>
        <Kicker>THANK YOU, HOUSTON</Kicker>
        <H size={34}>
          Recording + playbook hit your inbox <Em>tomorrow</Em>.
        </H>
        <Sub>Stick around for open Q&amp;A — every question gets a straight answer.</Sub>
        <MonoLine color={INK_SOFT} size={14} bold>
          zappstudios.us&nbsp;&nbsp;·&nbsp;&nbsp;the Royal Pawz case study: zappstudios.us/rev-eng/royalpawzusa
        </MonoLine>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14 }}>
          <div style={{ background: INK, borderRadius: 10, padding: '14px 20px', flex: 1 }}>
            <span style={{ ...MONO, fontSize: 14, fontWeight: 700, color: AMBER_LT }}>BOOK →&nbsp;&nbsp;</span>
            <span style={{ ...MONO, fontSize: 14, color: CREAM }}>[ booking link goes here ]&nbsp;&nbsp;·&nbsp;&nbsp;8 AUGUST SLOTS</span>
          </div>
          <div
            style={{
              width: 86,
              height: 86,
              flex: 'none',
              border: `1.5px dashed ${AMBER}`,
              borderRadius: 8,
              display: 'grid',
              placeItems: 'center',
              ...MONO,
              fontSize: 12,
              fontWeight: 700,
              color: AMBER_DK,
            }}
          >
            QR
          </div>
        </div>
      </>
    ),
  },
}

/* ── the live YOURS panel ────────────────────────────────────────── */

const INPUT_LABELS: [string, string][] = [
  ['MARKETING', 'how do people find you?'],
  ['ONBOARDING', 'how do they pay you?'],
  ['FULFILLMENT', "what's the job?"],
  ['RETENTION', 'why do they come back?'],
]

export function YoursPanel({
  labels,
  onChange,
}: {
  labels: [string, string, string, string]
  onChange: (next: [string, string, string, string]) => void
}) {
  return (
    <>
      <Kicker>LIVE — LET&apos;S DO YOURS</Kicker>
      <H size={26}>
        One volunteer. <Em>Four blanks.</Em>
      </H>
      {INPUT_LABELS.map(([label, placeholder], i) => (
        <div key={label} style={{ margin: '10px 0' }}>
          <div style={{ ...MONO, fontSize: 11.5, fontWeight: 700, color: AMBER_DK, letterSpacing: 1.6, marginBottom: 4 }}>
            {label}
          </div>
          <input
            value={labels[i]}
            placeholder={placeholder}
            maxLength={32}
            onChange={(ev) => {
              const next = [...labels] as [string, string, string, string]
              next[i] = ev.target.value
              onChange(next)
            }}
            style={{
              ...MONO,
              width: '100%',
              boxSizing: 'border-box',
              fontSize: 15,
              color: INK,
              background: 'rgba(255,255,255,0.65)',
              border: `1px solid ${CREAM_DIM}`,
              borderRadius: 8,
              padding: '9px 12px',
              outline: 'none',
            }}
            onFocus={(ev) => (ev.target.style.borderColor = AMBER)}
            onBlur={(ev) => (ev.target.style.borderColor = CREAM_DIM)}
          />
        </div>
      ))}
      <Foot>Click a blank as they talk — the funnel fills in behind you. Esc frees the arrows.</Foot>
    </>
  )
}
