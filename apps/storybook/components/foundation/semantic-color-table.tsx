import themes from "@stefan-florescu/themes/json";

type ThemeValue = { ref?: string; value?: string };
type SemanticToken = {
  path: string;
  name: string;
  description?: string;
  themes: Record<string, ThemeValue>;
};

const data = themes as { themes: string[]; tokens: SemanticToken[] };

const UTILITY_PREFIX: Record<string, string> = { text: "text", background: "bg", border: "border" };

/** "gray.900" → "--sds-color-gray-900" */
const primitiveVar = (ref = "") => `--sds-color-${ref.replace(/\./g, "-")}`;

function ThemeCell({ value }: { value?: ThemeValue }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden
        className="size-5 shrink-0 rounded border border-black/10 dark:border-white/10"
        style={{ backgroundColor: `var(${primitiveVar(value?.ref)})` }}
      />
      <code className="font-mono text-xs whitespace-nowrap">{value?.ref}</code>
    </span>
  );
}

/**
 * Semantic colour tokens of one group (text, background or border) with their value in
 * the light and dark themes, rendered from @stefan-florescu/themes.
 */
export function SemanticColorTable({ group }: { group: "text" | "background" | "border" }) {
  const rows = data.tokens.filter((token) => token.path.startsWith(`color.${group}.`));

  return (
    <div className="my-6 w-full overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[640px] text-sm">
        <caption className="sr-only">{`Semantic ${group} colour tokens in light and dark themes`}</caption>
        <thead className="bg-surface">
          <tr className="border-b">
            <th scope="col" className="px-4 py-2 text-left font-medium">
              Token
            </th>
            {data.themes.map((theme) => (
              <th key={theme} scope="col" className="px-4 py-2 text-left font-medium capitalize">
                {theme}
              </th>
            ))}
            <th scope="col" className="px-4 py-2 text-left font-medium">
              Use for
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((token) => {
            const name = token.path.split(".").pop();
            return (
              <tr key={token.path} className="border-b last:border-b-0">
                <th scope="row" className="px-4 py-2 text-left align-top font-normal">
                  <code className="font-mono text-xs font-medium whitespace-nowrap">
                    {`${UTILITY_PREFIX[group]}-${name}`}
                  </code>
                  <code className="text-muted-foreground mt-1 block font-mono text-[11px] whitespace-nowrap">
                    {token.name}
                  </code>
                </th>
                {data.themes.map((theme) => (
                  <td key={theme} className="px-4 py-2 align-top">
                    <ThemeCell value={token.themes[theme]} />
                  </td>
                ))}
                <td className="text-muted-foreground px-4 py-2 align-top">{token.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
