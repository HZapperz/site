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
}

module.exports = nextConfig
