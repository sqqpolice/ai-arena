import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ai-arena',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
