import { NextRequest, NextResponse } from "next/server"
import { get } from "@vercel/blob"
import crypto from "crypto"

export const dynamic = "force-dynamic"

// Password comes ONLY from the environment — no fallback. If the var is unset
// (or the deck blob is missing) the route refuses to serve anything: the deck
// can never be exposed by a deploy that beat its configuration.
const PASSWORD = process.env.INVESTOR_DECK_PASSWORD || ""
const DECK_BLOB_PATH = "investors/deck.html"

const COOKIE_NAME = "zapp_deck_session"
const SESSION_DAYS = 14

// Session token: expiry.hmac(secret, expiry). Deriving the secret from the
// password means rotating the password invalidates every issued session.
const secret = () => "zs-deck-" + PASSWORD

function makeToken(): string {
  const expiry = `${Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000}`
  const sig = crypto.createHmac("sha256", secret()).update(expiry).digest("hex")
  return `${expiry}.${sig}`
}

function verifyToken(token: string): boolean {
  try {
    const [expiry, sig] = token.split(".")
    if (!expiry || !sig || Date.now() > parseInt(expiry, 10)) return false
    const expected = crypto.createHmac("sha256", secret()).update(expiry).digest("hex")
    return (
      sig.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))
    )
  } catch {
    return false
  }
}

function passwordMatches(attempt: string): boolean {
  const a = crypto.createHash("sha256").update(attempt).digest()
  const b = crypto.createHash("sha256").update(PASSWORD).digest()
  return crypto.timingSafeEqual(a, b)
}

const BASE_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
}

// ── minimal branded shell for the gate itself (deck styling lives in the deck) ──
function shell(inner: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>Zapp Studios · Investors</title>
<style>
  :root{color-scheme:dark}
  body{margin:0;min-height:100svh;display:flex;align-items:center;justify-content:center;
    background:#000;color:#F5EFE0;font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.55}
  .card{padding:32px;max-width:380px;width:calc(100% - 48px)}
  .boxed{display:inline-block;border:2px solid #F5EFE0;padding:7px 14px;font-weight:600;
    font-size:11px;letter-spacing:.4em;text-transform:uppercase}
  h1{font-size:26px;font-weight:700;letter-spacing:.01em;margin:22px 0 6px;text-transform:uppercase}
  h1 span{color:#E8903A}
  p{margin:0 0 22px;color:#B5AFA3;font-size:14.5px}
  input{width:100%;box-sizing:border-box;background:#0C0C0C;border:2px solid #3A3632;color:#F5EFE0;
    padding:13px 14px;font-size:16px;border-radius:0;outline:none}
  input:focus{border-color:#E8903A}
  button{width:100%;margin-top:12px;padding:13px 14px;background:#E8903A;color:#0C0C0C;border:0;
    font-weight:700;font-size:14px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
  button:hover{filter:brightness(1.06)}
  .err{color:#E8903A;font-size:13.5px;margin:10px 0 0}
  .legal{margin-top:26px;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:#3A3632}
</style></head><body><div class="card">${inner}</div></body></html>`
}

function loginPage(error?: string): string {
  return shell(`
  <span class="boxed">Zapp Studios</span>
  <h1>Investor <span>Deck</span></h1>
  <p>This deck is private. Enter the access code you were sent.</p>
  <form method="POST" action="/investors" autocomplete="off">
    <input type="password" name="password" placeholder="Access code" autofocus required>
    <button type="submit">View the deck</button>
    ${error ? `<p class="err">${error}</p>` : ""}
  </form>
  <div class="legal">Private. Please don&rsquo;t redistribute</div>`)
}

const notOpenPage = () =>
  shell(`
  <span class="boxed">Zapp Studios</span>
  <h1>Investor <span>Deck</span></h1>
  <p>This page isn&rsquo;t open yet. If you were expecting access, reach out:
  <a href="mailto:hamza.awty@gmail.com" style="color:#E8903A">hamza.awty@gmail.com</a></p>
  <div class="legal">Private. Please don&rsquo;t redistribute</div>`)

export async function GET(req: NextRequest) {
  if (!PASSWORD) return new NextResponse(notOpenPage(), { status: 503, headers: BASE_HEADERS })

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token || !verifyToken(token)) {
    return new NextResponse(loginPage(), { status: 200, headers: BASE_HEADERS })
  }

  // Authenticated: stream the deck out of the private Blob store.
  try {
    const blob = await get(DECK_BLOB_PATH, { access: "private", useCache: false })
    if (!blob || blob.statusCode !== 200) {
      return new NextResponse(notOpenPage(), { status: 503, headers: BASE_HEADERS })
    }
    const html = await new Response(blob.stream).text()
    return new NextResponse(html, { status: 200, headers: BASE_HEADERS })
  } catch {
    return new NextResponse(notOpenPage(), { status: 503, headers: BASE_HEADERS })
  }
}

export async function POST(req: NextRequest) {
  if (!PASSWORD) return new NextResponse(notOpenPage(), { status: 503, headers: BASE_HEADERS })

  const form = await req.formData().catch(() => null)
  const attempt = String(form?.get("password") ?? "")

  if (!attempt || !passwordMatches(attempt)) {
    await new Promise((r) => setTimeout(r, 350)) // blunt brute-force loops
    return new NextResponse(loginPage("That code didn&rsquo;t work. Check it and try again."), {
      status: 401,
      headers: BASE_HEADERS,
    })
  }

  const res = new NextResponse(null, {
    status: 303,
    headers: { Location: "/investors", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  })
  res.cookies.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    secure: true,
    // Lax (not Strict) so the cookie still rides on top-level navigations from
    // an email or DM link — investors re-open the deck from the original link.
    sameSite: "lax",
    path: "/investors",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
  return res
}
