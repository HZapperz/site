import { requireAdmin } from '../_lib/auth/dal'
import AdminActions from './AdminActions'

const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }
const SERIF: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" }

const CREAM = '#F5EFE0'
const AMBER = '#E8903A'
const MUTED = '#8A847A'

export const dynamic = 'force-dynamic'

/**
 * Placeholder. Its only job today is to prove the guard: this page calls
 * requireAdmin() itself rather than leaning on app/admin/layout.tsx, because a
 * page segment renders in parallel with its layout and a layout-only guard
 * leaks. Delete the layout's guard and this page must still deny.
 *
 * The prospect list, lead detail, inbound and deals screens land on top of
 * this shell in the next wave.
 */
export default async function AdminHome() {
  const admin = await requireAdmin()

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5EFE0] px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p
          className="text-[10px] uppercase mb-5"
          style={{ ...MONO, letterSpacing: '0.25em', color: AMBER }}
        >
          Zapp CRM
        </p>

        <h1 className="text-3xl leading-tight mb-4" style={{ ...SERIF, color: CREAM }}>
          You are in.
        </h1>

        <p className="text-sm leading-relaxed mb-10" style={{ color: MUTED }}>
          Signed in as{' '}
          <span style={{ ...MONO, color: CREAM }}>{admin.email}</span> ·{' '}
          <span style={{ ...MONO, color: CREAM }}>{admin.role}</span>. That
          address was read out of <code style={MONO}>crm_admins</code> through
          RLS, as you — not through the service role.
        </p>

        <div
          className="rounded-lg p-6 mb-10"
          style={{ backgroundColor: '#141414', border: '1px solid rgba(245,239,224,0.08)' }}
        >
          <p
            className="text-[10px] uppercase mb-4"
            style={{ ...DISPLAY, letterSpacing: '0.2em', color: MUTED }}
          >
            Account
          </p>
          <AdminActions />
        </div>

        <p
          className="text-[10px] uppercase mb-3"
          style={{ ...DISPLAY, letterSpacing: '0.2em', color: MUTED }}
        >
          Next
        </p>
        <ul className="text-sm leading-relaxed space-y-1.5" style={{ color: MUTED }}>
          <li>· /admin/prospects — the 272 drafted leads, filterable</li>
          <li>· /admin/prospects/[key] — one lead, with the activity timeline</li>
          <li>· /admin/inbound — the /fit funnel leads, read-only to start</li>
          <li>· /admin/deals — stage view</li>
        </ul>
      </div>
    </main>
  )
}
