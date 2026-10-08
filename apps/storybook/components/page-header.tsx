import { ChevronRight } from "@stefan-florescu/icons";

type Status = "planned" | "experimental" | "beta" | "stable";

const statusLabel: Record<Status, string> = {
  planned: "Planned",
  experimental: "Experimental",
  beta: "Beta",
  stable: "Stable",
};

export function PageHeader({
  title,
  description,
  section,
  status,
}: {
  title: string;
  description?: string;
  section?: string;
  status?: Status;
}) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      {section ? (
        <nav aria-label="Breadcrumb">
          <ol className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <li>Docs</li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li>{section}</li>
            <ChevronRight aria-hidden className="size-3.5" />
            <li aria-current="page" className="text-foreground font-medium">
              {title}
            </li>
          </ol>
        </nav>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">{title}</h1>
        {status ? (
          <span className="text-muted-foreground rounded-full border px-2 py-0.5 text-xs font-medium">
            {statusLabel[status]}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="text-muted-foreground text-base text-balance">{description}</p>
      ) : null}
    </div>
  );
}
