/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["example.com", "localhost"], 
  },
  async rewrites() {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://final-back-gina.herokuapp.com";
    return [
      {
        source: "/api/:path*",
        destination: `${API_BASE_URL}/api/:path*`, 
      },
    ];
  },
};

module.exports = nextConfig;
