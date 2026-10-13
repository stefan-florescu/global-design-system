import { nextConfig } from "@stefan-florescu/eslint-config/next";

export default [
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "public/design-system/**",
      "public/task-board/**",
      "public/price-tracker/**",
    ],
  },
];
