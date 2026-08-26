/**
 * Funnel logic checks. Run with: npm run check:funnel
 *
 * Compiles the pure modules (content.ts, offers.ts) to a temp dir and asserts
 * against them. There is no test runner in this repo and this does not add one —
 * the two modules under test import nothing but their own types.
 *
 * The routing rules overlap on purpose, so precedence is what these assert.
 */
import { execSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const out = mkdtempSync(join(tmpdir(), 'zapp-funnel-'))
try {
  execSync(
    `npx tsc app/fit/offers.ts app/fit/content.ts --outDir ${out} ` +
    `--module es2022 --target es2022 --moduleResolution bundler --skipLibCheck`,
    { stdio: 'inherit' },
  )

  const { resolveOffer } = await import(join(out, 'offers.js'))
  const { pathFor, nextStep, isStepComplete, pruneAfter, furthestReachable, isStepId, FOLLOWUPS } =
    await import(join(out, 'content.js'))

  let pass = 0, fail = 0
  const is = (label, got, want) => {
    const ok = JSON.stringify(got) === JSON.stringify(want)
    ok ? pass++ : fail++
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} -> ${JSON.stringify(got)}${ok ? '' : ` (want ${JSON.stringify(want)})`}`)
  }

  console.log('\nresolveOffer — first match wins, so order is the spec:')
  is('idea stage', resolveOffer({ business: 'idea' }), 'founder')
  is('pre-revenue', resolveOffer({ business: 'local-service', revenue: 'pre' }), 'founder')
  is('pre-revenue outranks equity + rescue',
     resolveOffer({ business: 'software', revenue: 'pre', appetite: 'equity', constraint: 'broken', followup: 'lovable' }), 'founder')
  is('broken + lovable', resolveOffer({ business: 'software', revenue: '10-50k', constraint: 'broken', followup: 'lovable' }), 'rescue')
  is('rescue outranks partnership',
     resolveOffer({ business: 'software', revenue: '250k-plus', constraint: 'broken', followup: 'bolt', appetite: 'equity' }), 'rescue')
  is('50-250k + equity', resolveOffer({ business: 'local-service', revenue: '50-250k', constraint: 'conversion', appetite: 'equity' }), 'partnership')
  is('equity appetite but small revenue', resolveOffer({ business: 'local-service', revenue: 'under-10k', constraint: 'conversion', appetite: 'equity' }), 'diagnostic')
  is('big revenue but cash only', resolveOffer({ business: 'local-service', revenue: '250k-plus', constraint: 'conversion', appetite: 'cash' }), 'diagnostic')
  is('duct-tape', resolveOffer({ business: 'local-service', revenue: '10-50k', constraint: 'duct-tape' }), 'build')
  is('traffic', resolveOffer({ business: 'ecommerce', revenue: '10-50k', constraint: 'traffic' }), 'build')
  is('broken but WordPress', resolveOffer({ business: 'restaurant', revenue: '10-50k', constraint: 'broken', followup: 'wordpress' }), 'build')
  is('broken but agency-built', resolveOffer({ business: 'restaurant', revenue: '10-50k', constraint: 'broken', followup: 'agency' }), 'build')
  is('conversion', resolveOffer({ business: 'local-service', revenue: '10-50k', constraint: 'conversion' }), 'diagnostic')
  is('cannot name the lever', resolveOffer({ business: 'ecommerce', revenue: '50-250k', constraint: 'unsure' }), 'diagnostic')
  is('empty answers default to diagnostic', resolveOffer({}), 'diagnostic')

  console.log('\npath length by branch:')
  const full = { business: 'software', revenue: '10-50k', constraint: 'broken', followup: 'lovable', timeline: 'this-month', appetite: 'cash' }
  is('services path is 9 screens', pathFor({ business: 'local-service', revenue: '10-50k' }).length, 9)
  is('idea path is 3 screens', pathFor({ business: 'idea' }).length, 3)
  is('pre-revenue path is 4 screens', pathFor({ business: 'local-service', revenue: 'pre' }).length, 4)
  is('idea path skips revenue', pathFor({ business: 'idea' }).includes('revenue'), false)
  is('path terminates', nextStep('gate', {}), null)

  console.log('\nstep gating:')
  is('unanswered blocks', isStepComplete('constraint', {}), false)
  is('answered advances', isStepComplete('constraint', { constraint: 'traffic' }), true)
  is('timeline needs BOTH fields', isStepComplete('timeline', { timeline: 'this-month' }), false)
  is('timeline complete with both', isStepComplete('timeline', { timeline: 'this-month', appetite: 'cash' }), true)
  is('interstitials never block', isStepComplete('proof', {}), true)

  console.log('\npruneAfter — the silent-misroute guard:')
  is('changing constraint drops followup', pruneAfter(full, 'constraint'), { business: 'software', revenue: '10-50k' })
  is('changing business drops everything', pruneAfter(full, 'business'), {})
  is('stale followup would misroute', resolveOffer({ ...full, constraint: 'traffic' }), 'build')
  is('pruned then re-answered routes right', resolveOffer({ ...pruneAfter(full, 'constraint'), constraint: 'traffic', followup: '5-20k' }), 'build')

  console.log('\nfurthestReachable — clamps a forged ?s=:')
  is('nothing answered', furthestReachable({}), 'business')
  is('one answered', furthestReachable({ business: 'local-service' }), 'revenue')
  is('constraint unanswered', furthestReachable({ business: 'local-service', revenue: '10-50k' }), 'constraint')
  is('half-answered timeline blocks',
     furthestReachable({ business: 'local-service', revenue: '10-50k', constraint: 'traffic', followup: 'none', timeline: 'this-month' }), 'timeline')
  is('fully answered reaches gate', furthestReachable(full), 'gate')
  is('rejects a garbage step id', isStepId('../../etc/passwd'), false)

  console.log('\nevery constraint has a follow-up question:')
  for (const c of ['traffic', 'conversion', 'duct-tape', 'broken', 'unsure']) {
    is(`FOLLOWUPS.${c}`, Boolean(FOLLOWUPS[c]?.options?.length), true)
  }

  console.log(`\n${pass} passed, ${fail} failed\n`)
  process.exit(fail ? 1 : 0)
} finally {
  rmSync(out, { recursive: true, force: true })
}
