/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'debtreducingcalculator.com' }],
        destination: 'https://www.debtreducingcalculator.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig