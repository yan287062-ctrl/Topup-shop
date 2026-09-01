import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/supabase/:path*',
        destination: 'https://lejfhsuwajmzikmudmcs.supabase.co/:path*',
      },
    ];
  },
};

export default nextConfig;
