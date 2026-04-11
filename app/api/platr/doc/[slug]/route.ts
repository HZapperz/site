import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { readFileSync } from "fs"
import path from "path"
import { verifyToken } from "../../verify"

import { COOKIE_NAME } from "../../verify"

const DOCS: Record<string, string> = {
  quote: "quote.html",
  scope: "scope.html",
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token || !verifyToken(token)) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { slug } = await params
  const filename = DOCS[slug]

  if (!filename) {
    return new NextResponse("Not found", { status: 404 })
  }

  const filePath = path.join(process.cwd(), "data", "platr", filename)

  try {
    const html = readFileSync(filePath, "utf-8")
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}
