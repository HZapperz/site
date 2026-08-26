import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import DarkPageBodyClass from '../_components/DarkPageBodyClass'
import { safeInternalPath } from '../_lib/auth/redirect'
import LoginClient from './LoginClient'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }

const AMBER = '#E8903A'
const CREAM = '#F5EFE0'
const MUTED = '#8A847A'

/** Every way a visitor can arrive here without a session, said plainly. */
const REASONS: Record<string, { tone: 'warn' | 'bad'; text: string }> = {
  unauthorized: {
    tone: 'bad',
    text: 'That account is signed in but is not on the CRM allow-list.',
  },
  'signed-out': {
    tone: 'warn',
    text: 'You were signed out. Sign in again to pick up where you left off.',
  },
  'oauth-denied': { tone: 'warn', text: 'Google sign-in was cancelled.' },
  'not-allowed': {
    tone: 'bad',
    text: 'Sign-up is restricted to one address. No account was created.',
  },
  'missing-code': { tone: 'warn', text: 'That sign-in link was incomplete. Try again.' },
  'exchange-failed': { tone: 'warn', text: 'Sign-in did not complete. Try again.' },
  'not-configured': {
    tone: 'bad',
    text: 'Sign-in is not configured on this deployment.',
  },
}

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const next = safeInternalPath(first(searchParams.next), '/admin')
  const reason = first(searchParams.reason)
  const notice = reason ? REASONS[reason] : undefined

  return (
    <main className="min-h-screen flex flex-col bg-[#0C0C0C] text-[#F5EFE0]">
      <DarkPageBodyClass />
      <Nav mode="dark" />

      <div className="flex-1 flex items-center justify-center px-6 pt-28 pb-24">
        <div className="w-full max-w-sm">
          <p
            className="text-[10px] uppercase mb-5"
            style={{ ...MONO, letterSpacing: '0.25em', color: AMBER }}
          >
            Internal
          </p>

          <h1
            className="text-3xl leading-tight mb-3"
            style={{ ...SERIF, color: CREAM }}
          >
            Sign in to the CRM.
          </h1>

          <p className="text-sm leading-relaxed mb-8" style={{ color: MUTED }}>
            The pipeline generates the leads. This is where the calls, the
            replies and the deals get recorded.
          </p>

          {notice && (
            <div
              className="mb-6 rounded px-3 py-2.5 text-xs leading-relaxed"
              style={{
                ...MONO,
                color: notice.tone === 'bad' ? '#E4776B' : '#E8B86A',
                border: `1px solid ${
                  notice.tone === 'bad' ? 'rgba(228,119,107,0.28)' : 'rgba(232,184,106,0.28)'
                }`,
                backgroundColor:
                  notice.tone === 'bad' ? 'rgba(228,119,107,0.07)' : 'rgba(232,184,106,0.07)',
              }}
            >
              {notice.text}
            </div>
          )}

          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: '#141414',
              border: '1px solid rgba(245,239,224,0.08)',
            }}
          >
            <LoginClient next={next} />
          </div>

          <p
            className="text-[10px] uppercase mt-6 text-center"
            style={{ ...DISPLAY, letterSpacing: '0.2em', color: '#5C574F' }}
          >
            Zapp Studios · Houston, TX
          </p>
        </div>
      </div>

      <Footer mode="dark" />
    </main>
  )
}
