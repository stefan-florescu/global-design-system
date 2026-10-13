import type { NextConfig } from "next";

import { sections } from "./sections.mjs";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@stefan-florescu/ui", "@stefan-florescu/icons"],
  async rewrites() {
    return sections.flatMap(({ path, devOrigin }) =>
      isDev
        ? // Development: the app's own dev server, so its pages reload as you edit them.
          [{ source: `/${path}/:slug*`, destination: `${devOrigin}/${path}/:slug*` }]
        : // Built: the static pages copied into public/<path> (/design-system/components →
          // components.html). Real files, such as scripts and images, are served first.
          [
            { source: `/${path}`, destination: `/${path}/index.html` },
            // The router prefetches the section's home page as /<path>.txt (its RSC payload).
            { source: `/${path}.txt`, destination: `/${path}/index.txt` },
            { source: `/${path}/:slug+`, destination: `/${path}/:slug+.html` },
          ],
    );
  },
  experimental: {
    optimizePackageImports: ["@stefan-florescu/icons", "lucide-react"],
  },
};

export default nextConfig;
