/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // Netlify에서 SSR 활성화
  images: {
    domains: ["example.com", "localhost"], 
  },
};

module.exports = nextConfig;
