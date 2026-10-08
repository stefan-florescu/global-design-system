import { highlight } from "@/lib/highlight";

import { CopyButton } from "./copy-button";

/** Server-rendered, syntax-highlighted code with a filename header and a copy button. */
export async function CodeBlock({
  code,
  lang = "tsx",
  filename,
  className,
}: {
  code: string;
  lang?: string;
  filename?: string;
  className?: string;
}) {
  const source = code.replace(/^\n+|\s+$/g, "");
  const html = await highlight(source, lang);

  return (
    <div className={className ? `code-block ${className}` : "code-block"}>
      <div className="code-block__header">
        <span className="code-block__filename">{filename ?? lang}</span>
        <CopyButton value={source} />
      </div>
      {/* Shiki output is generated at build time from our own source files. */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
