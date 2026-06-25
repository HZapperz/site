import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"

export const dynamic = "force-dynamic"

// Drop-2 v3 "confirm placement" review tool. Mary ticks each matched photo ✓ right spot / ✗ wrong
// spot; marks autosave to /api/drop2-annotations under reviewer "mary-v3" (separate blob from the
// original drop2-review-tool, which is preserved). Open with ?r=mary-v3&k=pm-drop2-7Qx9
export async function GET() {
  const filePath = path.join(process.cwd(), "data", "pecan-moon", "drop2-review-v3.html")
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
