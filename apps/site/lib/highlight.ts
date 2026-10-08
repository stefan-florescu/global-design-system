import "server-only";

import { codeToHtml } from "shiki";

/** Server-side syntax highlighting with light + dark themes emitted as CSS variables. */
export function highlight(code: string, lang = "tsx"): Promise<string> {
  return codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
