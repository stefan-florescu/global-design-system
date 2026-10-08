import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  external: ["react", "react-dom", "react/jsx-runtime"],
  // No blanket "use client": it would turn server-safe exports (e.g. `cn`) into client
  // references in React Server Components. Interactive components will declare
  // "use client" in their own files, and the build will switch to per-file output
  // (bundle: false) when the first one lands so those directives are preserved.
});
