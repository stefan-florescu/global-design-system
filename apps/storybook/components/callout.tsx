import type { ReactNode } from "react";

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="bg-surface my-6 rounded-lg border px-4 py-3 text-sm">
      {title ? <p className="font-medium">{title}</p> : null}
      <div className="text-muted-foreground [&_p]:my-1 [&_p]:leading-6">{children}</div>
    </div>
  );
}
