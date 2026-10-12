import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { basePath } from "./lib/base-path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Served under the launcher's domain at /design-system (Next.js multi-zones, see
  // apps/launcher/next.config.ts), so every route and asset lives under that path. Demos load
  // their sample images from it too (`/design-system/avatars/…`).
  basePath,
  transpilePackages: ["@stefan-florescu/ui", "@stefan-florescu/icons"],
  async redirects() {
    return [
      // "Components" is the landing page.
      { source: "/", destination: "/components", permanent: false },
      // The bare domain goes there too.
      { source: "/", destination: `${basePath}/components`, basePath: false, permanent: false },
    ];
  },
  experimental: {
    optimizePackageImports: ["@stefan-florescu/icons", "lucide-react"],
  },
};

// Plugins are referenced by name so the config stays serialisable for Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
