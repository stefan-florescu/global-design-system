import { existsSync, statSync } from "node:fs";
import path from "node:path";

import { defineConfig, type Options } from "tsup";

/**
 * Keep every source module as its own output file and point relative imports at the
 * emitted `.js` files. Interactive components start with "use client"; one file per
 * module preserves that directive, so server-safe exports (`cn`, `Button`) stay server
 * components in React Server Components and only interactive ones become client references.
 */
const keepModules: NonNullable<Options["esbuildPlugins"]>[number] = {
  name: "keep-modules",
  setup(build) {
    build.onResolve({ filter: /^\.\.?\// }, (args) => {
      if (args.kind === "entry-point") return undefined;
      const target = path.resolve(args.resolveDir, args.path);
      const isDir = existsSync(target) && statSync(target).isDirectory();
      return { path: isDir ? `${args.path}/index.js` : `${args.path}.js`, external: true };
    });
  },
};

export default defineConfig({
  entry: ["src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  bundle: true,
  target: "es2022",
  external: ["react", "react-dom", "react/jsx-runtime"],
  esbuildPlugins: [keepModules],
});
