import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { readFileSync } from "fs"
import path from "path"
import { COOKIE_NAME, verifyToken } from "../verify"

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token || !verifyToken(token)) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const filePath = path.join(process.cwd(), "data", "dispo", "proposal.html")

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
