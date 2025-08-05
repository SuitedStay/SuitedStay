/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.suitedstay.com' }],
        destination: 'https://suitedstay.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'suitedstays.com' }],
        destination: 'https://suitedstay.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'suitedstay.co.uk' }],
        destination: 'https://suitedstay.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'suitedstays.co.uk' }],
        destination: 'https://suitedstay.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;