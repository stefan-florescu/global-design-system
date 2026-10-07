/**
 * Theme build for @stefan-florescu/themes.
 *
 * Each folder in src/<theme>/ holds DTCG JSON that RE-ASSIGNS semantic tokens
 * (never primitives, never component tokens) for that theme. Primitives are
 * loaded from @stefan-florescu/tokens as `include` so references resolve, but
 * only the theme's own tokens are emitted.
 *
 *   light → :root, [data-theme="light"]   (default)
 *   dark  → [data-theme="dark"]
 *
 * Output: build/css/<theme>.css and build/css/themes.css (all themes bundled).
 */
import { readdir, mkdir, writeFile, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

import StyleDictionary from "style-dictionary";

const PREFIX = "sds";
const SELECTORS = {
  light: ':root, [data-theme="light"]',
  dark: '[data-theme="dark"]',
};

const require = createRequire(import.meta.url);
const tokensRoot = path.dirname(require.resolve("@stefan-florescu/tokens/package.json"));

const themes = (await readdir("src", { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

await mkdir("build/css", { recursive: true });

for (const theme of themes) {
  const selector = SELECTORS[theme] ?? `[data-theme="${theme}"]`;
  const sd = new StyleDictionary({
    include: [`${tokensRoot}/src/primitive/**/*.json`],
    source: [`src/${theme}/**/*.json`],
    usesDtcg: true,
    log: { verbosity: "default", warnings: "warn" },
    platforms: {
      css: {
        transformGroup: "css",
        prefix: PREFIX,
        buildPath: "build/css/",
        files: [
          {
            destination: `${theme}.css`,
            format: "css/variables",
            filter: (token) => token.isSource,
            options: { outputReferences: true, selector },
          },
        ],
      },
    },
  });

  const { allTokens } = await sd.getPlatformTokens("css");
  if (allTokens.some((t) => t.isSource)) {
    await sd.buildAllPlatforms();
  } else {
    console.warn(`[themes] "${theme}" has no tokens yet — emitting empty placeholder.`);
    await writeFile(`build/css/${theme}.css`, `${selector} {}\n`);
  }
}

const bundle = await Promise.all(themes.map((t) => readFile(`build/css/${t}.css`, "utf8")));
await writeFile("build/css/themes.css", bundle.join("\n"));
