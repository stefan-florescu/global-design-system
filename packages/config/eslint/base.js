import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import turbo from "eslint-plugin-turbo";
import globals from "globals";
import tseslint from "typescript-eslint";

/** Base rules for every TypeScript workspace. */
export const base = tseslint.config(
  { ignores: ["dist/**", "build/**", ".next/**", "coverage/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { turbo },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    // Build scripts and tool configs run in Node.
    files: ["**/*.{js,mjs,cjs}", "**/*.config.{ts,mts}", "scripts/**"],
    languageOptions: { globals: { ...globals.node } },
  },
  prettier,
);

export default base;
