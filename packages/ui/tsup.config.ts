import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  external: ["react", "react-dom", "react/jsx-runtime"],
  // Interactive components must work in React Server Component apps (Next.js App Router).
  banner: { js: '"use client";' },
});
