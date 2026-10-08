import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";

/** Server-rendered, syntax-highlighted code with a copy button. */
export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}) {
  const html = await highlight(code, lang);

  return (
    <figure
      className={cn("group bg-surface relative overflow-hidden rounded-lg border", className)}
    >
      {title ? (
        <figcaption className="text-muted-foreground border-b px-4 py-2 font-mono text-xs">
          {title}
        </figcaption>
      ) : null}
      <CopyButton value={code.trimEnd()} className="bg-surface absolute top-2 right-2 z-10" />
      <div
        className="overflow-x-auto py-4 pr-12 pl-4 font-mono text-[13px] leading-6 [&_pre]:outline-none"
        // Shiki output is generated at build time from our own source files.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
