import type { ReactNode } from "react";

/** The main landmark with the app's page width and spacing. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-10 md:py-12"
    >
      {children}
    </main>
  );
}

export function PageHeading({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 flex-col gap-2">
        <h1 className="text-heading text-3xl font-bold break-words">{title}</h1>
        {description ? <p className="text-body">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
