import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/9.x/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/swapi/:path*',
        destination: 'https://swapi.py4e.com/api/:path*',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
