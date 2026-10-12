import type { NextConfig } from "next";

/*
 * Apps in this repo are served under a path on the launcher's domain (Next.js multi-zones): each
 * one is its own Vercel project with a matching `basePath`, and the launcher forwards that path
 * to the app's production domain, set in an environment variable.
 */
const designSystemOrigin =
  process.env.DESIGN_SYSTEM_ORIGIN ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

if (!designSystemOrigin && process.env.VERCEL_ENV) {
  throw new Error(
    "Set DESIGN_SYSTEM_ORIGIN to the docs site's production URL (for example https://docs.example.com) in the launcher's Vercel project.",
  );
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@stefan-florescu/ui", "@stefan-florescu/icons"],
  async rewrites() {
    if (!designSystemOrigin) return [];
    return [
      { source: "/design-system", destination: `${designSystemOrigin}/design-system` },
      {
        source: "/design-system/:path*",
        destination: `${designSystemOrigin}/design-system/:path*`,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["@stefan-florescu/icons", "lucide-react"],
  },
};

export default nextConfig;
