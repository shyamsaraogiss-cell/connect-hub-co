import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows CI/build validation to bypass a locked local .next directory.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
