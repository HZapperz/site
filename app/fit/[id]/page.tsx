import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../_components/Nav'
import Footer from '../../_components/Footer'
import RevenueChart from '../../_components/RevenueChart'
import { MONO, SERIF, INK, INK_SOFT, INK_MUTED, CREAM, CREAM_CARD, HAIR, HAIR_SOFT, AMBER } from '../../_lib/theme'
import { getLead } from '../../_lib/leads'
import { dbConfigured } from '../../_lib/supabase'
import { describeAnswers } from '../../_lib/notify'
import { resolveOffer, OFFERS, ALTERNATE } from '../offers'
import { PROOF_FOR } from './proof'

export const dynamic = 'force-dynamic'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * The personalised recommendation.
 *
 * Next 14, not 15: `params` is a plain object here. The Next 15 Promise
 * signature typechecks against these React types and then breaks at runtime.
 *
 * Security rule: this page renders their ANSWERS and the routed offer, never
 * the email, phone or business name they submitted. The URL is an
 * unauthenticated capability — fine for "here is your recommendation",
 * not for handing back contact details to anyone holding the link.
 */
export default async function FitResultPage({ params }: { params: { id: string } }) {
  if (!UUID.test(params.id) || !dbConfigured()) notFound()

  const lead = await getLead(params.id)
  if (!lead) notFound()

  // Recomputed rather than read off the row, so a rules change applies to a
  // link someone opens tomorrow.
  const offerKey = resolveOffer(lead.answers)
  const offer = OFFERS[offerKey]
  const altKey = ALTERNATE[offerKey]
  const alt = altKey ? OFFERS[altKey] : null
  const said = describeAnswers(lead.answers)
  const proof = PROOF_FOR[offerKey]

  return (
    <main style={{ backgroundColor: CREAM, minHeight: '100vh' }}>
      <Nav mode="cream" />

      <section className="pt-32 md:pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase mb-6" style={{ ...MONO, letterSpacing: '0.22em', color: INK_MUTED }}>
            Prepared for you &middot; Zapp Studios
          </p>
          <h1
            className="leading-[1.1] mb-5"
            style={{ ...SERIF, fontWeight: 500, fontSize: 'clamp(32px, 4.4vw, 50px)', color: INK, letterSpacing: '-0.015em' }}
          >
            {offer.name}
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: INK_SOFT }}>
            {offer.line}
          </p>
        </div>
      </section>

      {/* 1 — the mirror. Proof that the answers were read, not collected. */}
      {said.length > 0 && (
        <section className="pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <SectionLabel n="01" title="What you told me" />
            <div className="rounded p-5 md:p-6 mt-5" style={{ backgroundColor: CREAM_CARD, border: HAIR }}>
              {said.map((r, i) => (
                <div
                  key={`${r.question}-${i}`}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-6 py-3"
                  style={i === 0 ? undefined : { borderTop: HAIR_SOFT }}
                >
                  <span className="text-[13px] sm:max-w-[58%]" style={{ color: INK_MUTED }}>{r.question}</span>
                  <span className="text-[15px] font-semibold sm:text-right" style={{ color: INK }}>{r.answer}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2 + 3 — the read, and the closest thing already proven. */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionLabel n="02" title="What I think is going on" />
          <p className="text-[17px] leading-relaxed mt-5 mb-8" style={{ color: INK_SOFT }}>
            {proof.read}
          </p>

          <div className="rounded p-5 md:p-6" style={{ backgroundColor: CREAM_CARD, border: HAIR }}>
            <div className="flex justify-between items-baseline pb-3 mb-4" style={{ borderBottom: HAIR }}>
              <p className="text-xs font-bold" style={{ ...MONO, letterSpacing: '0.06em', color: INK }}>{proof.client}</p>
              <p className="text-[10px] uppercase" style={{ ...MONO, letterSpacing: '0.14em', color: INK_MUTED }}>{proof.sector}</p>
            </div>
            {proof.chart && <RevenueChart variant="cream" />}
            <div className={proof.chart ? 'mt-2' : ''}>
              {proof.rows.map((r, i) => (
                <div
                  key={r.label}
                  className="flex justify-between items-baseline gap-4 py-2"
                  style={proof.chart || i > 0 ? { borderTop: HAIR_SOFT } : undefined}
                >
                  <span className="text-[13px]" style={{ color: INK_SOFT }}>{r.label}</span>
                  <span className="text-[15px] font-bold" style={{ ...MONO, color: INK, fontVariantNumeric: 'tabular-nums' }}>
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] leading-snug pt-3 mt-1" style={{ color: INK_MUTED, borderTop: HAIR_SOFT }}>
              {proof.note}
            </p>
          </div>
        </div>
      </section>

      {/* 4 — the offer itself. */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionLabel n="03" title="What that looks like" />
          <div className="rounded p-6 md:p-7 mt-5" style={{ backgroundColor: CREAM_CARD, border: `1px solid ${AMBER}` }}>
            <p className="text-[15px] font-semibold mb-4" style={{ color: INK }}>{offer.name}</p>
            <ul className="space-y-2.5 mb-6">
              {offer.deliverables.map((d) => (
                <li key={d} className="text-[14px] leading-snug pl-5 relative" style={{ color: INK_SOFT }}>
                  <span className="absolute left-0" style={{ color: AMBER }}>&mdash;</span>
                  {d}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4" style={{ borderTop: HAIR_SOFT }}>
              <Meta label="Timeline" value={offer.timeline} />
              <Meta label="Cost" value={offer.priceBand ?? 'Scoped on the call'} />
            </div>
          </div>

          {alt && (
            <p className="text-[14px] mt-5" style={{ color: INK_MUTED }}>
              If that is not the shape of it, the other likely one is{' '}
              <Link href={alt.href} style={{ color: INK, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                {alt.name}
              </Link>
              . We can work that out on the call.
            </p>
          )}
        </div>
      </section>

      {/* 5 — the call, plus a door for people who are not call-ready. */}
      <section className="pb-28 px-6">
        <div className="max-w-3xl mx-auto rounded p-7 md:p-9" style={{ backgroundColor: INK }}>
          <h2
            className="leading-[1.15] mb-4"
            style={{ ...SERIF, fontWeight: 500, fontSize: 'clamp(24px, 3.2vw, 34px)', color: CREAM }}
          >
            Fifteen minutes on your numbers.
          </h2>
          <p className="text-[15px] leading-relaxed mb-7 max-w-lg" style={{ color: '#A09A8E' }}>
            I will have read this before we talk, so we start from your answers rather than from the beginning.
            A working call, not a pitch. You keep the notes either way.
          </p>
          <Link
            href={`${offer.bookHref}${offer.bookHref.includes('?') ? '&' : '?'}lead=${lead.id}`}
            className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold rounded"
            style={{ backgroundColor: AMBER, color: INK }}
          >
            Book the call &rarr;
          </Link>
          <p className="text-xs mt-5" style={{ ...MONO, color: '#6B6560' }}>
            Not ready for a call? Reply to the email I just sent and I will put it in writing instead.
          </p>
        </div>
      </section>

      <Footer mode="cream" />
    </main>
  )
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-block" style={{ width: 16, height: 1, backgroundColor: AMBER }} />
      <span className="text-[11px] uppercase" style={{ ...MONO, letterSpacing: '0.2em', color: INK_MUTED }}>
        {n} &middot; {title}
      </span>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase mb-1" style={{ ...MONO, letterSpacing: '0.16em', color: INK_MUTED }}>{label}</p>
      <p className="text-[14px]" style={{ color: INK }}>{value}</p>
    </div>
  )
}
