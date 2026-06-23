import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"

export const dynamic = "force-dynamic"

// Internal review tool (NOT the client deliverable). Unlisted + noindex. The annotation
// layer saves to /api/drop2-annotations (gated by ?k=). Reviewers open this with
// ?r=<name>&k=<key>, e.g. .../drop2-review-tool?r=mary&k=pm-drop2-7Qx9
export async function GET() {
  const filePath = path.join(process.cwd(), "data", "pecan-moon", "drop2-review-tool.html")
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
