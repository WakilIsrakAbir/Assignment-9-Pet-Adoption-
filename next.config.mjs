/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === "production" 
          ? "https://assignment-9-pet-adoption-backend.vercel.app/api/:path*"
          : "http://localhost:5000/api/:path*"
      },
    ];
  },
};

export default nextConfig;
