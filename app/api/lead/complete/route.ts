import { NextRequest, NextResponse } from 'next/server'
import { gateSchema, answersAreOffered } from '../../../fit/lead'
import { resolveOffer } from '../../../fit/offers'
import { GRAPH_VERSION } from '../../../fit/content'
import { completeLead, countRecentByIp, markNotified } from '../../../_lib/leads'
import { dbConfigured } from '../../../_lib/supabase'
import { notifyLead } from '../../../_lib/notify'
import { allow, hashIp } from '../../../_lib/ratelimit'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'no-store' }

/** Nobody answers six questions in four seconds. A script always can. */
const MIN_ELAPSED_MS = 4_000
const MAX_ELAPSED_MS = 24 * 3600 * 1000

/**
 * The contact gate.
 *
 * Every spam rejection returns a SUCCESS shape. A bot that learns which of its
 * submissions were refused iterates until one gets through; one that is told
 * everything worked learns nothing.
 */
export async function POST(req: NextRequest) {
  const ipHash = hashIp(req.headers)
  const quiet = () => NextResponse.json({ ok: true, fitUrl: null }, { headers: NO_STORE })

  if (!allow(`gate:${ipHash}`, 5, 600_000)) return quiet()

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400, headers: NO_STORE })
  }

  const parsed = gateSchema.safeParse(raw)
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return NextResponse.json(
      { ok: false, error: 'invalid', field: issue?.path?.[0] ?? null, message: issue?.message ?? 'Check the form' },
      { status: 400, headers: NO_STORE },
    )
  }

  const d = parsed.data

  if (d.company_url) return quiet()                              // honeypot
  const elapsed = Date.now() - d.startedAt
  if (elapsed < MIN_ELAPSED_MS || elapsed > MAX_ELAPSED_MS) return quiet()
  if (!answersAreOffered(d.answers)) return quiet()

  if (!dbConfigured()) {
    console.error('lead_gate_unconfigured', d.leadId)
    return NextResponse.json(
      { ok: false, error: 'unavailable', message: 'Something went wrong on my end.' },
      { status: 503, headers: NO_STORE },
    )
  }

  // Durable cap. The in-process limiter cannot see across instances.
  if (await countRecentByIp(ipHash) >= 5) return quiet()

  const offer = resolveOffer(d.answers)

  try {
    await completeLead({
      id: d.leadId,
      answers: d.answers,
      graph_version: GRAPH_VERSION,
      offer,
      ip_hash: ipHash,
      user_agent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
      country: req.headers.get('x-vercel-ip-country') ?? null,
      attribution: d.attribution,
      name: d.name,
      email: d.email,
      company: d.company || null,
      website: d.website || null,
      phone: d.phone || null,
    })
  } catch (err) {
    // Unlike the autosave path, this one is durable. If it fails the user must
    // hear about it, because otherwise they believe they have reached me.
    console.error('lead_complete_failed', d.leadId, String(err))
    return NextResponse.json(
      { ok: false, error: 'write_failed', message: 'That did not save. Try again, or email me directly.' },
      { status: 500, headers: NO_STORE },
    )
  }

  // The lead is already safe. A failed email must not fail the request — it is
  // recoverable from the table, which is why notified_at exists.
  try {
    await notifyLead({
      leadId: d.leadId, offer, name: d.name, email: d.email,
      company: d.company, website: d.website, phone: d.phone, answers: d.answers,
    })
    await markNotified(d.leadId)
  } catch (err) {
    console.error('lead_notify_failed', d.leadId, String(err))
  }

  return NextResponse.json({ ok: true, offer, fitUrl: `/fit/${d.leadId}` }, { headers: NO_STORE })
}
