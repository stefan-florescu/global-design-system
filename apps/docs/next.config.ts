import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@stefan-florescu/ui", "@stefan-florescu/icons"],
  experimental: {
    optimizePackageImports: ["@stefan-florescu/ui", "@stefan-florescu/icons", "lucide-react"],
  },
};

export default nextConfig;
