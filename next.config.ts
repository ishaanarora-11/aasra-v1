import type { NextConfig } from 'next'

const config: NextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
  api: {
    responseLimit: false,
  },
  images: {
    domains:['murf.ai','www.google.com','static.vecteezy.com','thumbs.dreamstime.com','media.istockphoto.com','loveincorporated.blob.core.windows.net','hips.hearstapps.com','www.eatingbirdfood.com','img.freepik.com'],
  },
}

export default config