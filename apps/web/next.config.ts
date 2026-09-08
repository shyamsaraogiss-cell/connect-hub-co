import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows CI/build validation to bypass a locked local .next directory.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  async redirects() {
    return [
      { source: "/terms", destination: "/policies-legal-terms#terms-and-conditions", permanent: true },
      { source: "/privacy-policy", destination: "/policies-legal-terms#privacy-policy", permanent: true },
      { source: "/booking-terms", destination: "/policies-legal-terms#booking-terms", permanent: true },
      { source: "/cancellation-policy", destination: "/refund-policy", permanent: true },
    ];
  },
};

export default nextConfig;
