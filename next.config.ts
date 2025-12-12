import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use remotePatterns instead of domains (recommended)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize image formats for better performance
    formats: ['image/webp', 'image/avif'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for smaller images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache images for 1 year
    minimumCacheTTL: 31536000,
    // Allow SVG for icons
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
