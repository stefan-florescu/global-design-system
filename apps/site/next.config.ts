import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["@stefan-florescu/ui", "@stefan-florescu/icons"],
  async redirects() {
    // "Components" is the landing page.
    return [{ source: "/", destination: "/components", permanent: false }];
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
