import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"

export const dynamic = "force-dynamic"

// Drop-2 v3 "pick catalog images" curation tool. One click selects a photo into a product's
// image set (1st = hero, rest = supplementary, in click order); the ★ on a selected photo
// promotes it to hero; the per-product note flags a hero that needs regenerating. Picks
// autosave to /api/drop2-annotations under reviewer "curate-<r>" — an ISOLATED blob, so the
// confirm/review tools' marks are never touched. Open with ?r=hamza&k=pm-drop2-7Qx9
export async function GET() {
  const filePath = path.join(process.cwd(), "data", "pecan-moon", "drop2-curate-v3.html")
  try {
    const html = readFileSync(filePath, "utf-8")
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}
