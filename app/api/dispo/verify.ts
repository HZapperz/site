import crypto from "crypto"

export const PASSWORD = process.env.DISPO_PASSWORD || "dispo2026"
const SECRET = "zs-dispo-" + PASSWORD

export const COOKIE_NAME = "dispo_session"

export function makeToken() {
  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000
  const payload = `${expiry}`
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 16)
  return `${payload}.${sig}`
}

export function verifyToken(token: string): boolean {
  try {
    const [payload, sig] = token.split(".")
    const expiry = parseInt(payload)
    if (Date.now() > expiry) return false
    const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 16)
    return sig === expected
  } catch {
    return false
  }
}
