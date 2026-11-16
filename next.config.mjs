/** @type {import('next').NextConfig} */
// STATIC_EXPORT=1 produces a pure static site in ./out for S3 + CloudFront.
// Unset (local dev) keeps the normal server so admin edits appear instantly.
const isExport = process.env.STATIC_EXPORT === '1'

const nextConfig = {
  ...(isExport
    ? {
        output: 'export',
        // CloudFront serves /about/ -> /about/index.html
        trailingSlash: true,
        // no Next image optimizer in a static export
        images: { unoptimized: true },
      }
    : {}),
}

export default nextConfig
