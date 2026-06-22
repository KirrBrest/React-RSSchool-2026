import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/swapi/:path*',
        destination: 'https://swapi.py4e.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
