import { promises as fs } from "node:fs";
import path from "node:path";

import { demos, type DemoName } from "@/registry";
import { cn } from "@/lib/utils";

import { CodeBlock } from "./code-block";
import { Tabs } from "./tabs";

/** Docs-only placeholder imports are shown to readers as the real package import. */
const PUBLIC_IMPORTS: [string, string][] = [
  ["@/registry/placeholder/button", "@stefan-florescu/ui"],
];

/**
 * shadcn-style Preview / Code tabs. The code tab shows the demo's real source file,
 * so examples can never drift from what is rendered.
 */
export async function ComponentPreview({
  name,
  align = "center",
  className,
}: {
  name: DemoName;
  align?: "center" | "start";
  className?: string;
}) {
  const Demo = demos[name];
  const file = path.join(process.cwd(), "registry", "demos", `${name}.tsx`);
  let source = await fs.readFile(file, "utf8");
  for (const [from, to] of PUBLIC_IMPORTS) source = source.replaceAll(from, to);

  return (
    <Tabs
      label="Example"
      className={cn("my-6", className)}
      items={[
        {
          value: "preview",
          label: "Preview",
          content: (
            <div
              className={cn(
                "mt-4 flex min-h-[320px] w-full flex-wrap gap-3 rounded-lg border p-10",
                align === "center" ? "items-center justify-center" : "items-start justify-start",
              )}
            >
              <Demo />
            </div>
          ),
        },
        {
          value: "code",
          label: "Code",
          content: <CodeBlock code={source} className="mt-4" />,
        },
      ]}
    />
  );
}
