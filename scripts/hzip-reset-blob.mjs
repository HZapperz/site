// One-off: reset the Houston-ZIPs blob store to a clean slate so the client
// starts at the 105 baked-in defaults. Deletes the saved selection + any
// test version snapshots. Run:  node --env-file=.env.local scripts/hzip-reset-blob.mjs
import { list, del } from "@vercel/blob"

const token = process.env.BLOB_READ_WRITE_TOKEN
if (!token) {
  console.error("BLOB_READ_WRITE_TOKEN not set (use --env-file=.env.local)")
  process.exit(1)
}

const { blobs } = await list({ prefix: "houston-zips/", limit: 1000, token })
if (!blobs.length) {
  console.log("Nothing under houston-zips/ — store already clean.")
  process.exit(0)
}
console.log(`Found ${blobs.length} blob(s):`)
for (const b of blobs) console.log("  -", b.pathname)

await del(blobs.map((b) => b.url), { token })
console.log(`\nDeleted ${blobs.length} blob(s). Client will now start at the 105 defaults.`)
