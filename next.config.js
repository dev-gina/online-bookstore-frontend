/** @type {import('next').NextConfig} */
const nextConfig = {
 reactStrictMode: true,
 swcMinify: true,
 images: {
   domains: ["example.com", "localhost"], 
 },
 async rewrites() {
   return [
     {
       source: "/api/:path*",
       destination: "http://localhost:5001/api/:path*",
     },
   ];
 },
};

module.exports = nextConfig;
