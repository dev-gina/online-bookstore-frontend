/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["example.com", "localhost"], 
  },
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/api/:path*",
            destination: "http://localhost:5001/api/:path*", 
          },
        ]
      : [
          {
            source: "/api/:path*",
            destination: "https://gina-backend-098d63d3c03d.herokuapp.com/api/:path*", 
          },
        ];
  },
};

module.exports = nextConfig;
