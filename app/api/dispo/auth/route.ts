import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { PASSWORD, COOKIE_NAME, makeToken, verifyToken } from "../verify"

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.password !== PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const token = makeToken()
  const res = NextResponse.json({ ok: true })

  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  })

  return res
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const valid = token ? verifyToken(token) : false
  return NextResponse.json({ authenticated: valid })
}
