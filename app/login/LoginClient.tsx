'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Fingerprint, Loader2 } from 'lucide-react'
import { authBrowser } from '../_lib/auth/client'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

const AMBER = '#E8903A'
const AMBER_LIGHT = '#F0A855'
const CREAM = '#F5EFE0'
const INK = '#0C0C0C'
const MUTED = '#8A847A'

/** Google's own mark, inlined — the CSP-free way to keep it exact. */
function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

/**
 * The order here is the whole design.
 *
 * Google OAuth is first and is the durable path: it is what actually creates
 * the account. A passkey CANNOT bootstrap one — registerPasskey() requires an
 * already-signed-in user — so on a fresh browser, or a fresh machine, Google is
 * the only door. The passkey button is a second door for a device that has
 * already enrolled one, and it is the one that gives a bare Touch ID prompt
 * with no Google round-trip. Supabase labels the passkey API Experimental;
 * if it moves, this button disappears and nothing else changes.
 */
export default function LoginClient({ next }: { next: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState<'google' | 'passkey' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [webauthn, setWebauthn] = useState(false)

  // Rendered only after mount: window.PublicKeyCredential does not exist
  // during SSR, and guessing wrong either hides the button on a Mac or offers
  // Touch ID on a browser that cannot do it.
  useEffect(() => {
    setWebauthn(typeof window !== 'undefined' && 'PublicKeyCredential' in window)
  }, [])

  async function signInWithGoogle() {
    setError(null)
    setBusy('google')
    try {
      const sb = authBrowser()
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      // No access_type/prompt query params: those exist to obtain a *Google*
      // refresh token for calling Google's own APIs, and forcing the consent
      // screen on every sign-in for a token nothing reads is pure friction.
      // The Gmail send path, when it lands, gets its own consent flow.
      const { error } = await sb.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      })
      if (error) {
        setError(error.message)
        setBusy(null)
      }
      // On success the browser is already navigating to Google. Leave `busy`
      // set so the button cannot be double-fired during the handoff.
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign-in is unavailable.')
      setBusy(null)
    }
  }

  async function signInWithPasskey() {
    setError(null)
    setBusy('passkey')
    try {
      const sb = authBrowser()
      const { data, error } = await sb.auth.signInWithPasskey()
      if (error) {
        // Three failures that look identical to a user and are not: a
        // dismissed Touch ID prompt, a project where passkeys were never
        // switched on, and a device that simply has not enrolled one yet.
        const name = (error as { name?: string }).name ?? ''
        const code = (error as { code?: string }).code ?? ''
        setError(
          name === 'NotAllowedError'
            ? 'Passkey prompt dismissed.'
            : code === 'passkey_disabled'
              ? 'Passkeys are not switched on for this Supabase project yet.'
              : code === 'webauthn_credential_not_found'
                ? 'No passkey for this site on this device yet — sign in with Google once, then enrol one from /admin.'
                : error.message ||
                  'Passkey sign-in failed. Continue with Google instead.',
        )
        setBusy(null)
        return
      }
      if (!data?.session) {
        setError('Passkey accepted but no session was returned.')
        setBusy(null)
        return
      }
      // The session now lives in cookies (that is what @supabase/ssr's browser
      // client does), so the server render on the next line can see it.
      router.replace(next)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Passkey sign-in is unavailable.')
      setBusy(null)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={busy !== null}
        className="w-full flex items-center justify-center gap-3 rounded px-4 py-3 text-sm font-semibold transition-colors disabled:opacity-60"
        style={{ ...DISPLAY, backgroundColor: CREAM, color: INK }}
        onMouseEnter={(e) => {
          if (busy === null) e.currentTarget.style.backgroundColor = '#FDFAF2'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = CREAM
        }}
      >
        {busy === 'google' ? <Loader2 size={16} className="animate-spin" /> : <GoogleMark />}
        {busy === 'google' ? 'Redirecting to Google…' : 'Continue with Google'}
      </button>

      {webauthn && (
        <button
          type="button"
          onClick={signInWithPasskey}
          disabled={busy !== null}
          className="w-full flex items-center justify-center gap-3 rounded px-4 py-3 text-sm font-semibold transition-colors disabled:opacity-60"
          style={{
            ...DISPLAY,
            backgroundColor: 'transparent',
            color: CREAM,
            border: '1px solid rgba(245,239,224,0.22)',
          }}
          onMouseEnter={(e) => {
            if (busy === null) e.currentTarget.style.borderColor = AMBER_LIGHT
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(245,239,224,0.22)'
          }}
        >
          {busy === 'passkey' ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Fingerprint size={16} style={{ color: AMBER }} />
          )}
          {busy === 'passkey' ? 'Waiting for Touch ID…' : 'Use a passkey'}
        </button>
      )}

      {error && (
        <p
          className="text-xs leading-relaxed mt-1"
          style={{ ...MONO, color: '#E4776B' }}
          role="alert"
        >
          {error}
        </p>
      )}

      <p className="text-[11px] leading-relaxed mt-2" style={{ ...MONO, color: MUTED }}>
        One account. Signing in with anything else will be refused before an
        account is created.
      </p>
    </div>
  )
}
