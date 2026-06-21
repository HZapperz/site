/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/revenue', destination: '/sprint', permanent: true },
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
    ]
  },
}

module.exports = nextConfig
