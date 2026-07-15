// Upload the investor deck to the project's *private* Blob store.
// The deck never enters git (the repo is public); the /investors route
// streams it from Blob after password auth.
//
// Usage:  node --env-file=.env.local scripts/upload-investor-deck.mjs
// To ship a new deck version: overwrite private/investor-deck.local.html, re-run.

import { put } from "@vercel/blob"
import { readFileSync } from "fs"

const SOURCE = "private/investor-deck.local.html"
const DEST = "investors/deck.html"

const html = readFileSync(SOURCE, "utf8")
if (!html.includes("</html>")) {
  console.error(`${SOURCE} does not look like a complete HTML document; aborting`)
  process.exit(1)
}

const res = await put(DEST, html, {
  access: "private",
  contentType: "text/html; charset=utf-8",
  allowOverwrite: true,
  cacheControlMaxAge: 0,
})

console.log(`uploaded ${SOURCE} (${(html.length / 1024).toFixed(0)} KB) -> ${res.pathname}`)
