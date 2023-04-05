/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    isrMemoryCacheSize: 50
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },      
    ],
  },

}

module.exports = nextConfig
