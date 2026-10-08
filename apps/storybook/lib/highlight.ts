import "server-only";

import { codeToHtml, type ThemeRegistrationRaw } from "shiki";

const v = (token: string) => `var(--sds-color-${token})`;

/**
 * Syntax colours come straight from the design-system code tokens, so code blocks follow
 * the theme like everything else: selectors & functions → syntax-fn, properties & attributes
 * → syntax-attr, values & strings → syntax-string, keywords → syntax-keyword, tags →
 * syntax-tag, comments → syntax-comment.
 */
const tokensTheme: ThemeRegistrationRaw = {
  name: "sds-tokens",
  type: "dark",
  settings: [
    { settings: { foreground: v("code-foreground"), background: "transparent" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: v("syntax-comment"), fontStyle: "italic" },
    },
    {
      scope: ["keyword", "storage", "storage.type", "keyword.control", "keyword.other.important"],
      settings: { foreground: v("syntax-keyword") },
    },
    {
      scope: ["keyword.operator", "punctuation", "meta.brace"],
      settings: { foreground: v("code-foreground") },
    },
    {
      scope: [
        "string",
        "constant.numeric",
        "constant.other.color",
        "constant.language",
        "support.constant.property-value",
        "support.constant.font-name",
        "keyword.other.unit",
        "markup.inline.raw",
      ],
      settings: { foreground: v("syntax-string") },
    },
    {
      scope: [
        "support.type.property-name",
        "support.type.custom-property",
        "variable.css",
        "variable.argument.css",
        "entity.other.attribute-name",
        "meta.property-name",
        "support.type.property-name.json",
      ],
      settings: { foreground: v("syntax-attr") },
    },
    {
      scope: ["entity.name.tag", "support.class.component", "entity.name.tag.html"],
      settings: { foreground: v("syntax-tag") },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "entity.other.attribute-name.class.css",
        "entity.other.attribute-name.pseudo-class.css",
        "entity.other.attribute-name.pseudo-element.css",
        "entity.name.tag.css",
        "meta.selector",
        "keyword.control.at-rule",
      ],
      settings: { foreground: v("syntax-fn") },
    },
  ],
};

/** Server-side syntax highlighting, coloured by the design-system syntax tokens. */
export function highlight(code: string, lang = "tsx"): Promise<string> {
  return codeToHtml(code.trimEnd(), { lang, theme: tokensTheme });
}
