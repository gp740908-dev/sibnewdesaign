/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization for Vercel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'grainy-gradients.vercel.app',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Optimize package imports
  experimental: {
    optimizePackageImports: ['framer-motion', 'lenis'],
  },

  // React strict mode for better development experience
  reactStrictMode: true,

  // Vercel-optimized production settings
  compress: true,
  poweredByHeader: false,

  // TypeScript configuration
  typescript: {
    // Set to true if you want to skip type checking during build (not recommended)
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Set to true if you want to skip ESLint during build (not recommended)
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
