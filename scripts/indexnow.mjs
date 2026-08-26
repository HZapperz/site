#!/usr/bin/env node
/**
 * Push URLs to IndexNow (Bing, Yandex, Seznam, Naver).
 *
 * Why this matters for AI search: ChatGPT's web search is Bing-index-backed,
 * and freshness is a named reasoning-phase signal in Microsoft's own AEO/GEO
 * guidance. IndexNow is the fastest path from "page changed" to "Bing knows",
 * which is the fastest path to being cited in a ChatGPT answer.
 *
 * Reads the live sitemap so it never drifts from what the site actually
 * publishes.
 *
 * Usage:
 *   node scripts/indexnow.mjs                 # everything in the sitemap
 *   node scripts/indexnow.mjs /build /rescue  # only these paths
 */

const HOST = 'www.zappstudios.us'
const KEY = '37df1175071eccd49930451a09ae19d6'

async function fromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status} — deploy first`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
}

const args = process.argv.slice(2)
const urlList = args.length ? args.map((p) => `https://${HOST}${p}`) : await fromSitemap()

if (!urlList.length) {
  console.error('No URLs to submit.')
  process.exit(1)
}

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
})

// 200 = accepted. 202 = accepted, key still validating (normal on first run).
console.log(`IndexNow ${res.status} ${res.statusText} — submitted ${urlList.length} URL(s)`)
for (const u of urlList) console.log('  ' + u)
if (!res.ok && res.status !== 202) console.log(await res.text())
