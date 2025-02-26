/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // ✅ Netlify에서 SSR 활성화
};

module.exports = nextConfig;
