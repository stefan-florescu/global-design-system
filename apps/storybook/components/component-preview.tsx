import { promises as fs } from "node:fs";
import path from "node:path";

import { demos, type DemoName } from "@/registry";

import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { Tabs } from "./tabs";

/**
 * Preview / Code tabs. The code tab shows the demo's real source file, so examples can
 * never drift from what is rendered.
 */
export async function ComponentPreview({
  name,
  stack = false,
  flush = false,
}: {
  name: DemoName;
  stack?: boolean;
  /** Edge to edge: no side padding, for full-width examples such as navbars. */
  flush?: boolean;
}) {
  const Demo = demos[name];
  const file = path.join(process.cwd(), "registry", "demos", `${name}.tsx`);
  const source = await fs.readFile(file, "utf8");

  return (
    <Tabs
      label="Example"
      items={[
        {
          value: "preview",
          label: "Preview",
          content: (
            <div
              className={["preview", stack && "preview--stack", flush && "preview--flush"]
                .filter(Boolean)
                .join(" ")}
            >
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
