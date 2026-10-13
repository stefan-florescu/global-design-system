import type { NextConfig } from "next";

import { basePath } from "./lib/base-path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // A static site that the launcher serves as one of its sections: `next build` writes it to
  // out/, which the launcher's build copies into its public/price-tracker.
  output: "export",
  basePath,
  transpilePackages: ["@stefan-florescu/ui", "@stefan-florescu/icons"],
  experimental: {
    optimizePackageImports: ["@stefan-florescu/icons", "lucide-react"],
  },
};

export default nextConfig;
