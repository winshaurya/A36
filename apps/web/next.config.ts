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
      '@origin/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@origin/blockchain': path.resolve(__dirname, '../../packages/blockchain/src'),
    };
    return config;
  },
  transpilePackages: ['@origin/shared', '@origin/blockchain'],
};

export default nextConfig;
