import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { basePath } from "./lib/base-path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // A static site that the launcher serves as one of its sections: `next build` writes it to
  // out/, which the launcher's build copies into its public/design-system. Every route and asset
  // lives under the base path; demos load their sample images from it too (`/design-system/avatars/…`).
  output: "export",
  basePath,
  transpilePackages: ["@stefan-florescu/ui", "@stefan-florescu/icons"],
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
