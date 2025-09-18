/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize CSS processing
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Suppress webpack warnings
  webpack: (config) => {
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /Module not found: Can't resolve/,
    ]
    return config
  },
}

module.exports = nextConfig