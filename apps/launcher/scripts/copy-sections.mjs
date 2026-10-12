// Copies each section's static export into public/<path> before `next build` (see sections.mjs).
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { sections } from "../sections.mjs";

const appDir = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const { path, outDir } of sections) {
  const from = join(appDir, outDir);
  const to = join(appDir, "public", path);
  if (!existsSync(from)) {
    throw new Error(`Missing ${from}: build that app before the launcher.`);
  }
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
  console.log(`Copied ${outDir} to public/${path}`);
}
