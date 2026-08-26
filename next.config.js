/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/revenue', destination: '/diagnostic', permanent: true },
      { source: '/sprint', destination: '/diagnostic', permanent: true },
      { source: '/classes', destination: '/learn', permanent: true },
      { source: '/growth', destination: '/build', permanent: true },
      { source: '/founders', destination: '/partnerships', permanent: true },
    ]
  },
  async rewrites() {
    return [
      { source: '/apartment-locator/fae', destination: '/apartment-locator/fae.html' },
    ]
  },
  async headers() {
    return [
      { source: '/_tmp/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }] },
      // Client proposals under /rev-eng/ are served by route.ts handlers, which
      // never see Next.js `metadata`. This header is the only noindex that
      // reaches them. The two public pages are re-opened immediately below.
      {
        source: '/rev-eng/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/rev-eng/royalpawzusa',
        headers: [{ key: 'X-Robots-Tag', value: 'all' }],
      },
      {
        source: '/rev-eng/mobile-vehicle-detailing',
        headers: [{ key: 'X-Robots-Tag', value: 'all' }],
      },
      {
        source: '/local-models/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/houston-zips/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      // A /fit/<uuid> result page shows someone their own answers back and is
      // reachable by anyone holding the link. /fit itself is the public funnel
      // and stays indexable, so the pattern deliberately requires a segment.
      {
        source: '/fit/:id',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

module.exports = nextConfig
