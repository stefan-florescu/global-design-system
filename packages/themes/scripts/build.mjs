/**
 * Theme build for @stefan-florescu/themes.
 *
 * Outputs:
 *   build/css/<theme>.css      semantic tokens for one theme (light → :root)
 *   build/css/themes.css       all themes bundled
 *   build/json/themes.json     every semantic token with its value per theme (docs, AI)
 *   build/json/contrast.json   WCAG contrast results for the checked pairings
 *
 * The build fails if any checked pairing misses its WCAG minimum in any theme.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";

import { checkPairs } from "./contrast.mjs";
import { SELECTORS, listThemes, resolveTheme, themeDictionary } from "./resolve.mjs";

const themes = await listThemes();
await mkdir("build/css", { recursive: true });
await mkdir("build/json", { recursive: true });

const resolved = {};
for (const theme of themes) {
  const selector = SELECTORS[theme] ?? `[data-theme="${theme}"]`;
  await themeDictionary(theme, [
    {
      destination: `${theme}.css`,
      format: "css/variables",
      filter: (token) => token.isSource,
      options: { outputReferences: true, selector },
    },
  ]).buildAllPlatforms();
  resolved[theme] = await resolveTheme(theme);
}

const bundle = await Promise.all(themes.map((theme) => readFile(`build/css/${theme}.css`, "utf8")));
await writeFile("build/css/themes.css", bundle.join("\n"));

// One row per semantic token with its reference and value in every theme. Descriptions
// live on the semantic defaults; theme overrides don't repeat them.
const describe = (path) =>
  themes.map((theme) => resolved[theme].find((t) => t.path === path)?.description).find(Boolean);
const tokens = resolved[themes[0]].map((token) => ({
  path: token.path,
  name: token.name,
  description: describe(token.path),
  themes: Object.fromEntries(
    themes.map((theme) => {
      const match = resolved[theme].find((t) => t.path === token.path);
      return [theme, { ref: match?.ref, value: match?.value }];
    }),
  ),
}));
await writeFile("build/json/themes.json", JSON.stringify({ themes, tokens }, null, 2) + "\n");

const report = checkPairs(
  Object.fromEntries(
    themes.map((theme) => [theme, new Map(resolved[theme].map((t) => [t.path, t.value]))]),
  ),
);
await writeFile("build/json/contrast.json", JSON.stringify(report, null, 2) + "\n");

const failures = report.flatMap((pair) =>
  Object.entries(pair.results)
    .filter(([, result]) => !result.pass)
    .map(
      ([theme, result]) =>
        `${theme}: ${pair.foreground} on ${pair.background} = ${result.ratio}:1 (needs ${pair.minimum}:1)`,
    ),
);
if (failures.length) {
  console.error(`[themes] Contrast check failed:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(
  `[themes] ${themes.join(", ")} built · ${report.length} contrast pairings pass in every theme.`,
);
