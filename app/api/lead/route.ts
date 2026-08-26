import { NextRequest, NextResponse } from 'next/server'
import { draftSchema, answersAreOffered } from '../../fit/lead'
import { resolveOffer } from '../../fit/offers'
import { GRAPH_VERSION } from '../../fit/content'
import { upsertLead } from '../../_lib/leads'
import { dbConfigured } from '../../_lib/supabase'
import { allow, hashIp } from '../../_lib/ratelimit'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'no-store' }

/**
 * Autosave. Fires on every answer so that someone who abandons mid-funnel is
 * still a lead worth following up.
 *
 * There is deliberately no GET. A leadId is guessable enough that a read
 * endpoint would turn it into a data-exfiltration route; /fit/[id] reads
 * server-side instead.
 */
export async function POST(req: NextRequest) {
  const ipHash = hashIp(req.headers)
  if (!allow(`draft:${ipHash}`, 60, 600_000)) {
    return NextResponse.json({ ok: true }, { headers: NO_STORE })
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400, headers: NO_STORE })
  }

  const parsed = draftSchema.safeParse(raw)
  if (!parsed.success || !answersAreOffered(parsed.data.answers)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400, headers: NO_STORE })
  }

  if (!dbConfigured()) {
    return NextResponse.json({ ok: true, stored: false }, { headers: NO_STORE })
  }

  const { leadId, answers, attribution } = parsed.data

  try {
    await upsertLead({
      id: leadId,
      answers,
      graph_version: GRAPH_VERSION,
      // Always derived here. The client never gets to say which offer it is.
      offer: resolveOffer(answers),
      ip_hash: ipHash,
      user_agent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
      country: req.headers.get('x-vercel-ip-country') ?? null,
      attribution,
    })
  } catch (err) {
    // A dropped draft must never surface to the user. Every POST carries the
    // whole answer document, so the next one supersedes this failure.
    console.error('lead_draft_failed', leadId, String(err))
    return NextResponse.json({ ok: true, stored: false }, { headers: NO_STORE })
  }

  return NextResponse.json({ ok: true }, { headers: NO_STORE })
}
