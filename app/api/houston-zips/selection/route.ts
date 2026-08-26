import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { put, get } from "@vercel/blob"
import { COOKIE_NAME, verifyToken } from "../verify"

export const dynamic = "force-dynamic"

// The Blob store attached to this project is a *private* store, so every read
// and write must pass access:"private" (a public URL fetch is rejected).
const SELECTION_PATH = "houston-zips/selection.json"

type Selection = {
  zips: string[]
  updatedAt: string
  count: number
}

async function readSelection(): Promise<Selection | null> {
  try {
    // useCache:false so a save is reflected immediately on the next read.
    const res = await get(SELECTION_PATH, { access: "private", useCache: false })
    if (!res || res.statusCode !== 200) return null
    const text = await new Response(res.stream).text()
    return JSON.parse(text) as Selection
  } catch {
    // no selection saved yet (or a transient read error) -> fall back to defaults
    return null
  }
}

// Public: return the currently-saved selection (or null if none saved yet).
export async function GET() {
  try {
    const sel = await readSelection()
    return NextResponse.json(
      { exists: !!sel, zips: sel?.zips ?? null, updatedAt: sel?.updatedAt ?? null, count: sel?.count ?? 0 },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch (err) {
    return NextResponse.json({ error: "read_failed", detail: String(err) }, { status: 500 })
  }
}

// Gated: save a new selection. Requires a valid edit-session cookie.
export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  let body: { zips?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 })
  }

  const raw = Array.isArray(body.zips) ? body.zips : null
  if (!raw) {
    return NextResponse.json({ ok: false, error: "zips_required" }, { status: 400 })
  }
  // sanitize: unique 5-digit ZIP strings, capped
  const zips = Array.from(
    new Set(raw.filter((z): z is string => typeof z === "string" && /^\d{5}$/.test(z)))
  ).sort()
  if (zips.length > 3000) {
    return NextResponse.json({ ok: false, error: "too_many" }, { status: 400 })
  }

  const updatedAt = new Date().toISOString()
  const payload: Selection = { zips, updatedAt, count: zips.length }
  const json = JSON.stringify(payload)

  try {
    // latest (overwritten each save)
    await put(SELECTION_PATH, json, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    })
    // immutable version snapshot so nothing is ever lost
    await put(`houston-zips/versions/${Date.now()}.json`, json, {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json",
    })
  } catch (err) {
    return NextResponse.json({ ok: false, error: "write_failed", detail: String(err) }, { status: 500 })
  }

  return NextResponse.json({ ok: true, updatedAt, count: zips.length })
}
