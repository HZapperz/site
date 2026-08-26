'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Fingerprint, LogOut, Loader2 } from 'lucide-react'
import { authBrowser } from '../_lib/auth/client'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

const CREAM = '#F5EFE0'
const AMBER = '#E8903A'
const MUTED = '#8A847A'

/**
 * Two actions, both needed to exercise the auth path end to end.
 *
 * "Enrol Touch ID" is the missing half of the passkey story: registerPasskey()
 * requires an existing session, so the /login passkey button is inert until
 * this has been pressed once, on this machine, while signed in via Google.
 */
export default function AdminActions() {
  const router = useRouter()
  const [busy, setBusy] = useState<'passkey' | 'signout' | null>(null)
  const [message, setMessage] = useState<{ tone: 'ok' | 'bad'; text: string } | null>(null)

  async function enrolPasskey() {
    setMessage(null)
    setBusy('passkey')
    try {
      const { error } = await authBrowser().auth.registerPasskey()
      if (error) {
        const name = (error as { name?: string }).name ?? ''
        setMessage({
          tone: 'bad',
          text:
            name === 'NotAllowedError'
              ? 'Enrolment dismissed.'
              : error.message || 'Could not enrol a passkey.',
        })
      } else {
        setMessage({
          tone: 'ok',
          text: 'Passkey enrolled. "Use a passkey" on /login now works on this device.',
        })
      }
    } catch (e) {
      setMessage({
        tone: 'bad',
        text: e instanceof Error ? e.message : 'Could not enrol a passkey.',
      })
    }
    setBusy(null)
  }

  async function signOut() {
    setBusy('signout')
    try {
      await authBrowser().auth.signOut()
    } catch {
      // Even a failed server-side revoke clears the local cookies; send them
      // to /login either way rather than stranding them on a dead session.
    }
    router.replace('/login')
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={enrolPasskey}
          disabled={busy !== null}
          className="flex items-center gap-2 rounded px-4 py-2.5 text-xs font-semibold transition-colors disabled:opacity-60"
          style={{
            ...DISPLAY,
            color: CREAM,
            border: '1px solid rgba(245,239,224,0.22)',
          }}
        >
          {busy === 'passkey' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Fingerprint size={14} style={{ color: AMBER }} />
          )}
          Enrol Touch ID on this device
        </button>

        <button
          type="button"
          onClick={signOut}
          disabled={busy !== null}
          className="flex items-center gap-2 rounded px-4 py-2.5 text-xs font-semibold transition-colors disabled:opacity-60"
          style={{ ...DISPLAY, color: MUTED, border: '1px solid rgba(245,239,224,0.1)' }}
        >
          {busy === 'signout' ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
          Sign out
        </button>
      </div>

      {message && (
        <p
          className="text-xs leading-relaxed"
          style={{ ...MONO, color: message.tone === 'ok' ? '#7FB88A' : '#E4776B' }}
          role="status"
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
