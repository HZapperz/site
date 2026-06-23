import { NextRequest, NextResponse } from "next/server"
import { put, get, list } from "@vercel/blob"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Light shared-secret gate (passed as ?k= in the reviewer's link). Not real auth —
// the review marks aren't sensitive; this just stops random writes to the store.
const KEY = process.env.REVIEW_KEY || "pm-drop2-7Qx9"
const PREFIX = "drop2-annotations/"

const sane = (s: string | null) =>
  (s || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 24)
const pathOf = (r: string) => `${PREFIX}${r}.json`
const gate = (req: NextRequest) =>
  new URL(req.url).searchParams.get("k") === KEY

export async function GET(req: NextRequest) {
  if (!gate(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  const sp = new URL(req.url).searchParams

  // ?all=1 -> every reviewer's state merged (for Zapp to pull all marks)
  if (sp.get("all") === "1") {
    const { blobs } = await list({ prefix: PREFIX })
    const reviewers: Record<string, unknown> = {}
    for (const b of blobs) {
      const r = b.pathname.replace(PREFIX, "").replace(/\.json$/, "")
      const g = await get(b.pathname, { access: "private" })
      if (g && g.statusCode === 200) reviewers[r] = await new Response(g.stream).json()
    }
    return NextResponse.json({ ok: true, reviewers })
  }

  const reviewer = sane(sp.get("reviewer"))
  if (!reviewer) return NextResponse.json({ ok: false, error: "no reviewer" }, { status: 400 })
  try {
    const g = await get(pathOf(reviewer), { access: "private" })
    if (!g || g.statusCode !== 200) return NextResponse.json({ ok: true, state: null })
    const data = await new Response(g.stream).json()
    return NextResponse.json({ ok: true, ...data })
  } catch {
    return NextResponse.json({ ok: true, state: null })
  }
}

export async function POST(req: NextRequest) {
  if (!gate(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  const reviewer = sane(new URL(req.url).searchParams.get("reviewer"))
  if (!reviewer) return NextResponse.json({ ok: false, error: "no reviewer" }, { status: 400 })
  const body = await req.text()
  if (body.length > 5_000_000) return NextResponse.json({ ok: false, error: "too large" }, { status: 413 })
  await put(pathOf(reviewer), body, {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  })
  return NextResponse.json({ ok: true })
}
