/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent Prisma from being bundled on the client side
      config.resolve.alias['@prisma/client'] = false
      config.resolve.alias['prisma'] = false
    }
    return config
  },
}

module.exports = nextConfig