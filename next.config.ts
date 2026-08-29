import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
    // the screenshot reels are served at a handful of widths — don't generate
    // (or let the browser pick) resolutions far larger than any slot uses
    imageSizes: [64, 96, 128, 256, 384],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  // framer-motion is the heaviest dependency; tree-shake it per-import
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
