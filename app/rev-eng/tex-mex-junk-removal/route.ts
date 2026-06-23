import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "tex-mex-junk-removal", "proposal.html")

  try {
    const html = readFileSync(filePath, "utf-8")
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}
