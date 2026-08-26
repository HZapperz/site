import type { MetadataRoute } from 'next'
import { SITE_URL } from './_lib/schema'
import { PRIVATE_PREFIXES, PUBLIC_REV_ENG } from './_lib/routes'

/**
 * Explicit AI-crawler stance.
 *
 * Bingbot matters most: ChatGPT's web search is Bing-index-backed, so Bing
 * indexation is the most direct lever on ChatGPT citations. The rest are named
 * individually so the allowlist is a deliberate decision rather than a default,
 * and so a future blanket Disallow cannot silently remove the site from AI
 * answers.
 */
const AI_CRAWLERS = [
  'Bingbot',        // Bing index → Copilot and ChatGPT search
  'Googlebot',
  'Google-Extended', // Gemini grounding
  'GPTBot',          // OpenAI crawl
  'OAI-SearchBot',   // ChatGPT search index
  'ChatGPT-User',    // live fetch triggered by a ChatGPT user
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'DuckAssistBot',
]

export default function robots(): MetadataRoute.Robots {
  const disallow = PRIVATE_PREFIXES
  // More specific than `Disallow: /rev-eng/`, so these two stay crawlable.
  const allow = ['/', ...PUBLIC_REV_ENG]

  return {
    rules: [
      { userAgent: '*', allow, disallow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow, disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
