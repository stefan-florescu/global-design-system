import themes from "@stefan-florescu/themes/json";

type ThemeValue = { ref?: string; value?: string };
type SemanticToken = {
  path: string;
  name: string;
  description?: string;
  group?: string;
  themes: Record<string, ThemeValue>;
};

const data = themes as { themes: string[]; tokens: SemanticToken[] };

/**
 * "{color.gray.900}" → "gray-900"; "color-mix(in srgb, {color.gray.900} 60%, transparent)" →
 * "gray-900 · 60%".
 */
function primitiveLabel(ref = "") {
  const refs = [...ref.matchAll(/\{color\.([a-z]+)(?:\.(\d+))?\}/g)].map(([, hue, step]) =>
    step ? `${hue}-${step}` : hue,
  );
  const mix = ref.match(/\}\s+(\d+%)/);
  return mix ? `${refs[0]} · ${mix[1]}` : (refs[0] ?? ref);
}

/** Resolved hex for the swatch dot and the second line (opaque colour of a color-mix). */
function hexOf(value = "") {
  return value.match(/#[0-9a-f]{3,8}/i)?.[0] ?? value;
}

function TokenValue({ value }: { value?: ThemeValue }) {
  const hex = hexOf(value?.value);
  return (
    <span className="token-value">
      <span className="dot" style={{ background: hex }} />
      <span>
        <span className="token-value__ref">{primitiveLabel(value?.ref)}</span>
        <br />
        <span className="token-value__hex">{hex}</span>
      </span>
    </span>
  );
}

/** Every semantic colour token with its light and dark value, rendered from @stefan-florescu/themes. */
export function TokenTable() {
  const rows = data.tokens.filter((token) => token.path.startsWith("color."));
  const groups = [...new Set(rows.map((token) => token.group ?? "Other"))];

  return (
    <div className="table-wrap">
      <table className="token-table">
        <thead>
          <tr>
            <th scope="col">Token</th>
            {data.themes.map((theme) => (
              <th scope="col" key={theme} style={{ textTransform: "capitalize" }}>
                {theme}
              </th>
            ))}
            <th scope="col">When to use it</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => [
            <tr className="row-group" key={group}>
              <th colSpan={data.themes.length + 2} scope="colgroup">
                {group}
              </th>
            </tr>,
            ...rows
              .filter((token) => (token.group ?? "Other") === group)
              .map((token) => (
                <tr key={token.path}>
                  <td>
                    <code title={token.name}>{token.path.replace(/^color\./, "")}</code>
                  </td>
                  {data.themes.map((theme) => (
                    <td key={theme}>
                      <TokenValue value={token.themes[theme]} />
                    </td>
                  ))}
                  <td className="cell-muted">{token.description}</td>
                </tr>
              )),
          ])}
        </tbody>
      </table>
    </div>
  );
}
