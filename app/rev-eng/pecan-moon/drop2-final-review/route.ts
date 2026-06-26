import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"

export const dynamic = "force-dynamic"

// Drop-2 FINAL REVIEW document for Mary (read-only). Grouped by category, all 66 products,
// with the final curated images in order (hero-first per color) + sizing/colors/quantities/price.
// Items not yet in Shopify are flagged. Sign-off surface before we build the Shopify upload CSV.
export async function GET() {
  const filePath = path.join(process.cwd(), "data", "pecan-moon", "drop2-final-review.html")
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
