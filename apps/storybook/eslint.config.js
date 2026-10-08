import { nextConfig } from "@stefan-florescu/eslint-config/next";

export default [
  ...nextConfig,
  { ignores: [".next/**", "next-env.d.ts"] },
  {
    // Demos are copy-paste examples for any React app, so they use plain <img>, not next/image.
    files: ["registry/demos/**"],
    rules: { "@next/next/no-img-element": "off" },
  },
];
