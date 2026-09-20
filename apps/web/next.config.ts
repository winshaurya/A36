import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@origin/shared': path.resolve(__dirname, './src/lib/shared'),
      '@origin/blockchain': path.resolve(__dirname, './src/lib/blockchain'),
    };
    return config;
  },
};

export default nextConfig;
