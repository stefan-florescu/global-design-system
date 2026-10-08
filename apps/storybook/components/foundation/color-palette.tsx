import tokens from "@stefan-florescu/tokens/json";

type Scale = Record<string, string>;

const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

const colors = (tokens as { color: Record<string, Scale | string> }).color;
/** Primitive palettes are the colour groups with a full 50–950 scale. */
const palettes = Object.entries(colors).filter(
  (entry): entry is [string, Scale] => typeof entry[1] === "object" && "500" in entry[1],
);
const base = ["white", "black"].filter((name) => typeof colors[name] === "string");

function Swatch({ cssVar, className }: { cssVar: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`block rounded-md border border-black/10 dark:border-white/10 ${className ?? ""}`}
      style={{ backgroundColor: `var(${cssVar})` }}
    />
  );
}

/** Every primitive palette and step, rendered from @stefan-florescu/tokens. */
export function ColorPalette() {
  return (
    <div className="my-6 flex flex-col gap-6">
      <div className="w-full overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[720px] border-collapse text-xs">
          <caption className="sr-only">Primitive colour palettes with steps from 50 to 950</caption>
          <thead>
            <tr className="bg-surface border-b">
              <th scope="col" className="px-3 py-2 text-left font-medium">
                Palette
              </th>
              {STEPS.map((step) => (
                <th
                  key={step}
                  scope="col"
                  className="text-muted-foreground px-1 py-2 text-center font-mono font-medium"
                >
                  {step}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {palettes.map(([name, scale]) => (
              <tr key={name} className="border-b last:border-b-0">
                <th scope="row" className="px-3 py-1.5 text-left font-medium capitalize">
                  {name}
                </th>
                {STEPS.map((step) => (
                  <td
                    key={step}
                    className="px-1 py-1.5"
                    title={`--sds-color-${name}-${step}: ${scale[step]}`}
                  >
                    <Swatch cssVar={`--sds-color-${name}-${step}`} className="h-9 w-full min-w-9" />
                    <span className="sr-only">{`${name} ${step}: ${scale[step]}`}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-wrap gap-4 text-sm">
        {base.map((name) => (
          <li key={name} className="flex items-center gap-3">
            <Swatch cssVar={`--sds-color-${name}`} className="size-9" />
            <span>
              <span className="block font-medium capitalize">{name}</span>
              <code className="text-muted-foreground font-mono text-xs">--sds-color-{name}</code>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
