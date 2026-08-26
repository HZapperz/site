import crypto from "crypto"

// Passcode that unlocks editing (and the admin data page). Set HOUSTON_ZIPS_PASSWORD
// in the environment to override the default.
export const PASSWORD = process.env.HOUSTON_ZIPS_PASSWORD || "houston2026"
const SECRET = "zs-hzip-" + PASSWORD

export const COOKIE_NAME = "hzip_session"

export function makeToken() {
  const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000
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
