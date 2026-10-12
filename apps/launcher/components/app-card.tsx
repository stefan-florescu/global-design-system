import { ArrowUpRight } from "@stefan-florescu/icons";
import { Badge, Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

import type { LauncherApp } from "@/lib/apps";

/** A launcher tile: the whole card links to the app, which opens in a new tab. */
export function AppCard({ app }: { app: LauncherApp }) {
  const Icon = app.icon;

  return (
    <Card href={app.href} target="_blank" rel="noopener noreferrer" className="group h-full">
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="rounded-base bg-brand-softer text-fg-brand inline-flex size-10 items-center justify-center">
          <Icon aria-hidden className="size-5" />
        </span>
        <ArrowUpRight
          aria-hidden
          className="text-body-subtle group-hover:text-heading size-5 transition-colors motion-reduce:transition-none"
        />
      </div>
      <CardTitle headingLevel={2} className="mb-2 flex items-center gap-2 text-lg leading-7">
        {app.name}
        {app.status === "beta" ? <Badge variant="gray">Beta</Badge> : null}
      </CardTitle>
      <CardDescription className="text-sm">{app.description}</CardDescription>
      <span className="sr-only">(opens in a new tab)</span>
    </Card>
  );
}
