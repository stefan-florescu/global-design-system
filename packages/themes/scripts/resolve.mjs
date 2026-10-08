/**
 * Shared Style Dictionary setup for @stefan-florescu/themes.
 *
 * A theme = the semantic defaults from @stefan-florescu/tokens (src/semantic) plus
 * that theme's overrides in src/<theme>/. Primitives are included so references
 * resolve, but only semantic tokens are emitted.
 */
import { readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

import StyleDictionary from "style-dictionary";

export const PREFIX = "sds";

/** Semantic token files that themes may re-assign. */
export const THEMABLE = ["color.json", "shadow.json"];

/** CSS selector per theme; unknown themes get [data-theme="<name>"]. */
export const SELECTORS = {
  light: ':root, [data-theme="light"]',
  dark: '[data-theme="dark"]',
};

const require = createRequire(import.meta.url);
const tokensRoot = path.dirname(require.resolve("@stefan-florescu/tokens/package.json"));

/** Theme folder names: light first (the default), then dark, then the rest alphabetically. */
export async function listThemes() {
  const order = (name) => ["light", "dark"].indexOf(name) >>> 0;
  return (await readdir("src", { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => order(a) - order(b) || a.localeCompare(b));
}

export function themeDictionary(theme, files = []) {
  return new StyleDictionary({
    include: [`${tokensRoot}/src/primitive/**/*.json`],
    // Only colour and elevation are themable; spacing, radius, typography… are theme-independent.
    source: [
      ...THEMABLE.map((file) => `${tokensRoot}/src/semantic/${file}`),
      `src/${theme}/**/*.json`,
    ],
    usesDtcg: true,
    // Theme overrides intentionally redefine semantic tokens, so collisions are expected.
    log: { verbosity: "default", warnings: "disabled" },
    platforms: {
      css: {
        transformGroup: "css",
        prefix: PREFIX,
        buildPath: "build/css/",
        files,
      },
    },
  });
}

/** Resolved semantic tokens for a theme: [{ path, name, ref, value, description, group }]. */
export async function resolveTheme(theme) {
  const { allTokens } = await themeDictionary(theme).getPlatformTokens("css");
  return allTokens
    .filter((token) => token.isSource)
    .map((token) => ({
      path: token.path.join("."),
      name: `--${token.name}`,
      // Original value with references, e.g. "{color.gray.900}" or "color-mix(… {color.gray.900} 60% …)"
      ref: String(token.original.$value),
      value: token.$value,
      description: token.$description ?? token.original.$description,
      group: token.$extensions?.sds?.group ?? token.original.$extensions?.sds?.group,
    }));
}
