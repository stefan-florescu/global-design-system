import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

import { reactConfig } from "./react.js";

/** Next.js apps (docs site). */
export const nextConfig = tseslint.config(...reactConfig, {
  plugins: { "@next/next": nextPlugin },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
  },
});

export default nextConfig;
