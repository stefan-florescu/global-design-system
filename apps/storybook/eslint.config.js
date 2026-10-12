import { nextConfig } from "@stefan-florescu/eslint-config/next";

export default [
  ...nextConfig,
  { ignores: [".next/**", "out/**", "next-env.d.ts"] },
  {
    // Demos are copy-paste examples for any React app, so they use plain <img> and <a>, not
    // next/image and next/link.
    files: ["registry/demos/**"],
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
