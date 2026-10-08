import { promises as fs } from "node:fs";
import path from "node:path";

import { demos, type DemoName } from "@/registry";

import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { Tabs } from "./tabs";

/** Docs-only placeholder imports are shown to readers as the real package import. */
const PUBLIC_IMPORTS: [string, string][] = [
  ["@/registry/placeholder/button", "@stefan-florescu/ui"],
];

/**
 * Preview / Code tabs. The code tab shows the demo's real source file, so examples can
 * never drift from what is rendered.
 */
export async function ComponentPreview({
  name,
  stack = false,
}: {
  name: DemoName;
  stack?: boolean;
}) {
  const Demo = demos[name];
  const file = path.join(process.cwd(), "registry", "demos", `${name}.tsx`);
  let source = await fs.readFile(file, "utf8");
  for (const [from, to] of PUBLIC_IMPORTS) source = source.replaceAll(from, to);

  return (
    <Tabs
      label="Example"
      items={[
        {
          value: "preview",
          label: "Preview",
          content: (
            <div className={stack ? "preview preview--stack" : "preview"}>
              <div className="preview__toolbar">
                <CopyButton value={source.trim()} subtle />
              </div>
              <Demo />
            </div>
          ),
        },
        {
          value: "code",
          label: "Code",
          content: <CodeBlock code={source} filename={`${name}.tsx`} />,
        },
      ]}
    />
  );
}
