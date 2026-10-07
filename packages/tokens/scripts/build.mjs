/**
 * Style Dictionary build for @stefan-florescu/tokens.
 *
 * Source layers (W3C DTCG format — `$value`, `$type`, `$description`):
 *   src/primitive/   raw values           e.g. color.blue.600
 *   src/semantic/    intent / purpose     e.g. color.action.primary.background → {color.blue.600}
 *   src/component/   component-scoped     e.g. button.primary.background → {color.action.primary.background}
 *
 * Outputs (build/):
 *   css/variables.css   CSS custom properties, prefixed `--sds-`, references preserved
 *   js/tokens.js(.d.ts) ES module constants for JS/TS consumers
 *   json/tokens.json    nested JSON for tooling, Figma sync and AI agents
 */
import { mkdir, writeFile } from "node:fs/promises";

import StyleDictionary from "style-dictionary";

export const PREFIX = "sds";

export const sources = [
  "src/primitive/**/*.json",
  "src/semantic/**/*.json",
  "src/component/**/*.json",
];

const sd = new StyleDictionary({
  source: sources,
  usesDtcg: true,
  log: { verbosity: "default", warnings: "warn" },
  platforms: {
    css: {
      transformGroup: "css",
      prefix: PREFIX,
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: { outputReferences: true, selector: ":root" },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "build/js/",
      files: [
        { destination: "tokens.js", format: "javascript/es6" },
        { destination: "tokens.d.ts", format: "typescript/es6-declarations" },
      ],
    },
    json: {
      transformGroup: "js",
      buildPath: "build/json/",
      files: [{ destination: "tokens.json", format: "json/nested" }],
    },
  },
});

const allTokens = await sd.getPlatformTokens("css").catch(() => ({ allTokens: [] }));

if (allTokens.allTokens.length === 0) {
  // Phase 0: no tokens authored yet — emit empty, valid artifacts so the
  // dependency graph (themes → ui → apps) builds end-to-end.
  console.warn("[tokens] No tokens found in src/ — emitting empty placeholder build.");
  await Promise.all(
    ["build/css", "build/js", "build/json"].map((d) => mkdir(d, { recursive: true })),
  );
  await writeFile("build/css/variables.css", ":root {}\n");
  await writeFile("build/js/tokens.js", "export {};\n");
  await writeFile("build/js/tokens.d.ts", "export {};\n");
  await writeFile("build/json/tokens.json", "{}\n");
} else {
  await sd.buildAllPlatforms();
}
