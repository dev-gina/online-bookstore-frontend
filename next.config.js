/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  target: "server", // Netlify에서 SSR을 강제 활성화
  images: {
    domains: ["example.com", "localhost"], 
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/:path*", 
      },
    ];
  },
  experimental: {
    outputStandalone: true, // etlify 배포 시 SSR이 제대로 동작하도록 설정
  },
};

module.exports = nextConfig;
