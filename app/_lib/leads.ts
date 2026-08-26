import 'server-only'
import { db } from './supabase'
import type { Answers } from '../fit/content'
import type { OfferKey } from '../fit/offers'

/** The only module that touches the leads table. */

export type Attribution = {
  utm_source?: string; utm_medium?: string; utm_campaign?: string
  utm_content?: string; utm_term?: string
  referrer?: string; entry?: string
}

export type LeadRow = {
  id: string
  created_at: string
  answers: Answers
  graph_version: number
  offer: OfferKey | null
  completed_at: string | null
  name: string | null
  email: string | null
  company: string | null
  website: string | null
  phone: string | null
}

export type DraftWrite = {
  id: string
  answers: Answers
  graph_version: number
  offer: OfferKey
  ip_hash: string
  user_agent?: string | null
  country?: string | null
  attribution?: Attribution
}

export type GateWrite = DraftWrite & {
  name: string
  email: string
  company?: string | null
  website?: string | null
  phone?: string | null
}

function baseRow(r: DraftWrite) {
  return {
    id: r.id,
    answers: r.answers,
    graph_version: r.graph_version,
    offer: r.offer,
    ip_hash: r.ip_hash,
    user_agent: r.user_agent ?? null,
    country: r.country ?? null,
    ...(r.attribution ?? {}),
  }
}

/** Autosave. Full-document upsert, so a dropped write self-heals on the next one. */
export async function upsertLead(r: DraftWrite): Promise<void> {
  const { error } = await db().from('leads').upsert(baseRow(r), { onConflict: 'id' })
  if (error) throw new Error(error.message)
}

/** The gate. This one is durable — a failure here is shown to the user. */
export async function completeLead(r: GateWrite): Promise<void> {
  const { error } = await db().from('leads').upsert(
    {
      ...baseRow(r),
      name: r.name,
      email: r.email,
      company: r.company || null,
      website: r.website || null,
      phone: r.phone || null,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  )
  if (error) throw new Error(error.message)
}

export async function markNotified(id: string): Promise<void> {
  await db().from('leads').update({ notified_at: new Date().toISOString() }).eq('id', id)
}

/**
 * Read for the offer page. Selects an explicit column list — never `*` — so a
 * column added later cannot leak into a page by accident.
 */
export async function getLead(id: string): Promise<LeadRow | null> {
  const { data, error } = await db()
    .from('leads')
    .select('id, created_at, answers, graph_version, offer, completed_at, name, email, company, website, phone')
    .eq('id', id)
    .maybeSingle()
  if (error || !data) return null
  return data as LeadRow
}

/** Durable abuse cap. The in-process limiter cannot see across instances. */
export async function countRecentByIp(ipHash: string): Promise<number> {
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  const { count, error } = await db()
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', since)
    .not('completed_at', 'is', null)
  if (error) return 0
  return count ?? 0
}
